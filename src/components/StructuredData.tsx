import React from 'react';

interface StructuredDataProps {
  data: Record<string, unknown> | Record<string, unknown>[];
}

export const StructuredData: React.FC<StructuredDataProps> = ({ data }) => {
  const items = Array.isArray(data) ? data : [data];

  return (
    <>
      {items.map((item, idx) => (
        <script
          key={idx}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  );
};
