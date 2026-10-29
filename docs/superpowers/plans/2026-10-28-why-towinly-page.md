# Why Towinly Page Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.
>
> In this project the owner's standing rule is "subagents only when I ask", so this plan is executed in-session with superpowers:executing-plans. Plan review is done inline by the author (same reason).

**Goal:** Ship `harshavardhanag.com/towinly/`, one interactive page that explains Towinly to six kinds of reader (elders, helpers, family, story, technical, AI) in the portfolio's Paper & Gold design, with the old AI case study folded in as a tab.

**Architecture:** A second Vite entry (`towinly/index.html` → `src/towinly/main.jsx`) renders `TowinlyPage`: a top bar, a hero with a six-card reader chooser, a sticky `role=tablist` bar, and one generic `TabPanel` that renders whichever tab's data file is active. All words live in `src/data/towinly/` (one file per tab, plus small shared data files and two JSON files generated from the Towinly marketing sources so caption text is never retyped). The AI tab renders the old page's body as a raw HTML fragment with its CSS nested under `.ai-tab`. Hash routing (`#elders`, `#ladder`) gives every tab and section a shareable link.

**Tech Stack:** React 19, Vite 6 (multi-page build), Tailwind 4 only for the few utilities the site already uses, plain CSS on the site's tokens, `cwebp` + ImageMagick for assets, Node scripts (no new npm dependencies), no test runner (verification = `vite build`, `eslint`, `scripts/check-towinly.mjs`, localhost review).

**Spec:** `docs/superpowers/specs/2026-10-28-why-towinly-page-design.md` (the facts, section lists and rules live there; this plan does not repeat them).

**Working rules for every task:**
- Branch `feat/why-towinly`. Small local commits. No push. No `Co-Authored-By` line in any commit.
- `ToWin/` under the ToWin App project is read-only. Scripts read from it; nothing writes there.
- No em dashes in anything a stranger reads. Plain words. Both sides named (elder and younger helper).
- Keep each new file under 400 lines; split before it gets there.

---

## File structure

```
towinly/index.html                          entry page: title, meta, OG, fonts, <div id="root">
vite.config.js                              + rollupOptions.input for the second entry
scripts/towinly-assets.sh                   PNG → WebP (shots 480w, artworks 540w), commit counts
scripts/towinly-manifest.mjs                reads real pixel sizes → generated/manifest.json
scripts/towinly-captions.mjs                captions file → generated/captions.json (word for word)
scripts/check-towinly.mjs                   the pre-review checks (dashes, files, ids, brand lines)
src/towinly/main.jsx                        mounts TowinlyPage (imports ../index.css + towinly.css)
src/towinly/TowinlyPage.jsx                 shell: TopBar, Hero+Chooser, TabBar, TabPanel|AiTab, Footer
src/towinly/useTabRoute.js                  hash <-> {tab, section}; go(), home()
src/towinly/towinly.css                     page styles on top of index.css tokens
src/towinly/ai-casestudy.css                the old AI page CSS nested under .ai-tab
src/towinly/icons.jsx                       the small inline SVG set (no emoji)
src/towinly/components/TopBar.jsx
src/towinly/components/Hero.jsx             mark, tagline, lead; compact when a tab is open
src/towinly/components/ReaderChooser.jsx    the six big cards
src/towinly/components/TabBar.jsx           role=tablist, arrow keys, sticky
src/towinly/components/TabSubnav.jsx        "On this page" rail / chip row with scroll-spy
src/towinly/components/TabPanel.jsx         renders one tab's data: heading, lead, sections
src/towinly/components/Chapter.jsx          one section: heading + copy-link, body, More, extra
src/towinly/components/Extra.jsx            the switch from section.extra to a component
src/towinly/components/Disclosure.jsx       styled <details> ("More about this")
src/towinly/components/PhoneGallery.jsx     iPhone frame + thumbnails
src/towinly/components/TrustLadder.jsx      seven rungs, tap-through
src/towinly/components/TrustScoreMeter.jsx  3 + 7 + 5 = 15
src/towinly/components/DemoCast.jsx         cards, role filter, Try-as links
src/towinly/components/Timeline.jsx
src/towinly/components/StatTiles.jsx
src/towinly/components/ArchitectureFigure.jsx
src/towinly/components/ArtworkStrip.jsx     Instagram artworks with tap-open captions
src/towinly/components/SocialRow.jsx
src/towinly/components/ClosingCard.jsx
src/towinly/components/AiTab.jsx            raw fragment
src/towinly/components/Footer.jsx
src/data/towinly/tabs.js                    TABS order + SECTION_INDEX (section id → tab id)
src/data/towinly/elders.js … story.js … technical.js   one per tab (words)
src/data/towinly/ladder.js, score.js, cast.js, timeline.js, facts.js, links.js,
                   screenshots.js, artworks.js, ai.js (sections parsed from the fragment)
src/data/towinly/ai-casestudy.html          the old page's <main> body, minus hero h1 and toc
src/data/towinly/generated/manifest.json    { "elder-home": {w,h}, … } from the asset script
src/data/towinly/generated/captions.json    { "37": {file, part, title, paragraphs, alt}, … }
src/data/towinly/generated/facts.json       { webCommits, appCommits, countedOn }
public/towinly/shots/*.webp, public/towinly/social/*.webp
public/towinly-ai.html                      forwarding page (meta refresh → /towinly/#ai)
src/data/profile.js, src/components/FeaturedProject.jsx   new "Why Towinly" card; AI card → /towinly/#ai
tasks/todo.md                               checklist and review notes
```

**Data file contract (every tab file exports this shape):**

```js
export default {
  id: "elders",                 // tab id, equals the hash
  title: "For elders",          // panel heading (h2)
  lead: "One or two plain sentences.",
  bodySize: "lg",               // "lg" = 18px body (elders only), otherwise 17px
  sections: [
    {
      id: "ask-help",           // unique across the whole page; becomes #ask-help
      title: "Ask for help in one screen",
      body: ["Paragraph.", "Paragraph."],          // 2 to 4 short paragraphs
      more: ["Detail paragraph."],                 // optional, behind "More about this"
      shots: ["elder-home", "elder-ask-help"],     // optional, names in screenshots.js
      extra: "ladder",          // optional: ladder | ladder-compact | score | cast | cast:helpers |
                                //   cast:family | timeline | stats | architecture | artworks:problem |
                                //   artworks:origin | artworks:online | social | closing | steps | list
      steps: ["Wish.", …],      // only with extra: "steps" (numbered list)
      items: ["Claude Code", …],// only with extra: "list" (bulleted list)
      links: [{ label: "The seven steps, in full", href: "#ladder" }], // optional
    },
  ],
};
```

Section ids, fixed now so links and the check script agree:

- elders: `for-you ask-help trust-score ladder friends messages check-in sos family-watch boxes reunions ask-ai peekaboo languages safety demo elders-iphone`
- helpers: `h-nearby h-score h-ladder h-love-first h-passed-on h-reunions h-safety h-demo`
- family: `f-account f-journey f-powers f-check-in f-keyholders f-switch f-demo`
- story: `s-new-elder s-problem-run s-two-things s-origin-run s-why-now s-why-matters s-solution s-what-ships s-why-we-win s-business s-team s-built-how s-numbers iphone-app s-built-live s-ask s-online s-closing` (the six "How Towinly began" parts render inside `s-origin-run` as one strip, in order, each with its "Part N of 6" eyebrow; parts are not individually linkable, which keeps the id index honest)

