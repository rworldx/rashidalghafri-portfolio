import { cn } from '@/lib/cn';
import type { ElementType, ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}

/** Max-width + responsive horizontal padding. The single layout-width source. */
export function Container({ children, className, as: Tag = 'div' }: ContainerProps) {
  return (
    <Tag className={cn('mx-auto w-full max-w-6xl px-5 sm:px-8', className)}>{children}</Tag>
  );
}
