'use client';

import { useLocale, useTranslations } from 'next-intl';
import { ArrowRight, ExternalLink, Github } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { featuredProjects } from '@content/projects';
import { pick } from '@/lib/localized';
import { Container } from '@/components/layout/Container';
import { Reveal } from '@/components/motion/Reveal';
import { AnimatedCounter } from '@/components/motion/AnimatedCounter';
import { Card } from '@/components/ui/Card';
import { Tag } from '@/components/ui/Tag';
import { Badge } from '@/components/ui/Badge';
import { StatusDot } from '@/components/ui/StatusDot';

/** Featured flagship block — StudyNest (PRD FR-3). Data-driven from content. */
export function FeaturedProject() {
  const t = useTranslations('featured');
  const locale = useLocale();
  const project = featuredProjects[0];
  if (!project) return null;

  return (
    <section className="py-20">
      <Container>
        <Reveal className="mb-6 flex items-center gap-3">
          <p className="font-mono text-xs uppercase tracking-widest text-accent">
            {t('eyebrow')}
          </p>
          {project.liveUrl && (
            <Badge tone="success">
              <StatusDot />
              {t('live')}
            </Badge>
          )}
        </Reveal>

        <Card className="overflow-hidden p-7 sm:p-10">
          {/* Terminal-style header bar (PRD §3.5). */}
          <div className="mb-7 flex items-center gap-1.5" aria-hidden>
            <span className="h-3 w-3 rounded-full bg-surface-2" />
            <span className="h-3 w-3 rounded-full bg-surface-2" />
            <span className="h-3 w-3 rounded-full bg-surface-2" />
            <span className="ms-3 font-mono text-xs text-text-muted">
              {project.slug} · {project.year}
            </span>
          </div>

          <Reveal>
            <h3 className="font-display text-4xl font-semibold text-text">{project.title}</h3>
            <p className="mt-4 max-w-2xl text-lg text-text-muted">
              {pick(project.summary, locale)}
            </p>
          </Reveal>

          {/* Stats */}
          {project.stats && (
            <Reveal className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4" delay={0.1}>
              {project.stats.map((s) => (
                <div key={s.label.en} className="rounded border border-border bg-surface-2 p-4">
                  <p className="font-display text-3xl font-semibold text-text">
                    <AnimatedCounter value={s.value} />
                  </p>
                  <p className="mt-1 font-mono text-xs text-text-muted">{pick(s.label, locale)}</p>
                </div>
              ))}
            </Reveal>
          )}

          {/* Stack */}
          <Reveal className="mt-8 flex flex-wrap gap-2" delay={0.15}>
            {project.stack.slice(0, 8).map((s) => (
              <Tag key={s}>{s}</Tag>
            ))}
          </Reveal>

          {/* Actions */}
          <Reveal className="mt-8 flex flex-wrap items-center gap-4" delay={0.2}>
            <Link
              href={`/projects/${project.slug}`}
              className="inline-flex items-center gap-1.5 font-medium text-accent hover:underline"
            >
              {t('viewCaseStudy')}
              <ArrowRight className="h-4 w-4 rtl:rotate-180" />
            </Link>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-text-muted hover:text-text"
              >
                <ExternalLink className="h-4 w-4" />
                {t('viewLive')}
              </a>
            )}
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-text-muted hover:text-text"
              >
                <Github className="h-4 w-4" />
                {t('viewSource')}
              </a>
            )}
          </Reveal>
        </Card>
      </Container>
    </section>
  );
}
