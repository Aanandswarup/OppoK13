import { useEffect, useState } from "react";
import { usePrefersReducedMotion, useTilt } from "../lib/hooks";
import { Reveal, Stars } from "./ui";
import SafeImg from "./SafeImg";
import { PHONE } from "../data/specs";
import { MEDIA } from "../data/media";

function useLiveTelemetry() {
  const [fps, setFps] = useState(120);
  const [temp, setTemp] = useState(36.1);
  const reduced = usePrefersReducedMotion();
  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => {
      setFps(117 + Math.floor(Math.random() * 4));
      setTemp(+(35.7 + Math.random() * 0.9).toFixed(1));
    }, 950);
    return () => clearInterval(id);
  }, [reduced]);
  return { fps, temp };
}

function BatteryRing({ pct }: { pct: number }) {
  const r = 15;
  const c = 2 * Math.PI * r;
  return (
    <svg viewBox="0 0 40 40" className="h-10 w-10 -rotate-90" aria-hidden="true">
      <circle cx="20" cy="20" r={r} fill="none" stroke="rgba(142,242,248,0.15)" strokeWidth="3.5" />
      <circle
        cx="20"
        cy="20"
        r={r}
        fill="none"
        stroke="#4fe6f0"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={c * (1 - pct / 100)}
        style={{ transition: "stroke-dashoffset 1.2s cubic-bezier(0.22,1,0.36,1)" }}
      />
    </svg>
  );
}

const SPECS = [
  { k: "SoC", v: "SD 8s Gen 4" },
  { k: "AnTuTu", v: PHONE.benchmarks.antutuDisplay },
  { k: "Battery", v: "7,000 mAh" },
  { k: "Cooling", v: "Storm Engine" },
];

