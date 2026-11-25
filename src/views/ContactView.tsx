'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { homeFaqs } from '../data/faqs';
import { PageHero } from '../components/PageHero';
import { QuoteRequestForm } from '../components/QuoteRequestForm';
import { ContactInformation } from '../components/ContactInformation';
import { FaqAccordion } from '../components/FaqAccordion';
import { SectionHeading } from '../components/SectionHeading';

export const ContactView: React.FC = () => {
  return (
    <div className="bg-[#FAF8F3]">
      <PageHero
        breadcrumbs={[{ label: 'تواصل معنا' }]}
        kicker="نحن هنا لخدمتك"
        title="تواصل معنا واطلب عرض سعرك"
        description="املأ بيانات منزلك والخدمة المطلوبة في النموذج أدناه، أو تواصل معنا مباشرة عبر واتساب لتأكيد تغطية الحي وترتيب الموعد."
      />

      <section className="py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* نموذج التواصل وطلب عرض السعر */}
            <div className="lg:col-span-7 rounded-3xl border border-[#17251F]/10 bg-[#EFEADC]/55 p-6 sm:p-8 lg:p-9">
              <div className="pb-5 mb-6 border-b border-[#17251F]/10">
                <h2 className="text-xl sm:text-2xl font-bold text-[#17251F]">
                  نموذج التواصل وطلب عرض السعر
                </h2>
                <p className="text-sm text-[#68776E] mt-1">
                  نراجع تفاصيل طلبك ونجهز لك رسالة واضحة لإرسالها مباشرة دون تعقيد.
                </p>
              </div>
              <QuoteRequestForm />
            </div>

            {/* معلومات التواصل */}
            <div className="lg:col-span-5 space-y-6">
              <ContactInformation />

              <div className="rounded-3xl border border-[#17251F]/10 bg-[#FAF8F3] p-6 space-y-4">
                <div>
                  <span className="text-xs font-semibold text-[#245745] block mb-1">
                    الخطوات التالية
                  </span>
                  <h3 className="text-base font-bold text-[#17251F]">
                    ماذا يحدث بعد إرسال الطلب؟
                  </h3>
                </div>
                <ol className="space-y-3 text-xs sm:text-sm text-[#68776E]">
                  <li className="flex items-start gap-2.5">
                    <span className="text-xs font-bold text-[#245745] tabular-nums pt-0.5">01</span>
                    <span>تجهيز تفاصيل طلبك والخدمة والتقدير المبدئي في رسالة منظمة.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-xs font-bold text-[#245745] tabular-nums pt-0.5">02</span>
                    <span>التحقق السريع من تغطية الحي واقتراح المواعيد المتاحة.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-xs font-bold text-[#245745] tabular-nums pt-0.5">03</span>
                    <span>تأكيد السعر النهائي بوضوح قبل اعتماد الموعد أو بدء التنفيذ.</span>
                  </li>
                </ol>
              </div>

              <div className="rounded-3xl border border-[#17251F]/10 bg-[#FAF8F3] p-6 space-y-3">
                <h3 className="text-base font-bold text-[#17251F]">
                  روابط سريعة قبل الحجز
                </h3>
                <div className="divide-y divide-[#17251F]/8 text-sm">
                  <Link
                    href="/services"
                    className="py-2.5 flex items-center justify-between text-[#17251F] hover:text-[#245745] transition-colors"
                  >
                    <span>تصفح تفاصيل الخدمات الأربع</span>
                    <ArrowLeft className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/locations"
                    className="py-2.5 flex items-center justify-between text-[#17251F] hover:text-[#245745] transition-colors"
                  >
                    <span>التحقق من المدن والأحياء المخدومة</span>
                    <ArrowLeft className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/about"
                    className="py-2.5 flex items-center justify-between text-[#17251F] hover:text-[#245745] transition-colors"
                  >
                    <span>تعرف على أسلوب عمل نقاء</span>
                    <ArrowLeft className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* أسئلة سريعة */}
      <section className="py-14 sm:py-18 bg-[#EFEADC]/45 border-t border-[#17251F]/8">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            align="center"
            kicker="قبل التواصل"
            title="أسئلة شائعة"
            className="mb-8"
          />
          <FaqAccordion items={homeFaqs.slice(0, 4)} defaultOpenIndex={0} />
        </div>
      </section>
    </div>
  );
};
