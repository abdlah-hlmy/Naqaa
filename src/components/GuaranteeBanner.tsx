import React from 'react';
import { Banknote, ClipboardCheck, ShieldCheck } from 'lucide-react';

interface GuaranteeBannerProps {
  compact?: boolean;
  className?: string;
}

const guaranteePillars = [
  {
    id: 'walkthrough',
    icon: ClipboardCheck,
    title: 'معاينة قبل المغادرة',
    detail: 'نراجع معك كل غرفة وسطح بعد الانتهاء للتأكد من رضاك التام قبل تسليم المكان.',
  },
  {
    id: 'followup',
    icon: ShieldCheck,
    title: 'متابعة خلال 24 ساعة',
    detail: 'إذا ظهرت أي ملاحظة بعد مغادرة الفريق، نرجع لمتابعتها وتعديلها بكل رحابة صدر.',
  },
  {
    id: 'pricing-clarity',
    icon: Banknote,
    title: 'سعر متفق عليه قبل البدء',
    detail: 'لا توجد رسوم خفية أو إضافات مفاجئة عند الوصول — التكلفة واضحة ومؤكدة مسبقاً.',
  },
];

export const GuaranteeBanner: React.FC<GuaranteeBannerProps> = ({
  compact = false,
  className = '',
}) => {
  return (
    <div
      className={`rounded-3xl border border-[#245745]/15 bg-[#EFEADC]/65 ${
        compact ? 'p-5 sm:p-6' : 'p-6 sm:p-8'
      } ${className}`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-5 mb-6 border-b border-[#17251F]/10">
        <div>
          <span className="text-xs font-semibold text-[#245745] block mb-1">
            ضمان التسليم والمتابعة
          </span>
          <h3 className="text-lg sm:text-xl font-bold text-[#17251F]">
            تطمن قبل الموعد وبعده
          </h3>
        </div>
        <p className="text-xs sm:text-sm text-[#68776E]">
          نلتزم بمراجعة العمل معك خطوة بخطوة قبل اعتماد الانتهاء.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {guaranteePillars.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className="rounded-2xl border border-[#17251F]/8 bg-[#FAF8F3] p-4 sm:p-5 flex items-start gap-3.5"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#245745]/10 text-[#245745]">
                <Icon className="w-5 h-5" />
              </span>
              <div>
                <h4 className="text-sm sm:text-base font-bold text-[#17251F] mb-1">
                  {item.title}
                </h4>
                <p className="text-xs sm:text-sm text-[#68776E] leading-relaxed">
                  {item.detail}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
