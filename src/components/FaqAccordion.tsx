'use client';

import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { FaqItem } from '../data/faqs';

interface FaqAccordionProps {
  items: FaqItem[];
  defaultOpenIndex?: number;
}

export const FaqAccordion: React.FC<FaqAccordionProps> = ({
  items,
  defaultOpenIndex = 0,
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpenIndex);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="divide-y divide-[#17251F]/10 border-t border-b border-[#17251F]/10">
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div key={item.id} className="py-1">
            <button
              type="button"
              onClick={() => toggle(idx)}
              aria-expanded={isOpen}
              className="w-full flex items-center justify-between gap-4 py-4 sm:py-5 text-start cursor-pointer group"
            >
              <span className="text-base sm:text-lg font-semibold text-[#17251F] group-hover:text-[#245745] transition-colors">
                {item.question}
              </span>
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#17251F]/12 text-[#245745] group-hover:bg-[#EFEADC] transition-colors">
                {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              </span>
            </button>

            <div
              className={`grid transition-[grid-template-rows,opacity] duration-200 ease-out ${
                isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
              }`}
            >
              <div className="overflow-hidden">
                <p className="pb-5 text-sm sm:text-base text-[#68776E] leading-relaxed max-w-3xl">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
