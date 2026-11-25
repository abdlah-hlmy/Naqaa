'use client';

import React, { useEffect, useRef } from 'react';
import { whyNaqaaItems } from '../data/siteConfig';
import { ensureGsapRegistered, gsap, prefersReducedMotion } from '../lib/gsap';
import { SectionHeading } from '../components/SectionHeading';

export const WhyNaqaaSection: React.FC = () => {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    ensureGsapRegistered();

    const grid = gridRef.current;
    if (!grid) return;

    const ctx = gsap.context(() => {
      const items = grid.querySelectorAll('[data-why-item]');
      gsap.from(items, {
        y: 20,
        opacity: 0,
        duration: 0.65,
        stagger: 0.08,
        ease: 'power2.out',
        clearProps: 'transform,opacity',
        scrollTrigger: {
          trigger: grid,
          start: 'top 85%',
          once: true,
        },
      });
    }, gridRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="py-16 sm:py-22 bg-[#EFEADC]/45 border-y border-[#17251F]/8">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          kicker="لماذا نقاء؟"
          title="النظافة مو بس شكل.. هي راحة واهتمام"
          description="نلتزم بتفاصيل عملية واضحة تجعل طلب الخدمة وتنفيذها تجربة مريحة من أول تواصل."
          className="mb-12"
        />

        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {whyNaqaaItems.map((item) => (
            <div
              key={item.id}
              data-why-item
              className="rounded-2xl border border-[#17251F]/10 bg-[#FAF8F3] p-6 sm:p-7 flex flex-col justify-between"
            >
              <div>
                <span className="inline-block text-xs font-semibold text-[#245745] tabular-nums mb-3">
                  {item.number}
                </span>
                <h3 className="text-lg font-bold text-[#17251F] mb-2.5">
                  {item.title}
                </h3>
                <p className="text-sm text-[#68776E] leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
