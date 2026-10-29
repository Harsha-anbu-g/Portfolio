#!/usr/bin/env node
// Pulls the owner-approved Instagram captions (problem run 33 to 36, "How Towinly began"
// 37, 38, 39, 42, 40, 41, plus 02 and 47) and the artwork alt text out of the marketing
// sources, word for word, so the page never retypes them. Drops hashtags and the
// "website is live" sign-off line.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const MK = "/Users/aghar/Documents/Projects/ToWin App/marketing";
const captions = readFileSync(join(MK, "CAPTIONS-TO-POST.txt"), "utf8").split("\n");
const altFile = readFileSync(join(MK, "instagram/captions.md"), "utf8").split("\n");
const POSTS = ["33", "34", "35", "36", "37", "38", "39", "42", "40", "41", "02", "47"];
const isRule = (l) => /^=+$/.test(l) || /^#+$/.test(l);

function captionBlock(n) {
  const start = captions.findIndex((l) => l.startsWith(`IMAGE: towinly-ig-${n}-`));
  if (start < 0) throw new Error(`post ${n} not found`);
  const file = captions[start].replace("IMAGE: ", "").replace(/\.png$/, "");
  let i = start + 1;
  while (i < captions.length && !isRule(captions[i])) i++; // the WHEN line and any notes
  i++;
  const body = [];
  for (; i < captions.length && !isRule(captions[i]); i++) body.push(captions[i]);
  const paragraphs = body
    .map((s) => s.replace(/\s*🐢\s*$/, "").replace(/^🐢\s*/, "").trim())
    .filter((s) => s && !s.startsWith("#") && !/^The website is live now/.test(s) && !/Link in bio/.test(s));
  let part = null;
  const m = paragraphs[0]?.match(/^Part (\d) of 6\.$/);
  if (m) {
    part = Number(m[1]);
    paragraphs.shift();
  }
  const title = paragraphs.shift();
  return { file, part, title, paragraphs };
}

function altText(file) {
  const at = altFile.findIndex((l) => l.includes(`posts/${file}.png`));
  if (at < 0) throw new Error(`alt text for ${file} not found`);
  const lines = [];
  for (let i = at + 1; i < altFile.length && altFile[i].trim(); i++) lines.push(altFile[i].trim());
  // The artwork's foot carries the brand line exactly; the alt text describes it in title case.
  return lines.join(" ").replace(/it takes two to win\.?/gi, "It takes two To Win.");
}

const out = {};
for (const n of POSTS) {
  const block = captionBlock(n);
  out[n] = { ...block, alt: altText(block.file) };
}
const gen = new URL("../src/data/towinly/generated/", import.meta.url).pathname;
mkdirSync(gen, { recursive: true });
writeFileSync(join(gen, "captions.json"), JSON.stringify(out, null, 2) + "\n");
console.log(`captions: ${Object.keys(out).length} posts`);
