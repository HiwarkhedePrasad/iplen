"use client";

import { useRef } from "react";
import { gsap, useGSAP, reduceMotion } from "@/lib/gsap";

/**
 * Confidence bar that fills and counts up as it crosses the viewport.
 */
export function ConfidenceMeter({ value, suffix }: { value: number; suffix?: string }) {
  const bar = useRef<HTMLDivElement>(null);
  const num = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const barEl = bar.current;
      const numEl = num.current;
      if (!barEl || !numEl) return;

      numEl.textContent = "0";
      if (reduceMotion()) {
        gsap.set(barEl, { scaleX: 1 });
        numEl.textContent = String(value);
        return;
      }

      const state = { v: 0 };
      const paint = () => {
        gsap.set(barEl, { scaleX: state.v / value });
        numEl.textContent = String(Math.round(state.v));
      };
      paint();

      gsap.to(state, {
        v: value,
        ease: "none",
        onUpdate: paint,
        scrollTrigger: {
          trigger: barEl,
          start: "top 92%",
          end: "top 55%",
          scrub: 0.7,
        },
      });
    },
    { scope: bar, dependencies: [value] },
  );

  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-bone/15 pt-6">
      <span className="font-mono text-[10px] tracking-[0.2em] text-bone/45 uppercase">
        Confidence
      </span>
      <div className="h-2 w-full min-w-40 max-w-64 bg-bone/10">
        <div
          ref={bar}
          className="h-full w-full origin-left bg-haldi"
          style={{ transform: "scaleX(0)" }}
        />
      </div>
      <span className="font-mono text-[11px] tracking-[0.14em] text-haldi uppercase">
        <span ref={num} className="tabular-nums">
          0
        </span>
        %{suffix ? ` · ${suffix}` : ""}
      </span>
    </div>
  );
}
