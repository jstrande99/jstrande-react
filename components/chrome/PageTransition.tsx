"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/* Route transition controller. No overlay, no wordmark — the actual
 * crossfade + depth push is performed by the browser via the View
 * Transitions API (::view-transition-old/new(root) in globals.css).
 *
 * On first load, the Hero's blur-focus reveal is the intro. There is
 * nothing to animate here.
 *
 * Browsers without startViewTransition (Firefox, older Safari) fall
 * through to Next's instant SSG navigation — already snappy thanks to
 * <Link> prefetching. No degradation; just fewer frames. */
export default function PageTransition() {
  const router = useRouter();

  useEffect(() => {
    if (typeof document === "undefined") return;
    if (!("startViewTransition" in document)) return;

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented) return;
      if (e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const anchor = (e.target as HTMLElement | null)?.closest("a");
      if (!anchor) return;
      if (anchor.target && anchor.target !== "_self") return;
      if (anchor.hasAttribute("download")) return;

      const href = anchor.getAttribute("href");
      if (!href) return;
      if (!href.startsWith("/") || href.startsWith("//")) return;

      const url = new URL(anchor.href, window.location.origin);
      if (url.origin !== window.location.origin) return;

      /* Same-document hash / query navigations: let the browser handle
       * them natively so in-page anchor scrolling still works. */
      const samePath =
        url.pathname === window.location.pathname &&
        url.search === window.location.search;
      if (samePath) return;

      e.preventDefault();
      document.startViewTransition!(() => {
        router.push(url.pathname + url.search + url.hash);
      });
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [router]);

  return null;
}
