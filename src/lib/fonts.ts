import {
  Space_Grotesk,
  Inter,
  JetBrains_Mono,
  IBM_Plex_Sans_Arabic,
  Tajawal,
} from 'next/font/google';

/**
 * Self-hosted via next/font (build-time download, no runtime external request,
 * no FOUT). Each font exposes a CSS variable consumed by tailwind.config.ts.
 *
 * Roles (PRD §3.2):
 *  - display : Space Grotesk  (confident grotesque for headings/hero)
 *  - sans    : Inter          (body / UI)
 *  - mono    : JetBrains Mono  (eyebrows, indices, metadata, code, graph labels)
 *  - Arabic  : IBM Plex Sans Arabic (body) + Tajawal (display)
 */
export const fontDisplay = Space_Grotesk({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
});

export const fontSans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const fontMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-mono',
  display: 'swap',
});

export const fontSansAr = IBM_Plex_Sans_Arabic({
  subsets: ['arabic'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans-ar',
  display: 'swap',
});

export const fontDisplayAr = Tajawal({
  subsets: ['arabic'],
  weight: ['500', '700', '800'],
  variable: '--font-display-ar',
  display: 'swap',
});

/** All font variables, joined for the <html> className. */
export const fontVariables = [
  fontDisplay.variable,
  fontSans.variable,
  fontMono.variable,
  fontSansAr.variable,
  fontDisplayAr.variable,
].join(' ');
