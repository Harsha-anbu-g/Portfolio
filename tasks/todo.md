# Frontend redesign — "the engineer's ledger"

Goal: replace the Clark-template look (dark charcoal + orange, Poppins, ghost headings)
with a distinctive, product-grade light design that doesn't read as AI/template output.

## Design tokens
- Paper `#FAFAF8`, surface `#FFFFFF`, ink `#181B17`, muted `#5A6055`,
  hairline `#E6E5DF`, accent pine green `#1D5F46` (hover `#154732`),
  dark band `#0F1F17` with light-green accent `#7FCFA4`.
- Display: Bricolage Grotesque. Body: Instrument Sans. Data/labels: JetBrains Mono.
- Signature: ToWin featured section = dark ink-green band with the real trust
  state machine (VERIFIED → CHAT → PHONE CALL → MEET) drawn as a diagram.
- Section headers = ledger rules: hairline + mono eyebrow + right-aligned real metadata.

## Checklist
- [ ] index.html fonts + theme-color
- [ ] index.css full rewrite (tokens, sections, all component classes centralized)
- [ ] Navbar, Hero
- [ ] FeaturedProject (signature)
- [ ] About (kill orange stats band → quiet fact row), Experience, Skills (ledger rows)
- [ ] Projects, Coursework, BeyondCode (light)
- [ ] Contact (labeled form), Footer (ink), ScrollToTop
- [ ] Build + screenshots 1440/375, a11y pass (contrast, focus, reduced motion)
- [ ] Commit + push

## Review
(to fill after implementation)

---

# 2026-10-25: "Everything AI in Towinly" goes on the site

Request: "addin my website", with the write-up "Everything AI in Towinly" pasted in chat
(written 2026-10-25 for interview use). Shape chosen: a standalone case-study page in the
Paper & Gold design, reached from a third link card in the featured Towinly block, plus one
"Ask AI Assistant" feature card, two tech chips and three AI skills chips. Nothing is
committed or pushed until Harsha reviews it on localhost.

## Checklist
- [x] public/towinly-ai.html: the write-up adapted for recruiters and engineers (one-minute
      version, timeline, the twelve steps, privacy, how it was built, production, numbers,
      still to do, six questions, glossary); own title, meta and OG tags; Lora + Poppins;
      mobile-solid, 44px tap targets
- [x] src/data/profile.js: aiCaseStudy link data, Ask AI bullet, pgvector + Groq chips,
      AI skills chips
- [x] src/components/FeaturedProject.jsx: heading for the new bullet, third link card
- [x] Prose pass on the new copy: humanizer, then stop-slop as the final gate; grep for em dashes
- [x] Verify: vite build green, localhost at 1440 and 390 wide, no horizontal scroll,
      every link resolves
- [x] Harsha reviews on localhost, then commit, then push only on an explicit "push"

## Review
Reviewed on localhost and approved with "push" on 2026-10-25. Page, link card, feature card and chips shipped together; About paragraph, experience bullets, hero subtext, OG card and resume PDF left for a later decision.

### Second pass, 2026-10-25 (same day, later)
Harsha pasted an updated write-up ("i have update this"). Synced to the page: the "What runs
where" table, the five Mac-only tools, the parked next round (parts a to d with the Spring AI
comparison), two more interview answers (eight in all), seven more glossary terms, and the
reworded fourth "still to do" bullet. Wide tables stack into one card per row under 640px.
- [x] Edited, built, checked at 1440 and 390 (no overflow)
- [x] Harsha reviewed on localhost and said "push" on 2026-10-25; committed and pushed

### Third pass, 2026-10-27
Harsha: "SEE TOWINLY FOR NEW AI STUFF AND UPDATE THE PORTFOLIO AND PUGH TO LIVE" (push approved
up front). Source: the write-up in the ToWin App repo (docs/learning/towinly-ai-work.md, 15
sections) plus the repos themselves. Synced: answers moved from Groq to OpenAI gpt-6-luna on
2026-10-27 (merged to main; Railway deploy not claimed), consent version 3, 108 MCP tools with
21 confirm-gated after the Reunion feature (dated notes keep the 93/19 of 2026-10-25), 45 eval
cases, a "Before and after" section (14 cards) and a "Groq out, OpenAI only" section, two more
glossary terms. Featured block: OpenAI chip replaces Groq, card and bullet text follow.
- [x] Edited, built, checked at 1440 and 390 (no overflow)
- [x] Committed and pushed on Harsha's standing approval in the request

---

# 2026-10-28: "Why Towinly", one deep page for the whole product

Request (spoken, 2026-10-28): a new page inside the portfolio that explains Towinly end to
end: why it exists, who built it, how it was built and how long it took, the AI tools used,
every feature (Trust Score, Trust Ladder, boxes, family, reunions, check-in, SOS), the demo
accounts, screenshots, social-media material, the pitch deck facts. Tabs on top for
different readers: elders first (the main user), helpers, family, technical, AI. The existing
"Everything AI in Towinly" page folds into this one as its AI tab. Plain words first,
technical where it earns its place. Interactive, not a wall of text.

## Running queue (in the order given)
1. [ ] Build the page inside the portfolio (main request)
2. [ ] Use the superpowers process: brainstorm, spec, plan, build
3. [ ] Load every skill the job needs (design, copy passes, verification)
4. [ ] `ui-ux-pro-max` on the design
5. [ ] UX quality is the main rule for this page
6. [ ] Tell the iPhone app clearly (its own section)
7. [ ] All social links, Towinly's and Harsha's
8. [ ] Story tab built mainly from the Instagram story run and the pitch decks

