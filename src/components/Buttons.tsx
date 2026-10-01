import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "inverse";

const base =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl px-5 text-[15px] font-semibold transition-all duration-200 active:translate-y-px";
const sizes = { md: "h-11", lg: "h-13 px-6 text-base" } as const;
const variants: Record<Variant, string> = {
  primary: "bg-gold text-navy shadow-card hover:bg-gold-deep hover:shadow-lift",
  secondary: "border border-navy/20 bg-white text-navy hover:border-navy hover:bg-cream-2",
  ghost: "text-navy underline-offset-4 hover:underline",
  inverse: "bg-white text-navy hover:bg-gold-tint",
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

export function ArrowIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden>
      <path d="M4 10h11m0 0-4-4m4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
