import { getRequestConfig } from 'next-intl/server';
import { routing, hasLocale } from './routing';

/**
 * Server-side per-request i18n config. Loads the message catalog for the
 * resolved locale, falling back to the default locale for unknown segments.
 */
export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(requested) ? requested : routing.defaultLocale;

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
