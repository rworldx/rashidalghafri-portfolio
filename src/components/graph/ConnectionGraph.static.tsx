import type { GraphData } from '@/types/graph';
import { nodeColor, nodeRadius } from './nodeColor';

interface Props {
  data: GraphData;
  /** Ambient mode: low opacity, no labels (hero background). */
  ambient?: boolean;
  className?: string;
}

const W = 600;
const H = 420;

/**
 * Deterministic SVG node diagram. Used as:
 *  - the SSR / first-paint render (matches the interactive seed layout), and
 *  - the reduced-motion fallback (still meaningful, just not animated).
 * Pure + server-renderable; no client JS.
 */
export function ConnectionGraphStatic({ data, ambient = false, className }: Props) {
  const cx = W / 2;
  const cy = H / 2;
  const r = Math.min(W, H) * 0.32;

  /*
   * Rounded, and that is load-bearing. Node's and the browser's trig can differ
   * in the last binary digit, so an unrounded coordinate serialises as
   * `191.26811595600705` on the server and `191.26811595600702` on the client,
   * and React reports the whole tree as a hydration mismatch. Two decimals is
   * far below one device pixel here and makes both sides agree exactly.
   */
  const round = (v: number) => Math.round(v * 100) / 100;

  const positions = new Map(
    data.nodes.map((n, i) => {
      if (n.kind === 'self') return [n.id, { x: cx, y: cy }] as const;
      const angle = (i / data.nodes.length) * Math.PI * 2;
      return [
        n.id,
        { x: round(cx + Math.cos(angle) * r), y: round(cy + Math.sin(angle) * r) },
      ] as const;
    }),
  );

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className={className}
      role={ambient ? 'presentation' : 'img'}
      aria-label={ambient ? undefined : 'Diagram connecting projects, skills and recognition'}
      style={{ opacity: ambient ? 0.5 : 1 }}
    >
      <g stroke="var(--border)" strokeWidth={1}>
        {data.edges.map((e, i) => {
          const a = positions.get(e.source);
          const b = positions.get(e.target);
          if (!a || !b) return null;
          return <line key={i} x1={a.x} y1={a.y} x2={b.x} y2={b.y} />;
        })}
      </g>
      <g>
        {data.nodes.map((n) => {
          const p = positions.get(n.id)!;
          return (
            <g key={n.id}>
              <circle
                cx={p.x}
                cy={p.y}
                r={nodeRadius(n.weight ?? 1)}
                fill={nodeColor(n.kind)}
              />
              {!ambient && (
                <text
                  x={p.x}
                  y={p.y - nodeRadius(n.weight ?? 1) - 6}
                  textAnchor="middle"
                  fill="var(--text-muted)"
                  style={{ font: "500 11px var(--font-mono), monospace" }}
                >
                  {n.label}
                </text>
              )}
            </g>
          );
        })}
      </g>
    </svg>
  );
}
