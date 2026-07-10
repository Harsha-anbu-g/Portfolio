# Lessons

## 2026-07-05 — Full redesign rejected
- **Pattern:** I replaced the whole visual identity (colors, fonts, layout) when asked to
  "make the frontend very well". The user rejected it: the LIVE deployed design (dark
  charcoal + orange #F96D00, Poppins) is the base and must not change.
- **Rule:** In this repo, never change the color palette, fonts, or overall style.
  Improvements = polish on top of the existing design (spacing, micro-interactions,
  performance, a11y), applied in small reviewable steps.
- **Rule:** Never push (or commit-then-push) without showing the result on localhost
  first and getting explicit approval. This overrides the global "push automatically"
  instruction for this project.
- **Rule:** Keep passes short. The user is time-sensitive; avoid long exploration or
  multi-skill ceremony before producing something visible.
- **Note:** Portfolio dev server lands on port 5176 locally (5173-5175 are occupied by
  other running projects, incl. ToWin on 5173). Always check the vite log for the port.

## 2026-07-09 — architecture.html rebuild rejected
- **Pattern:** Asked to "fix the UI/UX, the zoom and the mobile view" of the diagram
  viewer, I rebuilt the entire page: dark theme, restyled Mermaid diagrams, new floating
  controls, rewritten zoom code. User reverted it all: "old is good", "i just told you to
  edit the button on top", "don't touch the graph".
- **Rule:** The no-redesign rule covers standalone pages (public/*.html) too, not just
  the React site. Diagram/content styling is content — never re-theme it.
- **Rule:** A broad complaint ("UI/UX is not good") still means the smallest targeted
  fix. Read requests narrowly first; widen only if the user asks after seeing it.
