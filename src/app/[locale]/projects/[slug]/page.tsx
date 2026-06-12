import { notFound } from 'next/navigation';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { projects, getProject } from '@content/projects';
import { pick } from '@/lib/localized';
import { buildProjectMetadata } from '@/lib/seo';
import { Container } from '@/components/layout/Container';
import { Reveal } from '@/components/motion/Reveal';
import { AnimatedCounter } from '@/components/motion/AnimatedCounter';
import { Tag } from '@/components/ui/Tag';
import { Badge } from '@/components/ui/Badge';
import { StatusDot } from '@/components/ui/StatusDot';

/** Pre-render every locale × project (PRD FR-5 static generation). */
export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    projects.map((p) => ({ locale, slug: p.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return buildProjectMetadata(locale, slug, project.title, pick(project.summary, locale));
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const project = getProject(slug);
  if (!project) notFound();
  const t = await getTranslations('caseStudy');
  const tf = await getTranslations('featured');

  return (
    <article className="py-16">
      <Container>
        <Link
          href="/projects"
          className="inline-flex items-center gap-1.5 font-mono text-sm text-text-muted hover:text-text"
        >
          <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
          {t('back')}
        </Link>

        <header className="mt-8">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-mono text-sm text-text-muted">
              {project.year} · {project.role}
            </span>
            {project.liveUrl && (
              <Badge tone="success">
                <StatusDot />
                {tf('live')}
              </Badge>
            )}
          </div>
          <h1 className="mt-4 font-display text-5xl font-semibold text-text">{project.title}</h1>
          <p className="mt-4 max-w-2xl text-lg text-text-muted">{pick(project.summary, locale)}</p>

          <div className="mt-6 flex flex-wrap gap-4">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-medium text-accent hover:underline"
              >
                <ExternalLink className="h-4 w-4" />
                {tf('viewLive')}
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
                {tf('viewSource')}
              </a>
            )}
          </div>
        </header>

        {project.stats && (
          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {project.stats.map((s) => (
              <div key={s.label.en} className="rounded-lg border border-border bg-surface p-5">
                <p className="font-display text-3xl font-semibold text-text">
                  <AnimatedCounter value={s.value} />
                </p>
                <p className="mt-1 font-mono text-xs text-text-muted">{pick(s.label, locale)}</p>
              </div>
            ))}
          </div>
        )}

        <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_280px]">
          <div className="space-y-10">
            <Section title={t('problem')}>{pick(project.problem, locale)}</Section>
            <Section title={t('solution')}>{pick(project.solution, locale)}</Section>

            {project.highlights && (
              <div>
                <h2 className="font-display text-2xl font-semibold text-text">{t('highlights')}</h2>
                <ul className="mt-4 space-y-3">
                  {project.highlights.map((h, i) => (
                    <Reveal as="li" key={i} className="flex gap-3 text-text-muted">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      <span>{pick(h, locale)}</span>
                    </Reveal>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <aside className="space-y-6">
            <div>
              <h2 className="font-mono text-xs uppercase tracking-widest text-text-muted">
                {t('stack')}
              </h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.stack.map((s) => (
                  <Tag key={s}>{s}</Tag>
                ))}
              </div>
            </div>

            {project.links && project.links.length > 0 && (
              <div>
                <h2 className="font-mono text-xs uppercase tracking-widest text-text-muted">
                  {t('links')}
                </h2>
                <ul className="mt-3 space-y-2">
                  {project.links.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        target={link.external ? '_blank' : undefined}
                        rel={link.external ? 'noopener noreferrer' : undefined}
                        className="inline-flex items-center gap-1.5 text-text-muted hover:text-accent"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>
      </Container>
    </article>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Reveal>
      <h2 className="font-display text-2xl font-semibold text-text">{title}</h2>
      <p className="mt-3 text-lg text-text-muted">{children}</p>
    </Reveal>
  );
}
