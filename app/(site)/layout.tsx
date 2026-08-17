import type { ReactNode } from "react";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";

/** Everything that reads as "the site": nav, content, contact footer. */
export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <a className="srOnly" href="#main">
        Skip to content
      </a>
      <Nav />
      <main id="main">{children}</main>
      <Footer />
    </>
  );
}
