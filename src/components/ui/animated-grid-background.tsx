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
        "pointer-events-none absolute inset-0 flex items-center justify-center bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]",
        className
      )}
      {...rest}
    >
      <div className="absolute inset-0 h-full w-full bg-gradient-to-t from-background to-primary/30 opacity-20 animate-pulse-slower" />
      <div
        style={
          {
            "--bg-size": "32px",
            "--bg-color": "hsl(var(--primary) / 0.15)",
            "--bg-color-2": "hsl(var(--primary) / 0.25)",
            animation: "move-background 150s linear infinite",
            background:
              "linear-gradient(to right, var(--bg-color-2) 1px, transparent 1px), linear-gradient(to bottom, var(--bg-color-2) 1px, transparent 1px), linear-gradient(to right, var(--bg-color) 1px, transparent 1px), linear-gradient(to bottom, var(--bg-color) 1px, transparent 1px)",
            backgroundSize:
              "calc(var(--bg-size) * 4) calc(var(--bg-size) * 4), calc(var(--bg-size) * 4) calc(var(--bg-size) * 4), var(--bg-size) var(--bg-size), var(--bg-size) var(--bg-size)",
            backgroundPosition: "2px 2px, -2px -2px, 1px 1px, -1px -1px",
          } as React.CSSProperties
        }
      ></div>
    </div>
  );
};