// The OG card and app icon are drawn at build time by satori, which reads font files
// straight off disk. Those files are easy to prune by accident when the site's webfonts
// change, and the failure is a silently ugly social card. This checks they still exist
// and are still in a format satori can parse (ttf/otf/woff — never woff2).
import assert from "node:assert/strict";
import { existsSync, readFileSync, statSync } from "node:fs";
import { dirname, extname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const read = (file) => readFileSync(join(root, file), "utf8");

const og = read("lib/og.tsx");
const referenced = [...og.matchAll(/readFile\(join\(\w+,\s*"([^"]+)"\)\)/g)].map((m) => m[1]);
assert.ok(referenced.length >= 2, "lib/og.tsx should load its fonts with readFile(join(dir, ...))");

const SATORI_OK = new Set([".ttf", ".otf", ".woff"]);
for (const name of referenced) {
  const path = join(root, "lib/fonts", name);
  assert.ok(existsSync(path), `lib/fonts/${name} is missing, but lib/og.tsx reads it`);
  assert.ok(statSync(path).size > 1000, `lib/fonts/${name} looks empty`);
  assert.ok(
    SATORI_OK.has(extname(name)),
    `lib/fonts/${name}: satori cannot parse ${extname(name)} (use ttf, otf or woff)`,
  );
}

// Both image routes must keep their metadata exports, or Next silently drops the tags.
for (const [file, fields] of [
  ["app/opengraph-image.tsx", ["alt", "size", "contentType"]],
  ["app/apple-icon.tsx", ["size", "contentType"]],
]) {
  const source = read(file);
  for (const field of fields) {
    assert.match(source, new RegExp(`export const ${field}`), `${file} must export ${field}`);
  }
  assert.match(source, /ogFonts\(\)/, `${file} should use the shared ogFonts() loader`);
}

// Fonts we ship are licensed; keep the licenses next to them.
for (const license of ["FrederickaTheGreat-OFL.txt", "IBMPlexMono-OFL.txt"]) {
  assert.ok(existsSync(join(root, "lib/fonts", license)), `lib/fonts/${license} is missing`);
}

console.log(`asset checks passed (${referenced.length} fonts: ${referenced.join(", ")})`);
