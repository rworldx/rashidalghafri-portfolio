'use client';

import { useLocale, useTranslations } from 'next-intl';
import { graph } from '@content/graph';
import { aboutIntro, aboutStory } from '@content/about';
import type { Locale } from '@/i18n/routing';
import { pick } from '@/lib/localized';
import { Container } from '@/components/layout/Container';
import { Reveal } from '@/components/motion/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card } from '@/components/ui/Card';
import { GraphSignature } from '@/components/graph/GraphSignature';

/** About narrative (origin story) + interactive connection graph (PRD FR-6, Addendum A.2). */
export function About() {
  const t = useTranslations('about');
  const locale = useLocale();
  const story = aboutStory[locale as Locale] ?? aboutStory.en;

  return (
    <section className="py-20">
      <Container>
        <SectionHeading eyebrow={t('eyebrow')} title={t('title')} className="mb-10" />

        <div className="grid items-start gap-10 lg:grid-cols-2">
          <Reveal className="space-y-5">
            <p className="text-xl text-text">{pick(aboutIntro, locale)}</p>
            {story.map((para, i) => (
              <p key={i} className="text-text-muted">
                {para}
              </p>
            ))}
          </Reveal>

          <Reveal delay={0.1} className="lg:sticky lg:top-24">
            <Card className="overflow-hidden p-5">
              <div className="flex items-center justify-between">
                <p className="font-mono text-xs uppercase tracking-widest text-text-muted">
                  {t('graphTitle')}
                </p>
                <p className="font-mono text-xs text-text-muted">{t('graphHint')}</p>
              </div>
              <div className="mt-3 h-[360px] w-full">
                <GraphSignature data={graph} className="h-full w-full" />
              </div>
            </Card>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
