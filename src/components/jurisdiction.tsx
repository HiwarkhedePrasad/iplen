"use client";

import { useState } from "react";

const PANELS = {
  india: [
    {
      title: "Indian Patent Act, 1970",
      ref: "§3(d) · §2(1)(j)",
      line: "A combination of known substances must show enhanced efficacy, not just a new mix.",
    },
    {
      title: "Biological Diversity Act, 2002",
      ref: "§4 · IBC",
      line: "Accessing local genetic resources needs prior permission and benefit-sharing.",
    },
    {
      title: "Drugs & Cosmetics Act, 1940",
      ref: "Rules, 1945",
      line: "Decides whether you are Classical, Proprietary, or a new drug.",
    },
    {
      title: "Trade Marks Act, 1999",
      ref: "Cl. 5 · Cl. 44",
      line: "Brand clearance before you print a single label.",
    },
    {
      title: "TKDL",
      ref: "5.2 lakh monographs",
      line: "Classical knowledge, already translated into English, Hindi and French.",
    },
  ],
  world: [
    {
      title: "WIPO · PCT",
      ref: "Art. 53",
      line: "One application, 150+ states, 30 months before you choose where to enter.",
    },
    {
      title: "Madrid Protocol",
      ref: "Art. 6",
      line: "Trademarks in many jurisdictions from a single filing.",
    },
    {
      title: "EU herbal medicinal products",
      ref: "Dir. 2004/24/EC",
      line: "30 years of documented use, at least 15 of them inside the EU.",
    },
    {
      title: "Nagoya Protocol",
      ref: "Art. 6 · 7",
      line: "Access and benefit-sharing rules follow the resource across the border.",
    },
    {
      title: "USPTO · FDA",
      ref: "21 CFR 101",
      line: "Claims language changes what you may say, not only what you may sell.",
    },
  ],
} as const;

export function JurisdictionToggle() {
  const [tab, setTab] = useState<keyof typeof PANELS>("india");
  const items = PANELS[tab];

  return (
    <div>
      <div className="relative grid grid-cols-2 border-2 border-ink bg-paper p-1">
        <span
          className="absolute top-1 bottom-1 left-1 w-[calc(50%-0.25rem)] bg-ink transition-transform duration-300 ease-out"
          style={{ transform: tab === "world" ? "translateX(100%)" : "none" }}
          aria-hidden="true"
        />
        {(["india", "world"] as const).map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => setTab(key)}
            aria-pressed={tab === key}
            className={`relative z-10 py-3 font-mono text-[11px] tracking-[0.2em] uppercase transition-colors duration-200 md:text-xs ${
              tab === key ? "text-haldi" : "text-ink/70 hover:text-ink"
            }`}
          >
            {key === "india" ? "India" : "International"}
          </button>
        ))}
      </div>

      <ul key={tab} className="fadeup mt-6 divide-y-2 divide-ink/10">
        {items.map((item) => (
          <li key={item.title} className="grid gap-1 py-4 md:grid-cols-[1fr_auto] md:gap-6">
            <div>
              <h3 className="font-display text-lg font-bold tracking-tight md:text-xl">
                {item.title}
              </h3>
              <p className="mt-1 text-[15px] leading-relaxed text-ink/65">{item.line}</p>
            </div>
            <span className="shrink-0 font-mono text-[11px] tracking-[0.12em] text-sindoor uppercase md:pt-1.5 md:text-right">
              {item.ref}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
