'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { siteConfig as defaultSiteConfig, SiteConfig } from '../data/siteConfig';
import { locationsData as defaultLocations, CityLocation } from '../data/locations';
import { articlesData as defaultArticles, ArticleItem } from '../data/articles';
import { setLiveWhatsappNumber } from '../lib/whatsapp';

const STORAGE_KEY = 'naqaa_cms_data_v1';

export interface StoredCmsState {
  siteConfig: SiteConfig;
  locations: CityLocation[];
  articles: ArticleItem[];
}

interface SiteDataContextValue {
  siteConfig: SiteConfig;
  locations: CityLocation[];
  articles: ArticleItem[];
  updateSiteConfig: (next: SiteConfig) => void;
  setLocations: (next: CityLocation[]) => void;
  upsertLocation: (city: CityLocation, previousSlug?: string) => void;
  deleteLocation: (slug: string) => void;
  setArticles: (next: ArticleItem[]) => void;
  upsertArticle: (article: ArticleItem) => void;
  deleteArticle: (id: string) => void;
  resetAllToDefault: () => void;
  importJsonState: (jsonText: string) => { ok: boolean; error?: string };
  exportJsonState: () => string;
}

const defaultState: StoredCmsState = {
  siteConfig: defaultSiteConfig,
  locations: defaultLocations,
  articles: defaultArticles,
};

function normalizeArticleImages(items: ArticleItem[]): ArticleItem[] {
  return items.map((a) => ({
    ...a,
    coverImage:
      a.coverImage?.replace('/src/assets/images/', '/images/') || a.coverImage,
  }));
}

async function syncServerCms(nextState: StoredCmsState) {
  try {
    await fetch('/api/cms', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nextState),
    });
  } catch {
    // ignore offline/network errors gracefully
  }
}

const SiteDataContext = createContext<SiteDataContextValue | null>(null);

export const SiteDataProvider: React.FC<{
  children: React.ReactNode;
  initialState: StoredCmsState;
}> = ({ children, initialState }) => {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    setLiveWhatsappNumber(state.siteConfig.whatsappNumber);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // ignore storage quota errors
    }
  }, [state]);

  const commitState = (updater: (prev: StoredCmsState) => StoredCmsState) => {
    setState((prev) => {
      const next = updater(prev);
      void syncServerCms(next);
      return next;
    });
  };

  const updateSiteConfig = (next: SiteConfig) => {
    commitState((prev) => ({ ...prev, siteConfig: next }));
  };

  const setLocations = (next: CityLocation[]) => {
    commitState((prev) => ({ ...prev, locations: next }));
  };

  const upsertLocation = (city: CityLocation, previousSlug?: string) => {
    const matchSlug = previousSlug || city.slug;
    commitState((prev) => {
      const exists = prev.locations.some((c) => c.slug === matchSlug);
      const nextLocations = exists
        ? prev.locations.map((c) => (c.slug === matchSlug ? city : c))
        : [...prev.locations, city];
      return { ...prev, locations: nextLocations };
    });
  };

  const deleteLocation = (slug: string) => {
    commitState((prev) => ({
      ...prev,
      locations: prev.locations.filter((c) => c.slug !== slug),
    }));
  };

  const setArticles = (next: ArticleItem[]) => {
    commitState((prev) => ({ ...prev, articles: next }));
  };

  const upsertArticle = (article: ArticleItem) => {
    commitState((prev) => {
      const exists = prev.articles.some((a) => a.id === article.id);
      const nextArticles = exists
        ? prev.articles.map((a) => (a.id === article.id ? article : a))
        : [article, ...prev.articles];
      return { ...prev, articles: nextArticles };
    });
  };

  const deleteArticle = (id: string) => {
    commitState((prev) => ({
      ...prev,
      articles: prev.articles.filter((a) => a.id !== id),
    }));
  };

  const resetAllToDefault = () => {
    setState(defaultState);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    fetch('/api/cms', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'reset' }),
    }).catch(() => {});
  };

  const importJsonState = (jsonText: string): { ok: boolean; error?: string } => {
    try {
      const parsed = JSON.parse(jsonText) as Partial<StoredCmsState>;
      if (!parsed || typeof parsed !== 'object') {
        return { ok: false, error: 'صيغة ملف JSON غير صالحة.' };
      }
      const next: StoredCmsState = {
        siteConfig: parsed.siteConfig
          ? { ...defaultSiteConfig, ...parsed.siteConfig }
          : defaultSiteConfig,
        locations: Array.isArray(parsed.locations)
          ? parsed.locations
          : defaultLocations,
        articles: Array.isArray(parsed.articles)
          ? normalizeArticleImages(parsed.articles)
          : defaultArticles,
      };
      setState(next);
      void syncServerCms(next);
      return { ok: true };
    } catch {
      return { ok: false, error: 'تعذّر قراءة ملف JSON، تأكد من صحة التنسيق.' };
    }
  };

  const exportJsonState = () => JSON.stringify(state, null, 2);

  return (
    <SiteDataContext.Provider
      value={{
        siteConfig: state.siteConfig,
        locations: state.locations,
        articles: state.articles,
        updateSiteConfig,
        setLocations,
        upsertLocation,
        deleteLocation,
        setArticles,
        upsertArticle,
        deleteArticle,
        resetAllToDefault,
        importJsonState,
        exportJsonState,
      }}
    >
      {children}
    </SiteDataContext.Provider>
  );
};

export function useSiteData(): SiteDataContextValue {
  const ctx = useContext(SiteDataContext);
  if (!ctx) {
    throw new Error('useSiteData must be used inside SiteDataProvider');
  }
  return ctx;
}
