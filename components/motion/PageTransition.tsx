"use client";

import { motion, useReducedMotion } from "motion/react";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { EASE } from "./tokens";

/**
 * Cross-fades the page body on route change.
 *
 * Deliberately enter-only. A true AnimatePresence exit needs to hold the
 * outgoing tree mounted while the router has already swapped it, which in the
 * App Router means intercepting navigation and reliably produces a flash of
 * the new route under the old one. An entrance fade keyed on the pathname
 * gives the continuity without that failure mode.
 *
 * Note the very short duration: this runs on every navigation, and anything
 * slower starts to feel like latency rather than polish.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const reduced = useReducedMotion();

  if (reduced) return <>{children}</>;

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.28, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
