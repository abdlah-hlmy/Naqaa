'use client';

import React, { useState } from 'react';
import { MapPin, Search, ShieldCheck } from 'lucide-react';
import { useSiteData } from '../context/SiteDataContext';
import { useQuoteModal } from '../context/QuoteModalContext';
import { PageHero } from '../components/PageHero';
import { LocationCard } from '../components/LocationCard';
import { CtaSection } from '../components/CtaSection';

export const LocationsView: React.FC = () => {
  const { locations: locationsData } = useSiteData();
  const { openQuoteModal } = useQuoteModal();
  const [filter, setFilter] = useState<'all' | 'active' | 'expanding'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const riyadh = locationsData.find((c) => c.slug === 'riyadh');

  const filteredCities = locationsData.filter((city) => {
    const matchesStatus = filter === 'all' || city.coverageStatus === filter;
    const matchesQuery =
      !searchQuery.trim() ||
      city.name.includes(searchQuery.trim()) ||
      city.region.includes(searchQuery.trim());
    return matchesStatus && matchesQuery;
  });

  return (
    <div className="bg-[#FAF8F3]">
      <PageHero
        breadcrumbs={[{ label: 'مناطق التغطية' }]}
        kicker="نطاق الخدمة في المملكة"
        title="نوصلك وين ما كنت"
        description="نلتزم بالشفافية في توضيح نطاق التغطية الفعلي؛ نبدأ بتغطية نشطة في أحياء مختارة بالرياض، ونستقبل طلبات المدن الرئيسية للتحقق من توفر الموعد في حيك قبل التأكيد."
      />

      <section className="py-14 sm:py-18">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-10">
          {/* بطاقة الرياض النشطة */}
          {riyadh && (
            <div className="rounded-3xl border border-[#245745]/25 bg-[#EFEADC]/65 p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="max-w-2xl">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#245745] mb-2">
                  <MapPin className="w-4 h-4" />
                  <span>تغطية نشطة ومفعّلة · الرياض</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#17251F]">
                  الأحياء المخدومة حالياً في الرياض
                </h2>
                <p className="mt-2 text-sm text-[#68776E] leading-relaxed">
                  يمكنك طلب الخدمة مباشرة في الأحياء التالية، مع إمكانية الاستفسار عن الأحياء المجاورة لها:
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {riyadh.neighborhoods.map((district) => (
                    <button
                      key={district}
                      type="button"
                      onClick={() => openQuoteModal({ city: 'الرياض' })}
                      className="rounded-xl border border-[#17251F]/15 bg-[#FAF8F3] px-4 py-2 text-sm font-medium text-[#17251F] hover:bg-[#245745] hover:text-[#FAF8F3] hover:border-[#245745] transition-colors cursor-pointer"
                    >
                      {district}
                    </button>
                  ))}
                </div>
              </div>

              <div className="shrink-0">
                <button
                  type="button"
                  onClick={() => openQuoteModal({ city: 'الرياض' })}
                  className="inline-flex items-center justify-center rounded-full bg-[#245745] px-7 py-3.5 text-sm font-semibold text-[#FAF8F3] hover:bg-[#17251F] transition-colors cursor-pointer"
                >
                  اطلب عرض سعر في الرياض
                </button>
              </div>
            </div>
          )}

          {/* أدوات البحث والفلترة */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#17251F]/10">
            <div className="relative w-full md:max-w-sm">
              <Search className="w-4 h-4 text-[#68776E] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث باسم المدينة أو المنطقة..."
                className="w-full rounded-xl border border-[#17251F]/15 bg-[#FAF8F3] pr-10 pl-4 py-2.5 text-sm text-[#17251F] placeholder:text-[#68776E] focus:outline-none focus:border-[#245745]"
              />
            </div>

            <div className="inline-flex items-center gap-1 p-1 rounded-xl bg-[#EFEADC] border border-[#17251F]/10 self-start">
              <button
                type="button"
                onClick={() => setFilter('all')}
                className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  filter === 'all' ? 'bg-[#245745] text-[#FAF8F3]' : 'text-[#17251F]'
                }`}
              >
                الكل ({locationsData.length})
              </button>
              <button
                type="button"
                onClick={() => setFilter('active')}
                className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  filter === 'active' ? 'bg-[#245745] text-[#FAF8F3]' : 'text-[#17251F]'
                }`}
              >
                تغطية نشطة
              </button>
              <button
                type="button"
                onClick={() => setFilter('expanding')}
                className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  filter === 'expanding' ? 'bg-[#245745] text-[#FAF8F3]' : 'text-[#17251F]'
                }`}
              >
                حسب التوفر
              </button>
            </div>
          </div>

          {/* شبكة المدن */}
          {filteredCities.length === 0 ? (
            <div className="rounded-2xl border border-[#17251F]/10 bg-[#EFEADC]/45 p-8 text-center">
              <p className="text-base font-medium text-[#17251F]">
                لم نجد مدينة مطابقة لبحثك.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setFilter('all');
                }}
                className="mt-3 text-sm font-semibold text-[#245745] underline underline-offset-4 cursor-pointer"
              >
                عرض جميع المدن
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {filteredCities.map((city) => (
                <LocationCard key={city.slug} location={city} />
              ))}
            </div>
          )}

          {/* ملاحظة الشفافية */}
          <div className="rounded-2xl border border-[#17251F]/10 bg-[#FAF8F3] p-6 flex items-start gap-3.5">
            <ShieldCheck className="w-5 h-5 text-[#245745] shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-bold text-[#17251F]">
                كيف نؤكد تغطية حيك؟
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-[#68776E] leading-relaxed">
                لا نعلن عن تغطية حي غير متاح فعلياً. عند إرسال طلبك وذكر المدينة والحي، نتحقق مباشرة من توفر الفريق والموعد المناسب قبل اعتماد أي حجز.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CtaSection />
    </div>
  );
};
