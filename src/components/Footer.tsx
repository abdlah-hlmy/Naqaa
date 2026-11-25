'use client';

import React from 'react';
import Link from 'next/link';
import { MessageCircle, ArrowUpLeft } from 'lucide-react';
import { servicesData } from '../data/services';
import { useSiteData } from '../context/SiteDataContext';
import { useQuoteModal } from '../context/QuoteModalContext';
import { getDirectWhatsAppUrl } from '../lib/whatsapp';
import { BrandLogo } from './BrandLogo';

export const Footer: React.FC = () => {
  const { siteConfig, locations } = useSiteData();
  const { openQuoteModal } = useQuoteModal();
  const currentYear = new Date().getFullYear();

  const socialEntries = [
    { label: 'إنستغرام', url: siteConfig.socialLinks.instagram },
    { label: 'إكس (X)', url: siteConfig.socialLinks.x },
    { label: 'سناب شات', url: siteConfig.socialLinks.snapchat },
    { label: 'تيك توك', url: siteConfig.socialLinks.tiktok },
  ].filter((item) => Boolean(item.url && item.url.trim()));

  return (
    <footer className="border-t border-[#17251F]/10 bg-[#FAF8F3] text-[#17251F]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-14 pb-24 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#17251F]/10">
          {/* نبذة العلامة */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="inline-block">
              <BrandLogo />
            </Link>
            <p className="text-sm font-medium text-[#245745]">{siteConfig.sloganMain}</p>
            <p className="text-sm text-[#68776E] leading-relaxed max-w-sm">
              {siteConfig.description}
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => openQuoteModal()}
                className="inline-flex items-center gap-2 rounded-full bg-[#245745] px-5 py-2.5 text-xs font-semibold text-[#FAF8F3] hover:bg-[#17251F] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <span>اطلب عرض سعر</span>
                <ArrowUpLeft className="w-3.5 h-3.5" />
              </button>
              <a
                href={getDirectWhatsAppUrl(undefined, siteConfig.whatsappNumber)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[#17251F]/15 px-4 py-2.5 text-xs font-medium text-[#17251F] hover:bg-[#EFEADC] transition-colors whitespace-nowrap shrink-0"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#245745]" />
                <span>تواصل واتساب</span>
              </a>
            </div>
          </div>

          {/* روابط الصفحات */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-bold text-[#17251F] mb-4">الصفحات</h3>
            <ul className="space-y-2.5 text-sm text-[#68776E]">
              {siteConfig.navItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-[#245745] transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/privacy" className="hover:text-[#245745] transition-colors">
                  سياسة الخصوصية
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-[#245745] transition-colors">
                  الشروط والأحكام
                </Link>
              </li>
            </ul>
          </div>

          {/* الخدمات */}
          <div className="lg:col-span-3">
            <h3 className="text-sm font-bold text-[#17251F] mb-4">خدماتنا</h3>
            <ul className="space-y-2.5 text-sm text-[#68776E]">
              {servicesData.map((srv) => (
                <li key={srv.id}>
                  <Link
                    href={`/services/${srv.slug}`}
                    className="hover:text-[#245745] transition-colors"
                  >
                    {srv.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* مناطق التغطية والتواصل */}
          <div className="lg:col-span-3">
            <h3 className="text-sm font-bold text-[#17251F] mb-4">مناطق التغطية</h3>
            <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-[#68776E] mb-5">
              {locations.map((city) => (
                <Link
                  key={city.slug}
                  href={`/locations/${city.slug}`}
                  className="hover:text-[#245745] transition-colors"
                >
                  {city.name}
                </Link>
              ))}
              <Link
                href="/locations"
                className="text-[#245745] font-medium hover:underline underline-offset-4"
              >
                جميع المدن ←
              </Link>
            </div>
            <div className="text-xs text-[#68776E] space-y-1.5 pt-3 border-t border-[#17251F]/10">
              {siteConfig.phoneDisplay && (
                <p>
                  الهاتف:{' '}
                  <span dir="ltr" className="tabular-nums font-medium text-[#17251F]">
                    {siteConfig.phoneDisplay}
                  </span>
                </p>
              )}
              {siteConfig.email && (
                <p>
                  البريد:{' '}
                  <span dir="ltr" className="font-medium text-[#17251F]">
                    {siteConfig.email}
                  </span>
                </p>
              )}
              <p>{siteConfig.workingHours}</p>
              {socialEntries.length > 0 && (
                <div className="pt-2 flex flex-wrap gap-3">
                  {socialEntries.map((s) => (
                    <a
                      key={s.label}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#245745] hover:text-[#17251F] font-medium"
                    >
                      {s.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#68776E]">
          <p>© {currentYear} {siteConfig.brandName} ({siteConfig.brandEnglish}). جميع الحقوق محفوظة.</p>
          <p>المملكة العربية السعودية · {siteConfig.sloganMain}</p>
        </div>
      </div>
    </footer>
  );
};
