'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { SiteDataProvider } from '../context/SiteDataContext';
import type { StoredCmsState } from '../context/SiteDataContext';
import { QuoteModalProvider } from '../context/QuoteModalContext';
import { Header } from './Header';
import { Footer } from './Footer';
import { WhatsAppFloatingButton } from './WhatsAppFloatingButton';
import { MobileActionBar } from './MobileActionBar';
import { LoadingTransition } from './LoadingTransition';

export const AppShell: React.FC<{
  children: React.ReactNode;
  initialState: StoredCmsState;
}> = ({ children, initialState }) => {
  const pathname = usePathname() || '/';
  const isAdminRoute = pathname.startsWith('/naqaa-manage');

  return (
    <SiteDataProvider initialState={initialState}>
      <QuoteModalProvider>
        {isAdminRoute ? (
          <div className="min-h-screen bg-[#FAF8F3] text-[#17251F]">{children}</div>
        ) : (
          <div className="min-h-screen flex flex-col bg-[#FAF8F3] text-[#17251F]">
            <LoadingTransition />
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <WhatsAppFloatingButton />
            <MobileActionBar />
          </div>
        )}
      </QuoteModalProvider>
    </SiteDataProvider>
  );
};
