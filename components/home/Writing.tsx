"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { SPRING } from "@/components/motion/tokens";
import styles from "./Writing.module.css";

const PIECES = [
  {
    href: "/writing/design-frontend-ai/",
    tag: "Essay · Design + AI",
    title: "The handoff is dead. I designed and shipped the front-end myself — with AI.",
    blurb:
      "Design used to end at a handoff. Working with AI as a pair, I designed Wealth View and shipped its front-end myself — and it changed how I think about what a designer is. The workflow, and the honest limits.",
    lead: true,
  },
  {
    href: "/writing/scaling-design-system/",
    tag: "Essay · Design systems",
    title: "What I learned scaling a design system across a fintech platform",
    blurb:
      "A system isn't a folder of components — it's an organizational agreement. On governance, the design-to-code gap, and measuring the promise you actually made.",
    lead: false,
  },
  {
    href: "/writing/ux-to-ui-ownership/",
    tag: "Essay · Team & craft",
    title: "One designer, whole problem: why I killed the UX/UI split",
    blurb:
      "Handoffs are where intent dies. The case for one Product Designer owning a problem from user need to shipped screen — and the objections, answered.",
    lead: false,
  },
];

export function Writing() {
  const reduced = useReducedMotion();
  const hover = reduced ? {} : { whileHover: { y: -3 }, transition: SPRING };

  return (
    <Stagger className={styles.grid}>
      {PIECES.map((piece) => (
        <StaggerItem key={piece.href} className={piece.lead ? styles.leadCell : undefined}>
          <motion.div className={styles.cardWrap} {...hover}>
            <Link
              className={`${styles.card} ${piece.lead ? styles.lead : ""}`}
              href={piece.href}
            >
              <div>
                <span className={styles.tag}>{piece.tag}</span>
                <h3 className={styles.title}>{piece.title}</h3>
              </div>
              <div>
                <p className={styles.blurb}>{piece.blurb}</p>
                <span className={styles.go}>Read the piece</span>
              </div>
            </Link>
          </motion.div>
        </StaggerItem>
      ))}
    </Stagger>
  );
}
