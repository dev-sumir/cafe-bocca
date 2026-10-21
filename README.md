# Café Bocca by Chef Gariman Maini

> Bespoke, commercial-grade cinematic React WebApp for **Café Bocca** on Pakhowal Road, Ludhiana.

![Café Bocca](/public/assets/poster.webp)

## Features

- **240-Frame Canvas Hero Scrubber:** Hardware-accelerated 2D canvas interpolation tied to a 450vh scroll container with smooth lerp damping (`requestAnimationFrame`).
- **Synchronized 4-Scene Editorial Overlays:** Narrative unfolding as the coffee extraction and craft progress.
- **Lenis Inertia Smooth Scroll:** Luxurious, frictionless scrolling experience throughout the site.
- **Kinfolk / Cereal Editorial Aesthetic:** Box-free layout, generous warm whitespace, floating typography, and ultra-thin 1px architectural hairlines.
- **Interactive Fine-Dining Menu:** Whisper-thin rows with real-time floating image preview on hover (desktop), category filtering with animated sliding indicator, dietary badges, and live search.
- **Slide-Out Takeaway / Pre-Order Tray:** Live quantity management, subtotal, 5% GST computation, and formatted WhatsApp order generation.
- **Interactive Table Reservation Drawer:** Guest party size (`1–8+`), date picker, time slot selection, seating ambience choice, and instant pre-filled WhatsApp booking request.
- **Live Open/Closed Status Badge:** Computed automatically in real-time from the cafe's authentic opening hours.
- **Pakhowal Road Concierge:** Integrated full-color Google Maps location, direct navigation, and telephone concierge.
- **Centralized Client Config:** Every price, quote, operating hour, and social link is customizable in `src/data/cafeConfig.js`.

## Tech Stack

- **Framework:** React 19 + Vite 6
- **Animation:** Framer Motion 12
- **Smooth Scroll:** Lenis 1.1
- **Icons:** Lucide React (minimal 1.25px stroke)
- **Styling:** Tailwind CSS + Vanilla CSS Tokens
- **Typography:** Philosopher, Sacramento, Cookie, Plus Jakarta Sans

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Local Development Server
```bash
npm run dev
```

### 3. Build for Production
```bash
npm run build
```

---
&copy; Café Bocca by Chef Gariman Maini. All rights reserved.
