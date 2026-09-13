import { useCountUp, useInView } from "../lib/hooks";
import { Reveal } from "./ui";
import { PHONE } from "../data/specs";

const PRESS_QUOTES = [
  {
    quote:
      "Active cooling in a mid-ranger is genuinely unheard of — the K13 Turbo Pro rewires the segment.",
    src: "Gadgets 360",
  },
  {
    quote: "AnTuTu cleared two million. Geekbench multi sat near 6,700. Power doesn't quit.",
    src: "Digit",
  },
  {
    quote: "A 7,000 mAh cell that still fits in your pocket. The endurance king is here.",
    src: "91mobiles",
  },
  {
    quote: "Wild Life Extreme stability jumped above 75% with the fan on — the Storm Engine earns its keep.",
    src: "GSMArena",
  },
  {
    quote: "Snapdragon 8s Gen 4 plus a literal fan — this is a console in a phone shell.",
    src: "Beebom",
  },
];

const PRESS_NAMES = ["Gadgets 360", "Beebom", "91mobiles", "Digit", "GSMArena", "NanoReview", "Gizbot"];

function Stat({
  value,
  suffix,
  label,
  sub,
  decimals = 0,
}: {
  value: number;
  suffix?: string;
  label: string;
  sub: string;
  decimals?: number;
}) {
  const [ref, inView] = useInView<HTMLDivElement>(0.4);
  const display = useCountUp(value, inView, 1800, decimals);
  return (
    <div
      ref={ref}
      className="group relative bg-carbon-900/85 px-6 py-7 transition-colors duration-300 hover:bg-carbon-800"
    >
      <span
        className="absolute left-0 top-0 h-full w-[3px] origin-top scale-y-0 bg-gradient-to-b from-ice-400 to-ember-400 transition-transform duration-500 group-hover:scale-y-100"
        aria-hidden="true"
      />
      <p className="font-display text-3xl sm:text-4xl font-bold text-bone-50 tabular-nums">
        {display}
        {suffix && <span className="text-ice-400">{suffix}</span>}
      </p>
      <p className="mt-2 text-sm font-semibold text-bone-100">{label}</p>
      <p className="mt-1 font-mono-hud text-[10px] uppercase tracking-[0.22em] text-bone-500">{sub}</p>
    </div>
  );
}

export default function SocialProof() {
  return (
    <section id="proof" aria-label="Proof and press reception" className="relative py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <p className="font-mono-hud text-center text-[11px] uppercase tracking-[0.32em] text-bone-500">
            Lab figures · Press reception · Real-world reviews
          </p>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-ice-400/12 bg-ice-400/12 lg:grid-cols-4">
            <Stat
              value={2.2}
              suffix="M+"
              label="AnTuTu score"
              sub={PHONE.benchmarks.antutuNote}
              decimals={1}
            />
            <Stat
              value={PHONE.benchmarks.geekbenchMulti}
              label="Geekbench 6 multi"
              sub={`Single-core ${PHONE.benchmarks.geekbenchSingle.toLocaleString()}`}
            />
            <Stat
              value={PHONE.benchmarks.rating}
              suffix="★"
              label="Average rating"
              sub={`${PHONE.benchmarks.reviews.toLocaleString()}+ verified reviews`}
              decimals={1}
            />
            <Stat
              value={7000}
              label="mAh battery"
              sub="Si/C · 80W SUPERVOOC"
            />
          </div>
        </Reveal>

        <Reveal delay={180}>
          <div className="mt-5 grid gap-px overflow-hidden rounded-lg border border-carbon-600/50 bg-carbon-600/40 sm:grid-cols-3">
            {[
              {
                k: "Geekbench single",
                v: PHONE.benchmarks.geekbenchSingle.toLocaleString(),
                s: "NanoReview avg",
              },
              {
                k: "3DMark Solar Bay",
                v: PHONE.benchmarks.solarBay.toLocaleString(),
                s: "Graphics score",
              },
              {
                k: "PCMark 3.0",
                v: PHONE.benchmarks.pcmark.toLocaleString(),
                s: "Work suite",
              },
            ].map((row) => (
              <div key={row.k} className="bg-carbon-900/90 px-5 py-4 text-center sm:text-left">
                <p className="font-mono-hud text-[10px] uppercase tracking-[0.22em] text-bone-500">
                  {row.k}
                </p>
                <p className="font-display mt-1 text-xl font-bold text-ice-300 tabular-nums">{row.v}</p>
                <p className="mt-0.5 text-xs text-bone-400">{row.s}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={200}>
          <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-10 gap-y-4" aria-label="Featured in">
            {PRESS_NAMES.map((n) => (
              <li
                key={n}
                className="font-display cursor-default text-sm sm:text-base font-semibold text-bone-500 transition-colors duration-300 hover:text-ice-300"
              >
                {n}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      <p className="mt-8 text-center font-mono-hud text-[10px] uppercase tracking-[0.2em] text-bone-500">
        Representative press sentiment · see linked outlets for verbatim reviews
      </p>
      <div
        className="marquee-hover-pause relative mt-6 overflow-hidden border-y border-ice-400/10 bg-carbon-900/60 py-5"
        aria-label="Press quotes"
      >
        <div
          className="marquee-track gap-14 pr-14"
          style={{ "--marquee-dur": "48s" } as React.CSSProperties}
        >
          {[...PRESS_QUOTES, ...PRESS_QUOTES].map((q, i) => (
            <figure key={i} className="flex max-w-md shrink-0 items-start gap-4">
              <span className="font-display text-3xl leading-none text-ember-400" aria-hidden="true">
                “
              </span>
              <div>
                <blockquote className="text-sm leading-relaxed text-bone-300">{q.quote}</blockquote>
                <figcaption className="mt-2 font-mono-hud text-[10px] uppercase tracking-[0.26em] text-ice-400">
                  — {q.src}
                </figcaption>
              </div>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
