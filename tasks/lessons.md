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

## 2026-07-10 — CORRECTION (later same day): the golden redesign was ACCEPTED
- **What actually happened:** "back to the original" did NOT mean the orange live design —
  it meant back to the golden design as it was before the night-mode toggle work. The user
  clarified: "i said you to only remove the dark and bright mode" and "i love the golden
  one you did." I over-reverted based on the 07-05 lesson pattern.
- **Rule:** When the user says "back to the original / revert," ask ONE plain question:
  back to WHICH state? (list the 2-3 candidate states by what they look like). Don't let
  a prior lesson bias the reading — the lesson said redesigns get reverted, and that
  expectation caused a misread of the correction's target.
- **Rule:** "No dark mode and light mode" = remove the theme-switching FEATURE, not the
  design. Feature removal ≠ design reversion.
- **Final state:** Paper & Gold is the locked identity (see PRODUCT.md visual system).
  Primary buttons are ink-filled — gold is never a large fill (mustard complaint).

## 2026-07-10 — (superseded by correction above) Full redesign rejected AGAIN (user-driven this time)
- **Pattern:** User asked "does the orange look good? feels AI-generated, give me ideas."
  I ran a full exploration: ember → blue → emerald → paper&gold + serif → dark-first night
  mode via Ralph. User approved each step in the moment, then ended with "back to the
  original, that's the problem, but other things are ok." Hours of churn → reverted to
  the exact live design. Same outcome as 2026-07-05, even though the user initiated it.
- **Rule:** Even when the USER asks for design change ideas, treat it as exploration, not
  commitment. Show cheap previews (the /palette-preview.html comparison page worked
  great — decisions came fast) and change NOTHING in src/ until a direction survives a
  day. Momentum-approval ("its good", "g8 is good") ≠ final approval.
- **Rule:** Content/functional edits (labels, links, ordering, new assets) are safe and
  stick. Visual identity edits (palette, fonts, backgrounds) get reverted. Bias effort
  accordingly.
- **Note:** The full paper&gold redesign is preserved at commit 519e981; the night-mode
  token work is parked on branch ralph/night-mode (US-001/US-002 done + WIP US-003).
  If the user ever wants them back, they exist.
