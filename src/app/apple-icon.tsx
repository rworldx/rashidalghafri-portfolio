import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

/**
 * Apple touch icon (home-screen / bookmarks). Same "RA." wordmark, larger and
 * with padding so it reads well as a rounded app tile. Next.js injects the
 * <link rel="apple-touch-icon"> automatically.
 */
export default function AppleIcon() {
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
            fontSize: 92,
            fontWeight: 700,
            letterSpacing: '-0.04em',
            fontFamily: 'sans-serif',
          }}
        >
          RA
        </span>
        <span style={{ color: '#2f5bea', fontSize: 92, fontWeight: 700 }}>.</span>
      </div>
    </div>,
    size,
  );
}
