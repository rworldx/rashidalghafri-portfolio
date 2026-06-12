'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, type ReactNode } from 'react';
import { cn } from '@/lib/cn';

interface ParallaxProps {
  children: ReactNode;
  className?: string;
  /** Total vertical travel in px across the element's scroll range. */
  distance?: number;
}

/**
 * Subtle scroll parallax. Animates `y` (transform only — never layout) so CLS
 * is unaffected. Reduced motion is honoured globally via MotionProvider.
 */
export function Parallax({ children, className, distance = 40 }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);

  return (
    <motion.div ref={ref} style={{ y }} className={cn(className)}>
      {children}
    </motion.div>
  );
}
