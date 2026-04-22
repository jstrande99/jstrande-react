"use client";

import { useEffect } from "react";
import Nav from "./Nav";
import Cursor from "./Cursor";
import ScrollProgress from "./ScrollProgress";
import Footer from "./Footer";
import PageTransition from "./PageTransition";
import SiteMeta from "./SiteMeta";
import CommandPaletteLoader from "./CommandPaletteLoader";

/* Client-side chrome shell. Wraps the server-rendered page content with nav,
 * custom cursor, scroll progress bar, page-transition overlay, and footer. */
export default function Chrome({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    /* Mark the root element so desktop pointer devices hide the native cursor.
     * Touch devices keep their native behavior. */
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const apply = () => {
      document.documentElement.classList.toggle(
        "has-custom-cursor",
        mq.matches
      );
    };
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);


  return (
    <>
      <div className="grain" aria-hidden="true" />
      <ScrollProgress />
      <Cursor />
      <Nav />
      <SiteMeta />
      <CommandPaletteLoader />
      <PageTransition />
      <main>{children}</main>
      <Footer />
    </>
  );
}
