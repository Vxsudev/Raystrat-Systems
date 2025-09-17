// src/app/dashboard/page.tsx
'use client';

import { useAuth } from '@/contexts/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { auth } from '@/lib/firebase/client';
import { LogOut } from 'lucide-react';

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    // You can show a loading spinner here
    return (
        <div className="flex items-center justify-center h-screen">
            <p>Loading...</p>
        </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-8 md:py-12">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold font-headline">Client Dashboard</h1>
              <p className="text-muted-foreground">Welcome back, {user.displayName || user.email}!</p>
            </div>
             <Button variant="outline" onClick={() => auth.signOut()}>
                <LogOut className="mr-2 h-4 w-4" /> Logout
            </Button>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Follow-Up Agent Status</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">Active</p>
                <p className="text-sm text-muted-foreground">Monitoring 12 sequences.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Leads Enrolled (Last 30d)</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">1,204</p>
                <p className="text-sm text-muted-foreground">+15% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Meetings Booked (Last 30d)</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">88</p>
                <p className="text-sm text-muted-foreground">7.3% conversion rate</p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8">
            <Card>
                <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className='text-muted-foreground'>Agent activity will appear here...</p>
                </CardContent>
            </Card>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
