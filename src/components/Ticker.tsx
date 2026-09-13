import { cn } from "../utils/cn";

const Diamond = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 10 10" className={cn("h-2 w-2", className)} aria-hidden="true">
    <path d="M5 0l5 5-5 5-5-5z" fill="currentColor" />
  </svg>
);

export default function Ticker({
  items,
  duration = 34,
  tone = "ice",
  className,
}: {
  items: string[];
  duration?: number;
  tone?: "ice" | "ember";
  className?: string;
}) {
  const row = [...items, ...items];
  return (
    <div
      className={cn(
        "marquee-hover-pause relative overflow-hidden border-y py-3",
        tone === "ice" ? "border-ice-400/15 bg-carbon-900/70" : "border-ember-400/15 bg-carbon-900/70",
        className
      )}
      aria-hidden="true"
    >
      <div className="marquee-track items-center gap-8 pr-8" style={{ "--marquee-dur": `${duration}s` } as React.CSSProperties}>
        {row.map((item, i) => (
          <span key={i} className="flex items-center gap-8 whitespace-nowrap">
            <span
              className={cn(
                "font-mono-hud text-[11px] uppercase tracking-[0.3em]",
                tone === "ice" ? "text-ice-300/90" : "text-ember-300/90"
              )}
            >
              {item}
            </span>
            <Diamond className={tone === "ice" ? "text-ember-400" : "text-ice-400"} />
          </span>
        ))}
      </div>
    </div>
  );
}
