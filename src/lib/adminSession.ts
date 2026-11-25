import crypto from 'node:crypto';
import type { NextRequest } from 'next/server';

export const ADMIN_COOKIE_NAME = 'naqaa_admin_session';

export type AdminCredentials = {
  email: string;
  password: string;
  secret: string;
};

// Admin credentials come only from environment variables.
// If any is missing, admin access stays disabled (fail closed).
export function getAdminCredentials(): AdminCredentials | null {
  const email = (process.env.ADMIN_EMAIL || '').trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD || '';
  const secret = process.env.ADMIN_SESSION_SECRET || '';

  if (!email || !password || !secret) return null;
  return { email, password, secret };
}

export function createAdminSessionToken(credentials: AdminCredentials) {
  return crypto
    .createHmac('sha256', credentials.secret)
    .update(`${credentials.email}:${credentials.password}`)
    .digest('hex');
}

export function isAdminSession(req: NextRequest): boolean {
  const credentials = getAdminCredentials();
  if (!credentials) return false;

  const session = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
  if (!session) return false;

  const expected = Buffer.from(createAdminSessionToken(credentials));
  const received = Buffer.from(session);
  if (expected.length !== received.length) return false;

  return crypto.timingSafeEqual(expected, received);
}
