import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ArrowRight, Calendar } from 'lucide-react';
import { CAFE_CONFIG } from '../data/cafeConfig';

const TOTAL_FRAMES = CAFE_CONFIG.heroScrubber.totalFrames; // 240

// Seamless 4-scene narrative coverage
const SCENES = [
  {
    id: "scene-1",
    startFrame: 1,
    endFrame: 60,
    badge: "Pakhowal Road, Ludhiana",
    title: "Café Bocca",
    scriptAccent: "by Chef Gariman Maini",
    description: "Where artisanal specialty coffee meets slow culinary craftsmanship in an elevated, light-filled sanctuary.",
    primaryCta: { label: "Explore The Menu", href: "#menu" },
    secondaryCta: { label: "Reserve A Table", action: "reserve" },
  },
  {
    id: "scene-2",
    startFrame: 61,
    endFrame: 120,
    badge: "The Coffee Ritual",
    title: "Purity In Every Pour",
    scriptAccent: "precision extraction",
    description: "Triple-filtered crystal ice and single-origin beans, pulled at exact barometric pressure for flawless clarity and crema.",
    primaryCta: { label: "Discover Our Brews", href: "#menu" },
  },
  {
    id: "scene-3",
    startFrame: 121,
    endFrame: 180,
    badge: "Sensory Signature",
    title: "Spanish Iced Latte",
    scriptAccent: "velvet & crema",
    description: "Silky ribbons of condensed cream meeting freshly extracted dark espresso, crowned with whipped artisanal cloud foam.",
    primaryCta: { label: "View Gourmet Cups", href: "#menu" },
  },
  {
    id: "scene-4",
    startFrame: 181,
    endFrame: 230,
    badge: "A Personal Invitation",
    title: "Your Table Awaits",
    scriptAccent: "welcome to our table",
    description: "Chef Gariman & Divit Maini warmly invite you to step into our sanctuary on Pakhowal Road, Ludhiana.",
    primaryCta: { label: "Find Your Way Here", href: "#visit" },
    secondaryCta: { label: "Book A Table", action: "reserve" },
  },
];

