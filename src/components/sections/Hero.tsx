'use client';

import { useLocale, useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ArrowRight, Download } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { site } from '@content/site';
import { graph } from '@content/graph';
import { pick } from '@/lib/localized';
import { Container } from '@/components/layout/Container';
import { TextReveal } from '@/components/motion/TextReveal';
import { GraphSignature } from '@/components/graph/GraphSignature';
import { StatusDot } from '@/components/ui/StatusDot';
import { buttonVariants } from '@/components/ui/Button';
import { Magnetic } from '@/components/ui/Magnetic';
import { cn } from '@/lib/cn';

/** Hero (PRD FR-2): name + identity, status line, CTAs, ambient graph behind. */
export function Hero() {
  const t = useTranslations('hero');
  const locale = useLocale();

  return (
    <section className="relative overflow-hidden">
      {/* Ambient signature graph — non-interactive, low opacity. */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 mx-auto max-w-5xl opacity-70 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]"
        aria-hidden
      >
        <GraphSignature data={graph} ambient className="h-full w-full" />
      </div>

      <Container className="flex min-h-[78vh] flex-col justify-center py-24">
        <motion.p
          className="force-ltr mb-6 inline-flex w-fit items-center gap-2 rounded-sm border border-border bg-surface/60 px-3 py-1.5 font-mono text-xs text-text-muted backdrop-blur"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <StatusDot />
          {pick(site.status, locale)}
        </motion.p>

        <TextReveal
          as="h1"
          text={site.name}
          className="font-display text-5xl font-semibold leading-[1.05] tracking-tight text-text sm:text-6xl md:text-7xl"
        />

        <motion.p
          className="mt-4 max-w-2xl font-mono text-sm text-accent sm:text-base"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {pick(site.role, locale)}
        </motion.p>

        <motion.p
          className="mt-6 max-w-xl text-lg text-text-muted"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          {pick(site.tagline, locale)}
        </motion.p>

        <motion.div
          className="mt-10 flex flex-wrap items-center gap-3"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Magnetic>
            <Link href="/projects" className={cn(buttonVariants({ variant: 'primary', size: 'lg' }))}>
              {t('viewWork')}
              <ArrowRight className="h-4 w-4 rtl:rotate-180" />
            </Link>
          </Magnetic>
          <a
            href={site.cvPath}
            download
            className={cn(buttonVariants({ variant: 'secondary', size: 'lg' }))}
          >
            <Download className="h-4 w-4" />
            {t('downloadCv')}
          </a>
        </motion.div>
      </Container>
    </section>
  );
}
