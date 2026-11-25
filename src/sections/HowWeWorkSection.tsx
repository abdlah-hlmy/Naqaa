'use client';

import React, { useEffect, useRef } from 'react';
import { workSteps } from '../data/siteConfig';
import { ensureGsapRegistered, gsap, prefersReducedMotion } from '../lib/gsap';
import { SectionHeading } from '../components/SectionHeading';

export const HowWeWorkSection: React.FC = () => {
  const stepsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    ensureGsapRegistered();

    const container = stepsRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      const cards = container.querySelectorAll('[data-work-step]');
      gsap.from(cards, {
        y: 20,
        opacity: 0,
        duration: 0.7,
        stagger: 0.14,
        ease: 'power2.out',
        clearProps: 'transform,opacity',
        scrollTrigger: {
          trigger: container,
          start: 'top 84%',
          once: true,
        },
      });
    }, stepsRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="how-we-work" className="py-16 sm:py-22 bg-[#FAF8F3]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          kicker="كيف نشتغل؟"
          title="ثلاث خطوات واضحة من الطلب حتى التنفيذ"
          description="نظام عمل بسيط ومباشر يحترم وقتك ويعطيك كل التفاصيل مقدماً."
          className="mb-12"
        />

        <div
          ref={stepsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 relative"
        >
          {workSteps.map((step, index) => (
            <div
              key={step.number}
              data-work-step
              className="relative rounded-2xl border border-[#17251F]/10 bg-[#FAF8F3] p-6 sm:p-8 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-4 mb-5">
                  <span className="text-4xl font-bold text-[#245745]/25 tabular-nums leading-none">
                    {step.number}
                  </span>
                  {index < workSteps.length - 1 && (
                    <span
                      aria-hidden="true"
                      className="hidden md:block h-px flex-1 bg-[#17251F]/12"
                    />
                  )}
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-[#17251F] mb-2.5">
                  {step.title}
                </h3>
                <p className="text-sm text-[#68776E] leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
