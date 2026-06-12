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
   `src/app/globals.css` (`:root` light / `.dark`). Canvas/SVG read the same
   vars (`var(--accent)` in SVG; `getComputedStyle` in `ConnectionGraph.tsx`).
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
- `src/lib/fonts.ts` — self-hosted via `next/font/google` (Space Grotesk /
  Inter / JetBrains Mono / IBM Plex Sans Arabic / Tajawal).
- `src/lib/seo.ts` — `buildMetadata` (per-route) + `buildProjectMetadata`.
- `src/components/graph/` — the signature connection graph. `GraphSignature`
  picks interactive canvas vs. static SVG (reduced-motion / SSR).
- `src/lib/contact-schema.ts` — Zod schema + response envelope, shared by the
  form and the API route.

## Commands

```bash
npm run dev         # local dev
npm run build       # production build (SSG)
npm run typecheck   # tsc --noEmit
npm run lint        # ESLint (incl. cross-section rule)
npm run test:unit   # Vitest (content-schema + component tests)
```

## Environment

`.env.example` documents all vars. Contact email needs `RESEND_API_KEY` +
`CONTACT_TO_EMAIL` (server-side). Without them the form degrades to `mailto:`.
`NEXT_PUBLIC_SITE_URL` drives canonical URLs / sitemap / OG.

## Known TODO before launch

- Drop the real CV PDF at `public/resume/Rashid_Al_Ghafri_CV.pdf` (see README there).
- Verify any factual claims in `/content` before publishing.
- Set Vercel env vars; connect `rashidalghafri.com` (+ `www`→apex redirect).
