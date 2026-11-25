'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useSiteData } from '../context/SiteDataContext';
import { servicesData } from '../data/services';
import { PageHero } from '../components/PageHero';
import { ArticleCard } from '../components/ArticleCard';
import { SectionHeading } from '../components/SectionHeading';
import { CtaSection } from '../components/CtaSection';

export const ArticlesView: React.FC = () => {
  const { articles: articlesData } = useSiteData();
  const [featured, ...rest] = articlesData;

  return (
    <div className="bg-[#FAF8F3]">
      <PageHero
        breadcrumbs={[{ label: 'المقالات' }]}
        kicker="مدونة نقاء"
        title="مقالات ونبذ عملية للعناية بالمكان"
        description="محتوى هادئ ومباشر يجمع خلاصة الممارسات الصحيحة للحفاظ على نظافة البيت، الأسطح الطبيعية، والمكيفات."
      />

      {/* المقال الرئيسي وبقية المقالات */}
      <section className="py-14 sm:py-18">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-8">
          {featured && <ArticleCard article={featured} featured />}

          {rest.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rest.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* روابط سريعة لأدلة الخدمات */}
      <section className="py-14 sm:py-16 bg-[#EFEADC]/45 border-t border-[#17251F]/8">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            kicker="تفاصيل الخدمات"
            title="استكشف أدلة خدمات نقاء"
            description="إذا كنت تبحث عن تفاصيل تنفيذ خدمة معينة، تصفح صفحة الخدمة مباشرة."
            className="mb-8"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {servicesData.map((srv) => (
              <Link
                key={srv.id}
                href={`/services/${srv.slug}`}
                className="group rounded-2xl border border-[#17251F]/10 bg-[#FAF8F3] p-5 hover:border-[#245745]/40 transition-colors flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-semibold text-[#245745] tabular-nums">
                    {srv.number}
                  </span>
                  <h3 className="mt-1.5 text-base font-bold text-[#17251F] group-hover:text-[#245745] transition-colors">
                    {srv.title}
                  </h3>
                  <p className="mt-1.5 text-xs text-[#68776E] leading-relaxed">
                    {srv.shortDescription}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#17251F]/8 flex items-center justify-between text-xs font-semibold text-[#245745]">
                  <span>تفاصيل الخدمة</span>
                  <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaSection />
    </div>
  );
};
