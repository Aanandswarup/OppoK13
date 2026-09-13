import { useCallback, useEffect, useRef, useState } from "react";

export const PAGE_TOUR_START_EVENT = "oppo:page-tour-start";

export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}

/** Observe an element once; returns [ref, inView] */
export function useInView<T extends HTMLElement = HTMLDivElement>(
  threshold = 0.2,
  rootMargin = "0px 0px -8% 0px"
): [React.RefObject<T | null>, boolean] {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      setInView(true);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            obs.disconnect();
          }
        });
      },
      { threshold, rootMargin }
    );
    // A new tour replays scroll reveals and counters without resetting product choices.
    const replay = () => {
      setInView(false);
      obs.disconnect();
      obs.observe(el);
    };
    obs.observe(el);
    window.addEventListener(PAGE_TOUR_START_EVENT, replay);
    return () => {
      obs.disconnect();
      window.removeEventListener(PAGE_TOUR_START_EVENT, replay);
    };
  }, [threshold, rootMargin]);
  return [ref, inView];
}

/** Animated count-up that starts when `active` becomes true */
export function useCountUp(target: number, active: boolean, duration = 1600, decimals = 0): string {
  const [value, setValue] = useState(0);
  const reduced = usePrefersReducedMotion();
  useEffect(() => {
    if (!active) return;
    if (reduced) {
      setValue(target);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(target * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target, duration, reduced]);
  return value.toLocaleString("en-IN", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export function useCountdown(targetTs: number) {
  const calc = useCallback(() => {
    const diff = Math.max(0, targetTs - Date.now());
    return {
      days: Math.floor(diff / 86_400_000),
      hours: Math.floor((diff / 3_600_000) % 24),
      mins: Math.floor((diff / 60_000) % 60),
      secs: Math.floor((diff / 1000) % 60),
    };
  }, [targetTs]);
  const [time, setTime] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(id);
  }, [calc]);
  return time;
}

export function useScrollY(): number {
  const [y, setY] = useState(0);
  useEffect(() => {
    const onScroll = () => setY(window.scrollY);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return y;
}

/** Pointer-driven tilt for product imagery. Returns handlers + css vars style. */
export function useTilt(maxDeg = 7) {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduced = usePrefersReducedMotion();
  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const el = ref.current;
      if (!el || reduced) return;
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `perspective(1100px) rotateY(${px * maxDeg}deg) rotateX(${
        -py * maxDeg
      }deg) translateZ(0)`;
    },
    [maxDeg, reduced]
  );
  const onMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "perspective(1100px) rotateY(0deg) rotateX(0deg)";
  }, []);
  return { ref, onMouseMove, onMouseLeave };
}

/** Tracks which section id is currently in view (for nav highlighting). */
export function useActiveSection(ids: string[]): string {
  const [active, setActive] = useState(ids[0] ?? "");
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-38% 0px -55% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [ids.join("|")]);
  return active;
}
