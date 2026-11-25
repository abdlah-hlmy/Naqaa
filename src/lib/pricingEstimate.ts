export interface ServiceBundleOption {
  id: string;
  label: string;
  primaryService: string;
  description: string;
  extraMinPrice: number;
  extraMaxPrice: number;
  extraHours: string;
}

export interface PropertyTierOption {
  id: string;
  label: string;
  sublabel: string;
}

export interface PriceEstimateResult {
  minPrice: number;
  maxPrice: number;
  durationLabel: string;
}

export const serviceBundles: ServiceBundleOption[] = [
  {
    id: 'home-plus-ac',
    label: 'تنظيف منزل + تنظيف مكيفات',
    primaryService: 'تنظيف منازل',
    description: 'تنظيف شامل للبيت مع غسيل حتى 3 مكيفات سبليت',
    extraMinPrice: 300,
    extraMaxPrice: 480,
    extraHours: '1.5 ساعة إضافية',
  },
  {
    id: 'majlis-sofa-carpet',
    label: 'تنظيف مجلس + كنب وسجاد',
    primaryService: 'تنظيف كنب وسجاد',
    description: 'تنظيف الكنب والسجاد مع إضافة 4 إلى 6 مقاعد للمجلس',
    extraMinPrice: 120,
    extraMaxPrice: 210,
    extraHours: '1 ساعة إضافية',
  },
  {
    id: 'post-construction-full',
    label: 'تجهيز ما بعد التشطيب + مكيفات',
    primaryService: 'تنظيف بعد التشطيب',
    description: 'إزالة آثار الدهان والغبار الإنشائي مع تنظيف المكيفات قبل السكن',
    extraMinPrice: 300,
    extraMaxPrice: 480,
    extraHours: '1.5 ساعة إضافية',
  },
];

export const propertyTiersByService: Record<string, PropertyTierOption[]> = {
  'تنظيف منازل': [
    { id: 'small', label: 'شقة صغيرة', sublabel: 'غرفتان إلى 3 غرف' },
    { id: 'medium', label: 'شقة واسعة / دور', sublabel: '4 إلى 5 غرف' },
    { id: 'large', label: 'فيلا كاملة', sublabel: 'مساحة كبيرة وطابقين' },
  ],
  'تنظيف مكيفات': [
    { id: 'small', label: '1 إلى 2 مكيف', sublabel: 'تنظيف سريع' },
    { id: 'medium', label: '3 إلى 5 مكيفات', sublabel: 'تغطية شقة متوسطة' },
    { id: 'large', label: '6 إلى 8 مكيفات', sublabel: 'فيلا أو طابقين' },
  ],
  'تنظيف كنب وسجاد': [
    { id: 'small', label: 'طقم كنب واحد أو سجادتين', sublabel: 'حتى 7 مقاعد' },
    { id: 'medium', label: 'مجلس + صالة', sublabel: 'حتى 14 مقعداً' },
    { id: 'large', label: 'عدة مجالس ومفروشات', sublabel: 'منزل كامل' },
  ],
  'تنظيف بعد التشطيب': [
    { id: 'small', label: 'شقة جديدة', sublabel: 'حتى 150 م²' },
    { id: 'medium', label: 'دور أو دوبلكس', sublabel: '150 إلى 260 م²' },
    { id: 'large', label: 'فيلا بعد التشطيب', sublabel: 'أكثر من 260 م²' },
  ],
};

const baseEstimates: Record<
  string,
  Record<'small' | 'medium' | 'large', PriceEstimateResult>
> = {
  'تنظيف منازل': {
    small: { minPrice: 500, maxPrice: 650, durationLabel: '3 – 4 ساعات' },
    medium: { minPrice: 700, maxPrice: 1000, durationLabel: '4 – 6 ساعات' },
    large: { minPrice: 1800, maxPrice: 2500, durationLabel: '6 – 8 ساعات' },
  },
  'تنظيف مكيفات': {
    small: { minPrice: 100, maxPrice: 300, durationLabel: '1 – 1.5 ساعة' },
    medium: { minPrice: 300, maxPrice: 700, durationLabel: '2 – 3 ساعات' },
    large: { minPrice: 600, maxPrice: 1200, durationLabel: '3.5 – 5 ساعات' },
  },
  'تنظيف كنب وسجاد': {
    small: { minPrice: 210, maxPrice: 320, durationLabel: '1.5 – 2.5 ساعة' },
    medium: { minPrice: 420, maxPrice: 650, durationLabel: '2.5 – 4 ساعات' },
    large: { minPrice: 700, maxPrice: 1100, durationLabel: '4 – 6 ساعات' },
  },
  'تنظيف بعد التشطيب': {
    small: { minPrice: 500, maxPrice: 700, durationLabel: '5 – 6 ساعات' },
    medium: { minPrice: 1000, maxPrice: 1700, durationLabel: '6 – 8 ساعات' },
    large: { minPrice: 2500, maxPrice: 3800, durationLabel: 'يوم عمل كامل' },
  },
};

export function calculatePriceEstimate(
  serviceTitle: string,
  tier: 'small' | 'medium' | 'large',
  bundleId?: string | null
): PriceEstimateResult {
  const serviceMap = baseEstimates[serviceTitle] || baseEstimates['تنظيف منازل'];
  const base = serviceMap[tier] || serviceMap.medium;
  const bundle = serviceBundles.find((b) => b.id === bundleId);

  if (!bundle) {
    return base;
  }

  return {
    minPrice: base.minPrice + bundle.extraMinPrice,
    maxPrice: base.maxPrice + bundle.extraMaxPrice,
    durationLabel: `${base.durationLabel} (+ ${bundle.extraHours})`,
  };
}
