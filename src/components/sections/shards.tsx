"use client";

import { useRef } from "react";
import { gsap, useGSAP, reduceMotion } from "@/lib/gsap";

/**
 * Draws a vertical rule between the two jurisdiction shards as it enters view —
 * the visual "never merged" divider.
 */
export function ShardDivider() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || reduceMotion()) return;
      gsap.from(el, {
        scaleY: 0,
        transformOrigin: "center top",
        duration: 1.6,
        ease: "expo.out",
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className="flex items-center gap-3 py-1">
      <span className="h-px flex-1 bg-bone/15" />
      <span className="font-mono text-[9.5px] tracking-[0.24em] text-neem uppercase">
        never merged
      </span>
      <span className="h-px flex-1 bg-bone/15" />
    </div>
  );
}

/**
 * The two retrieval shards, revealed with an opposing slide.
 */
export function ShardPair() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || reduceMotion()) return;
      gsap.from(el.querySelectorAll("[data-shard]"), {
        autoAlpha: 0,
        y: 30,
        x: (i: number) => (i === 0 ? -40 : 40),
        duration: 1.1,
        ease: "expo.out",
        stagger: 0.12,
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref}>
      <div className="grid gap-3 sm:grid-cols-2">
        <div
          data-shard
          className="border border-bone/20 p-4 transition-colors duration-300 hover:border-haldi"
        >
          <p className="font-mono text-[10px] tracking-[0.18em] text-haldi uppercase">
            Shard · IN
          </p>
          <p className="mt-2 font-mono text-[11px] leading-relaxed text-bone/60">
            Patent Act · D&amp;C Rules · TKDL · Biodiversity Act · TM Registry
          </p>
        </div>
        <div
          data-shard
          className="border border-bone/20 p-4 transition-colors duration-300 hover:border-neem"
        >
          <p className="font-mono text-[10px] tracking-[0.18em] text-neem uppercase">
            Shard · INTL
          </p>
          <p className="mt-2 font-mono text-[11px] leading-relaxed text-bone/60">
            WIPO · PCT · Madrid · EU herbal · Nagoya
          </p>
        </div>
      </div>
      <p className="mt-3 font-mono text-[10px] tracking-[0.16em] text-bone/45 uppercase sm:text-center">
        A query is routed to exactly one shard →
      </p>
    </div>
  );
}
