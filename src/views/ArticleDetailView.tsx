'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import { useSiteData } from '../context/SiteDataContext';
import { getServiceBySlug } from '../data/services';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ResilientImage } from '../components/ResilientImage';
import { ServiceCard } from '../components/ServiceCard';
import { InlineQuoteSection } from '../sections/InlineQuoteSection';
import { NotFoundView } from './NotFoundView';

interface ArticleDetailViewProps {
  slug: string;
}

export const ArticleDetailView: React.FC<ArticleDetailViewProps> = ({ slug }) => {
  const { articles } = useSiteData();
  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    return <NotFoundView />;
  }

  const relatedService = getServiceBySlug(article.relatedServiceSlug);

  return (
    <div className="bg-[#FAF8F3]">
      <article className="py-10 sm:py-16">
        {/* رأس المقال */}
        <header className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: 'المقالات', href: '/articles' },
              { label: article.category },
            ]}
          />

          <div className="flex flex-wrap items-center gap-2.5 text-xs sm:text-sm text-[#68776E] mb-4">
            <span className="font-semibold text-[#245745]">{article.category}</span>
            <span aria-hidden="true">·</span>
            <span>{article.readTime}</span>
            <span aria-hidden="true">·</span>
            <span>{article.publishedDate}</span>
            <span aria-hidden="true">·</span>
            <span>{article.author}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-[42px] font-bold text-[#17251F] leading-[1.35]">
            {article.title}
          </h1>

          <p className="mt-4 text-base sm:text-lg text-[#68776E] leading-relaxed">
            {article.subtitle}
          </p>

          <div className="mt-8 rounded-3xl overflow-hidden border border-[#17251F]/10 bg-[#EFEADC] aspect-[16/9]">
            <ResilientImage
              src={article.coverImage}
              alt={article.coverAlt}
              loading="eager"
              className="w-full h-full object-cover"
              wrapperClassName="w-full h-full min-h-[260px]"
            />
          </div>
        </header>

        {/* محتوى المقال */}
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 mt-10 sm:mt-12 space-y-10">
          <p className="text-base sm:text-lg text-[#17251F] leading-[1.9] font-medium border-b border-[#17251F]/10 pb-8">
            {article.intro}
          </p>

          {article.sections.map((section) => (
            <section key={section.heading} className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-[#17251F]">
                {section.heading}
              </h2>

              {section.paragraphs.map((p, idx) => (
                <p
                  key={idx}
                  className="text-base text-[#17251F]/85 leading-[1.95]"
                >
                  {p}
                </p>
              ))}

              {section.bullets && section.bullets.length > 0 && (
                <ul className="rounded-2xl border border-[#17251F]/10 bg-[#FAF8F3] p-5 sm:p-6 divide-y divide-[#17251F]/8">
                  {section.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="py-3 first:pt-0 last:pb-0 flex items-start gap-3 text-sm sm:text-base text-[#17251F]"
                    >
                      <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#245745]/10 text-[#245745]">
                        <Check className="w-3.5 h-3.5" />
                      </span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              )}

              {section.note && (
                <div className="rounded-2xl bg-[#EFEADC]/70 border border-[#17251F]/10 p-5 text-sm sm:text-base text-[#17251F] leading-relaxed">
                  {section.note}
                </div>
              )}
            </section>
          ))}

          {/* الخاتمة */}
          <div className="rounded-3xl bg-[#EFEADC] border border-[#17251F]/10 p-6 sm:p-8">
            <p className="text-xs font-semibold text-[#245745] mb-2">خلاصة نقاء</p>
            <p className="text-base sm:text-lg font-medium text-[#17251F] leading-relaxed">
              {article.closingNote}
            </p>
          </div>

          {/* خدمة مرتبطة بالمقال */}
          {relatedService && (
            <div className="pt-4 space-y-4">
              <h2 className="text-lg font-bold text-[#17251F]">خدمة مرتبطة بهذا المقال</h2>
              <ServiceCard service={relatedService} featured />
            </div>
          )}

          {/* العودة إلى صفحة المقالات */}
          <div className="pt-6 border-t border-[#17251F]/10">
            <Link
              href="/articles"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#245745] hover:text-[#17251F] transition-colors"
            >
              <ArrowRight className="w-4 h-4" />
              <span>العودة إلى صفحة المقالات</span>
            </Link>
          </div>
        </div>
      </article>

      <InlineQuoteSection />
    </div>
  );
};
