"use client";

import { motion, useReducedMotion } from "motion/react";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { SPRING } from "@/components/motion/tokens";
import {
  DIRECTED,
  DIRECTED_SHIPPED,
  DIRECTED_TOTAL,
  PIPELINE,
  SELECTED,
  type Access,
  type Project,
} from "./work-data";
import styles from "./WorkTiers.module.css";

/**
 * The access affordance, shown on the card rather than discovered by clicking.
 * A lock that only reveals itself after a failed click is a trap.
 */
function AccessTag({ access }: { access: Access }) {
  if (access.kind === "none") return <span className={styles.accessNone}>Not shown publicly</span>;

  const label =
    access.kind === "live" ? "↗ See it live" : access.kind === "announcement" ? "📣 Announcement" : "🔒 Password";

  return (
    <a
      className={styles.access}
      href={access.href}
      data-kind={access.kind}
      {...(access.kind !== "protected" ? { target: "_blank", rel: "noopener" } : {})}
    >
      {label}
    </a>
  );
}

function SelectedCard({ project }: { project: Project }) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={styles.card}
      {...(reduced ? {} : { whileHover: { y: -4 }, transition: SPRING })}
    >
      <div className={styles.cardHead}>
        <span className={styles.name}>{project.name}</span>
        <span className={styles.role} data-role={project.role}>
          {project.role}
        </span>
      </div>
      {project.note && <p className={styles.note}>{project.note}</p>}
      <div className={styles.cardFoot}>
        <AccessTag access={project.access} />
      </div>
    </motion.div>
  );
}

export function WorkTiers() {
  return (
    <div className="wrap">
      {/* ---------- hands-on ---------- */}
      <Reveal className={styles.head}>
        <h3 className={styles.headTitle}>Hands-on</h3>
        <span className={styles.headSub}>
          What I made myself, or helped make. Four things explained, rather than forty listed.
        </span>
      </Reveal>

      <Stagger className={styles.grid}>
        {SELECTED.map((project) => (
          <StaggerItem key={project.name}>
            <SelectedCard project={project} />
          </StaggerItem>
        ))}
      </Stagger>

      {/* ---------- directed ---------- */}
      <Reveal className={styles.head}>
        <h3 className={styles.headTitle}>Directed</h3>
        <span className={styles.headSub}>
          Delivered by the team under my direction, across six verticals.
        </span>
      </Reveal>

      <Reveal className={styles.tally}>
        <div className={styles.tallyLead}>
          <span className={styles.tallyBig}>{DIRECTED_TOTAL}</span>
          <span className={styles.tallyLabel}>projects directed</span>
        </div>
        <div className={styles.tallyLead}>
          <span className={`${styles.tallyBig} ${styles.up}`}>{DIRECTED_SHIPPED}</span>
          <span className={styles.tallyLabel}>shipped and live</span>
        </div>
        {/*
          The pipeline is stated, not hidden. A record showing only what landed
          reads as a highlight reel; the rest is what a team's load looks like.
        */}
        <ul className={styles.pipeline}>
          {PIPELINE.map((p) => (
            <li key={p.label}>
              <b>{p.count}</b> {p.label}
            </li>
          ))}
        </ul>
      </Reveal>

      <Stagger className={styles.verticals} gap={0.1}>
        {DIRECTED.map((vertical) => (
          <StaggerItem key={vertical.area} className={styles.vertical}>
            <h4 className={styles.area}>{vertical.area}</h4>
            <ul className={styles.shipped}>
              {vertical.shipped.map((name) => (
                <li key={name}>{name}</li>
              ))}
            </ul>
          </StaggerItem>
        ))}
      </Stagger>

      <Reveal>
        <p className={styles.footnote}>
          Shipped work is named because it is already public in the product. Everything still in
          flight is a count — naming it would publish a roadmap that isn&rsquo;t mine to publish.
        </p>
      </Reveal>
    </div>
  );
}
