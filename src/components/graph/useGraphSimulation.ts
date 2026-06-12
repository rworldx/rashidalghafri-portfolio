'use client';

import { useEffect, useRef, useState } from 'react';
import type { GraphData } from '@/types/graph';

export interface SimNode {
  id: string;
  label: string;
  kind: GraphData['nodes'][number]['kind'];
  weight: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
}

interface Options {
  width: number;
  height: number;
  /** Stop the simulation loop (e.g. reduced motion). */
  enabled: boolean;
}

/**
 * Tiny force-directed layout (charge repulsion + spring edges + centring).
 * Deterministic seed → identical first paint between server static fallback
 * and client hydration. Returns live node positions + a setter for dragging.
 */
export function useGraphSimulation(data: GraphData, { width, height, enabled }: Options) {
  const nodesRef = useRef<SimNode[]>([]);
  const draggingRef = useRef<string | null>(null);
  const [, force] = useState(0);
  const rafRef = useRef<number>(0);

  // Seed initial positions on a ring (deterministic).
  if (nodesRef.current.length === 0 && width > 0) {
    const cx = width / 2;
    const cy = height / 2;
    const r = Math.min(width, height) * 0.32;
    nodesRef.current = data.nodes.map((n, i) => {
      if (n.kind === 'self') return { ...n, weight: n.weight ?? 1, x: cx, y: cy, vx: 0, vy: 0 };
      const angle = (i / data.nodes.length) * Math.PI * 2;
      return {
        ...n,
        weight: n.weight ?? 1,
        x: cx + Math.cos(angle) * r,
        y: cy + Math.sin(angle) * r,
        vx: 0,
        vy: 0,
      };
    });
  }

  useEffect(() => {
    if (!enabled || width === 0) return;
    const nodes = nodesRef.current;
    const cx = width / 2;
    const cy = height / 2;
    const idx = new Map(nodes.map((n, i) => [n.id, i]));

    const step = () => {
      // Repulsion
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i]!;
          const b = nodes[j]!;
          let dx = a.x - b.x;
          let dy = a.y - b.y;
          const dist = Math.hypot(dx, dy) || 0.01;
          const repel = 1400 / (dist * dist);
          dx /= dist;
          dy /= dist;
          a.vx += dx * repel;
          a.vy += dy * repel;
          b.vx -= dx * repel;
          b.vy -= dy * repel;
        }
      }
      // Springs along edges
      const target = Math.min(width, height) * 0.22;
      for (const e of data.edges) {
        const a = nodes[idx.get(e.source)!];
        const b = nodes[idx.get(e.target)!];
        if (!a || !b) continue;
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const dist = Math.hypot(dx, dy) || 0.01;
        const f = (dist - target) * 0.01;
        const ux = (dx / dist) * f;
        const uy = (dy / dist) * f;
        a.vx += ux;
        a.vy += uy;
        b.vx -= ux;
        b.vy -= uy;
      }
      // Centring + integrate + damping
      for (const n of nodes) {
        n.vx += (cx - n.x) * 0.002;
        n.vy += (cy - n.y) * 0.002;
        if (draggingRef.current === n.id) {
          n.vx = 0;
          n.vy = 0;
          continue;
        }
        n.vx *= 0.86;
        n.vy *= 0.86;
        n.x += n.vx;
        n.y += n.vy;
        n.x = Math.max(16, Math.min(width - 16, n.x));
        n.y = Math.max(16, Math.min(height - 16, n.y));
      }
      force((v) => v + 1);
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [data, width, height, enabled]);

  const setNodePosition = (id: string, x: number, y: number) => {
    const n = nodesRef.current.find((m) => m.id === id);
    if (n) {
      n.x = x;
      n.y = y;
    }
  };

  return {
    nodes: nodesRef.current,
    edges: data.edges,
    setDragging: (id: string | null) => (draggingRef.current = id),
    setNodePosition,
  };
}
