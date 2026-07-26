'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import { ArrowUpRight, Download } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { site } from '@content/site';
import { proof } from '@content/proof';
import { pick } from '@/lib/localized';
import { readTokenColor } from '@/lib/css-color';
import { useMounted } from '@/hooks/useMounted';
import { useThemeTokens } from '@/hooks/useThemeTokens';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { Container } from '@/components/layout/Container';
import { BlurText } from '@/components/motion/BlurText';
import { StatusDot } from '@/components/ui/StatusDot';
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';
import { cn } from '@/lib/cn';
import type { BackdropColors } from '@/components/three/LiquidBackdrop';

const LiquidBackdrop = dynamic(() => import('@/components/three/LiquidBackdrop'), {
  ssr: false,
  loading: () => null,
});

/**
 * THE MUSEUM — the entrance hall.
 *
 * A single lit room: a slow liquid-metal light turning behind the glass, the
 * name set as an exhibition title, and the least chrome that can still carry a
 * visitor onward. Everything floats; nothing is boxed.
 *
 * FOUR text elements, hard limit — one chip, the title, one sentence, the two
 * actions. The credentials sit in glass plates below the fold line, the way a
 * gallery puts the wall label beside the work rather than inside the frame.
 *
 * The title is CSS-animated, not Framer-animated: it is the LCP element, and
 * holding it behind a lazily-loaded motion bundle would delay the one line
 * anyone came to read.
 */
export function Hero() {
  const t = useTranslations('hero');
  const locale = useLocale();
  const { resolvedTheme } = useTheme();
  const mounted = useMounted();
  const reduced = useReducedMotion();
  const isEnglish = locale === 'en';

  const ref = useRef<HTMLElement>(null);
  const [canRender3D, setCanRender3D] = useState(false);
  const [paused, setPaused] = useState(false);

  const name = pick(site.displayName, locale);
  // The given name stays upright against the italic family name. Emphasis is
  // Latin-only: Arabic has no italic, and the Thmanyah display face ships none.
  const upright = isEnglish ? name.split(' ')[0] : undefined;

  // Two plates only. The full record is one section below; a hero carrying
  // four statistics has stopped being a hero and become a dashboard.
  const plates = proof.slice(0, 2);

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      setCanRender3D(!!(canvas.getContext('webgl2') || canvas.getContext('webgl')));
    } catch {
      setCanRender3D(false);
    }
  }, []);

  // Re-read on the real class swap, never on `resolvedTheme` — see the hook.
  const colors = useThemeTokens<BackdropColors>(readBackdropColors);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setPaused(!e?.isIntersecting), {
      threshold: 0,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const showBackdrop = mounted && !reduced && canRender3D && colors;

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100dvh] flex-col justify-center overflow-hidden pb-phi-2 pt-28 sm:pt-32"
    >
      {/*
        The light in the room. Reduced motion or no WebGL falls back to a still
        gradient wash rather than a blank wall — the composition depends on
        something being behind the glass.
      */}
      <div aria-hidden className="absolute inset-0 -z-10">
        {showBackdrop ? (
          <ErrorBoundary fallback={<StillWash />}>
            <LiquidBackdrop
              colors={colors}
              paused={paused}
              isDark={resolvedTheme === 'dark'}
            />
          </ErrorBoundary>
        ) : (
          <StillWash />
        )}
        {/*
          Legibility floor. Type sits over a moving surface here, so this is
          not decoration — without it the headline's contrast changes as the
          material turns underneath it.
        */}
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/55 to-bg/75" />
      </div>

      <Container className="relative">
        <p
          className="glass hero-in on-glass mb-phi inline-flex items-center gap-2.5 rounded-full py-2 pe-4 ps-3 font-mono text-2xs uppercase tracking-[0.12em] text-text"
        >
          <StatusDot />
          {pick(site.status, locale)}
        </p>

        <BlurText
          as="h1"
          text={name}
          upright={upright}
          delay={0.15}
          className="serif-display max-w-[15ch] text-text"
        />

        <p
          className="hero-in measure-tight mt-phi text-lg text-text-muted sm:text-xl"
          style={{ '--d': '760ms' } as CSSProperties}
        >
          {pick(site.tagline, locale)}
        </p>

        <div
          className="hero-in mt-phi-2 flex flex-wrap items-center gap-x-6 gap-y-4"
          style={{ '--d': '880ms' } as CSSProperties}
        >
          {/* Exactly one primary action per view. */}
          <Link
            href="/projects"
            className="glass-strong on-glass group inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm text-text transition-transform duration-press ease-out active:scale-[0.97]"
          >
            {t('viewWork')}
            <ArrowUpRight
              strokeWidth={1.75}
              aria-hidden
              className="size-4 transition-transform duration-quick ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>
          <a
            href={site.cvPath}
            download
            className="action inline-flex items-center gap-2 text-sm text-text-muted transition-colors duration-quick ease-out hover:text-text"
          >
            <Download strokeWidth={1.5} aria-hidden className="size-4" />
            {t('downloadCv')}
          </a>
        </div>

        {/* Wall labels. */}
        <dl
          className="hero-in mt-phi-3 flex flex-wrap gap-4"
          style={{ '--d': '1000ms' } as CSSProperties}
        >
          {plates.map((p) => (
            <div
              key={p.label.en}
              // Width is a FLOOR, not a fixed size. Arabic sets these figures
              // as words ("أفضل ٣٠"), which wrapped and cramped a fixed plate.
              className="glass flex min-w-[13.5rem] max-w-[20rem] flex-col-reverse rounded-lg p-5"
            >
              <dt className="mt-2 text-xs text-text-muted">{pick(p.label, locale)}</dt>
              <dd className="serif-2 tnum text-text">{pick(p.value, locale)}</dd>
            </div>
          ))}
        </dl>
      </Container>

      {/* The credential row — a gallery's list of lenders, set in the same hand. */}
      <Container
        className={cn(
          'hero-in relative mt-phi-3 hidden items-baseline gap-x-phi-2 gap-y-3 sm:flex sm:flex-wrap',
        )}
      >
        <span className="label text-text-faint">{t('creditsLabel')}</span>
        {['LIYSF', 'IEEE', 'Riyada', 'Omantel', 'Injaz'].map((n) => (
          <span key={n} className="serif-2 text-xl text-text-muted sm:text-2xl">
            {n}
          </span>
        ))}
      </Container>
    </section>
  );
}

function readBackdropColors(): BackdropColors {
  return {
    base: readTokenColor('--backdrop-base', '#0d1220'),
    sheen: readTokenColor('--backdrop-sheen', '#3b4a6b'),
    accent: readTokenColor('--accent', '#3b64e0'),
  };
}

/** No WebGL, or reduced motion: a still wash, so the room is still lit. */
function StillWash() {
  return (
    <div
      aria-hidden
      className="size-full bg-[radial-gradient(120%_90%_at_20%_10%,var(--accent-soft),transparent_60%),radial-gradient(100%_80%_at_85%_25%,var(--surface-2),transparent_65%)]"
    />
  );
}
