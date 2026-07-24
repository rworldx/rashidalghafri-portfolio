import { ImageResponse } from 'next/og';

// 96×96 (a multiple of 48) — Google's favicon guidance prefers 48px multiples.
export const size = { width: 96, height: 96 };
export const contentType = 'image/png';

/**
 * Generated favicon — the "RA." wordmark (matches the navbar): dark monogram
 * with the accent-blue dot, on the paper background. Colours are the brand
 * tokens' resolved hex (favicons can't read CSS variables). Next.js injects the
 * <link rel="icon"> for this automatically.
 */
export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#f6f5f1',
        borderRadius: 20,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'baseline' }}>
        <span
          style={{
            color: '#15171c',
            fontSize: 52,
            fontWeight: 700,
            letterSpacing: '-0.04em',
            fontFamily: 'sans-serif',
          }}
        >
          RA
        </span>
        <span style={{ color: '#2f5bea', fontSize: 52, fontWeight: 700 }}>.</span>
      </div>
    </div>,
    size,
  );
}
