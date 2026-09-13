import { useMemo } from "react";
import { useCountdown } from "../lib/hooks";
import { Reveal } from "./ui";

function Cell({ v, l }: { v: number; l: string }) {
  return (
    <div className="glass hud-corners flex min-w-[76px] flex-col items-center rounded-md px-4 py-4 sm:min-w-[92px] sm:px-6 sm:py-5">
      <span className="font-display text-3xl sm:text-4xl font-bold text-bone-50 tabular-nums">
        {String(v).padStart(2, "0")}
      </span>
      <span className="mt-1 font-mono-hud text-[9px] uppercase tracking-[0.3em] text-ice-400">{l}</span>
    </div>
  );
}

// Critic agent: only verifiable assurances — no invented warranties or fan lifespans.
const ASSURANCES = [
  { t: "1-year brand warranty", d: "OPPO India standard cover" },
  { t: "Easy 7-day replacement", d: "per retailer policy" },
  { t: "Free express shipping", d: "on eligible orders" },
];

export default function FinalCta() {
  const target = useMemo(() => Date.now() + ((5 * 24 * 3600 + 11 * 3600 + 42 * 60 + 30) * 1000), []);
  const { days, hours, mins, secs } = useCountdown(target);

  return (
    <section id="cta" aria-labelledby="cta-title" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal dir="zoom">
          <div className="relative overflow-hidden rounded-xl border border-ice-400/20 bg-gradient-to-b from-carbon-850 to-carbon-900/90">
            <div className="racing-stripes racing-stripes-animated absolute inset-x-0 top-0 h-2 opacity-80" aria-hidden="true" />
            <div
              className="pointer-events-none absolute -top-32 left-1/2 h-80 w-[42rem] -translate-x-1/2 rounded-full bg-ice-500/12 blur-3xl"
              style={{ animation: "pulse-glow 6s ease-in-out infinite" }}
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute -bottom-40 left-1/4 h-72 w-72 rounded-full bg-ember-500/10 blur-3xl"
              style={{ animation: "drift 18s ease-in-out infinite" }}
              aria-hidden="true"
            />

            <div className="relative px-6 py-14 text-center sm:px-14 sm:py-20">
              <p className="font-mono-hud text-[11px] uppercase tracking-[0.34em] text-ember-400">
                <span className="mr-3 inline-block h-px w-8 bg-ember-500/70 align-middle" aria-hidden="true" />
                09 // Deal window
                <span className="ml-3 inline-block h-px w-8 bg-ember-500/70 align-middle" aria-hidden="true" />
              </p>

              <h2 id="cta-title" className="font-display mx-auto mt-5 max-w-3xl text-4xl font-bold leading-[1.05] text-bone-50 sm:text-6xl">
                Stop renting frames.
                <span className="block bg-[linear-gradient(90deg,#4fe6f0,#ff8a3d)] bg-clip-text text-transparent">Own the Turbo.</span>
              </h2>

              <p className="mx-auto mt-6 max-w-xl text-base sm:text-lg leading-relaxed text-bone-300">
                Official India pricing starts at ₹37,999 for 8GB/256GB. Storm Engine cooling,
                2.2M+ AnTuTu lab claim, and a 7,000 mAh cell — before the deal window shifts.
              </p>

              <div className="mt-10 flex items-center justify-center gap-3 sm:gap-4" role="timer" aria-label="Illustrative offer countdown">
                <Cell v={days} l="Days" />
                <span className="font-display text-2xl text-bone-500" aria-hidden="true">:</span>
                <Cell v={hours} l="Hours" />
                <span className="font-display text-2xl text-bone-500" aria-hidden="true">:</span>
                <Cell v={mins} l="Mins" />
                <span className="font-display text-2xl text-bone-500" aria-hidden="true">:</span>
                <Cell v={secs} l="Secs" />
              </div>
              <p className="mt-3 font-mono-hud text-[10px] uppercase tracking-[0.2em] text-bone-500">
                Illustrative countdown · check OPPO.in for live offers
              </p>

              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <a
                  href="#pricing"
                  className="btn-sheen group inline-flex items-center gap-3 rounded-md bg-gradient-to-r from-ember-500 to-ember-400 px-9 py-4 text-lg font-bold text-carbon-950 shadow-glow-ember transition-all duration-200 hover:scale-[1.05] active:scale-95"
                >
                  Shop from ₹37,999
                  <svg viewBox="0 0 16 16" className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1.5" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
                    <path d="M3 8h10m0 0L9 4m4 4l-4 4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
                <a
                  href="#performance"
                  className="inline-flex items-center gap-2 rounded-md border border-ice-400/30 px-7 py-4 font-semibold text-ice-300 transition-all duration-200 hover:border-ice-400/60 hover:bg-ice-500/8"
                >
                  Re-run the benchmarks
                </a>
              </div>

              <ul className="mx-auto mt-12 grid max-w-3xl gap-6 sm:grid-cols-3">
                {ASSURANCES.map((a) => (
                  <li key={a.t} className="flex flex-col items-center gap-1">
                    <svg viewBox="0 0 24 24" className="h-6 w-6 text-ice-400" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                      <path d="M12 2l7 3v6c0 5-3.2 8.7-7 10-3.8-1.3-7-5-7-10V5l7-3z" strokeLinejoin="round" />
                      <path d="M8.8 12l2.2 2.2 4.2-4.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="text-sm font-bold text-bone-50">{a.t}</span>
                    <span className="font-mono-hud text-[10px] uppercase tracking-[0.18em] text-bone-500">{a.d}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
