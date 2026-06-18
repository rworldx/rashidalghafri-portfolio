'use client';

import { useEffect, useRef } from 'react';
import { graph } from '@content/graph';
import type { GraphNodeKind } from '@/types/graph';

interface SimNode {
  id: string;
  label: string;
  kind: GraphNodeKind;
  weight: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
}

function radiusFor(weight: number): number {
  return 5 + weight * 2.5;
}

/** Resolve a CSS variable to a concrete colour (canvas can't use `var()`). */
function readVar(name: string, fallback: string): string {
  if (typeof window === 'undefined') return fallback;
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback;
}

/**
 * Interactive 2D force-directed connection graph (PRD §3.5 signature).
 * Implemented imperatively on a canvas (no per-frame React render), so pointer
 * dragging is reliable: grab a node and its neighbours follow via the springs.
 * Theme-aware (re-reads tokens when the theme class changes); the parent renders
 * a static SVG instead under reduced motion / SSR.
 */
export function ConnectionGraph({ className }: { className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = Math.max(wrap.clientWidth, 1);
    let h = Math.max(wrap.clientHeight, 1);
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    // Seed nodes on a ring (deterministic), self in the centre.
    const nodes: SimNode[] = graph.nodes.map((n, i) => {
      const cx = w / 2;
      const cy = h / 2;
      if (n.kind === 'self') {
        return { ...n, weight: n.weight ?? 1, x: cx, y: cy, vx: 0, vy: 0 };
      }
      const a = (i / graph.nodes.length) * Math.PI * 2;
      const r = Math.min(w, h) * 0.32;
      return {
        ...n,
        weight: n.weight ?? 1,
        x: cx + Math.cos(a) * r,
        y: cy + Math.sin(a) * r,
        vx: 0,
        vy: 0,
      };
    });
    const byId = new Map(nodes.map((n) => [n.id, n]));

    let colors = readColors();
    function readColors() {
      return {
        border: readVar('--border', '#e2e0d8'),
        accent: readVar('--accent', '#2f5bea'),
        success: readVar('--success', '#1fa97a'),
        text: readVar('--text', '#15171c'),
        muted: readVar('--text-muted', '#5b6270'),
        surface: readVar('--surface', '#ffffff'),
      };
    }
    const colorOf = (kind: GraphNodeKind) =>
      kind === 'self'
        ? colors.accent
        : kind === 'project'
          ? colors.success
          : kind === 'recognition'
            ? colors.text
            : colors.muted;

    // Re-read palette when the theme class flips.
    const themeObserver = new MutationObserver(() => {
      colors = readColors();
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    const resize = () => {
      w = Math.max(wrap.clientWidth, 1);
      h = Math.max(wrap.clientHeight, 1);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = '100%';
      canvas.style.height = '100%';
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    // Pointer state.
    let hover: SimNode | null = null;
    let dragging: SimNode | null = null;
    const pos = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    const pick = (x: number, y: number) =>
      nodes.find((n) => Math.hypot(n.x - x, n.y - y) <= radiusFor(n.weight) + 12) ?? null;

    const onDown = (e: PointerEvent) => {
      const { x, y } = pos(e);
      const n = pick(x, y);
      if (n) {
        dragging = n;
        canvas.setPointerCapture(e.pointerId);
        canvas.style.cursor = 'grabbing';
      }
    };
    const onMove = (e: PointerEvent) => {
      const { x, y } = pos(e);
      if (dragging) {
        dragging.x = x;
        dragging.y = y;
        dragging.vx = 0;
        dragging.vy = 0;
      } else {
        hover = pick(x, y);
        canvas.style.cursor = hover ? 'grab' : 'default';
      }
    };
    const onUp = (e: PointerEvent) => {
      dragging = null;
      canvas.style.cursor = hover ? 'grab' : 'default';
      if (canvas.hasPointerCapture(e.pointerId)) canvas.releasePointerCapture(e.pointerId);
    };
    canvas.addEventListener('pointerdown', onDown);
    canvas.addEventListener('pointermove', onMove);
    canvas.addEventListener('pointerup', onUp);
    canvas.addEventListener('pointerleave', () => {
      if (!dragging) {
        hover = null;
        canvas.style.cursor = 'default';
      }
    });

    // Simulation + render loop.
    let raf = 0;
    const tick = () => {
      const cx = w / 2;
      const cy = h / 2;

      // Repulsion.
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i]!;
          const b = nodes[j]!;
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy) || 0.01;
          const f = 1800 / (dist * dist);
          const ux = (dx / dist) * f;
          const uy = (dy / dist) * f;
          a.vx += ux;
          a.vy += uy;
          b.vx -= ux;
          b.vy -= uy;
        }
      }
      // Springs.
      const target = Math.min(w, h) * 0.24;
      for (const e of graph.edges) {
        const a = byId.get(e.source);
        const b = byId.get(e.target);
        if (!a || !b) continue;
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const dist = Math.hypot(dx, dy) || 0.01;
        const f = (dist - target) * 0.015;
        const ux = (dx / dist) * f;
        const uy = (dy / dist) * f;
        a.vx += ux;
        a.vy += uy;
        b.vx -= ux;
        b.vy -= uy;
      }
      // Centre + integrate (skip the dragged node).
      for (const n of nodes) {
        if (n === dragging) continue;
        n.vx += (cx - n.x) * 0.004;
        n.vy += (cy - n.y) * 0.004;
        n.vx *= 0.85;
        n.vy *= 0.85;
        n.x += n.vx;
        n.y += n.vy;
        n.x = Math.max(20, Math.min(w - 20, n.x));
        n.y = Math.max(20, Math.min(h - 20, n.y));
      }

      // Draw.
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      ctx.lineWidth = 1;
      for (const e of graph.edges) {
        const a = byId.get(e.source);
        const b = byId.get(e.target);
        if (!a || !b) continue;
        const active = hover && (a === hover || b === hover);
        ctx.strokeStyle = active ? colors.accent : colors.border;
        ctx.globalAlpha = active ? 0.9 : 0.5;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;

      for (const n of nodes) {
        const r = radiusFor(n.weight) * (n === hover || n === dragging ? 1.35 : 1);
        ctx.beginPath();
        ctx.fillStyle = colorOf(n.kind);
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = n === hover || n === dragging ? colors.text : colors.muted;
        ctx.font = '500 11px ui-monospace, monospace';
        ctx.textAlign = 'center';
        ctx.fillText(n.label, n.x, n.y - r - 6);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      themeObserver.disconnect();
      canvas.removeEventListener('pointerdown', onDown);
      canvas.removeEventListener('pointermove', onMove);
      canvas.removeEventListener('pointerup', onUp);
    };
  }, []);

  return (
    <div ref={wrapRef} className={className} style={{ width: '100%', height: '100%', touchAction: 'none' }}>
      <canvas ref={canvasRef} />
    </div>
  );
}
