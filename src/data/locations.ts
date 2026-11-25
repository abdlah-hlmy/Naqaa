export type CoverageStatus = 'active' | 'expanding';

export interface CityLocation {
  slug: string;
  name: string;
  region: string;
  coverageStatus: CoverageStatus;
  coverageLabel: string;
  featured?: boolean;
  shortNote: string;
  localDescription: string;
  localFocusTitle: string;
  localFocusPoints: string[];
  neighborhoods: string[];
  availableServiceSlugs: string[];
  localFaqs: { question: string; answer: string }[];
}

/**
 * ملف بيانات المدن المركزي — مقسّم ومُدار بوضوح لأهم 8 مدن في المملكة العربية السعودية.
 * يمكن تعديل حالة التغطية أو الأحياء أو إضافة مدن جديدة من هنا مباشرة.
 */
export const locationsData: CityLocation[] = [
  {
    slug: 'riyadh',
    name: 'الرياض',
    region: 'منطقة الرياض',
    coverageStatus: 'active',
    coverageLabel: 'تغطية نشطة',
    featured: true,
    shortNote: 'تغطية مفعّلة في أحياء شمال الرياض المختارة مع حجز مسبق واضح.',
    localDescription:
      'تغطي نقاء في مدينة الرياض خدمات تنظيف الفلل والشقق، غسيل المكيفات، تنظيف الكنب والسجاد، وتنظيف ما بعد التشطيب، مع تسعير واضح وموعد منسق مسبقاً يناسب جدولك.',
    localFocusTitle: 'عناية تلائم منازل الرياض وأجواءها',
    localFocusPoints: [
      'إزالة الغبار الدقيق الناتج عن الأجواء الصحراوية عن النوافذ والمجالس والأسطح',
      'تنظيف مكيفات السبليت والكاسيت لرفع كفاءة التبريد خلال الصيف الطويل',
      'تهيئة الفلل والوحدات الجديدة بعد التشطيب في الأحياء الحديثة قبل السكن',
    ],
    neighborhoods: ['الملقا', 'النرجس', 'الياسمين', 'حطين', 'العارض'],
    availableServiceSlugs: [
      'home-cleaning',
      'ac-cleaning',
      'sofa-carpet-cleaning',
      'post-construction-cleaning',
    ],
    localFaqs: [
      {
        question: 'ما الأحياء المغطاة حالياً في الرياض؟',
        answer:
          'تتوفر الخدمة حالياً في أحياء الملقا، النرجس، الياسمين، حطين، والعارض، ويمكن التحقق من الأحياء القريبة عند طلب عرض السعر.',
      },
      {
        question: 'هل تغطون الفلل الكبيرة وتنظيف ما بعد التشطيب في الرياض؟',
        answer:
          'نعم، يتم تسعير الفلل والوحدات السكنية حسب المساحة وعدد الغرف والمرافق وتوضيح مدة التنفيذ قبل الموعد.',
      },
      {
        question: 'هل تتوفر خدمة تنظيف المكيفات في الرياض؟',
        answer:
          'نعم، نغطي تنظيف مكيفات السبليت والشباك والكاسيت مع حماية كاملة للجدار والأثاث.',
      },
    ],
  },
  {
    slug: 'jeddah',
    name: 'جدة',
    region: 'منطقة مكة المكرمة',
    coverageStatus: 'expanding',
    coverageLabel: 'تغطية حسب التوفر',
    shortNote: 'استقبال طلبات تنظيف المنازل والمكيفات والكنب مع تأكيد توفر الحي.',
    localDescription:
      'صُممت خدمات نقاء في جدة لتناسب طبيعة المنازل الساحلية وأثر الرطوبة على المكيفات والمفروشات، مع تأكيد التغطية للحي والموعد المتاح قبل اعتماد الطلب.',
    localFocusTitle: 'اهتمام يناسب الأجواء الساحلية في جدة',
    localFocusPoints: [
      'تنظيف فلاتر المكيفات والوحدة الداخلية وفحص التصريف لتفادي الروائح والرطوبة',
      'معالجة بقع الكنب والسجاد مع شفط مدروس يسرّع الجفاف الطبيعي',
      'تنظيف الزجاج والواجهات الداخلية والأسطح المتأثرة بهواء البحر',
    ],
    neighborhoods: [],
    availableServiceSlugs: [
      'home-cleaning',
      'ac-cleaning',
      'sofa-carpet-cleaning',
      'post-construction-cleaning',
    ],
    localFaqs: [
      {
        question: 'كيف أتأكد من تغطية الحي في جدة؟',
        answer: 'أرسل طلب عرض السعر مع ذكر اسم الحي وسنؤكد لك التوفر والموعد المقترح مباشرة.',
      },
      {
        question: 'هل تشمل الخدمة في جدة تنظيف الكنب والمجالس؟',
        answer: 'نعم، نعاين نوع القماش ونختار طريقة التنظيف والسحب المناسبة لإزالة البقع بأمان.',
      },
    ],
  },
  {
    slug: 'makkah',
    name: 'مكة المكرمة',
    region: 'منطقة مكة المكرمة',
    coverageStatus: 'expanding',
    coverageLabel: 'تغطية حسب التوفر',
    shortNote: 'تنسيق مواعيد تنظيف الشقق والمجالس والمكيفات حسب جدول الزيارات.',
    localDescription:
      'ننسّق طلبات التنظيف السكني وتنظيف المكيفات والمفروشات في مكة المكرمة وفق توفر الفرق في الأحياء السكنية، مع التزام كامل بالخصوصية ووضوح السعر قبل الزيارة.',
    localFocusTitle: 'تنظيم هادئ للمجالس ومنازل الضيافة في مكة',
    localFocusPoints: [
      'تجهيز المجالس وغرف الضيوف قبل المواسم والمناسبات العائلية',
      'تنظيف منظم للشقق السكنية يحفظ خصوصية أهل البيت ومقتنياتهم',
      'غسيل المكيفات وفحص التصريف لتحسين جودة الهواء والتبريد',
    ],
    neighborhoods: [],
    availableServiceSlugs: ['home-cleaning', 'ac-cleaning', 'sofa-carpet-cleaning'],
    localFaqs: [
      {
        question: 'هل يمكن الحجز المسبق في مكة المكرمة؟',
        answer: 'نعم، يفضل إرسال الطلب مسبقاً لتأكيد تغطية الحي وترتيب الموعد المناسب.',
      },
    ],
  },
  {
    slug: 'madinah',
    name: 'المدينة المنورة',
    region: 'منطقة المدينة المنورة',
    coverageStatus: 'expanding',
    coverageLabel: 'تغطية حسب التوفر',
    shortNote: 'عناية متكاملة للمنازل والمجالس والمكيفات مع التحقق المسبق للحي.',
    localDescription:
      'خدمات عناية هادئة ومنظمة للمنازل والمجالس والمكيفات وتنظيف ما بعد التشطيب في المدينة المنورة، مع تحديد السعر ونطاق العمل قبل البدء.',
    localFocusTitle: 'ترتيب ونظافة تليق ببيوت المدينة المنورة',
    localFocusPoints: [
      'عناية شاملة بالصالات والمجالس الواسعة والسجاد المنزلي',
      'تنظيف المكيفات بغطاء حماية يحفظ نظافة الجدران والأثاث',
      'تنظيف الوحدات السكنية الجديدة بعد التشطيب وتسليمها جاهزة للسكن',
    ],
    neighborhoods: [],
    availableServiceSlugs: [
      'home-cleaning',
      'ac-cleaning',
      'sofa-carpet-cleaning',
      'post-construction-cleaning',
    ],
    localFaqs: [
      {
        question: 'هل يتوفر تنظيف ما بعد التشطيب في المدينة المنورة؟',
        answer: 'يمكن تسجيل طلبك وتحديد مساحة العقار والحي وسنؤكد لك التوفر والموعد المتاح.',
      },
    ],
  },
  {
    slug: 'dammam',
    name: 'الدمام',
    region: 'المنطقة الشرقية',
    coverageStatus: 'expanding',
    coverageLabel: 'تغطية حسب التوفر',
    shortNote: 'استقبال طلبات الفلل والشقق والمكيفات في الدمام حسب التوفر.',
    localDescription:
      'في الدمام نساعدك في العناية بنظافة المنزل والمكيفات والمفروشات وتنظيف ما بعد التشطيب بأسلوب هادئ يحفظ جودة الرخام والأخشاب والمقتنيات.',
    localFocusTitle: 'حلول عملية لمنازل الدمام والمجمعات السكنية',
    localFocusPoints: [
      'تنظيف شامل للأرضيات الحجرية والرخام والنوافذ من الداخل',
      'غسيل المكيفات لإزالة الأتربة المتراكمة وتحسين نقاء الهواء',
      'معالجة الكنب والموكيت في الصالات وغرف المعيشة العائلية',
    ],
    neighborhoods: [],
    availableServiceSlugs: [
      'home-cleaning',
      'ac-cleaning',
      'sofa-carpet-cleaning',
      'post-construction-cleaning',
    ],
    localFaqs: [
      {
        question: 'كيف يُحدد السعر لطلبات الدمام؟',
        answer: 'بناءً على مساحة المكان وعدد الغرف ونوع الخدمة وتفاصيل الموقع قبل بدء الزيارة.',
      },
    ],
  },
  {
    slug: 'khobar',
    name: 'الخبر',
    region: 'المنطقة الشرقية',
    coverageStatus: 'expanding',
    coverageLabel: 'تغطية حسب التوفر',
    shortNote: 'طلبات تنظيف الفلل والشقق والمفروشات الفاتحة في الخبر.',
    localDescription:
      'خدمات نقاء في الخبر مصممة لتناسب الفلل والشقق العائلية الحديثة، مع تركيز على حماية الأسطح الحجرية والخشبية والعناية بأقمشة الكنب والسجاد.',
    localFocusTitle: 'عناية دقيقة بالأثاث والأسطح في منازل الخبر',
    localFocusPoints: [
      'مواد تنظيف لطيفة تناسب الرخام الطبيعي والباركيه والخزائن الخشبية',
      'معالجة مدروسة للأقمشة الفاتحة للكنب والستائر والسجاد',
      'تنظيف وحدات التكييف وتفقد خطوط التصريف بدقة',
    ],
    neighborhoods: [],
    availableServiceSlugs: [
      'home-cleaning',
      'ac-cleaning',
      'sofa-carpet-cleaning',
      'post-construction-cleaning',
    ],
    localFaqs: [
      {
        question: 'هل تتوفر مواعيد صباحية أو مسائية في الخبر؟',
        answer: 'يتم تنسيق الوقت الأنسب حسب جدول المواعيد المتاح بعد تأكيد تغطية الحي.',
      },
    ],
  },
  {
    slug: 'taif',
    name: 'الطائف',
    region: 'منطقة مكة المكرمة',
    coverageStatus: 'expanding',
    coverageLabel: 'تغطية حسب التوفر',
    shortNote: 'تجهيز المنازل والمصايف وتنظيف المجالس والمكيفات في الطائف.',
    localDescription:
      'خدمات تنظيف المنازل والمجالس والمكيفات في الطائف تُنسق مسبقاً لتوفير موعد واضح وسعر محدد قبل البدء، خصوصاً عند تجهيز المنازل الموسمية واستقبال العائلة.',
    localFocusTitle: 'تجهيز المنازل والمصايف في الطائف',
    localFocusPoints: [
      'تنظيف شامل للمنازل المغلقة أو الموسمية قبل الإقامة فيها',
      'إزالة الغبار عن السجاد والكنب وتهوية المفروشات',
      'تنظيف النوافذ والأسطح والمطابخ بوضوح في خطوات العمل',
    ],
    neighborhoods: [],
    availableServiceSlugs: ['home-cleaning', 'ac-cleaning', 'sofa-carpet-cleaning'],
    localFaqs: [
      {
        question: 'هل تشمل الخدمة تجهيز الاستراحات والمنازل الموسمية في الطائف؟',
        answer: 'نعم، اذكر المساحة وعدد الغرف في نموذج الطلب لنزودك بعرض سعر مخصص وموعد مناسب.',
      },
    ],
  },
  {
    slug: 'abha',
    name: 'أبها',
    region: 'منطقة عسير',
    coverageStatus: 'expanding',
    coverageLabel: 'تغطية حسب التوفر',
    shortNote: 'تنظيف المنازل والمجالس وما بعد التشطيب في أبها حسب التوفر.',
    localDescription:
      'في أبها نرتب معك طلبات تنظيف المنازل والمفروشات وتنظيف ما بعد التشطيب مع تأكيد الإتاحة لكل حي ومراعاة أجواء المنطقة المعتدلة والماطرة.',
    localFocusTitle: 'عناية متوازنة لبيوت أبها والمنازل الجبلية',
    localFocusPoints: [
      'تجفيف مضبوط للموكيت والكنب بعد التنظيف يلائم الأجواء الباردة والماطرة',
      'إزالة آثار البناء والطلاء للوحدات السكنية الحديثة',
      'ترتيب الغرف والمجالس وتلميع الأسطح الزجاجية والخشبية',
    ],
    neighborhoods: [],
    availableServiceSlugs: ['home-cleaning', 'sofa-carpet-cleaning', 'post-construction-cleaning'],
    localFaqs: [
      {
        question: 'كيف تتعاملون مع تجفيف السجاد والكنب في أجواء أبها؟',
        answer: 'نعتمد على سحب الرطوبة بأجهزة مخصصة لتقليل بقاء الماء وتسهيل الجفاف السريع.',
      },
    ],
  },
];

export function getLocationBySlug(slug: string): CityLocation | undefined {
  return locationsData.find((city) => city.slug === slug);
}
