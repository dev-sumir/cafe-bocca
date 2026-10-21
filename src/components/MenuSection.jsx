import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Plus, Check, Sparkles, Filter, Leaf, Utensils } from 'lucide-react';
import { CAFE_CONFIG } from '../data/cafeConfig';

export default function MenuSection({ onAddToCart }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedDietary, setSelectedDietary] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredItem, setHoveredItem] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [addedItemId, setAddedItemId] = useState(null);

  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleAddItem = (item) => {
    onAddToCart(item);
    setAddedItemId(item.id);
    setTimeout(() => setAddedItemId(null), 1400);
  };

  // Filter items based on active category, dietary filter, and search query
  const filteredItems = CAFE_CONFIG.menuItems.filter((item) => {
    const matchesCategory =
      activeCategory === 'all' || item.category === activeCategory;
    const matchesDietary =
      !selectedDietary || item.dietary.includes(selectedDietary);
    const matchesSearch =
      !searchQuery.trim() ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesDietary && matchesSearch;
  });

  return (
    <section
      id="menu"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative bg-cream-100 text-espresso-900 py-28 md:py-36 px-6 lg:px-12 overflow-hidden"
    >
      {/* Floating Masked Image Preview for Desktop Hover */}
      <AnimatePresence>
        {hoveredItem && hoveredItem.image && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, rotate: -2 }}
            animate={{
              opacity: 1,
              scale: 1,
              rotate: 0,
              x: mousePosition.x + 32,
              y: mousePosition.y - 120,
            }}
            exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.2 } }}
            transition={{ type: 'spring', damping: 25, stiffness: 250 }}
            className="pointer-events-none fixed z-40 hidden lg:block w-72 h-80 rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(28,21,18,0.22)] border border-cream-200/40 bg-cream-50"
            style={{
              top: 0,
              left: 0,
            }}
          >
            <img
              src={hoveredItem.image}
              alt={hoveredItem.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-espresso-950/70 via-transparent to-transparent flex flex-col justify-end p-4">
              <span className="text-[10px] uppercase tracking-luxury text-cream-200 font-semibold">
                {hoveredItem.category.toUpperCase()}
              </span>
              <span className="font-display text-cream-50 text-base font-bold">
                {hoveredItem.name}
              </span>
              <span className="font-mono text-bocca-gold text-xs font-semibold">
                ₹{hoveredItem.price}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto">
        {/* Editorial Section Header */}
        <div className="mb-16 md:mb-24 flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-10 border-b border-espresso-900/10">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-3">
              <span className="text-script-cookie text-bocca-bean text-2xl md:text-3xl">
                Tasting The Beginning
              </span>
              <span className="w-12 h-[1px] bg-espresso-900/20" />
            </div>
            <h2 className="display-section font-bold tracking-tight text-espresso-950">
              Soft-Launch Culinary Menu
            </h2>
            <p className="text-taupe-500 text-sm md:text-base font-light leading-relaxed">
              Every dish is a balance of intention, slow-fermented grains, single-origin roasts, and culinary technique crafted by Chef Gariman Maini.
            </p>
          </div>

          {/* Minimalist Search Input (No boxes, pure underline) */}
          <div className="relative w-full lg:w-72">
            <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-taupe-500" strokeWidth={1.25} />
            <input
              type="text"
              id="menu-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search flavours, brews..."
              className="w-full bg-transparent pl-7 pr-4 py-2 border-b border-espresso-900/20 text-xs md:text-sm tracking-wide text-espresso-900 placeholder:text-taupe-500/70 focus:outline-none focus:border-bocca-green transition-colors"
            />
          </div>
        </div>

        {/* Minimal Typographic Category Tabs (Kinfolk style) */}
        <div className="mb-10 overflow-x-auto no-scrollbar pb-3">
          <div className="flex items-center gap-6 md:gap-10 min-w-max border-b border-espresso-900/10">
            {CAFE_CONFIG.menuCategories.map((category) => {
              const isActive = activeCategory === category.id;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`relative pb-3 text-xs md:text-sm tracking-[0.16em] uppercase font-medium transition-colors ${
                    isActive ? 'text-espresso-950 font-semibold' : 'text-taupe-500 hover:text-espresso-800'
                  }`}
                >
                  {category.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeCategoryUnderline"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-bocca-green"
                      transition={{ type: 'spring', damping: 30, stiffness: 350 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Subtle Dietary Filter Toggles */}
        <div className="mb-14 flex flex-wrap items-center gap-2 md:gap-3 text-xs">
          <span className="text-[11px] tracking-luxury uppercase text-taupe-500 mr-2 flex items-center gap-1.5">
            <Filter className="w-3 h-3" strokeWidth={1.25} />
            Filter by:
          </span>
          <button
            onClick={() => setSelectedDietary(null)}
            className={`px-3.5 py-1.5 rounded-full border text-[11px] tracking-editorial uppercase transition-all ${
              selectedDietary === null
                ? 'bg-espresso-900 text-cream-50 border-espresso-900'
                : 'border-espresso-900/15 text-taupe-500 hover:border-espresso-900/30'
            }`}
          >
            All Items
          </button>
          {CAFE_CONFIG.dietaryBadges.map((badge) => {
            const isSelected = selectedDietary === badge.id;
            return (
              <button
                key={badge.id}
                onClick={() => setSelectedDietary(isSelected ? null : badge.id)}
                className={`px-3.5 py-1.5 rounded-full border text-[11px] tracking-editorial uppercase transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-bocca-green text-cream-50 border-bocca-green'
                    : 'border-espresso-900/15 text-taupe-500 hover:border-espresso-900/30'
                }`}
              >
                {badge.id === 'chef' && <Sparkles className="w-3 h-3 text-bocca-gold" strokeWidth={1.25} />}
                {badge.id === 'veg' && <Leaf className="w-3 h-3 text-emerald-700" strokeWidth={1.25} />}
                <span>{badge.label}</span>
              </button>
            );
          })}
        </div>

        {/* Fine-Dining Box-Free Menu Rows */}
        {filteredItems.length === 0 ? (
          <div className="py-20 text-center space-y-3">
            <p className="font-display text-xl text-espresso-800">No items found matching your selection.</p>
            <p className="text-sm text-taupe-500 font-light">Try adjusting your search terms or filters.</p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSelectedDietary(null);
                setSearchQuery('');
              }}
              className="mt-4 px-6 py-2 rounded-full border border-espresso-900/20 text-xs tracking-editorial uppercase text-espresso-900 hover:bg-espresso-900 hover:text-cream-50 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="divide-y divide-espresso-900/10 border-t border-espresso-900/10">
            {filteredItems.map((item, index) => {
              const isAdded = addedItemId === item.id;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: Math.min(index * 0.04, 0.3) }}
                  onMouseEnter={() => setHoveredItem(item)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className="group py-7 md:py-8 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors hover:bg-cream-200/40 px-2 rounded-lg"
                >
                  {/* Left Column: Item Details */}
                  <div className="space-y-1.5 max-w-2xl">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <h3 className="font-display text-lg md:text-xl font-bold text-espresso-950 group-hover:text-bocca-green transition-colors">
                        {item.name}
                      </h3>
                      {/* Minimalist Badges */}
                      {item.dietary.includes('chef') && (
                        <span className="inline-flex items-center gap-1 text-[9px] tracking-luxury uppercase px-2 py-0.5 rounded-full bg-bocca-gold/15 text-bocca-bean font-semibold border border-bocca-gold/30">
                          <Sparkles className="w-2.5 h-2.5 text-bocca-bean" strokeWidth={1.5} />
                          Signature
                        </span>
                      )}
                      {item.dietary.includes('veg') && (
                        <span className="text-[9px] tracking-luxury uppercase px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 font-semibold border border-emerald-200">
                          Veg
                        </span>
                      )}
                      {item.dietary.includes('non-veg') && (
                        <span className="text-[9px] tracking-luxury uppercase px-2 py-0.5 rounded-full bg-rose-50 text-rose-800 font-semibold border border-rose-200">
                          Non-Veg
                        </span>
                      )}
                      {item.dietary.includes('egg') && (
                        <span className="text-[9px] tracking-luxury uppercase px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 font-semibold border border-amber-200">
                          Contains Egg
                        </span>
                      )}
                    </div>
                    <p className="text-taupe-500 text-xs md:text-sm font-light leading-relaxed">
                      {item.description}
                    </p>
                    {item.servedWith && (
                      <p className="text-[11px] text-bocca-bean font-medium italic">
                        Served with: {item.servedWith}
                      </p>
                    )}
                  </div>

                  {/* Right Column: Price & Add to Tray Action */}
                  <div className="flex items-center justify-between md:justify-end gap-6 pt-2 md:pt-0">
                    <span className="font-mono text-base md:text-lg font-semibold text-espresso-950">
                      ₹{item.price}
                    </span>
                    <button
                      onClick={() => handleAddItem(item)}
                      id={`add-tray-${item.id}`}
                      className={`relative inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs tracking-editorial uppercase transition-all duration-300 ${
                        isAdded
                          ? 'bg-bocca-green text-cream-50 border-bocca-green'
                          : 'border-espresso-900/20 text-espresso-900 hover:bg-espresso-900 hover:text-cream-50 hover:border-espresso-900'
                      }`}
                      aria-label={`Add ${item.name} to order tray`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5" strokeWidth={1.5} />
                          <span>Added</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" strokeWidth={1.25} />
                          <span>Pre-Order</span>
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Editorial Subnote */}
        <div className="mt-14 pt-8 border-t border-espresso-900/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-taupe-500 font-light">
          <span>The Menu Prices are Exclusive of 5% GST. Prepared fresh to order.</span>
          <span className="italic font-flourish text-lg text-bocca-bean">
            "First pour, final blend coming soon."
          </span>
        </div>
      </div>
    </section>
  );
}
