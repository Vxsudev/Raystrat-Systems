
import type { Metadata } from 'next';
import { Space_Grotesk, Inter } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/theme-provider';
import { FloatingAiSuggestor } from '@/components/ui/floating-ai-suggestor';

const fontSpaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-headline',
});

const fontInter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://raystrat.com'), // Added metadataBase
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
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1
    }
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-body antialiased',
          fontSpaceGrotesk.variable,
          fontInter.variable
        )}
      >
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
        >
          {children}
          <Toaster />
          <FloatingAiSuggestor />
        </ThemeProvider>
      </body>
    </html>
  );
}
