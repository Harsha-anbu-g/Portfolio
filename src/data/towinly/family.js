// The Family tab. Facts from landingSlides.js (family chapter), the store listing, the
// family API (delegated powers) and passOnLocks.js (keyholders).
export default {
  id: "family",
  title: "For family",
  lead: "You stay close from wherever you live. Your parent decides what you see.",
  bodySize: "md",
  sections: [
    {
      id: "f-account",
      title: "Your own family account",
      body: [
        "Join from your own account. Your parent invites you, up to five of you. Your home screen shows your parent's name, today's check-in, and anything that needs attention.",
      ],
      shots: ["family-home", "family-parent"],
    },
    {
      id: "f-journey",
      title: "See the journey, hear right away",
      body: [
        "Each friendship your parent shares with you appears with the step it has reached, from Just Connected to Fully Trusted. You get an alert the moment something needs attention: a first meeting planned, a quiet stretch, an SOS.",
        "You can look at a new helper and share your view. Once a friendship reaches Messaging, you can message that helper yourself.",
      ],
      shots: ["family-parent-today"],
    },
    {
      id: "f-powers",
      title: "What you can do for them",
      body: [
        "Your parent can grant you powers one at a time: things you may do on their behalf, such as planning a reunion. You can ask for a power. A yes grants exactly that one, and your parent can take it back.",
      ],
      shots: ["family-parent-cando"],
    },
    {
      id: "f-check-in",
      title: "The daily check-in, from your side",
      body: [
        "When your parent taps I'm here today, you see it. If they go quiet for the number of days they chose, the app tells you, on your phone and by text.",
      ],
    },
    {
      id: "f-keyholders",
      title: "Keyholders",
      body: [
        "Your parent may name you as one of the people who can one day ask to open their sealed box. At least three keyholders, and a number of them who must agree, never one and never all.",
      ],
      links: [{ label: "The three boxes, explained", href: "#boxes" }],
    },
    {
      id: "f-switch",
      title: "The elder stays in charge",
      body: [
        "Every friendship has its own switch. Your parent decides which ones you see, and can turn any of them off, any day.",
      ],
    },
    {
      id: "f-demo",
      title: "Try it as Sarah",
      body: ["Tap Try as Family on towinly.com and you are Sarah, Margaret's daughter, with her own family account."],
      extra: "cast:family",
    },
  ],
};
