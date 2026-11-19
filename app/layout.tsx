import type { Metadata } from "next";
import { SITE_URL, IS_PRODUCTION } from "./lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  robots: IS_PRODUCTION
    ? { index: true, follow: true }
    : { index: false, follow: false, nocache: true },
  title: "Raystrat Systems — Software systems businesses run on",
  description:
    "Raystrat designs, builds, connects and operates the software systems businesses run on, from the first requirements through to day-to-day operation.",
  keywords: [
    "software systems",
    "custom software development",
    "system integration",
    "software operations",
    "Raystrat Systems",
  ],
  openGraph: {
    title: "Raystrat Systems — Software systems businesses run on",
    description:
      "Raystrat designs, builds, connects and operates the software systems businesses run on.",
    type: "website",
    siteName: "Raystrat Systems",
  },
  twitter: {
    card: "summary_large_image",
    title: "Raystrat Systems — Software systems businesses run on",
    description:
      "Raystrat designs, builds, connects and operates the software systems businesses run on.",
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
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
