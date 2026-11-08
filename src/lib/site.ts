// Central site configuration. Override via environment variables (.env.local / hosting dashboard).
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://aurapulse.com").replace(/\/$/, "");
export const SITE_NAME = "AuraPulse";
export const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "contact@aurapulse.com";
export const ADSENSE_CLIENT_ID = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || "";
// Optional: ad unit slot id created in AdSense > Ads > By ad unit > Display ads (responsive)
export const ADSENSE_SLOT_ID = process.env.NEXT_PUBLIC_ADSENSE_SLOT_ID || "";
