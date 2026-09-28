"use client";

import { useRef } from "react";
import { gsap, useGSAP, reduceMotion } from "@/lib/gsap";

type Row = [string, string, string];

/**
 * Comparison rows that wipe in from the left with a haldi sweep behind the
 * IPLens column, so the "us" side reads as the lit one.
 */
export function ComparisonTable({ rows }: { rows: Row[] }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const items = gsap.utils.toArray<HTMLElement>("[data-compare-row]", el);
      if (reduceMotion()) return;

      items.forEach((item) => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: item, start: "top 92%", once: true },
          defaults: { ease: "expo.out" },
        });
        tl.from(item, { autoAlpha: 0, x: -34, duration: 0.95 })
          .from(
            item.querySelector("[data-compare-sweep]"),
            { scaleX: 0, transformOrigin: "left center", duration: 0.9 },
            0.15,
          )
          .from(
            item.querySelectorAll("[data-compare-cell]"),
            { autoAlpha: 0, y: 12, duration: 0.7, stagger: 0.06 },
            0.2,
          );
      });
    },
    { scope: root, dependencies: [rows] },
  );

  return (
    <div ref={root} className="mt-12">
      <div className="hidden grid-cols-12 gap-6 border-b border-bone/25 pb-3 font-mono text-[10px] tracking-[0.2em] text-bone/45 uppercase md:grid">
        <span className="col-span-4" />
        <span className="col-span-4">Typical chatbot</span>
        <span className="col-span-4 text-haldi">IPLens</span>
      </div>

      {rows.map(([feature, them, us]) => (
        <div
          key={feature}
          data-compare-row
          className="relative grid gap-2 border-b border-bone/15 py-5 md:grid-cols-12 md:items-baseline md:gap-6"
        >
          <span
            data-compare-sweep
            aria-hidden="true"
            className="absolute inset-y-0 -left-5 w-[calc(100%+2.5rem)] origin-left bg-bone/[0.04]"
          />
          <div
            data-compare-cell
            className="relative font-display text-lg font-bold tracking-tight md:col-span-4 md:text-xl"
          >
            {feature}
          </div>
          <div
            data-compare-cell
            className="relative text-[15px] text-bone/50 md:col-span-4"
          >
            <span className="mr-2 font-mono text-[10px] tracking-[0.16em] text-bone/40 uppercase md:hidden">
              Chatbot —
            </span>
            {them}
          </div>
          <div data-compare-cell className="relative text-[15px] text-neem md:col-span-4">
            <span className="mr-2 font-mono text-[10px] tracking-[0.16em] text-haldi uppercase md:hidden">
              IPLens —
            </span>
            {us}
          </div>
        </div>
      ))}
    </div>
  );
}
