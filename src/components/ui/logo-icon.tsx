
import { cn } from "@/lib/utils";

export function LogoIcon({ className }: { className?: string }) {
  return (
    <svg
      className={cn("text-primary", className)}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 12L4 4L12 4V12H4Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M12 20L12 12L20 12V20H12Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M4 20L4 12" stroke="currentColor" strokeWidth="2" />
      <path d="M12 4L20 4" stroke="currentColor" strokeWidth="2" />
      <rect x="8" y="8" width="4" height="4" fill="currentColor" />
    </svg>
  );
}
