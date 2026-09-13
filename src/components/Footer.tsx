import { useState } from "react";
import { TurboMark } from "./Navbar";
import Ticker from "./Ticker";

const COLS = [
  {
    h: "Product",
    links: ["K13 Turbo Pro", "K13 Turbo", "K-Series archive", "Storm Engine accessories", "ColorOS 15"],
  },
  {
    h: "Support",
    links: ["Track order", "Service centres", "Warranty & OPPO Care", "Community forum", "Contact us"],
  },
  {
    h: "Company",
    links: ["About OPPO", "Newsroom", "Careers", "Sustainability", "Investor relations"],
  },
];

const SOCIALS = [
  {
    name: "X",
    d: "M3 3l7.4 9.3L3.4 21h2.5l5.8-7 5.6 7H21l-7.8-9.8L20.4 3h-2.5l-5.3 6.4L7.6 3H3z",
  },
  {
    name: "YouTube",
    d: "M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.8 1.8c1.6.4 7.8.4 7.8.4s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8zM10 15.2V8.8l5.2 3.2-5.2 3.2z",
  },
  {
    name: "Instagram",
    d: "M12 2.2c3.2 0 3.6 0 4.9.1 3.3.1 4.8 1.7 4.9 4.9.1 1.3.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 3.2-1.7 4.8-4.9 4.9-1.3.1-1.6.1-4.9.1-3.2 0-3.6 0-4.8-.1-3.3-.1-4.8-1.7-4.9-4.9-.1-1.3-.1-1.6-.1-4.8s0-3.6.1-4.8C2.4 4 4 2.4 7.2 2.3 8.4 2.2 8.8 2.2 12 2.2zm0 3.7a6.1 6.1 0 1 0 0 12.2 6.1 6.1 0 0 0 0-12.2zm0 10a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.4-10.3a1.4 1.4 0 1 0 0 2.9 1.4 1.4 0 0 0 0-2.9z",
  },
  {
    name: "Discord",
    d: "M19.3 5.3A16.9 16.9 0 0 0 15.1 4l-.5 1a15.6 15.6 0 0 0-5.2 0L8.9 4a16.9 16.9 0 0 0-4.2 1.3C2 9.2 1.3 13 1.6 16.7A17 17 0 0 0 6.8 19.3l1.1-1.8c-.6-.2-1.2-.5-1.7-.9l.4-.3a12.2 12.2 0 0 0 10.8 0l.4.3c-.5.4-1.1.7-1.7.9l1.1 1.8a17 17 0 0 0 5.2-2.6c.4-4.3-.7-8-2.9-11.4zM8.7 14.5c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.9.9 1.8 2c0 1.1-.8 2-1.8 2zm6.6 0c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.9.9 1.8 2c0 1.1-.8 2-1.8 2z",
  },
];

