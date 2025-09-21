
// src/app/dashboard/page.tsx
'use client';

import { useAuth } from '@/contexts/auth-context';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState, useActionState } from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { auth } from '@/lib/firebase/client';
import { LogOut, CalendarCheck, TrendingUp, ShieldCheck, PauseCircle, CheckCircle, Inbox, Users, PlusCircle, Mail, Play } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import type { LucideIcon } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SequenceForm } from '@/components/ui/sequence-form';
import { saveSequenceTemplate, SaveSequenceState, getSequenceTemplates } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';


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

export interface SequenceStep {
  stepIndex: number;
  delayMinutes: number;
  templateSubject: string;
  templateHtml: string;
  templateText?: string;
  suppressIfRepliedMinutes?: number;
  maxRetries?: number;
  backoffSeconds?: number;
}

export interface SequenceTemplate {
    id?: string;
    name: string;
    status: 'active' | 'paused' | 'done' | 'draft';
    steps: SequenceStep[];
    tenantId?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface Sequence extends SequenceTemplate {
    id: string;
    leads: number;
    sent: number;
    replied: number;
    booked: number;
}



// --- Sub-components ---

function LeadTable({ leads, isLoading }: LeadTableProps) {
    const handlePause = (leadId: string) => {
        console.log(`Action: Pause sequence for lead ${leadId}`);
        // Here you would call the API: POST /api/leads/{id}/pause
    };

    const handleQualify = (leadId: string) => {
        console.log(`Action: Mark lead ${leadId} as qualified`);
         // Here you would call the API: POST /api/leads/{id}/qualify
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

function SequenceTable({ sequences, isLoading }: { sequences: Sequence[], isLoading: boolean }) {
    
    if (isLoading) {
       return (
         <div className="space-y-4 py-4">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
         </div>
       );
    }
    
    if (sequences.length === 0) {
        return <div className="text-center text-muted-foreground py-8">No sequences found. Create your first sequence to get started.</div>;
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Sequence</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Leads</TableHead>
                    <TableHead>% Replied</TableHead>
                    <TableHead>% Booked</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {sequences.map((seq) => (
                    <TableRow key={seq.id}>
                        <TableCell className="font-medium">{seq.name}</TableCell>
                        <TableCell>
                            <Badge variant={
                                seq.status === 'active' ? 'default' : 
                                seq.status === 'draft' ? 'outline' : 
                                'secondary'
                            }>
                                {seq.status.charAt(0).toUpperCase() + seq.status.slice(1)}
                            </Badge>
                        </TableCell>
                        <TableCell>{seq.leads}</TableCell>
                        <TableCell>{seq.sent > 0 ? ((seq.replied / seq.sent) * 100).toFixed(1) : '0.0'}%</TableCell>
                        <TableCell>{seq.replied > 0 ? ((seq.booked / seq.replied) * 100).toFixed(1) : '0.0'}%</TableCell>
                        <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
                                <Play className="h-4 w-4" />
                                <span className="sr-only">Manage</span>
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
  const { toast } = useToast();
  
  const [kpiData, setKpiData] = useState<Kpi[]>([]);
  const [sequenceHealthData, setSequenceHealthData] = useState<SequenceHealthData[]>([]);
  const [deliverabilityData, setDeliverabilityData] = useState<DeliverabilityData | null>(null);
  const [leadsData, setLeadsData] = useState<LeadsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingSequences, setIsLoadingSequences] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const [sequences, setSequences] = useState<Sequence[]>([]);

  const [state, formAction] = useActionState<SaveSequenceState, SequenceTemplate>(saveSequenceTemplate, { message: null });
  
  useEffect(() => {
    if (state.message === 'Success' && state.data) {
        toast({ title: 'Success!', description: 'Your sequence template has been saved.' });
        
        const newSequence: Sequence = {
            ...state.data,
            id: state.data.id!,
            leads: 0,
            sent: 0,
            replied: 0,
            booked: 0,
        };
        setSequences(prev => [newSequence, ...prev]);
        setIsFormOpen(false);
    } else if (state.message === 'Error') {
        const errorMessage = state.errors?.general?.[0] || 'An unknown error occurred.';
        toast({ title: 'Error Saving Sequence', description: errorMessage, variant: 'destructive' });
    }
  }, [state, toast]);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
      if (user) {
        const fetchDashboardData = async () => {
            setIsLoading(true);
            
            try {
                const [summaryRes, sequenceHealthRes, leadsRes] = await Promise.all([
                    fetch('/api/metrics/summary'),
                    fetch('/api/metrics/sequence-health'),
                    fetch('/api/leads/inbox')
                ]);

                if (!summaryRes.ok || !sequenceHealthRes.ok || !leadsRes.ok) {
                    throw new Error('Failed to fetch dashboard data');
                }

                const summaryData = await summaryRes.json();
                const sequenceHealthData = await sequenceHealthRes.json();
                const leadsData = await leadsRes.json();
                
                const kpiIcons: { [key: string]: LucideIcon } = {
                    "Leads Enrolled (30d)": Users,
                    "In Sequence": Inbox,
                    "Replies (30d)": TrendingUp,
                    "Meetings Booked (30d)": CalendarCheck
                };
                
                const mappedKpiData = summaryData.kpis.map((kpi: { title: string; value: string; }) => ({
                    ...kpi,
                    icon: kpiIcons[kpi.title] || Users
                }));

                setKpiData(mappedKpiData);
                setDeliverabilityData(summaryData.deliverability);
                setSequenceHealthData(sequenceHealthData);
                setLeadsData(leadsData);

            } catch (error) {
                console.error("Error fetching dashboard data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        const fetchSequences = async () => {
            setIsLoadingSequences(true);
            try {
                const fetchedSequences = await getSequenceTemplates();
                setSequences(fetchedSequences);
            } catch (error) {
                 console.error("Error fetching sequences:", error);
                 toast({ title: 'Error', description: 'Could not load your sequences.', variant: 'destructive' });
            } finally {
                setIsLoadingSequences(false);
            }
        }

        fetchDashboardData();
        fetchSequences();
      }
  }, [user, toast]);


  if (authLoading || !user) {
    return (
        <div className="flex items-center justify-center h-screen">
            <p>Authenticating...</p>
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
          
          <Tabs defaultValue="overview">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="sequences">Sequences</TabsTrigger>
                  <TabsTrigger value="inbox">Lead Inbox</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview">
                {/* KPI Bar */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
                    {isLoading ? (
                        Array.from({ length: 4 }).map((_, index) => (
                            <Card key={index}>
                                <CardHeader className='pb-2'>
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
                    </div>
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
                        {/* Recent Activity */}
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
              </TabsContent>

              <TabsContent value="sequences">
                <Card>
                    <CardHeader>
                        <div className="flex justify-between items-center">
                            <CardTitle>Follow-Up Sequences</CardTitle>
                             <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
                                <DialogTrigger asChild>
                                    <Button>
                                        <PlusCircle className="mr-2 h-4 w-4" />
                                        Create New Sequence
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-3xl">
                                    <DialogHeader>
                                        <DialogTitle>Create New Sequence</DialogTitle>
                                        <DialogDescription>
                                            Define the steps and content for your automated email sequence.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <SequenceForm action={formAction} />
                                </DialogContent>
                            </Dialog>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <SequenceTable sequences={sequences} isLoading={isLoadingSequences} />
                    </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="inbox">
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
              </TabsContent>

          </Tabs>

        </div>
      </main>
      <Footer />
    </div>
  );
}
