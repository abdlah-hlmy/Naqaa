'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useSiteData } from '../context/SiteDataContext';
import { SectionHeading } from '../components/SectionHeading';
import { ArticleCard } from '../components/ArticleCard';
import { AnimatedReveal } from '../components/AnimatedReveal';

export const ArticlesPreviewSection: React.FC = () => {
  const { articles: articlesData } = useSiteData();
  const featuredArticle = articlesData[0];
  const secondaryArticles = articlesData.slice(1, 4);

  if (!featuredArticle) return null;

  return (
    <section id="articles" className="py-16 sm:py-22 bg-[#FAF8F3]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <SectionHeading
            kicker="المقالات"
            title="إرشادات هادئة للعناية بالمنزل"
            description="مقالات ونبذ عملية تساعدك في الحفاظ على نظافة البيت ونقاء هوائه بأسلوب بسيط وواضح."
          />

          <Link
            href="/articles"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#245745] hover:text-[#17251F] transition-colors whitespace-nowrap shrink-0"
          >
            <span>جميع المقالات</span>
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>

        <AnimatedReveal className="space-y-6">
          <ArticleCard article={featuredArticle} featured />

          {secondaryArticles.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {secondaryArticles.map((art) => (
                <ArticleCard key={art.id} article={art} />
              ))}
            </div>
          )}
        </AnimatedReveal>
      </div>
    </section>
  );
};
