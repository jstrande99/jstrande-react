"use client";

import { useEffect, useRef, useState } from "react";

type Options = {
  /* Fraction of the element that must be visible to count as "in view".
   * 0.15 means the top 15% crossing the viewport. */
  amount?: number;
  /* IO rootMargin — e.g. "0px 0px -10% 0px" to trigger a bit before
   * the element actually touches the viewport. */
  rootMargin?: string;
};

/* Tiny IntersectionObserver hook. Returns a ref + an `inView` flag that
 * toggles true / false as the element enters and leaves the viewport.
 * Modeled on Framer Motion's `useInView({ once: false })`, but with no
 * dependency — pure IO + useState. */
export function useInView<T extends HTMLElement = HTMLElement>(
  { amount = 0.15, rootMargin = "0px 0px -8% 0px" }: Options = {}
) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: amount, rootMargin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [amount, rootMargin]);

  return { ref, inView };
}
