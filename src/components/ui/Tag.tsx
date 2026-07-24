import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

/**
 * Stack / capability chip. Mono keeps it in the metadata register, and the pill
 * shape follows the shape system (interactive-shaped controls are pills, even
 * when static, so chips and buttons never disagree in the same row).
 */
export function Tag({ className, children, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border border-border bg-surface-2/60 px-2.5 py-1 font-mono text-2xs text-text-muted',
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
