import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * `panel` — a translucent raised surface with a bright top hairline.
   * `flat`  — no fill; grouped by a border only. Prefer this: a card is the
   *           lazy answer unless elevation communicates real hierarchy.
   */
  tone?: 'panel' | 'flat';
  /** Adds the hover lift. Only for cards that are themselves a link/target. */
  interactive?: boolean;
}

/**
 * Raised surface. Concentric radii and a hairline edge so it reads as a real
 * material rather than a rectangle with a shadow.
 */
export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, tone = 'panel', interactive = false, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'rounded-lg',
        tone === 'panel' ? 'panel' : 'border border-border bg-transparent',
        interactive &&
          'transition-[border-color,box-shadow,transform] duration-quick ease-out hover:-translate-y-0.5 hover:border-border-strong hover:shadow-lift',
        className,
      )}
      {...props}
    />
  ),
);
Card.displayName = 'Card';
