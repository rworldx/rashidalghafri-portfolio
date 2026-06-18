'use client';

import { useLocale, useTranslations } from 'next-intl';
import { GraduationCap, Tent } from 'lucide-react';
import { schooling, schoolingNote } from '@content/personal';
import { pick } from '@/lib/localized';
import { Container } from '@/components/layout/Container';
import { Reveal } from '@/components/motion/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';

/**
 * "Roots" — the early-schooling path as a horizontal 3-stage progression, plus
 * a Scouts / top-student footnote. Personal (About page). RTL-safe: the rail and
 * step order mirror via the grid; grade ranges stay LTR.
 */
export function Roots() {
  const t = useTranslations('about');
  const locale = useLocale();

  return (
    <section className="py-20">
      <Container>
        <SectionHeading eyebrow={t('rootsEyebrow')} title={t('rootsTitle')} className="mb-12" />

        <Reveal>
          <div className="relative grid gap-8 sm:grid-cols-3">
            {/* Connecting rail (desktop). */}
            <div
              aria-hidden
              className="absolute inset-x-6 top-[11px] hidden h-px bg-border sm:block"
            />
            {schooling.map((step) => (
              <div key={step.grades} className="relative">
                <span
                  aria-hidden
                  className="inline-block h-[22px] w-[22px] rounded-full border-2 border-bg bg-accent"
                />
                <p className="force-ltr mt-3 font-mono text-xs uppercase tracking-widest text-accent">
                  {t('grades')} {step.grades}
                </p>
                <p className="mt-1 font-display text-lg font-semibold text-text">
                  {pick(step.name, locale)}
                </p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-10 inline-flex items-center gap-3 rounded-lg border border-border bg-surface-2 px-5 py-3">
            <Tent className="h-4 w-4 text-accent" />
            <GraduationCap className="h-4 w-4 text-accent" />
            <p className="text-sm text-text-muted">{pick(schoolingNote, locale)}</p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
