'use client';

import { useLocale, useTranslations } from 'next-intl';
import { skills, exploring } from '@content/skills';
import { pick } from '@/lib/localized';
import { Container } from '@/components/layout/Container';
import { Reveal } from '@/components/motion/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card } from '@/components/ui/Card';
import { Tag } from '@/components/ui/Tag';

/** Skills grouped by category (PRD FR-? home / about). Data-driven. */
export function Skills() {
  const t = useTranslations('skills');
  const locale = useLocale();

  return (
    <section className="py-20">
      <Container>
        <SectionHeading eyebrow={t('eyebrow')} title={t('title')} className="mb-10" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((group, i) => (
            <Reveal key={group.id} delay={i * 0.05}>
              <Card className="h-full p-6">
                <p className="font-mono text-xs uppercase tracking-widest text-text-muted">
                  {pick(group.label, locale)}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <Tag key={item}>{item}</Tag>
                  ))}
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.1}>
          <p className="mt-8 font-mono text-sm text-text-muted">{pick(exploring, locale)}</p>
        </Reveal>
      </Container>
    </section>
  );
}
