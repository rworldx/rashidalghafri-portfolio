'use client';

import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { m, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { Container } from '@/components/layout/Container';
import { cn } from '@/lib/cn';

/**
 * FLOW. SYSTEMS. CONNECTION. — the statement wall.
 *
 * The site's thesis, said once, at full volume, in the museum's own voice
 * (the italic didone) rather than the structural grotesque. Three words at display scale
 * that light one at a time as the reader scrolls past — the reader's own
 * scrolling is the animation, so the motion is theirs rather than a loop
 * playing at them.
 *
 * Each word gets exactly one supporting line and no more. The temptation here
 * is to explain; three explained words stop being a thesis and become a
 * features list.
 *
 * Every transform is driven off ONE `useScroll` and derived with `useTransform`
 * — no per-frame React state, no scroll listener (banned in this repo).
 */
export function Manifesto() {
  const t = useTranslations('manifesto');
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.85', 'end 0.35'],
  });

  const words = [
    { key: 'flow', label: t('flow'), body: t('flowBody') },
    { key: 'systems', label: t('systems'), body: t('systemsBody') },
    { key: 'connection', label: t('connection'), body: t('connectionBody') },
  ];

  return (
    <section ref={ref} className="py-phi-4 sm:py-phi-5">
      <Container>
        <ul className="space-y-phi-2 sm:space-y-phi-3">
          {words.map((w, i) => (
            <Word
              key={w.key}
              index={i}
              total={words.length}
              label={w.label}
              body={w.body}
              progress={scrollYProgress}
            />
          ))}
        </ul>
      </Container>
    </section>
  );
}

function Word({
  index,
  total,
  label,
  body,
  progress,
}: {
  index: number;
  total: number;
  label: string;
  body: string;
  progress: MotionValue<number>;
}) {
  // Each word owns a slice of the scroll, with the slices overlapping slightly
  // so one is always arriving as the last is settling — a hard hand-off reads
  // as three separate animations instead of one sentence.
  const start = index / total;
  const end = (index + 1) / total;
  const lead = start - 0.12;

  const opacity = useTransform(progress, [lead, start, end], [0.16, 1, 1]);
  const x = useTransform(progress, [lead, start], [-28, 0]);
  const bodyOpacity = useTransform(progress, [start - 0.02, start + 0.1], [0, 1]);
  const ruleScale = useTransform(progress, [lead, start], [0, 1]);

  return (
    <li>
      <m.div style={{ opacity, x }} className="origin-left rtl:origin-right">
        <div className="flex flex-wrap items-baseline gap-x-phi gap-y-2">
          <h2
            className={cn(
              'museum-1 text-text',
              // The full stop is part of the statement, not punctuation the
              // headline happens to end with.
              'after:text-accent after:content-["."]',
            )}
          >
            {label}
          </h2>
        </div>
        <m.div
          style={{ scaleX: ruleScale }}
          className="mt-5 h-px origin-left bg-accent-line rtl:origin-right"
        />
        <m.p
          style={{ opacity: bodyOpacity }}
          className="measure mt-5 text-lg text-text-muted sm:text-xl"
        >
          {body}
        </m.p>
      </m.div>
    </li>
  );
}
