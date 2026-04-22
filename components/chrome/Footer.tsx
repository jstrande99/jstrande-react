import Link from "next/link";
import { SITE, NAV_LINKS } from "@/lib/content";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div>
          <p className={styles.word}>
            Let&rsquo;s <em>build</em>.
          </p>
        </div>

        <div className={styles.col}>
          <h4>Navigate</h4>
          <ul>
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} data-cursor="link">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.col}>
          <h4>Elsewhere</h4>
          <ul>
            <li>
              <a
                href={SITE.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="link"
              >
                GitHub
              </a>
            </li>
            <li>
              <a
                href={SITE.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="link"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href={SITE.socials.langelogic}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="link"
              >
                Lange Logic
              </a>
            </li>
            <li>
              <a href={`mailto:${SITE.email}`} data-cursor="link">
                {SITE.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.bottom}>
        <span className={styles.bottomLeft}>
          <span className={styles.dot} />© {SITE.year} Jordan Strande
        </span>
        <span className={styles.bottomRight}>
          Built with Next.js · GSAP · Cabinet Grotesk
        </span>
      </div>
    </footer>
  );
}
