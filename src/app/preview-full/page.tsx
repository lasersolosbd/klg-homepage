import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/Buttons";
import { CountUp } from "@/components/CountUp";
import { ArcSweep, CornerMarks, Crosshair, Dimension, Pivot, Scale, SheetLabel, TickRule } from "@/components/Drafting";
import { Reveal } from "@/components/Reveal";
import { Cite, Container, SectionHeading } from "@/components/Section";
import {
  AEO_PRICE_PER_MONTH,
  AI_ENGINES,
  BOOKING_URL,
  CONTACT_EMAIL,
  FREE_REPORT_URL,
} from "@/lib/config";
import { STATS } from "@/lib/stats";

export const metadata: Metadata = { robots: { index: false, follow: false } };

// PREVIEW FULL — Mark asked to see preview-e's "real instrument, not a mockup" idea in the
// context of the whole homepage, not just an isolated hero. This route runs through the site's
// normal layout (real header, real footer) and reuses every section of the actual homepage
// unchanged, EXCEPT the hero's right-hand figure, which is replaced with the AI-engine dial.
//
// One deliberate change from preview-e: on the real homepage we don't yet know a visitor's
// actual result, so the dial can't honestly claim "1 of 6 mention you" the way the standalone
// mockup did. Here it shows what's true unconditionally — the six engines KLG actually checks,
// every month — which is a truer fit for "native to the real subject" than an invented outcome
// would be. The rest of the page (What changed, How we help, Why KLG, Who we serve, Why now,
// Closing CTA) is untouched: those sections were already measured-figure/diagram treatments,
// not mockups, so they didn't need to change.

const ladder = [
  {
    step: "01",
    name: "AI visibility",
    kicker: "Start here",
    price: `${AEO_PRICE_PER_MONTH}/month, flat`,
    body: `Every month we ask ${AI_ENGINES.length} AI tools the questions your donors and clients ask, in your city, about your cause. You get a plain-English report of what they said, who they named instead of you, and the short list of fixes that would change that. Then we help you make the fixes.`,
    cta: { label: "See your score, free", href: FREE_REPORT_URL },
    tone: "gold",
  },
  {
    step: "02",
    name: "AI policy, guided",
    kicker: "Governance, not a gadget",
    price: "Priced per organization",
    body: "A structured course that walks your executive team and board through writing your own AI use policy: what data can go where, who approves which tools, what gets disclosed to donors, and how to say yes safely. You leave with a policy the board voted on, not a template you downloaded.",
    cta: { label: "Ask about the course", href: "/contact" },
    tone: "teal",
  },
  {
    step: "03",
    name: "Keep the visibility going",
    kicker: "The monthly habit",
    price: `Included in the ${AEO_PRICE_PER_MONTH}/month`,
    body: "AI answers change every week. Something you fixed in March can quietly slide by August because a competitor published a better page. The visibility service is not a one-time audit. It is the monthly check that catches the slide, with a to-do list short enough to actually get done.",
    cta: { label: "How the monthly report works", href: "/services#visibility" },
    tone: "navy",
  },
  {
    step: "04",
    name: "AI assistants for staff",
    kicker: "Coming soon",
    price: "On the roadmap",
    body: "Assistants that draft the acknowledgment letters, answer the after-hours phone, and prep the board packet, so the people you already pay can spend their hours on the work only people can do. The most efficient use of a donor dollar is the one that never becomes overhead.",
    cta: { label: "Get on the early list", href: `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("AI assistants early list")}` },
    tone: "muted",
  },
] as const;

const indent = ["lg:pl-0", "lg:pl-16", "lg:pl-32", "lg:pl-48"] as const;

