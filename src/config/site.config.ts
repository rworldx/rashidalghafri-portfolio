/** Deployment-level config. URL is env-driven so a domain swap is config, not code. */
export const siteConfig = {
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://rashidalghafri.com',
  name: 'Rashid Al Ghafri',
  defaultTitle: 'Rashid Al Ghafri — Software Engineer',
  description:
    'Software engineer and final-year SE student building full-stack systems and AI-driven tools. Creator of StudyNest.',
  ogImageAlt: 'Rashid Al Ghafri — Software Engineer',
  twitterHandle: undefined as string | undefined,
} as const;
