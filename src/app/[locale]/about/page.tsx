import { setRequestLocale } from 'next-intl/server';
import { About } from '@/components/sections/About';
import { Connections } from '@/components/sections/Connections';
import { Interests } from '@/components/sections/Interests';
import { Education } from '@/components/sections/Education';
import { Timeline } from '@/components/sections/Timeline';
import { Skills } from '@/components/sections/Skills';
import { Awards } from '@/components/sections/Awards';
import { Certifications } from '@/components/sections/Certifications';
import { buildMetadata } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return buildMetadata(locale, 'about', '/about');
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <div className="pt-10">
      <About />
      <Connections />
      <Interests />
      <Education />
      <Timeline />
      <Skills />
      <Awards />
      <Certifications />
    </div>
  );
}
