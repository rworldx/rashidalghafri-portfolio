'use client';

import { useCallback, useId, useLayoutEffect, useRef, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { AnimatePresence, m, type PanInfo } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { projects as allProjects } from '@content/projects';
import type { Project } from '@/types/project';
import { pick } from '@/lib/localized';
import { Container } from '@/components/layout/Container';
import { ProjectMedia } from '@/components/ui/ProjectMedia';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { cn } from '@/lib/cn';

/**
 * THE KEYNOTE — a coverflow deck.
 *
 * The active work stands square-on in the centre at full size; its neighbours
 * sit behind and to either side, turned away on the Y axis and scaled back, so
 * you can always see what is coming. Moving the deck rotates the next one to
 * face you.
 *
 * The stage FOLLOWS the visitor's theme. It used to force `class="dark"` so
 * the room stayed dark inside a light page, which read well but broke
 * something more important: every asset with a light and a dark variant
 * resolves its variant from the nearest `.dark` ancestor, so inside a
 * permanently dark stage those assets were frozen on their dark version and
 * the theme toggle did nothing to them. Separation now comes from `bg-bg-deep`,
 * one step off the page, which reads as a distinct room in both themes and
 * lets every cover switch with the toggle.
 *
 * GEOMETRY. Offsets are the shortest signed distance around a RING, not along
 * a line, so with only three works the deck still fills both side slots
 * instead of leaving a hole at each end. Positions derive from a measured
 * stage width, so the same code frames correctly from a phone to an ultrawide.
 *
 * FOUR WAYS TO DRIVE IT, because a carousel that answers only one of them is
 * broken for somebody: click a side card, the arrow buttons, the arrow keys
 * (roving tabindex, so the deck is one tab stop rather than six), and
 * drag/swipe that commits on velocity OR distance so a flick and a slow
 * deliberate drag both read as intent.
 */
export function KeynoteSlides() {
  const t = useTranslations('gallery');
  const locale = useLocale();
  const reduced = useReducedMotion();
  /**
   * Drag is for TOUCH only.
   *
   * Clicking a side card is the way to move the deck. With a mouse, arming a
   * drag on the whole stage means every click starts a gesture first, which
   * makes selecting a card feel hesitant. On a phone the opposite is true: a
   * neighbour is mostly off-screen and cannot be tapped, so swipe is the only
   * way to reach it. So the deck is draggable on coarse pointers and purely
   * clickable on fine ones.
   */
  const coarsePointer = useMediaQuery('(pointer: coarse)');
  const baseId = useId();
  const isRtl = locale === 'ar';

  // StudyNest leads because it is the flagship; the rest follow in order.
  const slides: Project[] = [
    ...allProjects.filter((p) => p.featured),
    ...allProjects.filter((p) => !p.featured),
  ].slice(0, 6);

  const [index, setIndex] = useState(0);
  const stageRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);
  const [stageWidth, setStageWidth] = useState(0);

  /**
   * Measured BEFORE paint, not after.
   *
   * With a plain effect the first frame renders at `stageWidth = 0`, so every
   * card collapses to the clamped minimum and the deck visibly snaps to its
   * real size a frame later. That first impression was the whole problem: the
   * deck looked broken for the moment a visitor first reached it.
   *
   * `useLayoutEffect` runs after the DOM is laid out and before the browser
   * paints, so the first frame a visitor sees is already correct. The
   * ResizeObserver then keeps it correct through rotation and resizing.
   */
  useLayoutEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    setStageWidth(el.getBoundingClientRect().width);
    const ro = new ResizeObserver(([entry]) =>
      setStageWidth(entry?.contentRect.width ?? 0),
    );
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const count = slides.length;
  const go = useCallback(
    (next: number) => setIndex(((next % count) + count) % count),
    [count],
  );
  const next = useCallback(() => go(index + 1), [go, index]);
  const prev = useCallback(() => go(index - 1), [go, index]);

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
      go(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      go(count - 1);
    }
  };

  const onDragEnd = (_: unknown, info: PanInfo) => {
    // Cleared on the next tick so the click that follows a release still sees
    // it set and can cancel its own navigation.
    window.setTimeout(() => {
      draggingRef.current = false;
    }, 0);
    const thrown = info.offset.x + info.velocity.x * 0.12;
    const threshold = 70;
    if (thrown < -threshold) {
      if (isRtl) prev();
      else next();
    } else if (thrown > threshold) {
      if (isRtl) next();
      else prev();
    }
  };

  // Card geometry from the measured stage. The neighbours step out by nearly a
  // full card width so they read as whole works standing beside the centre
  // one, not as slivers tucked behind it. Tighter than this and the deck stops
  // showing you what is coming, which is the only reason to build a deck.
  /**
   * A FIXED fallback, not `window.innerWidth`.
   *
   * Reading the window during render makes the server and the first client
   * render disagree, which React reports as a hydration mismatch. The same
   * constant on both sides hydrates cleanly, and the layout effect above
   * replaces it with the true width before the browser paints.
   */
  const measured = stageWidth || 1280;

  /**
   * Proportions — FULL BLEED.
   *
   * The deck spans the whole viewport and the neighbours deliberately run off
   * both edges, so the row reads as continuing past the screen rather than
   * ending politely inside the content column. The section clips them.
   *
   * The step is set so each neighbour's inner edge meets the centre card's
   * outer edge with no gap. That has to account for foreshortening: a card
   * turned 30 degrees occupies cos(30) of its flat width, so the step is
   * measured against the turned width, not the flat one.
   */
  const cardWidth = Math.min(Math.max(measured * 0.47, 220), 720);
  const step = cardWidth * 0.88;

  const active = slides[index];
  if (!active) return null;

  return (
    // `dark` here is the stage, not the visitor's theme. See the note above.
    <section className="relative overflow-hidden bg-bg-deep py-phi-4 text-text sm:py-phi-5">
      <Container>
        <h2 className="museum-1 max-w-[14ch] text-text">{t('title')}</h2>
      </Container>

      {/* ── The deck ─────────────────────────────────────────────────────── */}
      <m.div
        ref={stageRef}
        onKeyDown={onKeyDown}
        tabIndex={-1}
        drag={reduced || !coarsePointer ? false : 'x'}
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.08}
        onDragStart={() => {
          draggingRef.current = true;
        }}
        onDragEnd={onDragEnd}
        className="relative mt-phi-3 h-[42vw] max-h-[560px] min-h-[230px] w-full focus-visible:outline-none"
        // Perspective belongs on the STAGE so every card shares one vanishing
        // point. Per-card perspective makes each turn about its own centre and
        // the row stops reading as a single object.
        style={{ perspective: '1600px' }}
      >
        {/*
          POINTER-TRANSPARENT, and this is load-bearing.

          Hit testing inside a `preserve-3d` context is depth-aware. This
          wrapper sits at z = 0 while the side cards are pushed back to
          z = -170 and beyond, so the wrapper is physically IN FRONT of them
          and swallowed every click aimed at a neighbour. Clicking a side card
          did nothing at all.

          The wrapper takes no pointer events; each card re-enables them for
          itself. The drag gesture moved up to the stage, which is not
          3D-transformed and so cannot occlude anything.
        */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {slides.map((project, i) => {
            // Shortest signed distance around the ring — this is what lets a
            // three-item deck still show a card on both sides.
            let offset = i - index;
            if (offset > count / 2) offset -= count;
            if (offset < -count / 2) offset += count;

            const dir = isRtl ? -1 : 1;
            const distance = Math.abs(offset);
            const isActive = offset === 0;
            // Past the second neighbour, hide rather than stack: a deep pile
            // of near-invisible cards costs paint and buys nothing.
            const hidden = distance > 2;

            return (
              <m.div
                key={project.slug}
                className="absolute left-1/2 top-1/2"
                initial={false}
                animate={
                  reduced
                    ? { x: '-50%', y: '-50%', opacity: isActive ? 1 : 0 }
                    : {
                        x: `calc(-50% + ${offset * step * dir}px)`,
                        y: '-50%',
                        rotateY: -offset * dir * 30,
                        // Real depth, not z-index. Inside a `preserve-3d`
                        // context the browser paints by 3D position and
                        // IGNORES z-index entirely — with every card at z=0
                        // they sorted by DOM order, so later slides drew on
                        // top of the centre one and the active card appeared
                        // to be see-through.
                        z: -distance * 170,
                        scale: 1 - distance * 0.1,
                        opacity: hidden ? 0 : 1 - distance * 0.25,
                      }
                }
                transition={{ type: 'spring', bounce: 0, duration: 0.62 }}
                style={{
                  width: cardWidth,
                  // Kept as a fallback for the reduced-motion branch, which
                  // does not use 3D transforms at all.
                  zIndex: count - distance,
                  transformStyle: 'preserve-3d',
                  pointerEvents: hidden ? 'none' : 'auto',
                }}
                aria-hidden={hidden || undefined}
              >
                <SlideCard
                  project={project}
                  isActive={isActive}
                  openLabel={t('open')}
                  panelId={`${baseId}-panel-${i}`}
                  tabId={`${baseId}-tab-${i}`}
                  onSelect={() => go(i)}
                  draggingRef={draggingRef}
                  priority={i === 0}
                />
              </m.div>
            );
          })}
        </div>
      </m.div>

      {/* ── The wall label for whatever is facing you ────────────────────── */}
      <Container className="mt-phi-2">
        <AnimatePresence mode="wait">
          <m.div
            key={active.slug}
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: -10 }}
            transition={{ duration: 0.34, ease: [0.23, 1, 0.32, 1] }}
            className="max-w-[46rem]"
          >
            <p className="label mb-4 text-text-faint">
              <span className="force-ltr">
                {String(index + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
              </span>
              <span className="mx-2 opacity-50">·</span>
              {active.year}
            </p>

            <h3 className="museum-2 text-text">{active.title}</h3>

            <p className="measure mt-4 text-base text-text-muted sm:text-lg">
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
          </m.div>
        </AnimatePresence>
      </Container>

      {/* Named tabs — a row of dots tells you nothing about where you land. */}
      <Container className="mt-phi-2">
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
                tabIndex={selected ? 0 : -1}
                onClick={() => go(i)}
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

/**
 * One card in the deck.
 *
 * The centre card is a LINK to the case study; the side cards are BUTTONS that
 * bring themselves to the front. Making every card a link means a click on a
 * half-turned card navigates somewhere the visitor cannot properly see yet —
 * the classic carousel trap.
 */
function SlideCard({
  project,
  isActive,
  openLabel,
  panelId,
  tabId,
  onSelect,
  draggingRef,
  priority,
}: {
  project: Project;
  isActive: boolean;
  openLabel: string;
  panelId: string;
  tabId: string;
  onSelect: () => void;
  draggingRef: React.MutableRefObject<boolean>;
  priority: boolean;
}) {
  const media = (
    <ProjectMedia
      project={project}
      priority={priority}
      sizes="(min-width: 1024px) 62vw, 90vw"
      className="aspect-[1.6/1] w-full"
    />
  );

  const shell = cn(
    // `isolate` is load-bearing. Logo covers blend with `mix-blend-screen`,
    // and without a fresh stacking context that blend reaches THROUGH the card
    // into the cards stacked behind it — the centre slide dissolved into the
    // deck and the neighbours showed through it.
    'isolate block w-full overflow-hidden rounded-xl border border-border bg-surface',
    'transition-[border-color] duration-500 ease-out',
    isActive ? 'shadow-lift hover:border-border-strong' : 'cursor-pointer',
  );

  if (isActive) {
    return (
      <div id={panelId} role="tabpanel" aria-labelledby={tabId}>
        <Link
          href={`/projects/${project.slug}`}
          aria-label={`${project.title} — ${openLabel}`}
          // A drag that finishes on the card is a swipe, not a tap.
          onClick={(e) => {
            if (draggingRef.current) e.preventDefault();
          }}
          className={shell}
        >
          {media}
        </Link>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={(e) => {
        if (draggingRef.current) {
          e.preventDefault();
          return;
        }
        onSelect();
      }}
      aria-label={project.title}
      className={shell}
    >
      {media}
    </button>
  );
}

