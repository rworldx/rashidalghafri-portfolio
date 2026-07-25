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

## Design language — "Flow"

The visual system, and the reasoning that would otherwise get re-litigated.

**The organising idea.** The whole site is built on the falaj — Oman's
gravity-fed irrigation network: one source, a spine, branches out to everyone
who needs the water, nothing wasted. It shapes the rail running down every
page, the way sections branch off that rail instead of stacking on it, and the
network in the hero.

It is **named in exactly one place**: the colophon at the end of `/about`. There
are no canals, no water textures, no sand, no cultural motifs anywhere in the
visual language — the idea lives in the engineering, which is the only place it
belongs. A visitor should feel the page is unusually connected long before they
are told why. `tests/concept.test.ts` fails the build if the motif leaks into
any other copy, because nothing else would catch it.

- **The signature: the flow line.** `components/flow/FlowRail` draws one
  hairline down the inline-start gutter of every page; the part above the
  reader is live (accent), the rest dormant. `FlowBranch` wraps each section
  and draws a spur back to the rail ending in a node that wakes as the reader
  passes. It is allowed to exist because it carries information — real reading
  progress, plus the fact that every section descends from one source.
  **Geometry contract:** rail at `start-5 / sm:8 / lg:12`, `Container`
  inline-start padding is exactly double (`ps-10 / sm:16 / lg:24`), spur spans
  the gap. Change one, change all three.
- **Palette strategy: cool mineral neutrals, exactly one accent.** Two moves
  away from the previous design, both deliberate: the field went from *warm*
  paper (hue 92) to **cool** (hue 232/242) because a cream/sand background is
  the most over-reached-for AI default there is; and the accent moved from a
  violet-leaning cobalt (h262) to a **true engineered azure** (h242/244),
  because h262 sits on the edge of the "AI blue/purple glow" everyone ships.
  One accent per view — do not introduce a second hue for a badge or a CTA.
  Every pair was verified with a WCAG pass (body clears AAA in both themes).
  The one sanctioned exception is the *labelled* About graph, which needs
  categorical colour because it has a key.
- **The field.** `body::before` is a single fixed gradient layer and
  `body::after` is the grain. Fixed means the compositor never repaints them on
  scroll. Never move either onto a scrolling container.
- **Type: display and body are different grotesques.** Display is **Archivo**
  on its `wdth` axis, set NARROWED (88–96, tighter as it grows) so headlines
  read as engineered and a long name holds one line. Body is Host Grotesk.
  Archivo was chosen over the more characterful Bricolage Grotesque for one
  hard reason: **Bricolage ships no italic**, and emphasis inside a headline
  must be the same family's own italic cut (`.em-italic` / `<Emphasise>`),
  never a second family injected for effect. Geist Mono is the only other
  contrast axis, reserved for metadata, codes and figures. Arabic swaps to
  Thmanyah Sans / Serif Display, takes **no italic**, and must reset
  `font-variation-settings` (it is not a variable-width face).
- **The signature face.** `Nothing You Could Do` appears exactly **once** on the
  whole site: the signature closing the About story, English only. Arabic gets
  Aref Ruqaa, a real Arabic hand. Using either anywhere else turns a signature
  into decoration.
- **Scale is golden-ratio derived.** Type steps at √φ (1.272) and φ (1.618);
  spacing tokens `phi`…`phi-5`; asymmetric layouts split `1.618fr 1fr`.
- **Shape system (one rule, no exceptions).** Interactive controls → full pill.
  Surfaces and media → `rounded-lg` (22px), `rounded-xl` (30px) when large.
  Inputs → `rounded-sm` (10px).
- **Press feedback.** Every pressable element scales to `0.97` on `:active` over
  120ms. Feedback lands on press, not on release.
- **Motion.** Strong ease-out (`ease-out` = `cubic-bezier(.23,1,.32,1)`); springs
  for anything a pointer touches; `transform`/`opacity` only. Scroll state comes
  from Framer's `useScroll` — **a `scroll` event listener is banned.**
- **Measured outcomes are never animated.** Count-ups are gone from the proof
  ledger, the featured stats and the case-study stats: counting "Top 30" spends
  a second rendering "Top 29", and these are checkable claims about a rank, a
  grade and a pilot. `AnimatedCounter` survives only in `Interests`, whose
  figures are explicitly personal and soft. The rule: **never animate a number
  that is a credential.**
- **Section openers are restrained.** A small tracked label above _every_ section
  is the most-repeated generated-design tell there is, so `SectionHeading`
  renders `label` only where it names a genuine shift in genre. Keep the count
  at or under `ceil(sections / 3)` per page. The short hairline that used to sit
  above every headline is gone — the branch spur says the same thing better.
- **Cards are the lazy answer.** Skills, awards, experience, certifications, the
  proof ledger and interests are hairline ledgers and editorial rows, not grids
  of identical boxes. Reach for `Card` only where elevation communicates real
  hierarchy.
- **Project imagery.** `ProjectMedia` prefers a real screenshot; with no `cover`
  it falls back to `ProjectSignature`, a deterministic mark whose geometry is
  derived from the project's own data. Never ship a grey placeholder box.

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
- `src/components/three/` — the hero's 3D network (`FlowNetwork`): Rashid's real
  graph laid out by BFS depth, with light pulses that always travel *outward*
  from the source. It is data, not decoration. **Deliberately vanilla
  Three.js (imperative, in a `useEffect`), NOT `@react-three/fiber`.** Next 15
  runs React 19 internals in the client bundle, and R3F v8's `react-reconciler`
  reads React 18's `ReactCurrentOwner` → `undefined` → crash. Do not reintroduce
  R3F unless you also move to React 19 + R3F v9. `FlowNetwork` builds the
  scene once and exposes a `setColors` API the theme effect calls; `HeroBackground`
  gates it (reduced-motion / WebGL / viewport-pause) and wraps it in an
  `ErrorBoundary` that falls back to the static graph. The static fallback and
  the WebGL version are the same picture, so both draw every node in the accent
  when `ambient` — an unlabelled diagram must not use colour it cannot explain.
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
