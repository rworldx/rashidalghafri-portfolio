import { setRequestLocale } from 'next-intl/server';
import { Hero } from '@/components/sections/Hero';
import { FeaturedProject } from '@/components/sections/FeaturedProject';
import { ProjectsGrid } from '@/components/sections/ProjectsGrid';
import { Skills } from '@/components/sections/Skills';
import { Awards } from '@/components/sections/Awards';
import { ContactSection } from '@/components/sections/ContactSection';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildMetadata } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return buildMetadata(locale, 'home', '/');
}

/** Home — single-scroll narrative (PRD FR-2..7). Composes data-driven sections. */
export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <JsonLd />
      <Hero />
      <FeaturedProject />
      {/* Renders nothing while StudyNest is the only (featured) project. */}
      <ProjectsGrid excludeSlug="studynest" />
      <Skills />
      <Awards />
      <ContactSection />
    </>
  );
}
