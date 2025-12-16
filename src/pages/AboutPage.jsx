import { motion } from 'framer-motion';

const AboutPage = () => {
  return (
    <main className="min-h-screen pt-28 pb-20 bg-gradient-to-b from-white via-neutral-50 to-neutral-100">
      <section className="max-w-5xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="mb-10"
        >
          <p className="text-[11px] tracking-[0.32em] uppercase text-neutral-500 mb-3">
            About CEEJE
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-playfair font-light text-neutral-900 leading-tight">
            A modern perfume house
            <br />
            for people who like quiet luxury.
          </h1>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-sm sm:text-base text-neutral-600 leading-relaxed"
          >
            CEEJE was created for people who care about how a room feels the moment they
            enter it — and the trace they leave behind. We blend extrait‑strength mists
            in small batches, working with perfumers who think in moods, not marketing
            buzzwords.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-sm sm:text-base text-neutral-600 leading-relaxed"
          >
            Every formula starts with skin feel — airy, breathable, never cloying — then
            builds complexity through layered notes that reveal themselves slowly. We
            believe your scent should feel like good tailoring: sharp when noticed, but
            so natural you forget you put it on.
          </motion.p>
        </div>
      </section>
    </main>
  );
};

export default AboutPage;



