import type { ReactNode } from "react";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1200px] px-5 sm:px-8 ${className}`}>{children}</div>;
}

export function Eyebrow({ children, tone = "gold" }: { children: ReactNode; tone?: "gold" | "teal" | "light" }) {
  const color = tone === "teal" ? "text-teal" : tone === "light" ? "text-gold" : "text-gold-text";
  return (
    <p className={`mb-3 text-[12px] font-bold uppercase tracking-[0.14em] ${color}`}>{children}</p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lede,
  align = "left",
  tone = "default",
}: {
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  align?: "left" | "center";
  tone?: "default" | "light";
}) {
  const light = tone === "light";
  return (
    <div className={`${align === "center" ? "mx-auto text-center" : ""} max-w-3xl`}>
      {eyebrow && <Eyebrow tone={light ? "light" : "gold"}>{eyebrow}</Eyebrow>}
      <h2 className={`text-3xl font-semibold leading-[1.12] sm:text-4xl lg:text-[44px] ${light ? "text-white" : ""}`}>
        {title}
      </h2>
      {lede && (
        <p className={`mt-5 text-lg leading-8 ${light ? "text-white/80" : "text-slate"}`}>{lede}</p>
      )}
    </div>
  );
}

// Small inline citation under a stat. Kept as a real link so the claim is checkable.
export function Cite({ source, url }: { source: string; url: string }) {
  return (
    <p className="mt-2 text-xs leading-5 text-slate">
      Source:{" "}
      <a href={url} target="_blank" rel="noopener" className="underline decoration-vellum underline-offset-2 hover:text-navy">
        {source}
      </a>
    </p>
  );
}
