import type { Metadata } from "next";
import { ButtonLink } from "@/components/Buttons";
import { JsonLd } from "@/components/JsonLd";
import { Reveal } from "@/components/Reveal";
import { Container, SectionHeading } from "@/components/Section";
import {
  BOOKING_URL,
  CONTACT_EMAIL,
  FREE_REPORT_URL,
  HOME_CITY,
  HOME_STATE,
  SERVICE_AREA,
} from "@/lib/config";
import { webPageSchema } from "@/lib/schema";

const TITLE = "Contact Kind Logic Group: book a 30-minute call or email us";
const DESCRIPTION = `Book a 30-minute call with Kind Logic Group or email ${CONTACT_EMAIL}. Based in ${HOME_CITY}, ${HOME_STATE}; working with nonprofits along the Front Range and across the United States.`;

export const metadata: Metadata = {
  title: "Contact",
  description: DESCRIPTION,
  alternates: { canonical: "/contact" },
  openGraph: { title: TITLE, description: DESCRIPTION, url: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <JsonLd data={webPageSchema({ path: "/contact", name: TITLE, description: DESCRIPTION, type: "ContactPage" })} />

      <section className="hero-backdrop">
        <Container className="grid gap-12 py-16 sm:py-20 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <Reveal>
            <SectionHeading
              eyebrow="Contact"
              title="Thirty minutes, no slides."
              lede="Tell us what your organization does and what's nagging at you about AI. We'll tell you honestly whether we can help, and what we'd do first if we can. If we're not the right fit, we'll say so and point you somewhere useful."
            />
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={BOOKING_URL} size="lg">
                Book a 30-minute call
              </ButtonLink>
              <ButtonLink href={`mailto:${CONTACT_EMAIL}`} variant="secondary" size="lg" external>
                Email instead
              </ButtonLink>
            </div>
            <dl className="mt-10 grid gap-5 text-[15px] sm:grid-cols-2">
              <div>
                <dt className="text-[12px] font-bold uppercase tracking-[0.14em] text-gold-text">Email</dt>
                <dd className="mt-1">
                  <a href={`mailto:${CONTACT_EMAIL}`} className="font-semibold text-navy underline underline-offset-4">
                    {CONTACT_EMAIL}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-[12px] font-bold uppercase tracking-[0.14em] text-gold-text">Where we are</dt>
                <dd className="mt-1 leading-7 text-ink">
                  {HOME_CITY}, {HOME_STATE}. In person along {SERVICE_AREA}; remote anywhere in the
                  United States.
                </dd>
              </div>
            </dl>
          </Reveal>

          <Reveal delay={120}>
            <div className="rounded-3xl border border-vellum bg-white p-7 shadow-card sm:p-9">
              <h2 className="text-2xl font-semibold">What happens on the call</h2>
              <ol className="mt-5 space-y-5">
                {[
                  {
                    t: "You talk first.",
                    b: "What you raise, who you serve, and what made you click. Ten minutes, roughly.",
                  },
                  {
                    t: "We ask three questions.",
                    b: "Which AI tools your staff already use. Whether your board has an AI policy. And what an AI tool says when we ask it about your cause in your city (we'll check live).",
                  },
                  {
                    t: "You leave with a next step.",
                    b: "Usually the free report, sometimes the policy course, occasionally \"you're fine, call us next year.\" Written down, in an email, the same day.",
                  },
                ].map((s, i) => (
                  <li key={s.t} className="flex gap-4">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-navy font-display text-base font-bold text-gold">
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="font-sans text-lg font-semibold text-navy">{s.t}</h3>
                      <p className="mt-1 text-[15px] leading-7 text-ink">{s.b}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <div className="mt-8 border-t border-vellum pt-6">
                <p className="text-[15px] leading-7 text-slate">
                  Would rather skip the call and see the data first? Fair.
                </p>
                <div className="mt-3">
                  <ButtonLink href={FREE_REPORT_URL} variant="secondary">
                    Get the free report
                  </ButtonLink>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
