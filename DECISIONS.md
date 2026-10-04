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

---

# v2 redesign — visual/structural rebuild (September 29, 2026)

Mark's review of v1: *"It looks like every other website you have created. There is no
creativity or uniqueness to this site."* This pass rebuilds the composition and gives KLG a
visual signature. Business content, voice, service ladder, stats, palette, fonts, and the
AEO/SEO technical work from v1 are carried forward unchanged unless noted. Branch
`redesign/homepage-v2` from `build/homepage-v1` at `cddba0f`; PR #1 (v1) is untouched.

## The signature: a drafting sheet

42. **The compass/protractor in the logo became the site's graphic system, not a mascot.**
    `src/components/Drafting.tsx` is a small kit of monochrome hairline pieces that take
    their colour from `currentColor` so they read on navy and on cream:
    - `SheetLabel` — the recurring section marker ("⌖ 02 — WHAT CHANGED ————") sitting on a
      hairline that runs to the container edge. This replaces the uppercase pill eyebrow on
      every section of every page. Subpages use sheet prefixes (S-01, A-02, P-01, C-01).
    - `Dimension` — a `|<—— label ——>|` dimension line. Every large statistic on the site is
      annotated with one instead of being boxed: 98% and 7% on the homepage, ~37% in the
      What-changed section, $579 on Pricing, 37%/53% on Services.
    - `Pivot` — the compass pivot (double ring, centre dot) used as the numbered node on plan
      rails and step lists.
    - `Crosshair` — registration mark on labels and column heads.
    - `TickRule` (CSS `.tick-rule`) — a ruler with minor/major ticks; it is the bottom edge of
      the header, the top edge of the footer, the top of the hero's engine strip, and the
      divider before Why-now, before the About story, and above the Pricing columns. Section
      boundaries are drawn with it instead of only with a colour swap.
    - `ArcSweep` — a quarter-circle protractor with graduated ticks and concentric arcs,
      sweeping from the bottom-right corner. Hero backdrop (gold on navy), closing CTA and
      About/404 (navy hairline on cream), and the OG image.
    - `Scale` — a labeled ruler with a highlighted range; Who-we-serve draws $1M–$30M as a
      literal measurement on a $0–$40M scale.
    - `CornerMarks` — four L-shaped registration brackets, used on the service "sheet," the
      overhanging 7% figure, the logo on About, and the readiness inspection list.
    - `.blueprint-grid` — 24px minor / 120px major grid, at an opacity that is actually
      visible (v1's was not), faded at the edges so it reads as a sheet, not wallpaper.
43. **Playfair numerals switched to lining figures** (`font-variant-numeric: lining-nums`
    on headings and `.font-display`). Playfair's default old-style 3/7/9 descend below the
    baseline and collided with the dimension lines under big numbers. This also makes "$1M
    to $30M" sit level in headings.

## Hero: which option and why

44. **Chosen: full-bleed navy sheet with the headline as the dominant graphic, plus the
    stat as an annotated figure.** Of the three options in the redesign brief, the diagonal
    split was rejected (it fights the drafting-line geometry) and a cream hero was rejected
    because the header/hero pair reads as one confident dark block, which is the
    tech-forward feel Mark pointed at. Composition: sheet label → h1 at
    `clamp(2.9rem, 7.6vw, 6.6rem)` spanning ~10 of 12 columns with "your name?" in italic
    gold → a 12-column row with subhead + CTAs on the left six and the 98% figure on the
    right five, sitting in front of the gold protractor arc. The 53%/22% sub-figures are
    hairline-ruled, not boxed. Copy is v1's; the corrected stat framing (98 / 53 shadow AI
    / 22 formal plan) is carried forward; "61% use it officially" does not appear anywhere.
45. **The "we check" engine list is a white ruler strip that straddles the hero/next-section
    boundary** (absolute, `translate-y-1/2`). This is the first band-break on the page; the
    section below carries extra top padding to receive it. On phones it wraps to two or
    three rows and the padding absorbs that.
46. **The header is navy on every page** with a tick rule along its bottom edge. On the
    homepage it merges into the hero; on cream subpages it is the sheet's title bar. The
    wordmark is now set the way the logo sets it (uppercase, tracked serif).

## Breaking the card-grid reflex

47. **Service ladder → a stair-stepped plan rail on an inset drafting sheet.** The four
    stages are an `<ol>` on a white sheet with a visible blueprint grid, corner marks, and
    a drawing-style title block ("Sheet 03 of 07 / Scale 1:1 / Drawn for nonprofits" —
    hidden on phones where it crowds). Each stage is a `Pivot` node on a vertical hairline;
    each successive stage is indented 64px further and connected by an elbow, so the plan
    literally steps down the sheet. Stage 01 is the gold node with the only solid button;
    02 is teal; 03 navy; 04 a dashed muted node (coming soon). A hairline outline numeral
    (`.outline-numeral`) sits in the empty right column at ≥1280px. The sheet bleeds to the
    left viewport edge (`.bleed-left`).
