'use client';

type MarqueeProps = {
  items: string[];
};

export function Marquee({ items }: MarqueeProps) {
  const marqueeContent = items.map((item, index) => (
    <span key={index} className="mx-4 text-sm font-semibold text-foreground/60">
      {item.toUpperCase()}
    </span>
  ));

  return (
    <div className="relative flex w-full overflow-x-hidden justify-center">
      <div className="flex flex-row animate-marquee whitespace-nowrap space-x-8">
        {marqueeContent}
      </div>
      <div className="absolute top-0 flex flex-row animate-marquee whitespace-nowrap space-x-8">
        {marqueeContent}
      </div>
    </div>
  );
}
