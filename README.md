<div align="center" dir="rtl">

# نقاء | Naqaa

**موقع تجريبي لشركة تنظيف سعودية، مبني بالعربي (RTL) على Next.js**

[**شاهد الموقع المباشر ←**](https://naqaa-cleaning.vercel.app/)

![Next.js](https://img.shields.io/badge/Next.js-black?logo=nextdotjs) ![React](https://img.shields.io/badge/React-20232a?logo=react) ![TypeScript](https://img.shields.io/badge/TypeScript-3178c6?logo=typescript&logoColor=white) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-0f172a?logo=tailwindcss) ![GSAP](https://img.shields.io/badge/GSAP-88ce02?logo=greensock&logoColor=black)

</div>

<div dir="rtl">

> نقاء مو شركة حقيقية، هو موقع مثال سويته عشان أعرض لشركات التنظيف كيف ممكن يكون شكل موقعها.

## وش فيه الموقع

- **موقع عربي كامل (RTL)** بنص بلهجة سعودية: الرئيسية، الخدمات، المناطق، المقالات، من نحن، تواصل معنا، الخصوصية والشروط.
- **أربع صفحات خدمات** (تنظيف المنازل، المكيفات، الكنب والسجاد، ما بعد التشطيب)، وكل صفحة فيها سلايدر قبل وبعد.
- **حاسبة تقدير السعر**: تختار الخدمة ومساحة الشقة، ويطلع لك نطاق السعر والمدة المتوقعة، وبعدها ترسل الطلب عبر واتساب.
- **حركة المنشفة** في الصفحة الرئيسية: صورة الخدمة تحت ضباب، والمنشفة تمسحه. تشتغل أول ما توصل للقسم، وتقدر تعيدها أو تمسح بيدك.
- **كتابة الجملة تدريجيًا** عند وصول الزائر لها بالتمرير.
- **صفحات المناطق والمقالات** مع بنية مناسبة لمحركات البحث، وsitemap وrobots.
- **لوحة إدارة بسيطة** لتعديل المحتوى (تحتاج تسجيل دخول).
- **مصمم للجوال أولًا** بهوية هادية، أخضر مع كريمي.

## التقنيات

Next.js (App Router)، React، TypeScript، Tailwind CSS، GSAP، أيقونات Lucide.

## التشغيل محليًا

```bash
npm install
cp .env.example .env.local   # عدّل القيم بقيمك الخاصة
npm run dev
```

للبناء: `npm run build` ثم `npm start`.

## متغيرات البيئة

شوف ملف [`.env.example`](.env.example). لوحة الإدارة تحتاج `ADMIN_EMAIL` و`ADMIN_PASSWORD` و`ADMIN_SESSION_SECRET`. إذا ما انضبطت كلها، دخول الإدارة يبقى مقفل.

## عن المطوّر

بناء Abdlah Hlmy، مطوّر مواقع (Next.js وSupabase). [حسابي على GitHub](https://github.com/abdlah-hlmy)

</div>
