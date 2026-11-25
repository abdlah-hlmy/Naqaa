import crypto from 'node:crypto';
import { NextRequest, NextResponse } from 'next/server';

const COOKIE_NAME = 'naqaa_admin_session';

function getCredentials() {
  return {
    email: (process.env.ADMIN_EMAIL || 'info@naqaa.sa').trim().toLowerCase(),
    password: process.env.ADMIN_PASSWORD || 'Naqaa@2026',
  };
}

function createSessionToken() {
  const credentials = getCredentials();
  const secret =
    process.env.ADMIN_SESSION_SECRET ||
    'naqaa-admin-session-2026-local-change-before-production';

  return crypto
    .createHmac('sha256', secret)
    .update(`${credentials.email}:${credentials.password}`)
    .digest('hex');
}

export async function GET(req: NextRequest) {
  const session = req.cookies.get(COOKIE_NAME)?.value;
  return NextResponse.json({ authenticated: session === createSessionToken() });
}

export async function POST(req: NextRequest) {
  const body = (await req.json()) as { email?: string; password?: string; action?: 'logout' };

  if (body.action === 'logout') {
    const response = NextResponse.json({ ok: true });
    response.cookies.delete(COOKIE_NAME);
    return response;
  }

  const credentials = getCredentials();
  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
  const password = typeof body.password === 'string' ? body.password : '';

  if (email !== credentials.email || password !== credentials.password) {
    return NextResponse.json(
      { ok: false, error: 'البريد الإلكتروني أو كلمة المرور غير صحيحة.' },
      { status: 401 }
    );
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(COOKIE_NAME, createSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 12,
  });

  return response;
}
