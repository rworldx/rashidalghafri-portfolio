'use client';

import { useLocale, useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { aboutIntro } from '@content/about';
import { pick } from '@/lib/localized';
import { Container } from '@/components/layout/Container';
import { Reveal } from '@/components/motion/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';

/** Compact About glimpse for the home page — links to the full /about page. */
export function AboutTeaser() {
  const t = useTranslations('about');
  const locale = useLocale();

  return (
    <section className="py-20">
      <Container>
        <SectionHeading eyebrow={t('eyebrow')} title={t('title')} className="mb-6" />
        <Reveal className="max-w-2xl">
          <p className="text-lg text-text-muted">{pick(aboutIntro, locale)}</p>
          <Link
            href="/about"
            className="mt-6 inline-flex items-center gap-1.5 font-medium text-accent hover:underline"
          >
            {t('more')}
            <ArrowRight className="h-4 w-4 rtl:rotate-180" />
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}
