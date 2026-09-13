import { useState } from "react";
import { cn } from "../utils/cn";

/**
 * Image with automatic fallback chain — if the primary official CDN
 * blocks hotlinking, swap to the next source instead of breaking.
 */
export default function SafeImg({
  src,
  fallbacks = [],
  alt,
  className,
  eager = false,
  width,
  height,
}: {
  src: string;
  fallbacks?: string[];
  alt: string;
  className?: string;
  eager?: boolean;
  width?: number;
  height?: number;
}) {
  const [idx, setIdx] = useState(-1);
  const current = idx === -1 ? src : fallbacks[idx];
  if (idx >= fallbacks.length) return null;
  return (
    <img
      src={current}
      alt={alt}
      className={cn("bg-carbon-800", className)}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      draggable={false}
      width={width}
      height={height}
      referrerPolicy="no-referrer"
      onError={() => setIdx((i) => i + 1)}
    />
  );
}
