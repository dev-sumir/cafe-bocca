import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, ShoppingBag, Send, ArrowRight, Coffee } from 'lucide-react';
import { CAFE_CONFIG } from '../data/cafeConfig';

export default function OrderDrawer({
  isOpen,
  onClose,
  cartItems = [],
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) {
  const [orderType, setOrderType] = useState('takeaway'); // 'takeaway' | 'dinein'
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [pickupTime, setPickupTime] = useState('In 20-30 minutes');

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const gst = Math.round(subtotal * 0.05);
  const total = subtotal + gst;

  const handleSendOrder = (e) => {
    e.preventDefault();
    if (cartItems.length === 0) return;

    let itemsText = cartItems
      .map(
        (item) => `• ${item.quantity}x ${item.name} (₹${item.price * item.quantity})`
      )
      .join('\n');

    const message = encodeURIComponent(
      `Hello Café Bocca! ☕\n\n` +
      `I would like to place a *${orderType === 'dinein' ? 'Dine-In Pre-Order' : 'Takeaway Order'}*:\n\n` +
      `${itemsText}\n\n` +
      `────────────────\n` +
      `Subtotal: ₹${subtotal}\n` +
      `GST (5%): ₹${gst}\n` +
      `*Total: ₹${total}*\n` +
      `────────────────\n` +
      `• Guest Name: ${customerName || 'Guest'}\n` +
      `• Contact: ${customerPhone || 'Not specified'}\n` +
      `• Preferred Timing: ${pickupTime}\n\n` +
      `Please confirm order preparation. Thank you!`
    );

    const whatsappUrl = `https://wa.me/${CAFE_CONFIG.meta.whatsappNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-espresso-950/70 backdrop-blur-sm"
        />

        {/* Slide-Out Drawer */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-y-0 right-0 w-full max-w-md bg-cream-100 text-espresso-900 shadow-2xl flex flex-col z-10 border-l border-espresso-900/10"
        >
          {/* Header */}
          <div className="p-6 md:p-8 border-b border-espresso-900/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-full bg-cream-200 text-espresso-950">
                <ShoppingBag className="w-4 h-4" strokeWidth={1.25} />
              </div>
              <div>
                <h3 className="font-display font-bold text-xl text-espresso-950">
                  Pre-Order / Takeaway Tray
                </h3>
                <span className="text-[11px] uppercase tracking-luxury text-taupe-500 font-semibold">
                  {cartItems.reduce((acc, i) => acc + i.quantity, 0)} Items Selected
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              id="close-order-drawer-btn"
              className="p-2 rounded-full hover:bg-espresso-900/10 text-espresso-900 transition-colors"
              aria-label="Close Order Tray"
            >
              <X className="w-5 h-5" strokeWidth={1.25} />
            </button>
          </div>

          {/* Cart Content */}
          <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-16">
                <div className="w-16 h-16 rounded-full bg-cream-200/80 flex items-center justify-center text-taupe-500">
                  <Coffee className="w-8 h-8" strokeWidth={1.25} />
                </div>
                <div className="space-y-1">
                  <h4 className="font-display font-bold text-lg text-espresso-900">
                    Your Tray is Empty
                  </h4>
                  <p className="text-xs text-taupe-500 font-light max-w-xs">
                    Browse Chef Gariman's sourdough toasties, artisan coffees, and stone-baked pizzas to add items.
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-full bg-espresso-900 text-cream-50 text-xs tracking-editorial uppercase hover:bg-bocca-green transition-colors"
                >
                  Explore Menu
                </button>
              </div>
            ) : (
              <>
                {/* Order Type Toggle */}
                <div className="grid grid-cols-2 p-1 rounded-2xl bg-cream-200/80 text-xs font-semibold">
                  <button
                    type="button"
                    onClick={() => setOrderType('takeaway')}
                    className={`py-2 rounded-xl transition-all ${
                      orderType === 'takeaway'
                        ? 'bg-espresso-900 text-cream-50 shadow-sm'
                        : 'text-taupe-500 hover:text-espresso-900'
                    }`}
                  >
                    Takeaway / Pickup
                  </button>
                  <button
                    type="button"
                    onClick={() => setOrderType('dinein')}
                    className={`py-2 rounded-xl transition-all ${
                      orderType === 'dinein'
                        ? 'bg-espresso-900 text-cream-50 shadow-sm'
                        : 'text-taupe-500 hover:text-espresso-900'
                    }`}
                  >
                    Dine-in Pre-Order
                  </button>
                </div>

                {/* Items List */}
                <div className="divide-y divide-espresso-900/10">
                  {cartItems.map((item) => (
                    <div key={item.id} className="py-4 flex items-center justify-between gap-4">
                      <div className="flex-1 space-y-1">
                        <h4 className="font-display font-bold text-sm text-espresso-950">
                          {item.name}
                        </h4>
                        <span className="font-mono text-xs font-semibold text-bocca-bean">
                          ₹{item.price} each
                        </span>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          className="w-7 h-7 rounded-full border border-espresso-900/20 flex items-center justify-center hover:bg-espresso-900/10 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" strokeWidth={1.5} />
                        </button>
                        <span className="font-mono text-xs font-bold w-4 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="w-7 h-7 rounded-full border border-espresso-900/20 flex items-center justify-center hover:bg-espresso-900/10 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" strokeWidth={1.5} />
                        </button>
                      </div>

                      {/* Item Total & Remove */}
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs font-bold text-espresso-950 w-12 text-right">
                          ₹{item.price * item.quantity}
                        </span>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-taupe-500 hover:text-rose-600 transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" strokeWidth={1.25} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Clear Tray Link */}
                <div className="flex justify-end">
                  <button
                    onClick={onClearCart}
                    className="text-[11px] tracking-editorial uppercase text-taupe-500 hover:text-rose-600 transition-colors underline"
                  >
                    Clear All Items
                  </button>
                </div>

                {/* Guest Details Input */}
                <div className="space-y-3 pt-4 border-t border-espresso-900/10">
                  <span className="text-[11px] uppercase tracking-luxury text-taupe-500 font-semibold">
                    Guest Information
                  </span>
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full bg-cream-50 px-4 py-2 rounded-xl border border-espresso-900/15 text-xs text-espresso-900 focus:outline-none focus:border-bocca-green"
                  />
                  <input
                    type="tel"
                    placeholder="Contact Number"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full bg-cream-50 px-4 py-2 rounded-xl border border-espresso-900/15 text-xs text-espresso-900 focus:outline-none focus:border-bocca-green"
                  />
                  <input
                    type="text"
                    placeholder="Preferred Timing (e.g. In 25 mins / 8:00 PM)"
                    value={pickupTime}
                    onChange={(e) => setPickupTime(e.target.value)}
                    className="w-full bg-cream-50 px-4 py-2 rounded-xl border border-espresso-900/15 text-xs text-espresso-900 focus:outline-none focus:border-bocca-green"
                  />
                </div>
              </>
            )}
          </div>

          {/* Footer Ledger & Checkout */}
          {cartItems.length > 0 && (
            <div className="p-6 md:p-8 border-t border-espresso-900/10 bg-cream-50 space-y-4">
              <div className="space-y-1.5 text-xs text-taupe-500">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono text-espresso-900 font-semibold">₹{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>GST (5%)</span>
                  <span className="font-mono text-espresso-900 font-semibold">₹{gst}</span>
                </div>
                <div className="pt-2 border-t border-espresso-900/10 flex justify-between text-sm font-bold text-espresso-950">
                  <span>Estimated Total</span>
                  <span className="font-mono text-base text-bocca-bean">₹{total}</span>
                </div>
              </div>

              <button
                onClick={handleSendOrder}
                id="submit-order-whatsapp-btn"
                className="w-full py-3.5 rounded-full bg-espresso-900 text-cream-50 text-xs tracking-editorial uppercase font-medium hover:bg-bocca-green transition-all shadow-md flex items-center justify-center gap-2"
              >
                <Send className="w-3.5 h-3.5" strokeWidth={1.25} />
                <span>Send Order via WhatsApp</span>
              </button>

              <p className="text-[10px] text-center text-taupe-500 font-light">
                Direct instant order confirmation sent to Café Bocca WhatsApp concierge.
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
