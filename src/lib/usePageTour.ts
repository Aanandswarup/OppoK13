import { useCallback, useEffect, useRef, useState } from "react";
import { PAGE_TOUR_START_EVENT, usePrefersReducedMotion } from "./hooks";

type TourState = "idle" | "playing" | "stopped" | "complete";

const MESSAGES: Record<TourState, string> = {
  idle: "",
  playing: "Page tour playing. Scroll, touch the page, or press Escape to stop.",
  stopped: "Page tour stopped. You can continue browsing normally.",
  complete: "You have reached the bottom. Use Go to top to return to the beginning.",
};

export function usePageTour() {
  const [state, setState] = useState<TourState>("idle");
  const reducedMotion = usePrefersReducedMotion();
  const frameRef = useRef(0);
  const stopButtonRef = useRef<HTMLButtonElement>(null);
  const isTouring = state === "playing";

  const stopTour = useCallback(() => {
    cancelAnimationFrame(frameRef.current);
    frameRef.current = 0;
    setState("stopped");
  }, []);

  const startTour = useCallback(() => {
    if (reducedMotion) {
      window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "instant" });
      document.getElementById("go-to-top")?.focus({ preventScroll: true });
      setState("complete");
      return;
    }

    window.scrollTo({ top: 0, behavior: "instant" });
    window.dispatchEvent(new Event(PAGE_TOUR_START_EVENT));
    setState("playing");
  }, [reducedMotion]);

  const goToTop = useCallback(() => {
    cancelAnimationFrame(frameRef.current);
    frameRef.current = 0;
    setState("idle");
    document.getElementById("top")?.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: reducedMotion ? "instant" : "smooth" });
  }, [reducedMotion]);

  useEffect(() => {
    if (!isTouring) return;
    if (reducedMotion) {
      stopTour();
      return;
    }

    let position = window.scrollY;
    let previousTime = performance.now();
    const startsAt = previousTime + 1200;

    const tick = (now: number) => {
      const delta = Math.min(now - previousTime, 64);
      previousTime = now;
      const bottom = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);

      if (now >= startsAt) {
        // Keep each viewport visible long enough for reveals and counters to finish.
        const speed = Math.min(160, Math.max(85, window.innerHeight * 0.18));
        const easeIn = Math.min((now - startsAt) / 800, 1);
        const easeOut = Math.min(1, Math.max(0.25, (bottom - position) / 160));
        position = Math.min(bottom, position + speed * easeIn * easeOut * delta / 1000);

        // Explicit instant steps avoid fighting the site's CSS smooth scrolling.
        window.scrollTo({ top: position, behavior: "instant" });

        if (bottom - position <= 1) {
          window.scrollTo({ top: bottom, behavior: "instant" });
          frameRef.current = 0;
          setState("complete");
          document.getElementById("go-to-top")?.focus({ preventScroll: true });
          return;
        }
      }

      frameRef.current = requestAnimationFrame(tick);
    };

    const onPointerDown = (event: PointerEvent) => {
      if (event.target instanceof Element && event.target.closest("[data-page-tour-control]")) return;
      stopTour();
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (["Escape", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "PageUp", "PageDown", "Home", "End", " ", "Tab", "Enter"].includes(event.key)) {
        if ((event.key === " " || event.key === "Enter") && event.target instanceof Element && event.target.closest("[data-page-tour-control]")) return;
        stopTour();
      }
    };

    const onVisibilityChange = () => {
      if (document.hidden) stopTour();
    };

    stopButtonRef.current?.focus({ preventScroll: true });
    frameRef.current = requestAnimationFrame(tick);
    window.addEventListener("wheel", stopTour, { passive: true });
    window.addEventListener("touchmove", stopTour, { passive: true });
    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("keydown", onKeyDown);
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("wheel", stopTour);
      window.removeEventListener("touchmove", stopTour);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [isTouring, reducedMotion, stopTour]);

  return {
    isTouring,
    reducedMotion,
    startTour,
    stopTour,
    goToTop,
    stopButtonRef,
    message: MESSAGES[state],
  };
}