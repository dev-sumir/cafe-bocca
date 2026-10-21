import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, ArrowUpRight } from 'lucide-react';
import { CAFE_CONFIG } from '../data/cafeConfig';

export default function GallerySection() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  return (
    <section
      id="gallery"
      className="relative bg-cream-100 text-espresso-900 py-28 md:py-36 px-6 lg:px-12 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-espresso-900/10">
          <div className="space-y-3 max-w-xl">
            <span className="text-script-cookie text-bocca-bean text-2xl md:text-3xl">
              Editorial Lookbook
            </span>
            <h2 className="display-section font-bold tracking-tight text-espresso-950">
              Visual Impressions
            </h2>
            <p className="text-taupe-500 text-sm md:text-base font-light leading-relaxed">
              Moments of craft, golden caramelisation, and tactile calm captured inside Café Bocca.
            </p>
          </div>
          <span className="text-[11px] uppercase tracking-luxury text-taupe-500">
            TAP ANY FRAME TO ENLARGE
          </span>
        </div>

        {/* Staggered Kinfolk Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 items-start">
          {CAFE_CONFIG.gallery.map((item, index) => {
            const isTall = item.aspect === 'tall';
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.75, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => setSelectedPhoto(item)}
                className={`group cursor-pointer space-y-3 ${
                  index % 2 === 1 ? 'lg:translate-y-12' : ''
                }`}
              >
                {/* Photo Frame (zero borders, subtle shadow, scale on hover) */}
                <div
                  className={`relative overflow-hidden rounded-2xl bg-espresso-900 shadow-[0_15px_35px_rgba(28,21,18,0.08)] ${
                    isTall ? 'aspect-[3/4]' : 'aspect-[4/3]'
                  }`}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-espresso-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="p-3 rounded-full bg-cream-100/90 text-espresso-950 shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
                      <ZoomIn className="w-4 h-4" strokeWidth={1.25} />
                    </span>
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="px-2.5 py-1 rounded-full bg-cream-100/90 backdrop-blur-md text-espresso-950 text-[10px] uppercase tracking-luxury font-semibold">
                      {item.tag}
                    </span>
                  </div>
                </div>

                {/* Typographic Label Below Photo */}
                <div className="flex items-start justify-between pt-1">
                  <div>
                    <h3 className="font-display font-bold text-base text-espresso-950 group-hover:text-bocca-green transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-taupe-500 font-light">{item.subtitle}</p>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-taupe-500 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-1 group-hover:translate-x-0" strokeWidth={1.25} />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {selectedPhoto && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPhoto(null)}
              className="fixed inset-0 z-50 bg-espresso-950/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8"
            >
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-6 right-6 p-3 rounded-full bg-cream-100/10 text-cream-100 hover:bg-cream-100/20 transition-colors z-50"
                aria-label="Close Lightbox"
              >
                <X className="w-6 h-6" strokeWidth={1.25} />
              </button>

              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-4xl max-h-[88vh] flex flex-col items-center bg-cream-100 rounded-3xl overflow-hidden shadow-2xl"
              >
                <div className="relative w-full max-h-[70vh] overflow-hidden bg-espresso-950 flex items-center justify-center">
                  <img
                    src={selectedPhoto.image}
                    alt={selectedPhoto.title}
                    className="max-h-[70vh] w-auto object-contain"
                  />
                </div>
                <div className="w-full p-6 sm:p-8 bg-cream-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-espresso-900/10">
                  <div>
                    <span className="text-[10px] uppercase tracking-luxury text-bocca-bean font-semibold">
                      {selectedPhoto.tag}
                    </span>
                    <h4 className="font-display font-bold text-xl text-espresso-950">
                      {selectedPhoto.title}
                    </h4>
                    <p className="text-xs text-taupe-500 font-light mt-0.5">
                      {selectedPhoto.subtitle}
                    </p>
                  </div>
                  <span className="text-[11px] tracking-editorial uppercase text-taupe-500 font-medium">
                    Café Bocca &middot; Ludhiana
                  </span>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
