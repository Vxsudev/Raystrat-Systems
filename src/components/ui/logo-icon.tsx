
import { cn } from "@/lib/utils";

export function LogoIcon({ className }: { className?: string }) {
  return (
    <svg
      className={cn("text-foreground", className)}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20 78L20 22.4L31.2 16L31.2 66.8L72 66.8L72 78H20Z"
        fill="currentColor"
      />
      <path
        d="M36.4 61.6L72 38L72 26L36.4 49.6V61.6Z"
        className="fill-primary"
      />
    </svg>
  );
}
