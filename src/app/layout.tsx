import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { StarsBackground } from "@/components/ui/StarsBackground";
import { SITE_URL, SITE_NAME, ADSENSE_CLIENT_ID } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  alternates: { canonical: "./" },
  title: "AuraPulse | Dream Dictionary, Angel Numbers & Moon Phase Soulmate",
  description:
    "Free esoteric guidance portal: Jungian dream dictionary (snakes, teeth, pregnancy, ex), angel numbers (111, 222, 444, 555, 888), moon phase compatibility, daily tarot, and rising sign calculator.",
  keywords: [
    "dream dictionary",
    "dream about snakes meaning",
    "teeth falling out in dream",
    "pregnancy dream meaning",
    "dreaming about your ex",
    "angel number meanings",
    "444 angel number meaning",
    "111 angel number meaning",
    "222 angel number meaning",
    "555 angel number meaning",
    "888 angel number meaning",
    "1111 angel number meaning",
    "moon phase soulmate test",
    "moon phase compatibility",
    "daily tarot card draw",
    "rising sign calculator",
    "zodiac compatibility matrix",
    "aura color quiz",
    "spiritual omens",
    "itching palms meaning",
  ],
  authors: [{ name: "AuraPulse Spiritual Editorial" }],
  openGraph: {
    title: "AuraPulse | Dream Dictionary, Angel Numbers & Cosmic Synastry",
    description:
      "Decode nocturnal dreams, understand repetitive angel number synchronicities, and test your moon phase soulmate compatibility.",
    url: SITE_URL,
    siteName: SITE_NAME,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "AuraPulse | Dream Dictionary, Angel Numbers & Cosmic Synastry",
    description:
      "Decode dreams, angel numbers and moon phase compatibility with free interactive tools.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        {ADSENSE_CLIENT_ID && (
          <>
            <meta name="google-adsense-account" content={ADSENSE_CLIENT_ID} />
            <script
              async
              src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
              crossOrigin="anonymous"
            />
          </>
        )}
      </head>
      <body className="min-h-screen flex flex-col relative selection:bg-purple-500/30 selection:text-amber-300">
        <StarsBackground />
        <Navbar />
        <main className="flex-1 z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full pt-6">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

