'use client';

import { useTranslations } from 'next-intl';
import { ArrowUp, Github, Instagram, Linkedin, Mail } from 'lucide-react';
import { site } from '@content/site';
import { Container } from './Container';

const iconFor = {
  github: Github,
  linkedin: Linkedin,
  email: Mail,
  instagram: Instagram,
} as const;

/** Site footer: socials, email, attribution, back-to-top (PRD FR-1). */
export function Footer() {
  const t = useTranslations('footer');
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-border py-12">
      <Container className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <p className="font-display text-base font-semibold text-text">{site.name}</p>
          <p className="font-mono text-xs text-text-muted">
            © {year} · {t('rights')}
          </p>
        </div>

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
                className="inline-flex h-9 w-9 items-center justify-center rounded-sm text-text-muted transition-colors hover:bg-surface-2 hover:text-text"
              >
                <Icon className="h-[18px] w-[18px]" />
              </a>
            );
          })}
          <div className="mx-1 h-5 w-px bg-border" />
          <a
            href="#top"
            className="inline-flex h-9 items-center gap-1.5 rounded-sm px-3 font-mono text-xs text-text-muted transition-colors hover:bg-surface-2 hover:text-text"
          >
            {t('backToTop')}
            <ArrowUp className="h-3.5 w-3.5" />
          </a>
        </div>
      </Container>
      <Container className="mt-8">
        <p className="font-mono text-xs text-text-muted">{t('builtWith')}</p>
      </Container>
    </footer>
  );
}
