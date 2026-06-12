import type { Localized, LinkItem } from './common';

export interface SocialLink extends LinkItem {
  id: 'github' | 'linkedin' | 'instagram' | 'email';
}

export interface SiteContent {
  name: string;
  /** Monogram for the wordmark, e.g. "RA". */
  monogram: string;
  role: Localized;
  tagline: Localized;
  /** Short "available" status line shown in the hero. */
  status: Localized;
  location: Localized;
  email: string;
  /** Path to the downloadable CV under /public. */
  cvPath: string;
  socials: SocialLink[];
}
