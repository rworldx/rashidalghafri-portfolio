'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { AlertCircle, Check, Send } from 'lucide-react';
import {
  contactSchema,
  type ContactInput,
  type ContactResponse,
} from '@/lib/contact-schema';
import { site } from '@content/site';
import { Button } from './Button';
import { cn } from '@/lib/cn';

type Status = 'idle' | 'submitting' | 'success' | 'error';

/**
 * Contact form: react-hook-form + Zod, honeypot, explicit states, and a mailto
 * fallback whenever the API cannot take the message.
 *
 * Every error is announced as well as shown: the field carries `aria-invalid`
 * and points at its message through `aria-describedby`, and the message itself
 * pairs an icon with danger colour, so the failure never depends on colour
 * alone. Errors sit directly under the field that caused them rather than in a
 * summary at the top.
 */
export function ContactForm() {
  const t = useTranslations('contact.form');
  const [status, setStatus] = useState<Status>('idle');
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactInput>({ resolver: zodResolver(contactSchema), mode: 'onBlur' });

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

  const fieldClass = cn(
    'w-full rounded-sm border bg-surface px-4 py-3 text-text',
    'placeholder:text-text-faint',
    'transition-[border-color,box-shadow] duration-quick ease-out',
    'focus-visible:border-accent focus-visible:outline-none',
  );

  if (status === 'success') {
    return (
      <div role="status" className="panel flex items-start gap-3 p-6 sm:p-8">
        <Check
          strokeWidth={1.75}
          aria-hidden
          className="mt-0.5 size-5 shrink-0 text-signal"
        />
        <div>
          <p className="text-text">{t('success')}</p>
          <button
            type="button"
            onClick={() => setStatus('idle')}
            className="mt-4 border-b border-accent-line pb-0.5 text-sm text-accent transition-colors duration-quick ease-out hover:border-accent"
          >
            {t('sendAnother')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <Field
        id="name"
        label={t('name')}
        error={errors.name?.message}
        className={fieldClass}
        autoComplete="name"
        register={register('name')}
      />
      <Field
        id="email"
        type="email"
        label={t('email')}
        error={errors.email?.message}
        className={fieldClass}
        autoComplete="email"
        inputMode="email"
        register={register('email')}
      />

      <div>
        <label htmlFor="message" className="label mb-2.5 block text-text-muted">
          {t('message')}
        </label>
        <textarea
          id="message"
          rows={6}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? 'message-error' : undefined}
          className={cn(
            fieldClass,
            'resize-y',
            errors.message ? 'border-danger' : 'border-border',
          )}
          {...register('message')}
        />
        <FieldError id="message-error" message={errors.message?.message} />
      </div>

      {/*
        Honeypot: visually hidden and hidden from assistive tech. `sr-only`
        (clip-based) rather than an off-screen `-left-[9999px]`, which RTL
        counts as ~9999px of scrollable width and turns into phantom
        horizontal overflow across the whole Arabic layout.
      */}
      <div className="sr-only" aria-hidden>
        <label htmlFor="company">Company</label>
        <input id="company" tabIndex={-1} autoComplete="off" {...register('company')} />
      </div>

      {serverError && (
        <p
          className="flex items-start gap-2 rounded-sm bg-danger-soft px-4 py-3 text-sm text-danger"
          role="alert"
        >
          <AlertCircle
            strokeWidth={1.75}
            aria-hidden
            className="mt-0.5 size-4 shrink-0"
          />
          <span>
            {serverError}{' '}
            <a className="underline underline-offset-2" href={`mailto:${site.email}`}>
              {t('mailtoFallback')}
            </a>
          </span>
        </p>
      )}

      <Button
        type="submit"
        size="lg"
        disabled={status === 'submitting'}
        aria-busy={status === 'submitting'}
      >
        <Send strokeWidth={1.75} aria-hidden className="size-4" />
        {status === 'submitting' ? t('sending') : t('send')}
      </Button>
    </form>
  );
}

function Field({
  id,
  label,
  error,
  className,
  register,
  type = 'text',
  ...rest
}: {
  id: string;
  label: string;
  error?: string;
  className: string;
  register: ReturnType<ReturnType<typeof useForm<ContactInput>>['register']>;
  type?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label htmlFor={id} className="label mb-2.5 block text-text-muted">
        {label}
      </label>
      <input
        id={id}
        type={type}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(className, error ? 'border-danger' : 'border-border')}
        {...rest}
        {...register}
      />
      <FieldError id={`${id}-error`} message={error} />
    </div>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p
      id={id}
      role="alert"
      className="mt-2 flex items-center gap-1.5 text-sm text-danger"
    >
      <AlertCircle strokeWidth={1.75} aria-hidden className="size-3.5 shrink-0" />
      {message}
    </p>
  );
}
