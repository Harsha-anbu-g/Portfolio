// The iPhone screens the page shows. Sizes come from the manifest the asset script writes,
// so every <img> declares its width and height. Captions are one short line under the
// phone; alt text says what the screen shows.
import manifest from "./generated/manifest.json";

const SHOTS = {
  "elder-home": { file: "elder-home", caption: "The elder's home screen", alt: "Home screen for an elder: a greeting, the daily check-in row, open requests, and the Ask for help button." },
  "elder-ask-help": { file: "elder-ask-help", caption: "Ask for help in one screen", alt: "The Ask for help screen: a category to choose, a short description box, and one Post button." },
  "elder-posted-help": { file: "elder-posted-help", caption: "A posted request, waiting for offers", alt: "A posted help request on the elder's home, with its category and an Open label." },
  "elder-trust": { file: "elder-trust", caption: "The Trust page", alt: "The elder's Trust page: the Trust Score, the seven-step ladder, and the people climbing it." },
  "elder-trust-people": { file: "elder-trust-people", caption: "People and their Trust Scores", alt: "A list of helpers with their Trust Scores and the step each friendship has reached." },
  "elder-home-building-trust": { file: "elder-home-building-trust", caption: "Building trust, step by step", alt: "The home screen with a Building trust card that names the current step with a helper." },
  "elder-friends": { file: "elder-friends", caption: "Find new helpers nearby", alt: "The Add friends screen: helpers nearby, closest first, each with a Trust Score and a Connect button." },
  "elder-friends-invites": { file: "elder-friends-invites", caption: "New invites", alt: "The New invites tab with a helper's card and Accept and Decline buttons." },
  "elder-messages": { file: "elder-messages", caption: "Messages stay inside the app", alt: "The Messages list: one row per friend, with the newest message and its time." },
  "elder-chat-ethan": { file: "elder-chat-ethan", caption: "A chat with a helper", alt: "A chat with Ethan: messages on both sides and a text box at the bottom." },
  "elder-checkin": { file: "elder-checkin", caption: "The daily check-in", alt: "The Daily check-in screen: Let your family know you're alright, and the I'm here today button." },
  "elder-emergency-contacts": { file: "elder-emergency-contacts", caption: "Emergency contacts", alt: "The Emergency contacts screen: up to three named people, who they are, and the quiet days before each one is told." },
  "elder-family": { file: "elder-family", caption: "Family can watch over", alt: "The Family screen listing the elder's family members and the friendships shared with them." },
  "elder-family-sharing": { file: "elder-family-sharing", caption: "One switch per friendship", alt: "Family sharing settings: a switch for each friendship, on or off." },
  "elder-pass-on": { file: "elder-pass-on", caption: "My boxes: what I pass on", alt: "The What I pass on page: Stories, Letters and the Sealed box, each with a short line." },
  "elder-story-detail": { file: "elder-story-detail", caption: "A story, and who can see it", alt: "One story opened: its title, its words, and who it is shown to." },
  "elder-sealed-items": { file: "elder-sealed-items", caption: "The sealed box", alt: "The Sealed box screen: the kinds of things kept inside and the keyholders named." },
  "elder-pass-on-sheet": { file: "elder-pass-on-sheet", caption: "The one-page sheet to keep with a will", alt: "The one-page sheet listing the keyholders and how many of them must agree." },
  "elder-ask-ai": { file: "elder-ask-ai", caption: "Ask AI", alt: "The Ask AI sheet: a question typed by the elder and a plain answer under it." },
  "game-menu-elder": { file: "game-menu-elder", caption: "Peekaboo, the memory game", alt: "The Peekaboo menu: a tortoise-shell board and a Play button." },
  "elder-profile": { file: "elder-profile", caption: "The elder's profile", alt: "The elder's profile: photo, name, age, interests and Trust Score." },
  "elder-updates": { file: "elder-updates", caption: "Updates", alt: "The Updates screen: recent offers, steps climbed and messages." },
  "guide": { file: "guide", caption: "The guide inside the app", alt: "The in-app guide with its chapters listed for reading on the phone." },
  "helper-home": { file: "helper-home", caption: "The helper's home screen", alt: "Home screen for a helper: requests nearby, each with a category, a distance and an Offer button." },
  "helper-job-open": { file: "helper-job-open", caption: "An open request", alt: "One open request: the elder's first name, what is needed, and an Offer to help button." },
  "helper-offer-help": { file: "helper-offer-help", caption: "Offering to help", alt: "The offer screen where the helper writes a short note and sends the offer." },
  "helper-my-jobs": { file: "helper-my-jobs", caption: "My jobs", alt: "The My jobs screen: offers pending, accepted, and done." },
  "helper-ladder-open": { file: "helper-ladder-open", caption: "The ladder from the helper's seat", alt: "The Trust Ladder for one friendship: the current step marked, the next waiting for both to agree." },
  "helper-reviews-card": { file: "helper-reviews-card", caption: "A review card", alt: "A review card with stars and a few words from an elder the helper helped." },
  "helper-passed-on": { file: "helper-passed-on", caption: "What elders pass on to helpers", alt: "The Passed on to me screen with a story an elder chose to share with helpers." },
  "family-home": { file: "family-home", caption: "The family home screen", alt: "Home screen for a family member: the parent's name, today's check-in, and alerts." },
  "family-parent": { file: "family-parent", caption: "Your parent's page", alt: "The parent page: the elder's friendships and the step each has reached." },
  "family-parent-today": { file: "family-parent-today", caption: "Today", alt: "The Today view: whether the parent checked in, and anything that needs attention." },
  "family-parent-cando": { file: "family-parent-cando", caption: "What you can do for them", alt: "The powers a family member holds for the elder, each one granted by the elder." },
  "landing-01": { file: "landing-01", caption: "The welcome screen", alt: "The welcome screen: the tortoise, the tagline It takes two To Win., and the Log in and Join buttons." },
  "login": { file: "login", caption: "Log in, or try the demo", alt: "The Log in screen: the form, and three Try as buttons for Elder, Helper and Family." },
  "register-role": { file: "register-role", caption: "Joining: pick your role", alt: "The Join screen asking whether you are an elder, a helper, or family." },
};

export const shot = (name) => ({ ...manifest[name], ...SHOTS[name] });
export const shots = (names) => names.map(shot);
