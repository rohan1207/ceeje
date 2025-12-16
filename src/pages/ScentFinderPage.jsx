import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';

const moods = ['Confident', 'Fresh & Light', 'Warm & Cozy', 'Romantic', 'Energetic'];
const scentTypes = ['Floral', 'Citrus', 'Sweet', 'Woody', 'Musky', 'Spicy'];
const occasions = [
  'Daytime wear',
  'Night-out',
  'Summer freshness',
  'Winter warmth',
  'Everyday signature scent',
  'Festivals / Events',
];

const mappings = {
  mood: {
    Confident: ['mishti', 'boner', 'meyve'],
    'Fresh & Light': ['boshonto', 'pion', 'meyve'],
    'Warm & Cozy': ['mishti', 'boner', 'gulabi'],
    Romantic: ['gulabi', 'pion', 'boshonto'],
    Energetic: ['meyve', 'boshonto'],
  },
  type: {
    Floral: ['gulabi', 'pion', 'boshonto'],
    Citrus: ['boshonto', 'meyve'],
    Sweet: ['mishti', 'pion'],
    Woody: ['boner', 'mishti', 'gulabi'],
    Musky: ['boshonto', 'gulabi'],
    Spicy: ['mishti', 'boner'],
  },
  occasion: {
    'Daytime wear': ['boshonto', 'pion', 'meyve'],
    'Night-out': ['mishti', 'boner', 'gulabi'],
    'Summer freshness': ['boshonto', 'meyve'],
    'Winter warmth': ['mishti', 'boner', 'gulabi'],
    'Everyday signature scent': ['pion', 'boshonto', 'meyve'],
    'Festivals / Events': ['mishti', 'boner'],
  },
};

const SCENTS = {
  pion: {
    name: 'PION',
    line: 'Soft • Clean • Feminine',
    copy:
      'A soft peony breeze with a hint of spicy carnation and a crisp apple glow. Delicate, confident, and perfect for feeling put‑together without effort.',
    emoji: '🌸',
  },
  boshonto: {
    name: 'BOSHONTO',
    line: 'Fresh • Uplifting • Easy',
    copy:
      'Bright tangerine, airy lily and soft musk. Feels like clean skin after a long shower — ideal for everyday, travel, and warm days.',
    emoji: '🍊',
  },
  meyve: {
    name: 'MEYVE',
    line: 'Fruity • Radiant • Playful',
    copy:
      'Juicy fruits, zesty bergamot and warm amber. Made for spontaneous plans, rooftop evenings and every moment that should feel like a good day.',
    emoji: '💫',
  },
  mishti: {
    name: 'MISHTI',
    line: 'Warm • Sweet • Bold',
    copy:
      'Rich saffron, smoky oud and caramel sugarcane. Quietly powerful, built for nights out, winter layers and moments where you want to leave a trail.',
    emoji: '🔥',
  },
  gulabi: {
    name: 'GULABI HUE',
    line: 'Rosy • Elegant • Timeless',
    copy:
      'Fresh rose, cedar and labdanum for a polished, modern floral. Think celebrations, weddings and every version of your grown‑woman energy.',
    emoji: '🌹',
  },
  boner: {
    name: 'BONER',
    line: 'Woody • Leather • Smooth',
    copy:
      'Smooth leather, sandalwood and papyrus in a grounded, refined signature. Tailored fits, late dinners and dimly lit rooms suit it best.',
    emoji: '🍃',
  },
};

