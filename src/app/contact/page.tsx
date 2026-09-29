import type { Metadata } from "next";
import { ButtonLink } from "@/components/Buttons";
import { Crosshair, Pivot, SheetLabel } from "@/components/Drafting";
import { JsonLd } from "@/components/JsonLd";
import { Reveal } from "@/components/Reveal";
import { Container } from "@/components/Section";
import {
  BOOKING_URL,
  CONTACT_EMAIL,
  FREE_REPORT_URL,
  HOME_CITY,
  HOME_COORDINATES,
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

const steps = [
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
] as const;

export default function ContactPage() {
  return (
    <>
      <JsonLd data={webPageSchema({ path: "/contact", name: TITLE, description: DESCRIPTION, type: "ContactPage" })} />

      <section className="relative overflow-hidden">
        <div className="blueprint-grid grid-fade pointer-events-none absolute inset-0 lg:w-1/2" aria-hidden />
        <Container className="relative grid gap-14 pt-16 sm:pt-20 lg:grid-cols-12 lg:gap-8 lg:pb-20 lg:pt-0">
          <Reveal className="lg:col-span-6 lg:py-24 lg:pr-8">
            <SheetLabel index="C-01">Contact</SheetLabel>
            <h1 className="mt-8 max-w-[12ch] text-[44px] font-semibold leading-[1.0] sm:text-[60px] lg:text-[72px]">
              Thirty minutes, <em className="italic text-gold-deep">no slides.</em>
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-slate">
              Tell us what your organization does and what&rsquo;s nagging at you about AI.
              We&rsquo;ll tell you honestly whether we can help, and what we&rsquo;d do first if we
              can. If we&rsquo;re not the right fit, we&rsquo;ll say so and point you somewhere
              useful.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={BOOKING_URL} size="lg">
                Book a 30-minute call
              </ButtonLink>
              <ButtonLink href={`mailto:${CONTACT_EMAIL}`} variant="secondary" size="lg" external>
                Email instead
              </ButtonLink>
            </div>
            <dl className="mt-12 grid gap-6 border-t border-navy/25 pt-6 text-[15px] sm:grid-cols-2">
              <div>
                <dt className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-gold-text">
                  <Crosshair size={12} /> Email
                </dt>
                <dd className="mt-2">
                  <a href={`mailto:${CONTACT_EMAIL}`} className="font-semibold text-navy underline decoration-gold underline-offset-4">
                    {CONTACT_EMAIL}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-gold-text">
                  <Crosshair size={12} /> Where we are
                </dt>
                <dd className="mt-2 leading-7 text-ink">
                  {HOME_CITY}, {HOME_STATE}. In person along {SERVICE_AREA}; remote anywhere in the
                  United States.
                  <span className="mt-1 block text-xs tabular-nums text-slate" aria-hidden>
                    {HOME_COORDINATES}
                  </span>
                </dd>
              </div>
            </dl>
          </Reveal>

          {/* Navy panel bleeding right: the call, as a plan. */}
          <Reveal delay={120} className="lg:col-span-6">
            <div className="bleed-right relative -mx-5 bg-navy text-white sm:-mx-8 lg:ml-0 lg:min-h-full">
              <div className="blueprint-grid-light grid-fade pointer-events-none absolute inset-0" aria-hidden />
              <div className="relative px-5 py-12 sm:px-8 lg:px-14 lg:py-24">
                <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-gold">
                  <Crosshair size={12} /> What happens on the call
                </p>
                <ol className="mt-8">
                  {steps.map((s, i) => (
                    <li key={s.t} className="relative grid grid-cols-[44px_1fr] gap-5 pb-9 last:pb-0">
                      {i < steps.length - 1 && <span className="absolute bottom-0 left-[17px] top-9 w-px bg-white/25" aria-hidden />}
                      <Pivot size={36} tone="light">{i + 1}</Pivot>
                      <div className="pt-1">
                        <h2 className="font-sans text-lg font-semibold text-white">{s.t}</h2>
                        <p className="mt-1 text-[15px] leading-7 text-white/70">{s.b}</p>
                      </div>
                    </li>
                  ))}
                </ol>
                <div className="mt-12 border-t border-white/15 pt-7">
                  <p className="text-[15px] leading-7 text-white/70">
                    Would rather skip the call and see the data first? Fair.
                  </p>
                  <div className="mt-4">
                    <ButtonLink href={FREE_REPORT_URL} variant="outline-light">
                      Get the free report
                    </ButtonLink>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
