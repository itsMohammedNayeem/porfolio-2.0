# CLAUDE.md — Portfolio 2.0

Personal portfolio site for Mohammed Nayeem (Senior React.js Developer).
Live: https://portfolio-2-0-itsmohammednayeem.vercel.app/

## Tech stack

Vite + React 19 + TypeScript SPA (migrated from Next.js 14 — see ANALYSIS.md),
Tailwind CSS 4 (CSS-first `@theme` in `src/index.css`, `@tailwindcss/vite` plugin),
`motion` v12, ESLint 9 flat config (`eslint.config.js`). Content comes from Sanity
(project `79vh6zyc`, dataset `production`, publicly readable): `scripts/fetch-content.mjs`
snapshots it into `src/data/content.json` at dev/build time, so the deployed site is
fully static. Sanity Studio lives in `sanity/` as a standalone project (not bundled
into the app).

## Commands

```bash
npm install        # clean install, no flags needed
npm run dev        # prefetch content + Vite dev server on :5173 (⚠️ a stray process may hold [::1] ports — test via 127.0.0.1)
npm run build      # prefetch + tsc --noEmit + vite build — must pass before any PR is "done"
npm run preview    # serve the production build (:4173)
npm run lint       # ESLint — must pass
```

## Hard constraints

1. **Never push to `main`/`master`.** All work on feature branches → PRs. Nayeem reviews and merges.
2. **One feature = one branch = one PR.** Atomic conventional commits (`feat:`, `fix:`, `chore:`, `refactor:`, `perf:`).
3. **Preserve the visual identity.** Same look, feel, layout, animations. Any visible change must be flagged in the PR for Nayeem to decide.
4. **A task is done only when** `npm run build`, `npm run lint`, and `npx tsc --noEmit` all pass — show output in the PR.
5. **Content source of truth:** `MohammedNayeem_SeniorReactDeveloper_ClaudeCreated.docx` (the old-version DOCX is reference only). Never invent roles, dates, or metrics.
6. Git identity for this repo: personal email (`nayeem.gmit@gmail.com`), not the WPP one — set via repo-local `git config`.

## CSS architecture & design tokens

Tailwind v4, CSS-first. All theme values live in the `@theme` block in
`src/index.css` (colors, fonts, and the fluid tokens below). Reusable
multi-property patterns are `@utility` classes in the same file.

**Design tokens** (fluid via `clamp()` — scale smoothly 320px→desktop; both
endpoints match the historical fixed values so desktop is unchanged):

| Token | Purpose | Range (mobile → desktop) |
|-------|---------|--------------------------|
| `--text-label` | section marker font-size | 18px → 24px |
| `--tracking-label` | section marker letter-spacing | 6.4px → 20px |
| `--spacing-gutter` | section horizontal padding (`px-gutter`) | 24px → 40px |

**Utilities** (`@utility` in `index.css`): `heroButton` (nav pills, 48px touch
target on mobile), `contactInput` (form fields), `sectionLabel` (the unified
`ABOUT / EXPERIENCE / …` markers — applies the label tokens above).

**UI/UX constraints:** preserve the dark identity, radial hero, and typographic
layout — polish, don't redesign. Interactive reveals must work on touch (no
hover-only content). Respect `prefers-reduced-motion`. Keep touch targets large
and section labels off the viewport edges via the fluid tokens.

## Roadmap

See `ANALYSIS.md` §4 for the engineering roadmap and `DESIGN_AUDIT.md` for the
UX/design roadmap (Steps 2–5) and merge order.
