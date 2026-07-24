'use client';

import { useEffect, useRef, useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { cn } from '@/lib/cn';

interface CopyButtonProps {
  value: string;
  copyLabel: string;
  copiedLabel: string;
  className?: string;
}

/**
 * Copies `value`, then says so. The confirmation is announced via a live
 * region as well as shown, and the timer is cleared on unmount so a fast
 * navigation cannot set state on a gone component.
 */
export function CopyButton({ value, copyLabel, copiedLabel, className }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => () => clearTimeout(timer.current), []);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      /* Clipboard unavailable. The value stays visible and selectable. */
    }
  };

  return (
    <button
      type="button"
      onClick={onCopy}
      className={cn(
        'inline-flex min-h-11 items-center gap-1.5 rounded-full border border-border px-4 font-mono text-2xs uppercase tracking-[0.12em] text-text-muted sm:min-h-9',
        'transition-[color,border-color,transform] duration-quick ease-out',
        'hover:border-border-strong hover:text-text active:scale-[0.96] active:duration-press',
        className,
      )}
    >
      {copied ? (
        <Check strokeWidth={2} aria-hidden className="size-3.5 text-signal" />
      ) : (
        <Copy strokeWidth={1.75} aria-hidden className="size-3.5" />
      )}
      <span aria-live="polite">{copied ? copiedLabel : copyLabel}</span>
    </button>
  );
}
