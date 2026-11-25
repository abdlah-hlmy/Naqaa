'use client';

import React, { useEffect, useRef } from 'react';
import { MapPin, Quote } from 'lucide-react';
import { testimonialsData } from '../data/testimonials';
import { ensureGsapRegistered, gsap, prefersReducedMotion } from '../lib/gsap';
import { SectionHeading } from '../components/SectionHeading';
import { GuaranteeBanner } from '../components/GuaranteeBanner';

export const TestimonialsSection: React.FC = () => {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    ensureGsapRegistered();

    const grid = gridRef.current;
    if (!grid) return;

    const ctx = gsap.context(() => {
      const cards = grid.querySelectorAll('[data-testimonial-card]');
      gsap.from(cards, {
        y: 18,
        opacity: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power2.out',
        clearProps: 'transform,opacity',
        scrollTrigger: {
          trigger: grid,
          start: 'top 86%',
          once: true,
        },
      });
    }, gridRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="py-16 sm:py-22 bg-[#FAF8F3] border-b border-[#17251F]/8">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-10">
        <SectionHeading
          kicker="تجارب العملاء"
          title="آراء مرتبطة بأحياء وخدمات حقيقية"
          description="انطباعات أصحاب المنازل بعد استلام المكان ومراجعته مع الفريق."
        />

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonialsData.map((item) => (
            <article
              key={item.id}
              data-testimonial-card
              className="rounded-3xl border border-[#17251F]/10 bg-[#FAF8F3] p-6 sm:p-7 flex flex-col justify-between gap-5"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#245745]">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>
                      {item.city} · {item.neighborhood}
                    </span>
                  </span>
                  <span className="text-xs font-medium text-[#68776E]">
                    {item.service}
                  </span>
                </div>

                <p className="text-sm sm:text-base text-[#17251F] leading-relaxed">
                  «{item.quote}»
                </p>
              </div>

              <div className="pt-4 border-t border-[#17251F]/8 flex items-center justify-between text-xs text-[#68776E]">
                <span className="font-semibold text-[#17251F]">{item.author}</span>
                <Quote className="w-4 h-4 text-[#245745]/40" />
              </div>
            </article>
          ))}
        </div>

        <GuaranteeBanner />
      </div>
    </section>
  );
};
