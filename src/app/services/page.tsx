import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/Buttons";
import { Crosshair, Dimension, Pivot, SheetLabel, TickRule } from "@/components/Drafting";
import { JsonLd } from "@/components/JsonLd";
import { LastUpdated } from "@/components/LastUpdated";
import { Reveal } from "@/components/Reveal";
import { Cite, Container } from "@/components/Section";
import {
  AEO_PRICE_PER_MONTH,
  AI_ENGINES,
  BOOKING_URL,
  CONTACT_EMAIL,
  FREE_REPORT_URL,
} from "@/lib/config";
import { webPageSchema } from "@/lib/schema";
import { STATS } from "@/lib/stats";

const TITLE = "How we help: AI visibility, AI policy, and AI assistants for nonprofits";
const DESCRIPTION = `Three services nonprofits actually run: a ${AEO_PRICE_PER_MONTH}/month AI visibility report across ${AI_ENGINES.length} AI tools, a guided AI use policy course for executive teams and boards, and AI assistants for staff (coming soon).`;

export const metadata: Metadata = {
  title: "How we help",
  description: DESCRIPTION,
  alternates: { canonical: "/services" },
  openGraph: { title: TITLE, description: DESCRIPTION, url: "/services" },
};

const stages = [
  ["#visibility", "01", "AI visibility"],
  ["#policy", "02", "AI policy course"],
  ["#retainer", "03", "The monthly habit"],
  ["#assistants", "04", "AI assistants"],
] as const;

