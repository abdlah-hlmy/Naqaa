import type { Metadata } from 'next';
import { readCmsStore } from '../../../lib/cmsStore';
import { resolveBaseUrl } from '../../../lib/siteUrl';
import { StructuredData } from '../../../components/StructuredData';
import { ArticleDetailView } from '../../../views/ArticleDetailView';

export async function generateStaticParams() {
  const { articles } = await readCmsStore();
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { articles } = await readCmsStore();
  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    return {
      title: 'المقال غير موجود',
      description: 'لم يتم العثور على المقال المطلوب.',
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return {
    title: article.title,
    description: article.excerpt,
    alternates: {
      canonical: `/articles/${article.slug}`,
    },
    openGraph: {
      type: 'article',
      title: article.title,
      description: article.excerpt,
      url: `/articles/${article.slug}`,
      publishedTime: article.publishedIso,
      images: [article.coverImage],
    },
  };
}

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { articles, siteConfig } = await readCmsStore();
  const baseUrl = resolveBaseUrl(undefined, siteConfig.siteUrl);
  const article = articles.find((a) => a.slug === slug);

  const structuredData = article
    ? [
        {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: article.title,
          description: article.excerpt,
          datePublished: article.publishedIso,
          author: {
            '@type': 'Organization',
            name: article.author,
          },
          publisher: {
            '@type': 'Organization',
            name: `${siteConfig.brandName} | ${siteConfig.brandEnglish}`,
          },
        },
        {
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
            {
              '@type': 'ListItem',
              position: 3,
              name: article.title,
              item: `${baseUrl}/articles/${article.slug}`,
            },
          ],
        },
      ]
    : null;

  return (
    <>
      {structuredData && <StructuredData data={structuredData} />}
      <ArticleDetailView slug={slug} />
    </>
  );
}
