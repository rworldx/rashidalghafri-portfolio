/**
 * Resolve a CSS custom property to a colour a canvas or WebGL context can use.
 *
 * The design tokens are authored in OKLCH, which THREE.Color cannot parse. The
 * browser can, so it does the work — but *not* by round-tripping through
 * `ctx.fillStyle`: Chromium preserves the authored colour space, so assigning
 * `oklch(...)` and reading it back returns `oklch(...)` unchanged. Handing that
 * to THREE.Color fails silently and leaves the material white, which is exactly
 * how the hero constellation ended up rendering as white dots.
 *
 * So the colour is actually painted onto a 1x1 surface and the pixel is read
 * back. That works for any colour syntax the browser understands, whatever it
 * chooses to serialise it as.
 */

let ctx: CanvasRenderingContext2D | null | undefined;

function getCtx(): CanvasRenderingContext2D | null {
  if (ctx !== undefined) return ctx;
  if (typeof document === 'undefined') {
    ctx = null;
    return ctx;
  }
  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;
  ctx = canvas.getContext('2d', { willReadFrequently: true });
  return ctx;
}

const cache = new Map<string, string>();

/** Normalise any CSS colour string to `#rrggbb`. */
export function toRenderableColor(value: string, fallback: string): string {
  const input = value.trim();
  if (!input) return fallback;

  const cached = cache.get(input);
  if (cached) return cached;

  const c = getCtx();
  if (!c) return fallback;

  try {
    c.clearRect(0, 0, 1, 1);
    c.fillStyle = '#000000';
    c.fillStyle = input;
    // If the browser rejected the value, fillStyle is still the sentinel and
    // painting it would silently give us black instead of the real colour.
    if (c.fillStyle === '#000000' && input !== '#000000' && !/^black$/i.test(input)) {
      // Re-test against a second sentinel to tell "rejected" from "really black".
      c.fillStyle = '#ffffff';
      c.fillStyle = input;
      if (c.fillStyle === '#ffffff') return fallback;
    }
    c.fillRect(0, 0, 1, 1);
    const [r, g, b] = c.getImageData(0, 0, 1, 1).data;
    const hex = `#${[r, g, b].map((n) => (n ?? 0).toString(16).padStart(2, '0')).join('')}`;
    cache.set(input, hex);
    return hex;
  } catch {
    return fallback;
  }
}

/** Read a CSS custom property off <html> and normalise it for rendering. */
export function readTokenColor(name: string, fallback: string): string {
  if (typeof window === 'undefined') return fallback;
  const raw = getComputedStyle(document.documentElement).getPropertyValue(name);
  return toRenderableColor(raw, fallback);
}
