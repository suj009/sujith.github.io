import type { Metadata } from "next";
import Link from "next/link";
import { PrintButton } from "./PrintButton";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "CV",
  description:
    "Sujith Kumar Anand — Product Design Leader. Eleven years turning complex fintech into products people trust.",
};

const JOBS = [
  {
    org: "FYERS",
    years: "2024 — Present",
    role: "Senior Design Manager, Product Design",
    points: [
      "Lead product design across six verticals for one of India's large retail brokerages.",
      "Own the FYERS Design System (FDSG 2.0 → 2.1, web + mobile); cut design effort by roughly a third and established a single source of truth.",
      "Drove the shift from a split UX/UI relay to end-to-end Product Designers, improving ownership and adoption.",
      "Directed design for the Options Scalper Terminal, deepening engagement among high-frequency traders.",
      "Shipped Wealth View end to end in the front-end, working with AI (Claude).",
    ],
  },
  {
    org: "Corvell Labs",
    years: "Nov 2021 — Feb 24",
    role: "Sr. Designer · Web3 trading & prediction products",
    points: [
      "Designed and launched Web3 trading and prediction products across options, perpetuals, re-staking, and prediction markets — Nexter, Oddz, Perpetuals, Novastro.",
    ],
  },
  {
    org: "Datami",
    years: "2018 — 21",
    role: "Lead Product Designer → Product Designer",
    points: [
      "Airtel TV Africa — designed the streaming app end to end for the African market.",
      "Reach Mobile — designed the web journeys.",
    ],
  },
  {
    org: "Two Roads Tech",
    years: "Oct 2017 — Mar 18",
    role: "Product Designer",
    points: ["Owned all web journeys for Qplum, an AI-based online portfolio adviser for US investors."],
  },
  {
    org: "Onetech Ventures",
    years: "Oct 2016 — Apr 17",
    role: "UX Specialist · Bangalore",
    points: [
      "Web applications end to end — requirements gathering, interviews, design walkthroughs, empathy and scenario maps, wireframes, UI and prototypes.",
    ],
  },
  {
    org: "IBM Studios, Böblingen",
    years: "Feb — Jun 2016",
    role: "UX Design & Research Intern",
    points: [
      "IBM BPM Process Portal — two projects from paper sketches and wireframes through interviews and design walkthroughs with business partners and internal users.",
    ],
  },
  {
    org: "emocial Ltd · freelance",
    years: "2015 — 16",
    role: "UX Design · London",
    points: [
      "Responsive web applications — personas, information architecture, task flows, wireframes and prototypes; plus a freelance engagement for a London non-profit.",
    ],
  },
  {
    org: "Microsoft",
    years: "2014 — 15",
    role: "UX Research · United Kingdom",
    points: [
      "Field research on care technology with UCL & Kent County Council — interviews, diary studies, usability testing.",
    ],
  },
];

const EDUCATION = [
  {
    title: "MSc, Human-Computer Interaction & Design",
    meta: "EIT Digital — KTH Stockholm, then UCL London · 2013 — 15",
  },
  { title: "MSc, Advanced Computer Science", meta: "Newcastle University · 2011 — 12" },
  {
    title: "BE, Information Science & Engineering",
    meta: "BMS College of Engineering, Bangalore · 2006 — 10",
  },
];

const SKILLS = [
  "Design leadership",
  "Team scaling",
  "Design systems",
  "Product design",
  "Figma",
  "Flutter",
  "Front-end",
  "AI-assisted build",
  "Research",
];

/*
  A self-contained sheet, outside the (site) layout: no nav, no contact
  footer, and a print stylesheet that strips the toolbar so "Save as PDF"
  produces a clean document. Also the one page with no reveal choreography —
  a CV is scanned and printed, not scrolled through for effect.
*/
export default function CvPage() {
  return (
    <div className={styles.page}>
      <div className={styles.bar}>
        <Link href="/">← Back to portfolio</Link>
        <PrintButton />
      </div>

      <div className={styles.sheet}>
        <header className={styles.head}>
          <div>
            <h1 className={styles.name}>Sujith Kumar Anand</h1>
            <div className={styles.role}>
              Product Design Leader — a design leader who still ships
            </div>
            <p className={styles.summary}>
              Eleven years turning complex fintech into products people trust. I lead the team,
              deliver as an IC, and ship front-end with AI. Rooted in HCI research; grounded in
              engineering.
            </p>
          </div>
          <div className={styles.contact}>
            Bengaluru, IN
            <br />
            <a href="mailto:sujithkumaranand@gmail.com">sujithkumaranand@gmail.com</a>
            <br />
            <a href="https://www.linkedin.com/in/suj009">linkedin.com/in/suj009</a>
            <br />
            <a href="https://medium.com/@suj009">medium.com/@suj009</a>
            <br />
            <a href="https://sujith.design">sujith.design</a>
          </div>
        </header>

        <div className={styles.body}>
          <div>
            <h2 className={styles.h2}>Experience</h2>
            {JOBS.map((job) => (
              <div key={job.org} className={styles.job}>
                <div className={styles.jobTop}>
                  <span className={styles.org}>{job.org}</span>
                  <span className={styles.years}>{job.years}</span>
                </div>
                <div className={styles.jobRole}>{job.role}</div>
                <ul className={styles.points}>
                  {job.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className={styles.side}>
            <div className={styles.block}>
              <h2 className={styles.h2}>Education</h2>
              {EDUCATION.map((item) => (
                <div key={item.title} className={styles.item}>
                  <b>{item.title}</b>
                  <div className={styles.meta}>{item.meta}</div>
                </div>
              ))}
            </div>

            <div className={styles.block}>
              <h2 className={styles.h2}>Certification</h2>
              <div className={styles.item}>
                <b>NISM Series 7</b>
                <div className={styles.meta}>Certified · Series 8 in progress</div>
              </div>
            </div>

            <div className={styles.block}>
              <h2 className={styles.h2}>What I do</h2>
              <div className={styles.chips}>
                {SKILLS.map((skill) => (
                  <span key={skill}>{skill}</span>
                ))}
              </div>
            </div>

            <div className={styles.block}>
              <h2 className={styles.h2}>Writing</h2>
              <div className={styles.item}>
                <b>Design + front-end with AI</b>
                <div className={styles.meta}>medium.com/@suj009</div>
              </div>
              <div className={styles.item}>
                <b>Scaling a design system</b>
              </div>
              <div className={styles.item}>
                <b>Killing the UX/UI split</b>
              </div>
            </div>

            <div className={styles.block}>
              <h2 className={styles.h2}>Languages</h2>
              <p className={styles.langs}>
                English (full professional) · Kannada · Telugu · Tamil (professional) · Hindi
              </p>
            </div>
          </div>
        </div>

        <footer className={styles.foot}>
          <span>Sujith Kumar Anand · Product Design Leader</span>
          <span>Open to Director / Head of Design</span>
        </footer>
      </div>
    </div>
  );
}
