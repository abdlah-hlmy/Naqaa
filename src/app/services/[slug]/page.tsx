import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getServiceBySlug, servicesData } from '../../../data/services';
import { readCmsStore } from '../../../lib/cmsStore';
import { resolveBaseUrl } from '../../../lib/siteUrl';
import { StructuredData } from '../../../components/StructuredData';
import { ServiceDetailView } from '../../../views/ServiceDetailView';

export function generateStaticParams() {
  return servicesData.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { siteConfig } = await readCmsStore();
  const service = getServiceBySlug(slug);
  if (!service) {
    return {
      title: 'الخدمة غير موجودة',
      robots: { index: false, follow: false },
    };
  }

  return {
    title: service.title,
    description: service.heroDescription,
    alternates: {
      canonical: `/services/${service.slug}`,
    },
    openGraph: {
      title: `${service.title} | ${siteConfig.brandName}`,
      description: service.heroDescription,
      url: `/services/${service.slug}`,
      images: [service.image],
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const { siteConfig } = await readCmsStore();
  const baseUrl = resolveBaseUrl(undefined, siteConfig.siteUrl);

  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: service.title,
      description: service.fullDescription,
      provider: {
        '@type': 'Organization',
        name: `${siteConfig.brandName} | ${siteConfig.brandEnglish}`,
      },
      areaServed: {
        '@type': 'Country',
        name: 'Saudi Arabia',
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
          name: 'خدماتنا',
          item: `${baseUrl}/services`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: service.title,
          item: `${baseUrl}/services/${service.slug}`,
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: service.faqs.map((f) => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: { '@type': 'Answer', text: f.answer },
      })),
    },
  ];

  return (
    <>
      <StructuredData data={structuredData} />
      <ServiceDetailView slug={service.slug} />
    </>
  );
}
