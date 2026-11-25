import type { MetadataRoute } from 'next';
import { servicesData } from '../data/services';
import { readCmsStore } from '../lib/cmsStore';
import { resolveBaseUrl } from '../lib/siteUrl';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { siteConfig, locations, articles, updatedAt } = await readCmsStore();
  const baseUrl = resolveBaseUrl(undefined, siteConfig.siteUrl);
  const storeModified = new Date(updatedAt || Date.now());

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: storeModified,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: storeModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/locations`,
      lastModified: storeModified,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/articles`,
      lastModified: storeModified,
      changeFrequency: 'daily',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: storeModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: storeModified,
      changeFrequency: 'monthly',
      priority: 0.75,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: storeModified,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: storeModified,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = servicesData.map((srv) => ({
    url: `${baseUrl}/services/${srv.slug}`,
    lastModified: storeModified,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const locationRoutes: MetadataRoute.Sitemap = locations.map((city) => ({
    url: `${baseUrl}/locations/${city.slug}`,
    lastModified: storeModified,
    changeFrequency: 'weekly',
    priority: city.coverageStatus === 'active' ? 0.8 : 0.7,
  }));

  const articleRoutes: MetadataRoute.Sitemap = articles.map((article) => {
    const parsedDate = Date.parse(article.publishedIso);
    return {
      url: `${baseUrl}/articles/${article.slug}`,
      lastModified: Number.isNaN(parsedDate) ? storeModified : new Date(parsedDate),
      changeFrequency: 'weekly',
      priority: 0.75,
    };
  });

  return [
    ...staticRoutes,
    ...serviceRoutes,
    ...locationRoutes,
    ...articleRoutes,
  ];
}
