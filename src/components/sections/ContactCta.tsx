'use client';

import { useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { site } from '@content/site';
import { Container } from '@/components/layout/Container';
import { Reveal } from '@/components/motion/Reveal';
import { buttonVariants } from '@/components/ui/Button';
import { cn } from '@/lib/cn';

/** Compact contact CTA band for the home page — the full form lives on /contact. */
export function ContactCta() {
  const t = useTranslations('contact');

  return (
    <section className="py-24" id="contact">
      <Container>
        <Reveal className="rounded-lg border border-border bg-surface p-8 text-center shadow-card sm:p-12">
          <p className="font-mono text-xs uppercase tracking-widest text-accent">{t('eyebrow')}</p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-text sm:text-4xl">
            {t('title')}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-text-muted">{t('subtitle')}</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link href="/contact" className={cn(buttonVariants({ variant: 'primary', size: 'lg' }))}>
              {t('cta')}
              <ArrowRight className="h-4 w-4 rtl:rotate-180" />
            </Link>
            <a
              href={`mailto:${site.email}`}
              className={cn(buttonVariants({ variant: 'secondary', size: 'lg' }))}
            >
              {site.email}
            </a>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
