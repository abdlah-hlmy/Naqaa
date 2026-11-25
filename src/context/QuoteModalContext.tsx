'use client';

import React, { createContext, useContext, useState } from 'react';
import { QuoteModal } from '../components/QuoteModal';

export interface QuoteDefaults {
  service?: string;
  city?: string;
}

interface QuoteModalContextValue {
  openQuoteModal: (opts?: QuoteDefaults) => void;
  closeQuoteModal: () => void;
}

const QuoteModalContext = createContext<QuoteModalContextValue | null>(null);

export const QuoteModalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [quoteDefaults, setQuoteDefaults] = useState<QuoteDefaults>({});

  const openQuoteModal = (opts?: QuoteDefaults) => {
    setQuoteDefaults(opts || {});
    setQuoteOpen(true);
  };

  const closeQuoteModal = () => {
    setQuoteOpen(false);
  };

  return (
    <QuoteModalContext.Provider value={{ openQuoteModal, closeQuoteModal }}>
      {children}
      <QuoteModal
        isOpen={quoteOpen}
        onClose={closeQuoteModal}
        defaultService={quoteDefaults.service}
        defaultCity={quoteDefaults.city}
      />
    </QuoteModalContext.Provider>
  );
};

export function useQuoteModal(): QuoteModalContextValue {
  const ctx = useContext(QuoteModalContext);
  if (!ctx) {
    throw new Error('useQuoteModal must be used inside QuoteModalProvider');
  }
  return ctx;
}
