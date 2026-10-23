#!/usr/bin/env node
/**
 * postinstall: guarantee executable permissions on package binaries.
 *
 * WHY THIS EXISTS
 * ---------------
 * If `node_modules` is ever committed to git, the files are checked out on the
 * deploy server WITHOUT their executable bit (git stores the mode, but a
 * committed node_modules tree is routinely normalised / checked out as 644).
 * Vite and esbuild are then unrunnable and the build dies with:
 *
 *   sh: 1: vite: Permission denied
 *   Error: The service was stopped: spawn .../@esbuild/linux-x64/bin/esbuild EACCES
 *
 * This script is a safety net: it re-applies +x to every file in
 * node_modules/.bin and to the native esbuild binary for the current platform.
 *
 * It is a no-op on a normal, healthy install (files are already executable),
 * and it is harmless on Windows (chmod is ignored there).
 */
import { chmodSync, existsSync, readdirSync, statSync, lstatSync } from "node:fs";
import { join } from "node:path";

const targets = [];

// 1) Everything npm linked into node_modules/.bin
const binDir = join(process.cwd(), "node_modules", ".bin");
if (existsSync(binDir)) {
  for (const entry of readdirSync(binDir)) {
    targets.push(join(binDir, entry));
  }
}

// 2) Native platform binaries that Vite spawns directly (not via .bin)
const esbuildDir = join(process.cwd(), "node_modules", "@esbuild");
if (existsSync(esbuildDir)) {
  try {
    for (const platform of readdirSync(esbuildDir)) {
      const bin = join(esbuildDir, platform, "bin", "esbuild");
      if (existsSync(bin)) targets.push(bin);
    }
  } catch {
    /* ignore */
  }
}

const rollupDir = join(process.cwd(), "node_modules", "@rollup");
if (existsSync(rollupDir)) {
  try {
    for (const platform of readdirSync(rollupDir)) {
      const nativeDir = join(rollupDir, platform);
      try {
        for (const f of readdirSync(nativeDir)) {
          if (f.endsWith(".node")) targets.push(join(nativeDir, f));
        }
      } catch {
        /* ignore */
      }
    }
  } catch {
    /* ignore */
  }
}

let fixed = 0;
let checked = 0;

for (const file of targets) {
  // Never follow symlinks — chmod the link itself, which is what loses its mode.
  try {
    if (!lstatSync(file).isFile() && !lstatSync(file).isSymbolicLink()) continue;
  } catch {
    continue;
  }

  checked++;
  try {
    const mode = statSync(file).mode & 0o777;
    if ((mode & 0o111) !== 0o111) {
      chmodSync(file, mode | 0o111);
      fixed++;
    }
  } catch {
    /* best effort — never fail the install */
  }
}

if (process.env.DEBUG_PERMS) {
  console.log(`[fix-perms] checked ${checked} binaries, re-executable ${fixed}`);
}
