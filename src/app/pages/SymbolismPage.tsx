import { BentoCard } from '../components/BentoCard';
import { SectionDivider } from '../components/SectionDivider';
import { MouseParallax, MagneticElement } from '../components/FloatingElements';
import { motion } from 'motion/react';
import { Eye, Moon, Sun, Star, Circle, Triangle, Heart, ArrowRight } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { useLang } from '../components/LanguageContext';
import { useTheme } from '../components/ThemeContext';
import { CategoryLexiconLinks } from '../components/CategoryLexiconLinks';

export function SymbolismPage() {
  const { t } = useLang();
  const { isDark } = useTheme();

  const archetypes = [
    { icon: Eye, name: t("L'Œil", 'The Eye'), color: 'var(--accent-blue)', bg: 'var(--surface-blue)', description: t("Omniscience, conscience et vision intérieure — l'œil qui voit au-delà des apparences", 'Omniscience, consciousness and inner vision — the eye that sees beyond appearances'), symbol: '◉' },
    { icon: Moon, name: t('La Lune', 'The Moon'), color: 'var(--accent-purple)', bg: 'var(--surface-purple)', description: t("Cycles, intuition et mystère — le miroir de la lumière solaire dans l'obscurité", 'Cycles, intuition and mystery — the mirror of sunlight in darkness'), symbol: '☽' },
    { icon: Sun, name: t('Le Soleil', 'The Sun'), color: 'var(--accent-gold)', bg: 'var(--surface-gold)', description: t("Illumination, vitalité et vérité — la source de toute lumière et conscience", 'Illumination, vitality and truth — the source of all light and consciousness'), symbol: '☉' },
    { icon: Star, name: t("L'Étoile", 'The Star'), color: 'var(--accent-rose)', bg: 'var(--surface-rose)', description: t("Espoir, guidance et destinée — les points fixes du cosmos qui orientent les voyageurs", 'Hope, guidance and destiny — the fixed points of the cosmos that guide travelers'), symbol: '✦' },
  ];

  const dualities = [
    {
      title: t('Lumière & Ombre', 'Light & Shadow'),
      description: t(
        "Toute lumière projette une ombre — le symbolisme enseigne que l'un ne peut exister sans l'autre, et que la sagesse naît de leur intégration.",
        'Every light casts a shadow — symbolism teaches that one cannot exist without the other, and wisdom is born from their integration.'
      ),
      concepts: [t('Dualité', 'Duality'), t('Intégration', 'Integration'), t('Équilibre', 'Balance')],
      color: 'var(--accent-gold)',
      bg: 'var(--surface-gold)',
    },
    {
      title: t('Masculin & Féminin', 'Masculine & Feminine'),
      description: t(
        "Au-delà du genre, ces polarités représentent l'action et la réceptivité, la force et la douceur — des énergies complémentaires présentes en chaque être.",
        'Beyond gender, these polarities represent action and receptivity, strength and gentleness — complementary energies present in every being.'
      ),
      concepts: ['Anima', 'Animus', t('Hiérogamie', 'Hierogamy')],
      color: 'var(--accent-purple)',
      bg: 'var(--surface-purple)',
    },
    {
      title: t('Mort & Renaissance', 'Death & Rebirth'),
      description: t(
        "Le cycle éternel de transformation — le phénix qui renaît de ses cendres, le serpent qui mue, la graine qui doit mourir pour devenir arbre.",
        'The eternal cycle of transformation — the phoenix reborn from its ashes, the snake that sheds its skin, the seed that must die to become a tree.'
      ),
      concepts: [t('Ouroboros', 'Ouroboros'), t('Phénix', 'Phoenix'), t('Résurrection', 'Resurrection')],
      color: 'var(--accent-rose)',
      bg: 'var(--surface-rose)',
    },
  ];

  const universalSymbols = [
    { name: t('Le Cercle', 'The Circle'), meaning: t('Éternité, perfection, totalité', 'Eternity, perfection, wholeness'), icon: Circle },
    { name: t('Le Triangle', 'The Triangle'), meaning: t('Trinité, ascension, manifestation', 'Trinity, ascension, manifestation'), icon: Triangle },
    { name: t('Le Cœur', 'The Heart'), meaning: t('Amour, centre spirituel, courage', 'Love, spiritual center, courage'), icon: Heart },
    { name: t("L'Étoile", 'The Star'), meaning: t('Guidance divine, espoir, illumination', 'Divine guidance, hope, illumination'), icon: Star },
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
          {/* Decorative symbol */}
          <MouseParallax intensity={18} className="absolute top-4 right-0 lg:right-12 pointer-events-none">
            <div style={{ opacity: 0.035 }}>
              <motion.svg
                width="240" height="240" viewBox="0 0 240 240" fill="none"
                animate={{ rotate: 360 }}
                transition={{ duration: 120, repeat: Number.POSITIVE_INFINITY, ease: 'linear' }}
              >
                <circle cx="120" cy="120" r="110" stroke="currentColor" strokeWidth="0.6" />
                <circle cx="120" cy="120" r="70" stroke="currentColor" strokeWidth="0.4" />
                <circle cx="120" cy="120" r="30" stroke="currentColor" strokeWidth="0.3" />
                <line x1="120" y1="10" x2="120" y2="230" stroke="currentColor" strokeWidth="0.3" />
                <line x1="10" y1="120" x2="230" y2="120" stroke="currentColor" strokeWidth="0.3" />
                <circle cx="120" cy="120" r="4" fill="currentColor" opacity="0.3" />
              </motion.svg>
            </div>
          </MouseParallax>

          <MagneticElement intensity={0.15}>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6 relative cursor-pointer"
              style={{ backgroundColor: 'var(--surface-blue)' }}
              whileHover={{ scale: 1.15 }}
            >
              <Eye className="w-7 h-7" style={{ color: 'var(--accent-blue)' }} />
              <div className="absolute inset-0 rounded-full blur-2xl" style={{ backgroundColor: 'var(--accent-blue)', opacity: 0.12 }} />
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{ border: '1px solid var(--accent-blue)' }}
                animate={{ scale: [1, 1.6, 1.6], opacity: [0.3, 0, 0] }}
                transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY, ease: 'easeOut' }}
              />
            </motion.div>
          </MagneticElement>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xs uppercase tracking-[0.25em] mb-4"
            style={{ color: 'var(--accent-blue)', fontWeight: 500 }}
          >
            {t('Le Langage de l\'Invisible', 'The Language of the Invisible')}
          </motion.p>

          <h1 className="mb-6">{t('Symbolisme', 'Symbolism')}</h1>

          <p className="max-w-3xl" style={{ color: 'var(--muted-foreground)', lineHeight: 1.8 }}>
            {t(
              "L'étude des symboles révèle le langage universel de l'humanité — un code ancien qui transcende les cultures, les époques et les langues pour toucher directement l'inconscient collectif.",
              'The study of symbols reveals the universal language of humanity — an ancient code that transcends cultures, eras and languages to touch directly upon the collective unconscious.'
            )}
          </p>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-8 h-px max-w-[200px] origin-left"
            style={{ background: 'linear-gradient(90deg, var(--accent-blue), transparent)' }}
          />
        </motion.div>

        {/* Archetypes Grid */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <h3>{t('Symboles Archétypaux', 'Archetypal Symbols')}</h3>
            <div className="h-px flex-1" style={{ backgroundColor: 'var(--border)' }} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {archetypes.map((archetype, index) => (
              <BentoCard
                key={archetype.name}
                className="min-h-[280px] cursor-pointer"
                style={{ backgroundColor: archetype.bg }}
                glowColor={archetype.color.replace('var(--accent-', 'var(--glow-').replace(')', ')')}
                decorative={(['dots', 'lines', 'vesica', 'fibonacci'] as const)[index]}
                accentBorder={archetype.color}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="h-full flex flex-col"
                >
                  <div className="flex items-center justify-between mb-5">
                    <MagneticElement intensity={0.25}>
                      <motion.div
                        className="inline-flex p-3 rounded-xl"
                        style={{ backgroundColor: archetype.color, opacity: 0.12 }}
                        whileHover={{ scale: 1.15, rotate: 10 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      >
                        <archetype.icon className="w-6 h-6" style={{ color: archetype.color }} />
                      </motion.div>
                    </MagneticElement>
                    <motion.span
                      className="text-3xl"
                      style={{ opacity: 0.15, fontFamily: 'serif' }}
                      animate={{ rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 8, delay: index * 0.5, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
                    >
                      {archetype.symbol}
                    </motion.span>
                  </div>
                  <h4 className="mb-2">{archetype.name}</h4>
                  <p className="text-sm flex-1" style={{ color: 'var(--muted-foreground)', lineHeight: 1.7 }}>
                    {archetype.description}
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-xs" style={{ color: archetype.color, fontWeight: 500 }}>
                    <span>{t('Explorer', 'Explore')}</span>
                    <motion.div
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 2, delay: index * 0.3, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
                    >
                      <ArrowRight className="w-3.5 h-3.5" />
                    </motion.div>
                  </div>
                </motion.div>
              </BentoCard>
            ))}
          </div>
        </div>

        <SectionDivider color="var(--accent-blue)" symbol="star" />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-8">
          {/* Featured Image */}
          <BentoCard className="lg:col-span-2 min-h-[440px] overflow-hidden !p-0">
            <div className="absolute inset-0">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1625670413987-0ae649494c61?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxteXN0aWNhbCUyMGV5ZSUyMHN5bWJvbCUyMGdvbGRlbiUyMHNwaXJpdHVhbHxlbnwxfHx8fDE3NzM2ODExNjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt={t('Symboles Universels', 'Universal Symbols')}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <motion.div
                className="absolute top-6 right-6 opacity-[0.2]"
                animate={{ rotate: 360, y: [0, -8, 0] }}
                transition={{
                  rotate: { duration: 25, repeat: Number.POSITIVE_INFINITY, ease: 'linear' },
                  y: { duration: 4, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' },
                }}
              >
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                  <circle cx="20" cy="20" r="18" stroke="white" strokeWidth="0.5" />
                  <circle cx="20" cy="20" r="8" stroke="white" strokeWidth="0.3" fill="none" />
                  <circle cx="20" cy="20" r="3" fill="white" opacity="0.4" />
                </svg>
              </motion.div>
            </div>
            <div className="relative z-10 h-full flex flex-col justify-end p-8">
              <span className="text-white/50 text-xs uppercase tracking-[0.2em] mb-3" style={{ fontWeight: 500 }}>
                {t('Langage Universel', 'Universal Language')}
              </span>
              <h3 className="text-white mb-3">{t('Le Pouvoir des Symboles', 'The Power of Symbols')}</h3>
              <p className="text-white/70 text-sm max-w-xl" style={{ lineHeight: 1.7 }}>
                {t(
                  "Les symboles sont le langage premier de l'humanité. Avant l'écriture, avant la parole, les symboles transmettaient les vérités les plus profondes de l'expérience humaine.",
                  'Symbols are the primal language of humanity. Before writing, before speech, symbols conveyed the deepest truths of the human experience.'
                )}
              </p>
            </div>
          </BentoCard>

          {/* Universal Symbols */}
          <BentoCard className="min-h-[440px]" decorative="cross" glowColor="var(--glow-blue)">
            <div className="flex items-center gap-3 mb-6">
              <h4>{t('Formes Universelles', 'Universal Forms')}</h4>
              <div className="h-px flex-1" style={{ backgroundColor: 'var(--border)' }} />
            </div>
            <div className="space-y-2">
              {universalSymbols.map((sym, index) => (
                <motion.div
                  key={sym.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.04 }}
                  whileHover={{ x: 6, backgroundColor: 'var(--surface-blue)' }}
                  className="flex items-center gap-3 p-3 rounded-xl transition-all duration-300 cursor-pointer"
                >
                  <motion.div
                    className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{
                      backgroundColor: 'var(--surface-blue)',
                      color: 'var(--accent-blue)',
                    }}
                    whileHover={{ scale: 1.2, rotate: 15 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <sym.icon className="w-4 h-4" />
                  </motion.div>
                  <div>
                    <span className="text-sm block" style={{ color: 'var(--foreground)', fontWeight: 500 }}>
                      {sym.name}
                    </span>
                    <span className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
                      {sym.meaning}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </BentoCard>
        </div>

        <SectionDivider color="var(--accent-purple)" symbol="diamond" />

        {/* Dualities Grid */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <h3>{t('Les Grandes Dualités', 'The Great Dualities')}</h3>
            <div className="h-px flex-1" style={{ backgroundColor: 'var(--border)' }} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {dualities.map((duality, index) => (
              <BentoCard
                key={duality.title}
                className="min-h-[320px] cursor-pointer"
                style={{ backgroundColor: duality.bg }}
                glowColor={duality.color.replace('var(--accent-', 'var(--glow-').replace(')', ')')}
                decorative={(['circle', 'dots', 'lines'] as const)[index]}
                accentBorder={duality.color}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="h-full flex flex-col"
                >
                  <Eye className="w-5 h-5 mb-4" style={{ color: duality.color }} />
                  <h4 className="mb-3">{duality.title}</h4>
                  <p className="text-sm mb-6 flex-1" style={{ color: 'var(--muted-foreground)', lineHeight: 1.7 }}>
                    {duality.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {duality.concepts.map((concept) => (
                      <span
                        key={concept}
                        className="text-xs px-3 py-1.5 rounded-full transition-transform hover:scale-105"
                        style={{
                          backgroundColor: duality.color,
                          color: 'white',
                          opacity: 0.85,
                          fontWeight: 500,
                        }}
                      >
                        {concept}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </BentoCard>
            ))}
          </div>
        </div>

        {/* Quote card */}
        <BentoCard
          className="mb-6"
          style={{ background: 'linear-gradient(135deg, var(--surface-blue) 0%, var(--surface-purple) 100%)' }}
          decorative="vesica"
          glowColor="var(--glow-blue)"
        >
          <div className="py-8 text-center max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="h-px w-12" style={{ background: 'linear-gradient(90deg, transparent, var(--accent-blue))', opacity: 0.2 }} />
              <Eye className="w-4 h-4" style={{ color: 'var(--accent-blue)', opacity: 0.3 }} />
              <div className="h-px w-12" style={{ background: 'linear-gradient(90deg, var(--accent-blue), transparent)', opacity: 0.2 }} />
            </div>
            <p
              className="text-xl md:text-2xl mb-4"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', lineHeight: 1.6, color: 'var(--foreground)' }}
            >
              {t(
                '"Le symbole est la langue de l\'âme. Ce que les mots ne peuvent dire, le symbole le murmure."',
                '"The symbol is the language of the soul. What words cannot say, the symbol whispers."'
              )}
            </p>
            <span className="text-xs uppercase tracking-[0.2em]" style={{ color: 'var(--muted-foreground)', fontWeight: 500 }}>
              — Carl Gustav Jung
            </span>
          </div>
        </BentoCard>

        <CategoryLexiconLinks category="symbolism" />
      </div>
    </div>
  );
}
