import { defineRouting } from 'next-intl/routing';

/**
 * Single source of truth for locales. Adding a locale here propagates to
 * middleware, navigation helpers, and static generation.
 */
export const routing = defineRouting({
  locales: ['en', 'ar'],
  defaultLocale: 'en',
  localePrefix: 'as-needed',
  // First visit always lands in English regardless of the browser's language;
  // the user can switch to Arabic via the locale switcher (which prefixes /ar).
  localeDetection: false,
});

export type Locale = (typeof routing.locales)[number];

/** RTL locales — drives `dir` on <html> and logical-property layout. */
export const rtlLocales: Locale[] = ['ar'];

export function isRtl(locale: string): boolean {
  return rtlLocales.includes(locale as Locale);
}

/** Type guard — narrows an unknown segment to a supported Locale. */
export function hasLocale(value: string | undefined): value is Locale {
  return value !== undefined && (routing.locales as readonly string[]).includes(value);
}
