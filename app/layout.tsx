import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { PageTransition } from "@/components/motion/PageTransition";
import { fontVariables } from "./fonts";
import "@/styles/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://sujith.design"),
  title: {
    default: "Sujith Kumar Anand — Design leader who ships",
    template: "%s · Sujith Kumar Anand",
  },
  description:
    "Senior Design Manager at FYERS. A design leader who leads the team, delivers as an IC, and ships front-end with AI. Fintech, design systems, HCI.",
  openGraph: {
    type: "website",
    siteName: "Sujith Kumar Anand",
    title: "Sujith Kumar Anand — Design leader who ships",
    description:
      "Leads the team, delivers as an IC, ships front-end with AI. Fintech · design systems · HCI.",
  },
  icons: {
    icon: [
      { url: "/img/logo-sk-monogram.svg", type: "image/svg+xml" },
      { url: "/img/favicon-32.png", type: "image/png", sizes: "32x32" },
      { url: "/img/favicon-16.png", type: "image/png", sizes: "16x16" },
    ],
    apple: "/img/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={fontVariables}>
      <body>
        <a className="srOnly" href="#main">
          Skip to content
        </a>
        <Nav />
        <PageTransition>
          <main id="main">{children}</main>
        </PageTransition>
        <Footer />
      </body>
    </html>
  );
}
