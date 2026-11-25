import type { MetadataRoute } from 'next';
import { readCmsStore } from '../lib/cmsStore';
import { resolveBaseUrl } from '../lib/siteUrl';

export default async function robots(): Promise<MetadataRoute.Robots> {
  const { siteConfig } = await readCmsStore();
  const baseUrl = resolveBaseUrl(undefined, siteConfig.siteUrl);

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/naqaa-manage', '/api/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
