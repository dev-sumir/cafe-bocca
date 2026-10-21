import React from 'react';
import { ArrowUp, Instagram, MapPin, Phone, Heart } from 'lucide-react';
import { CAFE_CONFIG } from '../data/cafeConfig';

export default function Footer({ onOpenReservation }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-espresso-950 text-cream-100 pt-24 pb-14 px-6 lg:px-12 border-t border-cream-100/10 overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-20">
        {/* Main Footer Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Brand & Slogan (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex flex-col">
              <span className="font-display font-bold text-3xl tracking-tight leading-none text-cream-50">
                CAFÉ BOCCA
              </span>
              <span className="font-flourish text-2xl text-bocca-gold -mt-1">
                by Chef Gariman Maini
              </span>
            </div>

            <p className="text-cream-300 text-sm font-light leading-relaxed max-w-sm">
              Artisanal specialty coffee roasts, hand-laminated Viennoiserie, and European comfort dining in Pakhowal Road, Ludhiana.
            </p>

            <div className="pt-2 flex items-center gap-4">
              <a
                href={CAFE_CONFIG.meta.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cream-100/20 text-cream-200 text-xs tracking-editorial uppercase hover:bg-cream-100/10 hover:border-cream-100 transition-colors"
              >
                <Instagram className="w-3.5 h-3.5" strokeWidth={1.25} />
                <span>{CAFE_CONFIG.meta.instagramHandle}</span>
              </a>
              <button
                onClick={onOpenReservation}
                className="px-4 py-2 rounded-full bg-cream-100 text-espresso-950 text-xs tracking-editorial uppercase font-medium hover:bg-cream-200 transition-colors"
              >
                Book Table
              </button>
            </div>
          </div>

          {/* Quick Nav Links (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <span className="text-[10px] uppercase tracking-luxury text-bocca-gold font-semibold">
              Navigation
            </span>
            <ul className="space-y-3 text-xs tracking-editorial uppercase text-cream-300">
              <li>
                <a href="#hero-scrubber" className="hover:text-cream-50 transition-colors">
                  The Coffee Ritual
                </a>
              </li>
              <li>
                <a href="#story" className="hover:text-cream-50 transition-colors">
                  Chef & Vision
                </a>
              </li>
              <li>
                <a href="#menu" className="hover:text-cream-50 transition-colors">
                  Soft-Launch Menu
                </a>
              </li>
              <li>
                <a href="#atmosphere" className="hover:text-cream-50 transition-colors">
                  Atmosphere
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-cream-50 transition-colors">
                  Editorial Lookbook
                </a>
              </li>
              <li>
                <a href="#visit" className="hover:text-cream-50 transition-colors">
                  Location & Hours
                </a>
              </li>
            </ul>
          </div>

          {/* Concierge & Address (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <span className="text-[10px] uppercase tracking-luxury text-bocca-gold font-semibold">
              Sanctuary Details
            </span>
            <div className="space-y-3 text-xs text-cream-300 font-light leading-relaxed">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-bocca-gold shrink-0 mt-0.5" strokeWidth={1.25} />
                <span>
                  {CAFE_CONFIG.meta.address.full}
                </span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-bocca-gold shrink-0" strokeWidth={1.25} />
                <span>{CAFE_CONFIG.meta.phoneDisplay}</span>
              </p>
              <p className="text-[11px] text-cream-400/80 italic pt-1">
                Mon–Sat: 9:00 AM – 11:30 PM &middot; Sun: 8:30 AM – 11:30 PM
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Ledger & Back to Top */}
        <div className="pt-8 border-t border-cream-100/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-cream-400 font-light">
          <p>
            &copy; {new Date().getFullYear()} {CAFE_CONFIG.meta.fullName}. All rights reserved.
          </p>

          <span className="font-flourish text-xl text-bocca-gold">
            "Sip Slow. Live Well."
          </span>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-[11px] tracking-luxury uppercase text-cream-200 hover:text-cream-50 transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" strokeWidth={1.25} />
          </button>
        </div>
      </div>
    </footer>
  );
}
