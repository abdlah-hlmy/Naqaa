import type { Metadata } from 'next';
import { readCmsStore } from '../../lib/cmsStore';
import { resolveBaseUrl } from '../../lib/siteUrl';
import { StructuredData } from '../../components/StructuredData';
import { ContactView } from '../../views/ContactView';

export const metadata: Metadata = {
  title: 'تواصل معنا',
  description:
    'تواصل مع نقاء لطلب عرض سعر أو الاستفسار عن تغطية الأحياء والمواعيد المتاحة في مدن المملكة.',
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'تواصل معنا | نقاء',
    description:
      'تواصل مع نقاء لطلب عرض سعر أو الاستفسار عن تغطية الأحياء والمواعيد المتاحة في مدن المملكة.',
    url: '/contact',
    images: ['/assets/og-image.jpg'],
  },
};

export default async function ContactPage() {
  const { siteConfig } = await readCmsStore();
  const baseUrl = resolveBaseUrl(undefined, siteConfig.siteUrl);

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'الرئيسية', item: `${baseUrl}/` },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'تواصل معنا',
        item: `${baseUrl}/contact`,
      },
    ],
  };

  return (
    <>
      <StructuredData data={breadcrumbSchema} />
      <ContactView />
    </>
  );
}
