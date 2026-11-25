'use client';

import React, { useState } from 'react';
import { Check, Clock, Copy, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { useSiteData } from '../context/SiteDataContext';
import { getDirectWhatsAppUrl } from '../lib/whatsapp';

export const ContactInformation: React.FC = () => {
  const { siteConfig, locations } = useSiteData();
  const [copiedField, setCopiedField] = useState<'phone' | 'email' | null>(null);
  const riyadh = locations.find((c) => c.slug === 'riyadh');

  const socialEntries = [
    { label: 'إنستغرام', url: siteConfig.socialLinks.instagram },
    { label: 'إكس (X)', url: siteConfig.socialLinks.x },
    { label: 'سناب شات', url: siteConfig.socialLinks.snapchat },
    { label: 'تيك توك', url: siteConfig.socialLinks.tiktok },
  ].filter((item) => Boolean(item.url && item.url.trim()));

  const handleCopy = async (value: string, field: 'phone' | 'email') => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedField(field);
      window.setTimeout(() => {
        setCopiedField((prev) => (prev === field ? null : prev));
      }, 2000);
    } catch {
      setCopiedField(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-[#17251F]/10 bg-[#EFEADC]/55 p-6 sm:p-8 space-y-5">
        <div>
          <p className="text-xs font-semibold text-[#245745] mb-1">التواصل المباشر</p>
          <h2 className="text-xl font-bold text-[#17251F]">قنوات التواصل مع {siteConfig.brandName}</h2>
        </div>

        <div className="divide-y divide-[#17251F]/10">
          {/* واتساب */}
          <div className="py-4 first:pt-1 flex items-start gap-3.5">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#245745] text-[#FAF8F3]">
              <MessageCircle className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-sm font-bold text-[#17251F]">واتساب</h3>
              <p className="text-xs sm:text-sm text-[#68776E] mt-1 leading-relaxed">
                أسرع طريقة لإرسال تفاصيل منزلك وتأكيد تغطية الحي واستلام عرض السعر.
              </p>
              <a
                href={getDirectWhatsAppUrl(undefined, siteConfig.whatsappNumber)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-[#245745] hover:text-[#17251F] underline underline-offset-4"
              >
                <span>مراسلة عبر واتساب</span>
              </a>
            </div>
          </div>

          {/* الهاتف عند توفره في الإعدادات */}
          {siteConfig.phoneDisplay && (
            <div className="py-4 flex items-start justify-between gap-3">
              <div className="flex items-start gap-3.5 min-w-0">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#FAF8F3] border border-[#17251F]/12 text-[#245745]">
                  <Phone className="w-5 h-5" />
                </span>
                <div className="min-w-0">
                  <h3 className="text-sm font-bold text-[#17251F]">رقم الهاتف</h3>
                  <a
                    href={`tel:${siteConfig.phoneDisplay}`}
                    dir="ltr"
                    className="mt-1 inline-block text-sm font-semibold text-[#17251F] hover:text-[#245745] tabular-nums"
                  >
                    {siteConfig.phoneDisplay}
                  </a>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleCopy(siteConfig.phoneDisplay, 'phone')}
                aria-label="نسخ رقم الهاتف"
                className="inline-flex items-center gap-1 rounded-lg border border-[#17251F]/15 bg-[#FAF8F3] px-2.5 py-1.5 text-xs font-medium text-[#17251F] hover:border-[#245745] transition-colors shrink-0 cursor-pointer"
              >
                {copiedField === 'phone' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#245745]" />
                    <span className="text-[#245745]">تم النسخ</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-[#68776E]" />
                    <span>نسخ</span>
                  </>
                )}
              </button>
            </div>
          )}

          {/* البريد الإلكتروني عند توفره */}
          {siteConfig.email && (
            <div className="py-4 flex items-start justify-between gap-3">
              <div className="flex items-start gap-3.5 min-w-0">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#FAF8F3] border border-[#17251F]/12 text-[#245745]">
                  <Mail className="w-5 h-5" />
                </span>
                <div className="min-w-0">
                  <h3 className="text-sm font-bold text-[#17251F]">البريد الإلكتروني</h3>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    dir="ltr"
                    className="mt-1 inline-block text-sm font-medium text-[#17251F] hover:text-[#245745] truncate max-w-full"
                  >
                    {siteConfig.email}
                  </a>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleCopy(siteConfig.email, 'email')}
                aria-label="نسخ البريد الإلكتروني"
                className="inline-flex items-center gap-1 rounded-lg border border-[#17251F]/15 bg-[#FAF8F3] px-2.5 py-1.5 text-xs font-medium text-[#17251F] hover:border-[#245745] transition-colors shrink-0 cursor-pointer"
              >
                {copiedField === 'email' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#245745]" />
                    <span className="text-[#245745]">تم النسخ</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-[#68776E]" />
                    <span>نسخ</span>
                  </>
                )}
              </button>
            </div>
          )}

          {/* أوقات العمل والمواعيد */}
          <div className="py-4 flex items-start gap-3.5">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#FAF8F3] border border-[#17251F]/12 text-[#245745]">
              <Clock className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-sm font-bold text-[#17251F]">تنسيق المواعيد</h3>
              <p className="text-xs sm:text-sm text-[#68776E] mt-1 leading-relaxed">
                {siteConfig.workingHours}
              </p>
            </div>
          </div>

          {/* التغطية الحالية */}
          {riyadh && riyadh.neighborhoods.length > 0 && (
            <div className="py-4 flex items-start gap-3.5">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#FAF8F3] border border-[#17251F]/12 text-[#245745]">
                <MapPin className="w-5 h-5" />
              </span>
              <div>
                <h3 className="text-sm font-bold text-[#17251F]">التغطية النشطة حالياً</h3>
                <p className="text-xs sm:text-sm text-[#68776E] mt-1 leading-relaxed">
                  أحياء شمال الرياض ({riyadh.neighborhoods.join('، ')})، مع استقبال طلبات التحقق لبقية مدن المملكة.
                </p>
              </div>
            </div>
          )}

          {socialEntries.length > 0 && (
            <div className="pt-4">
              <h3 className="text-xs font-semibold text-[#68776E] mb-2">حسابات التواصل الاجتماعي</h3>
              <div className="flex flex-wrap gap-3">
                {socialEntries.map((s) => (
                  <a
                    key={s.label}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg border border-[#17251F]/12 bg-[#FAF8F3] px-3 py-1.5 text-xs font-medium text-[#17251F] hover:border-[#245745] hover:text-[#245745] transition-colors"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
