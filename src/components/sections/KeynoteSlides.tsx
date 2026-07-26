'use client';

import { useCallback, useId, useRef, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { AnimatePresence, m, type PanInfo } from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { projects as allProjects } from '@content/projects';
import type { Project } from '@/types/project';
import { pick } from '@/lib/localized';
import { Container } from '@/components/layout/Container';
import { ProjectMedia } from '@/components/ui/ProjectMedia';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/lib/cn';

/**
 * THE KEYNOTE — one work at a time, docking into the room.
 *
 * A darkened gallery: the stage carries `class="dark"` so the whole token set
 * flips inside it regardless of the visitor's theme. That is deliberate and it
 * is why no colour is hardcoded here — a projection room is dark in a bright
 * building too, and doing it with the theme class means contrast, borders and
 * the accent all stay on-system instead of being hand-mixed.
 *
 * Slides move HORIZONTALLY, one at a time, StudyNest first. Four ways to
 * drive it, because a carousel that only responds to one of them is broken for
 * somebody: the named tabs, the arrow buttons, the keyboard (arrow keys, with
 * the tablist following roving-tabindex conventions), and a drag/swipe.
 *
 * Direction is tracked so a slide always enters from the side you came from —
 * motion that contradicts the gesture reads as a glitch.
 */
export function KeynoteSlides() {
  const t = useTranslations('gallery');
  const locale = useLocale();
  const reduced = useReducedMotion();
  const baseId = useId();

  // StudyNest leads because it is the flagship; the rest follow in order.
  const slides: Project[] = [
    ...allProjects.filter((p) => p.featured),
    ...allProjects.filter((p) => !p.featured),
  ].slice(0, 5);

  const [[index, direction], setSlide] = useState<[number, number]>([0, 0]);
  // A drag that finishes on top of the link must not navigate. Framer tells us
  // when a real drag started, which is more reliable than measuring pointer
  // deltas by hand and does not need a module-level listener.
  const draggingRef = useRef(false);

  const go = useCallback(
    (next: number, dir: number) => {
      const wrapped = (next + slides.length) % slides.length;
      setSlide([wrapped, dir]);
    },
    [slides.length],
  );

  const next = useCallback(() => go(index + 1, 1), [go, index]);
  const prev = useCallback(() => go(index - 1, -1), [go, index]);

  // Arrow keys drive the deck whenever focus is inside it. RTL swaps which
  // physical key means "forward", because in Arabic the deck reads right→left.
  const isRtl = locale === 'ar';
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      if (isRtl) prev();
      else next();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      if (isRtl) next();
      else prev();
    } else if (e.key === 'Home') {
      e.preventDefault();
      go(0, -1);
    } else if (e.key === 'End') {
      e.preventDefault();
      go(slides.length - 1, 1);
    }
  };

  const onDragEnd = (_: unknown, info: PanInfo) => {
    // Cleared on the next tick so the click that follows the release still
    // sees it set.
    window.setTimeout(() => {
      draggingRef.current = false;
    }, 0);
    // Commit on velocity OR distance — a fast flick and a slow deliberate drag
    // are both intent, and requiring distance alone makes flicks feel dead.
    const { offset, velocity } = info;
    const throwDistance = offset.x + velocity.x * 0.12;
    const threshold = 90;
    if (throwDistance < -threshold) {
      if (isRtl) prev();
      else next();
    } else if (throwDistance > threshold) {
      if (isRtl) next();
      else prev();
    }
  };

  const active = slides[index];
  if (!active) return null;

  return (
    // `dark` here is the stage, not the user's theme. See the note above.
    <section className="dark relative overflow-hidden bg-bg py-phi-4 text-text sm:py-phi-5">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="serif-display max-w-[12ch] text-text">{t('title')}</h2>

          {/* Arrows sit with the heading, not floating over the artwork. */}
          <div className="flex items-center gap-2">
            <DeckButton onClick={prev} label={t('previous')}>
              <ArrowLeft strokeWidth={1.75} aria-hidden className="size-4 rtl:rotate-180" />
            </DeckButton>
            <DeckButton onClick={next} label={t('next')}>
              <ArrowRight strokeWidth={1.75} aria-hidden className="size-4 rtl:rotate-180" />
            </DeckButton>
          </div>
        </div>
      </Container>

      {/* The stage. */}
      <div
        className="relative mt-phi-3 focus-visible:outline-none"
        onKeyDown={onKeyDown}
        tabIndex={-1}
      >
        <AnimatePresence initial={false} mode="wait" custom={direction}>
          <m.div
            key={active.slug}
            id={`${baseId}-panel-${index}`}
            role="tabpanel"
            aria-labelledby={`${baseId}-tab-${index}`}
            custom={direction}
            initial={
              reduced ? { opacity: 0 } : { opacity: 0, x: direction > 0 ? 90 : -90 }
            }
            animate={{ opacity: 1, x: 0 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, x: direction > 0 ? -70 : 70 }}
            transition={
              reduced
                ? { duration: 0.2 }
                : { type: 'spring', bounce: 0, duration: 0.55 }
            }
            drag={reduced ? false : 'x'}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.14}
            onDragStart={() => {
              draggingRef.current = true;
            }}
            onDragEnd={onDragEnd}
            className="cursor-grab active:cursor-grabbing"
          >
            <Container>
              <div className="grid items-center gap-phi-2 lg:grid-cols-[1fr_1.1fr] lg:gap-phi-3">
                {/* The work. */}
                <Link
                  href={`/projects/${active.slug}`}
                  aria-label={`${active.title} — ${t('open')}`}
                  // Dragging must not fire a navigation; a click that moved is
                  // a swipe, not a tap.
                  onClick={(e) => {
                    if (draggingRef.current) e.preventDefault();
                  }}
                  className="group order-1 block overflow-hidden rounded-xl border border-border shadow-lift lg:order-2"
                >
                  <ProjectMedia
                    project={active}
                    priority={index === 0}
                    sizes="(min-width: 1024px) 55vw, 100vw"
                    className="aspect-[1.6/1] transition-transform duration-[900ms] ease-out group-hover:scale-[1.02]"
                  />
                </Link>

                {/* The label. */}
                <div className="order-2 lg:order-1">
                  <p className="label mb-5 text-text-faint">
                    <span className="force-ltr">
                      {String(index + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
                    </span>
                    <span className="mx-2 opacity-50">·</span>
                    {active.year}
                  </p>

                  <h3 className="serif-2 text-text">{active.title}</h3>

                  <p className="measure mt-5 text-base text-text-muted sm:text-lg">
                    {pick(active.summary, locale)}
                  </p>

                  {active.stats && active.stats.length > 0 && (
                    <dl className="mt-phi flex flex-wrap gap-x-phi-2 gap-y-4">
                      {active.stats.slice(0, 3).map((s) => (
                        <div key={s.label.en} className="flex flex-col-reverse">
                          <dt className="mt-1 text-xs text-text-muted">
                            {pick(s.label, locale)}
                          </dt>
                          <dd className="tnum font-mono text-xl text-text">{s.value}</dd>
                        </div>
                      ))}
                    </dl>
                  )}

                  <Link
                    href={`/projects/${active.slug}`}
                    className="action group mt-phi-2 inline-flex items-center gap-2 border-b border-accent-line pb-1 text-sm font-medium text-accent"
                  >
                    {t('open')}
                    <ArrowUpRight
                      strokeWidth={1.75}
                      aria-hidden
                      className="size-4 transition-transform duration-quick ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </Link>
                </div>
              </div>
            </Container>
          </m.div>
        </AnimatePresence>
      </div>

      {/* Named tabs — a dot row tells you nothing about where you are going. */}
      <Container className="mt-phi-3">
        <div
          role="tablist"
          aria-label={t('title')}
          className="flex flex-wrap items-center gap-x-1 gap-y-2 border-t border-border pt-5"
        >
          {slides.map((p, i) => {
            const selected = i === index;
            return (
              <button
                key={p.slug}
                id={`${baseId}-tab-${i}`}
                role="tab"
                type="button"
                aria-selected={selected}
                aria-controls={`${baseId}-panel-${i}`}
                // Roving tabindex: one stop for the whole deck, arrows move
                // within it. Five separate tab stops would be tedious.
                tabIndex={selected ? 0 : -1}
                onClick={() => go(i, i > index ? 1 : -1)}
                className={cn(
                  'relative rounded-full px-4 py-2 text-sm transition-colors duration-quick ease-out',
                  selected ? 'text-text' : 'text-text-faint hover:text-text-muted',
                )}
              >
                {selected && (
                  <m.span
                    layoutId={`${baseId}-deck-active`}
                    aria-hidden
                    className="absolute inset-0 rounded-full bg-surface-2"
                    transition={{ type: 'spring', bounce: 0.18, duration: 0.5 }}
                  />
                )}
                <span className="relative">{p.title}</span>
              </button>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

function DeckButton({
  onClick,
  label,
  children,
}: {
  onClick: () => void;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="glass inline-flex size-11 items-center justify-center rounded-full text-text transition-transform duration-press ease-out active:scale-[0.94]"
    >
      {children}
    </button>
  );
}
