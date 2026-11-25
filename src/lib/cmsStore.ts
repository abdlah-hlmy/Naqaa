import fs from 'node:fs/promises';
import path from 'node:path';
import { siteConfig as defaultSiteConfig, SiteConfig } from '../data/siteConfig';
import { locationsData as defaultLocations, CityLocation } from '../data/locations';
import { articlesData as defaultArticles, ArticleItem } from '../data/articles';

export interface CmsStoreState {
  siteConfig: SiteConfig;
  locations: CityLocation[];
  articles: ArticleItem[];
  updatedAt: string;
}

const DATA_DIR = path.join(process.cwd(), '.data');
const STORE_PATH = path.join(DATA_DIR, 'cms-store.json');

function containsCorruptText(value: unknown): boolean {
  if (typeof value === 'string') {
    return value.includes('\uFFFD') || /[\u0080-\u009F]/.test(value);
  }
  if (Array.isArray(value)) {
    return value.some(containsCorruptText);
  }
  if (value && typeof value === 'object') {
    return Object.values(value).some(containsCorruptText);
  }
  return false;
}

function normalizeArticles(items: ArticleItem[]): ArticleItem[] {
  return items.map((a) => ({
    ...a,
    coverImage:
      a.coverImage?.replace('/src/assets/images/', '/images/') || a.coverImage,
  }));
}

export function getDefaultCmsStore(): CmsStoreState {
  return {
    siteConfig: defaultSiteConfig,
    locations: defaultLocations,
    articles: defaultArticles,
    updatedAt: '2026-11-24T00:00:00.000Z',
  };
}

export async function readCmsStore(): Promise<CmsStoreState> {
  try {
    const raw = await fs.readFile(STORE_PATH, 'utf8');
    const parsed = JSON.parse(raw) as Partial<CmsStoreState>;
    if (containsCorruptText(parsed)) {
      return getDefaultCmsStore();
    }
    return {
      siteConfig: parsed.siteConfig
        ? { ...defaultSiteConfig, ...parsed.siteConfig }
        : defaultSiteConfig,
      locations: Array.isArray(parsed.locations)
        ? parsed.locations
        : defaultLocations,
      articles: Array.isArray(parsed.articles)
        ? normalizeArticles(parsed.articles)
        : defaultArticles,
      updatedAt:
        typeof parsed.updatedAt === 'string'
          ? parsed.updatedAt
          : new Date().toISOString(),
    };
  } catch {
    return getDefaultCmsStore();
  }
}

export async function writeCmsStore(
  input: Partial<CmsStoreState>
): Promise<CmsStoreState> {
  const next: CmsStoreState = {
    siteConfig: input.siteConfig
      ? { ...defaultSiteConfig, ...input.siteConfig }
      : defaultSiteConfig,
    locations: Array.isArray(input.locations)
      ? input.locations
      : defaultLocations,
    articles: Array.isArray(input.articles)
      ? normalizeArticles(input.articles)
      : defaultArticles,
    updatedAt: new Date().toISOString(),
  };

  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.writeFile(STORE_PATH, JSON.stringify(next, null, 2), 'utf8');
  } catch {
    // Fallback cleanly if filesystem is read-only
  }

  return next;
}

export async function resetCmsStore(): Promise<CmsStoreState> {
  try {
    await fs.unlink(STORE_PATH);
  } catch {
    // ignore if file does not exist
  }
  return getDefaultCmsStore();
}
