
'use client';

import * as React from 'react';
import Link from 'next/link';
import { Menu, LogIn, UserPlus } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { navigationLinks } from '@/data/content';
import { PlaybookForm } from './ui/playbook-form';
import { CalendlyButton } from './ui/calendly-button';
import { ThemeToggle } from './ui/theme-toggle';
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
  const [scrolled, setScrolled] = React.useState(false);
  const { user } = useAuth();

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = (
    <>
      {navigationLinks.map((link) => (
        <Link
          key={link.name}
          href={link.href}
          className="text-lg font-medium transition-colors text-foreground/80 hover:text-foreground md:text-sm"
        >
          {link.name}
        </Link>
      ))}
    </>
  );

  const authActions = (
    <div className='flex items-center gap-2'>
        <Button asChild variant="ghost" size="sm">
            <Link href="/login"><LogIn className='mr-2' /> Login</Link>
        </Button>
        <Button asChild size="sm">
            <Link href="/signup"><UserPlus className='mr-2'/>Sign Up</Link>
        </Button>
    </div>
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
                <Link href="/account">Account Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => auth.signOut()}>
                Log out
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
) : null;

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        scrolled
          ? 'border-b border-border/80 bg-background/80 backdrop-blur-sm'
          : 'bg-transparent'
      )}
    >
      <div className="container flex items-center justify-between h-16">
        {/* Left side: Logo + Desktop Nav */}
        <div className="items-center hidden gap-8 md:flex">
          <Link href="/" className="flex items-center gap-3">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <span className="text-xl font-bold font-headline">Raystrat Systems</span>
          </Link>
          <nav className="items-center hidden gap-6 md:flex">
            {navLinks}
          </nav>
        </div>

        {/* Mobile: Centered Logo */}
        <div className="flex items-center justify-center grow md:hidden">
             <Link href="/" className="flex items-center gap-3">
               <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              <span className="text-xl font-bold font-headline">Raystrat Systems</span>
            </Link>
        </div>

        {/* Right side: Actions + Mobile Menu */}
        <div className="flex items-center justify-end gap-2">
          <div className="hidden md:flex">
            {user ? userMenu : authActions}
          </div>
          <ThemeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="w-5 h-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetTitle className="sr-only">Mobile Navigation</SheetTitle>
              <div className="flex flex-col gap-8 p-6 pt-12">
                {navLinks}
                 <div className="flex flex-col gap-4 pt-8 border-t border-border">
                  {user ? (
                    <>
                       <Link href="/dashboard" className={cn(buttonVariants({ variant: 'default' }))}>Dashboard</Link>
                       <Button variant="secondary" onClick={() => auth.signOut()}>Log out</Button>
                    </>
                  ) : (
                    <>
                      <Button asChild variant="outline">
                        <Link href="/login">Login</Link>
                      </Button>
                      <Button asChild>
                        <Link href="/signup">Sign Up</Link>
                      </Button>
                    </>
                  )}
                </div>
                <div className="flex flex-col gap-4 pt-8 border-t border-border">
                   <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline">
                        Download Playbook
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Download the Playbook</DialogTitle>
                        <DialogDescription>
                          Enter your details below to get immediate access to the playbook.
                        </DialogDescription>
                      </DialogHeader>
                      <PlaybookForm />
                    </DialogContent>
                  </Dialog>
                  <CalendlyButton />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
