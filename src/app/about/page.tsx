import type { Metadata } from "next";
import Image from "next/image";
import { ButtonLink } from "@/components/Buttons";
import { JsonLd } from "@/components/JsonLd";
import { LastUpdated } from "@/components/LastUpdated";
import { Reveal } from "@/components/Reveal";
import { Cite, Container, Eyebrow, SectionHeading } from "@/components/Section";
import {
  AUDIENCE,
  BOOKING_URL,
  BRAND_NAME,
  FREE_REPORT_URL,
  HOME_CITY,
  HOME_STATE,
  SERVICE_AREA,
} from "@/lib/config";
import { webPageSchema } from "@/lib/schema";
import { STATS } from "@/lib/stats";

const TITLE = `About ${BRAND_NAME}: AI consulting for nonprofits, based in Longmont, Colorado`;
const DESCRIPTION = `Kind Logic Group is a consulting firm in Longmont, Colorado that helps ${AUDIENCE} use AI so more of every donor dollar reaches the mission. Serving the Front Range in person and the United States remotely.`;

export const metadata: Metadata = {
  title: "About",
  description: DESCRIPTION,
  alternates: { canonical: "/about" },
  openGraph: { title: TITLE, description: DESCRIPTION, url: "/about" },
};

const checks = [
  ["AI search tools can reach the site", "robots.txt allows every major AI search crawler"],
  ["One clear web address", "every page declares one canonical URL"],
  ["Homepage title says what we do", "it does not start with “Home”"],
  ["Key pages updated in the last year", "a visible last-updated date, mirrored in the page metadata"],
  ["About page states mission and service area", "this page, in plain text"],
  ["City or service area written on the site", `${HOME_CITY}, ${HOME_STATE}, in the footer of every page`],
  ["Nonprofit status shown", "not applicable: we are a for-profit firm that serves nonprofits"],
  ["AI models may learn from the site", "training crawlers are allowed; we would like to be found"],
  ["Machine-readable labels are clean", "Organization schema, validated, no Person confusion"],
] as const;

