import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, Users, MapPin, Send, CheckCircle2, Phone } from 'lucide-react';
import { CAFE_CONFIG } from '../data/cafeConfig';

export default function ReservationModal({ isOpen, onClose }) {
  const [guests, setGuests] = useState('2');
  const [date, setDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [timeSlot, setTimeSlot] = useState('19:30');
  const [seating, setSeating] = useState('Window View');
  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const timeSlots = [
    '11:00 AM', '12:30 PM', '02:00 PM', '04:00 PM',
    '05:30 PM', '07:00 PM', '07:30 PM', '08:30 PM', '09:30 PM', '10:15 PM'
  ];

  const seatingOptions = [
    'Indoor Main Lounge',
    'Window View',
    'Espresso Bar Counter',
    'Private Alcove',
  ];

  const handleConfirmReservation = (e) => {
    e.preventDefault();

    // Construct WhatsApp message URL
    const message = encodeURIComponent(
      `Hello Café Bocca! ☕\n\n` +
      `I would like to request a table reservation:\n` +
      `• Name: ${guestName || 'Guest'}\n` +
      `• Phone: ${guestPhone || 'Not provided'}\n` +
      `• Party Size: ${guests} Guests\n` +
      `• Date: ${date}\n` +
      `• Time: ${timeSlot}\n` +
      `• Seating Preference: ${seating}\n` +
      (notes ? `• Special Requests: ${notes}\n` : '') +
      `\nPlease confirm table availability. Thank you!`
    );

    const whatsappUrl = `https://wa.me/919876658741?text=${message}`;
    // const whatsappUrl = `https://wa.me/${CAFE_CONFIG.meta.whatsappNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 2800);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-espresso-950/80 backdrop-blur-md">
        {/* Backdrop click to close */}
        <div className="absolute inset-0" onClick={onClose} />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 w-full max-w-xl bg-cream-100 text-espresso-900 rounded-3xl overflow-hidden shadow-2xl border border-espresso-900/10 max-h-[92vh] flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="px-8 pt-8 pb-6 border-b border-espresso-900/10 flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase tracking-luxury text-bocca-bean font-semibold">
                Table Concierge
              </span>
              <h3 className="font-display font-bold text-2xl text-espresso-950">
                Reserve Your Table
              </h3>
              <p className="text-xs text-taupe-500 font-light mt-0.5">
                Pakhowal Road, Ludhiana &middot; Valet Parking Available
              </p>
            </div>
            <button
              onClick={onClose}
              id="close-reservation-btn"
              className="p-2.5 rounded-full hover:bg-espresso-900/10 text-espresso-900 transition-colors"
              aria-label="Close Reservation Drawer"
            >
              <X className="w-5 h-5" strokeWidth={1.25} />
            </button>
          </div>

          {/* Form Body */}
          {isSubmitted ? (
            <div className="p-12 text-center space-y-4 my-auto">
              <CheckCircle2 className="w-12 h-12 text-bocca-green mx-auto animate-bounce" strokeWidth={1.25} />
              <h4 className="font-display font-bold text-2xl text-espresso-950">
                Reservation Request Generated
              </h4>
              <p className="text-sm text-taupe-500 font-light max-w-sm mx-auto">
                Your pre-filled booking request has been opened in WhatsApp for instant direct confirmation with the Café Bocca team.
              </p>
            </div>
          ) : (
            <form onSubmit={handleConfirmReservation} className="p-8 overflow-y-auto space-y-6">
              {/* Party Size Selector */}
              <div className="space-y-2">
                <label className="text-[11px] uppercase tracking-luxury text-taupe-500 font-semibold flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-bocca-bean" strokeWidth={1.25} />
                  Party Size
                </label>
                <div className="grid grid-cols-5 sm:grid-cols-8 gap-2">
                  {['1', '2', '3', '4', '5', '6', '7', '8+'].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setGuests(num)}
                      className={`py-2 rounded-xl text-xs font-semibold tracking-wider transition-all border ${
                        guests === num
                          ? 'bg-espresso-900 text-cream-50 border-espresso-900 shadow-sm'
                          : 'bg-cream-50 text-espresso-800 border-espresso-900/15 hover:border-espresso-900/40'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>

              {/* Date & Time Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[11px] uppercase tracking-luxury text-taupe-500 font-semibold flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-bocca-bean" strokeWidth={1.25} />
                    Date
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                    className="w-full bg-cream-50 px-4 py-2.5 rounded-xl border border-espresso-900/15 text-xs text-espresso-900 focus:outline-none focus:border-bocca-green"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] uppercase tracking-luxury text-taupe-500 font-semibold flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-bocca-bean" strokeWidth={1.25} />
                    Preferred Slot
                  </label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full bg-cream-50 px-4 py-2.5 rounded-xl border border-espresso-900/15 text-xs text-espresso-900 focus:outline-none focus:border-bocca-green"
                  >
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Seating Preference */}
              <div className="space-y-2">
                <label className="text-[11px] uppercase tracking-luxury text-taupe-500 font-semibold flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-bocca-bean" strokeWidth={1.25} />
                  Seating Ambience
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {seatingOptions.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setSeating(opt)}
                      className={`px-3 py-2 rounded-xl text-left text-xs font-medium tracking-wide transition-all border ${
                        seating === opt
                          ? 'bg-bocca-green text-cream-50 border-bocca-green shadow-sm'
                          : 'bg-cream-50 text-espresso-800 border-espresso-900/15 hover:border-espresso-900/40'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Guest Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] uppercase tracking-luxury text-taupe-500 font-semibold">
                    Guest Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Amanpreet Singh"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="w-full bg-cream-50 px-4 py-2.5 rounded-xl border border-espresso-900/15 text-xs text-espresso-900 focus:outline-none focus:border-bocca-green"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] uppercase tracking-luxury text-taupe-500 font-semibold">
                    Contact Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 98765 43210"
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                    className="w-full bg-cream-50 px-4 py-2.5 rounded-xl border border-espresso-900/15 text-xs text-espresso-900 focus:outline-none focus:border-bocca-green"
                  />
                </div>
              </div>

              {/* Special Requests */}
              <div className="space-y-1.5">
                <label className="text-[11px] uppercase tracking-luxury text-taupe-500 font-semibold">
                  Special Notes or Dietary Requirements (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Anniversary celebration, extra baby high-chair, allergy notes..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-cream-50 px-4 py-2 rounded-xl border border-espresso-900/15 text-xs text-espresso-900 focus:outline-none focus:border-bocca-green resize-none"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="submit"
                  id="submit-reservation-btn"
                  className="w-full sm:flex-1 py-3.5 rounded-full bg-espresso-900 text-cream-50 text-xs tracking-editorial uppercase font-medium hover:bg-bocca-green transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" strokeWidth={1.25} />
                  <span>Send Request Via WhatsApp</span>
                </button>
                <a
                  href={`tel:${CAFE_CONFIG.meta.phone.replace(/\s+/g, '')}`}
                  className="w-full sm:w-auto px-5 py-3.5 rounded-full border border-espresso-900/20 text-espresso-900 text-xs tracking-editorial uppercase hover:bg-espresso-900/5 transition-colors flex items-center justify-center gap-2 text-center"
                >
                  <Phone className="w-3.5 h-3.5" strokeWidth={1.25} />
                  <span>Call Directly</span>
                </a>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
