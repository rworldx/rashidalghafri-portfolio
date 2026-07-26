'use client';

import { useTranslations } from 'next-intl';
import { RotateCcw } from 'lucide-react';
import { site } from '@content/site';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';

/**
 * Route-level error boundary. States what happened and what to do about it,
 * and offers a way to reach a human when retrying is not going to help.
 */
export default function Error({ reset }: { error: Error; reset: () => void }) {
  const t = useTranslations('error');

  return (
    <Container className="flex min-h-[70dvh] flex-col justify-center py-phi-4">
      <h1 className="serif-2 text-text">{t('title')}</h1>
      <p className="measure-tight mt-phi text-lg text-text-muted">{t('body')}</p>
      <div className="mt-phi-2 flex flex-wrap items-center gap-5">
        <Button onClick={reset} size="lg">
          <RotateCcw strokeWidth={1.75} aria-hidden className="size-4" />
          {t('retry')}
        </Button>
        <a
          href={`mailto:${site.email}`}
          className="action force-ltr break-all border-b border-border-strong pb-0.5 text-sm text-text-muted transition-colors duration-quick ease-out hover:border-accent hover:text-accent"
        >
          {site.email}
        </a>
      </div>
    </Container>
  );
}
