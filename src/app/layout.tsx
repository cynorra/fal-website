import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { StarsBackground } from "@/components/ui/StarsBackground";

export const metadata: Metadata = {
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
    url: "https://aurapulse.com",
    siteName: "AuraPulse",
    type: "website",
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
        <link rel="icon" href="/favicon.ico" sizes="any" />
        {/* Google AdSense Head Tag (Placeholder for publisher verification) */}
        {process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID && (
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}`}
            crossOrigin="anonymous"
          />
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

