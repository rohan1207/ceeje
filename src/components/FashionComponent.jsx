import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const fragrances = [
  {
    id: 1,
    emoji: '🌸',
    name: 'PION',
    tags: 'Soft • Clean • Feminine',
    description: 'A soft peony breeze with spicy carnation and crisp apple glow. Delicate but confident.',
    video: '/videos/pion.mp4', // Placeholder - replace with actual video paths
    image: '/pion-bottle.jpg', // Fallback image
  },
  {
    id: 2,
    emoji: '🍊',
    name: 'BOSHONTO',
    tags: 'Fresh • Uplifting • Easy',
    description: 'Bright tangerine, airy lily, and soft musk. Fresh energy on your skin.',
    video: '/videos/boshonto.mp4',
    image: '/boshonto-bottle.jpg',
  },
  {
    id: 3,
    emoji: '💫',
    name: 'MEYVE',
    tags: 'Fruity • Radiant • Playful',
    description: 'Juicy fruits, zesty bergamot, and warm amber. Joyful from the first spritz.',
    video: '/videos/meyve.mp4',
    image: '/meyve-bottle.jpg',
  },
  {
    id: 4,
    emoji: '🔥',
    name: 'MISHTI',
    tags: 'Warm • Sweet • Bold',
    description: 'Rich saffron, smoky oud, and sugarcane warmth. Quiet confidence.',
    video: '/videos/mishti.mp4',
    image: '/mishti-bottle.jpg',
  },
  {
    id: 5,
    emoji: '🌹',
    name: 'GULABI HUE',
    tags: 'Rosy • Elegant • Timeless',
    description: 'Fresh rose wrapped in cedar and labdanum. Polished, feminine energy.',
    video: '/videos/gulabi.mp4',
    image: '/gulabi-bottle.jpg',
  },
  {
    id: 6,
    emoji: '🍃',
    name: 'BONER',
    tags: 'Woody • Leather • Smooth',
    description: 'Smooth leather, sandalwood, and papyrus. Grounded and refined.',
    video: '/videos/boner.mp4',
    image: '/boner-bottle.jpg',
  },
  {
    id: 7,
    emoji: '🌿',
    name: 'SERENE',
    tags: 'Minimal • Zen • Pure',
    description: 'White tea, green fig, and mineral musk. Clean, meditative calm.',
    video: '/videos/serene.mp4',
    image: '/serene-bottle.jpg',
  },
  {
    id: 8,
    emoji: '✨',
    name: 'LUMINOUS',
    tags: 'Bright • Airy • Ethereal',
    description: 'Neroli, white amber, and sea salt. Light that follows you.',
    video: '/videos/luminous.mp4',
    image: '/luminous-bottle.jpg',
  },
];

