import type { Localized } from '@/types/common';
import type { Locale } from '@/i18n/routing';

/** Pick the right language string from a Localized value. */
export function pick(value: Localized, locale: string): string {
  return value[locale as Locale] ?? value.en;
}
