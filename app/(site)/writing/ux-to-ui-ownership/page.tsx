import type { Metadata } from "next";
import Link from "next/link";
import { Masthead, NextCards, PullQuote, ReadingPage } from "@/components/reading/Reading";

export const metadata: Metadata = {
  title: "One designer, whole problem",
  description:
    "Why I killed the UX/UI split — and what happened to the work when one person carried a problem all the way through.",
  openGraph: {
    title: "One designer, whole problem: why I killed the UX/UI split",
    description:
      "Handoffs are where intent dies. The case for one Product Designer owning a problem from user need to shipped screen — and the objections, answered.",
    type: "article",
  },
};

export default function UxToUiOwnershipPage() {
  return (
    <ReadingPage>
      <Masthead
        kicker="Essay · Team & craft"
        title="One designer, whole problem"
        standfirst="Why I killed the UX/UI split — and what happened to the work when one person carried a problem all the way through."
        byline={["Sujith Kumar Anand", "~5 min read"]}
      />

      <div className="wrap">
        <article className="read">
          <p className="lede">
            When I joined FYERS, design ran like a relay race. A requirement came in. A UX designer
            picked it up, worked the structure and flows, then handed it to a UI designer to make
            it look finished, who handed it to front-end for the build.
          </p>

          <p>
            Three roles, three handoffs, and at every handoff a little of the original intent
            quietly leaked out.
          </p>

          <p>
            I&rsquo;ve come to believe that split is a mistake — one the industry inherited and
            never really questioned. So I pushed to end it, and championed a single{" "}
            <strong>Product Designer</strong> role: one person carrying a problem from user need
            all the way to a shipped screen. Here&rsquo;s the argument.
          </p>

          <h2>Handoffs are where intent dies</h2>
          <p>
            Every handoff is a translation, and every translation loses something. The UX designer
            knows <em>why</em> a flow is shaped the way it is — which edge case forced a step,
            which user fear a piece of copy is answering. Most of that context doesn&rsquo;t
            survive the handoff to the person making it &ldquo;look right,&rdquo; who then hands an
            even thinner version to the person building it. By the time it ships, the screen is a
            copy of a copy of the original idea.
          </p>
          <p>
            Collapse the roles and the context stops leaking, because it never leaves the one head
            that holds it.
          </p>

          <h2>The UX/UI divide was never real to the user</h2>
          <p>
            Users don&rsquo;t experience &ldquo;the UX&rdquo; and then &ldquo;the UI.&rdquo; They
            experience one thing. The line we drew between structure and surface is an internal
            convenience, not a truth about the product — and internal conveniences that add
            handoffs are exactly the ones worth deleting.
          </p>

          <PullQuote>
            Good product design is structure and surface decided together, because they constantly
            affect each other.
          </PullQuote>

          <h2>Ownership changes how people work, not just what they title themselves</h2>
          <p>
            When one person owns a problem end to end, something shifts beyond the org chart.
            Accountability gets clearer — there&rsquo;s no &ldquo;well, that was the other
            role&rsquo;s call.&rdquo; The work gets more cohesive, because the same judgment runs
            through structure, surface, and behaviour. And people care more, because it&rsquo;s
            unambiguously theirs.
          </p>
          <p>
            This is also why it pairs so naturally with building. Once you own the problem through
            to UI,{" "}
            <Link href="/writing/design-frontend-ai/">
              owning it through to the shipped front-end
            </Link>{" "}
            — increasingly with AI as leverage — is just one more seam to close, not a new
            discipline to hand off to.
          </p>

          <h2>The objections — and my answers</h2>

          <h3>&ldquo;You lose depth of specialism.&rdquo;</h3>
          <p>
            Some. But the depth you lose at the edges, you more than gain back in coherence and
            speed. And specialists still exist for genuinely deep problems — you just stop making{" "}
            <em>every</em> screen pay the handoff tax.
          </p>

          <h3>&ldquo;Not everyone can do both well.&rdquo;</h3>
          <p>
            True today, less true every year. I was lucky to have teammates who already worked end
            to end, which is exactly why{" "}
            <Link href="/work/fdsg/">our design-system adoption</Link> moved fast. The role pulls
            people toward becoming more complete designers, which is a feature, not a bug.
          </p>

          <h3>&ldquo;It doesn&rsquo;t scale.&rdquo;</h3>
          <p>
            It scales <em>better</em>, in my experience — fewer coordination costs, fewer handoffs
            to manage, clearer ownership as the team grows.
          </p>

          <h2>The relay was serving the org chart</h2>
          <p>
            I joined as a UX Manager and transitioned to a Product Design Manager as this model
            took hold — my own title followed the same logic I was arguing for the team.
          </p>
          <p>
            I&rsquo;m not claiming the split never made sense. I&rsquo;m saying that for most
            product work, one designer owning the whole problem produces better products, made
            faster, with less of the original idea lost along the way. The relay race was never
            serving the user. It was serving the org chart.
          </p>
        </article>

        <NextCards
          cards={[
            {
              href: "/writing/design-frontend-ai/",
              tag: "Essay · Design + AI",
              title: "The handoff is dead",
              blurb:
                "The same argument, one seam further: designing a product and shipping its front-end myself.",
              cta: "Read the essay",
            },
            {
              href: "/writing/scaling-design-system/",
              tag: "Essay · Design systems",
              title: "What I learned scaling a design system",
              blurb:
                "Why end-to-end owners are the thing that actually drives design-system adoption.",
              cta: "Read the essay",
            },
          ]}
        />
      </div>
    </ReadingPage>
  );
}
