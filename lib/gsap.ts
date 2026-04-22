/* Central GSAP + ScrollTrigger registration.
 * Import gsapRegister() from any client component to ensure the plugin is
 * registered exactly once in the browser. Safe to call repeatedly.
 */

"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

export function gsapRegister(): typeof gsap {
  if (typeof window === "undefined") return gsap;
  if (!registered) {
    gsap.registerPlugin(ScrollTrigger);
    // Smoothly honor anchor offset for fixed nav
    ScrollTrigger.defaults({ toggleActions: "play none none reverse" });
    registered = true;
  }
  return gsap;
}

export { gsap, ScrollTrigger };

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