function Stage({
  id,
  step,
  kicker,
  title,
  price,
  intro,
  get,
  who,
  first,
  cta,
  tone,
  aside,
  last = false,
}: {
  id: string;
  step: string;
  kicker: string;
  title: string;
  price: string;
  intro: React.ReactNode;
  get: string[];
  who: string;
  first: string;
  cta: { label: string; href: string };
  tone: "gold" | "teal" | "navy" | "muted";
  aside?: React.ReactNode;
  last?: boolean;
}) {
  const muted = tone === "muted";
  return (
    <Reveal as="article" className="relative scroll-mt-24 lg:grid lg:grid-cols-[72px_1fr] lg:gap-10">
      {/* Rail */}
      <div className="relative hidden lg:block" aria-hidden>
        <Pivot tone={tone} dashed={muted} size={48} className="sticky top-28">
          {step}
        </Pivot>
        {!last && <span className="absolute inset-y-0 left-6 w-px bg-navy/20" />}
      </div>

      <div id={id} className="relative border-t border-navy/20 py-14 lg:py-20">
        <div className="relative grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <p className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.2em] text-gold-text">
              <span className="lg:hidden">
                <Pivot size={28} tone={tone} dashed={muted} className="text-[11px]">
                  {step}
                </Pivot>
              </span>
              <span className="whitespace-nowrap">Stage {step}</span>
              <span className="h-px w-5 bg-navy/25" aria-hidden />
              <span className={muted ? "text-slate" : tone === "teal" ? "text-teal" : ""}>{kicker}</span>
            </p>
            <h2 className="mt-5 max-w-[18ch] text-[34px] font-semibold leading-[1.05] sm:text-[44px]">{title}</h2>
            <p className="mt-3 text-sm font-semibold tabular-nums text-slate">{price}</p>
            <div className="mt-7 max-w-2xl space-y-4 text-[17px] leading-8 text-ink">{intro}</div>
            <div className="mt-8">
              <ButtonLink href={cta.href} variant={muted ? "secondary" : "primary"}>
                {cta.label}
              </ButtonLink>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="border-t border-navy/25 pt-5">
              <h3 className="flex items-center gap-2 font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-gold-text">
                <Crosshair size={12} /> What you get
              </h3>
              <ul className="mt-4 space-y-3 text-[15px] leading-7 text-ink">
                {get.map((g, i) => (
                  <li key={g} className="grid grid-cols-[28px_1fr] gap-2">
                    <span className="pt-0.5 font-display text-sm font-bold tabular-nums text-navy/50" aria-hidden>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>{g}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-8 grid gap-8 sm:grid-cols-2">
              <div className="border-t border-navy/25 pt-5">
                <h3 className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-gold-text">Who it&rsquo;s for</h3>
                <p className="mt-3 text-[15px] leading-7 text-ink">{who}</p>
              </div>
              <div className="border-t border-navy/25 pt-5">
                <h3 className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-gold-text">First step</h3>
                <p className="mt-3 text-[15px] leading-7 text-ink">{first}</p>
              </div>
            </div>
            {aside && <div className="mt-10">{aside}</div>}
          </div>
        </div>
      </div>
    </Reveal>
  );
}

function Figure({
  figure,
  label,
  note,
  cite,
}: {
  figure: string;
  label: string;
  note?: string;
  cite: { source: string; url: string };
}) {
  return (
    <figure className="relative border-l border-navy/25 pl-6">
      <p className="font-display text-[64px] font-semibold leading-[0.9] text-navy">{figure}</p>
      <Dimension className="mt-3 text-navy/70" align="left">
        {label}
      </Dimension>
      {note && <p className="mt-3 text-[15px] leading-7 text-ink">{note}</p>}
      <figcaption>
        <Cite source={cite.source} url={cite.url} />
      </figcaption>
    </figure>
  );
}

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={webPageSchema({ path: "/services", name: TITLE, description: DESCRIPTION })} />

      {/* Page head: sheet label, big title, and an index ruler of the four stages. */}
      <section className="relative overflow-hidden">
        <div className="blueprint-grid grid-fade pointer-events-none absolute inset-0" aria-hidden />
        <Container className="relative pt-16 sm:pt-20">
          <Reveal>
            <SheetLabel index="S-01">How we help</SheetLabel>
            <h1 className="mt-8 max-w-[14ch] text-[44px] font-semibold leading-[1.0] sm:text-[60px] lg:text-[76px]">
              Three things you can run. <em className="italic text-gold-deep">One</em> on the way.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate">
              Each one is a thing your organization operates, not a recommendation you file. Here
              is what each includes, who it fits, and what to do first.
            </p>
          </Reveal>
          <Reveal delay={100} className="mt-14">
            <nav aria-label="On this page">
              <TickRule className="text-navy/40" />
              <ol className="grid grid-cols-2 gap-x-6 gap-y-4 pt-4 sm:grid-cols-4">
                {stages.map(([href, n, label]) => (
                  <li key={href}>
                    <a href={href} className="group flex items-start gap-3 text-[14px] font-semibold text-navy">
                      <span className="font-display text-sm font-bold tabular-nums text-gold-text">{n}</span>
                      <span className="underline decoration-transparent underline-offset-4 transition-colors group-hover:decoration-gold">
                        {label}
                      </span>
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </Reveal>
        </Container>
      </section>

      <Container className="mt-16">
        <Stage
          id="visibility"
          step="01"
          kicker="Start here"
          tone="gold"
          title="AI visibility for your organization"
          price={`${AEO_PRICE_PER_MONTH} per month, flat. Free first report.`}
          intro={
            <>
              <p>
                When someone asks ChatGPT, Claude, Gemini, Grok, Perplexity or Google&rsquo;s AI
                Mode about your cause in your city, one of three things happens. You get named. A
                different organization gets named. Or the answer is vague and nobody gets named.
                Most organizations have no idea which one it is.
              </p>
              <p>
                We ask those {AI_ENGINES.length} tools the questions your donors, volunteers and
                clients actually type, every month, and write down what came back. Then we check
                your website against the nine things that decide whether AI tools can find, read
                and trust it, and give you a to-do list of at most five items, each with who can do
                it and how long it takes.
              </p>
            </>
          }
          get={[
            `A monthly report, in plain English, of what ${AI_ENGINES.length} AI tools say about you and who they name instead`,
            "A website readiness score against the nine checks AI tools care about (crawler access, one clear address, a descriptive title, freshness, a clear About page, visible location, nonprofit status, training access, clean labels)",
            "A to-do list capped at five items, each with an owner and a time estimate",
            "Help making the fixes, not just a list of them",
            "Month-over-month tracking so you can see what moved",
          ]}
          who="Any nonprofit that depends on people finding it: donors, volunteers, referrals, clients. Especially organizations with a common cause name (food bank, habitat, humane society) where look-alikes get the credit."
          first="Run the free report. It takes the same checks and shows the top fixes. If the answer is already good, you'll know, and you can stop there."
          cta={{ label: "See your score, free", href: FREE_REPORT_URL }}
          aside={
            <Figure
              figure={STATS.aiOverviewClicks.figure}
              label="fewer clicks to any website"
              note="on Google searches where an AI Overview appears (2.4% vs. 3.8% click-through, Feb 2026)."
              cite={{ source: STATS.aiOverviewClicks.sourceShort, url: STATS.aiOverviewClicks.url }}
            />
          }
        />

        <Stage
          id="policy"
          step="02"
          kicker="Governance, not a gadget"
          tone="teal"
          title="AI policy, a guided course for your executive team and board"
          price="Priced per organization. Ask us."
          intro={
            <>
              <p>
                Your grant writer pastes a draft into ChatGPT to tighten it. Your case manager asks
                an AI to summarize notes. Your bookkeeper uploads a spreadsheet to &ldquo;just
                check the formulas.&rdquo; None of them are doing anything wrong, because nobody
                told them what wrong is.
              </p>
              <p>
                This is a structured course, not a template. Over a series of working sessions,
                your leadership team and board answer the real questions: which data never leaves
                the building, which tools are approved and who approves the next one, what you
                tell donors, and what happens when something goes sideways. You leave with a policy
                the board voted on, that your staff have read, and that a funder can be shown.
              </p>
            </>
          }
          get={[
            "Working sessions with your executive team and, if you want, the board",
            "A written AI use policy in your organization's own words, covering data, tools, disclosure, and incidents",
            "A one-page staff version people will actually read",
            "A board resolution ready to vote on",
            "Language you can hand to funders who ask about responsible AI practices",
          ]}
          who="Executive directors who suspect AI is already in use across the building and want rules before there's a reason to need them. Boards that would like to answer 'what's our AI policy?' with something other than a pause."
          first="Ask your staff which AI tools they used this week. Count. Then book a call and tell us the number; it shapes where the course starts."
          cta={{ label: "Ask about the course", href: BOOKING_URL }}
          aside={
            <div className="grid gap-10 sm:grid-cols-2 sm:gap-8">
              <Figure
                figure={STATS.shadowAi.figure}
                label="use unapproved AI tools"
                note="of nonprofit staff and executives, by their own report."
                cite={{ source: STATS.shadowAi.sourceShort, url: STATS.shadowAi.url }}
              />
              <blockquote className="border-l-2 border-coral pl-5">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-coral-text">Funders are asking</p>
                <p className="mt-3 text-[15px] leading-7 text-ink">{STATS.gatesRequirement.claim}</p>
                <Cite source={STATS.gatesRequirement.sourceShort} url={STATS.gatesRequirement.url} />
              </blockquote>
            </div>
          }
        />

        <Stage
          id="retainer"
          step="03"
          kicker="The monthly habit"
          tone="navy"
          title="Keep the visibility going"
          price={`Included in the ${AEO_PRICE_PER_MONTH} per month.`}
          intro={
            <>
              <p>
                An audit is a photograph. AI answers are a weather system. The organization that
                got named in March can drop out of the answer by August because a competitor
                published a better page, a directory listing went stale, or a model updated.
              </p>
              <p>
                That is why the visibility service is monthly, not one-and-done. Each report tells
                you what changed since last time, what to fix now, and what to leave alone. The
                to-do list stays short on purpose. Five things done beats twenty things listed.
              </p>
            </>
          }
          get={[
            "The same report, every month, with what changed highlighted",
            "A running history so the board can see the trend, not just a snapshot",
            "Priority order that always starts with whatever is blocking AI tools outright",
            "One flat price. Cancel when you like.",
          ]}
          who="Organizations that have run the free report and want the fixes made and kept made, without adding it to anyone's job description."
          first="Start with the free report. If you subscribe, the first month's to-do list is usually the longest; it gets shorter from there."
          cta={{ label: "See pricing", href: "/pricing" }}
        />

        <Stage
          id="assistants"
          step="04"
          kicker="Coming soon"
          tone="muted"
          last
          title="AI assistants for the work that isn't the mission"
          price="On the roadmap. Not for sale yet."
          intro={
            <>
              <p>
                Every nonprofit has a pile of work that is necessary, repetitive, and paid for with
                donor dollars: acknowledgment letters, the after-hours phone, the first draft of the
                board packet, the &ldquo;did you get my email&rdquo; follow-ups. We are building
                assistants that take that pile, under the policy you set in step two, so the people
                you already pay can spend their hours on the work only people can do.
              </p>
              <p>
                We are not selling this yet. We would rather ship it right than early.{" "}
                {STATS.randFailure.figure} {STATS.randFailure.claim.replace(/\.$/, "")}, mostly
                because they were sold before they were understood. If you want to be part of the
                early group, tell us.
              </p>
            </>
          }
          get={[
            "An early look when it's ready, and a say in what it does first",
            "Honest timelines by email, not a countdown page",
          ]}
          who="Organizations already running the visibility service or the policy course, with one or two clear, repetitive processes they'd like off a human's desk."
          first="Write down the three most repetitive tasks in your office and roughly how many hours a week they eat. Send us the list. That's the whole application."
          cta={{ label: "Get on the early list", href: `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("AI assistants early list")}` }}
          aside={<Cite source={STATS.randFailure.source} url={STATS.randFailure.url} />}
        />
      </Container>

      <section className="relative mt-8 bg-navy text-white">
        <TickRule className="text-white/30" />
        <div className="blueprint-grid-light grid-fade pointer-events-none absolute inset-0" aria-hidden />
        <Container className="relative py-16 lg:py-20">
          <Reveal>
            <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-8">
              <div className="lg:col-span-7">
                <h2 className="text-[34px] font-semibold leading-tight text-white sm:text-[44px]">Not sure which one you need?</h2>
                <p className="mt-4 max-w-2xl text-lg leading-8 text-white/75">
                  Most organizations start with the free report because it costs nothing and tells
                  you something true. If the policy question is more urgent, say so on the call and
                  we&rsquo;ll start there.
                </p>
                <p className="mt-6 text-sm text-white/55">
                  Wondering what the check looks like from the inside?{" "}
                  <Link href="/about#our-own-checks" className="font-semibold text-white underline decoration-gold underline-offset-4">
                    This site is held to the same nine checks
                  </Link>
                  .
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:col-span-5 lg:justify-end">
                <ButtonLink href={FREE_REPORT_URL}>See your AI visibility score</ButtonLink>
                <ButtonLink href={BOOKING_URL} variant="outline-light">
                  Book a 30-minute call
                </ButtonLink>
              </div>
            </div>
            <LastUpdated className="mt-10 !text-white/45" />
          </Reveal>
        </Container>
      </section>
    </>
  );
}
