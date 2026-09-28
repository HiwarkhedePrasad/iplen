"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, SplitText, useGSAP, reduceMotion } from "@/lib/gsap";

/**
 * Headline reveal: splits the text into masked lines and slides them up.
 * Falls back to a plain visible render when motion is reduced.
 */
export function SplitHeading({
  as: Tag = "h2",
  children,
  className = "",
  delay = 0,
  start = "top 88%",
  stagger = 0.085,
}: {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  delay?: number;
  start?: string;
  stagger?: number;
}) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || reduceMotion()) return;

      const split = SplitText.create(el, {
        type: "lines",
        mask: "lines",
        autoSplit: true,
        linesClass: "split-line",
        onSplit: (self) =>
          gsap.from(self.lines, {
            yPercent: 116,
            duration: 1.25,
            ease: "expo.out",
            stagger,
            delay,
            scrollTrigger: { trigger: el, start, once: true },
          }),
      });

      return () => split.revert();
    },
    { scope: ref, dependencies: [delay, start, stagger] },
  );

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}

/**
 * Word-by-word reveal for short, dense copy. Keeps the block's natural wrapping.
 */
export function SplitWords({
  as: Tag = "p",
  children,
  className = "",
  delay = 0,
  start = "top 90%",
}: {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  delay?: number;
  start?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || reduceMotion()) return;

      const split = SplitText.create(el, {
        type: "words",
        mask: "words",
        autoSplit: true,
        wordsClass: "split-word",
        onSplit: (self) =>
          gsap.from(self.words, {
            yPercent: 108,
            duration: 0.95,
            ease: "expo.out",
            stagger: 0.022,
            delay,
            scrollTrigger: { trigger: el, start, once: true },
          }),
      });

      return () => split.revert();
    },
    { scope: ref, dependencies: [delay, start] },
  );

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