48. **Friction, audience and principles are hairline-divided columns or ledgers, not
    cards.** Friction: three columns divided by vertical hairlines with a crosshair label.
    Audience: three columns under a single top rule. Why-KLG principles and About's
    how-we-work: numbered ledgers with row hairlines on navy. Pricing's three offers: one
    top rule each in a different weight (gold solid / teal solid / dashed muted) instead of
    three matching bordered cards. Services' "what you get / who / first step" are ruled
    columns with two-digit indices instead of bordered boxes.
49. **The one remaining boxed treatment varies each time it appears:** the readiness
    "inspection sheet" on About (square, hairline border, corner marks, PASS / N/A stamps in
    a status column), the overhanging 7% figure (gold top rule only), and the ruler strip
    (tick rule on top). None use `rounded-2xl` + soft shadow.
50. **Asymmetric splits:** What-changed runs a 6/6 split where the ~37% figure bleeds to the
    right viewport edge (`.bleed-right`); Why-now is 5/6 with an offset start column; About's
    story is 4/7 with a gap column; Contact is a 6/6 split where the navy "what happens on
    the call" panel bleeds to the right viewport edge and, on phones, full width.
    `.bleed-*` use `calc(-1 * max(2rem, (100vw - 1240px)/2 + 2rem))`; `body` has
    `overflow-x: clip` so the scrollbar-width overshoot of `100vw` never causes a horizontal
    scrollbar (verified `scrollWidth === viewport` on every page at 1440 and 390).

## Breaking the alternating-band rhythm

51. **Homepage band order is now:** navy hero (with the ruler strip crossing its bottom
    edge) → a long cream stretch holding What-changed *and* the ladder sheet, separated by
    the sheet itself rather than a colour band → a navy Why-KLG panel whose 7% figure hangs
    over its bottom edge into the next section (the container has `pb-px` so the negative
    margin can't collapse through it) → cream Who-we-serve → Why-now, separated from it by
    a tick rule, not a background change → the closing CTA on cream-2 with the arc → navy
    footer. Two cream sections in a row, one navy panel with an overhang, and three light
    sections in a row with different dividers. Section heights vary deliberately.
52. **Section headings vary in scale** (`SectionHeading size`), and the hero and closing CTA
    run larger than the middle sections so the page has a start and an end.

## Copy adjustments (only where layout required)

53. The friction items gained "Friction 01/02/03" indices; the audience roles are set as
    tracked small caps; the "Not sure you fit?" box became a sentence with an inline link.
    The 37% figure's claim was split into label ("fewer clicks to any website") and
    supporting sentence so it could take a dimension line. About's three stats moved out of
    the prose into a ruled row of measurements, with the "close that gap" sentence kept
    after them. Pricing gained one clarifying line that stage 03 is the monthly part of
    stage 01, since the columns are numbered 01/02/04. Nothing else changed.
54. **Footer and Contact show Longmont's coordinates** (40.17° N, 105.10° W) as a drafting
    flourish, `aria-hidden`, next to the plain-text "Longmont, Colorado" the readiness
    check needs. Remove `HOME_COORDINATES` in `src/lib/config.ts` if it feels precious.

## Logo

55. On About the logo now sits directly on the cream sheet with `mix-blend-multiply` and
    registration corner marks ("Fig. 1 — the mark") instead of in a white rounded card. The
    green-clash note from v1 (item 26) still stands and is, if anything, slightly more
    visible now that the mark sits on the grid; nothing about the logo was redrawn.

## AEO/SEO — nothing regressed

56. Verified after the rebuild: `robots.txt` still allows all 15 named crawlers; every page
    still sets one canonical; the homepage `<title>` is unchanged; `LAST_UPDATED` still
    feeds the visible line, `article:modified_time`, JSON-LD `dateModified` and the
    sitemap; the About page still states mission and service area in its first paragraph;
    "Longmont, Colorado" is in the footer text of every page; nonprofit status remains N/A
    and is shown as such; Organization/WebSite/WebPage JSON-LD is unchanged. All routes
    still prerender as static HTML; the only client components are still the header and
    the reveal observer. Decorative SVG is `aria-hidden`; the scale has an `aria-label`.
    `npm run build` and `npm run lint` pass clean.

## Screenshots

57. Full-page screenshots of every page at 1440px and 390px, plus a hero crop, are committed
    under `docs/screenshots/` (JPEG, downscaled) so the PR can be reviewed without pulling
    the branch. Regenerate with Playwright against `next start` if the design changes; delete
    the folder before go-live if it shouldn't ship with the repo (it is not served by Next).

## Not done, on purpose (v2)

- No 3D/WebGL, no canvas, no scroll-jacking. Motion is still the v1 fade/rise reveal plus a
  line-draw variant (`.reveal-line`) that is available but used sparingly.
- No new colours. Every hex value is the v1/aeo-report-site token set.
- No new copy claims, prices, testimonials or logos.
- PR #1 and `build/homepage-v1` untouched.
