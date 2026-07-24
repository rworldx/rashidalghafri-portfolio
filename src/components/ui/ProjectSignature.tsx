import { cn } from '@/lib/cn';

/**
 * A typographic cover for projects that have no screenshot yet.
 *
 * The earlier version drew a small node-and-edge diagram, which was a mistake:
 * it reused the hero constellation's motif, so a static SVG in a card read as
 * "the graph, except it is broken" rather than as artwork. This is
 * unmistakably deliberate instead — the title set enormous and cropped by the
 * frame, the way a record sleeve crops a wordmark.
 *
 * Inline SVG, so it reads the theme tokens directly and stays correct in both
 * modes. A real screenshot always beats it and takes priority in ProjectMedia.
 */

/** Deterministic hash so a slug always produces the same crop. */
function seedFrom(slug: string): number {
  let h = 2166136261;
  for (let i = 0; i < slug.length; i++) {
    h ^= slug.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

interface Props {
  slug: string;
  title: string;
  /** Shown small, under the wordmark. */
  caption?: string;
  className?: string;
}

const W = 1200;
const H = 750;

export function ProjectSignature({ slug, title, caption, className }: Props) {
  const seed = seedFrom(slug);
  // Vary the crop per project so two covers never sit identically.
  const offsetX = -60 - (seed % 90);
  const baseline = H * 0.68 + ((seed >> 8) % 40);
  const size = title.length > 12 ? 210 : 300;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className={cn('size-full', className)}
      role="presentation"
      aria-hidden
      preserveAspectRatio="xMidYMid slice"
    >
      <rect width={W} height={H} fill="var(--surface-2)" />

      {/* A single hairline the wordmark sits on, so the crop looks measured. */}
      <line
        x1={0}
        y1={baseline + 26}
        x2={W}
        y2={baseline + 26}
        stroke="var(--border-strong)"
        strokeWidth={1.5}
      />

      <text
        x={offsetX}
        y={baseline}
        fill="var(--border-strong)"
        style={{
          fontFamily: 'var(--font-sans), sans-serif',
          fontSize: `${size}px`,
          fontWeight: 500,
          letterSpacing: '-0.045em',
        }}
      >
        {title}
      </text>

      {caption && (
        <text
          x={64}
          y={baseline + 86}
          fill="var(--text-faint)"
          style={{
            fontFamily: 'var(--font-mono), monospace',
            fontSize: '26px',
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
          }}
        >
          {caption.toUpperCase()}
        </text>
      )}

      {/* One accent tick: the only colour on the cover. */}
      <rect x={64} y={64} width={54} height={6} fill="var(--accent)" />
    </svg>
  );
}
