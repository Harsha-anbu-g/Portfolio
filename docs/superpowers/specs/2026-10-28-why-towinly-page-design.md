# Why Towinly: one deep page for the whole product

**Date:** 2026-10-28
**Where it lives:** `harshavardhanag.com/towinly/` (this repo, a second Vite entry)
**Owner:** Harshavardhan Anbu Gowri (Harsha)
**Status:** design approved in conversation on 2026-10-28; this file is the written record.

## 1. Purpose

One page that explains Towinly end to end to whoever opens it: why it exists, who built it,
how and how long, what every feature does and why it is there, who the demo people are, what
the iPhone app is, and where to find Towinly online. The existing "Everything AI in Towinly"
case study folds in as one tab. Plain words first; technical where it earns its place.

Readers are mixed and equal (Harsha's call): recruiters and hiring managers, possible users
(elders, helpers, families), program panels and investors, and engineers. So the page opens
with a "who are you?" choice instead of guessing.

The main rule, in Harsha's words: the UX should be very good. Every decision below bends to
that.

## 2. Hard rules carried in from the rest of the site and the Towinly project

- Paper & Gold is the locked identity (PRODUCT.md). No new colours, no new fonts, no dark
  mode. Lora for headings, Poppins for body. Ink-filled pills for primary buttons; gold is
  never a large fill.
- Words a stranger reads go through `humanizer` then `stop-slop`, in that order, with the
  four owner-approved lines passed as do-not-touch: "It takes two To Win." · "Help is easy to
  find. Trust takes time." · "Slow is the point." · "Company isn't a luxury. Company is
  healthcare." No em dashes anywhere. No "not X, it's Y". Hashtags do not apply.
- Every piece names both sides: the elder and the younger helper.
- No invented facts. Every number and mechanic on the page traces to a source in section 9.
  Where a number has a date, the page says the date.
- Never call elders weak. Scammers target elders; elders deserve safety.
- Do not say "on the App Store" or anything about Android. The iPhone app is in Apple's
  review; Android is not built.
- No demo passwords on the page. The demo is reached through the one-tap buttons on
  towinly.com; the page links there.
- Nothing is committed until Harsha reviews on localhost; nothing is pushed until he says
  "push".

## 3. Page shape

### 3.1 Top bar
Same dark bar grammar as the site's navbar. Left: "Harsha" wordmark linking back to `/`.
Centre or right: the page name "Why Towinly". Right: four small icon-and-word links,
towinly.com · Instagram · LinkedIn · GitHub (section 8 has every URL). Height and tap targets
match the existing navbar (44px minimum).

### 3.2 The front door (hero + chooser)
- The Towinly tortoise mark (`/towin-logo.png`), the tagline "It takes <em>two</em> To Win."
  with "two" in italic, and one plain line: "Towinly connects elders with younger helpers
  nearby, and makes trust grow one step at a time."
- Six large cards, in this fixed order everywhere on the page:
  1. **I'm an elder** (visually first and largest: the main user)
  2. **I'm a helper**
  3. **I'm family**
  4. **Tell me the story**
  5. **I'm technical**
  6. **Show me the AI**
  Each card: a Lora title, one Poppins line saying what that tab gives them, a quiet arrow.
  Cards are real buttons (role=tab semantics live on the bar, the cards call the same
  select function). Minimum 120px tall on desktop, full-width stacked on phones.
- Choosing a card opens that tab and the cards collapse into a slim sticky bar (3.3). The
  hero stays above as a short header. Choosing is reversible: the bar always shows all six.

### 3.3 The sticky tab bar
- Six tabs in the same order, `role="tablist"`, arrow keys move, Home/End jump, Enter/Space
  select. The active tab is marked by colour, weight and a 2px gold underline (never colour
  alone).
- Sticks under the top bar once the chooser scrolls away. On phones it scrolls sideways with
  a visible fade at the edge so the sixth tab is discoverable; the active tab scrolls into
  view.
- Changing tabs updates the URL hash (`#elders`, `#helpers`, `#family`, `#story`,
  `#technical`, `#ai`). Back and forward buttons switch tabs. Loading a URL with a hash opens
  that tab directly with the chooser already collapsed. Unknown or empty hash: the chooser.
- Section ids inside tabs are unique across the page (`#ladder`, `#boxes`, `#reunions`,
  `#demo`, `#iphone-app`, …). A hash that names a section opens its tab and scrolls to it.
  Every heading carries a small copy-link control on hover/focus.
- On tab change, focus moves to the tab panel's heading (screen readers hear where they
  are) and the panel crossfades in (opacity only, 200ms, none under reduced motion).

