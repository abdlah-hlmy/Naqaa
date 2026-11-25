import React from 'react';
import Link from 'next/link';
import { ArrowLeft, FileText, MapPin, MessageCircle, Sparkles } from 'lucide-react';

const helpfulLinks = [
  {
    href: '/services',
    label: 'خدماتنا',
    detail: 'تصفح تفاصيل الخدمات الأربع ونطاق كل خدمة',
    icon: Sparkles,
  },
  {
    href: '/locations',
    label: 'مناطق التغطية',
    detail: 'تحقق من المدن والأحياء المتاحة حالياً',
    icon: MapPin,
  },
  {
    href: '/articles',
    label: 'المقالات',
    detail: 'إرشادات عملية للعناية بالمنزل والمفروشات',
    icon: FileText,
  },
  {
    href: '/contact',
    label: 'تواصل معنا',
    detail: 'أرسل تفاصيل مكانك واطلب عرض سعر واضح',
    icon: MessageCircle,
  },
];

export const NotFoundView: React.FC = () => {
  return (
    <div className="py-16 sm:py-24 bg-[#FAF8F3]">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 text-center">
        <p className="text-sm font-semibold text-[#245745] tabular-nums mb-2">404</p>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#17251F]">الصفحة غير موجودة</h1>
        <p className="mt-3 text-base text-[#68776E] max-w-lg mx-auto">
          الرابط الذي حاولت الوصول إليه غير متوفر أو تم نقله. يمكنك العودة إلى الرئيسية أو الانتقال مباشرة إلى أحد الأقسام التالية:
        </p>

        <div className="mt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-[#245745] px-7 py-3.5 text-sm font-semibold text-[#FAF8F3] hover:bg-[#17251F] transition-colors"
          >
            <span>العودة إلى الرئيسية</span>
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4 text-start">
          {helpfulLinks.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="group rounded-2xl border border-[#17251F]/10 bg-[#EFEADC]/45 p-5 hover:border-[#245745]/45 hover:bg-[#EFEADC]/80 transition-colors flex items-start justify-between gap-3"
              >
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#FAF8F3] border border-[#17251F]/10 text-[#245745]">
                    <Icon className="w-4 h-4" />
                  </span>
                  <div>
                    <h2 className="text-sm font-bold text-[#17251F] group-hover:text-[#245745] transition-colors">
                      {item.label}
                    </h2>
                    <p className="text-xs text-[#68776E] mt-1 leading-relaxed">{item.detail}</p>
                  </div>
                </div>
                <ArrowLeft className="w-4 h-4 text-[#245745] shrink-0 mt-1 transition-transform group-hover:-translate-x-1" />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};
