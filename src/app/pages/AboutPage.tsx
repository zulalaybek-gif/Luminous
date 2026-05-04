import { motion } from 'motion/react';
import { Sparkles, BookOpen, Eye, Flame, Hexagon, Infinity as InfinityIcon, ArrowRight, Heart } from 'lucide-react';
import { Link } from 'react-router';
import { useLang } from '../components/LanguageContext';
import { useTheme } from '../components/ThemeContext';
import { MouseParallax, MagneticElement } from '../components/FloatingElements';
import { BentoCard } from '../components/BentoCard';
import { SectionDivider } from '../components/SectionDivider';
import { AnimatedCounter } from '../components/AnimatedCounter';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export function AboutPage() {
  const { t, lang } = useLang();
  const { isDark } = useTheme();

  const pillars = [
    {
      icon: Flame,
      titleFr: 'Authenticité',
      titleEn: 'Authenticity',
      descFr: 'Chaque terme, chaque concept est sourcé et présenté avec la rigueur qu\'exigent des millénaires de tradition. Nous ne simplifions pas, nous éclairons.',
      descEn: 'Every term, every concept is sourced and presented with the rigor that millennia of tradition demand. We don\'t simplify, we illuminate.',
      color: 'var(--accent-purple)',
      bg: 'var(--surface-purple)',
    },
    {
      icon: Eye,
      titleFr: 'Accessibilité',
      titleEn: 'Accessibility',
      descFr: 'Le savoir ésotérique a trop longtemps été réservé aux initiés. Luminous le rend accessible à tout esprit curieux, sans en trahir la profondeur.',
      descEn: 'Esoteric knowledge has been reserved for initiates for too long. Luminous makes it accessible to every curious mind, without betraying its depth.',
      color: 'var(--accent-blue)',
      bg: 'var(--surface-blue)',
    },
    {
      icon: Hexagon,
      titleFr: 'Beauté',
      titleEn: 'Beauty',
      descFr: 'La forme est au service du fond. Chaque détail visuel — des motifs géométriques aux transitions — est conçu pour honorer l\'esthétique du sacré.',
      descEn: 'Form serves substance. Every visual detail — from geometric patterns to transitions — is designed to honor the aesthetics of the sacred.',
      color: 'var(--accent-gold)',
      bg: 'var(--surface-gold)',
    },
    {
      icon: InfinityIcon,
      titleFr: 'Interconnexion',
      titleEn: 'Interconnection',
      descFr: 'Les savoirs ne sont pas des îlots. Alchimie, symbolisme, numérologie et géométrie sacrée se tissent en un réseau cohérent de compréhension.',
      descEn: 'Knowledge forms no islands. Alchemy, symbolism, numerology and sacred geometry weave into a coherent network of understanding.',
      color: 'var(--accent-rose)',
      bg: 'var(--surface-rose)',
    },
  ];

  const stats = [
    { value: '30', labelFr: 'Termes au lexique', labelEn: 'Lexicon terms', color: 'var(--accent-purple)' },
    { value: '4', labelFr: 'Catégories sacrées', labelEn: 'Sacred categories', color: 'var(--accent-blue)' },
    { value: '5000', suffix: '+', labelFr: 'Années de sagesse', labelEn: 'Years of wisdom', color: 'var(--accent-rose)' },
    { value: '2', labelFr: 'Langues', labelEn: 'Languages', color: 'var(--accent-gold)' },
  ];

  return (
    <div className="pt-16 pb-8 px-6 lg:px-12">
      <div className="max-w-[1100px] mx-auto">

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative mb-16 pt-16 pb-8 text-center"
        >
          {/* Background SVG */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <motion.svg
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              width="500" height="500" viewBox="0 0 500 500"
              style={{ opacity: 0.015 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 180, repeat: Number.POSITIVE_INFINITY, ease: 'linear' }}
            >
              <circle cx="250" cy="250" r="240" stroke="currentColor" strokeWidth="0.5" fill="none" />
              <circle cx="250" cy="250" r="180" stroke="currentColor" strokeWidth="0.4" fill="none" />
              <circle cx="250" cy="250" r="120" stroke="currentColor" strokeWidth="0.3" fill="none" />
              <circle cx="250" cy="250" r="60" stroke="currentColor" strokeWidth="0.2" fill="none" />
            </motion.svg>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="relative z-10"
          >
            <MouseParallax intensity={15} className="inline-block">
              <MagneticElement intensity={0.15}>
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.3, type: 'spring', stiffness: 200, damping: 20 }}
                  className="inline-flex items-center justify-center rounded-full mb-8 relative"
                  style={{ backgroundColor: 'var(--surface-purple)', width: 64, height: 64 }}
                >
                  <Sparkles className="w-7 h-7" style={{ color: 'var(--accent-purple)' }} />
                  <div className="absolute inset-0 rounded-full blur-2xl" style={{ backgroundColor: 'var(--accent-purple)', opacity: 0.15 }} />
                </motion.div>
              </MagneticElement>
            </MouseParallax>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xs uppercase tracking-[0.35em] mb-5"
              style={{ color: 'var(--accent-purple)', fontWeight: 500 }}
            >
              {t('Notre Vision', 'Our Vision')}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="mb-5"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
            >
              {t('À Propos de Luminous', 'About Luminous')}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="max-w-2xl mx-auto"
              style={{ color: 'var(--muted-foreground)', lineHeight: 2 }}
            >
              {t(
                'Luminous est une plateforme dédiée à la préservation et au partage des savoirs ésotériques anciens. Notre mission : rendre ces connaissances accessibles, belles et interconnectées — un sanctuaire digital pour l\'esprit curieux.',
                'Luminous is a platform dedicated to preserving and sharing ancient esoteric knowledge. Our mission: to make this knowledge accessible, beautiful, and interconnected — a digital sanctuary for the curious mind.'
              )}
            </motion.p>
          </motion.div>
        </motion.div>

        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative rounded-3xl overflow-hidden mb-16"
          style={{ height: 'clamp(220px, 35vw, 400px)' }}
        >
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1758730010177-1711515b7552?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmNpZW50JTIwbGlicmFyeSUyMHdpc2RvbSUyMGJvb2tzJTIwY2FuZGxlbGlnaHR8ZW58MXx8fHwxNzczNjgwNjQzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt={t('Bibliothèque de sagesse', 'Library of wisdom')}
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to top, ${isDark ? 'rgba(13,11,20,0.7)' : 'rgba(246,244,250,0.6)'} 0%, transparent 50%)`,
            }}
          />
          <div className="absolute bottom-6 left-8 right-8">
            <p
              className="text-sm max-w-xl"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: 'italic',
                lineHeight: 1.8,
                color: isDark ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.7)',
                fontSize: '1.1rem',
              }}
            >
              {t(
                '« La sagesse commence dans l\'émerveillement. »',
                '"Wisdom begins in wonder."'
              )}
              <span className="block mt-1 not-italic text-xs opacity-60">— Socrate</span>
            </p>
          </div>
        </motion.div>

        <SectionDivider color="var(--accent-purple)" symbol="star" />

        {/* Four Pillars */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <p className="text-xs uppercase tracking-[0.25em] mb-3" style={{ color: 'var(--accent-purple)', fontWeight: 500 }}>
              {t('Nos Principes', 'Our Principles')}
            </p>
            <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)' }}>
              {t('Quatre Piliers', 'Four Pillars')}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {pillars.map((pillar, index) => {
              const PillarIcon = pillar.icon;
              return (
                <BentoCard
                  key={pillar.titleFr}
                  className="min-h-[240px]"
                  style={{ backgroundColor: pillar.bg }}
                  glowColor={pillar.color.replace('accent', 'glow')}
                  decorative={(['circle', 'dots', 'lines', 'vesica'] as const)[index]}
                  accentBorder={pillar.color}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="h-full flex flex-col"
                  >
                    <MagneticElement intensity={0.2}>
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                        style={{ backgroundColor: `color-mix(in srgb, ${pillar.color} 15%, transparent)` }}
                      >
                        <PillarIcon className="w-6 h-6" style={{ color: pillar.color }} />
                      </div>
                    </MagneticElement>
                    <h4 className="mb-3">{lang === 'fr' ? pillar.titleFr : pillar.titleEn}</h4>
                    <p className="text-sm flex-1" style={{ color: 'var(--muted-foreground)', lineHeight: 1.8 }}>
                      {lang === 'fr' ? pillar.descFr : pillar.descEn}
                    </p>
                  </motion.div>
                </BentoCard>
              );
            })}
          </div>
        </div>

        <SectionDivider color="var(--accent-blue)" symbol="diamond" />

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <BentoCard
            style={{
              background: 'linear-gradient(135deg, var(--surface-purple) 0%, var(--surface-blue) 50%, var(--surface-rose) 100%)',
            }}
            decorative="circle"
            glowColor="var(--glow-purple)"
          >
            <div className="py-8">
              <p className="text-xs uppercase tracking-[0.25em] mb-8 text-center" style={{ color: 'var(--muted-foreground)', fontWeight: 500 }}>
                {t('Luminous en chiffres', 'Luminous in numbers')}
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {stats.map((stat) => (
                  <div key={stat.labelFr} className="text-center">
                    <AnimatedCounter
                      value={`${stat.value}${stat.suffix || ''}`}
                      style={{
                        fontSize: '2.2rem',
                        fontWeight: 700,
                        color: stat.color,
                        fontFamily: "'Cormorant Garamond', serif",
                        display: 'block',
                      }}
                      duration={2}
                    />
                    <span className="text-xs mt-2 block" style={{ color: 'var(--muted-foreground)' }}>
                      {lang === 'fr' ? stat.labelFr : stat.labelEn}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </BentoCard>
        </motion.div>

        {/* Philosophy section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="text-center mb-10">
            <p className="text-xs uppercase tracking-[0.25em] mb-3" style={{ color: 'var(--accent-gold)', fontWeight: 500 }}>
              {t('Philosophie', 'Philosophy')}
            </p>
            <h2 className="mb-6" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)' }}>
              {t('Pourquoi Luminous ?', 'Why Luminous?')}
            </h2>
          </div>

          <div className="max-w-2xl mx-auto space-y-6">
            <p style={{ color: 'var(--muted-foreground)', lineHeight: 2 }}>
              {t(
                'Dans un monde saturé d\'information, les savoirs ésotériques restent paradoxalement dispersés, mal présentés ou inaccessibles. Les textes anciens sur l\'alchimie, la numérologie ou la géométrie sacrée existent en fragments — disséminés dans des ouvrages rares, des forums obscurs, des traductions approximatives.',
                'In a world saturated with information, esoteric knowledge paradoxically remains scattered, poorly presented, or inaccessible. Ancient texts on alchemy, numerology, or sacred geometry exist in fragments — scattered across rare books, obscure forums, and approximate translations.'
              )}
            </p>
            <p style={{ color: 'var(--muted-foreground)', lineHeight: 2 }}>
              {t(
                'Luminous est né de la conviction que ces savoirs méritent un écrin à la hauteur de leur beauté. Chaque page, chaque interaction, chaque transition est conçue pour créer un espace de contemplation — un lieu où le savoir se révèle dans toute sa splendeur, sans artifice ni banalisation.',
                'Luminous was born from the conviction that this knowledge deserves a setting worthy of its beauty. Every page, every interaction, every transition is designed to create a space for contemplation — a place where knowledge reveals itself in all its splendor, without artifice or trivialization.'
              )}
            </p>
            <div
              className="relative pl-6"
              style={{ borderLeft: '2px solid color-mix(in srgb, var(--accent-purple) 30%, transparent)' }}
            >
              <p style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '1.15rem',
                fontStyle: 'italic',
                lineHeight: 1.9,
                color: 'var(--foreground)',
              }}>
                {t(
                  '« Ce qui est en haut est comme ce qui est en bas, et ce qui est en bas est comme ce qui est en haut, pour faire les miracles d\'une seule chose. »',
                  '"That which is above is like that which is below, and that which is below is like that which is above, to accomplish the miracles of the one thing."'
                )}
              </p>
              <span className="text-xs mt-2 block" style={{ color: 'var(--muted-foreground)', fontStyle: 'normal' }}>
                — {t('Table d\'Émeraude', 'Emerald Tablet')}
              </span>
            </div>
          </div>
        </motion.div>

        <SectionDivider color="var(--accent-rose)" symbol="star" />

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center py-12"
        >
          <Heart className="w-6 h-6 mx-auto mb-4" style={{ color: 'var(--accent-rose)', opacity: 0.5 }} />
          <h3 className="mb-4" style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.8rem)' }}>
            {t('Commencez votre exploration', 'Begin your exploration')}
          </h3>
          <p className="text-sm mb-8 max-w-md mx-auto" style={{ color: 'var(--muted-foreground)', lineHeight: 1.8 }}>
            {t(
              'Plongez dans le lexique, explorez les catégories, et laissez la sagesse ancienne éclairer votre chemin.',
              'Dive into the lexicon, explore the categories, and let ancient wisdom illuminate your path.'
            )}
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link
              to="/lexicon"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm transition-all"
              style={{
                backgroundColor: 'var(--accent-purple)',
                color: '#fff',
                fontWeight: 500,
              }}
            >
              <BookOpen className="w-4 h-4" />
              {t('Explorer le lexique', 'Explore the lexicon')}
            </Link>
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm transition-all"
              style={{
                backgroundColor: 'var(--surface-purple)',
                color: 'var(--accent-purple)',
                border: '1px solid var(--border)',
                fontWeight: 500,
              }}
            >
              {t('Retour à l\'accueil', 'Back to Home')}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
