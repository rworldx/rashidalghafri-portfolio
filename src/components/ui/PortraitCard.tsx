'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { m, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useLocale } from 'next-intl';
import { site } from '@content/site';
import { pick } from '@/lib/localized';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { StatusDot } from './StatusDot';

/**
 * The portrait, as a card that tracks the pointer in 3D.
 *
 * Rotation runs through springs rather than being wired straight to the mouse:
 * tying a visual directly to pointer position feels artificial because it has
 * no mass. The tilt is decorative, which is exactly when a spring is the right
 * call — and it is dropped entirely under reduced motion.
 *
 * Falls back to a monogram if the photo is missing, so the layout never
 * collapses around a broken image.
 */
export function PortraitCard() {
  const locale = useLocale();
  const reduced = useReducedMotion();
  const [imgOk, setImgOk] = useState(true);
  const ref = useRef<HTMLDivElement>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const spring = { stiffness: 140, damping: 18, mass: 0.6 };
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [6.5, -6.5]), spring);
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-6.5, 6.5]), spring);

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduced || e.pointerType !== 'mouse') return;
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
    <div
      className="relative [perspective:1200px]"
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
    >
      {/* Ambient accent behind the card, giving it somewhere to sit. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-8 -z-10 rounded-[3rem] opacity-30 blur-3xl"
        style={{
          background:
            'radial-gradient(58% 58% at 50% 28%, var(--accent) 0%, transparent 72%)',
        }}
      />

      <m.div
        style={reduced ? undefined : { rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="relative overflow-hidden rounded-lg border border-border bg-surface shadow-lift"
      >
        <div className="relative aspect-[4/5] w-full">
          {imgOk ? (
            <Image
              src={site.portrait}
              alt={`${site.name}, ${pick(site.role, locale)}`}
              fill
              sizes="(min-width: 1024px) 34vw, (min-width: 640px) 60vw, 92vw"
              className="object-cover"
              onError={() => setImgOk(false)}
              priority={false}
            />
          ) : (
            <div className="flex size-full items-center justify-center bg-surface-2">
              <span className="text-[5rem] font-medium tracking-[-0.04em] text-accent">
                {site.monogram}
              </span>
            </div>
          )}

          {/* Scrim so the caption stays legible over any photograph. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'linear-gradient(to top, rgb(8 11 18 / 0.78) 0%, rgb(8 11 18 / 0) 52%)',
            }}
          />

          <div className="absolute end-4 top-4 inline-flex items-center gap-2 font-mono text-2xs uppercase tracking-[0.12em] text-white">
            <StatusDot />
            {pick(site.location, locale)}
          </div>

          <div className="absolute inset-x-0 bottom-0 p-6">
            <p className="text-xl font-medium tracking-[-0.02em] text-white">
              {pick(site.displayName, locale)}
            </p>
            <p className="mt-1 font-mono text-2xs uppercase tracking-[0.12em] text-white/75">
              {pick(site.role, locale)}
            </p>
          </div>
        </div>
      </m.div>
    </div>
  );
}
