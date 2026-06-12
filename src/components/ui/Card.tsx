import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

/** Surface container with hairline border + subtle shadow (PRD §3.3 elevation). */
export const Card = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'rounded-lg border border-border bg-surface shadow-card',
        className,
      )}
      {...props}
    />
  ),
);
Card.displayName = 'Card';
