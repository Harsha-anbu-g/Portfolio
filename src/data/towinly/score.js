// The Trust Score: up to 15 points per person you help (App/src/data/landingSlides.js),
// and the five tiers the website shows (ToWin/frontend/src/components/TrustBadge.jsx).
export const SCORE_PARTS = [
  { key: "profile", points: 3, title: "Profile checked", body: "ID, phone and photo, all checked." },
  { key: "ladder", points: 7, title: "The seven steps", body: "One point for each step you climb together." },
  { key: "review", points: 5, title: "Their review", body: "One point per star from the person you helped." },
];

export const SCORE_MAX = 15;

export const SCORE_TIERS = [
  { name: "New Member", range: "0 points" },
  { name: "Getting Started", range: "1 to 14" },
  { name: "Reliable", range: "15 to 44" },
  { name: "Highly Trusted", range: "45 to 89" },
  { name: "Community Champion", range: "90 and above" },
];
