"use client";

import { motion, useReducedMotion } from "motion/react";
import { Entrance, EntranceItem } from "@/components/motion/Entrance";
import { EASE } from "@/components/motion/tokens";
import styles from "./Hero.module.css";

const SPEC = [
  { term: "role", value: "Sr Design Manager, FYERS" },
  { term: "exp", value: "11+ yrs" },
  { term: "domains", value: "fintech · Web3 · telecom" },
  { term: "ships", value: "front-end, with AI", good: true },
  { term: "stack", value: "Figma · Flutter · FE · AI" },
  { term: "seeking", value: "Director / Head of Design" },
];

/*
  The entrance was previously six @keyframes rules with hand-tuned
  animation-delays (0.05s → 0.68s) that had to be renumbered by hand whenever
  an element was added or reordered. As variants, the order in the DOM is the
  order of the sequence, and staggerChildren derives the delays.

  The variants themselves live in <Entrance>, shared with the case-study
  mastheads so the two cannot drift apart.
*/
export function Hero() {
  const reduced = useReducedMotion();

  return (
    <header className={styles.hero} id="top">
      <Entrance className={`wrap ${styles.grid}`}>
        <div>
          <EntranceItem as="span" className={`eyebrow ${styles.eyebrow}`}>
            Product Design Leader · Bengaluru
          </EntranceItem>

          <h1 className={styles.headline}>
            <EntranceItem as="span" className={styles.line}>
              A design leader
            </EntranceItem>
            <EntranceItem as="span" className={styles.line}>
              who <span className={styles.sig}>still ships.</span>
            </EntranceItem>
          </h1>

          <EntranceItem as="p" className={styles.lede}>
            I lead the team, deliver as an IC, and turn design into working front-end with AI.{" "}
            <b>Eleven years turning complex fintech into products people trust</b> — across
            trading, DeFi, and HCI research.
          </EntranceItem>
        </div>

        {/* The signature element — it rhymes with the Lab's instrument panel. */}
        <EntranceItem as="aside" className={styles.spec} aria-label="Profile at a glance">
          <div className={styles.specHead}>
            <span className={styles.specTitle}>sujith.spec</span>
            <span className={styles.live}>
              <span className={styles.pip} />
              Open to roles
            </span>
          </div>
          <dl className={styles.specList}>
            {SPEC.map((row) => (
              <div key={row.term} className={styles.specRow}>
                <dt>{row.term}</dt>
                <dd className={row.good ? styles.good : undefined}>{row.value}</dd>
              </div>
            ))}
          </dl>
        </EntranceItem>
      </Entrance>

      <div className={styles.cueWrap}>
        <motion.a
          className={styles.cue}
          href="#work"
          aria-label="Scroll to Work"
          {...(reduced
            ? {}
            : {
                initial: { opacity: 0 },
                animate: { opacity: 1 },
                transition: { delay: 0.75, duration: 0.6, ease: EASE },
              })}
        >
          <span>Scroll</span>
          <svg width="14" height="20" viewBox="0 0 14 20" fill="none" aria-hidden="true">
            <path
              d="M7 1v16M1 11l6 6 6-6"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.a>
      </div>
    </header>
  );
}
