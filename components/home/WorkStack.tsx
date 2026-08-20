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
 * Depth comes from parallax. While a panel is pinned its own box cannot move —
 * it has to stay flush to the viewport edges, and shrinking it would expose the
 * page behind it at the corners. So the movement happens *between the layers
 * inside it*, each running at its own rate against the same scroll:
 *
 *   ground    -5% →  +5%   drifts down, slowest, furthest away
 *   caption     0  →  -40px
 *   copy      +28  →  -52px   rises through the frame, fastest
 *     └ heading  extra -18px   (leads the block)
 *     └ metrics  extra +14px   (trails it)
 *
 * The two extra rates inside the copy are what stop it reading as one slab
 * sliding: the heading pulls away from the numbers as you scroll, which is the
 * whole illusion. Opacity fades the screen out only in the last 45%, so nothing
 * dims while it is still being read.
 */
function StackPanel({ panel, index }: { panel: PanelSpec; index: number }) {
  const track = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  /*
    Two ranges over the same track, because the panel has two distinct phases
    and one progress value cannot describe both.

    `pinned` ends where the track's bottom edge reaches the viewport's bottom
    edge — which is exactly the moment sticky lets go. That is a third of the
    track, not all of it: the track is 150vh and the panel is a viewport tall,
    so the panel holds still for 50vh and then scrolls away for the remaining
    100vh. Mapping the parallax across the whole track (the obvious thing, and
    what this did at first) spent two thirds of the movement on a panel that
    was already leaving, so almost none of it was visible while the screen was
    being read.
  */
  const { scrollYProgress: pinned } = useScroll({
    target: track,
    offset: ["start start", "end end"],
  });

  // The full pass, still the right range for the fade — the screen should keep
  // dimming as it slides away, not finish the moment it unpins.
  const { scrollYProgress: whole } = useScroll({
    target: track,
    offset: ["start start", "end start"],
  });

  // Percentages, not pixels: the ground is sized relative to the panel, so a
  // proportional drift covers a phone and a 27" display with one number.
  const groundY = useTransform(pinned, [0, 1], ["-5%", "5%"]);
  const groundScale = useTransform(pinned, [0, 1], [1, 1.06]);

  const captionY = useTransform(pinned, [0, 1], [0, -40]);

  const copyY = useTransform(pinned, [0, 1], [28, -52]);
  const headY = useTransform(pinned, [0, 1], [0, -18]);
  const rowY = useTransform(pinned, [0, 1], [0, 14]);

  // Hold at full presence while the screen is being read, then recede.
  const opacity = useTransform(whole, [0, 0.55, 1], [1, 1, 0.45]);

  return (
    <div className={styles.track} ref={track}>
      <motion.article
        className={styles.panel}
        id={panel.id}
        /* Marks this as a dark surface so the global focus ring switches to
           the lighter accent — the paper-tuned blue is ~2.2:1 on this ground. */
        data-dark
        style={{ zIndex: index + 1, ...(reduced ? {} : { opacity }) }}
      >
        {/*
          The furthest plane. It carries the artwork when there is any and the
          stripe texture when there is not, so there is exactly one thing to
          move rather than two layers that have to be kept in step.

          A background layer rather than an <img>: it is decoration, so it stays
          out of the accessibility tree, and a missing file degrades to the
          stripes instead of a broken-image box across the panel.
        */}
        <motion.div
          className={styles.ground}
          style={reduced ? undefined : { y: groundY, scale: groundScale }}
        >
          {/*
            The artwork rides on top of the stripes rather than replacing them,
            so a capture that has not been shot yet — or a path that is wrong —
            leaves the panel looking exactly as it does today instead of flat
            black. Both layers share the ground's single transform.
          */}
          {panel.cover && (
            <div
              className={styles.art}
              style={{
                backgroundImage: `url(${panel.cover.src})`,
                backgroundPosition: panel.cover.position ?? "center",
              }}
            />
          )}
        </motion.div>

        {/* Sits above the ground so the scrim reads against artwork, and below
            the copy so it never competes with it. */}
        <div className={`${styles.scrim} ${panel.cover ? styles.scrimCover : ""}`} />

        {panel.caption && (
          <motion.span
            className={styles.caption}
            style={reduced ? undefined : { y: captionY }}
          >
            {panel.caption}
          </motion.span>
        )}

        <motion.div
          className={`wrap ${styles.panelInner}`}
          style={reduced ? undefined : { y: copyY }}
        >
          <Reveal>
            <motion.div style={reduced ? undefined : { y: headY }}>
              <span className={styles.tag}>{panel.tag}</span>
              <h3 className={styles.title}>{panel.title}</h3>
              <p className={styles.lede}>{panel.lede}</p>
            </motion.div>

            <motion.div className={styles.row} style={reduced ? undefined : { y: rowY }}>
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
            </motion.div>
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
