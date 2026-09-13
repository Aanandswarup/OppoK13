import { Reveal } from "./ui";
import SafeImg from "./SafeImg";
import { MEDIA } from "../data/media";
import { PHONE } from "../data/specs";

const Check = () => (
  <svg
    viewBox="0 0 16 16"
    className="mt-0.5 h-4 w-4 shrink-0 text-ice-400"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    aria-hidden="true"
  >
    <path d="M2.5 8.5l3.5 3.5 7.5-8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ROWS = [
  {
    kicker: "04 // Endurance",
    title: "Marathon sessions. Marathon battery.",
    body: `A ${PHONE.battery.typical} silicon-carbon cell with a 5-year durable design claim. OPPO lab: about 68% in 30 minutes on 80W SUPERVOOC, full in roughly 54 minutes. Independent hands-on hit ~58% at 30 minutes and full around 58 minutes. Bypass charging cuts heat 5–8°C while you play plugged in.`,
    points: [
      "7,000 mAh typical · 6,830 mAh rated",
      "Bypass charging during matches",
      "Intelligent Charging Engine 5.0",
      "80W charger + fan brush in box",
    ],
    stat: { v: "68%", l: "in 30 min · OPPO lab" },
    // Topic: battery/charging → real hands-on + official charge graphic
    img: MEDIA.hand,
    fallback: [MEDIA.box],
    alt: "Hands holding the OPPO K13 Turbo Pro mid-game during a hands-on session (hi-res)",
    credit: "Hands-on · GSMArena",
    diagram: MEDIA.oppoCharge,
    diagramFallback: [MEDIA.oppoBattery],
    diagramAlt: "OPPO official bypass charging graphic — power routed past the battery, 5–8°C cooler",
    diagramCaption: "Bypass charging · official",
  },
  {
    kicker: "05 // Control",
    title: "Every input, zero lag.",
    body: `A ${PHONE.display.touch} instant touch-sampling panel, Splash Touch for wet fingers, Glove Mode up to 5 mm, and an X-axis linear motor for punchy recoil. AI film-thickness sensing recalibrates touch under a screen protector automatically.`,
    points: [
      "240 Hz touch · 120 Hz render",
      "Wet touch & glove mode",
      "X-axis linear motor haptics",
      "Dual stereo · 300% Ultra Volume",
    ],
    stat: { v: "240Hz", l: "touch sampling" },
    // Topic: touch/display → real front panel + official touch graphic
    img: MEDIA.front,
    fallback: [MEDIA.side],
    alt: "Front view of the OPPO K13 Turbo Pro 6.8-inch 1.5K 120Hz AMOLED display (hi-res hands-on)",
    credit: "Front panel · GSMArena",
    diagram: MEDIA.oppoTouch,
    diagramFallback: [MEDIA.oppoGameCam],
    diagramAlt: "OPPO official touch optimization graphic — 240Hz sampling, Splash Touch, Glove Mode",
    diagramCaption: "Touch optimization · official",
  },
];

export default function Benefits() {
  return (
    <section id="edge" aria-label="Battlefield benefits" className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-7xl space-y-24 px-4 sm:px-6 lg:px-8">
        {ROWS.map((row, i) => (
          <div key={row.title} className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <Reveal dir={i % 2 === 0 ? "left" : "right"} className={i % 2 === 1 ? "lg:order-2" : ""}>
              <div className="group relative overflow-hidden rounded-lg border border-ice-400/12">
                <SafeImg
                  src={row.img}
                  fallbacks={row.fallback}
                  alt={row.alt}
                  className="aspect-[4/3] w-full object-cover transition-transform duration-[2.8s] ease-out group-hover:scale-105"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-tr from-carbon-950/80 via-transparent to-ice-500/10"
                  aria-hidden="true"
                />
                <div className="glass absolute bottom-4 left-4 rounded-md px-4 py-3">
                  <p className="font-display text-2xl font-bold text-ice-300">{row.stat.v}</p>
                  <p className="font-mono-hud text-[10px] uppercase tracking-[0.2em] text-bone-400">
                    {row.stat.l}
                  </p>
                </div>
                <p className="absolute right-4 top-3 rounded-sm bg-carbon-950/70 px-2 py-1 font-mono-hud text-[9px] uppercase tracking-[0.18em] text-bone-400">
                  {row.credit}
                </p>
              </div>
              {/* official topic diagram sits directly under its photo */}
              <figure className="mt-3 overflow-hidden rounded-lg border border-carbon-600/50">
                <SafeImg
                  src={row.diagram}
                  fallbacks={row.diagramFallback}
                  alt={row.diagramAlt}
                  className="aspect-[16/6] w-full object-cover"
                />
                <figcaption className="bg-carbon-900/80 px-3 py-1.5 font-mono-hud text-[9px] uppercase tracking-[0.18em] text-bone-500">
                  {row.diagramCaption}
                </figcaption>
              </figure>
            </Reveal>

            <div className={i % 2 === 1 ? "lg:order-1" : ""}>
              <Reveal>
                <p className="flex items-center gap-3 font-mono-hud text-[11px] uppercase tracking-[0.32em] text-ember-400">
                  <span className="inline-block h-px w-8 bg-ember-500/70" aria-hidden="true" />
                  {row.kicker}
                </p>
              </Reveal>
              <Reveal delay={110}>
                <h2 className="font-display mt-4 text-3xl sm:text-4xl font-bold leading-[1.08] text-bone-50">
                  {row.title}
                </h2>
              </Reveal>
              <Reveal delay={220}>
                <p className="mt-5 leading-relaxed text-bone-300">{row.body}</p>
              </Reveal>
              <Reveal delay={330}>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {row.points.map((p) => (
                    <li key={p} className="flex items-start gap-3 text-sm text-bone-100">
                      <Check />
                      {p}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
