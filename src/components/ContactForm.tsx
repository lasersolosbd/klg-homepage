"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { CONTACT_FORM_URL } from "@/lib/config";

type Status = "idle" | "submitting" | "success" | "error";

const inputCls =
  "mt-1.5 w-full rounded-[3px] border border-navy/25 bg-white px-3.5 py-2.5 text-[15px] text-ink placeholder:text-slate/60 outline-none transition-colors focus:border-navy";
const labelCls = "text-[13px] font-semibold text-navy";

// The main-page and /contact contact form. Two independent A2P-compliant SMS consent checkboxes
// (service vs. marketing), phone optional unless a box is checked, disclaimers linking to the
// real /privacy and /terms pages. Submits to the "KLG Homepage Contact Form" n8n workflow, which
// upserts the contact in GHL and tags it by which box (if any) was checked.
export function ContactForm({ className = "" }: { className?: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [smsService, setSmsService] = useState(false);
  const [smsMarketing, setSmsMarketing] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const form = e.currentTarget;
    const data = new FormData(form);
    const phone = String(data.get("phone") ?? "").trim();

    if ((smsService || smsMarketing) && !phone) {
      setError("Add a phone number to receive text messages, or leave both boxes unchecked.");
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch(CONTACT_FORM_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: String(data.get("name") ?? "").trim(),
          email: String(data.get("email") ?? "").trim(),
          organization: String(data.get("organization") ?? "").trim(),
          phone,
          message: String(data.get("message") ?? "").trim(),
          sms_service: smsService,
          sms_marketing: smsMarketing,
        }),
      });
      if (!res.ok) throw new Error(`Request failed (${res.status})`);
      setStatus("success");
      form.reset();
      setSmsService(false);
      setSmsMarketing(false);
    } catch {
      setStatus("error");
      setError("Something went wrong sending that. Please try again, or email us directly.");
    }
  }

  if (status === "success") {
    return (
      <div className={`rounded-[3px] border border-navy/15 bg-white p-8 text-center ${className}`}>
        <p className="font-display text-xl font-semibold text-navy">Got it — thank you.</p>
        <p className="mt-2 text-[15px] leading-7 text-slate">
          We read every message ourselves. Expect a reply within one business day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={className} noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className={labelCls}>Name</span>
          <input type="text" name="name" required autoComplete="name" className={inputCls} />
        </label>
        <label className="block">
          <span className={labelCls}>Work email</span>
          <input type="email" name="email" required autoComplete="email" className={inputCls} />
        </label>
        <label className="block">
          <span className={labelCls}>Organization</span>
          <input type="text" name="organization" autoComplete="organization" className={inputCls} />
        </label>
        <label className="block">
          <span className={labelCls}>
            Phone <span className="font-normal text-slate">(optional unless texting)</span>
          </span>
          <input type="tel" name="phone" autoComplete="tel" className={inputCls} />
        </label>
      </div>

      <label className="mt-5 block">
        <span className={labelCls}>What&rsquo;s on your mind?</span>
        <textarea name="message" rows={4} className={`${inputCls} resize-y`} />
      </label>

      <fieldset className="mt-6 space-y-3 border-t border-navy/15 pt-5">
        <legend className="sr-only">Optional text message consent</legend>
        <p className="text-[13px] font-semibold text-navy">
          Text messages are optional. You can reach us without them.
        </p>
        <label className="flex cursor-pointer items-start gap-3 text-[13px] leading-relaxed text-slate">
          <input
            type="checkbox"
            checked={smsService}
            onChange={(e) => setSmsService(e.target.checked)}
            className="mt-0.5 h-4.5 w-4.5 shrink-0 accent-navy"
          />
          <span>
            I agree to receive text messages from Kind Logic Group about my request, such as
            scheduling a call, at the mobile number above. Message frequency varies. Message and
            data rates may apply. Reply STOP to cancel, HELP for help.
          </span>
        </label>
        <label className="flex cursor-pointer items-start gap-3 text-[13px] leading-relaxed text-slate">
          <input
            type="checkbox"
            checked={smsMarketing}
            onChange={(e) => setSmsMarketing(e.target.checked)}
            className="mt-0.5 h-4.5 w-4.5 shrink-0 accent-navy"
          />
          <span>
            I agree to receive occasional promotional text messages from Kind Logic Group about AI
            consulting services for nonprofits at the mobile number above. Message frequency
            varies. Message and data rates may apply. Reply STOP to cancel, HELP for help.
          </span>
        </label>
        <p className="text-[12px] leading-relaxed text-slate">
          Consent is not a condition of working with us. See our{" "}
          <Link href="/privacy" className="font-semibold text-navy underline decoration-gold underline-offset-4">
            Privacy Policy
          </Link>{" "}
          and{" "}
          <Link href="/terms" className="font-semibold text-navy underline decoration-gold underline-offset-4">
            Terms &amp; Conditions
          </Link>
          . No mobile information is shared with third parties for marketing or promotional
          purposes.
        </p>
      </fieldset>

      {error && <p className="mt-4 text-[13px] font-semibold text-coral-text">{error}</p>}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-6 inline-flex h-12 items-center justify-center rounded-[3px] bg-gold px-7 text-[14px] font-bold tracking-[0.02em] text-navy transition-colors hover:bg-gold-deep disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
