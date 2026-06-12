import { z } from 'zod';

/** Shared contact validation — used by both the client form and the API route. */
export const contactSchema = z.object({
  name: z.string().trim().min(2, 'Name is too short').max(80),
  email: z.string().trim().email('Enter a valid email').max(160),
  message: z.string().trim().min(10, 'Message is too short').max(2000),
  /** Honeypot — must stay empty. Bots fill it. */
  company: z.string().max(0).optional().or(z.literal('')),
});

export type ContactInput = z.infer<typeof contactSchema>;

/** Standard API envelope — same shape family as StudyNest (PRD §6.5). */
export type ContactErrorCode = 'VALIDATION' | 'RATE_LIMIT' | 'PROVIDER';

export type ContactResponse =
  | { success: true; message: string }
  | { success: false; error: { code: ContactErrorCode; message: string } };
