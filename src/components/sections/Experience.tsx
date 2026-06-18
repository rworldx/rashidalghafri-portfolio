'use client';

import { useLocale, useTranslations } from 'next-intl';
import { experience } from '@content/experience';
import { pick } from '@/lib/localized';
import { Container } from '@/components/layout/Container';
import { Reveal } from '@/components/motion/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card } from '@/components/ui/Card';

/** Experience & leadership (roles/activities, excluding education). On /work. */
export function Experience() {
  const t = useTranslations('experience');
  const locale = useLocale();
  const items = experience
    .filter((e) => e.kind !== 'education')
    .sort((a, b) => b.order - a.order);

  return (
    <section className="py-20">
      <Container>
        <SectionHeading eyebrow={t('eyebrow')} title={t('title')} className="mb-10" />
        <div className="grid gap-5 sm:grid-cols-2">
          {items.map((item, i) => (
            <Reveal key={item.id} delay={i * 0.05}>
              <Card className="flex h-full flex-col p-6">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-display text-lg font-semibold text-text">
                    {pick(item.title, locale)}
                  </h3>
                  <span className="font-mono text-xs text-text-muted">{item.period}</span>
                </div>
                <p className="mt-1 text-sm text-accent">{pick(item.org, locale)}</p>
                {item.bullets && (
                  <ul className="mt-3 space-y-2">
                    {item.bullets.map((b, j) => (
                      <li key={j} className="flex gap-2 text-sm text-text-muted">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-text-muted" />
                        <span>{pick(b, locale)}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </Card>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
