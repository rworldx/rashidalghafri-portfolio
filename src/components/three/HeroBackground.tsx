'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
import { useTheme } from 'next-themes';
import { graph } from '@content/graph';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useMounted } from '@/hooks/useMounted';
import { ConnectionGraphStatic } from '@/components/graph/ConnectionGraph.static';
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';
import type { ConstellationColors } from './HeroConstellation';

/** R3F is heavy + browser-only → load it after paint, never on the server. */
const HeroConstellation = dynamic(() => import('./HeroConstellation'), {
  ssr: false,
  loading: () => null,
});

function readColor(name: string, fallback: string): string {
  if (typeof window === 'undefined') return fallback;
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback;
}

function readColors(): ConstellationColors {
  return {
    self: readColor('--accent', '#5b82ff'),
    project: readColor('--success', '#7ce0c4'),
    recognition: readColor('--text', '#eceff4'),
    skill: readColor('--text-muted', '#9aa5b8'),
    edge: readColor('--border', '#222c3a'),
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
 * Decides between the 3D constellation and the static SVG diagram, manages
 * theme-aware colours, and pauses rendering when the hero scrolls away.
 * Reduced-motion or no-WebGL → static fallback (PRD §5.3/§5.5, Addendum B.1).
 */
export function HeroBackground({ className }: { className?: string }) {
  const mounted = useMounted();
  const reduced = useReducedMotion();
  const { resolvedTheme } = useTheme();
  const ref = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const [colors, setColors] = useState<ConstellationColors | null>(null);
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
    const io = new IntersectionObserver(
      ([entry]) => setPaused(!entry?.isIntersecting),
      { threshold: 0.05 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const useStatic = !mounted || reduced || !canRender3D || !colors;
  const fallback = <ConnectionGraphStatic data={graph} ambient className="h-full w-full" />;

  return (
    <div ref={ref} className={className}>
      {useStatic ? (
        fallback
      ) : (
        <ErrorBoundary fallback={fallback}>
          <HeroConstellation colors={colors} paused={paused} />
        </ErrorBoundary>
      )}
    </div>
  );
}
