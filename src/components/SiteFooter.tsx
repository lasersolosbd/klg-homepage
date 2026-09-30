import Link from "next/link";
import { Logo } from "@/components/Logo";
import { LastUpdated } from "@/components/LastUpdated";
import { Crosshair } from "@/components/Drafting";
import {
  AEO_TOOL_URL,
  AUDIENCE,
  BOOKING_URL,
  BRAND_NAME,
  CONTACT_EMAIL,
  FREE_REPORT_URL,
  HOME_COORDINATES,
  NAV_LINKS,
  SERVICE_AREA_LONG,
} from "@/lib/config";

export function SiteFooter() {
  return (
    <footer className="relative mt-auto overflow-hidden bg-navy text-white">
      <div className="tick-rule text-white/30" aria-hidden />
      <div className="blueprint-grid-light grid-fade pointer-events-none absolute inset-0" aria-hidden />
      <div className="relative mx-auto grid max-w-[1240px] gap-12 px-5 pb-14 pt-14 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr] md:gap-8">
        <div>
          <Logo dark size="lg" />
          <p className="mt-6 max-w-md text-[15px] leading-relaxed text-white/75">
            AI consulting for {AUDIENCE}. We help you get found in AI answers, set an AI policy
            your board will sign, and keep more of every donor dollar pointed at the mission.
          </p>
          <p className="mt-4 max-w-md text-[14px] leading-relaxed text-white/60">{SERVICE_AREA_LONG}</p>
        </div>

        <nav aria-label="Footer" className="text-sm">
          <p className="mb-4 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-gold">
            <Crosshair size={12} /> Explore
          </p>
          <ul className="space-y-2.5 text-white/85">
            <li>
              <Link href="/" className="hover:text-white hover:underline">
                Home
              </Link>
            </li>
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-white hover:underline">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="text-sm">
          <p className="mb-4 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-gold">
            <Crosshair size={12} /> Start here
          </p>
          <ul className="space-y-2.5 text-white/85">
            <li>
              <a href={FREE_REPORT_URL} className="hover:text-white hover:underline" rel="noopener">
                Free AI visibility report
              </a>
            </li>
            <li>
              <a href={AEO_TOOL_URL} className="hover:text-white hover:underline" rel="noopener">
                The AI visibility tool
              </a>
            </li>
            <li>
              <a href={BOOKING_URL} className="hover:text-white hover:underline" rel="noopener">
                Book a 30-minute call
              </a>
            </li>
            <li>
              <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-white hover:underline">
                {CONTACT_EMAIL}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="relative border-t border-white/10">
        <div className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-3 px-5 py-5 text-xs text-white/60 sm:px-8">
          <p className="tabular-nums">
            &copy; {new Date().getFullYear()} {BRAND_NAME}. Longmont, Colorado{" "}
            <span className="text-white/35" aria-hidden>
              · {HOME_COORDINATES}
            </span>
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-white hover:underline">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-white hover:underline">
              Terms
            </Link>
            <LastUpdated className="!text-white/60" />
          </div>
        </div>
      </div>
    </footer>
  );
}
