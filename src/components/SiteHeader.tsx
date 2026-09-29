"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Logo } from "@/components/Logo";
import { ButtonLink } from "@/components/Buttons";
import { FREE_REPORT_URL, NAV_LINKS } from "@/lib/config";

// Navy header on every page. On the homepage it merges into the navy hero so the top of the
// site reads as one composition; on the cream subpages it is the title bar of the sheet.
export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-40 bg-navy text-white">
      <div className="mx-auto flex max-w-[1240px] items-center justify-between gap-4 px-5 py-3.5 sm:px-8">
        <Logo dark />

        <nav aria-label="Main" className="hidden items-center gap-8 text-[13px] font-bold uppercase tracking-[0.14em] text-white/70 lg:flex">
          {NAV_LINKS.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-current={active ? "page" : undefined}
                className={`relative py-1 transition-colors hover:text-white ${
                  active ? "text-white after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-full after:bg-gold" : ""
                }`}
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
            className="inline-flex h-11 w-11 items-center justify-center rounded-[3px] border border-white/30 text-white lg:hidden"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
              {open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>
      {/* Ruler along the bottom edge of the header: the first appearance of the drafting motif. */}
      <div className="tick-rule text-white/25" aria-hidden />

      <div id="mobile-nav" hidden={!open} className="border-t border-white/10 bg-navy lg:hidden">
        <nav aria-label="Mobile" className="mx-auto flex max-w-[1240px] flex-col px-5 py-3 sm:px-8">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={close}
              className="border-b border-white/10 py-3.5 text-[13px] font-bold uppercase tracking-[0.14em] text-white last:border-b-0"
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
