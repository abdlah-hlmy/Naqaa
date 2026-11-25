'use client';

import React, { useEffect, useState } from 'react';
import { BrandLogo } from './BrandLogo';
import { prefersReducedMotion } from '../lib/gsap';

/**
 * انتقال افتتاحي خفيف يعكس هوية نقاء (قطرة الماء والشعار)
 * لا يعيق القراءة ولا يؤخر ظهور المحتوى للزوار أو محركات البحث
 */
export const LoadingTransition: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    try {
      if (!sessionStorage.getItem('naqaa_intro_seen')) {
        setVisible(true);
      }
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    if (!visible) return;

    const fadeTimer = window.setTimeout(() => setFading(true), 320);
    const hideTimer = window.setTimeout(() => {
      setVisible(false);
      try {
        sessionStorage.setItem('naqaa_intro_seen', '1');
      } catch {
        // ignore storage errors
      }
    }, 680);

    return () => {
      window.clearTimeout(fadeTimer);
      window.clearTimeout(hideTimer);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-50 flex items-center justify-center bg-[#FAF8F3] pointer-events-none transition-opacity duration-300 ease-out ${
        fading ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="flex flex-col items-center gap-3">
        <BrandLogo />
        <span className="text-xs text-[#68776E]">راحة تبدأ من المكان</span>
      </div>
    </div>
  );
};
