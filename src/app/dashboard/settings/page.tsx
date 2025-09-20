// src/app/dashboard/settings/page.tsx
'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { updateUserProfile, changePassword } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

// Mock data for billing history
const billingHistory = [
  { invoiceId: 'INV-2024-001', date: 'July 1, 2024', amount: '₹49,099', status: 'Paid' },
  { invoiceId: 'INV-2024-002', date: 'August 1, 2024', amount: '₹49,099', status: 'Paid' },
  { invoiceId: 'INV-2024-003', date: 'September 1, 2024', amount: '₹49,099', status: 'Due' },
];

function ProfileSubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending}>
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      Save Changes
    </Button>
  );
}

function PasswordSubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending}>
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      Change Password
    </Button>
  );
}

export default function SettingsPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const [profileState, profileFormAction] = useActionState(updateUserProfile, { message: null, errors: {} });
  const [passwordState, passwordFormAction] = useActionState(changePassword, { message: null, errors: {} });

  const profileFormRef = React.useRef<HTMLFormElement>(null);
  const passwordFormRef = React.useRef<HTMLFormElement>(null);

  React.useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);
  
  React.useEffect(() => {
    if (profileState?.message === 'Success') {
      toast({ title: 'Success', description: 'Your profile has been updated.' });
    } else if (profileState?.message === 'Error') {
      toast({ title: 'Error', description: 'Could not update your profile.', variant: 'destructive' });
    }
  }, [profileState, toast]);

  React.useEffect(() => {
    if (passwordState?.message === 'Success') {
      toast({ title: 'Success', description: 'Your password has been changed.' });
      passwordFormRef.current?.reset();
    } else if (passwordState?.message === 'Error' && passwordState.errors?.general) {
       toast({ title: 'Error', description: passwordState.errors.general[0], variant: 'destructive' });
    }
  }, [passwordState, toast]);


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
             <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold font-headline">Settings</h1>
                    <p className="text-muted-foreground">
                    Manage your account, billing, and security settings.
                    </p>
                </div>
                <Button variant="outline" asChild>
                    <Link href="/dashboard">← Back to Dashboard</Link>
                </Button>
            </div>
          </header>

          <Tabs defaultValue="account" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="billing">Billing</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
            </TabsList>
            
            <TabsContent value="account">
               <form ref={profileFormRef} action={profileFormAction}>
                  <Card>
                    <CardHeader>
                      <CardTitle>Account Information</CardTitle>
                      <CardDescription>
                        Update your personal details. This information is private and not displayed publicly.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" name="name" defaultValue={user.displayName || ''} />
                         {profileState?.errors?.name && <p className="text-sm text-destructive">{profileState.errors.name[0]}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" type="email" value={user.email || ''} disabled />
                      </div>
                    </CardContent>
                    <CardFooter>
                        <ProfileSubmitButton />
                    </CardFooter>
                  </Card>
               </form>
            </TabsContent>

            <TabsContent value="billing">
               <Card>
                <CardHeader>
                  <CardTitle>Billing & Subscription</CardTitle>
                  <CardDescription>
                    View your plan details and payment history.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className='p-4 rounded-lg border bg-background'>
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                            <div>
                                <h3 className="text-lg font-semibold">Your Plan: Core</h3>
                                <p className="text-muted-foreground">Next payment of ₹49,099 is due on October 1, 2024.</p>
                            </div>
                            <Button className="mt-4 sm:mt-0">Make Payment</Button>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-md font-semibold mb-2">Payment History</h3>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                <TableHead>Invoice ID</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead className="text-right">Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {billingHistory.map((invoice) => (
                                <TableRow key={invoice.invoiceId}>
                                    <TableCell className="font-mono text-xs">{invoice.invoiceId}</TableCell>
                                    <TableCell>{invoice.date}</TableCell>
                                    <TableCell>{invoice.amount}</TableCell>
                                    <TableCell className="text-right">
                                        <Badge variant={invoice.status === 'Paid' ? 'secondary' : 'default'}>{invoice.status}</Badge>
                                    </TableCell>
                                </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="security">
               <form ref={passwordFormRef} action={passwordFormAction}>
                  <Card>
                    <CardHeader>
                      <CardTitle>Security</CardTitle>
                      <CardDescription>
                        Change your password to keep your account secure.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="currentPassword">Current Password</Label>
                        <Input id="currentPassword" name="currentPassword" type="password" required />
                        {passwordState?.errors?.currentPassword && <p className="text-sm text-destructive">{passwordState.errors.currentPassword[0]}</p>}
                      </div>
                       <div className="space-y-2">
                        <Label htmlFor="newPassword">New Password</Label>
                        <Input id="newPassword" name="newPassword" type="password" required />
                        {passwordState?.errors?.newPassword && <p className="text-sm text-destructive">{passwordState.errors.newPassword[0]}</p>}
                      </div>
                       <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm New Password</Label>
                        <Input id="confirmPassword" name="confirmPassword" type="password" required />
                        {passwordState?.errors?.confirmPassword && <p className="text-sm text-destructive">{passwordState.errors.confirmPassword[0]}</p>}
                      </div>
                    </CardContent>
                    <CardFooter>
                        <PasswordSubmitButton />
                    </CardFooter>
                  </Card>
               </form>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
}
