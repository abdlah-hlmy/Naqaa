'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowUpLeft, Check, Droplets, Layers, Shield } from 'lucide-react';
import { useQuoteModal } from '../context/QuoteModalContext';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ResilientImage } from '../components/ResilientImage';
import { WiperReveal } from '../components/WiperReveal';
import { AnimatedReveal } from '../components/AnimatedReveal';
import { SectionHeading } from '../components/SectionHeading';
import { GuaranteeBanner } from '../components/GuaranteeBanner';
import { CtaSection } from '../components/CtaSection';

const values = [
  {
    number: '01',
    title: 'الوضوح قبل البداية',
    description:
      'نوضح نطاق العمل وما تشمله الخدمة والسعر المتوقع قبل وصول الفريق، بلا التزامات غامضة.',
  },
  {
    number: '02',
    title: 'العناية بالتفاصيل',
    description:
      'الفرق الحقيقي يظهر في الحواف والزوايا والأسطح التي نلمسها يومياً، وليس في المظهر العام فقط.',
  },
  {
    number: '03',
    title: 'احترام الخصوصية',
    description:
      'ندخل بيتك بترتيب وهدوء ونحافظ على خصوصية المكان والمقتنيات طوال مدة الزيارة.',
  },
  {
    number: '04',
    title: 'تجربة طلب سهلة',
    description:
      'نختصر عليك وقت التنسيق بخطوات واضحة من إرسال التفاصيل حتى إتمام الزيارة.',
  },
];