const friction = [
  {
    title: "Your development director has three jobs.",
    body: "Grants, events, the database, and somehow also the website. Nobody on staff has a spare afternoon to learn what an \"AI Overview\" is, let alone fix one.",
  },
  {
    title: "Half your staff already use AI. Officially, you have no rules.",
    body: `${STATS.shadowAi.figure} of nonprofit staff use AI tools their organization hasn't approved. That means donor lists and case notes are probably going into public chat tools today, and nobody decided that.`,
    cite: STATS.shadowAi,
  },
  {
    title: "Every hour of admin is an hour off the mission.",
    body: "The acknowledgment letters, the board packet, the phone that rings at 5:40 p.m. Those hours are paid for with donor dollars. Some of them can be given back.",
  },
] as const;

const principles = [
  {
    t: "Plain English or it doesn't ship.",
    b: "Every report, every policy draft, every email is written for a busy executive director, not for the IT person you don't have.",
  },
  {
    t: "Built for the $1M–$30M range.",
    b: "Big enough to have a development director. Not big enough to have a technology department. That's the organization we design for, and the only one.",
  },
  {
    t: "One flat price on the thing we can price.",
    b: `The visibility service is ${AEO_PRICE_PER_MONTH} a month, same for everyone. No tiers, no seats, no surprise line items. The rest is scoped with you, in writing, before any work starts.`,
  },
  {
    t: "A plan people actually follow.",
    b: "Twenty-two years in the Navy teaches you that the best plan is the one the crew can run at 2 a.m. without the person who wrote it. That is the standard for everything we hand you.",
  },
] as const;

const audience = [
  {
    role: "Executive directors",
    body: "You need a straight answer on what AI should and shouldn't touch in your organization, and a way to explain that answer to the board in under ten minutes.",
  },
  {
    role: "Development directors",
    body: "You need to know whether the people typing your cause into ChatGPT ever hear your name, and what to change on the website if they don't.",
  },
  {
    role: "Board members",
    body: "You need a policy you can vote on with a clear conscience, and confidence that the organization isn't one screenshot away from a bad headline.",
  },
] as const;

const today = [
  {
    step: "Ask an AI about yourself.",
    body: "Open ChatGPT or Google and type \"[your cause] nonprofit in [your city].\" Read the answer. Notice who got named.",
  },
  {
    step: "Ask your staff one question.",
    body: "\"Which AI tools did you use this week?\" Don't scold. Just count. The number is probably higher than you think.",
  },
  {
    step: "Get the free report.",
    body: `It shows what ${AI_ENGINES.length} AI tools say about your organization right now, and the top fixes, in plain English. No card, no sales call required to read it.`,
  },
] as const;

