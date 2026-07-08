# Design & UX Audit — Portfolio 2.0

_Audit date: 2026-07-08 · Live build on `main` (post-#104) · Measured in-browser at 320 / 375 / 768 / 1280 px_

Scope: UX/UI, responsive behavior, micro-interactions, and accessibility. **No code
changes made** — this is Step 1. Findings are ranked; the fix roadmap at the end maps
to the branch plan (Steps 2–5). Awaiting your sign-off before any implementation.

Guiding principle throughout: **preserve the identity, elevate the detail.** Nothing
below proposes changing the dark aesthetic, the radial hero, the typography-forward
layout, or the personal "N" mark — only tightening how they render, especially on mobile.

---

## 0. Executive summary

The desktop experience is genuinely solid. **The mobile experience has several real
bugs that read as "unfinished"** — the kind a hiring manager notices. The five that
matter most:

1. **Experience cards are permanently greyed out on touch devices.** They use
   `opacity-40 hover:opacity-100`; touch has no hover, so on every phone/tablet the
   cards sit at 40% opacity and look disabled/broken. _(Highest impact — it's your
   career history, rendered as if inactive.)_
2. **Skills grid scatters on mobile.** The entrance animation starts each icon at
   `x: ±200px` and only settles via `whileInView`, which doesn't fire reliably inside
   the snap-scroll container on mobile — icons land ~200px off their grid cell (measured
   at x=390–450 in a 236px-wide grid). Result: a broken-looking, misaligned grid.
3. **The "About" section label overlaps the profile photo** on mobile (the absolutely
   positioned heading and the image collide).
4. **No `prefers-reduced-motion` support anywhere** (0 CSS rules found) — every entrance
   animation runs regardless of the user's OS setting. This is both an a11y miss and a
   motion-sickness risk.
5. **No keyboard focus indicators.** Form inputs explicitly remove the outline
   (`outline-hidden`); no `:focus-visible` styling exists — keyboard users can't see
   where they are.

Everything else is polish: touch-target sizes, fluid type scaling, section-label
spacing, and hover states that have no touch equivalent.

---

## 1. Visual Hierarchy & Typography

| Observation | Detail | Severity |
|---|---|---|
| **Hero `<h1>` has a broken fixed height** | The typewriter heading is `h-[20px]` but actually renders **80px** (multi-line). The height is a no-op that the layout then works around with a `bottom-[-30px]` offset hack on the nav row — fragile, and a CLS/jump risk as the typewriter text changes length. | High |
| **Section labels don't scale** | "ABOUT / EXPERIENCE / SKILLS / PROJECTS / CONTACT ME" use fixed `tracking-[20px]` + `text-2xl`. On a 375px screen they span nearly edge-to-edge and, for longer words, wrap or touch the viewport sides. No fluid clamp. | Medium |
| **Hero role subtitle wraps awkwardly** | "SENIOR REACT.JS DEVELOPER" with `tracking-[15px]` breaks to 2 lines on mobile, the first line almost touching both edges. | Medium |
| **About body copy is centre-aligned** | A ~90-word paragraph is `text-center` on mobile → ragged both edges, harder to read. Left-align on small screens would read far better while keeping the centred layout on desktop. | Medium |
| **Body/heading scale is not fluid** | Type jumps at breakpoints (`text-2xl md:text-5xl lg:text-6xl`) rather than scaling smoothly with `clamp()`. Works, but a fluid scale would feel more premium between breakpoints. | Low |
| Line-height / readability of long copy | About + Experience bullet text is readable; line-height is fine. Centre alignment is the main readability issue. | Low |

Contrast note: the muted `gray-500` (#6B7280 on #242424 ≈ 3.2:1) fails WCAG AA — **you
have already decided to keep this** to preserve the muted look. Documented here as a
known, intentional exception; not proposed for change.

---

## 2. Layout & Spacing Grid

| Observation | Detail | Severity |
|---|---|---|
| **Absolute-positioned section headings collide with content** | Section titles are `absolute top-20` and the content is vertically centred independently. On short mobile viewports the "About" label sits **on top of** the profile image; other sections get uncomfortably tight. | High |
| **Skills grid uses brittle absolute positioning** | The icon grid is `absolute top-[205px]` — a magic number that doesn't respond to the heading/subhead height above it. Combined with #1.3 it's the least robust layout in the app. | High |
| **No shared spacing scale** | Padding/margins are ad-hoc per component (`px-10`, `p-20 md:p-44`, `top-20 md:top-24`, `space-y-8`…). There's no tokenized rhythm, so vertical spacing between analogous elements varies section to section. | Medium |
| **Experience card inner scroll** | Each card pins its bullet list to `h-[320px] overflow-y-auto`. On mobile this creates a nested scroll region inside a horizontally-snapping carousel inside the vertically-snapping page — three competing scroll axes. Awkward and easy to get stuck in. | Medium |
| **Projects: no swipe affordance** | 10 projects live in a horizontal snap-scroll with no dots, arrows, or "1 / 10" indicator visible on mobile — users may not realize there's more to swipe. | Medium |
| **Projects skew band** | The `-skew-y-12 bg-sun/10` band reads as a muddy diagonal wash at the bottom on mobile. Minor. | Low |

Positive: no horizontal document overflow at any tested width (320–1280) — the earlier
header-overflow bug from the perf PR is fixed and holding.

---

## 3. Responsive Pain Points (by section)

**Hero** — role subtitle awkward 2-line wrap; nav "buttons" (`.heroButton`) have
near-invisible borders (`border-gray-14` on `#242424`) so they read as plain text, not
tappable pills; they wrap 3-then-1 on mobile; the fixed-height `<h1>` overflows.

**About** — section label overlaps the photo; long paragraph centre-aligned.

**Experience** — cards stuck at `opacity-40` on all touch devices (no hover); date
renders with weekday, e.g. **"FRI MAR 01 2024 - PRESENT"** (from `toDateString()`) which
looks unpolished; nested inner scroll.

**Skills** — icons scatter (animation doesn't settle); the on-hover proficiency `%`
overlay is **completely inaccessible on touch** (the whole "hover for proficiency"
interaction has no mobile equivalent, yet the subhead literally instructs "Hover over a
skill…"); brittle absolute layout.

**Projects** — generally the best-adapting section; only missing a swipe indicator.

**Contact** — the most polished mobile section. Inputs are 41px tall (just under target);
section label spacing slightly awkward. Otherwise clean.

---

## 4. Micro-interactions & Motion

| Observation | Detail | Severity |
|---|---|---|
| **No `prefers-reduced-motion` handling** | 0 rules found. All `motion` entrance animations (opacity/slide/scale) and the `animate-ping`/`animate-pulse` hero rings run unconditionally. | High (a11y) |
| **`whileInView` unreliable on mobile** | Skills (and to a lesser degree other sections) depend on viewport-intersection to end their animation; inside the snap-scroll container this doesn't consistently trigger, leaving elements at their initial offset. Needs `viewport={{ once: true }}` consistently and/or a more robust trigger. | High |
| **Touch has no hover fallback** | Two core interactions are hover-only: Experience card reveal (opacity) and Skill proficiency `%`. Both are dead on touch. Needs a tap/always-on treatment on mobile. | High |
| **Hover states are abrupt / inconsistent** | Social icons and nav pills change colour on hover with a `duration-200` colour transition but no scale/lift; project cards have no hover treatment at all. Opportunity for tactile, consistent micro-interactions (subtle scale/translate, focus-ring parity). | Medium |
| **Hero typewriter CLS** | Because the `<h1>` height is mis-declared and the caret/word length changes, the block can shift as words cycle. Reserve stable space to keep CLS ~0. | Medium |
| Entrance timing | `duration: 1.5s` opacity fades on section wrappers feel a touch slow/heavy on repeat scrolling; `once: true` isn't set on the section fades, so they re-run every time you scroll past. | Low |

---

## 5. Accessibility (WCAG 2.1 AA)

| Observation | Detail | Severity |
|---|---|---|
| **No visible focus indicators** | `outline-hidden` on `.contactInput`; no `:focus-visible` styles on nav pills, social links, résumé control, or form fields. Keyboard users are lost. | High |
| **Touch targets below minimum** | Measured at 375px: nav pills **34px** tall, social icons **30px**, résumé trigger **24px**, form inputs **41px** — all under the 48×48 (and even the 44px) guideline. | High |
| **Hover-only content is unreachable** | Skill proficiency `%` and Experience detail reveal can't be triggered by keyboard or touch (see §4). | High |
| **Reduced-motion not respected** | See §4. | High |
| **Nested / empty anchors in header** | The "Get in touch" mail control is a `react-social-icons` `<a href="">` (empty) nested inside `<a href="#contact">` — invalid nested-interactive markup. | Medium |
| **Stale/misleading social icon** | The 7th header icon renders as a defunct **Google+** glyph (aria-label "google") but links to a Google Drive résumé — confusing branding, and now redundant with the real résumé download. Recommend removing or relabeling. | Medium |
| Heading order | ✅ Already correct (`h1 → h2 → h3`, fixed in #103). | — |
| Social link names | ✅ `react-social-icons` supplies aria-labels; résumé control has `aria-label`. | — |

---

## 6. Proposed fix roadmap (maps to your Steps 2–5)

Ordered by impact. Each becomes its own branch/PR; all preserve the visual identity.

### Step 2 — `ux/mobile-responsive-overhaul`
- **Fix the Experience `opacity-40` hover trap**: make cards full-opacity on touch/mobile (or reveal on tap / when snapped into view), keep the hover-dim as a desktop-only flourish.
- **Fix the Skills grid**: settle the entrance animation reliably (`viewport once`, robust trigger), replace `absolute top-[205px]` with in-flow layout, and give proficiency a **touch-accessible** treatment (e.g. always-visible on mobile, or tap-to-reveal) — and rewrite the "hover" instruction for touch.
- **Fix section-label overlap**: make the absolutely-positioned headings not collide on short viewports (in-flow on mobile, or safe offsets).
- **Fix the hero `<h1>`** fixed-height/CLS and the role-subtitle wrap.
- **Mobile nav**: make the hero nav pills read as real, tappable controls with visible borders and ≥48px targets; evaluate a proper mobile nav affordance.
- **Projects**: add a swipe indicator (dots / "n of 10").

### Step 3 — `ux/spacing-grid-alignment`
- Introduce a tokenized fluid spacing/type scale (CSS custom properties + Tailwind `@theme`) using `clamp()` so margins, section headings, and body copy scale smoothly 320→1280.
- Left-align long About/Experience copy on mobile; align cards/icons/columns to a consistent grid.

### Step 4 — `ux/motion-micro-interactions`
- Add a global `prefers-reduced-motion` guard (disable/soften entrance + ping/pulse).
- Set `viewport={{ once: true }}` on section fades; tune durations/easing for snappier, purposeful motion.
- Add tactile, consistent hover **and** `:focus-visible` states to social icons, nav pills, and project cards (subtle scale/lift).

### Step 5 — `ux/a11y-keyboard-nav`
- Stylish `:focus-visible` rings across all interactive elements (restore input outlines).
- Enforce ≥48px touch targets.
- Fix the nested/empty header anchor; remove/relabel the defunct Google+/Drive icon.
- Confirm résumé PDF/DOCX controls are labeled and keyboard-operable.

---

## 7. Open questions for sign-off

1. **Experience cards on mobile** — full opacity always, or reveal-on-tap? (I recommend always-full on touch; keep the dim-until-hover as a desktop-only effect.)
2. **Skill proficiency on touch** — always show the `%`, or a tap-to-flip? (I recommend always-visible small `%` badge on mobile.)
3. **The 7th "Google+" social icon** (links to a Drive résumé) — remove it now that we have a proper résumé download, relabel it, or leave it?
4. **Mobile nav** — keep the current in-hero pill row (just polished), or add a dedicated sticky/hamburger mobile menu? (The prompt mentions a "mobile navigation menu"; the current design has no separate nav, only the hero pills + header icons — worth deciding the intended pattern.)
5. Fluid type/spacing — OK to introduce `clamp()`-based tokens, given it slightly changes intermediate sizes between breakpoints (desktop and mobile end-points preserved)?

Nothing above is implemented yet. On your sign-off (and answers to §7), I'll proceed
Step 2 → Step 5, one branch/PR each, verifying at 320/375/768/1280 with build + lint green.
