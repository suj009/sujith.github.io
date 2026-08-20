"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Reveal } from "@/components/motion/Reveal";
import { EASE } from "@/components/motion/tokens";
import {
  DIRECTED,
  DIRECTED_PANELS,
  DIRECTED_SHIPPED,
  DIRECTED_TOTAL,
  STATUS_LABEL,
  type Status,
} from "./work-data";
import styles from "./DirectedIndex.module.css";

type Filter = Status | "all";

const FILTERS: { key: Filter; label: string }[] = [
  { key: "all", label: "everything" },
  { key: "shipped", label: "shipped" },
  { key: "build", label: "in build" },
  { key: "design", label: "in design" },
  { key: "sunset", label: "sunset" },
];

/**
 * The delivery record: everything the team shipped under direction.
 *
 * Filtering is the whole point of the interaction — a reader who wants only
 * what is live can get to it in one click, rather than scanning 43 rows for
 * the word. Counts per group update with the filter so the numbers never
 * contradict what is on screen.
 */
export function DirectedIndex() {
  const [filter, setFilter] = useState<Filter>("all");
  const reduced = useReducedMotion();
  const band = useRef<HTMLDivElement>(null);

  /*
    Parallax across the band's whole pass through the viewport — from its top
    edge entering at the bottom of the screen to its bottom edge leaving at the
    top. Unlike the pinned screens below, this band scrolls normally, so the
    depth has to come from its layers outrunning each other against that pass.

      texture   -7% → +7%   drifts down behind everything
      heading   +20 → -20px
      tally     +44 → -44px  more than twice the heading's rate

    The item list is deliberately left still. It is 43 rows of dense reading
    and a filter people click through; moving it would make it harder to use
    to no end, and parallax on the thing you are trying to read is the usual
    way this effect goes wrong.
  */
  const { scrollYProgress } = useScroll({
    target: band,
    offset: ["start end", "end start"],
  });

  const textureY = useTransform(scrollYProgress, [0, 1], ["-7%", "7%"]);
  const headY = useTransform(scrollYProgress, [0, 1], [20, -20]);
  const tallyY = useTransform(scrollYProgress, [0, 1], [44, -44]);

  const groups = DIRECTED.map((v) => ({
    area: v.area,
    items: filter === "all" ? v.items : v.items.filter((i) => i.status === filter),
  })).filter((v) => v.items.length > 0);

  return (
    /* Full-bleed, and dark like the screens below it: Work reads as one band
       from here down rather than a card sitting on paper above a dark stack. */
    <div className={styles.band} data-dark data-nav-dark ref={band}>
      {/* Was .band::before. A real element now, because Motion cannot drive a
          pseudo-element and this is the band's furthest plane. */}
      <motion.div
        className={styles.texture}
        style={reduced ? undefined : { y: textureY }}
        aria-hidden="true"
      />

      <Reveal className={styles.card}>
        <header className={styles.head}>
          <motion.div style={reduced ? undefined : { y: headY }}>
            <span className={styles.eyebrow}>01 — Work · Directed</span>
            <h3 className={styles.title}>Directed</h3>
            <p className={styles.blurb}>
              Delivered by the team under my direction across seven verticals. I set the
              direction, reviewed the work, and owned the outcome.
            </p>
          </motion.div>

          <motion.div
            className={styles.tally}
            style={reduced ? undefined : { y: tallyY }}
          >
            <div className={styles.stat}>
              <span className={styles.statValue}>{DIRECTED_TOTAL}</span>
              <span className={styles.statLabel}>directed</span>
            </div>
            <div className={styles.stat}>
              <span className={`${styles.statValue} ${styles.up}`}>{DIRECTED_SHIPPED}</span>
              <span className={styles.statLabel}>shipped</span>
            </div>
          </motion.div>
        </header>

        {/*
          The two efforts with a case study written up. They used to be pinned
          panels ahead of this card; with Directed leading the section they
          would otherwise have no route in from the home page at all, so they
          surface here as the way into the long-form pieces. Deliberately not
          counted in the tally above — that figure is the post-March delivery
          record and should keep meaning exactly that.
        */}
        <div className={styles.studies}>
          <span className={styles.studiesLabel}>Case studies</span>
          {DIRECTED_PANELS.map((study) => (
            <Link key={study.id} className={styles.study} href={study.href ?? "/"}>
              {study.title} <span aria-hidden="true">→</span>
            </Link>
          ))}
        </div>

        <div className={styles.filters} role="group" aria-label="Filter by status">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              type="button"
              className={styles.chip}
              data-on={filter === f.key}
              aria-pressed={filter === f.key}
              onClick={() => setFilter(f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/*
          Columns rather than a grid of equal cells: the groups are different
          lengths, and CSS columns let a short one sit under a tall one instead
          of leaving a hole. break-inside keeps a group whole.
        */}
        <div className={styles.columns}>
          {groups.map((group) => (
            <section key={group.area} className={styles.group}>
              <h4 className={styles.area}>
                <span>{group.area}</span>
                <span className={styles.count}>{String(group.items.length).padStart(2, "0")}</span>
              </h4>

              <ul className={styles.items}>
                {group.items.map((item) => (
                  <motion.li
                    key={item.name}
                    className={styles.item}
                    /* Filtering swaps the list contents; a short fade keeps
                       that from reading as a flicker. */
                    {...(reduced
                      ? {}
                      : {
                          initial: { opacity: 0 },
                          animate: { opacity: 1 },
                          transition: { duration: 0.32, ease: EASE },
                        })}
                  >
                    {item.href ? (
                      <a className={styles.link} href={item.href} target="_blank" rel="noopener">
                        {item.name} ↗
                      </a>
                    ) : (
                      <span className={styles.name}>{item.name}</span>
                    )}
                    <span className={styles.status} data-status={item.status}>
                      {STATUS_LABEL[item.status]}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </Reveal>
    </div>
  );
}
