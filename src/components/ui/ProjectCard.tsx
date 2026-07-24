'use client';

import { useLocale } from 'next-intl';
import { ArrowUpRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import type { Project } from '@/types/project';
import { pick } from '@/lib/localized';
import { cn } from '@/lib/cn';
import { ProjectMedia } from './ProjectMedia';
import { Tag } from './Tag';

interface Props {
  project: Project;
  /** The lead card in an asymmetric grid: media gets a wider crop. */
  wide?: boolean;
  className?: string;
}

/**
 * Media-led project card. The whole card is one link, so the target is the
 * full surface rather than a small "read more" — which matters most on touch,
 * where a card that only responds on its title is a constant miss.
 */
export function ProjectCard({ project, wide = false, className }: Props) {
  const locale = useLocale();

  return (
    <Link
      href={`/projects/${project.slug}`}
      className={cn(
        'group flex h-full flex-col overflow-hidden rounded-lg border border-border bg-surface/60 shadow-card',
        'transition-[border-color,box-shadow,transform] duration-500 ease-out',
        'hover:-translate-y-1 hover:border-border-strong hover:shadow-lift',
        'active:translate-y-0 active:scale-[0.995] active:duration-press',
        className,
      )}
    >
      <ProjectMedia
        project={project}
        variant="thumb"
        sizes={
          wide
            ? '(min-width: 1024px) 62vw, (min-width: 640px) 92vw, 100vw'
            : '(min-width: 1024px) 32vw, (min-width: 640px) 46vw, 100vw'
        }
        className={cn(
          'w-full transition-transform duration-700 ease-out group-hover:scale-[1.03]',
          wide ? 'aspect-[2/1]' : 'aspect-[16/10]',
        )}
      />

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <span className="tnum font-mono text-2xs uppercase tracking-[0.14em] text-text-faint">
            {project.year}
          </span>
          <ArrowUpRight
            strokeWidth={1.5}
            aria-hidden
            className="size-5 shrink-0 text-text-faint transition-[color,transform] duration-quick ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent rtl:-scale-x-100"
          />
        </div>

        <h3 className="display-4 mt-3 text-text">{project.title}</h3>
        <p className="mt-1.5 text-sm text-text-faint">{project.role}</p>
        <p className="mt-3 line-clamp-3 text-text-muted">{pick(project.summary, locale)}</p>

        <div className="mt-5 flex flex-wrap gap-2 pt-1">
          {project.stack.slice(0, wide ? 6 : 4).map((s) => (
            <Tag key={s}>{s}</Tag>
          ))}
        </div>
      </div>
    </Link>
  );
}
