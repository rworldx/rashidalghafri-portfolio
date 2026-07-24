import Link from 'next/link';

/**
 * Root not-found for routes outside any locale segment. Renders its own
 * <html>/<body> because the root layout is a passthrough (the locale layout
 * owns the real shell), so it cannot use the design tokens and has to inline
 * its own. Localized 404s live in app/[locale]/not-found.tsx.
 */
export default function RootNotFound() {
  return (
    <html lang="en">
      <body
        style={{
          display: 'flex',
          minHeight: '100dvh',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          fontFamily: 'system-ui, sans-serif',
          background: '#0f1116',
          color: '#f1f2f5',
          textAlign: 'center',
          gap: '1rem',
          margin: 0,
          padding: '2rem',
        }}
      >
        <h1
          style={{
            fontSize: 'clamp(1.75rem, 5vw, 2.5rem)',
            margin: 0,
            letterSpacing: '-0.03em',
          }}
        >
          404. Page not found.
        </h1>
        <Link href="/" style={{ color: '#8aa4ff', textUnderlineOffset: '4px' }}>
          Back home
        </Link>
      </body>
    </html>
  );
}
