'use client';

import { useTranslations } from 'next-intl';
import { graph } from '@content/graph';
import { Container } from '@/components/layout/Container';
import { Reveal } from '@/components/motion/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card } from '@/components/ui/Card';
import { GraphSignature } from '@/components/graph/GraphSignature';

/** About narrative + interactive connection graph (PRD FR-6). */
export function About() {
  const t = useTranslations('about');

  return (
    <section className="py-20">
      <Container>
        <SectionHeading eyebrow={t('eyebrow')} title={t('title')} className="mb-10" />
        <div className="grid items-start gap-10 lg:grid-cols-2">
          <Reveal className="space-y-5 text-lg text-text-muted">
            <p>{t('intro')}</p>
            <p>{t('focus')}</p>
          </Reveal>

          <Reveal delay={0.1}>
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
