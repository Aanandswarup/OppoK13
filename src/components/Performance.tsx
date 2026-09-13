import { useState } from "react";
import { cn } from "../utils/cn";
import { useCountUp, useInView } from "../lib/hooks";
import { Reveal, SectionHeading } from "./ui";
import SafeImg from "./SafeImg";
import { PHONE } from "../data/specs";
import { MEDIA } from "../data/media";

type Game = {
  id: string;
  name: string;
  mode: string;
  cap: number;
  bars: { label: string; fps: number; self?: boolean }[];
};

const GAMES: Game[] = [
  {
    id: "codm",
    name: "COD Mobile",
    mode: "Ultra · 120 FPS target",
    cap: 120,
    bars: [
      { label: "K13 Turbo Pro · measured avg", fps: PHONE.gaming.codm.avg, self: true },
      { label: "Illustrative mid-range rival", fps: 97 },
      { label: "Illustrative budget rival", fps: 84 },
    ],
  },
  {
    id: "genshin",
    name: "Genshin Impact",
    mode: "Highest · 60 FPS",
    cap: 60,
    bars: [
      { label: "K13 Turbo Pro · measured avg", fps: PHONE.gaming.genshin.avg, self: true },
      { label: "Illustrative mid-range rival", fps: 48.5 },
      { label: "Illustrative budget rival", fps: 40.9 },
    ],
  },
  {
    id: "ww",
    name: "Wuthering Waves",
    mode: "Quality · Ultra High · 60",
    cap: 60,
    bars: [
      { label: "K13 Turbo Pro · measured avg", fps: PHONE.gaming.wuthering.avg, self: true },
      { label: "Illustrative mid-range rival", fps: 51 },
      { label: "Illustrative budget rival", fps: 42 },
    ],
  },
];

const LAB_STATS = [
  { v: PHONE.benchmarks.antutuDisplay, l: "AnTuTu (OPPO lab V10)", s: "Up to ~2.2 million" },
  { v: "2.34M", l: "AnTuTu v11 avg", s: "NanoReview sample mean" },
  {
    v: PHONE.benchmarks.geekbenchMulti.toLocaleString(),
    l: "Geekbench 6 multi",
    s: `Single ${PHONE.benchmarks.geekbenchSingle.toLocaleString()}`,
  },
  { v: "75–83%", l: "WL Extreme stability", s: "Fan on · GSMArena stress" },
];

function FpsChart() {
  const [game, setGame] = useState(0);
  const [ref, inView] = useInView<HTMLDivElement>(0.3);
  const g = GAMES[game];

  return (
    <div ref={ref}>
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Choose a game benchmark">
        {GAMES.map((gm, i) => (
          <button
            key={gm.id}
            role="tab"
            aria-selected={game === i}
            onClick={() => setGame(i)}
            className={cn(
              "rounded-md border px-4 py-2.5 font-mono-hud text-[11px] uppercase tracking-[0.18em] transition-all duration-250",
              game === i
                ? "border-ice-400/60 bg-ice-500/12 text-ice-300 shadow-glow-ice"
                : "border-carbon-600 bg-carbon-900/60 text-bone-400 hover:border-ice-400/25 hover:text-bone-100"
            )}
          >
            {gm.name}
          </button>
        ))}
      </div>

      <p className="mt-4 font-mono-hud text-[10px] uppercase tracking-[0.24em] text-bone-500">
        {g.mode} · published review averages
      </p>

      <div className="mt-4 space-y-5">
        {g.bars.map((b) => (
          <div key={b.label}>
            <div className="mb-1.5 flex items-baseline justify-between">
              <span className={cn("text-sm font-semibold", b.self ? "text-bone-50" : "text-bone-400")}>
                {b.label}
              </span>
              <span
                className={cn(
                  "font-display text-lg font-bold tabular-nums",
                  b.self ? "text-ice-300" : "text-bone-500"
                )}
              >
                {b.fps.toFixed(1)}
              </span>
            </div>
            <div className="relative h-7 overflow-hidden rounded-sm bg-carbon-800/80">
              <div
                className={cn(
                  "h-full rounded-sm transition-[width] duration-1000 ease-out",
                  b.self
                    ? "bg-gradient-to-r from-ice-600 via-ice-400 to-ember-400"
                    : "bg-carbon-600/80"
                )}
                style={{ width: inView ? `${(b.fps / g.cap) * 100}%` : "0%" }}
              />
              <span className="absolute inset-y-0 right-[2px] w-px bg-bone-300/30" aria-hidden="true" />
              {b.self && <span className="btn-sheen absolute inset-0 rounded-sm" aria-hidden="true" />}
            </div>
          </div>
        ))}
      </div>
      <p className="mt-4 font-mono-hud text-[10px] uppercase tracking-[0.2em] text-bone-500">
        K13 figures: Beebom gaming tables · rival bars illustrative · figures vary by patch & ambient temp
      </p>
    </div>
  );
}

