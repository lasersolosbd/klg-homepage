import { ButtonLink } from "@/components/Buttons";
import { ArcSweep, SheetLabel } from "@/components/Drafting";
import { Container } from "@/components/Section";
import { FREE_REPORT_URL } from "@/lib/config";

export default function NotFound() {
  return (
    <section className="relative overflow-hidden">
      <ArcSweep className="pointer-events-none absolute -bottom-16 -right-16 h-[120%] w-auto max-w-none text-navy" strokeOpacity={0.14} />
      <Container className="relative py-24 sm:py-32">
        <SheetLabel index="404">Not on this sheet</SheetLabel>
        <h1 className="mt-8 max-w-[14ch] text-[44px] font-semibold leading-[1.0] sm:text-[60px]">That page isn&rsquo;t here.</h1>
        <p className="mt-5 max-w-md text-lg leading-8 text-slate">
          Which is a little embarrassing for a firm that helps people get found. The rest of the site works.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/">Back to the homepage</ButtonLink>
          <ButtonLink href={FREE_REPORT_URL} variant="secondary">
            See your AI visibility score
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
