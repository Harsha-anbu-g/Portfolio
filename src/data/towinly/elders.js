// The Elders tab: the main reader. Larger body text, the friendliest voice, the real
// screens. Facts from the app's own copy (landingSlides.js, passOnLocks.js, trustStages.js,
// reunions.js) and the user-guide chapters.
export default {
  id: "elders",
  title: "For elders",
  lead: "What Towinly does for you, in plain words. Every screen below is the real app.",
  bodySize: "lg",
  sections: [
    {
      id: "for-you",
      title: "What Towinly is for you",
      body: [
        "Towinly is a phone app where an elder asks for what they need, and younger helpers nearby offer. Company, a ride, shopping, cleaning, or something else.",
        "You ask once, in one screen. Helpers close to you see it and offer. You choose who helps you, and you lead every step after that.",
        "Nobody is rushed. Slow is the point.",
      ],
      shots: ["elder-home"],
    },
    {
      id: "ask-help",
      title: "Ask for help in one screen",
      body: [
        "Tap Ask for help, pick what it is about, and write a line or two in your own words. That is the whole form.",
        "Your request sits on your home screen with an Open label while it waits. Helpers nearby see it and offer. You read who offered, look at their Trust Score, and say yes to one of them.",
      ],
      more: [
        "The five kinds of request are Company, Rides, Shopping, Cleaning, and Other. Company is the most common one: someone to talk to, a walk, a cup of tea.",
        "You can take a request down at any time, and you can mark it done once the help has happened.",
      ],
      shots: ["elder-ask-help", "elder-posted-help"],
    },
    {
      id: "trust-score",
      title: "Read a Trust Score before you say yes",
      body: [
        "Every member carries a Trust Score. Open a helper's profile and read it before you say yes to anyone.",
        "Each person a helper has helped can add up to 15 points: 3 for a checked profile with ID, phone and photo, 7 for the seven steps of the Trust Ladder climbed together, and 5 from that person's review.",
        "It is a reputation, not a one-time badge. It keeps changing as the helper connects with new people. Tap the three parts below to see how a score fills up.",
      ],
      extra: "score",
      shots: ["elder-trust-people"],
    },
    {
      id: "ladder",
      title: "Trust grows one step at a time",
      body: [
        "In real life you do not trust a stranger on day one. You message. Then a phone call. Then video. Then you meet. Towinly works the same way.",
        "Every friendship climbs the same seven steps, from Just Connected to Fully Trusted. Both of you must say yes to each step. Nothing personal, like a phone number, is shared until trust has grown.",
        "Tap a step to see what it is and what it opens.",
      ],
      extra: "ladder",
      more: [
        "Either of you can pause the climb or stop it altogether, at any step. A pause keeps what you have; a stop ends the friendship on both phones.",
        "The people you named as emergency contacts are told on the day you first meet a helper in person.",
      ],
      shots: ["elder-trust", "elder-home-building-trust"],
    },
    {
      id: "friends",
      title: "Friends, never matches",
      body: [
        "Towinly says friends. Tap the plus on your home screen to find helpers near you, closest first, each with their Trust Score, or New here if they have just joined.",
        "You choose how far Towinly looks, from 5 to 100 kilometres. Tap a person to read their full profile, then tap Connect to ask. They are asked before anything happens.",
        "Invites from others wait on the New invites tab. Accept or decline. Declining is final, and the app checks first.",
      ],
      shots: ["elder-friends", "elder-friends-invites"],
    },
    {
      id: "messages",
      title: "Messages stay inside the app",
      body: [
        "Chat lives inside Towinly. Your phone number is not part of it until you both reach the Phone Ready step.",
        "Each friend has one thread. New messages show on the Messages tab, and an alert on your lock screen says a message arrived without showing its words.",
      ],
      shots: ["elder-messages", "elder-chat-ethan"],
    },
    {
      id: "check-in",
      title: "Check in once a day",
      body: [
        "One tap a day tells the family you linked that you are alright. The first time you open the app on a day, Towinly walks you to the check-in. Tap I'm here today, and the screen names who can see it.",
        "A streak counts the days in a row. Skipping a day is never a problem. The app calls it a gentle signal, never a duty.",
        "If you go quiet, the people you named are told. You choose how many quiet days pass first, from 1 to 30, for each of them.",
      ],
      shots: ["elder-checkin", "elder-emergency-contacts"],
    },
    {
      id: "sos",
      title: "SOS",
      body: [
        "Name up to three people: a daughter, a neighbour, a family friend. Their name, their number, who they are to you. Tap a name to call them.",
        "One SOS button texts all of them at once. You may never need it. It is there.",
      ],
    },
    {
      id: "family-watch",
      title: "Family can watch over",
      body: [
        "You can invite up to five family members to stay close. They see each friendship climb its seven steps, hear right away when something needs attention, and can look at a new helper and share their view.",
        "You are always in charge. Every friendship has its own switch, on or off, at any time. Family sees only what you choose to share.",
      ],
      shots: ["elder-family", "elder-family-sharing"],
      links: [{ label: "The family tab", href: "#family" }],
    },
    {
      id: "boxes",
      title: "My boxes: what I pass on",
      body: [
        "Three boxes for the things you want to leave behind. Your stories, your letters, and the things only you know. You choose who sees each one.",
        "Stories: how you met, what you learned the hard way, the recipe nobody else has. Each one is shown to anyone, to your family, to your helpers, or to one person you name.",
        "Letters: a letter goes to one person, and only that person. They can read it now, or it is held until after you are gone.",
        "The Sealed box: where the money is, which bank, where the papers are kept. Written down once, scrambled before it is saved, and opened only by you.",
      ],
      more: [
        "Nothing opens on its own. Before a held letter or the sealed box is ever passed on, a person at Towinly checks a death certificate, asks the people you chose, and tries to reach you for thirty days. All three, every time.",
        "Keyholders are the people who can one day ask to open your sealed box: at least three from your family list, and each must say yes. You choose how many of them must agree, never one and never all of them, so a person far away can never keep it shut forever.",
        "The sealed box is scrambled before it is saved, and the key that unscrambles it is kept away from the data. Every time it is opened, the app writes down when, and you can see that list. You can never be shut out of your own box. Forget your password and you reset it the way you always do.",
        "Save the one-page sheet and keep it with your will. This is not a will, and it does not replace one. A will decides who gets your money, your home and your things. Nothing in these boxes changes that.",
      ],
      shots: ["elder-pass-on", "elder-story-detail", "elder-sealed-items", "elder-pass-on-sheet"],
    },
    {
      id: "reunions",
      title: "Reunions",
      body: [
        "Say who you want to see again: your college batch, your old office, the street you grew up on. A helper you already fully trust, or a family member you gave the power, does the finding and the planning. You approve every step.",
        "A reunion takes seven steps, like the ladder. A stranger can never organise one. The venue is a public place or a family home, never the helper's home. Nobody closes the reunion until every guest is confirmed home.",
      ],
      extra: "steps",
      steps: [
        "Wish. You say who, where, and the years.",
        "Organiser. You choose who plans it, from the people allowed.",
        "Finding. One list: remembered, found, reached, coming.",
        "Plan. The day, the place, a ride for each guest, the food, the budget. You approve it.",
        "The day. Each guest is checked in as they arrive. SOS works as always.",
        "Send-off. Every guest confirmed home, and a thank-you to each.",
        "After. Reviews both ways, and the story goes into your boxes if you like.",
      ],
      more: [
        "You can stop a reunion at any step before it is done. The organiser can step down before the day, and the reunion goes back to choosing an organiser.",
      ],
    },
    {
      id: "ask-ai",
      title: "Ask AI",
      body: [
        "A helper you can ask anything about the app, in your own words. It answers with the app's own words, from the user guide, and it knows your own situation when you let it.",
        "It can offer to do something for you, like today's check-in or a help request. Nothing happens until you tap Yes on a plain confirm. Your contact details never leave the app.",
      ],
      shots: ["elder-ask-ai"],
      links: [{ label: "Everything AI, in full", href: "#ai" }],
    },
    {
      id: "peekaboo",
      title: "A quiet minute: Peekaboo",
      body: [
        "A small, calm memory game on a tortoise shell: 12 cells, 6 hidden pairs. Tap two cells; a match stays turned over.",
        "A ring counts down from 60 seconds, and you can pause it. Nothing you do in the game is saved or sent anywhere. It is only there for a quiet minute.",
      ],
      shots: ["game-menu-elder"],
    },
    {
      id: "languages",
      title: "Your words, your language",
      body: ["Towinly speaks English, French and Tamil. Every screen, every button, every message from the app."],
    },
    {
      id: "safety",
      title: "Staying safe",
      body: [
        "Scammers go after elders, and elders deserve to be safe. So ID is checked before a profile is full, and the ID photo is never shown to members.",
        "Nothing personal is shared until trust has grown. Block a person and they are gone from every phone you sign in on. Report from any profile. Your data is never sold, and you can export it or delete your account from your profile.",
      ],
      shots: ["elder-profile"],
    },
    {
      id: "demo",
      title: "Try it as Margaret",
      body: [
        "Twenty demo people live on towinly.com, so you can try the app before you join. Tap Try as an Elder on the login page and you are Margaret, 73, a retired teacher who likes chess, gardening and a good cup of tea.",
        "Below are the people you will meet there.",
      ],
      extra: "cast",
      shots: ["login"],
    },
    {
      id: "elders-iphone",
      title: "The iPhone app",
      body: [
        "Towinly is a native iPhone app, in TestFlight since August 2026 and in Apple's review since October. The same build runs in your phone's browser at towinly.com/app.",
      ],
      links: [{ label: "The iPhone app, in full", href: "#iphone-app" }],
    },
  ],
};
