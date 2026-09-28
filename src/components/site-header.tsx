"use client";

import { useRef } from "react";
import { Mark } from "@/components/mark";
import { gsap, useGSAP, reduceMotion } from "@/lib/gsap";

const NAV = [
  ["Agents", "#agents"],
  ["Jurisdiction", "#jurisdiction"],
  ["Evidence", "#evidence"],
  ["Simulation", "#simulation"],
  ["Loop", "#workflow"],
];

export function SiteHeader() {
  const bar = useRef<HTMLElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = bar.current;
      const box = inner.current;
      if (!el || !box) return;
      if (reduceMotion()) return;

      gsap.to(box, {
        height: 48,
        scrollTrigger: {
          trigger: document.documentElement,
          start: 80,
          end: "max",
          scrub: true,
        },
      });

      gsap.to(el, {
        borderBottomColor: "rgba(22,19,14,0.35)",
        scrollTrigger: {
          trigger: document.documentElement,
          start: 80,
          end: "max",
          scrub: true,
        },
      });
    },
    { scope: bar },
  );

  return (
    <header
      ref={bar}
      data-site-header
      className="sticky top-0 z-50 border-b-2 border-ink bg-ink text-bone"
    >
      <div
        ref={inner}
        className="mx-auto flex h-16 max-w-[1200px] items-center justify-between gap-4 px-5 md:px-8"
      >
        <a
          href="#top"
          className="flex items-center gap-2.5 font-display text-xl font-extrabold tracking-tight"
        >
          <Mark className="h-6 w-6" highlight="var(--color-haldi)" />
          IPLens
        </a>

        <nav className="hidden items-center gap-6 font-mono text-[11px] tracking-[0.16em] uppercase lg:flex">
          {NAV.map(([label, href]) => {
            const id = href.slice(1);
            return (
              <a
                key={href}
                href={href}
                data-nav-for={id}
                data-active="false"
                className="group relative py-1 text-bone/60 transition-colors duration-300 hover:text-bone data-[active=true]:text-haldi"
              >
                {label}
                <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-haldi transition-transform duration-300 group-hover:scale-x-100 data-[active=true]:scale-x-100" />
              </a>
            );
          })}
        </nav>

        <a
          href="#demo"
          data-magnetic
          className="bg-haldi px-4 py-2.5 font-mono text-[10px] tracking-[0.16em] text-ink uppercase transition-colors hover:bg-sindoor hover:text-bone md:text-[11px]"
        >
          Analyse a formulation
        </a>
      </div>
    </header>
  );
}
