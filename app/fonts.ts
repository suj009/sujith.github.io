/*
  The three faces the site has always used, moved off the Google Fonts <link>
  and onto next/font. They get self-hosted and inlined into the build, so there
  is no third-party round-trip on load and no swap flash.

  Roles, unchanged from the static site:
    display — Bricolage Grotesque : headlines, panel headings, section titles
    body    — Hanken Grotesk      : running text
    mono    — IBM Plex Mono       : eyebrows, labels, metrics, the spec readout
*/
import { Azeret_Mono, Bricolage_Grotesque, Hanken_Grotesk } from "next/font/google";

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

/*
  Azeret Mono, not IBM Plex Mono.

  The mono is load-bearing on this site — every eyebrow, the whole spec panel,
  the entire Lab — and Plex is the default technical mono, 63rd most used on
  Google Fonts and the face that turns up in every "engineering" layout. It was
  doing nothing here that a hundred other sites were not also doing.

  Azeret sits at 390. It is geometric with distinctive terminals, its figures
  are even enough to hold the Lab's tabular columns, and it is not so wide that
  the spec panel's two columns have to be re-cut — which is what ruled out
  Martian Mono, the other face with real character.

  Variable, so one file covers 400/500/600 where Plex needed three statics.
*/
export const mono = Azeret_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const fontVariables = `${display.variable} ${body.variable} ${mono.variable}`;
