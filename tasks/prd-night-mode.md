# PRD: Night Mode for the Paper & Gold Portfolio

## Introduction

The portfolio was redesigned to the "Paper & Gold" language: warm paper (`#FAF7F1`), warm ink (`#221E16`), bronze accents (`#9C7A2A`) on light sections, classic gold (`#C9A227`) on the two dark bands (Beyond Code, Footer), and Lora serif display type. The codebase contains 12 stale `.dark` CSS rules and a Tailwind v4 `@custom-variant dark` definition, but **nothing toggles the class — night mode is dead code**.

This feature builds a real, first-class night mode: a "Night Paper" theme (warm blacks, cream text, G3 classic gold `#C9A227` accents — the same treatment the Beyond Code band already uses), a sun/moon toggle in the navbar, and a persisted preference. The site defaults to light for everyone; the visitor's manual choice is remembered.

## Goals

- A working sun/moon toggle in the navbar (desktop and mobile) that switches the whole site between Paper (light) and Night Paper (dark)
- Choice persists across visits (localStorage); **default is always light** on first visit
- No flash of wrong theme on page load
- Every section themed consistently: hero, about, experience, skills, featured, projects, coursework, beyond code, contact, footer
- Replace hardcoded colors with a two-theme CSS custom-property token system (this also removes/upgrades the 12 stale `.dark` rules)
- Accessibility preserved in both themes: AA contrast for small text, visible focus rings, reduced-motion support unchanged

## Night Paper palette

| Token | Light (current) | Night |
|---|---|---|
| `--bg` (section base) | `#FAF7F1` | `#161310` |
| `--bg-alt` (alt section) | `#F3EEE4` / `#f8f6f1` / `#fff` | `#1B1712` |
| `--bg-card` (cards) | `#FFFDF9` | `#242018` |
| `--bg-img` (image wells) | `#EFE9DD` | `#2A251C` |
| `--text` (headings/body) | `#221E16` | `#F0EAE0` |
| `--text-muted` | `#6E6659` / ink-alphas | `rgba(240,234,224,0.65)` |
| `--accent` (display/graphic gold) | `#9C7A2A` (G8 bronze) | `#C9A227` (G3 classic) |
| `--accent-text` (small gold text) | `#8A6D1B` | `#D9B84A` |
| `--hairline` (borders) | `rgba(34,30,22,0.10)` | `rgba(240,234,224,0.12)` |
| Dark bands (Beyond Code / Footer) | `#201C15` + `#C9A227` | unchanged (already night-native); soften seams |

## User Stories

### US-001: Two-theme token foundation
**Description:** As a developer, I need all theme colors defined once as CSS custom properties so both themes derive from one source of truth.

**Acceptance Criteria:**
- [ ] `:root` defines the Light column tokens above; `.dark` (on `<html>`) overrides with the Night column
- [ ] The 12 existing stale `.dark` rules in `index.css` are removed or rewritten in terms of tokens
- [ ] Light mode renders pixel-identical to before (verify by screenshot comparison of hero + one section)
- [ ] Build passes (`npm run build`)

### US-002: Navbar sun/moon toggle with persistence
**Description:** As a visitor, I want a familiar sun/moon button so I can switch to night mode, and have my choice remembered.

**Acceptance Criteria:**
- [ ] Round icon button in the desktop navbar (right side, near Resume) and in the mobile menu: moon icon in light mode, sun icon in night mode
- [ ] Clicking toggles the `dark` class on `document.documentElement` and saves `"light"`/`"dark"` to `localStorage` key `theme`
- [ ] Inline `<script>` in `index.html` `<head>` applies the saved theme before first paint (no flash); missing/unknown value → light
- [ ] Button has `aria-label` ("Switch to night mode"/"Switch to light mode") and visible focus ring in both themes
- [ ] Verify in browser: toggle works, reload keeps choice, first visit (cleared storage) is light

### US-003: Global stylesheet on tokens
**Description:** As a visitor, I want the shell of the site (navbar, hero, buttons, section headings, timeline, skills, contact form, footer strip, scroll-top) to look right in both themes.

**Acceptance Criteria:**
- [ ] All hardcoded colors in `index.css` replaced with the tokens from US-001 (except intentionally fixed colors, e.g. status-dot green)
- [ ] Hero photo edge gradient uses `--bg` so the photo blends in both themes
- [ ] Navbar background/blur, logo, links, mobile menu themed in both modes
- [ ] Verify in browser in both themes: hero, navbar, buttons, one timeline entry
- [ ] Build passes

### US-004: Light components on tokens
**Description:** As a visitor, I want About, Experience, Skills, Coursework, Contact, and Projects to render correctly in night mode.

