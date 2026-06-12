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
}

/**
 * Imperative vanilla Three.js constellation (Addendum B.1). Built without
 * @react-three/fiber to avoid coupling to React's reconciler internals (Next 15
 * runs React 19 in the client bundle). Continuous rotation + gentle bob, pointer
 * tilt, and per-node hover highlight via raycasting. Mounted client-only & lazy;
 * reduced-motion / no-WebGL handled by the parent (HeroBackground).
 */
export default function HeroConstellation({ colors, paused }: Props) {
  const mountRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(paused);
  const apiRef = useRef<SceneApi | null>(null);

  // Keep latest values readable inside the rAF loop / color effect.
  pausedRef.current = paused;

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let width = Math.max(mount.clientWidth, 1);
    let height = Math.max(mount.clientHeight, 1);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.set(0, 0, 9);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.setSize(width, height);
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    mount.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0xffffff, 0.6));
    const point = new THREE.PointLight(0xffffff, 40);
    point.position.set(6, 6, 8);
    scene.add(point);

    const tilt = new THREE.Group();
    const spin = new THREE.Group();
    tilt.add(spin);
    scene.add(tilt);

    const positions = layout();

    // Nodes.
    const nodes: { mesh: THREE.Mesh; mat: THREE.MeshStandardMaterial; id: string; kind: GraphNodeKind }[] = [];
    for (const n of graph.nodes) {
      const p = positions.get(n.id);
      if (!p) continue;
      const r = 0.12 + (n.weight ?? 1) * 0.05;
      const geo = new THREE.SphereGeometry(r, 24, 24);
      const mat = new THREE.MeshStandardMaterial({
        color: colorForKind(n.kind, colors),
        emissive: colorForKind(n.kind, colors),
        emissiveIntensity: 0.6,
        roughness: 0.35,
        metalness: 0.1,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.copy(p);
      spin.add(mesh);
      nodes.push({ mesh, mat, id: n.id, kind: n.kind });
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
      opacity: 0.35,
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
      const hit = raycaster.intersectObjects(nodes.map((n) => n.mesh), false)[0];
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

      spin.rotation.y += delta * 0.06; // continuous loop
      spin.position.y = Math.sin(t * 0.5) * 0.15; // gentle bob

      tilt.rotation.x += (target.y * 0.25 - tilt.rotation.x) * 0.05;
      tilt.rotation.y += (target.x * 0.35 - tilt.rotation.y) * 0.05;

      for (const n of nodes) {
        const s = hovered === n.mesh ? 1.55 : 1;
        n.mesh.scale.lerp(tmp.set(s, s, s), 0.15);
        const targetEmissive = hovered === n.mesh ? 1.6 : 0.6;
        n.mat.emissiveIntensity += (targetEmissive - n.mat.emissiveIntensity) * 0.15;
      }

      renderer.render(scene, camera);
    };
    animate();

    // Resize.
    const ro = new ResizeObserver(() => {
      width = Math.max(mount.clientWidth, 1);
      height = Math.max(mount.clientHeight, 1);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    });
    ro.observe(mount);

    // Expose a colour setter for the theme effect.
    apiRef.current = {
      setColors: (c) => {
        for (const n of nodes) {
          const hex = colorForKind(n.kind, c);
          n.mat.color.set(hex);
          n.mat.emissive.set(hex);
        }
        edgeMat.color.set(c.edge);
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
      edgeGeo.dispose();
      edgeMat.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
    };
    // Build the scene exactly once; `colors` seeds the initial materials and is
    // then kept in sync by the effect below — re-running this would leak GL.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update materials when the theme palette changes (no scene rebuild).
  useEffect(() => {
    apiRef.current?.setColors(colors);
  }, [colors]);

  return <div ref={mountRef} style={{ width: '100%', height: '100%' }} />;
}
