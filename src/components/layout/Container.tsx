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

/**
 * Max-width + responsive gutters. The single source of layout width.
 *
 * GEOMETRY CONTRACT WITH THE FLOW RAIL — the inline-start padding is exactly
 * double the rail's own inset (rail at 20 / 32 / 48px, content at 40 / 64 /
 * 96px), which leaves the gutter free for the rail and gives every branch spur
 * a run equal to the rail's inset. The asymmetry is deliberate: the content
 * column sits off-centre because the spine occupies the start gutter.
 *
 * The phone step is tighter than a proportional scale would give: at 390px
 * every pixel the gutter takes comes straight off the measure, so the rail
 * sits at 20px rather than 24px there.
 *
 * If you change these values, change <FlowRail> and <FlowBranch> with them.
 */
export function Container({
  children,
  className,
  as: Tag = 'div',
  width = 'shell',
}: ContainerProps) {
  return (
    <Tag
      className={cn(
        'mx-auto w-full pe-5 ps-10 sm:pe-8 sm:ps-16 lg:pe-12 lg:ps-24',
        widths[width],
        className,
      )}
    >
      {children}
    </Tag>
  );
}

/**
 * Standard vertical rhythm for a section. Derived from phi so the gaps between
 * sections and the gaps inside them belong to the same ramp.
 */
export const sectionY = 'py-phi-3 sm:py-phi-4';
