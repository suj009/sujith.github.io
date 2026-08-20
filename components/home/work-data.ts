/*
  The Work section's content, kept apart from its presentation because it is
  the part that changes — new projects ship, statuses move, links appear.

  Teammates are never named. Scale is expressed as counts and outcomes, not as
  a roster.
*/

/** How deeply Sujith was involved. This is the spine of the whole section. */
export type Role = "IC" | "Co-led" | "Directed";

/**
 * What happens when you click. Shown on the panel *before* the click, so a
 * protected item never reads as a broken link.
 */
export type Access =
  | { kind: "live"; href: string }
  | { kind: "announcement"; href: string }
  | { kind: "protected"; href: string }
  | { kind: "none" };

/** A full-bleed pinned panel in the Work stack. */
export type PanelSpec = {
  id: string;
  tag: string;
  title: string;
  lede: string;
  metrics: { value: string; label: string; up?: boolean }[];
  /** Present when there is a case study to read. */
  href?: string;
  /** Shown when there is not. */
  access?: Access;
  cover?: { src: string; position?: string };
  caption?: string;
};

/**
 * Directed — the two efforts with enough written up to carry a case study.
 * These lead the section: the scope of what was run comes before the detail
 * of what was made by hand.
 */
export const DIRECTED_PANELS: PanelSpec[] = [
  {
    id: "case-fdsg",
    tag: "Directed · Design systems",
    title: "FDSG",
    lede: "Several scattered style guides became one versioned language — then I changed how the team worked, so it would hold.",
    metrics: [
      { value: "~30%", label: "less design effort", up: true },
      { value: "8", label: "designers on it" },
    ],
    href: "/work/fdsg/",
    /*
      Centred rather than anchored to an edge: the artwork's left quarter is
      already near-empty, which is exactly where the heading and metrics sit,
      and its subject sits centre-right. On a phone, where the panel crops to a
      narrow vertical strip, centring keeps the layered stack in frame instead
      of a bare corner.
    */
    cover: { src: "/img/fdsg-cover.webp", position: "center" },
  },
  {
    id: "case-options-scalper",
    tag: "Directed · Real-time trading · Q2 2024",
    title: "Options Scalper Terminal",
    lede: "Traders wanted every number on screen. Every number on screen is what kills a trade at speed.",
    metrics: [
      { value: "↑ orders", label: "volume + session time", up: true },
      { value: "3 mo", label: "concept to live" },
    ],
    href: "/work/options-scalper/",
    caption: "Scalper Terminal — full-bleed capture, to add",
  },
];

/**
 * Hands-on — the same full-bleed treatment as the case studies above, because
 * this is the work that answers "what did you personally make?" and it should
 * not read as a footnote to what was supervised.
 *
 * None of these has a case study yet, so each carries an access state instead
 * of a "read more" link.
 */
export const IC_PANELS: PanelSpec[] = [
  {
    id: "ic-wealth-view",
    tag: "IC · Design + front-end",
    title: "Wealth View",
    lede: "One consolidated view of everything an investor holds, with performance over time. I designed it, then shipped the front-end myself with AI as the pair.",
    metrics: [
      { value: "9 days", label: "design file to running interface" },
      { value: "Flutter", label: "handed to the front-end team" },
    ],
    access: { kind: "none" },
    caption: "Wealth View — capture to add",
  },
  {
    id: "ic-orders",
    tag: "IC · Trade management",
    title: "Orders",
    lede: "Redesigned the Orders experience for active traders — a more structured, more predictable flow through the moment that matters most.",
    metrics: [{ value: "IC", label: "end to end" }],
    access: { kind: "none" },
    caption: "Orders — capture to add",
  },
  {
    id: "ic-nri",
    tag: "IC · Onboarding",
    title: "NRI Onboarding",
    lede: "Led the redesign end to end, cutting friction out of a flow where every extra step costs a customer.",
    metrics: [{ value: "↑ ~19%", label: "lead-to-PAN, against baseline", up: true }],
    access: { kind: "none" },
    caption: "NRI Onboarding — capture to add",
  },
  {
    id: "ic-fdsg-v1",
    tag: "Co-led · Design Review Board",
    title: "FDSG v1.0",
    lede: "Contributed as one of eight on the board that proposed, critiqued and ratified the first version of the system — before I owned the versions that followed.",
    metrics: [{ value: "1 of 8", label: "on the DRB" }],
    access: { kind: "none" },
    caption: "FDSG v1.0 — capture to add",
  },
];

/* ---------------------------------------------------------------- directed */

/*
  SHIPPED WORK ONLY. Nothing in build, in design, or stopped belongs in this
  file.

  An earlier version listed all 43 projects with a status against each, which
  put roughly twenty unreleased FYERS product names on a public page — and,
  because this repository is public, into a public git history as well. The
  status column is gone with them: every row here is live, so a per-row label
  saying so 23 times is noise. The count states it once.

  The bar for adding a row: a customer can use it today. If it is not out yet,
  it is not in this file. Wait until it ships.
*/

export type DirectedItem = {
  name: string;
  /** Public URL, when the shipped thing can be linked to. */
  href?: string;
};

export type Vertical = { area: string; items: DirectedItem[] };

/**
 * The verticals owned this financial year.
 *
 * Named separately from the delivery list on purpose. This is scope of
 * responsibility — a job description, not a roadmap — so it can be stated in
 * full even where the shipped work in a vertical cannot be. Three of the seven
 * have nothing released to name yet; they still belong here, because they are
 * still owned.
 */
export const VERTICALS = [
  "Trading",
  "Options & Option Chain",
  "Automation",
  "Markets",
  "Reports",
  "FIA",
  "Institution",
];

/*
  "Platform & onboarding" is deliberately not one of the seven. It exists
  because six delivered projects are genuinely cross-product — sign-in, the
  welcome screen, shortcuts — and dropping them to force a clean seven would
  understate the record by six.
*/
export const DIRECTED: Vertical[] = [
  {
    area: "Options & Option Chain",
    items: [
      { name: "Strategy Builder" },
      { name: "Option Analytics" },
      { name: "Options Overview" },
      { name: "Options Overview revamp" },
      { name: "MOW from Option Chain" },
      { name: "Option Chain → Positions" },
    ],
  },
  {
    area: "Trading",
    items: [
      { name: "Web Scalper" },
      { name: "All Orders & Holdings" },
      { name: "Bar Replay" },
      { name: "Buy Average" },
      { name: "Pledge Summary" },
    ],
  },
  {
    area: "Markets",
    items: [
      { name: "Home" },
      { name: "Markets Overview" },
      { name: "Symbol Details enhancements" },
      { name: "Seasonality Insights" },
    ],
  },
  {
    area: "Automation",
    items: [{ name: "Automate" }, { name: "Backtesting" }],
  },
  {
    area: "Platform & onboarding",
    items: [
      { name: "Login & Signup revamp" },
      { name: "Welcome Screen" },
      { name: "What's New" },
      { name: "Prime Partners Dashboard" },
      { name: "Keyboard Shortcuts" },
      { name: "API Dashboard" },
    ],
  },
];

export const DIRECTED_SHIPPED = DIRECTED.reduce((n, v) => n + v.items.length, 0);
export const VERTICAL_COUNT = VERTICALS.length;
