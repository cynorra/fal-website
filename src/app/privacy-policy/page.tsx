import React from "react";
import { Metadata } from "next";
import { CONTACT_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy | Horoscopes and Charts",
  description:
    "Horoscopes and Charts Privacy Policy: cookies, Google AdSense advertising, local-only calculators, GDPR/CCPA rights and how to contact us.",
};

const ext = "text-amber-300 underline";

export default function PrivacyPolicyPage() {
  return (
    <article className="max-w-3xl mx-auto py-10 space-y-8 text-white/80 leading-relaxed font-light text-sm">
      <header className="space-y-2">
        <span className="text-xs font-mono uppercase tracking-widest text-purple-300">
          Last Updated: November 2026
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif font-black text-white">Privacy Policy</h1>
      </header>

      <section className="space-y-3">
        <h2 className="text-xl font-serif font-bold text-white">1. Introduction</h2>
        <p>
          Horoscopes and Charts (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) respects your privacy. This policy explains what
          information is collected when you visit this website, how it is used, and the choices you have. By using the site you
          agree to this policy.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-serif font-bold text-white">2. Information We Do Not Collect</h2>
        <p>
          Our interactive tools (moon phase matcher, rising sign calculator, tarot draw, aura quiz, mood hub) run entirely in
          your browser. Birth dates, times, places and quiz answers you enter are not sent to our servers and are not stored by us.
          We do not require accounts and do not knowingly collect names or contact details, except what you choose to include
          when you email us.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-serif font-bold text-white">3. Log Files</h2>
        <p>
          Like most websites, our hosting provider records standard server logs such as IP address, browser type, referring page
          and timestamps. These are used for security, troubleshooting and aggregate traffic analysis.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-serif font-bold text-white">4. Cookies</h2>
        <p>
          Cookies and similar technologies are small files stored on your device. We and our advertising partners use them to
          keep the site working, measure usage and show advertising. You can block or delete cookies in your browser settings;
          some features may then work less smoothly.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-serif font-bold text-white">5. Advertising: Google AdSense</h2>
        <p>
          We use Google AdSense to display ads. Google and its partners, as third-party vendors, use cookies (including the
          DoubleClick cookie) and may use device identifiers to serve ads based on your visits to this and other websites.
          Google&apos;s use of advertising cookies enables it and its partners to serve ads to you based on your visit to our site
          and/or other sites on the Internet.
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            You can opt out of personalized advertising at{" "}
            <a className={ext} href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">
              Google Ads Settings
            </a>
            .
          </li>
          <li>
            You can also opt out of some third-party vendors&apos; use of cookies at{" "}
            <a className={ext} href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer">
              aboutads.info
            </a>
            .
          </li>
          <li>
            How Google uses data from sites that use its services:{" "}
            <a className={ext} href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer">
              policies.google.com/technologies/partner-sites
            </a>
            .
          </li>
          <li>
            Google ad technologies:{" "}
            <a className={ext} href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer">
              policies.google.com/technologies/ads
            </a>
            .
          </li>
        </ul>
        <p>
          Visitors in the European Economic Area, the United Kingdom and Switzerland are asked for consent before personalized
          advertising cookies are used, through a Google-certified consent message. You can change your choice at any time using
          the privacy options shown by that message or by clearing your browser data.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-serif font-bold text-white">6. Third-Party Links</h2>
        <p>
          Our pages may link to third-party websites. We are not responsible for their content or privacy practices and encourage
          you to read their policies.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-serif font-bold text-white">7. Your Rights (GDPR, UK GDPR, CCPA/CPRA)</h2>
        <p>
          Depending on where you live, you may have the right to access, correct or delete personal data, to object to or restrict
          processing, to data portability, and to opt out of the &ldquo;sale&rdquo; or &ldquo;sharing&rdquo; of personal information
          for advertising. Because we hold almost no personal data, most requests can be answered quickly. Contact us at{" "}
          <a className={ext} href={`mailto:${CONTACT_EMAIL}`}>
            {CONTACT_EMAIL}
          </a>
          . You may also lodge a complaint with your local data protection authority.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-serif font-bold text-white">8. Children&apos;s Privacy</h2>
        <p>
          Horoscopes and Charts is not directed to children under 13 (or under 16 where local law requires), and we do not knowingly collect
          personal information from children. If you believe a child has provided us data, contact us and we will delete it.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-serif font-bold text-white">9. Changes to This Policy</h2>
        <p>
          We may update this policy from time to time. The &ldquo;Last Updated&rdquo; date above shows when it last changed.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-serif font-bold text-white">10. Contact</h2>
        <p>
          Questions about this policy:{" "}
          <a className={ext} href={`mailto:${CONTACT_EMAIL}`}>
            {CONTACT_EMAIL}
          </a>
          .
        </p>
      </section>
    </article>
  );
}
