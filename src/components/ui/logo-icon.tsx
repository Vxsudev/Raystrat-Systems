
import { cn } from "@/lib/utils";

export function LogoIcon({ className }: { className?: string }) {
  return (
    <svg
      className={cn("text-foreground", className)}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        d="M20,66 L20,20.4 L31.2,14 L31.2,54.8 L60,54.8 L60,66 L20,66 Z" 
        fill="currentColor"
      />
      <path 
        d="M36.4,49.6 L60,26 L60,14 L36.4,37.6 L36.4,49.6 Z" 
        className="fill-primary"
      />
    </svg>
  );
}

