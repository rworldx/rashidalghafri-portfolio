'use client';

import { useLocale, useTranslations } from 'next-intl';
import { colophon } from '@content/colophon';
import { pick } from '@/lib/localized';
import { Reveal } from '@/components/motion/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { FlowBranch } from '@/components/flow/FlowBranch';

/**
 * The colophon — the only place the site explains how it is made.
 *
 * Deliberately the LAST thing on the About page and nowhere else. A note about
 * craft is a reward for someone who read to the end, not an argument to open
 * with; a site that leads with an explanation of its own design is asking to
 * be admired rather than read.
 */
export function Colophon() {
  const t = useTranslations('colophon');
  const locale = useLocale();

  return (
    <FlowBranch>
      <SectionHeading title={t('title')} emphasis={t('emphasis')} className="mb-phi-2" />

      <div className="measure space-y-phi">
        {colophon.body.map((paragraph, i) => (
          <Reveal key={i} delay={0.04 * i} distance={14}>
            <p className="text-lg text-text-muted">{pick(paragraph, locale)}</p>
          </Reveal>
        ))}
      </div>
    </FlowBranch>
  );
}
