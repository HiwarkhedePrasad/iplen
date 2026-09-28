"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, useGSAP, reduceMotion, finePointer } from "@/lib/gsap";

/**
 * Thin rule pinned to the top of the viewport, scrubbed by document progress.
 */
export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      // Intentionally not gated on reduced-motion: a progress indicator aids
      // orientation and the scrub is the only animation involved.
      gsap.fromTo(
        el,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          transformOrigin: "left center",
          scrollTrigger: {
            trigger: document.body,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.25,
            invalidateOnRefresh: true,
          },
        },
      );
    },
    { scope: ref },
  );

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-90 h-[3px] bg-ink/10"
    >
      <div
        ref={ref}
        data-scroll-progress
        className="h-full w-full origin-left bg-sindoor"
      />
    </div>
  );
}

/**
 * Applies magnetic pull to every descendant carrying `data-magnetic`, so each
 * call site stays a plain server-rendered anchor.
 */
export function MagneticLayer() {
  useEffect(() => {
    if (reduceMotion() || !finePointer()) return;

    const move = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      const el = t?.closest<HTMLElement>("[data-magnetic]");
      if (!el) return;
      const r = el.getBoundingClientRect();
      gsap.to(el, {
        x: (e.clientX - (r.left + r.width / 2)) * 0.28,
        y: (e.clientY - (r.top + r.height / 2)) * 0.4,
        duration: 0.5,
        ease: "power3.out",
        overwrite: true,
      });
    };

    const leave = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      const el = t?.closest<HTMLElement>("[data-magnetic]");
      if (!el) return;
      gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: "power3.out", overwrite: true });
    };

    const onOver = (e: MouseEvent) => {
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>(
        "[data-magnetic]",
      );
      if (!el) return;
      gsap.to(el, { scale: 1.03, duration: 0.4, ease: "power3.out", overwrite: "auto" });
    };

    const onOut = (e: MouseEvent) => {
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>(
        "[data-magnetic]",
      );
      if (!el) return;
      gsap.to(el, { scale: 1, duration: 0.5, ease: "power3.out", overwrite: "auto" });
    };

    window.addEventListener("mousemove", move, { passive: true });
    document.addEventListener("mouseleave", leave);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", leave);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      gsap.utils.toArray<HTMLElement>("[data-magnetic]").forEach((el) =>
        gsap.set(el, { clearProps: "all" }),
      );
    };
  }, []);

  return null;
}

/**
 * Custom ring cursor. Pointer-fine devices only; hidden from assistive tech.
 */
export function Cursor() {
  const ring = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduceMotion() || !finePointer()) return;

    const rx = gsap.quickTo(ring.current, "x", { duration: 0.45, ease: "power3.out" });
    const ry = gsap.quickTo(ring.current, "y", { duration: 0.45, ease: "power3.out" });
    const dx = gsap.quickTo(dot.current, "x", { duration: 0.08, ease: "power2.out" });
    const dy = gsap.quickTo(dot.current, "y", { duration: 0.08, ease: "power2.out" });

    const onMove = (e: MouseEvent) => {
      rx(e.clientX);
      ry(e.clientY);
      dx(e.clientX);
      dy(e.clientY);
    };
    const onOver = (e: MouseEvent) => {
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>(
        "a, button, [data-magnetic]",
      );
      gsap.to(ring.current, {
        scale: el ? 1.9 : 1,
        borderColor: el ? "var(--color-sindoor)" : "var(--color-ink)",
        duration: 0.4,
        ease: "power3.out",
        overwrite: "auto",
      });
      gsap.to(dot.current, {
        scale: el ? 0 : 1,
        duration: 0.3,
        ease: "power3.out",
        overwrite: "auto",
      });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-100 hidden [@media(pointer:fine)]:block">
      <div
        ref={ring}
        className="absolute top-0 left-0 h-9 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full border border-ink/60"
      />
      <div
        ref={dot}
        className="absolute top-0 left-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sindoor"
      />
    </div>
  );
}

/**
 * Tracks which section owns the viewport and mirrors that into `data-active`
 * attributes used by the header nav and the fixed chapter rail.
 */
export function SectionSpy({ ids }: { ids: string[] }) {
  useEffect(() => {
    const setActive = (id: string | null) => {
      const all = document.querySelectorAll<HTMLElement>(
        "[data-nav-for], [data-rail-for]",
      );
      all.forEach((el) => {
        const owns = el.dataset.navFor === id || el.dataset.railFor === id;
        el.dataset.active = owns ? "true" : "false";
      });
    };

    const triggers = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el))
      .map((el) =>
        ScrollTrigger.create({
          trigger: el,
          start: "top 55%",
          end: "bottom 45%",
          onToggle: (self) => {
            if (self.isActive) setActive(el.id);
          },
        }),
      );

    setActive(null);

    return () => {
      triggers.forEach((t) => t.kill());
      setActive(null);
    };
  }, [ids]);

  return null;
}
