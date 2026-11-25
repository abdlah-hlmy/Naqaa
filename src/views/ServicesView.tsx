'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowUpLeft, Check, Clock } from 'lucide-react';
import { servicesData } from '../data/services';
import { calculatePriceEstimate } from '../lib/pricingEstimate';
import { useQuoteModal } from '../context/QuoteModalContext';
import { PageHero } from '../components/PageHero';
import { ServiceCard } from '../components/ServiceCard';
import { SectionHeading } from '../components/SectionHeading';
import { ScopeIncludesSection } from '../sections/ScopeIncludesSection';
import { PricingFactorsSection } from '../sections/PricingFactorsSection';
import { CtaSection } from '../components/CtaSection';

export const ServicesView: React.FC = () => {
  const { openQuoteModal } = useQuoteModal();

  return (
    <div className="bg-[#FAF8F3]">
      <PageHero
        breadcrumbs={[{ label: 'خدماتنا' }]}
        kicker="خدمات نقاء"
        title="خدمات تنظيف مصممة لراحة المكان"
        description="نقدم أربع خدمات رئيسية تغطي احتياجات المنزل اليومية والموسمية، مع توضيح كامل لما تشمله كل خدمة وسعر معروف قبل البدء."
        actions={
          <button
            type="button"
            onClick={() => openQuoteModal()}
            className="inline-flex items-center justify-center rounded-full bg-[#245745] px-7 py-3.5 text-sm font-semibold text-[#FAF8F3] hover:bg-[#17251F] transition-colors cursor-pointer"
          >
            اطلب عرض سعر
          </button>
        }
      />

      {/* شبكة الخدمات الكاملة */}
      <section className="py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-6">
          <ServiceCard service={servicesData[0]} featured />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {servicesData.slice(1).map((srv) => (
              <ServiceCard key={srv.id} service={srv} />
            ))}
          </div>
        </div>
      </section>

      {/* مقارنة سريعة بين الخدمات الأربع */}
      <section className="py-14 sm:py-18 bg-[#EFEADC]/45 border-y border-[#17251F]/8">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            kicker="اختر بوضوح"
            title="مقارنة سريعة بين الخدمات"
            description="نظرة مختصرة توضح لمن تناسب كل خدمة، والمدة والنطاق السعري المبدئي قبل أن تقرر."
            className="mb-10"
          />

          {/* جدول متكامل للشاشات المتوسطة والكبيرة */}
          <div className="hidden md:block overflow-hidden rounded-3xl border border-[#17251F]/12 bg-[#FAF8F3]">
            <table className="w-full text-start border-collapse">
              <thead>
                <tr className="border-b border-[#17251F]/10 bg-[#EFEADC]/55 text-xs font-bold text-[#17251F]">
                  <th className="py-4 px-5 text-start">الخدمة</th>
                  <th className="py-4 px-5 text-start">الأنسب لك عندما...</th>
                  <th className="py-4 px-5 text-start">أبرز ما تشمله</th>
                  <th className="py-4 px-5 text-start">المدة المتوقعة</th>
                  <th className="py-4 px-5 text-start">النطاق المبدئي (حجم متوسط)</th>
                  <th className="py-4 px-5 text-start">إجراء</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#17251F]/8 text-sm">
                {servicesData.map((srv) => {
                  const est = calculatePriceEstimate(srv.title, 'medium');
                  return (
                    <tr
                      key={srv.id}
                      className="hover:bg-[#EFEADC]/25 transition-colors align-top"
                    >
                      <td className="py-5 px-5 font-bold text-[#17251F] whitespace-nowrap">
                        <span className="block text-[11px] font-semibold text-[#245745] tabular-nums mb-0.5">
                          {srv.number}
                        </span>
                        <Link
                          href={`/services/${srv.slug}`}
                          className="hover:text-[#245745] transition-colors"
                        >
                          {srv.title}
                        </Link>
                      </td>
                      <td className="py-5 px-5 text-xs sm:text-sm text-[#68776E] leading-relaxed max-w-xs">
                        {srv.whenNeeded[0]}
                      </td>
                      <td className="py-5 px-5 text-xs text-[#17251F]">
                        <ul className="space-y-1.5">
                          {srv.includes.slice(0, 2).map((item) => (
                            <li key={item} className="flex items-start gap-1.5">
                              <Check className="w-3.5 h-3.5 text-[#245745] shrink-0 mt-0.5" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </td>
                      <td className="py-5 px-5 whitespace-nowrap text-xs sm:text-sm text-[#17251F] tabular-nums">
                        <span className="inline-flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-[#245745]" />
                          <span>{est.durationLabel}</span>
                        </span>
                      </td>
                      <td className="py-5 px-5 whitespace-nowrap font-bold text-[#245745] tabular-nums">
                        {est.minPrice} – {est.maxPrice} ر.س
                      </td>
                      <td className="py-5 px-5 whitespace-nowrap">
                        <div className="flex flex-col items-start gap-2">
                          <button
                            type="button"
                            onClick={() => openQuoteModal({ service: srv.title })}
                            className="inline-flex items-center gap-1 rounded-full bg-[#245745] px-4 py-1.5 text-xs font-semibold text-[#FAF8F3] hover:bg-[#17251F] transition-colors cursor-pointer"
                          >
                            <span>اطلب عرضاً</span>
                            <ArrowUpLeft className="w-3.5 h-3.5" />
                          </button>
                          <Link
                            href={`/services/${srv.slug}`}
                            className="inline-flex items-center gap-1 text-xs font-medium text-[#245745] hover:underline"
                          >
                            <span>التفاصيل</span>
                            <ArrowLeft className="w-3 h-3" />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* بطاقات مقارنة مريحة لشاشات الهاتف */}
          <div className="md:hidden space-y-4">
            {servicesData.map((srv) => {
              const est = calculatePriceEstimate(srv.title, 'medium');
              return (
                <div
                  key={srv.id}
                  className="rounded-2xl border border-[#17251F]/10 bg-[#FAF8F3] p-5 space-y-3.5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="text-[11px] font-semibold text-[#245745] tabular-nums">
                        {srv.number}
                      </span>
                      <h3 className="text-base font-bold text-[#17251F]">{srv.title}</h3>
                    </div>
                    <span className="text-sm font-bold text-[#245745] tabular-nums shrink-0">
                      {est.minPrice} – {est.maxPrice} ر.س
                    </span>
                  </div>

                  <p className="text-xs text-[#68776E] leading-relaxed">{srv.whenNeeded[0]}</p>

                  <div className="flex items-center justify-between pt-3 border-t border-[#17251F]/8 text-xs">
                    <span className="inline-flex items-center gap-1 text-[#17251F] tabular-nums">
                      <Clock className="w-3.5 h-3.5 text-[#245745]" />
                      <span>{est.durationLabel}</span>
                    </span>
                    <div className="flex items-center gap-3">
                      <Link
                        href={`/services/${srv.slug}`}
                        className="font-semibold text-[#245745]"
                      >
                        التفاصيل
                      </Link>
                      <button
                        type="button"
                        onClick={() => openQuoteModal({ service: srv.title })}
                        className="rounded-full bg-[#245745] px-3.5 py-1.5 font-semibold text-[#FAF8F3] cursor-pointer"
                      >
                        اطلب عرضاً
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <p className="mt-4 text-xs text-[#68776E]">
            الأسعار والمدد أعلاه تقدير مبدئي لحجم متوسط، ويمكنك احتساب المساحة الصغيرة أو الكبيرة بدقة داخل نموذج الطلب.
          </p>
        </div>
      </section>

      <ScopeIncludesSection />
      <PricingFactorsSection />
      <CtaSection />
    </div>
  );
};
