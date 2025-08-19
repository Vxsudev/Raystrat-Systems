'use client';

type MarqueeProps = {
  items: string[];
};

export function Marquee({ items }: MarqueeProps) {
  const marqueeContent = items.map((item, index) => (
    <span key={`itemA-${index}`} className="whitespace-nowrap px-8 text-sm font-semibold tracking-wide text-foreground/60">
      {item.toUpperCase()}
    </span>
  ));

  const marqueeContentDuplicate = items.map((item, index) => (
    <span key={`itemB-${index}`} aria-hidden="true" className="whitespace-nowrap px-8 text-sm font-semibold tracking-wide text-foreground/60">
      {item.toUpperCase()}
    </span>
  ));

  return (
    <div className="flex w-full justify-center overflow-x-hidden">
      <div className="relative overflow-hidden">
        <div className="flex animate-marquee will-change-transform">
          <div className="flex flex-row items-center">{marqueeContent}</div>
          <div className="flex flex-row items-center" aria-hidden="true">{marqueeContentDuplicate}</div>
        </div>
      </div>
    </div>
  );
}
