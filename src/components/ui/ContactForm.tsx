'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { Send } from 'lucide-react';
import { contactSchema, type ContactInput, type ContactResponse } from '@/lib/contact-schema';
import { site } from '@content/site';
import { Button } from './Button';
import { cn } from '@/lib/cn';

type Status = 'idle' | 'submitting' | 'success' | 'error';

/** Contact form (PRD FR-7): RHF + Zod, honeypot, explicit states, mailto fallback. */
export function ContactForm() {
  const t = useTranslations('contact.form');
  const [status, setStatus] = useState<Status>('idle');
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactInput>({ resolver: zodResolver(contactSchema) });

  const onSubmit = async (data: ContactInput) => {
    setStatus('submitting');
    setServerError(null);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = (await res.json()) as ContactResponse;
      if (json.success) {
        setStatus('success');
        reset();
      } else {
        setStatus('error');
        setServerError(
          json.error.code === 'RATE_LIMIT'
            ? t('errorRate')
            : json.error.code === 'VALIDATION'
              ? t('errorValidation')
              : t('errorProvider'),
        );
      }
    } catch {
      setStatus('error');
      setServerError(t('errorProvider'));
    }
  };

  const fieldClass =
    'w-full rounded-sm border border-border bg-surface px-3.5 py-2.5 text-text placeholder:text-text-muted focus-visible:border-accent focus-visible:outline-none';

  if (status === 'success') {
    return (
      <div
        role="status"
        className="rounded-lg border border-border bg-surface-2 p-6 text-text"
      >
        <p>{t('success')}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <div>
        <label htmlFor="name" className="mb-1.5 block font-mono text-xs uppercase tracking-wide text-text-muted">
          {t('name')}
        </label>
        <input id="name" autoComplete="name" className={fieldClass} {...register('name')} />
        {errors.name && (
          <p className="mt-1 text-sm text-accent" role="alert">
            {errors.name.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="mb-1.5 block font-mono text-xs uppercase tracking-wide text-text-muted">
          {t('email')}
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          className={fieldClass}
          {...register('email')}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-accent" role="alert">
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block font-mono text-xs uppercase tracking-wide text-text-muted">
          {t('message')}
        </label>
        <textarea id="message" rows={5} className={cn(fieldClass, 'resize-y')} {...register('message')} />
        {errors.message && (
          <p className="mt-1 text-sm text-accent" role="alert">
            {errors.message.message}
          </p>
        )}
      </div>

      {/* Honeypot — visually hidden, ignored by humans, hidden from AT.
          Uses `sr-only` (clip-based) rather than an off-screen `-left-[9999px]`,
          which in RTL is counted as ~9999px of scrollable width and broke the
          Arabic layout (phantom horizontal overflow). */}
      <div className="sr-only" aria-hidden>
        <label htmlFor="company">Company</label>
        <input id="company" tabIndex={-1} autoComplete="off" {...register('company')} />
      </div>

      {serverError && (
        <p className="text-sm text-accent" role="alert" aria-live="polite">
          {serverError}{' '}
          <a className="underline" href={`mailto:${site.email}`}>
            {t('mailtoFallback')}
          </a>
        </p>
      )}

      <Button type="submit" size="lg" disabled={status === 'submitting'}>
        <Send className="h-4 w-4" />
        {status === 'submitting' ? t('sending') : t('send')}
      </Button>
    </form>
  );
}
