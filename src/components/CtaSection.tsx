'use client';

import React from 'react';
import { ArrowUpLeft, MessageCircle } from 'lucide-react';
import { useSiteData } from '../context/SiteDataContext';
import { useQuoteModal } from '../context/QuoteModalContext';
import { getDirectWhatsAppUrl } from '../lib/whatsapp';

interface CtaSectionProps {
  title?: string;
  description?: string;
  onOpenQuote?: () => void;
}

export const CtaSection: React.FC<CtaSectionProps> = ({
  title = 'خلّ بيتك يتنفس من جديد',
  description = 'اطلب عرض سعرك، وخلك على راحتك.. نقاء تهتم بالتفاصيل.',
  onOpenQuote,
}) => {
  const { siteConfig } = useSiteData();
  const { openQuoteModal } = useQuoteModal();
  const handleQuote = onOpenQuote || (() => openQuoteModal());

  return (
    <section className="py-16 sm:py-20 bg-[#245745] text-[#FAF8F3]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          <div className="max-w-2xl">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-snug">
              {title}
            </h2>
            <p className="mt-3 text-base text-[#FAF8F3]/85 leading-relaxed">
              {description}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={handleQuote}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#FAF8F3] px-7 py-3.5 text-sm font-semibold text-[#17251F] hover:bg-[#EFEADC] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>اطلب عرض سعر</span>
              <ArrowUpLeft className="w-4 h-4 text-[#245745]" />
            </button>

            <a
              href={getDirectWhatsAppUrl(undefined, siteConfig.whatsappNumber)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[#FAF8F3]/35 px-6 py-3.5 text-sm font-medium text-[#FAF8F3] hover:bg-[#FAF8F3]/10 transition-colors whitespace-nowrap shrink-0"
            >
              <MessageCircle className="w-4 h-4" />
              <span>كلّمنا واتساب</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
