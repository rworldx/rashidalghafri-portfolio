import { cn } from '@/lib/cn';
import type { ElementType, ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  /**
   * `shell` — the page's normal measure (78rem).
   * `wide`  — full-bleed sections that still need gutters.
   * `text`  — long-form reading column.
   */
  width?: 'shell' | 'wide' | 'text';
}

const widths = {
  shell: 'max-w-shell',
  wide: 'max-w-[96rem]',
  text: 'max-w-3xl',
} as const;

/** Max-width + responsive gutters. The single source of layout width. */
export function Container({
  children,
  className,
  as: Tag = 'div',
  width = 'shell',
}: ContainerProps) {
  return (
    <Tag className={cn('mx-auto w-full px-6 sm:px-8 lg:px-12', widths[width], className)}>
      {children}
    </Tag>
  );
}

/**
 * Standard vertical rhythm for a section. Derived from phi so the gaps between
 * sections and the gaps inside them belong to the same ramp.
 */
export const sectionY = 'py-phi-3 sm:py-phi-4';
