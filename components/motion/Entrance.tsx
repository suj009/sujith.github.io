"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { GLIDE, RISE, STAGGER } from "./tokens";

type As = "div" | "section" | "header" | "aside" | "span" | "p" | "h1" | "h2";

type Props = {
  children: ReactNode;
  as?: As;
  className?: string;
  id?: string;
  /** Kept explicit rather than spreading rest props, since the only thing
      callers have needed to pass through is a label on a landmark. */
  "aria-label"?: string;
};

/*
  The mount-time counterpart to <Reveal>.

  Reveal fires on whileInView, which is right for anything below the fold but
  wrong at the top of a page: the element is already on screen at load, so the
  observer resolves immediately and the entrance reads as a stutter rather than
  a sequence. Entrance runs on mount instead.

  Both share the same tokens, so a masthead and the home hero rise by the same
  distance over the same curve.
*/
const container = {
  hidden: {},
  shown: { transition: { staggerChildren: STAGGER, delayChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: RISE },
  shown: { opacity: 1, y: 0, transition: GLIDE },
};

export function Entrance({ children, as = "div", className, id, gap = STAGGER }: Props & { gap?: number }) {
  const reduced = useReducedMotion();
  const Tag = motion[as];

  // No hidden initial state at all when motion is reduced — the content is
  // simply present, so it cannot be stranded invisible.
  if (reduced) {
    const Plain = as;
    return (
      <Plain className={className} id={id}>
        {children}
      </Plain>
    );
  }

  return (
    <Tag
      id={id}
      className={className}
      initial="hidden"
      animate="shown"
      variants={
        gap === STAGGER
          ? container
          : { hidden: {}, shown: { transition: { staggerChildren: gap, delayChildren: 0.05 } } }
      }
    >
      {children}
    </Tag>
  );
}

export function EntranceItem({
  children,
  as = "div",
  className,
  "aria-label": label,
}: Props) {
  const reduced = useReducedMotion();
  const Tag = motion[as];

  if (reduced) {
    const Plain = as;
    return (
      <Plain className={className} aria-label={label}>
        {children}
      </Plain>
    );
  }

  return (
    <Tag className={className} aria-label={label} variants={item}>
      {children}
    </Tag>
  );
}
