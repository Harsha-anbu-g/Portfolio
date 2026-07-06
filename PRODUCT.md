# Product

## Register

brand

## Users

Recruiters, hiring managers, and engineers evaluating Harsha (Harshavardhan Anbuchezhian Gowri) for full-stack roles in Canada. They skim on desktop or mobile, usually arriving from his resume, LinkedIn, or GitHub, and decide within a minute whether to dig into projects or reach out.

## Product Purpose

A single-page portfolio (React + Vite, deployed on Vercel at portfolioharsha.vercel.app) that mirrors and expands his resume: featured project (ToWin), more projects, experience, skills, coursework, and a personal "Beyond Code" section. Success = a recruiter contacts him or opens a project's live demo/GitHub.

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

- Keep text contrast ≥ 4.5:1 (the light-section orange is darkened to #ba5300 for this reason; keep vivid #F96D00 for dark sections only).
- Respect `prefers-reduced-motion` for any new animation; existing reveals are subtle fades.
- All icon-only links carry `aria-label`s.

## Visual system (summary)

- Font: Poppins (single family, weight contrast). Accent: #F96D00 (dark bg) / #ba5300 (light bg). Darks: #111110–#252523 band; light sections: #f8f6f1.
- Section grammar: `.clark-section` + `.ghost-heading` watermark + `.section-label` (uppercase orange) + `.section-title`.
- Cards/panels: near-flat, 1px rgba white/black borders, 4–10px radii, hover = translateY(-2px) + orange border tint.
- Tags/chips: `.skill-tag` pattern — small, bordered, quiet.
