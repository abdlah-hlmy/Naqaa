'use client';

import React from 'react';
import { ArrowUpLeft } from 'lucide-react';
import { pricingFactors } from '../data/siteConfig';
import { useQuoteModal } from '../context/QuoteModalContext';
import { SectionHeading } from '../components/SectionHeading';
import { ResilientImage } from '../components/ResilientImage';
import { SprayMistEffect } from '../components/SprayMistEffect';
import { AnimatedReveal } from '../components/AnimatedReveal';

interface PricingFactorsSectionProps {
  onOpenQuote?: () => void;
}

export const PricingFactorsSection: React.FC<PricingFactorsSectionProps> = ({
  onOpenQuote,
}) => {
  const { openQuoteModal } = useQuoteModal();
  const handleQuote = onOpenQuote || (() => openQuoteModal());
  return (
    <section className="py-16 sm:py-22 bg-[#FAF8F3] border-t border-[#17251F]/8">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* النصوص وعوامل التسعير */}
          <AnimatedReveal className="lg:col-span-6 flex flex-col justify-center">
            <SectionHeading
              kicker="وضوح التسعير"
              title="سعرك واضح قبل ما نبدأ"
              description="لا نعتمد أسعاراً مبهمة أو رسوماً مفاجئة عند الوصول. يُحسب عرض السعر بناءً على تفاصيل مكانك الفعلية:"
              className="mb-6"
            />

            <ul className="divide-y divide-[#17251F]/8 border-y border-[#17251F]/10 mb-7">
              {pricingFactors.map((factor, idx) => (
                <li key={factor.id} className="py-3.5 flex items-start gap-3">
                  <span className="text-xs font-bold text-[#245745] tabular-nums pt-1">
                    0{idx + 1}
                  </span>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-[#17251F]">
                      {factor.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#68776E] mt-0.5">
                      {factor.detail}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <div>
              <button
                type="button"
                onClick={handleQuote}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#245745] px-7 py-3.5 text-sm font-semibold text-[#FAF8F3] hover:bg-[#17251F] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <span>اطلب عرض سعر لمكانك</span>
                <ArrowUpLeft className="w-4 h-4" />
              </button>
            </div>
          </AnimatedReveal>

          {/* صورة المطبخ مع رذاذ خفيف */}
          <AnimatedReveal delay={0.1} className="lg:col-span-6 flex items-stretch">
            <div className="relative w-full rounded-3xl overflow-hidden bg-[#EFEADC] border border-[#17251F]/8 min-h-[300px] sm:min-h-[400px]">
              <ResilientImage
                src="/images/naqaa_kitchen_pricing_1795467853594.jpg"
                alt="مطبخ نظيف ومرتب مع زجاجة رذاذ ومناشف قطنية بإضاءة طبيعية"
                className="w-full h-full object-cover"
                wrapperClassName="w-full h-full min-h-[340px]"
              />
              <SprayMistEffect className="absolute top-12 left-10 opacity-85" />
            </div>
          </AnimatedReveal>
        </div>
      </div>
    </section>
  );
};
