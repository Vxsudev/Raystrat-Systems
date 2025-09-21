// src/components/sections/agent-advantage.tsx
import { ArrowRight, Bot, Scale, ShieldCheck, Zap } from 'lucide-react';
import React from 'react';

const advantages = [
    {
        title: "Total Discipline",
        description: "Agents execute with 100% consistency. No sick days, no shortcuts, no errors. Just the process, run perfectly, every time."
    },
    {
        title: "Asymmetric Leverage",
        description: "One agent does the work of five people, freeing up your best talent for high-level strategy and client-facing roles."
    },
    {
        title: "Immediate Scalability",
        description: "Agents scale on demand. Go from 100 to 100,000 tasks without hiring, training, or adding management overhead."
    },
    {
        title: "24/7/365 Operation",
        description: "Your business never sleeps. Agents run workflows, chase leads, and resolve issues around the clock, across all time zones."
    },
    {
        title: "Hardened Security",
        description: "By systemizing processes, agents reduce the risk of human error, enforce compliance, and create auditable logs for every action."
    },
    {
        title: "Unfair Competitive Edge",
        description: "While your competitors are hiring, training, and managing, your agents are executing, scaling, and winning market share."
    },
]

export function AgentAdvantage() {
    return (
        <section id="agent-advantage" className="py-16 md:py-24 bg-card/50">
            <div className="container">
                <div className="max-w-3xl mx-auto mb-12 text-center">
                     <h2 className="text-3xl font-bold tracking-tighter font-headline sm:text-4xl md:text-5xl">
                        The Agent Advantage
                    </h2>
                    <p className="mt-4 text-lg text-foreground/80 md:text-xl">
                        This isn't about adding another tool. This is about installing a new operational layer in your business.
                    </p>
                </div>
                <div className="max-w-5xl mx-auto p-8 border rounded-2xl bg-background/50">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
                        {advantages.map((advantage, index) => (
                            <div key={index} className="flex flex-col">
                                <div className="flex items-center mb-2">
                                    <div className="flex items-center justify-center w-6 h-6 mr-3 rounded-full bg-primary/10 text-primary">
                                        <ArrowRight className="w-4 h-4" />
                                    </div>
                                    <h3 className="text-lg font-bold font-headline">{advantage.title}</h3>
                                </div>
                                <p className="text-foreground/80">
                                    {advantage.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
