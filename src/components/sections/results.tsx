// src/components/sections/results.tsx

export function Results() {
  const items = [
    { title: "Lead Signal Agent",  stat: "+25–60 / wk", label: "Qualified leads delivered" },
    { title: "Follow-Up Agent",    stat: "2–4×",        label: "More meetings booked" },
    { title: "Support Agent",      stat: "< 2 min",     label: "Median first reply" },
    { title: "Operations Agent",   stat: "~56 hrs / mo",label: "Manual work removed" },
    { title: "Data Command Agent", stat: "< 24 h",      label: "Reporting latency" },
  ];

  return (
    <section id="results" className="py-16 md:py-20 bg-card text-foreground">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight font-headline">
          The Five Engines, Stabilized.
        </h2>
        <p className="mt-3 text-muted-foreground">
          Each Raystrat Agent eliminates one failure point.
        </p>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {items.map((m) => (
            <article key={m.title} className="rounded-2xl border border-border bg-background/50 p-6 text-left">
              <h3 className="text-sm text-muted-foreground">{m.title}</h3>
              <div className="mt-1 text-primary text-3xl md:text-4xl font-semibold">{m.stat}</div>
              <div className="mt-1 text-muted-foreground">{m.label}</div>
            </article>
          ))}
        </div>

        <p className="mt-6 text-xs text-foreground/60">
          Ranges are rolling 28-day medians from tenant delivery logs. Full cohort reports available on request.
        </p>
      </div>
    </section>
  );
}
