
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-border/80">
      <div className="container flex flex-col items-center justify-between gap-4 py-8 md:flex-row">
        <div className="flex items-center gap-3">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
          <p className="text-lg font-bold font-headline text-foreground/80">
            Raystrat Systems
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Link href="#top" className="text-sm text-foreground/80 hover:text-foreground">
            Back to top
          </Link>
        </div>
      </div>
    </footer>
  );
}
