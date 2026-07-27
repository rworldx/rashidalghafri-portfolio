'use client';

import { graph } from '@content/graph';
import { useMounted } from '@/hooks/useMounted';
import { ConnectionGraph } from './ConnectionGraph';
import { ConnectionGraphStatic } from './ConnectionGraph.static';

/**
 * Picks what to draw the connections with.
 *
 * REDUCED MOTION NOW GETS THE REAL GRAPH. It used to get a ring-shaped static
 * SVG whose labels overlapped each other, so anyone with animations switched
 * off, which is a large share of Windows laptops and any Android with "remove
 * animations", received a worse diagram rather than the same one held still.
 *
 * The force graph is a fair choice here because it SETTLES: it runs until the
 * system is at rest, then stops drawing permanently. There is no loop, no
 * idle drift and no parallax, so what a reduced-motion visitor sees is a
 * diagram arranging itself once and then holding still, which is a long way
 * from the kind of continuous movement the preference exists to prevent.
 *
 * The static SVG is still the SSR and no-JavaScript form, so the section has
 * meaningful content before hydration and never shifts layout.
 */
export function InteractiveGraph({ className }: { className?: string }) {
  const mounted = useMounted();

  if (!mounted) {
    return (
      <ConnectionGraphStatic data={graph} className={className ?? 'h-full w-full'} />
    );
  }
  return <ConnectionGraph className={className} />;
}
