import React from 'react';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <nav aria-label="مسار الصفحة" className="mb-6">
      <ol className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-[#68776E]">
        <li>
          <Link href="/" className="hover:text-[#245745] transition-colors">
            الرئيسية
          </Link>
        </li>
        {items.map((item, idx) => (
          <React.Fragment key={item.label}>
            <li aria-hidden="true">
              <ChevronLeft className="w-3.5 h-3.5 text-[#68776E]/70" />
            </li>
            <li>
              {item.href && idx < items.length - 1 ? (
                <Link href={item.href} className="hover:text-[#245745] transition-colors">
                  {item.label}
                </Link>
              ) : (
                <span className="font-medium text-[#17251F]">{item.label}</span>
              )}
            </li>
          </React.Fragment>
        ))}
      </ol>
    </nav>
  );
};
