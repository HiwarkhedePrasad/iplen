"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, useGSAP, reduceMotion } from "@/lib/gsap";

/**
 * Staggers direct children into view. Children opt in with `data-stagger-item`.
 */
export function Stagger({
  children,
  className = "",
  y = 30,
  scale,
  start = "top 86%",
  each = 0.075,
  selector = "[data-stagger-item]",
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  y?: number;
  scale?: number;
  start?: string;
  each?: number;
  selector?: string;
  as?: ElementType;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || reduceMotion()) return;
      const items = gsap.utils.toArray<HTMLElement>(selector, el);
      if (!items.length) return;
      gsap.from(items, {
        autoAlpha: 0,
        y,
        scale,
        duration: 1.05,
        ease: "expo.out",
        stagger: each,
        scrollTrigger: { trigger: el, start, once: true },
      });
    },
    { scope: ref, dependencies: [y, scale, start, each, selector] },
  );

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}

/**
 * Draws a horizontal rule outward from its left edge when scrolled into view.
 */
export function Rule({
  className = "",
  delay = 0,
  from = "left",
}: {
  className?: string;
  delay?: number;
  from?: "left" | "center";
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || reduceMotion()) return;
      gsap.from(el, {
        scaleX: 0,
        transformOrigin: from === "left" ? "left center" : "center center",
        duration: 1.4,
        ease: "expo.out",
        delay,
        scrollTrigger: { trigger: el, start: "top 95%", once: true },
      });
    },
    { scope: ref, dependencies: [delay, from] },
  );

  return (
    <span
      ref={ref}
      aria-hidden="true"
      className={`block h-px w-full origin-left ${className}`}
    />
  );
}

/**
 * Magnetic hover wrapper for primary actions.
 */
export function Magnetic({
  children,
  className = "",
  strength = 0.32,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
  as?: ElementType;
}) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || reduceMotion()) return;
      if (!window.matchMedia("(pointer: fine)").matches) return;

      const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3.out" });
      const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3.out" });

      const onMove = (e: MouseEvent) => {
        const r = el.getBoundingClientRect();
        xTo((e.clientX - (r.left + r.width / 2)) * strength);
        yTo((e.clientY - (r.top + r.height / 2)) * strength);
      };
      const onLeave = () => {
        xTo(0);
        yTo(0);
      };

      el.addEventListener("mousemove", onMove);
      el.addEventListener("mouseleave", onLeave);
      return () => {
        el.removeEventListener("mousemove", onMove);
        el.removeEventListener("mouseleave", onLeave);
      };
    },
    { scope: ref, dependencies: [strength] },
  );

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}

/**
 * Line-through that draws across the text when it scrolls into view.
 */
export function StrikeOut({
  children,
  className = "",
  delay = 0.25,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || reduceMotion()) return;
      gsap.from(el, {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 0.8,
        ease: "power2.inOut",
        delay,
        scrollTrigger: { trigger: el, start: "top 92%", once: true },
      });
    },
    { scope: ref, dependencies: [delay] },
  );

  return (
    <span className={`relative inline-block ${className}`}>
      {children}
      <span
        ref={ref}
        aria-hidden="true"
        className="absolute top-1/2 left-0 h-[2px] w-full origin-left bg-sindoor"
      />
    </span>
  );
}
