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
import { pick } from '@/lib/localized';
import { Container } from '@/components/layout/Container';
import { Reveal } from '@/components/motion/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card } from '@/components/ui/Card';

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
      </Container>
    </section>
  );
}
