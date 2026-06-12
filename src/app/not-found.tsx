import Link from 'next/link';

/**
 * Root not-found for routes outside any locale segment. Renders its own
 * <html>/<body> because the root layout is a passthrough (locale layout owns
 * the real shell). Localized 404s live in app/[locale]/not-found.tsx.
 */
export default function RootNotFound() {
  return (
    <html lang="en">
      <body
        style={{
          display: 'flex',
          minHeight: '100vh',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          fontFamily: 'system-ui, sans-serif',
          background: '#0a0e14',
          color: '#eceff4',
          textAlign: 'center',
          gap: '0.5rem',
        }}
      >
        <h1 style={{ fontSize: '2rem', margin: 0 }}>404 — Page not found</h1>
        <Link href="/" style={{ color: '#5b82ff' }}>
          Back home
        </Link>
      </body>
    </html>
  );
}
