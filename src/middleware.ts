import createMiddleware from 'next-intl/middleware';
import { routing } from '@/i18n/routing';

/**
 * Locale negotiation + redirect (PRD §6.3). Reads Accept-Language / cookie,
 * prefixes routes as-needed, and keeps the default locale clean.
 */
export default createMiddleware(routing);

export const config = {
  // Match the root, locale-prefixed paths, and everything else EXCEPT: API,
  // Next internals, files with an extension, and the extension-less metadata
  // routes (icon / apple-icon / opengraph-image). Without excluding the latter,
  // the locale middleware swallows them and the favicon 404s.
  matcher: [
    '/',
    '/(ar|en)/:path*',
    '/((?!api|_next|_vercel|icon|apple-icon|opengraph-image|manifest|sitemap|robots|.*\\..*).*)',
  ],
};
