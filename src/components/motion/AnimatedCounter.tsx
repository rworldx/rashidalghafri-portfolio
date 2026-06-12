'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface AnimatedCounterProps {
  /** Full display value, e.g. "100+", "86.3%", "< 1s", "−35%". */
  value: string;
  durationMs?: number;
}

/**
 * Counts up the numeric portion of `value` on first view, preserving any
 * prefix/suffix (<, +, %, −, s …). Reduced motion → shows the final value.
 *
 * All derivation happens *inside* the effect so the dependency list is only
 * stable values — deriving `match` in render put a fresh array in the deps and
 * caused the effect to re-run every frame (the visible "looping" glitch).
 */
export function AnimatedCounter({ value, durationMs = 1100 }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const match = value.match(/[\d.]+/);
    if (!match) {
      setDisplay(value);
      return;
    }
    const numStr = match[0];
    const target = parseFloat(numStr);
    const decimals = numStr.includes('.') ? numStr.split('.')[1]!.length : 0;

    // Not animating → show the final value immediately.
    if (!inView || reduced) {
      setDisplay(value);
      return;
    }

    let raf = 0;
    const start = performance.now();
    setDisplay(value.replace(numStr, (0).toFixed(decimals)));
    const tick = (now: number) => {
      const t = Math.min((now - start) / durationMs, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(value.replace(numStr, (target * eased).toFixed(decimals)));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, inView, reduced, durationMs]);

  return (
    <span ref={ref} className="tabular-nums">
      {display}
    </span>
  );
}
