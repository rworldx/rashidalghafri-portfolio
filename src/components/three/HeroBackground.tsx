'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
import { useTheme } from 'next-themes';
import { graph } from '@content/graph';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useMounted } from '@/hooks/useMounted';
import { ConnectionGraphStatic } from '@/components/graph/ConnectionGraph.static';
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';
import { readTokenColor } from '@/lib/css-color';
import type { FlowColors } from './FlowNetwork';

/** WebGL is heavy + browser-only → load it after paint, never on the server. */
const FlowNetwork = dynamic(() => import('./FlowNetwork'), {
  ssr: false,
  loading: () => null,
});

/**
 * Tokens are authored in OKLCH, which THREE.Color cannot parse — every value
 * goes through the browser's own colour parser first (see lib/css-color).
 *
 * The field is tonal: everything is drawn from the accent family rather than
 * from the text ramp. Reading `--text` for a node meant near-black spheres in
 * light mode, which rendered as heavy grey marbles scattered over the paper
 * instead of a constellation. Kinds are not distinguished here on purpose —
 * this is ambient and unlabelled, so a second hue would only break the
 * one-accent rule for no gain. The About-page graph, which *is* labelled and
 * has a key, keeps its per-kind colours.
 */
function readColors(): FlowColors {
  const accent = readTokenColor('--accent', '#3b64e0');
  // Hierarchy comes from node size and pulse brightness, never from a second
  // hue — the one-accent rule holds inside the canvas too.
  return {
    node: accent,
    edge: readTokenColor('--accent-line', '#8aa4ef'),
    pulse: accent,
  };
}

function webglSupported(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    return !!(canvas.getContext('webgl2') || canvas.getContext('webgl'));
  } catch {
    return false;
  }
}

/**
 * Decides between the 3D network and the static SVG diagram, manages
 * theme-aware colours, and pauses rendering when the hero scrolls away.
 * Reduced-motion or no-WebGL → static fallback (PRD §5.3/§5.5, Addendum B.1).
 */
export function HeroBackground({ className }: { className?: string }) {
  const mounted = useMounted();
  const reduced = useReducedMotion();
  const { resolvedTheme } = useTheme();
  const ref = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const [colors, setColors] = useState<FlowColors | null>(null);
  const [canRender3D, setCanRender3D] = useState(false);

  useEffect(() => {
    setCanRender3D(webglSupported());
  }, []);

  // Re-read theme colours whenever the resolved theme changes.
  useEffect(() => {
    if (!mounted) return;
    setColors(readColors());
  }, [mounted, resolvedTheme]);

  // Pause the render loop when the hero is off-screen.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setPaused(!entry?.isIntersecting), {
      threshold: 0.05,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const useStatic = !mounted || reduced || !canRender3D || !colors;
  const fallback = (
    <ConnectionGraphStatic data={graph} ambient className="h-full w-full" />
  );

  return (
    <div ref={ref} className={className}>
      {useStatic ? (
        fallback
      ) : (
        <ErrorBoundary fallback={fallback}>
          <FlowNetwork
            colors={colors}
            paused={paused}
            isDark={resolvedTheme === 'dark'}
          />
        </ErrorBoundary>
      )}
    </div>
  );
}
