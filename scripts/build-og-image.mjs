#!/usr/bin/env node
/**
 * Builds the social sharing card from the editable vector source.
 *
 *   SVG source  ->  assets/social-card.svg
 *   Output      ->  public/og-image.jpg  (1200x630, used by OG/Twitter meta)
 *                  public/og-image.png  (same, for platforms that prefer PNG)
 *
 * This script is a OPTIONAL maintainer tool. The generated raster files are
 * committed to the repository, so the deployed site never depends on it. You
 * only need to run it when you want to redesign the card.
 *
 * Requirements (one time, not part of the deployed app):
 *   npm install --no-save sharp
 *   plus the brand fonts Inter + Fraunces available to fontconfig. The easiest
 *   way is to install the npm font packages and copy the TTF files from their
 *   "files" directories into a font dir, e.g.:
 *     npm install --no-save @fontsource/inter @fontsource/fraunces
 *     mkdir -p ~/.local/share/fonts
 *     cp node_modules/@fontsource/inter/files/*.ttf ~/.local/share/fonts/
 *     cp node_modules/@fontsource/fraunces/files/*.ttf ~/.local/share/fonts/
 *   (or point FONT_DIR at a directory that contains the Inter and Fraunces TTFs)
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve, join } from "node:path";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const svgPath = resolve(root, "assets/social-card.svg");
const outDir = resolve(root, "public");

const WIDTH = 1200;
const HEIGHT = 630;

async function loadSharp() {
  try {
    return (await import("sharp")).default;
  } catch {
    console.error(`\n[build-og-image] \`sharp\` is not installed.

This is only needed to REGENERATE the social card. The committed
public/og-image.jpg is already deployed and does not need it.

To redesign the card, install sharp once:

  npm install --no-save sharp

`);
    process.exit(1);
  }
}

async function fontsAvailable(sharp) {
  const probe = (family) =>
    `<svg xmlns="http://www.w3.org/2000/svg" width="120" height="40">` +
    `<text x="0" y="30" font-family="${family}" font-size="28" fill="#fff">Launchpad</text></svg>`;
  const sig = async (family) => {
    const { data, info } = await sharp(Buffer.from(probe(family)))
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });
    let sum = 0;
    for (let i = 0; i < data.length; i += info.channels)
      sum = (sum * 31 + data[i]) >>> 0;
    return sum;
  };
  const real = await sig("Inter");
  const fallback = await sig("__no_such_font__");
  return real !== fallback;
}

async function main() {
  const sharp = await loadSharp();

  if (!existsSync(svgPath)) {
    console.error(`[build-og-image] Missing source: ${svgPath}`);
    process.exit(1);
  }
  const svg = readFileSync(svgPath, "utf8");

  if (!(await fontsAvailable(sharp))) {
    console.warn(
      `[build-og-image] Warning: Inter/Fraunces were not found by fontconfig.\n` +
        `  The card will render with a fallback font. Install the brand fonts\n` +
        `  (see the header of this file) and re-run for correct branding.\n`
    );
  }

  mkdirSync(outDir, { recursive: true });

  const base = sharp(Buffer.from(svg), { density: 144 }).resize(WIDTH, HEIGHT, {
    fit: "cover",
    position: "center",
  });

  const jpgPath = join(outDir, "og-image.jpg");
  const pngPath = join(outDir, "og-image.png");

  await base.clone().jpeg({ quality: 92, mozjpeg: true, chromaSubsampling: "4:2:0" }).toFile(jpgPath);
  await base.clone().png({ compressionLevel: 9 }).toFile(pngPath);

  const meta = await sharp(jpgPath).metadata();
  console.log(`[build-og-image] Wrote ${jpgPath} (${meta.width}x${meta.height})`);
  console.log(`[build-og-image] Wrote ${pngPath} (${meta.width}x${meta.height})`);
}

main().catch((err) => {
  console.error("[build-og-image] Failed:", err);
  process.exit(1);
});