### 3.4 Inside a tab
- A "On this page" sub-nav listing the tab's sections: a sticky left rail on wide screens
  (≥1024px), a horizontal chip row under the tab bar on phones. Scroll-spy highlights the
  current section. Each chip is a 44px target.
- Body text 17px on most tabs, 18px on the Elders tab, line length capped at about 68
  characters. Section rhythm 64px, chapter rhythm 96px.
- Progressive disclosure: each section opens with its two to four plain sentences; detail
  sits behind a "More about this" disclosure (`<details>` styled, keyboard-native).
- Phone screenshots sit in a `PhoneGallery` (3.5), never loose.

### 3.5 Interactive pieces (what makes it a document you use, not read)
| Piece | What it does | Where |
|---|---|---|
| `ReaderChooser` + `TabBar` | the front door and the sticky bar above | top |
| `TrustLadder` | the seven rungs as a tap-through: tap a rung (or arrow) and the panel says what that step is, what it unlocks, and that both must say yes; shows "Stage N of 7" | Elders, Helpers, Technical (compact) |
| `TrustScoreMeter` | three tappable parts, +3 profile, +7 ladder, +5 review, filling a 15-point bar with the formula 3 + 7 + 5 = 15 "per person you help" | Elders, Helpers |
| `PhoneGallery` | one iPhone frame showing the active shot, a thumbnail strip underneath; tap or arrow to change; each shot has alt text and a one-line caption; images lazy and sized to avoid layout shift | every people tab and the iPhone section |
| `DemoCast` | the demo people as cards (name, age, city, one line, role chip), filter chips Elders · Helpers · Family, and three "Try as…" links to towinly.com | Elders (full), Helpers and Family (their rows) |
| `Timeline` | April to October 2026 as a horizontal line on desktop, vertical on phones, one dot per milestone | Story, Technical |
| `StatTiles` | the numbers with their date | Story, Technical |
| `ArchitectureFigure` | one inline SVG of the system (phone app, web app, API, Postgres + pgvector, Redis, Twilio, S3, OpenAI, Railway, Vercel, EAS) with a text summary for screen readers; links to `/architecture.html` for the detailed diagrams | Technical |
| `SocialRow` | Towinly's links and Harsha's links, icon plus word, 44px targets | Story (bottom), footer |
| `ClosingCard` | tortoise mark, tagline, "Elders and younger helpers, nearby.", the four values | end of Story and the page footer |

Motion: transforms and opacity only, 150 to 250ms, ease-out, honoured
`prefers-reduced-motion` (crossfades become instant, the ladder still works).

## 4. Content by tab

Sources are named in section 9. Wording is drafted at build time and passed through the copy
rules in section 2; the facts below are fixed.

### 4.1 Elders (the main tab, 18px body, friendliest voice)
1. **What Towinly is for you.** Company, a ride, shopping, cleaning, or something else
   (the five request categories). An elder simply asks; helpers nearby see it and offer; the
   elder chooses and leads every step.
2. **Ask for help in one screen.** Shots: `elder-home`, `elder-ask-help`,
   `elder-posted-help`.
3. **Read a Trust Score before you say yes.** `TrustScoreMeter`. Profile with ID, phone and
   photo checked (+3); the seven steps (+7); star reviews from people they already helped
   (+5); up to 15 per person; a reputation that keeps changing, never a one-time badge.
   Shot: `elder-trust-people`.
4. **Trust grows one step at a time.** `TrustLadder`: Just Connected · Messaging · Phone
   Ready · Video Ready · Social Media · Ready to Meet · Fully Trusted. Both must agree to
   every step. Nothing personal, like a phone number, until Phone Ready. Either side can
   pause or stop. "Slow is the point." Shots: `elder-trust`, `elder-home-building-trust`.
5. **Friends.** Towinly says friends, never matches. Find people near you (5 to 100 km),
   closest first; send a request; invites and requested tabs. Shots: `elder-friends`,
   `elder-friends-invites`.
