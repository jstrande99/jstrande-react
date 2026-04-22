"use client";

import { useInView } from "./useInView";
import { prefersReducedMotion } from "@/lib/gsap";

type Props = {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  duration?: number;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
};

/* Reveal — IntersectionObserver-driven fade + slide.
 *
 * Toggles visible / hidden every time the element enters or leaves the
 * viewport (no `once: true` — matches the langelogic pattern). CSS
 * transitions do the actual animation, so there's no GSAP tween to
 * misfire, no ScrollTrigger positions to go stale across layout shifts.
 *
 * Respects prefers-reduced-motion (final state shown instantly). */
export default function Reveal({
  children,
  delay = 0,
  y = 24,
  duration = 0.85,
  className,
  as: Tag = "div",
}: Props) {
  const { ref, inView } = useInView<HTMLDivElement>({
    amount: 0,
    rootMargin: "0px 0px -12% 0px",
  });

  const reduced = typeof window !== "undefined" && prefersReducedMotion();
  const show = reduced || inView;

  const Component = Tag as React.ElementType;
  return (
    <Component
      ref={ref}
      className={className}
      style={{
        opacity: show ? 1 : 0,
        transform: show ? "none" : `translate3d(0, ${y}px, 0)`,
        transition: reduced
          ? "none"
          : `opacity ${duration}s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s, transform ${duration}s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s`,
        willChange: "transform, opacity",
      }}
    >
      {children}
    </Component>
  );
}
