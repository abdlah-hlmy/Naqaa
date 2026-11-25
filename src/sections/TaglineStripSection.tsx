'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useSiteData } from '../context/SiteDataContext';
import { ensureGsapRegistered, gsap, prefersReducedMotion } from '../lib/gsap';

export const TaglineStripSection: React.FC = () => {
  const { siteConfig } = useSiteData();
  const fullText = siteConfig.taglineStrip;

  const sectionRef = useRef<HTMLElement>(null);
  const [visibleCount, setVisibleCount] = useState<number>(fullText.length);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [isDone, setIsDone] = useState<boolean>(false);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setVisibleCount(fullText.length);
      setIsTyping(false);
      setIsDone(true);
      return;
    }

    const sectionEl = sectionRef.current;
    if (!sectionEl) return;

    ensureGsapRegistered();

    // نبدأ بعدد حروف 0 قبل الوصول للقسم، مع حفظ الارتفاع عبر النص المخفي
    setVisibleCount(0);
    setIsTyping(false);
    setIsDone(false);

    const progress = { chars: 0 };

    const ctx = gsap.context(() => {
      gsap.to(progress, {
        chars: fullText.length,
        duration: Math.max(1.5, fullText.length * 0.042),
        ease: 'none',
        scrollTrigger: {
          trigger: sectionEl,
          start: 'top 85%',
          once: true,
          onEnter: () => setIsTyping(true),
        },
        onUpdate: () => {
          const next = Math.round(progress.chars);
          setVisibleCount(next);
        },
        onComplete: () => {
          setVisibleCount(fullText.length);
          setIsTyping(false);
          setIsDone(true);
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [fullText]);

  const typedText = fullText.slice(0, visibleCount);

  return (
    <section
      ref={sectionRef}
      aria-label="الشعار التسويقي"
      className="bg-[#EFEADC] border-y border-[#17251F]/8 py-7 sm:py-9"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="relative text-center">
          {/* نص كامل غير مرئي لحجز المساحة ومنع أي اهتزاز في التخطيط أثناء الكتابة، ولضمان قراءته لمحركات البحث */}
          <p
            aria-hidden="true"
            className="text-xl sm:text-2xl lg:text-3xl font-bold text-transparent select-none leading-relaxed"
          >
            {fullText}
          </p>

          {/* النص المكتوب تدريجياً مع الحفاظ على اتصال الحروف العربية */}
          <p
            aria-label={fullText}
            className="absolute inset-0 flex items-center justify-center text-xl sm:text-2xl lg:text-3xl font-bold text-[#245745] leading-relaxed"
          >
            <span>
              {typedText}
              {(isTyping || !isDone) && (
                <span
                  aria-hidden="true"
                  className="inline-block w-[2px] h-[0.95em] bg-[#245745] align-middle mr-1 animate-pulse"
                />
              )}
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};
