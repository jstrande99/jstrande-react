"use client";

import { useEffect, useRef } from "react";
import { gsapRegister, prefersReducedMotion } from "@/lib/gsap";
import { Button } from "@/components/ui/Button";
import styles from "./Hero.module.css";

/* Hero
 *  Layers (back → front):
 *    1. Static blurred gradient orbs (GPU-cached)
 *    2. Stroked watermark italics (parallax on scroll)
 *    3. Headline — blur-focus reveal per line, not per letter
 *    4. Intro pill + tagline + CTAs
 *    5. Bottom scroll-cue line */
export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const watermark = useRef<HTMLDivElement>(null);
  const tagline = useRef<HTMLParagraphElement>(null);
  const ctas = useRef<HTMLDivElement>(null);
  const scrollHint = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = prefersReducedMotion();
    const gsap = gsapRegister();

    const titleEl = titleRef.current;
    const greeting = titleEl?.querySelector<HTMLElement>(`.${styles.greeting}`);
    const lines = titleEl?.querySelectorAll<HTMLElement>(`.${styles.line}`);

    if (reduced) {
      gsap.set(
        [tagline.current, ctas.current, scrollHint.current],
        { opacity: 1, y: 0 }
      );
      if (greeting) gsap.set(greeting, { opacity: 1, y: 0, filter: "blur(0px)" });
      if (lines) gsap.set(lines, { opacity: 1, y: 0, filter: "blur(0px)" });
      return;
    }

    const tl = gsap.timeline();

    tl.to(
        greeting || [],
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.75,
          ease: "power3.out",
        }
      )
      .to(
        lines || [],
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.1,
          ease: "expo.out",
          stagger: 0.12,
        },
        "-=0.45"
      )
      .to(
        tagline.current,
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
        "-=0.6"
      )
      .to(
        ctas.current,
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
        "-=0.5"
      )
      .to(
        scrollHint.current,
        { opacity: 1, duration: 0.6 },
        "-=0.3"
      );

    /* Scroll-driven parallax exit. */
    const parallax = gsap.to(titleRef.current, {
      yPercent: -10,
      scale: 1.04,
      opacity: 0,
      ease: "none",
      scrollTrigger: {
        trigger: root.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    const watermarkParallax = gsap.to(watermark.current, {
      yPercent: -24,
      scale: 1.15,
      ease: "none",
      scrollTrigger: {
        trigger: root.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    return () => {
      tl.kill();
      parallax.scrollTrigger?.kill();
      parallax.kill();
      watermarkParallax.scrollTrigger?.kill();
      watermarkParallax.kill();
    };
  }, []);

  return (
    <section id="home" ref={root} className={styles.hero}>
      <div className={styles.mesh} aria-hidden="true">
        <div className={`${styles.orb} ${styles.orb1}`} />
        <div className={`${styles.orb} ${styles.orb2}`} />
      </div>

      <div ref={watermark} className={styles.watermark} aria-hidden="true">
        <span>JS</span>
      </div>

      <div className={styles.inner}>
        <h1 ref={titleRef} className={styles.title}>
          <span className={styles.greeting} aria-hidden="true">
            Hi, I&rsquo;m
          </span>
          <span className={styles.line}>JORDAN</span>
          <span
            className={`${styles.line} ${styles.italic} ${styles.italicAccent}`}
          >
            Strande.
          </span>
          <span className="sr-only">Hi, I&rsquo;m Jordan Strande.</span>
        </h1>

        <p ref={tagline} className={styles.tagline}>
          Full-stack &amp; AI engineer shipping LLM-powered products, edge SEO
          infrastructure, and mobile CI/CD. Co-founder of{" "}
          <a
            href="https://langelogic.com"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="link"
          >
            Lange Logic
          </a>
          .
        </p>

        <div ref={ctas} className={styles.ctas}>
          <Button href="/projects" variant="solid">
            View Work
          </Button>

          {/* Scroll cue splits the CTAs — gives it space to breathe
           * instead of stacking below and visually colliding with the
           * right-side button. */}
          <div ref={scrollHint} className={styles.scrollHint} aria-hidden="true">
            <span className={styles.scrollHintLine} />
            <span className={styles.scrollHintLabel}>Scroll</span>
          </div>

          <Button href="/contact">Contact</Button>
        </div>
      </div>
    </section>
  );
}
