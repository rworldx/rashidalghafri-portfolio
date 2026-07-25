import { setRequestLocale } from 'next-intl/server';
import { Hero } from '@/components/sections/Hero';
import { Manifesto } from '@/components/sections/Manifesto';
import { FalajJourney } from '@/components/sections/FalajJourney';
import { ThroughLine } from '@/components/sections/ThroughLine';
import { StackMarquee } from '@/components/sections/StackMarquee';
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

/**
 * Home — one cinematic scroll, staged.
 *
 * The order is an argument, not a menu:
 *
 *   Hero        who, at poster scale, with a face
 *   Manifesto   the thesis, three words, said once at full volume
 *   Journey     the pinned 3D channel — travel the system, meet the work
 *   ThroughLine the receipts, before anyone has to take the work on trust
 *   Marquee     the stack, scanned rather than read
 *   Projects    the rest of the work
 *   About       the person behind it
 *   Contact     the one action
 *
 * Every section is a different layout family on purpose — poster, kinetic
 * type, pinned 3D, ledger, marquee, grid, prose, band. A page where eight
 * sections share two layouts is what makes a portfolio read as a template.
 */
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
      <Manifesto />
      <FalajJourney />
      <ThroughLine />
      <StackMarquee />
      {/* The journey already featured the flagship; the grid shows the rest. */}
      <ProjectsGrid excludeSlug="studynest" />
      <AboutTeaser />
      <ContactCta />
    </>
  );
}
