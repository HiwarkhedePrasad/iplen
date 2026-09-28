"use client";

import { useRef } from "react";
import { Reveal } from "@/components/reveal";
import { Eyebrow, SectionTitle } from "@/components/section-heading";
import { SplitWords } from "@/components/split-text";
import { gsap, useGSAP, reduceMotion } from "@/lib/gsap";

type Persona = {
  code: string;
  role: string;
  line: string;
};

export function PersonaGrid({ items }: { items: Persona[] }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      if (reduceMotion()) return;

      const cards = gsap.utils.toArray<HTMLElement>("[data-persona]", el);

      cards.forEach((card) => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: card, start: "top 90%", once: true },
          defaults: { ease: "expo.out" },
        });
        tl.from(card, { autoAlpha: 0, y: 54, rotate: 1.4, duration: 1.1 }).from(
          card.querySelectorAll("[data-persona-line]"),
          { autoAlpha: 0, y: 14, duration: 0.7, stagger: 0.07 },
          0.18,
        );
      });

      gsap.to("[data-persona-glow]", {
        yPercent: 40,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 1 },
      });
    },
    { scope: root },
  );

  return (
    <section
      id="simulation"
      ref={root}
      className="relative overflow-hidden border-t-2 border-ink bg-bone py-20 md:py-28"
    >
      <div
        data-persona-glow
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 h-72 w-[70vw] -translate-x-1/2 rounded-full bg-haldi/25 blur-3xl"
      />

      <div className="relative mx-auto max-w-[1200px] px-5 md:px-8">
        <Reveal start="top 92%">
          <Eyebrow num="06" label="Virtual market simulation" />
        </Reveal>
        <SectionTitle delay={0.08}>Before you manufacture, run the room.</SectionTitle>
        <SplitWords
          start="top 86%"
          className="mt-5 max-w-2xl text-lg leading-relaxed text-ink/70 md:text-xl"
        >
          A thousand configurable AI stakeholders stress-test the same formulation — capital,
          regulation, law, shelf, border, warehouse — so the first difficult conversation
          happens on a screen, not in a boardroom.
        </SplitWords>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((p) => (
            <article
              key={p.code}
              data-persona
              className="group relative flex h-full flex-col border-2 border-ink bg-paper p-6 transition-shadow duration-300 hover:-translate-y-1 hover:shadow-[7px_7px_0_#16130e]"
            >
              <p
                data-persona-line
                className="font-mono text-[10px] tracking-[0.2em] text-sindoor uppercase"
              >
                {p.code}
              </p>
              <h3
                data-persona-line
                className="mt-3 font-display text-xl font-extrabold tracking-tight"
              >
                {p.role}
              </h3>
              <p data-persona-line className="mt-2 text-[15px] leading-relaxed text-ink/70">
                {p.line}
              </p>
              <p
                data-persona-line
                className="mt-auto pt-5 font-mono text-[10px] tracking-[0.16em] text-ink/40 uppercase transition-colors group-hover:text-neem-2"
              >
                Verdict logged →
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
