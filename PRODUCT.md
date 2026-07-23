# Product

## Register

brand

## Users

Recruiters, hiring managers, and engineers evaluating Harsha (Harshavardhan Anbuchezhian Gowri) for full-stack roles in Canada. They skim on desktop or mobile, usually arriving from his resume, LinkedIn, or GitHub, and decide within a minute whether to dig into projects or reach out.

## Product Purpose

A single-page portfolio (React + Vite, deployed on Vercel at harshavardhanag.com) that mirrors and expands his resume: featured project (ToWin), more projects, experience, skills, coursework, and a personal "Beyond Code" section. Success = a recruiter contacts him or opens a project's live demo/GitHub.

## Brand Personality

Disciplined, warm, hands-on. Professional engineer first, with a genuine personal side (reading, fitness, travel, chess). Confident but not flashy.

## Anti-references

- Generic AI-generated portfolio templates (identical card grids, gradient text, glassmorphism).
- Anything that departs from the established live design: the deployed site IS the design system; changes refine it, never replace it (owner's standing rule).
- Overly playful or meme-y personal sites; this is a job-search asset.

## Design Principles

- The live design is the base — evolve sections to match the existing grammar (ghost headings, orange accent, Poppins, flat panels, tag chips) rather than inventing new visual worlds.
- Content is data-driven from `src/data/profile.js`; components render it. Never hardcode resume facts in components.
- Every section earns its place for a recruiter; personal content (Beyond Code) humanizes but stays tidy and scannable.
- Fast and mobile-solid: the owner reviews every change on localhost before it ships; mobile tap targets and performance have been deliberately tuned.

## Accessibility & Inclusion

- Keep text contrast ≥ 4.5:1 (small gold text on paper uses deep gold #8A6D1B; brighter golds are for large text, graphics, and dark bands only).
- Respect `prefers-reduced-motion` for any new animation; existing reveals are subtle fades.
- All icon-only links carry `aria-label`s.

## Visual system (summary) — "Paper & Gold" (locked 2026-07-10, owner: "I love the golden one")

- Fonts: Lora (serif display — headings, hero name w/ italic gold accent) + Poppins (body). Single theme; NO dark/light mode toggle.
- Palette: paper #FAF7F1 / alt #F3EEE4 / cards #FFFDF9; warm ink #221E16; golds — bronze #9C7A2A (graphics on paper), deep #8A6D1B (small text on paper), classic #C9A227 (accents on dark bands).
- Dark-ink bands: HERO, Skills, Coursework, Contact + Footer are dark #201C15 with #C9A227 gold, cream #F0EAE0 text, and #2A251C card surfaces; navbar is permanently dark. Paper sections between them (About, Experience, Featured, Projects, Beyond Code).
- Buttons: primary actions are INK-filled pills (#221E16 bg / #FAF7F1 text) on paper; CREAM-filled (#F0EAE0 bg / #201C15 text) on the dark hero. Gold is never a large button fill (owner rejected mustard fills).
- Section grammar: `.clark-section` + `.ghost-heading` watermark + `.section-label` (uppercase deep gold) + serif `.section-title`.
- Cards/panels: near-flat, 1px hairline borders rgba(34,30,22,0.06–0.14), 4–12px radii, hover = translateY(-2px) + gold border tint.
- Tags/chips: small, bordered, quiet; gold-tinted on paper.
- History: previous orange/dark identity preserved at commit c847e27; golden adopted at 519e981→8c65151 after owner approval.
