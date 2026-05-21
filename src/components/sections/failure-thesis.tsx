
export function FailureThesis() {
  const chokePoints = [
    {
      name: "Demand Acquisition",
      description:
        "The system that should continuously detect and qualify inbound interest.",
    },
    {
      name: "Pursuit",
      description:
        "The system that should maintain disciplined, persistent follow-through on every live opportunity.",
    },
    {
      name: "Frontline Resolution",
      description:
        "The system that should resolve customer contact consistently, 24/7, without SLA gaps.",
    },
    {
      name: "Operations",
      description:
        "The system that should execute routine processes — invoicing, routing, coordination — with full auditability.",
    },
    {
      name: "Command Intelligence",
      description:
        "The system that should consolidate decision-critical data and surface it without delay.",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-card/50">
      <div className="container">
        <div className="max-w-5xl mx-auto">
          <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-10">
            The Problem
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left column */}
            <div>
              <h2 className="text-2xl font-bold font-headline mb-6">
                The Five Choke Points
              </h2>
              <ol className="space-y-5">
                {chokePoints.map((point, index) => (
                  <li key={index} className="text-foreground/80">
                    <span className="font-semibold text-foreground">
                      {point.name}
                    </span>{" "}
                    — {point.description}
                  </li>
                ))}
              </ol>
            </div>

            {/* Right column */}
            <div>
              <h2 className="text-2xl font-bold font-headline mb-6">
                The Structural Failure
              </h2>
              <div className="text-lg text-foreground/80 leading-relaxed space-y-4">
                <p>
                  Most businesses run these five functions on human discipline.
                  That means they run — until someone is sick, overloaded,
                  distracted, or gone.
                </p>
                <p>
                  The failure is not a performance issue. It is a structural
                  one. Functions that depend on memory, attention, and good
                  intentions will fail systematically as the business grows.
                </p>
                <p>
                  Raystrat installs governed operational systems that remove the
                  dependency. The functions run because the system governs them
                  — not because someone remembered.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
