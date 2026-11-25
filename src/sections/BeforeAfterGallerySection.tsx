'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Droplets, Layers, Shield, Sparkles } from 'lucide-react';
import { servicesData } from '../data/services';
import { useQuoteModal } from '../context/QuoteModalContext';
import { BeforeAfterSlider } from '../components/BeforeAfterSlider';
import { SectionHeading } from '../components/SectionHeading';

const showcaseSlugs = [
  'home-cleaning',
  'ac-cleaning',
  'sofa-carpet-cleaning',
];

const careDetails = [
  {
    id: 'towels',
    icon: Layers,
    title: 'مناشف مخصصة لكل منطقة',
    detail: 'فصل تام لأدوات ومناشف الحمامات عن المطبخ وغرف المعيشة لمنع انتقال أي أثر.',
  },
  {
    id: 'cover',
    icon: Shield,
    title: 'حماية الجدران والأثاث',
    detail: 'تغليف عازل حول المكيفات وأرجل الأثاث القريب قبل الغسيل لضمان جفاف المحيط بالكامل.',
  },
  {
    id: 'safe-materials',
    icon: Droplets,
    title: 'مواد لطيفة على الحجر والنسيج',
    detail: 'اختيار منظفات متوازنة تناسب الرخام الطبيعي والباركيه والأقمشة الفاتحة دون بهتان.',
  },
];

export const BeforeAfterGallerySection: React.FC = () => {
  const { openQuoteModal } = useQuoteModal();
  const showcaseServices = showcaseSlugs
    .map((slug) => servicesData.find((s) => s.slug === slug))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  const [selectedSlug, setSelectedSlug] = useState<string>(
    showcaseServices[0]?.slug || 'home-cleaning'
  );

  const activeService =
    showcaseServices.find((s) => s.slug === selectedSlug) || showcaseServices[0];

  if (!activeService) return null;

  return (
    <section className="py-16 sm:py-22 bg-[#FAF8F3] border-b border-[#17251F]/8">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <SectionHeading
            kicker="النتيجة أمامك"
            title="فرق واضح قبل التنظيف وبعده"
            description="اسحب الشريط لمعاينة مستوى العناية في خدماتنا الأساسية قبل طلب الموعد."
          />

          <div
            className="grid grid-cols-3 sm:inline-flex items-center gap-1 rounded-2xl bg-[#EFEADC] p-1.5 border border-[#17251F]/10 w-full sm:w-auto"
            role="tablist"
            aria-label="اختيار الخدمة لمعاينة النتيجة"
          >
            {showcaseServices.map((srv) => {
              const active = srv.slug === activeService.slug;
              const mobileLabel =
                srv.slug === 'sofa-carpet-cleaning' ? 'كنب وسجاد' : srv.title;
              return (
                <button
                  key={srv.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setSelectedSlug(srv.slug)}
                  className={`rounded-xl px-2 sm:px-4 py-2.5 text-[11px] sm:text-sm font-semibold transition-colors whitespace-nowrap text-center cursor-pointer ${
                    active
                      ? 'bg-[#245745] text-[#FAF8F3] shadow-xs'
                      : 'text-[#17251F] hover:bg-[#FAF8F3]/70'
                  }`}
                >
                  <span className="sm:hidden">{mobileLabel}</span>
                  <span className="hidden sm:inline">{srv.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* العارض التفاعلي قبل وبعد */}
          <div className="lg:col-span-7 flex flex-col">
            <BeforeAfterSlider
              key={activeService.slug}
              beforeImage={activeService.beforeImage}
              beforeAlt={activeService.beforeImageAlt}
              afterImage={activeService.image}
              afterAlt={activeService.imageAlt}
              initialPosition={48}
              className="w-full h-full"
            />
          </div>

          {/* تفاصيل العناية المرتبطة بالخدمة المختارة */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-5">
            <div className="rounded-3xl border border-[#17251F]/10 bg-[#EFEADC]/55 p-6 sm:p-7 space-y-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#245745]">
                <Sparkles className="w-4 h-4" />
                <span>{activeService.shortTitle}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#17251F] leading-snug">
                {activeService.heroTitle}
              </h3>
              <p className="text-sm text-[#68776E] leading-relaxed">
                {activeService.careNote}
              </p>

              <div className="pt-3 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => openQuoteModal({ service: activeService.title })}
                  className="inline-flex items-center justify-center rounded-full bg-[#245745] px-5 py-2.5 text-xs sm:text-sm font-semibold text-[#FAF8F3] hover:bg-[#17251F] transition-colors cursor-pointer"
                >
                  اطلب هذه الخدمة
                </button>
                <Link
                  href={`/services/${activeService.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#245745] hover:text-[#17251F] transition-colors"
                >
                  <span>تفاصيل النطاق والأسئلة</span>
                  <ArrowLeft className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* شريط العناية بالتفاصيل الدقيقة */}
            <div className="rounded-3xl border border-[#17251F]/10 bg-[#FAF8F3] p-5 sm:p-6 space-y-4">
              <p className="text-xs font-semibold text-[#245745]">
                عناية بالتفاصيل الدقيقة في كل زيارة
              </p>
              <div className="space-y-3.5">
                {careDetails.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.id} className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#EFEADC] text-[#245745]">
                        <Icon className="w-4 h-4" />
                      </span>
                      <div>
                        <h4 className="text-sm font-bold text-[#17251F]">{item.title}</h4>
                        <p className="text-xs text-[#68776E] leading-relaxed mt-0.5">
                          {item.detail}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
