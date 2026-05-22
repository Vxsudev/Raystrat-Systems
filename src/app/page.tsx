
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { Header } from '@/components/header';
import { Hero } from '@/components/sections/hero';
import { FailureThesis } from '@/components/sections/failure-thesis';
import { Services } from '@/components/sections/services';
import { Governance } from '@/components/sections/governance';
import { Industries } from '@/components/sections/industries';
import { Results } from '@/components/sections/results';
import { FailureModeRegistry } from '@/components/sections/failure-mode-registry';
import { Faq } from '@/components/sections/faq';
import { Footer } from '@/components/footer';
import { TweaksPanel } from '@/components/ui/tweaks-panel';
import { Contact } from '@/components/sections/contact';
import { getAuthenticatedUser } from '@/lib/auth/getAuthenticatedUser';
import { ByteOfTheWeek } from '@/components/sections/byte-of-the-week';


export default async function Home() {
  const headersList = headers();
  const host = headersList.get('host');
  const pathname = headersList.get('x-next-pathname') || '/';

  const appDomain = 'app.raystratsystems.com';
  
  const user = await getAuthenticatedUser().catch(() => null);

  // --- Domain-based Routing Logic ---
  
  // 1. App Subdomain Logic (app.raystratsystems.com)
  if (host === appDomain) {
    const isAppPage = pathname.startsWith('/dashboard') || pathname === '/login' || pathname === '/signup';

    if (user) {
      // Logged-in users on the app domain should only be on the dashboard.
      if (!pathname.startsWith('/dashboard')) {
        redirect('/dashboard');
      }
    } else {
      // Not-logged-in users on the app domain are restricted to login/signup.
      if (pathname !== '/login' && pathname !== '/signup') {
        redirect('/login');
      }
    }
  } 
  // 2. Marketing Domain Logic (raystratsystems.com)
  else { // Assuming any other host is the marketing domain
    const isAppPage = pathname.startsWith('/dashboard') || pathname.startsWith('/login') || pathname.startsWith('/signup');
    // Marketing site should never show app pages.
    if (isAppPage) {
      redirect('/');
    }
  }

  // If no redirection has occurred, render the marketing homepage.
  // This logic now correctly assumes that if we reach this point,
  // we are on the marketing domain and the page is not an app page.
  return (
    <div>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">
          <Hero />
          <FailureThesis />
          <Services />
          <Governance />
          <Industries />
          <Results />
          <FailureModeRegistry />
          <Contact />
          <ByteOfTheWeek />
          <Faq />
        </main>
        <Footer />
      </div>
      <TweaksPanel />
    </div>
  );
}
