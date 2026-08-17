"use client";

import { motion, useScroll, useSpring } from "motion/react";
import styles from "./ScrollProgress.module.css";

/**
 * Reading-progress bar for the long-form pages.
 *
 * Replaces the manual scroll/scrollHeight arithmetic in assets/reading.js.
 * useScroll already reports a 0–1 progress value, and running it through a
 * spring means the bar eases toward the true position instead of snapping to
 * every wheel event — noticeably smoother on trackpads with momentum.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 34,
    restDelta: 0.001,
  });

  return <motion.div className={styles.bar} style={{ scaleX }} aria-hidden="true" />;
}
