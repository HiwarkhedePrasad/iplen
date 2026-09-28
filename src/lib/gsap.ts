"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText);
  ScrollTrigger.config({ ignoreMobileResize: true });
  if (process.env.NODE_ENV !== "production") {
    (window as unknown as { __st?: typeof ScrollTrigger }).__st = ScrollTrigger;
  }
}

export const EASE = {
  out: "expo.out",
  smooth: "power3.out",
  inOut: "power2.inOut",
} as const;

export function reduceMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function finePointer() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(pointer: fine)").matches;
}

export { gsap, ScrollTrigger, SplitText, useGSAP };
