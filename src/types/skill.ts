import type { Localized } from './common';

export interface SkillGroup {
  /** Stable id, used as React key and for the connection graph. */
  id: string;
  label: Localized;
  items: string[];
}
