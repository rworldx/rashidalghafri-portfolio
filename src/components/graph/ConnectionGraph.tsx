'use client';

import { useEffect, useRef } from 'react';
import { graph } from '@content/graph';
import { readTokenColor } from '@/lib/css-color';
import { cn } from '@/lib/cn';
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

/**
 * Canvas cannot use `var()`, and it cannot parse the OKLCH the tokens are
 * authored in either, so every value is normalised via the browser's own
 * colour parser (see lib/css-color).
 */

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

  // Safe to read at render: this component only mounts client-side (the parent
  // shows a static SVG until then), so there is no SSR/hydration concern.
  const coarse =
    typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = Math.max(wrap.clientWidth, 1);
    let h = Math.max(wrap.clientHeight, 1);
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    /**
     * DENSITY drives the whole tuning, not just the pointer type.
     *
     * Touch normally wants everything bigger: fat fingers, no hover. But the
     * graph now carries every project, skill and award rather than a handful,
     * and at that count "bigger" is what makes a phone unreadable. So a dense
     * graph shrinks its nodes back down and labels far fewer of them.
     */
    const dense = graph.nodes.length > 12;
    const small = w < 560;
    const nodeScale = coarse ? (dense ? 1.05 : 1.55) : dense ? 0.85 : 1;
    const hitSlop = coarse ? 26 : 12;
    const labelPx = coarse ? (dense ? 11 : 13) : 11;
    const rOf = (weight: number) => radiusFor(weight) * nodeScale;
    /**
     * The minimum weight that earns a permanent label. Everything else labels
     * on touch or hover. Labelling twelve nodes at 390px is the same illegible
     * knot as labelling all of them.
     */
    const labelFloor = small || coarse ? (dense ? 3 : 2) : dense ? 2 : 0;

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
        border: readTokenColor('--border-strong', '#e2e0d8'),
        accent: readTokenColor('--accent', '#2f5bea'),
        signal: readTokenColor('--signal', '#1fa97a'),
        text: readTokenColor('--text', '#15171c'),
        muted: readTokenColor('--text-muted', '#5b6270'),
        faint: readTokenColor('--text-faint', '#8b8f99'),
      };
    }
    const colorOf = (kind: GraphNodeKind) =>
      kind === 'self'
        ? colors.accent
        : kind === 'project'
          ? colors.signal
          : kind === 'recognition'
            ? colors.text
            : colors.muted;

    /*
     * Loop control, declared before anything that can call it. `resize()` runs
     * during setup, so a `wake` defined further down would be in the temporal
     * dead zone at that point. `tickFn` stays null until the loop exists,
     * which makes an early wake a safe no-op instead of a ReferenceError.
     */
    let raf = 0;
    let running = false;
    let visible = false;
    let settleFrames = 0;
    let tickFn: (() => void) | null = null;

    const wake = () => {
      settleFrames = 0;
      if (!tickFn || running || !visible) return;
      running = true;
      raf = requestAnimationFrame(tickFn);
    };

    // Re-read palette when the theme class flips.
    const themeObserver = new MutationObserver(() => {
      colors = readColors();
      wake();
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    const resize = () => {
      wake();
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
      nodes.find((n) => Math.hypot(n.x - x, n.y - y) <= rOf(n.weight) + hitSlop) ?? null;

    const onDown = (e: PointerEvent) => {
      const { x, y } = pos(e);
      const n = pick(x, y);
      if (n) {
        dragging = n;
        wake();
        canvas.setPointerCapture(e.pointerId);
        canvas.style.cursor = 'grabbing';
      }
    };
    const onMove = (e: PointerEvent) => {
      const { x, y } = pos(e);
      wake();
      if (dragging) {
        // Keep the grabbed node inside the frame so it cannot be dragged out
        // of sight and lost.
        dragging.x = Math.max(16, Math.min(w - 16, x));
        dragging.y = Math.max(16, Math.min(h - 16, y));
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
      if (canvas.hasPointerCapture(e.pointerId))
        canvas.releasePointerCapture(e.pointerId);
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

    /*
     * Simulation + render loop.
     *
     * It stops. The previous version rescheduled forever, so a force
     * simulation and a full canvas repaint ran at 60fps for as long as the
     * page was open — including while scrolled far past the graph. It settles
     * once the layout stops moving, and an IntersectionObserver keeps it
     * parked while off-screen. Any interaction (hover, drag, resize, theme
     * change) wakes it again.
     */
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
          const f = (dense ? 2600 : 1800) / (dist * dist);
          const ux = (dx / dist) * f;
          const uy = (dy / dist) * f;
          a.vx += ux;
          a.vy += uy;
          b.vx -= ux;
          b.vy -= uy;
        }
      }
      // Springs.
      // Denser graphs need proportionally MORE space between neighbours, or
      // the extra nodes simply pack into the same area.
      const target = Math.min(w, h) * (dense ? 0.3 : 0.24);
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
        const active = n === hover || n === dragging;
        const r = rOf(n.weight) * (active ? 1.3 : 1);

        // A faint ring so nodes read as grabbable handles, not just dots.
        ctx.beginPath();
        ctx.strokeStyle = colorOf(n.kind);
        ctx.globalAlpha = active ? 0.35 : 0.16;
        ctx.lineWidth = coarse ? 2 : 1.5;
        ctx.arc(n.x, n.y, r + (coarse ? 7 : 5), 0, Math.PI * 2);
        ctx.stroke();
        ctx.globalAlpha = 1;

        ctx.beginPath();
        ctx.fillStyle = colorOf(n.kind);
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fill();

        if (active || n.weight >= labelFloor) {
          ctx.fillStyle = active ? colors.text : colors.muted;
          ctx.font = `500 ${labelPx}px ui-monospace, monospace`;
          ctx.textAlign = 'center';
          /*
           * Clamp the label inside the canvas. A node near an edge would
           * otherwise centre its label past the boundary and the text was cut
           * in half, which is how "LIYSF, top 30 of 738" rendered as
           * "YSF, top 30 of".
           */
          const half = ctx.measureText(n.label).width / 2;
          const pad = 4;
          const lx = Math.min(Math.max(n.x, half + pad), w - half - pad);
          ctx.fillText(n.label, lx, n.y - r - 7);
        }
      }

      // Settle: once the whole system is essentially still and nobody is
      // touching it, stop drawing rather than burning frames on a static image.
      const energy = nodes.reduce((sum, n) => sum + Math.abs(n.vx) + Math.abs(n.vy), 0);
      if (energy < 0.35 && !dragging && !hover) {
        settleFrames++;
      } else {
        settleFrames = 0;
      }
      if (settleFrames > 30) {
        running = false;
        return;
      }
      raf = requestAnimationFrame(tick);
    };

    tickFn = tick;

    // Only run while the graph is actually on screen.
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = Boolean(entry?.isIntersecting);
        if (visible) wake();
        else {
          running = false;
          cancelAnimationFrame(raf);
        }
      },
      { threshold: 0.01 },
    );
    io.observe(wrap);

    return () => {
      cancelAnimationFrame(raf);
      running = false;
      io.disconnect();
      ro.disconnect();
      themeObserver.disconnect();
      canvas.removeEventListener('pointerdown', onDown);
      canvas.removeEventListener('pointermove', onMove);
      canvas.removeEventListener('pointerup', onUp);
    };
    // Built once. `coarse` is derived from the device at mount and does not
    // change over the component's life, so it needs no re-run.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    /*
     * Touch-action by pointer type.
     *
     * On a fine pointer (mouse) `pan-y` is harmless. On touch it was the whole
     * problem: `pan-y` hands every vertical swipe to the page, so you could not
     * drag a node downward — it scrolled and the drag was cancelled. Coarse
     * pointers get `none` so a drag tracks in every direction. The canvas is a
     * short, bounded widget with the legend bar above it and page padding
     * around it, so a reader can still scroll past by swiping just outside it.
     */
    <div
      ref={wrapRef}
      className={cn('select-none', className)}
      style={{ width: '100%', height: '100%', touchAction: coarse ? 'none' : 'pan-y' }}
    >
      <canvas ref={canvasRef} />
    </div>
  );
}
