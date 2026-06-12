'use client';

import { useLocale, useTranslations } from 'next-intl';
import { GraduationCap } from 'lucide-react';
import { education } from '@content/education';
import { pick } from '@/lib/localized';
import { Container } from '@/components/layout/Container';
import { Reveal } from '@/components/motion/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card } from '@/components/ui/Card';
import { Tag } from '@/components/ui/Tag';

/** Education block: degree, honours, coursework, languages (Addendum/CV §9). */
export function Education() {
  const t = useTranslations('about');
  const locale = useLocale();

  return (
    <section className="py-20">
      <Container>
        <SectionHeading
          eyebrow={t('educationEyebrow')}
          title={t('educationHeading')}
          className="mb-10"
        />

        <Reveal>
          <Card className="p-7 sm:p-9">
            <div className="flex items-start gap-4">
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-sm bg-accent-soft text-accent">
                <GraduationCap className="h-5 w-5" />
              </span>
              <div className="flex-1">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-display text-xl font-semibold text-text">
                    {pick(education.degree, locale)}
                  </h3>
                  <span className="font-mono text-xs text-text-muted">
                    {pick(education.period, locale)}
                  </span>
                </div>
                <p className="mt-1 text-sm text-accent">{education.school}</p>
                <p className="mt-3 text-text-muted">{pick(education.honours, locale)}</p>
              </div>
            </div>

            <div className="mt-8 grid gap-8 border-t border-border pt-7 sm:grid-cols-2">
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-text-muted">
                  {t('courseworkTitle')}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {education.coursework.map((c) => (
                    <Tag key={c}>{c}</Tag>
                  ))}
                </div>
              </div>
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-text-muted">
                  {t('languagesTitle')}
                </p>
                <ul className="mt-3 space-y-2">
                  {education.languages.map((lang) => (
                    <li key={lang.name.en} className="flex items-baseline justify-between gap-3">
                      <span className="text-text">{pick(lang.name, locale)}</span>
                      <span className="font-mono text-sm text-text-muted">
                        {pick(lang.level, locale)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
        </Reveal>
      </Container>
    </section>
  );
}
