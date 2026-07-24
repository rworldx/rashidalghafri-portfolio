'use client';

import { useLocale, useTranslations } from 'next-intl';
import { BadgeCheck, ExternalLink } from 'lucide-react';
import { certifications } from '@content/awards';
import { pick } from '@/lib/localized';
import { Container, sectionY } from '@/components/layout/Container';
import { Reveal } from '@/components/motion/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';

/** Certifications. Renders nothing when the list is empty. */
export function Certifications() {
  const t = useTranslations('about');
  const locale = useLocale();
  if (certifications.length === 0) return null;

  return (
    <section className={sectionY}>
      <Container>
        <SectionHeading title={t('certsTitle')} className="mb-phi-2" />

        <ul className="border-t border-border-strong">
          {certifications.map((cert, i) => (
            <Reveal
              as="li"
              key={cert.id}
              delay={i * 0.05}
              distance={12}
              className="grid gap-x-phi-2 gap-y-3 border-b border-border py-8 sm:grid-cols-[minmax(7rem,1fr)_2.618fr]"
            >
              <p className="tnum force-ltr font-mono text-2xs uppercase tracking-[0.14em] text-text-faint sm:pt-2">
                {cert.year}
              </p>
              <div>
                <div className="flex items-start gap-3">
                  <BadgeCheck
                    strokeWidth={1.5}
                    aria-hidden
                    className="mt-1 size-5 shrink-0 text-signal"
                  />
                  <div>
                    <h3 className="display-4 text-text">{cert.title}</h3>
                    <p className="mt-2 text-sm text-text-muted">{cert.issuer}</p>
                  </div>
                </div>
                {cert.detail && (
                  <p className="measure mt-4 text-text-muted">{pick(cert.detail, locale)}</p>
                )}
                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="action mt-4 inline-flex items-center gap-2 font-mono text-2xs uppercase tracking-[0.14em] text-text-muted transition-colors duration-quick ease-out hover:text-accent"
                  >
                    <ExternalLink strokeWidth={1.5} aria-hidden className="size-3.5" />
                    {t('verify')}
                  </a>
                )}
              </div>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
