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
