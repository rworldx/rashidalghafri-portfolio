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
 * The source.
 *
 * This is where the page's spine begins, so the hero renders the rail's origin
 * cap rather than a branch node — every section below descends from here. That
 * is the entire concept stated structurally and never in words.
 *
 * FOUR text elements, hard limit: one small label, the name, one sentence, the
 * two things a visitor actually came to do. The role and the availability are
 * deliberately merged into the single label rather than taking a line each —
 * a hero is one moment, not a summary. Credentials live in the section below,
 * where they can be read instead of skimmed.
 *
 * The load is ONE orchestrated sequence, not scattered effects: the name rises
 * word by word out of a clip, then the sentence and the actions follow it. The
 * entrance is CSS, not Framer, because this is the largest text on the page and
 * holding it behind a lazily-loaded animation bundle would delay the LCP.
 */
export function Hero() {
  const t = useTranslations('hero');
  const locale = useLocale();
  const isEnglish = locale === 'en';

  const name = pick(site.displayName, locale);
  // The family name takes the italic cut, and stays grouped so it never breaks
  // across a line mid-name. Arabic has no true italic and the Thmanyah display
  // face ships none, so emphasis is Latin-only by design.
  const emphasis = isEnglish ? name.split(' ').slice(1).join(' ') : undefined;

  return (
    <section className="relative flex min-h-[100dvh] items-center overflow-hidden pb-phi-3 pt-28 sm:pt-32 lg:pt-24">
      {/*
        The network. Centred and masked on small screens so it never competes
        with the type; on large screens it sits opposite the headline. Inset
        rather than bled off the edge so the whole thing stays on screen, and
        the camera reframes to whatever box it gets — nothing is cropped at any
        width, or in RTL.
      */}
      <div
        aria-hidden
        className={cn(
          'pointer-events-none absolute inset-0 -z-10',
          'opacity-55 sm:opacity-70 lg:pointer-events-auto lg:opacity-100',
          '[mask-image:radial-gradient(ellipse_at_center,black_52%,transparent_84%)]',
          'lg:inset-y-4 lg:end-[1%] lg:start-[44%]',
        )}
      >
        <HeroBackground className="size-full" />
      </div>

      {/*
        The origin cap: where the spine starts. A ring around a filled core,
        slightly larger than a branch node and always live — the source is
        never "unread". Offset below the floating nav so it is not hidden
        behind the chrome on first paint.
      */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-24 z-0 sm:top-28"
      >
        <div className="mx-auto w-full max-w-shell">
          <div className="relative">
            <span className="absolute start-5 top-0 size-[13px] -translate-x-1/2 rounded-full border border-accent/60 sm:start-8 lg:start-12 rtl:translate-x-1/2" />
            <span className="absolute start-5 top-[4px] size-[5px] -translate-x-1/2 rounded-full bg-accent sm:start-8 lg:start-12 rtl:translate-x-1/2" />
          </div>
        </div>
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
              className="hero-in measure-tight mt-phi text-lg text-text-muted sm:text-xl"
              style={{ '--d': '220ms' } as CSSProperties}
            >
              {pick(site.tagline, locale)}
            </p>

            <div
              className="hero-in mt-phi-2 flex flex-wrap items-center gap-3"
              style={{ '--d': '300ms' } as CSSProperties}
            >
              <Magnetic>
                <Link
                  href="/projects"
                  className={cn(
                    buttonVariants({ variant: 'primary', size: 'lg' }),
                    'group',
                  )}
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
