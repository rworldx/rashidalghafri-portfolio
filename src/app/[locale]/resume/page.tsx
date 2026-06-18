import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Download } from 'lucide-react';
import { site } from '@content/site';
import { Container } from '@/components/layout/Container';
import { Timeline } from '@/components/sections/Timeline';
import { Education } from '@/components/sections/Education';
import { Skills } from '@/components/sections/Skills';
import { Awards } from '@/components/sections/Awards';
import { Certifications } from '@/components/sections/Certifications';
import { buttonVariants } from '@/components/ui/Button';
import { cn } from '@/lib/cn';
import { buildMetadata } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return buildMetadata(locale, 'resume', '/resume');
}

/** Résumé — the scannable professional credentials (education, skills, awards, certs). */
export default async function ResumePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('resume');

  return (
    <div className="pt-16">
      <Container>
        <p className="font-mono text-xs uppercase tracking-widest text-accent">{t('eyebrow')}</p>
        <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
          <h1 className="font-display text-4xl font-semibold text-text sm:text-5xl">
            {t('title')}
          </h1>
          <a
            href={site.cvPath}
            download
            className={cn(buttonVariants({ variant: 'secondary', size: 'md' }))}
          >
            <Download className="h-4 w-4" />
            {t('download')}
          </a>
        </div>
      </Container>

      <Timeline />
      <Education />
      <Skills />
      <Awards />
      <Certifications />
    </div>
  );
}
