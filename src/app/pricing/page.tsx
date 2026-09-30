import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/Buttons";
import { Crosshair, Dimension, SheetLabel, TickRule } from "@/components/Drafting";
import { JsonLd } from "@/components/JsonLd";
import { LastUpdated } from "@/components/LastUpdated";
import { Reveal } from "@/components/Reveal";
import { Container } from "@/components/Section";
import {
  AEO_PRICE_PER_MONTH,
  AI_ENGINES,
  BOOKING_URL,
  CONTACT_EMAIL,
  FREE_REPORT_URL,
} from "@/lib/config";
import { webPageSchema } from "@/lib/schema";

const TITLE = `Pricing: ${AEO_PRICE_PER_MONTH}/month AI visibility for nonprofits, policy course scoped per organization`;
const DESCRIPTION = `One flat price for the AI visibility service (${AEO_PRICE_PER_MONTH} a month, free first report). The AI policy course is scoped per organization. AI assistants are on the roadmap. No tiers, no seats.`;

export const metadata: Metadata = {
  title: "Pricing",
  description: DESCRIPTION,
  alternates: { canonical: "/pricing" },
  openGraph: { title: TITLE, description: DESCRIPTION, url: "/pricing" },
};

const faq = [
  {
    q: "Why is the visibility service one flat price?",
    a: "Because the work is the same whether you're a small shop or a large one. The AI tools don't care about your budget, and neither does the check.",
  },
  {
    q: "Is there a contract?",
    a: "Month to month. The first month usually has the longest to-do list; after that it's maintenance. Stop when it stops being useful.",
  },
  {
    q: "What if we're a small organization?",
    a: "Run the free report anyway. It's genuinely free and the fixes are yours to make. If you subscribe later, the price is the same.",
  },
] as const;

