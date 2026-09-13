import { useEffect, useState } from "react";
import { useActiveSection, useScrollY } from "../lib/hooks";
import { cn } from "../utils/cn";

const LINKS = [
  { id: "features", label: "Features" },
  { id: "design", label: "Design" },
  { id: "performance", label: "Performance" },
  { id: "reviews", label: "Reviews" },
  { id: "pricing", label: "Pricing" },
  { id: "faq", label: "FAQ" },
];

const SECTION_IDS = ["top", ...LINKS.map((l) => l.id)];

export function TurboMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none" aria-hidden="true">
      <circle cx="16" cy="16" r="14.5" stroke="url(#tmg)" strokeWidth="2.2" />
      <g stroke="url(#tmg)" strokeWidth="2" strokeLinecap="round">
        <path d="M16 6.5c2.6 3.4 2.6 6.2 0 9.5" />
        <path d="M25 12.2c-4.2.5-6.5 2-8.4 5.2" />
        <path d="M22.8 23.4c-3-2.6-5.7-3.3-9.3-2.4" />
        <path d="M9 22.9c.5-4.2-.1-6.8-2-9.6" transform="rotate(180 16 16)" />
      </g>
      <circle cx="16" cy="16" r="2.6" fill="#4fe6f0" />
      <defs>
        <linearGradient id="tmg" x1="4" y1="4" x2="28" y2="28">
          <stop stopColor="#4fe6f0" />
          <stop offset="1" stopColor="#ff6a1f" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function Navbar() {
  const y = useScrollY();
  const scrolled = y > 24;
  const active = useActiveSection(SECTION_IDS);
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* scroll progress */}
      <div className="h-[2px] w-full bg-transparent">
        <div
          className="h-full origin-left bg-gradient-to-r from-ice-500 to-ember-500 transition-transform duration-150"
          style={{ transform: `scaleX(${progress})` }}
          aria-hidden="true"
        />
      </div>

      <nav
        aria-label="Primary"
        className={cn(
          "transition-all duration-300 border-b",
          scrolled
            ? "glass border-ice-400/10 shadow-[0_18px_50px_-20px_rgba(0,0,0,0.8)]"
            : "bg-transparent border-transparent"
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8 h-[68px]">
          <a href="#top" className="flex items-center gap-3 group" aria-label="OPPO K13 Turbo Pro — back to top">
            <TurboMark className="h-9 w-9 transition-transform duration-500 group-hover:rotate-90" />
            <span className="leading-none">
              <span className="font-display block text-sm font-bold tracking-wide text-bone-50">
                OPPO <span className="text-ice-400">K13</span>
              </span>
              <span className="font-mono-hud block text-[9px] uppercase tracking-[0.42em] text-ember-400 mt-1">
                Turbo Pro
              </span>
            </span>
          </a>

          <ul className="hidden lg:flex items-center gap-1">
            {LINKS.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  className={cn(
                    "relative px-4 py-2 text-sm font-medium rounded-md transition-colors",
                    active === l.id ? "text-ice-300" : "text-bone-300 hover:text-bone-50"
                  )}
                >
                  {l.label}
                  <span
                    className={cn(
                      "absolute inset-x-4 -bottom-0.5 h-px bg-gradient-to-r from-ice-400 to-ember-400 transition-all duration-300",
                      active === l.id ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
                    )}
                    aria-hidden="true"
                  />
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <a
              href="#pricing"
              className="btn-sheen hidden sm:inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-ember-500 to-ember-400 px-5 py-2.5 text-sm font-bold text-carbon-950 shadow-glow-ember transition-transform duration-200 hover:scale-[1.04] active:scale-95"
            >
              Buy now
              <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M3 8h10m0 0L9 4m4 4l-4 4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="lg:hidden inline-flex h-11 w-11 items-center justify-center rounded-md border border-ice-400/20 bg-carbon-800/60 text-bone-100"
            >
              <span className="relative block h-3.5 w-5" aria-hidden="true">
                <span className={cn("absolute left-0 top-0 h-0.5 w-full bg-current transition-all duration-300", open && "top-1.5 rotate-45")} />
                <span className={cn("absolute left-0 top-1.5 h-0.5 w-full bg-current transition-opacity duration-200", open && "opacity-0")} />
                <span className={cn("absolute left-0 top-3 h-0.5 w-full bg-current transition-all duration-300", open && "top-1.5 -rotate-45")} />
              </span>
            </button>
          </div>
        </div>

        {/* mobile panel */}
        <div
          id="mobile-menu"
          className={cn(
            "lg:hidden overflow-hidden transition-[max-height,opacity] duration-400 ease-out",
            open ? "max-h-[420px] opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <ul className="glass mx-4 mb-4 rounded-lg p-3 space-y-1">
            {LINKS.map((l, i) => (
              <li key={l.id} style={{ transitionDelay: `${i * 40}ms` }}>
                <a
                  href={`#${l.id}`}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center justify-between rounded-md px-4 py-3 text-base font-medium transition-colors",
                    active === l.id ? "bg-ice-500/10 text-ice-300" : "text-bone-300 hover:bg-carbon-800/70 hover:text-bone-50"
                  )}
                >
                  {l.label}
                  <span className="font-mono-hud text-[10px] text-bone-500">0{i + 1}</span>
                </a>
              </li>
            ))}
            <li>
              <a
                href="#pricing"
                onClick={() => setOpen(false)}
                className="mt-1 flex items-center justify-center rounded-md bg-gradient-to-r from-ember-500 to-ember-400 px-4 py-3 font-bold text-carbon-950"
              >
                Shop now
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
