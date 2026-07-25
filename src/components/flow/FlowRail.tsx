'use client';

import { useRef } from 'react';
import { m, useScroll, useSpring } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

/**
 * The page's spine — the one structural device that repeats site-wide.
 *
 * A single hairline runs the full height of the document in the inline-start
 * gutter. The portion above the reader's position is live (accent); the rest is
 * dormant. Sections branch off it via <FlowBranch>.
 *
 * It carries information, which is the only reason it is allowed to exist: it
 * is a genuine reading-progress indicator, and it makes visible that every
 * section on the page descends from a single source. The concept underneath
 * (branching distribution) is never spelled out in the visuals.
 *
 * GEOMETRY CONTRACT — the rail and the content column must not drift apart.
 * The rail sits at `start-5 / sm:start-8 / lg:start-12` inside the same
 * centred max-w-shell box that <Container> uses, and Container reserves
 * exactly double that as its inline-start padding. Change one, change both.
 *
 * PERFORMANCE — the live segment is a scaleY on an already-painted gradient,
 * never an animated height, so scrolling never triggers layout. Progress comes
 * from Framer's `useScroll`; a `scroll` event listener is banned in this repo.
 */
export function FlowRail() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  // Measured against the rail's own extent, so progress reaches 1 exactly at
  // the bottom of the content rather than at the bottom of the window.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  // A little smoothing so the leading edge glides instead of tracking the
  // wheel's stepping. Critically damped — the line must never overshoot past
  // the reader's actual position, which would misreport progress.
  const smoothed = useSpring(scrollYProgress, {
    stiffness: 150,
    damping: 34,
    restDelta: 0.0005,
  });

  // Reduced motion keeps the indicator (it tracks the user's own scrolling and
  // is not vestibular) but drops the spring, so it maps 1:1 with no easing.
  const scaleY = reduced ? scrollYProgress : smoothed;

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-y-0 start-0 z-0 w-full"
    >
      <div className="mx-auto h-full w-full max-w-shell">
        <div ref={ref} className="relative h-full">
          <span className="flow-rail start-5 sm:start-8 lg:start-12" />
          <m.span
            className="flow-live start-5 sm:start-8 lg:start-12"
            style={{ scaleY }}
          />
        </div>
      </div>
    </div>
  );
}
