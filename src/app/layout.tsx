
// src/app/layout.tsx
import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/contexts/auth-context';
import { FloatingAiSuggestor } from '@/components/ui/floating-ai-suggestor';
import { ThemeProvider } from '@/components/theme-provider';
import { FloatingNoteTaker } from '@/components/ui/floating-note-taker';

const fontBody = Inter({
  subsets: ['latin'],
  variable: '--font-body',
});

const fontHeadline = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-headline',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.raystratsystems.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Raystrat Systems — AI Automations Wing',
  description: 'Five boring automations that print cashflow while you build.',
  openGraph: {
    title: 'Raystrat Systems — AI Automations Wing',
    description: 'We automate ROI — not noise. Five boring automations that print cashflow while you build.',
    url: siteUrl,
    siteName: 'Raystrat Systems',
    images: [
      { url: '/og-image.png', width: 1200, height: 630 },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Raystrat Systems — AI Automations Wing',
    description: 'We automate ROI — not noise. Five boring automations that print cashflow while you build.',
    images: [`${siteUrl}/og-image.png`],
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

const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Raystrat Systems',
    url: siteUrl,
    logo: `${siteUrl}/icon.svg`,
    sameAs: [
        // Add social media profile URLs here when available
        // e.g., "https://twitter.com/YourProfile"
    ],
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className='dark' suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body
        className={cn(
          'min-h-screen bg-background font-body antialiased',
          fontBody.variable,
          fontHeadline.variable
        )}
      >
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
        >
          <AuthProvider>
            {children}
            <Toaster />
            <FloatingAiSuggestor />
            <FloatingNoteTaker />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
