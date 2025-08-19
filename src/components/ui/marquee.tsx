// src/components/ui/marquee.tsx
'use client';

import { marqueeStats } from '@/data/content';
import React from 'react';
import { cn } from '@/lib/utils';

export function Marquee() {
  const track = [...marqueeStats, ...marqueeStats];

  return (
    <div
      className="relative w-full overflow-hidden py-2"
      style={{
        backgroundColor: '#0b0b0b',
        backgroundImage:
          'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'4\' height=\'4\' viewBox=\'0 0 4 4\'%3E%3Cpath fill=\'%23d4af37\' fill-opacity=\'0.05\' d=\'M1 3h1v1H1V3zm2-2h1v1H3V1z\'%3E%3C/path%3E%3C/svg%3E")',
      }}
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#0b0b0b] to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#0b0b0b] to-transparent z-10" />

      {/* Accessibility Fallback */}
      <div className="sr-only">
        <ul>
          {marqueeStats.map((text, i) => (
            <li key={`sr-${i}`}>{text}</li>
          ))}
        </ul>
      </div>

      <div className="flex whitespace-nowrap will-change-transform animate-marquee-mobile md:animate-marquee-desktop motion-reduce:animate-none">
        {track.map((text, i) => (
          <div
            key={`item-${i}`}
            className="flex items-center"
            aria-hidden={i >= marqueeStats.length}
          >
            <span
              className={cn(
                'mx-6 text-sm font-semibold tracking-wide text-foreground/80 md:text-base',
                'transition-all duration-300 ease-in-out',
                'hover:scale-105 hover:text-primary focus-visible:scale-105 focus-visible:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded-sm',
                'motion-reduce:transition-none'
              )}
            >
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
        .animate-marquee-mobile {
          animation: marquee 25s linear infinite;
        }
        @media (min-width: 768px) {
          .animate-marquee-desktop {
            animation: marquee 25s linear infinite;
          }
        }
      `}</style>
    </div>
  );
}
