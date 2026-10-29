// The demo people, from the backend's DemoDataSeeder and the app's DemoAccountsCard. Ages
// are the seeded ones for October 2026. Anyone can try three of these seats with one tap
// on towinly.com; nothing here needs a password.
import { DEMO_LOGIN } from "./links";

export const CAST = [
  { role: "elder", name: "Margaret", age: 73, city: "Montreal", line: "Retired teacher. Chess, gardening, and a good cup of tea." },
  { role: "elder", name: "David Chen", age: 76, city: "Montreal", line: "Former engineer. Cooking and music. Uses a wheelchair." },
  { role: "elder", name: "Grace Liu", age: 70, city: "Montreal", line: "Retired pharmacist. Paints watercolours, likes quiet walks in the park." },
  { role: "elder", name: "Rose Martin", age: 74, city: "Montreal", line: "Retired librarian. Crosswords, reading, a quiet afternoon with good company." },
  { role: "elder", name: "Helen Park", age: 71, city: "Montreal", line: "Retired nurse. Knitting, baking, and good conversation over tea." },
  { role: "elder", name: "Arthur Miles", age: 68, city: "Montreal", line: "Former history teacher. Chess, documentaries, and a good meal." },
  { role: "elder", name: "Lakshmi Raman", age: 70, city: "Chennai", line: "Retired schoolteacher. Carnatic music, cooking, a morning walk on the beach." },
  { role: "elder", name: "Meena Krishnan", age: 73, city: "Coimbatore", line: "Retired bank clerk. Her garden, temple visits, and sharing recipes." },
  { role: "helper", name: "Harsha", age: 23, city: "Montreal", line: "Tech support volunteer. Chess, and help with anything tech." },
  { role: "helper", name: "Priya Sharma", age: 24, city: "Montreal", line: "Nursing student. Errands, cooking, or just company." },
  { role: "helper", name: "Tom Walker", age: 31, city: "Montreal", line: "Software developer who fixes phones, tablets and wifi. Patient explainer." },
  { role: "helper", name: "Nina Okafor", age: 26, city: "Montreal", line: "Friendly driver and errand-runner who loves a good chat." },
  { role: "helper", name: "Sofia Reyes", age: 29, city: "Montreal", line: "Community volunteer. Reading aloud, gardening, gentle tech help." },
  { role: "helper", name: "Claire Dubois", age: 28, city: "Montreal", line: "Landscape gardener. Green thumbs, patient hands, and time for tea." },
  { role: "helper", name: "Ethan Cole", age: 25, city: "Montreal", line: "Computer science student. Chess, and untangles any wifi or gadget trouble." },
  { role: "helper", name: "Karthik Subramanian", age: 24, city: "Chennai", line: "Engineering student. Phones, errands, or a chat over filter coffee." },
  { role: "helper", name: "Arjun Devaraj", age: 26, city: "Salem", line: "Delivery rider who knows every street. Rides, errands, and heavy bags." },
  { role: "family", name: "Sarah", city: "Montreal", line: "Margaret's daughter, with her own family account." },
  { role: "family", name: "David", city: "Montreal", line: "David Chen's son." },
  { role: "family", name: "Ruth", city: "Montreal", line: "On Margaret's family list, one of her three keyholders." },
];

export const ROLE_LABEL = { elder: "Elder", helper: "Helper", family: "Family" };

export const TRY_LINKS = [
  { role: "elder", label: "Try as an Elder", who: "Margaret, 73", href: DEMO_LOGIN },
  { role: "helper", label: "Try as a Helper", who: "Harsha, 23", href: DEMO_LOGIN },
  { role: "family", label: "Try as Family", who: "Sarah, Margaret's daughter", href: DEMO_LOGIN },
];

export const WORKED_EXAMPLE = [
  "David Chen, 76, uses a wheelchair and wants a three-day trip from Montreal to Toronto: the hotel, the travel, the cabs, packing at home and unpacking after. He pays for all of it.",
  "Nina Okafor, his fully trusted helper, has offered. Log in as David and you see the accept step; log in as Harsha and you can still offer too.",
];

export const DEMO_NOTE = "The demo accounts reset themselves a few minutes after a visitor's last change, so nothing you try there sticks.";
