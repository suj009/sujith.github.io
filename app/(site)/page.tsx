import { Hero } from "@/components/home/Hero";
import { WorkStack } from "@/components/home/WorkStack";
import { WorkTiers } from "@/components/home/WorkTiers";
import { LabSection } from "@/components/home/LabSection";
import { Writing } from "@/components/home/Writing";
import { About } from "@/components/home/About";
import { Section, SectionHead } from "@/components/layout/Section";
import styles from "./page.module.css";

export default function HomePage() {
  return (
    <>
      <Hero />

      {/*
        Work does not use <Section>: its case-study panels are full-bleed and
        pinned, so they cannot sit inside the standard centred .wrap column.
        It also stays off data-nav-dark deliberately — its own dark topbar is
        sticky directly beneath the nav, and flipping the nav dark as well
        merged the two into one indistinct band.
      */}
      <section id="work" className={styles.work}>
        <WorkStack />
        <WorkTiers />
      </section>

      <Section id="lab" dark>
        <SectionHead
          n="02"
          title="Lab"
          sub={`Small, real things I build. Where "I still ship" stops being a claim and becomes something you can click.`}
        />
        <LabSection />
      </Section>

      <Section id="writing">
        <SectionHead
          n="03"
          title="Writing"
          sub="How I think, not just what I've shipped. Three pieces on design, systems, and AI."
        />
        <Writing />
      </Section>

      <Section id="about">
        <SectionHead
          n="04"
          title="About"
          sub="The human, the credentials, and what it's actually like to work with me."
        />
        <About />
      </Section>
    </>
  );
}