export default function HeroCanvasScrubber({ onOpenReservation, onHeroActiveChange }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const framesCacheRef = useRef([]);
  const currentFrameIndexRef = useRef(0);
  const targetFrameIndexRef = useRef(0);
  const animationFrameIdRef = useRef(null);
  const lastDrawnImgRef = useRef(null);

  const [loadedCount, setLoadedCount] = useState(0);
  const [activeSceneId, setActiveSceneId] = useState('scene-1');
  const [currentFrameDisplay, setCurrentFrameDisplay] = useState(1);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Responsive Canvas Drawing Math (Object-fit Cover)
  const drawFrame = useCallback((img) => {
    const canvas = canvasRef.current;
    if (!canvas || !img || !img.complete) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const imgWidth = img.naturalWidth || 1920;
    const imgHeight = img.naturalHeight || 1080;

    // Center crop cover math
    const scale = Math.max(width / imgWidth, height / imgHeight);
    const renderWidth = imgWidth * scale;
    const renderHeight = imgHeight * scale;
    const offsetX = (width - renderWidth) / 2;
    const offsetY = (height - renderHeight) / 2;

    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(img, offsetX, offsetY, renderWidth, renderHeight);
    lastDrawnImgRef.current = img;
  }, []);

  // Resize canvas to full viewport with DPR support
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = window.innerWidth;
    const height = window.innerHeight;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'medium';
    }

    const currentIndex = Math.round(currentFrameIndexRef.current);
    const currentImg =
      framesCacheRef.current[currentIndex] ||
      lastDrawnImgRef.current ||
      framesCacheRef.current[0];
    if (currentImg && currentImg.complete) {
      drawFrame(currentImg);
    }
  }, [drawFrame]);

  // Preload frames progressively
  useEffect(() => {
    const frames = new Array(TOTAL_FRAMES);
    framesCacheRef.current = frames;

    // Step 1: Immediately load Frame 1 for instant first paint
    const firstImg = new Image();
    firstImg.src = CAFE_CONFIG.heroScrubber.framePath(1);
    firstImg.onload = () => {
      frames[0] = firstImg;
      lastDrawnImgRef.current = firstImg;
      setLoadedCount(1);
      handleResize();
      drawFrame(firstImg);
    };

    // Step 2: Progressively load remaining frames
    let loaded = 1;
    for (let i = 2; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = CAFE_CONFIG.heroScrubber.framePath(i);
      img.onload = () => {
        frames[i - 1] = img;
        loaded++;
        if (loaded % 12 === 0 || loaded === TOTAL_FRAMES) {
          setLoadedCount(loaded);
        }
      };
    }

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [drawFrame, handleResize]);

  // Scroll Tracking & Frame Scrubbing Interpolation (Lerp)
  useEffect(() => {
    const updateScrollProgress = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const totalScrollableDistance = rect.height - viewportHeight;

      // Check whether hero is currently occupying viewport
      const isHeroCurrentlyActive = rect.bottom > window.innerHeight * 0.95;
      if (onHeroActiveChange) {
        onHeroActiveChange(isHeroCurrentlyActive);
      }

      if (totalScrollableDistance <= 0) return;

      const currentScrollTop = Math.max(0, -rect.top);
      const rawProgress = Math.min(1, Math.max(0, currentScrollTop / totalScrollableDistance));

      // Calculate target frame (0-indexed: 0 to 239)
      const targetFrame = rawProgress * (TOTAL_FRAMES - 1);
      targetFrameIndexRef.current = targetFrame;

      const current1IndexedFrame = Math.round(targetFrame) + 1;
      setCurrentFrameDisplay(current1IndexedFrame);

      const matchedScene = SCENES.find(
        (scene) =>
          current1IndexedFrame >= scene.startFrame && current1IndexedFrame <= scene.endFrame
      );
      if (matchedScene) {
        setActiveSceneId(matchedScene.id);
      }
    };

    const renderLoop = () => {
      const current = currentFrameIndexRef.current;
      const target = targetFrameIndexRef.current;
      const diff = target - current;

      if (Math.abs(diff) > 0.04) {
        // Smooth lerp factor 0.18 for responsive inertia damping
        currentFrameIndexRef.current = current + diff * 0.18;
        const frameIdx = Math.round(currentFrameIndexRef.current);
        const img = framesCacheRef.current[frameIdx];

        if (img && img.complete) {
          drawFrame(img);
        } else {
          // If current frame isn't ready yet, fallback to nearest loaded frame
          let fallback = null;
          for (let offset = 1; offset < 30; offset++) {
            const prev = framesCacheRef.current[frameIdx - offset];
            if (prev && prev.complete) {
              fallback = prev;
              break;
            }
            const next = framesCacheRef.current[frameIdx + offset];
            if (next && next.complete) {
              fallback = next;
              break;
            }
          }
          if (fallback) {
            drawFrame(fallback);
          } else if (lastDrawnImgRef.current) {
            drawFrame(lastDrawnImgRef.current);
          }
        }
      }

      animationFrameIdRef.current = requestAnimationFrame(renderLoop);
    };

    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    updateScrollProgress();
    renderLoop();

    return () => {
      window.removeEventListener('scroll', updateScrollProgress);
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, [drawFrame, onHeroActiveChange]);

  // Reduced motion fallback view
  if (prefersReducedMotion) {
    return (
      <section className="relative min-h-screen bg-espresso-950 text-cream-100 flex items-center justify-center p-6">
        <img
          src={CAFE_CONFIG.heroScrubber.posterPath}
          alt="Café Bocca Specialty Coffee"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="relative z-10 max-w-3xl text-center flex flex-col items-center">
          <h1 className="display-hero font-bold mb-3 tracking-tight">CAFÉ BOCCA</h1>
          <p className="font-flourish text-3xl md:text-5xl text-cream-200 mb-6">
            by Chef Gariman Maini
          </p>
          <p className="text-cream-300 max-w-xl mx-auto mb-8 text-base md:text-lg leading-relaxed font-light">
            {SCENES[0].description}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="#menu"
              className="px-8 py-3.5 rounded-full bg-cream-100 text-espresso-950 text-xs tracking-editorial uppercase font-medium hover:bg-cream-200"
            >
              Explore The Menu
            </a>
            <button
              onClick={onOpenReservation}
              className="px-8 py-3.5 rounded-full border border-cream-100/30 text-cream-100 text-xs tracking-editorial uppercase hover:bg-cream-100/10"
            >
              Reserve A Table
            </button>
          </div>
        </div>
      </section>
    );
  }

  const activeScene = SCENES.find((s) => s.id === activeSceneId) || SCENES[0];

  return (
    <section
      ref={containerRef}
      id="hero-scrubber"
      className="relative w-full h-[450vh] bg-espresso-950"
    >
      {/* Sticky 100vh Pinned Viewport */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden">
        {/* Hardware-Accelerated Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />

        {/* Sophisticated Magazine Scrim: Warm radial vignette and gradient */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-espresso-950/85 via-espresso-950/25 to-espresso-950/50" />
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(18,14,12,0.65)_100%)]" />

        {/* Dynamic Editorial Scene Overlays */}
        <div className="relative z-20 w-full h-full max-w-7xl mx-auto px-6 lg:px-12 flex flex-col justify-between py-24 md:py-28 pointer-events-none">
          {/* Top Tagline Indicator */}
          <div className="flex items-center text-cream-200/70 text-[11px] tracking-luxury uppercase font-medium">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-bocca-gold animate-pulse" />
              Specialty Coffee &amp; Culinary Atelier
            </span>
          </div>

          {/* Center / Lower-Third Editorial Content */}
          <div className="max-w-2xl min-h-[260px] flex flex-col justify-center">
            <AnimatePresence mode="wait">
              {activeScene && (
                <motion.div
                  key={activeScene.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                  className="space-y-4 md:space-y-6"
                >
                  {/* Main Display Heading */}
                  <div className="space-y-1">
                    <h1 className="display-hero text-cream-50 font-bold tracking-tight">
                      {activeScene.title}
                    </h1>
                    {activeScene.scriptAccent && (
                      <p className="text-script-accent text-bocca-gold -mt-1 md:-mt-2">
                        {activeScene.scriptAccent}
                      </p>
                    )}
                  </div>

                  {/* Editorial Description */}
                  <p className="text-cream-200/90 text-sm md:text-base lg:text-lg leading-relaxed font-light max-w-xl">
                    {activeScene.description}
                  </p>

                  {/* Synchronized Call To Actions (Pointer Events enabled) */}
                  <div className="pt-2 flex flex-wrap items-center gap-4 pointer-events-auto">
                    {activeScene.primaryCta && (
                      <a
                        href={activeScene.primaryCta.href}
                        className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-cream-100 text-espresso-950 text-xs tracking-editorial uppercase font-medium hover:bg-cream-200 transition-all duration-300 hover:shadow-xl"
                      >
                        <span>{activeScene.primaryCta.label}</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.25} />
                      </a>
                    )}
                    {activeScene.secondaryCta && (
                      <button
                        onClick={onOpenReservation}
                        className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full border border-cream-100/30 text-cream-100 text-xs tracking-editorial uppercase font-medium hover:bg-cream-100/10 hover:border-cream-100 transition-all duration-300"
                      >
                        <Calendar className="w-3.5 h-3.5" strokeWidth={1.25} />
                        <span>{activeScene.secondaryCta.label}</span>
                      </button>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Bottom Interactive Scroll Indicator */}
          <div className="flex items-center justify-end pt-6 border-t border-cream-100/10 text-cream-200/70 text-[11px] tracking-luxury uppercase">
            <div className="flex items-center gap-2 animate-bounce">
              <span>Explore</span>
              <ChevronDown className="w-3.5 h-3.5" strokeWidth={1.25} />
            </div>
          </div>
        </div>

        {/* Minimal Typographic Preload Progress Bar (Only during initial batch) */}
        {loadedCount < TOTAL_FRAMES && (
          <div className="absolute bottom-2 left-6 right-6 md:left-12 md:right-12 z-30 flex items-center justify-between text-[10px] tracking-widest text-cream-100/40 pointer-events-none">
            <span className="font-mono">
              PRELOADING SEQUENCE ({Math.round((loadedCount / TOTAL_FRAMES) * 100)}%)
            </span>
            <div className="w-32 h-[1px] bg-cream-100/15 overflow-hidden rounded-full">
              <div
                className="h-full bg-bocca-gold transition-all duration-200"
                style={{ width: `${(loadedCount / TOTAL_FRAMES) * 100}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
