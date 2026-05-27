
'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu } from 'lucide-react';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';
import { Button, buttonVariants } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { navigationLinks } from '@/data/content';
import { CalendlyButton } from './ui/calendly-button';
import { useAuth } from '@/contexts/auth-context';
import { auth } from '@/lib/firebase/client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';


export function Header() {
  const { user } = useAuth();
  const pathname = usePathname();
  const isDashboard = pathname.startsWith('/dashboard');

  const isActive = (href: string) => {
    if (href === '/#systems') {
      return pathname.startsWith('/systems');
    }
    if (href.startsWith('/#')) {
      return false;
    }
    return pathname === href || pathname.startsWith(href + '/');
  };

  const navLinks = (
    <>
      {navigationLinks.map((link) => {
        const active = isActive(link.href);
        return (
          <Link
            key={link.name}
            href={link.href}
            aria-current={active ? 'page' : undefined}
            className={cn(
              'transition-colors md:text-sm text-lg',
              active
                ? 'font-semibold text-foreground underline underline-offset-4 decoration-primary decoration-2'
                : 'font-medium text-foreground/80 hover:text-foreground'
            )}
          >
            {link.name}
          </Link>
        );
      })}
    </>
  );

  const userMenu = user ? (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                    <AvatarImage src={user.photoURL ?? undefined} alt={user.displayName ?? "User"} />
                    <AvatarFallback>{user.email?.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.displayName}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                    </p>
                </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
                <Link href="/dashboard">Dashboard</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
                <Link href="/dashboard/settings">Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => auth.signOut()}>
                Log out
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
) : null;

  const logoHref = isDashboard ? '/dashboard' : '/';

  return (
    <header className="sticky top-0 z-50 w-full bg-background border-b border-border">
      <div className="container flex items-center justify-between h-16">
        {/* Left side: Logo + Desktop Nav */}
        <div className="flex items-center flex-1 gap-8 md:flex-none">
          <Link href={logoHref} className="hidden md:flex items-center gap-3.5" aria-label="Raystrat Systems home">
            <Image
              src="/raystrat-logo.png"
              alt=""
              width={40}
              height={40}
              priority
              className="h-10 w-10"
            />
            <span className="hidden text-lg font-semibold tracking-tight md:inline font-headline">Raystrat Systems</span>
          </Link>
          {!isDashboard && (
            <nav className="items-center hidden gap-6 md:flex" aria-label="Primary">
              {navLinks}
            </nav>
          )}
        </div>

        {/* Centered logo for mobile */}
        <div className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 md:hidden">
            <Link href={logoHref} className="flex items-center gap-2.5" aria-label="Raystrat Systems home">
                <Image
                  src="/raystrat-logo.png"
                  alt=""
                  width={32}
                  height={32}
                  priority
                  className="h-8 w-8"
                />
                <span className="text-base font-semibold tracking-tight font-headline">Raystrat Systems</span>
            </Link>
        </div>


        {/* Right side: CTA + (auth state if applicable) + Mobile Menu */}
        <div className="flex items-center justify-end gap-3">
          {!isDashboard && (
            <div className="hidden md:block">
              <CalendlyButton size="sm">Book Operational Audit</CalendlyButton>
            </div>
          )}
          {user && (
            <div className="hidden md:flex">
              {userMenu}
            </div>
          )}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="w-5 h-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetTitle className="sr-only">Primary Navigation</SheetTitle>
              <div className="flex flex-col gap-8 p-6 pt-12">
                {!isDashboard && (
                  <nav className="flex flex-col gap-6" aria-label="Primary">
                    {navLinks}
                  </nav>
                )}
                {!isDashboard && (
                  <div className="flex flex-col gap-4 pt-6 border-t border-border">
                    <CalendlyButton size="lg">Book Audit</CalendlyButton>
                  </div>
                )}
                {user && (
                  <div className="flex flex-col gap-3 pt-6 border-t border-border">
                    <Link href="/dashboard" className={cn(buttonVariants({ variant: 'outline' }))}>Dashboard</Link>
                    <Button variant="ghost" onClick={() => auth.signOut()}>Log out</Button>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
