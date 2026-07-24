'use client';

import type { CSSProperties } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { ArrowRight, Download } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { site } from '@content/site';
import { pick } from '@/lib/localized';
import { Container } from '@/components/layout/Container';
import { TextReveal } from '@/components/motion/TextReveal';
import { HeroBackground } from '@/components/three/HeroBackground';
import { StatusDot } from '@/components/ui/StatusDot';
import { buttonVariants } from '@/components/ui/Button';
import { Magnetic } from '@/components/ui/Magnetic';
import { cn } from '@/lib/cn';

/**
 * The opening thesis. One orchestrated load rather than scattered effects: the
 * field settles, the name rises out of a clip word by word, then the supporting
 * lines and the two things a visitor actually came to do.
 *
 * Four text elements, no more — status, name, what he does, the actions. The
 * credentials strip that would normally get stuffed in here lives in the
 * section directly below, where it can be read instead of skimmed.
 *
 * The field is his real graph (projects, skills, recognition) rendered as a
 * sphere, so the one decorative-looking thing on the page is actually data.
 */
export function Hero() {
  const t = useTranslations('hero');
  const locale = useLocale();
  const isEnglish = locale === 'en';

  const name = pick(site.displayName, locale);
  // The family name takes the italic cut. Arabic has no true italic and the
  // Thmanyah display face ships none, so emphasis is Latin-only by design.
  const emphasis = isEnglish ? name.split(' ').slice(1).join(' ') : undefined;

  return (
    <section className="relative flex min-h-[100dvh] items-center overflow-hidden pb-phi-3 pt-28 sm:pt-32">
      {/*
        The field. Centred and masked on small screens so it never competes
        with the type; on large screens it sits on the side opposite the
        headline. It is inset rather than bled off the edge so the whole
        sphere stays on screen, and the camera reframes to whatever box it
        gets, so nothing is cropped at any width or in RTL.
      */}
      <div
        aria-hidden
        className={cn(
          'pointer-events-none absolute inset-0 -z-10',
          'opacity-60 sm:opacity-75 lg:pointer-events-auto lg:opacity-100',
          '[mask-image:radial-gradient(ellipse_at_center,black_55%,transparent_85%)]',
          'lg:inset-y-8 lg:end-[2%] lg:start-[46%]',
        )}
      >
        <HeroBackground className="size-full" />
      </div>

      <Container className="relative">
        <div className="lg:grid lg:grid-cols-[1.618fr_1fr] lg:items-center lg:gap-phi-2">
          <div className="max-w-[38rem]">
            <p className="hero-in force-ltr mb-8 inline-flex items-center gap-2.5 rounded-full border border-border bg-surface/70 py-2 pe-4 ps-3 font-mono text-2xs uppercase tracking-[0.12em] text-text-muted backdrop-blur">
              <StatusDot />
              {pick(site.status, locale)}
            </p>

            <TextReveal
              as="h1"
              text={name}
              emphasis={emphasis}
              delay={0.1}
              className="display-1 text-text"
            />

            <p
              className="hero-in mt-5 font-mono text-sm uppercase tracking-[0.14em] text-accent sm:text-[0.8125rem]"
              style={{ '--d': '190ms' } as CSSProperties}
            >
              {pick(site.role, locale)}
            </p>

            <p
              className="hero-in measure-tight mt-phi text-lg text-text-muted sm:text-xl"
              style={{ '--d': '250ms' } as CSSProperties}
            >
              {pick(site.tagline, locale)}
            </p>

            <div
              className="hero-in mt-phi-2 flex flex-wrap items-center gap-3"
              style={{ '--d': '320ms' } as CSSProperties}
            >
              <Magnetic>
                <Link
                  href="/projects"
                  className={cn(buttonVariants({ variant: 'primary', size: 'lg' }), 'group')}
                >
                  {t('viewWork')}
                  <ArrowRight
                    strokeWidth={1.75}
                    aria-hidden
                    className="size-4 transition-transform duration-quick ease-out group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5"
                  />
                </Link>
              </Magnetic>
              <a
                href={site.cvPath}
                download
                className={cn(buttonVariants({ variant: 'secondary', size: 'lg' }))}
              >
                <Download strokeWidth={1.75} aria-hidden className="size-4" />
                {t('downloadCv')}
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
