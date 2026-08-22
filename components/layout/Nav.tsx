"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./Nav.module.css";

const LINKS = [
  { href: "/#work", label: "Work" },
  { href: "/#lab", label: "Lab" },
  { href: "/#writing", label: "Writing" },
  { href: "/#about", label: "About" },
];

/**
 * Sticky top bar.
 *
 * The bar is paper by default, so wherever a section of another colour sits
 * behind it (the dark Work band and the footer; the sand hero) it would read
 * as a slab of the wrong colour dropped on top of the page. It re-tints to
 * match instead.
 *
 * Rather than hard-coding which sections are which — that broke the moment a
 * page had a different set — an element opts in by carrying `data-nav-dark`
 * or `data-nav-sand`, and Nav asks which of those currently intersects its own
 * bottom edge.
 *
 * The measurement is rAF-throttled: scroll fires far more often than the
 * browser paints, and getBoundingClientRect() forces layout, so reading it on
 * every event was the one real jank source in the original implementation.
 */
export function Nav() {
  const [surface, setSurface] = useState<"paper" | "dark" | "sand">("paper");

  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;
      const edge = document.querySelector("nav")?.getBoundingClientRect().bottom ?? 0;
      const under = (marker: string) =>
        Array.from(document.querySelectorAll(`[${marker}]`)).some((section) => {
          const rect = section.getBoundingClientRect();
          return rect.top <= edge && rect.bottom >= edge;
        });

      // Dark wins: a dark section behind a paper bar is the case that actually
      // breaks legibility, where sand behind it is only a tint mismatch.
      setSurface(under("data-nav-dark") ? "dark" : under("data-nav-sand") ? "sand" : "paper");
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    measure();
    addEventListener("scroll", schedule, { passive: true });
    addEventListener("resize", schedule);
    return () => {
      removeEventListener("scroll", schedule);
      removeEventListener("resize", schedule);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <nav
      className={`${styles.nav} ${surface === "dark" ? styles.onDark : ""} ${
        surface === "sand" ? styles.onSand : ""
      }`}
    >
      <div className={styles.inner}>
        <Link className={styles.brand} href="/">
          <span className={styles.mark} aria-hidden="true" />
          Sujith Kumar Anand
        </Link>

        <div className={styles.links}>
          {LINKS.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </div>

        <Link className={styles.cta} href="/#contact">
          Get in touch
        </Link>
      </div>
    </nav>
  );
}
