import { siteConfig } from '../data/siteConfig';

function normalizeValidUrl(raw?: string | null): string | null {
  if (!raw) return null;
  const trimmed = raw.trim();
  if (!trimmed || trimmed === 'MY_APP_URL' || trimmed.includes('MY_APP_URL')) {
    return null;
  }
  try {
    const parsed = new URL(trimmed);
    if (parsed.protocol === 'http:' || parsed.protocol === 'https:') {
      return parsed.origin;
    }
    return null;
  } catch {
    return null;
  }
}

export function resolveBaseUrl(
  requestHeaders?: Headers,
  configuredSiteUrl?: string
): string {
  const fromPublicEnv = normalizeValidUrl(process.env.NEXT_PUBLIC_SITE_URL);
  if (fromPublicEnv) return fromPublicEnv;

  const fromAppEnv = normalizeValidUrl(process.env.APP_URL);
  if (fromAppEnv) return fromAppEnv;

  const fromConfigured = normalizeValidUrl(configuredSiteUrl);
  if (fromConfigured) return fromConfigured;

  if (requestHeaders) {
    const host =
      requestHeaders.get('x-forwarded-host') || requestHeaders.get('host');
    const proto = requestHeaders.get('x-forwarded-proto') || 'https';
    if (host && !host.includes('127.0.0.1:3100')) {
      const fromHeader = normalizeValidUrl(`${proto}://${host}`);
      if (fromHeader) return fromHeader;
    }
  }

  return normalizeValidUrl(siteConfig.siteUrl) || 'https://naqaa.sa';
}
