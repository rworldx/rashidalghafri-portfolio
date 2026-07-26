'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { cn } from '@/lib/cn';

interface BlurTextProps {
  text: string;
  className?: string;
  /** A substring of `text` set upright — the counterpoint to the italic. */
  upright?: string;
  as?: 'h1' | 'h2' | 'p';
  /** Seconds before the first word. */
  delay?: number;
  /** Per-word offset. Slow enough to read as choreography, not as a wave. */
  stagger?: number;
}

/**
 * Word-by-word blur-in for display type.
 *
 * Each word arrives from below, out of focus, and settles — the effect that
 * makes an exhibition title feel *placed* rather than drawn. Every word passes
 * through a half-lit intermediate step rather than fading linearly, which is
 * what stops it reading as a plain opacity animation.
 *
 * CSS, not Framer. This is the largest text on the page and therefore the LCP
 * element; a Framer-driven version holds every word at `opacity: 0` until the
 * lazily-loaded motion chunk arrives over the network, which is exactly the
 * wrong thing to do to the one line a visitor came to read.
 *
 * The clip is the part that usually goes wrong: `overflow: hidden` on a line of
 * italic didone cuts the descenders off `y g j p q`, so each word reserves room
 * below the baseline and pulls it back with a negative margin.
 *
 * Splitting on spaces is safe for Arabic too, since shaping happens inside a
 * word, never across the space.
 */
export function BlurText({
  text,
  className,
  upright,
  as: Tag = 'h1',
  delay = 0,
  stagger = 0.085,
}: BlurTextProps) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Above the fold on mount: start immediately rather than waiting a frame
    // for an intersection callback.
    if (el.getBoundingClientRect().top < window.innerHeight * 0.9) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const uprightWords = upright ? new Set(upright.split(' ')) : null;
  const words = text.split(' ');

  return (
    <Tag ref={ref as never} className={cn(className)} aria-label={text}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          aria-hidden
          // `inline-block` on the outer span keeps each word an unbreakable
          // unit, so a word never splits across a line mid-animation.
          className="inline-block overflow-hidden pb-[0.14em] align-bottom [margin-bottom:-0.14em]"
        >
          <span
            data-shown={shown ? '' : undefined}
            className={cn('blur-word inline-block', uprightWords?.has(word) && 'not-italic')}
            style={{ '--d': `${delay + i * stagger}s` } as CSSProperties}
          >
            {word}
          </span>
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </Tag>
  );
}
