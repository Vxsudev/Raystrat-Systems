// src/app/dashboard/layout.tsx
import { FloatingAiSuggestor } from '@/components/ui/floating-ai-suggestor';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
      {/* Intentionally not rendering FloatingAiSuggestor here */}
    </>
  );
}
