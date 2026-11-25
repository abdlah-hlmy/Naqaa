export interface NavItem {
  label: string;
  href: string;
}

export interface SiteConfig {
  brandName: string;
  brandEnglish: string;
  sloganMain: string;
  sloganHero: string;
  taglineStrip: string;
  description: string;
  siteUrl: string;
  /**
   * ضع رقم الواتساب الرسمي بصيغة دولية بدون + (مثال: 966501234567)
   * عند تركه فارغاً، يقوم النموذج بتجهيز الرسالة وفتح واتساب لاختيار الإرسال مباشرة دون عرض أي رقم وهمي.
   */
  whatsappNumber: string;
  phoneDisplay: string;
  email: string;
  workingHours: string;
  socialLinks: {
    instagram?: string;
    x?: string;
    snapchat?: string;
    tiktok?: string;
  };
  navItems: NavItem[];
  seoDefaults: {
    titleTemplate: string;
    defaultTitle: string;
    defaultDescription: string;
  };
}

export const siteConfig: SiteConfig = {
  brandName: 'نقاء',
  brandEnglish: 'NAQAA',
  sloganMain: 'نقاء. راحة تبدأ من المكان.',
  sloganHero: 'بيتك يرجع كأنه جديد',
  taglineStrip: 'نرتب، ننظف، ونمشي.. وأنت ما تحس بشي',
  description:
    'خدمات تنظيف المنازل والمكيفات والكنب والسجاد وتنظيف ما بعد التشطيب في المملكة العربية السعودية، بعناية واضحة وسعر تعرفه قبل ما نبدأ.',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://naqaa.sa',
  whatsappNumber: '201559189500',
  phoneDisplay: '+201559189500',
  email: 'info@naqaa.sa',
  workingHours: 'يتم تحديد الموعد المناسب حسب جدول الزيارات المتاح عند تأكيد الطلب',
  socialLinks: {},
  navItems: [
    { label: 'خدماتنا', href: '/services' },
    { label: 'مناطق التغطية', href: '/locations' },
    { label: 'المقالات', href: '/articles' },
    { label: 'من نحن', href: '/about' },
    { label: 'تواصل معنا', href: '/contact' },
  ],
  seoDefaults: {
    titleTemplate: '%s | نقاء — NAQAA',
    defaultTitle: 'نقاء | NAQAA — بيتك يرجع كأنه جديد',
    defaultDescription:
      'خدمات تنظيف المنازل والمكيفات في المملكة العربية السعودية، بعناية واضحة وسعر تعرفه قبل ما نبدأ.',
  },
};

export interface WhyNaqaaItem {
  id: string;
  number: string;
  title: string;
  description: string;
}

export const whyNaqaaItems: WhyNaqaaItem[] = [
  {
    id: 'easy-request',
    number: '01',
    title: 'سهولة طلب الخدمة',
    description: 'تطلب عرض السعر بخطوات مختصرة، وترسل تفاصيل مكانك مباشرة بدون إجراءات معقدة.',
  },
  {
    id: 'clear-scope',
    number: '02',
    title: 'وضوح تفاصيل الخدمة والسعر',
    description: 'نشرح لك وش يشمله التنظيف ونعطيك السعر واضحاً قبل ما نبدأ العمل في موقعك.',
  },
  {
    id: 'detail-care',
    number: '03',
    title: 'الاهتمام بالتفاصيل',
    description: 'نركز على الزوايا، الأسطح، والحواف التي تصنع الفرق الحقيقي في نظافة المكان وراحته.',
  },
  {
    id: 'scheduling',
    number: '04',
    title: 'ترتيب المواعيد',
    description: 'ننسّق معك موعد الزيارة المسبق حسب الوقت الأنسب لك وبوضوح في مدة التنفيذ.',
  },
  {
    id: 'coverage',
    number: '05',
    title: 'تغطية المناطق المتاحة',
    description: 'نوضح نطاق التغطية الفعلي والأحياء المخدومة بشفافية قبل تأكيد أي موعد.',
  },
  {
    id: 'professionalism',
    number: '06',
    title: 'التعامل باحترافية',
    description: 'احترام خصوصية المنزل والتعامل الهادئ المنظم مع الأثاث والمقتنيات طوال الزيارة.',
  },
];

export interface PricingFactor {
  id: string;
  title: string;
  detail: string;
}

export const pricingFactors: PricingFactor[] = [
  {
    id: 'area',
    title: 'مساحة المكان',
    detail: 'تقدير المساحة الإجمالية للشقة، الفلة، أو الوحدة السكنية.',
  },
  {
    id: 'rooms',
    title: 'عدد الغرف والمرافق',
    detail: 'عدد الغرف، المجالس، دورات المياه، والمطابخ المشمولة في الطلب.',
  },
  {
    id: 'service-type',
    title: 'نوع الخدمة المطلوبة',
    detail: 'تنظيف منازل، تنظيف مكيفات، كنب وسجاد، أو تنظيف بعد التشطيب.',
  },
  {
    id: 'condition',
    title: 'حالة المكان الحالية',
    detail: 'مستوى الاتساخ أو وجود بقايا دهان وغبار إنشائي يتطلب عناية إضافية.',
  },
  {
    id: 'details',
    title: 'تفاصيل العمل المطلوبة',
    detail: 'أي طلبات إضافية تتفق عليها معنا مسبقاً مثل عدد المكيفات أو نوع المفروشات.',
  },
];

export interface PreArrivalItem {
  id: string;
  title: string;
  description: string;
}

export const preArrivalChecklist: PreArrivalItem[] = [
  {
    id: 'utilities',
    title: 'تأكد من توفر الماء والكهرباء',
    description: 'لتنفيذ أعمال الغسيل والتنظيف والتجفيف بالشكل المطلوب دون تأخير.',
  },
  {
    id: 'pets',
    title: 'خلنا نعرف إذا عندك حيوانات أليفة',
    description: 'لنراعي ذلك في ترتيب الغرف واختيار مواد التنظيف المناسبة.',
  },
  {
    id: 'fragile',
    title: 'حدد الأغراض الثمينة أو الهشة',
    description: 'تنبيه الفريق قبل البدء يحمي مقتنياتك الخاصة والتحف الحساسة.',
  },
  {
    id: 'parking',
    title: 'وفر مكان لوقوف الفريق',
    description: 'تسهيل وصول المعدات والأدوات يختصر وقت التجهيز عند الوصول.',
  },
];

export interface WorkStep {
  number: string;
  title: string;
  description: string;
}

export const workSteps: WorkStep[] = [
  {
    number: '01',
    title: 'تواصل معنا وأخبرنا عن احتياجك',
    description: 'عبّ نموذج طلب عرض السعر أو راسلنا وحدد المدينة، الحي، ونوع الخدمة المطلوبة.',
  },
  {
    number: '02',
    title: 'نحدد الخدمة ونعطيك عرض السعر',
    description: 'نراجع تفاصيل المكان معك ونوضح لك نطاق العمل والسعر الإجمالي قبل الموعد.',
  },
  {
    number: '03',
    title: 'نرتب موعد الزيارة وننفذ الخدمة',
    description: 'نؤكد الوقت المناسب لك ونصل بالمعدات المخصصة لنعيد للمكان ترتيبه ونظافته.',
  },
];
