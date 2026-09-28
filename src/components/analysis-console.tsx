"use client";

import { useEffect, useState } from "react";

const QUERY = "Ashwagandha + Shilajit capsules, immunity, export to EU";

const STEPS = [
  { name: "Planner", result: "decomposed into 5 sub-queries", ms: 620 },
  {
    name: "Classification",
    result: "Patent or Proprietary Medicine · D&C Schedule",
    ms: 780,
  },
  { name: "Patent", result: "47 prior-art hits · 3 close matches", ms: 900 },
  { name: "Trademark", result: "2 similar marks pending in Class 5", ms: 700 },
  {
    name: "Regulatory",
    result: "AYUSH manufacturing licence checklist ready",
    ms: 760,
  },
  {
    name: "International",
    result: "PCT runway open · EU herbal monograph flagged",
    ms: 840,
  },
  { name: "Evidence", result: "12 citations · confidence 84%", ms: 700 },
];

const CITATIONS = [
  "Patent Act, 1970 — §3(d)",
  "D&C Rules, 1945 — Sch. entry",
  "Biodiversity Act, 2002 — §4",
  "TKDL prior-art reference",
];

export function AnalysisConsole() {
  const [runId, setRunId] = useState(0);
  return (
    <ConsoleRun key={runId} runId={runId} onReplay={() => setRunId((id) => id + 1)} />
  );
}

function ConsoleRun({ runId, onReplay }: { runId: number; onReplay: () => void }) {
  const [typed, setTyped] = useState("");
  const [phase, setPhase] = useState(-1);

  useEffect(() => {
    const timers: number[] = [];
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce) {
      timers.push(
        window.setTimeout(() => {
          setTyped(QUERY);
          setPhase(STEPS.length);
        }, 0),
      );
      return () => timers.forEach((t) => window.clearTimeout(t));
    }

    let charIndex = 0;
    let stepIndex = 0;

    const finish = () => {
      setPhase(STEPS.length);
      timers.push(window.setTimeout(onReplay, 7000));
    };

    const runSteps = () => {
      setPhase(stepIndex);
      timers.push(
        window.setTimeout(() => {
          stepIndex += 1;
          if (stepIndex < STEPS.length) {
            runSteps();
          } else {
            finish();
          }
        }, STEPS[stepIndex].ms),
      );
    };

    const typeNext = () => {
      charIndex += 1;
      setTyped(QUERY.slice(0, charIndex));
      if (charIndex < QUERY.length) {
        timers.push(window.setTimeout(typeNext, 26));
      } else {
        timers.push(window.setTimeout(runSteps, 380));
      }
    };

    timers.push(window.setTimeout(typeNext, 450));

    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [runId, onReplay]);

  const done = phase >= STEPS.length;
  const pct = phase < 0 ? 0 : Math.round((Math.min(phase, STEPS.length) / STEPS.length) * 100);

  return (
    <div className="border-2 border-ink bg-ink text-bone shadow-[10px_10px_0_#ff4a1c]">
      <div className="flex items-center justify-between gap-4 border-b border-bone/15 px-4 py-3 md:px-6">
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-bone/55 md:text-[11px]">
          IPLens · Analysis console
        </span>
        <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] md:text-[11px]">
          <span
            className={`inline-block h-1.5 w-1.5 rounded-full ${done ? "bg-neem" : "animate-pulse bg-haldi"}`}
          />
          <span className={done ? "text-neem" : "text-haldi"}>
            {done ? "Complete" : "Running"}
          </span>
        </span>
      </div>

      <div className="px-4 py-5 md:px-6 md:py-6">
        <p className="font-mono text-[13px] leading-relaxed break-words md:text-sm">
          <span className="text-haldi">›</span> <span className="text-bone">{typed}</span>
          {!done && typed.length < QUERY.length ? (
            <span className="caret text-haldi">▍</span>
          ) : null}
        </p>

        <ul className="mt-6 space-y-4">
          {STEPS.map((step, i) => {
            const state = phase > i || done ? "done" : phase === i ? "running" : "queued";
            return (
              <li key={step.name} className="flex items-start gap-3">
                <span
                  className={`w-4 shrink-0 text-center text-sm leading-6 ${
                    state === "done"
                      ? "text-neem"
                      : state === "running"
                        ? "animate-spin text-haldi"
                        : "text-bone/25"
                  }`}
                >
                  {state === "done" ? "✓" : state === "running" ? "◐" : "○"}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="font-mono text-[11px] tracking-[0.16em] text-bone uppercase">
                      {step.name}
                    </span>
                    <span className="shrink-0 font-mono text-[10px] tabular-nums text-bone/35">
                      {state === "done" ? `+${(step.ms / 1000).toFixed(2)}s` : ""}
                    </span>
                  </div>
                  {state !== "queued" ? (
                    <p
                      className={`mt-0.5 text-[13px] ${state === "running" ? "animate-pulse text-haldi/80" : "text-bone/55"}`}
                    >
                      {step.result}
                    </p>
                  ) : null}
                </div>
              </li>
            );
          })}
        </ul>

        {done ? (
          <div className="fadeup mt-7 border-t border-bone/15 pt-6">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-bone/45">
                Classification
              </span>
              <span className="font-mono text-[10px] tracking-[0.16em] text-neem uppercase">
                confidence 84% · medium-high
              </span>
            </div>
            <p className="mt-2 font-display text-2xl font-extrabold tracking-tight text-haldi md:text-3xl">
              Patent or Proprietary Medicine
            </p>
            <div className="mt-4 h-2 w-full bg-bone/10">
              <div
                className="h-full bg-haldi transition-[width] duration-700 ease-out"
                style={{ width: "84%" }}
              />
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {CITATIONS.map((c) => (
                <span
                  key={c}
                  className="border border-bone/25 px-2.5 py-1 font-mono text-[10px] tracking-wide text-bone/70"
                >
                  {c}
                </span>
              ))}
            </div>
            <p className="mt-4 text-[12px] leading-relaxed text-bone/45">
              2 findings fell below the confidence threshold and are flagged for human
              review.
            </p>
          </div>
        ) : null}
      </div>

      <div className="flex items-center gap-3 border-t border-bone/15 px-4 py-3 md:px-6">
        <span className="shrink-0 font-mono text-[10px] tracking-[0.16em] tabular-nums text-bone/45 uppercase">
          {Math.min(phase + 1, STEPS.length)}/{STEPS.length} agents
        </span>
        <div className="h-1 flex-1 bg-bone/10">
          <div
            className="h-full bg-neem transition-[width] duration-500 ease-out"
            style={{ width: `${pct}%` }}
          />
        </div>
        <button
          type="button"
          onClick={onReplay}
          className="shrink-0 border border-bone/30 px-3 py-1.5 font-mono text-[10px] tracking-[0.16em] text-haldi uppercase transition hover:border-haldi hover:bg-haldi hover:text-ink"
        >
          Replay ↻
        </button>
      </div>
    </div>
  );
}
