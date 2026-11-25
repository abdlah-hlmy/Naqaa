import type { Metadata } from 'next';
import { readCmsStore } from '../../lib/cmsStore';
import { resolveBaseUrl } from '../../lib/siteUrl';
import { StructuredData } from '../../components/StructuredData';
import { ServicesView } from '../../views/ServicesView';

export const metadata: Metadata = {
  title: 'خدماتنا',
  description:
    'استعرض خدمات نقاء للتنظيف في السعودية: تنظيف المنازل، تنظيف المكيفات، تنظيف الكنب والسجاد، وتنظيف ما بعد التشطيب.',
  alternates: {
    canonical: '/services',
  },
  openGraph: {
    title: 'خدماتنا | نقاء',
    description:
      'استعرض خدمات نقاء للتنظيف في السعودية: تنظيف المنازل، تنظيف المكيفات، تنظيف الكنب والسجاد، وتنظيف ما بعد التشطيب.',
    url: '/services',
    images: ['/assets/og-image.jpg'],
  },
};

export default async function ServicesPage() {
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
        name: 'خدماتنا',
        item: `${baseUrl}/services`,
      },
    ],
  };

  return (
    <>
      <StructuredData data={breadcrumbSchema} />
      <ServicesView />
    </>
  );
}
