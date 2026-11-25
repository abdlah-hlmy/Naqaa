'use client';

import React, { useEffect, useRef } from 'react';
import { ArrowUpLeft, MessageCircle } from 'lucide-react';
import { ensureGsapRegistered, gsap, prefersReducedMotion } from '../lib/gsap';
import { useSiteData } from '../context/SiteDataContext';
import { useQuoteModal } from '../context/QuoteModalContext';
import { getDirectWhatsAppUrl } from '../lib/whatsapp';
import { ResilientImage } from '../components/ResilientImage';
import { SprayMistEffect } from '../components/SprayMistEffect';

interface HeroSectionProps {
  onOpenQuote?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenQuote }) => {
  const { siteConfig } = useSiteData();
  const { openQuoteModal } = useQuoteModal();
  const handleQuote = onOpenQuote || (() => openQuoteModal());
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const imageInnerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    ensureGsapRegistered();

    const ctx = gsap.context(() => {
      if (contentRef.current) {
        const items = contentRef.current.querySelectorAll('[data-hero-reveal]');
        gsap.from(items, {
          y: 22,
          opacity: 0,
          duration: 0.75,
          stagger: 0.1,
          ease: 'power2.out',
          clearProps: 'transform,opacity',
        });
      }

      if (imageWrapRef.current) {
        gsap.from(imageWrapRef.current, {
          scale: 0.97,
          opacity: 0,
          duration: 0.9,
          delay: 0.15,
          ease: 'power2.out',
          clearProps: 'transform,opacity',
        });
      }

      if (imageInnerRef.current && sectionRef.current) {
        gsap.to(imageInnerRef.current, {
          yPercent: 6,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#FAF8F3] pt-8 pb-14 sm:pt-12 sm:pb-20 lg:pt-14 lg:pb-24 overflow-hidden"
    >
      {/* نقاط رذاذ خفيفة متفرقة في أطراف الهيرو */}
      <SprayMistEffect
        variant="topRight"
        className="absolute top-3 right-3 sm:top-6 sm:right-8 opacity-65"
      />
      <SprayMistEffect
        variant="photoCorner"
        className="hidden sm:block absolute top-4 left-4 lg:left-10 opacity-60"
      />
      <SprayMistEffect
        variant="bottomRight"
        className="hidden md:block absolute bottom-6 right-1/3 opacity-55"
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch gap-8 lg:gap-12">
          {/* الجهة اليمنى: النص والدعوة للإجراء */}
          <div
            ref={contentRef}
            className="lg:col-span-6 flex flex-col justify-center relative py-2 lg:py-6"
          >
            <SprayMistEffect
              variant="topLeft"
              className="absolute -top-2 left-2 sm:left-4 opacity-70"
            />

            <p
              data-hero-reveal
              className="text-sm font-medium text-[#245745] mb-3"
            >
              نقاء · راحة تبدأ من المكان
            </p>

            <h1
              data-hero-reveal
              className="text-4xl sm:text-5xl lg:text-[54px] font-bold text-[#17251F] leading-[1.22]"
            >
              بيتك يرجع{' '}
              <span className="text-[#245745]">كأنه جديد</span>
            </h1>

            <p
              data-hero-reveal
              className="mt-5 text-base sm:text-lg text-[#68776E] leading-relaxed max-w-xl"
            >
              خدمات تنظيف المنازل والمكيفات في المملكة، بعناية واضحة وسعر تعرفه قبل ما نبدأ.
            </p>

            <div
              data-hero-reveal
              className="mt-8 flex flex-wrap items-center gap-3.5"
            >
              <button
                type="button"
                onClick={handleQuote}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#245745] px-7 py-3.5 text-sm sm:text-base font-semibold text-[#FAF8F3] hover:bg-[#17251F] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <span>اطلب عرض سعر</span>
                <ArrowUpLeft className="w-4 h-4" />
              </button>

              <a
                href={getDirectWhatsAppUrl(undefined, siteConfig.whatsappNumber)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#17251F]/20 bg-transparent px-6 py-3.5 text-sm sm:text-base font-medium text-[#17251F] hover:bg-[#EFEADC] transition-colors whitespace-nowrap shrink-0"
              >
                <MessageCircle className="w-4 h-4 text-[#245745]" />
                <span>كلّمنا واتساب</span>
              </a>
            </div>

            <div
              data-hero-reveal
              className="mt-8 pt-6 border-t border-[#17251F]/10 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs sm:text-sm text-[#68776E]"
            >
              <span>تسعير واضح قبل التنفيذ</span>
              <span aria-hidden="true">·</span>
              <span>مواعيد مرتبة حسب جدولك</span>
              <span aria-hidden="true">·</span>
              <span>أحياء الرياض ومدن المملكة</span>
            </div>
          </div>

          {/* الجهة اليسرى: الصورة الرئيسية */}
          <div className="lg:col-span-6 flex items-stretch">
            <div
              ref={imageWrapRef}
              className="relative w-full overflow-hidden rounded-3xl bg-[#EFEADC] border border-[#17251F]/8 min-h-[300px] sm:min-h-[400px] lg:min-h-[480px]"
            >
              <div ref={imageInnerRef} className="w-full h-full scale-[1.04]">
                <ResilientImage
                  src="/images/naqaa_hero_living_room_1795467850488.jpg"
                  alt="غرفة معيشة فاخرة ونظيفة بإضاءة طبيعية دافئة وأثاث بألوان البيج والأخضر الزيتوني"
                  loading="eager"
                  className="w-full h-full object-cover"
                  wrapperClassName="w-full h-full min-h-[340px]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
