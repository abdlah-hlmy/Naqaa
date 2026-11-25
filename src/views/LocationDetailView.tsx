'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowUpLeft, Check, MapPin, MessageCircle } from 'lucide-react';
import { useSiteData } from '../context/SiteDataContext';
import { useQuoteModal } from '../context/QuoteModalContext';
import { servicesData } from '../data/services';
import { workSteps } from '../data/siteConfig';
import { getDirectWhatsAppUrl } from '../lib/whatsapp';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { SectionHeading } from '../components/SectionHeading';
import { ServiceCard } from '../components/ServiceCard';
import { FaqAccordion } from '../components/FaqAccordion';
import { AnimatedReveal } from '../components/AnimatedReveal';
import { InlineQuoteSection } from '../sections/InlineQuoteSection';
import { NotFoundView } from './NotFoundView';

interface LocationDetailViewProps {
  slug: string;
}

export const LocationDetailView: React.FC<LocationDetailViewProps> = ({ slug }) => {
  const { locations: locationsData, siteConfig } = useSiteData();
  const { openQuoteModal } = useQuoteModal();
  const city = locationsData.find((c) => c.slug === slug);

  if (!city) {
    return <NotFoundView />;
  }

  const isActive = city.coverageStatus === 'active';
  const availableServices = servicesData.filter((s) =>
    city.availableServiceSlugs.includes(s.slug)
  );
  const otherCities = locationsData.filter((c) => c.slug !== city.slug);

  const cityFaqs = [
    ...city.localFaqs,
    {
      question: `كيف أطلب عرض سعر في ${city.name}؟`,
      answer: `اختر الخدمة المطلوبة وأدخل اسم الحي في نموذج الطلب أسفل الصفحة، وسنتحقق من التوفر ونزودك بعرض السعر قبل تأكيد الموعد.`,
    },
  ].map((f, idx) => ({
    id: `${city.slug}-faq-${idx}`,
    question: f.question,
    answer: f.answer,
  }));

  return (
    <div className="bg-[#FAF8F3]">
      {/* 1. Hero المدينة */}
      <section className="py-12 sm:py-16 bg-[#EFEADC]/45 border-b border-[#17251F]/8">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: 'مناطق التغطية', href: '/locations' },
              { label: city.name },
            ]}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8">
              <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-[#245745] mb-3">
                <MapPin className="w-4 h-4" />
                <span>{city.region}</span>
                <span aria-hidden="true">·</span>
                <span>{city.coverageLabel}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#17251F] leading-snug">
                خدمات نقاء في {city.name}
              </h1>

              <p className="mt-4 text-base sm:text-lg text-[#68776E] leading-relaxed max-w-2xl">
                {city.localDescription}
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-3.5">
                <button
                  type="button"
                  onClick={() => openQuoteModal({ city: city.name })}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#245745] px-7 py-3.5 text-sm font-semibold text-[#FAF8F3] hover:bg-[#17251F] transition-colors cursor-pointer"
                >
                  <span>اطلب عرض سعر في {city.name}</span>
                  <ArrowUpLeft className="w-4 h-4" />
                </button>

                <a
                  href={getDirectWhatsAppUrl(
                    `السلام عليكم، أرغب بالاستفسار عن تغطية خدمات نقاء في مدينة ${city.name}.`,
                    siteConfig.whatsappNumber
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[#17251F]/20 px-6 py-3.5 text-sm font-medium text-[#17251F] hover:bg-[#FAF8F3] transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-[#245745]" />
                  <span>كلّمنا واتساب</span>
                </a>
              </div>
            </div>

            {/* بطاقة التركيز المحلي للمدينة */}
            <div className="lg:col-span-4 rounded-3xl border border-[#17251F]/10 bg-[#FAF8F3] p-6">
              <h2 className="text-base font-bold text-[#17251F] mb-4">
                {city.localFocusTitle}
              </h2>
              <ul className="space-y-3">
                {city.localFocusPoints.map((point) => (
                  <li key={point} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#68776E] leading-relaxed">
                    <Check className="w-4 h-4 text-[#245745] shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 2. الأحياء المغطاة أو التحقق من التوفر */}
      <section className="py-12 sm:py-16 border-b border-[#17251F]/8">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {city.neighborhoods.length > 0 ? (
            <AnimatedReveal className="rounded-3xl border border-[#245745]/25 bg-[#EFEADC]/50 p-6 sm:p-8">
              <p className="text-xs font-semibold text-[#245745] mb-1">الأحياء المخدومة</p>
              <h2 className="text-2xl font-bold text-[#17251F] mb-3">
                الأحياء المؤكدة التغطية في {city.name}
              </h2>
              <p className="text-sm text-[#68776E] mb-5">
                اختر حيك أو أرسل طلبك لأي حي قريب للتحقق الفوري من توفر الموعد:
              </p>
              <div className="flex flex-wrap gap-2.5">
                {city.neighborhoods.map((district) => (
                  <button
                    key={district}
                    type="button"
                    onClick={() => openQuoteModal({ city: city.name })}
                    className="rounded-xl border border-[#17251F]/15 bg-[#FAF8F3] px-4 py-2.5 text-sm font-semibold text-[#17251F] hover:bg-[#245745] hover:text-[#FAF8F3] hover:border-[#245745] transition-colors cursor-pointer"
                  >
                    {district}
                  </button>
                ))}
              </div>
            </AnimatedReveal>
          ) : (
            <AnimatedReveal className="rounded-3xl border border-[#17251F]/10 bg-[#EFEADC]/40 p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
              <div>
                <p className="text-xs font-semibold text-[#245745] mb-1">
                  حالة التغطية في {city.name}: {isActive ? 'نشطة' : 'حسب التوفر'}
                </p>
                <h2 className="text-xl font-bold text-[#17251F]">
                  التحقق من تغطية الأحياء في {city.name}
                </h2>
                <p className="mt-1.5 text-sm text-[#68776E] max-w-2xl">
                  يتم تأكيد تغطية الحي وتوفر الفريق في {city.name} عند مراجعة طلبك وقبل اعتماد أي موعد، دون إدراج أحياء غير مؤكدة.
                </p>
              </div>
              <button
                type="button"
                onClick={() => openQuoteModal({ city: city.name })}
                className="inline-flex items-center justify-center rounded-full bg-[#245745] px-6 py-3 text-sm font-semibold text-[#FAF8F3] hover:bg-[#17251F] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                تحقق من تغطية حيك
              </button>
            </AnimatedReveal>
          )}
        </div>
      </section>

      {/* 3. الخدمات المتاحة في المدينة */}
      <section className="py-14 sm:py-18">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            kicker={`خدمات نقاء في ${city.name}`}
            title="الخدمات المتاحة للطلب"
            description="تُنفذ كل خدمة وفق تفاصيل واضحة ومواد مخصصة لأسطح المنزل والمفروشات."
            className="mb-10"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {availableServices.map((srv) => (
              <ServiceCard key={srv.id} service={srv} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. آلية العمل في المدينة */}
      <section className="py-14 sm:py-16 bg-[#EFEADC]/45 border-y border-[#17251F]/8">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            kicker="خطوات التنسيق"
            title={`كيف نرتب خدمتك في ${city.name}؟`}
            className="mb-8"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {workSteps.map((step) => (
              <div
                key={step.number}
                className="rounded-2xl border border-[#17251F]/10 bg-[#FAF8F3] p-6"
              >
                <span className="text-2xl font-bold text-[#245745]/30 tabular-nums block mb-2">
                  {step.number}
                </span>
                <h3 className="text-base font-bold text-[#17251F] mb-1.5">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#68776E] leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. الأسئلة الشائعة + مدن أخرى */}
      <section className="py-14 sm:py-18">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-7">
              <SectionHeading
                kicker="أسئلة محلية"
                title={`أسئلة شائعة عن الخدمة في ${city.name}`}
                className="mb-6"
              />
              <FaqAccordion items={cityFaqs} defaultOpenIndex={0} />
            </div>

            <div className="lg:col-span-5">
              <SectionHeading
                kicker="مناطق أخرى"
                title="مدن أخرى في المملكة"
                className="mb-6"
              />
              <div className="grid grid-cols-2 gap-3">
                {otherCities.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/locations/${c.slug}`}
                    className="rounded-xl border border-[#17251F]/10 bg-[#FAF8F3] p-3.5 hover:border-[#245745]/45 transition-colors flex items-center justify-between"
                  >
                    <span className="text-sm font-semibold text-[#17251F]">{c.name}</span>
                    <ArrowLeft className="w-3.5 h-3.5 text-[#245745]" />
                  </Link>
                ))}
              </div>
              <div className="mt-4">
                <Link
                  href="/locations"
                  className="text-sm font-semibold text-[#245745] hover:underline underline-offset-4"
                >
                  عرض جميع المدن ←
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. نموذج عرض سعر مخصص للمدينة */}
      <InlineQuoteSection defaultCity={city.name} />
    </div>
  );
};
