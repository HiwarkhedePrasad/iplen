"use client";

import { forwardRef } from "react";

const STAGES = [
  { title: "Formulation input", note: "Ingredients, purpose, preparation, target market." },
  { title: "Classification", note: "What the product is decides everything after it." },
  { title: "Prior art", note: "TKDL, patent and trademark registries, earlier formulations." },
  { title: "IP strategy", note: "Patent, GI, trademark, design, or layered combinations." },
  { title: "Regulatory compliance", note: "Licences, labels, claims, ABS obligations." },
  { title: "Market readiness", note: "Stakeholder simulation before a single unit is made." },
  { title: "Feedback loop", note: "Every new finding re-enters the analysis as evidence." },
];

const SIZE = 420;
const CENTER = SIZE / 2;
const RADIUS = 146;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const points = STAGES.map((stage, i) => {
  const angle = (-90 + (360 / STAGES.length) * i) * (Math.PI / 180);
  return {
    ...stage,
    index: i,
    x: CENTER + RADIUS * Math.cos(angle),
    y: CENTER + RADIUS * Math.sin(angle),
    lx: CENTER + (RADIUS + 42) * Math.cos(angle),
    ly: CENTER + (RADIUS + 42) * Math.sin(angle),
    anchor:
      Math.abs(Math.cos(angle)) < 0.2
        ? ("middle" as const)
        : Math.cos(angle) > 0
          ? ("start" as const)
          : ("end" as const),
  };
});

export const WORKFLOW_STAGES = STAGES;

export const WorkflowRing = forwardRef<
  SVGSVGElement,
  { className?: string }
>(function WorkflowRing({ className = "" }, ref) {
  return (
    <svg
      ref={ref}
      viewBox="-95 -8 565 416"
      className={`mx-auto hidden w-full max-w-[540px] md:block ${className}`}
      role="img"
      aria-label="Seven stage research loop: formulation input, classification, prior art, IP strategy, regulatory compliance, market readiness, feedback loop."
    >
      <circle
        cx={CENTER}
        cy={CENTER}
        r={RADIUS}
        fill="none"
        stroke="var(--color-ink)"
        strokeOpacity={0.3}
        strokeWidth={1.5}
        strokeDasharray="5 7"
        className="ring-dash"
      />
      <circle
        data-ring-progress
        cx={CENTER}
        cy={CENTER}
        r={RADIUS}
        fill="none"
        stroke="var(--color-sindoor)"
        strokeWidth={3}
        strokeLinecap="round"
        strokeDasharray={CIRCUMFERENCE}
        strokeDashoffset={CIRCUMFERENCE}
        transform={`rotate(-90 ${CENTER} ${CENTER})`}
        opacity={0.85}
      />
      <circle cx={CENTER} cy={CENTER} r={54} fill="var(--color-ink)" />
      <text
        x={CENTER}
        y={CENTER - 6}
        textAnchor="middle"
        fill="var(--color-haldi)"
        fontSize="11"
        letterSpacing="2.4"
        fontFamily="var(--font-plex-mono)"
      >
        RESEARCH
      </text>
      <text
        x={CENTER}
        y={CENTER + 12}
        textAnchor="middle"
        fill="var(--color-bone)"
        fontSize="11"
        letterSpacing="2.4"
        fontFamily="var(--font-plex-mono)"
      >
        LOOP
      </text>
      {points.map((p) => (
        <g key={p.title} data-ring-node={p.index}>
          <circle
            data-ring-node-dot
            cx={p.x}
            cy={p.y}
            r={19}
            fill="var(--color-paper)"
            stroke="var(--color-ink)"
            strokeWidth={2}
            style={{ transformOrigin: `${p.x}px ${p.y}px` }}
          />
          <text
            x={p.x}
            y={p.y + 5}
            textAnchor="middle"
            fill="var(--color-ink)"
            fontSize="14"
            fontWeight="700"
            fontFamily="var(--font-plex-mono)"
          >
            {p.index + 1}
          </text>
          <text
            data-ring-label
            x={p.lx}
            y={p.ly + 4}
            textAnchor={p.anchor}
            fill="var(--color-ink)"
            opacity={0.5}
            fontSize="15"
            fontWeight="600"
            fontFamily="var(--font-sans)"
          >
            {p.title}
          </text>
        </g>
      ))}
    </svg>
  );
});

export function WorkflowRingList({
  active,
}: {
  active: number | null;
}) {
  return (
    <ol className="mt-2 space-y-0 md:hidden">
      {points.map((p) => (
        <li
          key={p.title}
          data-ring-row={p.index}
          className="flex gap-4 border-t border-ink/15 py-4 transition-colors duration-300"
          style={{
            borderColor: active === p.index ? "var(--color-ink)" : undefined,
            background: active === p.index ? "var(--color-haldi)" : "transparent",
          }}
        >
          <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 border-ink bg-paper font-mono text-xs font-bold">
            {p.index + 1}
          </span>
          <div>
            <h3 className="font-display text-base font-bold tracking-tight">{p.title}</h3>
            <p className="mt-0.5 text-sm leading-relaxed text-ink/60">{p.note}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
