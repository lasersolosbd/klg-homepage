import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/Buttons";
import { JsonLd } from "@/components/JsonLd";
import { Reveal } from "@/components/Reveal";
import { Cite, Container, Eyebrow, SectionHeading } from "@/components/Section";
import {
  AEO_PRICE_PER_MONTH,
  AI_ENGINES,
  BOOKING_URL,
  CONTACT_EMAIL,
  FREE_REPORT_URL,
} from "@/lib/config";
import { webPageSchema } from "@/lib/schema";
import { STATS } from "@/lib/stats";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

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
    tone: "gold",
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

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={webPageSchema({
          path: "/",
          name: "Kind Logic Group: AI consulting for nonprofits",
          description:
            "AI-answer visibility, AI use policy, and (soon) AI assistants for nonprofits raising $1M–$30M a year.",
        })}
      />

      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section className="hero-backdrop relative overflow-hidden">
        <div className="drafting-grid pointer-events-none absolute inset-0" aria-hidden />
        <Container className="relative grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 lg:py-28">
          <div>
            <Reveal>
              <Eyebrow>AI for nonprofits raising $1M–$30M a year</Eyebrow>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="text-[40px] font-semibold leading-[1.06] sm:text-5xl lg:text-[64px]">
                Somebody just asked an AI which nonprofit to support. Did it say your name?
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-6 max-w-xl text-lg leading-8 text-slate sm:text-xl sm:leading-9">
                Kind Logic Group helps nonprofits get found in AI answers, write an AI policy the
                board will actually sign, and, soon, hand the busywork to assistants so more of
                every dollar raised reaches the mission.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <ButtonLink href={FREE_REPORT_URL} size="lg">
                  See your AI visibility score
                </ButtonLink>
                <ButtonLink href={BOOKING_URL} variant="secondary" size="lg">
                  Book a 30-minute call
                </ButtonLink>
              </div>
              <p className="mt-4 text-sm text-slate">
                The score is free, and you can read it without talking to anyone first.
              </p>
            </Reveal>
            <Reveal delay={320}>
              <ul className="mt-10 flex flex-wrap items-center gap-x-2 gap-y-2 text-[13px] font-medium text-slate" aria-label="AI tools we check">
                <li className="mr-1 text-[12px] font-bold uppercase tracking-[0.12em] text-gold-text">We check</li>
                {AI_ENGINES.map((e) => (
                  <li key={e} className="rounded-full border border-vellum bg-white/70 px-3 py-1">
                    {e}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal delay={200} as="figure" className="lg:justify-self-end">
            <div className="relative w-full max-w-md rounded-3xl bg-navy p-7 text-white shadow-sheet sm:p-9">
              <div className="dot-texture pointer-events-none absolute inset-0 rounded-3xl" aria-hidden />
              <div className="relative">
                <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-gold">The sector, this month</p>
                <p className="mt-4 font-display text-[88px] font-semibold leading-none text-white sm:text-[104px]">
                  {STATS.adoptionVsGovernance.figure}
                </p>
                <p className="mt-2 text-lg leading-7 text-white/90">of nonprofits already use AI in some way.</p>
                <div className="mt-6 grid grid-cols-2 gap-4 border-t border-white/15 pt-6">
                  <div>
                    <p className="font-display text-4xl font-semibold text-gold">61%</p>
                    <p className="mt-1 text-sm leading-5 text-white/75">use it officially</p>
                  </div>
                  <div>
                    <p className="font-display text-4xl font-semibold text-gold">22%</p>
                    <p className="mt-1 text-sm leading-5 text-white/75">have a formal AI risk plan</p>
                  </div>
                </div>
                <figcaption className="mt-6 text-xs leading-5 text-white/55">
                  {STATS.adoptionVsGovernance.source}.{" "}
                  <a href={STATS.adoptionVsGovernance.url} target="_blank" rel="noopener" className="underline underline-offset-2 hover:text-white">
                    Read it
                  </a>
                </figcaption>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ── Problem ──────────────────────────────────────────────────────────── */}
      <section id="problem" className="border-t border-vellum bg-white">
        <Container className="py-16 sm:py-24">
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
            <Reveal>
              <SectionHeading
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
            <Reveal delay={120}>
              <div className="rounded-2xl border border-vellum bg-cream p-6 sm:p-8">
                <p className="font-display text-5xl font-semibold text-navy sm:text-6xl">
                  {STATS.aiOverviewClicks.figure}
                </p>
                <p className="mt-3 text-base leading-7 text-ink">
                  {STATS.aiOverviewClicks.claim}
                </p>
                <Cite source={STATS.aiOverviewClicks.source} url={STATS.aiOverviewClicks.url} />
                <p className="mt-5 border-t border-vellum pt-5 text-[15px] leading-7 text-slate">
                  Put plainly: the people who reach your website are increasingly the ones an AI
                  decided to send. The rest never see a link.
                </p>
              </div>
            </Reveal>
          </div>

          <ul className="mt-14 grid gap-5 md:grid-cols-3">
            {friction.map((f, i) => (
              <Reveal as="li" key={f.title} delay={i * 90}>
                <article className="flex h-full flex-col rounded-2xl border border-vellum bg-cream-2/60 p-6">
                  <h3 className="text-xl font-semibold leading-snug">{f.title}</h3>
                  <p className="mt-3 flex-1 text-[15px] leading-7 text-ink">{f.body}</p>
                  {"cite" in f && <Cite source={f.cite.sourceShort} url={f.cite.url} />}
                </article>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      {/* ── Service ladder ───────────────────────────────────────────────────── */}
      <section id="how-we-help" className="scroll-mt-24">
        <Container className="py-16 sm:py-24">
          <Reveal>
            <SectionHeading
              eyebrow="How we help"
              title="Three things you can run. One on the way."
              lede="In the order most organizations need them. Start with the cheapest, fastest thing that tells you something true about your situation."
            />
          </Reveal>

          <ol className="mt-12 grid gap-5 lg:grid-cols-2">
            {ladder.map((item, i) => {
              const highlight = item.tone === "gold";
              const muted = item.tone === "muted";
              return (
                <Reveal as="li" key={item.step} delay={i * 80}>
                  <article
                    className={`relative flex h-full flex-col rounded-3xl border p-7 sm:p-8 ${
                      highlight
                        ? "border-gold/50 bg-white shadow-lift"
                        : muted
                          ? "border-dashed border-slate/40 bg-cream-2/50"
                          : "border-teal-line bg-white shadow-card"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <span
                        className={`font-display text-sm font-bold tracking-wide ${
                          highlight ? "text-gold-text" : muted ? "text-slate" : "text-teal"
                        }`}
                      >
                        {item.step}
                      </span>
                      <span
                        className={`rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] ${
                          highlight
                            ? "bg-gold-tint text-gold-text"
                            : muted
                              ? "bg-vellum text-slate"
                              : "bg-teal-tint text-teal"
                        }`}
                      >
                        {item.kicker}
                      </span>
                    </div>
                    <h3 className="mt-4 text-2xl font-semibold leading-tight sm:text-[28px]">{item.name}</h3>
                    <p className="mt-1 text-sm font-semibold text-slate">{item.price}</p>
                    <p className="mt-4 flex-1 text-[15px] leading-7 text-ink">{item.body}</p>
                    <div className="mt-6">
                      <ButtonLink
                        href={item.cta.href}
                        variant={highlight ? "primary" : "secondary"}
                        external={/^https?:/.test(item.cta.href)}
                      >
                        {item.cta.label}
                      </ButtonLink>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </ol>

          <Reveal delay={100}>
            <p className="mt-8 text-sm text-slate">
              Details, what you get, and who each one is for:{" "}
              <Link href="/services" className="font-semibold text-navy underline underline-offset-4">
                How we help
              </Link>
              . The one real price is on the{" "}
              <Link href="/pricing" className="font-semibold text-navy underline underline-offset-4">
                pricing page
              </Link>
              . We haven&rsquo;t invented the others yet.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* ── Why KLG ──────────────────────────────────────────────────────────── */}
      <section id="why-klg" className="bg-navy text-white">
        <div className="dot-texture">
          <Container className="py-16 sm:py-24">
            <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
              <Reveal>
                <SectionHeading
                  tone="light"
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
                <div className="mt-8 rounded-2xl border border-white/15 bg-white/5 p-6">
                  <p className="font-display text-5xl font-semibold text-gold">{STATS.adoptionVsImpact.figure}</p>
                  <p className="mt-2 text-base leading-7 text-white/85">{STATS.adoptionVsImpact.claim}</p>
                  <p className="mt-3 text-sm leading-6 text-white/60">
                    A tool is not a strategy. The gap between those two numbers is where most of the
                    money goes.{" "}
                    <a href={STATS.adoptionVsImpact.url} target="_blank" rel="noopener" className="underline underline-offset-2 hover:text-white">
                      {STATS.adoptionVsImpact.sourceShort}
                    </a>
                  </p>
                </div>
              </Reveal>

              <ul className="grid gap-4 self-center">
                {[
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
                ].map((p, i) => (
                  <Reveal as="li" key={p.t} delay={i * 80}>
                    <div className="rounded-2xl border border-white/12 bg-white/[0.04] p-5 transition-colors hover:bg-white/[0.07]">
                      <h3 className="text-lg font-semibold text-white">{p.t}</h3>
                      <p className="mt-2 text-[15px] leading-7 text-white/75">{p.b}</p>
                    </div>
                  </Reveal>
                ))}
              </ul>
            </div>
          </Container>
        </div>
      </section>

      {/* ── Who we serve ─────────────────────────────────────────────────────── */}
      <section id="who-we-serve" className="bg-white">
        <Container className="py-16 sm:py-24">
          <Reveal>
            <SectionHeading
              eyebrow="Who we serve"
              title="Nonprofits raising $1M to $30M a year."
              lede="Under a million, you're probably still doing everything yourself, and the free report is still yours to use. Over thirty, you likely have a technology team, and you're welcome to send them our way. In between is where a small firm can change the most with the least."
            />
          </Reveal>
          <ul className="mt-12 grid gap-5 md:grid-cols-3">
            {audience.map((a, i) => (
              <Reveal as="li" key={a.role} delay={i * 90}>
                <article className="h-full rounded-2xl border border-vellum bg-cream p-6">
                  <h3 className="text-xl font-semibold">{a.role}</h3>
                  <p className="mt-3 text-[15px] leading-7 text-ink">{a.body}</p>
                </article>
              </Reveal>
            ))}
          </ul>
          <Reveal delay={200}>
            <div className="mt-10 flex flex-col items-start gap-4 rounded-2xl border border-teal-line bg-teal-tint p-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-[15px] leading-7 text-ink">
                Not sure you fit? Fifteen minutes on the phone is enough to tell you honestly. If
                we&rsquo;re not the right help, we&rsquo;ll say so and point you somewhere useful.
              </p>
              <ButtonLink href={BOOKING_URL} variant="secondary" className="shrink-0">
                Book a call
              </ButtonLink>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ── Why now ──────────────────────────────────────────────────────────── */}
      <section id="why-now">
        <Container className="py-16 sm:py-24">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <Reveal>
              <SectionHeading
                eyebrow="Why now"
                title="The cost of waiting is quiet."
                lede="Nothing breaks. No error message. The phone doesn't ring less; it just rings less than it would have. Meanwhile funders are starting to ask about AI governance in the application itself."
              />
              <div className="mt-8 rounded-2xl border border-coral-line bg-coral-tint p-6">
                <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-coral-text">Already in the fine print</p>
                <p className="mt-3 text-[15px] leading-7 text-ink">{STATS.gatesRequirement.claim}</p>
                <Cite source={STATS.gatesRequirement.source} url={STATS.gatesRequirement.url} />
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div className="rounded-3xl border border-vellum bg-white p-7 shadow-card sm:p-9">
                <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-gold-text">Three things you can do today</p>
                <ol className="mt-5 space-y-6">
                  {today.map((t, i) => (
                    <li key={t.step} className="flex gap-4">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-navy font-display text-base font-bold text-gold">
                        {i + 1}
                      </span>
                      <div>
                        <h3 className="font-sans text-lg font-semibold text-navy">{t.step}</h3>
                        <p className="mt-1 text-[15px] leading-7 text-ink">{t.body}</p>
                      </div>
                    </li>
                  ))}
                </ol>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <ButtonLink href={FREE_REPORT_URL}>Get the free report</ButtonLink>
                  <ButtonLink href="/services" variant="ghost">
                    Or read how the service works first
                  </ButtonLink>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ── Closing CTA ──────────────────────────────────────────────────────── */}
      <section className="hero-backdrop border-t border-vellum">
        <Container className="py-16 sm:py-24">
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <Eyebrow>Start small, start today</Eyebrow>
              <h2 className="text-3xl font-semibold leading-[1.12] sm:text-4xl lg:text-5xl">
                Find out what the AI tools say about you. Then decide.
              </h2>
              <p className="mt-5 text-lg leading-8 text-slate">
                The free report runs the same checks the monthly service does, once, and lists the
                top fixes. If it says you&rsquo;re fine, you&rsquo;ll know. If it doesn&rsquo;t,
                you&rsquo;ll know what to do first.
              </p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <ButtonLink href={FREE_REPORT_URL} size="lg">
                  See your AI visibility score
                </ButtonLink>
                <ButtonLink href={BOOKING_URL} variant="secondary" size="lg">
                  Talk it through first
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