**Class names reserved by the old AI page's CSS (nested under `.ai-tab`, but our own global rules would still leak into it):** `hero eyebrow lead section-label block step steps timeline stat pill wrap prose qa foot topbar toc table-wrap glossary why dateline aside-note stack`. Page-level classes in `towinly.css` must not reuse these names: use `page-hero page-eyebrow page-lead page-wrap page-topbar page-foot page-timeline stat-tile prose-col reunion-steps`.
- technical: `t-picture t-stack t-numbers t-state-machine t-score t-events t-api-first t-security t-quality t-method t-links`
- ai: whatever `<section id="…">` the fragment carries (`one-minute timeline steps privacy built production numbers todo where tools next questions before-after openai glossary`)

---

## Chunk 1: Branch, assets, generated data, checks

### Task 1: Branch and todo

**Files:**
- Modify: `tasks/todo.md` (the 2026-10-28 entry, "Checklist")

- [ ] **Step 1: Create the branch**

Run: `cd /Users/aghar/Documents/Projects/Portfolio && git checkout -b feat/why-towinly`
Expected: `Switched to a new branch 'feat/why-towinly'`

- [ ] **Step 2: Replace the "(filled in by the implementation plan…)" line under `## Checklist` with the task list of this plan (Tasks 1 to 22, one `- [ ]` each), and add under the queue: `6. [ ] Tell the iPhone app clearly (its own section)` and `7. [ ] All social links, Towinly's and Harsha's`.**

- [ ] **Step 3: Commit**

```bash
git add tasks/todo.md && git commit -q -m "docs: checklist for the Why Towinly page"
```

### Task 2: The check script first (it fails until the page exists)

**Files:**
- Create: `scripts/check-towinly.mjs`

- [ ] **Step 1: Write the script**

```js
#!/usr/bin/env node
// Pre-review checks for the Why Towinly page. Exit 1 on the first class of failure.
import { readdirSync, readFileSync, existsSync, statSync } from "node:fs";
import { join, extname } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname;
const DATA = join(ROOT, "src/data/towinly");
const PUBLIC = join(ROOT, "public/towinly");
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

// 1. No em dash anywhere a stranger reads.
for (const [p, t] of Object.entries(texts)) {
  t.split("\n").forEach((line, i) => {
    if (line.includes("—")) problems.push(`em dash: ${p}:${i + 1}`);
  });
}

// 2. Every screenshot and artwork named in data exists as a WebP with a manifest entry.
const manifest = JSON.parse(readFileSync(join(DATA, "generated/manifest.json"), "utf8"));
const shotNames = [...(texts[join(DATA, "screenshots.js")] || "").matchAll(/file: "([a-z0-9-]+)"/g)].map((m) => m[1]);
const artNames = [...(texts[join(DATA, "artworks.js")] || "").matchAll(/file: "([a-z0-9-]+)"/g)].map((m) => m[1]);
for (const n of shotNames) {
  if (!existsSync(join(PUBLIC, "shots", `${n}.webp`))) problems.push(`missing shot: ${n}.webp`);
  if (!manifest[n]) problems.push(`no size in manifest: ${n}`);
}
for (const n of artNames) {
  if (!existsSync(join(PUBLIC, "social", `${n}.webp`))) problems.push(`missing artwork: ${n}.webp`);
  if (!manifest[n]) problems.push(`no size in manifest: ${n}`);
}

// 3. Section ids are unique across the page and every #link points at one of them (or a tab).
const TAB_IDS = ["elders", "helpers", "family", "story", "technical", "ai"];
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
    if (!seen.has(m[1]) && !TAB_IDS.includes(m[1])) problems.push(`dead link #${m[1]} in ${p}`);
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
  if (loose !== strict) problems.push(`brand line altered somewhere: "${exact}"`);
}

