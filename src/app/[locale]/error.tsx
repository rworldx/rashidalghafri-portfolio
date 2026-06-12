'use client';

import { useTranslations } from 'next-intl';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';

/** Route-level error boundary (PRD §5.5 reliability). */
export default function Error({ reset }: { error: Error; reset: () => void }) {
  const t = useTranslations('error');
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <h1 className="font-display text-3xl font-semibold text-text">{t('title')}</h1>
      <p className="mt-2 max-w-md text-text-muted">{t('body')}</p>
      <Button onClick={reset} size="lg" className="mt-8">
        {t('retry')}
      </Button>
    </Container>
  );
}
