'use client';

import { useLocale, useTranslations } from 'next-intl';
import { ArrowUpRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { awards } from '@content/awards';
import type { Award } from '@/types/award';
import { pick } from '@/lib/localized';
import { Container, sectionY } from '@/components/layout/Container';
import { Reveal } from '@/components/motion/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/cn';

/**
 * Recognition as full-width editorial entries, most recent first. The date
 * anchors the lead column so the run reads as a record you can scan by year,
 * and each entry gets the full measure for its description instead of being
 * squeezed into half a card.
 */
export function Awards() {
  const t = useTranslations('awards');
  const locale = useLocale();
  const sorted = [...awards].sort((a, b) => b.order - a.order);

  return (
    <section className={sectionY}>
      <Container>
        <SectionHeading title={t('title')} emphasis={t('emphasis')} className="mb-phi-2" />

        <ol className="border-t border-border-strong">
          {sorted.map((award, i) => (
            <Reveal as="li" key={award.id} delay={i * 0.05} distance={14}>
              <AwardEntry award={award} locale={locale} viewLabel={t('viewDetails')} />
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}

function AwardEntry({
  award,
  locale,
  viewLabel,
}: {
  award: Award;
  locale: string;
  viewLabel: string;
}) {
  const inner = (
    <div className="grid gap-x-phi-2 gap-y-3 py-8 sm:grid-cols-[minmax(7rem,1fr)_2.618fr]">
      <p className="tnum force-ltr font-mono text-2xs uppercase tracking-[0.14em] text-text-faint sm:pt-2">
        {award.date}
      </p>
      <div>
        <div className="flex items-start justify-between gap-4">
          <h3 className="display-4 text-text">{pick(award.title, locale)}</h3>
          {award.href && (
            <ArrowUpRight
              strokeWidth={1.5}
              aria-hidden
              className="mt-1 size-5 shrink-0 text-text-faint transition-[color,transform] duration-quick ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent rtl:-scale-x-100"
            />
          )}
        </div>
        {award.org && <p className="mt-2 text-sm text-text-muted">{pick(award.org, locale)}</p>}
        {award.tag && (
          <p className="mt-3">
            <Badge tone="accent">{pick(award.tag, locale)}</Badge>
          </p>
        )}
        <p className="measure mt-4 text-text-muted">{pick(award.description, locale)}</p>
        {award.href && (
          <p className="mt-4 inline-flex items-center gap-1.5 font-mono text-2xs uppercase tracking-[0.14em] text-accent">
            {viewLabel}
          </p>
        )}
      </div>
    </div>
  );

  const rowClass = 'block border-b border-border';

  if (award.href) {
    return (
      <Link
        href={award.href}
        className={cn(
          rowClass,
          'group transition-colors duration-quick ease-out hover:bg-surface/50',
        )}
      >
        {inner}
      </Link>
    );
  }
  return <div className={rowClass}>{inner}</div>;
}
