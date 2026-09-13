import { Reveal, SectionHeading } from "./ui";
import { cn } from "../utils/cn";
import SafeImg from "./SafeImg";
import { PHONE } from "../data/specs";
import { MEDIA } from "../data/media";

const OFFERS = [
  { t: "80W SUPERVOOC in box", s: "no separate charger hunt" },
  { t: "Protective case included", s: "plus fan cleaning brush" },
  { t: "No-cost EMI options", s: "bank offers may vary" },
  { t: "ColorOS 15 · Android 15", s: "day-one software stack" },
];

export default function Pricing() {
  return (
    <section id="pricing" aria-labelledby="pricing-title" className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          kicker="07 // Acquire"
          title={<span id="pricing-title">Flagship frames. Mid-range bill.</span>}
          lead="India launch pricing for the official configs. Every unit ships with Storm Engine cooling, 7,000 mAh, and the 80W charger."
          align="center"
          accent="ember"
        />

        {/* topic strip: all three official finishes above the configs */}
        <Reveal delay={120}>
          <div className="mx-auto mt-12 grid max-w-4xl grid-cols-3 gap-3">
            {PHONE.body.colors.map((f) => (
              <figure
                key={f.id}
                className="group overflow-hidden rounded-lg border border-carbon-600/60 bg-carbon-950"
              >
                <SafeImg
                  src={MEDIA[f.mediaKey as keyof typeof MEDIA] as unknown as string}
                  alt={`${f.name} official OPPO render thumbnail`}
                  className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <figcaption
                  className="px-2 py-1.5 text-center font-mono-hud text-[9px] uppercase tracking-[0.16em]"
                  style={{ color: f.accent }}
                >
                  {f.name}
                </figcaption>
              </figure>
            ))}
          </div>
        </Reveal>

        <div className="mt-10 mx-auto grid max-w-4xl gap-6 lg:grid-cols-2">
          {PHONE.pricingIndia.map((tier, i) => (
            <Reveal key={tier.ram + tier.storage} delay={i * 140}>
              <article
                className={cn(
                  "relative flex h-full flex-col rounded-lg border p-8 transition-all duration-300",
                  tier.highlight
                    ? "glass hud-corners border-ice-400/40 shadow-glow-ice lg:-translate-y-2 lg:hover:-translate-y-4"
                    : "border-carbon-600/70 bg-carbon-900/60 hover:-translate-y-2 hover:border-ice-400/25 hover:bg-carbon-800/70"
                )}
              >
                {tier.tag && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-sm bg-gradient-to-r from-ember-500 to-ember-400 px-4 py-1.5 font-mono-hud text-[10px] font-bold uppercase tracking-[0.24em] text-carbon-950">
                    ⚡ {tier.tag}
                  </span>
                )}
                <p className="font-mono-hud text-[11px] uppercase tracking-[0.28em] text-bone-400">
                  {tier.ram} <span className="text-ice-400">·</span> {tier.storage} UFS 4.0
                </p>
                <p className="font-display mt-4 text-[2.6rem] leading-none font-bold text-bone-50">
                  {tier.price}
                </p>
                <p className="mt-2 text-sm text-bone-400">
                  or <b className="text-bone-100">{tier.emi}</b> · indicative no-cost EMI
                </p>

                <ul className="mt-7 space-y-3 border-t border-carbon-600/60 pt-6 text-sm text-bone-300">
                  {tier.notes.map((n) => (
                    <li key={n} className="flex items-start gap-3">
                      <svg
                        viewBox="0 0 16 16"
                        className={cn(
                          "mt-0.5 h-4 w-4 shrink-0",
                          tier.highlight ? "text-ember-400" : "text-ice-400"
                        )}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        aria-hidden="true"
                      >
                        <path d="M2.5 8.5l3.5 3.5 7.5-8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {n}
                    </li>
                  ))}
                  <li className="flex items-start gap-3">
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
                    Midnight · Purple · Silver finishes
                  </li>
                </ul>

                <a
                  href="#cta"
                  className={cn(
                    "mt-8 inline-flex w-full items-center justify-center gap-2 rounded-md px-6 py-3.5 text-sm font-bold transition-all duration-200 active:scale-95",
                    tier.highlight
                      ? "btn-sheen bg-gradient-to-r from-ember-500 to-ember-400 text-carbon-950 shadow-glow-ember hover:scale-[1.03]"
                      : "border border-ice-400/30 bg-carbon-800/70 text-ice-300 hover:border-ice-400/60 hover:bg-carbon-800"
                  )}
                >
                  Choose this config
                </a>
                <p className="mt-3 text-center font-mono-hud text-[10px] uppercase tracking-[0.18em] text-bone-500">
                  MRP may vary by retailer
                </p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <div className="mt-12 overflow-hidden rounded-lg border border-ember-500/25 bg-gradient-to-r from-ember-500/10 via-carbon-900/60 to-ice-500/10">
            <div className="racing-stripes racing-stripes-animated h-1.5 w-full opacity-70" aria-hidden="true" />
            <div className="grid gap-px sm:grid-cols-2 lg:grid-cols-4">
              {OFFERS.map((o) => (
                <div
                  key={o.t}
                  className="group px-6 py-6 text-center transition-colors duration-300 hover:bg-carbon-900/60"
                >
                  <p className="font-display text-base font-bold text-bone-50 transition-colors group-hover:text-ember-300">
                    {o.t}
                  </p>
                  <p className="mt-1 text-xs text-bone-400">{o.s}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={280}>
          <p className="mt-6 text-center font-mono-hud text-[10px] uppercase tracking-[0.22em] text-bone-500">
            India launch · Aug 2025 · Prices include GST where applicable · Check OPPO.in for live deals
          </p>
        </Reveal>
      </div>
    </section>
  );
}
