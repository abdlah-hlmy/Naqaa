'use client';

import React, { useEffect, useState } from 'react';

export const ScrollProgressIndicator: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let rafId = 0;

    const updateProgress = () => {
      rafId = 0;
      const doc = document.documentElement;
      const scrollTop = window.scrollY || doc.scrollTop || 0;
      const scrollHeight = doc.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) {
        setProgress(0);
        return;
      }
      const next = Math.min(100, Math.max(0, (scrollTop / scrollHeight) * 100));
      setProgress(next);
    };

    const handleScroll = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] bg-[#17251F]/5 overflow-hidden"
    >
      <div
        className="h-full bg-[#245745] transition-[width] duration-75 ease-out origin-right"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};
