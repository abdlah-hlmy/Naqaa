'use client';

import React from 'react';
import { HeroSection } from '../sections/HeroSection';
import { TaglineStripSection } from '../sections/TaglineStripSection';
import { ServicesShowcaseSection } from '../sections/ServicesShowcaseSection';
import { BeforeAfterGallerySection } from '../sections/BeforeAfterGallerySection';
import { WhyNaqaaSection } from '../sections/WhyNaqaaSection';
import { ScopeIncludesSection } from '../sections/ScopeIncludesSection';
import { PricingFactorsSection } from '../sections/PricingFactorsSection';
import { PreArrivalChecklistSection } from '../sections/PreArrivalChecklistSection';
import { HowWeWorkSection } from '../sections/HowWeWorkSection';
import { TestimonialsSection } from '../sections/TestimonialsSection';
import { CoverageAreasSection } from '../sections/CoverageAreasSection';
import { ArticlesPreviewSection } from '../sections/ArticlesPreviewSection';
import { FaqSection } from '../sections/FaqSection';
import { InlineQuoteSection } from '../sections/InlineQuoteSection';

export const HomeView: React.FC = () => {
  return (
    <>
      <HeroSection />
      <TaglineStripSection />
      <ServicesShowcaseSection />
      <BeforeAfterGallerySection />
      <WhyNaqaaSection />
      <ScopeIncludesSection />
      <PricingFactorsSection />
      <PreArrivalChecklistSection />
      <HowWeWorkSection />
      <TestimonialsSection />
      <CoverageAreasSection />
      <ArticlesPreviewSection />
      <FaqSection />
      <InlineQuoteSection />
    </>
  );
};
