"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { Reveal } from "@/components/motion/Reveal";
import { IC_PANELS, type PanelSpec } from "./work-data";
import { DirectedIndex } from "./DirectedIndex";
import styles from "./WorkStack.module.css";

/**
 * One project screen, pinned while its (taller than viewport) track scrolls.
 *
 * The pinning is position:sticky — nothing in JS pins as cheaply, and the
 * browser keeps it on the compositor. What sticky cannot express on its own is
 * depth: without help the outgoing screen sits at full contrast right until the
 * next one covers it, and the change reads as one flat card replacing another.
 *
 * So the outgoing screen dims and its content drifts upward as the next climbs
 * over it. It deliberately does *not* scale: shrinking a full-bleed panel pulls
 * its edges away from the viewport and exposes the page behind it at the
 * corners, which is what made the earlier version look wrong. Dimming plus a
 * little parallax reads as depth while the panel stays edge to edge.
 */
function StackPanel({ panel, index }: { panel: PanelSpec; index: number }) {
  const track = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: track,
    // From the track's top meeting the viewport top, to its bottom doing the
    // same — i.e. exactly the span over which this panel is pinned.
    offset: ["start start", "end start"],
  });

  // Hold at full presence while the screen is being read, then recede.
  const opacity = useTransform(scrollYProgress, [0, 0.55, 1], [1, 1, 0.45]);
  const shift = useTransform(scrollYProgress, [0, 0.55, 1], [0, 0, -56]);

  return (
    <div className={styles.track} ref={track}>
      <motion.article
        className={`${styles.panel} ${panel.cover ? styles.hasCover : ""}`}
        id={panel.id}
        /* Marks this as a dark surface so the global focus ring switches to
           the lighter accent — the paper-tuned blue is ~2.2:1 on this ground. */
        data-dark
        style={{ zIndex: index + 1, ...(reduced ? {} : { opacity }) }}
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

        {/* Only the content parallaxes, never the panel box — the box has to
            stay flush to the viewport edges. */}
        <motion.div
          className={`wrap ${styles.panelInner}`}
          style={reduced ? undefined : { y: shift }}
        >
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

              {/* No case study yet, so the panel states its access rather than
                  offering a link that goes nowhere. */}
              <span className={styles.access}>Not shown publicly</span>
            </div>
          </Reveal>
        </motion.div>
      </motion.article>
    </div>
  );
}

/**
 * Hides the site nav while the pinned screens own the viewport.
 *
 * Only the nav moves. The screens and their topbar are pinned at the top
 * permanently, sitting under the bar, which covers them until it slides away.
 * Animating their sticky offsets instead would mean writing `top` and `height`
 * on every scroll frame — layout on the main thread; a transform on one element
 * composites.
 *
 * Scoped to the screens alone, not the whole Work section: Directed now leads
 * the section and is a long read, and there is no reason to withhold navigation
 * through it.
 *
 * The value is published as a CSS variable rather than passed down, because the
 * nav lives in the layout and this lives on the page — there is no props path
 * between them, and a context would re-render the nav on every frame.
 */
function useImmersiveScreens(target: React.RefObject<HTMLDivElement | null>) {
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
  const screens = useRef<HTMLDivElement>(null);
  useImmersiveScreens(screens);

  return (
    <>
      {/* Directed leads: the scope of what was run, before the detail of what
          was made by hand. It carries the section's own "01 — Work" eyebrow,
          so there is no separate head on paper above it — Work runs as one
          unbroken dark stretch from the hero down to the Lab. */}
      <DirectedIndex />

      <div ref={screens}>
        <div className={styles.topbar}>
          <div className={styles.topbarInner}>
            <span className={styles.topbarN}>Hands-on</span>
            <h3 className={styles.topbarTitle}>What I made myself</h3>
            <span className={styles.topbarSub}>{IC_PANELS.length} projects</span>
          </div>
        </div>

        {IC_PANELS.map((panel, index) => (
          <StackPanel key={panel.id} panel={panel} index={index} />
        ))}
      </div>
    </>
  );
}
