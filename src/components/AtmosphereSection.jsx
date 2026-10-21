import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Quote, Coffee, Heart } from 'lucide-react';
import { CAFE_CONFIG } from '../data/cafeConfig';

export default function AtmosphereSection() {
  const [chef, divit] = CAFE_CONFIG.founders;

  return (
    <section
      id="story"
      className="relative bg-cream-200/60 text-espresso-900 py-28 md:py-36 px-6 lg:px-12 border-y border-espresso-900/10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto space-y-28 md:space-y-40">
        {/* Section Lead Heading */}
        <div className="max-w-3xl space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-script-cookie text-bocca-bean text-2xl md:text-3xl">
              Technique Meets Soul
            </span>
            <span className="w-16 h-[1px] bg-espresso-900/20" />
          </div>
          <h2 className="display-section font-bold tracking-tight text-espresso-950">
            A Sanctuary Built on Friendship, Craft & Hospitality
          </h2>
          <p className="text-taupe-500 text-sm md:text-base lg:text-lg font-light leading-relaxed max-w-2xl">
            Café Bocca was born from a singular vision shared between Chef Gariman Maini and Divit Maini: to create a dining and coffee haven in Ludhiana that rivals the most thoughtful spaces in London, Copenhagen, and Milan.
          </p>
        </div>

        {/* Feature 1: Chef Gariman Maini (Asymmetrical 12-Column Grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Oversized Portrait Photography (7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 relative"
          >
            <div className="relative overflow-hidden rounded-2xl shadow-[0_25px_60px_rgba(28,21,18,0.14)] aspect-[4/5] bg-espresso-950">
              <img
                src={chef.image}
                alt={chef.name}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-espresso-950/70 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 right-6 text-cream-50">
                <span className="text-editorial-meta text-bocca-gold">Executive Chef</span>
                <p className="font-display text-2xl font-bold">{chef.name}</p>
                <p className="text-xs text-cream-200/80 font-light">{CAFE_CONFIG.meta.instagramHandle}</p>
              </div>
            </div>
            {/* Architectural accent mark */}
            <div className="hidden sm:block absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-bocca-green/30 pointer-events-none" />
          </motion.div>

          {/* Right: Editorial Narrative & Quote (5 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.85, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 space-y-6 lg:pl-4"
          >
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-luxury text-bocca-bean font-semibold">
              <Sparkles className="w-3.5 h-3.5" strokeWidth={1.25} />
              <span>Culinary Philosophy</span>
            </div>

            <h3 className="display-title font-bold text-espresso-950">
              "Every dish is crafted to tell a story on the plate."
            </h3>

            <div className="relative pl-6 border-l-2 border-bocca-bean/40 italic font-display text-base md:text-lg text-espresso-800 leading-relaxed">
              "{chef.quote}"
            </div>

            <p className="text-taupe-500 text-sm md:text-base font-light leading-relaxed">
              {chef.bio}
            </p>

            <div className="pt-4 flex items-center gap-4 text-xs tracking-editorial uppercase text-espresso-900 font-medium">
              <span className="w-8 h-[1px] bg-espresso-900/30" />
              <span>Chef Gariman Maini &middot; EXECUTIVE</span>
            </div>
          </motion.div>
        </div>

        {/* Feature 2: Divit Maini (Inverted Asymmetrical 12-Column Grid) */}
        <div id="atmosphere" className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Narrative & UK MBA Vision (5 cols on Desktop) */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="order-2 lg:order-1 lg:col-span-5 space-y-6 lg:pr-4"
          >
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-luxury text-bocca-green font-semibold">
              <Coffee className="w-3.5 h-3.5" strokeWidth={1.25} />
              <span>Atmosphere & Vision</span>
            </div>

            <h3 className="display-title font-bold text-espresso-950">
              "More than coffee—a place people look forward to returning to."
            </h3>

            <div className="relative pl-6 border-l-2 border-bocca-green/40 italic font-display text-base md:text-lg text-espresso-800 leading-relaxed">
              "{divit.quote}"
            </div>

            <p className="text-taupe-500 text-sm md:text-base font-light leading-relaxed">
              {divit.bio}
            </p>

            <div className="pt-4 flex items-center gap-4 text-xs tracking-editorial uppercase text-espresso-900 font-medium">
              <span className="w-8 h-[1px] bg-espresso-900/30" />
              <span>Divit Maini &middot; Co-Founder</span>
            </div>
          </motion.div>

          {/* Right: Oversized Portrait Photography (7 cols on Desktop) */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.85, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="order-1 lg:order-2 lg:col-span-7 relative"
          >
            <div className="relative overflow-hidden rounded-2xl shadow-[0_25px_60px_rgba(28,21,18,0.14)] aspect-[4/5] bg-espresso-950">
              <img
                src={divit.image}
                alt={divit.name}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-espresso-950/70 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 right-6 text-cream-50">
                <span className="text-editorial-meta text-bocca-gold">Finance & Strategy</span>
                <p className="font-display text-2xl font-bold">{divit.name}</p>
                <p className="text-xs text-cream-200/80 font-light">{CAFE_CONFIG.meta.instagramHandle}</p>
              </div>
            </div>
            {/* Architectural accent mark */}
            <div className="hidden sm:block absolute -bottom-4 -right-4 w-24 h-24 border-b-2 border-r-2 border-bocca-bean/30 pointer-events-none" />
          </motion.div>
        </div>

      </div>
    </section>
  );
}
