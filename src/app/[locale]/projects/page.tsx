import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Container } from '@/components/layout/Container';
import { ProjectsGrid } from '@/components/sections/ProjectsGrid';
import { buildMetadata } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return buildMetadata(locale, 'projects', '/projects');
}

export default async function ProjectsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('projectsSection');

  return (
    <div className="pt-16">
      <Container>
        <p className="font-mono text-xs uppercase tracking-widest text-accent">{t('eyebrow')}</p>
        <h1 className="mt-3 font-display text-4xl font-semibold text-text sm:text-5xl">
          {t('title')}
        </h1>
      </Container>
      <ProjectsGrid withHeading={false} />
    </div>
  );
}
