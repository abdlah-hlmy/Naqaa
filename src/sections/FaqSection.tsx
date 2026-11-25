import React from 'react';
import { homeFaqs } from '../data/faqs';
import { SectionHeading } from '../components/SectionHeading';
import { FaqAccordion } from '../components/FaqAccordion';
import { AnimatedReveal } from '../components/AnimatedReveal';

export const FaqSection: React.FC = () => {
  return (
    <section id="faq" className="py-16 sm:py-22 bg-[#FAF8F3]">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          align="center"
          kicker="إجابات واضحة"
          title="الأسئلة الشائعة"
          description="أكثر الأسئلة التي تهمك حول مدة التنفيذ، التسعير، وتغطية المدن."
          className="mb-10 sm:mb-12"
        />

        <AnimatedReveal>
          <FaqAccordion items={homeFaqs} defaultOpenIndex={0} />
        </AnimatedReveal>
      </div>
    </section>
  );
};
