// The Story tab. It opens on the founder's six-part Instagram run, "How Towinly began"
// (artworks in captions.json; the short words under each are his own, trimmed from the
// caption), then the facts from the two pitch decks (District 3, 26 Oct 2026; investor
// deck, Aug to Sep 2026). Every card shows all its words: no Read more on this tab.
// Numbers are the verified ones in RESEARCH.md.
import { BUILD_LINE } from "./facts";
import { TOWINLY_INSTAGRAM, TOWINLY_LINKEDIN, TOWINLY_GITHUB_WEB, TOWINLY_GITHUB_APP, TOWINLY_VIDEO } from "./links";

export default {
  id: "story",
  title: "The story",
  lead: "Told the way the founder told it on Instagram, in six parts, then the facts from the pitch.",
  bodySize: "lg",
  sections: [
    {
      id: "s-origin-run",
      extra: "artworks:origin",
      // One entry per artwork, Part 1 to 6. The title is the heading printed on the artwork.
      parts: [
        {
          title: "The thing I think no one else noticed",
          body: [
            "My father pays online all the time. My grandfather does not. When my father grows old, he will join the first generation of elders who already use phones and pay online. I noted it down. Towinly grew out of that one note.",
          ],
        },
        {
          title: "The mix",
          body: [
            "Elders face two problems: loneliness, and tasks that take energy. Young people like me have energy to spare, and need what elders have: life lessons, money, advice.",
            "So I started to mix people, on one condition: helpers bring the love and care they would give their own grandparents.",
          ],
        },
        {
          title: "How I built trust",
          body: [
            "I asked myself: how did I come to trust my own friend? Day one, I knew him and nothing more. Full trust came in layers, over a long time.",
            "So Towinly climbs the same seven layers, and both people say yes to every step. Slow is the point.",
          ],
        },
        {
          title: "Trust comes from evidence and pattern",
          body: [
            "You have never met your pilot, and you still step aboard. Their certificates are the evidence. Every safe trip before yours is the pattern.",
            "Towinly builds both into the Trust Score: each person you connect with can add up to 15 points.",
          ],
        },
        {
          title: "Where the boxes came from",
          body: [
            "One day I asked myself: what if I die? I have ideas no one knows about, and things I keep meaning to tell my mother and my father.",
            "So Towinly keeps three boxes: Stories, Letters, and a Sealed box that opens only after you are gone.",
          ],
        },
        {
          title: "One person is building Towinly",
          body: [
            "As a child I wanted to be a scientist. A few years ago, an app like this took a big team. Now there is AI.",
            "I build the app. I test it. I run the database. I write the posts.",
          ],
        },
      ],
    },
    {
      id: "s-team",
      title: "Harshavardhan Anbu Gowri",
      body: [
        "Founder of Towinly. Master's in computer science at Concordia, Montreal.",
        "He built Towinly alone: the iPhone app, the backend, the website and the tests.",
      ],
    },
    {
      id: "s-why-now",
      title: "Why now",
      body: [
        "Seven in ten payments by urban Indians over 60 are digital (Kearney, 2024). By 2030, one in six people on Earth will be over 60 (World Health Organization).",
        "The biggest elder generation ever, and the first that pays online.",
      ],
    },
    {
      id: "s-why-matters",
      title: "Why it matters",
      body: [
        "Social isolation among older adults adds an estimated 6.7 billion US dollars a year to Medicare spending (AARP with Stanford, 2017).",
        "Company isn't a luxury. Company is healthcare.",
      ],
    },
    {
      id: "s-solution",
      title: "The solution",
      body: [
        "A trust app on the phone elders already carry. The elder asks for a ride, shopping or company, and leads every step.",
        "Helpers nearby offer their time. Up to five relatives watch over.",
      ],
    },
    {
      id: "s-what-ships",
      title: "What ships",
      body: [
        "Help nearby, chat, family watch and the daily check-in. Stories, letters and a sealed box. SOS, and blocks that hold on every phone.",
        "Since October 2026: Reunions and Ask AI.",
      ],
      shots: ["elder-home"],
    },
    {
      id: "iphone-app",
      title: "The iPhone app",
      body: [
        "A native app, built with React Native and Expo on the same backend as the web, in English, French and Tamil.",
        "In TestFlight since 24 August 2026, and in Apple's review since 8 October. The same build runs on any phone at towinly.com/app.",
      ],
      shots: ["landing-01", "login", "register-role", "elder-home", "helper-home", "family-home"],
    },
    {
      id: "s-why-we-win",
      title: "Why Towinly, and not a matching app",
      body: [
        "Towinly makes trust the product: a ladder both people climb, a score the elder reads first, and a family watching over.",
      ],
      extra: "compare",
      compare: [
        ["Match instantly with strangers", "Seven trust steps both say yes to"],
        ["Built for the young", "Designed for a 75-year-old"],
        ["The elder as a customer", "Elders who give back skills and stories"],
        ["Family locked out", "Family watch, SOS and the daily check-in"],
      ],
    },
    {
      id: "s-business",
      title: "Free, and how it could pay its way",
      body: [
        "Always free for elders who cannot pay. Later, the plan is a small share of paid tasks such as rides and errands, optional subscriptions, and partners such as insurers. Companionship stays free.",
      ],
    },
    {
      id: "s-built-how",
      title: "How it was built, and how long",
      body: [
        BUILD_LINE,
        "Claude Code did most of the work, with Codex, Cline and Claude Design beside it.",
      ],
      extra: "timeline",
    },
    {
      id: "s-numbers",
      title: "The numbers",
      body: ["Each number carries its date, because they keep moving."],
      extra: "stats",
    },
    {
      id: "s-ask",
      title: "The ask",
      body: [
        "Towinly is live and ready for its first hundred elders. Join the first mile: senior centres, student and volunteer helpers, adult children who bring it home to a parent, partners and funders.",
      ],
      links: [{ label: "help@towinly.com", href: "mailto:help@towinly.com" }],
    },
    {
      id: "s-online",
      title: "Towinly online",
      body: ["The story goes on at @towinly.trust, one post at a time. LinkedIn and GitHub hold the rest."],
      extra: "artworks:online",
      links: [
        { label: "Instagram", href: TOWINLY_INSTAGRAM },
        { label: "LinkedIn", href: TOWINLY_LINKEDIN },
        { label: "The walkthrough video", href: TOWINLY_VIDEO },
        { label: "GitHub, web", href: TOWINLY_GITHUB_WEB },
        { label: "GitHub, iPhone app", href: TOWINLY_GITHUB_APP },
      ],
    },
    {
      id: "s-closing",
      title: "The closing card",
      body: ["Every Towinly post and reel ends on the same card, so a first-time viewer leaves knowing what it is."],
      extra: "closing",
    },
  ],
};
