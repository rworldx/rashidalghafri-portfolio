import { setRequestLocale } from 'next-intl/server';
import { About } from '@/components/sections/About';
import { Connections } from '@/components/sections/Connections';
import { TravelLog } from '@/components/sections/TravelLog';
import { Roots } from '@/components/sections/Roots';
import { Interests } from '@/components/sections/Interests';
import { Colophon } from '@/components/sections/Colophon';
import { buildMetadata } from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildMetadata(locale, 'about', '/about');
}

/** About: purely personal. Credentials live on /resume, work on /projects. */
export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <div className="pt-phi-4">
      <About />
      <Connections />
      <TravelLog />
      <Roots />
      <Interests />
      {/* The payoff: the only place the site's organising idea is named. */}
      <Colophon />
    </div>
  );
}
