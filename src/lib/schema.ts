import {
  AUDIENCE,
  BRAND_NAME,
  BRAND_TAGLINE,
  CONTACT_EMAIL,
  HOME_CITY,
  HOME_STATE,
  LAST_UPDATED,
  SITE_URL,
} from "@/lib/config";

// One Organization node, referenced by @id from every page's WebPage node so crawlers see a
// single entity (not a Person) with a stable identifier.
export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: BRAND_NAME,
    alternateName: "KLG",
    slogan: BRAND_TAGLINE,
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/brand/klg-logo.png`,
      width: 800,
      height: 800,
    },
    image: `${SITE_URL}/brand/klg-logo.png`,
    description: `Consulting firm that helps ${AUDIENCE} use AI well: AI-answer visibility, AI use policy, and (soon) AI assistants for staff.`,
    email: CONTACT_EMAIL,
    address: {
      "@type": "PostalAddress",
      addressLocality: HOME_CITY,
      addressRegion: "CO",
      addressCountry: "US",
    },
    areaServed: [
      { "@type": "Place", name: `Front Range, ${HOME_STATE}` },
      { "@type": "Country", name: "United States" },
    ],
    knowsAbout: [
      "Answer engine optimization for nonprofits",
      "AI visibility in ChatGPT, Claude, Gemini, Perplexity and Google AI Mode",
      "Nonprofit AI use policy and governance",
      "AI automation for nonprofit operations",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: CONTACT_EMAIL,
      availableLanguage: "English",
    },
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: BRAND_NAME,
    publisher: { "@id": ORG_ID },
    inLanguage: "en-US",
  };
}

export function webPageSchema(input: { path: string; name: string; description: string; type?: string }) {
  const url = input.path === "/" ? SITE_URL : `${SITE_URL}${input.path}`;
  return {
    "@context": "https://schema.org",
    "@type": input.type ?? "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: input.name,
    description: input.description,
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
    dateModified: LAST_UPDATED,
    inLanguage: "en-US",
  };
}
