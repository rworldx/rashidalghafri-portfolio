'use client';

import { useLocale, useTranslations } from 'next-intl';
import { Github, Instagram, Linkedin, Mail } from 'lucide-react';
import { site } from '@content/site';
import { pick } from '@/lib/localized';
import { Container, sectionY } from '@/components/layout/Container';
import { Reveal } from '@/components/motion/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { StatusDot } from '@/components/ui/StatusDot';
import { CopyButton } from '@/components/ui/CopyButton';
import { ContactForm } from '@/components/ui/ContactForm';
import { cn } from '@/lib/cn';

const iconFor = { github: Github, linkedin: Linkedin, email: Mail, instagram: Instagram } as const;

/**
 * Two ways in, side by side: the direct details for anyone who would rather
 * reach out on their own terms, and the form for anyone who would rather not
 * leave the page. Neither is buried behind the other.
 *
 * Email and phone are real `mailto:` / `tel:` links with a copy control beside
 * them, because on desktop people copy and on mobile people tap.
 */
export function ContactSection() {
  const t = useTranslations('contact');
  const locale = useLocale();

  return (
    <section className={sectionY} id="contact">
      <Container>
        <SectionHeading
          as="h1"
          title={t('title')}
          emphasis={t('emphasis')}
          className="mb-phi-2"
        />

        <Reveal>
          <p className="measure-tight text-lg text-text-muted">{t('subtitle')}</p>
        </Reveal>

        <div className="mt-phi-3 grid gap-phi-2 lg:grid-cols-[1fr_1.618fr] lg:gap-phi-3">
          <Reveal className="space-y-8">
            <div>
              <h2 className="label mb-3 text-text-faint">{t('emailLabel')}</h2>
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={`mailto:${site.email}`}
                  className="action force-ltr break-all border-b border-border-strong pb-0.5 text-lg text-text transition-colors duration-quick ease-out hover:border-accent hover:text-accent"
                >
                  {site.email}
                </a>
                <CopyButton value={site.email} copyLabel={t('copy')} copiedLabel={t('copied')} />
              </div>
            </div>

            <div>
              <h2 className="label mb-3 text-text-faint">{t('phoneLabel')}</h2>
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={`tel:${site.phone.replace(/\s/g, '')}`}
                  className="action force-ltr border-b border-border-strong pb-0.5 text-lg text-text transition-colors duration-quick ease-out hover:border-accent hover:text-accent"
                >
                  {site.phone}
                </a>
                <CopyButton value={site.phone} copyLabel={t('copy')} copiedLabel={t('copied')} />
              </div>
            </div>

            <ul className="flex items-center gap-2">
              {site.socials
                .filter((s) => s.id !== 'email')
                .map((s) => {
                  const Icon = iconFor[s.id];
                  return (
                    <li key={s.id}>
                      <a
                        href={s.href}
                        aria-label={s.label}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                          'inline-flex size-11 items-center justify-center rounded-full border border-border text-text-muted',
                          'transition-[color,border-color,transform] duration-quick ease-out',
                          'hover:border-border-strong hover:text-text active:scale-[0.94] active:duration-press',
                        )}
                      >
                        <Icon strokeWidth={1.5} aria-hidden className="size-[18px]" />
                      </a>
                    </li>
                  );
                })}
            </ul>

            <p className="inline-flex items-center gap-2.5 font-mono text-2xs uppercase tracking-[0.14em] text-text-muted">
              <StatusDot />
              {pick(site.status, locale)}
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <ContactForm />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
