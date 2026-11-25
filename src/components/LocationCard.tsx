import React from 'react';
import Link from 'next/link';
import { ArrowLeft, MapPin } from 'lucide-react';
import { CityLocation } from '../data/locations';

interface LocationCardProps {
  location: CityLocation;
}

export const LocationCard: React.FC<LocationCardProps> = ({ location }) => {
  const isActive = location.coverageStatus === 'active';

  return (
    <Link
      href={`/locations/${location.slug}`}
      className={`group flex flex-col justify-between rounded-2xl border p-5 transition-colors ${
        isActive
          ? 'border-[#245745]/30 bg-[#EFEADC]/65 hover:border-[#245745]'
          : 'border-[#17251F]/10 bg-[#FAF8F3] hover:border-[#245745]/40'
      }`}
    >
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2 text-xs text-[#68776E]">
            <MapPin className="w-3.5 h-3.5 text-[#245745]" />
            <span>{location.region}</span>
          </div>
          <span
            className={`text-xs font-medium ${
              isActive ? 'text-[#245745]' : 'text-[#68776E]'
            }`}
          >
            {location.coverageLabel}
          </span>
        </div>

        <h3 className="text-lg font-bold text-[#17251F] group-hover:text-[#245745] transition-colors">
          {location.name}
        </h3>

        <p className="mt-2 text-xs sm:text-sm text-[#68776E] leading-relaxed">
          {location.shortNote}
        </p>
      </div>

      <div className="mt-4 pt-3 border-t border-[#17251F]/8 flex items-center justify-between text-xs font-semibold text-[#245745]">
        <span>تفاصيل التغطية</span>
        <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-x-1" />
      </div>
    </Link>
  );
};
