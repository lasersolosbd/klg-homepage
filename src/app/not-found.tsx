import { ButtonLink } from "@/components/Buttons";
import { Container } from "@/components/Section";
import { FREE_REPORT_URL } from "@/lib/config";

export default function NotFound() {
  return (
    <section className="hero-backdrop">
      <Container className="py-24 text-center sm:py-32">
        <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-gold-text">404</p>
        <h1 className="mt-3 text-4xl font-semibold sm:text-5xl">That page isn&rsquo;t here.</h1>
        <p className="mx-auto mt-4 max-w-md text-lg leading-8 text-slate">
          Which is a little embarrassing for a firm that helps people get found. The rest of the site works.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink href="/">Back to the homepage</ButtonLink>
          <ButtonLink href={FREE_REPORT_URL} variant="secondary">
            See your AI visibility score
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
