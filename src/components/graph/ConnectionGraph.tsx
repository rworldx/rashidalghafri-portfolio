'use client';

import { useEffect, useRef, useState } from 'react';
import type { GraphData } from '@/types/graph';
import { useGraphSimulation } from './useGraphSimulation';
import { nodeRadius } from './nodeColor';

interface Props {
  data: GraphData;
  ambient?: boolean;
  className?: string;
}

/** Reads a CSS variable to a concrete colour for canvas (canvas can't use var()). */
function readVar(name: string, fallback: string): string {
  if (typeof window === 'undefined') return fallback;
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback;
}

/**
 * Interactive canvas connection graph (PRD §3.5 signature). Nodes drift via a
 * force simulation; dragging a node nudges neighbours. Ambient mode dims it and
 * disables interaction for the hero background. Wrapped by `GraphSignature`,
 * which only mounts this when motion is allowed.
 */
export function ConnectionGraph({ data, ambient = false, className }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const hoverRef = useRef<string | null>(null);

  const sim = useGraphSimulation(data, { width: size.w, height: size.h, enabled: size.w > 0 });

  // Measure container.
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      if (entry) setSize({ w: entry.contentRect.width, h: entry.contentRect.height });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Draw loop (renders whatever the sim currently holds).
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || size.w === 0) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = size.w * dpr;
    canvas.height = size.h * dpr;
    ctx.scale(dpr, dpr);

    let raf = 0;
    const render = () => {
      const colors = {
        border: readVar('--border', '#e2e0d8'),
        accent: readVar('--accent', '#2f5bea'),
        success: readVar('--success', '#1fa97a'),
        text: readVar('--text', '#15171c'),
        muted: readVar('--text-muted', '#5b6270'),
      };
      ctx.clearRect(0, 0, size.w, size.h);
      ctx.globalAlpha = ambient ? 0.45 : 1;

      // Edges
      ctx.strokeStyle = colors.border;
      ctx.lineWidth = 1;
      const byId = new Map(sim.nodes.map((n) => [n.id, n]));
      for (const e of sim.edges) {
        const a = byId.get(e.source);
        const b = byId.get(e.target);
        if (!a || !b) continue;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }

      // Nodes
      for (const n of sim.nodes) {
        const color =
          n.kind === 'self'
            ? colors.accent
            : n.kind === 'project'
              ? colors.success
              : n.kind === 'recognition'
                ? colors.text
                : colors.muted;
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.arc(n.x, n.y, nodeRadius(n.weight), 0, Math.PI * 2);
        ctx.fill();

        if (!ambient) {
          ctx.fillStyle = hoverRef.current === n.id ? colors.text : colors.muted;
          ctx.font = "500 11px var(--font-mono), monospace";
          ctx.textAlign = 'center';
          ctx.fillText(n.label, n.x, n.y - nodeRadius(n.weight) - 6);
        }
      }
      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);
    return () => cancelAnimationFrame(raf);
  }, [size, ambient, sim]);

  // Pointer drag (interactive mode only).
  useEffect(() => {
    if (ambient) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const hit = (x: number, y: number) =>
      sim.nodes.find((n) => Math.hypot(n.x - x, n.y - y) < nodeRadius(n.weight) + 10)?.id ?? null;

    const pos = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    const currentDrag = { current: null as string | null };

    const onPointerDown = (e: PointerEvent) => {
      const { x, y } = pos(e);
      const id = hit(x, y);
      if (id) {
        currentDrag.current = id;
        sim.setDragging(id);
        canvas.setPointerCapture(e.pointerId);
      }
    };
    const onPointerMove = (e: PointerEvent) => {
      const { x, y } = pos(e);
      hoverRef.current = hit(x, y);
      canvas.style.cursor = hoverRef.current ? 'grab' : 'default';
      if (currentDrag.current && canvas.hasPointerCapture(e.pointerId)) {
        sim.setNodePosition(currentDrag.current, x, y);
      }
    };
    const onPointerUp = (e: PointerEvent) => {
      currentDrag.current = null;
      sim.setDragging(null);
      if (canvas.hasPointerCapture(e.pointerId)) canvas.releasePointerCapture(e.pointerId);
    };

    canvas.addEventListener('pointerdown', onPointerDown);
    canvas.addEventListener('pointermove', onPointerMove);
    canvas.addEventListener('pointerup', onPointerUp);
    return () => {
      canvas.removeEventListener('pointerdown', onPointerDown);
      canvas.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('pointerup', onPointerUp);
    };
  }, [ambient, sim]);

  return (
    <div ref={wrapRef} className={className} style={{ width: '100%', height: '100%' }}>
      <canvas
        ref={canvasRef}
        style={{ width: '100%', height: '100%', touchAction: ambient ? 'auto' : 'none' }}
        aria-hidden={ambient}
      />
    </div>
  );
}
