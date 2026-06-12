'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { cn } from '@/lib/cn';

interface CopyButtonProps {
  value: string;
  copyLabel: string;
  copiedLabel: string;
  className?: string;
}

/** Copies `value` to clipboard with an explicit copied state (PRD FR-7). */
export function CopyButton({ value, copyLabel, copiedLabel, className }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable — value is still visible to select manually */
    }
  };

  return (
    <button
      type="button"
      onClick={onCopy}
      aria-label={copied ? copiedLabel : copyLabel}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-sm border border-border bg-surface px-2.5 py-1 font-mono text-xs text-text-muted transition-colors hover:text-text',
        className,
      )}
    >
      {copied ? <Check className="h-3.5 w-3.5 text-success" /> : <Copy className="h-3.5 w-3.5" />}
      {copied ? copiedLabel : copyLabel}
    </button>
  );
}
