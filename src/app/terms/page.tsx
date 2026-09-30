import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/LegalPage";
import { JsonLd } from "@/components/JsonLd";
import { AEO_TOOL_URL, BRAND_NAME, CONTACT_EMAIL } from "@/lib/config";
import { webPageSchema } from "@/lib/schema";

const DESCRIPTION = `Terms of use for ${BRAND_NAME}, including the terms of our text message (SMS) program.`;

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: DESCRIPTION,
  alternates: { canonical: "/terms" },
  openGraph: { title: "Terms & Conditions", description: DESCRIPTION, url: "/terms" },
};

export default function TermsPage() {
  return (
    <>
      <JsonLd data={webPageSchema({ path: "/terms", name: "Terms & Conditions", description: DESCRIPTION })} />
      <LegalPage index="T-01" title="Terms & Conditions">
        <p>
          By using this website or contacting {BRAND_NAME} (&ldquo;we,&rdquo; &ldquo;us&rdquo;)
          through it, you agree to these terms. Please also read our{" "}
          <Link href="/privacy">Privacy Policy</Link>.
        </p>

        <h2>Our services</h2>
        <p>
          We provide AI consulting for nonprofits: AI-answer visibility reporting and tracking, AI
          use policy development, and, as they become available, AI assistants for staff. Our free
          AI visibility report and its ongoing tracking service are run through our AI visibility
          tool at{" "}
          <a href={AEO_TOOL_URL} target="_blank" rel="noopener">
            {AEO_TOOL_URL.replace(/^https?:\/\//, "")}
          </a>
          , which has its own terms and privacy policy governing that report. Anything you submit
          directly on this site — a contact form, a call request — is covered by this policy
          instead.
        </p>
        <p>
          AI answers change often and can be wrong, so any report, audit or recommendation we give
          is informational. We do not guarantee any particular result, ranking or mention by any AI
          assistant.
        </p>

        <h2>Your responsibilities</h2>
        <p>
          Give us accurate information and only request services or reports for organizations you
          are authorized to represent. Do not misuse the site or try to disrupt it.
        </p>

        <h2>Text message (SMS) program terms</h2>
        <ul>
          <li>
            <strong>Program:</strong> {BRAND_NAME} sends text messages to people who opt in on our
            contact form. Depending on the boxes you check, messages are either (1) service
            messages about a request you made, such as scheduling a call, or (2) occasional
            promotional messages about our AI consulting services for nonprofits.
          </li>
          <li>
            <strong>Consent is optional.</strong> You do not have to agree to receive texts to
            reach us, and the two consent options are separate from each other.
          </li>
          <li>
            <strong>Frequency:</strong> Message frequency varies.
          </li>
          <li>
            <strong>Cost:</strong> Message and data rates may apply.
          </li>
          <li>
            <strong>Opt out:</strong> Reply STOP at any time to unsubscribe. We will confirm and
            send no further messages.
          </li>
          <li>
            <strong>Help:</strong> Reply HELP for help, or contact us at{" "}
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
          </li>
          <li>
            <strong>Resubscribe:</strong> If you opted out, you can rejoin by submitting our form
            and checking a consent box again, or by replying START.
          </li>
          <li>
            <strong>Carriers:</strong> Carriers are not liable for delayed or undelivered messages.
          </li>
          <li>
            <strong>Privacy:</strong> See our <Link href="/privacy">Privacy Policy</Link>. We do not
            share mobile information with third parties or affiliates for marketing or promotional
            purposes.
          </li>
          <li>
            <strong>Compliance:</strong> This program follows applicable messaging laws and carrier
            requirements.
          </li>
        </ul>

        <h2>Disclaimers and liability</h2>
        <p>
          The site and any reports, audits or recommendations are provided &ldquo;as is.&rdquo; To
          the fullest extent the law allows, we are not liable for indirect or consequential
          damages arising from your use of the site or our services, and our total liability is
          limited to the amount you paid us in the prior twelve months.
        </p>

        <h2>Changes and contact</h2>
        <p>
          We may update these terms and will change the &ldquo;last updated&rdquo; date above when
          we do. Questions? Email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
        </p>
      </LegalPage>
    </>
  );
}
