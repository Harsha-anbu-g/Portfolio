#!/usr/bin/env node
// Pre-review checks for the Why Towinly page. Prints every problem it finds and exits 1.
import { readdirSync, readFileSync, existsSync, statSync } from "node:fs";
import { join, extname } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname;
const DATA = join(ROOT, "src/data/towinly");
const PUBLIC = join(ROOT, "public/towinly");
const TAB_IDS = ["elders", "helpers", "family", "story", "technical", "ai"];
const BRAND = [
  "It takes two To Win.",
  "Help is easy to find. Trust takes time.",
  "Slow is the point.",
  "Company isn't a luxury. Company is healthcare.",
];
const problems = [];

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
}

const files = walk(DATA).filter((p) => [".js", ".json", ".html"].includes(extname(p)));
const texts = Object.fromEntries(files.map((p) => [p, readFileSync(p, "utf8")]));
const rel = (p) => p.replace(ROOT, "");

// 1. No em dash anywhere a stranger reads.
for (const [p, t] of Object.entries(texts)) {
  t.split("\n").forEach((line, i) => {
    if (line.includes("—")) problems.push(`em dash: ${rel(p)}:${i + 1}`);
  });
}

// 2. Every screenshot and artwork named in data exists as a WebP with a manifest entry.
const manifestPath = join(DATA, "generated/manifest.json");
const manifest = existsSync(manifestPath) ? JSON.parse(readFileSync(manifestPath, "utf8")) : {};
const names = (file) => [...(texts[join(DATA, file)] || "").matchAll(/file: "([a-z0-9-]+)"/g)].map((m) => m[1]);
const shotNames = names("screenshots.js");
const artNames = names("artworks.js");
for (const n of shotNames) {
  if (!existsSync(join(PUBLIC, "shots", `${n}.webp`))) problems.push(`missing shot: ${n}.webp`);
  if (!manifest[n]) problems.push(`no size in manifest: ${n}`);
}
for (const n of artNames) {
  if (!existsSync(join(PUBLIC, "social", `${n}.webp`))) problems.push(`missing artwork: ${n}.webp`);
  if (!manifest[n]) problems.push(`no size in manifest: ${n}`);
}

// 3. Section ids are unique across the page and every #link points at one of them (or a tab).
const ids = [];
for (const [p, t] of Object.entries(texts)) {
  if (p.endsWith("tabs.js") || p.includes("generated/")) continue;
  // A tab file's own top-level `id: "elders"` is the tab, not a section; skip those.
  for (const m of t.matchAll(/^\s*id: "([a-z0-9-]+)"/gm)) if (!TAB_IDS.includes(m[1])) ids.push(m[1]);
  for (const m of t.matchAll(/<section id="([a-z0-9-]+)"/g)) ids.push(m[1]);
}
const seen = new Set();
for (const id of ids) {
  if (seen.has(id)) problems.push(`duplicate id: ${id}`);
  seen.add(id);
}
for (const [p, t] of Object.entries(texts)) {
  for (const m of t.matchAll(/href: "#([a-z0-9-]+)"/g)) {
    if (!seen.has(m[1]) && !TAB_IDS.includes(m[1])) problems.push(`dead link #${m[1]} in ${rel(p)}`);
  }
}

// 4. The four brand lines appear only in their exact form.
const all = Object.values(texts).join("\n");
const looseness = [
  [/it takes two to win/gi, BRAND[0]],
  [/help is easy to find\.? trust takes time/gi, BRAND[1]],
  [/slow is the point/gi, BRAND[2]],
  [/company isn.t a luxury/gi, BRAND[3]],
];
for (const [re, exact] of looseness) {
  const loose = (all.match(re) || []).length;
  const strict = all.split(exact).length - 1;
  if (loose !== strict) problems.push(`brand line altered somewhere: "${exact}" (${loose} loose, ${strict} exact)`);
}

if (problems.length) {
  console.error(problems.join("\n"));
  console.error(`\n${problems.length} problem(s).`);
  process.exit(1);
}
console.log(
  `check-towinly: ok (${files.length} data files, ${shotNames.length} shots, ${artNames.length} artworks, ${seen.size} ids)`
);
