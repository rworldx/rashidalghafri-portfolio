import type { Localized } from './common';

export type ExperienceKind = 'education' | 'leadership' | 'activity';

export interface ExperienceItem {
  id: string;
  kind: ExperienceKind;
  title: Localized;
  org: Localized;
  /** Display period (e.g. "Oct 2022 – Jul 2026"). */
  period: string;
  /** Sort key — higher is more recent. */
  order: number;
  bullets?: Localized[];
}
