"use client";

import { useRef } from "react";
import { ScrollTrigger, gsap, useGSAP, reduceMotion } from "@/lib/gsap";

export function VelocityMarquee({ items }: { items: string[] }) {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = track.current;
      const box = root.current;
      if (!el || !box) return;
      if (reduceMotion()) return;

      const tween = gsap.to(el, {
        xPercent: -50,
        duration: 38,
        ease: "none",
        repeat: -1,
      });

      let timeScale = 1;
      let target = 1;
      let sign = 1;
      let skew = 0;
      let skewTarget = 0;
      let inView = false;

      const visibility = ScrollTrigger.create({
        trigger: box,
        start: "top bottom",
        end: "bottom top",
        onToggle: (self) => {
          inView = self.isActive;
        },
      });

      const drive = ScrollTrigger.create({
        trigger: document.documentElement,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          const v = self.getVelocity();
          if (!inView) {
            target = 0;
            skewTarget = 0;
            return;
          }
          if (Math.abs(v) < 12) {
            target = 1;
            skewTarget = 0;
            return;
          }
          sign = self.direction;
          target = Math.min(7, 1 + Math.abs(v) / 220);
          skewTarget = Math.max(-9, Math.min(9, -v / 240));
        },
      });

      const tick = () => {
        timeScale += (target - timeScale) * 0.08;
        skew += (skewTarget - skew) * 0.1;
        tween.timeScale(timeScale * sign);
        gsap.set(el, { skewX: skew });
      };

      gsap.ticker.add(tick);

      return () => {
        gsap.ticker.remove(tick);
        drive.kill();
        visibility.kill();
        tween.kill();
        gsap.set(el, { clearProps: "all" });
      };
    },
    { scope: root },
  );

  return (
    <div ref={root} className="overflow-hidden border-y-2 border-ink bg-ink py-4">
      <div ref={track} className="marquee-track">
        {[0, 1].map((group) => (
          <div
            key={group}
            className="flex shrink-0 items-center"
            aria-hidden={group === 1}
          >
            {items.map((item, i) => (
              <span
                key={item}
                className="flex items-center font-mono text-[11px] tracking-[0.2em] uppercase md:text-xs"
              >
                <span className={i % 2 === 0 ? "text-haldi" : "text-neem"}>{item}</span>
                <span className="px-6 text-sindoor">◆</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
