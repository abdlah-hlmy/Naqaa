import React from 'react';
import { Breadcrumbs, BreadcrumbItem } from './Breadcrumbs';

interface PageHeroProps {
  breadcrumbs: BreadcrumbItem[];
  kicker?: string;
  title: string;
  description: string;
  actions?: React.ReactNode;
}

export const PageHero: React.FC<PageHeroProps> = ({
  breadcrumbs,
  kicker,
  title,
  description,
  actions,
}) => {
  return (
    <section className="bg-[#EFEADC]/45 border-b border-[#17251F]/8 py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={breadcrumbs} />
        <div className="max-w-3xl">
          {kicker && (
            <p className="text-sm font-medium text-[#245745] mb-2">{kicker}</p>
          )}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#17251F] leading-snug">
            {title}
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#68776E] leading-relaxed">
            {description}
          </p>
          {actions && <div className="mt-7 flex flex-wrap gap-3">{actions}</div>}
        </div>
      </div>
    </section>
  );
};
