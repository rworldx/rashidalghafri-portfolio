'use client';

import { useLocale, useTranslations } from 'next-intl';
import { Plane, Car, MapPin } from 'lucide-react';
import { m } from 'framer-motion';
import { travels, travelNote } from '@content/personal';
import type { Travel } from '@/types/common';
import { pick } from '@/lib/localized';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { Container } from '@/components/layout/Container';
import { Reveal } from '@/components/motion/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';

/**
 * Creative personal element for the About page (replaces the timeline): each
 * trip as a boarding-pass card. On-brand mono/ticket aesthetic, RTL-safe, with
 * a gentle hover lift. Codes stay LTR so routes read correctly in Arabic.
 */
export function TravelLog() {
  const t = useTranslations('about');
  const locale = useLocale();

  return (
    <section className="py-20">
      <Container>
        <SectionHeading eyebrow={t('travelEyebrow')} title={t('travelTitle')} className="mb-10" />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {travels.map((trip, i) => (
            <Reveal key={`${trip.toCode}-${trip.year}`} delay={i * 0.05}>
              <Pass trip={trip} boardingLabel={t('boardingPass')} note={pick(trip.note, locale)}>
                {pick(trip.to, locale)}
              </Pass>
            </Reveal>
          ))}

          <Reveal delay={travels.length * 0.05}>
            <div className="flex h-full flex-col justify-center rounded-lg border border-dashed border-border bg-surface-2 p-6">
              <MapPin className="h-5 w-5 text-accent" />
              <p className="mt-3 text-sm text-text-muted">{pick(travelNote, locale)}</p>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
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
    <m.div
      whileHover={reduced ? undefined : { y: -3 }}
      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="h-full overflow-hidden rounded-lg border border-border bg-surface shadow-card"
    >
      {/* Stub header */}
      <div className="flex items-center justify-between border-b border-dashed border-border bg-surface-2 px-5 py-2">
        <span className="font-mono text-[10px] uppercase tracking-widest text-text-muted">
          {boardingLabel}
        </span>
        <span className="force-ltr font-mono text-xs font-bold text-accent">{trip.year}</span>
      </div>

      {/* Route */}
      <div className="p-5">
        <div className="force-ltr flex items-center gap-3 font-mono text-2xl font-bold text-text">
          <span>{trip.fromCode}</span>
          <Icon className="h-4 w-4 text-accent" />
          <span>{trip.toCode}</span>
        </div>
        <p className="mt-3 font-display text-lg font-semibold text-text">{children}</p>
        {note && <p className="mt-1 text-sm text-text-muted">{note}</p>}
        {trip.stops && (
          <p className="force-ltr mt-3 font-mono text-[11px] text-text-muted">
            {trip.stops.join(' → ')}
          </p>
        )}
      </div>
    </m.div>
  );
}
