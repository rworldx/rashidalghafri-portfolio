import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: 'accent' | 'signal' | 'neutral';
}

/** Small pill for real state ("Live", "Featured"). Not decoration. */
export function Badge({ className, tone = 'neutral', children, ...props }: BadgeProps) {
  const tones: Record<NonNullable<BadgeProps['tone']>, string> = {
    accent: 'bg-accent-soft text-accent',
    signal: 'bg-surface-2 text-signal',
    neutral: 'bg-surface-2 text-text-muted',
  };
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-2xs uppercase tracking-[0.14em]',
        tones[tone],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
