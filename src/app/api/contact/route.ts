import { NextResponse } from 'next/server';
import { contactSchema, type ContactResponse } from '@/lib/contact-schema';
import { rateLimit } from '@/lib/rate-limit';

export const runtime = 'nodejs';

function json(body: ContactResponse, status: number) {
  return NextResponse.json(body, { status });
}

/**
 * POST /api/contact — the only server code on the site (PRD §6.5).
 * Validates with Zod, drops bots via honeypot, rate-limits per IP, and sends
 * through Resend's REST API. Returns the standard envelope.
 */
export async function POST(req: Request) {
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    req.headers.get('x-real-ip') ??
    'unknown';

  const limit = rateLimit(`contact:${ip}`);
  if (!limit.ok) {
    return json(
      { success: false, error: { code: 'RATE_LIMIT', message: 'Too many requests' } },
      429,
    );
  }

  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return json(
      { success: false, error: { code: 'VALIDATION', message: 'Invalid body' } },
      400,
    );
  }

  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) {
    return json(
      { success: false, error: { code: 'VALIDATION', message: 'Invalid fields' } },
      400,
    );
  }

  // Honeypot tripped → pretend success so bots don't learn anything.
  if (parsed.data.company) {
    return json({ success: true, message: 'Sent' }, 200);
  }

  const { name, email, message } = parsed.data;
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;

  // No provider configured (e.g. local dev) → tell the client to use mailto.
  if (!apiKey || !to) {
    return json(
      { success: false, error: { code: 'PROVIDER', message: 'Email not configured' } },
      503,
    );
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Portfolio <onboarding@resend.dev>',
        to: [to],
        reply_to: email,
        subject: `Portfolio message from ${name}`,
        text: `From: ${name} <${email}>\n\n${message}`,
      }),
    });

    if (!res.ok) {
      return json(
        { success: false, error: { code: 'PROVIDER', message: 'Send failed' } },
        502,
      );
    }
    return json({ success: true, message: 'Sent' }, 200);
  } catch {
    return json(
      { success: false, error: { code: 'PROVIDER', message: 'Send failed' } },
      502,
    );
  }
}
