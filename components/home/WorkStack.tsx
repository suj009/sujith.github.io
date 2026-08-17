"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Reveal } from "@/components/motion/Reveal";
import styles from "./WorkStack.module.css";

type Panel = {
  id: string;
  tag: string;
  title: string;
  lede: string;
  metrics: { value: string; label: string; up?: boolean }[];
  href: string;
  caption: string;
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
    caption: "FDSG — full-bleed capture, to add",
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
        className={styles.panel}
        id={panel.id}
        style={{ ...depth, zIndex: index + 1 }}
      >
        <span className={styles.caption}>{panel.caption}</span>

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

export function WorkStack() {
  return (
    <>
      <div className={styles.topbar}>
        <div className={styles.topbarInner}>
          <span className={styles.n}>01</span>
          <h2 className={styles.h2}>Work</h2>
          <span className={styles.sub}>Eleven years · fintech software</span>
        </div>
      </div>

      <div>
        {PANELS.map((panel, index) => (
          <StackPanel key={panel.id} panel={panel} index={index} />
        ))}
      </div>
    </>
  );
}
