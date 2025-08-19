// src/components/ui/marquee.tsx
'use client';

type MarqueeProps = {
  items: string[];
};

export function Marquee({ items }: MarqueeProps) {
  const trackItems = [...items, ...items]; // Duplicate for seamless loop

  return (
    <div className="relative w-full overflow-hidden py-4">
      {/* Edge fade masks */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-background to-transparent z-10" />

      <div className="flex whitespace-nowrap will-change-transform animate-marquee motion-reduce:animate-none">
        {trackItems.map((text, i) => (
          <div
            key={`item-${i}`}
            className="flex items-center"
            aria-hidden={i >= items.length} // Hide the duplicated items from screen readers
          >
            <span className="mx-6 text-sm font-semibold tracking-wide text-foreground/80 md:text-base">
              {text}
            </span>
            <span className="mx-4 text-primary/50 text-xl">•</span>
          </div>
        ))}
      </div>
    </div>
  );
}
