"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { GLIDE, RISE, STAGGER, VIEWPORT } from "./tokens";

type As = "div" | "section" | "article" | "aside" | "header" | "li" | "figure";

type RevealProps = {
  children: ReactNode;
  /** Seconds to wait after the element enters view. */
  delay?: number;
  /** Semantic element to render. Defaults to a div. */
  as?: As;
  className?: string;
  id?: string;
};

/**
 * Fade + rise as the element scrolls into view, once.
 *
 * This replaces the two separate hand-rolled IntersectionObserver
 * implementations the static site carried — one inline in index.html, one in
 * assets/reading.js — which had drifted to different thresholds (0.12 vs 0.15)
 * and so revealed at visibly different points on different pages.
 *
 * Under prefers-reduced-motion the element is simply present: no offset to
 * animate away from, no transition, and critically no `initial` hidden state
 * that could strand content invisible if the observer never fires.
 */
export function Reveal({ children, delay = 0, as = "div", className, id }: RevealProps) {
  const reduced = useReducedMotion();
  const Tag = motion[as];

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
      initial={{ opacity: 0, y: RISE }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ ...GLIDE, delay }}
    >
      {children}
    </Tag>
  );
}

/**
 * Reveals its children in sequence rather than as one block. Pair with
 * <StaggerItem> for each child that should animate.
 */
export function Stagger({
  children,
  as = "div",
  className,
  id,
  delay = 0,
  gap = STAGGER,
}: RevealProps & { gap?: number }) {
  const reduced = useReducedMotion();
  const Tag = motion[as];

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
      whileInView="shown"
      viewport={VIEWPORT}
      variants={{
        hidden: {},
        shown: { transition: { staggerChildren: gap, delayChildren: delay } },
      }}
    >
      {children}
    </Tag>
  );
}

export function StaggerItem({
  children,
  as = "div",
  className,
}: Omit<RevealProps, "delay" | "id">) {
  const reduced = useReducedMotion();
  const Tag = motion[as];

  if (reduced) {
    const Plain = as;
    return <Plain className={className}>{children}</Plain>;
  }

  return (
    <Tag
      className={className}
      variants={{
        hidden: { opacity: 0, y: RISE },
        shown: { opacity: 1, y: 0, transition: GLIDE },
      }}
    >
      {children}
    </Tag>
  );
}
