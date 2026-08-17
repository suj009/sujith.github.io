import type { Metadata } from "next";
import Link from "next/link";
import { Callout, Masthead, NextCards, PullQuote, ReadingPage } from "@/components/reading/Reading";

export const metadata: Metadata = {
  title: "The handoff is dead",
  description:
    "Design used to end at a handoff. Working with Claude as an AI pair, I designed Wealth View and shipped its front-end myself. The workflow, what it means for design teams, and the honest limits.",
  openGraph: {
    title: "The handoff is dead. I designed and shipped the front-end myself — with AI.",
    description:
      "AI collapsed the translation step between designing something and building it. What that changes about what a designer is.",
    type: "article",
  },
};

export default function DesignFrontendAiPage() {
  return (
    <ReadingPage>
      <Masthead
        kicker="Essay · Design + AI"
        title="The handoff is dead"
        standfirst="I designed a product and then shipped the front-end myself, working with AI as a pair. It changed how I think about what a designer is."
        byline={["Sujith Kumar Anand", "~6 min read"]}
      />

      <div className="wrap">
        <article className="read">
          <p className="lede">
            For most of my career, design ended at a line. You did the thinking, built the screens,
            wrote the spec — and then you handed it across a wall to engineering and hoped what
            came back resembled what you drew.
          </p>

          <p>
            At FYERS, that wall used to be inside the design team itself. We ran a relay: a UX
            designer picked up a requirement, handed it to a UI designer for finesse, who handed it
            to front-end for the build. Three handoffs, three chances to lose intent. And even
            after we unified those roles and built{" "}
            <Link href="/work/fdsg/">a real design system</Link>, the wall didn&rsquo;t fully
            disappear — when our engineering team turned the design system into a coded component
            library, we couldn&rsquo;t get a 100% match between the design and the code. Not
            because anyone did poor work, but because the gap between &ldquo;designed&rdquo; and
            &ldquo;built&rdquo; is real, and it has always needed a translator.
          </p>

          <p>
            I recently stopped waiting for the translator. I designed a product called{" "}
            <strong>Wealth View</strong> — one consolidated view of everything an investor holds,
            with performance over time — and then shipped it. The actual front-end, myself, working
            with Claude as an AI pair. <strong>Nine working days</strong>, start to finish.
          </p>

          <p>That changed how I think about what a designer is.</p>

          <h2>What actually changed</h2>
          <p>
            The old constraint was never imagination — it was translation. I could always picture
            the interaction; I couldn&rsquo;t always produce the production code, and the moment my
            design left my hands, some of the intent leaked out. AI collapses that translation
            step. The thing I designed and the thing that ships can now be the same thing, made by
            the same person, because the hardest part of writing front-end — the syntax, the
            boilerplate, the &ldquo;how do I do this in my stack&rdquo; — is exactly what an AI
            pair is good at.
          </p>

          <PullQuote>
            The question stops being &ldquo;can a designer code?&rdquo; and becomes &ldquo;does the
            designer understand the system well enough to direct the build?&rdquo;
          </PullQuote>

          <p>
            That&rsquo;s a judgment problem, not a syntax problem — and judgment is what senior
            designers already have.
          </p>

          <h2>My workflow</h2>
          <p>Here&rsquo;s how I work with Claude to go from design to shipped front-end.</p>
          <ul>
            <li>
              <strong>Start from the system, not a blank page.</strong> I anchor the AI in the
              design system first — the tokens, spacing, and component rules from FDSG — so
              everything it generates speaks the same language as the rest of the product. The
              system is the constraint that keeps AI output from drifting.
            </li>
            <li>
              <strong>Work in components, then compose.</strong> I build the smallest pieces first
              and get each one right — an order row, a price cell, a button state — then assemble
              screens from parts I trust, rather than asking for a whole page in one shot.
            </li>
            <li>
              <strong>Describe intent, not just appearance.</strong> I tell the AI what an
              interaction is <em>for</em> — &ldquo;this confirms an order, so it must be impossible
              to trigger by accident&rdquo; — not just how it should look. Intent is where design
              judgment lives, and it&rsquo;s what keeps the behaviour faithful, not just the
              pixels.
            </li>
            <li>
              <strong>Stay in the loop on the hard parts.</strong> I let the AI carry the
              boilerplate and syntax, and I step in by hand on the things that need taste and
              judgment: timing, spacing, edge cases, and the states most people forget.
            </li>
            <li>
              <strong>Review like a designer, test like an engineer.</strong> Every pass gets
              checked against the design intent <em>and</em> run in the browser — real states, real
              edge cases — before it&rsquo;s anywhere near done.
            </li>
          </ul>

          <Callout label="The output, not the description">
            The <Link href="/lab/order-ticket/">order ticket in the Lab</Link> was built this way:
            system first, components before screens, intent described rather than just appearance.
            It runs in your browser — poke at it.
          </Callout>

          <h2>What it means for design teams</h2>
          <p>
            If one person can carry a problem from user need to shipped screen, the org chart
            should stop pretending those are separate jobs. This is the same conviction that led me
            to push for{" "}
            <Link href="/writing/ux-to-ui-ownership/">&ldquo;Product Designer&rdquo; as a role</Link>{" "}
            at FYERS instead of a split between UX and UI: fewer handoffs, less lost intent, more
            ownership. AI extends that logic one step further — the handoff to front-end becomes
            one more seam a single owner can close.
          </p>
          <p>
            I don&rsquo;t think this makes engineers redundant; it makes the boundary negotiable.
            The interesting work — architecture, performance, the genuinely hard systems problems —
            still belongs to engineering. But the long tail of &ldquo;design it, then wait weeks to
            see it built roughly right&rdquo; is going away, and designers who can direct an AI to
            build their own work will move faster and lose less of themselves in translation.
          </p>

          <h2>The honest limits</h2>
          <p>I want to be clear-eyed, because the hype around this is loud.</p>
          <ul>
            <li>
              <strong>AI doesn&rsquo;t replace understanding.</strong> It amplified me because I
              already knew the system, the interaction, and what &ldquo;correct&rdquo; looked like.
              I asked for a confirmation step on an order action once and got a textbook modal
              dialog: clean, accessible, correctly built, and completely wrong. A modal is what you
              use when you want someone to stop and think. This was a screen for people who trade
              in seconds — the confirmation had to live under the thumb that was already moving.
              That&rsquo;s how the hold-to-confirm ended up in the{" "}
              <Link href="/lab/order-ticket/">Lab piece</Link>. The AI answered the question I
              typed; it couldn&rsquo;t know the question I meant. Point it at a problem you
              don&rsquo;t understand and it will confidently build the wrong thing — cleanly,
              convincingly, and wrong.
            </li>
            <li>
              <strong>The last mile is still craft.</strong> The output got me most of the way, but
              the finish — the timing of a transition, the states nobody remembers, accessibility,
              the pixel-level fidelity to the design — is where I spent my own hands. AI closes the
              distance; taste closes the gap.
            </li>
            <li>
              <strong>It&rsquo;s a pair, not a pilot.</strong> The quality of what comes out still
              tracks the quality of the direction going in.
            </li>
          </ul>

          <p>
            Design has spent years arguing about whether designers should code. I think AI quietly
            ended the argument — not by making everyone an engineer, but by making the wall between
            designing something and shipping it low enough to step over. I stepped over it with
            Wealth View. I don&rsquo;t plan to step back.
          </p>
        </article>

        <NextCards
          cards={[
            {
              href: "/writing/ux-to-ui-ownership/",
              tag: "Essay · Team & craft",
              title: "One designer, whole problem",
              blurb: "Why I killed the UX/UI split — and the objections, answered.",
              cta: "Read the essay",
            },
            {
              href: "/work/fdsg/",
              tag: "Case study · Strategy",
              title: "FDSG — one design language for FYERS",
              blurb:
                "The design system this workflow is anchored in, and the org change that made it stick.",
              cta: "Read the case study",
            },
          ]}
        />
      </div>
    </ReadingPage>
  );
}
