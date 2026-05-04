import { BentoCard } from '../components/BentoCard';
import { SectionDivider } from '../components/SectionDivider';
import { MouseParallax, MagneticElement } from '../components/FloatingElements';
import { motion } from 'motion/react';
import { Waves, Zap, Circle, Wind, ArrowRight, BookOpen } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { useLang } from '../components/LanguageContext';
import { useTheme } from '../components/ThemeContext';
import { CategoryLexiconLinks } from '../components/CategoryLexiconLinks';
import { Link } from 'react-router';

const chakraData = [
  { name: 'Sahasrara', nameFr: 'Couronne', color: '#9b7fd4', position: '7', element: 'Conscience pure', elementEn: 'Pure consciousness' },
  { name: 'Ajna', nameFr: '3ème Œil', color: '#5a7fd4', position: '6', element: 'Lumière, intuition', elementEn: 'Light, intuition' },
  { name: 'Vishuddha', nameFr: 'Gorge', color: '#5ab4d4', position: '5', element: 'Éther, expression', elementEn: 'Ether, expression' },
  { name: 'Anahata', nameFr: 'Cœur', color: '#5ab47a', position: '4', element: 'Air, amour', elementEn: 'Air, love' },
  { name: 'Manipura', nameFr: 'Plexus solaire', color: '#d4b45a', position: '3', element: 'Feu, volonté', elementEn: 'Fire, willpower' },
  { name: 'Svadhisthana', nameFr: 'Sacré', color: '#d47a5a', position: '2', element: 'Eau, créativité', elementEn: 'Water, creativity' },
  { name: 'Muladhara', nameFr: 'Racine', color: '#d45a5a', position: '1', element: 'Terre, survie', elementEn: 'Earth, survival' },
];

const subjects = [
  {
    id: 'eveil',
    titleFr: "L'Éveil",
    titleEn: 'Awakening',
    descFr: 'Satori zen, Moksha hindou, Bodhi bouddhiste — la perception de la réalité au-delà du conditionnement ordinaire.',
    descEn: 'Zen Satori, Hindu Moksha, Buddhist Bodhi — perceiving reality beyond ordinary conditioning.',
    icon: Zap,
    color: 'var(--accent-teal)',
    bg: 'var(--surface-teal)',
  },
  {
    id: 'meditation',
    titleFr: 'Méditation',
    titleEn: 'Meditation',
    descFr: "Pratique documentée scientifiquement. Des études montrent des modifications mesurables de la structure cérébrale (neuroplasticité) chez les méditants réguliers.",
    descEn: 'Scientifically documented practice. Studies show measurable changes in brain structure (neuroplasticity) in regular meditants.',
    icon: Circle,
    color: 'var(--accent-purple)',
    bg: 'var(--surface-purple)',
  },
  {
    id: 'moment-present',
    titleFr: 'Le Moment Présent',
    titleEn: 'The Present Moment',
    descFr: "Eckhart Tolle, Jon Kabat-Zinn, traditions zen — la présence attentive comme voie de libération de la souffrance mentale.",
    descEn: 'Eckhart Tolle, Jon Kabat-Zinn, Zen traditions — mindful presence as a path out of mental suffering.',
    icon: Wind,
    color: 'var(--accent-blue)',
    bg: 'var(--surface-blue)',
  },
  {
    id: 'frequences',
    titleFr: 'Fréquences & Sons',
    titleEn: 'Frequencies & Sound',
    descFr: "Les fréquences solfégiques, la cymatique et les bols tibétains — exploration des rapports entre son, vibration et conscience.",
    descEn: 'Solfeggio frequencies, cymatics, and Tibetan bowls — exploring the links between sound, vibration, and consciousness.',
    icon: Waves,
    color: 'var(--accent-teal)',
    bg: 'var(--surface-teal)',
  },
];

const thinkers = [
  { name: 'Eckhart Tolle', domain: 'Présence & Éveil', work: 'Le Pouvoir du Moment Présent (1997)', type: 'témoignage/enseignement' },
  { name: 'Jon Kabat-Zinn', domain: 'Mindfulness / MBSR', work: 'Full Catastrophe Living (1990)', type: 'scientifique/clinique' },
  { name: 'Carl Jung', domain: 'Psychologie de la conscience', work: "L'Homme et ses symboles (1964)", type: 'scientifique/interprétation' },
  { name: 'Don Miguel Ruiz', domain: 'Tradition toltèque', work: 'Les Quatre Accords Toltèques (1997)', type: 'tradition' },
  { name: 'Stanislav Grof', domain: 'États de conscience non ordinaires', work: 'Psychology of the Future (2000)', type: 'scientifique/transpersonnel' },
  { name: 'Richard Davidson', domain: 'Neurosciences contemplatives', work: 'The Emotional Life of Your Brain (2012)', type: 'scientifique' },
];

