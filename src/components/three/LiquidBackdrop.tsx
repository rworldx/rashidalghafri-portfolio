'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export interface BackdropColors {
  base: string;
  sheen: string;
  accent: string;
}

interface Props {
  colors: BackdropColors;
  paused: boolean;
  /** Called when this device cannot afford the shader. Parent swaps in CSS. */
  onTooSlow?: () => void;
  /** Drives exposure only — the palette itself comes from the tokens. */
  isDark: boolean;
}

/**
 * The gallery's light source: a slow, liquid-metal form turning behind the
 * exhibit.
 *
 * Deliberately a SHADER, not a video. The references this is answering all use
 * full-bleed footage, but a video means shipping someone else's asset from
 * someone else's CDN, a multi-megabyte download before the hero can settle, and
 * a hard dependency that breaks the day the file moves. Two triangles and a
 * fragment shader give the same slow chrome-and-light feel, weigh nothing,
 * resolve instantly, and re-colour themselves per theme.
 *
 * The whole thing renders on a single full-screen quad — no geometry, no
 * lights, no camera movement — so cost is purely fill-rate and scales with the
 * pixel-ratio cap rather than with scene complexity.
 *
 * Vanilla Three.js, NOT @react-three/fiber: Next 15 ships React 19 internals
 * and R3F v8's reconciler reads React 18's `ReactCurrentOwner`, which is
 * `undefined` there and crashes.
 */

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

/**
 * Built per device, not fixed.
 *
 * The cost here is entirely fill-rate: five fbm calls, each looping several
 * octaves, for every pixel of a full-screen quad. On a weak tablet GPU that
 * saturates the whole device rather than only the page, which is why the hero
 * could stutter the browser while every other section stayed smooth.
 *
 * `mediump` is dramatically cheaper on mobile GPUs and the difference is
 * invisible in a soft gradient, especially with the dither below. Dropping
 * octaves removes whole noise lookups per pixel.
 */
function buildFragment(octaves: number, precision: 'highp' | 'mediump'): string {
  return /* glsl */ `
  precision ${precision} float;

  uniform float uTime;
  uniform vec2  uResolution;
  uniform vec3  uBase;
  uniform vec3  uSheen;
  uniform vec3  uAccent;
  uniform float uExposure;
  uniform vec2  uPointer;

  varying vec2 vUv;

  // -- value noise + fbm -----------------------------------------------------
  vec2 hash2(vec2 p) {
    p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
    return fract(sin(p) * 43758.5453) * 2.0 - 1.0;
  }

  float noise(vec2 p) {
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(dot(hash2(i + vec2(0.0, 0.0)), f - vec2(0.0, 0.0)),
          dot(hash2(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0)), u.x),
      mix(dot(hash2(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0)),
          dot(hash2(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0)), u.x), u.y);
  }

  float fbm(vec2 p) {
    float v = 0.0, a = 0.5;
    for (int i = 0; i < ${octaves}; i++) {
      v += a * noise(p);
      p *= 2.02;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    // Aspect-corrected, origin-centred.
    vec2 uv = (vUv - 0.5) * vec2(uResolution.x / uResolution.y, 1.0);

    float t = uTime * 0.055;

    // Domain warping: noise sampled through noise. This is what turns flat
    // gradient bands into something that reads as a poured, folding material
    // rather than a blurred mesh gradient.
    vec2 q = vec2(fbm(uv * 1.6 + vec2(0.0, t)), fbm(uv * 1.6 + vec2(5.2, 1.3 - t)));
    vec2 r = vec2(
      fbm(uv * 1.9 + 3.4 * q + vec2(1.7, 9.2) + 0.35 * t),
      fbm(uv * 1.9 + 3.4 * q + vec2(8.3, 2.8) - 0.28 * t)
    );
    float f = fbm(uv * 1.7 + 3.2 * r);

    // Remap into a tight band so the material has real light and shadow
    // instead of sitting in the mid-tones the way raw fbm does.
    float shade = smoothstep(-0.35, 0.55, f);

    // A soft key light that drifts with the pointer — the surface should feel
    // lit from somewhere, and follow the viewer a little.
    vec2 lightPos = uPointer * 0.35;
    float d = length(uv - lightPos);
    float key = exp(-d * d * 2.1);

    // Specular banding along the warp gradient: the chrome highlight.
    float band = pow(abs(sin(f * 3.14159 + t * 1.6)), 8.0);

    vec3 col = mix(uBase, uSheen, shade);
    col = mix(col, uAccent, band * 0.55 * (0.35 + key));
    col += uSheen * key * 0.28;

    // Vignette keeps the corners from competing with the type in front.
    float vig = smoothstep(1.25, 0.25, length(uv));
    col *= mix(0.55, 1.0, vig);

    col *= uExposure;

    // Ordered-ish dither. An 8-bit gradient this smooth bands visibly on wide
    // displays, and a touch of noise is far cheaper than more colour depth.
    float dither = (fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453) - 0.5) / 255.0;
    col += dither;

    gl_FragColor = vec4(col, 1.0);
  }
`;
}

/**
 * A rough guess at how much GPU there is to spend.
 *
 * Deliberately conservative: a touch device with few cores is very likely a
 * budget tablet or phone, and the cost of guessing "low" on a capable machine
 * is a slightly softer gradient nobody will notice. The cost of guessing
 * "high" on a cheap iPad is a stuttering browser.
 *
 * The measured downgrade in the render loop is the real safety net; this only
 * decides where to start.
 */
