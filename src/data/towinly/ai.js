// The AI tab's words are the old case-study page, moved in whole. Its section list is read
// out of the fragment so the sub-nav and the hash index can never drift from it.
import fragment from "./ai-casestudy.html?raw";

export const AI_FRAGMENT = fragment;

export const AI_SECTIONS = [...fragment.matchAll(/<section id="([a-z0-9-]+)"[^>]*>[\s\S]*?<h2>([^<]+)<\/h2>/g)].map(
  (m) => ({ id: m[1], title: m[2].replace(/&amp;/g, "&") })
);

export default {
  id: "ai",
  title: "Everything AI in Towinly",
  lead: "How an in-app helper for elders grew into a twelve-step AI programme: retrieval over the user guide, tools, an MCP server, agents and eleven tested safety layers.",
  sections: AI_SECTIONS,
};
