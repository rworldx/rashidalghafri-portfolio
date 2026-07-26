# AI_CONTEXT — rashidalghafri.com

Onboarding for any agent (or future-you) working in this repo. Read this first.

## What this is

Personal portfolio for Rashid Al Ghafri. Next.js 15 (App Router), TypeScript
strict, Tailwind, next-intl (en/ar + RTL), next-themes (light/dark), Framer
Motion. Static-first: every public page is SSG; the only server code is
`src/app/api/contact/route.ts`. Built to the PRD (v1.0).

## Invariants (do not break)

1. **No hardcoded colours.** Use semantic Tailwind tokens (`bg-bg`, `text-text`,
   `border-border`, `text-accent`, …) which map to CSS variables in
   `src/app/globals.css` (`:root` light / `.dark`). Tokens are authored in
   **OKLCH**. SVG can use `var(--accent)` directly; **canvas and WebGL cannot
   parse `oklch()`** and must go through `readTokenColor()` in
   `src/lib/css-color.ts`, which normalises via the browser's own parser.
2. **Content is data.** All copy/projects/skills/awards live in `/content/*.ts`
   and `/messages/{en,ar}.json`. Components render data; they never inline it.
   Adding a project / award / skill = edit one content file, nothing else.
3. **Reduced motion always has a fallback.** `MotionProvider` sets Framer's
   `reducedMotion="user"`; the graph swaps to a static SVG via `GraphSignature`.
4. **Path aliases:** `@/` → `src/`, `@content/` → `content/`.
5. **TypeScript strict, no `any`** (enforced by ESLint).
6. **RTL is first-class.** Use logical CSS (`ms-`, `me-`, `ps-`, `pe-`,
   `border-s`) and `rtl:` variants. Mono indices/code stay LTR via `.force-ltr`.
7. **Sections must not import other sections** (ESLint rule in `.eslintrc.json`).
   Sections compose from `ui/`, `motion/`, `graph/`, `layout/`, `lib/`,
   `content/`, `types/`.

## Design language — "The Museum"

The site is staged as a gallery: one room, one work at a time, and the least
interface that still carries a visitor onward.

- **Two display voices, and they mean different things.** **Bodoni Moda italic**
  (`.serif-display` / `.serif-2`) is the MUSEUM voice — the name, the statement
  wall, exhibit titles, the credential row, the wall-label figures. **Archivo**
  narrowed (`.display-*`) is the STRUCTURAL voice for everything else. Serif is
  normally the wrong reflex; it is justified here because the aesthetic family
  is genuinely gallery/catalogue. Bodoni was picked over Instrument Serif and
  Fraunces specifically because those two are the default display serifs of
  every generated page on the web right now. Arabic takes neither — it keeps
  Thmanyah Serif Display and has no italic.
- **Liquid glass** (`.glass`, `.glass-strong`). Floating chrome over a moving
  backdrop. The masked 1.4px gradient ring is the whole trick — blur alone
  reads as a grey box. Two weights only, never stacked, and `.glass-strong` is
  reserved for the ONE primary action per view. Tinted per theme: on a light
  background a white scrim is invisible, so light mode tints toward ink.
  `prefers-reduced-transparency` and `prefers-contrast: more` both turn it into
  a real opaque surface with a real border — not a slightly-less-blurry pane.
- **`three/LiquidBackdrop`** is the gallery's light: a domain-warped fbm shader
  on a single full-screen quad. Deliberately a SHADER, not video — the
  references all use footage, but that means someone else's CDN, megabytes
  before the hero settles, and a dependency that breaks when the file moves.
  Cost is pure fill-rate, so the pixel-ratio cap is the performance lever.
- **`motion/BlurText`** — word-by-word blur-in for display type. CSS, not
  Framer, because it is the LCP element. NOTE: the animation uses
  `animation-fill-mode: both`; `backwards` alone lets every word animate in and
  then vanish back to its `opacity: 0` base rule.
- **Documentary case studies.** `Project.chapters` replaces problem/solution
  where it exists. Chapters are unevenly filled ON PURPOSE — never invent a
  beat to complete the arc. Projects without chapters keep the two-part form.
- **Palette strategy: cool mineral neutrals, exactly one accent.** The field is
  COOL (hue 232/242), never warm paper — a cream background is the most
  over-reached-for default there is. The accent is a true engineered azure
  (h242/244), moved off the violet-leaning cobalt that sits in "AI glow"
  territory. Verified against WCAG; body clears AAA in both themes.
- **The flow line** (`components/flow/FlowRail` + `FlowBranch`) is the
  gallery's datum line and a real reading-progress indicator. **Geometry contract:** rail
  at `start-5 / sm:8 / lg:12`, `Container` inline-start padding exactly double
  (`ps-10 / sm:16 / lg:24`). Change one, change all three.
- **Measured outcomes are never animated.** Counting "Top 30" spends a second
  asserting "Top 29". `AnimatedCounter` survives only in `Interests`, whose
  figures are explicitly personal. **Never animate a number that is a
  credential.**
- **Home is a sequence, not a menu.** Hero → Manifesto → Keynote deck →
  ThroughLine → Marquee → About → Contact. Seven sections, seven different layout families.
- **Cards are the lazy answer.** Ledgers and editorial rows, not grids of
  identical boxes.
- **Section openers are restrained.** Keep eyebrow count at or under
  `ceil(sections / 3)` per page.
- **Shape system.** Interactive → full pill. Surfaces/media → `rounded-lg`
  (22px), `rounded-xl` (30px) when large. Inputs → `rounded-sm` (10px).
