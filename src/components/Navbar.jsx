import React, { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag, Calendar, Compass, Phone } from 'lucide-react';
import { CAFE_CONFIG } from '../data/cafeConfig';

export default function Navbar({ isHeroActive, onOpenReservation, onOpenCart, cartCount = 0 }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hasScrolledPastThreshold, setHasScrolledPastThreshold] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // If hero is active, keep it transparent. Only transition once past the hero.
      setHasScrolledPastThreshold(!isHeroActive);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHeroActive]);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setMobileMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navLinks = [
    { label: 'Craft & Story', href: '#story' },
    { label: 'Menu', href: '#menu' },
    { label: 'Atmosphere', href: '#atmosphere' },
    { label: 'Lookbook', href: '#gallery' },
    { label: 'Visit', href: '#visit' },
  ];

  const isLight = !hasScrolledPastThreshold;

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isLight
          ? 'bg-transparent text-cream-100'
          : 'bg-cream-100/92 backdrop-blur-md text-espresso-900 border-b border-espresso-900/10 shadow-[0_4px_30px_rgba(28,21,18,0.03)]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 h-20 md:h-24 flex items-center justify-between">
        {/* Brand Monogram & Title */}
        <a
          href="#"
          className="group flex items-center gap-3.5 focus:outline-none"
          aria-label="Café Bocca Home"
        >
          <div className="flex flex-col">
            <span className="font-display font-bold text-2xl md:text-3xl tracking-tight leading-none">
              CAFÉ BOCCA
            </span>
            <span
              className={`font-flourish text-lg md:text-xl -mt-1 tracking-wide transition-opacity ${
                isLight ? 'text-cream-200/90' : 'text-bocca-bean'
              }`}
            >
              by Chef Gariman Maini
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8 text-[0.8125rem] tracking-[0.18em] uppercase font-medium">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`relative py-1 transition-colors duration-200 group ${
                isLight
                  ? 'text-cream-100/80 hover:text-cream-100'
                  : 'text-espresso-800/80 hover:text-espresso-950'
              }`}
            >
              {link.label}
              <span
                className={`absolute bottom-0 left-0 w-0 h-[1px] transition-all duration-300 group-hover:w-full ${
                  isLight ? 'bg-cream-100' : 'bg-bocca-green'
                }`}
              />
            </a>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-3 md:gap-5">
          {/* Reservation CTA */}
          <button
            onClick={onOpenReservation}
            id="nav-reserve-btn"
            className={`hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs tracking-editorial uppercase transition-all duration-300 ${
              isLight
                ? 'bg-cream-100 text-espresso-950 hover:bg-cream-200 hover:shadow-lg'
                : 'bg-espresso-900 text-cream-100 hover:bg-bocca-green hover:shadow-md'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" strokeWidth={1.25} />
            <span>Table Booking</span>
          </button>

          {/* Takeaway / Order Tray Toggle */}
          <button
            onClick={onOpenCart}
            id="nav-tray-btn"
            className={`relative p-2.5 rounded-full transition-all duration-300 ${
              isLight
                ? 'hover:bg-cream-100/15 text-cream-100'
                : 'hover:bg-espresso-900/5 text-espresso-900'
            }`}
            aria-label={`Open takeaway tray (${cartCount} items)`}
          >
            <ShoppingBag className="w-5 h-5" strokeWidth={1.25} />
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-bocca-clay text-cream-50 text-[10px] font-semibold flex items-center justify-center animate-pulse">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            id="nav-mobile-toggle"
            className={`lg:hidden p-2 rounded-full transition-colors ${
              isLight ? 'text-cream-100 hover:bg-cream-100/10' : 'text-espresso-900 hover:bg-espresso-900/10'
            }`}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" strokeWidth={1.25} />
            ) : (
              <Menu className="w-6 h-6" strokeWidth={1.25} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-cream-100 text-espresso-900 border-b border-espresso-900/10 px-8 py-8 animate-fadeIn">
          <div className="flex flex-col gap-6 text-sm tracking-luxury uppercase font-medium">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 text-espresso-900/80 hover:text-bocca-green transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-4 border-t border-espresso-900/10 flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenReservation();
                }}
                className="w-full py-3 rounded-full bg-espresso-900 text-cream-100 text-xs tracking-editorial uppercase flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" strokeWidth={1.25} />
                <span>Reserve A Table</span>
              </button>
              <a
                href={CAFE_CONFIG.meta.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-full border border-espresso-900/20 text-espresso-900 text-xs tracking-editorial uppercase flex items-center justify-center gap-2 text-center"
              >
                <Compass className="w-4 h-4" strokeWidth={1.25} />
                <span>Get Directions (Pakhowal Rd)</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
