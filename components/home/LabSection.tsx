"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { OrderTicket } from "@/components/lab/OrderTicket";
import { Reveal } from "@/components/motion/Reveal";
import { SPRING } from "@/components/motion/tokens";
import styles from "./LabSection.module.css";

export function LabSection() {
  const reduced = useReducedMotion();

  return (
    <>
      {/*
        The demo used to be loaded in an <iframe> with a hard-coded pixel
        height that had to be re-measured by hand whenever its contents changed
        (and was clipping the hold-to-confirm button at one point). Now that it
        is a component it lays out with the page, so there is no height to
        guess, no second document to style, and no separate copy of the fonts
        to download.
      */}
      <Reveal className={styles.frame}>
        <div className={styles.bar}>
          <span className={styles.dot} />
          <span className={styles.dot} />
          <span className={styles.dot} />
          <span className={styles.label}>order-ticket · live component</span>
        </div>
        <div className={styles.stage}>
          <OrderTicket />
        </div>
      </Reveal>

      <Reveal className={styles.note} delay={0.05}>
        <p>
          A real-time order ticket — density, speed, live state, and hold-to-confirm error
          prevention. The same ideas as the Options Scalper story, built and running in your
          browser. <em>(Simulated data; nothing confidential.)</em>
        </p>
        <motion.span
          {...(reduced ? {} : { whileHover: { y: -2 }, whileTap: { scale: 0.97 }, transition: SPRING })}
        >
          <Link className={styles.open} href="/lab/order-ticket/">
            Open full component ↗
          </Link>
        </motion.span>
      </Reveal>

      {/*
        One card, not a 3-up grid. On the section that argues "I still ship",
        three unfulfilled promises sitting next to one working thing worked
        against its own point.
      */}
      <Reveal className={styles.next} delay={0.1}>
        <span className={styles.nextLabel}>Next in Lab</span>
        <h4 className={styles.nextTitle}>Figma → front-end, with AI</h4>
        <p className={styles.nextBody}>
          A teardown of the workflow I used to ship Wealth View end to end — one screen, from
          design file to working code.
        </p>
      </Reveal>
    </>
  );
}
