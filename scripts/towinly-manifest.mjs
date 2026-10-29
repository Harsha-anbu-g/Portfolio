#!/usr/bin/env node
// Records the real pixel size of every WebP the page serves, so <img> tags can declare
// width and height and the layout never shifts. Uses ImageMagick's identify.
import { execFileSync } from "node:child_process";
import { readdirSync, writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname;
const dirs = ["shots", "social", "photos"].map((d) => join(ROOT, "public/towinly", d));
const manifest = {};
for (const dir of dirs) {
  for (const name of readdirSync(dir).filter((n) => n.endsWith(".webp"))) {
    const out = execFileSync("magick", ["identify", "-format", "%w %h", join(dir, name)], { encoding: "utf8" });
    const [w, h] = out.trim().split(" ").map(Number);
    manifest[name.replace(/\.webp$/, "")] = { w, h };
  }
}
const gen = join(ROOT, "src/data/towinly/generated");
mkdirSync(gen, { recursive: true });
writeFileSync(join(gen, "manifest.json"), JSON.stringify(manifest, null, 2) + "\n");
console.log(`manifest: ${Object.keys(manifest).length} images`);
