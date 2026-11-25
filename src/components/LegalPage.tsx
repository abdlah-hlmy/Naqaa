import React from 'react';
import { PageHero } from './PageHero';

export interface LegalSection {
  title: string;
  paragraphs?: string[];
  items?: string[];
}

interface LegalPageProps {
  title: string;
  description: string;
  sections: LegalSection[];
}

export const LegalPage: React.FC<LegalPageProps> = ({
  title,
  description,
  sections,
}) => (
  <div className="bg-[#FAF8F3]">
    <PageHero
      breadcrumbs={[{ label: title }]}
      kicker="سياسات نقاء"
      title={title}
      description={description}
    />

    <section className="py-12 sm:py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <article className="rounded-3xl border border-[#17251F]/10 bg-[#FAF8F3] p-6 sm:p-9 lg:p-11">
          <div className="space-y-8">
            {sections.map((section) => (
              <section key={section.title}>
                <h2 className="text-lg sm:text-xl font-bold text-[#245745]">
                  {section.title}
                </h2>
                {section.paragraphs?.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="mt-3 text-sm sm:text-base leading-8 text-[#68776E]"
                  >
                    {paragraph}
                  </p>
                ))}
                {section.items && (
                  <ul className="mt-3 list-disc space-y-2 pe-6 text-sm sm:text-base leading-7 text-[#68776E]">
                    {section.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>
        </article>
      </div>
    </section>
  </div>
);
