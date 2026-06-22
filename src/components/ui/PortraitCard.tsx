'use client';

import { useRef, useState } from 'react';
import { m, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useLocale } from 'next-intl';
import { site } from '@content/site';
import { pick } from '@/lib/localized';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { StatusDot } from './StatusDot';

/**
 * Interactive portrait card: a 3D tilt-on-pointer photo with an accent glow and
 * a caption strip. Falls back to a styled monogram if the photo is missing, and
 * disables the tilt under reduced motion. Photo path comes from `site.portrait`.
 */
export function PortraitCard() {
  const locale = useLocale();
  const reduced = useReducedMotion();
  const [imgOk, setImgOk] = useState(true);
  const ref = useRef<HTMLDivElement>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [7, -7]), { stiffness: 150, damping: 15 });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-7, 7]), { stiffness: 150, damping: 15 });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduced) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const reset = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <div className="relative" style={{ perspective: 1000 }} ref={ref} onMouseMove={onMove} onMouseLeave={reset}>
      {/* Ambient accent glow behind the card. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-6 -z-10 rounded-[2rem] opacity-40 blur-3xl"
        style={{ background: 'radial-gradient(60% 60% at 50% 30%, var(--accent) 0%, transparent 70%)' }}
      />

      <m.div
        style={reduced ? undefined : { rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="relative overflow-hidden rounded-lg border border-border bg-surface shadow-card"
      >
        <div className="relative aspect-[4/5] w-full">
          {imgOk ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={site.portrait}
              alt={pick(site.displayName, locale)}
              onError={() => setImgOk(false)}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-accent-soft to-surface-2">
              <span className="font-display text-7xl font-bold text-accent">{site.monogram}</span>
            </div>
          )}

          {/* Scrim for caption legibility (photo treatment, not theme chrome). */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{ background: 'linear-gradient(to top, rgba(8,11,18,0.72) 0%, rgba(8,11,18,0) 55%)' }}
          />

          {/* Availability chip — sits on the photo, so it's always white text
              on a dark scrim regardless of theme. */}
          <div
            className="absolute end-3 top-3 inline-flex items-center gap-1.5 rounded-sm px-2 py-1 font-mono text-[11px] text-white backdrop-blur"
            style={{ background: 'rgba(8,11,18,0.55)' }}
          >
            <StatusDot />
            {pick(site.location, locale)}
          </div>

          {/* Caption. */}
          <div className="absolute inset-x-0 bottom-0 p-5">
            <p className="font-display text-xl font-semibold text-white">
              {pick(site.displayName, locale)}
            </p>
            <p className="mt-0.5 font-mono text-xs text-white/80">{pick(site.role, locale)}</p>
          </div>
        </div>
      </m.div>
    </div>
  );
}
