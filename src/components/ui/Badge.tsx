import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: 'accent' | 'success' | 'neutral';
}

/** Accent/success/neutral pill for labels like "Featured" or "Live". */
export function Badge({ className, tone = 'neutral', children, ...props }: BadgeProps) {
  const tones: Record<NonNullable<BadgeProps['tone']>, string> = {
    accent: 'bg-accent-soft text-accent',
    success: 'bg-accent-soft text-success',
    neutral: 'bg-surface-2 text-text-muted',
  };
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-sm px-2 py-1 font-mono text-xs uppercase tracking-wide',
        tones[tone],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
