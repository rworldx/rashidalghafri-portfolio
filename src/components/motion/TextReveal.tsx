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

  const groups: Array<{
    isEmphasis: boolean;
    words: Array<{ word: string; index: number }>;
  }> = [];

  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    if (!word) continue;
    const isEmp = Boolean(emphasisWords?.has(word));

    if (isEmp) {
      const lastGroup = groups[groups.length - 1];
      if (lastGroup && lastGroup.isEmphasis) {
        lastGroup.words.push({ word, index: i });
      } else {
        groups.push({ isEmphasis: true, words: [{ word, index: i }] });
      }
    } else {
      groups.push({ isEmphasis: false, words: [{ word, index: i }] });
    }
  }

  return (
    <Tag className={cn(className)} aria-label={text}>
      {groups.map((group, groupIdx) => {
        const isLastGroup = groupIdx === groups.length - 1;

        if (group.isEmphasis) {
          return (
            <span key={`group-${groupIdx}`} className="inline-block whitespace-nowrap">
              {group.words.map(({ word, index }, wIdx) => {
                const isLastInGroup = wIdx === group.words.length - 1;
                return (
                  <span key={`${word}-${index}`}>
                    <span
                      aria-hidden
                      className="inline-block overflow-hidden pb-[0.16em] align-bottom [margin-bottom:-0.16em]"
                    >
                      <span
                        className="word-rise em-italic inline-block"
                        style={{ '--d': `${delay + index * stagger}s` } as CSSProperties}
                      >
                        {word}
                      </span>
                    </span>
                    {!isLastInGroup ? ' ' : ''}
                  </span>
                );
              })}
              {!isLastGroup ? ' ' : ''}
            </span>
          );
        }

        const firstItem = group.words[0];
        if (!firstItem) return null;
        const { word, index } = firstItem;
        return (
          <span key={`${word}-${index}`}>
            <span
              aria-hidden
              className="inline-block overflow-hidden pb-[0.16em] align-bottom [margin-bottom:-0.16em]"
            >
              <span
                className="word-rise inline-block"
                style={{ '--d': `${delay + index * stagger}s` } as CSSProperties}
              >
                {word}
              </span>
            </span>
            {!isLastGroup ? ' ' : ''}
          </span>
        );
      })}
    </Tag>
  );
}