Spec: docs/superpowers/specs/2026-10-28-why-towinly-page-design.md
Plan: docs/superpowers/plans/2026-10-28-why-towinly-page.md (branch feat/why-towinly)

## Checklist
- [x] 1 Branch and todo (feat/why-towinly)
- [x] 2 Check script (red first: no data dir; green once the data landed)
- [x] 3 Assets: 37 shots at 480w (960K) and 12 artworks at 540w (336K), manifest with real
      sizes, commit counts 937 web + 472 app on main as of 2026-10-28. User-guide PDFs
      (5.6 to 17.9 MB each) NOT copied; the Technical tab shows the in-app guide instead
- [x] 4 Captions pulled word for word from CAPTIONS-TO-POST.txt and captions.md (12 posts);
      the extractor normalises the title-case "It Takes Two to Win" in post 47's alt text
      to the exact brand line
- [x] 5 AI fragment (public/towinly-ai.html lines 506 to 1156, h1 and toc dropped) and its
      CSS nested under .ai-tab with :root → &, html/body/topbar/toc/foot blocks removed
- [x] 6 Shared data files
- [x] 7 Entry, Vite config (two inputs), route hook
- [x] 8 Shell components
- [x] 9 Content components
- [x] 10 Elders tab (17 sections, 18px body)
- [x] 11 Helpers and Family tabs
- [x] 12 Story tab: the six-part origin run and the problem run as artworks with their
      captions, the deck's order around them (18 sections)
- [x] 13 Technical tab (11 sections)
- [x] 14 Copy passes: humanizer then stop-slop applied by hand to every sentence I wrote
      (passives made active, two "X, not Y" contrasts cut, adverbs removed); the owner's
      Instagram captions and alt text left untouched; grep for em dashes: none
- [x] 15 Home page card ("Why Towinly", /towinly/) and the AI card now /towinly/#ai;
      public/towinly-ai.html is a forwarding stub (meta refresh + link, noindex)
- [x] 16 Styles pass: impeccable hook ran on every file (two findings fixed, two kept on
      purpose: the sub-nav rail's 2px indicator and the timeline spine, structural lines not
      card accents); ui-ux-pro-max checklist §1 to §3, §5 to §7, §9 walked; after the
      screenshots: the elder card across the top with the other five in one row, the phone
      sticky beside the words on wide screens, 44px targets everywhere, no ring on
      programmatically focused headings
- [x] 17 Build and checks: lint clean on src and scripts (the 285 pre-existing errors are
      all in clark-master/js), check-towinly ok (19 data files, 37 shots, 12 artworks,
      76 ids); dist: towinly JS 148 KB (47 KB gzip), CSS 25 KB (5.4 KB gzip)
- [x] 18 Localhost smoke test by script: title, shots, artworks, logo, forwarding stub,
      home card all 200 on http://localhost:5176/towinly/
- [x] 19 Keyboard and reduced-motion walk (Harsha said yes; both MCP browsers were held by
      the other session, so an isolated headless Chromium ran from a scratchpad script):
      Tab + Enter opens #elders with focus on the panel title; ArrowRight → #helpers; Back →
      #elders; /towinly/#ladder opens the Elders tab with the ladder 72px under the bar and
      focused; same-document and hard-reload deep links all land at 72px; the AI tab renders
      15 sections with a 15-item sub-nav; no element wider than a 390px screen (measured
      element by element, since overflow-x: clip hides it from scrollWidth); every image
      declares its size; reduced motion removes the panel animation; no console errors.
      Found and fixed on the way: body overflow-x hidden defeated the sticky bar (now clip),
      the gallery image's intrinsic width widened the phone layout (track is minmax(0,1fr)),
      smooth scrolling cut the second scroll short (tab jumps are instant now)
- [x] 20 Harsha reviewed on localhost (laptop and phone) and said "Looks good, merge it locally"
- [x] 21 Merged into main with --no-ff on 2026-10-28. NOT pushed: push only on "push"
- [x] 22 Memory note why-towinly-page-2026-10-28; observations 356 to 359 in the skill log

## Review
Approved on localhost on 2026-10-28. What shipped to main (local only):
- /towinly/: hero, six-card chooser, sticky tab bar, six tabs (Elders 17 sections, Helpers 8,
  Family 7, Story 18, Technical 11, AI 15), hash routing with shareable section links,
  tap-through Trust Ladder, 3 + 7 + 5 score meter, phone galleries (37 screens), demo cast
  (20 people, three Try-as links), timeline, stat tiles with dates, architecture figure,
  the problem run and the six-part origin run as artworks with their captions, social
  links for Towinly and Harsha, the closing card.
- Home page: "Why Towinly" card; the AI card points at /towinly/#ai; /towinly-ai.html
  forwards there.
- Scripts: towinly-assets.sh (WebP + manifest + commit counts), towinly-captions.mjs
  (captions and alt text word for word), check-towinly.mjs (dashes, files, ids, brand lines).
- Pre-existing lint errors in clark-master/js untouched. The user-guide PDFs stay out of
  the repo (too large); the Technical tab shows the in-app guide screen instead.
- To push: `git push origin main` (Vercel deploys from main). To rerun the page's checks:
  `node scripts/check-towinly.mjs`; to refresh screenshots and counts:
  `bash scripts/towinly-assets.sh && node scripts/towinly-captions.mjs`.
