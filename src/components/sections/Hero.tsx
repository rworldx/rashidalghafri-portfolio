'use client';

import type { CSSProperties } from 'react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { ArrowRight, Download } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { site } from '@content/site';
import { proof } from '@content/proof';
import { pick } from '@/lib/localized';
import { Container } from '@/components/layout/Container';
import { TextReveal } from '@/components/motion/TextReveal';
import { StatusDot } from '@/components/ui/StatusDot';
import { buttonVariants } from '@/components/ui/Button';
import { Magnetic } from '@/components/ui/Magnetic';
import { cn } from '@/lib/cn';

/**
 * The opening frame — editorial, not a landing page.
 *
 * The name is set at poster scale and the portrait is a real photograph at real
 * size, because on a personal portfolio the person IS the brand: an award-shelf
 * of portfolio sites all open the same way, with the maker's name enormous and
 * their face beside it, and they do it because it works. A face and a name at
 * scale is a stronger opening than any abstract graphic.
 *
 * The ambient WebGL that used to live here has moved to <FalajJourney>, where
 * it gets a whole pinned section and can actually be seen. Splitting the 3D
 * budget between a faint hero backdrop and a real scene meant neither landed.
 *
 * The entrance is CSS, not Framer: this is the LCP text, and it must not wait
 * on a lazily-loaded animation bundle.
 */
export function Hero() {
  const t = useTranslations('hero');
  const locale = useLocale();
  const isEnglish = locale === 'en';

  const name = pick(site.displayName, locale);
  // The family name takes the italic cut and stays grouped, so it never breaks
  // across a line mid-name. Arabic has no true italic and the Thmanyah display
  // face ships none, so emphasis is Latin-only by design.
  const emphasis = isEnglish ? name.split(' ').slice(1).join(' ') : undefined;

  // Two figures only. The full record is one section below; a hero that lists
  // four statistics has stopped being a hero.
  const headline = proof.slice(0, 2);

  return (
    <section className="relative overflow-hidden pb-phi-3 pt-28 sm:pt-32 lg:pb-phi-4 lg:pt-24">
      {/* The origin cap: where the page's spine begins. */}
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
        <p className="hero-in force-ltr mb-phi inline-flex items-center gap-2.5 rounded-full border border-border bg-surface/70 py-2 pe-4 ps-3 font-mono text-2xs uppercase tracking-[0.12em] text-text-muted backdrop-blur">
          <StatusDot />
          {pick(site.status, locale)}
        </p>

        <div className="grid items-end gap-phi-2 lg:grid-cols-[1.35fr_1fr] lg:gap-phi-3">
          <div className="order-2 lg:order-1">
            <TextReveal
              as="h1"
              text={name}
              emphasis={emphasis}
              delay={0.1}
              className="display-hero text-text"
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

          {/*
            The portrait. Duotone-free and uncropped at the face — a portfolio
            headshot that has been art-directed into abstraction stops doing the
            one job it has. The accent wash sits *behind* it, never over it.
          */}
          <div
            className="hero-in order-1 lg:order-2"
            style={{ '--d': '120ms' } as CSSProperties}
          >
            <div className="relative mx-auto w-full max-w-[22rem] lg:max-w-none">
              <div
                aria-hidden
                className="absolute -inset-6 -z-10 rounded-full bg-accent/12 blur-3xl"
              />
              <div className="relative overflow-hidden rounded-xl border border-border bg-surface-2 shadow-lift">
                <Image
                  src={site.portrait ?? '/images/portrait.jpg'}
                  alt={`${site.name}, ${pick(site.role, locale)}`}
                  width={720}
                  height={900}
                  priority
                  sizes="(min-width: 1024px) 34vw, 80vw"
                  className="aspect-[4/5] w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Two figures, on the same baseline as the fold. */}
        <dl className="hero-in mt-phi-2 flex flex-wrap gap-x-phi-3 gap-y-6 border-t border-border pt-8 lg:mt-phi-3"
          style={{ '--d': '380ms' } as CSSProperties}
        >
          {headline.map((p) => (
            // `flex-col-reverse` so the FIGURE reads first while <dt> still
            // precedes its <dd> in the DOM, as the spec requires. On a plain
            // block wrapper an `order` utility does nothing at all, which is
            // how the labels ended up sitting above the numbers.
            <div key={p.label.en} className="flex flex-col-reverse">
              <dt className="mt-1 text-sm text-text-muted">{pick(p.label, locale)}</dt>
              <dd className="tnum display-4 text-accent">{pick(p.value, locale)}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
