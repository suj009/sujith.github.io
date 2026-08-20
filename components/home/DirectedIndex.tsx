"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Reveal } from "@/components/motion/Reveal";
import {
  DIRECTED,
  DIRECTED_PANELS,
  DIRECTED_SHIPPED,
  VERTICAL_COUNT,
  VERTICALS,
} from "./work-data";
import styles from "./DirectedIndex.module.css";

/**
 * The delivery record: what the team shipped under direction.
 *
 * Live work only. There used to be a status column and a row of filter chips
 * to sort by it, which stopped earning their place the moment unreleased work
 * came off the page — every row is live now, so the count says it once instead
 * of 23 identical labels saying it again.
 */
export function DirectedIndex() {
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

    The item list is deliberately left still. It is the part people are
    actually reading, and parallax on the thing you are trying to read is the
    usual way this effect goes wrong.
  */
  const { scrollYProgress } = useScroll({
    target: band,
    offset: ["start end", "end start"],
  });

  const textureY = useTransform(scrollYProgress, [0, 1], ["-7%", "7%"]);
  const headY = useTransform(scrollYProgress, [0, 1], [20, -20]);
  const tallyY = useTransform(scrollYProgress, [0, 1], [44, -44]);

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
              Live products delivered by the team under my direction. I set the
              direction, reviewed the work, and owned the outcome.
            </p>
          </motion.div>

          <motion.div
            className={styles.tally}
            style={reduced ? undefined : { y: tallyY }}
          >
            <div className={styles.stat}>
              <span className={`${styles.statValue} ${styles.up}`}>{DIRECTED_SHIPPED}</span>
              <span className={styles.statLabel}>shipped</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statValue}>{VERTICAL_COUNT}</span>
              <span className={styles.statLabel}>verticals</span>
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

        {/*
          Scope of ownership, stated in full. Three of the seven have nothing
          released to name yet, so they never appear as a group below — naming
          them here is what keeps the seven from silently becoming four.
        */}
        <div className={styles.verticals}>
          <span className={styles.verticalsLabel}>Verticals owned</span>
          <p className={styles.verticalsList}>{VERTICALS.join(" · ")}</p>
        </div>

        {/*
          Columns rather than a grid of equal cells: the groups are different
          lengths, and CSS columns let a short one sit under a tall one instead
          of leaving a hole. break-inside keeps a group whole.
        */}
        <div className={styles.columns}>
          {DIRECTED.map((group) => (
            <section key={group.area} className={styles.group}>
              <h4 className={styles.area}>
                <span>{group.area}</span>
                <span className={styles.count}>{String(group.items.length).padStart(2, "0")}</span>
              </h4>

              <ul className={styles.items}>
                {group.items.map((item) => (
                  <li key={item.name} className={styles.item}>
                    {item.href ? (
                      <a className={styles.link} href={item.href} target="_blank" rel="noopener">
                        {item.name} ↗
                      </a>
                    ) : (
                      <span className={styles.name}>{item.name}</span>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </Reveal>
    </div>
  );
}
