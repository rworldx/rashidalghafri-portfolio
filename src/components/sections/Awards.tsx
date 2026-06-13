'use client';

import { useLocale, useTranslations } from 'next-intl';
import { Award as AwardIcon } from 'lucide-react';
import { awards } from '@content/awards';
import { pick } from '@/lib/localized';
import { Container } from '@/components/layout/Container';
import { Reveal } from '@/components/motion/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

/** Honours & achievements (PRD FR-6). Sorted most-recent first. */
export function Awards() {
  const t = useTranslations('awards');
  const locale = useLocale();
  const sorted = [...awards].sort((a, b) => b.order - a.order);

  return (
    <section className="py-20">
      <Container>
        <SectionHeading eyebrow={t('eyebrow')} title={t('title')} className="mb-10" />
        <div className="grid gap-5 sm:grid-cols-2">
          {sorted.map((award, i) => (
            <Reveal key={award.id} delay={i * 0.05}>
              <Card className="flex h-full flex-col p-6">
                <div className="flex items-start justify-between gap-4">
                  <AwardIcon className="h-5 w-5 shrink-0 text-accent" />
                  <span className="font-mono text-xs text-text-muted">{award.date}</span>
                </div>
                <h3 className="mt-4 font-display text-xl font-semibold text-text">
                  {pick(award.title, locale)}
                </h3>
                {award.org && (
                  <p className="mt-1 text-sm text-accent">{pick(award.org, locale)}</p>
                )}
                {award.tag && (
                  <div className="mt-2">
                    <Badge tone="accent">{pick(award.tag, locale)}</Badge>
                  </div>
                )}
                <p className="mt-3 text-sm text-text-muted">{pick(award.description, locale)}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
