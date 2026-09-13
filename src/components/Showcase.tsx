import { useState } from "react";
import { cn } from "../utils/cn";
import { HudChip, Reveal, SectionHeading } from "./ui";
import SafeImg from "./SafeImg";
import { PHONE } from "../data/specs";
import { MEDIA } from "../data/media";

/**
 * Loadout uses ONE consistent official series for all three finishes:
 * OPPO pc/color3 (Midnight) / color2 (Purple) / color1 (Silver).
 * Same studio angle + dark backdrop → switching colors never changes composition.
 * GSMArena/91mobiles shots are fallbacks only (never primary), so the stage stays consistent.
 */
const FALLBACKS: Record<string, string[]> = {
  midnight: [MEDIA.hero, MEDIA.design91],
  purple: [MEDIA.design91, MEDIA.hero],
  silver: [MEDIA.silverBack, MEDIA.design91],
};

export default function Showcase() {
  const [sel, setSel] = useState(1); // default: Purple Phantom hero color
  const finish = PHONE.body.colors[sel];

  return (
    <section id="design" aria-labelledby="design-title" className="relative overflow-hidden py-24 sm:py-28">
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl transition-colors duration-700"
        style={{ backgroundColor: `${finish.accent}14` }}
        aria-hidden="true"
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          kicker="02 // Loadout"
          title={
            <span id="design-title">
              Pick your finish.
              <br className="sm:hidden" />{" "}
              <span style={{ color: finish.accent }} className="transition-colors duration-500">
                {finish.name}.
              </span>
            </span>
          }
          lead={`${PHONE.body.weight}, ${PHONE.body.thickness} — official OPPO renders below, same studio angle for every finish. Turbo Breathing Light dual Mist Shadow LEDs on all three.`}
          align="center"
        />

        <div className="mt-14 grid items-center gap-10 lg:grid-cols-2">
          <Reveal dir="left">
            <div className="hud-corners scanline relative mx-auto aspect-[4/5] w-full max-w-[440px] overflow-hidden rounded-lg border border-ice-400/12 bg-carbon-950">
              <div
                className="absolute left-1/2 top-[46%] h-[68%] w-[68%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl transition-colors duration-700"
                style={{ backgroundColor: `${finish.accent}26` }}
                aria-hidden="true"
              />
              {PHONE.body.colors.map((f, i) => (
                <div
                  key={f.id}
                  className={cn(
                    "absolute inset-0 transition-all duration-700 ease-out",
                    i === sel ? "opacity-100 scale-100" : "pointer-events-none opacity-0 scale-[1.04]"
                  )}
                  aria-hidden={i !== sel}
                >
                  <SafeImg
                    src={MEDIA[f.mediaKey as keyof typeof MEDIA] as unknown as string}
                    fallbacks={FALLBACKS[f.id]}
                    alt={`OPPO K13 Turbo Pro official ${f.name} render — rear panel, camera island and cooling fan vent, high resolution`}
                    className="h-full w-full object-cover"
                    eager={i === 1}
                  />
                </div>
              ))}
              <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-carbon-950/90 to-transparent" aria-hidden="true" />
              <div className="absolute left-4 top-4 flex items-center gap-2.5">
                <span className="font-mono-hud text-[10px] uppercase tracking-[0.3em] text-bone-400">
                  UNIT 0{sel + 1}
                </span>
                <span
                  className="h-px w-8 transition-colors duration-500"
                  style={{ backgroundColor: finish.accent }}
                  aria-hidden="true"
                />
                <span
                  className="font-display text-xs font-bold transition-colors duration-500"
                  style={{ color: finish.accent }}
                >
                  {finish.name.toUpperCase()}
                </span>
              </div>
              {/* finish dots — same order, instant visual consistency check */}
              <div className="absolute right-4 top-4 flex gap-1.5" aria-hidden="true">
                {PHONE.body.colors.map((f, i) => (
                  <span
                    key={f.id}
                    className={cn(
                      "h-2 w-2 rounded-full transition-all duration-300",
                      i === sel ? "scale-125" : "opacity-40"
                    )}
                    style={{ background: f.swatch }}
                  />
                ))}
              </div>
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <p className="font-mono-hud text-[10px] uppercase tracking-[0.22em] text-bone-400">
                  Official OPPO render · {finish.name}
                </p>
                <span className="flex gap-1.5" aria-hidden="true">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="eq-bar h-3 w-[3px] rounded-sm"
                      style={{ backgroundColor: finish.accent, animationDelay: `${i * 0.15}s` }}
                    />
                  ))}
                </span>
              </div>
            </div>
          </Reveal>

          <div>
            <div className="space-y-3" role="tablist" aria-label="Choose a finish">
              {PHONE.body.colors.map((f, i) => (
                <Reveal key={f.id} delay={i * 120} dir="right">
                  <button
                    role="tab"
                    aria-selected={sel === i}
                    onClick={() => setSel(i)}
                    className={cn(
                      "group w-full rounded-lg border p-4 text-left transition-all duration-300",
                      sel === i
                        ? "glass border-ice-400/35 shadow-glow-ice"
                        : "border-carbon-600/70 bg-carbon-900/50 hover:border-ice-400/20 hover:bg-carbon-800/70"
                    )}
                  >
                    <span className="flex items-center gap-4">
                      {/* consistent thumbnail: same crop for every finish */}
                      <span className="relative h-16 w-12 shrink-0 overflow-hidden rounded-md border border-carbon-600/60 bg-carbon-950">
                        <SafeImg
                          src={MEDIA[f.mediaKey as keyof typeof MEDIA] as unknown as string}
                          fallbacks={FALLBACKS[f.id]}
                          alt=""
                          className="h-full w-full object-cover"
                        />
                        <span
                          className="absolute inset-0 rounded-md ring-1 ring-inset transition-all"
                          style={{
                            boxShadow: sel === i ? `inset 0 0 0 2px ${f.accent}` : "none",
                          }}
                          aria-hidden="true"
                        />
                      </span>
                      <span className="flex-1">
                        <span className="flex flex-wrap items-baseline justify-between gap-2">
                          <span className="font-display text-base font-bold text-bone-50">{f.name}</span>
                          <span className="font-mono-hud text-xs text-bone-400">from {f.priceFrom}</span>
                        </span>
                        <span
                          className={cn(
                            "mt-1 block text-sm leading-relaxed",
                            sel === i ? "text-bone-300" : "text-bone-500"
                          )}
                        >
                          {f.desc}
                        </span>
                      </span>
                    </span>
                  </button>
                </Reveal>
              ))}
            </div>

            <Reveal delay={380}>
              <div className="mt-7 flex flex-wrap items-center gap-2.5">
                <HudChip>{PHONE.body.weight}</HudChip>
                <HudChip>{PHONE.body.thickness}</HudChip>
                <HudChip tone="ember">Turbo Breathing Light</HudChip>
                <HudChip tone="neutral">In-display fingerprint</HudChip>
              </div>
              <a
                href="#pricing"
                className="group mt-8 inline-flex items-center gap-3 rounded-md border border-ember-500/40 bg-ember-500/10 px-6 py-3.5 font-bold text-ember-300 transition-all duration-200 hover:bg-ember-500/20 hover:shadow-glow-ember"
              >
                Configure {finish.name}
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
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
