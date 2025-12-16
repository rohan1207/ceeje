import { motion } from 'framer-motion';

const PAIRINGS = [
  {
    title: 'Soft focus skin',
    combo: 'Pion + Gulabi Hue',
    copy:
      'Layer Pion as a base for clean peony freshness, then mist Gulabi Hue on pulse points. The result is a luminous rose cloud that feels polished but never heavy.',
  },
  {
    title: 'Sun‑charged days',
    combo: 'Boshonto + Meyve',
    copy:
      'Start with Boshonto for tangerine brightness, then add a veil of Meyve to amplify the juicy, playful edge. Ideal for weekends, festivals and summer city walks.',
  },
  {
    title: 'Slow‑burn nights',
    combo: 'Mishti + Boner',
    copy:
      'Anchor your scent with Boner’s smooth leather and woods, then mist Mishti lightly over the top. Warm, dimensional and quietly intense.',
  },
];

const MixologyPage = () => {
  return (
    <main className="min-h-screen pt-28 pb-20 bg-gradient-to-b from-neutral-900 via-neutral-950 to-black text-amber-50">
      <section className="max-w-5xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="text-[11px] tracking-[0.32em] uppercase text-amber-200/70 mb-3">
            CEEJE Mixology Studio
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-playfair font-light leading-tight">
            Blend two mists.
            <br />
            Create your own atmosphere.
          </h1>
          <p className="mt-4 text-sm sm:text-base text-amber-100/80 max-w-2xl">
            Every CEEJE fragrance is built to stand alone — but they&apos;re also tuned
            to layer. Try these house‑curated pairings as a starting point, then experiment
            to write your own signature.
          </p>
        </motion.div>

        <div className="space-y-8">
          {PAIRINGS.map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              className="rounded-3xl bg-white/5 border border-amber-50/15 px-6 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
            >
              <div>
                <p className="text-xs tracking-[0.26em] uppercase text-amber-200/80 mb-1">
                  {item.title}
                </p>
                <p className="text-sm font-playfair text-amber-50 mb-2">
                  {item.combo}
                </p>
                <p className="text-xs sm:text-sm text-amber-100/85 leading-relaxed">
                  {item.copy}
                </p>
              </div>
              <div className="flex gap-3 sm:flex-col items-end sm:items-end text-[11px] text-amber-100/70">
                <span className="px-3 py-1 rounded-full border border-amber-50/30">
                  Mist 1: wrists, neck
                </span>
                <span className="px-3 py-1 rounded-full border border-amber-50/15">
                  Mist 2: hair, scarf, coat
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </main>
  );
};

export default MixologyPage;



