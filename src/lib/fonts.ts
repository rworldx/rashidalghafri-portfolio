import {
  Archivo,
  Bodoni_Moda,
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
 *  - serif   : Bodoni Moda, ITALIC. The museum voice — used for the gallery
 *    headline, exhibit titles and the credential row, and nowhere else.
 *
 *    Serif is normally the wrong reflex ("creative brief = serif" is the most
 *    over-fired instinct there is), so it needs a reason. Here it has one: the
 *    site is staged as a gallery, and a high-contrast didone is the actual
 *    typographic language of exhibition walls and catalogue plates. Bodoni was
 *    chosen over Instrument Serif and Fraunces specifically because those two
 *    are the default display serifs of every generated page on the web right
 *    now; Bodoni's thin-to-thick contrast is sharper and reads as curated
 *    rather than trendy.
 *
 *  - display : Archivo, on its `wdth` axis. Structural headlines. Set slightly
 *    NARROWED (wdth ~92) rather than at default width — a narrowed grotesque
 *    reads as engineered and lets a long name hold a single line at large
 *    sizes, which is what the Flow layout needs. Archivo was chosen over the
 *    more obviously characterful Bricolage Grotesque for one hard reason:
 *    Bricolage ships NO italic, and emphasis inside a headline must be the
 *    same family's own italic cut, never a second family injected for effect.
 *  - sans    : Host Grotesk. Body and UI. Keeping display and body in two
 *    different grotesques (one narrowed and gritty, one neutral and open) is
 *    what creates hierarchy here — not size alone.
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

export const fontSerif = Bodoni_Moda({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
});

export const fontDisplay = Archivo({
  subsets: ['latin'],
  // Variable width. The narrowed cut is applied per-class in globals.css via
  // font-variation-settings, so one loaded face serves every display size.
  axes: ['wdth'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
});

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
  fontSerif.variable,
  fontDisplay.variable,
  fontSans.variable,
  fontMono.variable,
  fontScript.variable,
  fontScriptAr.variable,
  fontSansAr.variable,
  fontDisplayAr.variable,
].join(' ');
