import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/LegalPage";
import { JsonLd } from "@/components/JsonLd";
import { AEO_TOOL_URL, BRAND_NAME, CONTACT_EMAIL } from "@/lib/config";
import { webPageSchema } from "@/lib/schema";

const DESCRIPTION = `How ${BRAND_NAME} collects, uses and protects your information, including text message (SMS) information.`;

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: DESCRIPTION,
  alternates: { canonical: "/privacy" },
  openGraph: { title: "Privacy Policy", description: DESCRIPTION, url: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <JsonLd data={webPageSchema({ path: "/privacy", name: "Privacy Policy", description: DESCRIPTION })} />
      <LegalPage index="T-02" title="Privacy Policy">
        <p>
          This policy explains what information {BRAND_NAME} (&ldquo;we,&rdquo; &ldquo;us&rdquo;)
          collects when you use this website, how we use it, and the choices you have. We keep it
          short and plain on purpose. Our separate AI visibility tool at{" "}
          <a href={AEO_TOOL_URL} target="_blank" rel="noopener">
            {AEO_TOOL_URL.replace(/^https?:\/\//, "")}
          </a>{" "}
          has its own privacy policy for the free report and tracking service; this one covers
          this site, including its contact form.
        </p>

        <h2>Information we collect</h2>
        <ul>
          <li>Your name, work email address and, if you choose to give it, your mobile phone number.</li>
          <li>Your organization&apos;s name, if you tell us.</li>
          <li>Whatever message you write us in the contact form.</li>
          <li>
            Your consent choices for text messages, including which boxes you checked and when.
          </li>
          <li>Basic technical information such as your browser type and pages visited.</li>
        </ul>

        <h2>How we use it</h2>
        <ul>
          <li>To respond to you and provide the service you asked for.</li>
          <li>To send text messages only for the purposes you agreed to (see below).</li>
          <li>To run, secure and improve this website and our services.</li>
        </ul>

        <h2>Text messages (SMS)</h2>
        <p>
          If you give us your mobile number and check a consent box on our contact form, we may
          text you as described on that form. Consent is optional and is not required to reach us.
          Message frequency varies. Message and data rates may apply. Reply STOP at any time to opt
          out or HELP for help. More detail is in our <Link href="/terms">Terms &amp; Conditions</Link>.
        </p>
        <p>
          <strong>
            No mobile information will be shared with third parties or affiliates for marketing or
            promotional purposes.
          </strong>{" "}
          Text messaging opt-in data and consent will not be shared with third parties for
          unrelated purposes. This does not include sharing with service providers that help us
          deliver messages or provide customer care, who may use the information only for those
          services.
        </p>

        <h2>Who else sees your information</h2>
        <p>
          We do not sell your personal information. We use service providers to run our website,
          our customer relationship system, and to send email and text messages. They may access
          your information only to do that work for us. We may also disclose information if the
          law requires it or to protect our rights and the safety of others.
        </p>

        <h2>How long we keep it</h2>
        <p>
          We keep your information for as long as needed to respond to you and meet legal
          obligations, then delete or anonymize it. You can ask us to delete it sooner.
        </p>

        <h2>Your choices</h2>
        <ul>
          <li>Reply STOP to any text to stop text messages.</li>
          <li>Use the unsubscribe link in any marketing email.</li>
          <li>
            Email us to see, correct or delete the information we hold about you. Depending on
            where you live, you may have additional rights under state privacy laws.
          </li>
        </ul>

        <h2>Security and children</h2>
        <p>
          We use reasonable safeguards to protect your information, but no system is perfectly
          secure. This service is for organizations and is not directed to children under 13.
        </p>

        <h2>Changes and contact</h2>
        <p>
          If we change this policy we will update the &ldquo;last updated&rdquo; date above.
          Questions? Email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
        </p>
      </LegalPage>
    </>
  );
}
