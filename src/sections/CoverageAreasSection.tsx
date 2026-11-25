'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, MapPin } from 'lucide-react';
import { useSiteData } from '../context/SiteDataContext';
import { useQuoteModal } from '../context/QuoteModalContext';
import { SectionHeading } from '../components/SectionHeading';
import { AnimatedReveal } from '../components/AnimatedReveal';

interface CoverageAreasSectionProps {
  onSelectCityQuote?: (cityName: string) => void;
}

export const CoverageAreasSection: React.FC<CoverageAreasSectionProps> = ({
  onSelectCityQuote,
}) => {
  const { locations: locationsData } = useSiteData();
  const { openQuoteModal } = useQuoteModal();
  const handleCityQuote =
    onSelectCityQuote || ((cityName: string) => openQuoteModal({ city: cityName }));
  const [filter, setFilter] = useState<'all' | 'active' | 'expanding'>('all');

  const riyadh = locationsData.find((c) => c.slug === 'riyadh');

  const filteredCities = locationsData.filter((city) => {
    if (filter === 'all') return true;
    return city.coverageStatus === filter;
  });

  return (
    <section
      id="locations"
      className="py-16 sm:py-22 bg-[#EFEADC]/45 border-y border-[#17251F]/8"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
          <SectionHeading
            kicker="مناطق التغطية"
            title="نوصلك وين ما كنت"
            description="نبدأ بخدمة أحياء محددة في الرياض، ونستقبل طلبات أهم مدن المملكة للتحقق من توفر الزيارات قبل تأكيد الموعد."
          />

          <div className="inline-flex items-center gap-1 p-1 rounded-xl bg-[#EFEADC] border border-[#17251F]/10 self-start">
            <button
              type="button"
              onClick={() => setFilter('all')}
              className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                filter === 'all'
                  ? 'bg-[#245745] text-[#FAF8F3]'
                  : 'text-[#17251F] hover:bg-[#FAF8F3]/70'
              }`}
            >
              جميع المدن ({locationsData.length})
            </button>
            <button
              type="button"
              onClick={() => setFilter('active')}
              className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                filter === 'active'
                  ? 'bg-[#245745] text-[#FAF8F3]'
                  : 'text-[#17251F] hover:bg-[#FAF8F3]/70'
              }`}
            >
              تغطية نشطة
            </button>
            <button
              type="button"
              onClick={() => setFilter('expanding')}
              className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                filter === 'expanding'
                  ? 'bg-[#245745] text-[#FAF8F3]'
                  : 'text-[#17251F] hover:bg-[#FAF8F3]/70'
              }`}
            >
              حسب التوفر
            </button>
          </div>
        </div>

        {/* إبراز أحياء الرياض المؤكدة */}
        {riyadh && riyadh.neighborhoods.length > 0 && (
          <AnimatedReveal className="mb-8 rounded-2xl border border-[#245745]/25 bg-[#FAF8F3] p-6 sm:p-7">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-[#245745] mb-1.5">
                  <MapPin className="w-4 h-4" />
                  <span>التغطية النشطة حالياً · الرياض</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-[#17251F]">
                  الأحياء المخدومة في مدينة الرياض
                </h3>
                <p className="mt-1 text-sm text-[#68776E]">
                  تستقبل نقاء طلبات الحجز المباشر في الأحياء التالية، مع إمكانية التحقق من الأحياء المجاورة:
                </p>
              </div>

              <Link
                href="/locations/riyadh"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#245745] hover:text-[#17251F] whitespace-nowrap shrink-0"
              >
                <span>صفحة تغطية الرياض</span>
                <ArrowLeft className="w-4 h-4" />
              </Link>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-2.5">
              {riyadh.neighborhoods.map((district) => (
                <button
                  key={district}
                  type="button"
                  onClick={() => handleCityQuote('الرياض')}
                  className="rounded-xl border border-[#17251F]/15 bg-[#EFEADC]/55 px-4 py-2 text-sm font-medium text-[#17251F] hover:border-[#245745] hover:bg-[#245745] hover:text-[#FAF8F3] transition-colors cursor-pointer whitespace-nowrap shrink-0"
                >
                  {district}
                </button>
              ))}
            </div>
          </AnimatedReveal>
        )}

        {/* شبكة المدن (4 في كل صف) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredCities.map((city) => {
            const isActive = city.coverageStatus === 'active';
            return (
              <Link
                key={city.slug}
                href={`/locations/${city.slug}`}
                className={`group rounded-xl border p-4 transition-colors flex flex-col justify-between ${
                  isActive
                    ? 'border-[#245745]/40 bg-[#FAF8F3] hover:border-[#245745]'
                    : 'border-[#17251F]/10 bg-[#FAF8F3]/80 hover:border-[#245745]/40 hover:bg-[#FAF8F3]'
                }`}
              >
                <div>
                  <span className="block text-sm font-bold text-[#17251F] group-hover:text-[#245745] transition-colors">
                    {city.name}
                  </span>
                  <span
                    className={`mt-1 block text-[11px] ${
                      isActive ? 'text-[#245745] font-semibold' : 'text-[#68776E]'
                    }`}
                  >
                    {city.coverageLabel}
                  </span>
                </div>
                <div className="mt-3 flex items-center justify-end">
                  <ArrowLeft className="w-3.5 h-3.5 text-[#68776E] group-hover:text-[#245745] transition-transform duration-200 group-hover:-translate-x-0.5" />
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-8 flex items-center justify-between flex-wrap gap-4 text-xs text-[#68776E]">
          <p>
            لا يتم تأكيد أي موعد قبل التحقق الفعلي من نطاق تغطية الحي وتوفر الفريق.
          </p>
          <Link
            href="/locations"
            className="text-sm font-semibold text-[#245745] hover:text-[#17251F] inline-flex items-center gap-1.5"
          >
            <span>استكشف صفحة مناطق التغطية</span>
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};
