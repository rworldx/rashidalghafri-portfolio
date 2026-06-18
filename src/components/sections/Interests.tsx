'use client';

import { useLocale, useTranslations } from 'next-intl';
import {
  Film,
  Headphones,
  Clapperboard,
  ChefHat,
  Languages,
  Plane,
  Camera,
  type LucideIcon,
} from 'lucide-react';
import { interests } from '@content/about';
import { personalStats, places } from '@content/personal';
import { pick } from '@/lib/localized';
import { Container } from '@/components/layout/Container';
import { Reveal } from '@/components/motion/Reveal';
import { AnimatedCounter } from '@/components/motion/AnimatedCounter';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card } from '@/components/ui/Card';
import { Tag } from '@/components/ui/Tag';

/** Maps the icon name stored in content to a lucide component. */
const icons: Record<string, LucideIcon> = {
  Film,
  Headphones,
  Clapperboard,
  ChefHat,
  Languages,
  Plane,
  Camera,
};

/** "Beyond the code" interest grid (Addendum A.3). */
export function Interests() {
  const t = useTranslations('about');
  const locale = useLocale();

  return (
    <section className="py-20">
      <Container>
        <SectionHeading
          eyebrow={t('interestsEyebrow')}
          title={t('interestsTitle')}
          className="mb-10"
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {interests.map((interest, i) => {
            const Icon = icons[interest.icon] ?? Film;
            return (
              <Reveal key={interest.icon} delay={i * 0.05}>
                <Card className="flex h-full items-center gap-4 p-5">
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-accent-soft text-accent">
                    <Icon className="h-5 w-5" />
                  </span>
                  <p className="text-text-muted">{pick(interest.label, locale)}</p>
                </Card>
              </Reveal>
            );
          })}
        </div>

        {/* By the numbers + places — light personal colour, not pro metrics. */}
        <div className="mt-12 grid gap-8 lg:grid-cols-[1.2fr_1fr]">
          <Reveal>
            <p className="mb-4 font-mono text-xs uppercase tracking-widest text-text-muted">
              {t('numbersTitle')}
            </p>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {personalStats.map((s) => (
                <div key={s.label.en} className="rounded border border-border bg-surface-2 p-4">
                  <p className="font-display text-3xl font-semibold text-text">
                    <AnimatedCounter value={s.value} />
                  </p>
                  <p className="mt-1 font-mono text-xs text-text-muted">{pick(s.label, locale)}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mb-4 font-mono text-xs uppercase tracking-widest text-text-muted">
              {t('placesTitle')}
            </p>
            <div className="flex flex-wrap gap-2">
              {places.map((p) => (
                <Tag
                  key={p.name.en}
                  className={p.home ? 'border-accent/40 text-accent' : undefined}
                >
                  {pick(p.name, locale)}
                </Tag>
              ))}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