export function ConsciencePage() {
  const { t, lang } = useLang();
  const { isDark } = useTheme();

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
          <MouseParallax intensity={15} className="absolute top-4 right-0 lg:right-12 pointer-events-none">
            <motion.svg
              width="220" height="220" viewBox="0 0 220 220" fill="none"
              style={{ opacity: 0.04 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 100, repeat: Infinity, ease: 'linear' }}
            >
              {[110, 90, 70, 50, 30].map((r, i) => (
                <circle key={i} cx="110" cy="110" r={r} stroke="var(--accent-teal)" strokeWidth="0.5" fill="none" />
              ))}
              <line x1="110" y1="0" x2="110" y2="220" stroke="var(--accent-teal)" strokeWidth="0.3" />
              <line x1="0" y1="110" x2="220" y2="110" stroke="var(--accent-teal)" strokeWidth="0.3" />
            </motion.svg>
          </MouseParallax>

          <div className="flex items-center gap-3 mb-6">
            <div className="inline-flex p-3 rounded-2xl" style={{ backgroundColor: 'var(--surface-teal)' }}>
              <Waves className="w-6 h-6" style={{ color: 'var(--accent-teal)' }} />
            </div>
            <span className="text-xs uppercase tracking-[0.25em]" style={{ color: 'var(--accent-teal)', fontWeight: 500 }}>
              {t('Conscience & Éveil', 'Consciousness & Awakening')}
            </span>
          </div>

          <h1 className="max-w-3xl mb-6" style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)' }}>
            {t("L'Éveil de la Conscience", 'The Awakening of Consciousness')}
          </h1>
          <p className="max-w-2xl text-sm mb-8" style={{ color: 'var(--muted-foreground)', lineHeight: 1.9 }}>
            {t(
              "Des chakras aux accords toltèques, du moment présent aux fréquences de l'existence — une exploration rigoureuse et ouverte des traditions contemplatives, des recherches en neurosciences et des expériences humaines documentées sur la nature de la conscience.",
              "From chakras to Toltec agreements, from the present moment to the frequencies of existence — a rigorous and open exploration of contemplative traditions, neuroscience research, and documented human experiences on the nature of consciousness."
            )}
          </p>

          {/* Type indicators */}
          <div className="flex flex-wrap gap-2">
            {[
              { label: t('Tradition', 'Tradition'), color: 'var(--accent-purple)' },
              { label: t('Recherche scientifique', 'Scientific research'), color: 'var(--accent-blue)' },
              { label: t('Témoignage/Vécu', 'Testimony/Experience'), color: 'var(--accent-teal)' },
              { label: t('Interprétation', 'Interpretation'), color: 'var(--accent-gold)' },
            ].map((badge) => (
              <span
                key={badge.label}
                className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full"
                style={{ backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)', border: '1px solid var(--border-subtle)' }}
              >
                <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ backgroundColor: badge.color }} />
                {badge.label}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Chakra System */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-6"
        >
          <BentoCard
            className="min-h-[480px]"
            style={{ backgroundColor: 'var(--surface-teal)' }}
            glowColor="var(--glow-teal)"
            accentBorder="var(--accent-teal)"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <MagneticElement intensity={0.2}>
                    <div className="inline-flex p-2.5 rounded-xl" style={{ backgroundColor: 'color-mix(in srgb, var(--accent-teal) 15%, transparent)' }}>
                      <Waves className="w-5 h-5" style={{ color: 'var(--accent-teal)' }} />
                    </div>
                  </MagneticElement>
                  <span className="text-xs uppercase tracking-[0.15em]" style={{ color: 'var(--accent-teal)', fontWeight: 500 }}>
                    {t('Tradition yogique • Documenté', 'Yogic Tradition • Documented')}
                  </span>
                </div>
                <h3 className="mb-4">{t('Les 7 Chakras', 'The 7 Chakras')}</h3>
                <p className="text-sm mb-6" style={{ color: 'var(--muted-foreground)', lineHeight: 1.8 }}>
                  {t(
                    "Centres d'énergie subtile issus des Vedas (1500 av. J.-C.), les chakras structurent la carte énergétique du corps humain. Chacun correspond à une fréquence vibratoire, un élément, une couleur et des états psycho-émotionnels.",
                    "Subtle energy centers from the Vedas (1500 BCE), chakras structure the energetic map of the human body. Each corresponds to a vibrational frequency, an element, a color, and psycho-emotional states."
                  )}
                </p>
                <Link
                  to="/lexicon/chakras"
                  className="inline-flex items-center gap-2 text-sm transition-colors"
                  style={{ color: 'var(--accent-teal)', fontWeight: 500 }}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  {t('Lire l\'entrée complète du Lexique', 'Read full Lexicon entry')}
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="flex flex-col gap-2">
                {chakraData.map((chakra, i) => (
                  <motion.div
                    key={chakra.name}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06, duration: 0.5 }}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 hover:scale-[1.01] cursor-default"
                    style={{ backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.6)', border: '1px solid var(--border-subtle)' }}
                  >
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs"
                      style={{ backgroundColor: chakra.color, color: '#fff', fontWeight: 600 }}
                    >
                      {chakra.position}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline gap-2">
                        <span className="text-sm" style={{ fontWeight: 500 }}>{chakra.name}</span>
                        <span className="text-xs" style={{ color: 'var(--muted-foreground)' }}>— {chakra.nameFr}</span>
                      </div>
                      <span className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
                        {lang === 'fr' ? chakra.element : chakra.elementEn}
                      </span>
                    </div>
                    <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: chakra.color, opacity: 0.6 }} />
                  </motion.div>
                ))}
              </div>
            </div>
          </BentoCard>
        </motion.div>

        {/* Main image + quote */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-6">
          <BentoCard className="lg:col-span-2 min-h-[360px] overflow-hidden !p-0 cursor-pointer">
            <div className="absolute inset-0">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1603166868295-4ae2cba14063?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGFrcmFzJTIwbWVkaXRhdGlvbiUyMGVuZXJneSUyMGxpZ2h0JTIwYm9keXxlbnwxfHx8fDE3Nzc0ODQxNTh8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Chakras Meditation"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            </div>
            <div className="relative z-10 h-full flex flex-col justify-end p-7">
              <p className="text-xs uppercase tracking-[0.2em] mb-2 text-white/60">
                {t('Traditions contemplatives du monde entier', 'Contemplative traditions worldwide')}
              </p>
              <h3 className="text-white mb-2">{t('L\'Éveil n\'est pas une destination', 'Awakening is not a destination')}</h3>
              <p className="text-sm text-white/70 max-w-lg">
                {t('Bouddhisme, Vedanta, soufisme, traditions autochtones — toutes décrivent un même mouvement : se tourner vers la source de la conscience plutôt que vers ses contenus.', 'Buddhism, Vedanta, Sufism, indigenous traditions — all describe the same movement: turning toward the source of consciousness rather than its contents.')}
              </p>
            </div>
          </BentoCard>

          <BentoCard
            className="min-h-[360px]"
            style={{ backgroundColor: 'var(--surface-teal)' }}
            glowColor="var(--glow-teal)"
          >
            <div className="h-full flex flex-col justify-between">
              <div>
                <span className="text-xs uppercase tracking-[0.2em] mb-6 block" style={{ color: 'var(--accent-teal)', fontWeight: 500 }}>
                  {t('Citation fondamentale', 'Foundational quote')}
                </span>
                <blockquote
                  className="text-lg mb-5"
                  style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', lineHeight: 1.6 }}
                >
                  {t(
                    '"Connaître les autres, c\'est sagesse. Se connaître soi-même, c\'est illumination."',
                    '"Knowing others is wisdom. Knowing yourself is enlightenment."'
                  )}
                </blockquote>
                <p className="text-sm" style={{ color: 'var(--accent-teal)', fontWeight: 500 }}>Lao-Tseu</p>
                <p className="text-xs mt-1" style={{ color: 'var(--muted-foreground)' }}>Tao Te Ching, ch. 33</p>
              </div>
              <div className="pt-4" style={{ borderTop: '1px solid var(--border-subtle)' }}>
                <p className="text-xs" style={{ color: 'var(--muted-foreground)', lineHeight: 1.7 }}>
                  {t(
                    "Ce principe — l'auto-connaissance comme voie de sagesse — est au cœur du bouddhisme, du Vedanta, du stoïcisme et de la psychologie moderne.",
                    "This principle — self-knowledge as the path to wisdom — is at the core of Buddhism, Vedanta, Stoicism, and modern psychology."
                  )}
                </p>
              </div>
            </div>
          </BentoCard>
        </div>

        {/* Subjects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
          {subjects.map((subject, i) => {
            const Icon = subject.icon;
            return (
              <motion.div
                key={subject.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link to={`/lexicon/${subject.id}`} className="block h-full">
                  <BentoCard
                    className="h-full min-h-[200px] cursor-pointer"
                    style={{ backgroundColor: subject.bg }}
                    glowColor={`var(--glow-teal)`}
                    accentBorder={subject.color}
                  >
                    <div className="flex flex-col h-full">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="inline-flex p-2 rounded-lg" style={{ backgroundColor: `color-mix(in srgb, ${subject.color} 15%, transparent)` }}>
                          <Icon className="w-4 h-4" style={{ color: subject.color }} />
                        </div>
                      </div>
                      <h5 className="mb-2">{lang === 'fr' ? subject.titleFr : subject.titleEn}</h5>
                      <p className="text-xs flex-1" style={{ color: 'var(--muted-foreground)', lineHeight: 1.7 }}>
                        {lang === 'fr' ? subject.descFr : subject.descEn}
                      </p>
                      <div className="flex items-center gap-1.5 mt-4 text-xs" style={{ color: subject.color, fontWeight: 500 }}>
                        <span>{t('Lexique', 'Lexicon')}</span>
                        <ArrowRight className="w-3 h-3" />
                      </div>
                    </div>
                  </BentoCard>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <SectionDivider color="var(--accent-teal)" symbol="diamond" />

        {/* Thinkers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <BentoCard glowColor="var(--glow-teal)" decorative="dots">
            <div>
              <div className="flex items-center gap-3 mb-8">
                <span className="text-xs uppercase tracking-[0.25em]" style={{ color: 'var(--accent-teal)', fontWeight: 500 }}>
                  {t('Figures & Références', 'Figures & References')}
                </span>
              </div>
              <h3 className="mb-2">{t('Penseurs & Chercheurs', 'Thinkers & Researchers')}</h3>
              <p className="text-sm max-w-xl mb-8" style={{ color: 'var(--muted-foreground)', lineHeight: 1.8 }}>
                {t(
                  "Ces figures ont contribué à notre compréhension de la conscience — chacun depuis une angle différent : science, tradition, expérience directe ou synthèse.",
                  "These figures have contributed to our understanding of consciousness — each from a different angle: science, tradition, direct experience, or synthesis."
                )}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {thinkers.map((t_item, i) => (
                  <motion.div
                    key={t_item.name}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="p-4 rounded-xl"
                    style={{ backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(61,191,170,0.04)', border: '1px solid var(--border-subtle)' }}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <span className="text-sm" style={{ fontWeight: 500 }}>{t_item.name}</span>
                      <span
                        className="text-[10px] px-2 py-0.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: 'var(--surface-teal)', color: 'var(--accent-teal)', fontWeight: 500 }}
                      >
                        {t_item.type}
                      </span>
                    </div>
                    <p className="text-xs mb-1" style={{ color: 'var(--accent-teal)' }}>{t_item.domain}</p>
                    <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>{t_item.work}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </BentoCard>
        </motion.div>

        {/* Lexicon Links */}
        <CategoryLexiconLinks category="consciousness" />

        {/* Deep Subjects CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs uppercase tracking-[0.2em]" style={{ color: 'var(--accent-teal)', fontWeight: 500 }}>
              {t('Sujets approfondis', 'Deep subjects')}
            </p>
            <Link to="/savoirs" className="flex items-center gap-1 text-xs" style={{ color: 'var(--accent-teal)' }}>
              {t('Voir tous', 'See all')} <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { id: 'eveil-guide', titleFr: "Guide de l'Éveil", titleEn: 'Guide to Awakening', descFr: 'Tradition, étapes, figures, science', descEn: 'Tradition, stages, figures, science', color: 'var(--accent-teal)' },
              { id: 'moment-present', titleFr: 'Le Moment Présent', titleEn: 'The Present Moment', descFr: 'Eckhart Tolle, MBSR, bouddhisme', descEn: 'Eckhart Tolle, MBSR, Buddhism', color: 'var(--accent-blue)' },
              { id: 'frequences-vibrations', titleFr: 'Fréquences & Vibrations', titleEn: 'Frequencies & Vibrations', descFr: 'Science, controverse, binaural', descEn: 'Science, controversy, binaural', color: 'var(--accent-rose)' },
              { id: 'boule-energie', titleFr: "Boule d'Énergie", titleEn: 'Energy Ball', descFr: 'Qi gong, physiologie, pratique guidée', descEn: 'Qigong, physiology, guided practice', color: 'var(--accent-teal)' },
            ].map((s) => (
              <Link key={s.id} to={`/sujet/${s.id}`}
                className="rounded-xl p-4 transition-all hover:scale-[1.01]"
                style={{ backgroundColor: 'var(--muted)', border: '1px solid var(--border-subtle)' }}>
                <div className="h-px mb-3" style={{ background: `linear-gradient(90deg, ${s.color}, transparent)` }} />
                <p style={{ fontSize: '0.9rem', color: 'var(--foreground)', fontFamily: "'Cormorant Garamond', serif" }}>
                  {t(s.titleFr, s.titleEn)}
                </p>
                <p className="text-[10px] mt-1" style={{ color: 'var(--muted-foreground)', lineHeight: 1.5 }}>
                  {t(s.descFr, s.descEn)}
                </p>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