// ── The dial: same instrument as preview-e, sized to sit in the hero's right column instead of
// standing alone. Every engine reads as active/checked — true regardless of who's viewing — since
// this page doesn't yet know any one visitor's actual result.
function EngineDial() {
  const SIZE = 420;
  const CENTER = SIZE / 2;
  const START_DEG = -90;
  const STEP = 360 / AI_ENGINES.length;

  function polar(cx: number, cy: number, r: number, deg: number) {
    const a = (deg * Math.PI) / 180;
    return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
  }

  const ticks: string[] = [];
  for (let deg = 0; deg < 360; deg += 5) {
    const major = deg % 30 === 0;
    const a = polar(CENTER, CENTER, 195, deg);
    const b = polar(CENTER, CENTER, 195 - (major ? 12 : 6), deg);
    ticks.push(`M ${a.x.toFixed(1)} ${a.y.toFixed(1)} L ${b.x.toFixed(1)} ${b.y.toFixed(1)}`);
  }

  return (
    <div className="relative mx-auto" style={{ width: SIZE, height: SIZE, maxWidth: "100%" }}>
      <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="absolute inset-0 h-full w-full" aria-hidden>
        <g stroke="white" strokeOpacity={0.16} fill="none" strokeWidth="1.1">
          <circle cx={CENTER} cy={CENTER} r={105} />
          <circle cx={CENTER} cy={CENTER} r={145} strokeDasharray="3 7" />
          <path d={ticks.join(" ")} />
          <circle cx={CENTER} cy={CENTER} r={195} strokeOpacity={0.28} />
        </g>
        {AI_ENGINES.map((engine, i) => {
          const deg = START_DEG + i * STEP;
          const inner = polar(CENTER, CENTER, 45, deg);
          const outer = polar(CENTER, CENTER, 193, deg);
          return (
            <line
              key={engine}
              x1={inner.x}
              y1={inner.y}
              x2={outer.x}
              y2={outer.y}
              stroke="var(--color-gold, #d49a3d)"
              strokeOpacity={0.5}
              strokeWidth={1.4}
            />
          );
        })}
      </svg>

      {AI_ENGINES.map((engine, i) => {
        const deg = START_DEG + i * STEP;
        const dot = polar(CENTER, CENTER, 187, deg);
        const label = polar(CENTER, CENTER, 228, deg);
        return (
          <span key={engine}>
            <span
              aria-hidden
              className="absolute h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold"
              style={{ left: dot.x, top: dot.y }}
            />
            <span
              className="absolute w-[100px] -translate-x-1/2 -translate-y-1/2 text-[10.5px] font-bold uppercase tracking-[0.13em] text-white/70"
              style={{ left: label.x, top: label.y }}
            >
              {engine}
            </span>
          </span>
        );
      })}

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
        <p className="font-display text-[2.7rem] font-semibold leading-none text-white">{AI_ENGINES.length}</p>
        <p className="mx-auto mt-2 max-w-[12ch] text-[10.5px] font-bold uppercase leading-4 tracking-[0.14em] text-white/55">
          AI engines checked, every month
        </p>
      </div>
    </div>
  );
}

