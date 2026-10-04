import type { ReactNode } from "react";
import { SheetLabel, TickRule } from "@/components/Drafting";
import { LastUpdated } from "@/components/LastUpdated";
import { Container } from "@/components/Section";

// Shared shell for /terms and /privacy: same drafting-sheet register marks as the rest of the
// site, but a plain-prose reading column since these pages exist to be read carefully, not
// skimmed.
export function LegalPage({ index, title, children }: { index: string; title: string; children: ReactNode }) {
  return (
    <section className="pb-24 pt-16 sm:pt-20 lg:pt-24">
      <Container>
        <SheetLabel index={index}>Legal</SheetLabel>
        <h1 className="mt-8 max-w-2xl text-[40px] font-semibold leading-[1.05] sm:text-[52px]">{title}</h1>
        <LastUpdated className="mt-4" />
        <TickRule className="mt-8 text-navy/25" />
        <div
          className="mt-10 max-w-[760px] space-y-5 text-[16px] leading-7 text-ink
            [&_a]:font-semibold [&_a]:text-navy [&_a]:underline [&_a]:decoration-gold [&_a]:underline-offset-4
            [&_h2]:mt-10 [&_h2]:font-display [&_h2]:text-[26px] [&_h2]:font-semibold [&_h2]:text-navy
            [&_li]:leading-7 [&_li>strong]:text-navy [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6"
        >
          {children}
        </div>
      </Container>
    </section>
  );
}
