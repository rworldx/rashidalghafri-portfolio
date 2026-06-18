'use client';

import { useTranslations } from 'next-intl';
import { Container } from '@/components/layout/Container';
import { Reveal } from '@/components/motion/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card } from '@/components/ui/Card';
import { InteractiveGraph } from '@/components/graph/InteractiveGraph';

/** Signature connection graph (PRD §3.5) — interactive, draggable. About page. */
export function Connections() {
  const t = useTranslations('about');

  return (
    <section className="py-20">
      <Container>
        <SectionHeading
          eyebrow={t('connectionsEyebrow')}
          title={t('graphTitle')}
          className="mb-8"
        />
        <Reveal>
          <Card className="overflow-hidden p-5">
            <p className="mb-3 font-mono text-xs text-text-muted">{t('graphHint')}</p>
            <div className="h-[420px] w-full">
              <InteractiveGraph className="h-full w-full" />
            </div>
          </Card>
        </Reveal>
      </Container>
    </section>
  );
}
