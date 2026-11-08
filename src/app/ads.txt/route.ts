import { ADSENSE_CLIENT_ID } from "@/lib/site";

export const dynamic = "force-static";

// Serves /ads.txt. Publisher ID comes from NEXT_PUBLIC_ADSENSE_CLIENT_ID (ca-pub-XXXX -> pub-XXXX).
export function GET() {
  const pub = ADSENSE_CLIENT_ID.replace(/^ca-/, "");
  const body = pub
    ? `google.com, ${pub}, DIRECT, f08c47fec0942fa0\n`
    : "# Set NEXT_PUBLIC_ADSENSE_CLIENT_ID to publish your AdSense ads.txt line\n";
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
