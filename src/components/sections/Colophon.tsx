'use client';

import { useLocale, useTranslations } from 'next-intl';
import { colophon } from '@content/colophon';
import { pick } from '@/lib/localized';
import { Reveal } from '@/components/motion/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { FlowBranch } from '@/components/flow/FlowBranch';

/**
 * The only place the site explains itself.
 *
 * Everything else on this site is built on one idea — the falaj, Oman's
 * gravity-fed irrigation network: a single source, channels branching out to
 * everyone who needs the water, nothing wasted. It shapes the spine running
 * down every page, the way sections branch off it rather than stack on it, and
 * the network in the hero.
 *
 * It is stated HERE and nowhere else, on purpose. A visitor should feel that
 * the site is unusually connected long before they are told why; a concept a
 * portfolio announces in its hero is decoration, and one a visitor discovers on
 * the about page is architecture. There are no canals, no water textures and no
 * cultural motifs anywhere in the visual language — the idea is in the
 * engineering, which is the only place it belongs.
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
