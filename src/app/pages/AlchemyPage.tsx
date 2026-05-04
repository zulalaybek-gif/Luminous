import { BentoCard } from '../components/BentoCard';
import { SectionDivider } from '../components/SectionDivider';
import { MouseParallax, MagneticElement } from '../components/FloatingElements';
import { motion } from 'motion/react';
import { Flame, Droplet, Wind, Mountain, Sparkles, ArrowRight } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { useLang } from '../components/LanguageContext';
import { useTheme } from '../components/ThemeContext';
import { CategoryLexiconLinks } from '../components/CategoryLexiconLinks';

export function AlchemyPage() {
  const { t } = useLang();
  const { isDark } = useTheme();

  const elements = [
    { icon: Flame, name: t('Feu', 'Fire'), color: 'var(--accent-rose)', bg: 'var(--surface-rose)', description: t('Transformation, énergie et étincelle de la création', 'Transformation, energy, and the spark of creation'), symbol: '\u{1F702}' },
    { icon: Droplet, name: t('Eau', 'Water'), color: 'var(--accent-blue)', bg: 'var(--surface-blue)', description: t('Flux, émotion et profondeurs de la conscience', 'Flow, emotion, and the depths of consciousness'), symbol: '\u{1F704}' },
    { icon: Wind, name: t('Air', 'Air'), color: 'var(--accent-purple)', bg: 'var(--surface-purple)', description: t('Intellect, communication et souffle de vie', 'Intellect, communication, and the breath of life'), symbol: '\u{1F701}' },
    { icon: Mountain, name: t('Terre', 'Earth'), color: 'var(--accent-gold)', bg: 'var(--surface-gold)', description: t('Stabilité, fondation et manifestation matérielle', 'Stability, foundation, and material manifestation'), symbol: '\u{1F703}' },
  ];

  const principles = [
    {
      title: 'Solve et Coagula',
      description: t(
        'Dissoudre et coaguler — le processus fondamental de déconstruction des formes anciennes et de reconstruction des formes perfectionnées',
        'Dissolve and coagulate — the fundamental process of breaking down old forms and rebuilding perfected ones'
      ),
      concepts: [t('Dissolution', 'Dissolution'), t('Purification', 'Purification'), t('Reconstitution', 'Reconstitution')],
      color: 'var(--accent-purple)',
      bg: 'var(--surface-purple)',
    },
    {
      title: t('La Pierre Philosophale', "The Philosopher's Stone"),
      description: t(
        "La substance légendaire capable de transformer les métaux vils en or — une métaphore de la perfection spirituelle",
        'The legendary substance capable of turning base metals into gold — a metaphor for spiritual perfection'
      ),
      concepts: [t('Perfection', 'Perfection'), t('Illumination', 'Enlightenment'), t('Transmutation', 'Transmutation')],
      color: 'var(--accent-gold)',
      bg: 'var(--surface-gold)',
    },
    {
      title: t('Le Grand Oeuvre', 'The Great Work'),
      description: t(
        "L'opus alchimique — un voyage à travers l'obscurité vers la lumière, du plomb vers l'or",
        'The alchemical opus — a journey through darkness into light, from lead into gold'
      ),
      concepts: ['Nigredo', 'Albedo', 'Rubedo'],
      color: 'var(--accent-rose)',
      bg: 'var(--surface-rose)',
    },
  ];

  const stages = [
    t('Calcination', 'Calcination'),
    t('Dissolution', 'Dissolution'),
    t('Séparation', 'Separation'),
    t('Conjonction', 'Conjunction'),
    t('Fermentation', 'Fermentation'),
    t('Distillation', 'Distillation'),
    t('Coagulation', 'Coagulation'),
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
          {/* Decorative alchemical symbol */}
          <MouseParallax intensity={18} className="absolute top-4 right-0 lg:right-12 pointer-events-none">
            <div style={{ opacity: 0.035 }}>
              <motion.svg
                width="240" height="240" viewBox="0 0 240 240" fill="none"
                animate={{ rotate: 360 }}
                transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
              >
                <circle cx="120" cy="120" r="110" stroke="currentColor" strokeWidth="0.6" />
                <polygon points="120,20 210,180 30,180" stroke="currentColor" strokeWidth="0.6" fill="none" />
                <polygon points="120,220 30,60 210,60" stroke="currentColor" strokeWidth="0.6" fill="none" />
                <circle cx="120" cy="120" r="50" stroke="currentColor" strokeWidth="0.4" />
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
              style={{ backgroundColor: 'var(--surface-purple)' }}
              whileHover={{ scale: 1.15 }}
            >
              <Flame className="w-7 h-7" style={{ color: 'var(--accent-purple)' }} />
              <div className="absolute inset-0 rounded-full blur-2xl" style={{ backgroundColor: 'var(--accent-purple)', opacity: 0.12 }} />
              {/* Pulsing ring */}
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{ border: '1px solid var(--accent-purple)' }}
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
            style={{ color: 'var(--accent-purple)', fontWeight: 500 }}
          >
            {t("L'Art de la Transformation", 'The Art of Transformation')}
          </motion.p>

          <h1 className="mb-6">{t('Alchimie', 'Alchemy')}</h1>

          <p className="max-w-3xl" style={{ color: 'var(--muted-foreground)', lineHeight: 1.8 }}>
            {t(
              "La science ancienne de la transformation qui cherche à perfectionner la matière et l'esprit. L'alchimie est à la fois une tradition philosophique et protoscientifique visant la purification, la maturation et le perfectionnement.",
              'The ancient science of transformation that seeks to perfect matter and spirit. Alchemy is both a philosophical and protoscientific tradition aimed at purification, maturation, and the perfection of certain objects.'
            )}
          </p>

          {/* Decorative line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-8 h-px max-w-[200px] origin-left"
            style={{ background: 'linear-gradient(90deg, var(--accent-purple), transparent)' }}
          />
        </motion.div>

        {/* Four Elements Grid */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <h3>{t('Les Quatre Éléments Classiques', 'The Four Classical Elements')}</h3>
            <div className="h-px flex-1" style={{ backgroundColor: 'var(--border)' }} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {elements.map((element, index) => (
              <BentoCard
                key={element.name}
                className="min-h-[280px] cursor-pointer"
                style={{ backgroundColor: element.bg }}
                glowColor={element.color.replace('var(--accent-', 'var(--glow-').replace(')', ')')}
                decorative={(['dots', 'lines', 'vesica', 'fibonacci'] as const)[index]}
                accentBorder={element.color}
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
                        style={{ backgroundColor: element.color, opacity: 0.12 }}
                        whileHover={{ scale: 1.15, rotate: 10 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      >
                        <element.icon className="w-6 h-6" style={{ color: element.color }} />
                      </motion.div>
                    </MagneticElement>
                    <motion.span
                      className="text-3xl"
                      style={{ opacity: 0.1, fontFamily: 'serif' }}
                      animate={{ rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 8, delay: index * 0.5, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      {element.symbol}
                    </motion.span>
                  </div>
                  <h4 className="mb-2">{element.name}</h4>
                  <p className="text-sm flex-1" style={{ color: 'var(--muted-foreground)', lineHeight: 1.7 }}>
                    {element.description}
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-xs" style={{ color: element.color, fontWeight: 500 }}>
                    <span>{t('Explorer', 'Explore')}</span>
                    <motion.div
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 2, delay: index * 0.3, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      <ArrowRight className="w-3.5 h-3.5" />
                    </motion.div>
                  </div>
                </motion.div>
              </BentoCard>
            ))}
          </div>
        </div>

        <SectionDivider color="var(--accent-purple)" symbol="star" />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-8">
          {/* Featured Image */}
          <BentoCard className="lg:col-span-2 min-h-[440px] overflow-hidden !p-0">
            <div className="absolute inset-0">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1766583459867-a1c6ee074e5a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkZW4lMjBsaWdodCUyMG15c3RpY2FsJTIwY29zbWljJTIwYXRtb3NwaGVyZXxlbnwxfHx8fDE3NzM0MzM3MzF8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt={t('Laboratoire Alchimique', 'Alchemy Laboratory')}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              {/* Floating geometric accent */}
              <motion.div
                className="absolute top-6 right-6 opacity-[0.2]"
                animate={{ rotate: 360, y: [0, -8, 0] }}
                transition={{
                  rotate: { duration: 25, repeat: Infinity, ease: 'linear' },
                  y: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
                }}
              >
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                  <circle cx="20" cy="20" r="18" stroke="white" strokeWidth="0.5" />
                  <polygon points="20,4 36,32 4,32" stroke="white" strokeWidth="0.5" fill="none" />
                </svg>
              </motion.div>
            </div>
            <div className="relative z-10 h-full flex flex-col justify-end p-8">
              <span className="text-white/50 text-xs uppercase tracking-[0.2em] mb-3" style={{ fontWeight: 500 }}>
                {t('Pratique Historique', 'Historical Practice')}
              </span>
              <h3 className="text-white mb-3">{t('Le Laboratoire Alchimique', 'The Alchemical Laboratory')}</h3>
              <p className="text-white/70 text-sm max-w-xl" style={{ lineHeight: 1.7 }}>
                {t(
                  "Les alchimistes anciens travaillaient dans des laboratoires secrets, combinant métallurgie, médecine et mysticisme dans la quête de la transformation et de l'illumination.",
                  'Ancient alchemists worked in secretive laboratories, combining metallurgy, medicine, and mysticism in pursuit of transformation and enlightenment.'
                )}
              </p>
            </div>
          </BentoCard>

          {/* Seven Stages */}
          <BentoCard className="min-h-[440px]" decorative="cross" glowColor="var(--glow-purple)">
            <div className="flex items-center gap-3 mb-6">
              <h4>{t('Sept Étapes', 'Seven Stages')}</h4>
              <div className="h-px flex-1" style={{ backgroundColor: 'var(--border)' }} />
            </div>
            <div className="space-y-2">
              {stages.map((stage, index) => (
                <motion.div
                  key={stage}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.04 }}
                  whileHover={{ x: 6, backgroundColor: 'var(--surface-purple)' }}
                  className="flex items-center gap-3 p-3 rounded-xl transition-all duration-300 cursor-pointer"
                >
                  <motion.div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-xs flex-shrink-0"
                    style={{
                      backgroundColor: 'var(--surface-purple)',
                      color: 'var(--accent-purple)',
                      fontWeight: 600,
                    }}
                    whileHover={{ scale: 1.2, rotate: 15 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    {index + 1}
                  </motion.div>
                  <span className="text-sm" style={{ color: 'var(--foreground)' }}>
                    {stage}
                  </span>
                  <motion.div className="ml-auto">
                    <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: 'var(--accent-purple)' }} />
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </BentoCard>
        </div>

        <SectionDivider color="var(--accent-gold)" symbol="diamond" />

        {/* Principles Grid */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <h3>{t('Principes Fondamentaux', 'Core Principles')}</h3>
            <div className="h-px flex-1" style={{ backgroundColor: 'var(--border)' }} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {principles.map((principle, index) => (
              <BentoCard
                key={principle.title}
                className="min-h-[320px] cursor-pointer"
                style={{ backgroundColor: principle.bg }}
                glowColor={principle.color.replace('var(--accent-', 'var(--glow-').replace(')', ')')}
                decorative={(['circle', 'dots', 'lines'] as const)[index]}
                accentBorder={principle.color}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="h-full flex flex-col"
                >
                  <Sparkles className="w-5 h-5 mb-4" style={{ color: principle.color }} />
                  <h4 className="mb-3">{principle.title}</h4>
                  <p className="text-sm mb-6 flex-1" style={{ color: 'var(--muted-foreground)', lineHeight: 1.7 }}>
                    {principle.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {principle.concepts.map((concept) => (
                      <span
                        key={concept}
                        className="text-xs px-3 py-1.5 rounded-full transition-transform hover:scale-105"
                        style={{
                          backgroundColor: principle.color,
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

        {/* Alchemical quote card */}
        <BentoCard
          className="mb-6"
          style={{ background: 'linear-gradient(135deg, var(--surface-purple) 0%, var(--surface-gold) 100%)' }}
          decorative="vesica"
          glowColor="var(--glow-gold)"
        >
          <div className="py-8 text-center max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="h-px w-12" style={{ background: 'linear-gradient(90deg, transparent, var(--accent-gold))', opacity: 0.2 }} />
              <Flame className="w-4 h-4" style={{ color: 'var(--accent-gold)', opacity: 0.3 }} />
              <div className="h-px w-12" style={{ background: 'linear-gradient(90deg, var(--accent-gold), transparent)', opacity: 0.2 }} />
            </div>
            <p
              className="text-xl md:text-2xl mb-4"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', lineHeight: 1.6, color: 'var(--foreground)' }}
            >
              {t(
                '"Visite l\'intérieur de la terre, en rectifiant tu trouveras la pierre cachée."',
                '"Visit the interior of the earth, and by rectifying you will find the hidden stone."'
              )}
            </p>
            <span className="text-xs uppercase tracking-[0.2em]" style={{ color: 'var(--muted-foreground)', fontWeight: 500 }}>
              V.I.T.R.I.O.L.
            </span>
          </div>
        </BentoCard>

        <SectionDivider color="var(--accent-purple)" symbol="diamond" />

        {/* Lexicon Cross-links */}
        <CategoryLexiconLinks category="alchemy" />
      </div>
    </div>
  );
}