// src/components/ui/wavy-background.tsx
import { cn } from "@/lib/utils";

interface WavyBackgroundProps {
    className?: string;
}

export function WavyBackground({ className }: WavyBackgroundProps) {
  return (
    <div className={cn("wave", className)}>
        <span />
        <span />
        <span />
    </div>
  );
}
