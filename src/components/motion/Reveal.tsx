'use client';

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { cn } from '@/lib/cn';

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Stagger offset in seconds. */
  delay?: number;
  /** Render element. Defaults to a div. */
  as?: 'div' | 'section' | 'li' | 'article' | 'span';
  /** Travel distance in px. Lower it for small elements so they do not swim. */
  distance?: number;
}

/**
 * Scroll-reveal: a fade with a short rise, once per element.
 *
 * Deliberately NOT a Framer component. Framer's feature bundle is lazy-loaded,
 * so a Framer-driven reveal holds its start state — `opacity: 0` — until that
 * chunk arrives over the network. On a page with many reveals (About) that
 * reads as the whole page loading slowly, because every block is genuinely
 * invisible until a 300KB download finishes.
 *
 * IntersectionObserver is native and available on the first frame, and the
 * transition is plain CSS on compositor properties only. Nothing here blocks on
 * JavaScript being downloaded; the `data-reveal` hook in the root layout covers
 * JavaScript being disabled entirely.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  as = 'div',
  distance = 18,
}: RevealProps) {
  const Tag = as;
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Already in view on mount (above the fold): show it without waiting for
    // an intersection callback, so first paint is not a frame behind.
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.92) {
      setShown(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true);
            io.disconnect();
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as never}
      data-reveal=""
      data-shown={shown ? '' : undefined}
      className={cn('reveal', className)}
      style={
        {
          '--reveal-y': `${distance}px`,
          '--reveal-delay': `${delay}s`,
        } as CSSProperties
      }
    >
      {children}
    </Tag>
  );
}
