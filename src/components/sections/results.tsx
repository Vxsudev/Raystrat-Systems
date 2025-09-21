// src/components/sections/results.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function Results() {
  const agents = [
    {
      name: 'Leads Hunter Agent',
      replaces: 'Replaces: Full-time SDRs, list-building budgets',
      benefit: 'Delivers qualified, intent-driven leads automatically, 24/7.',
    },
    {
      name: 'Follow-Up Agent',
      replaces: 'Replaces: Sales assistants, manual CRM jockeys',
      benefit: 'Executes multi-channel sequences until a meeting is booked.',
    },
    {
      name: 'Support Agent',
      replaces: 'Replaces: L1 support teams, ticket routing staff',
      benefit: 'Resolves common customer queries instantly, escalating only exceptions.',
    },
    {
      name: 'Operations Agent',
      replaces: 'Replaces: Accounts receivable clerks, project coordinators',
      benefit: 'Automates invoicing, notifications, and cross-team workflows.',
    },
    {
      name: 'Data Command Agent',
      replaces: 'Replaces: Data analysts, manual report builders',
      benefit: 'Centralizes KPIs into a single source of truth for decision-making.',
    },
     {
      name: 'Custom AI Agent',
      replaces: 'Replaces: In-house dev teams for internal tools',
      benefit: 'Solves the unique, complex bottlenecks no off-the-shelf tool can.',
    },
  ];

  return (
    <section id="results" className="py-16 md:py-24 bg-card text-card-foreground">
      <div className="container">
        {/* Headline & Subheadline */}
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-4xl font-bold tracking-tighter font-headline sm:text-5xl md:text-6xl">
            Cut the Fat. Keep the Spine.
          </h2>
          <p className="mt-4 text-lg text-foreground/80 md:text-xl">
            Each Raystrat Agent replaces functions that once required full teams. The result: fewer salaries, higher margins, and growth without drag.
          </p>
        </div>

        {/* Agent Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {agents.map((agent) => (
            <Card
              key={agent.name}
              className="flex flex-col bg-background/50 border-border"
            >
              <CardHeader>
                <CardTitle className="text-xl font-bold font-headline text-foreground">
                  {agent.name}
                </CardTitle>
                <CardDescription className="text-sm text-muted-foreground pt-1">
                  {agent.replaces}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-lg font-medium text-primary">{agent.benefit}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom Line Block */}
        <div className="max-w-5xl p-8 mx-auto mt-16 text-center rounded-lg bg-background text-foreground">
          <p className="text-lg">
            Where businesses once needed 10–20 staff to hold these choke points, Raystrat clients operate with core personnel only — founders, closers, and strategic operators. The Agents carry the rest.
          </p>
        </div>
      </div>
    </section>
  );
}
