// Every outside link the Why Towinly page carries, in one place.
export const TOWINLY_SITE = "https://www.towinly.com/";
export const TOWINLY_PHONE_WEB = "https://www.towinly.com/app";
export const DEMO_LOGIN = "https://www.towinly.com/login";
export const TOWINLY_INSTAGRAM = "https://www.instagram.com/towinly.trust/";
export const TOWINLY_LINKEDIN = "https://www.linkedin.com/company/towinly/";
export const TOWINLY_GITHUB_WEB = "https://github.com/Harsha-anbu-g/Towin";
export const TOWINLY_GITHUB_APP = "https://github.com/Harsha-anbu-g/ToWin-App";
export const TOWINLY_VIDEO =
  "https://www.linkedin.com/posts/harsha-anbu-gowri_fullstackdeveloper-springboot-java-ugcPost-7481541368083918848-WYBQ/";
export const TOWINLY_HELP_EMAIL = "help@towinly.com";

export const TOWINLY_LINKS = [
  { label: "towinly.com", href: TOWINLY_SITE, icon: "globe" },
  { label: "Instagram", href: TOWINLY_INSTAGRAM, icon: "instagram" },
  { label: "LinkedIn", href: TOWINLY_LINKEDIN, icon: "linkedin" },
  { label: "GitHub, web", href: TOWINLY_GITHUB_WEB, icon: "github" },
  { label: "GitHub, iPhone app", href: TOWINLY_GITHUB_APP, icon: "github" },
  { label: "Walkthrough video", href: TOWINLY_VIDEO, icon: "video" },
  { label: TOWINLY_HELP_EMAIL, href: `mailto:${TOWINLY_HELP_EMAIL}`, icon: "mail" },
];

export const HARSHA_LINKS = [
  { label: "Portfolio", href: "/", icon: "home" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/harsha-anbu-gowri", icon: "linkedin" },
  { label: "GitHub", href: "https://github.com/Harsha-anbu-g", icon: "github" },
  { label: "Instagram", href: "https://www.instagram.com/harsha._.ag", icon: "instagram" },
  { label: "agharsha.anbu@gmail.com", href: "mailto:agharsha.anbu@gmail.com", icon: "mail" },
  { label: "Resume", href: "/Harshavardhan_AG_Resume.pdf", icon: "doc" },
];

/** The four links the top bar shows, in order. */
export const TOPBAR_LINKS = TOWINLY_LINKS.slice(0, 4);
