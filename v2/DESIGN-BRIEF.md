# sujith.design — v2 design brief

A spec for the second option, written so it can be handed to Claude Design (or
anyone else) and rebuilt without this conversation.

**Live preview:** https://claude.ai/code/artifact/22f40543-8941-44b3-8781-6f8c8e519598
**Files:** `v2/index.html`, `v2/work.html`, `v2/about.html`, `v2/assets/site.css`, `v2/assets/site.js`

---

## Who reads this

C-suite and founders. They reward business outcome, org leverage, risk reduced,
speed, judgement under constraint, and the scale of what the person is
responsible for. They skim past craft process, tool names and design-internal
vocabulary.

Prefer **outcome** over **scope**. Scope is what someone was given; outcome is
what changed because they were there.

---

## The structural reference

Layout follows a conventional multi-page portfolio shell: a floating pill nav,
a homepage that acts as a table of contents, and real inner pages behind it.
The reference for this structure is apoorvgupta.com.

**What is deliberately not borrowed:** its typefaces, its dark-first palette,
its avatar illustration, its copy, and its sections that do not apply (patents,
speaking). Structure is shared; identity is not.

---

## Tokens

| Token | Light | Dark |
|---|---|---|
| `--paper` | `#F4F2ED` | `#0D0D0F` |
| `--paper-2` | `#EAE7E0` | `#141417` |
| `--raise` | `#FFFFFF` | `#17171B` |
| `--ink` | `#16181D` | `#EDEDF0` |
| `--graphite` | `#4A505B` | `#B4B7C0` |
| `--muted` | `#7A8091` | `#7E8391` |
| `--line` | `#E0DCD3` | `#242429` |
| `--line-2` | `#D2CDC2` | `#2E2E35` |
| `--signal` | `#2B4FE0` | `#8FA6FF` |
| `--up` | `#1C8F5F` | `#35C08A` |

Container `--maxw: 1060px`. Easing `cubic-bezier(.22,.61,.36,1)`.

**Theme rule.** Light is defined on bare `:root`. Dark is redefined twice — once
under `@media (prefers-color-scheme: dark)` guarded as
`:root:not([data-theme="light"])`, once under `:root[data-theme="dark"]` — so
both the OS default and an explicit toggle win in either direction. Never define
a colour only inside a media or `[data-theme]` block.

## Type

- **Display** — Bricolage Grotesque. All headings, card titles, and the figures.
  Tight tracking: `-.03em` on headings, `-.035em` on section headings.
- **Body** — Hanken Grotesk. Paragraphs, links, buttons.
- **Mono** — IBM Plex Mono. Section numbers, labels, the clock, the market
  readout, chips. Uppercase with `.1em`–`.2em` letter-spacing.

This pairing is the main thing separating this page from its structural
reference, which runs a single geometric sans throughout.

---

## Page order

`hero → presently with → 01 About → 02 Work → 03 AI & Systems → 04 Lab → 05 Writings → 06 Contact`

### Nav
Floating pill, sticky at `top: 14px`, `backdrop-filter: blur(16px)` over a
semi-transparent paper. Name left, links centre, theme toggle right.
Below 760px the links leave the bar entirely and become a **bottom-right dock**
that names the section currently in view and opens a sheet upward. Top bar keeps
only the name and the toggle.

### Hero
Greeting (time-aware: *Good morning / afternoon / evening / Still up*), then one
sentence at `clamp(1.5rem, 3.3vw, 2.05rem)`, `line-height: 1.34`, max 22ch, with
key phrases underlined in `--signal` at 2px.

Right: a square portrait at `clamp(96px, 13vw, 136px)`, radius 14px. It **tilts
toward the cursor** in 3D (±14°) with a `--signal` gloss following the pointer,
and cross-fades to a second frame on hover.

Under it, two mono lines: `Bengaluru, IN · IST HH:MM` and a **market-hours
readout** — NSE trades 09:15–15:30 IST on weekdays; the pip goes live and the
strip counts down to the close. This is the one piece of chrome on the page that
only a designer at a brokerage has a reason to carry.

