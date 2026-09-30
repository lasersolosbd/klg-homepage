"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Watches every `.reveal` element and adds `.is-visible` once it scrolls into view. Elements are
// only hidden when the document has the `js` class and the visitor allows motion (see globals.css),
// so crawlers and no-JS visitors always get the full page.
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const selector = [".reveal", ".reveal-line", ".reveal-wipe", ".reveal-measure", ".reveal-draw", ".reveal-stagger"]
      .map((c) => `${c}:not(.is-visible)`)
      .join(", ");
    const nodes = Array.from(document.querySelectorAll<HTMLElement>(selector));
    if (nodes.length === 0) return;

    if (typeof IntersectionObserver === "undefined") {
      nodes.forEach((n) => n.classList.add("is-visible"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, [pathname]);

  return null;
}

// Convenience wrapper: <Reveal delay={120}>…</Reveal>
// `variant` picks the entrance technique — default "reveal" is the ordinary fade-up used for
// body copy throughout the site. The others are reserved for the handful of moments per page
// that should feel deliberate rather than ambient: a headline sheet-wipe, a stat drawn on like a
// measurement, a compass/arc traced like a pen stroke, or a short stagger for a list of chips.
export function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
  variant = "reveal",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "article" | "li" | "figure" | "span";
  variant?: "reveal" | "reveal-wipe" | "reveal-measure" | "reveal-draw" | "reveal-stagger";
}) {
  return (
    <Tag className={`${variant} ${className}`} style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}>
      {children}
    </Tag>
  );
}
