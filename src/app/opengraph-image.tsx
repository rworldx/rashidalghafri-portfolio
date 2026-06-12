import { ImageResponse } from 'next/og';
import { siteConfig } from '@/config/site.config';

export const runtime = 'edge';
export const alt = siteConfig.ogImageAlt;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/** Default OG image — on-brand ink background with name + role (PRD §11). */
export default function OgImage() {
  return new ImageResponse(
    (
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
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: '#5b82ff', fontSize: 28 }}>
          <div style={{ width: 14, height: 14, borderRadius: 99, background: '#7ce0c4' }} />
          available for opportunities · 2026
        </div>
        <div style={{ fontSize: 96, fontWeight: 700, marginTop: 24, letterSpacing: '-0.03em' }}>
          {siteConfig.name}
        </div>
        <div style={{ fontSize: 36, color: '#9aa5b8', marginTop: 12 }}>
          Software Engineer · Full-Stack · AI
        </div>
      </div>
    ),
    size,
  );
}
