import { ImageResponse } from 'next/og';
import { siteConfig } from '@/config/site.config';

export const runtime = 'edge';
export const alt = siteConfig.ogImageAlt;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/**
 * Default OG image for the whole site (PRD §11).
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
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '80px',
        background: '#0a0e14',
        color: '#eceff4',
      }}
    >
      {/*
        The "RA." wordmark, the same one the favicon and the Apple touch icon
        draw. WhatsApp and Snapchat used to show it because, with no og:image
        to obey, they fell back to the touch icon. Naming a card without the
        mark on it would have taken that away. It leads here instead, so the
        icon, the tile, the navbar and the share card are one identity.
      */}
      <div style={{ display: 'flex', alignItems: 'baseline', marginBottom: 56 }}>
        <span
          style={{
            color: '#eceff4',
            fontSize: 76,
            fontWeight: 700,
            letterSpacing: '-0.04em',
          }}
        >
          RA
        </span>
        <span style={{ color: '#5b82ff', fontSize: 76, fontWeight: 700 }}>.</span>
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          color: '#5b82ff',
          fontSize: 28,
        }}
      >
        <div style={{ width: 14, height: 14, borderRadius: 99, background: '#7ce0c4' }} />
        available for opportunities · 2026
      </div>
      <div
        style={{ fontSize: 88, fontWeight: 700, marginTop: 20, letterSpacing: '-0.03em' }}
      >
        {siteConfig.name}
      </div>
      <div style={{ fontSize: 36, color: '#9aa5b8', marginTop: 12 }}>
        Software Engineer · Full-Stack · AI
      </div>
    </div>,
    size,
  );
}
