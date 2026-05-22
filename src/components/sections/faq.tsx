'use client';

import { useState } from 'react';
import { faq } from '@/data/content';

export function Faq() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section id="faq" className="py-16 md:py-24">
      <div className="container max-w-3xl mx-auto">
        <p className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-4">
          FAQ
        </p>
        <h2 className="text-3xl font-bold tracking-tighter font-headline sm:text-4xl mb-4">
          Operational questions, answered.
        </h2>
        <p className="text-foreground/70 mb-12">
          For questions specific to your operational profile, the audit is the
          right path.
        </p>

        <div className="divide-y divide-border border-t border-b border-border">
          {faq.items.map((item, i) => {
            const open = openIdx === i;
            const label = `Q.${String(i + 1).padStart(2, '0')}`;
            return (
              <div key={i}>
                <button
                  className="w-full text-left py-5 flex items-start gap-4 text-foreground font-medium transition-colors duration-150"
                  onClick={() => setOpenIdx(open ? null : i)}
                  aria-expanded={open}
                >
                  <span className="font-mono text-xs text-muted-foreground mr-4 shrink-0 mt-1">
                    {label}
                  </span>
                  <span className="text-base flex-1">{item.question}</span>
                  <span className="shrink-0 mt-0.5 text-muted-foreground text-lg leading-none">
                    {open ? '−' : '+'}
                  </span>
                </button>
                <div
                  className="grid transition-[grid-template-rows] duration-150 ease-out"
                  style={{ gridTemplateRows: open ? '1fr' : '0fr' }}
                >
                  <div className="overflow-hidden min-h-0">
                    <p className="pb-5 pl-[64px] text-foreground/70 text-base leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
