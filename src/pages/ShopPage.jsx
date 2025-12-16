import { motion } from 'framer-motion';

const FRAGRANCES = [
  {
    id: 'pion',
    emoji: '🌸',
    name: 'PION',
    tags: 'Soft • Clean • Feminine',
    copy:
      'A soft peony breeze with a hint of spicy carnation and a crisp apple glow. Delicate but confident — your “I feel like myself today” mist.',
  },
  {
    id: 'boshonto',
    emoji: '🍊',
    name: 'BOSHONTO',
    tags: 'Fresh • Uplifting • Easy',
    copy:
      'Bright tangerine, airy lily and soft musk in a clean, refreshing veil. Naturally magnetic and perfect for everyday freshness.',
  },
  {
    id: 'meyve',
    emoji: '💫',
    name: 'MEYVE',
    tags: 'Fruity • Radiant • Playful',
    copy:
      'Juicy fruits, zesty bergamot and warm amber create a joyful, mood‑lifting trail. The scent of a good day waiting to happen.',
  },
  {
    id: 'mishti',
    emoji: '🔥',
    name: 'MISHTI',
    tags: 'Warm • Sweet • Bold',
    copy:
      'Rich saffron, smoky oud and caramel sugarcane wrap skin in quiet confidence. The one you reach for when you want to stand out.',
  },
  {
    id: 'gulabi',
    emoji: '🌹',
    name: 'GULABI HUE',
    tags: 'Rosy • Elegant • Timeless',
    copy:
      'Fresh rose, cedar and labdanum in a modern, polished floral. Feminine, balanced and gently unforgettable.',
  },
  {
    id: 'boner',
    emoji: '🍃',
    name: 'BONER',
    tags: 'Woody • Leather • Smooth',
    copy:
      'Smooth leather, sandalwood and papyrus in a grounded, refined signature. Classic but modern — linger long after you leave.',
  },
];

const ShopPage = () => {
  return (
    <main className="min-h-screen pt-28 pb-20 bg-gradient-to-b from-white via-neutral-50 to-neutral-100">
      <section className="max-w-6xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="mb-14"
        >
          <p className="text-[11px] tracking-[0.32em] uppercase text-neutral-500 mb-4">
            The Ceeje Collection
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-playfair font-light text-neutral-900 leading-tight">
            Fragrances designed
            <br />
            to feel like a mood, not a trend.
          </h1>
          <p className="mt-5 max-w-2xl text-sm sm:text-base text-neutral-600">
            Each CEEJE mist is blended for real life — from quiet mornings to late‑night
            city light. Explore the collection and find the note that feels most like you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FRAGRANCES.map((frag, index) => (
            <motion.article
              key={frag.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="group relative overflow-hidden rounded-3xl bg-white/70 backdrop-blur-xl border border-white/70 shadow-[0_24px_80px_rgba(15,23,42,0.12)] p-5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl">{frag.emoji}</span>
                  <span className="text-[11px] tracking-[0.28em] uppercase text-neutral-500">
                    CEEJE extrait
                  </span>
                </div>
                <h2 className="text-lg tracking-[0.22em] uppercase text-neutral-900 mb-1">
                  {frag.name}
                </h2>
                <p className="text-[11px] text-neutral-500 mb-3">{frag.tags}</p>
                <p className="text-sm text-neutral-700 leading-relaxed">{frag.copy}</p>
              </div>

              <div className="mt-5 flex items-center justify-between border-t border-neutral-200/70 pt-3">
                <span className="text-xs text-neutral-500 tracking-[0.18em] uppercase">
                  Add to ritual
                </span>
                <button
                  type="button"
                  className="text-xs tracking-[0.2em] uppercase px-4 py-2 rounded-full border border-neutral-900/20 bg-neutral-900 text-white hover:bg-neutral-950 transition-colors"
                >
                  Shop
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </main>
  );
};

export default ShopPage;



