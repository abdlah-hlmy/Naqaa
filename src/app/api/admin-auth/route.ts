import { NextRequest, NextResponse } from 'next/server';
import {
  ADMIN_COOKIE_NAME,
  createAdminSessionToken,
  getAdminCredentials,
  isAdminSession,
} from '../../../lib/adminSession';

export async function GET(req: NextRequest) {
  return NextResponse.json({ authenticated: isAdminSession(req) });
}

export async function POST(req: NextRequest) {
  const body = (await req.json()) as { email?: string; password?: string; action?: 'logout' };

  if (body.action === 'logout') {
    const response = NextResponse.json({ ok: true });
    response.cookies.delete(ADMIN_COOKIE_NAME);
    return response;
  }

  const credentials = getAdminCredentials();
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
  response.cookies.set(ADMIN_COOKIE_NAME, createAdminSessionToken(credentials), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 12,
  });

  return response;
}
