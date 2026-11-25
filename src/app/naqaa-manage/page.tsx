import type { Metadata } from 'next';
import crypto from 'node:crypto';
import { cookies } from 'next/headers';
import { AdminDashboardView } from '../../views/AdminDashboardView';
import { AdminLogin } from '../../components/AdminLogin';
import { readCmsStore } from '../../lib/cmsStore';

export const metadata: Metadata = {
  title: 'لوحة إدارة المحتوى',
  description: 'إدارة داخلية للمقالات والمدن وإعدادات الموقع.',
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

function createSessionToken(email: string, password: string) {
  const secret =
    process.env.ADMIN_SESSION_SECRET ||
    'naqaa-admin-session-2026-local-change-before-production';
  return crypto
    .createHmac('sha256', secret)
    .update(`${email}:${password}`)
    .digest('hex');
}

export default async function AdminManagePage() {
  const cookieStore = await cookies();
  const { siteConfig } = await readCmsStore();
  const email = (process.env.ADMIN_EMAIL || siteConfig.email).trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD || 'Naqaa@2026';
  const session = cookieStore.get('naqaa_admin_session')?.value;

  if (session !== createSessionToken(email, password)) {
    return <AdminLogin email={email} />;
  }

  return <AdminDashboardView />;
}
