
import { cn } from "@/lib/utils";

export function LogoIcon({ className }: { className?: string }) {
  return (
    <svg
      className={cn("text-foreground", className)}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
        <path 
            d="M5.33331 20L11.3333 4H15.3333L10.6666 16H16.6666L19.3333 20H5.33331Z" 
            fill="white"
        />
        <path 
            d="M16.6667 16L15.3334 12L19.3334 4H22.6667L16.6667 16Z"
            className="fill-primary"
        />
    </svg>
  );
}