const ScentFinderPage = () => {
  const [selectedMood, setSelectedMood] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedOccasion, setSelectedOccasion] = useState('');

  const results = useMemo(() => {
    if (!selectedMood || !selectedType || !selectedOccasion) return [];
    const moodList = mappings.mood[selectedMood] || [];
    const typeList = mappings.type[selectedType] || [];
    const occasionList = mappings.occasion[selectedOccasion] || [];
    const intersection = moodList.filter(
      (id) => typeList.includes(id) && occasionList.includes(id)
    );
    return intersection;
  }, [selectedMood, selectedType, selectedOccasion]);

  const primary = results[0];
  const secondary = results[1];

  return (
    <main className="min-h-screen pt-28 pb-20 bg-gradient-to-b from-white via-neutral-50 to-neutral-100">
      <section className="max-w-5xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <p className="text-[11px] tracking-[0.32em] uppercase text-neutral-500 mb-3">
            CEEJE Scent Finder
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-playfair font-light text-neutral-900 leading-tight">
            Tell us how you want to feel.
            <br />
            We&apos;ll suggest your mist.
          </h1>
          <p className="mt-4 text-sm sm:text-base text-neutral-600 max-w-2xl">
            Answer three quick questions. We map your mood, scent style and occasion to
            the fragrances that match — no algorithms, just thoughtful perfumery logic.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] gap-10 items-start">
          {/* Quiz */}
          <div className="space-y-8">
            <QuestionBlock
              label="For my mood, I want to feel..."
              options={moods}
              selected={selectedMood}
              onSelect={setSelectedMood}
            />
            <QuestionBlock
              label="I’m looking for a scent that is..."
              options={scentTypes}
              selected={selectedType}
              onSelect={setSelectedType}
            />
            <QuestionBlock
              label="For..."
              options={occasions}
              selected={selectedOccasion}
              onSelect={setSelectedOccasion}
              compact
            />
          </div>

          {/* Results */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white/80 backdrop-blur-xl rounded-3xl border border-white/70 shadow-[0_24px_80px_rgba(15,23,42,0.12)] p-6 space-y-5"
          >
            <p className="text-[11px] tracking-[0.26em] uppercase text-neutral-500">
              Your CEEJE Match
            </p>

            {!primary && (
              <p className="text-sm text-neutral-600">
                Choose one option in each row to see your scent match. You can tap around
                to explore different moods and occasions — we&apos;ll update your
                recommendation instantly.
              </p>
            )}

            {primary && (
              <div className="space-y-4">
                <PrimaryResult id={primary} />
                {secondary && (
                  <div className="pt-4 border-t border-neutral-200/80">
                    <p className="text-[11px] tracking-[0.22em] uppercase text-neutral-500 mb-2">
                      Alternative to explore
                    </p>
                    <SecondaryResult id={secondary} />
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </main>
  );
};

const QuestionBlock = ({ label, options, selected, onSelect, compact }) => (
  <div className="space-y-3">
    <p className="text-xs tracking-[0.24em] uppercase text-neutral-500">{label}</p>
    <div className="flex flex-wrap gap-2.5">
      {options.map((option) => {
        const isActive = selected === option;
        return (
          <button
            key={option}
            type="button"
            onClick={() => onSelect(option)}
            className={`px-4 py-2 rounded-full border text-xs sm:text-[13px] transition-all ${
              isActive
                ? 'bg-neutral-900 text-white border-neutral-900 shadow-sm'
                : 'bg-white/80 text-neutral-800 border-neutral-200 hover:border-neutral-400'
            } ${compact ? 'whitespace-nowrap' : ''}`}
          >
            {option}
          </button>
        );
      })}
    </div>
  </div>
);

const PrimaryResult = ({ id }) => {
  const scent = SCENTS[id];
  if (!scent) return null;
  return (
    <div className="rounded-2xl bg-neutral-900 text-amber-50 px-5 py-4 shadow-[0_20px_60px_rgba(15,23,42,0.5)]">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-xl">{scent.emoji}</span>
          <h2 className="text-sm tracking-[0.28em] uppercase">{scent.name}</h2>
        </div>
        <span className="text-[11px] text-amber-100/80">{scent.line}</span>
      </div>
      <p className="text-xs text-amber-50/90 leading-relaxed">{scent.copy}</p>
    </div>
  );
};

const SecondaryResult = ({ id }) => {
  const scent = SCENTS[id];
  if (!scent) return null;
  return (
    <div className="rounded-2xl bg-white/90 px-4 py-3 border border-neutral-200">
      <div className="flex items-center gap-2 mb-1">
        <span>{scent.emoji}</span>
        <p className="text-[11px] tracking-[0.24em] uppercase text-neutral-900">
          {scent.name}
        </p>
      </div>
      <p className="text-[11px] text-neutral-600 leading-relaxed">{scent.copy}</p>
    </div>
  );
};

export default ScentFinderPage;



