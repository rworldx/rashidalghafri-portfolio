'use client';

import { useLocale, useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { site } from '@content/site';
import { pick } from '@/lib/localized';
import { Reveal } from '@/components/motion/Reveal';
import { Emphasise } from '@/components/ui/SectionHeading';
import { StatusDot } from '@/components/ui/StatusDot';
import { buttonVariants } from '@/components/ui/Button';
import { cn } from '@/lib/cn';
import { FlowBranch } from '@/components/flow/FlowBranch';

/**
 * Closing invitation, set as an asymmetric band rather than a centred card so
 * it does not rhyme with the sections above it.
 *
 * One contact intent, one label: "Get in touch" is the only wording used for
 * it anywhere on the site. The email sits beside it as a direct alternative
 * for anyone who would rather not fill in a form.
 */
export function ContactCta() {
  const t = useTranslations('contact');
  const locale = useLocale();

  return (
    <FlowBranch id="contact">
      <Reveal className="bg-surface/50 rounded-xl border border-border p-8 shadow-card sm:p-phi-3">
        <div className="grid gap-phi-2 lg:grid-cols-[1.618fr_1fr] lg:items-end">
          <div>
            <p className="mb-6 inline-flex items-center gap-2.5 font-mono text-2xs uppercase tracking-[0.14em] text-text-muted">
              <StatusDot />
              {pick(site.status, locale)}
            </p>
            <h2 className="museum-2 text-text">
              <Emphasise title={t('title')} emphasis={t('emphasis')} />
            </h2>
            <p className="measure-tight mt-phi text-lg text-text-muted">
              {t('subtitle')}
            </p>
          </div>

          <div className="flex flex-col items-start gap-5 lg:items-end">
            <Link
              href="/contact"
              className={cn(
                buttonVariants({ variant: 'primary', size: 'lg' }),
                'group',
              )}
            >
              {t('cta')}
              <ArrowRight
                strokeWidth={1.75}
                aria-hidden
                className="size-4 transition-transform duration-quick ease-out group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5"
              />
            </Link>
            <a
              href={`mailto:${site.email}`}
              className="action force-ltr break-all border-b border-border-strong pb-0.5 text-sm text-text-muted transition-colors duration-quick ease-out hover:border-accent hover:text-accent"
            >
              {site.email}
            </a>
          </div>
        </div>
      </Reveal>
    </FlowBranch>
  );
}
