import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import Navbar from './components/Navbar';
import HeroCanvasScrubber from './components/HeroCanvasScrubber';
import AtmosphereSection from './components/AtmosphereSection';
import MenuSection from './components/MenuSection';
import GallerySection from './components/GallerySection';
import VisitSection from './components/VisitSection';
import Footer from './components/Footer';
import ReservationModal from './components/ReservationModal';
import OrderDrawer from './components/OrderDrawer';

export default function App() {
  const [isHeroActive, setIsHeroActive] = useState(true);
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [isOrderDrawerOpen, setIsOrderDrawerOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  // Initialize Lenis Luxury Inertia Smooth Scrolling
  useEffect(() => {
    // Respect reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    let animationFrameId;
    function raf(time) {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }
    animationFrameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationFrameId);
      lenis.destroy();
    };
  }, []);

  // Cart Handlers
  const handleAddToCart = (item) => {
    setCartItems((prevItems) => {
      const existing = prevItems.find((i) => i.id === item.id);
      if (existing) {
        return prevItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prevItems, { ...item, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveItem(id);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const totalCartCount = cartItems.reduce((acc, i) => acc + i.quantity, 0);

  return (
    <div className="relative min-h-screen bg-cream-100 text-espresso-900 selection:bg-bocca-green selection:text-cream-50 overflow-x-clip">
      {/* Tactile Film Grain Overlay */}
      <div className="film-grain" />

      {/* Adaptive Transparent-to-Cream Sticky Navbar */}
      <Navbar
        isHeroActive={isHeroActive}
        onOpenReservation={() => setIsReservationOpen(true)}
        onOpenCart={() => setIsOrderDrawerOpen(true)}
        cartCount={totalCartCount}
      />

      {/* 240-Frame Scroll-Controlled Canvas Hero (450vh) */}
      <HeroCanvasScrubber
        onOpenReservation={() => setIsReservationOpen(true)}
        onHeroActiveChange={setIsHeroActive}
      />

      {/* Story & Founders ("Inside the Cafe", 12-col Asymmetrical Kinfolk Grid) */}
      <AtmosphereSection />

      {/* Soft-Launch Interactive Fine-Dining Menu (Box-free with floating hover preview) */}
      <MenuSection onAddToCart={handleAddToCart} />

      {/* Lookbook Gallery & Lightbox */}
      <GallerySection />

      {/* Live Open/Closed Status, Operating Ledger & Pakhowal Road Concierge */}
      <VisitSection onOpenReservation={() => setIsReservationOpen(true)} />

      {/* Understated Editorial Footer */}
      <Footer onOpenReservation={() => setIsReservationOpen(true)} />

      {/* Interactive Modals & Drawers */}
      <ReservationModal
        isOpen={isReservationOpen}
        onClose={() => setIsReservationOpen(false)}
      />

      <OrderDrawer
        isOpen={isOrderDrawerOpen}
        onClose={() => setIsOrderDrawerOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />
    </div>
  );
}
