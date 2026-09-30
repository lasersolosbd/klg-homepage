import { ButtonLink } from "@/components/Buttons";
import { FREE_REPORT_URL, BOOKING_URL } from "@/lib/config";

export const metadata = { robots: { index: false, follow: false } };

// PREVIEW A — same KLG brand (navy/gold/cream, Playfair Display), but rebuilt against the
// hard rules from the frontend-design and design-taste-frontend skills: one eyebrow max, a
// 2-line headline, <=20-word subtext, one primary + one secondary CTA, and a real hero visual
// (a mock AI answer) instead of a stat-card-with-gradient. Full-screen takeover so it can be
// judged on its own, without the site header/footer competing for attention.
export default function PreviewA() {
  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto bg-navy text-white">
      <div className="border-b border-white/10 bg-navy px-6 py-3 text-center text-xs font-semibold text-white/50">
        PREVIEW A — on-brand (navy / gold / cream / Playfair), disciplined to the new hard rules
      </div>

      <div className="mx-auto grid max-w-6xl items-center gap-16 px-6 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:py-24">
        <div>
          <p className="text-[13px] font-medium text-gold">For nonprofits raising $1M–$30M a year</p>

          <h1 className="mt-5 max-w-[15ch] font-display text-4xl font-semibold leading-[1.08] text-white sm:text-5xl lg:text-[3.4rem]">
            Somebody just asked an AI which nonprofit to support.{" "}
            <span className="text-gold">Did it say your name?</span>
          </h1>

          <p className="mt-6 max-w-md text-[17px] leading-8 text-white/75">
            Kind Logic Group helps nonprofits get found in AI answers and write an AI policy the
            board will actually sign.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href={FREE_REPORT_URL} size="lg">
              See your score
            </ButtonLink>
            <ButtonLink href={BOOKING_URL} variant="outline-light" size="lg">
              Book a call
            </ButtonLink>
          </div>
        </div>

        {/* The hero visual: a mock AI answer, the actual product of the problem, not a stat card. */}
        <div className="rounded-2xl border border-white/15 bg-[#0a1626] shadow-2xl">
          <div className="flex items-center gap-2 border-b border-white/10 px-5 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
            <p className="ml-2 truncate text-[13px] text-white/50">
              &ldquo;best nonprofits helping kids read near Fort Collins&rdquo;
            </p>
          </div>
          <div className="px-5 py-6">
            <p className="text-[11px] font-semibold text-gold">AI Overview</p>
            <ol className="mt-3 space-y-3 text-[15px] leading-6 text-white/90">
              <li className="flex gap-3">
                <span className="text-white/40">1</span> Second Story Literacy Project
              </li>
              <li className="flex gap-3">
                <span className="text-white/40">2</span> Bright Beginnings Reads
              </li>
              <li className="flex gap-3">
                <span className="text-white/40">3</span> ChapterOne Youth Foundation
              </li>
            </ol>
            <div className="mt-4 rounded-lg border border-dashed border-gold/50 bg-gold/5 px-4 py-3">
              <p className="text-[13px] text-white/60">Your organization — not mentioned.</p>
            </div>
            <p className="mt-4 text-[13px] leading-5 text-white/45">
              Three names. If yours isn&rsquo;t one of them, the donor never scrolls.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
