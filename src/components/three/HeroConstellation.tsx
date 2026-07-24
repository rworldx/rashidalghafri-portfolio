'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { graph } from '@content/graph';
import type { GraphNodeKind } from '@/types/graph';

export interface ConstellationColors {
  self: string;
  project: string;
  recognition: string;
  skill: string;
  edge: string;
}

interface Props {
  colors: ConstellationColors;
  /** Paused when the hero scrolls out of view (perf). */
  paused: boolean;
  /** Drives opacity only — the palette itself comes from the tokens. */
  isDark: boolean;
}

function colorForKind(kind: GraphNodeKind, c: ConstellationColors): string {
  return kind === 'self'
    ? c.self
    : kind === 'project'
      ? c.project
      : kind === 'recognition'
        ? c.recognition
        : c.skill;
}

/** Deterministic golden-spiral positions on a sphere, keyed by node id. */
function layout(): Map<string, THREE.Vector3> {
  const nodes = graph.nodes;
  const radius = 3.4;
  const positions = new Map<string, THREE.Vector3>();
  nodes.forEach((n, i) => {
    if (n.kind === 'self') {
      positions.set(n.id, new THREE.Vector3(0, 0, 0));
      return;
    }
    const k = i + 1;
    const phi = Math.acos(1 - (2 * k) / (nodes.length + 1));
    const theta = Math.PI * (1 + Math.sqrt(5)) * k;
    positions.set(
      n.id,
      new THREE.Vector3(
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.sin(phi) * Math.sin(theta) * 0.7,
        radius * Math.cos(phi),
      ),
    );
  });
  return positions;
}

interface SceneApi {
  setColors: (c: ConstellationColors) => void;
  setOpacity: (dark: boolean) => void;
}

/** Node and edge opacity per theme. Light paper needs a lighter touch. */
const OPACITY = {
  light: { node: 0.9, edge: 0.5, hover: 1 },
  dark: { node: 0.95, edge: 0.45, hover: 1 },
};

/**
 * Imperative vanilla Three.js constellation. Built without @react-three/fiber
 * to avoid coupling to React's reconciler internals (Next 15 runs React 19 in
 * the client bundle, and R3F v8's reconciler reads React 18's
 * `ReactCurrentOwner`, which is `undefined` there -> crash). Do not reintroduce
 * R3F unless you also move to React 19 + R3F v9.
 *
 * Nodes are FLAT (MeshBasicMaterial), not lit. A lit standard material with an
 * emissive term rendered as shaded grey marbles over the light-mode paper,
 * which read as scattered objects rather than as a diagram. Flat discs also
 * mean the scene needs no lights at all, which is less work per frame.
 *
 * The camera pulls back on narrow containers so the whole sphere always fits
 * instead of being cropped by the viewport.
 */
