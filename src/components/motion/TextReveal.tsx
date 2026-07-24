'use client';

import type { CSSProperties } from 'react';
import { cn } from '@/lib/cn';

interface TextRevealProps {
  text: string;
  className?: string;
  /** Delay before the first word (seconds). */
  delay?: number;
  as?: 'h1' | 'h2' | 'p' | 'span';
  /** Per-word offset. Slower stagger reads as choreography, faster as noise. */
  stagger?: number;
  /** A substring of `text` rendered in the family's italic cut. */
  emphasis?: string;
}

/**
 * Word-by-word mask reveal for headlines: each word rises from behind a clip.
 *
 * CSS, not Framer, for the same reason as Reveal — this is the largest text on
 * the page, and holding it behind a transform until a lazily-loaded animation
 * bundle arrives would delay the one thing a visitor came to read.
 *
 * The clip is the part that usually goes wrong. `overflow: hidden` on a line of
 * type cuts the descenders off `y g j p q`, so the wrapper reserves 0.16em
 * below the baseline and pulls it back with a negative margin. Splitting on
 * spaces is safe for Arabic too, since shaping happens inside a word.
 */
export function TextReveal({
  text,
  className,
  delay = 0,
  as: Tag = 'h1',
  stagger = 0.055,
  emphasis,
}: TextRevealProps) {
  const words = text.split(' ');
  const emphasisWords = emphasis ? new Set(emphasis.split(' ')) : null;

  return (
    <Tag className={cn(className)} aria-label={text}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          aria-hidden
          className="inline-block overflow-hidden pb-[0.16em] align-bottom [margin-bottom:-0.16em]"
        >
          <span
            className={cn('word-rise inline-block', emphasisWords?.has(word) && 'em-italic')}
            style={{ '--d': `${delay + i * stagger}s` } as CSSProperties}
          >
            {word}
            {i < words.length - 1 ? ' ' : ''}
          </span>
        </span>
      ))}
    </Tag>
  );
}
