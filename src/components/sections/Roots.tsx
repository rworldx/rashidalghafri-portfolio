'use client';

import { useLocale, useTranslations } from 'next-intl';
import { Tent, GraduationCap } from 'lucide-react';
import { schooling, schoolingNote } from '@content/personal';
import { pick } from '@/lib/localized';
import { Reveal } from '@/components/motion/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { FlowBranch } from '@/components/flow/FlowBranch';

/**
 * The early schooling path. This is one of the few places on the site where a
 * numbered, staged treatment is honest: the grades genuinely run in order, and
 * the order is the information. Everywhere else, sequence scaffolding would be
 * decoration.
 *
 * The rail runs horizontally on desktop and turns vertical below `sm`, where a
 * three-across progression would crush to unreadable columns.
 */
export function Roots() {
  const t = useTranslations('about');
  const locale = useLocale();

  return (
    <FlowBranch>
      <SectionHeading
        title={t('rootsTitle')}
        emphasis={t('rootsEmphasis')}
        className="mb-phi-2"
      />

      <Reveal>
        <ol className="relative grid gap-8 sm:grid-cols-3 sm:gap-6">
          {/* Desktop rail. */}
          <span
            aria-hidden
            className="absolute inset-x-8 top-[9px] hidden h-px bg-border sm:block"
          />
          {/* Mobile rail. */}
          <span
            aria-hidden
            className="absolute bottom-6 start-[9px] top-3 w-px bg-border sm:hidden"
          />

          {schooling.map((step) => (
            <li key={step.grades} className="relative ps-8 sm:ps-0">
              <span
                aria-hidden
                className="absolute start-0 top-1 block size-[19px] rounded-full border-[3px] border-bg bg-accent sm:relative sm:top-0 sm:mb-4 sm:block"
              />
              <p className="force-ltr font-mono text-2xs uppercase tracking-[0.16em] text-accent">
                {t('grades')} {step.grades}
              </p>
              <p className="display-4 mt-2 text-text">{pick(step.name, locale)}</p>
            </li>
          ))}
        </ol>
      </Reveal>

      <Reveal delay={0.08}>
        <p className="mt-phi-2 inline-flex flex-wrap items-center gap-x-3 gap-y-2 rounded-full border border-border px-5 py-3 text-sm text-text-muted">
          <Tent strokeWidth={1.5} aria-hidden className="size-4 shrink-0 text-accent" />
          <GraduationCap
            strokeWidth={1.5}
            aria-hidden
            className="size-4 shrink-0 text-accent"
          />
          {pick(schoolingNote, locale)}
        </p>
      </Reveal>
    </FlowBranch>
  );
}
