import type { Metadata } from 'next';
import { NotFoundView } from '../views/NotFoundView';

export const metadata: Metadata = {
  title: 'الصفحة غير موجودة',
  description: 'لم يتم العثور على الصفحة المطلوبة.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return <NotFoundView />;
}
