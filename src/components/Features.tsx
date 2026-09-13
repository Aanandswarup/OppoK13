import { useCountUp, useInView } from "../lib/hooks";
import { Reveal, SectionHeading, SpotlightCard } from "./ui";
import SafeImg from "./SafeImg";
import { PHONE } from "../data/specs";
import { MEDIA } from "../data/media";

function Turbine({ size = 190 }: { size?: number }) {
  return (
    <div className="relative" style={{ width: size, height: size }} aria-hidden="true">
      <div
        className="absolute inset-0 rounded-full border border-dashed border-ice-400/25"
        style={{ animation: "spin-slow 22s linear infinite reverse" }}
      />
      <div
        className="absolute -inset-6 rounded-full border border-ice-400/10"
        style={{ animation: "spin-slow 34s linear infinite" }}
      />
      <svg viewBox="0 0 200 200" className="relative h-full w-full">
        <defs>
          <radialGradient id="turb-core" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#4fe6f0" stopOpacity="0.9" />
            <stop offset="55%" stopColor="#12aebd" stopOpacity="0.35" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          <linearGradient id="turb-blade" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#8ef2f8" />
            <stop offset="100%" stopColor="#1f93a3" />
          </linearGradient>
        </defs>
        <circle cx="100" cy="100" r="86" fill="rgba(10,15,22,0.9)" stroke="rgba(79,230,240,0.35)" strokeWidth="2.5" />
        <circle cx="100" cy="100" r="86" fill="url(#turb-core)" opacity="0.5" />
        <g style={{ transformBox: "fill-box", transformOrigin: "center", animation: "spin-slow 1.4s linear infinite" }}>
          {Array.from({ length: 9 }).map((_, i) => (
            <path
              key={i}
              d="M100 100 C 118 62, 148 52, 172 58 C 158 86, 132 102, 100 100 Z"
              fill="url(#turb-blade)"
              opacity="0.85"
              transform={`rotate(${i * 40} 100 100)`}
            />
          ))}
        </g>
        <circle cx="100" cy="100" r="20" fill="#0d141d" stroke="#4fe6f0" strokeWidth="3" />
        <circle cx="100" cy="100" r="7" fill="#4fe6f0" />
      </svg>
      <svg viewBox="0 0 300 40" className="absolute -right-24 top-1/2 hidden w-24 -translate-y-1/2 sm:block" aria-hidden="true">
        {[6, 16, 26, 34].map((y, i) => (
          <path
            key={y}
            d={`M0 ${y} C 40 ${y - 6}, 70 ${y + 6}, 110 ${y}`}
            fill="none"
            stroke={i % 2 ? "rgba(255,138,61,0.5)" : "rgba(79,230,240,0.55)"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="10 14"
            style={{ animation: "dash-flow 1.6s linear infinite", animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </svg>
    </div>
  );
}

function BenchBars() {
  const [ref, inView] = useInView<HTMLDivElement>(0.4);
  const score = useCountUp(2.2, inView, 1500, 1);
  // Critic agent: widths must scale to the true max (2.34M), not per-row 100%.
  const rows = [
    { name: "K13 Turbo Pro (OPPO lab)", val: 2.2, pct: 94, self: true },
    { name: "NanoReview v11 avg", val: 2.34, pct: 100, self: false },
    { name: "91mobiles lab sample", val: 2.03, pct: 87, self: false },
  ];
  return (
    <div ref={ref} className="mt-5 space-y-4">
      {rows.map((r, i) => (
        <div key={r.name}>
          <div className="mb-1.5 flex items-baseline justify-between gap-2">
            <span className={`text-xs font-semibold ${r.self ? "text-ice-300" : "text-bone-400"}`}>{r.name}</span>
            <span className={`font-mono-hud text-xs tabular-nums ${r.self ? "text-bone-50" : "text-bone-500"}`}>
              {r.self ? `${score}M+` : `${r.val.toFixed(2)}M`}
            </span>
          </div>
          <div className="h-2.5 overflow-hidden rounded-full bg-carbon-700/70">
            <div
              className={`h-full rounded-full transition-[width] duration-[1400ms] ease-out ${
                r.self ? "bg-gradient-to-r from-ice-500 to-ember-400" : "bg-bone-500/50"
              }`}
              style={{ width: inView ? `${r.pct}%` : "0%", transitionDelay: `${i * 160}ms` }}
            />
          </div>
        </div>
      ))}
      <p className="font-mono-hud text-[10px] uppercase tracking-[0.2em] text-bone-500">
        AnTuTu · versions & samples differ
      </p>
    </div>
  );
}

function ChargeRing() {
  const [ref, inView] = useInView<HTMLDivElement>(0.4);
  const pct = useCountUp(68, inView, 1600);
  const r = 34;
  const c = 2 * Math.PI * r;
  return (
    <div ref={ref} className="flex items-center gap-5">
      <div className="relative h-24 w-24 shrink-0">
        <svg viewBox="0 0 80 80" className="h-full w-full -rotate-90">
          <circle cx="40" cy="40" r={r} fill="none" stroke="rgba(255,138,61,0.14)" strokeWidth="7" />
          <circle
            cx="40"
            cy="40"
            r={r}
            fill="none"
            stroke="url(#chg)"
            strokeWidth="7"
            strokeLinecap="round"
            strokeDasharray={c}
            strokeDashoffset={inView ? c * (1 - 0.68) : c}
            style={{ transition: "stroke-dashoffset 1.6s cubic-bezier(0.22,1,0.36,1)" }}
          />
          <defs>
            <linearGradient id="chg" x1="0" y1="0" x2="1" y2="1">
              <stop stopColor="#ff8a3d" />
              <stop offset="1" stopColor="#4fe6f0" />
            </linearGradient>
          </defs>
        </svg>
        <span className="absolute inset-0 flex items-center justify-center font-display text-xl font-bold text-bone-50 tabular-nums">
          {pct}%
        </span>
      </div>
      <ul className="space-y-1.5 text-xs text-bone-300">
        <li className="flex items-center gap-2">
          <span className="h-1 w-1 rounded-full bg-ember-400" aria-hidden="true" />
          ~68% in 30 min · OPPO lab
        </li>
        <li className="flex items-center gap-2">
          <span className="h-1 w-1 rounded-full bg-ember-400" aria-hidden="true" />
          Full charge ≈ 54–58 min
        </li>
        <li className="flex items-center gap-2">
          <span className="h-1 w-1 rounded-full bg-ember-400" aria-hidden="true" />
          Bypass charging while you play
        </li>
      </ul>
    </div>
  );
}

export default function Features() {
  return (
    <section id="features" aria-labelledby="features-title" className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            kicker="01 // Arsenal"
            title={<span id="features-title">Every subsystem, built for the frag</span>}
            lead="Storm Engine active cooling, Snapdragon 8s Gen 4, 7,000 mAh silicon-carbon power and a 1.5K e-sports panel — all verified against OPPO India specs."
          />
          <Reveal delay={200}>
            <p className="font-mono-hud hidden text-right text-[10px] uppercase leading-relaxed tracking-[0.24em] text-bone-500 lg:block">
              FAN · 18,000 RPM MAX
              <br />
              VC · 7,000 mm²
              <br />
              ANTUTU · 2.2M+ LAB
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-6">
          <SpotlightCard className="hud-corners relative overflow-hidden p-8 lg:col-span-4">
            <div className="scanline pointer-events-none absolute inset-0" aria-hidden="true" />
            <div className="relative z-10 flex flex-col gap-8 sm:flex-row sm:items-center">
              <div className="mx-auto shrink-0 sm:mx-0">
                <Turbine />
              </div>
              <div>
                <p className="font-mono-hud text-[10px] uppercase tracking-[0.3em] text-ice-400">
                  Storm Engine · OPPO India
                </p>
                <h3 className="font-display mt-3 text-2xl sm:text-[1.7rem] font-bold leading-snug text-bone-50">
                  Micro-centrifugal fan + industry VC
                </h3>
                <p className="mt-3 text-sm sm:text-base leading-relaxed text-bone-300">
                  Thinnest built-in blades at <b className="text-bone-50">0.1 mm</b>, spinning up to{" "}
                  <b className="text-bone-50">18,000 RPM</b>, with 13 density-optimised fins and a{" "}
                  <b className="text-bone-50">7,000 mm²</b> vapour chamber. OPPO rates it{" "}
                  <b className="text-ice-300">2–4°C cooler</b> under high load.
                </p>
                <div className="mt-5 flex flex-wrap gap-2.5">
                  {["18K RPM fan", "7,000 mm² VC", "0.1 mm blades", "13 cooling fins"].map((t) => (
                    <span
                      key={t}
                      className="rounded-sm border border-ice-500/25 bg-ice-500/8 px-2.5 py-1 font-mono-hud text-[10px] uppercase tracking-[0.16em] text-ice-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            {/* topic photos: real fan + official cooling diagrams */}
            <div className="relative z-10 mt-6 grid grid-cols-2 gap-3">
              <figure className="overflow-hidden rounded-md border border-ice-400/15">
                <SafeImg
                  src={MEDIA.fanClose}
                  fallbacks={[MEDIA.lights]}
                  alt="Close-up of the K13 Turbo Pro built-in cooling fan and dual Mist Shadow breathing LEDs (GSMArena hands-on, hi-res)"
                  className="aspect-[16/10] w-full object-cover"
                />
                <figcaption className="bg-carbon-900/80 px-2 py-1 font-mono-hud text-[9px] uppercase tracking-[0.18em] text-bone-500">
                  Fan + breathing LEDs
                </figcaption>
              </figure>
              <figure className="overflow-hidden rounded-md border border-ice-400/15">
                <SafeImg
                  src={MEDIA.oppoActive1}
                  fallbacks={[MEDIA.oppoActive2, MEDIA.oppoPassive]}
                  alt="OPPO official Storm Engine diagram — micro-centrifugal fan system up to 18,000 RPM"
                  className="aspect-[16/10] w-full object-cover"
                />
                <figcaption className="bg-carbon-900/80 px-2 py-1 font-mono-hud text-[9px] uppercase tracking-[0.18em] text-bone-500">
                  OPPO fan system diagram
                </figcaption>
              </figure>
            </div>
          </SpotlightCard>

          <SpotlightCard className="overflow-hidden p-0 lg:col-span-2">
            <figure>
              <SafeImg
                src={MEDIA.oppoChip}
                fallbacks={[MEDIA.oppoSpecs]}
                alt="OPPO official Snapdragon 8s Gen 4 graphic — TSMC 4nm, 2.2M AnTuTu lab score"
                className="aspect-[16/8] w-full object-cover"
              />
              <figcaption className="border-b border-carbon-700/60 bg-carbon-900/80 px-5 py-1.5 font-mono-hud text-[9px] uppercase tracking-[0.18em] text-bone-500">
                OPPO official · The Lag Killer
              </figcaption>
            </figure>
            <div className="p-7 pt-5">
              <p className="font-mono-hud text-[10px] uppercase tracking-[0.3em] text-ember-400">Core</p>
              <h3 className="font-display mt-3 text-xl font-bold text-bone-50">{PHONE.chipset}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-bone-300">
                TSMC 4 nm · Adreno 825 · LPDDR5X + UFS 4.0. Same-generation architecture as Snapdragon 8 Elite’s big-core design.
              </p>
              <BenchBars />
            </div>
          </SpotlightCard>

          <SpotlightCard className="overflow-hidden p-0 lg:col-span-2">
            <figure className="scanline relative">
              <SafeImg
                src={MEDIA.front}
                fallbacks={[MEDIA.oppoTouch]}
                alt="Real photo of the K13 Turbo Pro 6.8-inch 1.5K 120Hz AMOLED front panel with punch-hole camera (GSMArena hands-on, hi-res)"
                className="aspect-[16/8] w-full object-cover"
              />
              <span className="absolute right-3 top-2.5 rounded-sm bg-carbon-950/70 px-2 py-1 font-mono-hud text-[9px] uppercase tracking-[0.2em] text-ice-300">
                1600 nits HBM
              </span>
              <figcaption className="border-b border-carbon-700/60 bg-carbon-900/80 px-5 py-1.5 font-mono-hud text-[9px] uppercase tracking-[0.18em] text-bone-500">
                6.8″ panel · 240 Hz touch · wet & glove modes
              </figcaption>
            </figure>
            <div className="p-7 pt-5">
              <p className="font-mono-hud text-[10px] uppercase tracking-[0.3em] text-ice-400">Display</p>
              <h3 className="font-display mt-3 text-xl font-bold text-bone-50">
                {PHONE.display.size} 1.5K e-sports panel
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-bone-300">
                {PHONE.display.resolution} AMOLED · {PHONE.display.refresh} · {PHONE.display.touch} touch ·{" "}
                {PHONE.display.brightnessHbm} HBM · 100% DCI-P3 · AGC DT-Star D+.
              </p>
            </div>
          </SpotlightCard>

          <SpotlightCard className="overflow-hidden p-0 lg:col-span-2">
            <figure>
              <SafeImg
                src={MEDIA.oppoBattery}
                fallbacks={[MEDIA.oppoCharge, MEDIA.box]}
                alt="OPPO official 7000mAh battery graphic — 80W SUPERVOOC, 68% in 30 minutes"
                className="aspect-[16/8] w-full object-cover"
              />
              <figcaption className="border-b border-carbon-700/60 bg-carbon-900/80 px-5 py-1.5 font-mono-hud text-[9px] uppercase tracking-[0.18em] text-bone-500">
                7,000 mAh Si/C · 80W flash charge
              </figcaption>
            </figure>
            <div className="p-7 pt-5">
              <p className="font-mono-hud text-[10px] uppercase tracking-[0.3em] text-ember-400">Endurance</p>
              <h3 className="font-display mt-3 text-xl font-bold text-bone-50">{PHONE.battery.typical} Si/C</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-bone-300">
                Silicon-carbon chemistry · 5-year durable design · 80W SUPERVOOC · Intelligent Charging Engine 5.0.
              </p>
              <div className="mt-5">
                <ChargeRing />
              </div>
            </div>
          </SpotlightCard>

          <SpotlightCard className="p-7 lg:col-span-2">
            <p className="font-mono-hud text-[10px] uppercase tracking-[0.3em] text-ice-400">Armor</p>
            <h3 className="font-display mt-3 text-xl font-bold text-bone-50">{PHONE.body.ip}</h3>
            <p className="mt-2.5 text-sm leading-relaxed text-bone-300">
              Triple-certified water resistance — immersion, jets, and high-pressure high-temp spray. Fan path sealed to the same standard.
            </p>
            <div className="mt-5 grid grid-cols-2 gap-3">
              <figure className="overflow-hidden rounded-md border border-ice-400/15">
                <SafeImg
                  src={MEDIA.duct}
                  fallbacks={[MEDIA.side]}
                  alt="Side exhaust duct of the Storm Engine cooling system on the K13 Turbo Pro frame (hi-res hands-on)"
                  className="aspect-[4/3] w-full object-cover"
                />
                <figcaption className="bg-carbon-900/80 px-2 py-1 font-mono-hud text-[9px] uppercase tracking-[0.18em] text-bone-500">
                  Sealed exhaust duct
                </figcaption>
              </figure>
              <figure className="overflow-hidden rounded-md border border-ice-400/15">
                <SafeImg
                  src={MEDIA.side}
                  fallbacks={[MEDIA.duct]}
                  alt="K13 Turbo Pro side frame with buttons and sealed ports, IPX6/8/9 rated (hi-res hands-on)"
                  className="aspect-[4/3] w-full object-cover"
                />
                <figcaption className="bg-carbon-900/80 px-2 py-1 font-mono-hud text-[9px] uppercase tracking-[0.18em] text-bone-500">
                  Armour frame · IPX6/8/9
                </figcaption>
              </figure>
            </div>
          </SpotlightCard>

          <SpotlightCard className="p-7 lg:col-span-6">
            <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
              <figure className="overflow-hidden rounded-md border border-ember-500/20">
                <SafeImg
                  src={MEDIA.camera91}
                  fallbacks={[MEDIA.fanClose]}
                  alt="50MP OIS main camera island with 2MP mono module (91mobiles gallery, hi-res)"
                  className="aspect-[16/9] w-full object-cover"
                />
                <figcaption className="bg-carbon-900/80 px-2 py-1 font-mono-hud text-[9px] uppercase tracking-[0.18em] text-bone-500">
                  50 MP OIS · OV50D40
                </figcaption>
              </figure>
              <figure className="overflow-hidden rounded-md border border-ember-500/20">
                <SafeImg
                  src={MEDIA.oppoMotor}
                  fallbacks={[MEDIA.oppoSpeakers]}
                  alt="OPPO official X-axis linear motor graphic for gaming haptics"
                  className="aspect-[16/9] w-full object-cover"
                />
                <figcaption className="bg-carbon-900/80 px-2 py-1 font-mono-hud text-[9px] uppercase tracking-[0.18em] text-bone-500">
                  X-axis haptics
                </figcaption>
              </figure>
              <figure className="hidden overflow-hidden rounded-md border border-ember-500/20 lg:block">
                <SafeImg
                  src={MEDIA.oppoSpeakers}
                  fallbacks={[MEDIA.oppoMotor]}
                  alt="OPPO official dual stereo speakers graphic with 300% Ultra Volume mode"
                  className="aspect-[16/9] w-full object-cover"
                />
                <figcaption className="bg-carbon-900/80 px-2 py-1 font-mono-hud text-[9px] uppercase tracking-[0.18em] text-bone-500">
                  300% Ultra Volume
                </figcaption>
              </figure>
              <figure className="hidden overflow-hidden rounded-md border border-ember-500/20 lg:block">
                <SafeImg
                  src={MEDIA.oppoLight}
                  fallbacks={[MEDIA.lights]}
                  alt="OPPO official Turbo Breathing Light graphic — dual Mist Shadow LEDs in 8 colors"
                  className="aspect-[16/9] w-full object-cover"
                />
                <figcaption className="bg-carbon-900/80 px-2 py-1 font-mono-hud text-[9px] uppercase tracking-[0.18em] text-bone-500">
                  Breathing Light · 8 colors
                </figcaption>
              </figure>
            </div>
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-xl">
                <p className="font-mono-hud text-[10px] uppercase tracking-[0.3em] text-ember-400">Camera & haptics</p>
                <h3 className="font-display mt-3 text-xl font-bold text-bone-50">50 MP OIS · X-axis motor</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-bone-300">
                  OmniVision OV50D40 main with 2-axis OIS, 2 MP mono, 16 MP Sony IMX480 selfie, 4K@60 video. Dual stereo speakers with 300% Ultra Volume and crisp X-axis linear haptics.
                </p>
              </div>
              <ul className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:flex lg:flex-wrap">
                {["50 MP OIS main", "4K@60 video", "AI Eraser 2.0", "Wi-Fi 7", "BT 5.4 + LHDC 5", "IR blaster"].map(
                  (f) => (
                    <li
                      key={f}
                      className="group flex items-center gap-2 rounded-sm border border-carbon-600 bg-carbon-900/70 px-3.5 py-2.5 text-xs font-semibold text-bone-300 transition-all duration-200 hover:border-ember-500/40 hover:text-bone-50"
                    >
                      <span
                        className="h-1.5 w-1.5 rounded-full bg-ember-400 transition-transform duration-200 group-hover:scale-150"
                        aria-hidden="true"
                      />
                      {f}
                    </li>
                  )
                )}
              </ul>
            </div>
          </SpotlightCard>
        </div>
      </div>
    </section>
  );
}
