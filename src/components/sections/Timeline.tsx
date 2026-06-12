'use client';

import { useRef } from 'react';
import { m, useScroll, useSpring } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import { timeline } from '@content/timeline';
import type { TimelineKind } from '@/types/common';
import { pick } from '@/lib/localized';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { Container } from '@/components/layout/Container';
import { Reveal } from '@/components/motion/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';

/** Token-driven accent per entry kind (no hardcoded colours). */
const dotColor: Record<TimelineKind, string> = {
  education: 'var(--accent)',
  project: 'var(--success)',
  award: 'var(--accent)',
  hackathon: 'var(--text)',
  milestone: 'var(--success)',
  goal: 'var(--text-muted)',
};

/**
 * Visual timeline (Addendum B.3): a single inline-start spine that fills with
 * accent as you scroll. RTL-safe via logical properties; reduced-motion shows a
 * statically filled spine with no scroll-draw.
 */
export function Timeline() {
  const t = useTranslations('about');
  const locale = useLocale();
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 75%', 'end 65%'],
  });
  const fill = useSpring(scrollYProgress, { stiffness: 80, damping: 22 });

  return (
    <section className="py-20">
      <Container>
        <SectionHeading
          eyebrow={t('journeyEyebrow')}
          title={t('journeyTitle')}
          className="mb-12"
        />

        <div ref={ref} className="relative">
          {/* Track + animated fill, pinned to the inline-start edge. */}
          <div className="absolute inset-y-0 start-[7px] w-px bg-border" aria-hidden />
          <m.div
            className="absolute inset-y-0 start-[7px] w-px origin-top bg-accent"
            aria-hidden
            style={reduced ? { scaleY: 1 } : { scaleY: fill }}
          />

          <ol className="space-y-10">
            {timeline.map((entry, i) => (
              <Reveal as="li" key={`${entry.year}-${i}`} delay={i * 0.04} className="relative ps-10">
                <span
                  className="absolute start-0 top-1 inline-flex h-[15px] w-[15px] items-center justify-center rounded-full border-2 border-bg"
                  style={{
                    background: entry.future ? 'var(--bg)' : dotColor[entry.kind],
                    boxShadow: entry.future ? `inset 0 0 0 2px ${dotColor[entry.kind]}` : undefined,
                  }}
                  aria-hidden
                />
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="force-ltr font-mono text-sm font-bold text-accent">
                    {entry.year}
                  </span>
                  <h3 className="font-display text-lg font-semibold text-text">
                    {pick(entry.title, locale)}
                  </h3>
                </div>
                {pick(entry.detail, locale) && (
                  <p className="mt-1 text-sm text-text-muted">{pick(entry.detail, locale)}</p>
                )}
              </Reveal>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
