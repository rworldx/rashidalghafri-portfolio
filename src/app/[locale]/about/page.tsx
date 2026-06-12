import { setRequestLocale } from 'next-intl/server';
import { About } from '@/components/sections/About';
import { Skills } from '@/components/sections/Skills';
import { Timeline } from '@/components/sections/Timeline';
import { Awards } from '@/components/sections/Awards';
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
      <Timeline />
      <Skills />
      <Awards />
    </div>
  );
}