6. **Messages stay inside the app.** Shots: `elder-messages`, `elder-chat-ethan`.
7. **Check in once a day.** One tap tells your family you are alright; a streak counts the
   days; skipping is never a problem ("a gentle signal, never a duty"). Emergency contacts
   (up to three) are texted if you go quiet for the number of days you chose (1 to 30).
   Shots: `elder-checkin`, `elder-emergency-contacts`.
8. **SOS.** One button alerts every emergency contact at once. Family is also told the day
   you first meet a helper.
9. **Family can watch over.** Invite up to five relatives; they see each friendship climb,
   hear right away, help decide. The elder is always in charge; one switch turns sharing on
   or off. Shots: `elder-family`, `elder-family-sharing`.
10. **My boxes (What I pass on).** Stories (who sees: anyone, my family, my helpers, one
    person); Letters (one person; read now, or held until after you are gone: a person at
    Towinly checks a death certificate, asks the people you chose, and tries to reach you
    for thirty days; nothing opens on its own); the Sealed box (the things only you know;
    scrambled before saving; the key kept away from the data; every opening written down;
    at least three keyholders from your family list and a number of them who must agree;
    a one-page sheet to keep with your will). "This is not a will, and it does not replace
    one." Shots: `elder-pass-on`, `elder-story-detail`, `elder-sealed-items`,
    `elder-pass-on-sheet`.
11. **Reunions.** Seven steps: wish, organiser, finding, plan, the day, send-off, after.
    The organiser is a helper who is already Fully Trusted with you, or a family member
    holding that power; never a stranger. Venue is a public place or a family home, never
    the helper's home. Every guest is confirmed home before the reunion closes. The elder
    approves each step and can stop at any time. No screenshot yet (built 26 Oct 2026,
    after the screenshot set); drawn as a numbered step list.
12. **Ask AI.** A helper you can ask anything, answering with the app's own words from the
    user guide; it acts only after you tap Yes on a native confirm. Shot: `elder-ask-ai`.
13. **A quiet minute: Peekaboo.** A calm memory game on a tortoise shell, 12 cells, 6 pairs,
    a 60-second ring you can pause; nothing is saved or sent. Shot: `game-menu-elder`.
14. **Your words, your language.** English, French, Tamil.
15. **Staying safe.** ID checked before a profile is full and never shown to members;
    nothing personal shared until trust has grown; a block holds on every device; report
    from any profile; your data is never sold; export or delete your account from Profile.
16. **Try it as Margaret.** `DemoCast` with the whole cast and the one-tap demo on
    towinly.com (Try as an Elder: Margaret, 73, retired teacher, chess, gardening, tea).
    David Chen's three-day Toronto trip with Nina's offer as the worked example. The demo
    resets itself a few minutes after a visitor's last change.
17. **The iPhone app** (short, links to the full section in Story / Technical).

### 4.2 Helpers
1. See who needs a hand near you; offer; your jobs. Shots: `helper-home`,
   `helper-job-open`, `helper-offer-help`, `helper-my-jobs`.
