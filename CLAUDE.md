# sujith.design — working notes

Personal portfolio for Sujith Kumar Anand, Senior Design Manager. Static HTML,
no build step, served from GitHub Pages via `CNAME`.

## Live since 9 Oct 2026: v3 is the site

Sujith asked to merge v3 to the live site on 9 Oct 2026, ahead of Wealth 360's release (its case stays
password protected and `noindex`, and no page may call it live until he says it is). What moved:

- `v3/hero-replica.html` is now `index.html`; `cv.html`, the CV PDF, `site.webmanifest`, `work/`,
  `writing/` and `img/` moved to the root. Paths in these notes that once read `v3/...` now mean the root.
- The old root pages (`article-*.html`, `case-study-*.html`) and `v3/` are now small `noindex` redirect
  stubs to their replacements, so the old source and its "ASSUMED CONTENT" author notes are gone.
- `sitemap.xml` lists the home page, the CV, five case studies (not Wealth 360) and the four essays.
- Scratchpad tools point at the root: `cs/build.py` writes `work/`, `cvpdf.mjs` writes the root PDF, and
  the local server runs from the repo root (`localhost:8765/` is the home page).
- The pre-v3 notes below (the frozen `index.html` hero, the Bourbon `css/`, the old tokens, the old
  repeated-copy list and the Lab iframe) describe the site before the merge and no longer apply.

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

## (Pre-v3, historical) FROZEN: the hero section

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
   **v3 (Sujith, 9 Oct 2026): the labels are "As a manager" / "Hands-on"**, no counts on either
   (33 already opens the intro). **Style C, a split pill in the filter chips' own style** (Sujith's pick
   from seven options, 9 Oct 2026): 1px outline at ink 22%, 999px radius, a divider between the halves,
   the chosen half filled ink with ground text, a 6% ink wash on hover. No underline. The manager intro ends "Five hands-on case studies, including three
   0 → 1 launches, sit under Hands-on.", the last word a link (`.tab-go`) that switches tabs; "Most play
   FYERS's own walkthrough" was cut (the cards say it).
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

- **No FYERS performance figures** (Sujith, Oct 2026: he still works there). No impact or
  adoption numbers for FYERS work on the manager wall, the FYERS hands-on cards or elsewhere.
  Allowed, by his say-so: the Wealth Tracker "~70% less front-end effort" estimate (the front-end
  team's, always called an estimate), the public scale line ("an Indian brokerage with over a million customers"), team size, verticals and the feature count. Figures from past
  employers (Nexter, Datami) are fine when dated and confirmed.
- **Only live projects go on the site** (Sujith). The Agentic Design Framework was removed
  (card and page) because it hasn't shipped. Orders is live. NRI onboarding was removed (card and page) at Sujith's
  request, 7 Oct 2026: no public screens could be found for it. **Wealth Tracker is now called Wealth 360** (Sujith, 7 Oct 2026)
  and its case study (`work/wealth-360.html`) is **password protected**. It was due on web and
  mobile on Friday 9 Oct 2026; it hit a hurdle and is now expected the week after, date not fixed
  (Sujith, 8 Oct). Sujith had the site merged to the root on 9 Oct anyway. Until it is out no page may call it
  live, released or shipped: "delivered" and "Flutter-ready" are the words in use. The page
  body is encrypted at build time (AES-GCM, key from PBKDF2-SHA256, 250k iterations) by `lock()` in
  `cs/build.py`; the password and salt live in the scratchpad (`cs/.w360pass`, `cs/.w360salt`), never in
  the repo. Screens added later must go inside the encrypted body (as data URIs), or their public URLs
  would leak them. The page is `noindex`; keep it out of the sitemap on merge. Its public card, the
  About "Ship" line and Leadership's "Close to the work" keep their text and the 70% estimate (Sujith).
  The old public `case-study-wealth-tracker.html` is now a redirect to it.
- **AIDA** is the internal agentic design framework Sujith leads: designers and PMs go from ideation
  to Flutter code. Proven on Wealth 360, now used by one PM and being rolled out to all of PD and PM
  (Sujith, 7 Oct 2026). Public, at his request: the essay `writing/aida-ideation-to-code.html`, the
  Leadership step "From my hands to the team's" (caption Leverage), the About "Ship" line and the CV.
  Don't expand the acronym or describe how it works inside: nothing beyond the facts above is known.
- **The Wealth 360 card** shows a lock and "Password protected" and says "Unlock the case study". A
  click opens a password panel on the home page (same scrim as the video overlay) that checks the
  password against the case page's sealed text, then opens the case already unlocked for the tab.
  Password: `Wealth360_2026` (Sujith).
- **Leadership facts (Sujith):** two in-house hiring drives; the design organisation peaked at 28
  people, **but that was the CXO's organisation, not his** (Sujith, 9 Oct 2026): 28 appears only beside
  the hiring drives, as "the CXO's design organisation grew to 28 people" (Leading page, CV), never as
  his scale (About, the Leading remit and results strip dropped it). His own team: five today, eight at its largest. Say "we ran" for the hiring drives. His part:
  he ran the second round; candidates he put forward went to a final round with the CXO, who made offers.
- **Org history (Sujith, 8 Oct 2026):** he joined under the CXO, leading Trading, Options and Onboarding.
  May 2025: design moved into Product; he moved with eight designers, took every vertical and reports
  to the CPO, who is also a co-founder (one person: write "the CPO, who is also one of FYERS's co-founders",
  never "the CPO and co-founder", which reads as two; Sujith, 9 Oct 2026) (content moved too, under another manager). Six months later the visual
  designers followed; Onboarding and Mutual Funds went to another Design Manager, and he kept **seven
  verticals: Trading, Options, Automate, FIA, Markets, Institutional and Reports**. These are the "two
  organisational changes". **He now reports to the AVP of Product** (earlier the CPO and co-founder;
  Sujith, 8 Oct 2026): the site says so on the Leading page and the CV only, and keeps the CPO line as
  history. The CXO's move to an Innovation Lab is internal and stays off the site (removed on his call).