### Presently with
Mono label, then a five-column grid of even bordered cards. The current employer
is inked and outlined; the rest are muted and lift on hover.

### Sections
Each opens on a `1px` hairline. Heading row: mono number in `--signal`, then the
title, then the section's link pushed to the far right with a `↗`.

### 01 About
One paragraph that **sweeps from `--muted` to `--ink` as it crosses the
viewport** — a clipped gradient on one element (`background-clip: text`, animated
`background-position`) driven by `animation-timeline: view()`, range
`entry 22% cover 62%`. Guarded by `@supports` and disabled under reduced motion.
Not per-word spans: no layout thrash, and it re-colours correctly on theme change.

Then four figures, plain — no panel, no borders:

| | |
|---|---|
| `11+ Yrs` | Product design & leadership |
| `1M+` | Active clients on the platform |
| `7` | Verticals under one design bar |
| `19` | Product areas shipped since 2024 |

### 02 Work
Two **image-first, borderless** cards: cover art at `16/10` radius 13px, then
title, then one muted line. No card border, no padding box — the art carries it.
Cards lift 3px on hover.

Then an **ask band**: bordered, "Looking for confidential artefacts or an
end-to-end design-system teardown?" with a *Get in touch* button. This turns
necessarily shallow public work into a reason to write.

### 03 AI & Systems · 04 Lab · 05 Writings
Same two-up grid for AI. Lab embeds the real order-ticket component in a dark
frame. Writings are bordered cards with a mono initial tile, title, one line and
*Explore article ↗*.

### 06 Contact
Heading, one line, email in mono with an underline, `EXPLORE MORE` links, then a
footer rule with copyright and *Back to top ↑*.

---

## Cover art

No product photography exists yet. Covers are **inline SVG illustrations** that
depict what each project is, each on its own tinted ground kept in both themes
(the way printed cover art would be), with a `1px` inset hairline:

- **Orders** — an orders table with coloured status pills, one row selected.
  Ground `linear-gradient(150deg,#E9EAFB,#CFD6F4)`.
- **Wealth Tracker** — allocation ring, rising series, phone running the same
  view. Ground `linear-gradient(150deg,#FBECE7,#EFD0D2)`.
- **Agentic Framework** — requirement → framework → output, review loop under the
  middle node, output node **dashed because it has not shipped**. Ground
  `linear-gradient(150deg,#E5F1EB,#C7E1D7)`.
- **This site** — a code editor beside the page it renders. Ground
  `linear-gradient(150deg,#E7E9EE,#CED3DE)`.

Real product shots drop into the same slots with no layout change.

---

## Texture

A fixed full-viewport `feTurbulence` grain over the page at `mix-blend-mode:
overlay`, `opacity: .5` light / `.32` dark. Stops a warm off-white reading as a
default off-white.

---

## Content that must stay accurate

- **Seven verticals** — Trading, Options, Markets, FIA, Automate, Reports,
  Institutional. Onboarding is **earlier scope** and must be labelled as such.
- **FDSG was a joint initiative of roughly eight contributors.** Sujith was one,
  and one of the managers acting as point of contact. Never framed as sole
  ownership. The "~30% less design effort" figure is **removed** and must not
  return.
- **Options Scalper was directed, not built** — managed work.
- **Hands-on work is Orders, Wealth Tracker, and the Agentic Framework (WIP)**,
  in that order, because each made the next possible.
- **~70% less front-end effort** on Wealth Tracker is *the front-end team's
  estimate*, never stated as measured.
- **Never publish an unverified number.** "Over a million active clients" and
  "top-20 brokerage" both trace to the NSE active-client table (rank 18).

---

## Accessibility and motion

- Every interactive target ≥ 44px.
- Visible `:focus-visible` ring in `--signal`.
- The segmented control and the dock both handle arrow keys.
- `prefers-reduced-motion: reduce` kills every animation and transition,
  including the sweep, the tilt and smooth scrolling.
- Page must not scroll sideways at 400px; only the Lab frame may.
