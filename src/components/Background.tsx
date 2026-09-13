import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "../lib/hooks";

type Particle = {
  x: number;
  y: number;
  r: number;
  vy: number;
  vx: number;
  hue: "ice" | "ember";
  tw: number;
  phase: number;
};

/** Ambient layered background: drifting ember/ice particle canvas + CSS grid & glows. */
export default function Background() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || reduced) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let raf = 0;
    let particles: Particle[] = [];
    const DPR = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * DPR;
      canvas.height = h * DPR;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      const count = Math.min(70, Math.floor((w * h) / 26000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.7 + 0.4,
        vy: -(Math.random() * 0.28 + 0.06),
        vx: (Math.random() - 0.5) * 0.12,
        hue: Math.random() > 0.72 ? "ember" : "ice",
        tw: Math.random() * 0.02 + 0.004,
        phase: Math.random() * Math.PI * 2,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.phase += p.tw * 60 * 0.016;
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < -8) {
          p.y = h + 8;
          p.x = Math.random() * w;
        }
        if (p.x < -8) p.x = w + 8;
        if (p.x > w + 8) p.x = -8;
        const alpha = 0.22 + Math.sin(p.phase) * 0.18;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle =
          p.hue === "ice"
            ? `rgba(79, 230, 240, ${alpha})`
            : `rgba(255, 138, 61, ${alpha * 0.9})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };

    resize();
    draw();
    const onVis = () => {
      cancelAnimationFrame(raf);
      if (!document.hidden) raf = requestAnimationFrame(draw);
    };
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVis);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [reduced]);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* base gradient wash */}
      <div className="absolute inset-0 bg-[radial-gradient(1200px_700px_at_78%_-10%,rgba(35,213,226,0.09),transparent_60%),radial-gradient(1000px_640px_at_-10%_38%,rgba(255,106,31,0.06),transparent_55%),radial-gradient(900px_900px_at_50%_118%,rgba(35,213,226,0.07),transparent_60%)]" />
      {/* animated engineering grid */}
      <div
        className="absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(79,230,240,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(79,230,240,0.045) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse 90% 70% at 50% 20%, black 30%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse 90% 70% at 50% 20%, black 30%, transparent 75%)",
          animation: "grid-pan 9s linear infinite",
        }}
      />
      {/* drifting nebula blobs (deep, slow) */}
      <div
        className="absolute -top-40 -right-40 h-[34rem] w-[34rem] rounded-full bg-ice-500/6 blur-3xl"
        style={{ animation: "drift 26s ease-in-out infinite" }}
      />
      <div
        className="absolute top-[46%] -left-52 h-[30rem] w-[30rem] rounded-full bg-ember-500/5 blur-3xl"
        style={{ animation: "drift 34s ease-in-out infinite reverse" }}
      />
      <canvas ref={canvasRef} className="absolute inset-0" />
      {/* vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_58%,rgba(6,9,13,0.85)_100%)]" />
    </div>
  );
}
