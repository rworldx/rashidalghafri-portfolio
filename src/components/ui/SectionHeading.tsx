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

/**
 * Section opener: the headline, and nothing it does not need.
 *
 * Set in the museum's italic didone, the same voice as the hero and the deck,
 * so every page in the site reads as one building rather than as a home page
 * with some other pages behind it. Emphasis inside the headline drops into the
 * signature cut via <Emphasise>.
 *
 * The short fading rule that used to sit above every headline is gone. The
 * flow rail now draws a spur from the page's spine into each section, which
 * says the same thing structurally and says it better — keeping both meant two
 * decorative horizontal lines introducing every block.
 */
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
        {label && <p className="label mb-4 text-text-faint">{label}</p>}
        <Tag className="serif-2 text-text">
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