export default function PreviewFullPage() {
  return (
    <>
      <div className="border-b border-navy/10 bg-cream px-6 py-3 text-center text-xs font-semibold text-navy/50">
        PREVIEW FULL — preview-e&rsquo;s hero dial, in the context of the real page (real header, real footer, every other section unchanged)
      </div>

      {/* ── Hero: real headline/copy/CTAs, right column now the instrument instead of a stat card */}
      <section className="relative bg-navy text-white">
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
          <div className="blueprint-grid-light grid-fade absolute inset-0" />
        </div>

        <Container className="relative pb-24 pt-14 sm:pt-20 lg:pb-28 lg:pt-24">
          <Reveal>
            <SheetLabel index="01" tone="light">
              For nonprofits raising $1M–$30M a year
            </SheetLabel>
          </Reveal>

          <div className="mt-10 grid items-center gap-14 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-6">
              <Reveal delay={80} variant="reveal-wipe">
                <h1 className="max-w-[13.5ch] text-[clamp(2.6rem,5.6vw,4.4rem)] font-semibold leading-[1.03] text-white">
                  Somebody just asked an AI which nonprofit to support. Did it say{" "}
                  <em className="italic text-gold">your name?</em>
                </h1>
              </Reveal>
              <Reveal delay={160}>
                <p className="mt-8 max-w-xl text-lg leading-8 text-white/75">
                  Kind Logic Group helps nonprofits get found in AI answers, write an AI policy the
                  board will actually sign, and, soon, hand the busywork to assistants so more of
                  every dollar raised reaches the mission.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <ButtonLink href={FREE_REPORT_URL} size="lg">
                    See your AI visibility score
                  </ButtonLink>
                  <ButtonLink href={BOOKING_URL} variant="outline-light" size="lg">
                    Book a 30-minute call
                  </ButtonLink>
                </div>
                <p className="mt-4 text-sm text-white/55">
                  The score is free, and you can read it without talking to anyone first.
                </p>
              </Reveal>
            </div>

            <Reveal delay={240} className="lg:col-span-6">
              <EngineDial />
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ── What changed: unchanged from the real homepage — already a measured figure, not a mockup */}
      <section id="problem" className="pt-32 sm:pt-32 lg:pt-36">
        <Container>
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-8">
            <Reveal className="lg:col-span-6 lg:pr-8">
              <SectionHeading
                index="02"
                eyebrow="What changed"
                title="The way people find you changed, and nobody sent a memo."
                lede={
                  <>
                    A retired teacher in Fort Collins types &ldquo;best local charities helping kids
                    read&rdquo; into Google. An AI summary appears at the top with three names in it.
                    She doesn&rsquo;t scroll. If you aren&rsquo;t one of the three, that gift goes
                    somewhere else, and you never find out it was on the table.
                  </>
                }
              />
            </Reveal>

            <Reveal delay={120} as="figure" variant="reveal-measure" className="lg:col-span-6">
              <div className="bleed-right relative border-y border-l border-vellum bg-white py-10 pl-7 pr-5 sm:pl-10 lg:py-14 lg:pl-14 lg:pr-20">
                <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-gold-text">
                  <Crosshair size={12} /> Measured
                </p>
                <p className="mt-4 font-display text-[clamp(5rem,10vw,9rem)] font-semibold leading-[0.9] text-navy">
                  <CountUp value={37} prefix="~" />
                  <span className="align-top text-[0.5em] text-gold-deep">%</span>
                </p>
                <Dimension className="mt-4 max-w-md text-navy/70" align="left">
                  fewer clicks to any website
                </Dimension>
                <p className="mt-4 max-w-md text-base leading-7 text-ink">
                  on Google searches where an AI Overview appears (2.4% vs. 3.8% click-through, Feb
                  2026).
                </p>
                <Cite source={STATS.aiOverviewClicks.source} url={STATS.aiOverviewClicks.url} />
                <p className="mt-6 max-w-md border-t border-vellum pt-5 text-[15px] leading-7 text-slate">
                  Put plainly: the people who reach your website are increasingly the ones an AI
                  decided to send. The rest never see a link.
                </p>
              </div>
            </Reveal>
          </div>

          <ol className="mt-20 grid gap-10 md:grid-cols-3 md:gap-0 md:divide-x md:divide-navy/15">
            {friction.map((f, i) => (
              <Reveal as="li" key={f.title} delay={i * 90} className="md:px-8 md:first:pl-0 md:last:pr-0">
                <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-gold-text">
                  <Crosshair size={12} /> Friction 0{i + 1}
                </p>
                <h3 className="mt-4 text-[24px] font-semibold leading-tight">{f.title}</h3>
                <p className="mt-3 text-[15px] leading-7 text-ink">{f.body}</p>
                {"cite" in f && <Cite source={f.cite.sourceShort} url={f.cite.url} />}
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      {/* ── Service ladder: unchanged ────────────────────────────────────────────────────────── */}
      <section id="how-we-help" className="scroll-mt-24 pb-8 pt-24 lg:pt-32">
        <Container>
          <Reveal>
            <div className="bleed-left relative border border-navy/15 bg-white shadow-sheet">
              <div className="blueprint-grid grid-fade pointer-events-none absolute inset-0" aria-hidden />
              <CornerMarks className="text-navy/50" inset={10} />

              <div className="relative px-6 py-14 sm:px-12 lg:px-20 lg:py-20">
                <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
                  <SectionHeading
                    index="03"
                    eyebrow="How we help"
                    title="Three things you can run. One on the way."
                    lede="In the order most organizations need them. Start with the cheapest, fastest thing that tells you something true about your situation."
                    className="max-w-3xl"
                  />
                  <dl className="hidden shrink-0 grid-cols-3 gap-px border border-navy/20 bg-navy/20 text-[11px] font-bold uppercase tracking-[0.16em] sm:grid lg:grid-cols-1">
                    {[
                      ["Sheet", "03 of 07"],
                      ["Scale", "1 : 1"],
                      ["Drawn for", "Nonprofits"],
                    ].map(([k, v]) => (
                      <div key={k} className="bg-white px-3 py-2">
                        <dt className="text-slate">{k}</dt>
                        <dd className="mt-0.5 text-navy">{v}</dd>
                      </div>
                    ))}
                  </dl>
                </div>

                <ol className="mt-14 lg:mt-20">
                  {ladder.map((item, i) => {
                    const first = i === 0;
                    const last = i === ladder.length - 1;
                    const muted = item.tone === "muted";
                    return (
                      <li key={item.step} className={`relative grid gap-5 py-10 lg:grid-cols-[56px_1fr] lg:gap-8 lg:py-12 ${indent[i]}`}>
                        <div className="relative hidden lg:block" aria-hidden>
                          {i > 0 && <span className="absolute -left-16 top-0 h-px w-16 bg-navy/25" />}
                          {i > 0 && <span className="absolute left-[22px] top-0 h-3 w-px bg-navy/25" />}
                          <Pivot tone={item.tone} dashed={muted} className={i > 0 ? "mt-3" : ""}>
                            {item.step}
                          </Pivot>
                          {!last && <span className={`absolute left-[22px] w-px bg-navy/25 ${i > 0 ? "top-[56px]" : "top-11"} -bottom-24`} />}
                        </div>
                        <span
                          className="outline-numeral pointer-events-none absolute right-0 top-6 hidden select-none font-display text-[150px] font-semibold leading-none xl:block"
                          aria-hidden
                        >
                          {item.step}
                        </span>
                        <div className="relative max-w-2xl">
                          <p className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.2em] text-gold-text">
                            <span className="lg:hidden">
                              <Pivot size={28} tone={item.tone} dashed={muted} className="text-[11px]">
                                {item.step}
                              </Pivot>
                            </span>
                            <span className="whitespace-nowrap">Stage {item.step}</span>
                            <span className="h-px w-5 bg-navy/25" aria-hidden />
                            <span className={muted ? "text-slate" : item.tone === "teal" ? "text-teal" : ""}>{item.kicker}</span>
                          </p>
                          <h3 className="mt-4 text-[30px] font-semibold leading-tight sm:text-[36px]">{item.name}</h3>
                          <p className="mt-1.5 text-sm font-semibold tabular-nums text-slate">{item.price}</p>
                          <p className="mt-5 text-[16px] leading-8 text-ink">{item.body}</p>
                          <div className="mt-6">
                            {first ? (
                              <ButtonLink href={item.cta.href}>{item.cta.label}</ButtonLink>
                            ) : (
                              <ButtonLink href={item.cta.href} variant="ghost" external={/^(https?:|mailto:)/.test(item.cta.href)}>
                                {item.cta.label}
                              </ButtonLink>
                            )}
                          </div>
                        </div>
                        {!last && <span className="absolute inset-x-0 bottom-0 h-px bg-navy/10 lg:hidden" aria-hidden />}
                      </li>
                    );
                  })}
                </ol>

                <p className="mt-6 max-w-2xl text-sm text-slate">
                  Details, what you get, and who each one is for:{" "}
                  <Link href="/services" className="font-semibold text-navy underline decoration-gold underline-offset-4">
                    How we help
                  </Link>
                  . The one real price is on the{" "}
                  <Link href="/pricing" className="font-semibold text-navy underline decoration-gold underline-offset-4">
                    pricing page
                  </Link>
                  . We haven&rsquo;t invented the others yet.
                </p>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ── Why KLG: unchanged ───────────────────────────────────────────────────────────────── */}
      <section id="why-klg" className="mt-20 lg:mt-28">
        <div className="relative bg-navy text-white">
          <div className="blueprint-grid-light grid-fade pointer-events-none absolute inset-0" aria-hidden />
          <Container className="relative pt-20 lg:pb-px lg:pt-28">
            <div className="grid gap-14 lg:grid-cols-12 lg:gap-8">
              <Reveal className="lg:col-span-6">
                <SectionHeading
                  tone="light"
                  index="04"
                  eyebrow="Why Kind Logic Group"
                  title="You don't need another deck."
                  lede={
                    <>
                      Plenty of consultants will study your organization, present findings, and
                      leave you a PDF. The PDF goes in a folder. The folder goes in a drawer. We
                      built the firm around a different rule: everything we sell is something you
                      run. A report that shows up every month. A policy your board votes on.
                      Assistants that answer the phone. If it can&rsquo;t be used on a Tuesday, we
                      don&rsquo;t offer it.
                    </>
                  }
                />
              </Reveal>

              <ol className="border-t border-white/15 lg:col-span-5 lg:col-start-8">
                {principles.map((p, i) => (
                  <Reveal as="li" key={p.t} delay={i * 80} className="grid grid-cols-[44px_1fr] border-b border-white/15 py-6">
                    <span className="font-display text-lg font-bold tabular-nums text-gold" aria-hidden>
                      0{i + 1}
                    </span>
                    <div>
                      <h3 className="text-[20px] font-semibold leading-snug text-white">{p.t}</h3>
                      <p className="mt-2 text-[15px] leading-7 text-white/70">{p.b}</p>
                    </div>
                  </Reveal>
                ))}
              </ol>
            </div>

            <Reveal delay={120} as="figure" className="relative z-10 mt-16 lg:-mb-24 lg:mt-20 lg:max-w-3xl">
              <div className="relative border-t-2 border-gold bg-white p-7 text-navy shadow-sheet sm:p-10">
                <CornerMarks className="text-navy/30" inset={8} />
                <div className="grid items-end gap-6 sm:grid-cols-[auto_1fr] sm:gap-10">
                  <p className="font-display text-[7rem] font-semibold leading-[0.9] sm:text-[8.5rem]">
                    7<span className="align-top text-[0.5em] text-gold-deep">%</span>
                  </p>
                  <div>
                    <Dimension className="text-navy/70" align="left">
                      report real strategic impact from AI
                    </Dimension>
                    <p className="mt-3 text-base leading-7 text-ink">
                      even though 92% use it. A tool is not a strategy. The gap between those two
                      numbers is where most of the money goes.
                    </p>
                    <Cite source={STATS.adoptionVsImpact.source} url={STATS.adoptionVsImpact.url} />
                  </div>
                </div>
              </div>
            </Reveal>
            <div className="h-16 lg:hidden" aria-hidden />
          </Container>
        </div>
      </section>

      {/* ── Who we serve: unchanged ──────────────────────────────────────────────────────────── */}
      <section id="who-we-serve" className="pt-20 lg:pt-44">
        <Container>
          <Reveal>
            <SectionHeading
              index="05"
              eyebrow="Who we serve"
              title="Nonprofits raising $1M to $30M a year."
              lede="Under a million, you're probably still doing everything yourself, and the free report is still yours to use. Over thirty, you likely have a technology team, and you're welcome to send them our way. In between is where a small firm can change the most with the least."
            />
          </Reveal>
          <Reveal delay={100}>
            <Scale
              className="mt-14"
              min={0}
              max={40}
              from={1}
              to={30}
              majorEvery={5}
              minorEvery={1}
              format={(n) => (n === 0 ? "$0" : `$${n}M`)}
              rangeLabel="Where we do our best work"
              fromLabel="$1M"
              toLabel="$30M"
            />
          </Reveal>

          <ul className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
            {audience.map((a, i) => (
              <Reveal as="li" key={a.role} delay={i * 90} className="border-t border-navy/25 pt-5">
                <h3 className="font-sans text-[12px] font-bold uppercase tracking-[0.18em] text-navy">{a.role}</h3>
                <p className="mt-3 text-[15px] leading-7 text-ink">{a.body}</p>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={200}>
            <p className="mt-12 max-w-3xl text-[15px] leading-7 text-slate">
              Not sure you fit? Fifteen minutes on the phone is enough to tell you honestly. If
              we&rsquo;re not the right help, we&rsquo;ll say so and point you somewhere useful.{" "}
              <a href={BOOKING_URL} target="_blank" rel="noopener" className="font-semibold text-navy underline decoration-gold underline-offset-4">
                Book a call
              </a>
              .
            </p>
          </Reveal>
        </Container>
      </section>

      {/* ── Why now: unchanged ───────────────────────────────────────────────────────────────── */}
      <section id="why-now" className="mt-20 lg:mt-28">
        <Container>
          <TickRule className="text-navy/40" />
          <div className="grid gap-14 pt-14 lg:grid-cols-12 lg:gap-8 lg:pt-20">
            <Reveal className="lg:col-span-5">
              <SectionHeading
                index="06"
                eyebrow="Why now"
                title="The cost of waiting is quiet."
                lede="Nothing breaks. No error message. The phone doesn't ring less; it just rings less than it would have. Meanwhile funders are starting to ask about AI governance in the application itself."
              />
              <blockquote className="mt-10 border-l-2 border-coral pl-5">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-coral-text">Already in the fine print</p>
                <p className="mt-3 text-[15px] leading-7 text-ink">{STATS.gatesRequirement.claim}</p>
                <Cite source={STATS.gatesRequirement.source} url={STATS.gatesRequirement.url} />
              </blockquote>
            </Reveal>

            <Reveal delay={120} className="lg:col-span-6 lg:col-start-7">
              <p className="flex items-center gap-2 border-t border-navy/25 pt-5 text-[11px] font-bold uppercase tracking-[0.2em] text-gold-text">
                <Crosshair size={12} /> Three things you can do today
              </p>
              <ol className="mt-8">
                {today.map((t, i) => (
                  <li key={t.step} className="relative grid grid-cols-[44px_1fr] gap-5 pb-9 last:pb-0">
                    {i < today.length - 1 && <span className="absolute bottom-0 left-[17px] top-9 w-px bg-navy/20" aria-hidden />}
                    <Pivot size={36} tone={i === 2 ? "gold" : "navy"}>{i + 1}</Pivot>
                    <div className="pt-1">
                      <h3 className="font-sans text-lg font-semibold text-navy">{t.step}</h3>
                      <p className="mt-1 text-[15px] leading-7 text-ink">{t.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
                <ButtonLink href={FREE_REPORT_URL}>Get the free report</ButtonLink>
                <ButtonLink href="/services" variant="ghost">
                  Or read how the service works first
                </ButtonLink>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ── Closing CTA: unchanged ───────────────────────────────────────────────────────────── */}
      <section className="relative mt-24 overflow-hidden border-t border-navy/15 bg-cream-2 lg:mt-32">
        <ArcSweep className="pointer-events-none absolute -bottom-16 -right-16 h-[120%] w-auto max-w-none text-navy" strokeOpacity={0.14} />
        <Container className="relative py-20 lg:py-28">
          <Reveal>
            <SheetLabel index="07">Start small, start today</SheetLabel>
            <h2 className="mt-8 max-w-[16ch] text-[40px] font-semibold leading-[1.02] sm:text-[52px] lg:text-[68px]">
              Find out what the AI tools say about you. <em className="italic text-gold-deep">Then</em> decide.
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate">
              The free report runs the same checks the monthly service does, once, and lists the
              top fixes. If it says you&rsquo;re fine, you&rsquo;ll know. If it doesn&rsquo;t,
              you&rsquo;ll know what to do first.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={FREE_REPORT_URL} size="lg">
                See your AI visibility score
              </ButtonLink>
              <ButtonLink href={BOOKING_URL} variant="secondary" size="lg">
                Talk it through first
              </ButtonLink>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
