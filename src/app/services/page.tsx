import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/Buttons";
import { JsonLd } from "@/components/JsonLd";
import { LastUpdated } from "@/components/LastUpdated";
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

const TITLE = "How we help: AI visibility, AI policy, and AI assistants for nonprofits";
const DESCRIPTION = `Three services nonprofits actually run: a ${AEO_PRICE_PER_MONTH}/month AI visibility report across ${AI_ENGINES.length} AI tools, a guided AI use policy course for executive teams and boards, and AI assistants for staff (coming soon).`;

export const metadata: Metadata = {
  title: "How we help",
  description: DESCRIPTION,
  alternates: { canonical: "/services" },
  openGraph: { title: TITLE, description: DESCRIPTION, url: "/services" },
};

function Block({
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
  aside,
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
  aside?: React.ReactNode;
}) {
  return (
    <Reveal as="article" className="scroll-mt-24 border-t border-vellum py-14 sm:py-20">
      <div id={id} className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <div>
          <p className="font-display text-sm font-bold tracking-wide text-gold-text">{step}</p>
          <Eyebrow>{kicker}</Eyebrow>
          <h2 className="text-3xl font-semibold leading-[1.12] sm:text-4xl">{title}</h2>
          <p className="mt-2 text-sm font-semibold text-slate">{price}</p>
          <div className="mt-5 space-y-4 text-[17px] leading-8 text-ink">{intro}</div>
          <div className="mt-7">
            <ButtonLink href={cta.href}>{cta.label}</ButtonLink>
          </div>
        </div>
        <div className="space-y-5">
          <div className="rounded-2xl border border-vellum bg-white p-6 shadow-card">
            <h3 className="font-sans text-[12px] font-bold uppercase tracking-[0.14em] text-gold-text">What you get</h3>
            <ul className="mt-3 space-y-2.5 text-[15px] leading-7 text-ink">
              {get.map((g) => (
                <li key={g} className="flex gap-3">
                  <span className="mt-[11px] h-1.5 w-1.5 shrink-0 rounded-full bg-gold" aria-hidden />
                  <span>{g}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="rounded-2xl border border-vellum bg-cream-2/60 p-5">
              <h3 className="font-sans text-[12px] font-bold uppercase tracking-[0.14em] text-gold-text">Who it&rsquo;s for</h3>
              <p className="mt-2 text-[15px] leading-7 text-ink">{who}</p>
            </div>
            <div className="rounded-2xl border border-vellum bg-cream-2/60 p-5">
              <h3 className="font-sans text-[12px] font-bold uppercase tracking-[0.14em] text-gold-text">First step</h3>
              <p className="mt-2 text-[15px] leading-7 text-ink">{first}</p>
            </div>
          </div>
          {aside}
        </div>
      </div>
    </Reveal>
  );
}

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={webPageSchema({ path: "/services", name: TITLE, description: DESCRIPTION })} />

      <section className="hero-backdrop">
        <Container className="py-16 sm:py-20">
          <Reveal>
            <SectionHeading
              eyebrow="How we help"
              title="Three things you can run. One on the way."
              lede="Each one is a thing your organization operates, not a recommendation you file. Here is what each includes, who it fits, and what to do first."
            />
          </Reveal>
          <Reveal delay={100}>
            <nav aria-label="On this page" className="mt-8 flex flex-wrap gap-2 text-sm font-semibold">
              {[
                ["#visibility", "01 AI visibility"],
                ["#policy", "02 AI policy course"],
                ["#retainer", "03 The monthly habit"],
                ["#assistants", "04 AI assistants (soon)"],
              ].map(([href, label]) => (
                <a key={href} href={href} className="rounded-full border border-vellum bg-white px-4 py-2 text-navy hover:border-navy">
                  {label}
                </a>
              ))}
            </nav>
          </Reveal>
        </Container>
      </section>

      <Container>
        <Block
          id="visibility"
          step="01"
          kicker="Start here"
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
            <div className="rounded-2xl border border-vellum bg-white p-5">
              <p className="font-display text-4xl font-semibold text-navy">{STATS.aiOverviewClicks.figure}</p>
              <p className="mt-2 text-[15px] leading-7 text-ink">{STATS.aiOverviewClicks.claim}</p>
              <Cite source={STATS.aiOverviewClicks.sourceShort} url={STATS.aiOverviewClicks.url} />
            </div>
          }
        />

        <Block
          id="policy"
          step="02"
          kicker="Governance, not a gadget"
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
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="rounded-2xl border border-vellum bg-white p-5">
                <p className="font-display text-4xl font-semibold text-navy">{STATS.shadowAi.figure}</p>
                <p className="mt-2 text-[15px] leading-7 text-ink">{STATS.shadowAi.claim}</p>
                <Cite source={STATS.shadowAi.sourceShort} url={STATS.shadowAi.url} />
              </div>
              <div className="rounded-2xl border border-coral-line bg-coral-tint p-5">
                <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-coral-text">Funders are asking</p>
                <p className="mt-2 text-[15px] leading-7 text-ink">{STATS.gatesRequirement.claim}</p>
                <Cite source={STATS.gatesRequirement.sourceShort} url={STATS.gatesRequirement.url} />
              </div>
            </div>
          }
        />

        <Block
          id="retainer"
          step="03"
          kicker="The monthly habit"
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

        <Block
          id="assistants"
          step="04"
          kicker="Coming soon"
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
          aside={
            <div className="rounded-2xl border border-vellum bg-white p-5">
              <Cite source={STATS.randFailure.source} url={STATS.randFailure.url} />
            </div>
          }
        />
      </Container>

      <section className="border-t border-vellum bg-white">
        <Container className="py-14 sm:py-20">
          <Reveal>
            <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
              <div className="max-w-2xl">
                <h2 className="text-3xl font-semibold leading-tight">Not sure which one you need?</h2>
                <p className="mt-3 text-lg leading-8 text-slate">
                  Most organizations start with the free report because it costs nothing and tells
                  you something true. If the policy question is more urgent, say so on the call and
                  we&rsquo;ll start there.
                </p>
                <LastUpdated className="mt-4" />
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <ButtonLink href={FREE_REPORT_URL}>See your AI visibility score</ButtonLink>
                <ButtonLink href={BOOKING_URL} variant="secondary">
                  Book a 30-minute call
                </ButtonLink>
              </div>
            </div>
          </Reveal>
          <p className="mt-8 text-sm text-slate">
            Wondering what the check looks like from the inside?{" "}
            <Link href="/about" className="font-semibold text-navy underline underline-offset-4">
              This site is held to the same nine checks
            </Link>
            .
          </p>
        </Container>
      </section>
    </>
  );
}
