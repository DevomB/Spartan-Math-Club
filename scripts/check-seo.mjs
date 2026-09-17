// Static checks that public routes, metadata, and robots stay wired up.
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const read = (file) => readFileSync(join(root, file), "utf8");

const seo = read("lib/seo.ts");
const pathsLine = seo.split("\n").find((line) => line.includes("PUBLIC_PATHS ="));
assert.ok(pathsLine, "PUBLIC_PATHS is declared");
const paths = [...pathsLine.matchAll(/"(\/[a-z-]*)"/g)].map((match) => match[1]);

for (const path of paths) {
  const page = path === "/" ? "app/page.tsx" : `app${path}/page.tsx`;
  assert.ok(existsSync(join(root, page)), `${path} has ${page}`);
  if (path !== "/") assert.match(read(page), /pageMetadata\(/, `${page} exports pageMetadata`);
}

assert.match(read("app/robots.ts"), /robotsSpec/);
assert.match(read("app/sitemap.ts"), /sitemapEntries/);
assert.match(read("app/layout.tsx"), /rootMetadata/);
assert.match(read("app/layout.tsx"), /StructuredData/);
assert.match(read("app/not-found.tsx"), /index: false/);

console.log("seo checks passed");