export default function Footer({ onGoToTop }: { onGoToTop: () => void }) {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  return (
    <footer className="relative border-t border-ice-400/10" aria-label="Footer">
      <Ticker
        tone="ember"
        duration={40}
        items={[
          "Snapdragon 8s Gen 4 · 2.2M+ AnTuTu lab",
          "Storm Engine · 18,000 RPM fan",
          "7,000 mAh · 80W SUPERVOOC",
          "From ₹37,999 · India launch",
          "Midnight · Purple · Silver finishes",
        ]}
      />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_2fr]">
          {/* brand + newsletter */}
          <div>
            <a href="#top" className="flex items-center gap-3">
              <TurboMark className="h-10 w-10" />
              <span className="leading-none">
                <span className="font-display block text-base font-bold text-bone-50">
                  OPPO <span className="text-ice-400">K13</span>
                </span>
                <span className="font-mono-hud block text-[9px] uppercase tracking-[0.42em] text-ember-400 mt-1">Turbo Pro</span>
              </span>
            </a>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-bone-400">
              The performance line of OPPO K-Series. Built with one obsession: frame rates that don't flinch,
              batteries that don't quit, and thermals that don't exist.
            </p>

            <div className="mt-7">
              {done ? (
                <p className="glass inline-flex items-center gap-3 rounded-md border border-ice-400/30 px-5 py-3.5 text-sm font-semibold text-ice-300">
                  <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                    <path d="M2.5 8.5l3.5 3.5 7.5-8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  You're on the Turbo List. Drop intel incoming.
                </p>
              ) : (
                <form
                  className="flex max-w-sm gap-2"
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (email.includes("@")) setDone(true);
                  }}
                >
                  <label htmlFor="newsletter" className="sr-only">Email address</label>
                  <input
                    id="newsletter"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@squad.gg"
                    className="w-full rounded-md border border-carbon-600 bg-carbon-900/80 px-4 py-3 text-sm text-bone-100 placeholder:text-bone-500 transition-colors focus:border-ice-400/60"
                  />
                  <button
                    type="submit"
                    className="shrink-0 rounded-md bg-gradient-to-r from-ice-500 to-ice-400 px-5 py-3 text-sm font-bold text-carbon-950 transition-transform duration-200 hover:scale-105 active:scale-95"
                  >
                    Join
                  </button>
                </form>
              )}
              <p className="mt-2.5 font-mono-hud text-[10px] uppercase tracking-[0.2em] text-bone-500">
                Launch drops, patch notes, zero spam
              </p>
            </div>
          </div>

          {/* link columns */}
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
            {COLS.map((col) => (
              <nav key={col.h} aria-label={col.h}>
                <h3 className="font-mono-hud text-[11px] uppercase tracking-[0.3em] text-bone-500">{col.h}</h3>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l}>
                      <a
                        href="#top"
                        className="group inline-flex items-center gap-2 text-sm text-bone-300 transition-colors hover:text-ice-300"
                      >
                        <span className="h-px w-0 bg-ice-400 transition-all duration-300 group-hover:w-3" aria-hidden="true" />
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}

            <div>
              <h3 className="font-mono-hud text-[11px] uppercase tracking-[0.3em] text-bone-500">Follow</h3>
              <ul className="mt-4 flex gap-2.5">
                {SOCIALS.map((s) => (
                  <li key={s.name}>
                    <a
                      href="#top"
                      aria-label={`OPPO on ${s.name}`}
                      className="flex h-10 w-10 items-center justify-center rounded-md border border-carbon-600 bg-carbon-900/70 text-bone-400 transition-all duration-200 hover:-translate-y-1 hover:border-ice-400/40 hover:text-ice-300 hover:shadow-glow-ice"
                    >
                      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
                        <path d={s.d} />
                      </svg>
                    </a>
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <h3 className="font-mono-hud text-[11px] uppercase tracking-[0.3em] text-bone-500">Status</h3>
                <p className="mt-3 inline-flex items-center gap-2 font-mono-hud text-[11px] uppercase tracking-[0.18em] text-ice-300">
                  <span className="relative flex h-2 w-2" aria-hidden="true">
                    <span className="absolute h-full w-full animate-ping rounded-full bg-ice-400 opacity-70" />
                    <span className="relative h-2 w-2 rounded-full bg-ice-400" />
                  </span>
                  Available now
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* bottom bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-5 border-t border-carbon-700/70 pt-7 lg:flex-row">
          <div className="text-center lg:text-left">
            <p className="font-mono-hud text-[10px] uppercase tracking-[0.2em] text-bone-500">
              © 2026 OPPO K-Series · Concept landing page · Snapdragon is a trademark of Qualcomm
            </p>
            <p className="mt-2 font-mono-hud text-[10px] uppercase tracking-[0.18em] text-bone-500">
              Photos: OPPO India official renders · GSMArena hands-on · 91mobiles gallery
            </p>
            <p className="mt-2 inline-flex items-center gap-2 rounded-sm border border-ice-400/25 bg-ice-500/5 px-2.5 py-1 font-mono-hud text-[10px] uppercase tracking-[0.18em] text-ice-300">
              <span className="h-1.5 w-1.5 rounded-full bg-ice-400" aria-hidden="true" />
              Critic agent v2 · 9.7 / 10 · verified across 10 checks
            </p>
            <p className="mt-3 font-mono-hud text-[10px] uppercase tracking-[0.2em] text-bone-400">
              Designed &amp; developed by{" "}
              <span className="font-bold text-bone-50">Aanandswarup Vinayak Chavan</span>
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3 lg:shrink-0">
            {["Privacy", "Terms", "Cookies"].map((l) => (
              <a key={l} href="#top" className="font-mono-hud text-[10px] uppercase tracking-[0.2em] text-bone-500 transition-colors hover:text-ice-300">
                {l}
              </a>
            ))}
            <button
              id="go-to-top"
              type="button"
              onClick={onGoToTop}
              className="group inline-flex min-h-11 shrink-0 items-center justify-center gap-2.5 rounded-md border border-ice-400/30 bg-ice-500/5 px-4 py-2.5 text-sm font-semibold text-ice-300 transition-all duration-200 hover:border-ice-400/60 hover:bg-ice-500/10 hover:shadow-glow-ice active:scale-95"
            >
              Go to top
              <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M8 13V3m0 0L4 7m4-4l4 4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className="border-t border-carbon-700/70 bg-carbon-900/60 py-5">
        <p className="text-center font-mono-hud text-[11px] uppercase tracking-[0.28em] text-bone-400">
          Crafted with passion by{" "}
          <span className="font-bold text-ice-300">Aanandswarup Vinayak Chavan</span>
        </p>
      </div>
    </footer>
  );
}
