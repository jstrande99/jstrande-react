"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { gsapRegister, prefersReducedMotion } from "@/lib/gsap";
import styles from "./PageTransition.module.css";

/* Global page-transition overlay: six horizontal rows sweep in L→R, hold,
 * then sweep out L→R while the page content behind has already updated.
 * Fires on pathname change. First mount is a reveal-only (no enter). */
export default function PageTransition() {
  const pathname = usePathname();
  const overlay = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLDivElement>(null);
  const firstMount = useRef(true);

  useEffect(() => {
    if (firstMount.current) {
      firstMount.current = false;
      /* Intro sweep-out only on first load so no flash of blank screen. */
      playIntro();
      return;
    }
    if (prefersReducedMotion()) return;
    playTransition();
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [pathname]);

  function playIntro() {
    const gsap = gsapRegister();
    const rows = overlay.current?.querySelectorAll<HTMLElement>(`.${styles.row}`);
    if (!rows) return;
    gsap.set(rows, { scaleX: 1, transformOrigin: "right center" });
    if (label.current) gsap.set(label.current, { opacity: 0 });
    gsap.to(rows, {
      scaleX: 0,
      duration: 0.9,
      ease: "power3.inOut",
      stagger: { each: 0.05, from: "start" },
      delay: 0.15,
      onComplete: () => {
        gsap.set(rows, { transformOrigin: "left center" });
      },
    });
  }

  function playTransition() {
    const gsap = gsapRegister();
    const rows = overlay.current?.querySelectorAll<HTMLElement>(`.${styles.row}`);
    if (!rows) return;
    const tl = gsap.timeline();
    tl.set(rows, { scaleX: 0, transformOrigin: "left center" })
      .to(rows, {
        scaleX: 1,
        duration: 0.55,
        ease: "power3.in",
        stagger: 0.04,
      })
      .fromTo(
        label.current,
        { opacity: 0, scale: 0.96 },
        { opacity: 1, scale: 1, duration: 0.35, ease: "power2.out" },
        "-=0.2"
      )
      .to(
        label.current,
        { opacity: 0, duration: 0.3, ease: "power2.in" },
        "+=0.12"
      )
      .to(rows, {
        scaleX: 0,
        duration: 0.65,
        ease: "power3.out",
        stagger: { each: 0.04, from: "start" },
        transformOrigin: "right center",
      })
      .set(rows, { transformOrigin: "left center" });
  }

  return (
    <>
      <div ref={overlay} className={styles.overlay} aria-hidden="true">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className={styles.row} />
        ))}
      </div>
      <div ref={label} className={styles.label} aria-hidden="true">
        <em>JS</em>
      </div>
    </>
  );
}
