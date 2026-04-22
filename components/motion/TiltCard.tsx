"use client";

import { useCallback, useRef } from "react";
import styles from "./TiltCard.module.css";

type Props = {
  children: React.ReactNode;
  max?: number;
  scale?: number;
  className?: string;
};

/* Cursor-tracked 3D tilt with a radial glare that follows the pointer.
 * Pure CSS + JS — no GSAP. Glare intensity is encoded as CSS custom
 * properties --mx and --my. */
export default function TiltCard({
  children,
  max = 10,
  scale = 1.02,
  className,
}: Props) {
  const wrap = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const raf = useRef(0);

  const onMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const el = wrap.current;
      const target = inner.current;
      if (!el || !target) return;
      const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
      if (!mq.matches) return;

      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      const rx = (py - 0.5) * -2 * max;
      const ry = (px - 0.5) * 2 * max;

      if (!raf.current) {
        raf.current = requestAnimationFrame(() => {
          raf.current = 0;
          target.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) scale(${scale})`;
          el.style.setProperty("--mx", `${px * 100}%`);
          el.style.setProperty("--my", `${py * 100}%`);
        });
      }
    },
    [max, scale]
  );

  const onLeave = useCallback(() => {
    const target = inner.current;
    if (!target) return;
    target.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
  }, []);

  return (
    <div
      ref={wrap}
      className={`${styles.wrap} ${className || ""}`}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      <div ref={inner} className={styles.inner}>
        {children}
        <span className={styles.glare} aria-hidden />
      </div>
    </div>
  );
}
