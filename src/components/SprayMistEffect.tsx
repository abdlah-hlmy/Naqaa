import React from 'react';

type MistVariant = 'topLeft' | 'topRight' | 'bottomRight' | 'photoCorner';

interface SprayMistEffectProps {
  className?: string;
  variant?: MistVariant;
}

interface MistDot {
  x: string;
  y: string;
  size: string;
  color: string;
  delay: string;
  duration?: string;
}

const variantDots: Record<MistVariant, MistDot[]> = {
  topLeft: [
    { x: '70%', y: '62%', size: 'w-1.5 h-1.5', color: 'bg-[#245745]', delay: '0s' },
    { x: '52%', y: '48%', size: 'w-1 h-1', color: 'bg-[#245745]', delay: '0.6s' },
    { x: '36%', y: '30%', size: 'w-1.5 h-1.5', color: 'bg-[#68776E]', delay: '1.2s' },
    { x: '60%', y: '24%', size: 'w-1 h-1', color: 'bg-[#245745]', delay: '1.9s' },
  ],
  topRight: [
    { x: '24%', y: '60%', size: 'w-1 h-1', color: 'bg-[#245745]', delay: '0.4s', duration: '3.8s' },
    { x: '48%', y: '40%', size: 'w-1.5 h-1.5', color: 'bg-[#68776E]', delay: '1.3s', duration: '3.8s' },
    { x: '68%', y: '24%', size: 'w-1 h-1', color: 'bg-[#245745]', delay: '2.2s', duration: '3.8s' },
  ],
  bottomRight: [
    { x: '30%', y: '56%', size: 'w-1.5 h-1.5', color: 'bg-[#68776E]', delay: '0.8s', duration: '4s' },
    { x: '56%', y: '44%', size: 'w-1 h-1', color: 'bg-[#245745]', delay: '1.6s', duration: '4s' },
    { x: '74%', y: '68%', size: 'w-1 h-1', color: 'bg-[#245745]', delay: '2.5s', duration: '4s' },
  ],
  photoCorner: [
    { x: '28%', y: '58%', size: 'w-1.5 h-1.5', color: 'bg-[#245745]', delay: '0.3s', duration: '3.6s' },
    { x: '54%', y: '34%', size: 'w-1 h-1', color: 'bg-[#68776E]', delay: '1.4s', duration: '3.6s' },
    { x: '72%', y: '50%', size: 'w-1 h-1', color: 'bg-[#245745]', delay: '2.1s', duration: '3.6s' },
  ],
};

/**
 * حركة رذاذ خفيفة مستوحاة من بخاخ التنظيف على الهوية البصرية
 * تحترم تفضيل تقليل الحركة وتعمل عبر transform/opacity فقط
 */
export const SprayMistEffect: React.FC<SprayMistEffectProps> = ({
  className = '',
  variant = 'topLeft',
}) => {
  const dots = variantDots[variant];

  return (
    <div
      className={`pointer-events-none select-none w-20 h-16 ${className}`}
      aria-hidden="true"
    >
      <div className="relative w-full h-full">
        {dots.map((dot, idx) => (
          <span
            key={idx}
            className={`absolute rounded-full ${dot.size} ${dot.color} naqaa-mist-particle`}
            style={{
              left: dot.x,
              top: dot.y,
              animationDelay: dot.delay,
              animationDuration: dot.duration || '3.4s',
            }}
          />
        ))}
      </div>
    </div>
  );
};
