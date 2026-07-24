'use client';

import { useLocale, useTranslations } from 'next-intl';
import { ArrowUp, Github, Instagram, Linkedin, Mail } from 'lucide-react';
import { site } from '@content/site';
import { pick } from '@/lib/localized';
import { cn } from '@/lib/cn';
import { Container } from './Container';

const iconFor = {
  github: Github,
  linkedin: Linkedin,
  email: Mail,
  instagram: Instagram,
} as const;

/**
 * Closing surface. The name is set at display scale so the page ends on the
 * same note it opened on, and the practical links sit on the short side of the
 * golden split beside it.
 */
export function Footer() {
  const t = useTranslations('footer');
  const locale = useLocale();
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-phi-4 border-t border-border bg-bg-deep/40">
      <Container className="py-phi-3">
        <div className="grid gap-phi-2 lg:grid-cols-[1.618fr_1fr] lg:items-end">
          <div>
            <p className="display-3 text-text">{pick(site.displayName, locale)}</p>
            <p className="mt-3 max-w-md text-sm text-text-muted">{pick(site.role, locale)}</p>
            <a
              href={`mailto:${site.email}`}
              className="action mt-6 inline-block border-b border-accent-line pb-0.5 text-lg text-text transition-colors duration-quick ease-out hover:border-accent hover:text-accent"
            >
              {site.email}
            </a>
          </div>

          <div className="flex flex-col gap-6 lg:items-end">
            <div className="flex items-center gap-1">
              {site.socials.map((s) => {
                const Icon = iconFor[s.id];
                return (
                  <a
                    key={s.id}
                    href={s.href}
                    aria-label={s.label}
                    target={s.external ? '_blank' : undefined}
                    rel={s.external ? 'noopener noreferrer' : undefined}
                    className={cn(
                      'inline-flex size-10 items-center justify-center rounded-full border border-border text-text-muted',
                      'transition-[color,border-color,transform] duration-quick ease-out',
                      'hover:border-border-strong hover:text-text active:scale-[0.94] active:duration-press',
                    )}
                  >
                    <Icon strokeWidth={1.5} className="size-[18px]" aria-hidden />
                  </a>
                );
              })}
            </div>

            <a
              href="#top"
              className="action inline-flex items-center gap-2 font-mono text-2xs uppercase tracking-[0.14em] text-text-muted transition-colors duration-quick ease-out hover:text-text"
            >
              {t('backToTop')}
              <ArrowUp strokeWidth={1.5} className="size-3.5" aria-hidden />
            </a>
          </div>
        </div>

        <div className="mt-phi-3 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6">
          <p className="font-mono text-2xs text-text-faint">
            {'©'} {year} {'·'} {t('rights')}
          </p>
          <p className="font-mono text-2xs text-text-faint">{t('builtWith')}</p>
        </div>
      </Container>
    </footer>
  );
}
