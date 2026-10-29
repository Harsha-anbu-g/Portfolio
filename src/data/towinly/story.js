// The Story tab, built mainly from the Instagram story run (the six "How Towinly began"
// posts, word for word, through artworks.js) and the two pitch decks (District 3, 26 Oct
// 2026; investor deck, Aug to Sep 2026). Numbers are the verified ones in RESEARCH.md.
import { AI_TOOLS, BUILD_LINE, METHOD } from "./facts";
import { TOWINLY_INSTAGRAM, TOWINLY_LINKEDIN, TOWINLY_GITHUB_WEB, TOWINLY_GITHUB_APP, TOWINLY_VIDEO } from "./links";

export default {
  id: "story",
  title: "The story",
  lead: "Told mainly the way it was told on Instagram and in the pitch: six parts from the founder, and the facts behind them.",
  bodySize: "md",
  sections: [
    {
      id: "s-new-elder",
      title: "A new kind of elder is coming, and more of them than ever",
      body: [
        "My grandfather is an elder today. My father will be one in ten years. Both use a phone. The difference: my father pays online every day, and my grandfather never has.",
        "The next generation of elders is the first in history that arrives at old age already online. That changes what is possible for them. And there will be more of them than ever: medicine keeps people alive longer, fewer children are born, and the baby boom generation is turning 65 right now.",
      ],
      more: [
        "Life expectancy went from 47 years in 1950 to 73 today (United Nations). Canada is down to 1.26 children per woman, one of the lowest rates in the world (Statistics Canada, 2023). By 2050, 2.1 billion people on Earth will be over 60, double what it was in 2020 (World Health Organization).",
      ],
    },
    {
      id: "s-problem-run",
      title: "Four pictures of the problem",
      body: [
        "Before Towinly said a word about itself on Instagram, it showed what is broken. Four posts, Towinly nowhere in them, on purpose. Tap one to read it.",
      ],
      extra: "artworks:problem",
    },
    {
      id: "s-two-things",
      title: "Two things about growing old have not changed",
      body: [
        "The first is loneliness. The US Surgeon General compared chronic loneliness to smoking fifteen cigarettes a day. In Canada, 42 percent of people over 85 live alone.",
        "The second is energy. Simple tasks get hard. Groceries. A ride to the clinic. A light bulb.",
        "Meanwhile, young people nearby have energy to spare. Each side has what the other needs. So why has nobody connected them? Trust. An elder cannot let a stranger into their home on day one. Help is easy to find. Trust takes time.",
      ],
    },
    {
      id: "s-origin-run",
      title: "How Towinly began, in six parts",
      body: ["The founder told the story in six Instagram posts, in his own words. They are here as they were posted."],
      extra: "artworks:origin",
    },
    {
      id: "s-why-now",
      title: "Why now",
      body: [
        "Smartphone ownership among Americans over 65 went from 13 percent in 2012 to 78 percent in 2025 (Pew Research Center). Seven in ten payments by urban Indians over 60 are digital (Kearney, 2024). One in six people on Earth will be over 60 by 2030 (World Health Organization).",
        "The biggest elder generation ever, and the first that pays online.",
      ],
    },
    {
      id: "s-why-matters",
      title: "Why it matters",
      body: [
        "People with strong social ties have 50 percent better odds of survival, across 148 studies (Holt-Lunstad, PLOS Medicine, 2010). Social isolation among older adults adds an estimated 6.7 billion US dollars a year to Medicare spending (AARP with Stanford, 2017).",
        "Company isn't a luxury. Company is healthcare.",
      ],
    },
    {
      id: "s-solution",
      title: "The solution",
      body: [
        "A trust app, on the phone elders already carry. Three seats.",
        "The elder asks for a ride, shopping, or someone to talk to, and leads every step. Helpers nearby offer: they give time, earn money, and build a Trust Score. Family watches over: up to five relatives see each friendship grow.",
        "Everything is free, and always free for elders who cannot pay. Slow is the point.",
      ],
      links: [
        { label: "For elders", href: "#elders" },
        { label: "For helpers", href: "#helpers" },
        { label: "For family", href: "#family" },
      ],
    },
    {
      id: "s-what-ships",
      title: "What ships",
      body: [
        "Help nearby. Chat inside the app. Family watch. The daily check-in. Stories, letters and a sealed box. SOS, blocks that hold on every phone, and alerts that never carry message text. Since October 2026: Reunions, and Ask AI.",
      ],
      links: [
        { label: "Help nearby", href: "#ask-help" },
        { label: "Chat", href: "#messages" },
        { label: "Family watch", href: "#family-watch" },
        { label: "Check-in", href: "#check-in" },
        { label: "The boxes", href: "#boxes" },
        { label: "SOS", href: "#sos" },
        { label: "Reunions", href: "#reunions" },
        { label: "Ask AI", href: "#ask-ai" },
      ],
    },
    {
      id: "s-why-we-win",
      title: "Why Towinly, and not a matching app",
      body: [
        "Everyone else matches. Towinly builds trust.",
        "Other services match an elder with a stranger instantly. Towinly makes trust itself the product: a ladder both people climb, a score the elder reads first, and a family watching over.",
      ],
      more: [
        "Match instantly with strangers, or seven trust steps both say yes to. Built for the young, or designed for a 75-year-old. The elder as a customer, or elders who give back skills and stories. Family locked out, or family watch, SOS and the daily check-in.",
      ],
    },
    {
      id: "s-business",
      title: "Free, and how it could pay for itself one day",
      body: ["Everything is free at launch, and always free for elders who cannot pay. Nothing is charged today."],
      more: [
        "The lines pitched to investors for later: a small share of paid tasks such as rides and errands, with companionship staying free; optional Elder Plus and Helper Pro subscriptions; optional extras for adult children; partnerships with insurers, elder-care brands and hospitals.",
      ],
    },
    {
      id: "s-team",
      title: "One dream since childhood",
      body: [
        "Harshavardhan Anbu Gowri. Master's in computer science at Concordia, Montreal. As a child he wanted to be a scientist and invent something. Then software. Then, once he learned about mobile apps and startups, building an application became the dream.",
        "The problem was always the team. One person could not build a product like this. Then AI arrived, and the team problem was solved. He built Towinly alone: the iPhone app, the backend, the website, the tests.",
      ],
    },
    {
      id: "s-built-how",
      title: "How it was built, and how long",
      body: [
        BUILD_LINE,
        "The first commit on the backend was on 11 April 2026. Since then the web app, the iPhone app, the AI round and Reunions have shipped from one keyboard.",
      ],
      extra: "timeline",
      more: [`The AI tools, in order of how much they did: ${AI_TOOLS.join("; ")}.`, ...METHOD],
    },
    {
      id: "s-numbers",
      title: "The numbers",
      body: ["Each number carries its date, because they keep moving."],
      extra: "stats",
    },
    {
      id: "iphone-app",
      title: "The iPhone app",
      body: [
        "Towinly on the iPhone is a native app built with React Native and Expo, on the same backend as the web. It uses the phone's own controls, the iOS switch, sheets and alerts, rather than drawn copies, and on iOS 26 the tab bar is real Liquid Glass.",
        "Push notifications arrive for messages and help activity, and the lock screen never shows a message's words. Your location is rounded on the phone, to a square about two kilometres across, before it is ever sent. English, French and Tamil throughout.",
        "In TestFlight since 24 August 2026. Version 1.1.0, build 26, has been in Apple's review since 8 October 2026. The same build runs on any phone at towinly.com/app. Android is not built.",
      ],
      shots: ["landing-01", "login", "register-role", "elder-home", "helper-home", "family-home"],
    },
    {
      id: "s-built-live",
      title: "Built and live",
      body: [
        "Live on the web at towinly.com. The iPhone app in Apple's review. English, French and Tamil. Built and tested by one person, ready for the first hundred elders.",
      ],
    },
    {
      id: "s-ask",
      title: "The ask",
      body: [
        "Join the first mile. Pilot communities: senior centres, retirement residences, neighbourhood associations. First-wave helpers: students, volunteers, retirees giving back. Family champions: adult children who bring Towinly home to a parent. Partners and funders.",
        "Write to help@towinly.com, or to Harsha directly.",
      ],
    },
    {
      id: "s-online",
      title: "Towinly online",
      body: [
        "The feed at @towinly.trust carries the story one post at a time: the problem, the origin, the boxes, the family. The LinkedIn page and the GitHub repos hold the rest.",
      ],
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
