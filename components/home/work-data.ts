/*
  The Work section's content, kept apart from its presentation because it is
  the part that changes — new projects ship, statuses move, links appear.

  Two rules govern what may appear here, both from the confidentiality note in
  the content backbone:

  1. Only shipped work is named. Everything unreleased is a count, never a
     title — naming it would publish FYERS' roadmap.
  2. No teammate names. Scale is expressed as counts, not as a roster.
*/

/** How deeply Sujith was involved. This is the spine of the whole section. */
export type Role = "IC" | "Co-led" | "Directed";

/**
 * What happens when you click. Shown on the card *before* the click, so a
 * protected item never reads as a broken link.
 *
 * `protected` points at a page whose body is encrypted at build time and
 * decrypted in the browser with a password — the bundle only ever holds
 * ciphertext. `none` is for work that can be named but not shown.
 */
export type Access =
  | { kind: "live"; href: string }
  | { kind: "announcement"; href: string }
  | { kind: "protected"; href: string }
  | { kind: "none" };

export type Project = {
  name: string;
  role: Role;
  access: Access;
  note?: string;
};

/**
 * Hands-on work — the pieces that answer "what did you personally make?".
 *
 * Deliberately short. A director's portfolio is read for evidence of judgment,
 * and four things explained beat forty listed.
 */
export const SELECTED: Project[] = [
  {
    name: "Wealth View",
    role: "IC",
    note: "Designed it, then shipped the front-end myself with AI — Flutter handed to the front-end team.",
    access: { kind: "none" },
  },
  {
    name: "Orders",
    role: "IC",
    note: "Redesigned trade management for active traders: a more structured, more predictable flow.",
    access: { kind: "none" },
  },
  {
    name: "NRI Onboarding",
    role: "IC",
    note: "Led the redesign end to end, cutting friction across the flow.",
    access: { kind: "none" },
  },
  {
    name: "FDSG v1.0",
    role: "Co-led",
    note: "One of eight on the Design Review Board that ratified the first version of the system.",
    access: { kind: "none" },
  },
];

/** A shipped project, grouped by the product area it belongs to. */
export type Vertical = { area: string; shipped: string[] };

/**
 * Live work delivered by the team under supervision. Every name here is
 * already public in the product, which is why it can be named at all.
 */
export const DIRECTED: Vertical[] = [
  {
    area: "Options",
    shipped: [
      "Strategy Builder",
      "Option Analytics",
      "Options Overview",
      "Options Overview revamp",
      "MOW from Option Chain",
      "Option Chain → Positions",
    ],
  },
  {
    area: "Trading & orders",
    shipped: [
      "Web Scalper",
      "All Orders & Holdings",
      "Bar Replay",
      "Buy Average",
      "Pledge Summary",
    ],
  },
  {
    area: "Markets & research",
    shipped: ["Home", "Markets Overview", "Symbol Details enhancements", "Seasonality Insights"],
  },
  {
    area: "Onboarding & growth",
    shipped: [
      "Login & Signup revamp",
      "Welcome Screen",
      "What's New",
      "Prime Partners Dashboard",
      "Keyboard Shortcuts",
    ],
  },
  {
    area: "Automation & platform",
    shipped: ["Automate", "Backtesting", "API Dashboard"],
  },
];

/**
 * Everything not yet shipped, as counts only.
 *
 * Stated rather than hidden: a delivery record that shows only successes reads
 * as a highlight reel. The pipeline is the honest picture of a team's load.
 */
export const PIPELINE = [
  { label: "in engineering build", count: 11 },
  { label: "in design", count: 5 },
  { label: "queued or handed off", count: 3 },
  { label: "discontinued", count: 1 },
];

export const DIRECTED_TOTAL = 43;
export const DIRECTED_SHIPPED = DIRECTED.reduce((n, v) => n + v.shipped.length, 0);
