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
 * The bar is paper-coloured, so wherever a dark section sits behind it (the Lab
 * on the home page, the footer everywhere) it used to read as a light slab
 * dropped on top of the page. It flips to a dark palette in those places.
 *
 * Rather than hard-coding which sections are dark — which broke the moment a
 * page had a different set — any element can opt in by carrying
 * `data-nav-dark`. Nav just asks which of those currently intersects its own
 * bottom edge.
 *
 * The measurement is rAF-throttled: scroll fires far more often than the
 * browser paints, and getBoundingClientRect() forces layout, so reading it on
 * every event was the one real jank source in the original implementation.
 */
export function Nav() {
  const [onDark, setOnDark] = useState(false);

  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;
      const edge = document.querySelector("nav")?.getBoundingClientRect().bottom ?? 0;
      const over = Array.from(document.querySelectorAll("[data-nav-dark]")).some((section) => {
        const rect = section.getBoundingClientRect();
        return rect.top <= edge && rect.bottom >= edge;
      });
      setOnDark(over);
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
    <nav className={`${styles.nav} ${onDark ? styles.onDark : ""}`}>
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
