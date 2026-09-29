import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/config";

// Everything is public. AI *search* crawlers (the first group) must be allowed for the site to
// appear in AI answers at all. AI *training* crawlers (the second group) are allowed as a values
// choice: a firm that sells AI visibility would like AI models to know it exists.
// Each crawler gets its own explicit group because a crawler that matches a named group ignores
// the "*" group, and some readiness checks look for the name.
const AI_SEARCH_CRAWLERS = [
  "Googlebot",
  "Google-Extended",
  "Bingbot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "Meta-WebIndexer",
];
const AI_TRAINING_CRAWLERS = ["GPTBot", "ClaudeBot", "CCBot", "Meta-ExternalAgent", "Applebot-Extended"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      ...[...AI_SEARCH_CRAWLERS, ...AI_TRAINING_CRAWLERS].map((userAgent) => ({ userAgent, allow: "/" })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
