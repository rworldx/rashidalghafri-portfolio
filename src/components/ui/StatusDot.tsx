import { cn } from '@/lib/cn';

/**
 * The site's ONE decorative-looking dot, and it is not decorative: it only
 * appears where something is genuinely live (availability, a deployed URL).
 * A coloured dot before every list row is a tell; this one carries state.
 */
export function StatusDot({ className }: { className?: string }) {
  return (
    <span className={cn('relative inline-flex size-1.5 shrink-0', className)} aria-hidden>
      <span className="absolute inset-0 rounded-full bg-signal animate-signal-pulse" />
      <span className="relative size-1.5 rounded-full bg-signal" />
    </span>
  );
}
