import type { Localized, LinkItem, Stat } from './common';

export interface Project {
  /** URL slug, used for /projects/[slug]. */
  slug: string;
  /** Featured projects surface on the home page. */
  featured: boolean;
  title: string;
  year: number;
  /** e.g. "Senior Capstone · Full-Stack". */
  role: string;
  summary: Localized;
  problem: Localized;
  solution: Localized;
  liveUrl?: string;
  repoUrl?: string;
  /** Tech chips, shown in order. */
  stack: string[];
  /** Headline metrics for the featured block + case study. */
  stats?: Stat[];
  /** Case-study key features (each a short localized line). */
  highlights?: Localized[];
  /** Cover image path under /public. */
  cover: string;
  gallery?: string[];
  links?: LinkItem[];
}
