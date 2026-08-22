import type { ReactNode } from "react";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { Entrance, EntranceItem } from "@/components/motion/Entrance";
import { ScrollProgress } from "@/components/motion/ScrollProgress";
import "@/styles/reading.css";

/**
 * Shell for a case study or essay.
 *
 * These pages were five near-identical HTML files: the same masthead, the same
 * at-a-glance panel, the same next/prev grid, copy-pasted and then drifted.
 * They are one component now, and only the content differs.
 */
export function ReadingPage({ children }: { children: ReactNode }) {
  return (
    <>
      <ScrollProgress />
      {children}
    </>
  );
}

export function Masthead({
  kicker,
  title,
  standfirst,
  byline,
}: {
  kicker: string;
  title: string;
  standfirst: string;
  byline: string[];
}) {
  return (
    <header className="masthead">
      {/*
        Runs on mount rather than on scroll. The masthead is the first thing on
        the page, so a whileInView reveal would resolve the instant it mounted
        and read as a flicker instead of an entrance — the same reason the home
        hero animates this way.
      */}
      <Entrance className="wrap">
        <EntranceItem as="span" className="kicker">
          {kicker}
        </EntranceItem>
        <EntranceItem as="h1">{title}</EntranceItem>
        <EntranceItem as="p" className="standfirst">
          {standfirst}
        </EntranceItem>
        <EntranceItem className="byline">
          {byline.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </EntranceItem>
      </Entrance>
    </header>
  );
}

/** The instrument-readout device, reused from the hero's spec panel. */
export function Glance({
  status,
  rows,
}: {
  status: string;
  rows: { term: string; value: ReactNode }[];
}) {
  return (
    <Reveal as="section" className="glance">
      <div className="sh">
        <span className="t">At a glance</span>
        <span className="live">
          <span className="pip" />
          {status}
        </span>
      </div>
      <dl>
        {rows.map((row) => (
          <div key={row.term} style={{ display: "contents" }}>
            <dt>{row.term}</dt>
            <dd>{row.value}</dd>
          </div>
        ))}
      </dl>
    </Reveal>
  );
}

/**
 * Placeholder for a visual that still needs producing. Deliberately explicit
 * rather than a grey box, so it is obvious in review that the slot is unfilled
 * and what belongs in it.
 */
export function Figure({ children }: { children: ReactNode }) {
  return (
    <Reveal as="figure" className="fig">
      <div className="slot">
        <span className="k">Visual to add</span>
        <p className="w">{children}</p>
      </div>
    </Reveal>
  );
}

export function PullQuote({ children }: { children: ReactNode }) {
  return (
    <Reveal className="pull">
      <p>{children}</p>
    </Reveal>
  );
}

export function Callout({ label, children }: { label: string; children: ReactNode }) {
  return (
    <Reveal className="callout">
      <span className="eyebrow">{label}</span>
      <p>{children}</p>
    </Reveal>
  );
}

export function Outcomes({
  items,
}: {
  items: { value: string; tone?: "up" | "sig"; detail: string }[];
}) {
  return (
    <Reveal className="outcomes">
      {items.map((item) => (
        <div key={item.detail} className="o">
          <span className={`v ${item.tone ?? ""}`}>{item.value}</span>
          <span className="d">{item.detail}</span>
        </div>
      ))}
    </Reveal>
  );
}

export function Pipeline({
  steps,
}: {
  steps: { stage: string; actor: string; detail: string }[];
}) {
  return (
    <Reveal className="pipeline">
      {steps.map((step, i) => (
        <div key={step.stage} style={{ display: "contents" }}>
          {i > 0 && (
            <div className="arrow" aria-hidden="true">
              →
            </div>
          )}
          <div className="step">
            <span className="s">{step.stage}</span>
            <div className="n">{step.actor}</div>
            <p className="w">{step.detail}</p>
          </div>
        </div>
      ))}
    </Reveal>
  );
}

export function NextCards({
  cards,
}: {
  cards: { href: string; tag: string; title: string; blurb: string; cta: string }[];
}) {
  return (
    <section className="next">
      <span className="eyebrow lbl">Keep reading</span>
      <div className="next-grid">
        {cards.map((card) => (
          <Link key={card.href} className="ncard" href={card.href}>
            <span className="tag">{card.tag}</span>
            <h3>{card.title}</h3>
            <p>{card.blurb}</p>
            <span className="go">{card.cta}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
