import type { Metadata } from 'next';
import { readCmsStore } from '../../lib/cmsStore';
import { resolveBaseUrl } from '../../lib/siteUrl';
import { StructuredData } from '../../components/StructuredData';
import { ArticlesView } from '../../views/ArticlesView';

export const metadata: Metadata = {
  title: 'المقالات',
  description:
    'مقالات ونصائح عملية من نقاء حول العناية بنظافة المنزل، المكيفات، المفروشات، وجودة الهواء الداخلي.',
  alternates: {
    canonical: '/articles',
  },
  openGraph: {
    title: 'المقالات | نقاء',
    description:
      'مقالات ونصائح عملية من نقاء حول العناية بنظافة المنزل، المكيفات، المفروشات، وجودة الهواء الداخلي.',
    url: '/articles',
    images: ['/assets/og-image.jpg'],
  },
};

export default async function ArticlesPage() {
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
        name: 'المقالات',
        item: `${baseUrl}/articles`,
      },
    ],
  };

  return (
    <>
      <StructuredData data={breadcrumbSchema} />
      <ArticlesView />
    </>
  );
}
