import { useState } from "react";
import { Reveal, SectionHeading } from "./ui";
import { cn } from "../utils/cn";
import SafeImg from "./SafeImg";
import { PHONE } from "../data/specs";
import { MEDIA } from "../data/media";

const ITEMS = [
  {
    q: "What is the real AnTuTu score?",
    a: `OPPO’s India product page cites a lab AnTuTu V10 figure of about ${PHONE.benchmarks.antutuDisplay.replace("+", "")} (≈2.2 million). Independent runs vary by version and sample: NanoReview averages ~2.34M on AnTuTu 11, 91mobiles logged ~2.03M, Digit reported “over 2 million,” and GSMArena hands-on sat near 1.96–1.98M. Treat 2.0–2.4M as the realistic band.`,
  },
  {
    q: "Does the built-in fan actually help?",
    a: `Yes — especially for sustained GPU load. OPPO rates Storm Engine for 2–4°C cooler operation under high load. GSMArena’s Wild Life Extreme stress test climbed from ~50% stability fan-off to 75–83% fan-on, with about 2°C cooler skin after hour-long games. Peak synthetic scores don’t always rise with the fan; stability does.`,
  },
  {
    q: "How loud is the fan and when does it spin?",
    a: "The micro-centrifugal fan reaches up to 18,000 RPM with 0.1 mm blades. It auto-engages for games/AnTuTu and when the system runs hot. You get Smart shifting and Full speed modes, optional startup SFX, and dual Mist Shadow RGB LEDs that light when the fan spins. Note: the fan stops when the screen is off.",
  },
  {
    q: "Battery and charging — what’s official?",
    a: `Typical capacity ${PHONE.battery.typical} (rated ${PHONE.battery.rated}), silicon-carbon chemistry, 80W SUPERVOOC. OPPO lab: ~68% in 30 minutes, full ~54 minutes. GSMArena hands-on: ~58% at 30 minutes, full ~58 minutes. Supports bypass charging, reverse wired, UFCS/PPS/PD compatibility, and Intelligent Charging Engine 5.0.`,
  },
  {
    q: "Is it waterproof?",
    a: `${PHONE.body.ip} under GB/T laboratory conditions — IPX8 immersion (1.5 m / 30 min), IPX6 powerful jets, and IPX9 high-pressure high-temperature spray. The cooling path is designed to the same ratings. Real-world wear can reduce resistance over time; don’t charge when wet.`,
  },
  {
    q: "What’s in the box and which colours ship in India?",
    a: `Box: phone, 80W charger, USB-C cable, protective case, SIM tool, quick guide, and a fan cleaning brush. India colours: ${PHONE.body.colors.map((c) => c.name).join(", ")}. Configs: 8GB/256GB (₹37,999) and 12GB/256GB (₹39,999) at launch.`,
  },
];

function Item({
  item,
  i,
  open,
  onToggle,
}: {
  item: (typeof ITEMS)[number];
  i: number;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <Reveal delay={i * 70}>
      <div
        className={cn(
          "rounded-lg border transition-all duration-300",
          open
            ? "glass border-ice-400/30 shadow-glow-ice"
            : "border-carbon-600/70 bg-carbon-900/55 hover:border-ice-400/20"
        )}
      >
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={`faq-panel-${i}`}
          id={`faq-button-${i}`}
          className="flex w-full items-center gap-4 px-6 py-5 text-left"
        >
          <span className={cn("font-mono-hud text-xs transition-colors", open ? "text-ember-400" : "text-bone-500")}>
            {String(i + 1).padStart(2, "0")}
          </span>
          <span className={cn("flex-1 font-semibold transition-colors", open ? "text-bone-50" : "text-bone-100")}>
            {item.q}
          </span>
          <span
            className={cn(
              "relative flex h-8 w-8 shrink-0 items-center justify-center rounded-md border transition-all duration-300",
              open ? "rotate-45 border-ice-400/50 text-ice-300" : "border-carbon-600 text-bone-400"
            )}
            aria-hidden="true"
          >
            <svg viewBox="0 0 14 14" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 1v12M1 7h12" strokeLinecap="round" />
            </svg>
          </span>
        </button>
        <div
          id={`faq-panel-${i}`}
          role="region"
          aria-labelledby={`faq-button-${i}`}
          className={cn(
            "grid transition-[grid-template-rows,opacity] duration-400 ease-out",
            open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          )}
        >
          <div className="overflow-hidden">
            <p className="px-6 pb-6 pl-[3.4rem] text-sm sm:text-[15px] leading-relaxed text-bone-300">{item.a}</p>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export default function Faq() {
  const [open, setOpen] = useState<number>(0);
  return (
    <section id="faq" aria-labelledby="faq-title" className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionHeading
              kicker="08 // Intel"
              title={<span id="faq-title">Questions from the lobby</span>}
              lead="Straight answers grounded in OPPO specs and published lab numbers — no invented frame-time miracles."
            />
            <Reveal delay={300}>
              <figure className="mt-8 overflow-hidden rounded-lg border border-ice-400/15">
                <SafeImg
                  src={MEDIA.oppoLight}
                  fallbacks={[MEDIA.lights]}
                  alt="Turbo Breathing Light — dual Mist Shadow LEDs glowing around the cooling fan (official OPPO graphic)"
                  className="aspect-[16/8] w-full object-cover"
                />
                <figcaption className="bg-carbon-900/80 px-4 py-1.5 font-mono-hud text-[9px] uppercase tracking-[0.18em] text-bone-500">
                  Turbo Breathing Light · 8 LED moods
                </figcaption>
              </figure>
              <div className="glass hud-corners mt-4 rounded-lg p-6">
                <p className="font-display text-lg font-bold text-bone-50">Still deciding?</p>
                <p className="mt-2 text-sm leading-relaxed text-bone-300">
                  Start at ₹37,999 for 8GB/256GB. 12GB/256GB is ₹39,999. All finishes share the same Storm Engine and 7,000 mAh cell.
                </p>
                <a
                  href="#pricing"
                  className="mt-5 inline-flex items-center gap-2 rounded-md border border-ember-500/40 bg-ember-500/10 px-5 py-3 text-sm font-bold text-ember-300 transition-all duration-200 hover:bg-ember-500/20"
                >
                  See pricing
                  <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M3 8h10m0 0L9 4m4 4l-4 4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </div>
            </Reveal>
          </div>

          <div className="space-y-3.5">
            {ITEMS.map((item, i) => (
              <Item
                key={item.q}
                item={item}
                i={i}
                open={open === i}
                onToggle={() => setOpen(open === i ? -1 : i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
