"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Cursor.module.css";

/* Minimal custom cursor — single gold dot, rAF-coalesced position
 * updates, scales on interactive hover. No ring, no text, no modes.
 *
 * DOM: `.wrap` handles position (JS writes transform), `.dot` inside
 * handles scale (CSS class toggle). Separating the two axes keeps the
 * position update cheap (1 transform write per frame) and the scale
 * smooth (CSS transition). */
export default function Cursor() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    setEnabled(mq.matches);
    const onChange = () => setEnabled(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const wrap = wrapRef.current;
    const dot = dotRef.current;
    if (!wrap || !dot) return;

    let raf = 0;
    const pos = { x: 0, y: 0 };

    const tick = () => {
      raf = 0;
      wrap.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
    };

    const onMove = (e: PointerEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const onOver = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      /* Text input first — label hit-test below would otherwise match
       * labels wrapping inputs. */
      const textEl = target.closest<HTMLElement>(
        'input:not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, [contenteditable="true"]'
      );
      if (textEl) {
        dot.classList.add(styles.text);
        dot.classList.remove(styles.link);
        return;
      }
      const linkEl = target.closest<HTMLElement>(
        'a, button, [role="button"], [data-cursor], select, label'
      );
      if (linkEl) {
        dot.classList.add(styles.link);
        dot.classList.remove(styles.text);
        return;
      }
      dot.classList.remove(styles.link, styles.text);
    };

    const onLeave = () => dot.classList.remove(styles.link, styles.text);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    window.addEventListener("pointerleave", onLeave, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      window.removeEventListener("pointerleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [enabled]);

  if (!enabled) return null;
  return (
    <div ref={wrapRef} className={styles.wrap} aria-hidden="true">
      <div ref={dotRef} className={styles.dot} />
    </div>
  );
}
