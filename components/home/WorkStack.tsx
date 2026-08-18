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
import { DIRECTED_PANELS, IC_PANELS, type PanelSpec } from "./work-data";
import { DirectedIndex } from "./DirectedIndex";
import styles from "./WorkStack.module.css";

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
function StackPanel({
  panel,
  index,
  short,
}: {
  panel: PanelSpec;
  index: number;
  short?: boolean;
}) {
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
    <div className={`${styles.track} ${short ? styles.trackShort : ""}`} ref={track}>
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

              {panel.href ? (
                <motion.span whileHover={{ x: 3 }} whileTap={{ scale: 0.97 }}>
                  <Link className={styles.cta} href={panel.href}>
                    Read the case study →
                  </Link>
                </motion.span>
              ) : (
                /* No case study yet, so the panel states its access rather
                   than offering a link that goes nowhere. */
                <span className={styles.access}>Not shown publicly</span>
              )}
            </div>
          </Reveal>
        </div>
      </motion.article>
    </div>
  );
}

/**
 * Hides the site nav while Work owns the screen, so it runs edge to edge from
 * the very top.
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

  const { scrollYProgress: arriving } = useScroll({
    target,
    offset: ["start end", "start start"],
  });
  const { scrollYProgress: leaving } = useScroll({
    target,
    offset: ["end end", "end start"],
  });

  const hideIn = useTransform(arriving, [0.86, 1], [0, 1], { clamp: true });
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
  const section = useRef<HTMLDivElement>(null);
  useImmersiveWork(section);

  return (
    <div ref={section}>
      <div className={styles.topbar}>
        <div className={styles.topbarInner}>
          <span className={styles.n}>01</span>
          <h2 className={styles.h2}>Work</h2>
          <span className={styles.sub}>Eleven years · fintech software</span>
        </div>
      </div>

      {/* Directed leads: the scope of what was run, before the detail of what
          was made by hand. */}
      {DIRECTED_PANELS.map((panel, index) => (
        <StackPanel key={panel.id} panel={panel} index={index} />
      ))}

      <DirectedIndex />

      {/*
        Hands-on gets the same full-bleed treatment rather than a card grid —
        it is the work that answers "what did you personally make?" and should
        not read as a footnote to what was supervised. Shorter tracks, though:
        six panels at the case studies' dwell time would make Work a marathon.
      */}
      {IC_PANELS.map((panel, index) => (
        <StackPanel key={panel.id} panel={panel} index={index} short />
      ))}
    </div>
  );
}
