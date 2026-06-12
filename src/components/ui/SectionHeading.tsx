import { Reveal } from '@/components/motion/Reveal';
import { cn } from '@/lib/cn';

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  className?: string;
}

/** Mono eyebrow + display title — the consistent section opener (PRD §3.2). */
export function SectionHeading({ eyebrow, title, className }: SectionHeadingProps) {
  return (
    <Reveal className={cn('space-y-3', className)}>
      <p className="font-mono text-xs uppercase tracking-widest text-accent">{eyebrow}</p>
      <h2 className="font-display text-3xl font-semibold text-text sm:text-4xl">{title}</h2>
    </Reveal>
  );
}
