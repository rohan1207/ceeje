import { motion } from 'framer-motion';

const FragrancePage = () => {
  return (
    <main className="min-h-screen pt-28 pb-20 bg-gradient-to-b from-neutral-900 via-neutral-950 to-black text-amber-50">
      <section className="max-w-6xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="mb-16"
        >
          <p className="text-[11px] tracking-[0.32em] uppercase text-amber-200/70 mb-4">
            Fragrance Stories
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-playfair font-light leading-tight">
            Six moods.
            <br />
            One house of scent.
          </h1>
          <p className="mt-5 max-w-2xl text-sm sm:text-base text-amber-100/80">
            The CEEJE library is built like a wardrobe — soft, fresh, warm, bold. Read
            each story and imagine where you would wear it, who you would be in it, and
            how you want to be remembered.
          </p>
        </motion.div>

        <div className="space-y-10">
          {/* PION */}
          <motion.article
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="grid md:grid-cols-[minmax(0,0.65fr)_minmax(0,1fr)] gap-6 md:gap-10 items-start"
          >
            <div className="rounded-[32px] bg-gradient-to-br from-amber-50/10 via-amber-100/5 to-transparent border border-amber-50/20 px-5 py-4">
              <p className="text-sm tracking-[0.3em] uppercase text-amber-100/80 mb-1">
                🌸 Pion
              </p>
              <p className="text-xs text-amber-100/70 mb-3">Soft • Clean • Feminine</p>
              <p className="text-sm leading-relaxed text-amber-50/90">
                A soft peony breeze with a hint of spicy carnation and a crisp apple
                glow. Light, feminine and effortlessly refreshing — the kind of scent
                that makes you feel put‑together without trying. Delicate but confident,
                Pion is your “I feel like myself today” mist.
              </p>
            </div>
            <div className="text-xs text-amber-100/70 leading-relaxed">
              Wear Pion when you want your presence to whisper, not shout — studio days,
              late‑morning coffee, first meetings, and quiet celebrations that still feel
              important.
            </div>
          </motion.article>

          {/* BOSHONTO */}
          <motion.article
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="grid md:grid-cols-[minmax(0,0.65fr)_minmax(0,1fr)] gap-6 md:gap-10 items-start"
          >
            <div className="rounded-[32px] bg-gradient-to-br from-orange-50/10 via-amber-100/5 to-transparent border border-amber-50/20 px-5 py-4">
              <p className="text-sm tracking-[0.3em] uppercase text-amber-100/80 mb-1">
                🍊 Boshonto
              </p>
              <p className="text-xs text-amber-100/70 mb-3">Fresh • Uplifting • Easy</p>
              <p className="text-sm leading-relaxed text-amber-50/90">
                Bright tangerine, airy lily and soft musk come together in a clean,
                refreshing scent you can wear every day. Warm, uplifting and naturally
                magnetic — Boshonto feels like fresh energy on your skin. Your go‑to mist
                for feeling light, easy and instantly renewed.
              </p>
            </div>
            <div className="text-xs text-amber-100/70 leading-relaxed">
              Choose Boshonto on travel days, long brunches, or anytime you need a reset.
              It’s sunshine through sheer curtains — bottled.
            </div>
          </motion.article>

          {/* MEYVE */}
          <motion.article
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="grid md:grid-cols-[minmax(0,0.65fr)_minmax(0,1fr)] gap-6 md:gap-10 items-start"
          >
            <div className="rounded-[32px] bg-gradient-to-br from-pink-50/10 via-fuchsia-100/5 to-transparent border border-amber-50/20 px-5 py-4">
              <p className="text-sm tracking-[0.3em] uppercase text-amber-100/80 mb-1">
                💫 Meyve
              </p>
              <p className="text-xs text-amber-100/70 mb-3">Fruity • Radiant • Playful</p>
              <p className="text-sm leading-relaxed text-amber-50/90">
                Juicy fruits, zesty bergamot and a warm amber base create a mist that
                feels joyful from the first spritz. Bright, sweet and effortlessly
                mood‑lifting — Meyve smells like a good day waiting to happen. The scent
                that makes people say, “What are you wearing?”
              </p>
            </div>
            <div className="text-xs text-amber-100/70 leading-relaxed">
              Reach for Meyve on spontaneous nights, rooftop evenings, or whenever you
              want your energy to enter the room a moment before you do.
            </div>
          </motion.article>

          {/* MISHTI */}
          <motion.article
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="grid md:grid-cols-[minmax(0,0.65fr)_minmax(0,1fr)] gap-6 md:gap-10 items-start"
          >
            <div className="rounded-[32px] bg-gradient-to-br from-amber-900/20 via-amber-800/10 to-transparent border border-amber-500/40 px-5 py-4">
              <p className="text-sm tracking-[0.3em] uppercase text-amber-100/80 mb-1">
                🔥 Mishti
              </p>
              <p className="text-xs text-amber-100/70 mb-3">Warm • Sweet • Bold</p>
              <p className="text-sm leading-relaxed text-amber-50/90">
                Rich saffron, smoky oud and caramel‑like sugarcane blend into a warm,
                deep fragrance with a soft sweetness. Bold but comforting, Mishti feels
                like quiet confidence — the scent you reach for when you want to stand
                out without trying.
              </p>
            </div>
            <div className="text-xs text-amber-100/70 leading-relaxed">
              Perfect for winter nights, late dinners, date energy and every moment where
              you want your presence to feel like a slow burn.
            </div>
          </motion.article>

          {/* GULABI HUE */}
          <motion.article
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="grid md:grid-cols-[minmax(0,0.65fr)_minmax(0,1fr)] gap-6 md:gap-10 items-start"
          >
            <div className="rounded-[32px] bg-gradient-to-br from-rose-50/10 via-rose-100/5 to-transparent border border-amber-50/20 px-5 py-4">
              <p className="text-sm tracking-[0.3em] uppercase text-amber-100/80 mb-1">
                🌹 Gulabi Hue
              </p>
              <p className="text-xs text-amber-100/70 mb-3">
                Rosy • Elegant • Timeless
              </p>
              <p className="text-sm leading-relaxed text-amber-50/90">
                Fresh rose wrapped in cedar and labdanum creates a soft, modern floral
                with depth. Feminine, elegant and beautifully balanced — Gulabi Hue feels
                like your polished, grown‑woman energy. A scent that stays gentle but
                unforgettable.
              </p>
            </div>
            <div className="text-xs text-amber-100/70 leading-relaxed">
              Keep Gulabi Hue for celebrations, weddings, anniversaries and quiet luxury
              moments where you want flowers, but never cliché.
            </div>
          </motion.article>

          {/* BONER */}
          <motion.article
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="grid md:grid-cols-[minmax(0,0.65fr)_minmax(0,1fr)] gap-6 md:gap-10 items-start"
          >
            <div className="rounded-[32px] bg-gradient-to-br from-stone-900/30 via-stone-800/10 to-transparent border border-amber-50/20 px-5 py-4">
              <p className="text-sm tracking-[0.3em] uppercase text-amber-100/80 mb-1">
                🍃 Boner
              </p>
              <p className="text-xs text-amber-100/70 mb-3">
                Woody • Leather • Smooth
              </p>
              <p className="text-sm leading-relaxed text-amber-50/90">
                Smooth leather, sandalwood and papyrus meet in a warm, refined scent
                that&apos;s both bold and easy to wear. Classic but modern — Boner feels
                grounded, confident and quietly irresistible. The kind of fragrance that
                lingers long after you leave the room.
              </p>
            </div>
            <div className="text-xs text-amber-100/70 leading-relaxed">
              Reach for Boner when the dress code is tailored and the mood is dimly lit:
              gallery openings, rooftop bars, late‑night drives and every decisive
              moment.
            </div>
          </motion.article>
        </div>
      </section>
    </main>
  );
};

export default FragrancePage;



