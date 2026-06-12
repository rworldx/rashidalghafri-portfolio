'use client';

import { LazyMotion, MotionConfig } from 'framer-motion';
import type { ReactNode } from 'react';

/**
 * Lazily load Framer's feature bundle so the initial JS only ships the tiny `m`
 * component (PRD §5.2 / Addendum C). Features (incl. viewport/whileInView,
 * gestures) arrive in a separate chunk after paint. `strict` forbids the heavy
 * `motion.*` import anywhere — every animated element must use `m.*`.
 */
const loadFeatures = () => import('framer-motion').then((mod) => mod.domMax);

/**
 * App-wide motion gate (PRD §10). `reducedMotion="user"` makes Framer drop
 * transform/layout animations (keeping opacity) when the OS asks for it.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={loadFeatures} strict>
      <MotionConfig reducedMotion="user" transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
        {children}
      </MotionConfig>
    </LazyMotion>
  );
}