export default function PricingPage() {
  return (
    <>
      <JsonLd data={webPageSchema({ path: "/pricing", name: TITLE, description: DESCRIPTION })} />

      {/* The one real number, drawn at scale. */}
      <section className="relative overflow-hidden">
        <div className="blueprint-grid grid-fade pointer-events-none absolute inset-0" aria-hidden />
        <Container className="relative pb-16 pt-16 sm:pt-20 lg:pb-24">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-end lg:gap-8">
            <Reveal className="lg:col-span-6">
              <SheetLabel index="P-01">Pricing</SheetLabel>
              <h1 className="mt-8 max-w-[14ch] text-[40px] font-semibold leading-[1.02] sm:text-[54px] lg:text-[64px]">
                One real number. Two honest &ldquo;ask us.&rdquo;
              </h1>
              <p className="mt-7 max-w-xl text-lg leading-8 text-slate">
                We only publish a price when it&rsquo;s the same for everyone. Right now that&rsquo;s
                one service. The others are scoped with you before any work starts, and you&rsquo;ll
                have it in writing.
              </p>
            </Reveal>
            <Reveal delay={120} as="figure" className="lg:col-span-5 lg:col-start-8">
              <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-gold-text">
                <Crosshair size={12} /> AI visibility
              </p>
              <p className="mt-3 font-display text-[clamp(5.5rem,11vw,9.5rem)] font-semibold leading-[0.9] text-navy">
                {AEO_PRICE_PER_MONTH}
              </p>
              <Dimension className="mt-4 text-navy/70" align="left">
                per month, flat, same for everyone
              </Dimension>
              <p className="mt-4 text-[15px] leading-7 text-slate">
                Free first report. Month to month. No tiers, no seats, no surprise line items.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      <section>
        <Container>
          <TickRule className="text-navy/40" />
          <div className="grid gap-12 pt-12 lg:grid-cols-3 lg:gap-10 lg:pt-16">
            {/* 01: the priced offer, gold rule */}
            <Reveal as="article" className="relative border-t-2 border-gold pt-6">
              <p className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.2em] text-gold-text">
                <span>01</span>
                <span className="h-px w-5 bg-navy/25" aria-hidden />
                <span>Start here</span>
              </p>
              <h2 className="mt-4 text-[28px] font-semibold leading-tight">AI visibility</h2>
              <p className="mt-3 flex items-baseline gap-2">
                <span className="font-display text-[44px] font-semibold leading-none text-navy">{AEO_PRICE_PER_MONTH}</span>
                <span className="text-sm font-semibold text-slate">/ month</span>
              </p>
              <ol className="mt-7 space-y-3 border-t border-navy/15 pt-6 text-[15px] leading-7 text-ink">
                {[
                  `Monthly report of what ${AI_ENGINES.length} AI tools say about you`,
                  "Website readiness score against nine checks",
                  "To-do list capped at five items, with owners and time estimates",
                  "Help making the fixes",
                  "Month-over-month history",
                  "Cancel whenever you like",
                ].map((l, i) => (
                  <li key={l} className="grid grid-cols-[28px_1fr] gap-2">
                    <span className="pt-0.5 font-display text-sm font-bold tabular-nums text-navy/50" aria-hidden>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {l}
                  </li>
                ))}
              </ol>
              <div className="mt-8">
                <ButtonLink href={FREE_REPORT_URL}>See your score, free</ButtonLink>
              </div>
            </Reveal>

            {/* 02: scoped, teal rule */}
            <Reveal as="article" delay={90} className="relative border-t-2 border-teal pt-6">
              <p className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.2em] text-teal">
                <span>02</span>
                <span className="h-px w-5 bg-navy/25" aria-hidden />
                <span>Guided course</span>
              </p>
              <h2 className="mt-4 text-[28px] font-semibold leading-tight">AI policy course</h2>
              <p className="mt-3 font-display text-[30px] font-semibold leading-tight text-navy">Scoped per organization</p>
              <p className="mt-7 border-t border-navy/15 pt-6 text-[15px] leading-7 text-ink">
                The price depends on how many people are in the room and whether the board joins.
                We&rsquo;ll give you a fixed number after one call, before anything is scheduled.
                No hourly billing, no surprise.
              </p>
              <div className="mt-8">
                <ButtonLink href={BOOKING_URL} variant="secondary">
                  Ask about the course
                </ButtonLink>
              </div>
            </Reveal>

            {/* 04: roadmap, dashed rule */}
            <Reveal as="article" delay={180} className="relative border-t-2 border-dashed border-slate/50 pt-6">
              <p className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.2em] text-slate">
                <span>04</span>
                <span className="h-px w-5 bg-navy/25" aria-hidden />
                <span>Coming soon</span>
              </p>
              <h2 className="mt-4 text-[28px] font-semibold leading-tight">AI assistants for staff</h2>
              <p className="mt-3 font-display text-[30px] font-semibold leading-tight text-navy">Not for sale yet</p>
              <p className="mt-7 border-t border-navy/15 pt-6 text-[15px] leading-7 text-ink">
                When it&rsquo;s ready it will be priced the same way as everything else: written
                down, agreed before work starts, and cheaper than the staff hours it gives back.
                Until then, the early list is free.
              </p>
              <div className="mt-8">
                <ButtonLink
                  href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("AI assistants early list")}`}
                  variant="secondary"
                  external
                >
                  Get on the early list
                </ButtonLink>
              </div>
            </Reveal>
          </div>

          <p className="mt-10 text-sm text-slate">
            Stage 03, keeping the visibility going, is the monthly part of stage 01. It is not a
            separate price.
          </p>

          <Reveal delay={200} className="mt-16 lg:mt-24">
            <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-gold-text">
              <Crosshair size={12} /> Questions people ask
            </p>
            <dl className="mt-6 divide-y divide-navy/15 border-y border-navy/15">
              {faq.map((f) => (
                <div key={f.q} className="grid gap-3 py-6 lg:grid-cols-12 lg:gap-8">
                  <dt className="font-sans text-[17px] font-semibold text-navy lg:col-span-5">{f.q}</dt>
                  <dd className="text-[15px] leading-7 text-ink lg:col-span-7">{f.a}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 pb-20 text-sm text-slate lg:pb-28">
            <p>
              Questions about any of this?{" "}
              <Link href="/contact" className="font-semibold text-navy underline decoration-gold underline-offset-4">
                Ask us directly
              </Link>
              .
            </p>
            <LastUpdated />
          </div>
        </Container>
      </section>
    </>
  );
}
