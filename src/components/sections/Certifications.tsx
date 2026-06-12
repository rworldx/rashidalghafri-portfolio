'use client';

import { useLocale, useTranslations } from 'next-intl';
import { BadgeCheck, ExternalLink } from 'lucide-react';
import { certifications } from '@content/awards';
import { pick } from '@/lib/localized';
import { Container } from '@/components/layout/Container';
import { Reveal } from '@/components/motion/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card } from '@/components/ui/Card';

/** Certifications (Addendum A.4). Renders only when the list is non-empty. */
export function Certifications() {
  const t = useTranslations('about');
  const locale = useLocale();
  if (certifications.length === 0) return null;

  return (
    <section className="py-20">
      <Container>
        <SectionHeading eyebrow={t('certsEyebrow')} title={t('certsTitle')} className="mb-10" />
        <div className="grid gap-5 sm:grid-cols-2">
          {certifications.map((cert, i) => (
            <Reveal key={cert.id} delay={i * 0.05}>
              <Card className="flex h-full flex-col p-6">
                <div className="flex items-start gap-3">
                  <BadgeCheck className="h-5 w-5 shrink-0 text-success" />
                  <div className="flex-1">
                    <div className="flex items-baseline justify-between gap-3">
                      <h3 className="font-display text-lg font-semibold text-text">
                        {cert.title}
                      </h3>
                      <span className="font-mono text-xs text-text-muted">{cert.year}</span>
                    </div>
                    <p className="mt-1 text-sm text-accent">{cert.issuer}</p>
                  </div>
                </div>
                {cert.detail && (
                  <p className="mt-3 text-sm text-text-muted">{pick(cert.detail, locale)}</p>
                )}
                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-1.5 font-mono text-xs text-text-muted hover:text-text"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    Verify
                  </a>
                )}
              </Card>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
