import type { ReactNode } from "react";
import { AgentPanel } from "@/components/sections/agent-panel";
import { ClassificationTrack } from "@/components/sections/classification-track";
import { ClosingCta } from "@/components/sections/closing-cta";
import { ComparisonTable } from "@/components/sections/comparison-table";
import { ConfidenceMeter } from "@/components/sections/confidence-meter";
import { Hero } from "@/components/sections/hero";
import { PersonaGrid } from "@/components/sections/persona-grid";
import { ShardDivider, ShardPair } from "@/components/sections/shards";
import { VelocityMarquee } from "@/components/sections/velocity-marquee";
import { WorkflowSection } from "@/components/sections/workflow-section";
import { Stagger, StrikeOut } from "@/components/motion-primitives";
import { Reveal } from "@/components/reveal";
import { SplitWords } from "@/components/split-text";
import { Eyebrow, SectionTitle } from "@/components/section-heading";
import { JurisdictionToggle } from "@/components/jurisdiction";

function SectionHead({
  num,
  label,
  title,
  lede,
  tone = "light",
}: {
  num: string;
  label: string;
  title: ReactNode;
  lede?: ReactNode;
  tone?: "light" | "dark";
}) {
  return (
    <>
      <Reveal start="top 92%">
        <Eyebrow num={num} label={label} tone={tone} />
      </Reveal>
      <SectionTitle tone={tone} delay={0.08}>
        {title}
      </SectionTitle>
      {lede ? (
        <SplitWords
          start="top 86%"
          className={`mt-5 max-w-2xl text-lg leading-relaxed ${
            tone === "dark" ? "text-bone/70" : "text-ink/70"
          }`}
        >
          {lede}
        </SplitWords>
      ) : null}
    </>
  );
}

const MARQUEE = [
  "7 specialist agents",
  "22 Indian languages",
  "§3(d) prior-art search",
  "TKDL + IPO registry",
  "India / international split",
  "Confidence on every claim",
  "ABS + Nagoya checklist",
  "Human escalation path",
];

const CLASSES = [
  {
    name: "Classical Medicine",
    line: "Prepared from the classical texts, in the form the formulary describes.",
    ref: "Formulary of Ayurvedic Medicine",
  },
  {
    name: "Patent or Proprietary",
    line: "Your own formula, not described in the classical literature as-is.",
    ref: "Drugs & Cosmetics Rules, 1945",
  },
  {
    name: "New Drug",
    line: "A molecule or indication that has never been marketed in India.",
    ref: "New Drugs & Clinical Trials Rules, 2019",
  },
  {
    name: "Phytopharmaceutical",
    line: "A purified or standardised plant fraction with a defined potency.",
    ref: "D&C (Amendment) Rules, 2015",
  },
  {
    name: "Ayurveda Aahar",
    line: "A food product with a nutritional or wellness claim, not a drug claim.",
    ref: "Food Safety & Standards, 2022",
  },
  {
    name: "Cosmetic",
    line: "Applied to the body for cleansing, perfuming or changing appearance.",
    ref: "Cosmetic Rules, 2020",
  },
];

const PERSONAS = [
  {
    code: "INVESTOR-01",
    role: "The investor",
    line: "Wants unit economics and a defensible claim before the term sheet.",
  },
  {
    code: "REGULATOR-04",
    role: "The regulator",
    line: "Asks for the classification memo and GMP evidence in the first reply.",
  },
  {
    code: "BUYER-12",
    role: "The buyer",
    line: "Reads the label for three seconds. Is “immunity” a claim or a promise?",
  },
  {
    code: "EXPORT-07",
    role: "The export officer",
    line: "Checks access and benefit-sharing documents at the port of loading.",
  },
  {
    code: "EXAMINER-09",
    role: "The patent examiner",
    line: "Cites the 47 prior filings your own search just surfaced.",
  },
  {
    code: "DISTRIBUTOR-03",
    role: "The distributor",
    line: "Needs shelf-life data and a price decision before shelf space.",
  },
];

const COMPARISON: [string, string, string][] = [
  ["Answers", "One chat reply, one screen", "A roadmap with a sequence of decisions"],
  [
    "Sources",
    "Sometimes linked, rarely checked",
    "Statute, registry and TKDL reference on every claim",
  ],
  ["Jurisdiction", "Blended together", "India and international, partitioned at retrieval"],
  ["Scope", "Intellectual property only", "IP, regulation, biodiversity, export"],
  ["Confidence", "None stated", "Scored per claim, with human escalation"],
  [
    "Before launch",
    "Nothing",
    "Virtual market simulation with AI stakeholders",
  ],
];