**Acceptance Criteria:**
- [ ] Inline hex/rgba styles in `About.jsx`, `Experience.jsx`, `Skills.jsx`, `Coursework.jsx`, `Contact.jsx`, `Projects.jsx` replaced with `var(--…)` tokens
- [ ] Project cards: card surface, tag chips, GitHub/Open Live buttons legible in both themes
- [ ] Coursework "Current" pill and completed-credits banner legible in both themes
- [ ] Verify in browser in both themes: each of the six sections
- [ ] Build passes

### US-005: Featured (ToWin) section on tokens
**Description:** As a visitor, I want the flagship ToWin showcase to look deliberate in night mode.

**Acceptance Criteria:**
- [ ] `FeaturedProject.jsx` style block converted to tokens (section bg, tag, title, feature cards, tech chips, buttons, architecture card, preview border/shadow)
- [ ] The ToWin screenshot (light image) gets a subtle border in night mode so it doesn't glare against the dark bg
- [ ] Verify in browser in both themes
- [ ] Build passes

### US-006: Dark bands + seams in night mode
**Description:** As a visitor, I want Beyond Code and the Footer (already dark) to feel continuous with night mode rather than like separate slabs.

**Acceptance Criteria:**
- [ ] In night mode, section borders/seams between dark bands and night sections are visible but subtle (hairline token)
- [ ] Beyond Code cards and Footer keep G3 gold accents in both themes
- [ ] Verify in browser in both themes: scroll the seams above/below both bands
- [ ] Build passes

### US-007: Accessibility + full-sweep verification
**Description:** As any visitor, I can read and navigate everything in both themes.

**Acceptance Criteria:**
- [ ] Small gold text meets ≥4.5:1 in both themes (`#8A6D1B` on paper; `#D9B84A` on `#161310` — verify computed contrast)
- [ ] Focus rings visible in both themes (gold on light, lighter gold on dark)
- [ ] `prefers-reduced-motion` behavior unchanged
- [ ] Verify in browser: full top-to-bottom scroll in both themes at desktop (1280px) and mobile (390px) widths; no unreadable text, no invisible borders, no light-mode remnants in night mode
- [ ] Build passes

## Functional Requirements

- FR-1: The system must define all theme colors as CSS custom properties on `:root` (light) with `.dark` overrides (night), per the palette table
- FR-2: The navbar must show a round sun/moon toggle button on desktop and inside the mobile menu
- FR-3: Clicking the toggle must add/remove `dark` on `document.documentElement` and persist `theme` = `"light"` | `"dark"` in localStorage
- FR-4: An inline head script must apply the persisted theme before first paint; first-time visitors always get light
- FR-5: All ten sections must derive their colors from the tokens; no hardcoded light-only colors may remain visible in night mode
- FR-6: Beyond Code and Footer must remain dark in both themes, using G3 gold accents
- FR-7: The toggle must be keyboard-operable with a visible focus indicator and correct `aria-label` in both states
- FR-8: `npm run build` must succeed after every story

## Non-Goals (Out of Scope)

- No night mode for `public/architecture.html` (separate static page — explicitly deferred)
- No `prefers-color-scheme` auto-detection (product decision: always light first)
- No theme-transition animations beyond a simple color transition; no view-transitions API
- No per-section theme overrides or a third theme
- `public/palette-preview.html` is a temp file, not part of this feature (pending deletion decision)

## Design Considerations

- Night mode is "Night Paper," not generic black: warm blacks (`#161310`/`#1B1712`), cream text, gold accents — the Beyond Code band is the reference look
- The serif/gold signature (italic bronze name, gold italic accents) stays in both themes; in night it uses G3 `#C9A227`
- Sun/moon button style matches existing navbar controls (ink pill aesthetic in light; cream outline in dark)

## Technical Considerations

- Tailwind v4 `@custom-variant dark (&:where(.dark, .dark *))` already exists — the `.dark` class on `<html>` is the switching mechanism
- Most colors live in inline JSX styles — the token migration (US-003/004/005) is the bulk of the work; do it section by section, verifying visually after each
- Keep the pre-redesign snapshot untouched in scratchpad for rollback
- Dev server: `npm run dev` (currently port 5176); verification via Playwright MCP browser

## Success Metrics

- Toggle → full theme switch in one click with no flash on reload
- Both themes pass a full-page visual sweep with zero unreadable elements
- Zero hardcoded paper/ink hexes left in components (all via tokens) — verifiable by grep

## Open Questions

- Should the hero portrait get a subtle warm vignette in night mode so its edges blend like they do on paper? (Nice-to-have; decide during US-003)
