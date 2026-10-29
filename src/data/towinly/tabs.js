// The six readers, in the one order used everywhere on the page. Each tab has its own colour
// from Towinly's palette and a photo for its card on the front door.
import elders from "./elders";
import helpers from "./helpers";
import family from "./family";
import story from "./story";
import technical from "./technical";
import ai from "./ai";

export const TABS = [
  { id: "elders", label: "I'm an elder", short: "Elders", icon: "elder", accent: "green", photo: "tea-glasses-window", blurb: "What Towinly does for you, in plain words, with the real screens." },
  { id: "helpers", label: "I'm a helper", short: "Helpers", icon: "hands", accent: "blue", photo: "bag-outdoors", blurb: "How you find people to help, and how your Trust Score grows." },
  { id: "family", label: "I'm family", short: "Family", icon: "home", accent: "amber", photo: "phone-chat-hands", blurb: "How you stay close to your parent, and what you can see and do." },
  { id: "story", label: "Tell me the story", short: "Story", icon: "book", accent: "terracotta", photo: "letter-writing", blurb: "Why it exists, who built it, how, and how long it took." },
  { id: "technical", label: "I'm technical", short: "Technical", icon: "code", accent: "navy", photo: "laptop-code", blurb: "The stack, the numbers, the trust state machine, security." },
  { id: "ai", label: "Show me the AI", short: "AI", icon: "spark", accent: "violet", photo: "phone-blue", blurb: "Ask AI, retrieval, the MCP server, agents, safety layers." },
];

export const TAB_DATA = { elders, helpers, family, story, technical, ai };
