
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { Header } from '@/components/header';
import { Hero } from '@/components/sections/hero';
import { Services } from '@/components/sections/services';
import { Results } from '@/components/sections/results';
import { Pricing } from '@/components/sections/pricing';
import { Faq } from '@/components/sections/faq';
import { Footer } from '@/components/footer';
import { getAuthenticatedUser } from '@/lib/auth/getAuthenticatedUser';
import { ByteOfTheWeek } from '@/components/sections/byte-of-the-week';


export default async function Home() {
  const headersList = headers();
  const host = headersList.get('host');
  const pathname = headersList.get('x-next-pathname') || '/'; // Get the pathname from headers

  const appDomain = 'app.raystratsystems.com';
  const marketingDomain = 'raystratsystems.com';

  const user = await getAuthenticatedUser().catch(() => null);

  // Logic for the 'app' subdomain
  if (host === appDomain) {
    if (user) {
      // If user is logged in and not on dashboard, redirect to dashboard
      if (!pathname.startsWith('/dashboard')) {
        redirect('/dashboard');
      }
    } else {
      // If user is not logged in, they should only be on login/signup pages
      if (pathname !== '/login' && pathname !== '/signup') {
        redirect('/login');
      }
    }
  }

  // Logic for the main marketing domain
  if (host === marketingDomain) {
    // App-specific pages should not be on the marketing site. Redirect to homepage.
    if (pathname.startsWith('/dashboard') || pathname.startsWith('/login') || pathname.startsWith('/signup')) {
        redirect('/');
    }
  }

  // Otherwise, render the main marketing homepage.
  return (
    <div className="flex flex-col min-h-screen">
      <div className="fixed top-0 left-0 w-full h-full bg-dotted-pattern -z-10" />
      <Header />
      <main className="flex-1">
        <Hero />
        <Services />
        <Results />
        <Pricing />
        <ByteOfTheWeek />
        <Faq />
      </main>
      <Footer />
    </div>
  );
}
