// The Technical tab, for engineers. Counts carry their dates; sources are the two repos,
// the store listing's data table, and the AI case study.
import { AI_TOOLS } from "./facts";
import { TOWINLY_GITHUB_WEB, TOWINLY_GITHUB_APP } from "./links";

export default {
  id: "technical",
  title: "For the technical reader",
  lead: "What it is made of, the numbers with their dates, and the parts that are unusual.",
  bodySize: "md",
  sections: [
    {
      id: "t-picture",
      title: "One picture",
      body: ["Three clients, one API, one database. Everything else hangs off the API."],
      extra: "architecture",
    },
    {
      id: "t-stack",
      title: "The stack",
      body: [
        "Backend: Java 21, Spring Boot, PostgreSQL with pgvector, Redis, WebSocket chat, push notifications, Twilio SMS, S3, OpenAI, on Railway.",
        "Web: React 19 and Vite on Vercel. Phone: React Native, Expo SDK 54, Expo Router, EAS builds, TestFlight. Tooling: JUnit 5 and Mockito, Jest, GitHub Actions, SonarQube and Snyk.",
      ],
    },
    {
      id: "t-numbers",
      title: "The numbers, each with its date",
      body: ["Counts move. The date tells you when each was true."],
      extra: "stats",
      more: [
        "129 REST endpoints across 22 controllers, counted on 28 October 2026. 277 Java source files and 107 Java test files on the backend; 188 source files and 208 test files on the app. 20 API modules on the app side, one named function per action.",
      ],
    },
    {
      id: "t-state-machine",
      title: "The trust state machine",
      body: [
        "Seven rungs, one enum on the backend: DISCOVERED, MESSAGING, PHONE_CALL, VIDEO_CALL, VERIFIED, FIRST_MEET, TRUSTED. A rung advances only when both sides confirm. Either side can pause or resume.",
        "Each rung reveals something: phone numbers at PHONE_CALL, the shared family thread at FIRST_MEET, and a family alert on the first meeting. One vocabulary module names the rungs for every screen, and a test pins it, so the privacy policy and the ladder can never drift apart.",
      ],
      extra: "ladder-compact",
    },
    {
      id: "t-score",
      title: "The score",
      body: [
        "3 + 7 + 5 per connection: profile completeness, rungs climbed together, and the review from that person. Summed across every real friendship, so it is a reputation that keeps moving, not a badge earned once.",
        "Tiers on the website: New Member at 0, Getting Started from 1 to 14, Reliable from 15 to 44, Highly Trusted from 45 to 89, Community Champion at 90 and above.",
      ],
      extra: "score",
    },
    {
      id: "t-events",
      title: "Event-driven, and the jobs that run on their own",
      body: [
        "Chat runs over WebSocket, with push notifications for messages and help activity. A scheduled job watches check-ins and texts the elder's emergency contacts after the quiet days they chose. SOS fans out to every contact at once over Twilio.",
        "The demo accounts reset themselves a few minutes after a visitor's last change, so the public demo stays clean without anyone touching it.",
      ],
    },
    {
      id: "t-api-first",
      title: "Every feature is a callable function",
      body: [
        "The rule in the app: every user action exists as one named, exported function with a one-line plain-English doc, before any screen is wired to it. No fetch calls inside components. Twenty modules, verb-first names: postHelpRequest, acceptHelper, confirmTrustStep.",
        "A generator reads those doc comments and produces an MCP server with 108 tools, so an AI assistant can sign in as a person and do anything that person can do in the app, and nothing more. Twenty-one destructive tools demand an explicit confirm flag.",
      ],
      links: [{ label: "Everything AI, in full", href: "#ai" }],
    },
    {
      id: "t-security",
      title: "Security and privacy",
      body: [
        "Blocks are enforced on the server, so they hold on every device. Rate limits on sign-in and the public endpoints. An 18+ age gate at sign-up. ID photos are stored for a one-time staff check and never shown to members.",
        "Location is rounded on the device to about two kilometres before it is sent, and the API never returns a stored position. The sealed box is encrypted before it is saved, with the key kept away from the data, and every opening is logged.",
      ],
      more: [
        "What is collected, and where it goes. Name, photo, bio, interests, age and languages: shown to other members. Email and phone: run the account; the phone number is revealed only at Phone Ready and is sent to Twilio to deliver codes and alerts. The ID photo, optional: S3 in the US, for a staff check. Coarse location, optional: a town name, geocoded. Messages: between the two people, with a safety review only if reported. Questions to Ask AI: sent to the model with a first name and trust score, never contact details. Emergency contacts: texted on a first meeting and after quiet days.",
        "Everything is exportable and deletable in the app, from Profile, then Account and data.",
      ],
    },
    {
      id: "t-quality",
      title: "Quality",
      body: [
        "Tests first, on both sides: 1,124 backend tests (25 October 2026) and 1,401 app tests (29 August 2026, more since). CI on every push, with SonarQube and Snyk scanning. The store listing has its own test that recounts every field and fails on an em dash.",
        "In the AI round, a security review ran on every commit and findings were fixed the same day.",
      ],
    },
    {
      id: "t-method",
      title: "How it was built",
      body: [
        "A written spec, then a step-by-step plan, then code with its tests, then a review on localhost, then push. Claude Code did most of the work, with skills, hooks and sub-agents. Codex and Cline gave second opinions. Claude Design drew the phone app redesign.",
        "One person, since 11 April 2026. The tools, in order of how much they did:",
      ],
      extra: "list",
      items: AI_TOOLS,
    },
    {
      id: "t-links",
      title: "Links",
      body: ["The code, the diagrams, and the guide inside the app."],
      shots: ["guide"],
      links: [
        { label: "GitHub, web and backend", href: TOWINLY_GITHUB_WEB },
        { label: "GitHub, iPhone app", href: TOWINLY_GITHUB_APP },
        { label: "The architecture diagrams", href: "/architecture.html" },
        { label: "Everything AI", href: "#ai" },
      ],
    },
  ],
};
