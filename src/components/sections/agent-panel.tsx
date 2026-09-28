"use client";

import { useRef } from "react";
import { gsap, useGSAP, reduceMotion } from "@/lib/gsap";

type Agent = { name: string; line: string; chips: string[] };

const SPECIALISTS: Agent[] = [
  {
    name: "Classification",
    line: "Decides what the product is before anything else is decided.",
    chips: ["D&C", "schedules", "AYUSH SOP"],
  },
  {
    name: "Patent",
    line: "Prior art, §3(d), and whether protection is possible at all.",
    chips: ["IPO DB", "TKDL", "PCT"],
  },
  {
    name: "Trademark",
    line: "Clears the brand in every class you plan to sell in.",
    chips: ["registry", "cl. 5", "cl. 44"],
  },
  {
    name: "Regulatory",
    line: "Licences, labels, claims and the manufacturing checklist.",
    chips: ["GMP", "labels", "claims"],
  },
  {
    name: "International",
    line: "The same question, asked again of foreign regimes.",
    chips: ["WIPO", "EU", "Madrid"],
  },
];

const PLANNER: Agent = {
  name: "Planner",
  line: "Turns a free-text formulation into a plan of sub-queries and picks the jurisdictions in scope.",
  chips: ["routing", "scope", "jurisdiction guard"],
};

function Connector({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center gap-2 py-3 text-bone/40">
      <span data-line className="h-8 w-px origin-top bg-bone/30" />
      <span data-line-label className="font-mono text-[9.5px] tracking-[0.2em] uppercase">
        {label}
      </span>
    </div>
  );
}

export function AgentPanel() {
  const root = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const rootEl = root.current;
      const stageEl = stage.current;
      if (!rootEl || !stageEl) return;
      if (reduceMotion()) return;

      const q = gsap.utils.selector(rootEl);
      const lines = q("[data-line]");
      const labels = q("[data-line-label]");
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px) and (min-height: 700px)", () => {
        const tl = gsap.timeline({
          defaults: { ease: "power2.out" },
          scrollTrigger: {
            trigger: rootEl,
            start: "top top",
            end: () => `+=${window.innerHeight * 2.6}`,
            pin: stageEl,
            pinSpacing: true,
            scrub: 0.7,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        tl.from(q("[data-planner]"), { autoAlpha: 0, scale: 0.88, duration: 0.14 }, 0)
          .from(
            [lines[0], labels[0]],
            { autoAlpha: 0, scaleY: 0, transformOrigin: "center top", duration: 0.14, ease: "none" },
            0.1,
          )
          .from(
            q("[data-specialist]"),
            {
              autoAlpha: 0,
              scale: 0.9,
              x: (i: number) => (i % 2 === 0 ? -56 : 56),
              duration: 0.34,
              stagger: 0.055,
            },
            0.22,
          )
          .from(
            [lines[1], labels[1]],
            { autoAlpha: 0, scaleY: 0, transformOrigin: "center top", duration: 0.12, ease: "none" },
            0.66,
          )
          .from(
            q("[data-synth]"),
            { autoAlpha: 0, y: 46, scale: 0.93, duration: 0.2, ease: "expo.out" },
            0.72,
          );

        return () => {
          tl.scrollTrigger?.kill();
          tl.kill();
        };
      });

      mm.add("(max-width: 767px), (max-height: 699px)", () => {
        gsap.from(q("[data-planner], [data-specialist], [data-synth]"), {
          autoAlpha: 0,
          y: 34,
          duration: 0.95,
          ease: "expo.out",
          stagger: 0.07,
          scrollTrigger: { trigger: stageEl, start: "top 80%", once: true },
        });
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <div ref={root} className="mt-12">
      <div
        ref={stage}
        className="flex flex-col justify-center gap-1 md:h-[100svh] md:gap-0"
      >
        <article
          data-planner
          className="border border-neem/60 bg-ink-2 p-6 md:p-7"
        >
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <h3 className="font-display text-2xl font-extrabold tracking-tight text-neem">
              {PLANNER.name} Agent
            </h3>
            <span className="font-mono text-[10px] tracking-[0.2em] text-bone/45 uppercase">
              step 1 · scope
            </span>
          </div>
          <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-bone/70">
            {PLANNER.line}
          </p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {PLANNER.chips.map((chip) => (
              <span
                key={chip}
                className="border border-bone/25 px-2 py-0.5 font-mono text-[9.5px] tracking-[0.1em] text-bone/55 uppercase"
              >
                {chip}
              </span>
            ))}
          </div>
        </article>

        <Connector label="delegates to five specialists" />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {SPECIALISTS.map((agent, i) => (
            <article
              key={agent.name}
              data-specialist
              className="h-full border border-bone/20 bg-ink p-5 transition-colors duration-300 hover:border-haldi hover:bg-ink-2"
            >
              <span className="font-mono text-[9.5px] tracking-[0.2em] text-bone/30 tabular-nums">
                {String(i + 2).padStart(2, "0")}
              </span>
              <h3 className="mt-1 font-display text-lg font-bold tracking-tight text-haldi">
                {agent.name}
              </h3>
              <p className="mt-2 text-[13.5px] leading-relaxed text-bone/65">{agent.line}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {agent.chips.map((chip) => (
                  <span
                    key={chip}
                    className="border border-bone/25 px-2 py-0.5 font-mono text-[9.5px] tracking-[0.1em] text-bone/55 uppercase"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>

        <Connector label="merges into one answer" />

        <article data-synth className="border-2 border-ink bg-haldi p-6 text-ink md:p-7">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <h3 className="font-display text-2xl font-extrabold tracking-tight">
              Evidence Synthesizer
            </h3>
            <span className="font-mono text-[10px] tracking-[0.2em] text-ink/60 uppercase">
              final · citations · confidence · escalation
            </span>
          </div>
          <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-ink/80">
            Resolves conflicts between agents, attaches the exact legal provision to each
            claim, scores its own confidence, and hands anything below the threshold to a
            human.
          </p>
        </article>
      </div>
    </div>
  );
}
