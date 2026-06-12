'use client';

import { MotionConfig } from 'framer-motion';
import type { ReactNode } from 'react';

/**
 * App-wide motion gate (PRD §10). `reducedMotion="user"` makes Framer Motion
 * automatically drop transform/layout animations (keeping opacity) when the OS
 * requests reduced motion — so every `Reveal`/hover effect degrades for free.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user" transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </MotionConfig>
  );
}
