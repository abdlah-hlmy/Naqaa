import type { Metadata } from 'next';
import { readCmsStore } from '../../lib/cmsStore';
import { resolveBaseUrl } from '../../lib/siteUrl';
import { StructuredData } from '../../components/StructuredData';
import { LocationsView } from '../../views/LocationsView';

export const metadata: Metadata = {
  title: 'مناطق التغطية',
  description:
    'تغطية خدمات نقاء للتنظيف في الرياض ومدن المملكة العربية السعودية مع توضيح حالة التوفر والأحياء المخدومة.',
  alternates: {
    canonical: '/locations',
  },
  openGraph: {
    title: 'مناطق التغطية | نقاء',
    description:
      'تغطية خدمات نقاء للتنظيف في الرياض ومدن المملكة العربية السعودية مع توضيح حالة التوفر والأحياء المخدومة.',
    url: '/locations',
    images: ['/assets/og-image.jpg'],
  },
};

export default async function LocationsPage() {
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
        name: 'مناطق التغطية',
        item: `${baseUrl}/locations`,
      },
    ],
  };

  return (
    <>
      <StructuredData data={breadcrumbSchema} />
      <LocationsView />
    </>
  );
}
