// src/app/dashboard/settings/page.tsx
'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function SettingsPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  if (authLoading || !user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-8 md:py-12 bg-muted/40">
        <div className="container max-w-4xl">
          <header className="mb-8">
            <h1 className="text-3xl font-bold font-headline">Settings</h1>
            <p className="text-muted-foreground">
              Manage your account, billing, and security settings.
            </p>
          </header>

          <Tabs defaultValue="account" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="billing">Billing</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
            </TabsList>
            
            <TabsContent value="account">
              <Card>
                <CardHeader>
                  <CardTitle>Account Information</CardTitle>
                  <CardDescription>
                    Update your personal details.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>Account form will go here.</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="billing">
               <Card>
                <CardHeader>
                  <CardTitle>Billing & Subscriptions</CardTitle>
                  <CardDescription>
                    View your plan details and payment history.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>Billing information will go here.</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="security">
               <Card>
                <CardHeader>
                  <CardTitle>Security</CardTitle>
                  <CardDescription>
                    Change your password and manage security settings.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>Password change form will go here.</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
}