- **Titles:** at Datami he was Senior Product Designer, then Lead Product Designer. On Airtel TV
  Africa he was Lead Product Designer and the only designer, and led design from start to end (Sujith:
  "I wasn't a junior"; never write "with my manager's approval"); Airtel TV went on to reach all 14 African markets (no date given).
- **Never publish a number or ranking that has not been verified**, and never
  invent one to fill a sentence. Ask instead.
- **No ranking on the site; the scale line is "an Indian brokerage with over a million customers"**
  (Sujith, 9 Oct 2026). "Top-20" went stale: FYERS was 21st on NSE active clients in September 2026 (his
  figure) and 22nd in July (2,00,810 active clients, pocketful.in). The old "over a million active clients"
  was wrong: NSE active clients are about 2 lakh. "Over a million customers" is FYERS's own published
  figure (fyers.in: "1 Million+ Customers", crossed in 2025); always say customers, never active clients.
  The old note claiming rank 18 with 10,65,788 active clients is not borne out by current data.
- **Write numbers for a global reader.** Lakh and crore do not parse outside
  India, and the site is written for both Indian and international readers:
  10L → "over a million".
- **0→1 products: Airtel TV Africa, Reach Mobile (both Datami) and Nexter Finance, three in all** (Reach
  added by Sujith, 8 Oct 2026: About "Launch", the CV, the Reach card and case tag, and the essay
  *Zero to one, three times* say three). Earlier wording: "Nexter Finance and Airtel TV Africa, two in all." FIA is NOT 0→1
  (Sujith, 7 Oct 2026: it is a feature / flagship work); every FIA 0→1 mention was removed and the
  essay became "Zero to one, twice" (`writing/zero-to-one-twice.html`). Earlier note, now wrong:
  "at least three products launched 0→1 — FIA (FYERS), Nexter Finance, and Airtel TV Africa (Datami)." The hero says "multiple"
  rather than a count, by his choice. Only FIA is labelled `0 → 1` on the page;
  the other two read as scope, so the claim is under-evidenced on the page
  itself.
- **A disputed claim is currently live.** The design-system claim — *owns FDSG,
  cut design effort by roughly a third, drove the UX/UI → Product Designer org
  shift* — was pulled from the hero as not true. It still appears in `cv.html`
  and the FDSG case card in `index.html`. Do not reuse it in new copy until
  Sujith resolves it.

## Structure worth knowing (pre-v3, historical)

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

## The mark, favicon and SEO (v3)

