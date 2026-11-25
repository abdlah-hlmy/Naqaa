'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { X, ArrowUpLeft } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';
import { BrandLogo } from './BrandLogo';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenQuote: () => void;
  currentPath: string;
}

export const MobileNav: React.FC<MobileNavProps> = ({
  isOpen,
  onClose,
  onOpenQuote,
  currentPath,
}) => {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 lg:hidden bg-[#17251F]/40"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="القائمة الرئيسية"
    >
      <div
        className="fixed inset-y-0 right-0 w-full max-w-xs bg-[#FAF8F3] border-l border-[#17251F]/10 p-6 flex flex-col justify-between shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <div className="flex items-center justify-between pb-5 border-b border-[#17251F]/10">
            <Link href="/" onClick={onClose}>
              <BrandLogo />
            </Link>
            <button
              type="button"
              onClick={onClose}
              aria-label="إغلاق القائمة"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[#17251F]/15 text-[#17251F] hover:bg-[#EFEADC] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="mt-6 flex flex-col gap-1">
            <Link
              href="/"
              onClick={onClose}
              className={`flex items-center justify-between rounded-xl px-4 py-3.5 text-base font-medium transition-colors ${
                currentPath === '/'
                  ? 'bg-[#EFEADC] text-[#245745] font-semibold'
                  : 'text-[#17251F] hover:bg-[#EFEADC]/60'
              }`}
            >
              <span>الرئيسية</span>
              <ArrowUpLeft className="w-4 h-4 opacity-50" />
            </Link>
            {siteConfig.navItems.map((item) => {
              const active = currentPath === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={`flex items-center justify-between rounded-xl px-4 py-3.5 text-base font-medium transition-colors ${
                    active
                      ? 'bg-[#EFEADC] text-[#245745] font-semibold'
                      : 'text-[#17251F] hover:bg-[#EFEADC]/60'
                  }`}
                >
                  <span>{item.label}</span>
                  <ArrowUpLeft className="w-4 h-4 opacity-50" />
                </Link>
              );
            })}
            <Link
              href="/#how-we-work"
              onClick={onClose}
              className="flex items-center justify-between rounded-xl px-4 py-3.5 text-base font-medium text-[#17251F] hover:bg-[#EFEADC]/60 transition-colors"
            >
              <span>كيف نشتغل</span>
              <ArrowUpLeft className="w-4 h-4 opacity-50" />
            </Link>
          </nav>
        </div>

        <div className="pt-6 border-t border-[#17251F]/10 space-y-3">
          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenQuote();
            }}
            className="w-full flex items-center justify-center gap-2 rounded-full bg-[#245745] px-6 py-3.5 text-sm font-semibold text-[#FAF8F3] hover:bg-[#17251F] transition-colors cursor-pointer"
          >
            <span>اطلب عرض سعر</span>
            <ArrowUpLeft className="w-4 h-4" />
          </button>
          <p className="text-xs text-center text-[#68776E]">
            {siteConfig.sloganMain}
          </p>
        </div>
      </div>
    </div>
  );
};
