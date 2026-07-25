'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { graph } from '@content/graph';

export interface FlowColors {
  node: string;
  edge: string;
  pulse: string;
}

interface Props {
  colors: FlowColors;
  /** Paused when the hero scrolls out of view (perf). */
  paused: boolean;
  /** Drives opacity only — the palette itself comes from the tokens. */
  isDark: boolean;
}

/**
 * The hero's signature object: Rashid's actual graph, drawn as a branching
 * network with light travelling outward from a single source.
 *
 * It is data, not decoration — every node and edge comes from content/graph.ts,
 * so the one ambient-looking thing on the page is a true statement about the
 * work. The pulses always run from the shallower node to the deeper one, which
 * is the whole idea rendered without ever naming it: one source, distribution
 * outward, nothing terminating in a dead end.
 *
 * Built with vanilla Three.js, NOT @react-three/fiber. Next 15 runs React 19
 * internals in the client bundle and R3F v8's reconciler reads React 18's
 * `ReactCurrentOwner` -> undefined -> crash. Do not reintroduce R3F unless the
 * project also moves to React 19 + R3F v9.
 */

/** Deterministic hash -> [0,1). Keeps the layout identical across reloads. */
function hash01(seed: string, salt: number): number {
  let h = 2166136261 ^ salt;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return ((h >>> 0) % 100000) / 100000;
}

interface Placed {
  id: string;
  pos: THREE.Vector3;
  weight: number;
  depth: number;
}

/**
 * Breadth-first layering out from `rashid`, then a deterministic spread within
 * each layer. A rigid grid would read as an org chart; the per-node jitter is
 * seeded from the node's own id so it is organic but never moves between
 * builds (a layout that reshuffles on reload cannot be art-directed).
 */
function layout(): { placed: Placed[]; byId: Map<string, Placed> } {
  const adjacency = new Map<string, string[]>();
  for (const n of graph.nodes) adjacency.set(n.id, []);
  for (const e of graph.edges) {
    adjacency.get(e.source)?.push(e.target);
    adjacency.get(e.target)?.push(e.source);
  }

  const root = graph.nodes.find((n) => n.kind === 'self')?.id ?? graph.nodes[0]?.id;
  const depths = new Map<string, number>();
  if (root) {
    const queue = [root];
    depths.set(root, 0);
    while (queue.length) {
      const id = queue.shift();
      if (id === undefined) break;
      const d = depths.get(id) ?? 0;
      for (const next of adjacency.get(id) ?? []) {
        if (!depths.has(next)) {
          depths.set(next, d + 1);
          queue.push(next);
        }
      }
    }
  }

  // Group by depth so each layer can be spread across the available width.
  const layers = new Map<number, string[]>();
  for (const n of graph.nodes) {
    const d = depths.get(n.id) ?? 1;
    const list = layers.get(d);
    if (list) list.push(n.id);
    else layers.set(d, [n.id]);
  }

  const byId = new Map<string, Placed>();
  const placed: Placed[] = [];

  for (const n of graph.nodes) {
    const depth = depths.get(n.id) ?? 1;
    const siblings = layers.get(depth) ?? [n.id];
    const index = siblings.indexOf(n.id);
    const count = siblings.length;

    // Layers descend; the source sits alone at the top.
    const y = 3.1 - depth * 2.45 + (hash01(n.id, 3) - 0.5) * 0.5;

    // Spread symmetrically about the centre, widening with depth.
    const span = 1.6 + depth * 1.75;
    const t = count === 1 ? 0 : index / (count - 1) - 0.5;
    const x = t * span * 2 + (hash01(n.id, 7) - 0.5) * 0.55;

    const z = (hash01(n.id, 11) - 0.5) * 2.2;

    const p: Placed = {
      id: n.id,
      pos: new THREE.Vector3(x, y, z),
      weight: n.weight ?? 1,
      depth,
    };
    placed.push(p);
    byId.set(n.id, p);
  }

  return { placed, byId };
}

