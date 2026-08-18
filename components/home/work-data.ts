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

/**
 * Where a directed project stands.
 *
 * Four states, matching the filter chips. The team's own labels collapse into
 * these: "With Engg", "Dev WIP" and "PRB done" are all `build`; "WIP in
 * design", "to be picked" and "handed to PO" are all `design`; "Scrapped" is
 * `sunset` — the honest word for work that was stopped, and worth showing
 * rather than quietly dropping.
 */
export type Status = "shipped" | "build" | "design" | "sunset";

export const STATUS_LABEL: Record<Status, string> = {
  shipped: "Live",
  build: "In build",
  design: "In design",
  sunset: "Sunset",
};

export type DirectedItem = {
  name: string;
  status: Status;
  /** Public URL, when the shipped thing can be linked to. */
  href?: string;
};

export type Vertical = { area: string; items: DirectedItem[] };

/*
  Grouped by the verticals owned this financial year. Two of them — Reports
  and Institution — carry nothing yet: no project in the delivery lists maps
  to either with any confidence, and inventing an assignment would put a wrong
  claim on a public page. Groups with no items simply do not render, so adding
  work here is all it takes to bring them in.

  "Platform & onboarding" is not one of the seven. It exists because six
  delivered projects are genuinely cross-product — sign-in, the welcome screen,
  shortcuts — and dropping them to force a clean seven would understate the
  record by six.
*/
export const DIRECTED: Vertical[] = [
  {
    area: "Options & Option Chain",
    items: [
      { name: "Strategy Builder", status: "shipped" },
      { name: "Option Analytics", status: "shipped" },
      { name: "Options Overview", status: "shipped" },
      { name: "Options Overview revamp", status: "shipped" },
      { name: "MOW from Option Chain", status: "shipped" },
      { name: "Option Chain → Positions", status: "shipped" },
      { name: "Option Chain → Scalper", status: "build" },
      { name: "Option Chain → Charts", status: "build" },
      { name: "Additional option analytics", status: "build" },
      { name: "OSB mobile enhancements", status: "build" },
      { name: "Historical Replay", status: "design" },
    ],
  },
  {
    area: "Trading",
    items: [
      { name: "Web Scalper", status: "shipped" },
      { name: "All Orders & Holdings", status: "shipped" },
      { name: "Bar Replay", status: "shipped" },
      { name: "Buy Average", status: "shipped" },
      { name: "Pledge Summary", status: "shipped" },
      { name: "Web Terminal", status: "build" },
      { name: "SOW enhancements", status: "build" },
      { name: "Ticker & QuickView", status: "build" },
      { name: "Grouping positions", status: "build" },
      { name: "TradeFlow", status: "build" },
    ],
  },
  {
    area: "Markets",
    items: [
      { name: "Home", status: "shipped" },
      { name: "Markets Overview", status: "shipped" },
      { name: "Symbol Details enhancements", status: "shipped" },
      { name: "Seasonality Insights", status: "shipped" },
      { name: "Query Builder", status: "build" },
      { name: "Commodities About", status: "design" },
      { name: "Watchlist grouping", status: "sunset" },
    ],
  },
  {
    area: "Automation",
    items: [
      { name: "Automate", status: "shipped" },
      { name: "Backtesting", status: "shipped" },
      { name: "Algo-marketplace in Automate", status: "design" },
      { name: "Automate overview revamp", status: "design" },
    ],
  },
  {
    area: "FIA",
    items: [
      { name: "FIA with Automate", status: "build" },
      // Partly live, partly still going — counted as build so the shipped
      // figure stays one that can be defended item by item.
      { name: "FIA integration — IPO, Symbol Details, OA", status: "build" },
      { name: "FIA Doc Analysis", status: "design" },
    ],
  },
  {
    area: "Reports",
    items: [{ name: "Trade analytics", status: "design" }],
  },
  {
    area: "Institution",
    items: [],
  },
  {
    area: "Platform & onboarding",
    items: [
      { name: "Login & Signup revamp", status: "shipped" },
      { name: "Welcome Screen", status: "shipped" },
      { name: "What's New", status: "shipped" },
      { name: "Prime Partners Dashboard", status: "shipped" },
      { name: "Keyboard Shortcuts", status: "shipped" },
      { name: "API Dashboard", status: "shipped" },
      { name: "Generic & contextual banners", status: "design" },
    ],
  },
];

export const DIRECTED_TOTAL = DIRECTED.reduce((n, v) => n + v.items.length, 0);
export const DIRECTED_SHIPPED = DIRECTED.reduce(
  (n, v) => n + v.items.filter((i) => i.status === "shipped").length,
  0,
);
