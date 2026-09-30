import { Crosshair, Dimension } from "@/components/Drafting";
import { FREE_REPORT_URL, BOOKING_URL } from "@/lib/config";

export const metadata = { robots: { index: false, follow: false } };

// PREVIEW D — "Reversed hierarchy". Same brand, same copy, same hard rules — but the visual
// hierarchy is inverted: the proof (the AI answer) is the dominant hero element at near-full
// width, and the headline is demoted to a single-line caption above it. No headline-leads,
// visual-supports split at all; no separate CTA row — the two actions live in the panel's own
// footer, the way a real product screen would present them. This is a different reading order
// from A/B/C, not a different palette.
export default function PreviewD() {
  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto bg-navy text-white">
      <div className="border-b border-white/10 bg-navy px-6 py-3 text-center text-xs font-semibold text-white/50">
        PREVIEW D — Reversed hierarchy: the AI answer is the hero, the headline is a caption (structure changed, not palette)
      </div>

      <div className="mx-auto flex min-h-[900px] max-w-4xl flex-col items-center px-6 py-16 lg:py-24">
        <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-white/45">
          <Crosshair className="text-gold" />
          For nonprofits raising $1M–$30M a year
        </p>

        <Dimension className="mt-8 w-full max-w-2xl text-white/50" align="center">
          <span className="text-[13px] normal-case tracking-normal text-white/85 sm:text-[15px]">
            Somebody just asked an AI which nonprofit to support.{" "}
            <span className="text-gold">Did it say your name?</span>
          </span>
        </Dimension>

        {/* The proof is the hero: near-full-width, dominant, not a card beside text. */}
        <div className="mt-10 w-full overflow-hidden rounded-md border border-white/15 bg-[#0a1626] shadow-2xl">
          <div className="flex items-center gap-2 border-b border-white/10 px-5 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
            <p className="ml-2 truncate text-[13px] text-white/50">
              &ldquo;best nonprofits helping kids read near Fort Collins&rdquo;
            </p>
          </div>
          <div className="px-6 py-8 sm:px-10 sm:py-10">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-gold">AI Overview</p>
            <ol className="mt-4 space-y-3.5 text-[16px] leading-6 text-white/90 sm:text-[17px]">
              <li className="flex gap-3">
                <span className="text-white/35">1</span> Second Story Literacy Project
              </li>
              <li className="flex gap-3">
                <span className="text-white/35">2</span> Bright Beginnings Reads
              </li>
              <li className="flex gap-3">
                <span className="text-white/35">3</span> ChapterOne Youth Foundation
              </li>
            </ol>
            <div className="mt-5 rounded-sm border border-dashed border-gold/50 bg-gold/5 px-4 py-3">
              <p className="text-[13px] text-white/60">Your organization — not mentioned.</p>
            </div>
          </div>
          {/* The CTAs live in the panel's own footer, not a separate marketing row. */}
          <div className="flex flex-col gap-px border-t border-white/10 bg-white/[0.03] sm:flex-row">
            <a
              href={FREE_REPORT_URL}
              target="_blank"
              rel="noopener"
              className="flex flex-1 items-center justify-center gap-2 px-6 py-4 text-[14px] font-bold text-gold transition-colors hover:bg-white/5"
            >
              See your score
            </a>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener"
              className="flex flex-1 items-center justify-center gap-2 border-t border-white/10 px-6 py-4 text-[14px] font-bold text-white/85 transition-colors hover:bg-white/5 sm:border-l sm:border-t-0"
            >
              Book a call
            </a>
          </div>
        </div>

        <p className="mt-5 max-w-md text-center text-[13px] leading-5 text-white/45">
          Three names. If yours isn&rsquo;t one of them, the donor never scrolls. Kind Logic Group
          helps nonprofits get found in AI answers and write an AI policy the board will actually
          sign.
        </p>
      </div>
    </div>
  );
}
