'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface AnimatedCounterProps {
  /** Full display value, e.g. "100+", "86.3%", "125". */
  value: string;
  durationMs?: number;
}

/**
 * Counts up the numeric portion of `value` on first view, preserving any
 * prefix/suffix (+, %, etc.). Reduced motion → shows the final value instantly.
 */
export function AnimatedCounter({ value, durationMs = 1100 }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduced = useReducedMotion();

  const match = value.match(/[\d.]+/);
  const target = match ? parseFloat(match[0]) : NaN;
  const decimals = match && match[0].includes('.') ? match[0].split('.')[1]!.length : 0;

  const [display, setDisplay] = useState(() =>
    isNaN(target) ? value : value.replace(match![0], '0'),
  );

  useEffect(() => {
    if (isNaN(target)) return;
    if (!inView || reduced) {
      setDisplay(value);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / durationMs, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      const current = (target * eased).toFixed(decimals);
      setDisplay(value.replace(match![0], current));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduced, target, decimals, durationMs, value, match]);

  return (
    <span ref={ref} className="tabular-nums">
      {display}
    </span>
  );
}
