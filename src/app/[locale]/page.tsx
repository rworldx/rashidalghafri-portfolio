import { setRequestLocale } from 'next-intl/server';
import { Hero } from '@/components/sections/Hero';
import { ThroughLine } from '@/components/sections/ThroughLine';
import { FeaturedProject } from '@/components/sections/FeaturedProject';
import { ProjectsGrid } from '@/components/sections/ProjectsGrid';
import { AboutTeaser } from '@/components/sections/AboutTeaser';
import { ContactCta } from '@/components/sections/ContactCta';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildMetadata } from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildMetadata(locale, 'home', '/');
}

/** Home — single-scroll narrative (PRD FR-2..7). Composes data-driven sections. */
export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <JsonLd />
      <Hero />
      {/* The record leads, before any project. A recruiter decides here. */}
      <ThroughLine />
      <FeaturedProject />
      {/* Teaser of the rest of the work; full list lives on /projects. */}
      <ProjectsGrid excludeSlug="studynest" />
      <AboutTeaser />
      <ContactCta />
    </>
  );
}
