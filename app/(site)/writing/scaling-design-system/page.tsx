import type { Metadata } from "next";
import Link from "next/link";
import { Callout, Masthead, NextCards, PullQuote, ReadingPage } from "@/components/reading/Reading";

export const metadata: Metadata = {
  title: "What I learned scaling a design system",
  description:
    "The case study is what happened. This is what it taught me — governance, the design-to-code gap, adoption, and measuring the promise you actually made.",
  openGraph: {
    title: "What I learned scaling a design system across a fintech platform",
    description:
      "A system isn't a folder of components — it's an organizational agreement. On governance, the design-to-code gap, and measuring the promise you made.",
    type: "article",
  },
};

export default function ScalingDesignSystemPage() {
  return (
    <ReadingPage>
      <Masthead
        kicker="Essay · Design systems"
        title="What I learned scaling a design system"
        standfirst="The case study is what happened. This is what it taught me — and almost none of it is about components."
        byline={["Sujith Kumar Anand", "~5 min read"]}
      />

      <div className="wrap">
        <article className="read">
          <p className="lede">
            Most design systems don&rsquo;t fail because the components are bad. They fail because
            a design system isn&rsquo;t really a component problem — it&rsquo;s an organizational
            one.
          </p>

          <p>
            I learned that scaling one across a fintech platform with many product verticals, where
            the real work turned out to be everything <em>around</em> the Figma library.
            Here&rsquo;s what stuck.
          </p>

          <h2>A system is a decision about how you work, not a folder of components</h2>
          <p>
            Before we had one system, we had several half-finished ones — scattered guides that
            each team had grown on its own. The instinct, when that happens, is to build a better
            folder: more components, tidier files. That instinct is wrong. The scattered guides
            weren&rsquo;t a file problem; they were a symptom of teams making the same decisions
            independently, over and over.
          </p>
          <p>
            The fix wasn&rsquo;t a bigger library. It was a single source of truth with a
            governance model behind it — a Design Review Board where patterns get proposed,
            critiqued, and ratified before they spread.
          </p>

          <PullQuote>The library is just the artifact. The agreement is the system.</PullQuote>

          <h2>The design–engineering gap is real, and pretending it isn&rsquo;t makes it worse</h2>
          <p>
            When our engineering team built the system into a coded component library, we did not
            get a 100% match between the design and the code. For a while that&rsquo;s
            uncomfortable to admit — it feels like a failure of the system. It isn&rsquo;t. The gap
            between &ldquo;designed&rdquo; and &ldquo;built&rdquo; is structural: tokens, states,
            and spacing rules don&rsquo;t always map cleanly onto what the front-end can do.
          </p>
          <p>
            What matters is whether you <em>name</em> the gap or hide it. Naming it — being
            specific about which component, which state, which token diverged — turns a vague sense
            of &ldquo;the system isn&rsquo;t working&rdquo; into a punch list. The teams that
            pretend the gap doesn&rsquo;t exist are the ones whose systems quietly rot.
          </p>

          <h2>Adoption is a people problem, and end-to-end owners solve it</h2>
          <p>
            A system nobody adopts is a very expensive PDF. The thing that actually drove adoption
            for us wasn&rsquo;t a mandate — it was who was doing the work. When the people using
            the system are the same people who understand it end to end, from UX through UI to the
            front-end, adoption stops being something you enforce and becomes something people{" "}
            <em>want</em>, because the system makes their own job faster.
          </p>
          <p>
            That&rsquo;s the quiet argument for{" "}
            <Link href="/writing/ux-to-ui-ownership/">collapsing the old UX/UI split</Link> into a
            single product-design role: end-to-end owners don&rsquo;t just use a system, they trust
            it, because they can see the whole path it&rsquo;s serving.
          </p>

          <h2>Measure the thing you promised</h2>
          <p>
            We claimed the system reduced design effort by around 30% — and the only reason that
            number means anything is that we measured it against reality: the same kind of live
            project, delivered with the system versus without.
          </p>
          <p>
            A design system&rsquo;s value is easy to assert and hard to prove, so pick the promise
            you&rsquo;re making — speed, consistency, fewer handoffs — and measure <em>that</em>, on
            real work, not in the abstract.
          </p>

          <h2>What I&rsquo;d do differently</h2>
          <p>
            Start the governance model earlier — before the library grows, not after. We built a
            lot of the agreement while the artifact was already spreading, which meant some of the
            early work was retrofitting consensus onto decisions that had already escaped. The
            agreement should precede the artifact rather than chase it.
          </p>

          <Callout label="The short version">
            Treat a design system as an operating standard and an organizational agreement, close
            the design-to-code gap out loud instead of quietly, put end-to-end owners at the
            centre, and measure the promise you actually made. The components are the easy part.
          </Callout>
        </article>

        <NextCards
          cards={[
            {
              href: "/work/fdsg/",
              tag: "Case study · Strategy",
              title: "FDSG — one design language for FYERS",
              blurb:
                "The system this essay is drawn from: what happened, version by version, and what it cost.",
              cta: "Read the case study",
            },
            {
              href: "/writing/design-frontend-ai/",
              tag: "Essay · Design + AI",
              title: "The handoff is dead",
              blurb:
                "Closing the design-to-code gap from the other side — by shipping the front-end myself.",
              cta: "Read the essay",
            },
          ]}
        />
      </div>
    </ReadingPage>
  );
}
