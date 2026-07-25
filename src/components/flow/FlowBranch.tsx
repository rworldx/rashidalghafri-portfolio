'use client';

import { useEffect, useRef, useState, type ElementType, type ReactNode } from 'react';
import { Container, sectionY } from '@/components/layout/Container';
import { cn } from '@/lib/cn';

interface FlowBranchProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  id?: string;
  /** Drop the section's own vertical rhythm (for sections that set their own). */
  bare?: boolean;
  /** Container width, passed through. */
  width?: 'shell' | 'wide' | 'text';
}

/**
 * A section, attached to the page's spine.
 *
 * Sections do not stack on the rail — they BRANCH off it. Each renders a short
 * spur that draws itself outward on arrival, ending in a node that wakes as the
 * reader passes. The result is that the page reads as one system with many
 * outlets rather than as a pile of independent blocks.
 *
 * GEOMETRY — the marks live in their own centred max-w-shell box so they share
 * an axis with <FlowRail> and with <Container>'s inline-start padding. The spur
 * spans exactly the gap between rail and content column (20 / 32 / 48px), and
 * the node sits at the section's first line of content, so a branch visibly
 * attaches where its content actually begins.
 *
 * WHY A FIXED VIEWPORT THRESHOLD, NOT THE RAIL'S EXACT LEADING EDGE — the
 * rail's live edge travels from the top of the viewport to the bottom across a
 * full page scroll, which puts it at the vertical midpoint through the entire
 * middle of the document, where essentially all reading happens. Lighting nodes
 * at that midpoint therefore tracks the edge closely without any per-frame
 * measurement; the two only diverge in the first and last screenful, where the
 * edge's soft glow hides it. An exact solution would cost a layout read per
 * node per frame to buy nothing a reader can see.
 */
export function FlowBranch({
  children,
  className,
  as: Tag = 'section',
  id,
  bare = false,
  width = 'shell',
}: FlowBranchProps) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const spurRef = useRef<HTMLSpanElement>(null);
  const [live, setLive] = useState(false);
  const [attached, setAttached] = useState(false);

  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;

    // Wakes and sleeps as the reader moves in both directions — never
    // disconnected, because scrolling back up must un-light what is now below.
    //
    // The margin shrinks the root to the lower half of the viewport purely so
    // the callback FIRES as the node crosses the midpoint. The decision itself
    // compares against that same midpoint, because `boundingClientRect` is
    // always viewport-relative and ignores rootMargin — testing `top <= 0`
    // here meant a node only counted as passed once it had left the screen
    // entirely, so nodes never lit at all.
    const io = new IntersectionObserver(
      ([entry]) =>
        entry && setLive(entry.boundingClientRect.top <= window.innerHeight * 0.5),
      { rootMargin: '-50% 0px 0px 0px', threshold: 0 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const spur = spurRef.current;
    if (!spur) return;

    // The spur draws once, on arrival, and stays drawn.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setAttached(true);
          io.disconnect();
        }
      },
      { rootMargin: '0px 0px -12% 0px' },
    );
    io.observe(spur);
    return () => io.disconnect();
  }, []);

  return (
    <Tag id={id} className={cn('relative', !bare && sectionY, className)}>
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        <div className="mx-auto h-full w-full max-w-shell">
          <div className="relative h-full">
            <span
              ref={spurRef}
              data-shown={attached ? '' : undefined}
              className={cn(
                'flow-spur w-5 sm:w-8 lg:w-12',
                'start-5 sm:start-8 lg:start-12',
                bare ? 'top-0' : 'top-phi-3 sm:top-phi-4',
              )}
            />
            <span
              ref={nodeRef}
              data-live={live ? '' : undefined}
              className={cn(
                'flow-node start-5 sm:start-8 lg:start-12',
                // Centred on the spur's 1px line.
                bare ? '-mt-[3px] top-0' : '-mt-[3px] top-phi-3 sm:top-phi-4',
              )}
            />
          </div>
        </div>
      </div>

      <Container width={width} className="relative z-10">
        {children}
      </Container>
    </Tag>
  );
}
