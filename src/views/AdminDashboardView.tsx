'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
  Check,
  Download,
  ExternalLink,
  FileText,
  LogOut,
  MapPin,
  Plus,
  RotateCcw,
  Save,
  Settings,
  Trash2,
  Upload,
} from 'lucide-react';
import { useSiteData } from '../context/SiteDataContext';
import { ArticleItem, ArticleSectionBlock } from '../data/articles';
import { CityLocation, CoverageStatus } from '../data/locations';
import { servicesData } from '../data/services';
import { SiteConfig } from '../data/siteConfig';
import { BrandLogo } from '../components/BrandLogo';
import { CustomSelect, CustomSelectOption } from '../components/CustomSelect';
import { ResilientImage } from '../components/ResilientImage';

type AdminTab = 'articles' | 'locations' | 'settings';

const imageLibraryOptions: CustomSelectOption[] = [
  {
    value: '/images/naqaa_article_home_care_guide_1795543870048.jpg',
    label: 'زاوية منزلية هادئة وستائر كتان',
    meta: 'صورة مقالات (16:9)',
  },
  {
    value: '/images/naqaa_hero_living_room_1795467850488.jpg',
    label: 'غرفة معيشة فاخرة بإضاءة طبيعية',
    meta: 'صورة رئيسية (16:9)',
  },
  {
    value: '/images/naqaa_service_home_cleaning_1795467852143.jpg',
    label: 'تنظيف طاولة خشبية بمنشفة',
    meta: 'تنظيف منازل',
  },
  {
    value: '/images/naqaa_service_ac_cleaning_1795467851735.jpg',
    label: 'مكيف سبليت في غرفة هادئة',
    meta: 'تنظيف مكيفات',
  },
  {
    value: '/images/naqaa_service_sofa_carpet_1795467852685.jpg',
    label: 'كنب فاتح وسجادة صوف',
    meta: 'كنب وسجاد',
  },
  {
    value: '/images/naqaa_service_post_construction_1795467852558.jpg',
    label: 'صالة منزل جديد بعد التشطيب',
    meta: 'بعد التشطيب',
  },
  {
    value: '/images/naqaa_kitchen_pricing_1795467853594.jpg',
    label: 'مطبخ هادئ وبخاخ زجاجي',
    meta: 'تفاصيل المطبخ',
  },
  {
    value: '/images/naqaa_about_bathroom_linen_1795468588085.jpg',
    label: 'حمام حجري ومناشف مرتبة',
    meta: 'عناية هادئة',
  },
];

function createBlankArticle(): ArticleItem {
  const stamp = Date.now();
  return {
    id: `article-${stamp}`,
    slug: `article-${stamp}`,
    title: 'عنوان مقال جديد',
    subtitle: 'نبذة مختصرة توضح محور المقال.',
    excerpt: 'ملخص المقال الذي يظهر في بطاقة العرض وصفحة المقالات.',
    category: 'العناية بالمنزل',
    readTime: '3 دقائق قراءة',
    publishedDate: 'نوفمبر 2026',
    publishedIso: new Date().toISOString().slice(0, 10),
    author: 'فريق نقاء',
    coverImage: '/images/naqaa_article_home_care_guide_1795543870048.jpg',
    coverAlt: 'صورة توضيحية للمقال',
    relatedServiceSlug: 'home-cleaning',
    intro: 'مقدمة المقال...',
    sections: [
      {
        heading: 'المحور الأول',
        paragraphs: ['اكتب فقرة المقال هنا...'],
        bullets: [],
        note: '',
      },
    ],
    closingNote: 'خلاصة المقال...',
  };
}

function createBlankCity(): CityLocation {
  const stamp = Date.now().toString().slice(-4);
  return {
    slug: `city-${stamp}`,
    name: 'مدينة جديدة',
    region: 'المملكة العربية السعودية',
    coverageStatus: 'expanding',
    coverageLabel: 'تغطية حسب التوفر',
    shortNote: 'التحقق من توفر الزيارات في حيك عند الطلب.',
    localDescription: 'وصف محلي مخصص لخدمات نقاء في هذه المدينة.',
    localFocusTitle: 'اهتمام يناسب منازل المدينة',
    localFocusPoints: ['تنظيف المنازل والغرف والمجالس بعناية واضحة'],
    neighborhoods: [],
    availableServiceSlugs: ['home-cleaning', 'ac-cleaning'],
    localFaqs: [],
  };
}