function Problem() {
  return (
    <section id="problem" className="bg-bone py-20 md:py-28">
      <div className="mx-auto max-w-[1200px] px-5 md:px-8">
        <Reveal start="top 92%">
          <Eyebrow num="01" label="The problem behind the problem" />
        </Reveal>
        <SectionTitle delay={0.08}>One formulation. Six consultants.</SectionTitle>

        <div className="mt-10 grid gap-10 md:mt-14 md:grid-cols-2 md:gap-14">
          <Reveal delay={80} from="left">
            <SplitWords className="text-lg leading-relaxed text-ink/75">
              Ashwagandha and Shilajit in a capsule, and you immediately need answers that
              no single person holds. Is it classical medicine or proprietary? Is the
              combination patentable? Is there prior art? Do you trademark first or file
              first? Does the Biodiversity Act apply? Can it leave the country at all?
            </SplitWords>
            <div className="mt-8 border-2 border-ink bg-ink p-6 shadow-[8px_8px_0_#ff4a1c]">
              <p className="font-display text-xl leading-snug font-bold text-bone md:text-2xl">
                “Is this classical medicine? Can it be patented? Does the Biodiversity Act
                apply to my supplier?”
              </p>
              <p className="mt-4 font-mono text-[10px] tracking-[0.2em] text-haldi uppercase">
                What a founder asks on day one
              </p>
            </div>
          </Reveal>

          <Reveal delay={160} from="right">
            <div className="font-mono text-[11px] tracking-[0.2em] text-ink/45 uppercase">
              The old loop
            </div>
            <StrikeOut className="mt-3 block text-lg leading-relaxed text-ink/40">
              Search → read the bare act → call a lawyer → verify → repeat
            </StrikeOut>
            <div className="mt-10 bg-ink px-5 py-4 font-mono text-[11px] tracking-[0.2em] text-neem uppercase">
              The IPLens loop
            </div>
            <p className="mt-3 bg-ink px-5 py-4 font-display text-lg leading-snug font-bold text-haldi md:text-xl">
              Describe it → the panel analyses → evidence-backed roadmap
            </p>
            <p className="mt-6 text-[15px] leading-relaxed text-ink/65">
              Minutes instead of a fortnight of appointments, with every conclusion
              traceable to the statute it came from.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Jurisdiction() {
  return (
    <section id="jurisdiction" className="border-t-2 border-ink bg-bone py-20 md:py-28">
      <div className="mx-auto max-w-[1200px] px-5 md:px-8">
        <Reveal start="top 92%">
          <Eyebrow num="04" label="Jurisdiction toggle" />
        </Reveal>
        <SectionTitle delay={0.08}>Two legal worlds. Never blended.</SectionTitle>
        <SplitWords
          start="top 86%"
          className="mt-5 max-w-2xl text-lg leading-relaxed text-ink/75"
        >
          The official requirement is simple: never mix Indian and international law.
          Retrieval is partitioned at the index level, so an Indian statute can never
          surface in an international answer — and the reverse.
        </SplitWords>

        <div className="mt-10 grid gap-10 md:mt-12 md:grid-cols-[minmax(0,420px)_minmax(0,1fr)] md:gap-16">
          <Reveal from="left">
            <JurisdictionToggle />
          </Reveal>
          <Reveal delay={120} from="right" className="h-full">
            <div className="flex h-full flex-col border-2 border-ink bg-ink p-6 text-bone md:p-8">
              <p className="font-mono text-[10px] tracking-[0.2em] text-neem uppercase">
                Hard rule
              </p>
              <p className="mt-4 font-display text-xl leading-snug font-bold md:text-2xl">
                Every answer states which regime it belongs to before it states anything
                else.
              </p>
              <Stagger as="ul" className="mt-6 space-y-3" y={16} each={0.09} start="top 92%">
                {[
                  "Sources are tagged at ingestion, not at generation time.",
                  "Cross-jurisdiction questions are split into two labelled answers.",
                  "Where regimes genuinely interact — Nagoya, export — both sides are cited separately.",
                ].map((line) => (
                  <li
                    key={line}
                    data-stagger-item
                    className="flex gap-3 text-[15px] leading-relaxed text-bone/70"
                  >
                    <span className="text-haldi">◆</span>
                    {line}
                  </li>
                ))}
              </Stagger>

              <ShardPair />

              <ShardDivider />

              <div className="mt-auto flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-t border-bone/15 pt-5 font-mono text-[10px] tracking-[0.16em] text-bone/45 uppercase">
                <span>India panel · 5 sources</span>
                <span>International panel · 5 sources</span>
                <span className="text-neem">never merged</span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Evidence() {
  const citations = [
    "Indian Patent Act, 1970 — §3(d)",
    "IPO patent database — prior-art search log, 47 hits",
    "Trade Marks Registry — Class 5 clearance",
    "Biological Diversity Act, 2002 — §4",
  ];

  return (
    <section id="evidence" className="border-t-2 border-ink bg-paper py-20 md:py-28">
      <div className="mx-auto max-w-[1200px] px-5 md:px-8">
        <Reveal start="top 92%">
          <Eyebrow num="05" label="Evidence-backed answers" />
        </Reveal>
        <SectionTitle delay={0.08}>Every answer arrives with its receipts.</SectionTitle>
        <SplitWords
          start="top 86%"
          className="mt-5 max-w-2xl text-lg leading-relaxed text-ink/70"
        >
          No naked claims. Each conclusion carries its statute, its registry search and its
          confidence score — plus a visible path to a human when the machine is not sure.
        </SplitWords>

        <Reveal delay={100} from="clip" className="mt-12">
          <article className="border-2 border-ink bg-ink p-6 text-bone md:p-10">
            <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-bone/15 pb-4 font-mono text-[10px] tracking-[0.2em] text-bone/45 uppercase">
              <span>Question · session 2F4A</span>
              <span className="text-neem">answered from 9 sources</span>
            </div>

            <p className="mt-6 font-display text-xl leading-snug font-bold text-haldi md:text-2xl">
              Our capsule combines Ashwagandha and Shilajit. Is the combination
              patentable, and what actually stops a copycat?
            </p>

            <SplitWords
            className="mt-6 max-w-3xl text-[15px] leading-[1.75] text-bone/75 md:text-base"
            >
              A fixed dose of two known substances rarely clears §3(d) on its own;
              protection here comes from a documented process, a dosage regime, or a
              demonstrated increase in efficacy
              <sup className="font-mono text-haldi">[1]</sup>. Prior art shows 47 filings in
              the same classification, three of them close
              <sup className="font-mono text-haldi">[2]</sup>. Clear the brand in Class 5
              before you print a label
              <sup className="font-mono text-haldi">[3]</sup>. Because the Shilajit source is
              regional, file the access record before you export
              <sup className="font-mono text-haldi">[4]</sup>.
            </SplitWords>

            <ConfidenceMeter value={82} suffix="medium-high" />

            <Stagger as="ul" className="mt-6 space-y-2" y={14} each={0.07} start="top 94%">
              {citations.map((c, i) => (
                <li
                  key={c}
                  data-stagger-item
                  className="font-mono text-[11.5px] leading-relaxed text-bone/60"
                >
                  <span className="text-haldi">[{i + 1}]</span> {c}
                </li>
              ))}
            </Stagger>

            <div className="mt-8 flex flex-col gap-5 border-t border-bone/15 pt-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-xl text-[13px] leading-relaxed text-bone/45">
                Two claims fell below threshold. IPLens is a research prototype — outputs
                are guidance, not legal advice.
              </p>
              <a
                href="#demo"
                data-magnetic
                className="shrink-0 border border-haldi px-5 py-3 text-center font-mono text-[11px] tracking-[0.16em] text-haldi uppercase transition hover:bg-haldi hover:text-ink"
              >
                Escalate to counsel →
              </a>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  );
}

function Compare() {
  return (
    <section id="compare" className="bg-ink py-20 text-bone md:py-28">
      <div className="mx-auto max-w-[1200px] px-5 md:px-8">
        <Reveal start="top 92%">
          <Eyebrow num="08" label="Why not just use a chatbot" tone="dark" />
        </Reveal>
        <SectionTitle tone="dark" delay={0.08}>
          A chatbot answers. IPLens reasons.
        </SectionTitle>
        <ComparisonTable rows={COMPARISON} />
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <VelocityMarquee items={MARQUEE} />
      <Problem />

      <section id="classify" className="border-t-2 border-ink bg-paper">
        <div className="mx-auto max-w-[1200px] px-5 pt-20 md:px-8 md:pt-28">
          <SectionHead
            num="02"
            label="Formulation classification"
            title="Six ways a formulation can be classified."
            lede={
              <>
                The first question decides every question after it. IPLens settles the
                category before it quotes a single statute, then attaches the compliance set
                that belongs to it.
              </>
            }
          />
        </div>
        <ClassificationTrack items={CLASSES} />
      </section>

      <section id="agents" className="bg-ink py-20 text-bone md:pt-28">
        <div className="mx-auto max-w-[1200px] px-5 md:px-8">
          <SectionHead
            num="03"
            label="Multi-agent research system"
            tone="dark"
            title="Not one model. A panel."
            lede={
              <>
                One model answers. Seven agents investigate: the planner decomposes the
                question, five specialists work their own sources, and the synthesizer
                merges everything into one cited answer with a confidence score.
              </>
            }
          />
        </div>
        <div className="mx-auto max-w-[1200px] px-5 pb-20 md:px-8 md:pb-28">
          <AgentPanel />
        </div>
      </section>

      <Jurisdiction />
      <Evidence />
      <PersonaGrid items={PERSONAS} />
      <WorkflowSection />
      <Compare />
      <ClosingCta />
    </>
  );
}
