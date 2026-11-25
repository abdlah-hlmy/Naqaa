import React from 'react';
import { servicesData } from '../data/services';
import { ServiceCard } from './ServiceCard';
import { SectionHeading } from './SectionHeading';

interface RelatedServicesProps {
  currentSlug: string;
}

export const RelatedServices: React.FC<RelatedServicesProps> = ({ currentSlug }) => {
  const related = servicesData.filter((srv) => srv.slug !== currentSlug);

  return (
    <section className="py-14 sm:py-18 bg-[#EFEADC]/45 border-t border-[#17251F]/8">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          kicker="خدمات أخرى ذات صلة"
          title="قد يهمك أيضاً"
          description="استكشف بقية خدمات نقاء لتنسيق زيارة شاملة حسب احتياج منزلك."
          className="mb-8"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {related.map((srv) => (
            <ServiceCard key={srv.id} service={srv} />
          ))}
        </div>
      </div>
    </section>
  );
};
