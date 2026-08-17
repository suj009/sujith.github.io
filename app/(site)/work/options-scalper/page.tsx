import type { Metadata } from "next";
import Link from "next/link";
import {
  Callout,
  Figure,
  Glance,
  Masthead,
  NextCards,
  Outcomes,
  PullQuote,
  ReadingPage,
} from "@/components/reading/Reading";

export const metadata: Metadata = {
  title: "Designing for the hardest user in the building",
  description:
    "Case study: the Options Scalper Terminal — density, speed, real-time state and error prevention for high-frequency options traders.",
  openGraph: {
    title: "Designing for the hardest user in the building",
    description:
      "The Options Scalper Terminal: density without chaos, speed as a feature, and error prevention at the moment the stakes are highest.",
    type: "article",
  },
};

export default function OptionsScalperPage() {
  return (
    <ReadingPage>
      <Masthead
        kicker="Case study · Execution & impact"
        title="Designing for the hardest user in the building"
        standfirst="Most fintech design makes the complex feel simple. The Options Scalper Terminal was the opposite: the user wants complexity, at speed, with zero margin for error."
        byline={["Real-time trading · Options vertical", "Q2 2024 · ~3 months", "~7 min read"]}
      />

      <div className="wrap">
        <Glance
          status="SHIPPED"
          rows={[
            { term: "role", value: "Design lead & oversight — direction, quality bar, alignment" },
            { term: "product", value: "Real-time terminal for high-frequency options traders" },
            { term: "timeline", value: "Q2 2024 · ~3 months" },
            { term: "system", value: "Built on FDSG" },
            { term: "outcome", value: <span className="g">deeper, stickier engagement</span> },
          ]}
        />

        <article className="read">
          <h2>The problem</h2>
          <p className="lede">
            High-frequency options traders — scalpers — live in seconds. They place many orders,
            react to fast-moving prices, and judge a tool by whether it disappears into muscle
            memory.
          </p>
          <p>
            For them, a slow interaction, a buried action, or an ambiguous state isn&rsquo;t a mild
            annoyance — it&rsquo;s money. The design challenge was to build a terminal dense enough
            to be powerful and clear enough to be safe, at the exact moment the stakes are highest.
          </p>
          <p>
            Get it wrong and you lose your best, most active users. Get it right and you deepen the
            relationship with exactly the traders who matter most to the business.
          </p>

          <Figure>
            The terminal, full view — annotated to show where the density is doing work rather than
            adding noise.
          </Figure>

          <h2>The design challenge</h2>
          <p>Four constraints shaped everything, and each one pulled against another:</p>
          <ul>
            <li>
              <strong>Density without chaos.</strong> Scalpers need prices, positions, order entry,
              and analytics on one screen. We held the layout <em>fixed</em> — every element in a
              constant place so it becomes muscle memory — and pushed deeper analytics behind
              progressive disclosure, so the default view stays scannable instead of drowning the
              trader in everything at once.
            </li>
            <li>
              <strong>Speed as a feature.</strong> We made the primary actions reachable in the
              fewest possible steps — preset lot sizes, a sticky order pad that never scrolls out
              of reach, and fast keyboard paths — so placing an order never competes with reading
              the market.
            </li>
            <li>
              <strong>Real-time state, read at a glance.</strong> Prices move constantly, so we
              communicated change through colour and a light flash on the value that changed,
              rather than redrawing the screen. A persistent P&amp;L strip keeps &ldquo;where do I
              stand right now&rdquo; always visible. The goal: read the whole state in a glance,
              not a scan.
            </li>
            <li>
              <strong>Error prevention at speed.</strong> Speed is where costly mistakes happen, so
              the design has to catch them without slowing anyone down — unambiguous buy/sell
              colour coding, a deliberate confirm step on the order action, and guardrails against
              fat-finger quantities.
            </li>
          </ul>

          <Callout label="The last one, running">
            The <Link href="/lab/order-ticket/">Lab order ticket</Link> makes
            error-prevention-at-speed literal: you press and <em>hold</em> to confirm. Same idea,
            built as a working component you can try.
          </Callout>

          <Figure>
            The core fast-action pattern — one-tap entry, presets, and the keyboard path.
          </Figure>

          <Figure>
            Real-time state treatment: how &ldquo;now&rdquo; is made legible without a redraw.
          </Figure>

          <h2>How I led it</h2>
          <p>
            I didn&rsquo;t design every screen — I set the direction and defended the standard. My
            role was to keep the work honest to two things at once: what these traders actually
            need, and what the business needs from them. That meant running design critiques
            against real trader workflows, setting the interaction principles the team designed to,
            and aligning everything to <Link href="/work/fdsg/">FDSG</Link> so the terminal felt
            like part of the platform, not a bolt-on.
          </p>
          <p>
            The clearest call I made was keeping the default view deliberately uncluttered.
            There&rsquo;s always pressure to surface <em>everything</em> on a power-user screen, but
            I held the principle that the terminal should disappear into muscle memory — so we
            defended progressive disclosure and resisted piling analytics onto the default layout,
            even when it was tempting.
          </p>

          <PullQuote>That restraint is what let the density stay usable at speed.</PullQuote>

          <h2>The outcome</h2>
          <p>
            The proof is in the behaviour of the hardest-to-please users on the platform — they
            leaned in.
          </p>

          <Outcomes
            items={[
              {
                value: "~15%",
                tone: "up",
                detail: "longer sessions — deeper engagement, not just more visits.",
              },
              { value: "~17%", tone: "up", detail: "MAU growth on the terminal over the period." },
              {
                value: "high",
                tone: "sig",
                detail:
                  "daily order volume per user — the signature of a tool people live in rather than visit.",
              },
              {
                value: "at scale",
                detail:
                  "hundreds of thousands of successful orders placed through the terminal to date.",
              },
            ]}
          />

          <p>
            Taken together: the traders who are quickest to abandon a clumsy tool instead spent{" "}
            <em>more</em> time in it and placed <em>more</em> through it. For a trading product,
            that&rsquo;s the engagement signal that matters most.
          </p>

          <Figure>
            A simple engagement chart — session duration or MAU trend across the period.
          </Figure>
        </article>

        <NextCards
          cards={[
            {
              href: "/work/fdsg/",
              tag: "Case study · Strategy",
              title: "FDSG — one design language for FYERS",
              blurb:
                "Scattered style guides into a single versioned source of truth — and the org change that made it stick.",
              cta: "Read the case study",
            },
            {
              href: "/writing/design-frontend-ai/",
              tag: "Essay · Design + AI",
              title: "The handoff is dead",
              blurb:
                "I designed a product and then shipped its front-end myself, with AI as the pair. The workflow, and the honest limits.",
              cta: "Read the essay",
            },
          ]}
        />
      </div>
    </ReadingPage>
  );
}
