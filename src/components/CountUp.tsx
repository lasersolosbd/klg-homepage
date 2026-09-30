"use client";

import { useEffect, useRef, useState } from "react";

// Counts a stat figure up from 0 when it scrolls into view. This is a marketing-explanatory
// animation (per the animation-decision framework: "rare/first-time, can add delight" and
// "explanation" is a valid purpose) — it appears once per page load, has a clear reason to
// move, and is capped short so it never feels like a gimmick or blocks reading the number.
//
// `value` is the numeric part (e.g. 98, 37, 22). `prefix`/`suffix` render outside the count
// (e.g. prefix="~" suffix="%"). Respects prefers-reduced-motion by rendering the final value
// immediately with no animation.
export function CountUp({
  value,
  prefix = "",
  suffix = "",
  duration = 900,
  className = "",
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setDisplay(value);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !started.current) {
            started.current = true;
            const start = performance.now();
            const tick = (now: number) => {
              const elapsed = now - start;
              const t = Math.min(1, elapsed / duration);
              // Same strong ease-out used for the rest of the entrance motion: fast start,
              // settles gently, never feels like it's still catching up.
              const eased = 1 - Math.pow(1 - t, 3);
              setDisplay(Math.round(eased * value));
              if (t < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
            io.unobserve(node);
          }
        }
      },
      { threshold: 0.4 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [value, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
