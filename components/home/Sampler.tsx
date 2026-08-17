"use client";

import { motion, useReducedMotion } from "motion/react";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { SPRING } from "@/components/motion/tokens";
import styles from "./Sampler.module.css";

const WORK = [
  {
    meta: "Onboarding · 2024–25",
    title: "NRI Onboarding",
    detail: "Led the redesign; reduced friction across the flow end to end.",
    stat: "↑ ~19% lead-to-PAN conversion, relative to baseline",
  },
  {
    meta: "Markets · 2025",
    title: "Screeners",
    detail: "Revamped discovery and analytics for active researchers.",
    stat: "↑ 100%+ adoption after the revamp",
  },
  {
    meta: "Growth · 2025–26",
    title: "Prime & onboarding funnel",
    detail:
      "Optimized the acquisition funnel from lead to activation across Prime and onboarding.",
    stat: "↑ conversion at both lead-to-PAN and lead-to-eSign steps",
  },
  {
    meta: "Investments · 2025–26",
    title: "Mutual Funds & IPO",
    detail:
      "Enhanced the investing experience to support sustained, systematic participation.",
    stat: "↑ steady growth in SIP adoption and monthly inflows",
  },
  {
    meta: "FIA · 2024–25",
    title: "FIA",
    detail:
      "Built and launched from scratch; grew into a key analytical layer on the platform.",
    stat: "0 → 1, then sustained growth",
  },
  {
    meta: "Onboarding · 2024–25",
    title: "Profile on FDSG",
    detail: "Supervised the redesign; strong adoption among existing users.",
    stat: "Complaints trending down since launch",
  },
];

const IC = [
  "Redesigned the Orders experience for active traders — a more structured, intuitive flow for trade management.",
  "Led the NRI onboarding redesign end to end, cutting friction in the flow.",
  "Contributing member of the Design Review Board that shaped the FYERS Design Style Guide.",
];

const DIRECTING = [
  "Led design execution across six core verticals — Markets, Trading, Options, Investments, Reports, Growth — through a team restructuring.",
  "Directed three application revamps, including FDSG 2.0 and the 2.1 web rollout.",
  "Supervised delivery of the Options Scalper Terminal and the FDSG-based Profile redesign.",
];

export function Sampler() {
  const reduced = useReducedMotion();

  // The lift is the only hover affordance these cards have — they are not
  // links — so it stays a spring rather than a duration: it should feel like
  // the card responding, not like a timed transition playing.
  const hover = reduced ? {} : { whileHover: { y: -4 }, transition: SPRING };

  return (
    <div className="wrap">
      <Reveal className={styles.moreHead}>
        <h3 className={styles.moreTitle}>More, shipped</h3>
        <span className={styles.moreSub}>
          Smaller in scope than the case studies above, still real, still delivered.
        </span>
      </Reveal>

      <Stagger className={styles.grid}>
        {WORK.map((item) => (
          <StaggerItem key={item.title}>
            <motion.div className={styles.card} {...hover}>
              <span className={styles.meta}>{item.meta}</span>
              <span className={styles.title}>{item.title}</span>
              <p className={styles.detail}>{item.detail}</p>
              <span className={styles.stat}>{item.stat}</span>
            </motion.div>
          </StaggerItem>
        ))}
      </Stagger>

      <Reveal className={styles.split}>
        <span className={styles.splitLabel}>IC vs. supervised — FY24–26</span>
        <div className={styles.splitGrid}>
          <div>
            <h4 className={styles.splitTitle}>Hands-on, as an IC</h4>
            <ul className={styles.list}>
              {IC.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className={styles.splitTitle}>Directing the team</h4>
            <ul className={styles.list}>
              {DIRECTING.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
