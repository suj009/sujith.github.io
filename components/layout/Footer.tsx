import { Reveal } from "@/components/motion/Reveal";
import styles from "./Footer.module.css";

const CONTACTS = [
  { href: "mailto:sujithkumaranand@gmail.com", label: "✉ sujithkumaranand@gmail.com", external: false },
  { href: "https://www.linkedin.com/in/suj009", label: "in · LinkedIn", external: true },
  { href: "https://medium.com/@suj009", label: "✎ Medium", external: true },
];

/**
 * Site footer, and the page's contact section.
 *
 * `data-nav-dark` is what tells <Nav> to flip to its dark palette while this
 * is behind the bar — see the comment in Nav.tsx.
 *
 * The copyright year is resolved at build time rather than by a script on load
 * (the static site set it via document.getElementById("yr")). A rebuild happens
 * on every push, so it stays current without shipping JS for it.
 */
export function Footer({ cvHref = "/cv/" }: { cvHref?: string }) {
  const year = new Date().getFullYear();

  return (
    <footer id="contact" className={styles.footer} data-nav-dark>
      <div className={styles.inner}>
        <Reveal>
          <h2 className={styles.headline}>
            Let&rsquo;s build something <span className={styles.sig}>worth using.</span>
          </h2>
          <p className={styles.status}>
            <span className={styles.pip}>●</span> Open to Director / Head of Design roles ·
            Bengaluru or remote
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <div className={styles.contacts}>
            {CONTACTS.map((contact) => (
              <a
                key={contact.href}
                href={contact.href}
                {...(contact.external ? { target: "_blank", rel: "noopener" } : {})}
              >
                {contact.label}
              </a>
            ))}
            <a href={cvHref}>◆ CV</a>
          </div>
        </Reveal>

        <div className={styles.fine}>
          <span>© {year} Sujith Kumar Anand</span>
          <span>Designed &amp; built by me — with AI.</span>
        </div>
      </div>
    </footer>
  );
}
