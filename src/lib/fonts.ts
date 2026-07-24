import {
  Host_Grotesk,
  Geist_Mono,
  Nothing_You_Could_Do,
  Aref_Ruqaa,
} from 'next/font/google';
import localFont from 'next/font/local';

/**
 * Self-hosted at build time (next/font) — no runtime external request, no FOUT.
 * Each face exposes a CSS variable consumed by tailwind.config.ts.
 *
 * Roles:
 *  - display + sans : Host Grotesk. One Latin family carries the whole page;
 *    hierarchy comes from weight, size and optical tracking rather than a
 *    second competing typeface. Its TRUE italic is why it beats Geist here —
 *    emphasis inside a headline must be the same family, never an injected one.
 *  - mono   : Geist Mono. The only real contrast axis on the page (grotesque vs
 *    monospace), reserved for metadata, indices, codes and figures.
 *  - script : Nothing You Could Do (Latin) / Aref Ruqaa (Arabic). Used in
 *    exactly ONE place site-wide, the signature closing the About story.
 *    Repeating it anywhere else would make it costume.
 *
 *    Arabic gets a real Arabic hand rather than a Latin script face: ruqʿah is
 *    the script Arabic is genuinely handwritten in, so the signature reads as a
 *    signature to an Arabic reader instead of as a Latin font that happens to
 *    have been pointed at Arabic text.
 *  - Arabic : Thmanyah Sans (body/UI) + Thmanyah Serif Display (headings),
 *    self-hosted from src/fonts/thmanyah. Gives the Arabic side its own
 *    editorial voice instead of a neutral fallback.
 */

export const fontSans = Host_Grotesk({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  style: ['normal', 'italic'],
});

export const fontMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const fontScript = Nothing_You_Could_Do({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-script',
  display: 'swap',
});

export const fontScriptAr = Aref_Ruqaa({
  subsets: ['arabic'],
  weight: '400',
  variable: '--font-script-ar',
  display: 'swap',
});

export const fontSansAr = localFont({
  variable: '--font-sans-ar',
  display: 'swap',
  src: [
    {
      path: '../fonts/thmanyah/thmanyahsans-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/thmanyah/thmanyahsans-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    { path: '../fonts/thmanyah/thmanyahsans-Bold.woff2', weight: '700', style: 'normal' },
  ],
});

export const fontDisplayAr = localFont({
  variable: '--font-display-ar',
  display: 'swap',
  src: [
    {
      path: '../fonts/thmanyah/thmanyahserifdisplay-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/thmanyah/thmanyahserifdisplay-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../fonts/thmanyah/thmanyahserifdisplay-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
});

/** All font variables, joined for the <html> className. */
export const fontVariables = [
  fontSans.variable,
  fontMono.variable,
  fontScript.variable,
  fontScriptAr.variable,
  fontSansAr.variable,
  fontDisplayAr.variable,
].join(' ');
