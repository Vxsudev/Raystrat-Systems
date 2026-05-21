// src/components/sections/agent-advantage.tsx
import { ArrowRight } from 'lucide-react';
import React from 'react';

const governanceProperties = [
    {
        title: "Audit Trail Architecture",
        description: "Every action executed by a deployed system is logged with timestamp, context, and outcome. Nothing runs without a record. Accountability is built into the infrastructure."
    },
    {
        title: "SLA Enforcement",
        description: "Performance targets are defined at deployment. The system enforces them automatically — measuring against thresholds, alerting on deviation, and escalating when SLA is at risk."
    },
    {
        title: "Escalation Protocol",
        description: "Exceptions are routed, not dropped. When a case falls outside system parameters, escalation logic activates — with full context passed to the responsible party."
    },
    {
        title: "Failure-Resistant Architecture",
        description: "Systems are designed around failure modes, not ideal scenarios. Retry logic, fallback paths, and degraded-mode operation are specified before deployment."
    },
    {
        title: "Compliance Controls",
        description: "For regulated environments, the governance layer includes data handling rules, access controls, and audit-ready logging that satisfies compliance requirements without manual intervention."
    },
    {
        title: "Operational Continuity",
        description: "Deployed systems operate continuously — not dependent on headcount, shift schedules, or individual attention. The function runs because the system governs it."
    },
]

export function AgentAdvantage() {
    return (
        <section id="governance" className="py-16 md:py-24 bg-secondary">
            <div className="container">
                <div className="max-w-3xl mx-auto mb-12 text-center">
                    <h2 className="text-3xl font-bold tracking-tighter font-headline sm:text-4xl md:text-5xl">
                        Governance by Design
                    </h2>
                    <p className="mt-4 text-lg text-foreground/80 md:text-xl">
                        Every system Raystrat deploys includes an operational governance layer — not as an add-on, but as a structural requirement.
                    </p>
                </div>
                <div className="max-w-5xl mx-auto p-8 border rounded-md bg-background">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
                        {governanceProperties.map((property, index) => (
                            <div key={index} className="flex flex-col">
                                <div className="flex items-center mb-2">
                                    <div className="flex items-center justify-center w-6 h-6 mr-3 rounded-sm bg-primary/10 text-primary">
                                        <ArrowRight className="w-4 h-4" />
                                    </div>
                                    <h3 className="text-lg font-bold font-headline">{property.title}</h3>
                                </div>
                                <p className="text-foreground/80">
                                    {property.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
