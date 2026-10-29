// The colour photos the page uses, all from Pexels under the free Pexels licence. Files come
// from scripts/towinly-photos.sh; provenance is in docs/towinly-photo-credits.md. None shows
// a face: every card speaks to "you", and no face sits beside second-person copy.
import manifest from "./generated/manifest.json";

const PHOTOS = [
  { file: "walk-park-two-gen", alt: "An older man and a young girl walking away across a park lawn." },
  { file: "walk-autumn-pair", alt: "Two older people walking away along an autumn path in the woods." },
  { file: "walk-forest-far", alt: "Two people walking along a path through autumn trees, seen from far behind." },
  { file: "walk-tunnel", alt: "Two people walking into a tunnel of trees, seen from behind." },
  { file: "teapot-two-cups", alt: "A teapot and two cups of tea on a plate, seen from above." },
  { file: "tea-table", alt: "A table with a teapot, cups and glasses after a shared meal." },
  { file: "tea-glasses-window", alt: "A cup of tea and a pair of reading glasses on a sunny windowsill." },
  { file: "coffee-windowsill", alt: "A cup of coffee on a saucer on a sunlit windowsill." },
  { file: "coffee-flowers", alt: "A cup of coffee beside white flowers by a window." },
  { file: "bag-outdoors", alt: "A hand carrying a paper shopping bag outdoors." },
  { file: "bag-paper", alt: "A hand holding a paper shopping bag." },
  { file: "phone-chat-hands", alt: "Two hands holding a phone with a chat open." },
  { file: "phone-texting", alt: "Hands typing a message on a phone." },
  { file: "phone-blue", alt: "A hand holding a phone with messages on screen, over a blue cloth." },
  { file: "phone-thumbs", alt: "Two hands holding a phone and reading messages." },
  { file: "wheel-day", alt: "A hand on a car's steering wheel on a bright day." },
  { file: "chess-pieces", alt: "Wooden chess pieces on a board, close up." },
  { file: "chessboard-top", alt: "A wooden chessboard with the pieces set up, seen from above." },
  { file: "sprout-hands", alt: "Two hands planting a small green sprout in dark soil." },
  { file: "garden-gloves", alt: "A gloved hand pressing soil in a garden bed." },
  { file: "books-held", alt: "Hands holding a stack of books." },
  { file: "books-stack", alt: "A tall stack of colourful hardback books." },
  { file: "padlock-blue-shutter", alt: "A small yellow padlock on a bright blue shutter." },
  { file: "padlock-pink", alt: "A padlock on a weathered pink door." },
  { file: "padlock-blue-door", alt: "A rusty padlock on a blue wooden door." },
  { file: "laptop-code", alt: "A laptop on a desk with program code on the screen." },
  { file: "laptop-code-2", alt: "A laptop showing code beside a plant and a mug." },
  { file: "laptop-dark", alt: "A laptop with colourful code on screen in a dark room." },
  { file: "empty-armchair", alt: "An empty armchair in the light from a tall window." },
  { file: "two-armchairs", alt: "Two orange chairs by a large window." },
  { file: "letter-writing", alt: "A hand writing a letter with a dip pen." },
  { file: "envelope", alt: "Hands opening an envelope with a handwritten letter inside." },
  { file: "keys-box", alt: "A wooden box full of old keys." },
  { file: "key-drawer", alt: "A key in the lock of a white drawer." },
];

const BY_KEY = Object.fromEntries(PHOTOS.map((p) => [p.file, p]));

/** One photo with its size and alt text, or null for an unknown key. */
export const photo = (key) => (BY_KEY[key] ? { ...BY_KEY[key], ...manifest[key] } : null);
export const photoSrc = (key) => `/towinly/photos/${key}.webp`;
