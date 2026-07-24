import { notFound } from 'next/navigation';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { ArrowLeft, ArrowRight, ExternalLink, Github } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { projects, getProject } from '@content/projects';
import { pick } from '@/lib/localized';
import { buildProjectMetadata } from '@/lib/seo';
import { Container, sectionY } from '@/components/layout/Container';
import { Reveal } from '@/components/motion/Reveal';
import { AnimatedCounter } from '@/components/motion/AnimatedCounter';
import { ProjectMedia } from '@/components/ui/ProjectMedia';
import { Tag } from '@/components/ui/Tag';
import { Badge } from '@/components/ui/Badge';
import { StatusDot } from '@/components/ui/StatusDot';

/** Pre-render every locale x project. */
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

  // Wayfinding: a case study should always offer somewhere to go next, not
  // just a way back. Wraps around so the last project still has a successor.
  const index = projects.findIndex((p) => p.slug === slug);
  const next = projects[(index + 1) % projects.length];

  return (
    <article className="pt-phi-4">
      <Container>
        <Link
          href="/projects"
          className="action group inline-flex items-center gap-2 font-mono text-2xs uppercase tracking-[0.14em] text-text-muted transition-colors duration-quick ease-out hover:text-text"
        >
          <ArrowLeft
            strokeWidth={1.5}
            aria-hidden
            className="size-4 transition-transform duration-quick ease-out group-hover:-translate-x-0.5 rtl:rotate-180 rtl:group-hover:translate-x-0.5"
          />
          {t('back')}
        </Link>

        <header className="mt-phi-2">
          <div className="flex flex-wrap items-center gap-3">
            <span className="tnum force-ltr font-mono text-2xs uppercase tracking-[0.14em] text-text-faint">
              {project.year}
            </span>
            {project.liveUrl && (
              <Badge tone="signal">
                <StatusDot />
                {tf('live')}
              </Badge>
            )}
          </div>
          <h1 className="display-1 mt-5 text-text">{project.title}</h1>
          <p className="mt-4 font-mono text-2xs uppercase tracking-[0.14em] text-accent">
            {project.role}
          </p>
          <p className="measure mt-phi text-xl text-text-muted">
            {pick(project.summary, locale)}
          </p>

          <div className="mt-phi-2 flex flex-wrap items-center gap-x-6 gap-y-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="action inline-flex items-center gap-2 border-b border-accent-line pb-1 font-medium text-accent transition-colors duration-quick ease-out hover:border-accent"
              >
                <ExternalLink strokeWidth={1.75} aria-hidden className="size-4" />
                {tf('viewLive')}
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
                {tf('viewSource')}
              </a>
            )}
          </div>
        </header>

        <div className="mt-phi-3 overflow-hidden rounded-lg border border-border shadow-card">
          <ProjectMedia
            project={project}
            priority
            sizes="(min-width: 1280px) 78rem, 100vw"
            className="aspect-[2/1]"
          />
        </div>

        {project.stats && project.stats.length > 0 && (
          <Reveal className="mt-phi-3 border-t border-border pt-8">
            <dl className="flex flex-wrap gap-x-phi-2 gap-y-6">
              {project.stats.map((s) => (
                <div key={s.label.en}>
                  <dt className="sr-only">{pick(s.label, locale)}</dt>
                  <dd>
                    <span className="tnum force-ltr block font-mono text-2xl text-text">
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

        <div className="mt-phi-3 grid gap-phi-2 lg:grid-cols-[1.618fr_1fr] lg:gap-phi-3">
          <div className="space-y-phi-2">
            <Prose title={t('problem')}>{pick(project.problem, locale)}</Prose>
            <Prose title={t('solution')}>{pick(project.solution, locale)}</Prose>

            {project.highlights && (
              <Reveal>
                <h2 className="display-3 text-text">{t('highlights')}</h2>
                <ul className="measure mt-phi space-y-4">
                  {project.highlights.map((h, i) => (
                    <li key={i} className="flex gap-3.5 text-text-muted">
                      <span
                        aria-hidden
                        className="mt-[0.6em] size-1.5 shrink-0 rounded-full bg-accent"
                      />
                      <span>{pick(h, locale)}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}
          </div>

          <aside className="space-y-phi-2 lg:sticky lg:top-28 lg:self-start">
            <div>
              <h2 className="label mb-4 text-text-faint">{t('stack')}</h2>
              <ul className="flex flex-wrap gap-2">
                {project.stack.map((s) => (
                  <li key={s}>
                    <Tag>{s}</Tag>
                  </li>
                ))}
              </ul>
            </div>

            {project.links && project.links.length > 0 && (
              <div>
                <h2 className="label mb-4 text-text-faint">{t('links')}</h2>
                <ul className="space-y-3">
                  {project.links.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        target={link.external ? '_blank' : undefined}
                        rel={link.external ? 'noopener noreferrer' : undefined}
                        className="action inline-flex items-center gap-2 text-text-muted transition-colors duration-quick ease-out hover:text-accent"
                      >
                        <ExternalLink
                          strokeWidth={1.5}
                          aria-hidden
                          className="size-4 shrink-0"
                        />
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

      {/* Somewhere to go next, rather than a dead end at the bottom. */}
      {next && next.slug !== project.slug && (
        <div className={sectionY}>
          <Container>
            <Link
              href={`/projects/${next.slug}`}
              className="group flex flex-wrap items-end justify-between gap-6 border-t border-border-strong pt-8 transition-colors duration-quick ease-out"
            >
              <div>
                <p className="label mb-3 text-text-faint">{t('next')}</p>
                <p className="display-2 text-text transition-colors duration-quick ease-out group-hover:text-accent">
                  {next.title}
                </p>
              </div>
              <ArrowRight
                strokeWidth={1.5}
                aria-hidden
                className="mb-3 size-8 text-text-faint transition-[color,transform] duration-quick ease-out group-hover:translate-x-1 group-hover:text-accent rtl:rotate-180 rtl:group-hover:-translate-x-1"
              />
            </Link>
          </Container>
        </div>
      )}
    </article>
  );
}

function Prose({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Reveal>
      <h2 className="display-3 text-text">{title}</h2>
      <p className="measure mt-phi text-lg text-text-muted">{children}</p>
    </Reveal>
  );
}
