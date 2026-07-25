'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export interface FalajColors {
  fog: string;
  stone: string;
  stoneEdge: string;
  water: string;
  glow: string;
}

interface Props {
  colors: FalajColors;
  /** 0 → 1 scroll progress through the pinned section. */
  progressRef: { current: number };
  paused: boolean;
  /**
   * Drives BLENDING, not just colour. Additive blending is what makes the
   * water glow against dark stone, but additive over a near-white background
   * saturates straight to white and the water disappears. Light mode gets
   * normal blending so the accent actually reads.
   */
  isDark: boolean;
}

/**
 * THE FALAJ — the site's centrepiece, and the one place the whole budget goes.
 *
 * A real aflaj channel rebuilt in 3D: stone walls, a cut floor, water running
 * down the middle, and branch channels forking off to feed each project. The
 * camera travels *down* the channel as you scroll, so the visitor physically
 * moves through the system the site is named after.
 *
 * Every award-winning WebGL site studied for this shares one trait — scroll
 * drives a narrative through true Z-depth, with atmospheric fog doing the
 * heavy lifting on depth perception, and the whole scene committed to a single
 * idea rather than stacked effects. That is exactly the budget here: one
 * channel, one material language, one motion.
 *
 * Vanilla Three.js, imperative, NOT @react-three/fiber — Next 15 ships React 19
 * internals and R3F v8's reconciler reads React 18's `ReactCurrentOwner`,
 * which is `undefined` there and crashes. Do not reintroduce R3F unless the
 * project also moves to R3F v9.
 *
 * Scroll progress arrives through a ref, never React state: a state update per
 * frame would re-render the tree sixty times a second and collapse on mobile.
 */

const CHANNEL_LENGTH = 220;
/**
 * A DEEP cut, not a kerb. Aflaj are frequently cut well below ground level —
 * the daudi type runs underground entirely — and depth is what makes this read
 * as a place you are inside rather than a trench seen from above. It is also
 * the only thing that fills a tall phone frame: with short walls, everything
 * above them is empty void, which was two-thirds of a portrait screen.
 */
const WALL_H = 4.4;
const HALF_W = 2.35;

/** Where the branches fork, and which way. Matches the projects overlay. */
export const BRANCHES = [
  { z: -34, dir: -1 },
  { z: -78, dir: 1 },
  { z: -122, dir: -1 },
  { z: -166, dir: 1 },
] as const;

/** Water: a flowing emissive surface. Cheap noise, no texture fetch. */
const waterVertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const waterFragment = /* glsl */ `
  precision mediump float;
  uniform float uTime;
  uniform vec3 uWater;
  uniform vec3 uGlow;
  varying vec2 vUv;

  // Cheap value noise — enough for moving water, no texture upload.
  float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  float noise(vec2 p) {
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
               mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
  }

  void main() {
    // Flow runs along the channel's length (v), so the water always travels
    // in the same direction the camera does.
    float flow = vUv.y * 26.0 - uTime * 1.15;
    float n = noise(vec2(vUv.x * 5.0, flow)) * 0.6
            + noise(vec2(vUv.x * 11.0, flow * 1.9)) * 0.4;

    // Bright ribbons riding the surface.
    float ribbon = smoothstep(0.55, 0.95, n);

    // Edges catch the wall shadow — keeps the plane from reading as a flat strip.
    float edge = smoothstep(0.0, 0.22, vUv.x) * smoothstep(1.0, 0.78, vUv.x);

    vec3 col = mix(uWater, uGlow, ribbon);
    float alpha = (0.46 + ribbon * 0.54) * edge;
    gl_FragColor = vec4(col, alpha);
  }
`;

interface ChannelParts {
  group: THREE.Group;
  water: THREE.Mesh;
}

/**
 * One channel run: two stone walls, a floor, and the water between them.
 * Built once per run so branches are the same construction as the trunk —
 * a falaj branch is not a different object, it is the same channel, smaller.
 */
