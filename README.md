# rashidalghafri.com

Personal portfolio for **Rashid Al Ghafri** — software engineer & recent SE
graduate. Built as a fast, bilingual (EN/AR), accessible, static-first site with
a signature interactive connection graph.

## Stack

Next.js 15 (App Router) · TypeScript (strict) · Tailwind CSS · next-intl
(EN/AR + RTL) · next-themes (light/dark) · Framer Motion · Vitest. Deployed on
Vercel.

## Features

- **Bilingual (EN/AR)** with full right-to-left (RTL) support via next-intl
- **Interactive connection graph** — a signature animated hero linking projects, skills, and experience
- **Light / dark themes** with system-preference detection (next-themes)
- **Content-as-data** — projects, skills, awards, and timeline are typed data files; the grid, case-study pages, sitemap, and OG images all generate automatically
- **Static-first & accessible** — pages pre-render as SSG for speed; keyboard- and screen-reader-friendly
- **Contact form** powered by Resend

## Screenshots

> _Screenshots coming soon._
>
> <!-- Add images under public/screenshots/ (or docs/) and reference them here, e.g.:
> ![Home — connection graph](public/screenshots/home.png)
> ![Project case study](public/screenshots/project.png) -->

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in contact-form vars (optional for dev)
npm run dev                  # http://localhost:3000
```

## Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Local dev server |
| `npm run build` | Production build (all pages SSG) |
| `npm run start` | Serve the production build |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | ESLint (incl. the sections-modularity rule) |
| `npm run test:unit` | Vitest unit + content-schema tests |
| `npm run format` | Prettier |

## Editing content

Everything visitor-facing is data. To change copy or add things:

- **A project** → add an entry to `content/projects.ts` (the grid, case-study
  page, sitemap and OG image all update automatically).
- **A skill / award / timeline item** → `content/skills.ts` / `awards.ts` /
  `experience.ts`.
- **UI strings** → `messages/en.json` and `messages/ar.json` (keep keys in sync).
- **Identity / socials / CV path** → `content/site.ts`, `content/socials.ts`.
- **Colours / theme** → CSS variables in `src/app/globals.css`.

See `AI_CONTEXT.md` for architecture and invariants.

## Deploy

Vercel, framework preset Next.js. Set env vars (`RESEND_API_KEY`,
`CONTACT_TO_EMAIL`, `NEXT_PUBLIC_SITE_URL`). Add the production CV PDF at
`public/resume/Rashid_Al_Ghafri_CV.pdf` before shipping.
