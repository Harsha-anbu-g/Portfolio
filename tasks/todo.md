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

## Checklist
(filled in by the implementation plan once the design is approved)

## Review
(to fill after Harsha reviews on localhost)
