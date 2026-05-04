import { useTheme } from '../components/ThemeContext';
import { useLang } from '../components/LanguageContext';
import { CategoryLexiconLinks } from '../components/CategoryLexiconLinks';

export function NumerologyPage() {
  const { isDark } = useTheme();
  const { t } = useLang();

  const masterNumbers = [
    { number: '1', name: t('La Monade', 'The Monad'), meaning: t('Unité, commencement, source de tout', 'Unity, beginning, source of all'), color: 'var(--accent-purple)', bg: 'var(--surface-purple)' },
    { number: '3', name: t('La Triade', 'The Triad'), meaning: t('Trinité, création, manifestation', 'Trinity, creation, manifestation'), color: 'var(--accent-blue)', bg: 'var(--surface-blue)' },
    { number: '7', name: t('Le Mystique', 'The Mystic'), meaning: t('Perfection spirituelle, sagesse', 'Spiritual perfection, wisdom'), color: 'var(--accent-gold)', bg: 'var(--surface-gold)' },
    { number: '9', name: t("L'Accomplissement", 'The Completion'), meaning: t('Plénitude, amour universel', 'Fulfillment, universal love'), color: 'var(--accent-rose)', bg: 'var(--surface-rose)' },
    { number: '12', name: t('Ordre Cosmique', 'Cosmic Order'), meaning: t('Organisation divine, cycles', 'Divine organization, cycles'), color: 'var(--accent-mint)', bg: 'var(--surface-mint)' },
  ];

  const sequences = [
    {
      name: t('Suite de Fibonacci', 'Fibonacci Sequence'),
      description: t('La proportion divine de la nature', "Nature's divine proportion"),
      numbers: '0, 1, 1, 2, 3, 5, 8, 13...',
      color: 'var(--accent-gold)',
      bg: 'var(--surface-gold)',
    },
    {
      name: t('Nombres Sacrés', 'Sacred Numbers'),
      description: t('Nombres à signification spirituelle', 'Numbers with spiritual significance'),
      numbers: '3, 7, 12, 22, 33, 40',
      color: 'var(--accent-blue)',
      bg: 'var(--surface-blue)',
    },
    {
      name: t('Solides de Platon', 'Platonic Solids'),
      description: t('Formes géométriques parfaites', 'Perfect geometric forms'),
      numbers: t('4, 6, 8, 12, 20 faces', '4, 6, 8, 12, 20 faces'),
      color: 'var(--accent-mint)',
      bg: 'var(--surface-mint)',
    },
  ];

  return (
    <div className="pt-16 pb-8 px-6 lg:px-12">
      <div className="max-w-[1600px] mx-auto">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-20 pt-10 relative"
        >
          {/* Decorative numbers background */}
          <MouseParallax intensity={14} className="absolute top-4 right-0 lg:right-12 pointer-events-none">
            <div style={{ opacity: 0.025 }}>
              <svg width="240" height="180" viewBox="0 0 240 180" fill="none">
                <text x="10" y="65" fontSize="76" fontFamily="'Cormorant Garamond', serif" fontWeight="600" fill="currentColor">3·7·9</text>
                <text x="30" y="150" fontSize="52" fontFamily="'Cormorant Garamond', serif" fontWeight="300" fill="currentColor" opacity="0.7">\u03C6 = 1.618</text>
              </svg>
            </div>
          </MouseParallax>

          <MagneticElement intensity={0.15}>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6 relative cursor-pointer"
              style={{ backgroundColor: 'var(--surface-rose)' }}
              whileHover={{ scale: 1.15 }}
            >
              <InfinityIcon className="w-7 h-7" style={{ color: 'var(--accent-rose)' }} />
              <div className="absolute inset-0 rounded-full blur-2xl" style={{ backgroundColor: 'var(--accent-rose)', opacity: 0.12 }} />
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{ border: '1px solid var(--accent-rose)' }}
                animate={{ scale: [1, 1.6, 1.6], opacity: [0.3, 0, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeOut' }}
              />
            </motion.div>
          </MagneticElement>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xs uppercase tracking-[0.25em] mb-4"
            style={{ color: 'var(--accent-rose)', fontWeight: 500 }}
          >
            {t('Le Langage Cosmique', 'The Cosmic Language')}
          </motion.p>

          <h1 className="mb-6">{t('Numérologie', 'Numerology')}</h1>

          <p className="max-w-3xl" style={{ color: 'var(--muted-foreground)', lineHeight: 1.8 }}>
            {t(
              "Les nombres sont le langage universel du cosmos. De la philosophie pythagoricienne ancienne à la géométrie sacrée moderne, la numérologie révèle les motifs mathématiques cachés qui structurent la réalité elle-même.",
              'Numbers are the universal language of the cosmos. From ancient Pythagorean philosophy to modern sacred geometry, numerology reveals the hidden mathematical patterns that structure reality itself.'
            )}
          </p>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-8 h-px max-w-[200px] origin-left"
            style={{ background: 'linear-gradient(90deg, var(--accent-rose), transparent)' }}
          />
        </motion.div>

        {/* Master Numbers Grid */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <h3>{t('Nombres Sacrés', 'Sacred Numbers')}</h3>
            <div className="h-px flex-1" style={{ backgroundColor: 'var(--border)' }} />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {masterNumbers.map((num, index) => (
              <BentoCard
                key={num.number}
                className="aspect-square cursor-pointer"
                style={{ backgroundColor: num.bg }}
                glowColor={num.color.replace('var(--accent-', 'var(--glow-').replace(')', ')')}
                accentBorder={num.color}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06 }}
                  className="h-full flex flex-col items-center justify-center text-center"
                >
                  <motion.div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-3 relative"
                    style={{ backgroundColor: num.color, opacity: 0.1 }}
                    whileHover={{ scale: 1.1, rotate: 15 }}
                    transition={{ duration: 0.4 }}
                  >
                    <span
                      style={{
                        fontSize: '1.75rem',
                        fontWeight: 700,
                        color: num.color,
                        fontFamily: "'Cormorant Garamond', serif",
                      }}
                    >
                      {num.number}
                    </span>
                  </motion.div>
                  <h5 className="text-sm mb-1.5" style={{ fontWeight: 600 }}>
                    {num.name}
                  </h5>
                  <p className="text-xs" style={{ color: 'var(--muted-foreground)', lineHeight: 1.5 }}>
                    {num.meaning}
                  </p>
                </motion.div>
              </BentoCard>
            ))}
          </div>
        </div>

        <SectionDivider color="var(--accent-rose)" symbol="star" />

        {/* Pythagoras Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-8">
          <BentoCard
            className="lg:col-span-2 min-h-[440px]"
            style={{ backgroundColor: 'var(--surface-purple)' }}
            glowColor="var(--glow-purple)"
            decorative="fibonacci"
            accentBorder="var(--accent-purple)"
          >
            <div className="h-full flex flex-col">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'var(--accent-purple)', opacity: 0.12 }}>
                  <Hash className="w-5 h-5" style={{ color: 'var(--accent-purple)' }} />
                </div>
                <span className="text-xs uppercase tracking-[0.15em]" style={{ color: 'var(--accent-purple)', fontWeight: 500 }}>
                  {t('Sagesse Pythagoricienne', 'Pythagorean Wisdom')}
                </span>
              </div>

              <h2 className="mb-6" style={{ fontStyle: 'italic' }}>
                {t('"Tout est Nombre"', '"All is Number"')}
              </h2>

              <p className="mb-8" style={{ color: 'var(--foreground)', lineHeight: 1.8 }}>
                {t(
                  "Pythagore enseignait que les nombres sont la réalité ultime, plus fondamentaux que la matière physique. Chaque nombre porte des qualités et des vibrations spécifiques qui influencent le monde autour de nous.",
                  'Pythagoras taught that numbers are the ultimate reality, more fundamental than physical matter. Each number carries specific qualities and vibrations that influence the world around us.'
                )}
              </p>

              <div className="grid grid-cols-2 gap-4 mt-auto">
                {[
                  { label: t('Nombres Pairs', 'Even Numbers'), value: t('Féminin, réceptif', 'Feminine, receptive') },
                  { label: t('Nombres Impairs', 'Odd Numbers'), value: t('Masculin, actif', 'Masculine, active') },
                  { label: t('Nombres Premiers', 'Prime Numbers'), value: t('Pur, indivisible', 'Pure, indivisible') },
                  { label: t('Nombres Parfaits', 'Perfect Numbers'), value: t('Équilibré, complet', 'Balanced, complete') },
                ].map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 }}
                    className="p-4 rounded-xl"
                    style={{
                      backgroundColor: isDark ? 'rgba(155, 142, 230, 0.08)' : 'white',
                      border: '1px solid var(--border-subtle)',
                    }}
                  >
                    <div className="text-xs mb-1" style={{ color: 'var(--accent-purple)', fontWeight: 600 }}>
                      {item.label}
                    </div>
                    <div className="text-sm" style={{ color: 'var(--foreground)' }}>
                      {item.value}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </BentoCard>

          <BentoCard className="min-h-[440px]" decorative="lines" glowColor="var(--glow-gold)" accentBorder="var(--accent-gold)">
            <h4 className="mb-4">{t('La Tétractys', 'The Tetractys')}</h4>
            <p className="text-sm mb-8" style={{ color: 'var(--muted-foreground)', lineHeight: 1.7 }}>
              {t(
                "La figure triangulaire sacrée de dix points, représentant l'organisation de l'espace et l'harmonie cosmique.",
                'The sacred triangular figure of ten points, representing the organization of space and cosmic harmony.'
              )}
            </p>

            <div className="flex flex-col items-center gap-3 mb-8">
              {[1, 2, 3, 4].map((row) => (
                <div key={row} className="flex gap-3">
                  {Array.from({ length: row }).map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: (row - 1) * 0.1 + i * 0.05, type: 'spring' }}
                      className="w-5 h-5 rounded-full"
                      style={{ backgroundColor: 'var(--accent-gold)' }}
                    />
                  ))}
                </div>
              ))}
            </div>

            <div className="text-center pt-4" style={{ borderTop: '1px solid var(--border-subtle)' }}>
              <div
                className="mb-2"
                style={{
                  fontSize: '1.75rem',
                  fontWeight: 700,
                  color: 'var(--accent-gold)',
                  fontFamily: "'Cormorant Garamond', serif",
                }}
              >
                1 + 2 + 3 + 4 = 10
              </div>
              <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
                {t(
                  'La somme des quatre premiers nombres égale la perfection',
                  'The sum of the first four numbers equals perfection'
                )}
              </p>
            </div>
          </BentoCard>
        </div>

        <SectionDivider color="var(--accent-gold)" symbol="diamond" />

        {/* Number Sequences */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <h3>{t('Séquences Sacrées', 'Sacred Sequences')}</h3>
            <div className="h-px flex-1" style={{ backgroundColor: 'var(--border)' }} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {sequences.map((sequence, index) => (
              <BentoCard
                key={sequence.name}
                className="min-h-[240px] cursor-pointer"
                style={{ backgroundColor: sequence.bg }}
                glowColor={sequence.color.replace('var(--accent-', 'var(--glow-').replace(')', ')')}
                decorative={(['circle', 'dots', 'lines'] as const)[index]}
                accentBorder={sequence.color}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="h-full flex flex-col"
                >
                  <h5 className="mb-3" style={{ fontWeight: 600 }}>
                    {sequence.name}
                  </h5>
                  <p className="text-sm mb-4" style={{ color: 'var(--muted-foreground)' }}>
                    {sequence.description}
                  </p>
                  <div
                    className="mt-auto p-4 rounded-xl text-sm"
                    style={{
                      backgroundColor: isDark ? 'rgba(155, 142, 230, 0.06)' : 'white',
                      border: '1px solid var(--border-subtle)',
                      color: 'var(--foreground)',
                      fontFamily: "'Cormorant Garamond', serif",
                      fontWeight: 600,
                      letterSpacing: '0.05em',
                    }}
                  >
                    {sequence.numbers}
                  </div>
                </motion.div>
              </BentoCard>
            ))}
          </div>
        </div>

        {/* Quote */}
        <BentoCard
          className="mb-6"
          style={{ background: 'linear-gradient(135deg, var(--surface-rose) 0%, var(--surface-purple) 100%)' }}
          decorative="fibonacci"
          glowColor="var(--glow-rose)"
        >
          <div className="py-8 text-center max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="h-px w-12" style={{ background: 'linear-gradient(90deg, transparent, var(--accent-rose))', opacity: 0.2 }} />
              <InfinityIcon className="w-4 h-4" style={{ color: 'var(--accent-rose)', opacity: 0.3 }} />
              <div className="h-px w-12" style={{ background: 'linear-gradient(90deg, var(--accent-rose), transparent)', opacity: 0.2 }} />
            </div>
            <p
              className="text-xl md:text-2xl mb-4"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', lineHeight: 1.6, color: 'var(--foreground)' }}
            >
              {t(
                '"Les nombres gouvernent l\'univers."',
                '"Numbers rule the universe."'
              )}
            </p>
            <span className="text-xs uppercase tracking-[0.2em]" style={{ color: 'var(--muted-foreground)', fontWeight: 500 }}>
              {t('Pythagore', 'Pythagoras')}
            </span>
          </div>
        </BentoCard>

        {/* Category Lexicon Links */}
        <CategoryLexiconLinks category="numerology" />
      </div>
    </div>
  );
}