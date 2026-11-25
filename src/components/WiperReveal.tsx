'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Hand, RotateCcw, Sparkles } from 'lucide-react';
import { ensureGsapRegistered, gsap, prefersReducedMotion } from '../lib/gsap';

interface WiperRevealProps {
  children: React.ReactNode;
  className?: string;
  showControls?: boolean;
}

type WipePhase = 'ready' | 'wiping' | 'manual' | 'done';

const DROPLET_SEEDS = [
  [0.12, 0.18, 4.5],
  [0.24, 0.14, 3.2],
  [0.37, 0.22, 5.1],
  [0.48, 0.11, 2.8],
  [0.62, 0.19, 4.0],
  [0.78, 0.15, 5.4],
  [0.88, 0.25, 3.5],
  [0.16, 0.39, 3.8],
  [0.29, 0.44, 5.6],
  [0.43, 0.35, 3.1],
  [0.57, 0.42, 4.7],
  [0.71, 0.37, 3.4],
  [0.84, 0.46, 5.0],
  [0.92, 0.34, 2.9],
  [0.1, 0.61, 5.2],
  [0.22, 0.57, 3.3],
  [0.35, 0.68, 4.4],
  [0.51, 0.62, 5.8],
  [0.65, 0.56, 3.0],
  [0.76, 0.67, 4.3],
  [0.89, 0.6, 3.6],
  [0.14, 0.81, 4.1],
  [0.28, 0.77, 5.3],
  [0.44, 0.85, 3.4],
  [0.59, 0.79, 4.8],
  [0.73, 0.84, 3.1],
  [0.86, 0.78, 5.2],
  [0.93, 0.87, 3.9],
];

