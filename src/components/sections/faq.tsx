'use client';

import { useState } from 'react';
import { faq } from '@/data/content';

export function Faq() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section id="faq" className="py-16 md:py-24">
      <div className="container max-w-3xl mx-auto">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tighter font-headline sm:text-4xl">
            Frequently Asked Questions
            <span className="text-primary">.</span>
          </h2>
        </div>
        <div className="divide-y divide-border border-t border-b border-border">
          {faq.items.map((item, i) => {
            const open = openIdx === i;
            return (
              <div key={i}>
                <button
                  className="w-full text-left py-5 flex items-start justify-between gap-4 text-foreground font-medium hover:text-foreground transition-colors duration-150"
                  onClick={() => setOpenIdx(open ? null : i)}
                  aria-expanded={open}
                >
                  <span className="text-base">{item.question}</span>
                  <span className="shrink-0 mt-0.5 text-muted-foreground text-lg leading-none">
                    {open ? '−' : '+'}
                  </span>
                </button>
                <div
                  className="grid transition-[grid-template-rows] duration-150 ease-out"
                  style={{ gridTemplateRows: open ? '1fr' : '0fr' }}
                >
                  <div className="overflow-hidden min-h-0">
                    <p className="pb-5 text-foreground/70 text-base leading-relaxed">
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
