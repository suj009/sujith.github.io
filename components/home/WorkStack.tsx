"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { Reveal } from "@/components/motion/Reveal";
import styles from "./WorkStack.module.css";

type Panel = {
  id: string;
  tag: string;
  title: string;
  lede: string;
  metrics: { value: string; label: string; up?: boolean }[];
  href: string;
  /** Full-bleed artwork behind the panel. Falls back to the stripe treatment. */
  cover?: { src: string; position?: string };
  /** Placeholder note, shown only while `cover` is still missing. */
  caption?: string;
};

const PANELS: Panel[] = [
  {
    id: "case-fdsg",
    tag: "01 — Strategy & Leadership · Design systems",
    title: "FDSG",
    lede: "Several scattered style guides became one versioned language — then I changed how the team worked, so it would hold.",
    metrics: [
      { value: "~30%", label: "less design effort", up: true },
      { value: "8", label: "designers on it" },
    ],
    href: "/work/fdsg/",
    /*
      Centred rather than anchored to an edge: the artwork's left quarter is
      already near-empty, which is exactly where the heading and metrics sit,
      and its subject sits centre-right. On a phone, where the panel crops to a
      narrow vertical strip, centring keeps the layered stack in frame instead
      of a bare corner.
    */
    cover: { src: "/img/fdsg-cover.webp", position: "center" },
  },
  {
    id: "case-options-scalper",
    tag: "02 — Real-time trading · Design lead · Q2 2024",
    title: "Options Scalper Terminal",
    lede: "Traders wanted every number on screen. Every number on screen is what kills a trade at speed.",
    metrics: [
      { value: "↑ orders", label: "volume + session time", up: true },
      { value: "3 mo", label: "concept to live" },
    ],
    href: "/work/options-scalper/",
    caption: "Scalper Terminal — full-bleed capture, to add",
  },
];

/**
 * One case-study panel, pinned while its (taller than viewport) track scrolls.
 *
 * The pinning itself is still position:sticky. Nothing in JS pins as cheaply,
 * and the browser keeps it on the compositor. What sticky could not express is
 * depth: the outgoing panel used to sit at full size and full contrast right up
 * until the next one covered it, so the transition read as one flat card
 * abruptly replacing another.
 *
 * useScroll reports this track's own progress, and the panel recedes across it
 * — scaling down and dimming — so the incoming panel reads as passing in front
 * of something still there rather than swapping with it.
 */
function StackPanel({ panel, index }: { panel: Panel; index: number }) {
  const track = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: track,
    // From the track's top meeting the viewport top, to its bottom doing the
    // same — i.e. exactly the span over which this panel is pinned.
    offset: ["start start", "end start"],
  });

  // Hold at full presence for the first half (the panel is being read), then
  // recede as the next one arrives.
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0.93]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0.4]);

  const depth = reduced ? undefined : { scale, opacity };

  return (
    <div className={styles.track} ref={track}>
      <motion.article
        className={`${styles.panel} ${panel.cover ? styles.hasCover : ""}`}
        id={panel.id}
        /* Marks this as a dark surface so the global focus ring switches to
           the lighter accent — the paper-tuned blue is ~2.2:1 on this ground. */
        data-dark
        style={{ ...depth, zIndex: index + 1 }}
      >
        {/*
          A background layer rather than an <img>: it is decoration, so it
          should stay out of the accessibility tree, and a missing file
          degrades silently to the stripe treatment instead of leaving a
          broken-image box across the panel.
        */}
        {panel.cover && (
          <div
            className={styles.cover}
            style={{
              backgroundImage: `url(${panel.cover.src})`,
              backgroundPosition: panel.cover.position ?? "center",
            }}
          />
        )}

        {panel.caption && <span className={styles.caption}>{panel.caption}</span>}

        <div className={`wrap ${styles.panelInner}`}>
          <Reveal>
            <span className={styles.tag}>{panel.tag}</span>
            <h3 className={styles.title}>{panel.title}</h3>
            <p className={styles.lede}>{panel.lede}</p>

            <div className={styles.row}>
              {panel.metrics.map((metric) => (
                <div key={metric.label} className={styles.metric}>
                  <div className={`${styles.value} ${metric.up ? styles.up : ""}`}>
                    {metric.value}
                  </div>
                  <div className={styles.label}>{metric.label}</div>
                </div>
              ))}

              <motion.span whileHover={{ x: 3 }} whileTap={{ scale: 0.97 }}>
                <Link className={styles.cta} href={panel.href}>
                  Read the case study →
                </Link>
              </motion.span>
            </div>
          </Reveal>
        </div>
      </motion.article>
    </div>
  );
}

/**
 * Hides the site nav while the pinned panels own the screen, so Work runs
 * edge to edge from the very top.
 *
 * Only the nav actually moves. The Work topbar and the panels are pinned at
 * the top of the viewport permanently, sitting *underneath* the nav — which
 * covers them until it slides away. Animating their sticky offsets instead
 * would mean writing `top` and `height` on every scroll frame, which is layout
 * on the main thread; a transform on one element composites.
 *
 * The value is published as a CSS variable rather than passed down, because
 * the nav lives in the layout and this lives on the page — there is no props
 * path between them, and a context would re-render the nav on every frame.
 */
function useImmersiveWork(target: React.RefObject<HTMLDivElement | null>) {
  const reduced = useReducedMotion();

  // Travel of the stack's top edge from the bottom of the viewport to the top.
  const { scrollYProgress: arriving } = useScroll({
    target,
    offset: ["start end", "start start"],
  });
  // Travel of its bottom edge, for handing the nav back on the way out.
  const { scrollYProgress: leaving } = useScroll({
    target,
    offset: ["end end", "end start"],
  });

  // Hide over the last stretch of the approach, so it reads as a response to
  // arriving at Work rather than something that happens in the hero.
  const hideIn = useTransform(arriving, [0.86, 1], [0, 1], { clamp: true });
  // Give it back before the stack is fully gone, so the nav is already in
  // place by the time the sampler below it is being read.
  const hideOut = useTransform(leaving, [0.5, 0.78], [1, 0], { clamp: true });
  const hidden = useTransform([hideIn, hideOut] as const, ([a, b]: number[]) =>
    Math.min(a, b),
  );

  useMotionValueEvent(hidden, "change", (v) => {
    document.documentElement.style.setProperty("--nav-hide", reduced ? "0" : String(v));
  });

  // The variable is global, so it has to be cleared when leaving the home
  // route — otherwise the nav stays hidden on whatever page comes next.
  useEffect(() => {
    return () => {
      document.documentElement.style.removeProperty("--nav-hide");
    };
  }, []);
}

export function WorkStack() {
  const stack = useRef<HTMLDivElement>(null);
  useImmersiveWork(stack);

  return (
    <div ref={stack}>
      <div className={styles.topbar}>
        <div className={styles.topbarInner}>
          <span className={styles.n}>01</span>
          <h2 className={styles.h2}>Work</h2>
          <span className={styles.sub}>Eleven years · fintech software</span>
        </div>
      </div>

      {PANELS.map((panel, index) => (
        <StackPanel key={panel.id} panel={panel} index={index} />
      ))}
    </div>
  );
}
