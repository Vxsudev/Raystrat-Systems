// src/app/dashboard/page.tsx
'use client';

import { useAuth } from '@/contexts/auth-context';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { auth } from '@/lib/firebase/client';
import { LogOut, CalendarCheck, TrendingUp, ShieldCheck, PauseCircle, CheckCircle, Inbox, Users } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import type { LucideIcon } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';


// --- Type Definitions ---

interface Kpi {
    title: string;
    value: string;
    icon: LucideIcon;
}

interface SequenceHealthData {
    name: string;
    S0: number;
    S1: number;
    S2: number;
}

interface DeliverabilityData {
    deliverabilityScore: number;
    bounceRate: number;
    spamRate: number;
}

interface Lead {
    id: string;
    email: string;
    lastStep: string;
    snippet: string;
    received: string;
}

interface LeadsData {
    newReplies: Lead[];
    needsHuman: Lead[];
    bounced: Lead[];
}

interface LeadTableProps {
  leads: Lead[];
  isLoading: boolean;
}

// --- Sub-components ---

function LeadTable({ leads, isLoading }: LeadTableProps) {
    const handlePause = (leadId: string) => {
        console.log(`Action: Pause sequence for lead ${leadId}`);
        // Here you would call the API: POST /followup/sequence/pause
    };

    const handleQualify = (leadId: string) => {
        console.log(`Action: Mark lead ${leadId} as qualified`);
        // Here you would call the API: POST /leads/{id}/qualify
    };

    if (isLoading) {
       return (
         <div className="space-y-4 py-4">
           <Skeleton className="h-12 w-full" />
           <Skeleton className="h-12 w-full" />
           <Skeleton className="h-12 w-full" />
         </div>
       );
    }
    
    if (leads.length === 0) {
        return <div className="text-center text-muted-foreground py-8">No leads in this category.</div>;
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Lead</TableHead>
                    <TableHead className="hidden md:table-cell">Snippet</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {leads.map((lead) => (
                    <TableRow key={lead.id}>
                        <TableCell>
                            <div className="font-medium">{lead.email}</div>
                            <div className="text-xs text-muted-foreground">
                                Last Step: <Badge variant="secondary">{lead.lastStep}</Badge> / {lead.received}
                            </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell max-w-xs truncate">
                            <span className="text-muted-foreground">{lead.snippet}</span>
                        </TableCell>
                        <TableCell className="text-right">
                             <Button variant="ghost" size="sm" className="mr-1" onClick={() => handlePause(lead.id)}>
                                <PauseCircle className="h-4 w-4" />
                                <span className="sr-only">Pause</span>
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => handleQualify(lead.id)}>
                                <CheckCircle className="h-4 w-4" />
                                <span className="sr-only">Mark Qualified</span>
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}

// --- Main Page Component ---

export default function DashboardPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  
  const [kpiData, setKpiData] = useState<Kpi[]>([]);
  const [sequenceHealthData, setSequenceHealthData] = useState<SequenceHealthData[]>([]);
  const [deliverabilityData, setDeliverabilityData] = useState<DeliverabilityData | null>(null);
  const [leadsData, setLeadsData] = useState<LeadsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
      if (user) {
        // Simulate fetching data from backend API
        const fetchData = async () => {
            setIsLoading(true);
            // In a real app, you'd use fetch() to call your backend endpoints
            // e.g., const kpiRes = await fetch('/api/metrics/summary');
            await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay

            // Mocked API responses based on our contract
            setKpiData([
                { title: "Leads Enrolled (30d)", value: "1,204", icon: Users },
                { title: "In Sequence", value: "312", icon: Inbox },
                { title: "Replies (30d)", value: "488", icon: TrendingUp },
                { title: "Meetings Booked (30d)", value: "88", icon: CalendarCheck },
            ]);

            setSequenceHealthData([
                { name: 'Sent', S0: 4000, S1: 3500, S2: 3000 },
                { name: 'Delivered', S0: 3800, S1: 3325, S2: 2850 },
                { name: 'Opened', S0: 2000, S1: 1575, S2: 1200 },
                { name: 'Clicked', S0: 800, S1: 525, S2: 300 },
                { name: 'Replied', S0: 400, S1: 280, S2: 150 },
            ]);
            
            setDeliverabilityData({
                deliverabilityScore: 98.2,
                bounceRate: 1.1,
                spamRate: 0.05,
            });

            setLeadsData({
                newReplies: [
                    { id: 'lead_1', email: 'prospect1@example.com', lastStep: 'S1', snippet: 'Thanks for reaching out, what\'s the pricing?', received: '2h ago' },
                    { id: 'lead_2', email: 'prospect2@domain.com', lastStep: 'S2', snippet: 'Can you send over a case study for a company in...', received: '5h ago' },
                ],
                needsHuman: [
                     { id: 'lead_3', email: 'prospect3@corp.com', lastStep: 'S1', snippet: 'Is this an automated message?', received: '1d ago' },
                ],
                bounced: [
                    { id: 'lead_4', email: 'invalid@baddomain.com', lastStep: 'S0', snippet: 'Error: Address does not exist', received: '3d ago' },
                ]
            });

            setIsLoading(false);
        };

        fetchData();
      }
  }, [user]);


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
        <div className="container">
          {/* Command Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold font-headline">Follow-Up Agent Dashboard</h1>
              <p className="text-muted-foreground">Real-time performance for your automated sequences.</p>
            </div>
             <Button variant="outline" onClick={() => auth.signOut()}>
                <LogOut className="mr-2 h-4 w-4" /> Logout
            </Button>
          </div>
          
          {/* KPI Bar */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
            {isLoading ? (
                Array.from({ length: 4 }).map((_, index) => (
                    <Card key={index}>
                        <CardHeader>
                            <Skeleton className="h-4 w-3/4" />
                        </CardHeader>
                        <CardContent>
                            <Skeleton className="h-8 w-1/2" />
                        </CardContent>
                    </Card>
                ))
            ) : (
                kpiData.map((kpi) => (
                    <Card key={kpi.title}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
                            <kpi.icon className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{kpi.value}</div>
                        </CardContent>
                    </Card>
                ))
            )}
          </div>

          <div className="grid gap-8 lg:grid-cols-5">

            {/* Main Column */}
            <div className="lg:col-span-3 space-y-8">
              {/* Sequence Health */}
              <Card>
                <CardHeader>
                  <CardTitle>Sequence Health</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                    {isLoading ? (
                        <Skeleton className="h-[250px] w-full" />
                    ) : (
                       <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={sequenceHealthData}>
                          <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                          <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
                          <Bar dataKey="S0" fill="hsl(var(--primary) / 0.6)" radius={[4, 4, 0, 0]} />
                          <Bar dataKey="S1" fill="hsl(var(--primary) / 0.4)" radius={[4, 4, 0, 0]} />
                          <Bar dataKey="S2" fill="hsl(var(--primary) / 0.2)" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    )}
                </CardContent>
              </Card>

              {/* Lead Inbox */}
              <Card>
                <CardHeader>
                  <CardTitle>Lead Inbox</CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="new-replies">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="new-replies">New Replies</TabsTrigger>
                      <TabsTrigger value="needs-human">Needs Human</TabsTrigger>
                      <TabsTrigger value="bounced">Bounced</TabsTrigger>
                    </TabsList>
                    <TabsContent value="new-replies">
                        <LeadTable leads={leadsData?.newReplies || []} isLoading={isLoading} />
                    </TabsContent>
                     <TabsContent value="needs-human">
                        <LeadTable leads={leadsData?.needsHuman || []} isLoading={isLoading} />
                    </TabsContent>
                    <TabsContent value="bounced">
                        <LeadTable leads={leadsData?.bounced || []} isLoading={isLoading} />
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
            
            {/* Side Column */}
            <div className="lg:col-span-2 space-y-8">
                {/* Deliverability Watch */}
                <Card>
                    <CardHeader>
                        <CardTitle>Deliverability Watch</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                       {isLoading ? (
                           <>
                             <Skeleton className="h-20 w-full" />
                             <div className="grid grid-cols-2 gap-4">
                                <Skeleton className="h-12 w-full" />
                                <Skeleton className="h-12 w-full" />
                             </div>
                           </>
                       ) : deliverabilityData ? (
                        <>
                            <div className="flex items-center justify-between p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                                <div>
                                    <p className="text-sm text-green-400">Deliverability Score</p>
                                    <p className="text-3xl font-bold text-green-300">{deliverabilityData.deliverabilityScore}%</p>
                                </div>
                                <ShieldCheck className="w-10 h-10 text-green-400" />
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-center">
                                <div>
                                    <p className="text-xs text-muted-foreground">Bounce Rate</p>
                                    <p className="text-lg font-semibold">{deliverabilityData.bounceRate}%</p>
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground">Spam Rate</p>
                                    <p className="text-lg font-semibold">{deliverabilityData.spamRate}%</p>
                                </div>
                            </div>
                        </>
                       ) : null}
                    </CardContent>
                </Card>

                 <Card>
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                       {isLoading ? (
                           <div className="space-y-2">
                               <Skeleton className="h-4 w-full" />
                               <Skeleton className="h-4 w-5/6" />
                               <Skeleton className="h-4 w-full" />
                           </div>
                       ) : (
                        <p className='text-muted-foreground'>Agent activity will appear here...</p>
                       )}
                    </CardContent>
                </Card>
            </div>

          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
