/* The page's small icon set: one stroke weight, one corner style, never an emoji. */
const PATHS = {
  elder: <><circle cx="12" cy="6.5" r="3" /><path d="M7 21v-6.5a5 5 0 0110 0V21M16.5 13l2 8" /></>,
  hands: <path d="M12 20.5s-7-4.3-7-9.5a3.8 3.8 0 017-2 3.8 3.8 0 017 2c0 5.2-7 9.5-7 9.5z" />,
  home: <path d="M3.5 11.5L12 4l8.5 7.5M6 10v10h12V10M10 20v-5h4v5" />,
  book: <path d="M4 5.5A2.5 2.5 0 016.5 3H12v15H6.5A2.5 2.5 0 004 20.5zM12 3h5.5A2.5 2.5 0 0120 5.5v15A2.5 2.5 0 0017.5 18H12z" />,
  code: <path d="M8.5 7L3.5 12l5 5M15.5 7l5 5-5 5M13.5 4l-3 16" />,
  spark: <path d="M12 3l2.1 5.9L20 11l-5.9 2.1L12 19l-2.1-5.9L4 11l5.9-2.1zM5 3v3M3.5 4.5h3M19 17v3M17.5 18.5h3" />,
  globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.6 2.7 2.6 15.3 0 18M12 3c-2.6 2.7-2.6 15.3 0 18" /></>,
  instagram: <><rect x="3.5" y="3.5" width="17" height="17" rx="4.5" /><circle cx="12" cy="12" r="3.8" /><circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" /></>,
  linkedin: <><rect x="3.5" y="3.5" width="17" height="17" rx="3" /><path d="M8 10.5V17M8 7.5v.4M12 17v-3.6a2.2 2.2 0 014.4 0V17" /></>,
  github: <path d="M9 19c-4 1.3-4-2-5.5-2.5M15 21v-3.4a3 3 0 00-.8-2.3c2.8-.3 5.7-1.4 5.7-6.2a4.8 4.8 0 00-1.3-3.3 4.4 4.4 0 00-.1-3.3s-1-.3-3.4 1.3a11.8 11.8 0 00-6.2 0C6.5 2.2 5.4 2.5 5.4 2.5a4.4 4.4 0 00-.1 3.3 4.8 4.8 0 00-1.3 3.3c0 4.8 2.9 5.9 5.7 6.2a3 3 0 00-.8 2.3V21" />,
  mail: <><rect x="3.5" y="5.5" width="17" height="13" rx="2" /><path d="M4 7l8 6 8-6" /></>,
  video: <><rect x="3" y="5" width="18" height="14" rx="2.5" /><path d="M10.3 9.3l4.4 2.7-4.4 2.7z" fill="currentColor" stroke="none" /></>,
  doc: <path d="M7 3h7l5 5v13H7zM14 3v5h5M9.5 13h5M9.5 17h5" />,
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  link: <path d="M10 14a4 4 0 005.7 0l3-3a4 4 0 00-5.7-5.7l-1 1M14 10a4 4 0 00-5.7 0l-3 3a4 4 0 005.7 5.7l1-1" />,
  check: <path d="M5 12.5l4.5 4.5L19 7.5" />,
  back: <path d="M19 12H5M11 6l-6 6 6 6" />,
};

export default function Icon({ name, size = 20 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {PATHS[name] || PATHS.arrow}
    </svg>
  );
}
