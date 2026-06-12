import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { siteConfig } from '@/config/site.config';
import './globals.css';

/** metadataBase resolves relative OG/canonical URLs (PRD §11). */
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
};

/**
 * Root layout is intentionally a passthrough. The real <html>/<body>, fonts,
 * `lang`/`dir`, and providers live in app/[locale]/layout.tsx because they
 * depend on the resolved locale (PRD §6.3/§6.4). This file exists only because
 * Next.js requires a root layout to cover non-localized routes (api, sitemap).
 */
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
