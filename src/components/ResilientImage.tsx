'use client';

import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import Image from 'next/image';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  wrapperClassName?: string;
  loading?: 'eager' | 'lazy';
  sizes?: string;
}

export const ResilientImage: React.FC<ResilientImageProps> = ({
  src,
  alt,
  className = 'w-full h-full object-cover',
  wrapperClassName = '',
  loading = 'lazy',
  sizes = '(max-width: 768px) 100vw, 50vw',
}) => {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-[#EFEADC] text-[#68776E] p-6 text-center ${wrapperClassName}`}
        role="img"
        aria-label={alt}
      >
        <Sparkles className="w-7 h-7 text-[#245745] mb-3 opacity-75" />
        <p className="text-sm font-medium text-[#17251F] max-w-xs">{alt}</p>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={1600}
      height={1200}
      sizes={sizes}
      loading={loading}
      unoptimized={/^(https?:)?\/\//i.test(src)}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
};
