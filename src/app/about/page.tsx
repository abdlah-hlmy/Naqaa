import type { Metadata } from 'next';
import { readCmsStore } from '../../lib/cmsStore';
import { resolveBaseUrl } from '../../lib/siteUrl';
import { StructuredData } from '../../components/StructuredData';
import { AboutView } from '../../views/AboutView';

export const metadata: Metadata = {
  title: 'من نحن',
  description:
    'نقاء. راحة تبدأ من المكان — تعرف على رؤيتنا، رسالتنا، قيمنا، وأسلوب عملنا في خدمات التنظيف المنزلية.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'من نحن | نقاء',
    description:
      'نقاء. راحة تبدأ من المكان — تعرف على رؤيتنا، رسالتنا، قيمنا، وأسلوب عملنا في خدمات التنظيف المنزلية.',
    url: '/about',
    images: ['/assets/og-image.jpg'],
  },
};

export default async function AboutPage() {
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
        name: 'من نحن',
        item: `${baseUrl}/about`,
      },
    ],
  };

  return (
    <>
      <StructuredData data={breadcrumbSchema} />
      <AboutView />
    </>
  );
}
