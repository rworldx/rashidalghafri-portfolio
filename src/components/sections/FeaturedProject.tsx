'use client';

import { useLocale, useTranslations } from 'next-intl';
import { ArrowRight, ExternalLink, Github } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { featuredProjects } from '@content/projects';
import { pick } from '@/lib/localized';
import { Container, sectionY } from '@/components/layout/Container';
import { Reveal } from '@/components/motion/Reveal';
import { AnimatedCounter } from '@/components/motion/AnimatedCounter';
import { ProjectMedia } from '@/components/ui/ProjectMedia';
import { Tag } from '@/components/ui/Tag';
import { Badge } from '@/components/ui/Badge';
import { StatusDot } from '@/components/ui/StatusDot';
import { cn } from '@/lib/cn';

/**
 * The flagship. Composed as an asymmetric editorial feature on the golden
 * split rather than a card: the work gets the long side, the argument for it
 * gets the short side.
 *
 * The old terminal chrome here (three fake window dots) was a hand-built
 * imitation of product UI, which is the most recognisable AI-design tell there
 * is. The real measured outcomes carry the section instead, set as a plain
 * fact line rather than a row of dashboard tiles.
 */
export function FeaturedProject() {
  const t = useTranslations('featured');
  const locale = useLocale();
  const project = featuredProjects[0];
  if (!project) return null;

  const host = project.liveUrl?.replace(/^https?:\/\//, '').replace(/\/$/, '');

  return (
    <section className={sectionY}>
      <Container>
        <Reveal>
          <hr className="rule-fade mb-8 w-16" aria-hidden />
        </Reveal>

        <div className="grid gap-phi-2 lg:grid-cols-[1.618fr_1fr] lg:items-center">
          {/* The work itself leads. */}
          <Reveal className="order-1">
            <Link
              href={`/projects/${project.slug}`}
              aria-label={`${project.title}: ${t('viewCaseStudy')}`}
              className="group block overflow-hidden rounded-lg border border-border shadow-card transition-[border-color,box-shadow] duration-500 ease-out hover:border-border-strong hover:shadow-lift"
            >
              <ProjectMedia
                project={project}
                priority
                sizes="(min-width: 1024px) 62vw, 100vw"
                className="aspect-[1.618/1] transition-transform duration-700 ease-out group-hover:scale-[1.02]"
              />
            </Link>
          </Reveal>

          <div className="order-2">
            <Reveal>
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="display-3 text-text">{project.title}</h2>
                {project.liveUrl && (
                  <Badge tone="signal">
                    <StatusDot />
                    {t('live')}
                  </Badge>
                )}
              </div>
              <p className="mt-2 font-mono text-2xs uppercase tracking-[0.14em] text-text-faint">
                {project.role}
              </p>
              <p className="measure mt-phi text-lg text-text-muted">
                {pick(project.summary, locale)}
              </p>
            </Reveal>

            <Reveal delay={0.08} className="mt-phi-2 flex flex-wrap gap-2">
              {project.stack.slice(0, 6).map((s) => (
                <Tag key={s}>{s}</Tag>
              ))}
            </Reveal>

            <Reveal
              delay={0.14}
              className="mt-phi-2 flex flex-wrap items-center gap-x-6 gap-y-3"
            >
              <Link
                href={`/projects/${project.slug}`}
                className="action group inline-flex items-center gap-2 border-b border-accent-line pb-1 font-medium text-accent transition-colors duration-quick ease-out hover:border-accent"
              >
                {t('viewCaseStudy')}
                <ArrowRight
                  strokeWidth={1.75}
                  aria-hidden
                  className="size-4 transition-transform duration-quick ease-out group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5"
                />
              </Link>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="action inline-flex items-center gap-2 text-sm text-text-muted transition-colors duration-quick ease-out hover:text-text"
                >
                  <ExternalLink strokeWidth={1.5} aria-hidden className="size-4" />
                  <span className="force-ltr">{host}</span>
                </a>
              )}
              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="action inline-flex items-center gap-2 text-sm text-text-muted transition-colors duration-quick ease-out hover:text-text"
                >
                  <Github strokeWidth={1.5} aria-hidden className="size-4" />
                  {t('viewSource')}
                </a>
              )}
            </Reveal>
          </div>
        </div>

        {/* Measured outcomes, as a fact line. No tiles, no tracks, no chrome. */}
        {project.stats && project.stats.length > 0 && (
          <Reveal delay={0.1} className="mt-phi-3 border-t border-border pt-8">
            <dl className={cn('flex flex-wrap gap-x-phi-2 gap-y-6')}>
              {project.stats.map((s) => (
                <div key={s.label.en}>
                  <dt className="sr-only">{pick(s.label, locale)}</dt>
                  <dd>
                    <span className="force-ltr tnum block font-mono text-2xl text-text">
                      <AnimatedCounter value={s.value} />
                    </span>
                    <span className="mt-1 block text-sm text-text-muted">
                      {pick(s.label, locale)}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        )}
      </Container>
    </section>
  );
}
