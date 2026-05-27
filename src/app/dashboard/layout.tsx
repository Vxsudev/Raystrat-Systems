// src/app/dashboard/layout.tsx
import { AuthProvider } from '@/contexts/auth-context';

// Authenticated boundary: the Firebase client auth listener (AuthProvider) is
// mounted here, scoped to /dashboard, rather than in the global root layout.
// Public/documentary routes never bootstrap the Firebase client SDK.
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <AuthProvider>{children}</AuthProvider>;
}
