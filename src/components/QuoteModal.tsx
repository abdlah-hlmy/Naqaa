'use client';

import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { QuoteRequestForm } from './QuoteRequestForm';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultService?: string;
  defaultCity?: string;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({
  isOpen,
  onClose,
  defaultService,
  defaultCity,
}) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#17251F]/50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="quote-modal-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#EFEADC] border border-[#17251F]/12 p-6 sm:p-8 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 pb-5 mb-6 border-b border-[#17251F]/10">
          <div>
            <p className="text-xs font-medium text-[#245745] mb-1">طلب عرض سعر واضح</p>
            <h2 id="quote-modal-title" className="text-xl sm:text-2xl font-bold text-[#17251F]">
              أخبرنا عن احتياجك ونرتب الباقي
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="إغلاق نافذة طلب عرض السعر"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#17251F]/15 bg-[#FAF8F3] text-[#17251F] hover:bg-[#245745] hover:text-[#FAF8F3] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <QuoteRequestForm
          compact
          defaultService={defaultService}
          defaultCity={defaultCity}
        />
      </div>
    </div>
  );
};
