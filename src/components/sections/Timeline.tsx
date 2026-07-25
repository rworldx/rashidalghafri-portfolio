'use client';

import { useRef } from 'react';
import { m, useScroll, useSpring } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import { journey } from '@content/journey';
import type { TimelineKind } from '@/types/common';
import { pick } from '@/lib/localized';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { Reveal } from '@/components/motion/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { FlowBranch } from '@/components/flow/FlowBranch';

/** Token-driven accent per entry kind. No hardcoded colours. */
const dotColor: Record<TimelineKind, string> = {
  education: 'var(--accent)',
  project: 'var(--signal)',
  award: 'var(--accent)',
  hackathon: 'var(--text)',
  milestone: 'var(--signal)',
  goal: 'var(--text-faint)',
};

/**
 * The professional path, drawn as a spine that fills with accent as it scrolls
 * past. Motion here is doing real work: the fill is a progress reading, so a
 * reader always knows how far through the run they are.
 *
 * Years repeat down the entries, so each year is printed once as a heading for
 * its group rather than on every row. Under reduced motion the spine renders
 * already filled and nothing animates.
 */
export function Timeline() {
  const t = useTranslations('about');
  const locale = useLocale();
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 78%', 'end 62%'],
  });
  const fill = useSpring(scrollYProgress, { stiffness: 80, damping: 24 });

  return (
    <FlowBranch>
      <SectionHeading
        label={t('journeyEyebrow')}
        title={t('journeyTitle')}
        emphasis={t('journeyEmphasis')}
        className="mb-phi-2"
      />

      <div ref={ref} className="relative">
        {/* Track, then the fill that tracks scroll progress over it. */}
        <span className="absolute inset-y-0 start-[7px] w-px bg-border" aria-hidden />
        <m.span
          aria-hidden
          className="absolute inset-y-0 start-[7px] w-px origin-top bg-accent"
          style={reduced ? { scaleY: 1 } : { scaleY: fill }}
        />

        <ol className="space-y-9">
          {journey.map((entry, i) => {
            const isNewYear = i === 0 || journey[i - 1]?.year !== entry.year;
            return (
              <Reveal
                as="li"
                key={`${entry.year}-${i}`}
                delay={Math.min(i, 8) * 0.035}
                distance={12}
                className="relative ps-10"
              >
                <span
                  aria-hidden
                  className="absolute start-0 top-[5px] block size-[15px] rounded-full border-[3px] border-bg"
                  style={{
                    background: entry.future ? 'var(--bg)' : dotColor[entry.kind],
                    boxShadow: entry.future
                      ? `inset 0 0 0 2px ${dotColor[entry.kind]}`
                      : undefined,
                  }}
                />
                {isNewYear && (
                  <p className="tnum force-ltr mb-2 font-mono text-2xs uppercase tracking-[0.16em] text-accent">
                    {entry.year}
                  </p>
                )}
                <h3 className="display-4 text-text">{pick(entry.title, locale)}</h3>
                {pick(entry.detail, locale) && (
                  <p className="measure mt-1.5 text-sm text-text-muted">
                    {pick(entry.detail, locale)}
                  </p>
                )}
              </Reveal>
            );
          })}
        </ol>
      </div>
    </FlowBranch>
  );
}
