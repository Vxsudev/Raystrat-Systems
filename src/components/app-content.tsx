// src/components/app-content.tsx
'use client';

import { usePathname } from 'next/navigation';
import { ServiceSuggester } from '@/components/ui/service-suggester';
import { FloatingAiSuggestor } from '@/components/ui/floating-ai-suggestor';
import { FloatingNoteTaker } from '@/components/ui/floating-note-taker';

// This component conditionally renders UI based on the current route.
export function AppContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  const isHomePage = pathname === '/';
  const isServicePage = pathname.startsWith('/services/');
  const isBytesPage = pathname.startsWith('/bytes/');

  return (
    <>
      {children}
      {isHomePage && <ServiceSuggester />}
      {isServicePage && <FloatingAiSuggestor />}
      {isBytesPage && <FloatingNoteTaker />}
    </>
  );
}
