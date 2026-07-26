import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Container } from '@/components/layout/Container';
import { ProjectsGrid } from '@/components/sections/ProjectsGrid';
import { Experience } from '@/components/sections/Experience';
import { Emphasise } from '@/components/ui/SectionHeading';
import { buildMetadata } from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildMetadata(locale, 'projects', '/projects');
}

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('projectsSection');

  return (
    <div className="pt-phi-4">
      <Container>
        <h1 className="serif-display text-text">
          <Emphasise title={t('title')} emphasis={t('emphasis')} />
        </h1>
      </Container>
      <ProjectsGrid withHeading={false} />
      <Experience />
    </div>
  );
}