const FashionComponent = () => {
  const containerRef = useRef(null);
  const horizontalRef = useRef(null);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const horizontal = horizontalRef.current;
    if (!container || !horizontal) return;

    // Wait for layout to settle and Lenis to be ready
    const initTimeout = setTimeout(() => {
      // Calculate horizontal scroll distance
      const cards = Array.from(horizontal.children);
      if (cards.length === 0) return;

      // Calculate total width
      let totalWidth = 0;
      cards.forEach((card, i) => {
        totalWidth += card.offsetWidth || (i === 0 ? 500 : 680);
        if (i < cards.length - 1) totalWidth += 80; // gap
      });

      const scrollDistance = totalWidth - window.innerWidth;
      const scrollLength = scrollDistance + window.innerHeight * 0.8;

      let ctx = gsap.context(() => {
        // Pin the container and scroll horizontally
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start: 'top top',
            end: `+=${scrollLength}`,
            pin: true,
            scrub: 1.2,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            scroller: window.lenis ? document.body : window, // Use body when Lenis is active
            onEnter: () => {
              setIsScrolling(true);
            },
            onLeave: () => {
              setIsScrolling(false);
            },
            onEnterBack: () => {
              setIsScrolling(true);
            },
            onLeaveBack: () => {
              setIsScrolling(false);
            },
          },
        });

        // Horizontal translation
        tl.to(horizontal, {
          x: -scrollDistance,
          ease: 'none',
        }, 0);

        // Stagger card entrance animations
        cards.forEach((card, i) => {
          if (i > 0) {
            gsap.from(card, {
              opacity: 0,
              y: 40,
              scale: 0.95,
              duration: 0.8,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: card,
                start: 'left 85%',
                end: 'left 15%',
                containerAnimation: tl,
                toggleActions: 'play none none reverse',
              },
            });
          }
        });
      }, container);

      const handleResize = () => {
        ScrollTrigger.refresh();
      };
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        ctx.revert();
        // Re-enable Lenis if it was stopped
        if (window.lenis) {
          window.lenis.start();
        }
      };
    }, 200);

    return () => {
      clearTimeout(initTimeout);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-gradient-to-b from-white via-neutral-50 to-white"
    >
      {/* Background decorative text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <h2 className="text-[20vw] font-extralight text-neutral-100 select-none font-playfair tracking-tight">
          COLLECTION
        </h2>
      </div>

      {/* Horizontal scroll container */}
      <div
        ref={horizontalRef}
        className="flex items-center h-full gap-20 px-[10vw] relative z-10"
        style={{ willChange: 'transform' }}
      >
        {/* Left intro card */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="min-w-[500px] h-[85%] flex flex-col justify-center px-12 bg-white/80 backdrop-blur-2xl rounded-[48px] shadow-[0_40px_120px_rgba(15,23,42,0.15)] border border-white/60"
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-5xl lg:text-6xl font-light mb-6 leading-tight font-playfair"
          >
            <span className="text-neutral-400 font-extralight">DISCOVER</span>
            <br />
            <span className="text-neutral-900 font-normal">OUR SIGNATURES</span>
            <br />
            <span className="text-neutral-700 font-light italic">
              Each scent tells a story
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-neutral-600 mb-8 leading-relaxed text-base"
          >
            Explore eight distinct fragrances crafted for moments that matter.
            From soft florals to bold woods, find the scent that becomes your
            signature.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex items-center gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-14 h-14 rounded-full border-2 border-neutral-900 flex items-center justify-center hover:bg-neutral-900 hover:text-white transition-all duration-300"
            >
              <span className="text-xl">→</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-3.5 bg-neutral-900 text-white rounded-full hover:bg-neutral-950 transition-all duration-300 font-light tracking-wider text-sm"
            >
              Explore Collection
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Fragrance cards */}
        {fragrances.map((fragrance, index) => (
          <motion.div
            key={fragrance.id}
            className="min-w-[680px] h-[85%] flex-shrink-0 relative group rounded-[48px] overflow-hidden border border-white/40 shadow-[0_30px_100px_rgba(15,23,42,0.2)] bg-white/5 backdrop-blur-sm"
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          >
            {/* Video background */}
            <div className="absolute inset-0">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-700"
                poster={fragrance.image}
              >
                <source src={fragrance.video} type="video/mp4" />
                {/* Fallback image if video doesn't load */}
                <img
                  src={fragrance.image}
                  alt={fragrance.name}
                  className="w-full h-full object-cover"
                />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            </div>

            {/* Top badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="absolute top-8 left-8 bg-white/95 backdrop-blur-xl rounded-3xl px-6 py-4 shadow-xl border border-white/60"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{fragrance.emoji}</span>
                <div>
                  <p className="text-neutral-900 font-semibold text-sm tracking-wider">
                    {fragrance.name}
                  </p>
                  <p className="text-neutral-500 text-xs mt-0.5">
                    {fragrance.tags}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Bottom content */}
            <div className="absolute inset-x-0 bottom-0 p-10">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.7, delay: index * 0.1 + 0.2 }}
              >
                <p className="text-white/95 text-lg leading-relaxed mb-6 drop-shadow-lg max-w-md">
                  {fragrance.description}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3.5 bg-white/95 backdrop-blur-sm text-neutral-900 font-semibold rounded-full hover:bg-white transition-all duration-300 shadow-lg border border-white/80 text-sm tracking-wider"
                >
                  DISCOVER {fragrance.name}
                </motion.button>
              </motion.div>
            </div>

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-neutral-900/0 group-hover:bg-neutral-900/5 transition-all duration-500 pointer-events-none" />
          </motion.div>
        ))}
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isScrolling ? 1 : 0 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <div className="flex items-center gap-2 text-neutral-400 text-xs tracking-wider">
          <span>Scroll to explore</span>
          <motion.div
            animate={{ x: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            →
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default FashionComponent;

