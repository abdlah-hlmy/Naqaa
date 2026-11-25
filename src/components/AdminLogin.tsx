'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, LockKeyhole, Mail } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

export const AdminLogin: React.FC<{ email: string }> = ({ email }) => {
  const router = useRouter();
  const [emailValue, setEmailValue] = useState(email);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <div className="mb-8 flex justify-center">
          <BrandLogo />
        </div>

        <section className="rounded-[28px] border border-[#17251F]/10 bg-white p-6 sm:p-8 shadow-[0_18px_50px_rgba(23,37,31,0.08)]">
          <div className="mb-6 text-center">
            <span className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#245745]/10 text-[#245745]">
              <LockKeyhole className="h-5 w-5" />
            </span>
            <h1 className="text-2xl font-bold text-[#17251F]">تسجيل دخول الإدارة</h1>
            <p className="mt-2 text-sm text-[#68776E]">أدخل بيانات الحساب للدخول إلى لوحة التحكم</p>
          </div>

          <form
            onSubmit={async (event) => {
              event.preventDefault();
              setError('');
              setSubmitting(true);

              try {
                const response = await fetch('/api/admin-auth', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ email: emailValue, password }),
                });
                const result = (await response.json()) as { ok?: boolean; error?: string };

                if (!response.ok || !result.ok) {
                  setError(result.error || 'تعذر تسجيل الدخول.');
                  return;
                }

                router.refresh();
              } catch {
                setError('تعذر الاتصال بالخادم. حاول مرة أخرى.');
              } finally {
                setSubmitting(false);
              }
            }}
            className="space-y-4"
          >
            <div>
              <label htmlFor="admin-email" className="mb-1.5 block text-xs font-semibold text-[#17251F]">
                البريد الإلكتروني
              </label>
              <div className="relative">
                <Mail className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#68776E]" />
                <input
                  id="admin-email"
                  type="email"
                  autoComplete="email"
                  required
                  value={emailValue}
                  onChange={(event) => setEmailValue(event.target.value)}
                  className="w-full rounded-xl border border-[#17251F]/15 bg-[#FAF8F3] py-3 pr-10 pl-3.5 text-sm text-[#17251F] outline-none transition focus:border-[#245745] focus:ring-2 focus:ring-[#245745]/15"
                />
              </div>
            </div>

            <div>
              <label htmlFor="admin-password" className="mb-1.5 block text-xs font-semibold text-[#17251F]">
                كلمة المرور
              </label>
              <div className="relative">
                <LockKeyhole className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#68776E]" />
                <input
                  id="admin-password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="w-full rounded-xl border border-[#17251F]/15 bg-[#FAF8F3] py-3 pr-10 pl-11 text-sm text-[#17251F] outline-none transition focus:border-[#245745] focus:ring-2 focus:ring-[#245745]/15"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((visible) => !visible)}
                  aria-label={showPassword ? 'إخفاء كلمة المرور' : 'إظهار كلمة المرور'}
                  className="absolute left-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-[#68776E] hover:bg-[#EFEADC] hover:text-[#17251F]"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {error && (
              <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-xl bg-[#245745] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#17251F] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? 'جاري التحقق...' : 'تسجيل الدخول'}
            </button>
          </form>
        </section>
      </div>
    </main>
  );
};
