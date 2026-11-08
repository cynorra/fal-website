# 🌌 AuraPulse — Esoteric Wisdom, Dream Dictionary & Celestial Guidance Portal

A high-performance modern web application bridging Carl Jung's analytical shadow psychology with classical astrology, angel numerology, and interactive viral synastry tools. Built with Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion, and Lucide Icons. Designed following Watermelon UI, Magic UI, and Aceternity UI design systems.

---

## ✨ Features & Architecture

### 🔮 Interactive Tools
* **Moon Phase Soulmate Matcher (`/tools/moon-phase`):** Real-time astronomical synodic calculations aligning birth moon phases side by side with soulmate synastry scoring and confetti celebration.
* **Daily Tarot Card Draw (`/tools/tarot`):** 3D interactive flip card spread from the Major Arcana with upright guidance and actionable advice.
* **7-Step Aura Color Quiz (`/tools/aura-quiz`):** Dynamic personality test revealing dominant biofield frequency (Royal Indigo, Mystic Violet, Radiant Gold, Emerald Green, Rose Quartz, Crystal White).
* **Rising & Moon Sign Calculator (`/tools/rising-moon`):** Instant natal chart "Big Three" calculator based on birth date, time, and location.
* **Daily Mood & Affirmation Hub (`/daily`):** Somatic breathwork pacing circle (Box breathing) coupled with custom grounding mantras and rituals.
* **Zodiac Compatibility Matrix (`/compatibility`):** 12x12 (144 pairings) astrological synastry engine analyzing Love, Chemistry, and Communication metrics.

### 🔭 Astrology & Numerology Tools (keyword-driven)
* **Birth Chart Calculator (`/tools/birth-chart`) & Rising Sign Calculator (`/tools/rising-moon`):** real low-precision planetary positions, Ascendant, whole-sign houses, chart wheel (client-side).
* **Chinese Zodiac (`/chinese-zodiac`):** calculator with astronomically computed Chinese New Year, 12 animal guides, year pages 1948-2031.
* **Zodiac Signs & Dates (`/zodiac-signs`), 12 sign hubs (`/horoscopes/[sign]`)** with today's Moon transit computed from real astronomy.
* **Life Path Number Calculator (`/tools/life-path-number`)** and 12 life path guides.

### 📚 SEO & Encyclopedic Library (AdSense Optimized)
* **Jungian Dream Dictionary (`/dreams` & `/dreams/[slug]`):** 20 in-depth guides (Snakes, Teeth Falling Out, Pregnancy, Ex-Lovers, Death, Drowning, Water & Floods, Weddings, Bears, Fish, Earthquakes, Dead Mother, etc.) with neurobiology of REM sleep, mythology, variations, and FAQs.
* **Angel Numbers & Omens (`/symbols` & `/symbols/[slug]`):** 20 comprehensive guides (000, 111, 222, 333, 444, 555, 777, 888, 911, 999, 1010, 1111, 1212, 1234, 3333, 4444, Itching Palms, Ear Ringing, White Butterfly, Owl) with Pythagorean numerology and synchronicity principles.
* **Daily Zodiac Horoscopes (`/horoscopes` & `/horoscopes/[sign]`):** Comprehensive forecasts for all 12 signs covering planetary rulers, modalities, romantic transits, career strategies, and power crystals.
* **Trust & Compliance (`/about`, `/contact`, `/privacy-policy`, `/terms`, `/editorial-standards`):** 100% GDPR, CCPA, and Google AdSense compliance.

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Build production bundle
npm run build

# Start production server
npm run start
```

Open [http://localhost:3000](http://localhost:3000) to view the portal.

---

## 💰 Google AdSense Configuration
Set your client ID in `.env.local`:
```env
NEXT_PUBLIC_ADSENSE_CLIENT_ID="ca-pub-XXXXXXXXXXXXXXXX"
```
All responsive `AdBanner` placements (`in-article`, `horizontal`, `square`, `sticky-footer`) will automatically link with zero layout shift.

