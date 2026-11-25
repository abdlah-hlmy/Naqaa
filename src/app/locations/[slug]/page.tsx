import type { Metadata } from 'next';
import { readCmsStore } from '../../../lib/cmsStore';
import { resolveBaseUrl } from '../../../lib/siteUrl';
import { StructuredData } from '../../../components/StructuredData';
import { LocationDetailView } from '../../../views/LocationDetailView';

export async function generateStaticParams() {
  const { locations } = await readCmsStore();
  return locations.map((city) => ({ slug: city.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { locations, siteConfig } = await readCmsStore();
  const city = locations.find((c) => c.slug === slug);

  if (!city) {
    return {
      title: 'تفاصيل التغطية غير موجودة',
      description: 'لم يتم العثور على صفحة المدينة المطلوبة.',
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return {
    title: `خدمات التنظيف في ${city.name}`,
    description: city.localDescription,
    alternates: {
      canonical: `/locations/${city.slug}`,
    },
    openGraph: {
      title: `خدمات التنظيف في ${city.name} | ${siteConfig.brandName}`,
      description: city.localDescription,
      url: `/locations/${city.slug}`,
      images: ['/assets/og-image.jpg'],
    },
  };
}

export default async function LocationDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { locations, siteConfig } = await readCmsStore();
  const baseUrl = resolveBaseUrl(undefined, siteConfig.siteUrl);
  const city = locations.find((c) => c.slug === slug);

  const structuredData = city
    ? [
        {
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: `خدمات التنظيف في ${city.name} — ${siteConfig.brandName}`,
          description: city.localDescription,
          areaServed: {
            '@type': 'City',
            name: city.name,
          },
          provider: {
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
              name: 'مناطق التغطية',
              item: `${baseUrl}/locations`,
            },
            {
              '@type': 'ListItem',
              position: 3,
              name: city.name,
              item: `${baseUrl}/locations/${city.slug}`,
            },
          ],
        },
      ]
    : null;

  return (
    <>
      {structuredData && <StructuredData data={structuredData} />}
      <LocationDetailView slug={slug} />
    </>
  );
}