function buildChannel(
  length: number,
  halfWidth: number,
  wallGeo: THREE.BoxGeometry,
  stoneMat: THREE.Material,
  floorMat: THREE.Material,
  waterMat: THREE.Material,
): ChannelParts {
  const group = new THREE.Group();

  for (const side of [-1, 1]) {
    const wall = new THREE.Mesh(wallGeo, stoneMat);
    wall.scale.set(1, 1, length);
    wall.position.set(side * halfWidth, WALL_H / 2, -length / 2);
    group.add(wall);
  }

  const floor = new THREE.Mesh(new THREE.PlaneGeometry(halfWidth * 2, length), floorMat);
  floor.rotation.x = -Math.PI / 2;
  floor.position.set(0, 0.02, -length / 2);
  group.add(floor);

  const water = new THREE.Mesh(
    new THREE.PlaneGeometry(halfWidth * 1.72, length, 1, 1),
    waterMat,
  );
  water.rotation.x = -Math.PI / 2;
  water.position.set(0, 0.12, -length / 2);
  group.add(water);

  return { group, water };
}

export default function FalajFlythrough({ colors, progressRef, paused, isDark }: Props) {
  const mountRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(paused);
  const colorsRef = useRef(colors);
  const darkRef = useRef(isDark);
  const apiRef = useRef<{
    setColors: (c: FalajColors) => void;
    setBlending: (dark: boolean) => void;
  } | null>(null);

  pausedRef.current = paused;
  colorsRef.current = colors;
  darkRef.current = isDark;

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const c = colorsRef.current;
    const scene = new THREE.Scene();
    const fogColor = new THREE.Color(c.fog);
    scene.fog = new THREE.Fog(fogColor, 9, 96);

    const camera = new THREE.PerspectiveCamera(52, 1, 0.1, 220);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      return; // Parent's ErrorBoundary / static fallback covers this.
    }
    renderer.setClearAlpha(0);
    // Phones are fill-rate bound long before they are geometry bound, and this
    // scene is a full-screen shader. Cap harder on small viewports.
    const dprCap = window.innerWidth < 640 ? 1.5 : 2;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, dprCap));
    mount.appendChild(renderer.domElement);

    // ---- Materials --------------------------------------------------------
    const stoneMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(c.stone),
      roughness: 0.94,
      metalness: 0,
    });
    const floorMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(c.stoneEdge),
      roughness: 1,
      metalness: 0,
    });
    const waterMat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: darkRef.current ? THREE.AdditiveBlending : THREE.NormalBlending,
      uniforms: {
        uTime: { value: 0 },
        uWater: { value: new THREE.Color(c.water) },
        uGlow: { value: new THREE.Color(c.glow) },
      },
      vertexShader: waterVertex,
      fragmentShader: waterFragment,
    });

    // ---- The trunk --------------------------------------------------------
    const wallGeo = new THREE.BoxGeometry(0.55, WALL_H, 1);
    const trunk = buildChannel(
      CHANNEL_LENGTH,
      HALF_W,
      wallGeo,
      stoneMat,
      floorMat,
      waterMat,
    );
    scene.add(trunk.group);

    // ---- Branches ---------------------------------------------------------
    // Each fork leaves the trunk through its own wall and runs outward to an
    // outlet. The sign here matters: rotating the local -Z axis by +theta
    // sends it toward -X, so a LEFT branch needs a POSITIVE rotation. Getting
    // that backwards sent every branch sweeping across the trunk instead of
    // away from it, and put a wall straight through the camera's path.
    const BRANCH_ANGLE = 0.62;
    const BRANCH_LEN = 22;
    for (const b of BRANCHES) {
      const branch = buildChannel(
        BRANCH_LEN,
        HALF_W * 0.55,
        wallGeo,
        stoneMat,
        floorMat,
        waterMat,
      );
      // Starts just outside the trunk wall, so the two never intersect.
      branch.group.position.set(b.dir * (HALF_W + 1.35), 0, b.z);
      branch.group.rotation.y = -b.dir * BRANCH_ANGLE;
      scene.add(branch.group);

      // The outlet: a ring of light where the branch finally delivers.
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(1.4, 0.045, 8, 48),
        new THREE.MeshBasicMaterial({
          color: new THREE.Color(c.glow),
          transparent: true,
          opacity: 0.55,
        }),
      );
      ring.rotation.y = -b.dir * BRANCH_ANGLE;
      ring.position.set(
        b.dir * (HALF_W + 1.35 + Math.sin(BRANCH_ANGLE) * BRANCH_LEN),
        0.85,
        b.z - Math.cos(BRANCH_ANGLE) * BRANCH_LEN,
      );
      scene.add(ring);
    }

    // ---- Stone ribs -------------------------------------------------------
    // The detail that makes it read as built rather than extruded. One
    // InstancedMesh, so the whole run costs a single draw call.
    const ribGeo = new THREE.BoxGeometry(0.78, 0.2, 0.55);
    const ribCount = Math.floor(CHANNEL_LENGTH / 2.6) * 2;
    const ribs = new THREE.InstancedMesh(ribGeo, stoneMat, ribCount);
    const dummy = new THREE.Object3D();
    let ri = 0;
    for (let z = 0; z > -CHANNEL_LENGTH; z -= 2.6) {
      for (const side of [-1, 1]) {
        dummy.position.set(side * HALF_W, WALL_H + 0.04, z);
        dummy.rotation.set(0, 0, 0);
        // Hand-cut stone is never perfectly level.
        dummy.position.y += Math.sin(z * 3.1 + side) * 0.02;
        dummy.updateMatrix();
        ribs.setMatrixAt(ri++, dummy.matrix);
      }
    }
    ribs.instanceMatrix.needsUpdate = true;
    scene.add(ribs);

    // ---- Motes ------------------------------------------------------------
    // Light carried on the water. They loop along the trunk, which is what
    // sells the channel as running rather than standing.
    const MOTES = 160;
    const motePos = new Float32Array(MOTES * 3);
    const moteSeed = new Float32Array(MOTES);
    for (let i = 0; i < MOTES; i++) {
      motePos[i * 3] = (Math.random() - 0.5) * HALF_W * 1.3;
      motePos[i * 3 + 1] = 0.16 + Math.random() * 0.5;
      motePos[i * 3 + 2] = -Math.random() * CHANNEL_LENGTH;
      moteSeed[i] = Math.random();
    }
    const moteGeo = new THREE.BufferGeometry();
    moteGeo.setAttribute('position', new THREE.BufferAttribute(motePos, 3));
    const moteMat = new THREE.PointsMaterial({
      color: new THREE.Color(c.glow),
      size: 0.075,
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
      blending: darkRef.current ? THREE.AdditiveBlending : THREE.NormalBlending,
    });
    const motes = new THREE.Points(moteGeo, moteMat);
    scene.add(motes);

    // ---- Light ------------------------------------------------------------
    // Sun from above and behind, so the walls carry a real gradient and the
    // channel reads as cut into ground rather than floating.
    scene.add(new THREE.AmbientLight(0xffffff, 0.85));
    const key = new THREE.DirectionalLight(0xffffff, 1.6);
    key.position.set(4, 12, 6);
    scene.add(key);
    const fill = new THREE.DirectionalLight(new THREE.Color(c.glow), 0.85);
    fill.position.set(-6, 3, -10);
    scene.add(fill);

    apiRef.current = {
      setBlending: (dark) => {
        const mode = dark ? THREE.AdditiveBlending : THREE.NormalBlending;
        waterMat.blending = mode;
        moteMat.blending = mode;
        waterMat.needsUpdate = true;
        moteMat.needsUpdate = true;
      },
      setColors: (next) => {
        scene.fog?.color.set(next.fog);
        stoneMat.color.set(next.stone);
        floorMat.color.set(next.stoneEdge);
        waterMat.uniforms.uWater?.value.set(next.water);
        waterMat.uniforms.uGlow?.value.set(next.glow);
        moteMat.color.set(next.glow);
        fill.color.set(next.glow);
      },
    };

    // ---- Sizing -----------------------------------------------------------
    // Portrait phones need a different camera, not just a different canvas.
    // `fov` in Three is VERTICAL, so on a tall narrow viewport the horizontal
    // field collapses and the channel slides off-axis with two-thirds of the
    // frame empty. Widening the vertical fov restores the horizontal coverage;
    // it is clamped because the exact solution goes past 100° and distorts.
    let portrait = false;
    const resize = () => {
      const { clientWidth: w, clientHeight: h } = mount;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      portrait = camera.aspect < 0.95;
      camera.fov = portrait
        ? Math.min(
            82,
            2 * THREE.MathUtils.radToDeg(Math.atan(Math.tan(Math.PI / 6) / camera.aspect)),
          )
        : 52;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(mount);

    // ---- Loop -------------------------------------------------------------
    let raf = 0;
    const clock = new THREE.Clock();
    // Eased separately from the scroll value so a flicked wheel glides instead
    // of snapping the camera down the channel.
    let eased = 0;
    let drawnOnce = false;

    const tick = () => {
      raf = requestAnimationFrame(tick);
      // Always paint at least one frame. Otherwise a scene that mounts paused
      // leaves a fully transparent canvas, which is indistinguishable from the
      // 3D being broken — and was, once.
      if (pausedRef.current && drawnOnce) return;
      drawnOnce = true;

      const t = clock.getElapsedTime();
      waterMat.uniforms.uTime!.value = t;

      eased += (progressRef.current - eased) * 0.075;

      // Travel: start just inside the mouth, finish past the last outlet.
      const z = 4 - eased * (CHANNEL_LENGTH - 34);
      camera.position.set(
        Math.sin(t * 0.18) * 0.2, // a slow drift, so it never feels on rails
        (portrait ? 1.35 : 1.95) + Math.sin(t * 0.24) * 0.06,
        z,
      );
      // Landscape looks slightly DOWN the water — the channel is the subject,
      // not the space above it. Portrait does the opposite and sits LOW inside
      // the channel looking almost level, so the walls tower past the top of a
      // tall frame instead of leaving two-thirds of it empty sky.
      camera.lookAt(0, portrait ? 1.25 : 0.4, z - (portrait ? 13 : 12));

      // Motes ride the water and recycle at the far end.
      const p = moteGeo.getAttribute('position') as THREE.BufferAttribute;
      for (let i = 0; i < MOTES; i++) {
        let mz = p.getZ(i) - (0.14 + (moteSeed[i] ?? 0) * 0.16);
        if (mz < -CHANNEL_LENGTH) mz += CHANNEL_LENGTH;
        p.setZ(i, mz);
        p.setY(i, 0.18 + Math.sin(t * 1.6 + i) * 0.05 + (moteSeed[i] ?? 0) * 0.3);
      }
      p.needsUpdate = true;

      renderer.render(scene, camera);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      apiRef.current = null;
      scene.traverse((o) => {
        if (o instanceof THREE.Mesh || o instanceof THREE.Points) {
          o.geometry?.dispose();
        }
      });
      wallGeo.dispose();
      ribGeo.dispose();
      moteGeo.dispose();
      stoneMat.dispose();
      floorMat.dispose();
      waterMat.dispose();
      moteMat.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
    // Built once. Colour changes go through apiRef below.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progressRef]);

  useEffect(() => {
    apiRef.current?.setColors(colors);
  }, [colors]);

  useEffect(() => {
    apiRef.current?.setBlending(isDark);
  }, [isDark]);

  return <div ref={mountRef} className="size-full" aria-hidden />;
}