2. Earn a Trust Score: `TrustScoreMeter`; a review card. Shot: `helper-reviews-card`.
3. The ladder from your seat: `TrustLadder`. Shot: `helper-ladder-open`.
4. Love and care first, money second (the founder's own hierarchy).
5. What elders pass on to you: stories shared with "my helpers". Shot: `helper-passed-on`.
6. Reunions as a real project with a beginning, a middle and an end, and a visible
   reputation for bringing people together.
7. Safety both ways: block, report, a family watching, and a score that shows your
   reliability.
8. Try it as Harsha (the demo helper, 23, tech support volunteer, chess). `DemoCast`
   filtered to helpers.

### 4.3 Family
1. Your own family account; an elder can invite up to five. Shots: `family-home`,
   `family-parent`.
2. See the journey; hear right away (first meet, SOS, quiet days); help decide (look at a
   helper and share your view); a family chat opens once a friendship reaches a step.
   Shot: `family-parent-today`.
3. What you can do for them: powers the elder grants one by one, and can take back.
   Shot: `family-parent-cando`.
4. The daily check-in from your side.
5. Keyholders for the sealed box: at least three, a number who must agree, never all of
   them.
6. The elder stays in charge: one switch.
7. Try it as Sarah (Margaret's daughter). `DemoCast` filtered to family.

### 4.4 Story (why Towinly)

Harsha's call (2026-10-28): the Story tab is built mainly from two sources, the Instagram
story run and the pitch decks. So its backbone is the six-part "How Towinly began" run,
word for word from the owner-approved captions, with each part's artwork beside it, and its
frame is the order of the District 3 pitch (problem, solution, built and live, how trust is
built, impact, team, the ask), with the investor deck filling in why now, why it matters,
what ships, why we win and the business model. Nothing in this tab is new prose except the
short connecting lines between parts, and those go through the copy rules.

1. **Opening, from the deck.** "A new kind of elder is coming. And more of them than
   ever." The grandfather and father pair: grandfather, an elder today, uses a phone but
   does not pay online; father, an elder in ten years, pays online every day. The first
   generation of elders who arrive at old age already online.
2. **Four pictures of the problem** (the problem run, posts 33 to 36, product nowhere in
   them, on purpose): a stranger at the door; "all fine here" on the Sunday call; a quiet
   week; she pays online now. Each as its artwork plus its caption, in a four-up strip the
   reader can tap open one at a time.
3. **Two things that have not changed, and trust keeps the fix away** (deck). Loneliness
   compared to fifteen cigarettes a day (US Surgeon General, 2023); 42% of Canadians over 85
   live alone (StatCan, 2021 Census); simple tasks get hard; young people nearby have energy
   to spare; an elder cannot let a stranger in on day one. "Help is easy to find. Trust
   takes time."
4. **How Towinly began, part 1 of 6: the thing I saw.** Caption of post 37 with its
   artwork (`towinly-ig-37-first-digital-elders`).
5. **Part 2 of 6: the mix.** Post 38 (`towinly-ig-38-the-mix`). Love and care first.
6. **Part 3 of 6: how I built trust, the ladder.** Post 39
   (`towinly-ig-39-how-i-found-the-trust-ladder`) with the compact `TrustLadder`.
7. **Part 4 of 6: how I built trust, the score.** Post 42 (`towinly-ig-42-how-i-built-trust-2`)
   with the `TrustScoreMeter`, plus the five score tiers from the product: New Member 0,
   Getting Started 1 to 14, Reliable 15 to 44, Highly Trusted 45 to 89, Community Champion
   90 and above.
8. **Part 5 of 6: where the boxes came from.** Post 40
   (`towinly-ig-40-where-the-boxes-came-from`).
9. **Part 6 of 6: team of one.** Post 41 (`towinly-ig-41-team-of-one`), the only signed
   part.
10. **Why now** (investor deck): smartphone ownership among Americans over 65 went from 13%
    to 78% in a decade (Pew); 7 in 10 payments by urban Indians over 60 are digital
    (Kearney, 2024); life expectancy 47 to 73 since 1950 (UN); 1 in 6 people over 60 by
    2030 (WHO). "The biggest elder generation ever, and the first that pays online."
11. **Why it matters** (investor deck, slide 7): 50% better odds of survival with strong
    social ties (148 studies, PLOS Medicine 2010); US$6.7 billion a year of extra Medicare
    spending on socially isolated older adults (AARP with Stanford, 2017); 2.1 billion over
    60 by 2050, India alone 347 million (WHO, UNFPA). "Company isn't a luxury. Company is
    healthcare."
12. **The solution** (deck): a trust app on the phone elders already carry. Three seats:
    the elder asks and leads every step; helpers nearby offer, give time, earn money, build
    a Trust Score; family watches over, up to five relatives. Free, always free for elders
    who cannot pay. "Slow is the point."
13. **What ships** (deck): help nearby; chat inside the app; family watch; daily check-in;
    stories, letters and the sealed box; SOS, blocks that hold on every phone, push alerts
    that never carry message text; and, since October 2026, Reunions (one afternoon with
    the people who knew you at twenty) and Ask AI. Each line links to its section on the
    Elders tab.
14. **Why we win** (deck): "Everyone else matches. Towinly builds trust." The four-row
    comparison: match instantly with strangers versus seven trust steps both say yes to;
    built for the young versus designed for a 75-year-old; the elder as a customer versus
    elders who give back skills and stories; family locked out versus family watch, SOS and
    the daily check-in.
15. **Business model, as pitched** (investor deck): everything is free at launch, and always
    free for elders who cannot pay; the lines ready for later (a small share of paid tasks,
    optional Elder Plus and Helper Pro, family extras, partnerships). Nothing is charged
    today.
16. **Team** (deck): one dream since childhood; AI solved the team problem; master's in
    computer science at Concordia; built Towinly alone: the iPhone app, the backend, the
    website, the tests. Artwork reuse: `towinly-ig-41-team-of-one`.
17. **How it was built, and how long.** `Timeline`: 11 April 2026 the backend starts; summer
   2026 the web app goes live and the brand becomes Towinly (26 July); 6 July the phone app
   starts; 16 August push notifications; 24 August the first TestFlight build; 29 August
   1,401 app tests; 8 October build 26 goes to Apple; 19 to 27 October the AI round (MCP
   server, answers from the guide, agents, the move to OpenAI); 26 October Reunions.
   One person, alongside a master's and a job search, about six and a half months so far.
   `StatTiles`: commits across the two repos (counted from git on build day, with the
   date), 129 REST endpoints, 20 API modules, 108 MCP tools, 3 languages, 20 demo seats.
   The AI tools, in this order: Claude Code (most of the work), Codex, Cline, Claude Design
   (the phone app redesign), ChatGPT, Gemini (image and carousel work), HeyGen HyperFrames
   and Remotion (the reels), Expo EAS (phone builds). The method: a written spec, then a
   plan, tests first, review on localhost, push only after approval.
18. **The iPhone app.** Section id `#iphone-app`. Built with React Native and Expo
   (SDK 54, Expo Router); native controls (the iOS switch, sheets, alerts) rather than
   drawn copies; the Liquid Glass tab bar on iOS 26; push notifications whose lock-screen
   text never carries a message; location rounded on the phone before it is sent; English,
   French and Tamil; in TestFlight since 24 August 2026; version 1.1.0 build 26 in Apple's
   review since 8 October 2026; bundle `com.towinly.app`; the same build runs on phones at
   towinly.com/app. Android is not built. `PhoneGallery` with `landing-01`, `login`,
   `register-role`, `elder-home`, `helper-home`, `family-home`.
19. **Built and live** (deck): towinly.com live; iPhone app in Apple's review; English,
    French and Tamil; built and tested by one person; ready for the first hundred elders.
20. **The ask, as pitched** ("Join the first mile"): pilot communities (senior centres,
    retirement residences, neighbourhood associations); first-wave helpers (students,
    volunteers, retirees giving back); family champions (adult children who bring Towinly
    home to a parent); partners and funders. One line of contact: help@towinly.com and
    Harsha's email.
21. **Towinly online.** The artworks already used above plus `towinly-ig-02-trust-ladder`
    and `towinly-ig-47-five-people-one-switch`, each linking to @towinly.trust; the
    LinkedIn page; the demo video post; GitHub (web and app repos). `SocialRow` with
    Towinly's links and Harsha's.
22. **Closing card.** Tortoise, tagline, "Elders and younger helpers, nearby.", the four
    values: Trust grows slowly: seven steps, and a yes from both at every one. Neither side
    shares anything personal until trust has grown. Either side can pause or stop at any
    time. Both sides win.

### 4.5 Technical (for engineers; readable, not a README dump)
1. **One picture.** `ArchitectureFigure`.
2. **Stack.** Backend: Java 21, Spring Boot, PostgreSQL with pgvector, Redis, WebSocket
   chat, push, Twilio SMS, S3, OpenAI, Railway. Web: React 19, Vite, Vercel. Phone: React
   Native, Expo SDK 54, Expo Router, EAS, TestFlight. Tooling: Jest, JUnit 5 and Mockito,
   GitHub Actions, SonarQube and Snyk.
3. **Numbers, each with its date.** 129 REST endpoints across 22 controllers; 277 Java
   source files and 107 Java test files; 1,124 backend tests (25 Oct 2026); 188 app source
   files and 208 app test files; 1,401 app tests (29 Aug 2026, more since); 20 API modules;
   108 MCP tools; commits per repo on build day.
4. **The trust state machine.** `DISCOVERED → MESSAGING → PHONE_CALL → VIDEO_CALL →
   VERIFIED → FIRST_MEET → TRUSTED`, mutual confirmation per rung, pause and resume, what
   each rung reveals (phone at `PHONE_CALL`, family chat at `FIRST_MEET`, family alert on
   first meet), one vocabulary module shared by every screen and pinned by a test.
5. **The score.** 3 + 7 + 5 per connection; why per connection (a reputation, not a badge).
6. **Event-driven backend.** Chat over WebSocket, push, the inactivity job that texts
   emergency contacts, SOS, demo accounts that reset after a quiet period.
7. **API-first, agent-callable.** Every feature is one named exported function with a
   plain doc line (20 modules, verb-first names); a generator reads those doc comments and
   produces 108 MCP tools, 21 destructive ones behind an explicit confirm flag. Link to the
   AI tab.
8. **Security and privacy.** Server-side blocks; rate limits; an 18+ age gate; ID photos
   stored for a one-time check and never shown to members; location rounded to about two
   kilometres on the device and never returned by the API; the sealed box scrambled with
   the key kept away from the data and every opening logged; the data table (what is
   collected, why, where it goes) from the store listing.
9. **Quality.** Tests first, CI on every push, a security review per commit in the AI
   round, store-listing tests that recount every field.
10. **How it was built.** Spec, plan, build, review, push; Claude Code with skills, hooks
    and sub-agents; Codex and Cline as second opinions; the one-person method.
11. **Links.** GitHub (web, app), `/architecture.html`, the user guides (elders, helpers,
    family, mobile), the AI tab.

### 4.6 AI
The existing `public/towinly-ai.html` body, moved in whole as an HTML fragment
(`src/data/towinly/ai-casestudy.html`), rendered inside the tab with its styles scoped under
`.ai-tab`. Its sub-nav is built from its `h2` headings. Its words are already checked and
stay byte-identical except for the page-level hero (replaced by the tab heading) and
internal anchors (kept working). `public/towinly-ai.html` becomes a small forwarding page:
meta refresh to `/towinly/#ai` plus a visible link, so shared links keep working.

## 5. Assets

- Screenshots: from `ToWin App/docs/user-guide/screenshots/ios-framed/` (1280×2756 PNG).
  Converted with `cwebp -q 80 -resize 480 0` into `public/towinly/shots/<name>.webp`
  (about 30 files, roughly 1 MB in all), each declared with width and height. The list is
  exactly the shot names in section 4; nothing else is copied.
- Instagram artworks: twelve from `ToWin App/marketing/instagram/posts/` (02, 33, 34, 35,
  36, 37, 38, 39, 40, 41, 42, 47), converted to 540px WebP into `public/towinly/social/`,
  each with the alt text from `marketing/instagram/captions.md`.
- Logo: the existing `/towin-logo.png`.
- No pitch deck PDF on the page by default (fact source only). Harsha can ask for a
  "Download the deck" link later.

## 6. Files

```
towinly/index.html                      second Vite entry: title, meta, OG, fonts
src/towinly/main.jsx                    mounts TowinlyPage
src/towinly/TowinlyPage.jsx             shell: TopBar, Hero + ReaderChooser, TabBar, panels, Footer
src/towinly/useTabRoute.js              hash <-> tab/section, history, focus handling
src/towinly/components/                 TopBar, ReaderChooser, TabBar, TabSubnav, Chapter,
                                        Disclosure, TrustLadder, TrustScoreMeter, PhoneGallery,
                                        DemoCast, Timeline, StatTiles, ArchitectureFigure,
                                        SocialRow, ClosingCard, SourceNote
src/towinly/tabs/                       EldersTab, HelpersTab, FamilyTab, StoryTab, TechnicalTab, AiTab
src/data/towinly/                       elders.js, helpers.js, family.js, story.js, technical.js,
                                        ladder.js, score.js, cast.js, timeline.js, facts.js,
                                        screenshots.js, links.js, ai-casestudy.html
src/towinly/towinly.css                 page styles on top of index.css tokens
public/towinly/shots/*.webp, public/towinly/social/*.webp
public/towinly-ai.html                  forwarding page
scripts/check-towinly.mjs               the checks in section 7
vite.config.js                          rollupOptions.input: index.html + towinly/index.html
src/data/profile.js, src/components/FeaturedProject.jsx
                                        third link card points to /towinly/ ("Why Towinly");
                                        the AI card text stays, href becomes /towinly/#ai
tasks/todo.md                           checklist, review notes
```

Each file stays under 400 lines; data files hold words, components hold layout, and no
resume fact is hardcoded in a component.

## 7. Verification (before Harsha sees it)

1. `npm run build` green, `npm run lint` clean.
2. `node scripts/check-towinly.mjs` fails on: any em dash in `src/data/towinly/`; any
   screenshot or artwork referenced in `screenshots.js` that is missing from `public/`;
   any tab or section id referenced by the sub-nav or a link that no panel defines; any
   image without width and height; the four brand lines altered.
3. Copy pass recorded in `tasks/todo.md`: humanizer run, then stop-slop run, then
   `grep -rn "—" src/data/towinly` returns nothing.
4. Localhost review at 390 and 1440 wide: no horizontal scroll, the chooser and bar work
   by mouse, touch and keyboard, back button switches tabs, every hash opens the right
   place, reduced motion honoured (toggled in the OS setting), focus visible everywhere,
   contrast of every new text style at or above 4.5:1 (deep gold `#8A6D1B` for small text
   on paper, bronze `#9C7A2A` only for graphics).
5. Harsha reviews on localhost; corrections; only then commit; push only on "push".

## 8. Links (every one on the page)

Towinly: `https://www.towinly.com/` · phone web `https://www.towinly.com/app` ·
Instagram `https://www.instagram.com/towinly.trust/` ·
LinkedIn `https://www.linkedin.com/company/towinly/` ·
GitHub web `https://github.com/Harsha-anbu-g/Towin` ·
GitHub app `https://github.com/Harsha-anbu-g/ToWin-App` ·
demo video post (LinkedIn) as in `profile.js` `video`.
Harsha: LinkedIn `https://www.linkedin.com/in/harsha-anbu-gowri` ·
GitHub `https://github.com/Harsha-anbu-g` · Instagram `https://www.instagram.com/harsha._.ag` ·
email `agharsha.anbu@gmail.com` · portfolio `/`.
Inside the site: `/architecture.html`, `/Harshavardhan_AG_Resume.pdf`.
User guides: copied from `ToWin App/docs/user-guide/*.pdf` into `public/towinly/guides/`
(elders, helpers, family, mobile) and linked from Technical and the Elders tab.

## 9. Fact sheet (sources)

| Fact | Source |
|---|---|
| Father and grandfather; first digital elders; the mix; the friend analogy; boxes origin; team of one; AI solved the team problem | `ToWin App/marketing/HARSHA-STORY.md` (chapters 1 to 7, with the handle-with-care rules) |
| Three kinds of people; 3 + 7 + 5 = 15; both must agree; nothing personal until trust has grown; up to five family; one switch; "Both sides win" | `ToWin App/App/src/data/landingSlides.js` |
| Seven rung names and enum; what each rung unlocks | `ToWin App/App/src/lib/trustStages.js` |
| Boxes: audiences, letters now or held, death certificate + thirty days, sealed box safety, keyholders at least three, "not a will", one-page sheet | `ToWin App/App/src/lib/passOnLocks.js` |
| Reunions: seven steps, organiser rules, venue rule, every guest home | `ToWin App/App/src/api/reunions.js`, `docs/proposals/2026-10-13-elder-reunions.md`; built 26 Oct 2026 (App commit 99e4d9b) |
| Emergency contacts (max 3), quiet days 1 to 30, SOS | `ToWin App/App/src/api/emergency.js` |
| Check-in and streak wording; Peekaboo; Friends (5 to 100 km) | `ToWin App/docs/user-guide/mobile/chapter-10, -12, -14` |
| Five request categories | `ToWin App/App/src/lib/needs.js` (Company, Rides, Shopping, Cleaning, Other) |
| Demo cast, ages, cities, bios; Margaret 1953-05-14; demo Harsha 2003-03-14; reset after a quiet period | `ToWin/backend/.../seed/DemoDataSeeder.java`, `App/src/components/DemoAccountsCard.jsx`, `DemoResetCoordinator.java` |
| David's Toronto trip, Nina's offer | project memory `demo-toronto-trip-2026-09-18` (live on website main 768e9a9) |
| Loneliness = 15 cigarettes (US Surgeon General 2023); 42% of Canadians 85+ live alone (StatCan 2021 Census); 2.1B over 60 by 2050 (WHO) | `ToWin App/docs/pitch/d3-panel-pitch-2026-11-10.md` fact sheet; `docs/pitch/RESEARCH.md` |
| Languages EN, FR, TA | `ToWin App/App/src/i18n/` |
| Free; always free for elders who cannot pay | investor deck business-model slide (owner's stance) |
| 129 endpoints, 22 controllers, 277/107 Java files, 188/208 app files | counted from the local checkouts on 2026-10-28 |
| 1,401 app tests (29 Aug 2026); 1,124 backend tests (25 Oct 2026); 108 MCP tools; 21 destructive tools behind confirm; 201 guide passages | `public/towinly-ai.html` numbers section; `docs/pitch/RESEARCH.md` s.6 |
| Backend first commit 11 Apr 2026; app first commit 6 Jul 2026 | `git log --reverse` in `ToWin/` and `App/` |
| Brand becomes Towinly 26 Jul 2026; push live 16 Aug; TestFlight 24 Aug; build 26 to Apple 8 Oct; Apple review open since 10 Oct; AI round 19 to 27 Oct; OpenAI switch 27 Oct | project memories `towinly-rename-2026-07-26`, `push-notifications-shipped`, `ship-2026-08-24`, `ship-2026-10-08`, `apple-rejection-2026-10-10`, `ai-roadmap-2026-10-20-pushed`, `ask-ai-openai-switch-2026-10-27` |
| Expo SDK 54, Expo Router, bundle id, version 1.1.0 | `ToWin App/App/app.json`, `package.json` |
| Liquid Glass tab bar, native controls, lock screen carries no message text, coarse location | memories `liquid-glass-2026-08-22`, `ios-native-style-2026-08-17`, `push-notifications-shipped`, `location-coarse-2026-08-19` |
| Data safety table | `ToWin App/docs/store-listing.md` |
| The four closing values | memory `closing-card-logo-and-values` (from `landingSlides.js` and `guideContent.jsx`) |
| AI tools list | Harsha, 2026-10-28, in conversation |
| "How Towinly began" parts 1 to 6 (posts 37, 38, 39, 42, 40, 41) and the problem run (33 to 36), word for word | `ToWin App/marketing/CAPTIONS-TO-POST.txt`; artwork in `marketing/instagram/posts/`; owner approved every word before rendering (INSTAGRAM-PLAN.md) |
| Deck order and lines: problem, solution, built and live, how trust is built, impact, team, the ask | `ToWin App/docs/pitch/build-d3-deck.js` (Towinly-D3-Pitch.pptx, 26 Oct 2026) |
| Why now, why it matters, what ships, why we win, business model, "Join the first mile" | `ToWin App/docs/pitch/build-deck.js` (Towinly-Investor-Deck.pptx, rebuilt 29 Aug 2026, slide 7 added 11 Sep 2026); numbers verified in `docs/pitch/RESEARCH.md` |
| Score tiers: New Member 0, Getting Started 1 to 14, Reliable 15 to 44, Highly Trusted 45 to 89, Community Champion 90+ | `ToWin/frontend/src/components/TrustBadge.jsx`, `ToWin/frontend/src/i18n/fr.js` |

## 10. Out of scope

- No new Towinly features, and nothing that changes the Towinly repos.
- No pitch-deck PDF link, no Android claim (the August investor deck's "Android build
  ready" line is superseded by the 26 Oct rule: Android is not built), no store-presence
  claim, no unverified statistic (the Toronto family quote, "1% organised care" and "+86%
  cybercrime" stay out even though the decks and post 36 carry them; the D3 fact sheet marks
  them unverified or medium confidence).
- No "25 km by default" line: the app's own words are the 5 to 100 km distance choices.
- No redesign of the rest of the portfolio; the only home-page change is the link card.
- No test runner added to the portfolio; verification is the build, the check script and
  the localhost review in section 7.

## 11. Open for Harsha at spec review

- The "how long" line reads "about six and a half months so far, one person, alongside a
  master's and a job search". Correct it if the hours or the framing are off.
- Whether to add a "Download the pitch deck" link (off by default).
