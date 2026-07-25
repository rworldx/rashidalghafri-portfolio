import type { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { routing, isRtl, hasLocale } from '@/i18n/routing';
import { fontVariables } from '@/lib/fonts';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { MotionProvider } from '@/components/motion/MotionProvider';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { FlowRail } from '@/components/flow/FlowRail';

/** Pre-render every locale at build time (PRD §5.2 static-first). */
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();

  // Enable static rendering for this locale.
  setRequestLocale(locale);
  const messages = await getMessages();
  const t = await getTranslations('nav');

  return (
    <html
      lang={locale}
      dir={isRtl(locale) ? 'rtl' : 'ltr'}
      className={fontVariables}
      suppressHydrationWarning
    >
      <body id="top">
        {/*
          Scroll-reveals set their start state inline, which would leave every
          section blank if scripts never run. This restores them for no-JS
          readers and headless renderers.

          It lives at the top of <body>, not in a manual <head>: the App Router
          owns the document head, and rendering one by hand desynchronises the
          server and client trees (React reports it as a hydration mismatch).
        */}
        <noscript>
          {/* eslint-disable-next-line react/no-danger */}
          <style
            dangerouslySetInnerHTML={{
              __html: '[data-reveal]{opacity:1!important;transform:none!important}',
            }}
          />
        </noscript>
        <ThemeProvider>
          <NextIntlClientProvider messages={messages}>
            <MotionProvider>
              <a href="#main" className="skip-link">
                {t('skipToContent')}
              </a>
              <Navbar />
              {/*
                `relative` is load-bearing: the flow rail is absolutely
                positioned against <main> and measures its full height to map
                scroll progress. Removing it would collapse the rail onto the
                viewport instead of the document.
              */}
              <main id="main" className="relative">
                <FlowRail />
                {children}
              </main>
              <Footer />
            </MotionProvider>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
