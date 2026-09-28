"use client";

import type { ReactNode } from "react";
import { Rule } from "@/components/motion-primitives";
import { SplitHeading } from "@/components/split-text";

export function Eyebrow({
  num,
  label,
  tone = "light",
  delay = 0,
}: {
  num: string;
  label: string;
  tone?: "light" | "dark";
  delay?: number;
}) {
  return (
    <div
      className={`flex items-center gap-4 font-mono text-[11px] tracking-[0.22em] uppercase ${
        tone === "dark" ? "text-bone/55" : "text-ink/55"
      }`}
    >
      <span className="shrink-0">§ {num}</span>
      <Rule className={`flex-1 ${tone === "dark" ? "bg-bone/25" : "bg-ink/25"}`} delay={delay + 0.15} />
      <span className="shrink-0">{label}</span>
    </div>
  );
}

export function SectionTitle({
  children,
  tone = "light",
  className = "",
  delay = 0.1,
}: {
  children: ReactNode;
  tone?: "light" | "dark";
  className?: string;
  delay?: number;
}) {
  return (
    <SplitHeading
      as="h2"
      delay={delay}
      className={`mt-6 max-w-3xl font-display text-[clamp(2rem,4.5vw,3.4rem)] leading-[1.04] font-extrabold tracking-[-0.025em] ${
        tone === "dark" ? "text-bone" : "text-ink"
      } ${className}`}
    >
      {children}
    </SplitHeading>
  );
}
