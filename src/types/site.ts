import type { Localized, LinkItem } from './common';

export interface SocialLink extends LinkItem {
  id: 'github' | 'linkedin' | 'instagram' | 'email';
}

export interface SiteContent {
  /** Canonical English name — used for SEO, metadata, JSON-LD. */
  name: string;
  /** Localized display name for the hero/footer (Arabic reads correctly in RTL). */
  displayName: Localized;
  /** Monogram for the wordmark, e.g. "RA". */
  monogram: string;
  role: Localized;
  tagline: Localized;
  /** Short "available" status line shown in the hero. */
  status: Localized;
  location: Localized;
  email: string;
  /** International format, e.g. "+968 9484 6461". */
  phone: string;
  /** Path to the downloadable CV under /public. */
  cvPath: string;
  /** Professional headshot under /public (falls back to a monogram if missing). */
  portrait: string;
  socials: SocialLink[];
}
