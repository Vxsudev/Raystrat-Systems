// src/components/ui/marquee.tsx
'use client';

import { marqueeStats } from '@/data/content';
import React from 'react';

export function Marquee() {
  const track = [...marqueeStats, ...marqueeStats];

  return (
    <div className="relative w-full overflow-hidden py-2 bg-[#0b0b0b]">
      {/* Edge fade mask */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#0b0b0b] to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#0b0b0b] to-transparent z-10" />

      <div className="flex whitespace-nowrap will-change-transform animate-marquee motion-reduce:animate-none">
        {track.map((text, i) => (
          <div
            key={`item-${i}`}
            className="flex items-center"
            aria-hidden={i >= marqueeStats.length}
          >
            <span className="mx-6 text-sm font-semibold tracking-wide text-foreground/80 md:text-base">
              {text}
            </span>
            <span className="mx-4 text-primary/50 text-xl">•</span>
          </div>
        ))}
      </div>
      <style jsx global>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 8s linear infinite;
        }
      `}</style>
    </div>
  );
}
