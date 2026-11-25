import React from 'react';

interface BrandLogoProps {
  variant?: 'default' | 'light';
  showMark?: boolean;
  className?: string;
}

export function BrandMark({
  className = 'w-6 h-7',
  strokeColor = '#245745',
}: {
  className?: string;
  strokeColor?: string;
}) {
  return (
    <svg
      viewBox="0 0 36 42"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M18 3C18 3 6 16.2 6 25.5C6 32.4036 11.3726 38 18 38C24.6274 38 30 32.4036 30 25.5C30 16.2 18 3 18 3Z"
        stroke={strokeColor}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13 26.5C14.8 28.4 17.3 29.3 20.5 28.6C23.1 28 24.7 25.8 25 23.2"
        stroke={strokeColor}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'default',
  showMark = true,
  className = '',
}) => {
  const isLight = variant === 'light';
  const textColor = isLight ? 'text-[#FAF8F3]' : 'text-[#17251F]';
  const strokeColor = isLight ? '#FAF8F3' : '#245745';

  return (
    <span className={`inline-flex items-center gap-2 whitespace-nowrap shrink-0 ${className}`}>
      {showMark && <BrandMark className="w-5 h-6 shrink-0" strokeColor={strokeColor} />}
      <span
        className={`font-logo text-2xl sm:text-[28px] font-bold leading-none pb-0.5 tracking-normal ${textColor}`}
      >
        نقاء
      </span>
    </span>
  );
};