export default function HeroConstellation({ colors, paused, isDark }: Props) {
  const mountRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(paused);
  const apiRef = useRef<SceneApi | null>(null);

  pausedRef.current = paused;

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let width = Math.max(mount.clientWidth, 1);
    let height = Math.max(mount.clientHeight, 1);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);

    /** Frame the sphere so it fits whatever box it is given. */
    const frame = () => {
      const aspect = width / height;
      // The layout sphere is r=3.4, flattened to 0.7 on Y. Add margin for the
      // node discs themselves and for the pointer tilt swinging it around.
      const need = 4.6;
      const vFov = (camera.fov * Math.PI) / 180;
      const distV = need / Math.tan(vFov / 2);
      const distH = need / (Math.tan(vFov / 2) * aspect);
      camera.position.z = Math.max(distV, distH, 8.5);
      camera.updateProjectionMatrix();
    };

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.setSize(width, height);
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    mount.appendChild(renderer.domElement);

    const tilt = new THREE.Group();
    const spin = new THREE.Group();
    tilt.add(spin);
    scene.add(tilt);

    const positions = layout();
    let opacity = isDark ? OPACITY.dark : OPACITY.light;

    /**
     * Nodes: flat discs. Everything is the accent colour, so the hierarchy has
     * to come from size and opacity — a heavier node is both larger and more
     * solid. `rest` is stored per node so the hover animation has something
     * definite to return to.
     */
    const nodes: {
      mesh: THREE.Mesh;
      mat: THREE.MeshBasicMaterial;
      id: string;
      kind: GraphNodeKind;
      weight: number;
    }[] = [];
    const restOpacity = (weight: number, base: number) =>
      Math.min(1, base * (0.62 + weight * 0.19));

    for (const n of graph.nodes) {
      const p = positions.get(n.id);
      if (!p) continue;
      const weight = n.weight ?? 1;
      const r = 0.055 + weight * 0.032;
      const geo = new THREE.SphereGeometry(r, 20, 20);
      const mat = new THREE.MeshBasicMaterial({
        color: colorForKind(n.kind, colors),
        transparent: true,
        opacity: restOpacity(weight, opacity.node),
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.copy(p);
      spin.add(mesh);
      nodes.push({ mesh, mat, id: n.id, kind: n.kind, weight });
    }

    // Edges.
    const edgePts: number[] = [];
    for (const e of graph.edges) {
      const a = positions.get(e.source);
      const b = positions.get(e.target);
      if (!a || !b) continue;
      edgePts.push(a.x, a.y, a.z, b.x, b.y, b.z);
    }
    const edgeGeo = new THREE.BufferGeometry();
    edgeGeo.setAttribute('position', new THREE.Float32BufferAttribute(edgePts, 3));
    const edgeMat = new THREE.LineBasicMaterial({
      color: colors.edge,
      transparent: true,
      opacity: opacity.edge,
    });
    const edges = new THREE.LineSegments(edgeGeo, edgeMat);
    spin.add(edges);

    // Pointer: drives both parallax tilt and raycast hover.
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2(0, 0);
    const target = new THREE.Vector2(0, 0);
    let hovered: THREE.Mesh | null = null;

    const onPointerMove = (event: PointerEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      target.set(pointer.x, pointer.y);

      raycaster.setFromCamera(pointer, camera);
      const hit = raycaster.intersectObjects(
        nodes.map((n) => n.mesh),
        false,
      )[0];
      hovered = (hit?.object as THREE.Mesh) ?? null;
      renderer.domElement.style.cursor = hovered ? 'pointer' : 'default';
    };
    const onPointerLeave = () => {
      hovered = null;
      target.set(0, 0);
    };
    renderer.domElement.addEventListener('pointermove', onPointerMove);
    renderer.domElement.addEventListener('pointerleave', onPointerLeave);

    // Animation loop.
    const clock = new THREE.Clock();
    let raf = 0;
    const tmp = new THREE.Vector3();
    const animate = () => {
      raf = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      if (pausedRef.current) return;
      const t = clock.elapsedTime;

      spin.rotation.y += delta * 0.055;
      spin.position.y = Math.sin(t * 0.45) * 0.14;

      tilt.rotation.x += (target.y * 0.22 - tilt.rotation.x) * 0.05;
      tilt.rotation.y += (target.x * 0.3 - tilt.rotation.y) * 0.05;

      for (const n of nodes) {
        const isHovered = hovered === n.mesh;
        const s = isHovered ? 1.75 : 1;
        n.mesh.scale.lerp(tmp.set(s, s, s), 0.15);
        const targetOpacity = isHovered
          ? opacity.hover
          : restOpacity(n.weight, opacity.node);
        n.mat.opacity += (targetOpacity - n.mat.opacity) * 0.15;
      }

      renderer.render(scene, camera);
    };
    frame();
    animate();

    // Resize.
    const ro = new ResizeObserver(() => {
      width = Math.max(mount.clientWidth, 1);
      height = Math.max(mount.clientHeight, 1);
      camera.aspect = width / height;
      frame();
      renderer.setSize(width, height);
    });
    ro.observe(mount);

    apiRef.current = {
      setColors: (c) => {
        for (const n of nodes) {
          n.mat.color.set(colorForKind(n.kind, c));
        }
        edgeMat.color.set(c.edge);
      },
      setOpacity: (dark) => {
        opacity = dark ? OPACITY.dark : OPACITY.light;
        for (const n of nodes) n.mat.opacity = restOpacity(n.weight, opacity.node);
        edgeMat.opacity = opacity.edge;
      },
    };

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      renderer.domElement.removeEventListener('pointermove', onPointerMove);
      renderer.domElement.removeEventListener('pointerleave', onPointerLeave);
      apiRef.current = null;
      for (const n of nodes) {
        n.mesh.geometry.dispose();
        n.mat.dispose();
      }
      edges.geometry.dispose();
      edgeMat.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount)
        mount.removeChild(renderer.domElement);
    };
    // Build the scene exactly once; `colors` / `isDark` seed the initial
    // materials and are then kept in sync by the effects below. Re-running this
    // would leak GL contexts.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Keep materials in sync with the theme without rebuilding the scene.
  useEffect(() => {
    apiRef.current?.setColors(colors);
  }, [colors]);

  useEffect(() => {
    apiRef.current?.setOpacity(isDark);
  }, [isDark]);

  return <div ref={mountRef} style={{ width: '100%', height: '100%' }} />;
}
