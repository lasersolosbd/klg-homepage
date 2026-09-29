import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "inverse" | "outline-light";

// Squared-off buttons with a tracked label: closer to a drawing's title block than a SaaS pill.
const base =
  "group inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-[3px] px-5 text-[14px] font-bold tracking-[0.02em] transition-all duration-200 active:translate-y-px";
const sizes = { md: "h-11", lg: "h-13 px-6 text-[15px]" } as const;
const variants: Record<Variant, string> = {
  primary: "bg-gold text-navy hover:bg-gold-deep",
  secondary: "border border-navy/30 bg-transparent text-navy hover:border-navy hover:bg-navy hover:text-white",
  ghost: "px-1 text-navy underline decoration-gold/70 decoration-1 underline-offset-[6px] hover:decoration-gold-deep hover:decoration-2",
  inverse: "bg-white text-navy hover:bg-gold-tint",
  "outline-light": "border border-white/40 text-white hover:border-white hover:bg-white hover:text-navy",
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "md",
  external,
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: keyof typeof sizes;
  external?: boolean;
  className?: string;
}) {
  const cls = `${base} ${sizes[size]} ${variants[variant]} ${className}`;
  const isExternal = external ?? /^https?:\/\//.test(href);
  if (isExternal) {
    return (
      <a href={href} className={cls} target="_blank" rel="noopener">
        {children}
        <ArrowIcon />
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
      <ArrowIcon />
    </Link>
  );
}

export function ArrowIcon({ className = "h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden>
      <path d="M3 10h13m0 0-4.5-4.5M16 10l-4.5 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
