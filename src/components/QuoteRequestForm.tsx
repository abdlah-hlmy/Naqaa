'use client';

import React, { useEffect, useState } from 'react';
import {
  Check,
  Copy,
  AlertCircle,
  MessageCircle,
  ArrowUpLeft,
  User,
  Phone,
  MapPin,
  Sparkles,
  Maximize2,
  DoorOpen,
  Building2,
  Layers,
  Clock,
  Calculator,
} from 'lucide-react';
import { servicesData } from '../data/services';
import { useSiteData } from '../context/SiteDataContext';
import {
  buildQuoteWhatsAppMessage,
  getWhatsAppUrl,
  isValidSaudiPhone,
} from '../lib/whatsapp';
import {
  calculatePriceEstimate,
  propertyTiersByService,
  serviceBundles,
} from '../lib/pricingEstimate';
import { CustomSelect, CustomSelectOption } from './CustomSelect';

interface QuoteRequestFormProps {
  defaultService?: string;
  defaultCity?: string;
  compact?: boolean;
  onSuccess?: () => void;
}

interface FormErrors {
  name?: string;
  phone?: string;
  city?: string;
  district?: string;
  service?: string;
}

export const QuoteRequestForm: React.FC<QuoteRequestFormProps> = ({
  defaultService = '',
  defaultCity = 'الرياض',
  compact = false,
  onSuccess,
}) => {
  const { locations: locationsData, siteConfig } = useSiteData();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState(defaultCity || locationsData[0]?.name || 'الرياض');
  const [district, setDistrict] = useState('');
  const [service, setService] = useState(defaultService || servicesData[0].title);
  const [tier, setTier] = useState<'small' | 'medium' | 'large'>('medium');
  const [selectedBundleId, setSelectedBundleId] = useState<string | null>(null);
  const [area, setArea] = useState('');
  const [rooms, setRooms] = useState('');
  const [details, setDetails] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [preparedMessage, setPreparedMessage] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (defaultService) {
      setService(defaultService);
      setSelectedBundleId(null);
    }
  }, [defaultService]);

  useEffect(() => {
    if (defaultCity) setCity(defaultCity);
  }, [defaultCity]);

  const selectedCityObj = locationsData.find((c) => c.name === city);
  const suggestedDistricts = selectedCityObj?.neighborhoods || [];

  const tierOptions =
    propertyTiersByService[service] || propertyTiersByService['تنظيف منازل'];
  const activeTierObj = tierOptions.find((t) => t.id === tier) || tierOptions[1];
  const activeBundle = serviceBundles.find((b) => b.id === selectedBundleId) || null;
  const estimate = calculatePriceEstimate(service, tier, selectedBundleId);

  const cityOptions: CustomSelectOption[] = locationsData.map((loc) => ({
    value: loc.name,
    label: loc.name,
    meta: loc.coverageLabel,
    highlight: loc.coverageStatus === 'active',
  }));

  const serviceOptions: CustomSelectOption[] = servicesData.map((srv) => ({
    value: srv.title,
    label: srv.title,
    meta: srv.shortTitle,
  }));

  const handleSelectBundle = (bundleId: string) => {
    if (selectedBundleId === bundleId) {
      setSelectedBundleId(null);
      return;
    }
    const found = serviceBundles.find((b) => b.id === bundleId);
    if (!found) return;
    setSelectedBundleId(found.id);
    setService(found.primaryService);
    if (errors.service) setErrors((prev) => ({ ...prev, service: undefined }));
  };

  const validate = (): boolean => {
    const nextErrors: FormErrors = {};

    if (!name.trim() || name.trim().length < 2) {
      nextErrors.name = 'فضلاً أدخل الاسم الكامل.';
    }

    if (!phone.trim()) {
      nextErrors.phone = 'رقم الجوال مطلوب للتواصل وتأكيد العرض.';
    } else if (!isValidSaudiPhone(phone)) {
      nextErrors.phone = 'أدخل رقم جوال سعودي صحيح يبدأ بـ 05 (مثال: 0551234567).';
    }

    if (!city.trim()) {
      nextErrors.city = 'اختر المدينة.';
    }

    if (!district.trim()) {
      nextErrors.district = 'أدخل اسم الحي للتحقق من التغطية.';
    }

    if (!service.trim()) {
      nextErrors.service = 'اختر نوع الخدمة المطلوبة.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const estimateLabel = `${estimate.minPrice} – ${estimate.maxPrice} ر.س (${estimate.durationLabel})`;

    const message = buildQuoteWhatsAppMessage({
      name,
      phone,
      city,
      district,
      service,
      bundleLabel: activeBundle?.label,
      tierLabel: activeTierObj ? `${activeTierObj.label} (${activeTierObj.sublabel})` : undefined,
      estimateLabel,
      area,
      rooms,
      details,
    });

    setPreparedMessage(message);
    if (onSuccess) onSuccess();
  };

  const handleCopy = async () => {
    if (!preparedMessage) return;
    try {
      await navigator.clipboard.writeText(preparedMessage);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };

  if (preparedMessage) {
    const whatsappHref = getWhatsAppUrl(preparedMessage, siteConfig.whatsappNumber);

    return (
      <div className="rounded-2xl bg-[#FAF8F3] border border-[#245745]/25 p-6 sm:p-8 text-start">
        <div className="flex items-start gap-3.5 mb-5">
          <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#245745] text-[#FAF8F3]">
            <Check className="w-5 h-5" />
          </span>
          <div>
            <h3 className="text-lg font-bold text-[#17251F]">تم تجهيز طلب عرض السعر بنجاح</h3>
            <p className="text-sm text-[#68776E] mt-1 leading-relaxed">
              بياناتك جاهزة ومرتبة. أرسلها مباشرة عبر واتساب لتأكيد تغطية الحي واستلام السعر الواضح.
            </p>
          </div>
        </div>

        <pre className="whitespace-pre-wrap font-sans text-sm text-[#17251F] bg-[#EFEADC]/65 border border-[#17251F]/10 rounded-xl p-4 sm:p-5 leading-relaxed mb-5">
          {preparedMessage}
        </pre>

        <div className="flex flex-wrap items-center gap-3">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#245745] px-7 py-3.5 text-sm font-semibold text-[#FAF8F3] hover:bg-[#17251F] transition-colors whitespace-nowrap shrink-0"
          >
            <MessageCircle className="w-4 h-4" />
            <span>إرسال الطلب عبر واتساب</span>
            <ArrowUpLeft className="w-4 h-4" />
          </a>

          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-[#17251F]/20 bg-transparent px-5 py-3.5 text-sm font-medium text-[#17251F] hover:bg-[#EFEADC] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4 text-[#245745]" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'تم النسخ' : 'نسخ نص الطلب'}</span>
          </button>

          <button
            type="button"
            onClick={() => setPreparedMessage(null)}
            className="text-sm font-medium text-[#68776E] hover:text-[#17251F] underline underline-offset-4 px-2 py-2 transition-colors cursor-pointer"
          >
            تعديل البيانات
          </button>
        </div>
      </div>
    );
  }

  const inputBase =
    'w-full rounded-xl border border-[#17251F]/15 bg-[#FAF8F3] pr-10 pl-4 py-3 text-sm text-[#17251F] placeholder:text-[#68776E]/70 focus:outline-none focus:border-[#245745] focus:ring-2 focus:ring-[#245745]/15 transition-colors';

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5 text-start">
      {/* شريط اختيار الخدمة السريع */}
      {!compact && (
        <div>
          <span className="block text-xs font-semibold text-[#17251F] mb-2">
            اختر الخدمة المطلوبة <span className="text-[#245745]">*</span>
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {servicesData.map((srv) => {
              const active = service === srv.title;
              return (
                <button
                  key={srv.id}
                  type="button"
                  onClick={() => {
                    setService(srv.title);
                    if (activeBundle && activeBundle.primaryService !== srv.title) {
                      setSelectedBundleId(null);
                    }
                    if (errors.service) setErrors((prev) => ({ ...prev, service: undefined }));
                  }}
                  className={`rounded-xl border px-3 py-2.5 text-xs sm:text-sm font-medium text-start transition-colors cursor-pointer ${
                    active
                      ? 'border-[#245745] bg-[#245745] text-[#FAF8F3]'
                      : 'border-[#17251F]/12 bg-[#FAF8F3] text-[#17251F] hover:border-[#245745]/45 hover:bg-[#EFEADC]/50'
                  }`}
                >
                  <span
                    className={`block text-[10px] tabular-nums mb-0.5 ${
                      active ? 'text-[#EFEADC]' : 'text-[#68776E]'
                    }`}
                  >
                    {srv.number}
                  </span>
                  <span className="block truncate">{srv.title}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* الباقات الجاهزة بنقرة واحدة */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#17251F]">
            <Layers className="w-3.5 h-3.5 text-[#245745]" />
            <span>باقات سريعة مدمجة</span>
            <span className="text-[#68776E] font-normal">(اختياري)</span>
          </span>
          {selectedBundleId && (
            <button
              type="button"
              onClick={() => setSelectedBundleId(null)}
              className="text-[11px] font-medium text-[#245745] hover:underline cursor-pointer"
            >
              إلغاء الباقة
            </button>
          )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {serviceBundles.map((bundle) => {
            const isSelected = selectedBundleId === bundle.id;
            return (
              <button
                key={bundle.id}
                type="button"
                onClick={() => handleSelectBundle(bundle.id)}
                className={`rounded-xl border p-3 text-start transition-colors cursor-pointer ${
                  isSelected
                    ? 'border-[#245745] bg-[#245745]/8 text-[#17251F]'
                    : 'border-[#17251F]/12 bg-[#FAF8F3] text-[#17251F] hover:border-[#245745]/45'
                }`}
              >
                <span className="flex items-center justify-between gap-2 text-xs font-bold text-[#17251F]">
                  <span>{bundle.label}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-[#245745] shrink-0" />}
                </span>
                <span className="block text-[11px] text-[#68776E] mt-1 leading-relaxed">
                  {bundle.description}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* حجم المكان / النطاق + معاينة التقدير المبدئي */}
      <div className="rounded-2xl border border-[#17251F]/10 bg-[#EFEADC]/50 p-4 space-y-3.5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <span className="text-xs font-semibold text-[#17251F]">
            حجم المكان أو عدد الوحدات للتقدير المبدئي
          </span>
          <span className="text-[11px] text-[#68776E]">
            يتحدّث السعر الاسترشادي تلقائياً حسب اختيارك
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {tierOptions.map((opt) => {
            const active = tier === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => setTier(opt.id as 'small' | 'medium' | 'large')}
                className={`rounded-xl border px-3.5 py-2.5 text-start transition-colors cursor-pointer ${
                  active
                    ? 'border-[#245745] bg-[#FAF8F3] ring-1 ring-[#245745]'
                    : 'border-[#17251F]/10 bg-[#FAF8F3]/75 hover:border-[#245745]/40'
                }`}
              >
                <span className="block text-xs font-bold text-[#17251F]">{opt.label}</span>
                <span className="block text-[11px] text-[#68776E] mt-0.5">{opt.sublabel}</span>
              </button>
            );
          })}
        </div>

        <div className="rounded-xl border border-[#245745]/20 bg-[#FAF8F3] px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#245745]/10 text-[#245745]">
              <Calculator className="w-4 h-4" />
            </span>
            <div>
              <span className="block text-[11px] text-[#68776E]">
                النطاق السعري المبدئي
              </span>
              <span className="text-base sm:text-lg font-bold text-[#245745] tabular-nums">
                {estimate.minPrice} – {estimate.maxPrice} ر.س
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-[#17251F]">
            <Clock className="w-4 h-4 text-[#245745] shrink-0" />
            <div>
              <span className="text-[#68776E]">المدة المتوقعة: </span>
              <span className="font-semibold tabular-nums">{estimate.durationLabel}</span>
            </div>
          </div>
        </div>

        <p className="text-[11px] text-[#68776E] leading-relaxed">
          هذا التقدير مبدئي للاستئناس فقط؛ يُؤكد السعر النهائي بوضوح قبل اعتماد الموعد وبعد مراجعة التفاصيل.
        </p>
      </div>

      {/* الصف الأول: الاسم + رقم الجوال */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="quote-name" className="block text-xs font-semibold text-[#17251F] mb-1.5">
            الاسم <span className="text-[#245745]">*</span>
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-[#68776E] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              id="quote-name"
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
              }}
              placeholder="مثال: عبدالله العتيبي"
              className={inputBase}
              aria-invalid={Boolean(errors.name)}
            />
          </div>
          {errors.name && (
            <p className="mt-1.5 flex items-center gap-1 text-xs text-red-700">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{errors.name}</span>
            </p>
          )}
        </div>

        <div>
          <label htmlFor="quote-phone" className="block text-xs font-semibold text-[#17251F] mb-1.5">
            رقم الجوال السعودي <span className="text-[#245745]">*</span>
          </label>
          <div className="relative">
            <Phone className="w-4 h-4 text-[#68776E] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              id="quote-phone"
              type="tel"
              dir="ltr"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
              }}
              placeholder="05XXXXXXXX"
              className={`${inputBase} text-right tabular-nums`}
              aria-invalid={Boolean(errors.phone)}
            />
          </div>
          {errors.phone && (
            <p className="mt-1.5 flex items-center gap-1 text-xs text-red-700">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{errors.phone}</span>
            </p>
          )}
        </div>
      </div>

      {/* الصف الثاني: المدينة (CustomSelect) + الحي */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <CustomSelect
          id="quote-city"
          label="المدينة"
          required
          value={city}
          onChange={(val) => {
            setCity(val);
            if (errors.city) setErrors((prev) => ({ ...prev, city: undefined }));
          }}
          options={cityOptions}
          searchable
          searchPlaceholder="ابحث عن مدينتك..."
          icon={<Building2 className="w-4 h-4" />}
          error={errors.city}
        />

        <div>
          <label htmlFor="quote-district" className="block text-xs font-semibold text-[#17251F] mb-1.5">
            الحي <span className="text-[#245745]">*</span>
          </label>
          <div className="relative">
            <MapPin className="w-4 h-4 text-[#68776E] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              id="quote-district"
              type="text"
              value={district}
              onChange={(e) => {
                setDistrict(e.target.value);
                if (errors.district) setErrors((prev) => ({ ...prev, district: undefined }));
              }}
              placeholder={suggestedDistricts.length > 0 ? `مثال: ${suggestedDistricts[0]}` : 'اكتب اسم الحي'}
              className={inputBase}
              aria-invalid={Boolean(errors.district)}
            />
          </div>
          {errors.district && (
            <p className="mt-1.5 flex items-center gap-1 text-xs text-red-700">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{errors.district}</span>
            </p>
          )}
        </div>
      </div>

      {/* اختيارات سريعة لأحياء المدينة */}
      {suggestedDistricts.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 rounded-xl bg-[#EFEADC]/50 border border-[#17251F]/8 px-3.5 py-2.5">
          <span className="text-xs text-[#68776E]">أحياء متاحة في {city}:</span>
          {suggestedDistricts.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => {
                setDistrict(item);
                if (errors.district) setErrors((prev) => ({ ...prev, district: undefined }));
              }}
              className={`rounded-lg px-3 py-1 text-xs font-medium border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                district === item
                  ? 'border-[#245745] bg-[#245745] text-[#FAF8F3]'
                  : 'border-[#17251F]/15 bg-[#FAF8F3] text-[#17251F] hover:border-[#245745]/50'
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      )}

      {/* الصف الثالث: نوع الخدمة (CustomSelect) + المساحة + الغرف */}
      <div className={`grid grid-cols-1 ${compact ? 'sm:grid-cols-2' : 'sm:grid-cols-3'} gap-4`}>
        <CustomSelect
          id="quote-service"
          label="نوع الخدمة"
          required
          value={service}
          onChange={(val) => {
            setService(val);
            if (activeBundle && activeBundle.primaryService !== val) {
              setSelectedBundleId(null);
            }
            if (errors.service) setErrors((prev) => ({ ...prev, service: undefined }));
          }}
          options={serviceOptions}
          icon={<Sparkles className="w-4 h-4" />}
          error={errors.service}
        />

        <div>
          <label htmlFor="quote-area" className="block text-xs font-semibold text-[#17251F] mb-1.5">
            مساحة المكان <span className="text-[#68776E] font-normal text-[11px]">(اختياري)</span>
          </label>
          <div className="relative">
            <Maximize2 className="w-4 h-4 text-[#68776E] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              id="quote-area"
              type="text"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              placeholder="مثال: 220 م²"
              className={inputBase}
            />
          </div>
        </div>

        <div className={compact ? 'sm:col-span-2' : ''}>
          <label htmlFor="quote-rooms" className="block text-xs font-semibold text-[#17251F] mb-1.5">
            عدد الغرف / المكيفات <span className="text-[#68776E] font-normal text-[11px]">(اختياري)</span>
          </label>
          <div className="relative">
            <DoorOpen className="w-4 h-4 text-[#68776E] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              id="quote-rooms"
              type="text"
              value={rooms}
              onChange={(e) => setRooms(e.target.value)}
              placeholder="مثال: 4 غرف أو 5 مكيفات"
              className={inputBase}
            />
          </div>
        </div>
      </div>

      {/* تفاصيل إضافية */}
      <div>
        <label htmlFor="quote-details" className="block text-xs font-semibold text-[#17251F] mb-1.5">
          تفاصيل إضافية <span className="text-[#68776E] font-normal text-[11px]">(اختياري)</span>
        </label>
        <textarea
          id="quote-details"
          rows={compact ? 2 : 3}
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          placeholder="أي ملاحظات تساعدنا في تحديد السعر بدقة (مثل وجود بقع معينة، موعد مفضل، أو حيوانات أليفة)"
          className="w-full rounded-xl border border-[#17251F]/15 bg-[#FAF8F3] px-4 py-3 text-sm text-[#17251F] placeholder:text-[#68776E]/70 focus:outline-none focus:border-[#245745] focus:ring-2 focus:ring-[#245745]/15 transition-colors"
        />
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[#245745] px-8 py-3.5 text-sm font-semibold text-[#FAF8F3] hover:bg-[#17251F] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
        >
          <span>تجهيز طلب عرض السعر</span>
          <ArrowUpLeft className="w-4 h-4" />
        </button>

        <p className="text-xs text-[#68776E]">
          تُراجع التفاصيل ونزودك بعرض السعر الكامل قبل اعتماد أي موعد.
        </p>
      </div>
    </form>
  );
};
