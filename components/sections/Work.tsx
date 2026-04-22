"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FLAGSHIP_PROJECTS, type Project } from "@/lib/content";
import { gsapRegister, prefersReducedMotion, ScrollTrigger } from "@/lib/gsap";
import SectionLabel from "@/components/ui/SectionLabel";
import Reveal from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
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

/* ------------------------------------------------------------------ */
/* Forge phone-screen — renders inside the iPhone bezel. Dark gradient
 * background, structured repo dossier tuned to the narrow portrait
 * canvas. */
function ForgeScreen({ project }: { project: Project }) {
  const repo = project.repo!;
  return (
    <div className={styles.forgeScreen}>
      <div className={styles.forgeTop}>
        <span className={styles.forgeOwner}>
          {repo.owner}
          <span className={styles.forgeOwnerSlash}>/</span>
          <span className={styles.forgeOwnerName}>{repo.name}</span>
        </span>
        <span className={styles.forgeLicense}>{repo.license}</span>
      </div>

      <h4 className={styles.forgeTitle}>{project.title}</h4>
      <p className={styles.forgeTagline}>{project.italic}</p>

      <span className={styles.forgeLang}>
        <span className={styles.forgeLangDot} aria-hidden />
        {repo.language}
        <span className={styles.forgeLangPct}>{repo.languagePct}</span>
      </span>

      <div className={styles.forgeStatsGrid}>
        {(project.stats ?? []).slice(0, 4).map((s) => (
          <div key={s.label} className={styles.forgeStat}>
            <span className={styles.forgeStatValue}>{s.value}</span>
            <span className={styles.forgeStatLabel}>{s.label}</span>
          </div>
        ))}
      </div>

      <ul className={styles.forgeFeatures}>
        {repo.features.slice(0, 5).map((f) => (
          <li key={f}>{f}</li>
        ))}
      </ul>

      <div className={styles.forgeFooter}>
        <span className={styles.forgeRelease}>{repo.release}</span>
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.forgeCta}
        >
          <GhIcon /> repo
        </a>
      </div>
    </div>
  );
}

function GhIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55v-2.17c-3.2.69-3.87-1.37-3.87-1.37-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.56-.29-5.25-1.28-5.25-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.19 1.18a11 11 0 0 1 5.81 0c2.22-1.49 3.19-1.18 3.19-1.18.63 1.59.23 2.77.11 3.06.74.81 1.19 1.84 1.19 3.1 0 4.42-2.69 5.39-5.26 5.68.41.35.77 1.04.77 2.1v3.11c0 .3.21.66.79.55A10.51 10.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
    </svg>
  );
}
