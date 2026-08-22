/*
  The three faces the site has always used, moved off the Google Fonts <link>
  and onto next/font. They get self-hosted and inlined into the build, so there
  is no third-party round-trip on load and no swap flash.

  Roles, unchanged from the static site:
    display — Bricolage Grotesque : headlines, panel headings, section titles
    body    — Hanken Grotesk      : running text
    mono    — IBM Plex Mono       : eyebrows, labels, metrics, the spec readout
*/
import { Bricolage_Grotesque, Hanken_Grotesk, IBM_Plex_Mono } from "next/font/google";

export const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const body = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

// Not a variable font, so the weights actually used have to be named.
export const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});

export const fontVariables = `${display.variable} ${body.variable} ${mono.variable}`;
