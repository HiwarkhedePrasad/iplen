"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, reduceMotion } from "@/lib/gsap";

export function Reveal({
  children,
  className = "",
  delay = 0,
  from = "up",
  start = "top 88%",
}: {
  children: ReactNode;
  className?: string;
  /** Stagger offset in milliseconds. */
  delay?: number;
  from?: "up" | "left" | "right" | "scale" | "clip";
  start?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || reduceMotion()) return;
      gsap.to(el, {
        autoAlpha: 1,
        y: 0,
        x: 0,
        scale: 1,
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 1.05,
        delay: delay / 1000,
        ease: "expo.out",
        overwrite: true,
        scrollTrigger: { trigger: el, start, once: true },
      });
    },
    { scope: ref, dependencies: [delay, from, start] },
  );

  return (
    <div ref={ref} data-reveal={from} className={className}>
      {children}
    </div>
  );
}
