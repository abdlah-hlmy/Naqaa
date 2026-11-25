import { siteConfig } from '../data/siteConfig';

let liveWhatsappNumber = siteConfig.whatsappNumber;

export function setLiveWhatsappNumber(num: string) {
  liveWhatsappNumber = num || '';
}

export interface QuotePayload {
  name: string;
  phone: string;
  city: string;
  district: string;
  service: string;
  bundleLabel?: string;
  tierLabel?: string;
  estimateLabel?: string;
  area?: string;
  rooms?: string;
  details?: string;
}

/**
 * تطبيع الأرقام العربية/الهندية إلى أرقام إنجليزية والتحقق من صيغة الجوال السعودي
 */
export function normalizeDigits(value: string): string {
  return value
    .replace(/[٠-٩]/g, (d) => String('٠١٢٣٤٥٦٧٨٩'.indexOf(d)))
    .replace(/[۰-۹]/g, (d) => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(d)))
    .replace(/[\s\-()]/g, '');
}

export function isValidSaudiPhone(rawPhone: string): boolean {
  const cleaned = normalizeDigits(rawPhone.trim());
  return /^(?:(?:\+|00)?966|0)?5\d{8}$/.test(cleaned);
}

export function formatSaudiPhoneDisplay(rawPhone: string): string {
  const cleaned = normalizeDigits(rawPhone.trim());
  const match = cleaned.match(/^(?:(?:\+|00)?966|0)?(5\d{8})$/);
  if (!match) return rawPhone.trim();
  return `0${match[1]}`;
}

export function buildQuoteWhatsAppMessage(payload: QuotePayload): string {
  const lines = [
    'السلام عليكم، أرغب بطلب عرض سعر من نقاء.',
    '',
    `الاسم: ${payload.name.trim()}`,
    `رقم الجوال: ${formatSaudiPhoneDisplay(payload.phone)}`,
    `المدينة: ${payload.city.trim()}`,
    `الحي: ${payload.district.trim()}`,
    `الخدمة: ${payload.service.trim()}`,
  ];

  if (payload.bundleLabel && payload.bundleLabel.trim()) {
    lines.push(`الباقة المختارة: ${payload.bundleLabel.trim()}`);
  }
  if (payload.tierLabel && payload.tierLabel.trim()) {
    lines.push(`حجم المكان / النطاق: ${payload.tierLabel.trim()}`);
  }
  if (payload.estimateLabel && payload.estimateLabel.trim()) {
    lines.push(`التقدير المبدئي الظاهر بالموقع: ${payload.estimateLabel.trim()}`);
  }
  if (payload.area && payload.area.trim()) {
    lines.push(`مساحة المكان: ${payload.area.trim()}`);
  }
  if (payload.rooms && payload.rooms.trim()) {
    lines.push(`عدد الغرف: ${payload.rooms.trim()}`);
  }
  if (payload.details && payload.details.trim()) {
    lines.push(`تفاصيل إضافية: ${payload.details.trim()}`);
  }

  return lines.join('\n');
}

export function getWhatsAppUrl(message: string, overrideNumber?: string): string {
  const encoded = encodeURIComponent(message);
  const rawNumber = overrideNumber !== undefined ? overrideNumber : liveWhatsappNumber;
  const configuredNumber = normalizeDigits(rawNumber || '').replace(/^\+/, '');

  if (configuredNumber && configuredNumber.length >= 9) {
    return `https://wa.me/${configuredNumber}?text=${encoded}`;
  }

  return `https://wa.me/?text=${encoded}`;
}

export function getDirectWhatsAppUrl(
  defaultMessage = 'السلام عليكم، أرغب بالاستفسار عن خدمات نقاء.',
  overrideNumber?: string
): string {
  return getWhatsAppUrl(defaultMessage, overrideNumber);
}
