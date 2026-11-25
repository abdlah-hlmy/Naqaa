import type { Metadata } from 'next';
import { homeFaqs } from '../data/faqs';
import { readCmsStore } from '../lib/cmsStore';
import { StructuredData } from '../components/StructuredData';
import { HomeView } from '../views/HomeView';

export async function generateMetadata(): Promise<Metadata> {
  const { siteConfig } = await readCmsStore();
  return {
    title: siteConfig.seoDefaults.defaultTitle,
    description: siteConfig.seoDefaults.defaultDescription,
    alternates: {
      canonical: '/',
    },
    openGraph: {
      title: siteConfig.seoDefaults.defaultTitle,
      description: siteConfig.seoDefaults.defaultDescription,
      url: '/',
      images: ['/assets/og-image.jpg'],
    },
  };
}

export default function HomePage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: homeFaqs.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <StructuredData data={faqSchema} />
      <HomeView />
    </>
  );
}
