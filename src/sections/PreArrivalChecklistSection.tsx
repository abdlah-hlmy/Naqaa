import React from 'react';
import { preArrivalChecklist } from '../data/siteConfig';
import { AnimatedReveal } from '../components/AnimatedReveal';

export const PreArrivalChecklistSection: React.FC = () => {
  return (
    <section className="py-12 sm:py-16 bg-[#EFEADC] border-y border-[#17251F]/8">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <AnimatedReveal>
          <div className="text-center mb-8 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#17251F]">
              قبل ما نوصل
            </h2>
            <p className="mt-2 text-sm text-[#68776E]">
              خطوات بسيطة تساعد فريقنا يبدأ العمل فوراً وبهدوء
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x sm:divide-x-reverse divide-[#17251F]/12">
            {preArrivalChecklist.map((item) => (
              <div key={item.id} className="py-4 sm:py-2 sm:px-5 text-center">
                <h3 className="text-sm sm:text-base font-bold text-[#17251F]">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-xs text-[#68776E] leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </AnimatedReveal>
      </div>
    </section>
  );
};
