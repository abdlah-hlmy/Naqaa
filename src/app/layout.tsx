import type { Metadata, Viewport } from 'next';
import React from 'react';
import './globals.css';
import { readCmsStore } from '../lib/cmsStore';
import { resolveBaseUrl } from '../lib/siteUrl';
import { AppShell } from '../components/AppShell';
import { StructuredData } from '../components/StructuredData';

export const viewport: Viewport = {
  themeColor: '#245745',
  width: 'device-width',
  initialScale: 1,
};

export async function generateMetadata(): Promise<Metadata> {
  const { siteConfig } = await readCmsStore();
  const baseUrl = resolveBaseUrl(undefined, siteConfig.siteUrl);

  return {
    metadataBase: new URL(baseUrl),
    icons: {
      icon: [{ url: '/assets/favicon.webp', type: 'image/webp' }],
    },
    title: {
      default: siteConfig.seoDefaults.defaultTitle,
      template: siteConfig.seoDefaults.titleTemplate,
    },
    description: siteConfig.seoDefaults.defaultDescription,
    openGraph: {
      type: 'website',
      locale: 'ar_SA',
      siteName: `${siteConfig.brandName} | ${siteConfig.brandEnglish}`,
      title: siteConfig.seoDefaults.defaultTitle,
      description: siteConfig.seoDefaults.defaultDescription,
      images: [{ url: '/assets/og-image.jpg', alt: siteConfig.brandName }],
    },
    twitter: {
      card: 'summary_large_image',
      title: siteConfig.seoDefaults.defaultTitle,
      description: 'نقاء. راحة تبدأ من المكان — اطلب عرض سعرك بوضوح وسهولة.',
      images: ['/assets/og-image.jpg'],
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { siteConfig, locations, articles } = await readCmsStore();
  const initialState = { siteConfig, locations, articles };
  const baseUrl = resolveBaseUrl(undefined, siteConfig.siteUrl);

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: `${siteConfig.brandName} | ${siteConfig.brandEnglish}`,
    description: siteConfig.description,
    url: baseUrl,
    areaServed: {
      '@type': 'Country',
      name: 'Saudi Arabia',
    },
    sameAs: Object.values(siteConfig.socialLinks).filter(Boolean),
  };

  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Aref+Ruqaa:wght@700&family=Noto+Kufi+Arabic:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#FAF8F3] text-[#17251F] antialiased selection:bg-[#245745] selection:text-[#FAF8F3]">
        <StructuredData data={organizationSchema} />
        <AppShell initialState={initialState}>{children}</AppShell>
      </body>
    </html>
  );
}
