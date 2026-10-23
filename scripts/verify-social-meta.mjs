#!/usr/bin/env node
/**
 * Validates the social sharing metadata and the OG image.
 *
 * Default mode checks the local production build in dist/ (or the source
 * index.html + public/ if dist/ is absent). Pass --url <url> to validate a
 * live deployment instead.
 *
 *   node scripts/verify-social-meta.mjs
 *   node scripts/verify-social-meta.mjs --url https://launchpadstudio.uk
 *
 * Exits 0 when every check passes, 1 otherwise.
 */
import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve, join } from "node:path";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

function parseMeta(html) {
  const map = {};
  for (const m of html.matchAll(/<meta\b[^>]*>/gi)) {
    const tag = m[0];
    const prop = /(?:property|name)\s*=\s*"([^"]*)"/i.exec(tag);
    const cont = /content\s*=\s*"([^"]*)"/i.exec(tag);
    if (prop && cont) map[prop[1]] = cont[1];
  }
  return map;
}

const EXPECTED = {
  og: {
    type: "website",
    site_name: "Launchpad Studio",
    title: "Launchpad Studio | Professional Websites for Local Businesses",
    url: "https://launchpadstudio.uk/",
    locale: "en_GB",
  },
  twitter: { card: "summary_large_image" },
};

const REQUIRED_OG = [
  "og:title", "og:description", "og:url", "og:locale", "og:image",
  "og:image:alt", "og:image:width", "og:image:height",
];
const REQUIRED_TWITTER = ["twitter:card", "twitter:title", "twitter:description", "twitter:image"];
const REQUIRED_LINKEDIN = ["ln:title", "ln:description", "ln:image"];

const failures = [];
function check(ok, msg) {
  console.log(`  ${ok ? "✓" : "✗"} ${msg}`);
  if (!ok) failures.push(msg);
}

async function verifyLocal() {
  const distIndex = join(root, "dist", "index.html");
  const srcIndex = join(root, "index.html");
  const html = existsSync(distIndex)
    ? readFileSync(distIndex, "utf8")
    : readFileSync(srcIndex, "utf8");
  const source = existsSync(distIndex) ? "dist/index.html" : "index.html";
  console.log(`\n[verify-social] Source: ${source}\n`);

  const meta = parseMeta(html);

  console.log("Open Graph / Twitter / LinkedIn tags");
  for (const k of REQUIRED_OG) check(!!meta[k], `${k} present`);
  for (const k of REQUIRED_TWITTER) check(!!meta[k], `${k} present`);
  for (const k of REQUIRED_LINKEDIN) check(!!meta[k], `${k} present`);

  console.log("\nConsistency");
  for (const [key, want] of Object.entries(EXPECTED.og)) {
    check(meta["og:" + key] === want, `og:${key} = "${want}"`);
  }
  check(meta["twitter:card"] === "summary_large_image", 'twitter:card = "summary_large_image"');
  check(meta["og:title"] === meta["twitter:title"], "og:title matches twitter:title");
  check(meta["og:description"] === meta["twitter:description"], "og:description matches twitter:description");
  check(meta["og:image"] === meta["twitter:image"], "og:image matches twitter:image");
  check(meta["og:image"] === meta["ln:image"], "og:image matches ln:image");

  const ogImage = meta["og:image"] || "";
  console.log("\nImage URL");
  check(/^https:\/\//.test(ogImage), "og:image is an absolute URL");
  check(ogImage.endsWith("/og-image.jpg"), "og:image points to /og-image.jpg");

  // Verify the image file itself (local build / source).
  const localImg = join(root, "public", "og-image.jpg");
  console.log("\nImage file");
  check(existsSync(localImg), "public/og-image.jpg exists");
  if (existsSync(localImg)) {
    try {
      const sharp = (await import("sharp")).default;
      const metaImg = await sharp(localImg).metadata();
      check(metaImg.width === 1200 && metaImg.height === 630, `dimensions ${metaImg.width}x${metaImg.height} (expected 1200x630)`);
      const { data, info } = await sharp(localImg).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
      let nonBg = 0;
      for (let i = 0; i < data.length; i += info.channels) {
        const r = data[i], g = data[i + 1], b = data[i + 2];
        if (Math.abs(r - 11) + Math.abs(g - 30) + Math.abs(b - 59) > 80) nonBg++;
      }
      const ratio = nonBg / (info.width * info.height);
      check(ratio > 0.02, `image is not blank (${(ratio * 100).toFixed(1)}% non-background pixels)`);
    } catch {
      console.log("  – sharp not available; skipped dimension/blank checks (run `npm install --no-save sharp` for full checks)");
    }
  }
}

async function verifyUrl(url, imageBase) {
  console.log(`\n[verify-social] Fetching ${url}\n`);
  const res = await fetch(url, { redirect: "follow" });
  const html = await res.text();
  const meta = parseMeta(html);
  for (const k of [...REQUIRED_OG, ...REQUIRED_TWITTER, ...REQUIRED_LINKEDIN]) check(!!meta[k], `${k} present`);
  const ogImage = meta["og:image"] || "";
  check(/^https:\/\//.test(ogImage), "og:image is an absolute URL");
  if (ogImage) {
    // When testing a local server, rewrite the absolute URL's origin to the
    // local image base so the image can actually be fetched.
    const fetchUrl = imageBase
      ? imageBase.replace(/\/$/, "") + new URL(ogImage).pathname
      : ogImage;
    const ires = await fetch(fetchUrl, { redirect: "follow" });
    check(ires.ok, `og:image fetchable (HTTP ${ires.status})`);
    const ctype = ires.headers.get("content-type") || "";
    check(/image\/(jpeg|png)/.test(ctype), `og:image content-type is ${ctype}`);
    const buf = Buffer.from(await ires.arrayBuffer());
    try {
      const sharp = (await import("sharp")).default;
      const mi = await sharp(buf).metadata();
      check(mi.width === 1200 && mi.height === 630, `image dimensions ${mi.width}x${mi.height}`);
    } catch {
      check(buf.length > 5000, `image downloaded (${(buf.length / 1024).toFixed(1)} kB)`);
    }
  }
}

const args = process.argv.slice(2);
const urlArg = args.includes("--url") ? args[args.indexOf("--url") + 1] : null;
const imageBaseArg = args.includes("--image-base") ? args[args.indexOf("--image-base") + 1] : null;

try {
  if (urlArg) await verifyUrl(urlArg, imageBaseArg);
  else await verifyLocal();
} catch (err) {
  console.error("[verify-social] Error:", err.message);
  process.exit(1);
}

console.log("\n[verify-social] " + (failures.length ? `FAILED (${failures.length} check(s))` : "ALL CHECKS PASSED"));
process.exit(failures.length ? 1 : 0);
