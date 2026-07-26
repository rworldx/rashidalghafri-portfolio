import { setRequestLocale } from 'next-intl/server';
import { Hero } from '@/components/sections/Hero';
import { Manifesto } from '@/components/sections/Manifesto';
import { KeynoteSlides } from '@/components/sections/KeynoteSlides';
import { ThroughLine } from '@/components/sections/ThroughLine';
import { StackMarquee } from '@/components/sections/StackMarquee';
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
 * Home — THE MUSEUM. One room, then the collection.
 *
 * The order is an argument, not a menu:
 *
 *   Hero        the entrance hall: liquid light, the name as an exhibition title
 *   Manifesto   the statement wall — three words, lit one at a time by scroll
 *   Keynote     the darkened room: one work at a time, driven horizontally
 *   ThroughLine the receipts, before anyone has to take the work on trust
 *   Marquee     the stack, scanned rather than read
 *   About       the person who made it
 *   Contact     the one action
 *
 * Seven sections, seven different layout families. Two sections sharing a
 * layout is what makes a portfolio read as a template.
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
      <KeynoteSlides />
      <ThroughLine />
      <StackMarquee />
      <AboutTeaser />
      <ContactCta />
    </>
  );
}
