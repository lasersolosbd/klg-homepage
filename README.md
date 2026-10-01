# Kind Logic Group — company homepage

The public site for Kind Logic Group (KLG), an AI consulting firm for nonprofits raising
$1M–$30M a year. This is the front door to the firm; the AEO visibility tool lives in a
separate repo (`aeo-report-site`) and this site links out to it.

Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · deployed on Vercel.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build; must pass before merging
npm run lint
```

## Where things live

| What | Where |
|---|---|
| Site-wide constants (URLs, email, price, last-updated date, service area) | `src/lib/config.ts` |
| Cited statistics used in copy | `src/lib/stats.ts` |
| JSON-LD (Organization, WebSite, WebPage) | `src/lib/schema.ts`, rendered by `src/components/JsonLd.tsx` |
| Design tokens (palette, fonts, shadows) | `src/app/globals.css` — same values as aeo-report-site |
| Pages | `src/app/page.tsx` (home), `services/`, `about/`, `pricing/`, `contact/` |
| Header / footer / buttons / section helpers | `src/components/` |
| robots.txt, sitemap.xml, OG image, favicons | `src/app/robots.ts`, `sitemap.ts`, `opengraph-image.tsx`, `icon.png`, `apple-icon.png` |
| Logo files | `public/brand/` |
| Judgment calls made during the build | `DECISIONS.md` |

## Environment variables (all optional)

| Variable | Default | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://klg-homepage.vercel.app` | Canonical origin for metadata, sitemap, robots and JSON-LD. Set to the real domain before go-live. |
| `NEXT_PUBLIC_AEO_TOOL_URL` | `https://aeo-report-site.vercel.app` | The AEO tool site; the free-report CTA points at `<url>/#get-report`. |
| `NEXT_PUBLIC_BOOKING_URL` | Mark's Calendly 30-minute link | "Book a call" destination. |
| `NEXT_PUBLIC_CONTACT_EMAIL` | `hello@kindlogicgroup.com` | Contact address shown on the site. |

## Keeping the freshness signal honest

When page copy changes, bump `LAST_UPDATED` and `LAST_UPDATED_LABEL` in `src/lib/config.ts`.
That one change updates the visible "Last updated" line, `article:modified_time`, JSON-LD
`dateModified`, and the sitemap `lastmod`. The AEO readiness check expects a date within the
last 365 days.
