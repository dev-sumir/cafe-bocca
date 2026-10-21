import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Phone, Navigation, Car, Calendar, ExternalLink } from 'lucide-react';
import { CAFE_CONFIG } from '../data/cafeConfig';

export default function VisitSection({ onOpenReservation }) {
  const [isOpenNow, setIsOpenNow] = useState(false);
  const [closingInfo, setClosingInfo] = useState('');

  // Calculate live Open/Closed status in real time
  useEffect(() => {
    const checkStatus = () => {
      const now = new Date();
      const day = now.getDay(); // 0 is Sunday, 1 is Monday ...
      const currentMinutes = now.getHours() * 60 + now.getMinutes();

      // Sunday: 8:30 AM (510 min) to 11:30 PM (1410 min)
      // Mon-Sat: 9:00 AM (540 min) to 11:30 PM (1410 min)
      const isSunday = day === 0;
      const openMinutes = isSunday ? 8 * 60 + 30 : 9 * 60;
      const closeMinutes = 23 * 60 + 30;

      const open = currentMinutes >= openMinutes && currentMinutes < closeMinutes;
      setIsOpenNow(open);

      if (open) {
        setClosingInfo('Open Now &middot; Welcoming guests until 11:30 PM');
      } else {
        const nextOpen = isSunday ? '8:30 AM' : '9:00 AM';
        setClosingInfo(`Currently Closed &middot; Welcoming guests at ${nextOpen}`);
      }
    };

    checkStatus();
    const interval = setInterval(checkStatus, 60000); // Re-check every minute
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="visit"
      className="relative bg-cream-100 text-espresso-900 py-28 md:py-36 px-6 lg:px-12 border-t border-espresso-900/10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto space-y-16 md:space-y-24">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-10 border-b border-espresso-900/10">
          <div className="space-y-3 max-w-2xl">
            {/* <span className="text-script-cookie text-bocca-bean text-2xl md:text-3xl">
              Pakhowal Road Sanctuary
            </span> */}
            <h2 className="display-section font-bold tracking-tight text-espresso-950">
              Plan Your Visit & Table Concierge
            </h2>
            {/* <p className="text-taupe-500 text-sm md:text-base font-light leading-relaxed">
              Conveniently nestled in Sargodha Colony on Pakhowal Road, offering effortless valet parking and an unrushed, light-filled environment.
            </p> */}
          </div>

          {/* Live Open / Closed Status Badge */}
          <div className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-cream-50 border border-espresso-900/15 shadow-sm">
            <span
              className={`w-3 h-3 rounded-full ${
                isOpenNow ? 'bg-emerald-500 animate-pulse' : 'bg-taupe-500'
              }`}
            />
            <div className="flex flex-col text-left">
              <span className="text-xs font-bold tracking-wide uppercase text-espresso-950">
                {isOpenNow ? 'Open Now' : 'Closed Now'}
              </span>
              <span
                className="text-[11px] text-taupe-500 font-light"
                dangerouslySetInnerHTML={{ __html: closingInfo }}
              />
            </div>
          </div>
        </div>

        {/* 2-Column Fine-Dining Concierge Grid (No Boxes, Architectural Lines) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Operating Ledger & Contact Details (6 cols) */}
          <div className="lg:col-span-6 space-y-10">
            {/* Hours Ledger */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs uppercase tracking-luxury text-bocca-bean font-semibold">
                <Clock className="w-3.5 h-3.5" strokeWidth={1.25} />
                <span>Operating Hours Ledger</span>
              </div>

              <div className="divide-y divide-espresso-900/10 border-y border-espresso-900/10 text-sm">
                <div className="py-3.5 flex justify-between items-center">
                  <span className="font-display font-medium text-espresso-950">Monday – Saturday</span>
                  <span className="font-mono text-xs text-taupe-500 font-semibold">
                    {CAFE_CONFIG.hours.mondayToSaturday.label}
                  </span>
                </div>
                <div className="py-3.5 flex justify-between items-center">
                  <span className="font-display font-medium text-espresso-950">Sunday</span>
                  <span className="font-mono text-xs text-taupe-500 font-semibold">
                    {CAFE_CONFIG.hours.sunday.label}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-bocca-bean font-light italic">
                <Car className="w-3.5 h-3.5" strokeWidth={1.25} />
                <span>{CAFE_CONFIG.hours.specialNotice}</span>
              </div>
            </div>

            {/* Address & Direct Concierge */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs uppercase tracking-luxury text-bocca-bean font-semibold">
                <MapPin className="w-3.5 h-3.5" strokeWidth={1.25} />
                <span>Location & Contact</span>
              </div>

              <div className="space-y-2 text-sm text-espresso-900">
                <p className="font-display font-bold text-lg text-espresso-950">
                  {CAFE_CONFIG.meta.address.line1}
                </p>
                <p className="text-taupe-500 font-light">
                  {CAFE_CONFIG.meta.address.line2}, {CAFE_CONFIG.meta.address.city}, {CAFE_CONFIG.meta.address.state} {CAFE_CONFIG.meta.address.postalCode}
                </p>
                <p className="text-xs text-taupe-500/80 font-light italic">
                  Landmark: {CAFE_CONFIG.meta.address.landmark}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-wrap items-center gap-3">
                <a
                  href={CAFE_CONFIG.meta.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-espresso-900 text-cream-50 text-xs tracking-editorial uppercase font-medium hover:bg-bocca-green transition-all shadow-md"
                >
                  <Navigation className="w-3.5 h-3.5" strokeWidth={1.25} />
                  <span>Get Directions</span>
                </a>

                <button
                  onClick={onOpenReservation}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-espresso-900/25 text-espresso-900 text-xs tracking-editorial uppercase font-medium hover:bg-espresso-900 hover:text-cream-50 transition-all"
                >
                  <Calendar className="w-3.5 h-3.5" strokeWidth={1.25} />
                  <span>Reserve Table</span>
                </button>

                <a
                  href={`tel:${CAFE_CONFIG.meta.phone.replace(/\s+/g, '')}`}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-espresso-900/15 text-taupe-500 text-xs tracking-editorial uppercase hover:text-espresso-900 hover:border-espresso-900/40 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" strokeWidth={1.25} />
                  <span>{CAFE_CONFIG.meta.phoneDisplay}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Google Maps Interactive Portal (6 cols) */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div className="relative rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(28,21,18,0.12)] border border-espresso-900/10 aspect-[16/10] bg-cream-200">
              {/* Minimalist Map Embed / Direct Interactive Portal */}
              
              <iframe
                title="Café Bocca Location on Pakhowal Road, Ludhiana"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1813.3869760790524!2d75.82894016893617!3d30.895237931289493!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391a8364ac5442a9%3A0x91ae966a21ce2095!2sCafe%20Bocca%20By%20Chef%20Gariman%20Maini!5e1!3m2!1sen!2sin!4v1792591805152!5m2!1sen!2sin"
              className="w-full h-full border-0 "
                loading="lazy"
              ></iframe>

              {/* Overlay Label Card */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-cream-100/95 backdrop-blur-md border border-espresso-900/10 flex items-center justify-between">
                <div>
                  <h4 className="font-display font-bold text-sm text-espresso-950">
                    Café Bocca
                  </h4>
                  <p className="text-[11px] text-taupe-500 font-light">
                    Pakhowal Road &middot; Model Gram, Ludhiana
                  </p>
                </div>
                <a
                  href={CAFE_CONFIG.meta.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full bg-espresso-900 text-cream-50 hover:bg-bocca-green transition-colors"
                  aria-label="Open in Google Maps"
                >
                  <ExternalLink className="w-4 h-4" strokeWidth={1.25} />
                </a>
              </div>
            </div>

            {/* Testimonial Quote */}
            <div className="mt-8 pt-6 border-t border-espresso-900/10 flex items-start gap-4">
              <span className="font-flourish text-4xl text-bocca-bean leading-none">“</span>
              <div className="space-y-1">
                <p className="text-xs md:text-sm text-espresso-800 italic leading-relaxed">
                  {CAFE_CONFIG.testimonials[0].quote}
                </p>
                <p className="text-[11px] text-taupe-500 font-medium tracking-editorial uppercase">
                  &mdash; {CAFE_CONFIG.testimonials[0].author} ({CAFE_CONFIG.testimonials[0].source})
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