if (problems.length) {
  console.error(problems.join("\n"));
  console.error(`\n${problems.length} problem(s).`);
  process.exit(1);
}
console.log(`check-towinly: ok (${files.length} data files, ${shotNames.length} shots, ${artNames.length} artworks, ${seen.size} ids)`);
```

- [ ] **Step 2: Run it, expect failure (nothing exists yet)**

Run: `node scripts/check-towinly.mjs`
Expected: an error ending in `ENOENT` for `src/data/towinly` (the directory does not exist). That is the red state.

- [ ] **Step 3: Commit**

```bash
git add scripts/check-towinly.mjs && git commit -q -m "chore: check script for the Why Towinly page"
```

### Task 3: Assets (screenshots, artworks, sizes, commit counts)

**Files:**
- Create: `scripts/towinly-assets.sh`, `scripts/towinly-manifest.mjs`
- Create (generated): `public/towinly/shots/*.webp`, `public/towinly/social/*.webp`, `src/data/towinly/generated/manifest.json`, `src/data/towinly/generated/facts.json`

Decision carried from the spec: the user-guide PDFs (5.6 to 17.9 MB each) are NOT copied into this repo. The Technical tab points at the in-app guide (shot `guide`) instead.

- [ ] **Step 1: Write the asset script**

```bash
#!/usr/bin/env bash
# Converts the Towinly screenshots and Instagram artworks this page uses into small WebP
# files, and records the commit counts. Reads only; never writes into the Towinly projects.
set -euo pipefail
SRC="/Users/aghar/Documents/Projects/ToWin App"
WEB="/Users/aghar/Documents/Projects/ToWin"
SHOTS="$SRC/docs/user-guide/screenshots/ios-framed"
POSTS="$SRC/marketing/instagram/posts"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT="$ROOT/public/towinly"
GEN="$ROOT/src/data/towinly/generated"
mkdir -p "$OUT/shots" "$OUT/social" "$GEN"

SHOT_LIST="elder-home elder-ask-help elder-posted-help elder-trust elder-trust-people elder-home-building-trust \
elder-friends elder-friends-invites elder-messages elder-chat-ethan elder-checkin elder-emergency-contacts \
elder-family elder-family-sharing elder-pass-on elder-story-detail elder-sealed-items elder-pass-on-sheet \
elder-ask-ai game-menu-elder elder-profile elder-updates guide \
helper-home helper-job-open helper-offer-help helper-my-jobs helper-ladder-open helper-reviews-card helper-passed-on \
family-home family-parent family-parent-today family-parent-cando \
landing-01 login register-role"

ART_LIST="towinly-ig-02-trust-ladder towinly-ig-33-stranger-at-the-door towinly-ig-34-all-fine-here \
towinly-ig-35-a-quiet-week towinly-ig-36-she-pays-online-now towinly-ig-37-first-digital-elders \
towinly-ig-38-the-mix towinly-ig-39-how-i-found-the-trust-ladder towinly-ig-42-how-i-built-trust-2 \
towinly-ig-40-where-the-boxes-came-from towinly-ig-41-team-of-one towinly-ig-47-five-people-one-switch"

for n in $SHOT_LIST; do
  cwebp -quiet -q 80 -resize 480 0 "$SHOTS/$n.png" -o "$OUT/shots/$n.webp"
done
for n in $ART_LIST; do
  cwebp -quiet -q 82 -resize 540 0 "$POSTS/$n.png" -o "$OUT/social/$n.webp"
done

node "$ROOT/scripts/towinly-manifest.mjs"

WEB_COMMITS=$(git -C "$WEB" rev-list --count origin/main)
APP_COMMITS=$(git -C "$SRC/App" rev-list --count origin/main)
printf '{ "webCommits": %s, "appCommits": %s, "countedOn": "%s" }\n' \
  "$WEB_COMMITS" "$APP_COMMITS" "$(date +%Y-%m-%d)" > "$GEN/facts.json"

du -sh "$OUT/shots" "$OUT/social"
cat "$GEN/facts.json"
```

- [ ] **Step 2: Write the manifest script**

```js
#!/usr/bin/env node
// Records the real pixel size of every WebP the page serves, so <img> tags can declare
// width and height and the layout never shifts. Uses ImageMagick's identify.
import { execFileSync } from "node:child_process";
import { readdirSync, writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname;
const dirs = [join(ROOT, "public/towinly/shots"), join(ROOT, "public/towinly/social")];
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
```

- [ ] **Step 3: Run it**

Run: `chmod +x scripts/towinly-assets.sh && bash scripts/towinly-assets.sh`
Expected: no errors; `manifest: 49 images`; `du` shows shots around 1.2M and social around 300K; `facts.json` printed with `webCommits` 937 or more and `appCommits` 472 or more.

- [ ] **Step 4: Spot-check one image and one size**

Run: `magick identify public/towinly/shots/elder-home.webp && node -e 'console.log(JSON.parse(require("fs").readFileSync("src/data/towinly/generated/manifest.json","utf8"))["elder-home"])'`
Expected: `480x1034` (or 1033) and `{ w: 480, h: 1034 }` matching.

- [ ] **Step 5: Commit**

```bash
git add scripts/towinly-assets.sh scripts/towinly-manifest.mjs public/towinly src/data/towinly/generated
git commit -q -m "feat(towinly): screenshots and artworks as WebP, with a size manifest"
```

### Task 4: Captions, word for word, from the marketing file

**Files:**
- Create: `scripts/towinly-captions.mjs`
- Create (generated): `src/data/towinly/generated/captions.json`

- [ ] **Step 1: Write the extractor**

```js
#!/usr/bin/env node
// Pulls the owner-approved Instagram captions (problem run 33 to 36, "How Towinly began"
// 37, 38, 39, 42, 40, 41) and the artwork alt text out of the marketing sources, word for
// word, so the page never retypes them. Drops hashtags and the "website is live" sign-off.
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
  while (i < captions.length && !isRule(captions[i])) i++; // WHEN line and notes
  i++;
  const body = [];
  for (; i < captions.length && !isRule(captions[i]); i++) body.push(captions[i]);
  const paragraphs = body
    .map((s) => s.replace(/\s*🐢\s*$/, "").trim())
    .filter((s) => s && !s.startsWith("#") && !/^The website is live now/.test(s) && !/Link in bio/.test(s));
  let part = null;
  const m = paragraphs[0]?.match(/^Part (\d) of 6\.$/);
  if (m) { part = Number(m[1]); paragraphs.shift(); }
  const title = paragraphs.shift();
  return { file, part, title, paragraphs };
}

function altText(file) {
  const at = altFile.findIndex((l) => l.includes(`posts/${file}.png`));
  if (at < 0) throw new Error(`alt text for ${file} not found`);
  const lines = [];
  for (let i = at + 1; i < altFile.length && altFile[i].trim(); i++) lines.push(altFile[i].trim());
  return lines.join(" ");
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
```

- [ ] **Step 2: Run and read the output**

Run: `node scripts/towinly-captions.mjs && node -e 'const c=require("./src/data/towinly/generated/captions.json"); for (const k of ["37","41","33","02"]) console.log(k, c[k].part, "|", c[k].title, "|", c[k].paragraphs.length, "paras |", c[k].alt.slice(0,60))'`
Expected: `captions: 12 posts`; 37 → part 1, title "The thing I saw that I think no one else noticed.", 6 paragraphs ending with the signature; 41 → part 6; 33 → part null, title "A stranger rings your mother's doorbell."; 02 → part null with a title and alt text. No line contains `#` or "Link in bio". If post 02's caption block has 🐢 bullet lines, they survive as paragraphs without the emoji; that is fine.

- [ ] **Step 3: Commit**

```bash
git add scripts/towinly-captions.mjs src/data/towinly/generated/captions.json
git commit -q -m "feat(towinly): captions pulled word for word from the marketing sources"
```

### Task 5: The AI fragment and its scoped CSS

**Files:**
- Create: `src/data/towinly/ai-casestudy.html` (from `public/towinly-ai.html` lines 505 to 1157, the `<main>` contents)
- Create: `src/towinly/ai-casestudy.css` (from lines 31 to 489, nested under `.ai-tab`)
- Create: `src/data/towinly/ai.js`

- [ ] **Step 1: Extract the body**

Run:
```bash
mkdir -p src/data/towinly src/towinly
sed -n '506,1156p' public/towinly-ai.html > src/data/towinly/ai-casestudy.html
grep -n '<section class="hero">\|<nav class="toc"\|</nav>' src/data/towinly/ai-casestudy.html | head -4
```
Expected: the file starts with `  <section class="hero">` and the toc nav is near line 16 to 34. Then open the file and: delete the `<h1>…</h1>` line inside the hero (the tab has its own heading) but keep the hero's eyebrow, lead and `hero-stats`; delete the whole `<nav class="toc">…</nav>` block (the page's sub-nav replaces it). Confirm with `grep -c "<h1" src/data/towinly/ai-casestudy.html` → `0` and `grep -c 'class="toc"' …` → `0`.

- [ ] **Step 2: Extract and nest the CSS**

Run: `{ echo '.ai-tab {'; sed -n '31,489p' public/towinly-ai.html; echo '}'; } > src/towinly/ai-casestudy.css`
Then edit the file by hand:
- `:root {` → `& {` (the variables now live on `.ai-tab`).
- Delete the `html { … }` and `body { … }` blocks and any `.topbar`, `.toc`, `.foot` blocks (not rendered here).
- Leave everything else. Media queries nest fine under Lightning CSS (Vite's CSS pipeline), which flattens nesting for the build.
Check: `grep -n ":root\|^  html\|^  body\|\.topbar\|\.toc\|\.foot" src/towinly/ai-casestudy.css` → nothing.

- [ ] **Step 3: `src/data/towinly/ai.js`**

```js
// The AI tab's words are the old case-study page, moved in whole. Its section list is read
// out of the fragment so the sub-nav and the hash index can never drift from it.
import fragment from "./ai-casestudy.html?raw";

export const AI_FRAGMENT = fragment;

export const AI_SECTIONS = [...fragment.matchAll(/<section id="([a-z0-9-]+)"[^>]*>[\s\S]*?<h2>([^<]+)<\/h2>/g)]
  .map((m) => ({ id: m[1], title: m[2].replace(/&amp;/g, "&") }));

export default {
  id: "ai",
  title: "Everything AI in Towinly",
  lead: "How an in-app helper for elders grew into a twelve-step AI programme: retrieval over the user guide, tools, an MCP server, agents and eleven tested safety layers.",
  sections: AI_SECTIONS,
};
```

- [ ] **Step 4: Commit**

```bash
git add src/data/towinly/ai-casestudy.html src/towinly/ai-casestudy.css src/data/towinly/ai.js
git commit -q -m "feat(towinly): the AI case study as a tab fragment with scoped styles"
```

---

## Chunk 2: Shared data and the page shell

### Task 6: Shared data files

**Files:**
- Create: `src/data/towinly/tabs.js`, `links.js`, `screenshots.js`, `artworks.js`, `ladder.js`, `score.js`, `cast.js`, `timeline.js`, `facts.js`

- [ ] **Step 1: `links.js`** (every URL from spec section 8; export `TOWINLY_LINKS` and `HARSHA_LINKS`, each an array of `{ label, href, icon }` with icon names `globe | instagram | linkedin | github | mail | video | phone`; plus `DEMO_LOGIN = "https://www.towinly.com/login"`).

- [ ] **Step 2: `screenshots.js`**

```js
import manifest from "./generated/manifest.json";
// name → caption (one short line under the phone) and alt (what the screen shows).
const SHOTS = {
  "elder-home": { caption: "The elder's home screen", alt: "Towinly home screen for an elder: a greeting, the daily check-in row, and the Ask for help button." },
  // … one entry per name in scripts/towinly-assets.sh SHOT_LIST, written from the user-guide chapters
};
export const shot = (name) => ({ file: name, ...manifest[name], ...SHOTS[name] });
export const shots = (names) => names.map(shot);
```
Every entry's `file:` string must appear literally (the check script greps `file: "name"`), so write the table as `"elder-home": { file: "elder-home", caption: …, alt: … }` and drop the spread of `name` in `shot()`.

- [ ] **Step 3: `artworks.js`**

```js
import captions from "./generated/captions.json";
import manifest from "./generated/manifest.json";
const art = (n) => ({ file: captions[n].file, ...manifest[captions[n].file], ...captions[n] });
export const PROBLEM_RUN = ["33", "34", "35", "36"].map(art);
export const ORIGIN_RUN = ["37", "38", "39", "42", "40", "41"].map(art);   // parts 1 to 6 in order
export const ONLINE_ROW = ["02", "37", "38", "39", "42", "40", "41", "47"].map(art);
export const INSTAGRAM = "https://www.instagram.com/towinly.trust/";
```
The check script looks for `file: "…"`; add a comment line per artwork in the form `// file: "towinly-ig-37-first-digital-elders"` for all twelve so the existence check covers them.

- [ ] **Step 4: `ladder.js`** (seven rungs; names from `trustStages.js` FULL_STAGES; `what` and `unlocks` from the spec 4.1 item 4 and posts 44 and 46):

```js
export const LADDER = [
  { id: "just-connected", name: "Just Connected", what: "You see each other's profile and the Trust Score.", unlocks: "Nothing personal yet." },
  { id: "messaging", name: "Messaging", what: "A private chat inside the app.", unlocks: "Family you invited can now follow this friendship." },
  { id: "phone-ready", name: "Phone Ready", what: "Share numbers and call each other.", unlocks: "Your phone numbers, shown to each other only." },
  { id: "video-ready", name: "Video Ready", what: "A video call, so you see a face.", unlocks: "A face to go with the voice." },
  { id: "social-media", name: "Social Media", what: "Share social profiles, one more kind of evidence.", unlocks: "Each other's social links." },
  { id: "ready-to-meet", name: "Ready to Meet", what: "Plan a first meeting in a public place.", unlocks: "The people you named are told the day you meet." },
  { id: "fully-trusted", name: "Fully Trusted", what: "You met, and trust is earned.", unlocks: "A helper here can organise a reunion for you." },
];
export const LADDER_RULE = "Both must say yes to every step. Either side can pause or stop at any time.";
```

- [ ] **Step 5: `score.js`**

```js
export const SCORE_PARTS = [
  { key: "profile", points: 3, title: "Profile checked", body: "ID, phone and photo, all checked." },
  { key: "ladder", points: 7, title: "The seven steps", body: "One point for each step you climb together." },
  { key: "review", points: 5, title: "Their review", body: "One point per star from the person you helped." },
];
export const SCORE_MAX = 15;
export const SCORE_TIERS = [
  { name: "New Member", range: "0 points" },
  { name: "Getting Started", range: "1 to 14" },
  { name: "Reliable", range: "15 to 44" },
  { name: "Highly Trusted", range: "45 to 89" },
  { name: "Community Champion", range: "90 and above" },
];
```

- [ ] **Step 6: `cast.js`** (from `DemoDataSeeder.java` and `DemoAccountsCard.jsx`): `CAST` = 20 entries `{ role: "elder"|"helper"|"family", name, age, city, line }` (Margaret 73 retired teacher; demo Harsha 23 tech support volunteer; Sarah "Margaret's daughter"; Ruth; David's son "Davidson"; the Chennai, Coimbatore, Salem seats with their cities; Toronto seats say Toronto). `TRY_LINKS` = three `{ role, label: "Try as an Elder", who: "Margaret, 73", href: DEMO_LOGIN }`. `WORKED_EXAMPLE` = David Chen's three-day Toronto trip with Nina's pending offer (two sentences, from the memory note).

- [ ] **Step 7: `timeline.js`** (the milestones in spec 4.4 item 17, each `{ when: "11 Apr 2026", what: "The backend starts: Spring Boot, the first commit." }`), and `facts.js`:

```js
import gen from "./generated/facts.json";
export const FACTS = [
  { value: (gen.webCommits + gen.appCommits).toLocaleString("en-CA"), label: "commits on main, web and app", asOf: gen.countedOn },
  { value: "129", label: "REST endpoints, 22 controllers", asOf: "2026-10-28" },
  { value: "1,124", label: "backend tests", asOf: "2026-10-25" },
  { value: "1,401", label: "app tests, more since", asOf: "2026-08-29" },
  { value: "108", label: "MCP tools, generated from the API", asOf: "2026-10-25" },
  { value: "3", label: "languages: English, French, Tamil", asOf: "2026-10-28" },
  { value: "20", label: "demo seats to try", asOf: "2026-10-28" },
];
export const BUILD_LINE = "One person, about six and a half months so far, alongside a master's and a job search.";
export const AI_TOOLS = ["Claude Code (most of the work)", "Codex", "Cline", "Claude Design (the phone app redesign)", "ChatGPT", "Gemini (image and carousel work)", "HeyGen HyperFrames and Remotion (the reels)", "Expo EAS (phone builds)"];
```

- [ ] **Step 8: `tabs.js`**

```js
import elders from "./elders";
import helpers from "./helpers";
import family from "./family";
import story from "./story";
import technical from "./technical";
import ai from "./ai";

export const TABS = [
  { id: "elders", label: "I'm an elder", short: "Elders", icon: "elder", blurb: "What Towinly does for you, in plain words, with the real screens." },
  { id: "helpers", label: "I'm a helper", short: "Helpers", icon: "hands", blurb: "How you find people to help, and how your Trust Score grows." },
  { id: "family", label: "I'm family", short: "Family", icon: "home", blurb: "How you stay close to your parent, and what you can see and do." },
  { id: "story", label: "Tell me the story", short: "Story", icon: "book", blurb: "Why it exists, who built it, how, and how long it took." },
  { id: "technical", label: "I'm technical", short: "Technical", icon: "code", blurb: "The stack, the numbers, the trust state machine, security." },
  { id: "ai", label: "Show me the AI", short: "AI", icon: "spark", blurb: "Ask AI, retrieval, the MCP server, agents, safety layers." },
];
export const TAB_DATA = { elders, helpers, family, story, technical, ai };
export const SECTION_INDEX = Object.fromEntries(
  Object.values(TAB_DATA).flatMap((t) => t.sections.map((s) => [s.id, t.id]))
);
```
Until Tasks 10 to 14 exist, create the five tab files as stubs: `export default { id: "elders", title: "For elders", lead: "", sections: [] };` etc.

- [ ] **Step 9: Lint and commit**

Run: `npm run lint`
Expected: clean (unused exports are fine; unused imports are not).
```bash
git add src/data/towinly && git commit -q -m "feat(towinly): shared data: tabs, links, ladder, score, cast, timeline, facts"
```

### Task 7: Entry, Vite config, route hook

**Files:**
- Create: `towinly/index.html`, `src/towinly/main.jsx`, `src/towinly/useTabRoute.js`
- Modify: `vite.config.js`

- [ ] **Step 1: `vite.config.js`**

```js
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Two pages: the portfolio at / and the Why Towinly page at /towinly/.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL("./index.html", import.meta.url)),
        towinly: fileURLToPath(new URL("./towinly/index.html", import.meta.url)),
      },
    },
  },
});
```

- [ ] **Step 2: `towinly/index.html`** (same font link as `index.html`; title `Why Towinly | Harshavardhan Anbuchezhian Gowri`; description "Why Towinly exists, who built it, how, and what every feature does, explained for elders, helpers, families and engineers."; canonical and og:url `https://harshavardhanag.com/towinly/`; og:image the existing `/og-image.png?v=5`; `theme-color #201C15`; `<div id="root"></div>`; `<script type="module" src="/src/towinly/main.jsx"></script>`).

- [ ] **Step 3: `src/towinly/main.jsx`**

```jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../index.css";
import "./towinly.css";
import TowinlyPage from "./TowinlyPage.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <TowinlyPage />
  </StrictMode>
);
```

- [ ] **Step 4: `src/towinly/useTabRoute.js`**

```js
import { useCallback, useEffect, useState } from "react";
import { TABS, SECTION_INDEX } from "../data/towinly/tabs";

const TAB_IDS = new Set(TABS.map((t) => t.id));

/** "#elders" → tab; "#ladder" → the tab that holds it; anything else → the chooser. */
export function resolveHash(raw) {
  const id = (raw || "").replace(/^#/, "");
  if (!id) return { tab: null, section: null };
  if (TAB_IDS.has(id)) return { tab: id, section: null };
  const tab = SECTION_INDEX[id];
  return tab ? { tab, section: id } : { tab: null, section: null };
}

export default function useTabRoute() {
  const [route, setRoute] = useState(() => resolveHash(window.location.hash));

  useEffect(() => {
    const onHash = () => setRoute(resolveHash(window.location.hash));
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  // Setting location.hash adds a history entry and fires hashchange, so back and
  // forward move between tabs for free.
  const go = useCallback((id) => {
    if (window.location.hash === `#${id}`) setRoute(resolveHash(`#${id}`));
    else window.location.hash = id;
  }, []);

  const home = useCallback(() => {
    window.history.pushState(null, "", window.location.pathname + window.location.search);
    setRoute({ tab: null, section: null });
  }, []);

  return { ...route, go, home };
}
```

- [ ] **Step 5: A placeholder `TowinlyPage.jsx` and empty `towinly.css`, then prove both pages build**

`TowinlyPage.jsx` for now: `export default function TowinlyPage() { return <main><h1>Why Towinly</h1></main>; }`

Run: `npm run build && ls dist dist/towinly`
Expected: `dist/index.html` and `dist/towinly/index.html` both exist; no warnings about the input.

Run: `npm run dev` (note the port the log prints, usually 5176) then `curl -s http://localhost:5176/towinly/ | grep -c "main.jsx"` → `1`. Stop the dev server.

- [ ] **Step 6: Commit**

```bash
git add towinly/index.html vite.config.js src/towinly && git commit -q -m "feat(towinly): second Vite entry at /towinly/ with hash routing"
```

### Task 8: Shell components (TopBar, Hero, ReaderChooser, TabBar, Footer, icons)

**Files:**
- Create: `src/towinly/icons.jsx`, `components/TopBar.jsx`, `components/Hero.jsx`, `components/ReaderChooser.jsx`, `components/TabBar.jsx`, `components/Footer.jsx`
- Modify: `src/towinly/TowinlyPage.jsx`, `src/towinly/towinly.css`

- [ ] **Step 1: `icons.jsx`**: one `Icon({ name, size = 20 })` component returning an inline `<svg>` (stroke currentColor, strokeWidth 1.8, round caps) for `elder hands home book code spark globe instagram linkedin github mail video phone arrow link check`. Keep each path simple; `aria-hidden="true"` always.

- [ ] **Step 2: `TabBar.jsx`**

```jsx
import { useEffect, useRef } from "react";
import { TABS } from "../../data/towinly/tabs";
import Icon from "../icons";

export default function TabBar({ active, onSelect, barRef }) {
  const refs = useRef([]);
  const activeIndex = Math.max(0, TABS.findIndex((t) => t.id === active));

  // Keep the active tab visible inside the horizontal scroller on phones.
  useEffect(() => {
    refs.current[activeIndex]?.scrollIntoView({ block: "nearest", inline: "center" });
  }, [activeIndex]);

  const onKeyDown = (event, index) => {
    const n = TABS.length;
    const next = { ArrowRight: (index + 1) % n, ArrowLeft: (index - 1 + n) % n, Home: 0, End: n - 1 }[event.key];
    if (next === undefined) return;
    event.preventDefault();
    refs.current[next]?.focus();
    onSelect(TABS[next].id);
  };

  return (
    <div className="tabbar" ref={barRef}>
      <div className="tabbar-inner" role="tablist" aria-label="Who are you?">
        {TABS.map((tab, index) => (
          <button
            key={tab.id}
            ref={(el) => (refs.current[index] = el)}
            type="button"
            role="tab"
            id={`tab-${tab.id}`}
            aria-selected={active === tab.id}
            aria-controls={active === tab.id ? `panel-${tab.id}` : undefined}
            tabIndex={index === activeIndex ? 0 : -1}
            className="tab"
            onClick={() => onSelect(tab.id)}
            onKeyDown={(event) => onKeyDown(event, index)}
          >
            <Icon name={tab.icon} size={18} />
            <span>{tab.short}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 3: `ReaderChooser.jsx`**: `TABS.map` → `<button type="button" className="choose" onClick={() => onSelect(tab.id)}>` with `<Icon>`, `<span className="choose-title">{tab.label}</span>`, `<span className="choose-blurb">{tab.blurb}</span>`, `<Icon name="arrow" />`. Wrapper `<div className="chooser" hidden={hidden}>` with an `<h2 className="chooser-title">Who are you?</h2>`.

- [ ] **Step 4: `Hero.jsx`**: `<header className="page-hero" data-compact={compact}>` with `<img src="/towin-logo.png" width="72" height="72" alt="">`, `<p className="page-eyebrow">A page about one app</p>`, `<h1>Why Towinly</h1>`, `<p className="tagline">It takes <em>two</em> To Win.</p>`, `<p className="page-lead">Towinly connects elders with younger helpers nearby, and makes trust grow one step at a time. Pick who you are and the page speaks to you.</p>`. When `compact`, CSS hides the eyebrow and lead, shrinks the mark, and shows one small text button "Choose who you are" that calls `onHome` (the hook's `home()`), so a reader can go back to the six cards without the browser's back button.

- [ ] **Step 5: `TopBar.jsx`**: `<nav className="topbar" aria-label="Site">` with `<a href="/" className="topbar-brand">Harsha<span>.</span></a>`, `<span className="topbar-page">Why Towinly</span>`, and `TOWINLY_LINKS` filtered to globe/instagram/linkedin/github as icon-and-word links (`rel="noopener noreferrer" target="_blank"`), each `min-height: 44px`.

- [ ] **Step 6: `Footer.jsx`**: `<footer className="foot">` with `<SocialRow />` (Task 9) placeholder for now as two plain lists of links (Towinly, Harsha) and the line "Built by Harshavardhan Anbu Gowri. Reviewed on localhost before every push."

- [ ] **Step 7: `TowinlyPage.jsx`**

```jsx
import { useEffect, useRef } from "react";
import useTabRoute from "./useTabRoute";
import { TABS, TAB_DATA } from "../data/towinly/tabs";
import TopBar from "./components/TopBar";
import Hero from "./components/Hero";
import ReaderChooser from "./components/ReaderChooser";
import TabBar from "./components/TabBar";
import TabPanel from "./components/TabPanel";
import AiTab from "./components/AiTab";
import Footer from "./components/Footer";

export default function TowinlyPage() {
  const { tab, section, go, home } = useTabRoute();
  const barRef = useRef(null);
  const headingRef = useRef(null);
  const current = TABS.find((t) => t.id === tab);

  // After a change: scroll the target into view (the section, or the panel heading so
  // the bar sits at the top) and move focus there so screen readers follow.
  useEffect(() => {
    if (!tab) return;
    const frame = requestAnimationFrame(() => {
      const target = section ? document.getElementById(section) : headingRef.current;
      target?.scrollIntoView({ block: "start" });
      target?.focus({ preventScroll: true });
    });
    return () => cancelAnimationFrame(frame);
  }, [tab, section]);

  return (
    <>
      <TopBar />
      <main className="page">
        <Hero compact={!!tab} onHome={home} />
        <ReaderChooser hidden={!!tab} onSelect={go} />
        <TabBar active={tab} onSelect={go} barRef={barRef} />
        {current && (
          <section className="panel" id={`panel-${current.id}`} role="tabpanel" aria-labelledby={`tab-${current.id}`} key={current.id}>
            {current.id === "ai" ? <AiTab data={TAB_DATA.ai} headingRef={headingRef} /> : <TabPanel data={TAB_DATA[current.id]} headingRef={headingRef} />}
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
```
Until Task 9 exists, make `TabPanel` and `AiTab` one-line stubs that render `<h2 ref={headingRef} tabIndex={-1}>{data.title}</h2>`.

- [ ] **Step 8: `towinly.css`, the skeleton** (tokens reuse `index.css`; add page tokens):

```css
/* This file is loaded by the /towinly/ entry only, so page tokens can sit on :root and
   reach the top bar and footer outside <main>. */
:root { --bar-h: 56px; --paper: #FAF7F1; --paper-alt: #F3EEE4; --card: #FFFDF9; --ink: #221E16;
  --ink-soft: #4A443A; --gold: #C9A227; --gold-deep: #8A6D1B; --bronze: #9C7A2A;
  --line: rgba(34,30,22,.12); --line-soft: rgba(34,30,22,.06); --dark: #201C15; --cream: #F0EAE0; }
body { background: var(--paper); color: var(--ink); }
.page [id], .panel-title { scroll-margin-top: calc(var(--bar-h) + 16px); }
.page-wrap { width: min(100% - 32px, 1120px); margin-inline: auto; }
/* top bar: static, dark, same grammar as .clark-nav */
.page-topbar { background: var(--dark); color: var(--cream); } …
/* hero */
.page-hero { text-align: center; padding: 56px 0 24px; }
.page-hero[data-compact="true"] .page-eyebrow, .page-hero[data-compact="true"] .page-lead { display: none; }
.page-hero h1 { font-family: var(--font-serif); font-weight: 600; font-size: clamp(2rem, 5vw, 3rem); }
.tagline { font-family: var(--font-serif); font-size: 1.35rem; } .tagline em { color: var(--gold-deep); }
/* chooser */
.chooser { display: grid; gap: 12px; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); }
.chooser[hidden] { display: none; }   /* the hidden attribute loses to display:grid otherwise */
.choose { min-height: 120px; text-align: left; background: var(--card); border: 1px solid var(--line); border-radius: 12px; padding: 20px; cursor: pointer;
  transition: transform .18s ease-out, border-color .18s ease-out; }
.choose:hover, .choose:focus-visible { transform: translateY(-2px); border-color: var(--gold); }
.choose:first-child { grid-column: 1 / -1; } /* the elder card leads */
/* sticky bar */
.tabbar { position: sticky; top: 0; z-index: 20; background: rgba(250,247,241,.94); backdrop-filter: blur(6px); border-bottom: 1px solid var(--line-soft); }
.tabbar-inner { display: flex; gap: 4px; overflow-x: auto; scrollbar-width: none; padding: 6px 16px; mask-image: linear-gradient(90deg, #000 92%, transparent); }
.tab { display: inline-flex; align-items: center; gap: 8px; min-height: 44px; padding: 0 14px; border-radius: 999px; white-space: nowrap; color: var(--ink-soft); border: 1px solid transparent; }
.tab[aria-selected="true"] { color: var(--ink); font-weight: 600; box-shadow: inset 0 -2px 0 var(--gold); }
/* panel */
.panel { animation: panel-in .2s ease-out; }
@keyframes panel-in { from { opacity: 0 } to { opacity: 1 } }
@media (prefers-reduced-motion: reduce) { .panel { animation: none } .choose { transition: none } }
```
Fill in the rest as the components land; keep selectors flat and named by component.

- [ ] **Step 9: Build, run, click through**

Run: `npm run lint && npm run build`, then `npm run dev`, open `http://localhost:5176/towinly/` in the owner's browser only when he asks; for now verify with curl that the HTML is served and with the build that nothing errors. Keyboard check happens in Task 20.

- [ ] **Step 10: Commit**

```bash
git add src/towinly && git commit -q -m "feat(towinly): page shell: top bar, hero, chooser, sticky tab bar"
```

### Task 9: Content components

**Files:**
- Create: `components/TabPanel.jsx`, `Chapter.jsx`, `Disclosure.jsx`, `TabSubnav.jsx`, `PhoneGallery.jsx`, `TrustLadder.jsx`, `TrustScoreMeter.jsx`, `DemoCast.jsx`, `Timeline.jsx`, `StatTiles.jsx`, `ArchitectureFigure.jsx`, `ArtworkStrip.jsx`, `SocialRow.jsx`, `ClosingCard.jsx`, `AiTab.jsx`

- [ ] **Step 1: `TabPanel.jsx`** renders `<h2 ref={headingRef} tabIndex={-1} className="panel-title">`, `<p className="panel-lead">`, then a `.tab-layout` grid: `<TabSubnav sections={data.sections} />` and `<div className={`prose ${data.bodySize === "lg" ? "prose-lg" : ""}`}>{data.sections.map((s) => <Chapter key={s.id} section={s} />)}</div>`.

- [ ] **Step 2: `Chapter.jsx`**

```jsx
import Disclosure from "./Disclosure";
import PhoneGallery from "./PhoneGallery";
import Extra from "./Extra";
import Icon from "../icons";
import { shots } from "../../data/towinly/screenshots";

export default function Chapter({ section }) {
  const { id, title, body = [], more = [], links = [] } = section;
  return (
    <section className="chapter" id={id} aria-labelledby={`${id}-h`}>
      <h3 id={`${id}-h`} tabIndex={-1}>
        {title}
        <a className="anchor" href={`#${id}`} aria-label={`Link to ${title}`}><Icon name="link" size={16} /></a>
      </h3>
      {body.map((p, i) => <p key={i}>{p}</p>)}
      {section.shots && <PhoneGallery shots={shots(section.shots)} label={title} />}
      <Extra section={section} />
      {more.length > 0 && <Disclosure summary="More about this">{more.map((p, i) => <p key={i}>{p}</p>)}</Disclosure>}
      {links.length > 0 && <p className="chapter-links">{links.map((l) => <a key={l.href} href={l.href}>{l.label}</a>)}</p>}
    </section>
  );
}
```
`Extra.jsx` is the switch on `section.extra`: `ladder` → `<TrustLadder />`, `ladder-compact` → `<TrustLadder compact />`, `score` → `<TrustScoreMeter />`, `cast` / `cast:helpers` / `cast:family` → `<DemoCast only={…} />`, `timeline` → `<Timeline />`, `stats` → `<StatTiles />`, `architecture` → `<ArchitectureFigure />`, `artworks:problem` / `artworks:origin` → `<ArtworkStrip set="problem|origin" />`, `social` → `<SocialRow />`, `closing` → `<ClosingCard />`, `steps` → `<ol className="steps">`.

- [ ] **Step 3: `Disclosure.jsx`**: `<details className="more"><summary>{summary}</summary><div>{children}</div></details>`.

- [ ] **Step 4: `TabSubnav.jsx`**: `<nav className="subnav" aria-label="On this page"><ol>` of `<a href={`#${s.id}`}>` chips; an `IntersectionObserver` over the section elements sets `aria-current="true"` on the one most in view (reuse the `sectionInView` idea from `Navbar.jsx`, measured below `--bar-h`). On wide screens the CSS makes it a sticky rail (`position: sticky; top: calc(var(--bar-h) + 12px)`); on phones a horizontal chip row directly under the tab bar.

- [ ] **Step 5: `PhoneGallery.jsx`**

```jsx
import { useState } from "react";

export default function PhoneGallery({ shots, label }) {
  const [index, setIndex] = useState(0);
  const shot = shots[index];
  const move = (delta) => setIndex((i) => (i + delta + shots.length) % shots.length);
  return (
    <figure className="gallery" aria-label={`Screens: ${label}`} onKeyDown={(e) => { if (e.key === "ArrowRight") move(1); if (e.key === "ArrowLeft") move(-1); }}>
      <div className="phone">
        <img key={shot.file} src={`/towinly/shots/${shot.file}.webp`} width={shot.w} height={shot.h} alt={shot.alt} loading="lazy" decoding="async" />
      </div>
      <figcaption className="gallery-caption">{shot.caption}</figcaption>
      {shots.length > 1 && (
        <div className="thumbs" role="group" aria-label="Choose a screen">
          {shots.map((s, i) => (
            <button key={s.file} type="button" className="thumb" aria-pressed={i === index} aria-label={s.caption} onClick={() => setIndex(i)}>
              <img src={`/towinly/shots/${s.file}.webp`} width={s.w} height={s.h} alt="" loading="lazy" decoding="async" />
            </button>
          ))}
        </div>
      )}
    </figure>
  );
}
```
CSS: `.phone img { width: min(100%, 300px); height: auto; border-radius: 28px; display: block; margin-inline: auto; }`, `.thumb { min-width: 44px; min-height: 44px; }`, `.thumb[aria-pressed="true"] { outline: 2px solid var(--gold); }`.

- [ ] **Step 6: `TrustLadder.jsx`**: seven `role="tab"` buttons in a `.rungs` list (vertical on phones, horizontal on desktop), arrow keys as in TabBar, a `.rung-panel` (`role="tabpanel"`, `aria-live="polite"`) showing `Step N of 7`, the name, `what`, `unlocks`, and `LADDER_RULE`. `compact` drops the panel's second paragraph and tightens padding.

- [ ] **Step 7: `TrustScoreMeter.jsx`**: three toggle buttons (`aria-pressed`) from `SCORE_PARTS`; a 15-cell bar (`role="img"` with `aria-label={`${total} of 15 points`}`) that fills `total` cells; the formula line `3 + 7 + 5 = 15 points per person you help`; under it the `SCORE_TIERS` as a small definition list.

- [ ] **Step 8: `DemoCast.jsx`**: filter chips (All, Elders, Helpers, Family; `aria-pressed`), cards from `CAST` (name, age, city, one line, role chip), the three `TRY_LINKS` as ink-filled pills opening towinly.com/login in a new tab, and `WORKED_EXAMPLE`. Prop `only` preselects a filter.

- [ ] **Step 9: `Timeline.jsx`**, `StatTiles.jsx` (each tile: value, label, small "as of" date), `ArchitectureFigure.jsx` (inline SVG, `role="img"`, `aria-labelledby` a visually hidden summary paragraph; boxes: iPhone app, Web app, Spring Boot API, PostgreSQL + pgvector, Redis, Twilio, S3, OpenAI; bands: Vercel, Railway, EAS; a link to `/architecture.html`), `ArtworkStrip.jsx` (cards with the artwork, title, and a button `aria-expanded` that reveals the caption paragraphs; `set="problem"` → `PROBLEM_RUN`, `"origin"` → `ORIGIN_RUN` with "Part N of 6" eyebrows), `SocialRow.jsx` (two groups: Towinly, Harsha), `ClosingCard.jsx` (mark, tagline, "Elders and younger helpers, nearby.", the four values).

- [ ] **Step 10: `AiTab.jsx`**

```jsx
import { AI_FRAGMENT } from "../../data/towinly/ai";
import TabSubnav from "./TabSubnav";
import "../ai-casestudy.css";

export default function AiTab({ data, headingRef }) {
  return (
    <>
      <h2 ref={headingRef} tabIndex={-1} className="panel-title">{data.title}</h2>
      <p className="panel-lead">{data.lead}</p>
      <div className="tab-layout">
        <TabSubnav sections={data.sections} />
        <div className="ai-tab" dangerouslySetInnerHTML={{ __html: AI_FRAGMENT }} />
      </div>
    </>
  );
}
```

- [ ] **Step 11: Lint, build, commit**

```bash
npm run lint && npm run build && git add src/towinly && git commit -q -m "feat(towinly): content components: chapters, gallery, ladder, score, cast, timeline, artworks"
```

---

## Chunk 3: The words, tab by tab

Each tab file follows the data contract above, with the section ids listed at the top of this plan and the facts from the spec section named. Write plain sentences, two to four per section, in the voice of the Towinly landing story. Both sides named. No em dashes. Brand lines exact.

### Task 10: `elders.js` (spec 4.1)

- [ ] **Step 1:** Write the 17 sections with `shots` from the asset list, `extra: "score"` on `trust-score`, `extra: "ladder"` on `ladder`, `extra: "steps"` with the seven reunion steps on `reunions`, `extra: "cast"` on `demo`, and `links` to `#iphone-app` on `elders-iphone`. `bodySize: "lg"`.
- [ ] **Step 2:** `node scripts/check-towinly.mjs` → ok, then `npm run build`.
- [ ] **Step 3:** Commit: `git add src/data/towinly/elders.js && git commit -q -m "feat(towinly): the Elders tab"`.

### Task 11: `helpers.js` (spec 4.2) and `family.js` (spec 4.3)

- [ ] **Step 1:** Write both. `extra: "score"` on `h-score`, `"ladder"` on `h-ladder`, `"cast:helpers"` on `h-demo`, `"cast:family"` on `f-demo`.
- [ ] **Step 2:** Check, build, commit: `feat(towinly): the Helpers and Family tabs`.

### Task 12: `story.js` (spec 4.4)

- [ ] **Step 1:** Sections, in this order: `s-new-elder` (the deck's opening lines, grandfather and father), `s-problem-run` (`extra: "artworks:problem"`), `s-two-things`, `s-origin-run` ("How Towinly began, in six parts", `extra: "artworks:origin"`: the six captions in order with "Part N of 6" eyebrows), `s-why-now`, `s-why-matters`, `s-solution`, `s-what-ships` (`links` to the elder sections), `s-why-we-win`, `s-business`, `s-team`, `s-built-how` (`extra: "timeline"`, body carries `BUILD_LINE`, `more` carries the method), `s-numbers` (`extra: "list"` with `items: AI_TOOLS` is wrong here; `s-numbers` takes `extra: "stats"`, and the AI tools go on `s-built-how` as `more` text, one line each, Claude Code first), `iphone-app` (shots `landing-01 login register-role elder-home helper-home family-home`), `s-built-live`, `s-ask`, `s-online` (`extra: "artworks:online"`, the `ONLINE_ROW`, followed by the links; `SocialRow` renders inside `ArtworkStrip` for the `online` set), `s-closing` (`extra: "closing"`). `story.js` imports `AI_TOOLS` and `BUILD_LINE` from `./facts`.
- [ ] **Step 2:** Check, build, commit: `feat(towinly): the Story tab from the Instagram run and the decks`.

### Task 13: `technical.js` (spec 4.5)

- [ ] **Step 1:** Eleven sections; `extra: "architecture"` on `t-picture`, `"stats"` on `t-numbers`, `"ladder-compact"` on `t-state-machine`, `"score"` on `t-score`; `t-links` carries GitHub (web, app), `/architecture.html`, `#ai`, and the in-app guide shot `guide`.
- [ ] **Step 2:** Check, build, commit: `feat(towinly): the Technical tab`.

### Task 14: Copy passes on every new sentence

- [ ] **Step 1:** Run `@humanizer` over `src/data/towinly/{elders,helpers,family,story,technical,ladder,score,cast,timeline,facts,tabs}.js` with the four brand lines passed as do-not-touch, and with the sample voice `App/src/data/landingSlides.js`. Apply its edits.
- [ ] **Step 2:** Run `@stop-slop` over the same files as the final gate. Apply.
- [ ] **Step 3:** `grep -rn "—" src/data/towinly src/towinly towinly/index.html` → nothing. `node scripts/check-towinly.mjs` → ok.
- [ ] **Step 4:** Record both passes in `tasks/todo.md`. Commit: `style(towinly): humanizer then stop-slop on the page copy`.

---

## Chunk 4: Wiring into the site, verification, review

### Task 15: Home page link card and the forwarding page

**Files:**
- Modify: `src/data/profile.js` (the `aiCaseStudy` block, around line 245)
- Modify: `src/components/FeaturedProject.jsx` (the third-card block, around line 203)
- Replace: `public/towinly-ai.html`

- [ ] **Step 1: `profile.js`**: change `aiCaseStudy.href` to `"/towinly/#ai"` and add above it:

```js
      /* The whole product explained, one page, six kinds of reader (/towinly/). */
      whyTowinly: {
        href: "/towinly/",
        title: "Why Towinly",
        sub: "The story, the people, every feature and the iPhone app, explained for whoever you are",
      },
```

- [ ] **Step 2: `FeaturedProject.jsx`**: before the `towin.aiCaseStudy &&` block, add the same card markup for `towin.whyTowinly` with a book icon (two pages: `<path d="M4 5.5A2.5 2.5 0 016.5 3H12v15H6.5A2.5 2.5 0 004 20.5zM12 3h5.5A2.5 2.5 0 0120 5.5v15A2.5 2.5 0 0017.5 18H12z" />`).

- [ ] **Step 3: `public/towinly-ai.html`**, the whole file becomes:

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Everything AI in Towinly | Harshavardhan Anbuchezhian Gowri</title>
<meta name="robots" content="noindex">
<link rel="canonical" href="https://harshavardhanag.com/towinly/">
<meta http-equiv="refresh" content="0; url=/towinly/#ai">
<style>body{font-family:Poppins,system-ui,sans-serif;background:#FAF7F1;color:#221E16;margin:0;min-height:100svh;display:grid;place-items:center;padding:24px}a{color:#8A6D1B}</style>
</head>
<body>
<p>The AI case study now lives on the Why Towinly page. <a href="/towinly/#ai">Open it there</a>.</p>
</body>
</html>
```
(The old body was extracted in Task 5 before this replacement. Confirm with `git show HEAD:public/towinly-ai.html | wc -c` → about 85,000 if you ever need it back.)

- [ ] **Step 4:** `npm run lint && npm run build`; `grep -c "whyTowinly" dist/assets/*.js` ≥ 1. Commit: `feat: Why Towinly card on the home page; the AI page forwards to its tab`.

### Task 16: Styles pass with the design skills

- [ ] **Step 1:** Load `@impeccable` (audit) and `@ui-ux-pro-max` quick reference §1 to §3, §5 to §7, §9 against `towinly.css` and the components. Fix: contrast (deep gold only for small text), 44px targets, focus rings, line length (68ch), no horizontal scroll at 390px, chooser card hover under reduced motion, sticky bar height token in sync with `--bar-h`.
- [ ] **Step 2:** `@emil-design-eng` motion check: every transition under 300ms, transform/opacity only, reduced motion honoured.
- [ ] **Step 3:** Commit: `style(towinly): design pass`.

### Task 17: Build and checks

- [ ] **Step 1:** `npm run lint` → clean. `npm run build` → both entries. `node scripts/check-towinly.mjs` → ok.
- [ ] **Step 2:** `du -sh dist/towinly dist/assets` and note the sizes in `tasks/todo.md`; the page's own JS plus CSS should stay under 250 KB gzipped-equivalent (check with `ls -la dist/assets | sort -k5 -n | tail -5`).
- [ ] **Step 3:** Commit anything the checks changed.

### Task 18: Localhost smoke test by script (no browser yet)

- [ ] **Step 1:** `npm run dev` in the background, note the port.
- [ ] **Step 2:** `curl -s http://localhost:PORT/towinly/ | grep -o '<title>[^<]*'` → `Why Towinly | …`; `curl -s -o /dev/null -w "%{http_code}\n" http://localhost:PORT/towinly/shots/elder-home.webp` → 200; same for one artwork; `curl -s http://localhost:PORT/towinly-ai.html | grep -c 'url=/towinly/#ai'` → 1.
- [ ] **Step 3:** Stop the dev server.

### Task 19: Keyboard and reduced-motion walk (headless, one run)

- [ ] **Step 1:** The owner's standing rule is no browser checks unless asked (RAM-constrained Mac). So first ask him, in plain words, whether one short headless browser run is fine. If yes, use the Playwright MCP for one session and close it when done: open `/towinly/`, press Tab to the first chooser card, Enter → hash becomes `#elders`, focus lands on the panel heading; ArrowRight on the tab bar → `#helpers`; browser Back → `#elders`; open `/towinly/#ladder` directly → Elders tab open and the ladder in view; at 390px wide, `document.documentElement.scrollWidth === window.innerWidth`. Emulate `prefers-reduced-motion: reduce` and confirm the panel appears without animation. If no, hand him the same list to try in his own browser during Task 20.
- [ ] **Step 2:** Note results in `tasks/todo.md`.

### Task 20: Owner review on localhost

- [ ] **Step 1:** Start `npm run dev`, give Harsha the exact URL (`http://localhost:PORT/towinly/`) and the three deep links to try (`#elders`, `#ladder`, `#ai`).
- [ ] **Step 2:** Walk the ten HCI heuristics against the page in the review message (visibility of state: active tab and section; match to the real world: plain words; user control: back button, pause lines; consistency: one order everywhere; error prevention: no dead links by check; recognition: sub-nav; flexibility: chooser and bar; minimalist: progressive disclosure; errors: none to recover from; help: the guide shot and the AI tab).
- [ ] **Step 3:** Apply corrections; rerun Task 17; show again. Repeat until "looks good".

### Task 21: Merge locally (no push)

- [ ] **Step 1:** `git checkout main && git merge --no-ff feat/why-towinly -m "feat: Why Towinly, one page for six kinds of reader"`.
- [ ] **Step 2:** `npm run build` on main once more. Write the review note in `tasks/todo.md`.
- [ ] **Step 3:** Stop. Push only when Harsha says "push" (`git push origin main`; Vercel deploys from main).

### Task 22: Memory and observations

- [ ] **Step 1:** Save a project memory note (`why-towinly-page-2026-10-28`): where the page lives, the data contract, the three scripts, the rule that captions are generated, and that the AI page is a forwarding stub now.
- [ ] **Step 2:** Flush task-observer observations to the log (deliverable-event flush).
