"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV_LINKS } from "@/lib/content";
import styles from "./Nav.module.css";

/* Persistent frosted nav. Stays visible at all scroll positions; only
 * picks up the blurred background + hairline border once the user has
 * scrolled past the top. */
export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    /* rAF-coalesced scroll read — one state update per paint. */
    let raf = 0;
    const read = () => {
      raf = 0;
      const y = window.scrollY;
      const next = y > 24;
      setScrolled((prev) => (prev === next ? prev : next));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(read);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    read();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const barClass = [styles.bar, scrolled ? styles.scrolled : ""]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      <header className={barClass}>
        <nav className={styles.nav} aria-label="Primary">
          <Link href="/" className={styles.brand} aria-label="Home">
            Jordan Strande
            <span className={styles.brandMark}>JS</span>
          </Link>

          <ul className={styles.links}>
            {NAV_LINKS.map((l) => {
              const active = pathname === l.href;
              return (
                <li key={l.href} className={styles.linkItem}>
                  <Link
                    href={l.href}
                    className={`${styles.link} ${active ? styles.linkActive : ""}`}
                    data-cursor="link"
                  >
                    <span className={styles.linkNum}>{l.index}</span>
                    {l.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            className={`${styles.toggle} ${menuOpen ? styles.toggleOpen : ""}`}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span />
            <span />
            <span />
          </button>
        </nav>
      </header>

      <div
        className={`${styles.sheet} ${menuOpen ? styles.sheetOpen : ""}`}
        aria-hidden={!menuOpen}
      >
        {NAV_LINKS.map((l) => {
          const active = pathname === l.href;
          return (
            <Link
              key={l.href}
              href={l.href}
              className={`${styles.sheetLink} ${active ? styles.sheetLinkActive : ""}`}
            >
              <span className={styles.sheetLinkNum}>{l.index}</span>
              {l.label}
            </Link>
          );
        })}
      </div>
    </>
  );
}
