
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


export default async function Home() {
  const headersList = headers();
  const host = headersList.get('host');

  // Logic for the 'app' subdomain
  if (host === 'app.raystratsystems.com') {
    const user = await getAuthenticatedUser().catch(() => null);
    if (user) {
      // If user is logged in on the app subdomain, go to their dashboard
      redirect('/dashboard');
    } else {
      // If user is not logged in on the app subdomain, go to login
      redirect('/login');
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
        <Faq />
      </main>
      <Footer />
    </div>
  );
}
