// src/components/ui/marquee.tsx
'use client';

import React from 'react';

import { marqueeStats } from '@/data/content';
import { cn } from '@/lib/utils';

type MarqueeProps = {
  /**
   * Items to render inside the marquee. Defaults to the predefined marquee stats.
   */
  items?: string[];
  /**
   * Additional class names for the marquee container.
   */
  className?: string;
};

export function Marquee({ items = marqueeStats, className }: MarqueeProps) {
  const track = [...items, ...items];

  return (
    <div
      className={cn('relative w-full overflow-hidden py-2', className)}
      style={{
        backgroundColor: '#0b0b0b',
      }}
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#0b0b0b] to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#0b0b0b] to-transparent z-10" />

      {/* Accessibility Fallback */}
      <div className="sr-only">
        <ul>
          {items.map((text, i) => (
            <li key={`sr-${i}`}>{text}</li>
          ))}
        </ul>
      </div>

      <div className="flex whitespace-nowrap will-change-transform animate-marquee-mobile md:animate-marquee-desktop motion-reduce:animate-none">
        {track.map((text, i) => (
          <div
            key={`item-${i}`}
            className="flex items-center"
            aria-hidden={i >= items.length}
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
          animation: marquee 5s linear infinite;
        }
        @media (min-width: 768px) {
          .animate-marquee-desktop {
            animation: marquee 7.5s linear infinite;
          }
        }
      `}</style>
    </div>
  );
}
