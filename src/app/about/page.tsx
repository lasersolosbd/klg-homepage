import type { Metadata } from "next";
import Image from "next/image";
import { ButtonLink } from "@/components/Buttons";
import { ArcSweep, CornerMarks, Crosshair, SheetLabel, TickRule } from "@/components/Drafting";
import { JsonLd } from "@/components/JsonLd";
import { LastUpdated } from "@/components/LastUpdated";
import { Reveal } from "@/components/Reveal";
import { Cite, Container, SectionHeading } from "@/components/Section";
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

const principles = [
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
] as const;

export default function AboutPage() {
  return (
    <>
      <JsonLd data={webPageSchema({ path: "/about", name: TITLE, description: DESCRIPTION, type: "AboutPage" })} />

      {/* Mission and service area, in crawlable text, first. The logo is pinned to the sheet. */}
      <section className="relative overflow-hidden">
        <div className="blueprint-grid grid-fade pointer-events-none absolute inset-0" aria-hidden />
        <Container className="relative grid gap-14 pb-20 pt-16 sm:pt-20 lg:grid-cols-12 lg:items-center lg:gap-8 lg:pb-24">
          <Reveal className="lg:col-span-7">
            <SheetLabel index="A-01">About Kind Logic Group</SheetLabel>
            <h1 className="mt-8 max-w-[16ch] text-[40px] font-semibold leading-[1.02] sm:text-[54px] lg:text-[66px]">
              More of every donor dollar should reach the mission. That&rsquo;s the whole company.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate sm:text-xl sm:leading-9">
              {BRAND_NAME} is a consulting firm that helps {AUDIENCE} use AI in ways they can explain
              to a board, defend to a funder, and run without us. We are based in {HOME_CITY},{" "}
              {HOME_STATE}. We work with nonprofits along {SERVICE_AREA} in person and across the
              United States remotely.
            </p>
          </Reveal>
          <Reveal delay={150} as="figure" className="justify-self-center lg:col-span-4 lg:col-start-9 lg:justify-self-end">
            <div className="relative p-6">
              <CornerMarks className="text-navy/60" />
              <Image
                src="/brand/klg-logo.png"
                alt="Kind Logic Group logo: a drafting compass over the words Kind Logic Group, AI for mission-driven organizations"
                width={320}
                height={320}
                sizes="(max-width: 640px) 70vw, 320px"
                className="h-auto w-[240px] mix-blend-multiply sm:w-[300px]"
              />
            </div>
            <figcaption className="mt-3 text-center text-[11px] font-bold uppercase tracking-[0.2em] text-slate">
              Fig. 1 &mdash; the mark
            </figcaption>
          </Reveal>
        </Container>
      </section>

      {/* Story: asymmetric, the heading column narrow and the text wide. */}
      <section>
        <Container>
          <TickRule className="text-navy/40" />
          <div className="grid gap-12 py-16 lg:grid-cols-12 lg:gap-8 lg:py-24">
            <Reveal className="lg:col-span-4">
              <SectionHeading index="A-02" eyebrow="Where this comes from" title="A plan is only as good as the crew running it at 2 a.m." />
            </Reveal>
            <Reveal delay={120} className="lg:col-span-7 lg:col-start-6">
              <div className="space-y-6 text-[17px] leading-8 text-ink">
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
                  nonprofits faster than anyone can write the rules for it.
                </p>
              </div>
              {/* Three measurements in a row, annotated, not boxed. */}
              <ul className="mt-10 grid grid-cols-3 gap-4 border-t border-navy/25 pt-6 sm:gap-8">
                {[
                  [STATS.adoptionVsGovernance.figure, "of nonprofits already use AI"],
                  [STATS.shadowAi.figure, "of staff use tools nobody approved"],
                  ["22%", "have a formal plan for the risk"],
                ].map(([n, l]) => (
                  <li key={l}>
                    <p className="font-display text-[40px] font-semibold leading-none text-navy sm:text-[52px]">{n}</p>
                    <p className="mt-2 text-[13px] leading-5 text-slate">{l}</p>
                  </li>
                ))}
              </ul>
              <Cite source={STATS.adoptionVsGovernance.source} url={STATS.adoptionVsGovernance.url} />
              <p className="mt-6 text-[17px] leading-8 text-ink">
                We would like to close that gap one organization at a time, in plain English.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* How we work: navy, numbered ledger with hairlines. */}
      <section className="relative bg-navy text-white">
        <div className="blueprint-grid-light grid-fade pointer-events-none absolute inset-0" aria-hidden />
        <Container className="relative py-16 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
            <Reveal className="lg:col-span-5">
              <SectionHeading
                tone="light"
                index="A-03"
                eyebrow="How we work"
                title="We are not a technology company."
                lede="We are a consulting firm that happens to know how the technology works. The difference shows up in what you get: things you run, written for the people who will run them."
              />
            </Reveal>
            <ol className="border-t border-white/15 lg:col-span-6 lg:col-start-7">
              {principles.map((p, i) => (
                <Reveal as="li" key={p.t} delay={i * 90} className="grid grid-cols-[52px_1fr] border-b border-white/15 py-7">
                  <span className="font-display text-xl font-bold tabular-nums text-gold" aria-hidden>
                    0{i + 1}
                  </span>
                  <div>
                    <h3 className="text-[22px] font-semibold leading-snug text-white">{p.t}</h3>
                    <p className="mt-2 text-[15px] leading-7 text-white/70">{p.b}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      {/* Held to our own standard: an inspection sheet. */}
      <section id="our-own-checks" className="scroll-mt-24">
        <Container className="py-16 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
            <Reveal className="lg:col-span-4">
              <SectionHeading
                index="A-04"
                eyebrow="Our own homework"
                title="This site is held to the same nine checks we score clients on."
                lede="It would be odd to sell AI visibility from a website that AI tools couldn't read. Here is how this site does against the readiness list in our own reports."
              />
              <LastUpdated className="mt-6" />
            </Reveal>
            <Reveal delay={120} className="lg:col-span-8">
              <div className="relative border border-navy/20 bg-white">
                <CornerMarks className="text-navy/50" inset={6} />
                <div className="flex items-center justify-between border-b border-navy/20 px-5 py-3 text-[11px] font-bold uppercase tracking-[0.2em] text-navy sm:px-6">
                  <span className="flex items-center gap-2">
                    <Crosshair size={12} className="text-gold-text" /> Readiness inspection
                  </span>
                  <span className="text-slate">9 items</span>
                </div>
                <ol>
                  {checks.map(([label, note], i) => {
                    const na = note.startsWith("not applicable");
                    return (
                      <li key={label} className="grid grid-cols-[40px_1fr_auto] items-start gap-4 border-b border-navy/10 px-5 py-4 last:border-b-0 sm:px-6">
                        <span className="pt-0.5 font-display text-sm font-bold tabular-nums text-slate" aria-hidden>
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <div>
                          <p className="font-semibold text-navy">{label}</p>
                          <p className="text-sm leading-6 text-slate">{note}</p>
                        </div>
                        <span
                          className={`mt-0.5 border px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.18em] ${
                            na ? "border-slate/40 text-slate" : "border-teal text-teal"
                          }`}
                        >
                          {na ? "N/A" : "Pass"}
                        </span>
                      </li>
                    );
                  })}
                </ol>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden border-t border-navy/15 bg-cream-2">
        <ArcSweep className="pointer-events-none absolute -bottom-16 -right-16 h-[120%] w-auto max-w-none text-navy" strokeOpacity={0.14} />
        <Container className="relative py-16 lg:py-24">
          <Reveal>
            <h2 className="max-w-[16ch] text-[36px] font-semibold leading-[1.05] sm:text-[48px]">Want to see your own list?</h2>
            <p className="mt-5 max-w-xl text-lg leading-8 text-slate">
              The free report runs these same checks on your site, plus what the AI tools actually
              say about you.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={FREE_REPORT_URL} size="lg">
                See your AI visibility score
              </ButtonLink>
              <ButtonLink href={BOOKING_URL} variant="secondary" size="lg">
                Book a 30-minute call
              </ButtonLink>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
