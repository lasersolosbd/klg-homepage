import { Space_Grotesk } from "next/font/google";
import { ButtonLink } from "@/components/Buttons";
import { FREE_REPORT_URL, BOOKING_URL } from "@/lib/config";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["500", "600", "700"] });

export const metadata = { robots: { index: false, follow: false } };

// PREVIEW B — same copy, same layout logic, same hard rules as Preview A, but the palette and
// type system are deliberately NOT the KLG brand: cool paper-white instead of warm cream, a
// geometric sans display (Space Grotesk) instead of Playfair, near-black ink instead of navy,
// one saturated cobalt accent instead of gold. Tests whether breaking the cream+serif+single-
// accent combination (flagged by both new skills as the #1 "AI-generated" tell) reads as more
// different than structural discipline alone. Full-screen takeover, same reason as Preview A.
export default function PreviewB() {
  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto bg-[#f6f6f4] text-[#14171c]">
      <div className="border-b border-black/10 bg-[#f6f6f4] px-6 py-3 text-center text-xs font-semibold text-black/40">
        PREVIEW B — off-brand (paper white / near-black / cobalt, Space Grotesk), same copy &amp; rules
      </div>

      <div className="mx-auto grid max-w-6xl items-center gap-16 px-6 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:py-24">
        <div className={spaceGrotesk.className}>
          <p className="font-sans text-[13px] font-medium text-[#2f5fff]">
            For nonprofits raising $1M–$30M a year
          </p>

          <h1 className="mt-5 max-w-[15ch] text-4xl font-semibold leading-[1.08] text-[#14171c] sm:text-5xl lg:text-[3.4rem]">
            Somebody just asked an AI which nonprofit to support.{" "}
            <span className="text-[#2f5fff]">Did it say your name?</span>
          </h1>

          <p className="mt-6 max-w-md font-sans text-[17px] leading-8 text-[#14171c]/70">
            Kind Logic Group helps nonprofits get found in AI answers and write an AI policy the
            board will actually sign.
          </p>

          <div className="mt-8 flex flex-wrap gap-3 font-sans">
            <a
              href={FREE_REPORT_URL}
              className="inline-flex h-13 items-center justify-center rounded-[3px] bg-[#14171c] px-6 text-[15px] font-bold text-white transition-colors hover:bg-[#2f5fff]"
            >
              See your score
            </a>
            <a
              href={BOOKING_URL}
              className="inline-flex h-13 items-center justify-center rounded-[3px] border border-black/20 px-6 text-[15px] font-bold text-[#14171c] transition-colors hover:border-black/40"
            >
              Book a call
            </a>
          </div>
        </div>

        {/* Same hero visual concept as Preview A, restyled: crisp white card, hairline border,
            one cobalt accent, no gradient, no soft shadow-everywhere. */}
        <div className="rounded-lg border border-black/10 bg-white">
          <div className="flex items-center gap-2 border-b border-black/10 px-5 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-black/10" />
            <span className="h-2.5 w-2.5 rounded-full bg-black/10" />
            <span className="h-2.5 w-2.5 rounded-full bg-black/10" />
            <p className="ml-2 truncate font-sans text-[13px] text-black/45">
              &ldquo;best nonprofits helping kids read near Fort Collins&rdquo;
            </p>
          </div>
          <div className="px-5 py-6 font-sans">
            <p className="text-[11px] font-semibold text-[#2f5fff]">AI Overview</p>
            <ol className="mt-3 space-y-3 text-[15px] leading-6 text-[#14171c]">
              <li className="flex gap-3">
                <span className="text-black/30">1</span> Second Story Literacy Project
              </li>
              <li className="flex gap-3">
                <span className="text-black/30">2</span> Bright Beginnings Reads
              </li>
              <li className="flex gap-3">
                <span className="text-black/30">3</span> ChapterOne Youth Foundation
              </li>
            </ol>
            <div className="mt-4 rounded-md border border-dashed border-[#2f5fff]/40 bg-[#2f5fff]/5 px-4 py-3">
              <p className="text-[13px] text-black/55">Your organization — not mentioned.</p>
            </div>
            <p className="mt-4 text-[13px] leading-5 text-black/40">
              Three names. If yours isn&rsquo;t one of them, the donor never scrolls.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
