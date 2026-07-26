import type { Localized, LinkItem, Stat } from './common';

/** An image used in the compact work-grid card. */
export interface ProjectThumb {
  /** Path under /public. Used in light theme, and in dark when `dark` is unset. */
  src: string;
  /**
   * Dark-theme counterpart. Needed when the asset has a baked-in background
   * (a JPEG logo), since one file cannot serve both themes.
   */
  dark?: string;
  kind: 'screenshot' | 'logo';
}

/** One beat of a case-study narrative. */
export interface ProjectChapter {
  /** Short label: "The problem", "What I built", "What happened". */
  title: Localized;
  /** One or two paragraphs. Prose, not bullets. */
  body: Localized[];
  /** Optional hard numbers that belong to this beat specifically. */
  facts?: { label: Localized; value: string }[];
}

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
  /**
   * The documentary. A case study that says only "problem" and "solution"
   * describes an outcome; chapters show the thinking, which is what people
   * actually hire for.
   *
   * Optional and unevenly filled ON PURPOSE — a project with two honest
   * chapters is worth more than one padded out to seven. Never invent a
   * chapter to complete the arc.
   */
  chapters?: ProjectChapter[];
  /**
   * Cover image path under /public. Optional: when a project has no real
   * screenshot yet, ProjectMedia renders the generated signature instead of
   * shipping a placeholder graphic.
   */
  cover?: string;
  /**
   * How the cover fills its frame.
   *  `screenshot` (default) — a wide capture that should bleed edge to edge.
   *  `logo` — a mark that must be shown whole, so it is contained and centred
   *  on a plate instead of being cropped. Use this for square or
   *  white-background brand assets.
   */
  coverKind?: 'screenshot' | 'logo';
  /**
   * Dark-theme counterpart for the cover. Needed when the cover is a logo with
   * a baked-in background (a JPEG), since one file cannot serve both themes.
   * When present, each variant's ground is blended out against the surface.
   */
  coverDark?: string;
  /**
   * Optional override for the compact card in the work grid. A wide product
   * screenshot is unreadable at card size, where a mark is recognisable
   * instantly — so a project can lead with its logo in the grid and still show
   * the real product on the large feature block and the case study.
   */
  thumb?: ProjectThumb;
  gallery?: string[];
  links?: LinkItem[];
}
