'use client';

import Script from 'next/script';

declare global {
  interface Window {
    googlefc?: { callbackQueue?: unknown[]; showRevocationMessage?: () => void };
  }
}

// Consent is handled by Google's certified CMP (Funding Choices, TCF v2.2).
// Consent Mode defaults to "denied" in the EEA, UK and Switzerland until the
// visitor chooses in the CMP message; elsewhere no message is shown and the
// defaults are granted. Google tags read the CMP's choice on their own.
const CONSENT_REGIONS = [
  'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR', 'HU', 'IE', 'IT', 'LV', 'LT', 'LU',
  'MT', 'NL', 'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE', 'IS', 'LI', 'NO', 'GB', 'CH',
];

const DENIED = { ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied', analytics_storage: 'denied' };
const GRANTED = { ad_storage: 'granted', ad_user_data: 'granted', ad_personalization: 'granted', analytics_storage: 'granted' };

export function CookieConsent({ adsensePublisherId }: { adsensePublisherId?: string }) {
  const pub = adsensePublisherId?.replace(/^ca-/, '');

  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('consent','default',${JSON.stringify(GRANTED)});gtag('consent','default',Object.assign(${JSON.stringify(DENIED)},{region:${JSON.stringify(CONSENT_REGIONS)},wait_for_update:500}));`,
        }}
      />

      {pub && (
        <>
          <Script
            id="funding-choices"
            async
            src={`https://fundingchoicesmessages.google.com/i/${pub}?ers=1`}
            strategy="afterInteractive"
          />
          <Script id="funding-choices-present" strategy="afterInteractive">
            {`
              (function(){function s(){if(!window.frames['googlefcPresent']){if(document.body){var i=document.createElement('iframe');i.style.cssText='width:0;height:0;border:none;z-index:-1000;left:-1000px;top:-1000px;display:none';i.name='googlefcPresent';document.body.appendChild(i);}else{setTimeout(s,0);}}}s();})();
            `}
          </Script>
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsensePublisherId}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        </>
      )}

    </>
  );
}

// Reopens the CMP's privacy choices dialog (only does something where the
// message is shown, i.e. EEA/UK/CH visitors).
export function CookiePreferencesButton() {
  return (
    <button
      type="button"
      onClick={() => {
        window.googlefc = window.googlefc || {};
        window.googlefc.callbackQueue = window.googlefc.callbackQueue || [];
        window.googlefc.callbackQueue.push({
          CONSENT_DATA_READY: () => window.googlefc?.showRevocationMessage?.(),
        });
      }}
      className="hover:text-amber-300 transition-colors"
    >
      Cookie Preferences
    </button>
  );
}
