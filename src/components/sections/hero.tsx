"use client";

import { useRef } from "react";
import { AnalysisConsole } from "@/components/analysis-console";
import { Magnetic } from "@/components/motion-primitives";
import { gsap, useGSAP, reduceMotion } from "@/lib/gsap";

function Line({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span className="block overflow-hidden pb-[0.06em]">
      <span data-hero-line className={`block will-change-transform ${className}`}>
        {children}
      </span>
    </span>
  );
}

function RotatingBadge() {
  return (
    <div
      data-hero-badge
      aria-hidden="true"
      className="pointer-events-none absolute top-24 right-[-3.5rem] hidden h-32 w-32 opacity-0 lg:block xl:right-[-1.5rem]"
    >
      <svg viewBox="0 0 120 120" className="h-full w-full">
        <defs>
          <path
            id="badge-path"
            d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0"
            fill="none"
          />
        </defs>
        <text className="fill-ink/55 font-mono text-[9.5px] tracking-[0.24em] uppercase">
          <textPath href="#badge-path" startOffset="0%">
            SIH 2026 · SIH26045 · Ministry of AYUSH × AIIA · SIH 2026 · SIH26045 ·
          </textPath>
        </text>
        <circle cx="60" cy="60" r="3" className="fill-sindoor" />
      </svg>
    </div>
  );
}

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      if (reduceMotion()) {
        gsap.set(el.querySelectorAll("[data-hero-fade]"), { autoAlpha: 1, y: 0 });
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      tl.from("[data-hero-line]", {
        yPercent: 118,
        duration: 1.4,
        stagger: 0.11,
      })
        .from(
          "[data-hero-chip]",
          { scale: 0.72, rotate: -7, duration: 1.1, ease: "back.out(1.7)" },
          "-=0.95",
        )
        .from(
          "[data-hero-fade]",
          { autoAlpha: 0, y: 24, duration: 1, stagger: 0.08 },
          "-=1.05",
        )
        .from(
          "[data-hero-console]",
          { autoAlpha: 0, y: 70, scale: 0.97, duration: 1.4 },
          "-=0.9",
        )
        .to("[data-hero-badge]", { autoAlpha: 1, duration: 1 }, "-=1.1");

      gsap.to("[data-hero-badge]", {
        rotate: 200,
        ease: "none",
        transformOrigin: "50% 50%",
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.to("[data-hero-out]", {
        yPercent: -14,
        autoAlpha: 0.15,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "bottom 25%",
          scrub: 0.6,
        },
      });

      gsap.to("[data-hero-noise]", {
        yPercent: 22,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "bottom top",
          scrub: 0.8,
        },
      });
    },
    { scope: root },
  );

  return (
    <section id="top" ref={root} className="relative overflow-hidden bg-haldi">
      <div
        data-hero-noise
        className="noise pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-multiply"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[38%] bg-linear-to-t from-paper via-paper/85 to-transparent"
      />
      <RotatingBadge />

      <div
        data-hero-out
        className="relative mx-auto max-w-[1200px] px-5 pt-12 pb-20 md:px-8 md:pt-16 md:pb-28"
      >
        <div
          data-hero-fade
          className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-b border-ink/25 pb-4 font-mono text-[10px] tracking-[0.2em] text-ink/70 uppercase md:text-[11px]"
        >
          <span>Ministry of AYUSH × AIIA</span>
          <span className="hidden sm:inline">SIH 2026 · SIH26045</span>
          <span>Software · MedTech</span>
        </div>

        <h1 className="mt-10 font-display text-[clamp(2.6rem,8.6vw,7rem)] leading-[0.94] font-extrabold tracking-[-0.035em] md:mt-14">
          <Line>From formulation</Line>
          <Line>
            to{" "}
            <span
              data-hero-chip
              className="relative inline-block -rotate-[0.6deg] bg-sindoor px-3 pb-1 text-bone"
            >
              protection.
            </span>
          </Line>
        </h1>

        <div className="mt-8 grid gap-8 md:mt-10 md:grid-cols-[minmax(0,1fr)_auto] md:items-end md:gap-12">
          <p
            data-hero-fade
            className="max-w-2xl text-lg leading-relaxed text-ink/80 md:text-xl"
          >
            IPLens runs a panel of specialist AI agents over your formulation —
            classification, prior art, trademarks, biodiversity, export law — and
            returns one evidence-backed commercialisation roadmap. Indian law and
            international law, never mixed.
          </p>
          <div data-hero-fade className="flex flex-wrap gap-4">
            <Magnetic>
              <a
                href="#demo"
                data-magnetic
                className="block bg-ink px-6 py-4 font-mono text-[11px] tracking-[0.18em] text-haldi uppercase shadow-[6px_6px_0_#ff4a1c]"
              >
                Analyse a formulation
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="#agents"
                data-magnetic
                className="block border-2 border-ink px-6 py-4 font-mono text-[11px] tracking-[0.18em] uppercase transition-colors hover:bg-ink hover:text-haldi"
              >
                Meet the panel
              </a>
            </Magnetic>
          </div>
        </div>

        <p
          data-hero-fade
          className="mt-6 font-mono text-[10px] tracking-[0.18em] text-ink/60 uppercase md:text-[11px]"
        >
          Multilingual · Source-cited on every claim · Confidence scored · Human
          escalation built in
        </p>

        <div data-hero-console id="demo" className="mt-12 md:mt-16">
          <AnalysisConsole />
        </div>
      </div>
    </section>
  );
}
