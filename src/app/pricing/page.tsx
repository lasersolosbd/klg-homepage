import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/Buttons";
import { JsonLd } from "@/components/JsonLd";
import { LastUpdated } from "@/components/LastUpdated";
import { Reveal } from "@/components/Reveal";
import { Container, SectionHeading } from "@/components/Section";
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

export default function PricingPage() {
  return (
    <>
      <JsonLd data={webPageSchema({ path: "/pricing", name: TITLE, description: DESCRIPTION })} />

      <section className="hero-backdrop">
        <Container className="py-16 sm:py-20">
          <Reveal>
            <SectionHeading
              align="center"
              eyebrow="Pricing"
              title="One real number. Two honest 'ask us.'"
              lede="We only publish a price when it's the same for everyone. Right now that's one service. The others are scoped with you before any work starts, and you'll have it in writing."
            />
          </Reveal>
        </Container>
      </section>

      <section className="border-t border-vellum bg-white">
        <Container className="py-14 sm:py-20">
          <div className="grid gap-6 lg:grid-cols-3">
            <Reveal className="lg:row-span-1">
              <article className="relative flex h-full flex-col rounded-3xl border-2 border-gold bg-white p-7 shadow-lift sm:p-8">
                <span className="absolute -top-3 left-7 rounded-full bg-gold px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-navy">
                  Start here
                </span>
                <h2 className="text-2xl font-semibold">AI visibility</h2>
                <p className="mt-4 flex items-baseline gap-1">
                  <span className="font-display text-5xl font-semibold text-navy">{AEO_PRICE_PER_MONTH}</span>
                  <span className="text-slate">/ month</span>
                </p>
                <p className="mt-1 text-sm font-semibold text-gold-text">Flat. Same for everyone. Free first report.</p>
                <ul className="mt-6 flex-1 space-y-2.5 text-[15px] leading-7 text-ink">
                  {[
                    `Monthly report of what ${AI_ENGINES.length} AI tools say about you`,
                    "Website readiness score against nine checks",
                    "To-do list capped at five items, with owners and time estimates",
                    "Help making the fixes",
                    "Month-over-month history",
                    "Cancel whenever you like",
                  ].map((l) => (
                    <li key={l} className="flex gap-3">
                      <span className="mt-[11px] h-1.5 w-1.5 shrink-0 rounded-full bg-gold" aria-hidden />
                      {l}
                    </li>
                  ))}
                </ul>
                <div className="mt-7">
                  <ButtonLink href={FREE_REPORT_URL} className="w-full">
                    See your score, free
                  </ButtonLink>
                </div>
              </article>
            </Reveal>

            <Reveal delay={90}>
              <article className="flex h-full flex-col rounded-3xl border border-teal-line bg-white p-7 shadow-card sm:p-8">
                <h2 className="text-2xl font-semibold">AI policy course</h2>
                <p className="mt-4 font-display text-3xl font-semibold text-navy">Scoped per organization</p>
                <p className="mt-1 text-sm font-semibold text-teal">Guided sessions with your leadership and board</p>
                <p className="mt-6 flex-1 text-[15px] leading-7 text-ink">
                  The price depends on how many people are in the room and whether the board joins.
                  We&rsquo;ll give you a fixed number after one call, before anything is scheduled.
                  No hourly billing, no surprise.
                </p>
                <div className="mt-7">
                  <ButtonLink href={BOOKING_URL} variant="secondary" className="w-full">
                    Ask about the course
                  </ButtonLink>
                </div>
              </article>
            </Reveal>

            <Reveal delay={180}>
              <article className="flex h-full flex-col rounded-3xl border border-dashed border-slate/40 bg-cream-2/60 p-7 sm:p-8">
                <h2 className="text-2xl font-semibold">AI assistants for staff</h2>
                <p className="mt-4 font-display text-3xl font-semibold text-navy">Coming soon</p>
                <p className="mt-1 text-sm font-semibold text-slate">Not for sale yet, on purpose</p>
                <p className="mt-6 flex-1 text-[15px] leading-7 text-ink">
                  When it&rsquo;s ready it will be priced the same way as everything else: written
                  down, agreed before work starts, and cheaper than the staff hours it gives back.
                  Until then, the early list is free.
                </p>
                <div className="mt-7">
                  <ButtonLink
                    href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("AI assistants early list")}`}
                    variant="secondary"
                    className="w-full"
                    external
                  >
                    Get on the early list
                  </ButtonLink>
                </div>
              </article>
            </Reveal>
          </div>

          <Reveal delay={200}>
            <div className="mt-12 grid gap-6 rounded-2xl border border-vellum bg-cream p-6 sm:p-8 lg:grid-cols-3">
              {[
                {
                  q: "Why is the visibility service one flat price?",
                  a: "Because the work is the same whether you raise $1M or $30M. The AI tools don't care about your budget, and neither does the check.",
                },
                {
                  q: "Is there a contract?",
                  a: "Month to month. The first month usually has the longest to-do list; after that it's maintenance. Stop when it stops being useful.",
                },
                {
                  q: "What if we're under $1M?",
                  a: "Run the free report anyway. It's genuinely free and the fixes are yours to make. If you subscribe later, the price is the same.",
                },
              ].map((f) => (
                <div key={f.q}>
                  <h3 className="font-sans text-base font-semibold text-navy">{f.q}</h3>
                  <p className="mt-2 text-[15px] leading-7 text-ink">{f.a}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 text-sm text-slate">
            <p>
              Questions about any of this?{" "}
              <Link href="/contact" className="font-semibold text-navy underline underline-offset-4">
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
