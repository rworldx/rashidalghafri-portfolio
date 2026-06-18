/** A string that exists in both supported locales. */
export interface Localized {
  en: string;
  ar: string;
}

/** A labelled external or internal link. */
export interface LinkItem {
  label: string;
  href: string;
  external?: boolean;
}

/** A labelled metric (e.g. "100+ endpoints"). */
export interface Stat {
  label: Localized;
  value: string;
}

/** A personal interest shown in the "Beyond the code" grid. */
export interface Interest {
  /** lucide-react icon name. */
  icon: string;
  label: Localized;
}

export type TimelineKind =
  | 'birth'
  | 'travel'
  | 'education'
  | 'milestone'
  | 'goal';

/** One entry on the visual timeline spine. */
export interface TimelineEntry {
  year: number;
  kind: TimelineKind;
  title: Localized;
  detail: Localized;
  /** Future/aspirational entry — rendered hollow/dashed. */
  future?: boolean;
}
