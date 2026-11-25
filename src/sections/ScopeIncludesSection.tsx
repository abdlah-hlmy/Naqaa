import React from 'react';
import { Check, Home, Wind } from 'lucide-react';
import { acCleaningChecklist, homeCleaningChecklist } from '../data/services';
import { SectionHeading } from '../components/SectionHeading';
import { AnimatedReveal } from '../components/AnimatedReveal';

export const ScopeIncludesSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-22 bg-[#FAF8F3]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          align="center"
          kicker="نطاق العمل"
          title="وش يشمله التنظيف؟"
          description="توضيح مباشر للعناصر الأساسية في تنظيف المنازل والمكيفات حتى تكون الصورة واضحة قبل الحجز."
          className="mb-12"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {/* عمود تنظيف المنازل */}
          <AnimatedReveal className="rounded-2xl border border-[#17251F]/10 bg-[#FAF8F3] p-6 sm:p-8">
            <div className="flex items-center gap-3 pb-5 mb-2 border-b border-[#17251F]/10">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EFEADC] text-[#245745]">
                <Home className="w-5 h-5" />
              </span>
              <div>
                <h3 className="text-xl font-bold text-[#17251F]">تنظيف المنازل</h3>
                <p className="text-xs text-[#68776E]">عناية شاملة للغرف والمجالس والمرافق</p>
              </div>
            </div>

            <ul className="divide-y divide-[#17251F]/8">
              {homeCleaningChecklist.map((item) => (
                <li key={item} className="flex items-center gap-3 py-3.5 text-sm sm:text-base text-[#17251F]">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#245745]/10 text-[#245745]">
                    <Check className="w-3.5 h-3.5" />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </AnimatedReveal>

          {/* عمود تنظيف المكيفات */}
          <AnimatedReveal delay={0.08} className="rounded-2xl border border-[#17251F]/10 bg-[#FAF8F3] p-6 sm:p-8">
            <div className="flex items-center gap-3 pb-5 mb-2 border-b border-[#17251F]/10">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EFEADC] text-[#245745]">
                <Wind className="w-5 h-5" />
              </span>
              <div>
                <h3 className="text-xl font-bold text-[#17251F]">تنظيف المكيفات</h3>
                <p className="text-xs text-[#68776E]">تنظيف دقيق يحافظ على الجدار والأثاث</p>
              </div>
            </div>

            <ul className="divide-y divide-[#17251F]/8">
              {acCleaningChecklist.map((item) => (
                <li key={item} className="flex items-center gap-3 py-3.5 text-sm sm:text-base text-[#17251F]">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#245745]/10 text-[#245745]">
                    <Check className="w-3.5 h-3.5" />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </AnimatedReveal>
        </div>
      </div>
    </section>
  );
};
