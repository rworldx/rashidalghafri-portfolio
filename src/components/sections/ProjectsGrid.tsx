'use client';

import { useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { projects as allProjects } from '@content/projects';
import type { Project } from '@/types/project';
import { Container } from '@/components/layout/Container';
import { Reveal } from '@/components/motion/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ProjectCard } from '@/components/ui/ProjectCard';

interface Props {
  /** Override the list (e.g. the /projects index). Defaults to all projects. */
  projects?: Project[];
  /** Show the section heading + "all projects" link (home variant). */
  withHeading?: boolean;
  /** Hide a particular slug (e.g. the one shown in FeaturedProject). */
  excludeSlug?: string;
}

/** Grid of project cards (PRD FR-4). Adding a project = one content entry. */
export function ProjectsGrid({ projects, withHeading = true, excludeSlug }: Props) {
  const t = useTranslations('projectsSection');
  let list = projects ?? allProjects;
  if (excludeSlug) list = list.filter((p) => p.slug !== excludeSlug);
  if (list.length === 0) return null;

  return (
    <section className="py-20">
      <Container>
        {withHeading && (
          <div className="mb-10 flex items-end justify-between gap-4">
            <SectionHeading eyebrow={t('eyebrow')} title={t('title')} />
            <Link
              href="/projects"
              className="hidden shrink-0 items-center gap-1.5 font-mono text-sm text-text-muted hover:text-text sm:inline-flex"
            >
              {t('viewAll')}
              <ArrowRight className="h-4 w-4 rtl:rotate-180" />
            </Link>
          </div>
        )}

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.06}>
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
