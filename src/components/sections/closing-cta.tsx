"use client";

import { useRef } from "react";
import { SplitHeading } from "@/components/split-text";
import { Magnetic, Stagger } from "@/components/motion-primitives";
import { gsap, useGSAP, reduceMotion } from "@/lib/gsap";

export function ClosingCta() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el || reduceMotion()) return;
      gsap.to("[data-cta-ghost]", {
        yPercent: -32,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top bottom", end: "bottom bottom", scrub: 1 },
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      className="relative overflow-hidden border-t-2 border-ink bg-haldi py-24 md:py-36"
    >
      <div className="noise pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-multiply" />
      <div
        data-cta-ghost
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 font-display text-[26vw] leading-none font-extrabold text-ink/[0.05] select-none"
      >
        IPLens
      </div>

      <div className="relative mx-auto max-w-[1200px] px-5 md:px-8">
        <SplitHeading
          as="h2"
          className="max-w-4xl font-display text-[clamp(2.4rem,6.5vw,5rem)] leading-[0.98] font-extrabold tracking-[-0.03em]"
        >
          Describe your formulation. Get the roadmap.
        </SplitHeading>

        <Stagger className="mt-9 flex flex-wrap gap-4" y={26} each={0.08} start="top 92%">
          <div data-stagger-item>
            <Magnetic>
              <a
                href="#demo"
                data-magnetic
                className="block bg-ink px-7 py-4 font-mono text-[11px] tracking-[0.18em] text-haldi uppercase shadow-[6px_6px_0_#ff4a1c]"
              >
                Analyse a formulation
              </a>
            </Magnetic>
          </div>
          <div data-stagger-item>
            <Magnetic>
              <a
                href="#workflow"
                data-magnetic
                className="block border-2 border-ink px-7 py-4 font-mono text-[11px] tracking-[0.18em] uppercase transition-colors hover:bg-ink hover:text-haldi"
              >
                See the research loop
              </a>
            </Magnetic>
          </div>
        </Stagger>

        <p
          data-stagger-item
          className="mt-7 font-mono text-[10px] tracking-[0.18em] text-ink/60 uppercase md:text-[11px]"
        >
          22 Indian languages via Bhashini · Label photo or PDF via OCR · Built for the
          SIH 2026 demo floor
        </p>
      </div>
    </section>
  );
}
