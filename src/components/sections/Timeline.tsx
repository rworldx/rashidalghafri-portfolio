'use client';

import { useLocale, useTranslations } from 'next-intl';
import { experience } from '@content/experience';
import { pick } from '@/lib/localized';
import { Container } from '@/components/layout/Container';
import { Reveal } from '@/components/motion/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';

/** Education + leadership timeline (PRD FR-6). Sorted most-recent first. */
export function Timeline() {
  const t = useTranslations('about');
  const locale = useLocale();
  const items = [...experience].sort((a, b) => b.order - a.order);

  return (
    <section className="py-20">
      <Container>
        <SectionHeading eyebrow={t('eyebrow')} title={t('educationTitle')} className="mb-10" />
        <ol className="relative ms-3 border-s border-border">
          {items.map((item, i) => (
            <Reveal as="li" key={item.id} delay={i * 0.05} className="relative ms-6 pb-10 last:pb-0">
              <span className="absolute -start-[31px] top-1 h-3 w-3 rounded-full border-2 border-bg bg-accent" />
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-display text-xl font-semibold text-text">
                  {pick(item.title, locale)}
                </h3>
                <span className="font-mono text-xs text-text-muted">{item.period}</span>
              </div>
              <p className="mt-1 text-sm text-accent">{pick(item.org, locale)}</p>
              {item.bullets && (
                <ul className="mt-3 space-y-2">
                  {item.bullets.map((b, j) => (
                    <li key={j} className="flex gap-2 text-text-muted">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-text-muted" />
                      <span>{pick(b, locale)}</span>
                    </li>
                  ))}
                </ul>
              )}
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
