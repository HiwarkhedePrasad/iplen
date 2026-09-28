"use client";

import type Lenis from "lenis";

let instance: Lenis | null = null;

export function setLenis(next: Lenis | null) {
  instance = next;
}

export function scrollToId(id: string) {
  const target = document.querySelector<HTMLElement>(id);
  if (!target) return;
  if (instance) {
    instance.scrollTo(target, { offset: -72, duration: 1.4 });
  } else {
    target.scrollIntoView({ behavior: "smooth" });
  }
}
