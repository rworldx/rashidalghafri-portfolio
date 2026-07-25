'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import { m, useMotionValueEvent, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { projects as allProjects } from '@content/projects';
import type { Project } from '@/types/project';
import { pick } from '@/lib/localized';
import { readTokenColor } from '@/lib/css-color';
import { useMounted } from '@/hooks/useMounted';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';
import { Container } from '@/components/layout/Container';
import { cn } from '@/lib/cn';
import type { FalajColors } from '@/components/three/FalajFlythrough';

const FalajFlythrough = dynamic(() => import('@/components/three/FalajFlythrough'), {
  ssr: false,
  loading: () => null,
});

/**
 * The journey — the site's one long cinematic moment.
 *
 * A tall scroll container with a pinned viewport inside it. Scrolling does not
 * move the page past this section; it drives a camera *down a falaj channel*,
 * and each branch the camera passes delivers water to one project. By the time
 * a visitor reaches the bottom they have travelled the system the whole
 * portfolio is built on.
 *
 * WHY THIS IS SPLIT IN TWO COMPONENTS — the 3D variant owns `sectionRef`, and
 * `useScroll` / IntersectionObserver must bind to it. When both variants lived
 * in one component those hooks ran on the FIRST mount, while the fallback was
 * still rendering and the ref was null; the observer never attached, `paused`
 * never flipped to false, and the render loop never drew a single frame —
 * a fully transparent canvas. Hooks and the DOM they measure have to mount
 * together, so the 3D branch is its own component.
 */
export function FalajJourney() {
  const { resolvedTheme } = useTheme();
  const mounted = useMounted();
  const reduced = useReducedMotion();
  const [colors, setColors] = useState<FalajColors | null>(null);
  const [canRender3D, setCanRender3D] = useState(false);

  // Featured first, then the rest, capped at four so every branch in the 3D
  // scene has exactly one project to deliver to.
  const outlets = [
    ...allProjects.filter((p) => p.featured),
    ...allProjects.filter((p) => !p.featured),
  ].slice(0, 4);

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      setCanRender3D(!!(canvas.getContext('webgl2') || canvas.getContext('webgl')));
    } catch {
      setCanRender3D(false);
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    setColors({
      fog: readTokenColor('--bg', '#0b1020'),
      stone: readTokenColor('--falaj-stone', '#4a5568'),
      stoneEdge: readTokenColor('--falaj-stone-deep', '#2d3444'),
      water: readTokenColor('--accent', '#3b64e0'),
      glow: readTokenColor('--accent-hover', '#7ea6ff'),
    });
  }, [mounted, resolvedTheme]);

  if (!mounted || reduced || !canRender3D || !colors) {
    return <JourneyFallback outlets={outlets} />;
  }

  return (
    <ErrorBoundary fallback={<JourneyFallback outlets={outlets} />}>
      <Journey3D outlets={outlets} colors={colors} isDark={resolvedTheme === 'dark'} />
    </ErrorBoundary>
  );
}

/** The story, told flat. Reduced motion, no WebGL, or a scene that threw. */
function JourneyFallback({ outlets }: { outlets: Project[] }) {
  const t = useTranslations('journeySection');
  const locale = useLocale();

  return (
    <section className="py-phi-4">
      <Container>
        <h2 className="display-2 max-w-[22ch] text-text">{t('title')}</h2>
        <p className="measure mt-phi text-lg text-text-muted">{t('lede')}</p>
        <ol className="mt-phi-3 border-t border-border">
          {outlets.map((p) => (
            <li key={p.slug} className="border-b border-border">
              <Link
                href={`/projects/${p.slug}`}
                className="group flex flex-wrap items-baseline gap-x-6 gap-y-1 py-7 transition-colors duration-quick ease-out"
              >
                <span className="display-4 text-text transition-colors duration-quick ease-out group-hover:text-accent">
                  {p.title}
                </span>
                <span className="measure text-sm text-text-muted">
                  {pick(p.summary, locale)}
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

function Journey3D({
  outlets,
  colors,
  isDark,
}: {
  outlets: Project[];
  colors: FalajColors;
  isDark: boolean;
}) {
  const t = useTranslations('journeySection');
  const locale = useLocale();
  const sectionRef = useRef<HTMLElement>(null);

  // The camera reads scroll every frame. Putting that in React state would
  // re-render this tree sixty times a second, so the MotionValue writes into a
  // plain ref the render loop samples. Only the chapter index — which changes
  // four times in the whole section — is allowed to be state.
  const progressRef = useRef(0);
  const [chapter, setChapter] = useState(0);
  const [paused, setPaused] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    progressRef.current = v;
    const next = Math.min(outlets.length - 1, Math.floor(v * outlets.length * 1.08));
    setChapter((prev) => (prev === next ? prev : next));
  });

  // Copy fades out over the last stretch so the channel is clean on exit.
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.04, 0.9, 1], [0, 1, 1, 0]);

  // Only render frames while the section is actually on screen.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setPaused(!e?.isIntersecting), {
      threshold: 0,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const active = outlets[chapter];

  return (
    <section
      ref={sectionRef}
      // Roughly one screen of scroll per outlet, plus a lead-in and a run-out.
      // Long enough that the travel reads as a journey, short enough that it
      // never traps a reader who just wants to get past it — and shorter still
      // on phones, where the same number of screens is a much longer thumb
      // journey and patience runs out sooner.
      className="relative h-[300vh] sm:h-[460vh]"
      aria-label={t('title')}
    >
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden">
        <div className="absolute inset-0">
          <FalajFlythrough
            colors={colors}
            progressRef={progressRef}
            paused={paused}
            isDark={isDark}
          />
        </div>

        {/* Legibility floor for copy sitting over a moving scene. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg via-bg/10 to-bg/45"
        />

        <m.div
          style={{ opacity: overlayOpacity }}
          className="pointer-events-none absolute inset-0 flex items-end pb-phi-3 sm:pb-phi-4"
        >
          <Container>
            <div className="max-w-[34rem]">
              <p className="label mb-4 text-accent">{t('eyebrow')}</p>

              <div className="min-h-[11rem] sm:min-h-[9.5rem]">
                {active && (
                  <m.div
                    key={active.slug}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
                  >
                    <h2 className="display-2 text-text">{active.title}</h2>
                    <p className="measure-tight mt-3 text-base text-text-muted sm:text-lg">
                      {pick(active.summary, locale)}
                    </p>
                    <Link
                      href={`/projects/${active.slug}`}
                      className="action group pointer-events-auto mt-5 inline-flex items-center gap-2 border-b border-accent-line pb-1 font-medium text-accent"
                    >
                      {t('open')}
                      <ArrowRight
                        strokeWidth={1.75}
                        aria-hidden
                        className="size-4 transition-transform duration-quick ease-out group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5"
                      />
                    </Link>
                  </m.div>
                )}
              </div>

              {/* Which outlet you are at — the only progress cue in here. */}
              <ol className="mt-phi-2 flex items-center gap-2" aria-hidden>
                {outlets.map((p, i) => (
                  <li
                    key={p.slug}
                    className={cn(
                      'h-[2px] flex-1 rounded-full transition-colors duration-500 ease-out',
                      i <= chapter ? 'bg-accent' : 'bg-border',
                    )}
                  />
                ))}
              </ol>
            </div>
          </Container>
        </m.div>
      </div>
    </section>
  );
}