export const AdminDashboardView: React.FC = () => {
  const {
    siteConfig,
    locations,
    articles,
    updateSiteConfig,
    upsertLocation,
    deleteLocation,
    upsertArticle,
    deleteArticle,
    resetAllToDefault,
    importJsonState,
    exportJsonState,
  } = useSiteData();

  const [activeTab, setActiveTab] = useState<AdminTab>('articles');
  const [notice, setNotice] = useState<{ type: 'success' | 'error'; text: string } | null>(
    null
  );
  const [confirmReset, setConfirmReset] = useState(false);

  // حالة محرر المقالات
  const [selectedArticleId, setSelectedArticleId] = useState<string>(
    articles[0]?.id || ''
  );
  const [articleDraft, setArticleDraft] = useState<ArticleItem | null>(
    articles[0] || null
  );
  const [confirmDeleteArticleId, setConfirmDeleteArticleId] = useState<string | null>(
    null
  );

  // حالة محرر المدن
  const [selectedCitySlug, setSelectedCitySlug] = useState<string>(
    locations[0]?.slug || ''
  );
  const [cityDraft, setCityDraft] = useState<CityLocation | null>(
    locations[0] || null
  );
  const [newNeighborhood, setNewNeighborhood] = useState('');
  const [confirmDeleteCitySlug, setConfirmDeleteCitySlug] = useState<string | null>(
    null
  );

  // حالة إعدادات الموقع
  const [configDraft, setConfigDraft] = useState<SiteConfig>(siteConfig);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setConfigDraft(siteConfig);
  }, [siteConfig]);

  const showNotice = (text: string, type: 'success' | 'error' = 'success') => {
    setNotice({ type, text });
    window.setTimeout(() => {
      setNotice((prev) => (prev?.text === text ? null : prev));
    }, 3200);
  };

  // --- إدارة المقالات ---
  const selectArticle = (item: ArticleItem) => {
    setSelectedArticleId(item.id);
    setArticleDraft(JSON.parse(JSON.stringify(item)));
    setConfirmDeleteArticleId(null);
  };

  const handleNewArticle = () => {
    const fresh = createBlankArticle();
    upsertArticle(fresh);
    setSelectedArticleId(fresh.id);
    setArticleDraft(fresh);
    showNotice('تم إنشاء مسودة مقال جديد. عدّل البيانات ثم احفظ.');
  };

  const handleSaveArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!articleDraft) return;
    if (!articleDraft.title.trim() || !articleDraft.slug.trim()) {
      showNotice('عنوان المقال والرابط المختصر مطلوبان.', 'error');
      return;
    }
    const sanitizedSlug = articleDraft.slug
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9\-_]/g, '');

    const finalArticle: ArticleItem = {
      ...articleDraft,
      slug: sanitizedSlug || articleDraft.id,
    };
    upsertArticle(finalArticle);
    setArticleDraft(finalArticle);
    showNotice('تم حفظ المقال وتحديثه في الموقع مباشرة.');
  };

  const handleDeleteArticle = (id: string) => {
    deleteArticle(id);
    const remaining = articles.filter((a) => a.id !== id);
    if (remaining[0]) {
      selectArticle(remaining[0]);
    } else {
      setSelectedArticleId('');
      setArticleDraft(null);
    }
    setConfirmDeleteArticleId(null);
    showNotice('تم حذف المقال.');
  };

  const updateArticleSection = (
    idx: number,
    patch: Partial<ArticleSectionBlock>
  ) => {
    if (!articleDraft) return;
    const nextSections = articleDraft.sections.map((s, i) =>
      i === idx ? { ...s, ...patch } : s
    );
    setArticleDraft({ ...articleDraft, sections: nextSections });
  };

  // --- إدارة المدن ---
  const selectCity = (city: CityLocation) => {
    setSelectedCitySlug(city.slug);
    setCityDraft(JSON.parse(JSON.stringify(city)));
    setConfirmDeleteCitySlug(null);
  };

  const handleNewCity = () => {
    const fresh = createBlankCity();
    upsertLocation(fresh);
    setSelectedCitySlug(fresh.slug);
    setCityDraft(fresh);
    showNotice('تمت إضافة مدينة جديدة. عدّل بياناتها ثم احفظ.');
  };

  const handleSaveCity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cityDraft) return;
    if (!cityDraft.name.trim() || !cityDraft.slug.trim()) {
      showNotice('اسم المدينة والرابط المختصر مطلوبان.', 'error');
      return;
    }
    const sanitizedSlug = cityDraft.slug
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9\-_]/g, '');

    const finalCity: CityLocation = {
      ...cityDraft,
      slug: sanitizedSlug || cityDraft.slug,
    };
    upsertLocation(finalCity, selectedCitySlug);
    setCityDraft(finalCity);
    setSelectedCitySlug(finalCity.slug);
    showNotice(`تم حفظ بيانات مدينة ${finalCity.name}.`);
  };

  const handleDeleteCity = (slug: string) => {
    deleteLocation(slug);
    const remaining = locations.filter((c) => c.slug !== slug);
    if (remaining[0]) {
      selectCity(remaining[0]);
    } else {
      setSelectedCitySlug('');
      setCityDraft(null);
    }
    setConfirmDeleteCitySlug(null);
    showNotice('تم حذف المدينة.');
  };

  const handleAddNeighborhood = () => {
    if (!cityDraft || !newNeighborhood.trim()) return;
    const trimmed = newNeighborhood.trim();
    if (!cityDraft.neighborhoods.includes(trimmed)) {
      setCityDraft({
        ...cityDraft,
        neighborhoods: [...cityDraft.neighborhoods, trimmed],
      });
    }
    setNewNeighborhood('');
  };

  // --- إدارة إعدادات الموقع ---
  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    updateSiteConfig(configDraft);
    showNotice('تم حفظ تفاصيل وإعدادات الموقع وتطبيقها فوراً.');
  };

  // --- نسخ احتياطي JSON ---
  const handleExport = () => {
    const content = exportJsonState();
    const blob = new Blob([content], { type: 'application/json;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `naqaa-backup-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
    showNotice('تم تنزيل ملف النسخة الاحتياطية بنجاح.');
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const text = typeof reader.result === 'string' ? reader.result : '';
      const res = importJsonState(text);
      if (res.ok) {
        try {
          const parsed = JSON.parse(text);
          if (Array.isArray(parsed.articles) && parsed.articles[0]) {
            setSelectedArticleId(parsed.articles[0].id);
            setArticleDraft(parsed.articles[0]);
          }
          if (Array.isArray(parsed.locations) && parsed.locations[0]) {
            setSelectedCitySlug(parsed.locations[0].slug);
            setCityDraft(parsed.locations[0]);
          }
        } catch {
          // ignore
        }
        showNotice('تم استيراد البيانات بنجاح.');
      } else {
        showNotice(res.error || 'تعذر الاستيراد.', 'error');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleReset = () => {
    resetAllToDefault();
    setConfirmReset(false);
    showNotice('تمت استعادة البيانات الافتراضية للموقع.');
    window.setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  const inputClass =
    'w-full rounded-xl border border-[#17251F]/15 bg-[#FAF8F3] px-3.5 py-2.5 text-sm text-[#17251F] placeholder:text-[#68776E]/70 focus:outline-none focus:border-[#245745] focus:ring-2 focus:ring-[#245745]/15 transition-colors';

  const labelClass = 'block text-xs font-semibold text-[#17251F] mb-1.5';

  const serviceOptions: CustomSelectOption[] = servicesData.map((s) => ({
    value: s.slug,
    label: s.title,
  }));

  const coverageOptions: CustomSelectOption[] = [
    { value: 'active', label: 'تغطية نشطة', meta: 'متاح للحجز المباشر', highlight: true },
    { value: 'expanding', label: 'تغطية حسب التوفر', meta: 'تحقق عند الطلب' },
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F3] text-[#17251F]">
      {/* الشريط العلوي الخاص بلوحة التحكم */}
      <header className="sticky top-0 z-30 border-b border-[#17251F]/10 bg-[#FAF8F3]/95">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 min-w-0">
            <Link href="/" className="shrink-0">
              <BrandLogo />
            </Link>
            <span className="hidden sm:inline text-xs text-[#68776E] border-r border-[#17251F]/15 pr-4">
              لوحة إدارة المحتوى
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              type="button"
              onClick={async () => {
                await fetch('/api/admin-auth', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ action: 'logout' }),
                });
                window.location.assign('/naqaa-manage');
              }}
              title="تسجيل الخروج"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#17251F]/15 text-[#68776E] hover:bg-red-50 hover:text-red-700 transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span className="sr-only">تسجيل الخروج</span>
            </button>

            <button
              type="button"
              onClick={handleExport}
              title="تصدير نسخة احتياطية JSON"
              className="inline-flex items-center gap-1.5 rounded-full border border-[#17251F]/15 px-3.5 py-2 text-xs font-medium text-[#17251F] hover:bg-[#EFEADC] transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden md:inline">تصدير</span>
            </button>

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              title="استيراد نسخة احتياطية JSON"
              className="inline-flex items-center gap-1.5 rounded-full border border-[#17251F]/15 px-3.5 py-2 text-xs font-medium text-[#17251F] hover:bg-[#EFEADC] transition-colors cursor-pointer"
            >
              <Upload className="w-3.5 h-3.5" />
              <span className="hidden md:inline">استيراد</span>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="application/json"
              onChange={handleImport}
              className="hidden"
            />

            {!confirmReset ? (
              <button
                type="button"
                onClick={() => setConfirmReset(true)}
                className="inline-flex items-center gap-1.5 rounded-full border border-[#17251F]/15 px-3.5 py-2 text-xs font-medium text-[#68776E] hover:text-[#17251F] hover:bg-[#EFEADC] transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden md:inline">إعادة الافتراضي</span>
              </button>
            ) : (
              <div className="flex items-center gap-1.5 rounded-full border border-red-600/30 bg-red-50 px-3 py-1.5 text-xs">
                <button
                  type="button"
                  onClick={handleReset}
                  className="font-semibold text-red-700 hover:underline cursor-pointer"
                >
                  تأكيد الاستعادة
                </button>
                <span className="text-[#68776E]">·</span>
                <button
                  type="button"
                  onClick={() => setConfirmReset(false)}
                  className="text-[#68776E] hover:text-[#17251F] cursor-pointer"
                >
                  إلغاء
                </button>
              </div>
            )}

            <a
              href="/sitemap.xml"
              target="_blank"
              rel="noopener noreferrer"
              title="معاينة خريطة الموقع المحدثة تلقائياً"
              className="inline-flex items-center gap-1.5 rounded-full border border-[#245745]/25 px-3.5 py-2 text-xs font-medium text-[#245745] hover:bg-[#EFEADC] transition-colors whitespace-nowrap"
            >
              <span>السايت ماب</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            <Link
              href="/"
              className="inline-flex items-center gap-1.5 rounded-full bg-[#245745] px-4 py-2 text-xs font-semibold text-[#FAF8F3] hover:bg-[#17251F] transition-colors whitespace-nowrap"
            >
              <span>معاينة الموقع</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* شريط التبويبات والإشعارات */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 mb-8 border-b border-[#17251F]/10">
          <div className="inline-flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl bg-[#EFEADC] border border-[#17251F]/10 self-start">
            <button
              type="button"
              onClick={() => setActiveTab('articles')}
              className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
                activeTab === 'articles'
                  ? 'bg-[#245745] text-[#FAF8F3]'
                  : 'text-[#17251F] hover:bg-[#FAF8F3]/70'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>المقالات ({articles.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('locations')}
              className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
                activeTab === 'locations'
                  ? 'bg-[#245745] text-[#FAF8F3]'
                  : 'text-[#17251F] hover:bg-[#FAF8F3]/70'
              }`}
            >
              <MapPin className="w-4 h-4" />
              <span>المدن والتغطية ({locations.length})</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setConfigDraft(siteConfig);
                setActiveTab('settings');
              }}
              className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
                activeTab === 'settings'
                  ? 'bg-[#245745] text-[#FAF8F3]'
                  : 'text-[#17251F] hover:bg-[#FAF8F3]/70'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>تفاصيل الموقع</span>
            </button>
          </div>

          {notice && (
            <div
              className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-medium border ${
                notice.type === 'error'
                  ? 'bg-red-50 border-red-200 text-red-800'
                  : 'bg-[#EFEADC] border-[#245745]/25 text-[#245745]'
              }`}
            >
              <Check className="w-4 h-4 shrink-0" />
              <span>{notice.text}</span>
            </div>
          )}
        </div>

        {/* التبويب 1: إدارة المقالات */}
        {activeTab === 'articles' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* قائمة المقالات */}
            <aside className="lg:col-span-4 rounded-3xl border border-[#17251F]/10 bg-[#EFEADC]/50 p-5 space-y-4">
              <div className="flex items-center justify-between gap-2">
                <h2 className="text-base font-bold text-[#17251F]">قائمة المقالات</h2>
                <button
                  type="button"
                  onClick={handleNewArticle}
                  className="inline-flex items-center gap-1.5 rounded-full bg-[#245745] px-4 py-2 text-xs font-semibold text-[#FAF8F3] hover:bg-[#17251F] transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>مقال جديد</span>
                </button>
              </div>

              <div className="space-y-2.5">
                {articles.map((art) => {
                  const selected = art.id === selectedArticleId;
                  return (
                    <button
                      key={art.id}
                      type="button"
                      onClick={() => selectArticle(art)}
                      className={`w-full text-start rounded-2xl border p-4 transition-colors cursor-pointer ${
                        selected
                          ? 'border-[#245745] bg-[#FAF8F3]'
                          : 'border-[#17251F]/10 bg-[#FAF8F3]/75 hover:border-[#245745]/40'
                      }`}
                    >
                      <span className="text-[11px] font-medium text-[#245745] block mb-1">
                        {art.category} · {art.publishedDate}
                      </span>
                      <span className="text-sm font-bold text-[#17251F] line-clamp-2 leading-snug">
                        {art.title}
                      </span>
                    </button>
                  );
                })}
              </div>
            </aside>

            {/* محرر المقال */}
            <div className="lg:col-span-8">
              {articleDraft ? (
                <form
                  onSubmit={handleSaveArticle}
                  className="rounded-3xl border border-[#17251F]/10 bg-[#FAF8F3] p-6 sm:p-8 space-y-6"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#17251F]/10">
                    <div>
                      <h2 className="text-lg font-bold text-[#17251F]">تحرير المقال</h2>
                      <Link
                        href={`/articles/${articleDraft.slug}`}
                        target="_blank"
                        className="inline-flex items-center gap-1 text-xs font-medium text-[#245745] hover:underline mt-0.5"
                      >
                        <span>فتح صفحة المقال في نافذة جديدة</span>
                        <ExternalLink className="w-3 h-3" />
                      </Link>
                    </div>

                    <div className="flex items-center gap-2">
                      {confirmDeleteArticleId !== articleDraft.id ? (
                        <button
                          type="button"
                          onClick={() => setConfirmDeleteArticleId(articleDraft.id)}
                          className="inline-flex items-center gap-1.5 rounded-full border border-[#17251F]/15 px-4 py-2 text-xs font-medium text-red-700 hover:bg-red-50 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>حذف</span>
                        </button>
                      ) : (
                        <div className="flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-3 py-1.5 text-xs">
                          <button
                            type="button"
                            onClick={() => handleDeleteArticle(articleDraft.id)}
                            className="font-semibold text-red-700 cursor-pointer"
                          >
                            تأكيد الحذف
                          </button>
                          <button
                            type="button"
                            onClick={() => setConfirmDeleteArticleId(null)}
                            className="text-[#68776E] cursor-pointer"
                          >
                            تراجع
                          </button>
                        </div>
                      )}

                      <button
                        type="submit"
                        className="inline-flex items-center gap-1.5 rounded-full bg-[#245745] px-6 py-2.5 text-xs sm:text-sm font-semibold text-[#FAF8F3] hover:bg-[#17251F] transition-colors cursor-pointer"
                      >
                        <Save className="w-4 h-4" />
                        <span>حفظ المقال</span>
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label className={labelClass}>عنوان المقال *</label>
                      <input
                        type="text"
                        value={articleDraft.title}
                        onChange={(e) =>
                          setArticleDraft({ ...articleDraft, title: e.target.value })
                        }
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label className={labelClass}>الرابط المختصر (Slug بالإنجليزية) *</label>
                      <input
                        type="text"
                        dir="ltr"
                        value={articleDraft.slug}
                        onChange={(e) =>
                          setArticleDraft({ ...articleDraft, slug: e.target.value })
                        }
                        className={`${inputClass} text-left`}
                      />
                    </div>

                    <div>
                      <label className={labelClass}>التصنيف</label>
                      <input
                        type="text"
                        value={articleDraft.category}
                        onChange={(e) =>
                          setArticleDraft({ ...articleDraft, category: e.target.value })
                        }
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label className={labelClass}>مدة القراءة</label>
                      <input
                        type="text"
                        value={articleDraft.readTime}
                        onChange={(e) =>
                          setArticleDraft({ ...articleDraft, readTime: e.target.value })
                        }
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label className={labelClass}>تاريخ النشر المعروض</label>
                      <input
                        type="text"
                        value={articleDraft.publishedDate}
                        onChange={(e) =>
                          setArticleDraft({ ...articleDraft, publishedDate: e.target.value })
                        }
                        className={inputClass}
                      />
                    </div>

                    <CustomSelect
                      label="الخدمة المرتبطة"
                      value={articleDraft.relatedServiceSlug}
                      onChange={(val) =>
                        setArticleDraft({ ...articleDraft, relatedServiceSlug: val })
                      }
                      options={serviceOptions}
                    />

                    <div>
                      <label className={labelClass}>الكاتب</label>
                      <input
                        type="text"
                        value={articleDraft.author}
                        onChange={(e) =>
                          setArticleDraft({ ...articleDraft, author: e.target.value })
                        }
                        className={inputClass}
                      />
                    </div>
                  </div>

                  {/* صورة الغلاف */}
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center rounded-2xl bg-[#EFEADC]/45 p-4 border border-[#17251F]/8">
                    <div className="sm:col-span-8 space-y-3">
                      <CustomSelect
                        label="اختيار صورة الغلاف من المكتبة"
                        value={articleDraft.coverImage}
                        onChange={(val) =>
                          setArticleDraft({ ...articleDraft, coverImage: val })
                        }
                        options={imageLibraryOptions}
                      />
                      <div>
                        <label className={labelClass}>وصف الصورة (Alt Text)</label>
                        <input
                          type="text"
                          value={articleDraft.coverAlt}
                          onChange={(e) =>
                            setArticleDraft({ ...articleDraft, coverAlt: e.target.value })
                          }
                          className={inputClass}
                        />
                      </div>
                    </div>
                    <div className="sm:col-span-4 aspect-[16/10] rounded-xl overflow-hidden border border-[#17251F]/10 bg-[#FAF8F3]">
                      <ResilientImage
                        src={articleDraft.coverImage}
                        alt={articleDraft.coverAlt}
                      />
                    </div>
                  </div>

                  <div>
                    <label className={labelClass}>العنوان الفرعي</label>
                    <input
                      type="text"
                      value={articleDraft.subtitle}
                      onChange={(e) =>
                        setArticleDraft({ ...articleDraft, subtitle: e.target.value })
                      }
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>الملخص (يظهر في بطاقة المقال)</label>
                    <textarea
                      rows={2}
                      value={articleDraft.excerpt}
                      onChange={(e) =>
                        setArticleDraft({ ...articleDraft, excerpt: e.target.value })
                      }
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>المقدمة</label>
                    <textarea
                      rows={3}
                      value={articleDraft.intro}
                      onChange={(e) =>
                        setArticleDraft({ ...articleDraft, intro: e.target.value })
                      }
                      className={inputClass}
                    />
                  </div>

                  {/* أقسام المقال */}
                  <div className="space-y-4 pt-2 border-t border-[#17251F]/10">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold text-[#17251F]">فقرات وأقسام المقال</h3>
                      <button
                        type="button"
                        onClick={() =>
                          setArticleDraft({
                            ...articleDraft,
                            sections: [
                              ...articleDraft.sections,
                              {
                                heading: 'عنوان فقرة جديدة',
                                paragraphs: ['اكتب المحتوى هنا...'],
                                bullets: [],
                                note: '',
                              },
                            ],
                          })
                        }
                        className="inline-flex items-center gap-1 rounded-lg border border-[#245745]/35 px-3 py-1.5 text-xs font-semibold text-[#245745] hover:bg-[#EFEADC] cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>إضافة قسم</span>
                      </button>
                    </div>

                    {articleDraft.sections.map((sec, sIdx) => (
                      <div
                        key={sIdx}
                        className="rounded-2xl border border-[#17251F]/10 bg-[#EFEADC]/35 p-4 space-y-3"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-bold text-[#245745] tabular-nums">
                            قسم 0{sIdx + 1}
                          </span>
                          {articleDraft.sections.length > 1 && (
                            <button
                              type="button"
                              onClick={() =>
                                setArticleDraft({
                                  ...articleDraft,
                                  sections: articleDraft.sections.filter((_, i) => i !== sIdx),
                                })
                              }
                              className="text-xs text-red-700 hover:underline cursor-pointer"
                            >
                              حذف القسم
                            </button>
                          )}
                        </div>

                        <div>
                          <label className={labelClass}>عنوان القسم</label>
                          <input
                            type="text"
                            value={sec.heading}
                            onChange={(e) =>
                              updateArticleSection(sIdx, { heading: e.target.value })
                            }
                            className={inputClass}
                          />
                        </div>

                        <div>
                          <label className={labelClass}>الفقرات (افصل بين كل فقرة بسطر فارغ)</label>
                          <textarea
                            rows={4}
                            value={sec.paragraphs.join('\n\n')}
                            onChange={(e) =>
                              updateArticleSection(sIdx, {
                                paragraphs: e.target.value
                                  .split(/\n\s*\n/)
                                  .map((p) => p.trim())
                                  .filter(Boolean),
                              })
                            }
                            className={inputClass}
                          />
                        </div>

                        <div>
                          <label className={labelClass}>نقاط القائمة (اختياري — سطر لكل نقطة)</label>
                          <textarea
                            rows={3}
                            value={(sec.bullets || []).join('\n')}
                            onChange={(e) =>
                              updateArticleSection(sIdx, {
                                bullets: e.target.value
                                  .split('\n')
                                  .map((b) => b.trim())
                                  .filter(Boolean),
                              })
                            }
                            className={inputClass}
                          />
                        </div>

                        <div>
                          <label className={labelClass}>ملاحظة مميزة (اختياري)</label>
                          <input
                            type="text"
                            value={sec.note || ''}
                            onChange={(e) =>
                              updateArticleSection(sIdx, { note: e.target.value })
                            }
                            className={inputClass}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div>
                    <label className={labelClass}>الخلاصة / الخاتمة</label>
                    <textarea
                      rows={2}
                      value={articleDraft.closingNote}
                      onChange={(e) =>
                        setArticleDraft({ ...articleDraft, closingNote: e.target.value })
                      }
                      className={inputClass}
                    />
                  </div>
                </form>
              ) : (
                <div className="rounded-3xl border border-[#17251F]/10 bg-[#EFEADC]/40 p-10 text-center">
                  <p className="text-sm text-[#68776E] mb-4">لا يوجد مقال محدد حالياً.</p>
                  <button
                    type="button"
                    onClick={handleNewArticle}
                    className="rounded-full bg-[#245745] px-6 py-2.5 text-xs font-semibold text-[#FAF8F3] cursor-pointer"
                  >
                    إنشاء مقال جديد
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* التبويب 2: إدارة المدن والتغطية */}
        {activeTab === 'locations' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <aside className="lg:col-span-4 rounded-3xl border border-[#17251F]/10 bg-[#EFEADC]/50 p-5 space-y-4">
              <div className="flex items-center justify-between gap-2">
                <h2 className="text-base font-bold text-[#17251F]">المدن ({locations.length})</h2>
                <button
                  type="button"
                  onClick={handleNewCity}
                  className="inline-flex items-center gap-1.5 rounded-full bg-[#245745] px-4 py-2 text-xs font-semibold text-[#FAF8F3] hover:bg-[#17251F] transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>إضافة مدينة</span>
                </button>
              </div>

              <div className="space-y-2">
                {locations.map((city) => {
                  const selected = city.slug === selectedCitySlug;
                  return (
                    <button
                      key={city.slug}
                      type="button"
                      onClick={() => selectCity(city)}
                      className={`w-full text-start rounded-2xl border p-3.5 transition-colors flex items-center justify-between gap-2 cursor-pointer ${
                        selected
                          ? 'border-[#245745] bg-[#FAF8F3]'
                          : 'border-[#17251F]/10 bg-[#FAF8F3]/75 hover:border-[#245745]/40'
                      }`}
                    >
                      <div>
                        <span className="text-sm font-bold text-[#17251F] block">
                          {city.name}
                        </span>
                        <span className="text-[11px] text-[#68776E]">{city.region}</span>
                      </div>
                      <span
                        className={`text-[11px] font-semibold ${
                          city.coverageStatus === 'active'
                            ? 'text-[#245745]'
                            : 'text-[#68776E]'
                        }`}
                      >
                        {city.coverageLabel}
                      </span>
                    </button>
                  );
                })}
              </div>
            </aside>

            <div className="lg:col-span-8">
              {cityDraft ? (
                <form
                  onSubmit={handleSaveCity}
                  className="rounded-3xl border border-[#17251F]/10 bg-[#FAF8F3] p-6 sm:p-8 space-y-6"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#17251F]/10">
                    <div>
                      <h2 className="text-lg font-bold text-[#17251F]">
                        بيانات مدينة: {cityDraft.name}
                      </h2>
                      <Link
                        href={`/locations/${cityDraft.slug}`}
                        target="_blank"
                        className="inline-flex items-center gap-1 text-xs font-medium text-[#245745] hover:underline mt-0.5"
                      >
                        <span>معاينة صفحة المدينة</span>
                        <ExternalLink className="w-3 h-3" />
                      </Link>
                    </div>

                    <div className="flex items-center gap-2">
                      {confirmDeleteCitySlug !== cityDraft.slug ? (
                        <button
                          type="button"
                          onClick={() => setConfirmDeleteCitySlug(cityDraft.slug)}
                          className="inline-flex items-center gap-1.5 rounded-full border border-[#17251F]/15 px-4 py-2 text-xs font-medium text-red-700 hover:bg-red-50 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>حذف</span>
                        </button>
                      ) : (
                        <div className="flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-3 py-1.5 text-xs">
                          <button
                            type="button"
                            onClick={() => handleDeleteCity(cityDraft.slug)}
                            className="font-semibold text-red-700 cursor-pointer"
                          >
                            تأكيد الحذف
                          </button>
                          <button
                            type="button"
                            onClick={() => setConfirmDeleteCitySlug(null)}
                            className="text-[#68776E] cursor-pointer"
                          >
                            تراجع
                          </button>
                        </div>
                      )}

                      <button
                        type="submit"
                        className="inline-flex items-center gap-1.5 rounded-full bg-[#245745] px-6 py-2.5 text-xs sm:text-sm font-semibold text-[#FAF8F3] hover:bg-[#17251F] transition-colors cursor-pointer"
                      >
                        <Save className="w-4 h-4" />
                        <span>حفظ المدينة</span>
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>اسم المدينة *</label>
                      <input
                        type="text"
                        value={cityDraft.name}
                        onChange={(e) =>
                          setCityDraft({ ...cityDraft, name: e.target.value })
                        }
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label className={labelClass}>الرابط المختصر (Slug بالإنجليزية) *</label>
                      <input
                        type="text"
                        dir="ltr"
                        value={cityDraft.slug}
                        onChange={(e) =>
                          setCityDraft({ ...cityDraft, slug: e.target.value })
                        }
                        className={`${inputClass} text-left`}
                      />
                    </div>

                    <div>
                      <label className={labelClass}>المنطقة الإدارية</label>
                      <input
                        type="text"
                        value={cityDraft.region}
                        onChange={(e) =>
                          setCityDraft({ ...cityDraft, region: e.target.value })
                        }
                        className={inputClass}
                      />
                    </div>

                    <CustomSelect
                      label="حالة التغطية"
                      value={cityDraft.coverageStatus}
                      onChange={(val) => {
                        const status = val as CoverageStatus;
                        setCityDraft({
                          ...cityDraft,
                          coverageStatus: status,
                          coverageLabel:
                            status === 'active' ? 'تغطية نشطة' : 'تغطية حسب التوفر',
                        });
                      }}
                      options={coverageOptions}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>ملاحظة مختصرة (في بطاقة المدينة)</label>
                    <input
                      type="text"
                      value={cityDraft.shortNote}
                      onChange={(e) =>
                        setCityDraft({ ...cityDraft, shortNote: e.target.value })
                      }
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>الوصف المحلي التفصيلي</label>
                    <textarea
                      rows={3}
                      value={cityDraft.localDescription}
                      onChange={(e) =>
                        setCityDraft({ ...cityDraft, localDescription: e.target.value })
                      }
                      className={inputClass}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label className={labelClass}>عنوان التركيز المحلي</label>
                      <input
                        type="text"
                        value={cityDraft.localFocusTitle}
                        onChange={(e) =>
                          setCityDraft({ ...cityDraft, localFocusTitle: e.target.value })
                        }
                        className={inputClass}
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className={labelClass}>نقاط التركيز المحلي (سطر لكل نقطة)</label>
                      <textarea
                        rows={3}
                        value={cityDraft.localFocusPoints.join('\n')}
                        onChange={(e) =>
                          setCityDraft({
                            ...cityDraft,
                            localFocusPoints: e.target.value
                              .split('\n')
                              .map((l) => l.trim())
                              .filter(Boolean),
                          })
                        }
                        className={inputClass}
                      />
                    </div>
                  </div>

                  {/* الأحياء المخدومة */}
                  <div className="rounded-2xl border border-[#17251F]/10 bg-[#EFEADC]/35 p-4 space-y-3">
                    <label className="block text-xs font-bold text-[#17251F]">
                      الأحياء المؤكد تغطيتها في {cityDraft.name}
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {cityDraft.neighborhoods.map((n) => (
                        <span
                          key={n}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-[#17251F]/15 bg-[#FAF8F3] px-3 py-1 text-xs font-medium text-[#17251F]"
                        >
                          <span>{n}</span>
                          <button
                            type="button"
                            onClick={() =>
                              setCityDraft({
                                ...cityDraft,
                                neighborhoods: cityDraft.neighborhoods.filter((x) => x !== n),
                              })
                            }
                            className="text-red-700 hover:text-red-900 cursor-pointer"
                            aria-label={`إزالة حي ${n}`}
                          >
                            ×
                          </button>
                        </span>
                      ))}
                      {cityDraft.neighborhoods.length === 0 && (
                        <span className="text-xs text-[#68776E]">
                          لم تُضف أحياء مؤكدة بعد (تظهر رسالة التحقق من الحي عند الطلب).
                        </span>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newNeighborhood}
                        onChange={(e) => setNewNeighborhood(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddNeighborhood();
                          }
                        }}
                        placeholder="أضف اسم حي (مثال: الملقا)"
                        className={inputClass}
                      />
                      <button
                        type="button"
                        onClick={handleAddNeighborhood}
                        className="rounded-xl bg-[#245745] px-4 py-2 text-xs font-semibold text-[#FAF8F3] hover:bg-[#17251F] whitespace-nowrap cursor-pointer"
                      >
                        إضافة حي
                      </button>
                    </div>
                  </div>

                  {/* الخدمات المتاحة بالمدينة */}
                  <div>
                    <label className={labelClass}>الخدمات المتاحة في {cityDraft.name}</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {servicesData.map((srv) => {
                        const checked = cityDraft.availableServiceSlugs.includes(srv.slug);
                        return (
                          <button
                            key={srv.slug}
                            type="button"
                            onClick={() => {
                              const next = checked
                                ? cityDraft.availableServiceSlugs.filter((s) => s !== srv.slug)
                                : [...cityDraft.availableServiceSlugs, srv.slug];
                              setCityDraft({ ...cityDraft, availableServiceSlugs: next });
                            }}
                            className={`rounded-xl border px-3 py-2.5 text-xs font-semibold text-start transition-colors cursor-pointer ${
                              checked
                                ? 'border-[#245745] bg-[#245745] text-[#FAF8F3]'
                                : 'border-[#17251F]/15 bg-[#FAF8F3] text-[#17251F]'
                            }`}
                          >
                            {srv.title}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </form>
              ) : null}
            </div>
          </div>
        )}

        {/* التبويب 3: تفاصيل وإعدادات الموقع */}
        {activeTab === 'settings' && (
          <form
            onSubmit={handleSaveConfig}
            className="max-w-4xl mx-auto rounded-3xl border border-[#17251F]/10 bg-[#FAF8F3] p-6 sm:p-8 space-y-6"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#17251F]/10">
              <div>
                <h2 className="text-lg font-bold text-[#17251F]">تفاصيل وإعدادات الموقع</h2>
                <p className="text-xs text-[#68776E] mt-0.5">
                  أي تعديل هنا ينعكس فوراً في الصفحة الرئيسية، التذييل، صفحة التواصل، وروابط واتساب.
                </p>
              </div>
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 rounded-full bg-[#245745] px-6 py-2.5 text-xs sm:text-sm font-semibold text-[#FAF8F3] hover:bg-[#17251F] transition-colors cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>حفظ الإعدادات</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>اسم العلامة التجارية</label>
                <input
                  type="text"
                  value={configDraft.brandName}
                  onChange={(e) =>
                    setConfigDraft({ ...configDraft, brandName: e.target.value })
                  }
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>الشعار اللفظي الرئيسي</label>
                <input
                  type="text"
                  value={configDraft.sloganMain}
                  onChange={(e) =>
                    setConfigDraft({ ...configDraft, sloganMain: e.target.value })
                  }
                  className={inputClass}
                />
              </div>

              <div className="sm:col-span-2">
                <label className={labelClass}>عبارة الشريط التسويقي في الرئيسية</label>
                <input
                  type="text"
                  value={configDraft.taglineStrip}
                  onChange={(e) =>
                    setConfigDraft({ ...configDraft, taglineStrip: e.target.value })
                  }
                  className={inputClass}
                />
              </div>

              <div className="sm:col-span-2">
                <label className={labelClass}>نبذة الشركة (تظهر في التذييل والبيانات المنظمة)</label>
                <textarea
                  rows={2}
                  value={configDraft.description}
                  onChange={(e) =>
                    setConfigDraft({ ...configDraft, description: e.target.value })
                  }
                  className={inputClass}
                />
              </div>
            </div>

            <div className="pt-4 border-t border-[#17251F]/10 space-y-4">
              <h3 className="text-sm font-bold text-[#17251F]">بيانات التواصل وأوقات العمل</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>
                    رقم واتساب الرسمي (بصيغة دولية مثل 9665XXXXXXXX)
                  </label>
                  <input
                    type="text"
                    dir="ltr"
                    value={configDraft.whatsappNumber}
                    onChange={(e) =>
                      setConfigDraft({ ...configDraft, whatsappNumber: e.target.value })
                    }
                    placeholder="9665XXXXXXXX"
                    className={`${inputClass} text-left tabular-nums`}
                  />
                </div>

                <div>
                  <label className={labelClass}>رقم الهاتف المعروض (اختياري)</label>
                  <input
                    type="text"
                    dir="ltr"
                    value={configDraft.phoneDisplay}
                    onChange={(e) =>
                      setConfigDraft({ ...configDraft, phoneDisplay: e.target.value })
                    }
                    placeholder="05XXXXXXXX"
                    className={`${inputClass} text-left tabular-nums`}
                  />
                </div>

                <div>
                  <label className={labelClass}>البريد الإلكتروني (اختياري)</label>
                  <input
                    type="email"
                    dir="ltr"
                    value={configDraft.email}
                    onChange={(e) =>
                      setConfigDraft({ ...configDraft, email: e.target.value })
                    }
                    placeholder="info@naqaa.sa"
                    className={`${inputClass} text-left`}
                  />
                </div>

                <div>
                  <label className={labelClass}>نص أوقات العمل والمواعيد</label>
                  <input
                    type="text"
                    value={configDraft.workingHours}
                    onChange={(e) =>
                      setConfigDraft({ ...configDraft, workingHours: e.target.value })
                    }
                    className={inputClass}
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#17251F]/10 space-y-4">
              <h3 className="text-sm font-bold text-[#17251F]">روابط التواصل الاجتماعي (اختياري)</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>إنستغرام</label>
                  <input
                    type="url"
                    dir="ltr"
                    value={configDraft.socialLinks.instagram || ''}
                    onChange={(e) =>
                      setConfigDraft({
                        ...configDraft,
                        socialLinks: {
                          ...configDraft.socialLinks,
                          instagram: e.target.value,
                        },
                      })
                    }
                    placeholder="https://instagram.com/..."
                    className={`${inputClass} text-left`}
                  />
                </div>

                <div>
                  <label className={labelClass}>إكس (X)</label>
                  <input
                    type="url"
                    dir="ltr"
                    value={configDraft.socialLinks.x || ''}
                    onChange={(e) =>
                      setConfigDraft({
                        ...configDraft,
                        socialLinks: {
                          ...configDraft.socialLinks,
                          x: e.target.value,
                        },
                      })
                    }
                    placeholder="https://x.com/..."
                    className={`${inputClass} text-left`}
                  />
                </div>

                <div>
                  <label className={labelClass}>سناب شات</label>
                  <input
                    type="url"
                    dir="ltr"
                    value={configDraft.socialLinks.snapchat || ''}
                    onChange={(e) =>
                      setConfigDraft({
                        ...configDraft,
                        socialLinks: {
                          ...configDraft.socialLinks,
                          snapchat: e.target.value,
                        },
                      })
                    }
                    placeholder="https://snapchat.com/..."
                    className={`${inputClass} text-left`}
                  />
                </div>

                <div>
                  <label className={labelClass}>تيك توك</label>
                  <input
                    type="url"
                    dir="ltr"
                    value={configDraft.socialLinks.tiktok || ''}
                    onChange={(e) =>
                      setConfigDraft({
                        ...configDraft,
                        socialLinks: {
                          ...configDraft.socialLinks,
                          tiktok: e.target.value,
                        },
                      })
                    }
                    placeholder="https://tiktok.com/..."
                    className={`${inputClass} text-left`}
                  />
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
