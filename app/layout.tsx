import type { Metadata, Viewport } from "next";
import { Archivo, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "../styles/globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-archivo",
  display: "swap",
});

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-sans",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Raystrat Systems — Forward-Deployed Engineering",
  description:
    "Forward-deployed engineering for difficult business problems. Raystrat enters the operation, establishes what is true, determines what must change, and builds the software required to move the business forward.",
  metadataBase: new URL("https://raystratsystems.com"),
  alternates: {
    canonical: "https://raystratsystems.com",
  },
  openGraph: {
    title: "Raystrat Systems — Forward-Deployed Engineering",
    description:
      "Forward-deployed engineering for difficult business problems. Raystrat enters the operation, establishes what is true, determines what must change, and builds the software required to move the business forward.",
    url: "https://raystratsystems.com",
    siteName: "Raystrat Systems",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Raystrat Systems — Forward-Deployed Engineering",
    description:
      "Forward-deployed engineering for difficult business problems.",
    images: ["/twitter-image"],
  },
};

export const viewport: Viewport = {
  themeColor: "#0b0c0e",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${plexSans.variable} ${plexMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
