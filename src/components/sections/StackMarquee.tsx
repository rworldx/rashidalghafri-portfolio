'use client';

import { useTranslations } from 'next-intl';
import { skills } from '@content/skills';

/**
 * The stack, as a running band.
 *
 * A marquee is the right component for "lots of things that do not need
 * individual attention" — nobody reads a technology list, they scan it for two
 * or three names they recognise. A 30-item grid of identical chips would take
 * a whole screen to say what a moving band says in a strip.
 *
 * It pauses on hover so anything worth reading can be read, and reduced motion
 * turns it into a plain horizontally-scrollable row rather than stopping it
 * dead with half the content off-screen.
 *
 * The list is duplicated in the markup on purpose: the loop translates the pair
 * by exactly -50%, which is what makes the seam invisible. The copy is
 * `aria-hidden` so a screen reader is not read the entire stack twice.
 */
export function StackMarquee() {
  const t = useTranslations('skills');

  // Flattened from the real skills content, so this never drifts from /resume.
  const items = skills.flatMap((group) => group.items);

  const track = (
    <ul className="flex shrink-0 items-center">
      {items.map((item) => (
        <li
          key={item}
          className="flex items-center whitespace-nowrap px-6 font-mono text-sm uppercase tracking-[0.12em] text-text-muted sm:px-8"
        >
          {item}
          <span aria-hidden className="ms-6 text-accent sm:ms-8">
            /
          </span>
        </li>
      ))}
    </ul>
  );

  return (
    <section className="marquee-host border-y border-border py-6 sm:py-8">
      <h2 className="sr-only">{t('title')}</h2>
      <div className="relative overflow-hidden">
        {/* The band fades into the page edges instead of being cut by them. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 start-0 z-raised w-16 bg-gradient-to-r from-bg to-transparent rtl:bg-gradient-to-l sm:w-28"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 end-0 z-raised w-16 bg-gradient-to-l from-bg to-transparent rtl:bg-gradient-to-r sm:w-28"
        />
        <div className="marquee">
          {track}
          <div aria-hidden>{track}</div>
        </div>
      </div>
    </section>
  );
}
