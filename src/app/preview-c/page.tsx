import { ArcSweep, CornerMarks, Leader, SheetLabel, TickRule } from "@/components/Drafting";
import { ButtonLink } from "@/components/Buttons";
import { FREE_REPORT_URL, BOOKING_URL } from "@/lib/config";

export const metadata = { robots: { index: false, follow: false } };

// PREVIEW C — "Title Block". Same brand (cream/navy/gold), same copy, same hard rules as
// A/B — but the GRID is different, not the palette. No two-column text-left/visual-right
// split, no floating card. Single asymmetric column, full-bleed drafting-sheet register marks,
// and the proof (the AI answer) is pinned into the corner as an annotation on a leader line,
// like a note on an engineering drawing, rather than sitting beside the text as an equal-weight
// second column.
export default function PreviewC() {
  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto bg-cream text-navy">
      <div className="border-b border-navy/10 bg-cream px-6 py-3 text-center text-xs font-semibold text-navy/50">
        PREVIEW C — Title Block: one asymmetric column, proof pinned to the corner (structure changed, not palette)
      </div>

      <div className="relative mx-auto min-h-[900px] max-w-6xl px-6 pb-28 pt-16 lg:pt-24">
        <CornerMarks className="text-navy/20" inset={4} />
        <ArcSweep
          className="pointer-events-none absolute bottom-0 right-0 h-[78%] w-auto max-w-none text-gold"
          strokeOpacity={0.2}
        />

        <SheetLabel index="01" className="max-w-xl">
          For nonprofits raising $1M–$30M a year
        </SheetLabel>

        <h1 className="mt-8 max-w-3xl font-display text-[2.5rem] font-semibold leading-[1.05] sm:text-[3.2rem] lg:text-[3.9rem]">
          Somebody just asked an AI which nonprofit to support.
        </h1>
        <p className="mt-1 max-w-3xl font-display text-[2rem] font-semibold leading-[1.1] text-gold-text sm:text-[2.5rem] lg:text-[3rem]">
          Did it say your name?
        </p>

        <div className="mt-10 flex flex-col gap-7 lg:max-w-xl">
          <p className="text-[17px] leading-8 text-navy/75">
            Kind Logic Group helps nonprofits get found in AI answers and write an AI policy the
            board will actually sign.
          </p>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href={FREE_REPORT_URL} size="lg">
              See your score
            </ButtonLink>
            <ButtonLink href={BOOKING_URL} variant="secondary" size="lg">
              Book a call
            </ButtonLink>
          </div>
        </div>

        {/* The proof: not a second column, an annotation pinned to the sheet's corner. */}
        <div className="relative mt-20 max-w-sm lg:absolute lg:bottom-2 lg:right-4 lg:mt-0 lg:w-[360px]">
          <div className="mb-3 flex items-center gap-2">
            <Leader className="h-8 text-navy/45" />
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-navy/45">
              Exhibit A — live AI answer
            </p>
          </div>
          <div className="rounded-sm border border-navy/15 bg-white shadow-[0_1px_0_rgba(0,0,0,0.04)]">
            <div className="flex items-center gap-2 border-b border-navy/10 px-4 py-2.5">
              <span className="h-2 w-2 rounded-full bg-navy/15" />
              <span className="h-2 w-2 rounded-full bg-navy/15" />
              <span className="h-2 w-2 rounded-full bg-navy/15" />
              <p className="ml-1.5 truncate text-[12px] text-navy/45">
                &ldquo;best nonprofits helping kids read near Fort Collins&rdquo;
              </p>
            </div>
            <div className="px-4 py-5">
              <p className="text-[10.5px] font-semibold uppercase tracking-[0.12em] text-gold-text">
                AI Overview
              </p>
              <ol className="mt-2.5 space-y-2 text-[14px] leading-6 text-navy">
                <li className="flex gap-2.5">
                  <span className="text-navy/35">1</span> Second Story Literacy Project
                </li>
                <li className="flex gap-2.5">
                  <span className="text-navy/35">2</span> Bright Beginnings Reads
                </li>
                <li className="flex gap-2.5">
                  <span className="text-navy/35">3</span> ChapterOne Youth Foundation
                </li>
              </ol>
              <div className="mt-3.5 rounded-sm border border-dashed border-gold-deep/60 bg-gold/10 px-3.5 py-2.5">
                <p className="text-[12.5px] text-navy/65">Your organization — not mentioned.</p>
              </div>
            </div>
          </div>
          <p className="mt-3 max-w-[300px] text-[12.5px] leading-5 text-navy/45">
            Three names. If yours isn&rsquo;t one of them, the donor never scrolls.
          </p>
        </div>
      </div>

      <TickRule className="text-navy/25" />
    </div>
  );
}