- **Press feedback.** Everything pressable scales to `0.97` on `:active`.
- **Motion.** Strong ease-out; springs for pointer-driven things;
  `transform`/`opacity` only. Scroll state comes from Framer's `useScroll` —
  **a `scroll` event listener is banned.**

### Two things that will bite you

- **Reading tokens on a theme change.** Never key a token read on
  next-themes' `resolvedTheme`. `ThemeProvider` is an ancestor and React
  flushes child effects BEFORE parent effects, so a consumer reads
  `getComputedStyle` while `<html>` still carries the OLD theme class and
  caches stale values — this shipped once as a hero that stayed dark in light
  mode. Use `hooks/useThemeTokens`, which watches the class attribute with a
  MutationObserver.
- **Arabic is not Latin with different glyphs.** It is cursive, so
  `letter-spacing` pulls the joins apart and words fall to pieces; it has no
  uppercase, so `text-transform` is a no-op that leaves fake labels; and Geist
  Mono has no Arabic glyphs, so anything mono fell back to a per-machine system
  font. All three are handled under `html[lang='ar']` in globals.css. Latin
  runs marked `.force-ltr` keep the mono face and their tracking.

## Layering (dependency direction, no upward imports)

```
content/*.ts ─┐                (pure data, depends on nothing)
src/types ────┤  shapes the data
src/components ┤  presentation: layout / sections / ui / motion / graph / seo
src/app ───────┘  routing, metadata, the one route handler
src/lib, src/i18n, src/config, src/hooks   cross-cutting
```

## Key files

- `src/i18n/routing.ts` — locales `['en','ar']`, default `en`, `as-needed`
  prefix. `hasLocale` / `isRtl` helpers live here.
- `src/middleware.ts` — **must stay in `src/`** (project uses a `src/` dir).
  Locale negotiation; matcher includes `/`.
- `src/app/layout.tsx` — passthrough (only `metadataBase`); the real
  `<html lang/dir>`, fonts, and providers are in `src/app/[locale]/layout.tsx`.
- `src/lib/fonts.ts` — Host Grotesk + Geist Mono + Nothing You Could Do via
  `next/font/google`; Thmanyah Sans + Thmanyah Serif Display via
  `next/font/local` from `src/fonts/thmanyah/`. All self-hosted at build time.
- `src/lib/css-color.ts` — `readTokenColor()`. **Required** for any canvas or
  WebGL colour, since neither can parse the OKLCH the tokens are written in.
- `src/lib/seo.ts` — `buildMetadata` (per-route) + `buildProjectMetadata`.
- `src/components/graph/` — the interactive force graph (`ConnectionGraph`, on
  the About page) plus the static SVG diagram (`ConnectionGraph.static`) used
  for SSR/first paint and as the reduced-motion / no-WebGL fallback. The canvas
  wrapper sets `touch-action: pan-y`, not `none`, so a vertical swipe still
  scrolls the page instead of being trapped by a full-width interactive.
- `src/components/ui/PortraitCard.tsx` — the About headshot: 3D tilt-on-pointer
  card with an accent glow and caption; falls back to a monogram if
  `site.portrait` (default `/images/portrait.jpg`) is missing.
- `src/components/three/LiquidBackdrop.tsx` — the gallery's light: a
  domain-warped fbm shader on one full-screen quad. **Deliberately vanilla
  Three.js (imperative, in a `useEffect`), NOT `@react-three/fiber`** — Next 15
  ships React 19 internals and R3F v8's reconciler reads React 18's
  `ReactCurrentOwner` -> `undefined` -> crash.

- `src/components/flow/` — the signature. `FlowRail` (page spine, scroll-driven)
  and `FlowBranch` (section wrapper: spur + node). Every section on every page
  is a `FlowBranch`; sections no longer render `<section>` + `<Container>`
  themselves.
- `src/components/ui/SectionHeading.tsx` — also exports `<Emphasise>`, the
  helper that sets one phrase of a headline in the family's italic cut.
- `src/components/ui/ProjectMedia.tsx` / `ProjectSignature.tsx` — screenshot if
  the project has one, generated data-derived mark if not.

## Motion: LazyMotion + `m` (not `motion`)

`MotionProvider` wraps the app in `<LazyMotion features={loadFeatures} strict>`,
which **forbids the heavy `motion.*` import**. Every animated element must use
`m.*` from `framer-motion` (hooks like `useScroll`/`useSpring`/`useInView` import
normally). `strict` throws at runtime if a `motion.*` slips in.

- `src/lib/contact-schema.ts` — Zod schema + response envelope, shared by the
  form and the API route.

## Commands

```bash
npm run dev         # local dev
npm run build       # production build (SSG)
npm run typecheck   # tsc --noEmit
npm run lint        # ESLint (incl. cross-section rule)
npm run test:unit   # Vitest (content-schema, component + concept-guard tests)
```

## Environment

`.env.example` documents all vars. Contact email needs `RESEND_API_KEY` +
`CONTACT_TO_EMAIL` (server-side). Without them the form degrades to `mailto:`.
`NEXT_PUBLIC_SITE_URL` drives canonical URLs / sitemap / OG.

## Known TODO before launch

- Drop the real CV PDF at `public/resume/Rashid_Al_Ghafri_CV.pdf` (see README there).
- Verify any factual claims in `/content` before publishing.
- Set Vercel env vars; connect `rashidalghafri.com` (+ `www`→apex redirect).
