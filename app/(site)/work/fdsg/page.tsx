import type { Metadata } from "next";
import Link from "next/link";
import {
  Callout,
  Figure,
  Glance,
  Masthead,
  NextCards,
  Outcomes,
  Pipeline,
  PullQuote,
  ReadingPage,
} from "@/components/reading/Reading";

export const metadata: Metadata = {
  title: "FDSG — one design language for FYERS",
  description:
    "Case study: scaling FDSG, the FYERS design system, from scattered style guides to one versioned source of truth across web, iOS and Android — and the org shift that made it stick.",
  openGraph: {
    title: "FDSG — one design language for FYERS",
    description:
      "From scattered style guides to one versioned source of truth — and the org shift from a UX/UI relay to end-to-end product designers.",
    type: "article",
  },
};

export default function FdsgPage() {
  return (
    <ReadingPage>
      <Masthead
        kicker="Case study · Strategy & leadership"
        title="FDSG — one design language for FYERS"
        standfirst="Design didn't have one language when I joined. It had several dialects. This is how we replaced them with a single versioned source of truth — and why the harder half of that work was organizational, not visual."
        byline={["Design system · Web, iOS, Android", "Q3 2024 → present", "~9 min read"]}
      />

      <div className="wrap">
        <Glance
          status="ONGOING"
          rows={[
            { term: "role", value: "DRB member (v1.0) → owner, FDSG 2.0 & 2.1" },
            { term: "scope", value: "Web · iOS · Android — six product verticals" },
            { term: "team", value: "8 at peak → 5 today, governed via the Design Review Board" },
            { term: "partner", value: "Engineering review board (ARB) → Fy_UI" },
            { term: "outcome", value: <span className="g">~30% less design effort</span> },
          ]}
        />

        <article className="read">
          <h2>The problem</h2>
          <p className="lede">
            When I joined FYERS, design didn&rsquo;t have one language — it had several dialects.
            Style guides were scattered, half-finished, or duplicated: small pockets of standards
            that each team had grown on its own.
          </p>
          <p>
            The same element could exist several different ways across web, iOS, and Android, and
            every new screen meant re-deciding things that should already have been settled.
          </p>
          <p>
            That cost the business twice. Designers spent time rebuilding instead of designing,
            and users met a product that felt subtly inconsistent as they moved between verticals
            — the kind of friction that&rsquo;s hard to name but easy to feel in a financial
            product, where trust is the whole game.
          </p>
          <p>
            There was appetite to fix it, but the early instinct was to patch: another partial
            guide, another local system. I became one of the louder voices arguing the opposite —
            that FYERS needed <strong>a single, real style guide</strong>, owned and versioned,
            rather than more scattered ones. That argument is where my involvement started.
          </p>

          <Figure>
            Before / after: the same component as it existed across apps pre-FDSG, next to its
            single form on the system.
          </Figure>

          <h2>The vision</h2>
          <p>
            One source of truth. Not a component dump — an operating standard for how FYERS looks,
            behaves, and gets built, consistent across web, iOS, and Android.
          </p>
          <p>
            FDSG was conceived to hold everything except coded components: the Figma libraries,
            the usage guidelines, the tokens, and the rules that make design decisions repeatable.
            The coded layer would come later, built by engineering — but the design system had to
            be authoritative first.
          </p>

          <PullQuote>The library is just the artifact. The agreement is the system.</PullQuote>

          <h2>How I led it</h2>
          <p>
            I earned the system before I owned it. During <strong>v1.0</strong>, I contributed
            individually as a member of the <strong>Design Review Board (DRB)</strong> — the
            designers-only forum where components and patterns are proposed, critiqued, and
            ratified before anything ships. Work that clears the DRB then moves to the{" "}
            <strong>ARB</strong> for the front-end build, so the two boards form a clear pipeline:
            design decides, engineering implements.
          </p>

          <Pipeline
            steps={[
              {
                stage: "Propose",
                actor: "Designer",
                detail: "A pattern or component is put forward against a real product need.",
              },
              {
                stage: "Ratify",
                actor: "DRB",
                detail:
                  "Designers-only forum. Critiqued, revised, and accepted into FDSG — or sent back.",
              },
              {
                stage: "Build",
                actor: "ARB → Fy_UI",
                detail: "Engineering implements the ratified pattern as a coded component.",
              },
            ]}
          />

          <p>
            After 1.0 shipped, I took over the initiative and drove{" "}
            <strong>FDSG 2.0 and 2.1 across both web and mobile.</strong> Two deliberate shifts
            defined those versions:
          </p>
          <ul>
            <li>
              <strong>2.0 — a visual reset.</strong> We moved away from a gradient-heavy style
              toward a cleaner, more minimal look. Less decoration, more clarity — the right
              register for a trading and investing product where the interface should get out of
              the user&rsquo;s way.
            </li>
            <li>
              <strong>2.1 — density and rhythm.</strong> We tightened spacing and made layouts
              more compact, refining components so the same screen could carry more without
              feeling crowded. This was the &ldquo;make it feel considered&rdquo; pass.
            </li>
          </ul>

          <Figure>
            2.0, side by side: the gradient-heavy language on the left, the clean minimal reset on
            the right.
          </Figure>

          <Figure>2.1: the same screen before and after the spacing and density pass.</Figure>

          <h2>The engineering bridge</h2>
          <p>
            A design system that engineering can&rsquo;t build is just a nice PDF. So the real
            test came after 2.1, when the{" "}
            <strong>ARB team built FDSG into a coded component library they named Fy_UI.</strong>
          </p>
          <p>
            I&rsquo;ll be honest about the hard part, because it&rsquo;s the interesting part: we
            did <strong>not</strong> hit a 100% match between the design system and Fy_UI.
            Translating design intent into production components surfaced real gaps — the places
            where a token, a spacing rule, or a state didn&rsquo;t map cleanly to what the
            front-end could do. Naming those gaps, rather than pretending they didn&rsquo;t exist,
            is what made the next round of refinement honest and useful.
          </p>
          <p>
            This is also where I stopped being only the person who defines the system and became
            the person who ships it. Using <strong>Claude as an AI pair</strong>, I delivered{" "}
            <strong>Wealth View end to end in the front-end myself</strong> — design through to
            working interface. Doing that closed the loop on everything FDSG was arguing for: I
            felt exactly where design intent meets implementation reality, and I could bring that
            back into the system instead of guessing at it from the Figma side.
          </p>

          <Callout label="See it running">
            The <Link href="/lab/order-ticket/">order ticket in the Lab</Link> is the same argument
            in miniature — a component designed and built in one pass, in the browser, by one
            person.
          </Callout>

          <Figure>
            Wealth View — the screen designed and shipped in front-end, and the Fy_UI coded library
            beside it.
          </Figure>

          <h2>The ownership model</h2>
          <p>The deeper change FDSG enabled wasn&rsquo;t visual — it was organizational.</p>
          <p>
            When I arrived, FYERS ran design like a relay in a waterfall:{" "}
            <strong>UX and UI were separate roles.</strong> A requirement would come in, a UX
            designer would pick it up, hand it to a UI designer for finesse, and only then would
            it go to front-end for dev handoff. Every handoff was a chance to lose intent.
          </p>
          <p>
            Because I work end to end — and, luckily, a couple of my teammates do too — I pushed
            to collapse that split and champion <strong>&ldquo;Product Designer&rdquo; as the
            role</strong>, one person carrying a problem from UX through UI to shipped screen. My
            own path mirrored the shift: I joined as a <strong>UX Manager</strong> and
            transitioned to <strong>Product Design Manager</strong> as the model took hold.
            End-to-end designers also meant FDSG 2.1 was adopted quickly, because the people using
            the system were the same people who understood it top to bottom.
          </p>
          <p>
            I&rsquo;ve written the fuller argument for that change in{" "}
            <Link href="/writing/ux-to-ui-ownership/">One designer, whole problem</Link>.
          </p>

          <h2>The outcome</h2>
          <Outcomes
            items={[
              {
                value: "~30%",
                tone: "up",
                detail:
                  "less design effort — measured concretely, on the same class of live projects delivered with FDSG versus without.",
              },
              {
                value: "1",
                tone: "sig",
                detail:
                  "source of truth for the entire design team, replacing the scattered guides that started this.",
              },
              {
                value: "2.0 → 2.1",
                detail:
                  "a cleaner, more compact visual language, now carried consistently across web and mobile.",
              },
              {
                value: "Fy_UI",
                detail:
                  "a coded library giving engineering a shared vocabulary — and an honest, ongoing effort to close the design-to-code gap.",
              },
              {
                value: "UX/UI → PD",
                detail:
                  "an org shift from a split relay to end-to-end product designers, with faster adoption and less lost intent as the direct result.",
              },
            ]}
          />

          <Figure>
            A simple consistency or velocity chart — the effort reduction, shown rather than
            asserted.
          </Figure>

          <p>
            The components were the easy part. What made FDSG hold was the governance behind it
            and the people it changed — which is the part I&rsquo;d argue about in any room.
          </p>
        </article>

        <NextCards
          cards={[
            {
              href: "/work/options-scalper/",
              tag: "Case study · Execution",
              title: "Options Scalper Terminal",
              blurb:
                "Designing for the hardest user in the building — density, speed, and error prevention at the moment the stakes are highest.",
              cta: "Read the case study",
            },
            {
              href: "/writing/scaling-design-system/",
              tag: "Essay · Design systems",
              title: "What I learned scaling a design system",
              blurb:
                "The case study is what happened. This is what it taught me — governance, the design-to-code gap, and measuring the promise you made.",
              cta: "Read the essay",
            },
          ]}
        />
      </div>
    </ReadingPage>
  );
}
