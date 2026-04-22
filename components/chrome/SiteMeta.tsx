"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { SITE } from "@/lib/content";
import styles from "./SiteMeta.module.css";

const PATH_LABELS: Record<string, { index: string; label: string }> = {
  "/": { index: "01", label: "Home" },
  "/projects": { index: "02", label: "Work" },
  "/resume": { index: "03", label: "Resume" },
  "/contact": { index: "04", label: "Contact" },
};

/* Four fixed corners of metadata. Sits above the page at z-40 but under the
 * nav, cursor, and page-transition overlay. Never pointer-intrusive. On
 * home, the active section is inferred from which section intersects the
 * center of the viewport. */
export default function SiteMeta() {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState<string>("Home");

  useEffect(() => {
    if (pathname !== "/") {
      setActiveSection(PATH_LABELS[pathname]?.label || "");
      return;
    }
    /* Derive the active section via IntersectionObserver instead of polling
     * scrollY on every frame — one observation per section, browser handles
     * the math in a separate pipeline. Each section exposes a sentinel at
     * the viewport's vertical center. */
    const sections: { id: string; label: string }[] = [
      { id: "home", label: "Hero" },
      { id: "about", label: "About" },
      { id: "work", label: "Work" },
      { id: "skills", label: "Toolkit" },
    ];

    const active = new Map<string, number>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          active.set(e.target.id, e.intersectionRatio);
        }
        /* Pick the section with the highest visible ratio. */
        let bestLabel = "Hero";
        let bestRatio = -1;
        for (const s of sections) {
          const r = active.get(s.id) ?? 0;
          if (r > bestRatio) {
            bestRatio = r;
            bestLabel = s.label;
          }
        }
        setActiveSection((prev) => (prev === bestLabel ? prev : bestLabel));
      },
      {
        /* Treat a horizontal band through the viewport middle as the
         * "active" region; whichever section has the most area inside
         * this band wins. */
        rootMargin: "-40% 0px -40% 0px",
        threshold: [0, 0.1, 0.5, 1],
      }
    );

    for (const s of sections) {
      const el = document.getElementById(s.id);
      if (el) io.observe(el);
    }

    return () => io.disconnect();
  }, [pathname]);

  const { index, label } = PATH_LABELS[pathname] || PATH_LABELS["/"];

  return (
    <div className={styles.wrap} aria-hidden="true">
      <span className={`${styles.corner} ${styles.topLeft}`}>
        <span className={styles.bracket}>[</span>
        PORTFOLIO · MMXXVI
        <span className={styles.bracket}>]</span>
      </span>

      <span className={`${styles.corner} ${styles.topRight}`}>
        <span className={styles.activeIndex}>{index}</span>
        <span>/</span>
        <span>{label}</span>
      </span>

      <span className={`${styles.corner} ${styles.bottomLeft}`}>
        <span className={styles.statusDot} />
        Currently · {activeSection}
      </span>

      <span className={`${styles.corner} ${styles.bottomRight}`}>
        {SITE.location.toUpperCase()} · 39.74° N
      </span>
    </div>
  );
}
