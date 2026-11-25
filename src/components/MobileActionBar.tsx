'use client';

import React from 'react';
import { ArrowUpLeft, MessageCircle } from 'lucide-react';
import { useSiteData } from '../context/SiteDataContext';
import { useQuoteModal } from '../context/QuoteModalContext';
import { getDirectWhatsAppUrl } from '../lib/whatsapp';

export const MobileActionBar: React.FC = () => {
  const { siteConfig } = useSiteData();
  const { openQuoteModal } = useQuoteModal();

  return (
    <div
      className="sm:hidden fixed inset-x-0 bottom-0 z-30 border-t border-[#17251F]/12 bg-[#FAF8F3]/95 backdrop-blur-sm px-4 py-2.5 shadow-[0_-4px_20px_rgba(23,37,31,0.06)]"
      role="region"
      aria-label="إجراءات سريعة لطلب الخدمة"
    >
      <div className="mx-auto flex max-w-md items-center gap-2.5">
        <button
          type="button"
          onClick={() => openQuoteModal()}
          className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-full bg-[#245745] px-4 py-3 text-xs font-semibold text-[#FAF8F3] hover:bg-[#17251F] transition-colors whitespace-nowrap cursor-pointer"
        >
          <span>اطلب عرض سعر</span>
          <ArrowUpLeft className="w-3.5 h-3.5" />
        </button>

        <a
          href={getDirectWhatsAppUrl(undefined, siteConfig.whatsappNumber)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="تواصل معنا عبر واتساب"
          className="inline-flex items-center justify-center gap-1.5 rounded-full border border-[#245745]/30 bg-[#EFEADC] px-4 py-3 text-xs font-semibold text-[#17251F] hover:bg-[#EFEADC]/80 transition-colors whitespace-nowrap shrink-0"
        >
          <MessageCircle className="w-4 h-4 text-[#245745]" />
          <span>واتساب</span>
        </a>
      </div>
    </div>
  );
};
