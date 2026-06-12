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
