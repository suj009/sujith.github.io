"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { Reveal } from "@/components/motion/Reveal";
import { SPRING } from "@/components/motion/tokens";
import styles from "./About.module.css";

const CAREER = [
  { years: "2024 — Now", org: "FYERS", role: "Senior Design Manager, Product Design · 6 verticals" },
  {
    years: "Nov 2021 — Feb 24",
    org: "Corvell Labs",
    role: "Sr. Designer · Web3 trading & prediction products — Nexter, Oddz, Perpetuals, Novastro",
  },
  {
    years: "2018 — 21",
    org: "Datami",
    role: "Lead Product Designer → Product Designer · Airtel TV Africa, Reach Mobile",
  },
  {
    years: "Oct 2017 — Mar 18",
    org: "Two Roads Tech",
    role: "Product Designer · Bengaluru — Qplum, an AI-based online portfolio adviser (US)",
  },
  { years: "Oct 2016 — Apr 17", org: "Onetech Ventures", role: "UX Specialist · Bengaluru" },
  {
    years: "Feb — Jun 2016",
    org: "IBM Studios, Böblingen",
    role: "UX design & research — IBM BPM Process Portal",
  },
  { years: "2015 — 16", org: "emocial Ltd · freelance", role: "UX design · London" },
  {
    years: "2014 — 15",
    org: "Microsoft",
    role: "UX research — care technology, with UCL & Kent County Council",
  },
];

const CREDENTIALS = [
  { title: "MSc, Human-Computer Interaction & Design", detail: "EIT Digital · KTH, then UCL · 2013 — 15" },
  { title: "MSc, Advanced Computer Science", detail: "Newcastle University · 2011 — 12" },
  { title: "BE, Information Science & Engineering", detail: "BMS College of Engineering · 2006 — 10" },
  { title: "NISM Series 7", detail: "certified · Series 8 in progress" },
];

const SKILLS = [
  "Design leadership",
  "Team scaling",
  "Design systems",
  "Product design",
  "Figma",
  "Flutter",
  "Front-end",
  "AI-assisted build",
  "Research",
];

export function About() {
  const reduced = useReducedMotion();

  return (
    <div className={styles.grid}>
      <Reveal>
        <p className={styles.body}>
          I&rsquo;m a product design leader with over eleven years turning complex problems into
          products people enjoy — most of it in fintech, where the stakes and the trust are both
          high. I came into design from an <b>engineering foundation</b> (a master&rsquo;s in
          Advanced Computer Science before one in Human-Computer Interaction), which is exactly
          why &ldquo;a design leader who ships front-end&rdquo; isn&rsquo;t a stretch for me —
          it&rsquo;s where I started.
        </p>
        <p className={styles.body}>
          Today I lead product design at <b>FYERS</b> across six verticals — a team I built from
          five to a peak of eight, then right-sized back to five after a reorg, covering the same
          six verticals with fewer people than at the peak. Before that, fintech at Two Roads
          Tech, telecom and streaming at Datami, and Web3 at Corvell Labs; and before design was
          my job, I was the person running the interviews and diary studies as an HCI researcher
          at <b>Microsoft</b> and <b>IBM</b>.
        </p>

        <div className={styles.workMe}>
          <span className="eyebrow">What it&rsquo;s like to work with me</span>
          <p>
            I optimize for clarity and ownership. I&rsquo;d rather my team own a problem end to
            end — from user need to shipped screen — than pass it down a relay, and I try to lead
            the way I wish I&rsquo;d been led: a clear direction, room to do the best work of your
            career, and systems that make the next project easier. I push for craft, I&rsquo;ll
            get into the code when it helps, and I care more about the team getting sharper than
            about being the smartest person in the room.
          </p>
        </div>

        <h3 className={styles.h3}>Career</h3>
        <div className={styles.career}>
          {CAREER.map((row) => (
            <div key={row.org + row.years} className={styles.careerRow}>
              <span className={styles.years}>{row.years}</span>
              <div>
                <div className={styles.org}>{row.org}</div>
                <div className={styles.role}>{row.role}</div>
              </div>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <div className={styles.portrait}>
          <Image
            src="/img/sujith.jpg"
            width={168}
            height={168}
            alt="Sujith Kumar Anand"
            className={styles.portraitImg}
          />
        </div>

        <h3 className={styles.h3}>Credentials</h3>
        <div className={styles.creds}>
          {CREDENTIALS.map((cred) => (
            <div key={cred.title}>
              <b>{cred.title}</b> — {cred.detail}
            </div>
          ))}
        </div>

        <h3 className={styles.h3}>What I do</h3>
        <div className={styles.skills}>
          {SKILLS.map((skill) => (
            <span key={skill}>{skill}</span>
          ))}
        </div>

        <motion.span
          className={styles.cvWrap}
          {...(reduced ? {} : { whileHover: { y: -2 }, whileTap: { scale: 0.97 }, transition: SPRING })}
        >
          <Link className={styles.cv} href="/cv/">
            ↗ View / print CV
          </Link>
        </motion.span>
      </Reveal>
    </div>
  );
}
