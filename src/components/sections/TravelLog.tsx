'use client';

import { useLocale, useTranslations } from 'next-intl';
import { Plane, Car, MapPin } from 'lucide-react';
import { m } from 'framer-motion';
import { travels, travelNote } from '@content/personal';
import type { Travel } from '@/types/common';
import { pick } from '@/lib/localized';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { Reveal } from '@/components/motion/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { FlowBranch } from '@/components/flow/FlowBranch';

/**
 * Each trip as a boarding pass. The ticket notch is cut with two radial
 * gradients on the stub seam rather than drawn, so it stays crisp at any size
 * and costs nothing.
 *
 * Route codes and years are forced LTR so a route still reads OM to TH inside
 * an Arabic layout.
 */
export function TravelLog() {
  const t = useTranslations('about');
  const locale = useLocale();

  return (
    <FlowBranch>
      <SectionHeading
        label={t('travelEyebrow')}
        title={t('travelTitle')}
        emphasis={t('travelEmphasis')}
        className="mb-phi-2"
      />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {travels.map((trip, i) => (
          <Reveal
            key={`${trip.toCode}-${trip.year}`}
            delay={i * 0.06}
            className="h-full"
          >
            <Pass
              trip={trip}
              boardingLabel={t('boardingPass')}
              note={pick(trip.note, locale)}
            >
              {pick(trip.to, locale)}
            </Pass>
          </Reveal>
        ))}

        <Reveal delay={travels.length * 0.06} className="h-full">
          <div className="flex h-full flex-col justify-center rounded-lg border border-dashed border-border-strong p-6">
            <MapPin strokeWidth={1.5} aria-hidden className="size-5 text-accent" />
            <p className="mt-4 text-text-muted">{pick(travelNote, locale)}</p>
          </div>
        </Reveal>
      </div>
    </FlowBranch>
  );
}

function Pass({
  trip,
  boardingLabel,
  note,
  children,
}: {
  trip: Travel;
  boardingLabel: string;
  note: string;
  children: React.ReactNode;
}) {
  const reduced = useReducedMotion();
  const Icon = trip.mode === 'road' ? Car : Plane;

  return (
    <m.article
      whileHover={reduced ? undefined : { y: -4 }}
      transition={{ type: 'spring', bounce: 0.2, duration: 0.45 }}
      className="panel h-full overflow-hidden"
    >
      <div className="flex items-center justify-between px-6 pb-3 pt-5">
        <span className="font-mono text-2xs uppercase tracking-[0.16em] text-text-faint">
          {boardingLabel}
        </span>
        <span className="tnum force-ltr font-mono text-sm font-medium text-accent">
          {trip.year}
        </span>
      </div>

      {/* The stub seam: a dashed rule with a punched notch at either end. */}
      <div className="relative h-3" aria-hidden>
        <div className="absolute inset-x-6 top-1/2 border-t border-dashed border-border" />
        <span className="absolute -start-1.5 top-1/2 size-3 -translate-y-1/2 rounded-full bg-bg" />
        <span className="absolute -end-1.5 top-1/2 size-3 -translate-y-1/2 rounded-full bg-bg" />
      </div>

      <div className="px-6 pb-6 pt-3">
        <div className="force-ltr flex items-center gap-3">
          <span className="font-mono text-2xl font-medium tracking-[-0.02em] text-text">
            {trip.fromCode}
          </span>
          <Icon strokeWidth={1.5} aria-hidden className="size-4 shrink-0 text-accent" />
          <span className="font-mono text-2xl font-medium tracking-[-0.02em] text-text">
            {trip.toCode}
          </span>
        </div>
        <h3 className="display-4 mt-4 text-text">{children}</h3>
        {note && <p className="mt-1.5 text-sm text-text-muted">{note}</p>}
        {trip.stops && (
          <p className="force-ltr mt-4 font-mono text-2xs tracking-[0.08em] text-text-faint">
            {trip.stops.join('  ›  ')}
          </p>
        )}
      </div>
    </m.article>
  );
}
