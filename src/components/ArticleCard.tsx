import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { ArticleItem } from '../data/articles';
import { ResilientImage } from './ResilientImage';

interface ArticleCardProps {
  article: ArticleItem;
  featured?: boolean;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  featured = false,
}) => {
  return (
    <Link
      href={`/articles/${article.slug}`}
      className={`group block rounded-3xl border border-[#17251F]/10 bg-[#FAF8F3] overflow-hidden transition-colors hover:border-[#245745]/35 ${
        featured ? 'lg:grid lg:grid-cols-12 lg:items-stretch' : 'flex flex-col'
      }`}
    >
      <div
        className={`relative overflow-hidden bg-[#EFEADC] ${
          featured
            ? 'lg:col-span-6 aspect-[16/10] lg:aspect-auto min-h-[240px]'
            : 'aspect-[16/10]'
        }`}
      >
        <ResilientImage
          src={article.coverImage}
          alt={article.coverAlt}
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          wrapperClassName="w-full h-full min-h-[220px]"
        />
      </div>

      <div
        className={`p-6 sm:p-8 flex flex-col justify-between ${
          featured ? 'lg:col-span-6 lg:p-10' : 'flex-1'
        }`}
      >
        <div>
          <div className="flex flex-wrap items-center gap-2 text-xs text-[#68776E] mb-3">
            <span className="font-semibold text-[#245745]">{article.category}</span>
            <span aria-hidden="true">·</span>
            <span>{article.readTime}</span>
            <span aria-hidden="true">·</span>
            <span>{article.publishedDate}</span>
          </div>

          <h3
            className={`font-bold text-[#17251F] group-hover:text-[#245745] transition-colors leading-snug ${
              featured ? 'text-xl sm:text-2xl lg:text-[26px]' : 'text-lg sm:text-xl'
            }`}
          >
            {article.title}
          </h3>

          <p className="mt-3 text-sm sm:text-base text-[#68776E] leading-relaxed">
            {article.excerpt}
          </p>
        </div>

        <div className="mt-6 pt-4 border-t border-[#17251F]/8 flex items-center justify-between text-sm font-semibold text-[#245745]">
          <span>اقرأ المقال</span>
          <ArrowLeft className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1" />
        </div>
      </div>
    </Link>
  );
};
