import { useInView } from "../lib/hooks";
import { cn } from "../utils/cn";

/* ---------------- Reveal on scroll ---------------- */
type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  dir?: "up" | "left" | "right" | "zoom";
  as?: keyof React.JSX.IntrinsicElements;
  id?: string;
};

export function Reveal({ children, className, delay = 0, dir = "up", as = "div", id }: RevealProps) {
  const [ref, inView] = useInView<HTMLElement>(0.15);
  const Tag = as as React.ElementType;
  return (
    <Tag
      ref={ref}
      id={id}
      data-dir={dir}
      className={cn("reveal", inView && "is-visible", className)}
      style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </Tag>
  );
}

/* ---------------- Section heading ---------------- */
export function SectionHeading({
  kicker,
  title,
  lead,
  align = "left",
  accent = "ice",
}: {
  kicker: string;
  title: React.ReactNode;
  lead?: string;
  align?: "left" | "center";
  accent?: "ice" | "ember";
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
      <Reveal>
        <p
          className={cn(
            "font-mono-hud text-[11px] sm:text-xs uppercase tracking-[0.32em] flex items-center gap-3",
            align === "center" && "justify-center",
            accent === "ice" ? "text-ice-400" : "text-ember-400"
          )}
        >
          <span
            className={cn(
              "inline-block h-px w-8",
              accent === "ice" ? "bg-ice-500/70" : "bg-ember-500/70"
            )}
            aria-hidden="true"
          />
          {kicker}
        </p>
      </Reveal>
      <Reveal delay={110}>
        <h2 className="font-display mt-4 text-3xl sm:text-4xl lg:text-[2.75rem] font-bold leading-[1.08] tracking-tight text-bone-50">
          {title}
        </h2>
      </Reveal>
      {lead && (
        <Reveal delay={220}>
          <p className="mt-5 text-bone-300 text-base sm:text-lg leading-relaxed">{lead}</p>
        </Reveal>
      )}
    </div>
  );
}

/* ---------------- Small HUD chip ---------------- */
export function HudChip({
  children,
  tone = "ice",
  className,
}: {
  children: React.ReactNode;
  tone?: "ice" | "ember" | "neutral";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 border px-3 py-1.5 font-mono-hud text-[11px] uppercase tracking-[0.18em] rounded-sm",
        tone === "ice" && "border-ice-500/35 bg-ice-500/8 text-ice-300",
        tone === "ember" && "border-ember-500/35 bg-ember-500/8 text-ember-300",
        tone === "neutral" && "border-bone-500/25 bg-carbon-800/60 text-bone-300",
        className
      )}
    >
      {children}
    </span>
  );
}

/* ---------------- Stars ---------------- */
export function Stars({ value = 5, className }: { value?: number; className?: string }) {
  return (
    <span
      className={cn("inline-flex items-center gap-0.5 text-ember-400", className)}
      role="img"
      aria-label={`${value} out of 5 stars`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" className="h-3.5 w-3.5" fill={i < Math.round(value) ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
          <path d="M10 1.7l2.5 5.2 5.7.7-4.2 3.9 1.1 5.6L10 14.3l-5.1 2.8 1.1-5.6L1.8 7.6l5.7-.7L10 1.7z" />
        </svg>
      ))}
    </span>
  );
}

/* ---------------- Spotlight card wrapper (mouse-tracked glow) ---------------- */
export function SpotlightCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "card-spotlight glass rounded-lg transition-all duration-300 hover:border-ice-400/30 hover:-translate-y-1",
        className
      )}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
        e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
      }}
    >
      {children}
    </div>
  );
}
