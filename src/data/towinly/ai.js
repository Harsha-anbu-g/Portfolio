// The AI tab: the old case-study page, moved in whole. Each of its sections becomes a card;
// the card shows a short lead, and Read more opens the section exactly as it was written.
import fragment from "./ai-casestudy.html?raw";

export const AI_FRAGMENT = fragment;

// One plain lead per section, each taken from what that section says.
const LEADS = {
  "one-minute": "Ask AI is a tortoise inside the app that elders can ask anything. It began in July 2026 as a simple chat and grew one tested step at a time.",
  timeline: "July 2026: a help bot on the website. October 2026: answers from the user guide, tools, agents, and a move to OpenAI.",
  steps: "Cost caps, an evaluation set, read-only tools, an MCP server, answers from the guide, better matches, confirmed actions, agents and safety layers, each shipped with its tests.",
  privacy: "The model sees a first name, a role, a score, a streak and some counts. Never contact details.",
  built: "Spec first, tests first, a security review on every commit, and every setting behind a switch.",
  production: "Live since 24 October 2026: Spring Boot on Railway, Postgres with pgvector, and OpenAI for answers and search.",
  numbers: "108 MCP tools, 201 guide passages, 45 evaluation cases and 11 safety layers.",
  todo: "What is not done yet, listed plainly.",
  where: "Everything people use runs on the server. Five developer and agent tools run on the laptop.",
  tools: "Five small programs that let an AI assistant use Towinly the way a person taps it.",
  next: "Four parts, scoped and not started: an agent in the backend, Spring AI, embeddings inside the backend, and cost evidence.",
  questions: "Eight questions an interviewer might ask, answered in a few lines each.",
  "before-after": "Fourteen changes a person can feel, each with what it was like before and what runs behind it.",
  openai: "Groq's free tier allowed 8,000 tokens a minute, and one Ask AI question used about 6,500. So answers moved to OpenAI on 27 October 2026.",
  glossary: "The terms on this page, in plain words.",
};

function parseCards() {
  if (typeof DOMParser === "undefined") return [];
  const doc = new DOMParser().parseFromString(`<main>${fragment}</main>`, "text/html");
  const cards = [];
  const hero = doc.querySelector("section.hero");
  if (hero) {
    const lead = hero.querySelector(".lead");
    const leadText = lead ? lead.textContent.trim() : "";
    lead?.remove();
    cards.push({
      id: "ai-intro",
      label: "Case study",
      title: "Everything AI in Towinly",
      lead: [leadText],
      html: hero.outerHTML,
      visual: { kind: "shots", shots: ["elder-ask-ai"] },
    });
  }
  doc.querySelectorAll("section[id]").forEach((section) => {
    const wrap = section.querySelector(".wrap") || section;
    const label = wrap.querySelector(".section-label");
    const heading = wrap.querySelector("h2");
    const labelText = label ? label.textContent.trim() : "";
    const title = heading ? heading.textContent.trim() : section.id;
    label?.remove();
    heading?.remove();
    cards.push({ id: section.id, label: labelText, title, lead: [LEADS[section.id] || ""], html: wrap.innerHTML });
  });
  return cards;
}

export const AI_CARDS = parseCards();

export default {
  id: "ai",
  title: "Everything AI in Towinly",
  lead: "How an in-app helper for elders grew into a twelve-step AI programme.",
  bodySize: "md",
  sections: [],
};
