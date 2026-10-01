# DECISIONS.md — KLG homepage v1 build

Judgment calls made during the unattended build on September 29, 2026, for Mark to review and
override. Nothing here is precious; every item says where to change it.

## Structure and navigation

1. **Five pages, not one.** Home, How we help (`/services`), About, Pricing, Contact. The brief
   allowed About to be a homepage section; it is its own page because the AEO readiness
   checklist scores a *dedicated* About page for mission and service area, and because the
   nav needed a real destination. Every page still carries the mission line in the footer.
2. **"How we help" instead of "Services" in the nav.** Plainer, matches the voice rules. The
   URL is still `/services` so it stays obvious in analytics and links.
3. **Service ladder order kept exactly as briefed:** 01 AI visibility → 02 AI policy course →
   03 AEO reinforced as "the monthly habit" → 04 AI assistants "coming soon." Step 03 is
   framed as the retainer/continuity argument ("an audit is a photograph, AI answers are a
   weather system") rather than a second product, so it doesn't read as a duplicate of 01.
4. **A 404 page exists** with a dry line and two CTAs. Low cost, and a marketing site with a
   default Next 404 looks unfinished.

## Copy

5. **Hero headline:** "Somebody just asked an AI which nonprofit to support. Did it say your
   name?" Problem-first, opens on a person, one dry beat. Alternatives considered and
   rejected for sounding like a tech company: "AI visibility for nonprofits," "Get found in
   AI answers."
6. **The "donor dollars → mission, not overhead" frame** is the spine: hero sub-line, About
   page headline ("More of every donor dollar should reach the mission. That's the whole
   company."), the AI-assistants blurb, and the footer.
7. **Navy background carried through lightly.** Only two mentions: "Twenty-two years in the
   Navy teaches you that the best plan is the one the crew can run at 2 a.m." (homepage
   Why-KLG list) and the About story. Never the headline, never "I'm a veteran" as a hook.
8. **VCP description on the About page:** "co-founded Veterans Community Project, a nonprofit
   serving veterans that has grown to roughly seventy people across six locations in five
   states." Deliberately generic on what VCP does. **Mark should confirm the phrasing and
   numbers** are what he wants public (`src/app/about/page.tsx`).
9. **Stats used, where, and why (all from the brief's verified list, cited inline with
   links; source data in `src/lib/stats.ts`):**
   - 98% / 61% / 22% (NTEN & Bridgespan) — hero stat card, and the About story.
   - ~37% fewer clicks when an AI Overview appears (Seer) — "What changed" section and the
     AI-visibility block on How we help. This is the direct hook to the $579 product.
   - 53% shadow AI (NTEN & Bridgespan) — friction card on the homepage and the policy-course
     block. The risk framing for the course.
   - 7% strategic impact vs. 92% adoption (Virtuous) — Why-KLG section, "a tool is not a
     strategy."
   - Gates Foundation exclusion language — Why-now section and policy-course block.
   - RAND 80%+ failure rate — only in the AI-assistants block, to explain why it isn't for
     sale yet. Not used elsewhere to avoid the preachy tone the brief warned about.
   - Not used: the 24% infrastructure stat (would have been a fourth number in a section
     that already had three).
10. **Claims about the free report were kept modest** because I couldn't verify the exact
    flow on the AEO site: "you can read it without talking to anyone first," "runs the same
    checks the monthly service does, once." No timing promise ("takes two minutes") was made.
    If the free report does something different, the lines are in `src/app/page.tsx`
    (hero and closing CTA) and `src/app/services/page.tsx`.
11. **"To-do list capped at five items, each with an owner and a time estimate"** appears in
    the AI-visibility description. That comes from the report rules in the project docs. If
    the product changes, update `src/app/services/page.tsx` and `src/app/pricing/page.tsx`.
12. **Contact page describes "what happens on the call"** including "we'll check live" what an
    AI says about the org. That is a promise about how Mark runs the call; edit if it's not
    how he wants to run it.

## Conversion and links

13. **Two differentiated CTAs throughout:** "See your AI visibility score" (gold, low
    friction, links to the AEO tool's free-report form) and "Book a 30-minute call"
    (secondary, higher intent). Variants: "See your score, free," "Get the free report,"
    "Talk it through first," "Ask about the course," "Get on the early list."
14. **Free report link:** `https://aeo-report-site.vercel.app/#get-report`. The brief named
    `aeo-report-site.vercel.app`; `#get-report` is the form anchor on that site's homepage.
    Note the memory/project docs say the *current* design lives on the `stitch-redesign`
    preview alias, not production. If the AEO site's production URL or anchor changes, set
    `NEXT_PUBLIC_AEO_TOOL_URL` or edit `src/lib/config.ts`.
15. **Book a call → Mark's existing Calendly:** `https://calendly.com/markbsolomon/30min`
    (his public "30 Minute Meeting" event, found via the Calendly connector). It is a
    generic personal event type from 2022 with a phone-call location. **Recommend creating a
    KLG-branded event type** (e.g. "Kind Logic Group intro call," video, with a couple of
    intake questions) and setting `NEXT_PUBLIC_BOOKING_URL`. The site says "30-minute call"
    in several places; if the event length changes, search for "30-minute."
16. **Contact email:** `hello@kindlogicgroup.com`, the same address the AEO tool site uses.
    Not verified as a live inbox. Override with `NEXT_PUBLIC_CONTACT_EMAIL`.
17. **AI assistants "early list" is a mailto link** with a pre-filled subject. No form, no
    backend, per the brief. Swap for a form URL when one exists.
18. **Site URL** defaults to `https://klg-homepage.vercel.app` (guess at the Vercel alias).
    Set `NEXT_PUBLIC_SITE_URL` to the real domain before go-live; it drives canonical URLs,
    sitemap, robots `Host:`, and JSON-LD `@id`s.

## Visual

19. **Palette and fonts copied verbatim** from aeo-report-site's `globals.css` (tokens and the
    Tailwind `@theme` block), Playfair Display + Plus Jakarta Sans via `next/font/google`.
20. **Hero treatment: CSS only.** Layered soft radial gradients (gold tint top-right, teal tint
    bottom-left, cream wash) plus a faint 48px drafting grid masked to the center. The grid is
    a nod to the compass/drafting-tool logo without redrawing it. No images, no WebGL, no
    canvas. The same backdrop class is reused on page intros and closing CTAs for continuity.
21. **Navy sections get a subtle dot texture** (same idea as aeo-report-site's halftone) so
    large dark panels don't read flat.
22. **Entrance motion:** a single IntersectionObserver adds `.is-visible` to `.reveal`
    elements as they scroll in (fade + 18px rise, staggered). Elements are only hidden when
    (a) an inline head script has marked the document as JS-capable and (b) the visitor
    doesn't prefer reduced motion. Crawlers, no-JS visitors, and reduced-motion users get a
    fully visible page. Verified on client-side navigation too.
23. **No testimonials, logos, or proof sections.** Designed around their absence with cited
    sector stats, the "our own homework" checklist on About, and specific process
    descriptions instead of social proof, the same approach as aeo-report-site.
24. **Card shapes are rounded-2xl/3xl with hairline vellum borders** and the gold-bordered
    card is reserved for the one priced offer. Coming-soon items use a dashed border and muted
    tint so they can't be mistaken for something purchasable.

## Logo

25. **The current logo is used as-is, two ways:** the full mark on the About page (trimmed,
    resized to 800px PNG in `public/brand/`), and a crop of the compass pivot as the nav
    mark (`public/brand/klg-mark.png`), favicon (`src/app/icon.png`) and Apple icon. The nav
    shows the crop in a small white circle beside a Playfair text wordmark. All swappable by
    replacing those files; nothing is animated or redrawn.
26. **Green-clash note, as requested.** The mark's deep green (roughly #2d5a48) sits next to the
    site's navy/gold/cream and it is noticeable but not ugly: green and navy are both cool
    and dark, so at nav size the mark reads as "dark on white" and the clash is minor. It is
    most visible on the About page where the full logo sits at 320px in a white card. Two
    cheap options when Mark revisits the logo: (a) recolor the green strokes to navy
    `#0f2038` and the small accents to gold `#d49a3d`, which would make it fully on-system, or
    (b) adopt the green as a third accent site-wide, which I did not do because the brief
    named the palette as fixed. No time was spent redesigning the logo.
27. **The favicon is the compass-pivot crop**, not the full circular logo, because the full
    logo is unreadable at 16–32px. If the logo changes, regenerate `icon.png` and
    `apple-icon.png` (the sharp script used is trivial: trim, crop, resize).

## AEO/SEO readiness checklist (the nine points)

28. 1 AI search crawlers: `robots.ts` explicitly allows Googlebot, Google-Extended, Bingbot,
    OAI-SearchBot, ChatGPT-User, Claude-SearchBot, Claude-User, PerplexityBot,
    Perplexity-User, Meta-WebIndexer. Nothing is disallowed anywhere.
29. 2 One canonical URL: every page sets `alternates.canonical`; `metadataBase` is the site
    URL; JSON-LD, sitemap and canonical all use the same no-trailing-slash form for the home.
30. 3 Homepage title: "AI consulting for nonprofits: get found in AI answers, set an AI policy
    your board will sign." Does not start with "Home," no "home page." Subpages use the
    template "Page · Kind Logic Group."
31. 4 Freshness: one constant, `LAST_UPDATED` in `src/lib/config.ts`, feeds a visible "Last
    updated" line (footer of every page, plus About, Services and Pricing), the
    `article:modified_time` meta tag, JSON-LD `dateModified`, and sitemap `lastmod`. **Bump it
    when copy changes.** Next renders the tag as `<meta name="article:modified_time">` (name,
    not property); the readiness regex matches either.
32. 5 About page states mission and service area in plain crawlable text, first paragraph.
33. 6 Location visible: "Longmont, Colorado" is in the footer of every page, the About hero,
    the Contact page, and the JSON-LD address.
34. 7 Nonprofit status: **N/A.** KLG is a for-profit consultancy. The About page's "our own
    homework" list shows it as not applicable rather than hiding it.
35. 8 AI training crawlers: GPTBot, ClaudeBot, CCBot, Meta-ExternalAgent, Applebot-Extended
    are explicitly allowed. Framed on the About page as a values choice.
36. 9 JSON-LD: one `Organization` (with `@id`, logo, address, areaServed, contactPoint), one
    `WebSite`, and a per-page `WebPage`/`AboutPage`/`ContactPage` node referencing the
    Organization. Parsed and checked: zero errors, no Person node anywhere. Validate again
    with https://validator.schema.org once deployed (the URLs will change with the domain).
37. Also done: semantic landmarks (one `h1` per page, `header`/`nav`/`main`/`footer`,
    `article`/`figure`/`ol` where they mean something), meta description and OpenGraph/Twitter
    tags on every page, a generated 1200×630 OG image, `sitemap.xml`, skip link, focus styles,
    `aria-current` on nav, `hidden` mobile menu with `aria-expanded`/`aria-controls`.
38. Performance: all routes prerender as static HTML; the only client components are the
    header (mobile menu) and the reveal observer; `next/image` for the two logo images; no
    third-party scripts, no analytics (add when Mark picks one), no runtime data fetching.

## Stack

39. Next.js 16.3.7 (current stable via `create-next-app`), React 19.2, Tailwind 4, TypeScript,
    ESLint 9 with `eslint-config-next`. Turbopack is the default build. `npm run build` and
    `npm run lint` both pass clean.
40. The OG image uses Satori's default sans rather than Playfair because loading a Google
    Font at build time is one more network dependency. Bundling a Playfair TTF into the repo
    would fix it in ten minutes if the card matters.
41. `AGENTS.md`/`CLAUDE.md` from `create-next-app` are committed (they point future agents at
    the bundled Next docs, which were followed here: `preload` instead of the deprecated
    `priority` on images, `LayoutProps` global type, metadata file conventions).

## Not done, on purpose

- No pricing invented for the policy course or AI assistants.
- No testimonials, client logos, case studies, or made-up numbers.
- No form backend, CRM hook, or analytics.
- No 3D/WebGL.
- aeo-report-site, aeo-client-dashboard and klg-reports were read for tokens only; nothing
  in them was changed.
- `main` in this repo is untouched; all work is on `build/homepage-v1`.
