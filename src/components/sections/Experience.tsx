'use client';

import { useLocale, useTranslations } from 'next-intl';
import { experience } from '@content/experience';
import { pick } from '@/lib/localized';
import { cn } from '@/lib/cn';
import { Reveal } from '@/components/motion/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { FlowBranch } from '@/components/flow/FlowBranch';

/** Arabic script present? Decides bidi handling for the period column. */
const hasArabic = (v: string) => /[\u0600-\u06FF]/.test(v);

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
    <FlowBranch>
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
            <p
              className={cn(
                'tnum text-2xs text-text-faint sm:pt-2',
                /*
                 * A period made only of digits ("2025 – 2026") MUST be
                 * isolated LTR. Left to the RTL paragraph, the en-dash is a
                 * neutral between two number runs and takes the paragraph
                 * direction, so the range renders reversed — "2026 – 2025".
                 *
                 * A period carrying Arabic words ("سبتمبر 2026 – حتى الآن")
                 * is the opposite case: it must stay RTL, and it takes no
                 * uppercase or letter-spacing, which Arabic does not have.
                 */
                hasArabic(pick(item.period, locale))
                  ? ''
                  : 'force-ltr font-mono uppercase tracking-[0.14em]',
              )}
            >
              {pick(item.period, locale)}
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
    </FlowBranch>
  );
}
