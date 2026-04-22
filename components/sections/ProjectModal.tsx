"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Project } from "@/lib/content";
import { Button } from "@/components/ui/Button";
import ForgeScreen from "./ForgeScreen";
import styles from "./ProjectModal.module.css";

/* Project detail modal.
 *
 * Three render modes:
 *   1. project.webView present → full-bleed desktop browser fills the
 *      modal; a floating glass card overlays the browser and swaps
 *      between header / frontend / backend content as the user scrolls.
 *      A clip-path split driven by the same scroll progress reveals the
 *      backend screenshot beneath the frontend.
 *   2. project.repo present (Forge) → ForgeScreen repo card inside an
 *      iPhone frame. No split.
 *   3. Legacy fallback → iPhone + screenshot gallery.
 *
 * Scroll progress on the dialog is pushed to a CSS variable that drives
 * both the split clip-paths and a few secondary effects (glow, tilt).
 */
export default function ProjectModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  const open = Boolean(project);
  const dialogRef = useRef<HTMLDivElement>(null);
  /* `zone` is the only scroll-derived React state that actually mutates
   * the tree. The continuous split value is pushed into a CSS variable
   * imperatively so the scroll handler never re-renders. */
  const [zone, setZone] = useState<Zone>("header");
  const zoneRef = useRef<Zone>("header");

  useEffect(() => {
    if (!project) return;
    const d = dialogRef.current;
    if (!d) return;
    d.scrollTop = 0;
    d.style.setProperty("--split", "0");
    zoneRef.current = "header";
    setZone("header");
  }, [project?.num]);

  useEffect(() => {
    if (!open) return;
    const d = dialogRef.current;
    if (!d) return;

    /* rAF-throttled scroll handler. Writes the normalized scroll value
     * straight to a CSS variable on the dialog (the split reveal reads
     * it) and only calls setZone when the user actually crosses a zone
     * boundary — typically 2× per full scroll, not 60× per second. */
    let rafId = 0;
    const update = () => {
      rafId = 0;
      const max = d.scrollHeight - d.clientHeight;
      const p = max <= 0 ? 0 : Math.min(1, Math.max(0, d.scrollTop / max));
      d.style.setProperty("--split", String(p));
      const next: Zone = p < 0.28 ? "header" : p < 0.68 ? "frontend" : "backend";
      if (next !== zoneRef.current) {
        zoneRef.current = next;
        setZone(next);
      }
    };
    const onScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(update);
    };

    d.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => {
      d.removeEventListener("scroll", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [open, project?.num]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const galleryImages = useMemo(() => {
    if (!project) return [];
    if (project.gallery?.length) return project.gallery;
    if (project.image) return [project.image];
    return [];
  }, [project]);

  const [galleryIndex, setGalleryIndex] = useState(0);
  useEffect(() => {
    setGalleryIndex(0);
  }, [project?.num]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (!project?.webView && !project?.repo && galleryImages.length > 1) {
        if (e.key === "ArrowLeft") {
          setGalleryIndex(
            (i) => (i - 1 + galleryImages.length) % galleryImages.length
          );
        } else if (e.key === "ArrowRight") {
          setGalleryIndex((i) => (i + 1) % galleryImages.length);
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, galleryImages.length, onClose, project]);

  const isWebView = Boolean(project?.webView);
  const isForge = Boolean(project?.repo);

  return (
    <>
      <div
        className={`${styles.backdrop} ${open ? styles.open : ""}`}
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        ref={dialogRef}
        className={`${styles.dialog} ${open ? styles.dialogOpen : ""} ${
          isWebView ? styles.dialogWeb : ""
        }`}
        role="dialog"
        aria-modal="true"
        aria-label={project?.title || "Project details"}
      >
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className={styles.close}
          data-cursor="link"
        >
          ×
        </button>
        {project && isWebView && <WebView project={project} zone={zone} />}
        {project && isForge && <PhoneFallback project={project} isForge />}
        {project && !isWebView && !isForge && (
          <PhoneFallback
            project={project}
            images={galleryImages}
            index={galleryIndex}
            setIndex={setGalleryIndex}
          />
        )}
      </div>
    </>
  );
}

/* =========================================================================
 * Web-view mode — full-bleed browser backdrop + floating info card.
 * ========================================================================= */

type Zone = "header" | "frontend" | "backend";

function WebView({ project, zone }: { project: Project; zone: Zone }) {
  const wv = project.webView!;

  return (
    <div className={styles.webInner}>
      {/* Snap targets — three invisible anchors the browser snaps between
       * so a small flick advances one zone instead of a long scroll. */}
      <div className={`${styles.snapPoint} ${styles.snapHeader}`} aria-hidden="true" />
      <div className={`${styles.snapPoint} ${styles.snapFrontend}`} aria-hidden="true" />
      <div className={`${styles.snapPoint} ${styles.snapBackend}`} aria-hidden="true" />

      <div className={styles.stickyBg}>
        <div className={styles.browserGlow} aria-hidden="true" />
        <div className={styles.browser}>
          <div className={styles.browserChrome}>
            <div className={styles.lights}>
              <span style={{ background: "#ff5f57" }} />
              <span style={{ background: "#febc2e" }} />
              <span style={{ background: "#28c840" }} />
            </div>
            <div className={styles.urlBar}>
              <span className={styles.lock} aria-hidden="true">
                ⌠
              </span>
              <span className={styles.url}>{wv.url}</span>
            </div>
            <div className={styles.chromeRight} aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
          </div>
          <div className={styles.browserViewport}>
            {/* Backend sits underneath — fully visible once the two
             * frontend halves have parted. */}
            <div className={styles.paneBackend}>
              <Image
                src={wv.backend.image}
                alt={`${project.title} backend`}
                fill
                sizes="92vw"
              />
            </div>
            {/* Frontend is split down the vertical centerline; each half
             * translates outward as --split grows. At progress 1 both
             * halves are fully off-screen, revealing backend entirely. */}
            <div className={`${styles.paneFrontHalf} ${styles.paneFrontLeft}`}>
              <Image
                src={wv.frontend.image}
                alt={`${project.title} frontend`}
                fill
                sizes="92vw"
                priority
              />
            </div>
            <div className={`${styles.paneFrontHalf} ${styles.paneFrontRight}`}>
              <Image
                src={wv.frontend.image}
                alt=""
                aria-hidden="true"
                fill
                sizes="92vw"
              />
            </div>
          </div>
        </div>

        {/* Floating info card — swaps content based on scroll zone. */}
        <div className={styles.cardStage} aria-live="polite">
          <InfoCard
            kind="header"
            active={zone === "header"}
            project={project}
          />
          <InfoCard
            kind="frontend"
            active={zone === "frontend"}
            project={project}
            info={wv.frontend}
          />
          <InfoCard
            kind="backend"
            active={zone === "backend"}
            project={project}
            info={wv.backend}
          />
        </div>

        {/* Progress rail — bottom edge, follows the --split CSS var
         * directly so it updates without a React re-render. */}
        <div className={styles.progressRail} aria-hidden="true">
          <div className={styles.progressFill} />
          <span className={styles.progressMarker}>
            {zone === "header" && "— intro"}
            {zone === "frontend" && "— frontend"}
            {zone === "backend" && "— backend"}
          </span>
        </div>
      </div>
    </div>
  );
}

function InfoCard({
  kind,
  active,
  project,
  info,
}: {
  kind: "header" | "frontend" | "backend";
  active: boolean;
  project: Project;
  info?: {
    title: string;
    blurb: string;
    bullets: string[];
  };
}) {
  return (
    <article
      className={`${styles.card} ${styles[`card_${kind}`]}`}
      data-active={active ? "true" : "false"}
    >
      {kind === "header" ? (
        <>
          <span className={styles.cardKind}>
            <span className={styles.cardKindDot} />
            {project.num} · {project.category} · {project.year}
          </span>
          <h2 className={styles.cardTitle}>{project.title}</h2>
          <p className={styles.cardItalic}>{project.italic}</p>
          <p className={styles.cardBlurb}>{project.tagline}</p>
          <div className={styles.cardStack}>
            {project.stack.map((s) => (
              <span key={s} className={styles.cardChip}>
                {s}
              </span>
            ))}
          </div>
          <div className={styles.cardActions}>
            <Button
              href={project.link}
              variant="solid"
              {...{ target: "_blank", rel: "noopener noreferrer" }}
            >
              Open Live Site
            </Button>
          </div>
          <p className={styles.cardHint}>scroll to explore ↓</p>
        </>
      ) : (
        <>
          <span className={styles.cardKind}>
            <span className={styles.cardKindDot} />
            {kind === "frontend" ? "01 · Frontend" : "02 · Backend"}
          </span>
          <h3 className={styles.cardSubtitle}>{info!.title}</h3>
          <p className={styles.cardBlurb}>{info!.blurb}</p>
          <ul className={styles.cardList}>
            {info!.bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </>
      )}
    </article>
  );
}

/* =========================================================================
 * Phone/Forge fallback — kept for projects without webView data.
 * ========================================================================= */

function PhoneFallback({
  project,
  isForge = false,
  images = [],
  index = 0,
  setIndex,
}: {
  project: Project;
  isForge?: boolean;
  images?: string[];
  index?: number;
  setIndex?: (i: number | ((i: number) => number)) => void;
}) {
  const multiple = images.length > 1;
  return (
    <div className={styles.inner}>
      <div className={styles.prose}>
        <p className={styles.num}>
          {project.num} · {project.category} · {project.year}
        </p>
        <h2 className={styles.title}>{project.title}</h2>
        <p className={styles.italicLine}>{project.italic}</p>
        <p className={styles.tagline}>{project.tagline}</p>
        <div className={styles.stack}>
          {project.stack.map((s) => (
            <span key={s} className={styles.stackChip}>
              {s}
            </span>
          ))}
        </div>
        <Button
          href={project.link}
          variant="solid"
          {...{ target: "_blank", rel: "noopener noreferrer" }}
        >
          {isForge ? "View on GitHub" : "Open Live Site"}
        </Button>
      </div>

      <div className={styles.phoneCol}>
        <div className={styles.phoneStage}>
          <div className={styles.phoneGlow} aria-hidden="true" />
          <div className={styles.phone}>
            <div className={styles.phoneScreen}>
              {isForge ? (
                <ForgeScreen project={project} />
              ) : (
                images.map((src, i) => (
                  <div
                    key={src}
                    className={`${styles.screenImg} ${
                      i === index ? styles.screenImgActive : ""
                    }`}
                    aria-hidden={i !== index}
                  >
                    <Image
                      src={src}
                      alt={`${project.title} screenshot ${i + 1}`}
                      fill
                      sizes="(max-width: 900px) 70vw, 340px"
                    />
                  </div>
                ))
              )}
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

          {multiple && !isForge && setIndex && (
            <>
              <button
                type="button"
                aria-label="Previous screenshot"
                onClick={() =>
                  setIndex((i) => (i - 1 + images.length) % images.length)
                }
                className={`${styles.arrow} ${styles.arrowPrev}`}
                data-cursor="link"
              >
                ‹
              </button>
              <button
                type="button"
                aria-label="Next screenshot"
                onClick={() => setIndex((i) => (i + 1) % images.length)}
                className={`${styles.arrow} ${styles.arrowNext}`}
                data-cursor="link"
              >
                ›
              </button>
            </>
          )}
        </div>

        {multiple && !isForge && setIndex && (
          <div className={styles.dots} role="tablist" aria-label="Screenshots">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Screenshot ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`${styles.dot} ${
                  i === index ? styles.dotActive : ""
                }`}
                data-cursor="link"
              />
            ))}
            <span className={styles.counter}>
              {String(index + 1).padStart(2, "0")}
              <span className={styles.counterSep}>/</span>
              {String(images.length).padStart(2, "0")}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
