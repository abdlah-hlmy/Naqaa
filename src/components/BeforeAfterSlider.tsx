'use client';

import React, { useCallback, useRef, useState } from 'react';
import { MoveHorizontal } from 'lucide-react';
import { ResilientImage } from './ResilientImage';

interface BeforeAfterSliderProps {
  beforeImage: string;
  beforeAlt: string;
  afterImage: string;
  afterAlt: string;
  initialPosition?: number;
  className?: string;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  beforeImage,
  beforeAlt,
  afterImage,
  afterAlt,
  initialPosition = 50,
  className = '',
}) => {
  const [position, setPosition] = useState<number>(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.width <= 0) return;
    const raw = ((clientX - rect.left) / rect.width) * 100;
    const clamped = Math.max(0, Math.min(100, raw));
    setPosition(clamped);
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    setIsDragging(true);
    updateFromClientX(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    updateFromClientX(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isDragging) {
      e.currentTarget.releasePointerCapture(e.pointerId);
      setIsDragging(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setPosition((prev) => Math.max(0, prev - 5));
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      setPosition((prev) => Math.min(100, prev + 5));
    } else if (e.key === 'Home') {
      e.preventDefault();
      setPosition(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      setPosition(100);
    }
  };

  return (
    <div className={`flex flex-col gap-2.5 ${className}`}>
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onKeyDown={handleKeyDown}
        role="slider"
        tabIndex={0}
        aria-label="مقارنة الصورة قبل التنظيف وبعد التنظيف"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(position)}
        className="relative w-full h-full min-h-[300px] sm:min-h-[380px] aspect-[4/3] rounded-3xl overflow-hidden border border-[#17251F]/12 bg-[#EFEADC] select-none touch-none cursor-ew-resize focus:outline-none focus-visible:ring-2 focus-visible:ring-[#245745]"
      >
        {/* الطبقة السفلية: بعد التنظيف (المكان نظيف) */}
        <div className="absolute inset-0">
          <ResilientImage
            src={afterImage}
            alt={afterAlt}
            loading="eager"
            className="w-full h-full object-cover pointer-events-none"
            wrapperClassName="w-full h-full min-h-[300px]"
          />
        </div>

        {/* الطبقة العلوية: قبل التنظيف (تُقص ديناميكياً من اليمين) */}
        <div
          className="absolute inset-0 will-change-[clip-path]"
          style={{
            clipPath: `inset(0 ${100 - position}% 0 0)`,
          }}
        >
          <ResilientImage
            src={beforeImage}
            alt={beforeAlt}
            loading="eager"
            className="w-full h-full object-cover pointer-events-none"
            wrapperClassName="w-full h-full min-h-[300px]"
          />
        </div>

        {/* تسميتا الزوايا */}
        {position > 14 && (
          <span className="pointer-events-none absolute top-4 left-4 rounded-lg bg-[#17251F]/75 px-3 py-1 text-xs font-medium text-[#FAF8F3]">
            قبل التنظيف
          </span>
        )}
        {position < 86 && (
          <span className="pointer-events-none absolute top-4 right-4 rounded-lg bg-[#245745]/90 px-3 py-1 text-xs font-medium text-[#FAF8F3]">
            بعد التنظيف
          </span>
        )}

        {/* الشريط الفاصل والمقبض */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0"
          style={{ left: `${position}%` }}
        >
          <div className="h-full w-0.5 -translate-x-1/2 bg-[#FAF8F3] shadow-[0_0_8px_rgba(23,37,31,0.35)]" />
          <div
            className={`absolute top-1/2 -translate-x-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#FAF8F3] bg-[#245745] text-[#FAF8F3] shadow-lg transition-transform duration-150 ${
              isDragging ? 'scale-110' : 'scale-100'
            }`}
          >
            <MoveHorizontal className="w-5 h-5" />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between text-xs text-[#68776E] px-1">
        <span>اسحب الشريط للمقارنة قبل وبعد التنظيف</span>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setPosition(95)}
            className="hover:text-[#17251F] transition-colors cursor-pointer"
          >
            قبل
          </button>
          <span aria-hidden="true">·</span>
          <button
            type="button"
            onClick={() => setPosition(50)}
            className="hover:text-[#17251F] transition-colors cursor-pointer"
          >
            المنتصف
          </button>
          <span aria-hidden="true">·</span>
          <button
            type="button"
            onClick={() => setPosition(5)}
            className="text-[#245745] font-semibold hover:text-[#17251F] transition-colors cursor-pointer"
          >
            نظيف بالكامل
          </button>
        </div>
      </div>
    </div>
  );
};
