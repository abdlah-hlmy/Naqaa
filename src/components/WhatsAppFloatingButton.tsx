'use client';

import React from 'react';
import { MessageCircle } from 'lucide-react';
import { useSiteData } from '../context/SiteDataContext';
import { getDirectWhatsAppUrl } from '../lib/whatsapp';

export const WhatsAppFloatingButton: React.FC = () => {
  const { siteConfig } = useSiteData();

  return (
    <a
      href={getDirectWhatsAppUrl(undefined, siteConfig.whatsappNumber)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="تواصل معنا عبر واتساب"
      className="hidden sm:inline-flex fixed bottom-6 left-6 z-30 items-center gap-2 rounded-full bg-[#245745] px-4 py-3 text-sm font-semibold text-[#FAF8F3] shadow-md hover:bg-[#17251F] transition-colors whitespace-nowrap shrink-0"
    >
      <MessageCircle className="w-4 h-4 shrink-0" />
      <span>كلّمنا واتساب</span>
    </a>
  );
};
