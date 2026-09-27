# Dependency upgrade — paused, not finished

**This file exists only on `upgrade/next-16`. It is not on `main` and must not be merged without being deleted or rewritten first.**

Paused 27 September 2026. Nothing here has reached `main`; the live site still runs Next 15. Pick this up by reading the two open decisions at the bottom, not by merging.

Branch head at pause: `5ca623c`. Branched from `main` at `44bdd66`.

---

## Why this branch exists

The site was on Next 15.1.11 / React 18. The goal was every dependency at its latest **stable** version, including Node, but only where nothing about the site changes.

Fifteen commits, one package or one tightly-coupled group each, so any single upgrade can be dropped with `git revert` without losing the rest.

## What is done

| package | from | to |
| --- | --- | --- |
| next | 15.1.11 | **16.3.6** |
| react / react-dom | 18.3.1 | **19.3.0** |
| next-intl | 3.26.5 | **4.14.7** |
| eslint-config-next | 15.1.6 | **16.3.6** |
| Node (`engines` + `.nvmrc`) | unpinned | **24.x** |
| three | 0.171.0 | **0.186.1** |
| @types/three | 0.171.0 | 0.186.0 |
| framer-motion | 11.18.2 | **13.4.4** |
| zod | 3.25.76 | **4.6.5** |
| @hookform/resolvers | 3.10.0 | **5.9.1** |
| typescript | 5.9.3 | **6.0.3** |
| vitest | 2.1.9 | **5.0.2** |
| jsdom | 25.0.1 | **30.1.1** |
| @testing-library/jest-dom | 6.9.1 | **7.0.1** |
| @testing-library/react | 16.3.2 | 16.3.3 |
| @types/node | 22.19.21 | **24.19.0** |
| react-hook-form | 7.78.0 | 7.89.0 |
| prettier | 3.8.4 | 3.9.9 |
| postcss / autoprefixer | 8.5.1 / 10.4.20 | 8.5.28 / 10.6.1 |

Source changes the upgrade forced, all small:

- `useRef<T>()` needs an explicit initial value under React 19's types — `CopyButton.tsx`.
- Next 16 removed `next lint`. `.eslintrc.json` became `eslint.config.mjs` (flat config), both custom rules carried over, and the `lint` script is now `eslint .`.
- The `middleware` file convention is deprecated: `src/middleware.ts` → `src/proxy.ts`. The matcher is unchanged, including the metadata-route exclusions the share card depends on.
- The edge runtime is deprecated. Removed from the root OG image, which also promoted `/opengraph-image` from dynamic to prerendered.
- Next 16's React Compiler hook rules caught two real things: `LiquidBackdrop` wrote latest-value refs during render (now in an effect), and `useThemeTokens` had a `useCallback(read, [read])` that could not pin anything (removed; it was dead weight, not a live bug).
- Vite 8 no longer accepts `jsx` under `esbuild` in `vitest.config.ts`. Removed — `tsconfig` sets `jsx: react-jsx` and the transform reads that.

Vercel already runs Node 24.x on this project, so no dashboard change is needed.

## The two scroll regressions

Both were introduced by this upgrade, both were found by using the preview rather than by any automated check, and both came from the same root cause: **Next 16 changed how it scrolls during navigation, and no longer suppresses CSS smooth scrolling while it does.**

### 1. The language toggle threw the reader down the page — `18b30bf`

Tapping ع/EN while at the top of a page dropped you about 800px down. Next 16 scrolls the *changed segment* into view rather than the document.

| | from top of page |
| --- | --- |
| Next 15 | scrollY `0 → 0` |
| Next 16, before fix | `0 → 786` at 390px, `0 → 804` at 1280px |
| Next 16, after fix | `0 → 0` |

Fixed in `src/components/layout/LocaleSwitcher.tsx`: pass `scroll: false` to `router.replace` and scroll to top explicitly. Verified in both directions, from the home page, a case study and `/about`, at 390 and 1440, including from deep scroll positions.

### 2. Opening a case study animated the whole way to the top — `5ca623c`

Clicking a project from partway down `/projects` visibly scrolled the page up instead of arriving there. Cause: `html { scroll-behavior: smooth }` in `globals.css`. Next 15 suppressed it during route changes; Next 16 does not, so the router's scroll-to-top became a journey.

Measured at 1280px, `/projects` → `/projects/energrid` from y=2297, counting distinct scroll positions sampled during the navigation:

| | sampled positions |
| --- | --- |
| Next 15 | **2** — instant |
| Next 16, before fix | **40** — animated |
| Next 16, after fix | **3** — instant |

Fixed by deleting the global rule. The one place smoothness was wanted, the footer's back-to-top link, now asks for it itself in `Footer.tsx`: it still animates, jumps instantly under `prefers-reduced-motion`, and keeps its `href` so it works without JavaScript. `scroll-padding-top: 6rem` stays, so anchors still clear the floating nav.

The entire CSS delta for this fix is one declaration, 23 bytes.

### After both fixes

Twelve interaction scenarios — nav links, project cards, the case-study back link, browser Back, locale switch, theme toggle — at 390 and 1280, run on this branch and on `main` and compared. Every destination and final scroll position matches, no console errors.

## Open decisions

