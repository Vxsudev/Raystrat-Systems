
import Image from 'next/image';
import Link from 'next/link';
import { services } from '@/data/content';
import { ThemeToggle } from '@/components/ui/theme-toggle';

const institutionalLinks = [
  { name: 'Operational Audit', href: '/audit' },
  { name: 'Principal', href: '/principal' },
  { name: 'Documentation', href: '/documentation' },
  { name: 'Continuity', href: '/continuity' },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="bg-[hsl(var(--structure))] text-[hsl(var(--structure-foreground))]"
      aria-label="Site footer"
    >
      <div className="container py-12 md:py-16">
        {/* Top zone — logo + operational doctrine sentence */}
        <div className="flex flex-col gap-6 pb-10 border-b border-white/10 md:flex-row md:items-start md:justify-between md:gap-12">
          <div className="flex items-start gap-4 max-w-md">
            <Image
              src="/raystrat-logo.png"
              alt=""
              width={40}
              height={40}
              className="h-10 w-10 shrink-0"
            />
            <div>
              <p className="text-lg font-semibold font-headline">Raystrat Systems</p>
              <p className="mt-2 text-sm leading-relaxed text-[hsl(var(--structure-foreground))]/70">
                Operational Systems Engineering for businesses that depend on governed execution.
              </p>
            </div>
          </div>
        </div>

        {/* Middle zone — site index columns */}
        <div className="grid grid-cols-1 gap-10 py-10 sm:grid-cols-2 md:grid-cols-3 md:gap-12">
          {/* Systems column */}
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-[hsl(var(--structure-foreground))]/60 mb-4">
              Systems
            </p>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/systems/${service.slug}`}
                    className="text-sm text-[hsl(var(--structure-foreground))]/80 transition-colors hover:text-[hsl(var(--structure-foreground))]"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Bytes column */}
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-[hsl(var(--structure-foreground))]/60 mb-4">
              Bytes
            </p>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/bytes"
                  className="text-sm text-[hsl(var(--structure-foreground))]/80 transition-colors hover:text-[hsl(var(--structure-foreground))]"
                >
                  All Bytes
                </Link>
              </li>
            </ul>
          </div>

          {/* Institutional column */}
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-[hsl(var(--structure-foreground))]/60 mb-4">
              Institutional
            </p>
            <ul className="space-y-3">
              {institutionalLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-[hsl(var(--structure-foreground))]/80 transition-colors hover:text-[hsl(var(--structure-foreground))]"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom zone — copyright + utility row */}
        <div className="flex flex-col gap-4 pt-8 border-t border-white/10 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-[hsl(var(--structure-foreground))]/60">
            © {year} Raystrat Systems
          </p>
          <div className="flex items-center gap-4">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </footer>
  );
}
