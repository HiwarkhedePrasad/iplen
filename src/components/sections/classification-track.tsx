"use client";

import { useRef } from "react";
import { gsap, useGSAP, reduceMotion } from "@/lib/gsap";

type Class = { name: string; line: string; ref: string };

function Card({ index, item }: { index: number; item: Class }) {
  return (
    <article
      data-stagger-item
      className="group flex w-[78vw] shrink-0 flex-col border-2 border-ink bg-bone p-6 transition-shadow duration-300 hover:shadow-[7px_7px_0_#16130e] sm:w-[46vw] lg:w-[clamp(300px,24vw,376px)]"
    >
      <div className="flex items-baseline gap-4">
        <span className="font-mono text-[10px] tracking-[0.2em] text-ink/40 tabular-nums">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="h-px flex-1 bg-ink/20" />
      </div>
      <h3 className="mt-6 font-display text-2xl font-extrabold tracking-tight lg:text-[1.7rem]">
        {item.name}
      </h3>
      <p className="mt-3 text-[15px] leading-relaxed text-ink/70">{item.line}</p>
      <p className="mt-8 border-t border-ink/15 pt-4 font-mono text-[10px] leading-relaxed tracking-[0.16em] text-sindoor uppercase">
        {item.ref}
      </p>
    </article>
  );
}

export function ClassificationTrack({ items }: { items: Class[] }) {
  const pin = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const count = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const pinEl = pin.current;
      const trackEl = track.current;
      if (!pinEl || !trackEl) return;
      if (reduceMotion()) return;

      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const distance = () => Math.max(0, trackEl.scrollWidth - window.innerWidth);

        const tween = gsap.to(trackEl, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: pinEl,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (bar.current) gsap.set(bar.current, { scaleX: self.progress });
              if (count.current) {
                count.current.textContent = String(
                  Math.min(items.length, Math.floor(self.progress * items.length) + 1),
                ).padStart(2, "0");
              }
            },
          },
        });

        const intro = gsap.from(pinEl.querySelectorAll("[data-stagger-item]"), {
          autoAlpha: 0,
          y: 46,
          scale: 0.96,
          duration: 1,
          ease: "expo.out",
          stagger: 0.06,
          scrollTrigger: { trigger: pinEl, start: "top 60%", once: true },
        });

        return () => {
          intro.scrollTrigger?.kill();
          intro.kill();
          tween.scrollTrigger?.kill();
          tween.kill();
        };
      });

      mm.add("(max-width: 1023px)", () => {
        gsap.from(pinEl.querySelectorAll("[data-stagger-item]"), {
          autoAlpha: 0,
          y: 32,
          duration: 0.9,
          ease: "expo.out",
          stagger: 0.06,
          scrollTrigger: { trigger: pinEl, start: "top 82%", once: true },
        });
      });

      return () => mm.revert();
    },
    { scope: pin },
  );

  return (
    <div ref={pin} className="mt-12 overflow-hidden md:mt-16 lg:h-[100svh]">
      <div className="mb-6 hidden items-center gap-5 px-5 md:px-8 lg:flex">
        <span
          ref={count}
          className="font-mono text-[11px] tracking-[0.2em] text-ink tabular-nums"
        >
          01
        </span>
        <div className="h-px flex-1 bg-ink/15">
          <div ref={bar} className="h-px w-full origin-left bg-sindoor" />
        </div>
        <span className="font-mono text-[11px] tracking-[0.2em] text-ink/40 tabular-nums">
          {String(items.length).padStart(2, "0")}
        </span>
      </div>

      <div
        ref={track}
        data-h-track
        className="flex flex-col gap-5 px-5 pb-16 md:px-8 lg:h-[calc(100svh-6.5rem)] lg:w-max lg:flex-row lg:items-center lg:gap-6 lg:pb-0"
      >
        {items.map((item, i) => (
          <Card key={item.name} index={i} item={item} />
        ))}
      </div>
    </div>
  );
}
