// src/components/sections/results.tsx

export function Results() {
  const agents = [
    {
      name: 'Lead Signal Agent',
      replaces: 'Replaces: Full-time SDRs, list-buying budgets',
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
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold tracking-tighter font-headline sm:text-5xl md:text-6xl">
            The Six Agents, Stabilized.
          </h2>
          <p className="mt-4 text-lg text-foreground/80 md:text-xl">
            From bloated headcount to lean control.
          </p>
        </div>

        {/* Narrative Intro Block */}
        <div className="max-w-3xl mx-auto mt-8 text-center">
          <p className="text-foreground/80">
            Each Raystrat Agent replaces functions that once required full teams. The result: fewer salaries, higher margins, and growth without drag.
          </p>
        </div>

        {/* Agent Grid Presentation */}
        <div className="max-w-5xl mx-auto mt-16 space-y-6">
          {agents.map((agent) => (
            <div
              key={agent.name}
              className="grid items-start grid-cols-1 p-6 border rounded-2xl md:grid-cols-2 md:gap-8 border-border bg-background/50"
            >
              <div className="md:pr-8">
                <h3 className="text-xl font-bold font-headline text-foreground">
                  {agent.name}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">{agent.replaces}</p>
              </div>
              <div className="pt-4 mt-4 border-t md:pt-0 md:mt-0 md:border-t-0 md:border-l md:pl-8 border-border/80">
                <p className="text-lg font-medium text-primary">{agent.benefit}</p>
              </div>
            </div>
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
