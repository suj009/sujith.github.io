import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";
import styles from "./Section.module.css";

/**
 * The full-height section scaffold shared by Lab, Writing and About.
 *
 * `dark` both paints the panel palette and marks the element with
 * data-nav-dark, so the sticky nav flips to its dark treatment while this
 * section is behind it. Those two things always travelled together and were
 * previously wired up separately (and inconsistently) per section.
 */
export function Section({
  id,
  children,
  dark = false,
  className = "",
}: {
  id?: string;
  children: ReactNode;
  dark?: boolean;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`${styles.section} ${dark ? styles.dark : ""} ${className}`}
      {...(dark ? { "data-nav-dark": true } : {})}
    >
      <div className="wrap">{children}</div>
    </section>
  );
}

export function SectionHead({
  n,
  title,
  sub,
}: {
  n: string;
  title: string;
  sub: string;
}) {
  return (
    <Reveal className={styles.head}>
      <span className={styles.n}>{n}</span>
      <h2 className={styles.title}>{title}</h2>
      <span className={styles.sub}>{sub}</span>
    </Reveal>
  );
}
