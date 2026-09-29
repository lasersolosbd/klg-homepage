// Site-wide constants. Everything a future editor is likely to change lives here.

export const BRAND_NAME = "Kind Logic Group";
export const BRAND_SHORT = "KLG";
export const BRAND_TAGLINE = "AI for mission-driven organizations";

// Public origin, used for canonical URLs, sitemap, robots and structured data.
// Set NEXT_PUBLIC_SITE_URL once the real domain is connected. Until then the Vercel
// production alias for this repo is assumed.
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://klg-homepage.vercel.app";

// The AEO visibility tool is a separate site. This homepage links to it; it never re-implements it.
export const AEO_TOOL_URL = process.env.NEXT_PUBLIC_AEO_TOOL_URL ?? "https://aeo-report-site.vercel.app";
export const FREE_REPORT_URL = `${AEO_TOOL_URL}/#get-report`;

// Where "Book a call" goes. Mark's existing public Calendly link is used until a KLG-specific
// event type exists; override with NEXT_PUBLIC_BOOKING_URL.
export const BOOKING_URL =
  process.env.NEXT_PUBLIC_BOOKING_URL ?? "https://calendly.com/markbsolomon/30min";

// Public contact address. Same inbox the AEO tool site uses; override before go-live if needed.
export const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hello@kindlogicgroup.com";

// The one real price on the site. Everything else is "contact us" until Mark sets numbers.
export const AEO_PRICE_PER_MONTH = "$579";

// Freshness signal. Bump this whenever page copy changes; it feeds the visible "Last updated"
// line, the article:modified_time meta tag and dateModified in JSON-LD (all three are what the
// AEO readiness check reads).
export const LAST_UPDATED = "2026-09-29";
export const LAST_UPDATED_LABEL = "September 29, 2026";

// Location and service area, written in plain text on the site (readiness check: location visible).
export const HOME_CITY = "Longmont";
export const HOME_STATE = "Colorado";
export const SERVICE_AREA = "Colorado's Front Range";
export const SERVICE_AREA_LONG =
  "Based in Longmont, Colorado. Working with nonprofits along the Front Range in person and across the United States remotely.";
// Longmont's coordinates, shown in the footer as a drafting-sheet flourish (decorative, aria-hidden).
export const HOME_COORDINATES = "40.17° N, 105.10° W";

// Who the firm is for, said the same way everywhere.
export const AUDIENCE = "nonprofits raising $1M–$30M a year";

export const AI_ENGINES = ["ChatGPT", "Claude", "Gemini", "Grok", "Perplexity", "Google AI Mode"] as const;

export const NAV_LINKS = [
  { href: "/services", label: "How we help" },
  { href: "/about", label: "About" },
  { href: "/pricing", label: "Pricing" },
  { href: "/contact", label: "Contact" },
] as const;
