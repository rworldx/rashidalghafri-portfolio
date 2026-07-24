import type { ReactNode } from 'react';
import { Reveal } from '@/components/motion/Reveal';
import { cn } from '@/lib/cn';

interface SectionHeadingProps {
  title: string;
  /**
   * A substring of `title` set in italic. Emphasis is always the SAME family in
   * its italic cut — never a second typeface injected into a headline.
   * Descender clearance is handled by `.em-italic`.
   */
  emphasis?: string;
  /**
   * Rendered rarely and on purpose. A small tracked label above every section
   * is the most-repeated AI tell there is; the headline alone is normally
   * enough. Use this only where it names a genuine shift in genre.
   */
  label?: string;
  /** Optional trailing content on the same baseline (a link, a count). */
  aside?: ReactNode;
  className?: string;
  as?: 'h1' | 'h2';
}

/** Section opener: a fading rule, the headline, and nothing it does not need. */
export function SectionHeading({
  title,
  emphasis,
  label,
  aside,
  className,
  as: Tag = 'h2',
}: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        'flex flex-wrap items-end justify-between gap-x-8 gap-y-4',
        className,
      )}
    >
      <div className="min-w-0">
        <hr className="rule-fade mb-6 w-16" aria-hidden />
        {label && <p className="label mb-4 text-text-faint">{label}</p>}
        <Tag className="display-2 text-text">
          <Emphasise title={title} emphasis={emphasis} />
        </Tag>
      </div>
      {aside && <div className="shrink-0 pb-1">{aside}</div>}
    </Reveal>
  );
}

/** Splits a headline once so the emphasised phrase can take the italic cut. */
export function Emphasise({ title, emphasis }: { title: string; emphasis?: string }) {
  if (!emphasis) return <>{title}</>;
  const at = title.indexOf(emphasis);
  if (at === -1) return <>{title}</>;
  return (
    <>
      {title.slice(0, at)}
      <span className="em-italic">{emphasis}</span>
      {title.slice(at + emphasis.length)}
    </>
  );
}
