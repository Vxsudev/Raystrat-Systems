// src/components/ui/animated-grid-background.tsx
'use client';
import { cn } from "@/lib/utils";
import React from "react";

export const AnimatedGridBackground = ({
  className,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        "animated-grid-background",
        className
      )}
      {...rest}
    >
      <div className="relative h-full w-full">
        <div className="absolute inset-0 bg-background">
          <div className="absolute inset-0 [mask-image:radial-gradient(transparent,black)]"></div>
        </div>
        <div
          className={cn(
            "absolute inset-0 bg-grid-slate-900/[0.04] bg-[length:32px_32px]",
            "[mask-image:radial-gradient(200px_circle_at_center,white,transparent)]"
          )}
        ></div>
        <div
          className={cn(
            "spotlight-effect absolute left-1/2 top-1/2 h-full w-full overflow-hidden",
            "bg-grid-slate-900/[0.04] bg-[length:32px_32px]",
            "[mask-image:radial-gradient(200px_circle_at_center,white,transparent)]"
          )}
        >
          <div className="animate-pulse-slower absolute -inset-60 bg-gradient-to-t from-primary/30 to-background opacity-20"></div>
          <div className="animate-pulse-slow absolute -inset-40 bg-gradient-to-t from-primary/50 to-background opacity-20"></div>
        </div>
      </div>
    </div>
  );
};