export default function AboutPage() {
  return (
    <>
      <JsonLd data={webPageSchema({ path: "/about", name: TITLE, description: DESCRIPTION, type: "AboutPage" })} />

      {/* Mission and service area, in crawlable text, first. */}
      <section className="hero-backdrop">
        <Container className="grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-[1.2fr_0.8fr]">
          <Reveal>
            <Eyebrow>About Kind Logic Group</Eyebrow>
            <h1 className="text-4xl font-semibold leading-[1.08] sm:text-5xl lg:text-[56px]">
              More of every donor dollar should reach the mission. That&rsquo;s the whole company.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate sm:text-xl sm:leading-9">
              {BRAND_NAME} is a consulting firm that helps {AUDIENCE} use AI in ways they can explain
              to a board, defend to a funder, and run without us. We are based in {HOME_CITY},{" "}
              {HOME_STATE}. We work with nonprofits along {SERVICE_AREA} in person and across the
              United States remotely.
            </p>
          </Reveal>
          <Reveal delay={150} as="figure" className="justify-self-center lg:justify-self-end">
            <div className="rounded-3xl border border-vellum bg-white p-6 shadow-lift">
              <Image
                src="/brand/klg-logo.png"
                alt="Kind Logic Group logo: a drafting compass over the words Kind Logic Group, AI for mission-driven organizations"
                width={320}
                height={320}
                sizes="(max-width: 640px) 70vw, 320px"
                className="h-auto w-[240px] sm:w-[320px]"
              />
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Story */}
      <section className="border-t border-vellum bg-white">
        <Container className="py-16 sm:py-24">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <Reveal>
              <SectionHeading eyebrow="Where this comes from" title="A plan is only as good as the crew running it at 2 a.m." />
            </Reveal>
            <Reveal delay={120}>
              <div className="space-y-5 text-[17px] leading-8 text-ink">
                <p>
                  Mark Solomon, the founder, spent twenty-two years in the Navy. Most of what
                  transfers from that to nonprofit work is not dramatic. Checklists beat heroics.
                  Instructions only count if the newest person can follow them without you in the
                  room. And the plan on paper matters much less than whether anyone is actually
                  running it.
                </p>
                <p>
                  After the Navy he co-founded Veterans Community Project, a nonprofit serving
                  veterans that has grown to roughly seventy people across six locations in five
                  states. That is where the donor-dollar rule became personal. Overhead in a
                  nonprofit is never abstract. Every dollar that goes to a process that could have
                  been simpler is a dollar that did not reach the person the organization exists
                  for.
                </p>
                <p>
                  Kind Logic Group is the combination of those two things: military habits of
                  clear, runnable instruction, applied to the one technology that is arriving in
                  nonprofits faster than anyone can write the rules for it. {STATS.adoptionVsGovernance.figure}{" "}
                  of nonprofits already use AI. {STATS.shadowAi.figure} of their staff use tools
                  nobody approved. Only 22% have a formal plan for the risk. We would like to close
                  that gap one organization at a time, in plain English.
                </p>
                <Cite source={STATS.adoptionVsGovernance.source} url={STATS.adoptionVsGovernance.url} />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* How we work */}
      <section className="bg-navy text-white">
        <div className="dot-texture">
          <Container className="py-16 sm:py-24">
            <Reveal>
              <SectionHeading
                tone="light"
                eyebrow="How we work"
                title="We are not a technology company."
                lede="We are a consulting firm that happens to know how the technology works. The difference shows up in what you get: things you run, written for the people who will run them."
              />
            </Reveal>
            <ul className="mt-12 grid gap-5 md:grid-cols-3">
              {[
                {
                  t: "Plain English, always.",
                  b: "If a sentence needs a glossary, we rewrite the sentence. Reports and policies are written for an executive director on a Tuesday afternoon, not for a technologist.",
                },
                {
                  t: "Nonprofits only.",
                  b: "We don't split attention between sectors. The questions a food bank's donors ask an AI are different from the questions a dentist's patients ask, and we only study the first kind.",
                },
                {
                  t: "Honest about what we don't know.",
                  b: "AI answers change weekly and nobody controls them fully. We tell you what we can move, what we can't, and how we'll know the difference.",
                },
              ].map((p, i) => (
                <Reveal as="li" key={p.t} delay={i * 90}>
                  <div className="h-full rounded-2xl border border-white/12 bg-white/[0.04] p-6">
                    <h3 className="text-xl font-semibold text-white">{p.t}</h3>
                    <p className="mt-3 text-[15px] leading-7 text-white/75">{p.b}</p>
                  </div>
                </Reveal>
              ))}
            </ul>
          </Container>
        </div>
      </section>

      {/* Held to our own standard */}
      <section id="our-own-checks" className="scroll-mt-24 bg-white">
        <Container className="py-16 sm:py-24">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <Reveal>
              <SectionHeading
                eyebrow="Our own homework"
                title="This site is held to the same nine checks we score clients on."
                lede="It would be odd to sell AI visibility from a website that AI tools couldn't read. Here is how this site does against the readiness list in our own reports."
              />
              <LastUpdated className="mt-6" />
            </Reveal>
            <Reveal delay={120}>
              <ol className="divide-y divide-vellum rounded-2xl border border-vellum bg-cream">
                {checks.map(([label, note], i) => {
                  const na = note.startsWith("not applicable");
                  return (
                    <li key={label} className="flex gap-4 px-5 py-4">
                      <span
                        className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold ${
                          na ? "bg-vellum text-slate" : "bg-teal-tint text-teal"
                        }`}
                        aria-label={na ? "Not applicable" : "Passes"}
                      >
                        {na ? "–" : i + 1}
                      </span>
                      <div>
                        <p className="font-semibold text-navy">{label}</p>
                        <p className="text-sm leading-6 text-slate">{note}</p>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="hero-backdrop border-t border-vellum">
        <Container className="py-16 sm:py-20">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-semibold leading-tight sm:text-4xl">Want to see your own list?</h2>
              <p className="mt-4 text-lg leading-8 text-slate">
                The free report runs these same checks on your site, plus what the AI tools actually
                say about you.
              </p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <ButtonLink href={FREE_REPORT_URL} size="lg">
                  See your AI visibility score
                </ButtonLink>
                <ButtonLink href={BOOKING_URL} variant="secondary" size="lg">
                  Book a 30-minute call
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