/** Soft radial sprite. Drawn once, reused by every node and pulse. */
function discTexture(): THREE.Texture {
  const size = 64;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    g.addColorStop(0, 'rgba(255,255,255,1)');
    g.addColorStop(0.45, 'rgba(255,255,255,0.95)');
    g.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

const OPACITY = {
  light: { node: 0.92, edge: 0.34, pulse: 1 },
  dark: { node: 0.95, edge: 0.3, pulse: 1 },
};

interface SceneApi {
  setColors: (c: FlowColors) => void;
  setOpacity: (dark: boolean) => void;
}

export default function FlowNetwork({ colors, paused, isDark }: Props) {
  const mountRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(paused);
  const apiRef = useRef<SceneApi | null>(null);

  pausedRef.current = paused;

  // Scene is built exactly once. Colour and opacity changes go through the
  // imperative API below rather than tearing the scene down and rebuilding it.
  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0, -0.4, 13.5);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      // No WebGL context — the parent's ErrorBoundary/static fallback covers it.
      return;
    }
    renderer.setClearAlpha(0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    const { placed, byId } = layout();
    const sprite = discTexture();
    const group = new THREE.Group();
    scene.add(group);

    // ---- Edges -------------------------------------------------------------
    const edgePairs = graph.edges
      .map((e) => ({ a: byId.get(e.source), b: byId.get(e.target) }))
      .filter((p): p is { a: Placed; b: Placed } => !!p.a && !!p.b);

    const edgePositions = new Float32Array(edgePairs.length * 6);
    edgePairs.forEach((pair, i) => {
      edgePositions.set(
        [pair.a.pos.x, pair.a.pos.y, pair.a.pos.z, pair.b.pos.x, pair.b.pos.y, pair.b.pos.z],
        i * 6,
      );
    });
    const edgeGeometry = new THREE.BufferGeometry();
    edgeGeometry.setAttribute('position', new THREE.BufferAttribute(edgePositions, 3));
    const edgeMaterial = new THREE.LineBasicMaterial({
      color: new THREE.Color(colors.edge),
      transparent: true,
      opacity: OPACITY[isDark ? 'dark' : 'light'].edge,
    });
    group.add(new THREE.LineSegments(edgeGeometry, edgeMaterial));

    // ---- Nodes -------------------------------------------------------------
    // Flat sprites, not lit meshes: a lit material renders as shaded grey
    // marbles over a light background, which reads as scattered objects rather
    // than as a diagram. Flat also means the scene needs no lights at all.
    const nodePositions = new Float32Array(placed.length * 3);
    const nodeSizes = new Float32Array(placed.length);
    placed.forEach((p, i) => {
      nodePositions.set([p.pos.x, p.pos.y, p.pos.z], i * 3);
      nodeSizes[i] = 0.22 + p.weight * 0.13;
    });
    const nodeGeometry = new THREE.BufferGeometry();
    nodeGeometry.setAttribute('position', new THREE.BufferAttribute(nodePositions, 3));
    nodeGeometry.setAttribute('size', new THREE.BufferAttribute(nodeSizes, 1));

    // Per-point sizing needs a shader; PointsMaterial only takes one size.
    const nodeMaterial = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      uniforms: {
        uColor: { value: new THREE.Color(colors.node) },
        uOpacity: { value: OPACITY[isDark ? 'dark' : 'light'].node },
        uMap: { value: sprite },
        uScale: { value: 220 },
      },
      vertexShader: `
        attribute float size;
        uniform float uScale;
        void main() {
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * uScale / -mv.z;
          gl_Position = projectionMatrix * mv;
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        uniform float uOpacity;
        uniform sampler2D uMap;
        void main() {
          float a = texture2D(uMap, gl_PointCoord).a;
          if (a < 0.02) discard;
          gl_FragColor = vec4(uColor, a * uOpacity);
        }
      `,
    });
    group.add(new THREE.Points(nodeGeometry, nodeMaterial));

    // ---- Pulses ------------------------------------------------------------
    // One travelling light per edge, always running from the shallower node to
    // the deeper one. Phase is seeded per edge so they never march in lockstep.
    const pulseCount = edgePairs.length;
    const pulsePositions = new Float32Array(pulseCount * 3);
    const pulseSizes = new Float32Array(pulseCount);
    const pulseAlpha = new Float32Array(pulseCount);
    const phases = edgePairs.map((pair, i) => hash01(pair.a.id + pair.b.id, i));
    const speeds = edgePairs.map((pair, i) => 0.16 + hash01(pair.b.id, i + 31) * 0.14);

    for (let i = 0; i < pulseCount; i++) {
      pulseSizes[i] = 0.13;
      pulseAlpha[i] = 0;
    }
    const pulseGeometry = new THREE.BufferGeometry();
    pulseGeometry.setAttribute('position', new THREE.BufferAttribute(pulsePositions, 3));
    pulseGeometry.setAttribute('size', new THREE.BufferAttribute(pulseSizes, 1));
    pulseGeometry.setAttribute('alpha', new THREE.BufferAttribute(pulseAlpha, 1));

    const pulseMaterial = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uColor: { value: new THREE.Color(colors.pulse) },
        uMap: { value: sprite },
        uScale: { value: 220 },
      },
      vertexShader: `
        attribute float size;
        attribute float alpha;
        varying float vAlpha;
        uniform float uScale;
        void main() {
          vAlpha = alpha;
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * uScale / -mv.z;
          gl_Position = projectionMatrix * mv;
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        uniform sampler2D uMap;
        varying float vAlpha;
        void main() {
          float a = texture2D(uMap, gl_PointCoord).a;
          if (a < 0.02) discard;
          gl_FragColor = vec4(uColor, a * vAlpha);
        }
      `,
    });
    group.add(new THREE.Points(pulseGeometry, pulseMaterial));

    apiRef.current = {
      setColors: (c) => {
        edgeMaterial.color.set(c.edge);
        nodeMaterial.uniforms.uColor?.value.set(c.node);
        pulseMaterial.uniforms.uColor?.value.set(c.pulse);
      },
      setOpacity: (dark) => {
        const o = OPACITY[dark ? 'dark' : 'light'];
        edgeMaterial.opacity = o.edge;
        if (nodeMaterial.uniforms.uOpacity) nodeMaterial.uniforms.uOpacity.value = o.node;
      },
    };

    // ---- Pointer parallax --------------------------------------------------
    // Target values only; the loop eases toward them, so the network never
    // snaps and a fast pointer cannot jitter it.
    const pointer = { x: 0, y: 0 };
    const eased = { x: 0, y: 0 };
    const onPointerMove = (e: PointerEvent) => {
      const rect = mount.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      pointer.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      pointer.y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    // Listen on the window, not the canvas: the canvas is pointer-transparent
    // on small screens and the parallax should follow the pointer anyway.
    window.addEventListener('pointermove', onPointerMove, { passive: true });

    // ---- Sizing ------------------------------------------------------------
    // The camera pulls back on narrow containers so the whole network always
    // fits instead of being cropped.
    const resize = () => {
      const { clientWidth: w, clientHeight: h } = mount;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      const portrait = camera.aspect < 1;
      camera.position.z = portrait ? 13.5 / Math.max(camera.aspect, 0.45) : 13.5;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(mount);

    // ---- Loop --------------------------------------------------------------
    let raf = 0;
    const clock = new THREE.Clock();
    const from = new THREE.Vector3();
    const to = new THREE.Vector3();

    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (pausedRef.current) return;

      const t = clock.getElapsedTime();

      // Pulses: advance along each edge, fading in and out at the ends so
      // nothing pops into existence at a node.
      const posAttr = pulseGeometry.getAttribute('position') as THREE.BufferAttribute;
      const alphaAttr = pulseGeometry.getAttribute('alpha') as THREE.BufferAttribute;
      for (let i = 0; i < pulseCount; i++) {
        const pair = edgePairs[i];
        const phase = phases[i] ?? 0;
        const speed = speeds[i] ?? 0.2;
        if (!pair) continue;

        // Always travel outward, from the shallower node to the deeper one.
        const outward = pair.a.depth <= pair.b.depth;
        from.copy(outward ? pair.a.pos : pair.b.pos);
        to.copy(outward ? pair.b.pos : pair.a.pos);

        const u = (t * speed + phase) % 1;
        posAttr.setXYZ(
          i,
          from.x + (to.x - from.x) * u,
          from.y + (to.y - from.y) * u,
          from.z + (to.z - from.z) * u,
        );
        // Triangular fade: invisible at both ends, brightest mid-run.
        alphaAttr.setX(i, Math.sin(u * Math.PI) ** 1.5);
      }
      posAttr.needsUpdate = true;
      alphaAttr.needsUpdate = true;

      // Ease toward the pointer target, plus a slow idle drift so the network
      // is never completely static even with the pointer at rest.
      eased.x += (pointer.x - eased.x) * 0.035;
      eased.y += (pointer.y - eased.y) * 0.035;
      group.rotation.y = eased.x * 0.22 + Math.sin(t * 0.09) * 0.06;
      group.rotation.x = eased.y * 0.14 + Math.cos(t * 0.07) * 0.035;

      renderer.render(scene, camera);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
      apiRef.current = null;
      edgeGeometry.dispose();
      edgeMaterial.dispose();
      nodeGeometry.dispose();
      nodeMaterial.dispose();
      pulseGeometry.dispose();
      pulseMaterial.dispose();
      sprite.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
    // Built once, on mount. Colour/theme updates go through apiRef below.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    apiRef.current?.setColors(colors);
  }, [colors]);

  useEffect(() => {
    apiRef.current?.setOpacity(isDark);
  }, [isDark]);

  return <div ref={mountRef} className="size-full" aria-hidden />;
}
