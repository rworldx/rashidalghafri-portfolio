'use client';

import { useLocale, useTranslations } from 'next-intl';
import { ArrowUpRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { projects as allProjects } from '@content/projects';
import type { Project } from '@/types/project';
import { pick } from '@/lib/localized';
import { Container } from '@/components/layout/Container';
import { Reveal } from '@/components/motion/Reveal';
import { BlurText } from '@/components/motion/BlurText';
import { ProjectMedia } from '@/components/ui/ProjectMedia';
import { cn } from '@/lib/cn';

/**
 * THE GALLERY — one work at a time, hung on a wall.
 *
 * Each project gets a full room: an oversized plate, an exhibition-label title
 * in the serif, and the measured outcomes as a caption. No cards, no grid, no
 * three-up row of equal tiles — a grid says "here are some things", a gallery
 * says "look at this one".
 *
 * The alternation is capped deliberately. Two plate-left / plate-right rows in
 * a row is rhythm; a third is a zigzag template, so the third exhibit breaks
 * to a full-width plate with the label beneath it.
 */
export function Gallery() {
  const t = useTranslations('gallery');
  const locale = useLocale();

  // Featured first, then the rest. Fewer, stronger exhibits — the whole point
  // of the room is that nothing competes with what you are looking at.
  const exhibits: Project[] = [
    ...allProjects.filter((p) => p.featured),
    ...allProjects.filter((p) => !p.featured),
  ].slice(0, 4);

  return (
    <section className="py-phi-4 sm:py-phi-5">
      <Container>
        <BlurText
          as="h2"
          text={t('title')}
          upright={t('upright')}
          className="serif-display max-w-[13ch] text-text"
        />
      </Container>

      <ul className="mt-phi-4 space-y-phi-4 sm:space-y-phi-5">
        {exhibits.map((project, i) => (
          <Exhibit key={project.slug} project={project} index={i} locale={locale} />
        ))}
      </ul>

      <Container className="mt-phi-4">
        <Reveal>
          <Link
            href="/projects"
            className="action group inline-flex items-center gap-2 border-b border-accent-line pb-1 font-medium text-accent"
          >
            {t('viewAll')}
            <ArrowUpRight
              strokeWidth={1.75}
              aria-hidden
              className="size-4 transition-transform duration-quick ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}

function Exhibit({
  project,
  index,
  locale,
}: {
  project: Project;
  index: number;
  locale: string;
}) {
  const t = useTranslations('gallery');

  // Every third exhibit breaks the alternation, so the page never settles into
  // a zigzag. Index 2 is full-bleed; the others alternate sides.
  const fullWidth = index % 3 === 2;
  const plateFirst = index % 2 === 0;

  const stats = project.stats?.slice(0, 3) ?? [];

  return (
    <li>
      <Container>
        <div
          className={cn(
            'grid gap-phi-2',
            !fullWidth && 'lg:grid-cols-[1.618fr_1fr] lg:items-center lg:gap-phi-3',
          )}
        >
          {/* The plate. */}
          <Reveal
            distance={26}
            className={cn(!fullWidth && !plateFirst && 'lg:order-2')}
          >
            <Link
              href={`/projects/${project.slug}`}
              aria-label={`${project.title} — ${t('open')}`}
              className="group block overflow-hidden rounded-xl border border-border shadow-card transition-[box-shadow,border-color] duration-500 ease-out hover:border-border-strong hover:shadow-lift"
            >
              <ProjectMedia
                project={project}
                priority={index === 0}
                sizes={fullWidth ? '100vw' : '(min-width: 1024px) 62vw, 100vw'}
                className={cn(
                  'transition-transform duration-[900ms] ease-out group-hover:scale-[1.015]',
                  fullWidth ? 'aspect-[2.1/1]' : 'aspect-[1.5/1]',
                )}
              />
            </Link>
          </Reveal>

          {/* The wall label. */}
          <Reveal delay={0.08} className={cn(!fullWidth && !plateFirst && 'lg:order-1')}>
            <p className="label mb-4 text-text-faint">
              {String(index + 1).padStart(2, '0')} · {project.year}
            </p>
            <h3 className="serif-2 text-text">{project.title}</h3>
            <p className="measure mt-4 text-base text-text-muted sm:text-lg">
              {pick(project.summary, locale)}
            </p>

            {stats.length > 0 && (
              <dl className="mt-phi flex flex-wrap gap-x-phi-2 gap-y-4">
                {stats.map((s) => (
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
              href={`/projects/${project.slug}`}
              className="action group mt-phi inline-flex items-center gap-2 border-b border-accent-line pb-1 text-sm font-medium text-accent"
            >
              {t('open')}
              <ArrowUpRight
                strokeWidth={1.75}
                aria-hidden
                className="size-4 transition-transform duration-quick ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          </Reveal>
        </div>
      </Container>
    </li>
  );
}
