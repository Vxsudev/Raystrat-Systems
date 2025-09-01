
import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';

const fontBody = Inter({
  subsets: ['latin'],
  variable: '--font-body',
});

const fontHeadline = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-headline',
});

export const metadata: Metadata = {
  title: 'Raystrat Systems — AI Automations Wing',
  description: 'Five boring automations that print cashflow while you build.',
  openGraph: {
    title: 'Raystrat Systems — AI Automations Wing',
    description: 'We automate ROI — not noise. Five boring automations that print cashflow while you build.',
    url: 'https://raystrat.com', // Replace with actual domain
    siteName: 'Raystrat Systems',
    images: [
      {
        url: '/og-image.png', // Replace with actual OG image URL
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Raystrat Systems — AI Automations Wing',
    description: 'We automate ROI — not noise. Five boring automations that print cashflow while you build.',
    // creator: '@creator', // Replace with Twitter handle
    images: ['/og-image.png'], // Replace with actual Twitter image URL
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={cn(
          'min-h-screen bg-background font-body antialiased',
          fontBody.variable,
          fontHeadline.variable
        )}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
