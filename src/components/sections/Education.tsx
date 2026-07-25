'use client';

import { useLocale, useTranslations } from 'next-intl';
import { education } from '@content/education';
import { pick } from '@/lib/localized';
import { Reveal } from '@/components/motion/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Tag } from '@/components/ui/Tag';
import { FlowBranch } from '@/components/flow/FlowBranch';

/**
 * The degree, as a record rather than a card. The honours line is the single
 * most load-bearing fact for anyone reading this page, so it gets the largest
 * type in the section instead of being buried in body copy.
 */
export function Education() {
  const t = useTranslations('about');
  const locale = useLocale();

  return (
    <FlowBranch>
      <SectionHeading
        title={t('educationHeading')}
        emphasis={t('educationEmphasis')}
        className="mb-phi-2"
      />

      <Reveal>
        <div className="border-t border-border-strong pt-8">
          <div className="grid gap-phi-2 lg:grid-cols-[1.618fr_1fr]">
            <div>
              <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                <h3 className="display-3 text-text">
                  {pick(education.degree, locale)}
                </h3>
                <span className="tnum font-mono text-2xs uppercase tracking-[0.14em] text-text-faint">
                  {pick(education.period, locale)}
                </span>
              </div>
              <p className="mt-2 text-text-muted">{education.school}</p>
              <p className="measure mt-phi text-lg text-text">
                {pick(education.honours, locale)}
              </p>
            </div>

            <div>
              <h4 className="label mb-4 text-text-faint">{t('languagesTitle')}</h4>
              <dl>
                {education.languages.map((lang) => (
                  <div
                    key={lang.name.en}
                    className="flex items-baseline justify-between gap-4 border-b border-border py-3"
                  >
                    <dt className="text-text">{pick(lang.name, locale)}</dt>
                    <dd className="font-mono text-sm text-text-muted">
                      {pick(lang.level, locale)}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <div className="mt-phi-2">
            <h4 className="label mb-4 text-text-faint">{t('courseworkTitle')}</h4>
            <ul className="flex flex-wrap gap-2">
              {education.coursework.map((c) => (
                <li key={c}>
                  <Tag>{c}</Tag>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>
    </FlowBranch>
  );
}
