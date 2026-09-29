import type { ReactNode } from "react";
import { SheetLabel } from "@/components/Drafting";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1240px] px-5 sm:px-8 ${className}`}>{children}</div>;
}

/**
 * Section heading built on the sheet-label system: "⌖ 02 — WHAT CHANGED ————" then a large
 * display heading and an optional lede. `size` lets one section run bigger than the rest so the
 * page has a hierarchy instead of six identical section tops.
 */
export function SectionHeading({
  index,
  eyebrow,
  title,
  lede,
  tone = "default",
  size = "md",
  className = "",
}: {
  index?: string;
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  tone?: "default" | "light";
  size?: "md" | "lg";
  className?: string;
}) {
  const light = tone === "light";
  const h = size === "lg" ? "text-[40px] sm:text-[52px] lg:text-[64px]" : "text-[34px] sm:text-[42px] lg:text-[50px]";
  return (
    <div className={className}>
      {eyebrow && <SheetLabel index={index} tone={light ? "light" : "dark"} className="mb-6">{eyebrow}</SheetLabel>}
      <h2 className={`font-semibold leading-[1.02] ${h} ${light ? "text-white" : ""}`}>{title}</h2>
      {lede && (
        <p className={`mt-6 max-w-2xl text-lg leading-8 ${light ? "text-white/75" : "text-slate"}`}>{lede}</p>
      )}
    </div>
  );
}

// Small inline citation under a stat. Kept as a real link so the claim is checkable.
export function Cite({ source, url, tone = "default" }: { source: string; url: string; tone?: "default" | "light" }) {
  const light = tone === "light";
  return (
    <p className={`mt-2 text-xs leading-5 ${light ? "text-white/55" : "text-slate"}`}>
      Source:{" "}
      <a
        href={url}
        target="_blank"
        rel="noopener"
        className={`underline underline-offset-2 ${light ? "decoration-white/30 hover:text-white" : "decoration-vellum hover:text-navy"}`}
      >
        {source}
      </a>
    </p>
  );
}
