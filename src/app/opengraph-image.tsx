import { ImageResponse } from 'next/og';
import { siteConfig } from '@/config/site.config';

export const runtime = 'edge';
export const alt = siteConfig.ogImageAlt;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/**
 * Default OG image for the whole site (PRD §11).
 *
 * The "RA." wordmark alone, on the paper ground, in the same shapes the
 * favicon and the Apple touch icon draw. Rashid saw the touch icon standing in
 * as WhatsApp's preview, liked it, and asked for that to be the card.
 *
 * So the card carries no name and no role. The platform already prints the
 * title and the description beside the picture, and repeating them inside it
 * only competes with the mark. Colours are the brand tokens' resolved hex,
 * because a generated image cannot read CSS variables.
 *
 * Stays at the app ROOT on purpose. The locale middleware excludes
 * `opengraph-image` from its matcher (see middleware.ts), so `/opengraph-image`
 * is served directly and never rewritten. Moving this file into `[locale]`
 * makes `/en/opengraph-image` redirect to a path that no longer exists.
 *
 * Pages must NAME this image themselves — see `ogImage()` in lib/seo.ts. A
 * file-based image is attached only to the segment holding the file, and every
 * page lives under `[locale]`, so nothing here reaches them automatically.
 */
export default function OgImage() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#f6f5f1',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'baseline' }}>
        <span
          style={{
            color: '#15171c',
            fontSize: 300,
            fontWeight: 700,
            letterSpacing: '-0.04em',
            fontFamily: 'sans-serif',
          }}
        >
          RA
        </span>
        <span style={{ color: '#2f5bea', fontSize: 300, fontWeight: 700 }}>.</span>
      </div>
    </div>,
    size,
  );
}
