'use client';

import { useLocale, useTranslations } from 'next-intl';
import { Github, Instagram, Linkedin, Mail } from 'lucide-react';
import { site } from '@content/site';
import { pick } from '@/lib/localized';
import { Container } from '@/components/layout/Container';
import { Reveal } from '@/components/motion/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { CopyButton } from '@/components/ui/CopyButton';
import { ContactForm } from '@/components/ui/ContactForm';

const iconFor = { github: Github, linkedin: Linkedin, email: Mail, instagram: Instagram } as const;

/** Contact (PRD FR-7): email copy + socials + form. */
export function ContactSection() {
  const t = useTranslations('contact');
  const locale = useLocale();

  return (
    <section className="py-20" id="contact">
      <Container>
        <SectionHeading eyebrow={t('eyebrow')} title={t('title')} className="mb-4" />
        <Reveal>
          <p className="mb-10 max-w-xl text-text-muted">{t('subtitle')}</p>
        </Reveal>

        <div className="grid gap-10 lg:grid-cols-2">
          <Reveal className="space-y-6">
            <div>
              <p className="font-mono text-xs uppercase tracking-wide text-text-muted">
                {t('emailLabel')}
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-3">
                <a href={`mailto:${site.email}`} className="text-lg text-text hover:text-accent">
                  {site.email}
                </a>
                <CopyButton value={site.email} copyLabel={t('copy')} copiedLabel={t('copied')} />
              </div>
            </div>

            <div className="flex items-center gap-2">
              {site.socials
                .filter((s) => s.id !== 'email')
                .map((s) => {
                  const Icon = iconFor[s.id];
                  return (
                    <a
                      key={s.id}
                      href={s.href}
                      aria-label={s.label}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-10 w-10 items-center justify-center rounded-sm border border-border text-text-muted transition-colors hover:border-accent hover:text-text"
                    >
                      <Icon className="h-[18px] w-[18px]" />
                    </a>
                  );
                })}
            </div>

            <p className="font-mono text-sm text-text-muted">{pick(site.location, locale)}</p>
          </Reveal>

          <Reveal delay={0.1}>
            <ContactForm />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
