"use client";

import { useRef, useState } from "react";
import { Reveal } from "@/components/reveal";
import { Eyebrow, SectionTitle } from "@/components/section-heading";
import { WORKFLOW_STAGES, WorkflowRing, WorkflowRingList } from "@/components/workflow-ring";
import { ScrollTrigger, gsap, useGSAP, reduceMotion } from "@/lib/gsap";

export function WorkflowSection() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState<number | null>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;

      const stages = gsap.utils.toArray<HTMLElement>("[data-ring-stage]", el);
      const nodes = gsap.utils.toArray<SVGGElement>("[data-ring-node]", el);
      const dots = gsap.utils.toArray<SVGCircleElement>("[data-ring-node-dot]", el);
      const labels = gsap.utils.toArray<SVGTextElement>("[data-ring-label]", el);
      const rows = gsap.utils.toArray<HTMLElement>("[data-ring-row]", el);
      const progress = el.querySelector<SVGCircleElement>("[data-ring-progress]");

      if (reduceMotion()) {
        setActive(0);
        return;
      }

      const circumference = progress?.getAttribute("r")
        ? 2 * Math.PI * Number(progress.getAttribute("r"))
        : 0;

      const paint = (i: number) => {
        setActive((prev) => (prev === i ? prev : i));
        nodes.forEach((n, idx) => {
          const on = idx === i;
          gsap.to(n, { opacity: on ? 1 : 0.4, duration: 0.4, overwrite: "auto" });
          const dot = dots[idx];
          if (dot) {
            gsap.to(dot, {
              attr: {
                r: on ? 25 : 19,
                fill: on ? "var(--color-haldi)" : "var(--color-paper)",
              },
              duration: 0.55,
              ease: "back.out(2)",
              overwrite: "auto",
            });
          }
          labels[idx]?.setAttribute("opacity", on ? "1" : "0.4");
        });
        rows.forEach((r, idx) => {
          r.style.background = idx === i ? "var(--color-haldi)" : "transparent";
        });
      };

      const triggers = stages.map((stage, i) =>
        ScrollTrigger.create({
          trigger: stage,
          start: "top 62%",
          end: "bottom 38%",
          onToggle: (self) => {
            if (self.isActive) paint(i);
          },
        }),
      );

      const arc =
        progress && circumference
          ? gsap.to(progress, {
              strokeDashoffset: 0,
              ease: "none",
              scrollTrigger: {
                trigger: el,
                start: "top 65%",
                end: "bottom 55%",
                scrub: 0.6,
              },
            })
          : null;

      paint(0);

      return () => {
        triggers.forEach((t) => t.kill());
        arc?.scrollTrigger?.kill();
        arc?.kill();
      };
    },
    { scope: root },
  );

  return (
    <section id="workflow" ref={root} className="border-t-2 border-ink bg-paper">
      <div className="mx-auto max-w-[1200px] px-5 pt-20 md:px-8 md:pt-28">
        <Reveal start="top 92%">
          <Eyebrow num="07" label="Research workflow" />
        </Reveal>
        <SectionTitle delay={0.08}>Seven stages, and the loop never closes.</SectionTitle>
      </div>

      <div className="mx-auto mt-10 grid max-w-[1200px] items-start gap-12 px-5 md:mt-14 md:grid-cols-2 md:gap-16 md:px-8">
        <div className="md:sticky md:top-24 md:flex md:h-[calc(100svh-8rem)] md:items-center">
          <div className="w-full">
            <WorkflowRing />
            <WorkflowRingList active={active} />
          </div>
        </div>

        <div className="space-y-6 pb-16 md:space-y-0 md:pb-0">
          {WORKFLOW_STAGES.map((stage, i) => (
            <article
              key={stage.title}
              data-ring-stage={i}
              className="min-h-[34svh] border-t-2 border-ink/15 pt-6 md:flex md:min-h-[68svh] md:flex-col md:justify-center md:border-t-0 md:pt-0"
            >
              <span className="font-mono text-[10px] tracking-[0.2em] text-ink/40 uppercase tabular-nums">
                stage {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 font-display text-2xl font-extrabold tracking-tight md:text-3xl">
                {stage.title}
              </h3>
              <p className="mt-3 max-w-md text-[15px] leading-relaxed text-ink/70">
                {stage.note}
              </p>
            </article>
          ))}

          <Reveal delay={0.1}>
            <div className="border-2 border-ink bg-haldi p-6">
              <p className="font-mono text-[10px] tracking-[0.2em] text-ink/60 uppercase">
                Why it matters
              </p>
              <p className="mt-3 font-display text-lg leading-snug font-bold md:text-xl">
                A roadmap that cannot absorb new evidence is a PDF, not a platform.
              </p>
            </div>
            <p className="mt-6 font-mono text-[10px] tracking-[0.18em] text-ink/45 uppercase">
              7 stages · continuous · source-tracked
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
