import crypto from 'node:crypto';
import { NextRequest, NextResponse } from 'next/server';

const COOKIE_NAME = 'naqaa_admin_session';

// Admin credentials come only from environment variables.
// If any is missing, admin login stays disabled (fail closed).
function getCredentials() {
  const email = (process.env.ADMIN_EMAIL || '').trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD || '';
  const secret = process.env.ADMIN_SESSION_SECRET || '';

  if (!email || !password || !secret) return null;
  return { email, password, secret };
}

function createSessionToken(credentials: { email: string; password: string; secret: string }) {
  return crypto
    .createHmac('sha256', credentials.secret)
    .update(`${credentials.email}:${credentials.password}`)
    .digest('hex');
}

export async function GET(req: NextRequest) {
  const credentials = getCredentials();
  if (!credentials) return NextResponse.json({ authenticated: false });

  const session = req.cookies.get(COOKIE_NAME)?.value;
  return NextResponse.json({ authenticated: session === createSessionToken(credentials) });
}

export async function POST(req: NextRequest) {
  const body = (await req.json()) as { email?: string; password?: string; action?: 'logout' };

  if (body.action === 'logout') {
    const response = NextResponse.json({ ok: true });
    response.cookies.delete(COOKIE_NAME);
    return response;
  }

  const credentials = getCredentials();
  if (!credentials) {
    return NextResponse.json(
      { ok: false, error: 'لوحة الإدارة غير مفعّلة حاليًا.' },
      { status: 503 }
    );
  }

  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
  const password = typeof body.password === 'string' ? body.password : '';

  if (email !== credentials.email || password !== credentials.password) {
    return NextResponse.json(
      { ok: false, error: 'البريد الإلكتروني أو كلمة المرور غير صحيحة.' },
      { status: 401 }
    );
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(COOKIE_NAME, createSessionToken(credentials), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 12,
  });

  return response;
}
