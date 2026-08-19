"use client";

import { motion, useReducedMotion } from "motion/react";
import { Entrance, EntranceItem } from "@/components/motion/Entrance";
import { EASE, GLIDE, RISE, SPRING, STAGGER } from "@/components/motion/tokens";
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
  The portrait plate.

  Everything around the photograph — the ring, the dot field, the dashed
  connectors, the accent squares — is drawn in CSS and SVG rather than baked
  into the image. Three reasons: it stays crisp at any density, it can be
  animated piece by piece (a flat JPEG can only fade), and it is made of the
  site's own tokens, so it cannot drift out of palette the way a supplied
  raster would.

  The plate is one variant child of the hero sequence, so it rises with
  everything else; its own children then stagger inside it, which is what makes
  the frame read as assembling around the photo rather than arriving with it.
*/
const plate = {
  hidden: { opacity: 0, y: RISE },
  shown: {
    opacity: 1,
    y: 0,
    transition: { ...GLIDE, staggerChildren: STAGGER * 0.34, delayChildren: 0.18 },
  },
};

const ring = {
  hidden: { opacity: 0, scale: 0.82 },
  shown: { opacity: 1, scale: 1, transition: { duration: GLIDE.duration, ease: EASE } },
};

const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  shown: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: GLIDE.duration * 0.9, ease: EASE },
  },
};

const pop = {
  hidden: { opacity: 0, scale: 0.4 },
  shown: { opacity: 1, scale: 1, transition: SPRING },
};

/** Accent squares. Deliberately only site colours — a fourth hue introduced
    here would appear once on the whole site and never again. */
const MARKS = [
  { className: "markA", tone: "signal" },
  { className: "markB", tone: "up" },
  { className: "markC", tone: "line" },
] as const;

function Plate({ reduced }: { reduced: boolean | null }) {
  const body = (
    <>
      {/* Decoration only — none of it belongs in the accessibility tree. */}
      <motion.span
        className={styles.ring}
        variants={reduced ? undefined : ring}
        aria-hidden="true"
      />
      <span className={styles.dots} aria-hidden="true" />

      <svg className={styles.wires} viewBox="0 0 400 420" fill="none" aria-hidden="true">
        <motion.path
          d="M18 96 H150"
          stroke="var(--line-2)"
          strokeWidth="1"
          strokeDasharray="5 6"
          variants={reduced ? undefined : draw}
        />
        <motion.path
          d="M382 250 H300 V330"
          stroke="var(--line-2)"
          strokeWidth="1"
          strokeDasharray="5 6"
          variants={reduced ? undefined : draw}
        />
      </svg>

      {MARKS.map((mark) => (
        <motion.span
          key={mark.className}
          className={`${styles.mark} ${styles[mark.className]}`}
          data-tone={mark.tone}
          variants={reduced ? undefined : pop}
          aria-hidden="true"
        />
      ))}

      {/*
        A background layer, not an <img>: it is a portrait of the page's
        author, which the h1 and the spec panel already state in text, and a
        missing file should degrade to an empty medallion rather than a broken
        image box in the middle of the hero.
      */}
      <motion.span
        className={styles.portrait}
        variants={reduced ? undefined : ring}
        role="img"
        aria-label="Sujith Kumar"
      />
    </>
  );

  if (reduced) return <div className={styles.plate}>{body}</div>;
  return (
    <motion.div className={styles.plate} variants={plate}>
      {body}
    </motion.div>
  );
}

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
        <div className={styles.copy}>
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

        {/* Portrait and readout share the right column: the face answers "who",
            the panel answers "what", and stacking them keeps the headline's
            measure intact on the left. */}
        <div className={styles.side}>
          <Plate reduced={reduced} />

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
        </div>
      </Entrance>

      <div className={styles.cueWrap}>
        <motion.a
          className={styles.cue}
          href="#work"
          aria-label="Scroll to Work"
          /*
            Arrives after the staggered sequence has finished, not during it —
            it is the invitation to leave the hero, so it should not compete
            with the hero still assembling. The delay tracks the sequence
            length: delayChildren + (items - 1) × STAGGER + GLIDE.
          */
          {...(reduced
            ? {}
            : {
                initial: { opacity: 0 },
                animate: { opacity: 1 },
                transition: { delay: 0.05 + 5 * STAGGER + GLIDE.duration, duration: 0.9, ease: EASE },
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