**1. In-page anchor links no longer scroll smoothly.** This is the loose end from regression 2 and the one thing that is genuinely a design choice rather than a bug fix.

Removing `html { scroll-behavior: smooth }` was global. Only two in-page anchors exist today:

- `#top` — the footer's back-to-top link. Smoothness **preserved**, explicitly, in `Footer.tsx`.
- `#main` — the accessibility skip link. Now **instant**. This is arguably better: a skip link should skip, not travel.

So nothing visible is currently worse. But the decision is now expressed in one component rather than in CSS, which means **any anchor link added later will jump rather than glide, and whoever adds it will not know why.** Either accept that and keep the comment in `globals.css` that explains it, or introduce a small shared helper for smooth in-page scrolling and use it everywhere. Decide before adding a table of contents or any section-jump navigation to a case study.

**2. Browser Back restores scroll instantly instead of animating.** Same root cause. Both branches restore the *same* position (3199 at 390px, 2297 at 1280px); `main` animates over 31 frames, this branch restores in 1. Instant is almost certainly right — animating a Back restoration is the same annoyance as regression 2 — but it is a change from what is live, so it is a deliberate call, not an oversight.

## Held back, and why

Each of these is held on evidence. None is "ran out of time".

**tailwindcss 4.3.3** (on 3.4.19) — the big one. Beyond rewriting the config, v4 redefines utilities this site uses: `rounded-sm` ×5 now means what `rounded-xs` did, `shadow-sm` ×3 likewise, `ring` ×7 goes 3px → 1px, `outline-none` ×3 becomes `outline-hidden`. That is roughly 20 call sites where corner radii, shadow weight and focus rings would each shift by a step, on a site whose spacing and contrast were chosen deliberately. Needs a dedicated pass with the screenshot harness, not a version bump.

**tailwind-merge 3.7.0** (on 2.6.1) — v3's class table is v4's. Must move in the same commit as Tailwind.

**prettier-plugin-tailwindcss 0.8.1** (on 0.6.14) — same coupling.

**eslint 10.11.0** (on 9.39.5) — `eslint-config-next` advertises `eslint: ">=9.0.0"`, but the `eslint-plugin-react` it bundles still calls `context.getFilename()`, which ESLint 10 removed. Linting dies on the first file:

```
TypeError: Error while loading rule 'react/display-name':
contextOrFilename.getFilename is not a function
```

Upstream, unfixable here. Revisit when `eslint-config-next` ships an `eslint-plugin-react` 8.

**typescript 7.0.2** (on 6.0.3) — `typescript-eslint@8.70.1`, which `eslint-config-next` 16 depends on, declares `typescript: ">=4.8.4 <6.1.0"`. 7 is outside the supported range, and is the rewritten compiler rather than a routine bump. 6.0.3 is the newest release inside that range.

**lucide-react 1.48.0** (on 0.471.2) — **this one is a product decision, not a blocker.** v1 deleted the brand icons `Github`, `Linkedin` and `Instagram` over trademark concerns. They are used in `Footer.tsx`, `ContactSection.tsx` and `app/[locale]/projects/[slug]/page.tsx`. Taking v1 means supplying three brand SVGs by hand that match the current 1.5 stroke weight and `size-4` / `size-[18px]` sizing. An afternoon's work, and it changes how the footer looks if done carelessly.

**@types/node 26.6.3** — deliberately **not** taken. These types describe Node itself; 26 describes APIs the Node 24 runtime does not have, so code would typecheck green and fail in production. Pinned to 24 to match. Move it only when the runtime moves.

## How this was verified, and what that missed

Three gates, worth reusing next month:

1. **96 screenshots per run** — 24 pages × en/ar × light/dark × 390/1440, compared pixel by pixel against two baselines. Two baselines because one `/projects` capture at 1440 re-rasters non-deterministically; a page counts as changed only if it differs from both.
2. **A shipped-bundle digest** — content hashes of every `.next/static` JS and CSS file, path-independent so Next's per-build ID does not matter. This proves a dev-only upgrade is inert far faster and more strongly than screenshots.
3. **Behavioural tests** for what pixels cannot see — the contact form driven in both languages, the WebGL backdrop sampled 12× per theme on both Three.js versions (`197.6,211.2,221.5` vs `197.6,211.1,221.3` — palette unmoved), and scroll trajectories traced frame by frame.

**What it missed:** both scroll regressions. They only exist while the page is *moving*, and static captures cannot see motion. Next month, test by *using* the preview — navigate, switch language, go back — before trusting any green check.

## Unrelated bug found on the way

**Arabic contact-form validation shows English messages.** Submit the form at `/ar/contact` and you get "Name is too short". The strings are hardcoded in `src/lib/contact-schema.ts` with no Arabic in `messages/ar.json`.

This is **pre-existing on `main`**, not caused by the upgrade, and is worth fixing on `main` independently of this branch. It needs Arabic copy written natively, not translated.

Also noted: `prettier --check` fails on 24 files here and failed on 23 before the bump, so that drift predates this work and is a separate decision.

## Picking this up

```bash
git checkout upgrade/next-16
npm ci
npm run lint && npm run typecheck && npm run test:unit && npm run build
```

Then rebase or merge `main` in first — `main` will have moved — and re-run the gates before touching Tailwind.
