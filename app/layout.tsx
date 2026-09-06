import type { Metadata } from "next";
import { SITE_URL, IS_PRODUCTION } from "./lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  robots: IS_PRODUCTION
    ? { index: true, follow: true }
    : { index: false, follow: false, nocache: true },
  title: "Raystrat Systems — AI systems built for your business",
  description:
    "Raystrat builds and deploys customer-specific AI systems using your business data, knowledge and workflows. Forward-deployed engineers work directly with your team, from defining the problem to putting the system into use.",
  keywords: [
    "AI systems",
    "forward-deployed engineering",
    "custom AI",
    "AI deployment",
    "enterprise AI",
    "Raystrat Systems",
  ],
  openGraph: {
    title: "Raystrat Systems — AI systems built for your business",
    description:
      "Customer-specific AI systems and forward-deployed engineering. Built around your data, knowledge and workflows, and deployed into real use.",
    type: "website",
    siteName: "Raystrat Systems",
  },
  twitter: {
    card: "summary_large_image",
    title: "Raystrat Systems — AI systems built for your business",
    description:
      "Customer-specific AI systems and forward-deployed engineering, deployed into real workflows.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
