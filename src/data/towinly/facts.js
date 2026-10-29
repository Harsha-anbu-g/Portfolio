// Numbers with their dates. Commit counts come from git on the day the asset script ran.
import gen from "./generated/facts.json";

export const FACTS = [
  { value: (gen.webCommits + gen.appCommits).toLocaleString("en-CA"), label: "commits on main, web and app together", asOf: gen.countedOn },
  { value: "129", label: "REST endpoints across 22 controllers", asOf: "2026-10-28" },
  { value: "1,124", label: "backend tests", asOf: "2026-10-25" },
  { value: "1,401", label: "app tests, more since", asOf: "2026-08-29" },
  { value: "108", label: "MCP tools, generated from the API", asOf: "2026-10-25" },
  { value: "3", label: "languages: English, French, Tamil", asOf: "2026-10-28" },
  { value: "20", label: "demo seats anyone can try", asOf: "2026-10-28" },
];

export const BUILD_LINE =
  "One person, about six and a half months so far, alongside a master's and a job search.";

export const AI_TOOLS = [
  "Claude Code, which did most of the work",
  "Codex",
  "Cline",
  "Claude Design, for the phone app redesign",
  "ChatGPT",
  "Gemini, for image and carousel work",
  "HeyGen HyperFrames and Remotion, for the reels",
  "Expo EAS, for the phone builds",
];

export const METHOD = [
  "A written spec before any code, then a step-by-step plan.",
  "Tests first. Every step shipped with its tests, and the suite stayed green.",
  "Every change reviewed on localhost before it was pushed.",
  "Security review on every commit in the AI round, findings fixed the same day.",
];
