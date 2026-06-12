import type { Localized } from './common';

export interface Award {
  id: string;
  title: Localized;
  /** Display label for the date (e.g. "Jun 2026", "2025"). */
  date: string;
  /** Sort key — higher is more recent. */
  order: number;
  org?: Localized;
  description: Localized;
  /** Optional accent — e.g. "national", "finalist". */
  tag?: Localized;
}
