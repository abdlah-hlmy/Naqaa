'use client';

import React from 'react';
import { Check, MessageCircle, ShieldCheck } from 'lucide-react';
import { useSiteData } from '../context/SiteDataContext';
import { QuoteRequestForm } from '../components/QuoteRequestForm';
import { AnimatedReveal } from '../components/AnimatedReveal';
import { getDirectWhatsAppUrl } from '../lib/whatsapp';

interface InlineQuoteSectionProps {
  defaultCity?: string;
  defaultService?: string;
}

export const InlineQuoteSection: React.FC<InlineQuoteSectionProps> = ({
  defaultCity,
  defaultService,
}) => {
  const { siteConfig } = useSiteData();
  return (
    <section
      id="quote"
      className="py-16 sm:py-24 bg-[#EFEADC] border-t border-[#17251F]/10"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <AnimatedReveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
            {/* اللوحة التوجيهية الجانبية */}
            <div className="lg:col-span-4 rounded-3xl bg-[#245745] text-[#FAF8F3] p-7 sm:p-9 flex flex-col justify-between">
              <div>
                <p className="text-xs font-medium text-[#EFEADC] mb-3">
                  اطلب عرض سعر
                </p>
                <h2 className="text-2xl sm:text-3xl font-bold leading-snug">
                  خلّ بيتك يتنفس من جديد
                </h2>
                <p className="mt-3 text-sm sm:text-base text-[#FAF8F3]/85 leading-relaxed">
                  اطلب عرض سعرك، وخلك على راحتك.. نقاء تهتم بالتفاصيل.
                </p>

                <ul className="mt-7 space-y-3.5 text-sm text-[#FAF8F3]/90 border-t border-[#FAF8F3]/15 pt-6">
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#EFEADC] shrink-0 mt-1" />
                    <span>توضيح السعر ونطاق العمل قبل تحديد الزيارة</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#EFEADC] shrink-0 mt-1" />
                    <span>التحقق الفعلي من تغطية الحي والموعد المتاح</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#EFEADC] shrink-0 mt-1" />
                    <span>تجهيز رسالة منظمة ترسلها بضغطة واحدة</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-6 border-t border-[#FAF8F3]/15 space-y-4">
                <a
                  href={getDirectWhatsAppUrl(undefined, siteConfig.whatsappNumber)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#FAF8F3] px-5 py-3 text-sm font-semibold text-[#17251F] hover:bg-[#EFEADC] transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-[#245745]" />
                  <span>كلّمنا واتساب مباشرة</span>
                </a>

                <p className="flex items-center gap-2 text-xs text-[#FAF8F3]/75">
                  <ShieldCheck className="w-4 h-4 shrink-0" />
                  <span>بياناتك تُستخدم فقط لتسعير طلبك وترتيب الموعد.</span>
                </p>
              </div>
            </div>

            {/* نموذج طلب عرض السعر */}
            <div className="lg:col-span-8 rounded-3xl border border-[#17251F]/10 bg-[#FAF8F3] p-6 sm:p-8 lg:p-10">
              <div className="pb-5 mb-6 border-b border-[#17251F]/8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#17251F]">
                    تفاصيل المكان والخدمة
                  </h3>
                  <p className="text-xs sm:text-sm text-[#68776E] mt-0.5">
                    املأ الحقول الأساسية لنحسب لك السعر بدقة ونؤكد الموعد
                  </p>
                </div>
                <span className="text-xs text-[#245745] font-medium">
                  يستغرق أقل من دقيقة
                </span>
              </div>

              <QuoteRequestForm
                defaultCity={defaultCity}
                defaultService={defaultService}
              />
            </div>
          </div>
        </AnimatedReveal>
      </div>
    </section>
  );
};
