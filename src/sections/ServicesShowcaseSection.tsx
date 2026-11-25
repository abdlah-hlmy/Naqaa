'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { servicesData } from '../data/services';
import { ensureGsapRegistered, gsap, prefersReducedMotion } from '../lib/gsap';
import { SectionHeading } from '../components/SectionHeading';
import { ResilientImage } from '../components/ResilientImage';
import { WiperReveal } from '../components/WiperReveal';

export const ServicesShowcaseSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);

  const activeService = servicesData[activeIndex] || servicesData[0];

  useEffect(() => {
    if (prefersReducedMotion()) return;
    ensureGsapRegistered();

    const listEl = listRef.current;
    if (!listEl) return;

    const ctx = gsap.context(() => {
      const cards = listEl.querySelectorAll('[data-service-row]');
      gsap.from(cards, {
        y: 18,
        opacity: 0,
        duration: 0.65,
        stagger: 0.09,
        ease: 'power2.out',
        clearProps: 'transform,opacity',
        scrollTrigger: {
          trigger: listEl,
          start: 'top 84%',
          once: true,
        },
      });
    }, listRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="services" className="py-16 sm:py-22 bg-[#FAF8F3]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10 sm:mb-12">
          <SectionHeading
            kicker="خدماتنا"
            title="عناية مخصصة لكل مساحة في منزلك"
            description="أربع خدمات أساسية صُممت لتمنحك نتيجة مرتبة وتفاصيل واضحة دون تعقيد."
          />
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#245745] hover:text-[#17251F] transition-colors whitespace-nowrap shrink-0"
          >
            <span>عرض جميع الخدمات</span>
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>

        {/* العرض التفاعلي المزدوج: الصورة مع الممسحة + قائمة الخدمات الأربع */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch mb-10">
          {/* صورة الخدمة النشطة مع حركة المنشفة والضباب */}
          <div className="lg:col-span-6 flex flex-col">
            <WiperReveal
              showControls
              className="rounded-3xl border border-[#17251F]/10 bg-[#EFEADC] aspect-[4/3] lg:aspect-auto min-h-[280px] sm:min-h-[380px]"
            >
              <ResilientImage
                key={activeService.id}
                src={activeService.image}
                alt={activeService.imageAlt}
                className="w-full h-full object-cover transition-opacity duration-300"
                wrapperClassName="w-full h-full min-h-[320px]"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#17251F]/80 via-[#17251F]/35 to-transparent p-6 text-[#FAF8F3]">
                <span className="text-xs font-medium text-[#EFEADC] tabular-nums">
                  {activeService.number} · خدمة متخصصة
                </span>
                <p className="mt-1 text-lg sm:text-xl font-bold">{activeService.title}</p>
              </div>
            </WiperReveal>
          </div>

          {/* قائمة الخدمات الأربع */}
          <div
            ref={listRef}
            className="lg:col-span-6 divide-y divide-[#17251F]/10 border-y border-[#17251F]/10 flex flex-col justify-between"
          >
            {servicesData.map((srv, idx) => {
              const isSelected = idx === activeIndex;
              return (
                <div
                  key={srv.id}
                  data-service-row
                  onMouseEnter={() => setActiveIndex(idx)}
                  onFocus={() => setActiveIndex(idx)}
                  className={`group py-5 sm:py-6 px-3 sm:px-4 transition-colors rounded-xl ${
                    isSelected ? 'bg-[#EFEADC]/55' : 'hover:bg-[#EFEADC]/30'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <span
                        className={`text-2xl sm:text-3xl font-bold tabular-nums leading-none pt-1 transition-colors ${
                          isSelected ? 'text-[#245745]' : 'text-[#68776E]/70'
                        }`}
                      >
                        {srv.number}
                      </span>
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold text-[#17251F]">
                          {srv.title}
                        </h3>
                        <p className="mt-1.5 text-sm text-[#68776E] leading-relaxed">
                          {srv.shortDescription}
                        </p>
                      </div>
                    </div>

                    <Link
                      href={`/services/${srv.slug}`}
                      aria-label={`اعرف المزيد عن ${srv.title}`}
                      className="mt-1 inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#245745] hover:text-[#17251F] whitespace-nowrap shrink-0"
                    >
                      <span className="hidden sm:inline">اعرف المزيد</span>
                      <ArrowLeft className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* بطاقات مصغرة متباينة لعرض صور جميع الخدمات الأربع مباشرة */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 pt-4">
          {servicesData.map((srv, idx) => (
            <Link
              key={srv.id}
              href={`/services/${srv.slug}`}
              onMouseEnter={() => setActiveIndex(idx)}
              className={`group rounded-2xl border overflow-hidden transition-colors flex flex-col ${
                idx === 0
                  ? 'border-[#245745]/25 bg-[#EFEADC]/45'
                  : 'border-[#17251F]/10 bg-[#FAF8F3] hover:border-[#245745]/35'
              }`}
            >
              <div className="aspect-[4/3] overflow-hidden bg-[#EFEADC]">
                <ResilientImage
                  src={srv.image}
                  alt={srv.imageAlt}
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                  wrapperClassName="w-full h-full min-h-[160px]"
                />
              </div>
              <div className="p-4 flex items-center justify-between gap-2">
                <div>
                  <span className="text-[11px] font-medium text-[#68776E] tabular-nums">
                    {srv.number}
                  </span>
                  <h4 className="text-sm font-bold text-[#17251F] group-hover:text-[#245745] transition-colors">
                    {srv.title}
                  </h4>
                </div>
                <ArrowLeft className="w-4 h-4 text-[#245745] shrink-0 transition-transform duration-200 group-hover:-translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
