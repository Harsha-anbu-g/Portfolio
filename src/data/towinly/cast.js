// The three one-tap demo seats on towinly.com, from the app's DemoAccountsCard and the
// backend's DemoDataSeeder. Ages are the seeded ones for October 2026. The page names only
// these three; the other demo people stay unnamed. Nothing here needs a password.
import { DEMO_LOGIN } from "./links";

export const CAST = [
  { role: "elder", name: "Margaret", age: 73, city: "Montreal", line: "Retired teacher. Chess, gardening, and a good cup of tea.", tryLabel: "Try as an Elder", href: DEMO_LOGIN },
  { role: "helper", name: "Harsha", age: 23, city: "Montreal", line: "Tech support volunteer. Chess, and help with anything tech.", tryLabel: "Try as a Helper", href: DEMO_LOGIN },
  { role: "family", name: "Sarah", city: "Montreal", line: "Margaret's daughter, with her own family account.", tryLabel: "Try as Family", href: DEMO_LOGIN },
];

export const ROLE_LABEL = { elder: "Elder", helper: "Helper", family: "Family" };

export const WORKED_EXAMPLE = [
  "On the demo, a 76-year-old elder who uses a wheelchair wants a three-day trip from Montreal to Toronto: the hotel, the travel, the cabs, packing at home and unpacking after. He pays for all of it.",
  "His fully trusted helper has already offered. Log in as Harsha and you can offer too.",
];

export const DEMO_NOTE = "The demo accounts reset themselves a few minutes after a visitor's last change, so nothing you try there sticks.";
