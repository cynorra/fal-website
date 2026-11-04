import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | AuraPulse",
  description: "AuraPulse Privacy Policy covering cookies, Google AdSense, GDPR, and data protection compliance.",
};

export default function PrivacyPolicyPage() {
  return (
    <article className="max-w-3xl mx-auto py-10 space-y-8 text-white/80 leading-relaxed font-light text-sm">
      <header className="space-y-2">
        <span className="text-xs font-mono uppercase tracking-widest text-purple-300">
          Last Updated: November 2026
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif font-black text-white">
          Privacy Policy
        </h1>
      </header>

      <section className="space-y-3">
        <h2 className="text-xl font-serif font-bold text-white">1. Introduction</h2>
        <p>
          At AuraPulse (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;), your privacy is of paramount importance. This Privacy Policy outlines the types of personal information received and collected by AuraPulse and how it is used and protected in compliance with the General Data Protection Regulation (GDPR) and the California Consumer Privacy Act (CCPA).
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-serif font-bold text-white">2. Cookies and Web Beacons</h2>
        <p>
          AuraPulse uses standard cookies to store information about visitors&apos; preferences, record user-specific information on which pages the user accesses or visits, and personalize web page content based on visitors&apos; browser type or other information that the visitor sends via their browser.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-serif font-bold text-white">
          3. Google AdSense & DoubleClick DART Cookies
        </h2>
        <p>
          Google, as a third-party vendor, uses cookies to serve ads on AuraPulse. Google&apos;s use of the DART cookie enables it to serve ads to users based on their visit to AuraPulse and other sites on the Internet.
        </p>
        <p>
          Users may opt out of the use of the DART cookie by visiting the Google ad and content network privacy policy at the following URL:{" "}
          <a
            href="https://policies.google.com/technologies/ads"
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber-300 underline"
          >
            https://policies.google.com/technologies/ads
          </a>
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-serif font-bold text-white">4. Log Files</h2>
        <p>
          Like many other websites, AuraPulse makes use of log files. The information inside the log files includes internet protocol (IP) addresses, type of browser, Internet Service Provider (ISP), date/time stamp, referring/exit pages, and number of clicks to analyze trends, administer the site, track user&apos;s movement around the site, and gather demographic information. IP addresses and other such information are not linked to any information that is personally identifiable.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-serif font-bold text-white">5. Your Data Protection Rights</h2>
        <p>
          Under GDPR and CCPA, you have the right to request access to your data, request erasure, object to processing, and request portability. If you wish to exercise any of these rights, please contact our data compliance officer at privacy@aurapulse.com.
        </p>
      </section>
    </article>
  );
}

