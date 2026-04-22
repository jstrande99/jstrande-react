"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FLAGSHIP_PROJECTS, type Project } from "@/lib/content";
import { gsapRegister, prefersReducedMotion } from "@/lib/gsap";
import SectionLabel from "@/components/ui/SectionLabel";
import Reveal from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import ForgeScreen from "./ForgeScreen";
import ProjectModal from "./ProjectModal";
import styles from "./Work.module.css";

/* Work section — sticky phone scroll reel (Lifelogx / Apple pattern).
 *
 * Layout:
 *   - Two-column grid across the whole reel.
 *   - Left column: narrative phases, each 100vh, stacked in normal flow.
 *   - Right column: sticky phone stage (top: 0, 100vh), always centered
 *     while the reel is in view.
 *   - Inside the sticky phone: all screens stacked absolutely in the
 *     screen cutout, active one fades in via opacity.
 *   - IntersectionObserver tracks which narrative is at the viewport
 *     center and sets activeIndex accordingly.
 *   - GSAP scrub adds a subtle rotateY sway tied to scroll progress for
 *     dimensionality; respects reduced-motion.
 *
 * Forge has no screenshots, so its screen renders a styled repo-stats
 * card inline (same iPhone shell, different contents).
 */
export default function Work() {
  const reelRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [inView, setInView] = useState(false);
  const [selected, setSelected] = useState<Project | null>(null);
  const slides = FLAGSHIP_PROJECTS;

  /* Active-phase tracking: IntersectionObserver on the invisible scroll
   * markers that span the full reel. Each marker is 1/total of the reel
   * height. Whichever crosses the viewport midline wins. */
  useEffect(() => {
    const reel = reelRef.current;
    if (!reel) return;
    const markers = reel.querySelectorAll<HTMLElement>(`.${styles.scrollMarker}`);
    if (!markers.length) return;

    const ratios = new Map<number, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const idx = Number((e.target as HTMLElement).dataset.idx);
          if (Number.isNaN(idx)) continue;
          ratios.set(idx, e.intersectionRatio);
        }
        let bestIdx = 0;
        let bestRatio = -1;
        ratios.forEach((r, i) => {
          if (r > bestRatio) {
            bestRatio = r;
            bestIdx = i;
          }
        });
        setActiveIndex((prev) => (prev === bestIdx ? prev : bestIdx));
        setInView(bestRatio > 0.1);
      },
      {
        /* Narrow midline band — marker must reach viewport center. */
        rootMargin: "-45% 0px -45% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    markers.forEach((m) => observer.observe(m));
    return () => observer.disconnect();
  }, []);

  /* Subtle GSAP scrub on phone transforms — rotateY sway + gentle scale
   * breath as user scrolls through the reel. */
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const reel = reelRef.current;
    const phone = phoneRef.current;
    if (!reel || !phone) return;

    const gsap = gsapRegister();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        phone,
        { rotateY: -6 },
        {
          rotateY: 6,
          ease: "none",
          scrollTrigger: {
            trigger: reel,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        }
      );
    }, reel);

    return () => ctx.revert();
  }, []);

  return (
    <section id="work" className={styles.section}>
      <div className={styles.intro}>
        <Reveal>
          <SectionLabel index="03">Selected Work</SectionLabel>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className={styles.display}>
            Shipped <em>in production.</em>
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p className={styles.introMeta}>
            Four flagship projects from Lange Logic.
          </p>
        </Reveal>
      </div>

      <div
        ref={reelRef}
        className={styles.reel}
        style={{ height: `${slides.length * 100}vh` }}
      >
        {/* Invisible scroll markers — one per project, evenly dividing
         * the reel's total height. IntersectionObserver watches them to
         * drive activeIndex. */}
        <div className={styles.scrollMarkers} aria-hidden="true">
          {slides.map((p, i) => (
            <div key={p.num} className={styles.scrollMarker} data-idx={i} />
          ))}
        </div>

        {/* Single sticky inner — pins both columns to the viewport
         * center for the entire scroll through the reel. Content inside
         * swaps in place via opacity cross-fade; nothing scrolls
         * through the viewport. */}
        <div className={styles.reelInner}>
          {/* LEFT — narrative (all stacked, only active visible) */}
          <div className={styles.narrativeCol}>
            <div className={styles.narrativeSlot}>
              {slides.map((p, i) => (
                <Narrative
                  key={p.num}
                  project={p}
                  active={i === activeIndex}
                  onOpen={() => setSelected(p)}
                />
              ))}
            </div>
          </div>

          {/* RIGHT — phone + stats */}
          <div className={styles.phoneCol}>
            <div className={styles.phoneStage}>
              <div className={`${styles.stats} ${inView ? styles.statsVisible : ""}`}>
                {slides[activeIndex]?.stats?.slice(0, 4).map((s) => (
                  <div key={s.label} className={styles.stat}>
                    <span className={styles.statValue}>{s.value}</span>
                    <span className={styles.statLabel}>{s.label}</span>
                  </div>
                ))}
              </div>

              <div ref={phoneRef} className={styles.phone}>
                <div className={styles.phoneGlow} aria-hidden />
                <div className={styles.phoneScreen}>
                  {slides.map((p, i) => (
                    <div
                      key={p.num}
                      className={`${styles.screenImg} ${i === activeIndex ? styles.screenImgActive : ""}`}
                      aria-hidden={i !== activeIndex}
                    >
                      {p.repo ? (
                        <ForgeScreen project={p} />
                      ) : (
                        (p.gallery?.[0] ?? p.image) && (
                          <Image
                            src={p.gallery?.[0] ?? p.image!}
                            alt={`${p.title} screenshot`}
                            fill
                            sizes="360px"
                          />
                        )
                      )}
                    </div>
                  ))}
                </div>
                {/* iPhone hardware overlay */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/iphone-14-pro.webp"
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  decoding="async"
                  width="1180"
                  height="2264"
                  className={styles.phoneFrame}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile fallback — stacked cards, no sticky/scroll-magic. */}
      <div className={styles.mobileStack}>
        {slides.map((p) => (
          <div key={p.num} className={styles.mobileRow}>
            <Narrative project={p} active onOpen={() => setSelected(p)} />
            <div className={styles.phoneStage}>
              <div className={styles.phone}>
                <div className={styles.phoneGlow} aria-hidden />
                <div className={styles.phoneScreen}>
                  <div className={`${styles.screenImg} ${styles.screenImgActive}`}>
                    {p.repo ? (
                      <ForgeScreen project={p} />
                    ) : (
                      (p.gallery?.[0] ?? p.image) && (
                        <Image
                          src={p.gallery?.[0] ?? p.image!}
                          alt={`${p.title} screenshot`}
                          fill
                          sizes="60vw"
                        />
                      )
                    )}
                  </div>
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/iphone-14-pro.webp"
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  decoding="async"
                  width="1180"
                  height="2264"
                  className={styles.phoneFrame}
                />
              </div>
            </div>
            {p.stats && p.stats.length > 0 && (
              <div className={`${styles.stats} ${styles.statsVisible}`}>
                {p.stats.slice(0, 4).map((s) => (
                  <div key={s.label} className={styles.stat}>
                    <span className={styles.statValue}>{s.value}</span>
                    <span className={styles.statLabel}>{s.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Narrative({
  project,
  active,
  onOpen,
}: {
  project: Project;
  active: boolean;
  onOpen: () => void;
}) {
  return (
    <div
      className={`${styles.narrative} ${active ? styles.narrativeActive : ""}`}
    >
      <span className={styles.index}>
        {project.num} / 0{FLAGSHIP_PROJECTS.length}
      </span>
      <div className={styles.meta}>
        <span className={styles.metaCategory}>{project.category}</span>
        <span>·</span>
        <span>{project.year}</span>
      </div>
      <h3 className={styles.title}>{project.title}</h3>
      <p className={styles.italicLine}>{project.italic}</p>
      <p className={styles.tagline}>{project.tagline}</p>
      <div className={styles.chips}>
        {project.stack.map((s) => (
          <span key={s} className={styles.chip}>
            {s}
          </span>
        ))}
      </div>
      <div className={styles.ctas}>
        <Button onClick={onOpen} variant="ghost" arrow>
          Case Study
        </Button>
        <Button
          href={project.link}
          variant="solid"
          {...{ target: "_blank", rel: "noopener noreferrer" }}
        >
          {project.repo ? "View on GitHub" : "Live Site"}
        </Button>
      </div>
    </div>
  );
}

