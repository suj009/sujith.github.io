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

## Accuracy rules

Claims on this site are checkable by the people being persuaded, so:

- **Never publish a number or ranking that has not been verified**, and never
  invent one to fill a sentence. Ask instead.
- **Rankings decay.** "Top-20 Indian retail brokerage" was verified against the
  NSE active-client table — rank 18, 10,65,788 active clients — but #19 and #20
  sit within ~15%. Re-check periodically.
- **Confirmed by Sujith:** three products launched 0→1 — FIA (FYERS), Nexter
  Finance, and Airtel TV Africa (Datami). Only FIA is labelled `0 → 1` on the
  page; the other two read as scope, so the hero's count is under-evidenced
  on the page itself.
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
