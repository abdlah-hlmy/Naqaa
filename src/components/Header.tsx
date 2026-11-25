'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';
import { useQuoteModal } from '../context/QuoteModalContext';
import { BrandLogo } from './BrandLogo';
import { MobileNav } from './MobileNav';
import { ScrollProgressIndicator } from './ScrollProgressIndicator';

export const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname() || '/';
  const { openQuoteModal } = useQuoteModal();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 18);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-colors duration-200 ${
          scrolled
            ? 'bg-[#FAF8F3]/95 border-b border-[#17251F]/10'
            : 'bg-[#FAF8F3] border-b border-transparent'
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8 h-16 sm:h-18">
          {/* Zone 1: Brand Wordmark */}
          <Link
            href="/"
            className="whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#245745] rounded-lg"
            aria-label="نقاء - الصفحة الرئيسية"
          >
            <BrandLogo />
          </Link>

          {/* Zone 2: Clean Single-Line Navigation Links */}
          <nav
            className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#17251F]/80"
            aria-label="التنقل الرئيسي"
          >
            {siteConfig.navItems.map((item) => {
              const isActive =
                item.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`whitespace-nowrap shrink-0 py-1 transition-colors hover:text-[#245745] ${
                    isActive
                      ? 'text-[#245745] font-semibold underline decoration-[#245745] decoration-2 underline-offset-8'
                      : ''
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Zone 3: Single Primary Action + Mobile Menu Trigger */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => openQuoteModal()}
              className="hidden sm:inline-flex items-center justify-center rounded-full bg-[#245745] px-5 py-2.5 text-xs sm:text-sm font-semibold text-[#FAF8F3] hover:bg-[#17251F] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              اطلب عرض سعر
            </button>

            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="فتح القائمة"
              className="lg:hidden flex h-11 w-11 items-center justify-center rounded-full border border-[#17251F]/15 text-[#17251F] hover:bg-[#EFEADC] transition-colors cursor-pointer"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
        <ScrollProgressIndicator />
      </header>

      <MobileNav
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        onOpenQuote={() => openQuoteModal()}
        currentPath={pathname}
      />
    </>
  );
};
