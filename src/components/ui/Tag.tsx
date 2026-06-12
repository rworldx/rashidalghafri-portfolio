import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

/** Small tech/stack chip. Mono for a "metadata" feel (PRD §3.2). */
export function Tag({ className, children, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-sm border border-border bg-surface-2 px-2 py-0.5 font-mono text-xs text-text-muted',
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