function AntutuBreakdown() {
  const [ref, inView] = useInView<HTMLDivElement>(0.35);
  const total = useCountUp(2.2, inView, 1600, 1);
  const rows = [
    { name: "CPU", pct: 30, score: "≈696K" },
    { name: "GPU", pct: 35, score: "≈823K" },
    { name: "MEM", pct: 13, score: "≈307K" },
    { name: "UX", pct: 22, score: "≈523K" },
  ];
  return (
    <div ref={ref} className="glass overflow-hidden rounded-lg">
      <figure>
        <SafeImg
          src={MEDIA.oppoChip}
          fallbacks={[MEDIA.oppoSpecs]}
          alt="OPPO official Snapdragon 8s Gen 4 benchmark graphic — 2,200,000 AnTuTu lab score, TSMC 4nm"
          className="aspect-[16/7] w-full object-cover"
        />
        <figcaption className="border-b border-carbon-700/60 bg-carbon-900/80 px-5 py-1.5 font-mono-hud text-[9px] uppercase tracking-[0.18em] text-bone-500">
          Snapdragon 8s Gen 4 · 2.2M lab claim
        </figcaption>
      </figure>
      <div className="flex items-end justify-between gap-4 p-6 pb-0">
        <div>
          <p className="font-mono-hud text-[10px] uppercase tracking-[0.28em] text-ice-400">AnTuTu</p>
          <p className="font-display mt-1 text-3xl font-bold text-bone-50 tabular-nums">
            {total}
            <span className="text-ice-400">M+</span>
          </p>
          <p className="mt-1 text-xs text-bone-400">OPPO lab claim · V10 · flagship all-big-core design</p>
        </div>
        <p className="font-mono-hud text-right text-[10px] uppercase leading-relaxed tracking-[0.18em] text-bone-500">
          NanoReview v11
          <br />
          ~2.34M avg
        </p>
      </div>
      <div className="space-y-3 p-6 pt-5">
        {rows.map((r, i) => (
          <div key={r.name}>
            <div className="mb-1 flex justify-between text-xs">
              <span className="font-semibold text-bone-300">{r.name}</span>
              <span className="font-mono-hud text-bone-500">{r.score}</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-carbon-700">
              <div
                className="h-full rounded-full bg-gradient-to-r from-ice-500 to-ember-400 transition-[width] duration-1000"
                style={{ width: inView ? `${r.pct}%` : "0%", transitionDelay: `${i * 120}ms` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Performance() {
  return (
    <section id="performance" aria-labelledby="performance-title" className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          kicker="03 // Proof over promises"
          title={
            <span id="performance-title">
              Peaks are cheap.
              <br />
              Lab numbers hold.
            </span>
          }
          lead={`OPPO rates the ${PHONE.chipset} at ${PHONE.benchmarks.antutuDisplay} AnTuTu. Independent benches land around 2.0–2.4M depending on version. Fan-on Wild Life Extreme stability climbs past 75%.`}
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <Reveal dir="left" className="glass hud-corners rounded-lg p-7 sm:p-9">
            <FpsChart />
          </Reveal>

          <div className="flex flex-col gap-5">
            <Reveal dir="right">
              <AntutuBreakdown />
            </Reveal>
            <Reveal dir="right" delay={120} className="group relative min-h-[240px] overflow-hidden rounded-lg border border-ember-500/20">
              <SafeImg
                src={MEDIA.fanClose}
                fallbacks={[MEDIA.lights, MEDIA.oppoActive1]}
                alt="OPPO K13 Turbo Pro rear camera island with built-in 18,000 RPM cooling fan and Mist Shadow breathing LEDs (hi-res hands-on)"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[2.5s] ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-carbon-950 via-carbon-950/60 to-carbon-950/10" aria-hidden="true" />
              <div className="relative flex h-full min-h-[240px] flex-col justify-end p-6">
                <p className="font-mono-hud text-[10px] uppercase tracking-[0.3em] text-ember-400">
                  Storm Engine · 18,000 RPM
                </p>
                <p className="font-display mt-2 text-2xl font-bold text-bone-50">
                  2–4°C cooler under load
                </p>
                <p className="mt-2 text-sm leading-relaxed text-bone-300">
                  Micro-centrifugal fan + 7,000 mm² VC. GSMArena saw ~2°C cooler skin after hour-long sessions with the fan at full speed.
                </p>
              </div>
            </Reveal>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-ice-400/12 bg-ice-400/12 lg:grid-cols-4">
          {LAB_STATS.map((s, i) => (
            <Reveal
              key={s.l}
              delay={i * 100}
              className="bg-carbon-900/85 px-6 py-6 transition-colors duration-300 hover:bg-carbon-800"
            >
              <p className="font-display text-2xl sm:text-3xl font-bold text-bone-50">{s.v}</p>
              <p className="mt-1.5 text-sm font-semibold text-bone-100">{s.l}</p>
              <p className="mt-0.5 font-mono-hud text-[10px] uppercase tracking-[0.2em] text-bone-500">
                {s.s}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
