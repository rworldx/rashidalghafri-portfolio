/**
 * Minimal in-memory fixed-window rate limiter for the contact route (PRD §5.6).
 * Sufficient for a single-instance serverless function; swap for Upstash Redis
 * if traffic ever warrants a shared store.
 */
const hits = new Map<string, { count: number; resetAt: number }>();

interface Result {
  ok: boolean;
  remaining: number;
}

export function rateLimit(key: string, limit = 5, windowMs = 60_000): Result {
  const now = Date.now();
  const entry = hits.get(key);

  if (!entry || now > entry.resetAt) {
    hits.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, remaining: limit - 1 };
  }

  entry.count += 1;
  // Opportunistic cleanup to bound the map.
  if (hits.size > 5000) {
    for (const [k, v] of hits) if (now > v.resetAt) hits.delete(k);
  }
  return { ok: entry.count <= limit, remaining: Math.max(0, limit - entry.count) };
}
