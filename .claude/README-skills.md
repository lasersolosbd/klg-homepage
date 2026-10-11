# Design skills under evaluation (branch: test/design-skills)

- `skills/ui-ux-pro-max` - from nextlevelbuilder/ui-ux-pro-max-skill (MIT), single skill only.
- `skills/impeccable` + `agents/impeccable-*` - from pbakaus/impeccable (Apache-2.0), plugin build.

Impeccable hooks are intentionally NOT enabled (no .claude/settings.json hooks), so its native
engine binary is never auto-run. Set IMPECCABLE_NO_TELEMETRY=1 and DO_NOT_TRACK=1 if you run it.
To remove: delete this branch.

## Homepage rebuild (site/)
Static page: `site/index.html`, `styles.css`, `main.js`, self-hosted fonts (OFL).
- UI UX Pro Max: design-system query (trust + conversion pattern, accessibility rules, motion/density dials, pre-delivery checklist). Its suggested serif fonts (Playfair/Cormorant/EB Garamond) were overridden by Impeccable's guidance, so the page uses Instrument Serif + Hanken Grotesk.
- Impeccable (guidance only; native engine and hooks not run): bans on eyebrow labels, icon-card grids, gradient text, cream grounds; committed color world; one authored motion moment; themed selection/focus/scrollbar.
- Claims to confirm before launch: VCP mention, "22 years of Navy service", the data-handling and "first conversation" promises, CTA link (currently a personal Calendly URL).