export default function Hero({
  isTouring,
  reducedMotion,
  onToggleTour,
}: {
  isTouring: boolean;
  reducedMotion: boolean;
  onToggleTour: () => void;
}) {
  const tilt = useTilt(8);
  const { fps, temp } = useLiveTelemetry();

  return (
    <section
      id="top"
      tabIndex={-1}
      aria-label="OPPO K13 Turbo Pro introduction"
      className="relative overflow-hidden pt-[104px] pb-0 focus:outline-none"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-6">
          <div className="relative z-10">
            <Reveal>
              <p className="inline-flex items-center gap-3 rounded-sm border border-ember-500/30 bg-ember-500/8 px-3.5 py-2 font-mono-hud text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-ember-300">
                <span className="relative flex h-2 w-2" aria-hidden="true">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ember-400 opacity-70" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-ember-400" />
                </span>
                OPPO · K-Series · Model {PHONE.model}
              </p>
            </Reveal>

            <Reveal delay={120}>
              <h1 className="font-display mt-6 font-bold leading-[0.94] text-bone-50">
                <span className="block text-[17vw] sm:text-7xl lg:text-[5.2rem] tracking-tight text-transparent bg-clip-text bg-[linear-gradient(180deg,#f2f6f8_30%,#8fa2b0_100%)]">
                  K13
                </span>
                <span className="mt-1 block text-[11.5vw] sm:text-5xl lg:text-[3.4rem] tracking-tight">
                  TURBO <span className="text-ghost">PRO</span>
                </span>
              </h1>
            </Reveal>

            <Reveal delay={240}>
              <p className="mt-6 max-w-xl text-lg sm:text-xl leading-relaxed text-bone-300">
                The first K-Series phone with a real{" "}
                <span className="text-ice-300 font-semibold">Storm Engine turbine</span> inside.
                Snapdragon 8s Gen 4, {PHONE.benchmarks.antutuDisplay} AnTuTu, a 7,000&nbsp;mAh
                silicon-carbon cell and a 1.5K 120&nbsp;Hz battle display — cool to the core.
              </p>
            </Reveal>

            <Reveal delay={360}>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="#pricing"
                  className="btn-sheen group inline-flex items-center gap-3 rounded-md bg-gradient-to-r from-ember-500 to-ember-400 px-7 py-4 text-base font-bold text-carbon-950 shadow-glow-ember transition-all duration-200 hover:scale-[1.04] active:scale-95"
                >
                  Shop from ₹37,999
                  <svg
                    viewBox="0 0 16 16"
                    className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <path d="M3 8h10m0 0L9 4m4 4l-4 4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
                <a
                  href="#performance"
                  className="group inline-flex items-center gap-3 rounded-md border border-ice-400/25 bg-carbon-800/50 px-6 py-4 text-base font-semibold text-ice-300 transition-all duration-200 hover:border-ice-400/50 hover:bg-carbon-800 hover:shadow-glow-ice"
                >
                  <span
                    className="flex h-7 w-7 items-center justify-center rounded-full border border-ice-400/40 transition-transform duration-300 group-hover:scale-110"
                    aria-hidden="true"
                  >
                    <svg viewBox="0 0 10 12" className="ml-0.5 h-2.5 w-2.5" fill="currentColor">
                      <path d="M0 0l10 6-10 6z" />
                    </svg>
                  </span>
                  Official lab stats
                </a>
              </div>
              <button
                type="button"
                data-page-tour-control
                onClick={onToggleTour}
                aria-controls="main"
                aria-describedby="page-tour-description"
                className="group mt-4 inline-flex min-h-11 items-center gap-2.5 rounded-md border border-ice-400/25 bg-ice-500/5 px-4 py-2.5 text-sm font-semibold text-ice-300 transition-all duration-200 hover:border-ice-400/60 hover:bg-ice-500/10 hover:shadow-glow-ice active:scale-95"
              >
                <svg viewBox="0 0 16 16" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                  {isTouring ? (
                    <rect x="3" y="3" width="10" height="10" rx="1.5" />
                  ) : (
                    <path d="M5 2.5a.5.5 0 0 1 .76-.43l8 5a1.1 1.1 0 0 1 0 1.86l-8 5A.5.5 0 0 1 5 13.5z" />
                  )}
                </svg>
                {isTouring ? "Stop page tour" : reducedMotion ? "Go to bottom" : "Play page tour"}
                <svg
                  viewBox="0 0 16 16"
                  className="h-3.5 w-3.5 transition-transform group-hover:translate-y-0.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  aria-hidden="true"
                >
                  <path d="M8 3v10m0 0l-4-4m4 4l4-4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <span id="page-tour-description" className="sr-only">
                {reducedMotion
                  ? "Go directly to the footer without animation."
                  : "Automatically scroll through the full page and its animations. Scroll, touch the page, or press Escape to stop."}
              </span>
            </Reveal>

            <Reveal delay={480}>
              <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-bone-400">
                <span className="inline-flex items-center gap-2">
                  <Stars value={4.4} />
                  <b className="text-bone-100">4.4</b>
                </span>
                <span className="h-4 w-px bg-carbon-600" aria-hidden="true" />
                <span>
                  <b className="text-bone-100">2,100+</b> verified reviews
                </span>
                <span className="h-4 w-px bg-carbon-600 hidden sm:block" aria-hidden="true" />
                <span className="hidden sm:inline">
                  80W SUPERVOOC charger <b className="text-bone-100">in the box</b>
                </span>
              </div>
            </Reveal>

            <Reveal delay={600}>
              <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-ice-400/12 bg-ice-400/12 sm:grid-cols-4">
                {SPECS.map((s) => (
                  <div
                    key={s.k}
                    className="bg-carbon-900/90 px-4 py-3.5 transition-colors duration-300 hover:bg-carbon-800"
                  >
                    <dt className="font-mono-hud text-[10px] uppercase tracking-[0.24em] text-bone-500">
                      {s.k}
                    </dt>
                    <dd className="mt-1 font-display text-sm sm:text-[15px] font-semibold text-bone-50">
                      {s.v}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          <Reveal delay={250} dir="zoom" className="relative">
            <div
              ref={tilt.ref}
              onMouseMove={tilt.onMouseMove}
              onMouseLeave={tilt.onMouseLeave}
              className="relative mx-auto w-full max-w-[380px] transition-transform duration-300 ease-out will-change-transform"
            >
              <div
                className="absolute left-1/2 top-1/2 -z-10 h-[115%] w-[115%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 blur-2xl"
                style={{
                  background:
                    "conic-gradient(from 0deg, rgba(35,213,226,0.35), transparent 28%, rgba(255,106,31,0.3) 50%, transparent 74%, rgba(35,213,226,0.35))",
                  animation: "spin-slow 14s linear infinite",
                }}
                aria-hidden="true"
              />
              <div
                className="absolute left-1/2 top-1/2 -z-10 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-ice-500/14 blur-3xl"
                style={{ animation: "pulse-glow 5s ease-in-out infinite" }}
                aria-hidden="true"
              />

              <div className="relative overflow-hidden rounded-[2rem] border border-ice-400/15 bg-carbon-950">
                <div style={{ animation: "float-y 7s ease-in-out infinite" }}>
                  <SafeImg
                    src={MEDIA.oppoPurple}
                    fallbacks={[MEDIA.hero, MEDIA.design91]}
                    alt="OPPO K13 Turbo Pro official high-resolution Purple Phantom render — rear panel with camera island, cooling fan vent and Mist Shadow breathing LEDs"
                    className="relative aspect-[4/5] w-full select-none object-cover"
                    eager
                    width={880}
                    height={1100}
                  />
                </div>
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-carbon-950/90 to-transparent" aria-hidden="true" />
                <p className="absolute bottom-3 left-0 right-0 text-center font-mono-hud text-[9px] uppercase tracking-[0.22em] text-bone-400">
                  Official OPPO render · Purple Phantom · hi-res
                </p>
              </div>

              <div
                className="glass hud-corners absolute -left-3 sm:-left-10 top-[14%] rounded-md px-4 py-3 shadow-glow-ice"
                style={{ animation: "float-y 6s ease-in-out infinite", animationDelay: "-2s" }}
              >
                <p className="font-mono-hud text-[9px] uppercase tracking-[0.3em] text-bone-400">
                  Live framerate
                </p>
                <p className="font-display text-2xl font-bold text-ice-300 tabular-nums">
                  {fps}
                  <span className="ml-1 text-xs text-bone-400">FPS</span>
                </p>
                <div className="mt-1.5 flex h-4 items-end gap-[3px]" aria-hidden="true">
                  {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                    <span
                      key={i}
                      className="eq-bar w-[3px] rounded-sm bg-ice-400"
                      style={{ height: `${8 + (i % 4) * 3}px`, animationDelay: `${i * 0.12}s` }}
                    />
                  ))}
                </div>
              </div>

              <div
                className="glass absolute -right-2 sm:-right-8 top-[38%] flex items-center gap-3 rounded-md px-4 py-3"
                style={{ animation: "float-y 7.5s ease-in-out infinite", animationDelay: "-4s" }}
              >
                <BatteryRing pct={92} />
                <div>
                  <p className="font-mono-hud text-[9px] uppercase tracking-[0.3em] text-bone-400">
                    7,000 mAh cell
                  </p>
                  <p className="font-display text-lg font-bold text-bone-50">Si/C battery</p>
                </div>
              </div>

              <div
                className="glass absolute bottom-[10%] left-[6%] rounded-md px-4 py-3"
                style={{ animation: "float-y 6.8s ease-in-out infinite", animationDelay: "-1s" }}
              >
                <p className="font-mono-hud text-[9px] uppercase tracking-[0.3em] text-bone-400">
                  Fan · {PHONE.cooling.fanRpm}
                </p>
                <p className="font-display text-lg font-bold text-ember-300 tabular-nums">
                  {temp.toFixed(1)}°C <span className="text-xs text-bone-400">skin</span>
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      <div
        className="pointer-events-none absolute bottom-10 left-6 hidden xl:flex flex-col items-center gap-3"
        aria-hidden="true"
      >
        <span className="font-mono-hud text-[10px] uppercase tracking-[0.4em] text-bone-500 [writing-mode:vertical-rl]">
          Scroll
        </span>
        <span className="relative h-14 w-px overflow-hidden bg-carbon-600">
          <span
            className="absolute inset-x-0 top-0 h-5 bg-ice-400"
            style={{ animation: "scan 2s ease-in-out infinite" }}
          />
        </span>
      </div>
    </section>
  );
}
