
import Image from 'next/image';
import Link from 'next/link';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { services } from '@/data/content';

const engageLinks = [
  { name: 'Operational Audit', href: '/audit' },
  { name: 'Bytes', href: '/bytes' },
  { name: 'Governance', href: '/#governance' },
  { name: 'Industries', href: '/#industries' },
];

// Minimal legal navigation — Privacy + Terms only. Rendered as low-noise inline
// links in the utility bar near the brand/copyright, not as a standalone legal
// column. Documentation, Trust, Principal, and Continuity remain intentionally
// deferred; see ai/deferred/deferred-public-trust-surfaces.md for the resurfacing
// conditions. Deliberate scope, not dead code.
const legalNav = [
  { name: 'Privacy', href: '/privacy' },
  { name: 'Terms', href: '/terms' },
];

export function Footer() {
  return (
    <footer
      className="bg-[hsl(var(--structure))] text-[hsl(var(--structure-foreground))]"
      aria-label="Site footer"
    >
      <div className="container py-12 md:py-16">
        <div className="flex flex-col gap-6 pb-10 border-b border-white/10 md:flex-row md:items-start md:justify-between md:gap-12">
          <div className="flex items-start gap-5 max-w-xl">
            <Image
              src="/raystrat-mark-light.png"
              alt=""
              width={56}
              height={56}
              unoptimized
              className="h-14 w-14 shrink-0"
            />
            <div>
              <p className="text-xl font-semibold tracking-tight font-headline">Raystrat Systems</p>
              <p className="mt-2 text-sm leading-relaxed text-[hsl(var(--structure-foreground))]/70">
                Governed operational infrastructure for businesses where audit
                accountability, SLA compliance, and continuity are not optional.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-10 py-10 sm:grid-cols-2 md:gap-12">
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

          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-[hsl(var(--structure-foreground))]/60 mb-4">
              Engage
            </p>
            <ul className="space-y-3">
              {engageLinks.map((link) => (
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
      </div>

      <div className="bg-[hsl(var(--structure))] text-[hsl(var(--structure-foreground))]/60 border-t border-white/10">
        <div className="container py-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between font-mono text-xs">
          <p>
            © {new Date().getFullYear()} Raystrat Systems · Operational Systems Engineering
          </p>
          <div className="flex items-center gap-5">
            <nav aria-label="Legal" className="flex items-center gap-5">
              {legalNav.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-[hsl(var(--structure-foreground))]/60 transition-colors hover:text-[hsl(var(--structure-foreground))]"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </footer>
  );
}
