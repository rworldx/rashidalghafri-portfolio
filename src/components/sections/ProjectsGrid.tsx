'use client';

import { useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { projects as allProjects } from '@content/projects';
import type { Project } from '@/types/project';
import { Reveal } from '@/components/motion/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ProjectCard } from '@/components/ui/ProjectCard';
import { cn } from '@/lib/cn';
import { FlowBranch } from '@/components/flow/FlowBranch';

interface Props {
  /** Override the list (e.g. the /projects index). Defaults to all projects. */
  projects?: Project[];
  /** Show the section heading + "all projects" link (home variant). */
  withHeading?: boolean;
  /** Hide a particular slug (e.g. the one shown in FeaturedProject). */
  excludeSlug?: string;
}

/**
 * The work index. An odd count leads with a wide card so the grid never reads
 * as a row of identical tiles; an even count pairs cleanly. Everything
 * collapses to a single column below 640px with no orphaned half-rows.
 */
export function ProjectsGrid({ projects, withHeading = true, excludeSlug }: Props) {
  const t = useTranslations('projectsSection');
  let list = projects ?? allProjects;
  if (excludeSlug) list = list.filter((p) => p.slug !== excludeSlug);
  if (list.length === 0) return null;

  const leadIsWide = list.length % 2 === 1;

  return (
    <FlowBranch>
      {withHeading && (
        <SectionHeading
          title={t('title')}
          emphasis={t('emphasis')}
          className="mb-phi-2"
          aside={
            <Link
              href="/projects"
              className="action group inline-flex items-center gap-2 text-sm text-text-muted transition-colors duration-quick ease-out hover:text-text"
            >
              {t('viewAll')}
              <ArrowRight
                strokeWidth={1.5}
                aria-hidden
                className="size-4 transition-transform duration-quick ease-out group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5"
              />
            </Link>
          }
        />
      )}

      <div className="grid gap-5 sm:grid-cols-2 sm:gap-6">
        {list.map((p, i) => {
          const wide = leadIsWide && i === 0;
          return (
            <Reveal
              key={p.slug}
              delay={i * 0.07}
              className={cn('h-full', wide && 'sm:col-span-2')}
            >
              <ProjectCard project={p} wide={wide} />
            </Reveal>
          );
        })}
      </div>
    </FlowBranch>
  );
}