- **The mark is the Blocks S** (Sujith's pick, replacing the A-cut S): an S of eleven
  unit blocks on a 3 by 5 grid, drawn in real 3D at a resting isometric angle (turn -45 degrees,
  tip 35.26 degrees). It sits in the nav of `index.html` and in the centre of the
  CV page's top bar (linking home; "Back to portfolio" stays, as he asked for earlier). Each
  page carries the same small inline script: hover leans the mark toward the pointer, dragging
  turns it to any angle and a flick keeps it spinning, and left alone it settles back to the
  resting angle. A drag never fires the link; a plain click does. It only animates while
  moving, and reduced motion snaps instead of easing. The static markup is the resting render,
  so it shows without JavaScript. Faces are `currentColor` mixed toward `--bg`: black in the
  difference-blended nav, the ground once the nav is solid or on the CV bar. The light is
  fixed while the S turns. A squared S reads like a "5" head-on or a "2" from behind, which is
  why it always settles back to the resting angle. Working files (generator `gen.mjs`, `mark.js`)
  are in the session scratchpad under `blocksmark/`; the 3D sheet is on the artifact
  "Blocks S Tilt".
- **Favicons** live in `img/`: the Blocks S at its resting angle on the site's light
  ground (`favicon.svg` flips to a dark tile in dark browser chrome; `.ico` with 16/32/48,
  16/32 PNG, 180 apple-touch, 192/512 manifest icons), with `site.webmanifest`. They replaced the old `favicon.ico` set at the merge.
- **Titles** put the name first (tabs cut at ~25 characters): home is
  "Sujith Kumar Anand — Senior Product Design Manager" (Sujith's wording); other pages are
  "<page> — Sujith Kumar Anand". The description says "an Indian brokerage with over a million
  customers", so it moves with that claim.
- **Canonical, `og:url`, `og:image` and JSON-LD use absolute
  `https://sujith.design/` URLs**, live since the 9 Oct 2026 merge.
- `robots.txt` and `sitemap.xml` are at the root. The sitemap lists the home page, the CV, five case
  studies (Wealth 360 stays out while it is password protected) and the four essays; robots blocks `/v2/`
  and `/v3/` (now redirect stubs).

## v3 hero (hero-replica.html)

- **The diagonal line is the original (Sujith chose it over the source's rotating line and six
  other options on the "Tagline Motion Options" page).** It is fixed: through the centre, from
  mid-screen to the wordmark's column (`run = w × .375`, `w / 2` below 1024px). On load the
  verticals draw down (clip-path, 1.6s, 0.12s stagger) while the diagonal swings 36° into place
  and fades in. As you scroll, the line stays put and the visible side of the tagline layer
  widens (`--cut` 50% → 100% at `p × 1.15`). Kept from the later fix: the layer is masked only
  once the page has moved 12% of the viewport (`.tag-wrap.masked`), so the description is never
  cut at rest.
- **The tagline reads "Leading design / for fintech people / trust with money"** (Sujith, 9 Oct 2026),
  replacing "Designing fintech / people trust / with money": a manager's verb for Head of Design readers,
  keeping the trust idea. Three spans in `#tagline`; each holds one line at 390–1440px.
- **The hero description is one lighter colour** (`--ink-2`), with no darker emphasis, on
  desktop and phone (Sujith).

- **About (Lead / Launch / Ship) runs on a 520svh pinned stage** (was 600). The photo starts
  fading in while the curtain is still closing (curtain 0–0.9, photo from 0.5), and "Lead"
  arrives at 1.3 of an 8.8-unit timeline, so there is no empty dark screen after the hero
  (Sujith: "why empty, move bit faster").
  Work slides up over About's last screen (`.works` has a -100svh top margin), which starts at about 6.7
  of the 8.8 timeline, so every statement must be fully in before then: Lead 1.3–2.7, Launch 3.1–4.6,
  Ship from 5.0 (done near 6.1), words staggered 0.015s (Sujith, 9 Oct 2026: white showed before the
  last words). Re-check with `scratchpad/shipgap.mjs` after any change to the copy or timing.

- **The nav takes its solid ground over the hero copy** once the rail has stuck, as it does over
  Work, so the description and "Scroll to discover" slide under it instead of through the links. It
  goes back to the difference blend once About's curtain has closed over the hero (Sujith).

- **"Invert colour" takes its solid ground only under the visible Work panel** (Sujith, 9 Oct 2026: it
  showed a white chip over About). `.works` starts a screen early under a centre-out clip, so the test is
  the clip's left edge (`innerWidth/2 × top/innerHeight`) reaching the button, not the box's rect.

- **Every refresh or fresh visit starts at the hero** (Sujith, 8 and 9 Oct 2026): a small script after
  `<title>` sets `history.scrollRestoration` to manual and scrolls to the top (and Lenis, via
  `window.__toTop`), dropping any `#hash` on a reload, so the intro plays again. It used to fire on
  "reload" only, which the claude.ai preview never reports. It stops once the reader scrolls, so a slow
  load can't pull them back up. Back/forward and section links (`#work`, `#writing`) behave as normal.

- **About "Lead" is career-wide, not FYERS-only** (Sujith, 9 Oct 2026): "Design Lead at three startups
  (Datami, Oddz, Nexter), then managing design at an Indian brokerage with over a million customers: a team of five designers today,
  eight at its largest." (The 28-person organisation was the CXO's and was cut here.) The reorganisations and the feature
  count live in Work, Leadership and the Leading page instead.

- **The space above "Selected Work" stays at 55svh (40svh on phones).** It was cut to 20/16svh
  once and Sujith asked for it back.

## v3 Work, case studies and essays

- **Manager wall** (`#viewMgr` in `index.html`) lists 33 FYERS
  features shipped since February 2024. Sujith reviewed the list card by card;
  the source of truth is `wall.tsv` (video id, name, area, sub-area, design
  scope S/M/L, launch month), which `wall.py` turns into the cards. Both live in
  the session scratchpad under `yt/`. Removed on his review: FYERS Prime (he
  didn't work on it), the FYERS Web explainer (not a feature), FIA GPT (no
  design), four Automate triggers and FIA IPO analysis (dev work), and NRI
  onboarding (his own hands-on work; it later had an IC case study, since removed too) and the generic
  "Reports & portfolio" card (Reports is a vertical; portfolio sits under
  Trading), and API Dashboard (Sujith, Oct 2026), and AI Screener (Sujith, 8 Oct 2026: not his team's). Chart features are
  "minimal design, mostly dev", so they carry a Small scope.
  **Launch months come from FYERS's What's new timeline (fyers.in/whats-new), not video dates**
  (Sujith, 8 Oct 2026; FIA is July 2025). Re-dated then from the first matching entry; cards with no
  clear entry kept their video month: Build your own indicators, Dual Chart Mode, Portfolio analysis
  with FIA, Smart News, Advanced Option Chain, Trade from Advanced Charts and DDPI. Stock Screeners is
  Dec 2025 (the upgrade his team designed, not the Nov 2024 launch). Account opening stays Jun 2024:
  his team's redesign after he joined, not the Nov 2023 Sign Up 2.0 (Sujith). The page is newer than `wall.tsv`, so edit dates in `index.html`; the
  parsed timeline is `scratchpad/wn/entries.tsv`. `.extra` marks every card outside the first 12 of the
  default (flagship-first) order.
- **Trading has three sub-areas: Trading, Charts and API** (Sujith). Cards show
  "Trading · Charts" and "Trading · API"; plain Trading cards just say
  "Trading". He tried sub-area chips under Trading and dropped them as
  unnecessary; don't bring them back unless he asks. No API card is on the wall
  now: API Dashboard was removed at his request. Newest-first order is `data-order`, not the date, so a card added later must
  be slotted into the sequence by its month. FYERS
  Professional is the one card without a video. The count (33) appears in
  the lede, the filter sentence, the All chip, the area chips (Trading 13, FIA 3), Leadership
  (step 3 "33 features shipped at FYERS", the diagram's "33 features shipped") and the Leading design page; move them together.
  **Most of the wall is post-May 2025** (Sujith, 9 Oct 2026): 24 of the 33 are dated May 2025 or later, when
  he took on every vertical, and eight of the nine flagships (only Smart Orders, Sep 2024, is earlier;
  FYERS Professional has no date). The Work intro, the Leading remit and its results strip say so; "about
  one a month" was dropped because it hid that. Recount if a card's date or scope changes.
- **Manager wall cards carry no figures** (no FYERS numbers): the panel holds the one-line
  description only. For fine pointers the panel keeps a 2.5:1 frame so the hover still has
  room; on touch it is as tall as the text. The layout-H figure slots below apply to past
  employers' cards only.
- Cards use **layout H, "Before and after"** (Sujith's pick from the card
  options page): area and month, then the title with its scope word, then a
  panel in the card's own colour (never a black box) holding a one-line
  description written from FYERS's own video description, the Impact figure as
  a before-and-after pair, and the Adoption figure. The panel is as tall as its
  content. Every figure reads "To add" until Sujith supplies it. Fill Impact as
  `<span class="ba"><b class="was">old</b><span class="arr">&rarr;</span><b>new</b></span>`
  with its label in `.ba-l`, and Adoption as `<span class="kpi"><b>value</b>label</span>`,
  only with verified, publishable figures that have a source and date. **No
  YouTube figures (views, length) on the page: he asked for end-user analytics
  only.** On hover (fine pointers) or keyboard focus, the panel gives way to the
  walkthrough's still (`img/work/<videoId>.webp`). A plain click plays FYERS's
  walkthrough (@FYERS-Platforms) straight away in an overlay on the same page
  (youtube-nocookie embed). Once script runs, the cards keep the YouTube address in
  `data-yt` rather than `href`, because the claude.ai preview intercepts outbound links
  and opened them in a new tab. Ctrl/Cmd and middle clicks and no-JS still go to YouTube.
  The preview also blocks YouTube embeds (CSP): a `securitypolicyviolation` listener
  swaps the frame for the still and a "Play on YouTube" button. On GitHub Pages the
  video plays in the overlay.
  Phones below 640px get one card per row. Hands-on cards use the same anatomy:
  their description sits in the panel with the same two slots, and there is no
  hover still. **The filter** (Sujith's picks from the filter options page): on
  desktop it is one sentence, "Showing 33 features in [every area], [newest
  first]", with two native dropdowns (option B); below 1024px it is one strip of
  area and sort chips that swipes sideways, with no sheet (option F). Both drive
  the same state and stay in step; the count in the sentence updates as you
  filter. **Flagship work first is the default order** (Sujith), on both. The
  sentence is set small (about 1.06 to 1.31rem) and each dropdown is sized to the
  choice it shows, so the line reads without gaps.
- **Company marks sit in each card's bottom-right corner** (option D, Sujith's pick
  from the logo options page), opposite "Watch the walkthrough" or "Read the case
  study", on both views. The top line carries the area alone. Manager cards carry
  the FYERS "F" symbol (`img/co/fyers-f.svg`, cut from `fyers.svg`, which comes
  from fyers.in); hands-on cards carry their company's mark: the FYERS F, the Datami
  wordmark (`img/co/datami.png`, from datami.com). All are drawn as a CSS mask in
  the card's text colour at 72%, with the name as the accessible label. Nexter
  Finance's site no longer resolves, so its mark (`img/co/nexter.png`) was cut from the
  cover image of his own case study, with his OK: the symbol and "nexter" set side by side,
  as in the app's own nav. Design scope shows as a word beside each card's title, in Sujith's
  chosen wording: Large = Flagship, Medium = Feature, Small = Enhancement.
- **Leadership is career-wide** (Sujith, 9 Oct 2026: "speaks about FYERS only?"): each step leads with
  FYERS and shows the same habit earlier. 1 Building teams (Nexter's visual/motion designer and intern;
  FYERS reorganisations, three verticals to seven, second round of hiring), 2 One owner per problem (only
  designer with 30+ engineers at Airtel; argued for it at FYERS; UX Manager → Product Design Manager),
  3 Review and quality bar (was "Direction, review, delivery"; caption Review, was Oversight) (33 features, PM then him; screen-by-screen build checks at Nexter and
  Reach), 4 From my hands to the team's (Airtel's component system; Wealth 360 → AIDA). All four use the
  same layout: title above the centre line, text under it. The diagram labels stay FYERS.
- **The Leadership diagram is literal** (Sujith, 9 Oct 2026: "care to explain what is this?"): 7 columns
  for 7 verticals, 5 dots for five designers and 3 hollow for eight at peak, one owner line per designer
  (the fifth also owns the sixth column, drawn as an elbow), 33 ticks for 33 features, and the seventh
  column is his own hands-on line. The labels are the key: "each line: one owner per problem", "7
  verticals, one per column", "each tick: a feature, 33 shipped", "me, hands-on". If a count changes,
  change the drawing with it. Draw-in paths use `pathLength="100"` with a 110 dash: GSAP rounds dash
  offsets to whole pixels, so a length of 1 never animated and left the frame open at the top left.
- **Leadership shows what he did; Writing holds what he argues** (Sujith, 9 Oct 2026: they duplicated).
  Step 2 is "One owner per problem" (the model and his UX Manager → Product Design Manager move), step 4
  keeps the Wealth 360 → AIDA facts; neither links to an essay. Step 1's "How I lead the team" link to
  the Leading case is the section's only link. Step 1 is "Through two reorganisations" (May 2025 into Product, the visual
  designers six months later, three verticals to seven, the hiring drives); team size (5/8) lives in
  About "Lead" and the diagram labels, not here (Sujith, 9 Oct 2026: it was said three times). Don't reuse essay titles or teasers as Leadership steps.
- **Every Leadership step keeps its text with its title** (Sujith, 9 Oct 2026): step 3's text sits right
  under "Review and quality bar", right-aligned to the same edge, not in the opposite corner.
- **Leadership step 4 ("From my hands to the team's") is split like step 2** (Sujith, 9 Oct 2026: it ran
  out of frame): title above the centre line, text and link below it. It used to be one block anchored
  above the centre, so on short windows the three-line title rose under the nav. `scratchpad/ldfit.mjs`
  checks every step against the nav and the bottom edge at short sizes.
- **Work → Leadership spacing.** Leadership's panel wipes up at exactly the speed
  Work's last row scrolls away (its own ScrollTrigger, `top top` to `top -100%`),
  so `.works` needs only an 8rem bottom pad. The old `100svh` pad left a blank
  screen after "Load more"; don't bring it back.
- **Three revamps in seven months** (Sujith, 9 Oct 2026), the Leading page's section 06: the all-new FYERS
  experience (app Aug 2025, web Sep 2025); a second complete revamp in Nov 2025 after a change to the product
  brand; a web-only revamp of how certain sections look in Mar 2026. **All three ran under his management and
  his team did the design** (Sujith, 9 Oct 2026). The last two were silent pushes, not on What's new, so no
  names or detail beyond this and no wall cards (his call). Don't cite FYERS community reactions unless checked.
- **The all-new FYERS experience** (Aug 2025, Large) was FYERS's first push to
  unify web and app on one design system (app Aug 2025, web Sep 2025). It ran under Sujith's management and
  his team designed it (his card: "Designed by my team, under my management, by then across every vertical").
  The separate FDSG claim (owning the design system, a third less design effort) stays disputed.
- **IC view** has five cards, each opening a page in `work/` (Orders, Wealth
  Tracker, Nexter Finance, Airtel TV Africa, Reach Mobile); the lede says "Five pieces of
  hands-on work across three companies". Airtel TV Africa and Reach Mobile are two separate projects from his time at
  Datami Mobile Solutions Pvt Ltd; each keeps its own page. Pages are generated from one template; `[[...]]`-style gaps render as
  "To add" highlights and dashed boxes mark screenshot slots for Sujith to fill.
- **Nexter Finance case study** is written from Sujith's own Medium case study
  ("Designing Nexter Finance", 27 Jan 2024, medium.com/@suj009; the article page
  blocks fetching, but his RSS feed at medium.com/feed/@suj009 carries the full text).
  Its screenshots are his, in `img/work/nexter/`. The growth figures (10K+ users,
  1K+ weekly active, 1.7M+ predictions, $19M+ volume, $242K fees) are Nexter's, as
  published in that article in January 2024; Sujith confirmed they are fine to show.
  Always date them. The Nexter card on the home page carries "1.7M+ Predictions made, Jan 2024"
  as its Impact figure (no before/after for a 0 → 1 product) and "10K+ Users, Jan 2024" as
  its Adoption figure. Target users were
  people who already knew web3 prediction markets, not newcomers. He moved on from Nexter soon
  after the six-user test, so the page says the findings were left to the team; don't invent
  changes that followed it.
  **Nexter launched with Lossy only; No-loss came in a later phase** (Sujith, 9 Oct 2026). The brief covered
  both and he proposed Lossy first. Don't call No-loss "the headline" or say the landing page promised it:
  the landing page was designed after all the app UI. The main screen "skips the explaining and goes
  straight to predicting" (was "stays out of their way", which he found unclear).
  Revised Oct 2026 for the C-suite reader: the headline leads with the outcome ("1.7 million
  predictions from an unfinished brief"), the results strip leads with volume and fees, and the
  page adds what the article had but the page didn't: the ~50-person Twitter/Telegram poll, his
  earlier Oddz Finance role, the competitor matrix ("from my research at the time"), the design
  review log, and a section on retention (portfolio, history and leaderboard; collect earnings;
  leaderboard campaigns). Left out on purpose: the TAM chart (third-party projections) and the
  analytics dashboard screenshot (unverified internal numbers).
- **Airtel TV Africa and Reach Mobile case studies** are written from Sujith's own
  portfolio PDF ("Portfolio_Sujith_2023.pdf", uploaded in session; not in the repo). Screens
  are cropped from it into `img/work/airtel/` and `img/work/reach/`. Facts to keep
  straight: Airtel TV Africa started from the existing Indian Airtel TV app, not a blank page
  (it is still tagged 0 → 1 as a new-market launch, Sujith's earlier call); he was its only
  designer (Design Lead) with 30+ engineers. 450,000+ registered users in Nigeria, Zambia and
  Uganda comes from that PDF and is as of 2020 (Sujith); Sujith confirmed the 0 → 1 tag
  stays. The Airtel card carries "450K+ Registered users, 2020" (Impact) and "3 African
  countries live, 2020" (Adoption). On Reach Mobile he was Design
  Lead (his manager was the Design Manager), the first designers on the product; the fast
  social/ads purchase flow was "we", not "I"; visual artwork was a teammate's. Its outcome
  figures (3,000+ paid monthly users, hit by COVID) stay off the site (Sujith).
  **Airtel's analytics portal shows only the second version** (Sujith, 9 Oct 2026), full body width; the
  first version is described in the decision only (`analytics-v1.webp` stays unused in the repo). Wide desktop
  screens go full body width, never side by side: Nexter's Vaults and Quests are stacked too.
  **Reach Mobile is a SIM service, not a phone service** (Sujith, 9 Oct 2026): "a US SIM service sold
  entirely online"; it sells SIM cards and plans. Never "phone service" or "phone plan".
- **Orders case study (v2)**: FYERS's first unified Orders section, web and app, every screen
  designed by Sujith with the PM and developers, shipped January 2025 (Sujith). Before it, orders
  were a tab in the Account Manager; FYERS Trader still uses that pattern, so a Trader crop stands in
  as "the pattern Orders replaced" (cropped to drop a customer's name and account number). Screens and
  the two looping videos come from FYERS's public help-centre article "How can I view and manage my
  orders in FYERS?" (Zoho WorkDrive embeds; the Trader videos were not used), trimmed to start on
  Orders, as MP4 plus WebM in `img/work/orders/`. They show Orders as of March 2026, so captions
  say "today". The decisions are written from the shipped product with Sujith's go-ahead; the
  "What I learned" points are his own, from the live `case-study-orders.html`. No figures.
  **His role reads "designed every screen myself while managing the team"**, never "Design manager, and
  the designer on it" (Sujith, 9 Oct 2026): it read as two titles, and "design manager" was not his title
  (UX Manager in Jan 2025). The home card says "Designed hands-on, while managing the team".
- **NRI onboarding was killed** (Sujith, 7 Oct 2026) after a full search of FYERS's help centre,
  community and What's new found no public screens of the flow. Don't bring it back unless he asks
  and supplies screens. Its draft entry lives in the scratchpad as `cs/nri_v2.py`.
- **Case study template v2** (Nexter, Airtel TV Africa, Reach Mobile and Orders are on it; Wealth Tracker waits for its release): results strip first (`results=`), an "at a glance" summary of
  problem / role / the call / result (`glance=`), decisions as call-outs with Why and The
  trade-off (`{{call:what||why||trade-off}}`), screenshots on a stage in the product's colour
  (`stage=`), looping videos (`vid:video.mp4|poster|alt|caption`, with a `.webm` beside it; paused with controls under reduced motion), reading time in the kicker, and a closing "What I’d do differently" (or "What I learned") section. Airtel has no
  reflection because his portfolio states no learnings for it; Reach's comes from his own
  "Learnings".
  Reflections must come from his own stated learnings, never invented. The generator is
  `cs/build.py` in the session scratchpad; `build.v1.py` is the pre-v2 copy.
- **Essays** live in `writing/`, four since the Oct 2026 C-suite review: *AIDA: from one designer to
  a whole team* (now also carries how Wealth 360 ran and the honest limits, folded in from *Designing
  past the handoff*, which was deleted as a third essay on the same idea), *Trust is a design material*,
  *Zero to one, three times* (`zero-to-one-three-times.html`, was *twice*; Reach Mobile added from its
  case facts) and *One designer, whole problem*. Each essay's Keep reading lists the other three. The handoff essay's original carried
  author notes saying its workflow section was assumed and its anecdote "did not happen"; both were
  removed and the workflow rebuilt from the Wealth 360 case facts. Never reintroduce them. In *Trust*,
  the order ticket is the Lab prototype, so it says "prototyped", not "built".
- **Leading design at FYERS** (`work/leading-design-at-fyers.html`, first in the case chain, linked
  from Leadership's Team step as "How I lead the team"): the manager-level case study. It has no card on the
  home page, by Sujith's choice (9 Oct 2026): Leadership's link is its only way in. Built only from
  confirmed facts and his own essay lines (the relay, "I argued for", the UX Manager to Product Design
  Manager line, the org-chart pull quote). Opens on a diagram (relay, one owner, AIDA to code) drawn
  in `scratchpad/model.svg`. No To add gaps remain (Sujith, 8 Oct 2026): the org changes and his hiring role (section "Two
  organisational changes"); review runs two ways (blockers brought to him any time, a final review when
  the design is done; a stand-up every other day), every design reviewed by its PM and then by him,
  walkthroughs in person with feedback as Figma comments or notes for the AI-generated version;
  his quality bar is all four of every state designed, design-system components only, web and app
  together, real data; since then fewer developer questions and faster reviews. A quarterly cadence chart was drawn and dropped: launch months then came from video dates and made
  2024 to 2025 look slow next to a 2026 spike. Wall counts: 9 Flagship, 8 Feature, 16 Enhancement.
- **The relay's third step is "development"** (Sujith, 9 Oct 2026): UX, then UI, then development, in the
  Leading page, its diagram (`scratchpad/model.svg`, re-rendered by `rendermodel.mjs`) and *One designer,
  whole problem*. "Front-end" stays where it means front-end code (the 70% estimate, shipping front-end with AI).
- **The Leading page states what happened; *One designer, whole problem* holds the argument** (Sujith,
  9 Oct 2026: they repeated each other). Leading section 02 keeps the relay in one line, the call (fresh
  wording), the title change and a link to the essay; the translation line, the objections and the
  "serving the org chart" line live only in the essay, and the Leading page has no pull quote. Case
  copy can link with `[text](url)` (added to `inline()` in `cs/build.py`). The essay's objections, as
  checked by Sujith: "True before, less true now" on doing both well, and "At FYERS, five designers now
  cover seven verticals this way" on scale.
- **One idea, one home:** "show leaders finished screens, not wireframes" lives in Orders only.
  Reach Mobile's launch-scope section was removed (Sujith, 8 Oct 2026: not his call); its one decision
  is the purchase-flow swap, and its story closes with the short flow becoming the only purchase flow.
- **Checked by Sujith (8 Oct 2026):** the four Orders decisions are his (the PRD covered only the basics;
  he did the IA, the PM approved it, the decisions followed, and the page says so); Nexter's retention
  call is his; the CV line "A leading voice for moving from a split UX/UI relay to end-to-end Product
  Designers" is accurate.
- **Team size:** five designers today, eight at the team's largest. Never "5–8".
- **His role is the bar and the review, not "direction and delivery oversight"** (Sujith, 9 Oct 2026). Never
  write "execution is the team's": it contradicts Orders and Wealth 360. Say each designer owns their problem
  end to end; he sets the quality bar, reviews every design and stays hands-on where it counts.
- **Fixed Deposits** (May 2026, Mutual funds) was his team's work (Sujith, 9 Oct 2026), though Mutual Funds
  later moved to another Design Manager. It stays on the wall.
- **The detailed CV** (`cv.html`) has a pre-rendered
  `Sujith-Kumar-Anand-CV.pdf` for its Download button. Regenerate it
  whenever the CV changes (`cvpdf.mjs` in the scratchpad, A4 at scale 0.9 to hold two pages). The
  row numbers are hidden in print: Chrome's PDF stacked them all over the name.
- **Inner pages open at the top when you arrive, and a refresh keeps your place** (Sujith, 9 Oct 2026; only
  the home page goes back to the top on refresh). The claude.ai preview carries the last page's scroll over
  and doesn't report a refresh as a reload, so the script after `<title>` in `cv.html`, each essay and the
  case template (`TOPJS` in `cs/build.py`) records `{page, scroll}` in sessionStorage (`lastPage`) as the
  page unloads; loading the same page next counts as a refresh and restores it, anything else goes to
  the top. The home page writes itself as `lastPage` on unload so it never looks like a refresh to an
  inner page. Retries after load cover Wealth 360 opening after its password check. Back/Forward and
  #section links are left alone. Add it to any new inner page; `scratchpad/innertop.mjs` tests it.
- **The old root pages are retired** (`article-*.html`, `case-study-*.html`): done at the 9 Oct 2026 merge.
  Each is a `noindex` redirect stub to its replacement; their old source with "ASSUMED CONTENT" notes is gone.
- **No present-tense claims about past employers' products** ("still in use", "customers use today")
  unless re-verified: Reach Mobile's were cut on the Oct 2026 C-suite review.
- **Contact line is "Open to Head of Design roles · Bengaluru or remote"** (Sujith, 8 Oct 2026: Sr Design
  Manager dropped) on every v3 page.
- **Business numbers are for interviews, not the site** (Sujith, 8 Oct 2026): FYERS outcomes stay as
  scope and output on the page; he discloses results in person.
- **Plain words in case studies and essays; design metaphors are fine** (Sujith, 9 Oct 2026: "don't use
  dictionary jargon"). Keep relay, handoff, seam, the wall, intent leaking. Cut words a busy reader would
  look up: fidelity (say "polished", "finished-looking", "matching the design"), specialism, accountability,
  ideation ("idea"), consolidated, amplified, zero-sum, traction, contested, learnable, iteration
  ("rounds of changes"), operational/conversational, sturdier, inherited, cohesive, coherence,
  unambiguously, unmistakable, legible, compounds, implementation ("the build"). Re-scan with the
  word list in this note before publishing new copy. "Agentic design framework" stays: it is AIDA's name.
- **Audience reminder (Sujith, Oct 2026):** primarily Head of Design roles; readers are C-suite and
  heads of design. Recheck every word against them.
