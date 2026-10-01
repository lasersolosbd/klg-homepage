"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Logo } from "@/components/Logo";
import { ButtonLink } from "@/components/Buttons";
import { FREE_REPORT_URL, NAV_LINKS } from "@/lib/config";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-40 border-b border-vellum/80 bg-cream/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-4 px-5 py-3 sm:px-8">
        <Logo />

        <nav aria-label="Main" className="hidden items-center gap-7 text-[15px] font-semibold text-slate lg:flex">
          {NAV_LINKS.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-current={active ? "page" : undefined}
                className={`transition-colors hover:text-navy ${active ? "text-navy" : ""}`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <div className="hidden sm:block">
            <ButtonLink href={FREE_REPORT_URL}>
              <span className="lg:hidden">Free report</span>
              <span className="hidden lg:inline">See your AI visibility score</span>
            </ButtonLink>
          </div>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-vellum bg-white text-navy lg:hidden"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
              {open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>

      <div id="mobile-nav" hidden={!open} className="border-t border-vellum bg-cream lg:hidden">
        <nav aria-label="Mobile" className="mx-auto flex max-w-[1200px] flex-col px-5 py-3 sm:px-8">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={close}
              className="border-b border-vellum/70 py-3 text-base font-semibold text-navy last:border-b-0"
            >
              {l.label}
            </Link>
          ))}
          <div className="py-3 sm:hidden">
            <ButtonLink href={FREE_REPORT_URL} className="w-full">
              See your AI visibility score
            </ButtonLink>
          </div>
        </nav>
      </div>
    </header>
  );
}
