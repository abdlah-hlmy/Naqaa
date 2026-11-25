import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { ServiceItem } from '../data/services';
import { ResilientImage } from './ResilientImage';

interface ServiceCardProps {
  service: ServiceItem;
  featured?: boolean;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, featured = false }) => {
  return (
    <Link
      href={`/services/${service.slug}`}
      className={`group block rounded-2xl border border-[#17251F]/10 bg-[#FAF8F3] overflow-hidden transition-colors hover:border-[#245745]/35 ${
        featured ? 'md:grid md:grid-cols-12 md:items-stretch' : 'flex flex-col'
      }`}
    >
      <div
        className={`relative overflow-hidden bg-[#EFEADC] ${
          featured ? 'md:col-span-6 aspect-[4/3] md:aspect-auto' : 'aspect-[4/3]'
        }`}
      >
        <ResilientImage
          src={service.image}
          alt={service.imageAlt}
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          wrapperClassName="w-full h-full min-h-[220px]"
        />
      </div>

      <div
        className={`p-6 flex flex-col justify-between ${
          featured ? 'md:col-span-6 md:p-8' : 'flex-1'
        }`}
      >
        <div>
          <span className="block text-xs font-medium text-[#68776E] tabular-nums mb-2">
            {service.number}
          </span>
          <h3 className="text-xl font-bold text-[#17251F] group-hover:text-[#245745] transition-colors">
            {service.title}
          </h3>
          <p className="mt-2.5 text-sm text-[#68776E] leading-relaxed">
            {service.shortDescription}
          </p>
        </div>

        <div className="mt-5 pt-4 border-t border-[#17251F]/8 flex items-center justify-between text-sm font-semibold text-[#245745]">
          <span>اعرف المزيد</span>
          <ArrowLeft className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1" />
        </div>
      </div>
    </Link>
  );
};
