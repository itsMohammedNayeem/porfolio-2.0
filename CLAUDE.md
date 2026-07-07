# CLAUDE.md — Portfolio 2.0

Personal portfolio site for Mohammed Nayeem (Senior React.js Developer).
Live: https://portfolio-2-0-itsmohammednayeem.vercel.app/

## Tech stack

**Current (being migrated):** Next.js 14 (App Router + Pages API routes), React 18,
TypeScript, Tailwind CSS 3, framer-motion 10, Sanity v3 (project `79vh6zyc`,
dataset `production`, publicly readable).

**Target (approved 2026-07-07, see ANALYSIS.md):** Vite + React 19 + TypeScript SPA,
`@sanity/client` fetching content directly, `motion` v12, Tailwind CSS v4, ESLint 9
flat config. Sanity Studio lives in `sanity/` as a standalone project (hosted via
`sanity deploy`, not bundled into the app).

## Commands

```bash
npm install        # NOTE: requires --legacy-peer-deps until fix/build-and-local-dev merges
npm run dev        # dev server on :3000 (⚠️ another process may hold [::1]:3000 — test via 127.0.0.1)
npm run build      # production build — must pass before any PR is "done"
npm run lint       # ESLint — must pass
npx tsc --noEmit   # type-check — must pass
```

## Hard constraints

1. **Never push to `main`/`master`.** All work on feature branches → PRs. Nayeem reviews and merges.
2. **One feature = one branch = one PR.** Atomic conventional commits (`feat:`, `fix:`, `chore:`, `refactor:`, `perf:`).
3. **Preserve the visual identity.** Same look, feel, layout, animations. Any visible change must be flagged in the PR for Nayeem to decide.
4. **A task is done only when** `npm run build`, `npm run lint`, and `npx tsc --noEmit` all pass — show output in the PR.
5. **Content source of truth:** `MohammedNayeem_SeniorReactDeveloper_ClaudeCreated.docx` (the old-version DOCX is reference only). Never invent roles, dates, or metrics.
6. Git identity for this repo: personal email (`nayeem.gmit@gmail.com`), not the WPP one — set via repo-local `git config`.

## Roadmap

See `ANALYSIS.md` §4 for the PR-by-PR roadmap and merge order.
