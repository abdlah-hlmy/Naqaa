'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpLeft, Check, MessageCircle, ShieldCheck } from 'lucide-react';
import { getServiceBySlug } from '../data/services';
import { useSiteData } from '../context/SiteDataContext';
import { useQuoteModal } from '../context/QuoteModalContext';
import { getDirectWhatsAppUrl } from '../lib/whatsapp';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { BeforeAfterSlider } from '../components/BeforeAfterSlider';
import { AnimatedReveal } from '../components/AnimatedReveal';
import { SectionHeading } from '../components/SectionHeading';
import { FaqAccordion } from '../components/FaqAccordion';
import { RelatedServices } from '../components/RelatedServices';
import { GuaranteeBanner } from '../components/GuaranteeBanner';
import { InlineQuoteSection } from '../sections/InlineQuoteSection';
import { NotFoundView } from './NotFoundView';

interface ServiceDetailViewProps {
  slug: string;
}

export const ServiceDetailView: React.FC<ServiceDetailViewProps> = ({ slug }) => {
  const { siteConfig } = useSiteData();
  const { openQuoteModal } = useQuoteModal();
  const service = getServiceBySlug(slug);

  if (!service) {
    return <NotFoundView />;
  }

  const faqItems = service.faqs.map((f, i) => ({
    id: `${service.slug}-faq-${i}`,
    question: f.question,
    answer: f.answer,
  }));

  return (
    <div className="bg-[#FAF8F3]">
      {/* 1. Hero خاص بالخدمة */}
      <section className="py-10 sm:py-16 bg-[#FAF8F3] border-b border-[#17251F]/8">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: 'خدماتنا', href: '/services' },
              { label: service.title },
            ]}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
            <div className="lg:col-span-6 flex flex-col justify-center">
              <span className="text-xs font-semibold text-[#245745] tabular-nums mb-2">
                {service.number} · خدمات نقاء
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#17251F] leading-snug">
                {service.heroTitle}
              </h1>
              <p className="mt-4 text-base sm:text-lg text-[#68776E] leading-relaxed">
                {service.fullDescription}
              </p>

              <div className="mt-6 rounded-2xl bg-[#EFEADC]/65 border border-[#17251F]/10 p-4 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-[#245745] shrink-0 mt-0.5" />
                <p className="text-xs sm:text-sm text-[#17251F]/90 leading-relaxed">
                  {service.careNote}
                </p>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-3.5">
                <button
                  type="button"
                  onClick={() => openQuoteModal({ service: service.title })}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#245745] px-7 py-3.5 text-sm font-semibold text-[#FAF8F3] hover:bg-[#17251F] transition-colors cursor-pointer"
                >
                  <span>اطلب عرض سعر</span>
                  <ArrowUpLeft className="w-4 h-4" />
                </button>

                <a
                  href={getDirectWhatsAppUrl(
                    `السلام عليكم، أرغب بالاستفسار عن خدمة ${service.title} من نقاء.`,
                    siteConfig.whatsappNumber
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[#17251F]/20 px-6 py-3.5 text-sm font-medium text-[#17251F] hover:bg-[#EFEADC] transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-[#245745]" />
                  <span>كلّمنا واتساب</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-6 flex items-stretch">
              <BeforeAfterSlider
                beforeImage={service.beforeImage}
                beforeAlt={service.beforeImageAlt}
                afterImage={service.image}
                afterAlt={service.imageAlt}
                initialPosition={48}
                className="w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. ما الذي تشمل عليه الخدمة؟ + الحالات المناسبة */}
      <section className="py-14 sm:py-20 bg-[#FAF8F3]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
            <AnimatedReveal className="lg:col-span-7 rounded-3xl border border-[#17251F]/10 bg-[#FAF8F3] p-6 sm:p-8">
              <p className="text-xs font-semibold text-[#245745] mb-2">نطاق التنفيذ</p>
              <h2 className="text-2xl font-bold text-[#17251F] mb-6">
                ما الذي تشمل عليه خدمة {service.title}؟
              </h2>
              <ul className="divide-y divide-[#17251F]/8">
                {service.includes.map((item) => (
                  <li key={item} className="flex items-start gap-3 py-3.5 text-sm sm:text-base text-[#17251F]">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#245745]/10 text-[#245745]">
                      <Check className="w-3.5 h-3.5" />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </AnimatedReveal>

            <AnimatedReveal
              delay={0.08}
              className="lg:col-span-5 rounded-3xl border border-[#17251F]/10 bg-[#EFEADC]/55 p-6 sm:p-8 flex flex-col justify-between"
            >
              <div>
                <p className="text-xs font-semibold text-[#245745] mb-2">متى تطلبها؟</p>
                <h2 className="text-2xl font-bold text-[#17251F] mb-6">
                  الحالات التي تحتاج فيها هذه الخدمة
                </h2>
                <ul className="space-y-4">
                  {service.whenNeeded.map((situation, idx) => (
                    <li
                      key={situation}
                      className="rounded-2xl bg-[#FAF8F3] border border-[#17251F]/8 p-4 flex items-start gap-3"
                    >
                      <span className="text-xs font-bold text-[#245745] tabular-nums pt-0.5">
                        0{idx + 1}
                      </span>
                      <span className="text-sm text-[#17251F] leading-relaxed">
                        {situation}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 pt-5 border-t border-[#17251F]/10 text-xs text-[#68776E]">
                تغطي الخدمة الأحياء المتاحة حالياً مع إمكانية التحقق الفوري عند الطلب.
              </div>
            </AnimatedReveal>
          </div>
        </div>
      </section>

      {/* 3. مراحل تنفيذ الخدمة */}
      <section className="py-14 sm:py-20 bg-[#EFEADC]/45 border-y border-[#17251F]/8">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            kicker="خطوات العمل"
            title={`مراحل تنفيذ ${service.title}`}
            description="خطوات مرتبة تحفظ نظافة المحيط وتضمن نتيجة واضحة من البداية للنهاية."
            className="mb-10"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {service.steps.map((step, idx) => (
              <AnimatedReveal
                key={step.title}
                delay={idx * 0.08}
                className="rounded-2xl border border-[#17251F]/10 bg-[#FAF8F3] p-6 sm:p-7"
              >
                <span className="block text-3xl font-bold text-[#245745]/25 tabular-nums mb-4">
                  0{idx + 1}
                </span>
                <h3 className="text-lg font-bold text-[#17251F] mb-2">{step.title}</h3>
                <p className="text-sm text-[#68776E] leading-relaxed">{step.detail}</p>
              </AnimatedReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 4. العوامل المؤثرة على السعر + الأسئلة الشائعة للخدمة */}
      <section className="py-14 sm:py-20 bg-[#FAF8F3]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-5">
              <SectionHeading
                kicker="التسعير"
                title="العوامل التي تؤثر على السعر"
                description="نعطيك السعر واضحاً قبل الموعد بناءً على:"
                className="mb-6"
              />
              <ul className="divide-y divide-[#17251F]/8 border-y border-[#17251F]/10 mb-6">
                {service.pricingFactors.map((factor, idx) => (
                  <li key={factor} className="py-3.5 flex items-center gap-3 text-sm sm:text-base text-[#17251F]">
                    <span className="text-xs font-bold text-[#245745] tabular-nums">
                      0{idx + 1}
                    </span>
                    <span>{factor}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/locations"
                className="text-sm font-semibold text-[#245745] hover:underline underline-offset-4"
              >
                تحقق من المدن والأحياء المغطاة ←
              </Link>
            </div>

            <div className="lg:col-span-7">
              <SectionHeading
                kicker="استفسارات الخدمة"
                title={`أسئلة شائعة حول ${service.title}`}
                className="mb-6"
              />
              <FaqAccordion items={faqItems} defaultOpenIndex={0} />
            </div>
          </div>

          <GuaranteeBanner compact className="mt-12" />
        </div>
      </section>

      {/* 5. خدمات أخرى ذات صلة */}
      <RelatedServices currentSlug={service.slug} />

      {/* 6. نموذج طلب عرض سعر مخصص للخدمة */}
      <InlineQuoteSection defaultService={service.title} />
    </div>
  );
};
