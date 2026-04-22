"use client";

import Link from "next/link";
import { forwardRef, useEffect, useRef } from "react";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import styles from "./Button.module.css";

type Variant = "ghost" | "solid";

type CommonProps = {
  variant?: Variant;
  magnetic?: boolean;
  arrow?: boolean;
  className?: string;
  children: React.ReactNode;
};

type AnchorProps = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children"> & {
    href: string;
  };

type ButtonProps = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & {
    href?: undefined;
  };

type Props = AnchorProps | ButtonProps;

/* Magnetic pill button. Translates toward the cursor on proximity; hover
 * state fills with a sliding gold gradient. Accepts `href` for <Link>
 * anchors or omits it for a <button>. */
export const Button = forwardRef<HTMLElement, Props>(function Button(
  { variant = "ghost", magnetic = true, arrow = true, className = "", children, ...rest },
  ref
) {
  const localRef = useRef<HTMLAnchorElement | HTMLButtonElement>(null);

  useEffect(() => {
    if (!magnetic) return;
    const el = localRef.current;
    if (!el) return;
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!mq.matches) return;

    const strength = 18;
    const radius = 120;

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);
      if (dist > radius) {
        el.style.transform = "translate3d(0,0,0)";
        return;
      }
      const k = (1 - dist / radius) * strength;
      el.style.transform = `translate3d(${(dx / radius) * k}px, ${(dy / radius) * k}px, 0)`;
    };
    const onLeave = () => {
      el.style.transform = "translate3d(0,0,0)";
    };
    window.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [magnetic]);

  const classes = [
    styles.button,
    variant === "solid" ? styles.solid : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      <span>{children}</span>
      {arrow && <span className={styles.arrow} aria-hidden>→</span>}
    </>
  );

  if ("href" in rest && rest.href !== undefined) {
    const { href, ...anchorRest } = rest as AnchorProps;
    const isExternal = /^https?:\/\//.test(href) || href.startsWith("mailto:");
    const linkBody = isExternal ? (
      <a
        {...anchorRest}
        href={href}
        className={classes}
        data-cursor="link"
        ref={(node) => {
          localRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) (ref as React.MutableRefObject<HTMLElement | null>).current = node;
        }}
      >
        {content}
      </a>
    ) : (
      <Link
        {...anchorRest}
        href={href}
        className={classes}
        data-cursor="link"
        ref={(node) => {
          localRef.current = node as HTMLAnchorElement | null;
          if (typeof ref === "function") ref(node as HTMLElement | null);
          else if (ref) (ref as React.MutableRefObject<HTMLElement | null>).current = node as HTMLElement | null;
        }}
      >
        {content}
      </Link>
    );
    return linkBody;
  }

  const { ...btnRest } = rest as ButtonProps;
  return (
    <button
      {...btnRest}
      className={classes}
      data-cursor="link"
      ref={(node) => {
        localRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) (ref as React.MutableRefObject<HTMLElement | null>).current = node;
      }}
    >
      {content}
    </button>
  );
});