function paintCondensationMist(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number
) {
  ctx.save();
  ctx.globalCompositeOperation = 'source-over';
  ctx.clearRect(0, 0, w, h);

  // طبقة ضباب وتكثف دافئة متدرجة
  const baseGrad = ctx.createLinearGradient(0, 0, w, h);
  baseGrad.addColorStop(0, 'rgba(244, 240, 230, 0.86)');
  baseGrad.addColorStop(0.5, 'rgba(238, 233, 219, 0.80)');
  baseGrad.addColorStop(1, 'rgba(232, 226, 210, 0.85)');
  ctx.fillStyle = baseGrad;
  ctx.fillRect(0, 0, w, h);

  // سحب ضبابية ناعمة لتعطي ملمس زجاج مشبّر
  const clouds = [
    [0.2, 0.25, 0.38],
    [0.75, 0.22, 0.42],
    [0.5, 0.52, 0.48],
    [0.25, 0.78, 0.4],
    [0.8, 0.76, 0.38],
  ];
  clouds.forEach(([cx, cy, cr]) => {
    const x = cx * w;
    const y = cy * h;
    const r = cr * Math.max(w, h);
    const radial = ctx.createRadialGradient(x, y, 0, x, y, r);
    radial.addColorStop(0, 'rgba(250, 248, 243, 0.48)');
    radial.addColorStop(1, 'rgba(250, 248, 243, 0)');
    ctx.fillStyle = radial;
    ctx.fillRect(0, 0, w, h);
  });

  // قطرات ماء دقيقة على السطح المشبّر
  DROPLET_SEEDS.forEach(([rx, ry, radius]) => {
    const x = rx * w;
    const y = ry * h;

    // ظل خفيف أسفل القطرة
    ctx.beginPath();
    ctx.arc(x, y + 1, radius + 0.6, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(23, 37, 31, 0.09)';
    ctx.fill();

    // جسم القطرة الشفاف
    const dropGrad = ctx.createRadialGradient(
      x - radius * 0.3,
      y - radius * 0.3,
      radius * 0.1,
      x,
      y,
      radius
    );
    dropGrad.addColorStop(0, 'rgba(255, 255, 255, 0.72)');
    dropGrad.addColorStop(0.65, 'rgba(225, 234, 229, 0.42)');
    dropGrad.addColorStop(1, 'rgba(36, 87, 69, 0.16)');
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = dropGrad;
    ctx.fill();

    // لمعة علوية
    ctx.beginPath();
    ctx.arc(x - radius * 0.32, y - radius * 0.32, Math.max(1, radius * 0.28), 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.fill();
  });

  ctx.restore();
}

function eraseSoftStroke(
  ctx: CanvasRenderingContext2D,
  from: { x: number; y: number } | null,
  to: { x: number; y: number },
  radius: number
) {
  ctx.save();
  ctx.globalCompositeOperation = 'destination-out';

  const drawStamp = (x: number, y: number) => {
    const grad = ctx.createRadialGradient(x, y, radius * 0.25, x, y, radius);
    grad.addColorStop(0, 'rgba(0, 0, 0, 1)');
    grad.addColorStop(0.68, 'rgba(0, 0, 0, 0.88)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
  };

  if (!from) {
    drawStamp(to.x, to.y);
    ctx.restore();
    return;
  }

  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const dist = Math.hypot(dx, dy);
  const step = Math.max(6, radius * 0.22);
  const count = Math.max(1, Math.ceil(dist / step));

  for (let i = 1; i <= count; i++) {
    const ratio = i / count;
    drawStamp(from.x + dx * ratio, from.y + dy * ratio);
  }

  ctx.restore();
}

function evaluateSweepPath(
  t: number,
  w: number,
  h: number
): { x: number; y: number; angle: number } {
  const clamped = Math.max(0, Math.min(1, t));

  // ثلاث تمريرات منحنية متداخلة (شكل S ناعم) تغطي الصورة كاملة
  let x = 0.9 * w;
  let y = 0.18 * h;
  let angle = -12;

  if (clamped < 0.32) {
    const p = clamped / 0.32;
    x = (0.94 - 0.86 * p) * w;
    y = (0.17 + Math.sin(p * Math.PI) * 0.06 + p * 0.09) * h;
    angle = -14 + p * 8;
  } else if (clamped < 0.39) {
    const p = (clamped - 0.32) / 0.07;
    x = (0.08 - Math.sin(p * Math.PI) * 0.03) * w;
    y = (0.26 + p * 0.24) * h;
    angle = -6 + p * 18;
  } else if (clamped < 0.69) {
    const p = (clamped - 0.39) / 0.3;
    x = (0.06 + 0.88 * p) * w;
    y = (0.5 + Math.sin(p * Math.PI) * 0.05 + p * 0.04) * h;
    angle = 12 - p * 6;
  } else if (clamped < 0.76) {
    const p = (clamped - 0.69) / 0.07;
    x = (0.94 + Math.sin(p * Math.PI) * 0.02) * w;
    y = (0.54 + p * 0.25) * h;
    angle = 6 - p * 20;
  } else {
    const p = (clamped - 0.76) / 0.24;
    x = (0.94 - 0.88 * p) * w;
    y = (0.79 + Math.sin(p * Math.PI) * 0.04 + p * 0.07) * h;
    angle = -14 + p * 10;
  }

  return { x, y, angle };
}

export const WiperReveal: React.FC<WiperRevealProps> = ({
  children,
  className = '',
  showControls = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const clothRef = useRef<HTMLDivElement>(null);
  const animTweenRef = useRef<gsap.core.Tween | null>(null);
  const sizeRef = useRef<{ w: number; h: number }>({ w: 0, h: 0 });
  const clearedGridRef = useRef<Set<string>>(new Set());
  const lastManualPtRef = useRef<{ x: number; y: number } | null>(null);
  const isDrawingRef = useRef(false);

  const [phase, setPhase] = useState<WipePhase>('ready');

  const syncCanvasToContainer = useCallback((reDrawMist: boolean) => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return null;

    const rect = container.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) return null;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    sizeRef.current = { w: rect.width, h: rect.height };
    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);

    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (reDrawMist) {
      paintCondensationMist(ctx, rect.width, rect.height);
    }

    return { ctx, w: rect.width, h: rect.height };
  }, []);

  const runAutoWipe = useCallback(() => {
    if (prefersReducedMotion()) {
      setPhase('done');
      return;
    }

    animTweenRef.current?.kill();
    const setup = syncCanvasToContainer(true);
    const cloth = clothRef.current;
    const canvas = canvasRef.current;
    if (!setup || !cloth || !canvas) {
      setPhase('done');
      return;
    }

    const { ctx, w, h } = setup;
    const brushRadius = Math.max(w, h) * 0.27;
    let prevPt: { x: number; y: number } | null = null;

    setPhase('wiping');
    gsap.set(canvas, { opacity: 1 });
    gsap.set(cloth, { opacity: 0, scale: 0.92 });

    const tracker = { progress: 0 };

    animTweenRef.current = gsap.to(tracker, {
      progress: 1,
      duration: 1.65,
      ease: 'power2.inOut',
      onStart: () => {
        gsap.to(cloth, { opacity: 1, scale: 1, duration: 0.22, ease: 'power1.out' });
      },
      onUpdate: () => {
        const pt = evaluateSweepPath(tracker.progress, w, h);
        eraseSoftStroke(ctx, prevPt, { x: pt.x, y: pt.y }, brushRadius);
        prevPt = { x: pt.x, y: pt.y };

        gsap.set(cloth, {
          x: pt.x,
          y: pt.y,
          rotation: pt.angle,
        });
      },
      onComplete: () => {
        gsap.to(cloth, {
          opacity: 0,
          scale: 0.9,
          duration: 0.28,
          ease: 'power1.out',
        });
        gsap.to(canvas, {
          opacity: 0,
          duration: 0.35,
          ease: 'power1.out',
          onComplete: () => {
            setPhase('done');
          },
        });
      },
    });
  }, [syncCanvasToContainer]);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setPhase('done');
      return;
    }
    ensureGsapRegistered();

    const container = containerRef.current;
    if (!container) return;

    syncCanvasToContainer(true);

    const triggerCtx = gsap.context(() => {
      gsap.to(
        {},
        {
          scrollTrigger: {
            trigger: container,
            start: 'top 80%',
            once: true,
            onEnter: () => {
              runAutoWipe();
            },
          },
        }
      );
    }, containerRef);

    return () => {
      animTweenRef.current?.kill();
      triggerCtx.revert();
    };
  }, [runAutoWipe, syncCanvasToContainer]);

  const startManualWipeMode = () => {
    animTweenRef.current?.kill();
    const setup = syncCanvasToContainer(true);
    const canvas = canvasRef.current;
    const cloth = clothRef.current;
    if (!setup || !canvas || !cloth) return;

    clearedGridRef.current.clear();
    lastManualPtRef.current = null;
    isDrawingRef.current = false;

    setPhase('manual');
    gsap.set(canvas, { opacity: 1 });
    gsap.set(cloth, {
      x: setup.w * 0.5,
      y: setup.h * 0.5,
      rotation: -10,
      opacity: 0.95,
      scale: 1,
    });
  };

  const applyManualErase = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    const cloth = clothRef.current;
    if (!canvas || !cloth) return;

    const rect = canvas.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) return;

    const x = Math.max(0, Math.min(rect.width, clientX - rect.left));
    const y = Math.max(0, Math.min(rect.height, clientY - rect.top));
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const radius = Math.max(rect.width, rect.height) * 0.16;
    eraseSoftStroke(ctx, lastManualPtRef.current, { x, y }, radius);

    const dx = lastManualPtRef.current ? x - lastManualPtRef.current.x : 0;
    const tilt = Math.max(-18, Math.min(18, dx * 0.45 - 8));
    lastManualPtRef.current = { x, y };

    gsap.set(cloth, {
      x,
      y,
      rotation: tilt,
      opacity: 1,
    });

    // تتبع نسبة المسح لإتمام الكشف بسلاسة عند تنظيف معظم السطح
    const cols = 6;
    const rows = 5;
    const col = Math.min(cols - 1, Math.floor((x / rect.width) * cols));
    const row = Math.min(rows - 1, Math.floor((y / rect.height) * rows));
    clearedGridRef.current.add(`${col}-${row}`);

    if (clearedGridRef.current.size >= Math.floor(cols * rows * 0.8)) {
      isDrawingRef.current = false;
      gsap.to([cloth, canvas], {
        opacity: 0,
        duration: 0.4,
        ease: 'power1.out',
        onComplete: () => setPhase('done'),
      });
    }
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (phase !== 'manual') return;
    e.currentTarget.setPointerCapture(e.pointerId);
    isDrawingRef.current = true;
    lastManualPtRef.current = null;
    applyManualErase(e.clientX, e.clientY);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (phase !== 'manual') return;
    if (e.pointerType === 'mouse' || isDrawingRef.current) {
      applyManualErase(e.clientX, e.clientY);
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (phase !== 'manual') return;
    if (isDrawingRef.current) {
      e.currentTarget.releasePointerCapture(e.pointerId);
      isDrawingRef.current = false;
    }
    lastManualPtRef.current = null;
  };

  const showOverlay = phase !== 'done';

  return (
    <div className="flex flex-col gap-2.5 w-full h-full">
      <div ref={containerRef} className={`relative flex-1 overflow-hidden ${className}`}>
        {children}

        {/* طبقة الضباب والقطرات الممسوحة */}
        <canvas
          ref={canvasRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          aria-hidden="true"
          className={`absolute inset-0 h-full w-full ${
            phase === 'manual'
              ? 'pointer-events-auto touch-none cursor-none'
              : 'pointer-events-none'
          } ${showOverlay ? 'block' : 'hidden'}`}
        />

        {/* القماشة/المنشفة الكتانية المتحركة */}
        <div
          ref={clothRef}
          aria-hidden="true"
          className={`pointer-events-none absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 will-change-transform ${
            showOverlay ? 'opacity-0' : 'hidden'
          }`}
        >
          <div className="relative flex h-14 w-20 sm:h-16 sm:w-24 items-center justify-center rounded-2xl border border-[#245745]/25 bg-gradient-to-br from-[#FAF8F3] via-[#EFEADC] to-[#DFD5BC] shadow-[0_14px_28px_rgba(23,37,31,0.22)]">
            {/* طيّات المنشفة القماشية */}
            <div className="absolute inset-1.5 rounded-xl border border-dashed border-[#245745]/20" />
            <div className="absolute inset-x-3 top-1/2 h-px -translate-y-1/2 bg-[#245745]/12 rotate-[-6deg]" />
            {/* <div className="absolute -top-1.5 -right-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-[#245745] text-[#FAF8F3] shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
            </div> */}
            <span className="text-[10px] font-bold tracking-tight text-[#245745]/80">
              نقاء
            </span>
          </div>
        </div>

        {/* تلميح لطيف في وضع المسح اليدوي */}
        {phase === 'manual' && (
          <div className="pointer-events-none absolute top-4 right-4 rounded-xl bg-[#17251F]/80 px-3 py-1.5 text-xs font-medium text-[#FAF8F3]">
            حرّك المنشفة لمسح الضباب
          </div>
        )}
      </div>

      {showControls && (
        <div className="flex items-center justify-between gap-3 px-1 text-xs text-[#68776E]">
          <span>
            {phase === 'manual'
              ? 'اسحب على الصورة لمسح الضباب بالمنشفة'
              : 'ملمس نظافة يحافظ على صفاء كل سطح'}
          </span>

          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={runAutoWipe}
              className="inline-flex items-center gap-1 font-medium hover:text-[#17251F] transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>أعد المسح</span>
            </button>
            <span aria-hidden="true">·</span>
            <button
              type="button"
              onClick={startManualWipeMode}
              className="inline-flex items-center gap-1 font-semibold text-[#245745] hover:text-[#17251F] transition-colors cursor-pointer"
            >
              <Hand className="w-3.5 h-3.5" />
              <span>امسح بيدك</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
