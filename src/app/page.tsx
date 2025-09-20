

import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { Header } from '@/components/header';
import { Hero } from '@/components/sections/hero';
import { Services } from '@/components/sections/services';
import { Results } from '@/components/sections/results';
import { Pricing } from '@/components/sections/pricing';
import { Faq } from '@/components/sections/faq';
import { Footer } from '@/components/footer';
import { AnimatedGridBackground } from '@/components/ui/animated-grid-background';

export default function Home() {
  const headersList = headers();
  const host = headersList.get('host');

  // If the user is on the app subdomain, redirect to the signup page.
  if (host === 'app.raystratsystems.com') {
    redirect('/signup');
  }

  // Otherwise, render the main marketing homepage.
  return (
    <div className="flex flex-col min-h-screen">
      <AnimatedGridBackground className="fixed top-0 left-0 w-full h-full -z-10" />
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
