import createMiddleware from 'next-intl/middleware';
import { routing } from '@/i18n/routing';

/**
 * Locale negotiation + redirect (PRD §6.3). Reads Accept-Language / cookie,
 * prefixes routes as-needed, and keeps the default locale clean.
 */
export default createMiddleware(routing);

export const config = {
  // Explicitly match the root, locale-prefixed paths, and everything else
  // except API, Next internals, and files with an extension.
  matcher: ['/', '/(ar|en)/:path*', '/((?!api|_next|_vercel|.*\\..*).*)'],
};
