import type { MetadataRoute } from "next";
import { LAST_UPDATED, SITE_URL } from "@/lib/config";

const lastModified = new Date(`${LAST_UPDATED}T12:00:00-06:00`);

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, lastModified, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/services`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/pricing`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/about`, lastModified, changeFrequency: "yearly", priority: 0.7 },
    { url: `${SITE_URL}/contact`, lastModified, changeFrequency: "yearly", priority: 0.6 },
  ];
}
