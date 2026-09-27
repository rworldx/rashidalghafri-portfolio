import type { Localized } from './common';

export type ExperienceKind = 'education' | 'training' | 'leadership' | 'activity';

export interface ExperienceItem {
  id: string;
  kind: ExperienceKind;
  title: Localized;
  org: Localized;
  /**
   * Display period (e.g. "Oct 2022 – Jul 2026"). Localised, because an
   * open-ended role needs a word — "Present" / "حتى الآن" — and an English
   * word sitting in the Arabic column reads as unfinished.
   */
  period: Localized;
  /** Sort key — higher is more recent. */
  order: number;
  bullets?: Localized[];
}
