"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "./useInView";
import { prefersReducedMotion } from "@/lib/gsap";

type Props = {
  to: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
};

/* Number that tweens from 0 → `to` when it enters the viewport and
 * resets to 0 when it leaves the viewport (downward). Next enter starts
 * a fresh count-up animation — every scroll cycle replays.
 *
 * Uses requestAnimationFrame + an easing curve, no GSAP needed. */
export default function CountUp({
  to,
  duration = 2,
  suffix = "",
  prefix = "",
  className,
}: Props) {
  const { ref, inView } = useInView<HTMLSpanElement>({
    amount: 0,
    rootMargin: "0px 0px -8% 0px",
  });
  const [display, setDisplay] = useState<string>("");
  const rafRef = useRef<number>(0);

  const decimals = Number.isInteger(to) ? 0 : 1;
  const format = (n: number) =>
    decimals === 0 ? Math.round(n).toString() : n.toFixed(decimals);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setDisplay(`${prefix}${format(to)}${suffix}`);
      return;
    }
    if (!inView) {
      /* Reset to 0 so the next time the element enters, it counts from 0. */
      setDisplay(`${prefix}${format(0)}${suffix}`);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      return;
    }

    /* Ease-out cubic — mirrors GSAP's power3.out feel. */
    const ease = (t: number) => 1 - Math.pow(1 - t, 3);
    const start = performance.now();
    const run = (now: number) => {
      const t = Math.min(1, (now - start) / (duration * 1000));
      const v = to * ease(t);
      setDisplay(`${prefix}${format(v)}${suffix}`);
      if (t < 1) rafRef.current = requestAnimationFrame(run);
    };
    rafRef.current = requestAnimationFrame(run);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [inView, to, duration, prefix, suffix]);

  return (
    <span ref={ref} className={className}>
      {display || `${prefix}${format(0)}${suffix}`}
    </span>
  );
}
