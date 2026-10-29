// Turns each tab's sections into the cards the page shows one at a time. One idea per card:
// a section with both a phone screen and an interactive piece becomes two cards, and each
// Instagram post in the story runs becomes its own card with the artwork as its picture.
import { TABS, TAB_DATA } from "./tabs";
import { PROBLEM_RUN, ORIGIN_RUN } from "./artworks";
import { AI_CARDS } from "./ai";
import { VISUALS } from "./visuals";

const WIDGETS = new Set([
  "ladder", "ladder-compact", "score", "cast", "cast:helper", "cast:family", "timeline", "stats",
  "architecture", "closing", "steps", "list", "compare", "artworks:online",
]);

const wordCount = (text) => text.split(/\s+/).length;

/** The card shows one paragraph, or two when both are short; Read more holds everything. */
function textCard(section) {
  const body = section.body || [];
  const more = section.more || [];
  const take = body.length > 1 && wordCount(body[0]) + wordCount(body[1]) <= 48 ? 2 : 1;
  const hasMore = body.length > take || more.length > 0;
  return {
    id: section.id,
    title: section.title,
    lead: body.slice(0, take),
    sheet: hasMore ? [...body, ...more] : null,
    links: section.links || [],
  };
}

function artCards(section, run, label) {
  return run.map((art, i) => ({
    id: i === 0 ? section.id : `${section.id}-${i + 1}`,
    label: art.part ? `${label} · Part ${art.part} of 6` : `${label} · ${i + 1} of ${run.length}`,
    title: art.title,
    lead: art.paragraphs.slice(0, 1),
    sheet: art.paragraphs,
    links: [],
    visual: { kind: "art", art },
  }));
}

function cardsFor(section) {
  if (section.extra === "artworks:problem") return artCards(section, PROBLEM_RUN, "The problem, as posted");
  if (section.extra === "artworks:origin") return artCards(section, ORIGIN_RUN, "How Towinly began");
  const widget = WIDGETS.has(section.extra) ? { kind: "widget", name: section.extra, section } : null;
  const shots = section.shots ? { kind: "shots", shots: section.shots } : null;
  if (widget && shots) {
    return [
      { ...textCard(section), visual: shots },
      {
        id: `${section.id}-try`,
        title: section.tryTitle || "Try it",
        lead: section.tryLead ? [section.tryLead] : [],
        sheet: null,
        links: [],
        visual: widget,
      },
    ];
  }
  return [{ ...textCard(section), visual: widget || shots }];
}

function visualFor(card, index, fallbackPhoto) {
  const extra = VISUALS[card.id] || {};
  let visual = card.visual || null;
  if (extra.photo) visual = { kind: "photo", photo: extra.photo };
  if (extra.panel) visual = { kind: "panel", ...extra.panel };
  if (extra.founder) visual = { kind: "founder" };
  if (!visual) visual = { kind: "photo", photo: fallbackPhoto };
  const tone = visual.kind === "panel" ? "deep" : visual.kind === "shots" ? (index % 2 ? "tint" : "deep") : "tint";
  return { ...visual, bg: extra.bg || null, tone: extra.bg ? "photo" : tone };
}

function finish(tab, cards) {
  const title = TAB_DATA[tab.id].title;
  return cards.map((card, index) => ({
    ...card,
    lead: card.lead || [],
    sheet: card.sheet || null,
    html: card.html || null,
    links: card.links || [],
    tab: tab.id,
    label: card.label || title,
    index,
    total: cards.length,
    visual: visualFor(card, index, tab.photo),
  }));
}

export const DECKS = Object.fromEntries(
  TABS.map((tab) => [tab.id, finish(tab, tab.id === "ai" ? AI_CARDS : TAB_DATA[tab.id].sections.flatMap(cardsFor))])
);

/** Every card id → the tab that holds it, so #ladder opens the Elders deck on that card. */
export const CARD_INDEX = Object.fromEntries(
  Object.values(DECKS).flatMap((cards) => cards.map((card) => [card.id, card.tab]))
);
