'use client';

import { useMediaQuery } from './useMediaQuery';

/** True when the user requested reduced motion (PRD §10 — gate every animation). */
export function useReducedMotion(): boolean {
  return useMediaQuery('(prefers-reduced-motion: reduce)');
}