function isLowPower(): boolean {
  if (typeof window === 'undefined') return true;
  const coarse = window.matchMedia?.('(pointer: coarse)').matches ?? false;
  const cores = navigator.hardwareConcurrency ?? 4;
  const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 4;
  return coarse || cores <= 4 || memory <= 4;
}

export default function LiquidBackdrop({ colors, paused, isDark, onTooSlow }: Props) {
  const mountRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(paused);
  const colorsRef = useRef(colors);
  const darkRef = useRef(isDark);
  const onTooSlowRef = useRef(onTooSlow);
  const apiRef = useRef<{
    setColors: (c: BackdropColors) => void;
    setExposure: (dark: boolean) => void;
  } | null>(null);

  pausedRef.current = paused;
  colorsRef.current = colors;
  darkRef.current = isDark;
  onTooSlowRef.current = onTooSlow;

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const c = colorsRef.current;
    const scene = new THREE.Scene();
    // A full-screen quad needs no perspective at all; the vertex shader writes
    // clip space directly.
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: false, alpha: false });
    } catch {
      return; // Parent's ErrorBoundary / static fallback covers this.
    }
    /*
     * Fill-rate bound, so resolution is the biggest lever there is. A weak
     * device renders at ONE physical pixel per two CSS pixels and the browser
     * scales the result up; on a slow-moving gradient the difference is not
     * visible, and it quarters the work.
     */
    const lowPower = isLowPower();
    let renderScale = lowPower ? 0.5 : Math.min(window.devicePixelRatio, 1.5);
    renderer.setPixelRatio(renderScale);
    mount.appendChild(renderer.domElement);

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader: buildFragment(lowPower ? 3 : 5, lowPower ? 'mediump' : 'highp'),
      depthTest: false,
      depthWrite: false,
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: new THREE.Vector2(1, 1) },
        uBase: { value: new THREE.Color(c.base) },
        uSheen: { value: new THREE.Color(c.sheen) },
        uAccent: { value: new THREE.Color(c.accent) },
        uExposure: { value: darkRef.current ? 1.0 : 1.12 },
        uPointer: { value: new THREE.Vector2(0, 0) },
      },
    });
    const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
    quad.frustumCulled = false;
    scene.add(quad);

    apiRef.current = {
      setColors: (next) => {
        material.uniforms.uBase?.value.set(next.base);
        material.uniforms.uSheen?.value.set(next.sheen);
        material.uniforms.uAccent?.value.set(next.accent);
      },
      setExposure: (dark) => {
        if (material.uniforms.uExposure) material.uniforms.uExposure.value = dark ? 1.0 : 1.12;
      },
    };

    // Pointer only nudges a target; the loop eases toward it, so the light
    // glides rather than snapping to a fast cursor.
    const target = new THREE.Vector2(0, 0);
    const onPointerMove = (e: PointerEvent) => {
      target.set((e.clientX / window.innerWidth) * 2 - 1, -((e.clientY / window.innerHeight) * 2 - 1));
    };
    window.addEventListener('pointermove', onPointerMove, { passive: true });

    const resize = () => {
      const { clientWidth: w, clientHeight: h } = mount;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      material.uniforms.uResolution?.value.set(w, h);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(mount);

    let raf = 0;
    let drawnOnce = false;
    const clock = new THREE.Clock();
    const eased = new THREE.Vector2(0, 0);

    /*
     * THROTTLED, and self-downgrading.
     *
     * The animation drifts over tens of seconds, so 60fps buys nothing a
     * viewer can perceive. Painting at 30 halves the GPU load outright.
     *
     * The measured part matters more. Device sniffing only guesses; this
     * watches actual frame cost and reacts. If frames stay expensive the
     * canvas drops to a quarter resolution, and if it is STILL expensive it
     * gives up entirely and hands over to the CSS gradient, which is the
     * honest outcome for hardware that cannot afford this effect. A hero that
     * stutters the whole browser is worse than a hero without a shader.
     */
    const FRAME_MS = 1000 / 30;
    let lastFrame = 0;
    let slowFrames = 0;
    let downgraded = false;

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      if (pausedRef.current && drawnOnce) return;

      if (drawnOnce && now - lastFrame < FRAME_MS) return;
      const delta = now - lastFrame;
      lastFrame = now;
      drawnOnce = true;

      const started = performance.now();

      if (material.uniforms.uTime) material.uniforms.uTime.value = clock.getElapsedTime();
      eased.lerp(target, 0.04);
      material.uniforms.uPointer?.value.copy(eased);
      renderer.render(scene, camera);

      // Cost of the draw itself, not the gap between frames, so a throttled
      // or backgrounded tab is never mistaken for a slow GPU.
      const cost = performance.now() - started;
      if (cost > 12 && delta < 400) slowFrames++;
      else slowFrames = Math.max(0, slowFrames - 1);

      if (slowFrames > 20) {
        slowFrames = 0;
        if (!downgraded) {
          downgraded = true;
          renderScale = Math.max(0.25, renderScale * 0.5);
          renderer.setPixelRatio(renderScale);
          resize();
        } else {
          cancelAnimationFrame(raf);
          onTooSlowRef.current?.();
        }
      }
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
      apiRef.current = null;
      quad.geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  useEffect(() => {
    apiRef.current?.setColors(colors);
  }, [colors]);

  useEffect(() => {
    apiRef.current?.setExposure(isDark);
  }, [isDark]);

  return <div ref={mountRef} className="size-full" aria-hidden />;
}
