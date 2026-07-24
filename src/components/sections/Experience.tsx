'use client';

import { useLocale, useTranslations } from 'next-intl';
import { experience } from '@content/experience';
import { pick } from '@/lib/localized';
import { Container, sectionY } from '@/components/layout/Container';
import { Reveal } from '@/components/motion/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';

/**
 * Roles and activities, excluding the degree itself (that lives on /resume).
 * Laid out as records with the period on the lead column, so the run reads
 * chronologically at a glance instead of as a wall of equal cards.
 */
export function Experience() {
  const t = useTranslations('experience');
  const locale = useLocale();
  const items = experience
    .filter((e) => e.kind !== 'education')
    .sort((a, b) => b.order - a.order);

  return (
    <section className={sectionY}>
      <Container>
        <SectionHeading
          title={t('title')}
          emphasis={t('emphasis')}
          className="mb-phi-2"
        />

        <ol className="border-t border-border-strong">
          {items.map((item, i) => (
            <Reveal
              as="li"
              key={item.id}
              delay={i * 0.05}
              distance={14}
              className="grid gap-x-phi-2 gap-y-3 border-b border-border py-8 sm:grid-cols-[minmax(8rem,1fr)_2.618fr]"
            >
              <p className="tnum force-ltr font-mono text-2xs uppercase tracking-[0.14em] text-text-faint sm:pt-2">
                {item.period}
              </p>
              <div>
                <h3 className="display-4 text-text">{pick(item.title, locale)}</h3>
                <p className="mt-2 text-sm text-text-muted">{pick(item.org, locale)}</p>
                {item.bullets && (
                  <ul className="measure mt-4 space-y-2.5">
                    {item.bullets.map((b, j) => (
                      <li key={j} className="flex gap-3 text-text-muted">
                        <span
                          aria-hidden
                          className="mt-[0.65em] size-1 shrink-0 rounded-full bg-border-strong"
                        />
                        <span>{pick(b, locale)}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
