# sujith.design — working notes

Personal portfolio for Sujith Kumar Anand, Senior Design Manager. Static HTML,
no build step, served from GitHub Pages via `CNAME`.

## Who reads this site

**C-suite and founders.** Copy is written to persuade that audience, not other
designers.

They reward: business outcome, org leverage, risk reduced, speed, judgement
under constraint, and the scale of what the person is responsible for.

They skim past: craft process, tool names, design-internal vocabulary, academic
credentials, and method described for its own sake.

Practical consequences:

- Prefer **outcome** over **scope**. Scope is what someone was given; outcome is
  what changed because they were there. Hero copy in particular should not be
  only scope.
- Both founders and enterprise C-suite are in scope. The "still ships
  front-end" claim reads as leverage to founders and can read as under-delegating
  to enterprise C-suite, so scope always precedes it in the hero.
- Recheck every word against this audience before shipping copy.

## FROZEN: the hero section

**Sujith froze the hero at `14db5ea`. Do not change any part of it — copy, layout,
CSS or markup — unless he names the change explicitly.** "Improve the page",
"fix the site" or work on any other section is NOT permission to touch it.

What that covers, in `index.html`:

- `header.hero` and everything inside it: `.art`, `.hero-grid`, `.hero-copy`,
  the eyebrow, `h1`, `p.lede`, `aside.spec` and the `.cue`.
- The CSS for all of the above, including the `heroIn` / `artIn` / `cueBounce`
  keyframes and their timings, and the hero rules inside the 860px media query.
- `img/sujith-portrait.webp` and `img/hero-mobile.webp`.

Shared things the hero depends on — `:root` tokens, `--maxw`, `.wrap`, `.spec`
base styles, `nav` — are used by other sections too. Changing them changes the
hero, so treat an edit to any of them as a hero edit and ask first.

The frozen state: full-viewport band (`min-height:calc(100svh - 57px)`), copy
and spec stacked down the left inside the shared 1320px container, portrait
full-bleed behind with no veil on desktop and a wash below 860px, staggered
entrance on load, centred scroll cue.

## FROZEN: the Work section design

**Sujith froze the Work section design on the canvas. Do not redesign it — its
anatomy, its control, or what each view contains — unless he names the change
explicitly.** "Improve the work section" or "try more mocks" is NOT permission
to change the settled structure; it means variations *within* it.

The design lives as `Main.dc.html` on the design canvas
(https://claude.ai/code/artifact/41f13c7a-c67f-4869-98ab-cdcfdf2013c8, page
"The build"), reached after ~20 discarded options. Working files are in the
session scratchpad under `design/`; they are not in the repo.

The frozen anatomy, top to bottom:

1. **The statement.** A two-line display headline at `5.6rem`, second line in
   `--signal`, with an uppercase mono kicker above it and two figures in a fixed
   250px column to its right, over a 2px `--ink` rule. The grid is
   `minmax(0,1fr) 250px` — `1fr` alone lets the headline push the figures off
   the edge, which was a real shipped bug.
2. **The toggle** — two pills, `As a manager` / `As an IC`. Not "IC" alone as a
   button label anywhere user-facing: that is design-internal vocabulary.
3. **The toggle drives the whole section**, not just the body. Switching also
   rewrites the kicker, both headline lines, the second line's colour
   (`--signal` → `--up`) and both side figures. This is the point of the design
   and the reason W1 was chosen over the alternatives.
4. **Manager view** — the count (`20+`), then a wall of feature tiles, four
   columns, each tile carrying its vertical. **Managed work only: no
   built-by-me marking of any kind on the wall.** Five columns overflows a
   1240px frame; four does not.
5. **IC view** — the case-study cards with their dark product bands. The
   hands-on claim lives here and only here.

Removed on request and not to be reinstated without asking: the "Talks &
writing" list that sat under the manager wall.

**Still unresolved, and blocking the build into `index.html`:** the FYERS
project list. `cv.html` supports five projects there; the design claims `20+`
features. Nothing in the repo or the conversation history has ever carried a
fuller list — it must come from Sujith. Do not invent feature names to fill the
wall.

Also unresolved: whether Options Scalper belongs in the IC view at all. The CV
says he *directed* it. `cv.html` names **Wealth Tracker** ("shipped end to end
in the front-end, working with AI") as the clearest IC project, and it is not
in the design yet.

## Accuracy rules

Claims on this site are checkable by the people being persuaded, so:

- **Never publish a number or ranking that has not been verified**, and never
  invent one to fill a sentence. Ask instead.
- **Rankings decay.** "Top-20 Indian retail brokerage" was verified against the
  NSE active-client table — rank 18, 10,65,788 active clients — but #19 and #20
  sit within ~15%. Re-check periodically. The hero's "over a million active
  clients" comes from that same figure, so both claims move together.
- **Write numbers for a global reader.** Lakh and crore do not parse outside
  India, and the site is written for both Indian and international readers:
  10L → "over a million".
- **Confirmed by Sujith:** at least three products launched 0→1 — FIA (FYERS),
  Nexter Finance, and Airtel TV Africa (Datami). The hero says "multiple"
  rather than a count, by his choice. Only FIA is labelled `0 → 1` on the page;
  the other two read as scope, so the claim is under-evidenced on the page
  itself.
- **A disputed claim is currently live.** The design-system claim — *owns FDSG,
  cut design effort by roughly a third, drove the UX/UI → Product Designer org
  shift* — was pulled from the hero as not true. It still appears in `cv.html`
  and the FDSG case card in `index.html`. Do not reuse it in new copy until
  Sujith resolves it.

## Structure worth knowing

- **Everything is inline.** `index.html` carries its own `<style>` block
  (tokens at `:root`) and `<script>`. The `css/` directory is a legacy Bourbon
  theme and is not used by the current pages.
- **Design tokens** (`index.html` `:root`): `--paper:#F0EFE9`, `--ink:#14161B`,
  `--graphite:#4A505B`, `--muted:#6E7480`, `--signal:#2B4FE0`, `--up:#1C8F5F`,
  `--panel:#0C0E13`. Type: Bricolage Grotesque (display), Hanken Grotesk (body),
  IBM Plex Mono (labels and the spec readout).
- **The hero lede** is `p.lede` in `index.html`. It has been rewritten
  repeatedly; keep it short — it grew to 68 words once and had to be cut back.
  `.lede` is capped at `46ch`.
- **The spec readout** (`aside.spec`) is the signature element and echoes the
  Lab instrument panel. Rows: role, exp, domains, ships, stack, seeking.
- **Repeated copy.** The "Open to … roles · Bengaluru or remote" line appears in
  8 places across 7 files — `index.html` (footer + spec `seeking`), `cv.html`,
  both `case-study-*.html`, and all three `article-*.html`. Change them together
  or the site advertises two different targets.
- `lab-order-ticket.html` is embedded by `index.html` in an iframe and must stay
  alongside it. It has its own brighter dark palette (`--up:#35C08A`,
  `--down:#EF5F6B`, `--focus:#5E8BFF`).

## Checking work

There are no tests and no CI. Verify by reading the rendered copy and by
grepping for stale strings across all HTML files after any repeated-copy change.
