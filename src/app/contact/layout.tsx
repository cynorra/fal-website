import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us | Horoscopes and Charts",
  description:
    "Send a question, an editorial correction or a partnership enquiry to the Horoscopes and Charts team. We read every message and reply by email.",
  alternates: { canonical: `${SITE_URL}/contact` },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
