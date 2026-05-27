// src/components/app-content.tsx
'use client';

import { usePathname } from 'next/navigation';
import { FloatingAiSuggestor } from '@/components/ui/floating-ai-suggestor';
import { FloatingNoteTaker } from '@/components/ui/floating-note-taker';

// This component conditionally renders UI based on the current route.
export function AppContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Homepage carries no floating AI pill — the above-the-fold reads as an
  // institutional systems firm, not a product surface (above-fold-authority-pass).
  const isServicePage = pathname.startsWith('/systems/');
  const isBytesPage = pathname.startsWith('/bytes/');

  return (
    <>
      {children}
      {isServicePage && <FloatingAiSuggestor />}
      {isBytesPage && <FloatingNoteTaker />}
    </>
  );
}
