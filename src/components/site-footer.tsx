"use client";

import { Mark } from "@/components/mark";
import { Stagger } from "@/components/motion-primitives";
import { scrollToId } from "@/lib/scroll";

const NAV_LINKS = [
  ["Agents", "#agents"],
  ["Jurisdiction", "#jurisdiction"],
  ["Evidence", "#evidence"],
  ["Simulation", "#simulation"],
  ["Loop", "#workflow"],
];

const SOURCES = [
  "Patent Act · Trademark Act",
  "Biological Diversity Act",
  "AYUSH regulations · Gazette",
  "TKDL · WIPO · Madrid",
];

export function SiteFooter() {
  return (
    <footer className="border-t-2 border-ink bg-ink py-14 text-bone">
      <div className="mx-auto max-w-[1200px] px-5 md:px-8">
        <Stagger
          className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]"
          y={24}
          each={0.09}
        >
          <div data-stagger-item>
            <a
              href="#top"
              className="flex items-center gap-2.5 font-display text-xl font-extrabold tracking-tight"
            >
              <Mark className="h-6 w-6" highlight="var(--color-haldi)" />
              IPLens
            </a>
            <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-bone/60">
              IP-SAKTI Sahayak — AI-powered IP and regulatory intelligence for Ayurveda.
              From formulation to protection.
            </p>
          </div>

          <div data-stagger-item>
            <p className="font-mono text-[10px] tracking-[0.2em] text-bone/40 uppercase">
              Platform
            </p>
            <ul className="mt-4 space-y-2.5 text-[15px] text-bone/70">
              {NAV_LINKS.map(([label, href]) => (
                <li key={href}>
                  <a href={href} className="transition-colors hover:text-haldi">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div data-stagger-item>
            <p className="font-mono text-[10px] tracking-[0.2em] text-bone/40 uppercase">
              Knowledge sources
            </p>
            <ul className="mt-4 space-y-2.5 text-[15px] text-bone/70">
              {SOURCES.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
        </Stagger>

        <div className="mt-12 flex flex-col gap-4 border-t border-bone/15 pt-6 font-mono text-[10px] tracking-[0.16em] text-bone/40 uppercase md:flex-row md:items-center md:justify-between">
          <span>SIH 2026 · SIH26045 · Ministry of AYUSH × AIIA</span>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <span>Research prototype — not legal advice</span>
            <button
              type="button"
              onClick={() => scrollToId("#top")}
              className="border border-bone/25 px-3 py-1.5 text-bone/70 transition-colors hover:border-haldi hover:text-haldi"
            >
              Back to top ↑
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
