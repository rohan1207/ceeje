import { motion } from 'framer-motion';

const ContactPage = () => {
  return (
    <main className="min-h-screen pt-28 pb-20 bg-gradient-to-b from-white via-neutral-50 to-neutral-100">
      <section className="max-w-4xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <p className="text-[11px] tracking-[0.32em] uppercase text-neutral-500 mb-3">
            Connect with CEEJE
          </p>
          <h1 className="text-3xl sm:text-4xl font-playfair font-light text-neutral-900 leading-tight">
            Questions, collaborations
            <br />
            or custom scent work.
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white/80 backdrop-blur-xl border border-white/70 rounded-3xl shadow-[0_20px_70px_rgba(15,23,42,0.12)] p-6 sm:p-8 space-y-6"
        >
          <div>
            <p className="text-xs tracking-[0.22em] uppercase text-neutral-500 mb-2">
              Email
            </p>
            <a
              href="mailto:hello@ceeje.studio"
              className="text-sm sm:text-base text-neutral-900 underline underline-offset-4 decoration-neutral-400 hover:decoration-neutral-800"
            >
              hello@ceeje.studio
            </a>
          </div>

          <div>
            <p className="text-xs tracking-[0.22em] uppercase text-neutral-500 mb-2">
              Press & partnerships
            </p>
            <p className="text-sm text-neutral-600">
              For media requests, sampling opportunities or retail placement, reach out
              with your concept and timelines. We respond within 2–3 business days.
            </p>
          </div>
        </motion.div>
      </section>
    </main>
  );
};

export default ContactPage;



