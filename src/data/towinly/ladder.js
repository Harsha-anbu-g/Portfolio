// The seven steps of the Trust Ladder, in the app's own words (App/src/lib/trustStages.js
// for the names; the user guide and posts 44 and 46 for what each step opens).
export const LADDER = [
  { id: "just-connected", name: "Just Connected", what: "You see each other's profile and the Trust Score.", unlocks: "Nothing personal yet." },
  { id: "messaging", name: "Messaging", what: "A private chat inside the app.", unlocks: "Family you invited can now follow this friendship." },
  { id: "phone-ready", name: "Phone Ready", what: "Share numbers and call each other.", unlocks: "Your phone numbers, shown to each other only." },
  { id: "video-ready", name: "Video Ready", what: "A video call, so you see a face.", unlocks: "A face to go with the voice." },
  { id: "social-media", name: "Social Media", what: "Share social profiles, one more kind of evidence.", unlocks: "Each other's social links." },
  { id: "ready-to-meet", name: "Ready to Meet", what: "Plan a first meeting in a public place.", unlocks: "The people you named are told the day you meet." },
  { id: "fully-trusted", name: "Fully Trusted", what: "You met, and trust is earned.", unlocks: "A helper here can organise a reunion for you." },
];

export const LADDER_RULE = "Both must say yes to every step. Either side can pause or stop at any time.";
export const LADDER_COUNT = LADDER.length;
