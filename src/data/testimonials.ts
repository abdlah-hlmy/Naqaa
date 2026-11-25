export interface CustomerTestimonial {
  id: string;
  author: string;
  neighborhood: string;
  city: string;
  service: string;
  quote: string;
}

export const testimonialsData: CustomerTestimonial[] = [
  {
    id: 'malqa-home',
    author: 'أم عبدالعزيز',
    neighborhood: 'حي الملقا',
    city: 'الرياض',
    service: 'تنظيف منازل',
    quote:
      'الهدوء والترتيب في العمل هو أكثر ما يميزهم. وصلوا بالوقت المتفق عليه واهتموا بالزوايا والمطبخ بدون ما يحوسون أغراض البيت.',
  },
  {
    id: 'narjis-ac',
    author: 'خالد السبيعي',
    neighborhood: 'حي النرجس',
    city: 'الرياض',
    service: 'تنظيف مكيفات',
    quote:
      'نظفوا 6 مكيفات سبليت بالبيت، واستخدموا أغطية حماية كاملة على الجدران والكنب تحت المكيفات. ما نزل ولا نقطة ماء على الأرض.',
  },
  {
    id: 'yasmin-sofa',
    author: 'نورة القحطاني',
    neighborhood: 'حي الياسمين',
    city: 'الرياض',
    service: 'تنظيف كنب وسجاد',
    quote:
      'كان عندنا بقع قهوة على كنب فاتح، عالجوها بمواد لطيفة على القماش ورجع لونه صافي وجف خلال ساعات بدون أي رائحة قوية.',
  },
  {
    id: 'hittin-post',
    author: 'سلطان الدوسري',
    neighborhood: 'حي حطين',
    city: 'الرياض',
    service: 'تنظيف بعد التشطيب',
    quote:
      'بعد استلام الفلة من المقاول أزالوا بقايا الدهان والجبس عن الشبابيك والرخام بحرص تام بدون أي خدش، والسعر كان واضحاً قبل البدء.',
  },
];