export const AboutView: React.FC = () => {
  const { openQuoteModal } = useQuoteModal();

  return (
    <div className="bg-[#FAF8F3]">
      {/* 1. المقدمة والهيرو */}
      <section className="py-12 sm:py-16 bg-[#FAF8F3] border-b border-[#17251F]/8">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: 'من نحن' }]} />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
            <div className="lg:col-span-6 flex flex-col justify-center">
              <p className="text-sm font-medium text-[#245745] mb-2">عن نقاء</p>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#17251F] leading-snug">
                نقاء. راحة تبدأ من المكان.
              </h1>
              <p className="mt-5 text-base sm:text-lg text-[#68776E] leading-relaxed">
                نؤمن أن نظافة المكان مو مجرد مظهر، بل راحة يومية تبدأ من التفاصيل الصغيرة. في نقاء، نهتم بتقديم خدمات تنظيف تساعدك تستمتع بمكان مرتب ونظيف، مع تجربة سهلة وواضحة من أول تواصل حتى انتهاء الخدمة.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => openQuoteModal()}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#245745] px-7 py-3.5 text-sm font-semibold text-[#FAF8F3] hover:bg-[#17251F] transition-colors cursor-pointer"
                >
                  <span>اطلب عرض سعر</span>
                  <ArrowUpLeft className="w-4 h-4" />
                </button>

                <Link
                  href="/services"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#245745] hover:text-[#17251F]"
                >
                  <span>استكشف خدماتنا</span>
                  <ArrowLeft className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6 flex items-stretch">
              <div className="w-full rounded-3xl overflow-hidden border border-[#17251F]/10 bg-[#EFEADC] min-h-[300px] sm:min-h-[400px]">
                <ResilientImage
                  src="/images/naqaa_about_bathroom_linen_1795468588085.jpg"
                  alt="حمام منزلي هادئ ونظيف بأسطح حجرية ومناشف ملفوفة بعناية"
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. رؤيتنا ورسالتنا */}
      <section className="py-14 sm:py-20 bg-[#EFEADC]/45 border-b border-[#17251F]/8">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            <AnimatedReveal className="rounded-3xl border border-[#17251F]/10 bg-[#FAF8F3] p-7 sm:p-9">
              <p className="text-xs font-semibold text-[#245745] mb-2">رؤيتنا</p>
              <h2 className="text-2xl font-bold text-[#17251F] mb-3">
                معيار هادئ وموثوق لخدمات المنزل
              </h2>
              <p className="text-sm sm:text-base text-[#68776E] leading-relaxed">
                أن تكون نقاء الخيار المريح لكل أسرة تبحث عن عناية حقيقية بالمكان، بعيداً عن العشوائية أو الوعود المبالغ فيها، مع تجربة حجز وتنفيذ واضحة في كل مرة.
              </p>
            </AnimatedReveal>

            <AnimatedReveal
              delay={0.08}
              className="rounded-3xl border border-[#17251F]/10 bg-[#FAF8F3] p-7 sm:p-9"
            >
              <p className="text-xs font-semibold text-[#245745] mb-2">رسالتنا</p>
              <h2 className="text-2xl font-bold text-[#17251F] mb-3">
                وضوح في السعر ودقة في التنفيذ
              </h2>
              <p className="text-sm sm:text-base text-[#68776E] leading-relaxed">
                تقديم خدمات تنظيف للمنازل والمكيفات والمفروشات وما بعد التشطيب بأسلوب منظم يحترم خصوصية البيت، ويوضح للعميل ما يشمله العمل وتكلفته قبل البدء.
              </p>
            </AnimatedReveal>
          </div>
        </div>
      </section>

      {/* 3. قيمنا */}
      <section className="py-14 sm:py-20 bg-[#FAF8F3]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            kicker="قيمنا"
            title="مبادئ تحكم كل زيارة لمنزلك"
            className="mb-10"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((val, idx) => (
              <AnimatedReveal
                key={val.number}
                delay={idx * 0.06}
                className="rounded-2xl border border-[#17251F]/10 bg-[#FAF8F3] p-6"
              >
                <span className="text-xs font-bold text-[#245745] tabular-nums block mb-3">
                  {val.number}
                </span>
                <h3 className="text-lg font-bold text-[#17251F] mb-2">{val.title}</h3>
                <p className="text-sm text-[#68776E] leading-relaxed">{val.description}</p>
              </AnimatedReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 4. أسلوب عملنا واهتمامنا بالتفاصيل */}
      <section className="py-14 sm:py-20 bg-[#EFEADC]/45 border-t border-[#17251F]/8">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
            <div className="lg:col-span-6 flex items-stretch">
              <WiperReveal className="w-full rounded-3xl border border-[#17251F]/10 bg-[#EFEADC] min-h-[280px] sm:min-h-[380px]">
                <ResilientImage
                  src="/images/naqaa_service_home_cleaning_1795467852143.jpg"
                  alt="عناية يدوية بتنظيف الطاولات الخشبية بمنشفة نظيفة"
                />
              </WiperReveal>
            </div>

            <AnimatedReveal className="lg:col-span-6 flex flex-col justify-center space-y-6">
              <div>
                <p className="text-xs font-semibold text-[#245745] mb-2">أسلوب عملنا</p>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#17251F]">
                  ترتيب، هدوء، واهتمام بالتفاصيل
                </h2>
                <p className="mt-3 text-sm sm:text-base text-[#68776E] leading-relaxed">
                  نبدأ بفهم احتياج المكان بدقة قبل الموعد، ونوزع العمل داخل المنزل بشكل منظم يحفظ انسيابية يومك ويترك المكان مرتباً كما تحب.
                </p>
              </div>

              <div className="rounded-2xl border border-[#17251F]/10 bg-[#FAF8F3] p-6">
                <h3 className="text-base font-bold text-[#17251F] mb-4">
                  اهتمامنا بالتفاصيل في كل خدمة:
                </h3>
                <ul className="space-y-3">
                  {[
                    'تخصيص مناشف وأدوات مناسبة لكل مساحة (المطبخ، الحمامات، الغرف)',
                    'حماية الأثاث والجدران عند تنظيف وحدات التكييف',
                    'مراعاة الأسطح الحساسة مثل الرخام والخشب الطبيعي وأقمشة الكنب الفاتحة',
                    'مراجعة نهائية للأرضيات والزوايا قبل مغادرة المنزل',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-[#17251F]">
                      <Check className="w-4 h-4 text-[#245745] shrink-0 mt-1" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedReveal>
          </div>
        </div>
      </section>

      {/* 5. بروتوكول العناية وضمان التسليم والمتابعة */}
      <section className="py-14 sm:py-20 bg-[#FAF8F3] border-t border-[#17251F]/8">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-10">
          <SectionHeading
            kicker="التزام عملي"
            title="كيف نحافظ على بيتك أثناء الزيارة وبعدها"
            description="تُترجم قيمنا في الميدان إلى خطوات واضحة لحماية الأسطح وضمان رضاك عند التسليم."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Layers,
                title: 'مناشف مخصصة لكل منطقة',
                detail: 'نستخدم مناشف وأدوات مفصولة تماماً بين الحمامات والمطابخ وغرف المعيشة.',
              },
              {
                icon: Shield,
                title: 'حماية الجدران والأثاث',
                detail: 'تغليف عازل حول المكيفات وحماية للأثاث القريب قبل أي غسيل أو معالجة.',
              },
              {
                icon: Droplets,
                title: 'مواد لطيفة على الحجر والنسيج',
                detail: 'اختيار منظفات متوازنة تحافظ على الرخام والخشب الطبيعي وأقمشة المجالس.',
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="rounded-2xl border border-[#17251F]/10 bg-[#EFEADC]/40 p-6 space-y-3"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FAF8F3] border border-[#17251F]/10 text-[#245745]">
                    <Icon className="w-5 h-5" />
                  </span>
                  <h3 className="text-base font-bold text-[#17251F]">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-[#68776E] leading-relaxed">
                    {item.detail}
                  </p>
                </div>
              );
            })}
          </div>

          <GuaranteeBanner />
        </div>
      </section>

      <CtaSection />
    </div>
  );
};
