
import Link from 'next/link';
import { LogoIcon } from './ui/logo-icon';

export function Footer() {
  return (
    <footer className="border-t border-border/80">
      <div className="container flex flex-col items-center justify-between gap-4 py-8 md:flex-row">
        <div className="flex items-center gap-2">
          <LogoIcon className="w-6 h-6" />
          <p className="text-sm text-foreground/80">
            &copy; {new Date().getFullYear()} Raystrat Systems. All rights reserved.
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
