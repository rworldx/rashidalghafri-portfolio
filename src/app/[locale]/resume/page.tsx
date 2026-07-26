import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Download, FileText } from 'lucide-react';
import { site } from '@content/site';
import { Container } from '@/components/layout/Container';
import { Timeline } from '@/components/sections/Timeline';
import { Education } from '@/components/sections/Education';
import { Skills } from '@/components/sections/Skills';
import { Awards } from '@/components/sections/Awards';
import { Certifications } from '@/components/sections/Certifications';
import { Emphasise } from '@/components/ui/SectionHeading';
import { buttonVariants } from '@/components/ui/Button';
import { cn } from '@/lib/cn';
import { buildMetadata } from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildMetadata(locale, 'resume', '/resume');
}

/** Résumé: the scannable credentials (education, journey, skills, awards, certs). */
export default async function ResumePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('resume');

  return (
    <div className="pt-phi-4">
      <Container>
        <p className="label mb-6 text-text-faint">{t('eyebrow')}</p>
        <div className="flex flex-wrap items-end justify-between gap-x-phi-2 gap-y-8">
          <h1 className="serif-display text-text">
            <Emphasise title={t('title')} emphasis={t('emphasis')} />
          </h1>

          {/* Both formats offered up front: one to read, one for an ATS. */}
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={site.cvPath}
              download
              className={cn(buttonVariants({ variant: 'primary', size: 'md' }))}
            >
              <Download strokeWidth={1.75} aria-hidden className="size-4" />
              {t('download')}
            </a>
            <a
              href="/resume/Rashid_Al_Ghafri_CV_ATS.docx"
              download
              aria-label={t('atsAria')}
              className={cn(buttonVariants({ variant: 'secondary', size: 'md' }))}
            >
              <FileText strokeWidth={1.75} aria-hidden className="size-4" />
              {t('ats')}
            </a>
          </div>
        </div>
      </Container>

      <Education />
      <Timeline />
      <Skills />
      <Awards />
      <Certifications />
    </div>
  );
}
