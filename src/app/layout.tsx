import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { CookieConsent } from "@/components/ui/CookieConsent";
import { StarsBackground } from "@/components/ui/StarsBackground";
import { SITE_URL, SITE_NAME, ADSENSE_CLIENT_ID } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  alternates: { canonical: "./" },
  title: "Horoscopes and Charts: Zodiac Signs, Birth Chart Calculator & Daily Horoscope",
  description:
    "Free horoscopes and birth chart tools: zodiac signs and dates, daily, weekly and monthly horoscopes, compatibility, Chinese zodiac, life path numbers, plus a dream dictionary and angel number guides.",
  keywords: [
    "horoscope",
    "daily horoscope",
    "birth chart calculator",
    "zodiac signs and dates",
    "astrology chart",
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
  authors: [{ name: "Horoscopes and Charts Spiritual Editorial" }],
  openGraph: {
    title: "Horoscopes and Charts: Zodiac Signs, Birth Chart & Daily Horoscope",
    description:
      "Zodiac signs and dates, free birth chart calculator, daily horoscope, compatibility, Chinese zodiac and more.",
    url: SITE_URL,
    siteName: SITE_NAME,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Horoscopes and Charts: Zodiac Signs, Birth Chart & Daily Horoscope",
    description:
      "Free birth chart calculator, horoscopes, zodiac signs and compatibility.",
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
        {/* Use a ternary: `"" && ...` would render an empty text node inside <head> and break hydration */}
        {ADSENSE_CLIENT_ID ? <meta name="google-adsense-account" content={ADSENSE_CLIENT_ID} /> : null}
      </head>
      <body className="min-h-screen flex flex-col relative selection:bg-purple-500/30 selection:text-amber-300">
        <CookieConsent adsensePublisherId={ADSENSE_CLIENT_ID || undefined} />
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

