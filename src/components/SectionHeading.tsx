import React from 'react';

interface SectionHeadingProps {
  kicker?: string;
  title: string;
  description?: string;
  align?: 'start' | 'center';
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  kicker,
  title,
  description,
  align = 'start',
  className = '',
}) => {
  const alignClasses = align === 'center' ? 'text-center mx-auto' : 'text-start';

  return (
    <div className={`max-w-2xl ${alignClasses} ${className}`}>
      {kicker && (
        <p className="text-sm font-medium text-[#245745] mb-2">{kicker}</p>
      )}
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#17251F] leading-snug">
        {title}
      </h2>
      {description && (
        <p className="mt-3 text-base text-[#68776E] leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
};
