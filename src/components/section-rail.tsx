"use client";

const CHAPTERS = [
  ["#problem", "The problem"],
  ["#classify", "Classification"],
  ["#agents", "The panel"],
  ["#jurisdiction", "Jurisdiction"],
  ["#evidence", "Evidence"],
  ["#simulation", "Simulation"],
  ["#workflow", "The loop"],
  ["#compare", "Comparison"],
];

export function SectionRail() {
  return (
    <nav
      aria-label="Chapter index"
      className="pointer-events-none fixed top-1/2 left-5 z-40 hidden -translate-y-1/2 2xl:block"
    >
      <ul className="pointer-events-auto flex flex-col gap-3">
        {CHAPTERS.map(([id, label], i) => (
          <li key={id}>
            <a
              href={id}
              data-rail-for={id.slice(1)}
              data-active="false"
              className="group flex items-center gap-3 font-mono text-[9.5px] tracking-[0.2em] text-ink/35 uppercase transition-colors duration-300 hover:text-ink data-[active=true]:text-ink"
            >
              <span className="tabular-nums opacity-60 group-data-[active=true]:opacity-100">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span
                className="h-px w-5 origin-left scale-x-50 bg-current transition-transform duration-300 group-hover:scale-x-150 group-data-[active=true]:scale-x-150"
              />
              <span className="opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-data-[active=true]:opacity-100">
                {label}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
