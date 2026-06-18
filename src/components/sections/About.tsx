'use client';

import { useLocale, useTranslations } from 'next-intl';
import { aboutIntro, aboutStory } from '@content/about';
import type { Locale } from '@/i18n/routing';
import { pick } from '@/lib/localized';
import { Container } from '@/components/layout/Container';
import { Reveal } from '@/components/motion/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { PortraitCard } from '@/components/ui/PortraitCard';

/** About narrative (origin story) + portrait (PRD FR-6, Addendum A.2). */
export function About() {
  const t = useTranslations('about');
  const locale = useLocale();
  const story = aboutStory[locale as Locale] ?? aboutStory.en;

  return (
    <section className="py-20">
      <Container>
        <SectionHeading eyebrow={t('eyebrow')} title={t('title')} className="mb-10" />

        <div className="grid items-start gap-12 lg:grid-cols-[1fr_360px]">
          <Reveal className="space-y-5">
            <p className="text-xl text-text">{pick(aboutIntro, locale)}</p>
            {story.map((para, i) => (
              <p key={i} className="text-text-muted">
                {para}
              </p>
            ))}
          </Reveal>

          <Reveal delay={0.1} className="lg:sticky lg:top-24">
            <PortraitCard />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
