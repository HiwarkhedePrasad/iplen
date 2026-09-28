"use client";

import Lenis from "lenis";
import { useEffect } from "react";
import { gsap, ScrollTrigger, reduceMotion } from "@/lib/gsap";
import { setLenis } from "@/lib/scroll";

export function SmoothScroll() {
  useEffect(() => {
    if (reduceMotion()) return;

    const lenis = new Lenis({
      lerp: 0.085,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      syncTouch: false,
      anchors: { offset: -72 },
    });
    setLenis(lenis);
    if (process.env.NODE_ENV !== "production") {
      (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
    }

    const onScroll = () => ScrollTrigger.update();
    lenis.on("scroll", onScroll);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);
    window.addEventListener("load", refresh);

    return () => {
      window.removeEventListener("load", refresh);
      gsap.ticker.remove(raf);
      lenis.off("scroll", onScroll);
      lenis.destroy();
      setLenis(null);
      if (process.env.NODE_ENV !== "production") {
        delete (window as unknown as { __lenis?: Lenis }).__lenis;
      }
    };
  }, []);

  return null;
}
