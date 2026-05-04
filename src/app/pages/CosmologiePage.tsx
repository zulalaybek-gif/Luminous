import { BentoCard } from '../components/BentoCard';
import { SectionDivider } from '../components/SectionDivider';
import { MouseParallax, MagneticElement } from '../components/FloatingElements';
import { motion } from 'motion/react';
import { Globe, Star, ArrowRight, BookOpen, Eye } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { useLang } from '../components/LanguageContext';
import { useTheme } from '../components/ThemeContext';
import { CategoryLexiconLinks } from '../components/CategoryLexiconLinks';
import { Link } from 'react-router';

const archangelData = [
  {
    name: 'Michaël',
    nameEn: 'Michael',
    domain: 'Protection, lumière, courage',
    domainEn: 'Protection, light, courage',
    color: 'var(--accent-gold)',
    traditions: 'Judaïsme · Christianisme · Islam',
  },
  {
    name: 'Gabriel',
    nameEn: 'Gabriel',
    domain: 'Message divin, révélation, naissance',
    domainEn: 'Divine message, revelation, birth',
    color: 'var(--accent-blue)',
    traditions: 'Judaïsme · Christianisme · Islam',
  },
  {
    name: 'Raphaël',
    nameEn: 'Raphael',
    domain: 'Guérison, médecine, voyages',
    domainEn: 'Healing, medicine, journeys',
    color: 'var(--accent-teal)',
    traditions: 'Judaïsme · Christianisme',
  },
  {
    name: 'Uriel',
    nameEn: 'Uriel',
    domain: 'Sagesse, savoir, feu de Dieu',
    domainEn: 'Wisdom, knowledge, fire of God',
    color: 'var(--accent-amber)',
    traditions: 'Textes apocryphes · Ésotérisme',
  },
];

const cosmicSubjects = [
  {
    id: 'voyage-astral',
    titleFr: 'Voyage Astral',
    titleEn: 'Astral Travel',
    descFr: "Documenté scientifiquement comme OBE (Olaf Blanke, EPFL). Présent dans le Bardo Thödol tibétain, le corps Ka égyptien et les traditions chamaniques.",
    descEn: "Scientifically documented as OBE (Olaf Blanke, EPFL). Present in the Tibetan Bardo Thödol, Egyptian Ka body, and shamanic traditions.",
    color: 'var(--accent-cosmic)',
    bg: 'var(--surface-cosmic)',
  },
  {
    id: 'memoire-stellaire',
    titleFr: 'Mémoire Stellaire',
    titleEn: 'Stellar Memory',
    descFr: "Traditions Dogon (Mali), Hopi (Amériques) — des savoirs astronomiques remarquables sur des systèmes d'étoiles décrivent des connexions cosmiques.",
    descEn: "Dogon (Mali), Hopi (Americas) traditions — remarkable astronomical knowledge about star systems describe cosmic connections.",
    color: 'var(--accent-purple)',
    bg: 'var(--surface-purple)',
  },
  {
    id: 'conscience-cosmique',
    titleFr: 'Conscience Cosmique',
    titleEn: 'Cosmic Consciousness',
    descFr: "Décrite par le psychiatre Richard Maurice Bucke (1901) comme une illumination révélant l'unité de toute existence. Documentée chez Whitman, Dante, Blake.",
    descEn: "Described by psychiatrist Richard Maurice Bucke (1901) as an illumination revealing the unity of all existence. Documented in Whitman, Dante, Blake.",
    color: 'var(--accent-blue)',
    bg: 'var(--surface-blue)',
  },
  {
    id: 'corps-de-lumiere',
    titleFr: 'Corps de Lumière',
    titleEn: 'Light Body',
    descFr: "Ka égyptien, corps arc-en-ciel du Dzogchen tibétain, corps de résurrection chrétien — des traditions sur le véhicule subtil de la conscience.",
    descEn: "Egyptian Ka, Tibetan Dzogchen rainbow body, Christian resurrection body — traditions on the subtle vehicle of consciousness.",
    color: 'var(--accent-rose)',
    bg: 'var(--surface-rose)',
  },
];

const traditions = [
  { name: 'Livre d\'Énoch', type: 'texteFr', typeEn: 'Ancient text', typeFr: 'Texte ancien', date: '~200 av. J.-C.', tradition: 'Judaïsme', color: 'var(--accent-gold)' },
  { name: 'Bardo Thödol', typeFr: 'Texte sacré', typeEn: 'Sacred text', date: '8e siècle', tradition: 'Bouddhisme tibétain', color: 'var(--accent-blue)' },
  { name: 'Coran (Jibrīl)', typeFr: 'Texte sacré', typeEn: 'Sacred text', date: '7e siècle', tradition: 'Islam', color: 'var(--accent-teal)' },
  { name: 'Anthroposophie', typeFr: 'Système ésotérique', typeEn: 'Esoteric system', date: '1902-1925', tradition: 'Rudolf Steiner', color: 'var(--accent-purple)' },
  { name: 'Robert Monroe', typeFr: 'Témoignage / Recherche', typeEn: 'Testimony / Research', date: '1971', tradition: 'Monroe Institute', color: 'var(--accent-rose)' },
  { name: 'Pim van Lommel', typeFr: 'Recherche médicale', typeEn: 'Medical research', date: '2001', tradition: 'Cardiologie / NDE', color: 'var(--accent-mint)' },
];

export function CosmologiePage() {
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
          className="mb-20 pt-10 relative overflow-hidden"
        >
          <MouseParallax intensity={15} className="absolute top-0 right-0 lg:right-8 pointer-events-none">
            <motion.svg
              width="280" height="280" viewBox="0 0 280 280" fill="none"
              style={{ opacity: 0.035 }}
              animate={{ rotate: -360 }}
              transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
            >
              <circle cx="140" cy="140" r="130" stroke="var(--accent-cosmic)" strokeWidth="0.5" />
              <circle cx="140" cy="140" r="100" stroke="var(--accent-cosmic)" strokeWidth="0.4" />
              <circle cx="140" cy="140" r="70" stroke="var(--accent-cosmic)" strokeWidth="0.4" />
              {[0, 45, 90, 135].map((angle) => (
                <line
                  key={angle}
                  x1={140 + 130 * Math.cos((angle * Math.PI) / 180)}
                  y1={140 + 130 * Math.sin((angle * Math.PI) / 180)}
                  x2={140 - 130 * Math.cos((angle * Math.PI) / 180)}
                  y2={140 - 130 * Math.sin((angle * Math.PI) / 180)}
                  stroke="var(--accent-cosmic)"
                  strokeWidth="0.2"
                />
              ))}
            </motion.svg>
          </MouseParallax>

          <div className="flex items-center gap-3 mb-6">
            <div className="inline-flex p-3 rounded-2xl" style={{ backgroundColor: 'var(--surface-cosmic)' }}>
              <Globe className="w-6 h-6" style={{ color: 'var(--accent-cosmic)' }} />
            </div>
            <span className="text-xs uppercase tracking-[0.25em]" style={{ color: 'var(--accent-cosmic)', fontWeight: 500 }}>
              {t('Cosmologie Sacrée', 'Sacred Cosmology')}
            </span>
          </div>

          <h1 className="max-w-3xl mb-6" style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)' }}>
            {t("L'Univers et la Conscience", 'The Universe and Consciousness')}
          </h1>
          <p className="max-w-2xl text-sm mb-8" style={{ color: 'var(--muted-foreground)', lineHeight: 1.9 }}>
            {t(
              "Archanges, mémoire stellaire, voyage astral, corps de lumière — des traditions millénaires qui cherchent à comprendre la relation entre la conscience humaine et le cosmos. Nous présentons ces savoirs en distinguant soigneusement tradition, témoignage documenté et interprétation.",
              "Archangels, stellar memory, astral travel, light body — millennial traditions seeking to understand the relationship between human consciousness and the cosmos. We present this knowledge carefully distinguishing tradition, documented testimony, and interpretation."
            )}
          </p>

          <div
            className="inline-flex items-center gap-2 text-xs px-4 py-2 rounded-full"
            style={{ backgroundColor: 'var(--surface-cosmic)', border: '1px solid var(--border-subtle)', color: 'var(--accent-cosmic)' }}
          >
            <Eye className="w-3.5 h-3.5" />
            {t("Distinctions claires : tradition / témoignage / interprétation / science", "Clear distinctions: tradition / testimony / interpretation / science")}
          </div>
        </motion.div>

        {/* Hero image + archangels */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-6">
          <BentoCard className="min-h-[400px] overflow-hidden !p-0 cursor-pointer">
            <div className="absolute inset-0">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1581333025546-47f446fee132?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3NtaWMlMjBuZWJ1bGElMjBzdGFycyUyMHVuaXZlcnNlJTIwc3Bpcml0dWFsfGVufDF8fHx8MTc3NzQ4NDE1OXww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Cosmic nebula"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            </div>
            <div className="relative z-10 h-full flex flex-col justify-end p-7">
              <p className="text-xs uppercase tracking-[0.2em] mb-2 text-white/60">
                {t('Cosmologie universelle', 'Universal cosmology')}
              </p>
              <h3 className="text-white mb-2">{t("L'Infini dedans et dehors", 'The Infinite Within and Without')}</h3>
              <p className="text-sm text-white/70">
                {t("Hermès Trismégiste : 'Ce qui est en haut est comme ce qui est en bas.' Cette correspondance entre microcosme et macrocosme est le fil conducteur de la cosmologie sacrée.", "Hermes Trismegistus: 'As above, so below.' This correspondence between microcosm and macrocosm is the guiding thread of sacred cosmology.")}
              </p>
            </div>
          </BentoCard>

          {/* Archangels */}
          <BentoCard
            className="lg:col-span-2 min-h-[400px]"
            style={{ backgroundColor: 'var(--surface-cosmic)' }}
            glowColor="var(--glow-cosmic)"
            accentBorder="var(--accent-cosmic)"
          >
            <div className="flex items-center gap-3 mb-6">
              <MagneticElement intensity={0.2}>
                <div className="inline-flex p-2.5 rounded-xl" style={{ backgroundColor: 'color-mix(in srgb, var(--accent-cosmic) 15%, transparent)' }}>
                  <Star className="w-5 h-5" style={{ color: 'var(--accent-cosmic)' }} />
                </div>
              </MagneticElement>
              <div>
                <span className="text-xs uppercase tracking-[0.15em] block" style={{ color: 'var(--accent-cosmic)', fontWeight: 500 }}>
                  {t('Tradition abrahamique • Ésotérisme', 'Abrahamic tradition • Esotericism')}
                </span>
              </div>
            </div>
            <h3 className="mb-3">{t('Les Archanges', 'The Archangels')}</h3>
            <p className="text-sm mb-6 max-w-xl" style={{ color: 'var(--muted-foreground)', lineHeight: 1.8 }}>
              {t(
                "Présents dans le Livre d'Énoch, le Coran, la Bible et les textes zoroastriens, les archanges sont des êtres de premier rang dans la hiérarchie céleste. Chacun gouverne un domaine spécifique.",
                "Present in the Book of Enoch, the Quran, the Bible, and Zoroastrian texts, archangels are first-rank beings in the celestial hierarchy. Each governs a specific domain."
              )}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
              {archangelData.map((angel, i) => (
                <motion.div
                  key={angel.name}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-4 rounded-xl"
                  style={{ backgroundColor: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.7)', border: '1px solid var(--border-subtle)' }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: angel.color }} />
                    <span className="text-sm" style={{ fontWeight: 600 }}>
                      {lang === 'fr' ? angel.name : angel.nameEn}
                    </span>
                  </div>
                  <p className="text-xs mb-1.5" style={{ color: 'var(--muted-foreground)' }}>
                    {lang === 'fr' ? angel.domain : angel.domainEn}
                  </p>
                  <p className="text-[10px]" style={{ color: angel.color, opacity: 0.8 }}>{angel.traditions}</p>
                </motion.div>
              ))}
            </div>
            <Link
              to="/lexicon/archanges"
              className="inline-flex items-center gap-2 text-sm transition-colors"
              style={{ color: 'var(--accent-cosmic)', fontWeight: 500 }}
            >
              <BookOpen className="w-3.5 h-3.5" />
              {t('Lire l\'entrée complète du Lexique', 'Read full Lexicon entry')}
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </BentoCard>
        </div>

        {/* Cosmic subjects */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
          {cosmicSubjects.map((subject, i) => (
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
                  accentBorder={subject.color}
                >
                  <div className="flex flex-col h-full">
                    <div className="w-8 h-8 rounded-full mb-4 flex items-center justify-center" style={{ backgroundColor: `color-mix(in srgb, ${subject.color} 20%, transparent)` }}>
                      <Globe className="w-4 h-4" style={{ color: subject.color }} />
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
          ))}
        </div>

        <SectionDivider color="var(--accent-cosmic)" symbol="star" />

        {/* Sources & Traditions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <BentoCard glowColor="var(--glow-cosmic)" decorative="lines">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-xs uppercase tracking-[0.25em]" style={{ color: 'var(--accent-cosmic)', fontWeight: 500 }}>
                {t('Sources & Références', 'Sources & References')}
              </span>
              <div className="h-px flex-1" style={{ backgroundColor: 'var(--border-subtle)' }} />
            </div>
            <h3 className="mb-2">{t('Textes, Traditions & Recherches', 'Texts, Traditions & Research')}</h3>
            <p className="text-sm mb-6 max-w-xl" style={{ color: 'var(--muted-foreground)', lineHeight: 1.8 }}>
              {t(
                "Chaque source est identifiée par son type : texte ancien, témoignage documenté ou recherche scientifique.",
                "Each source is identified by its type: ancient text, documented testimony, or scientific research."
              )}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {traditions.map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="p-4 rounded-xl"
                  style={{ backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(123,104,212,0.03)', border: '1px solid var(--border-subtle)' }}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="text-sm" style={{ fontWeight: 500 }}>{item.name}</span>
                    <span
                      className="text-[10px] px-2 py-0.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: 'var(--surface-cosmic)', color: 'var(--accent-cosmic)', fontWeight: 500 }}
                    >
                      {lang === 'fr' ? item.typeFr : item.typeEn}
                    </span>
                  </div>
                  <p className="text-xs mb-0.5" style={{ color: item.color }}>{item.tradition}</p>
                  <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>{item.date}</p>
                </motion.div>
              ))}
            </div>
          </BentoCard>
        </motion.div>

        <CategoryLexiconLinks category="cosmology" />

        {/* Deep Subjects CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs uppercase tracking-[0.2em]" style={{ color: 'var(--accent-cosmic)', fontWeight: 500 }}>
              {t('Sujets approfondis', 'Deep subjects')}
            </p>
            <Link to="/savoirs" className="flex items-center gap-1 text-xs" style={{ color: 'var(--accent-cosmic)' }}>
              {t('Voir tous', 'See all')} <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { id: 'archanges', titleFr: 'Les Archanges', titleEn: 'The Archangels', descFr: 'Tradition judéo-chrétienne-islamique, contexte historique, reformulations New Age', descEn: 'Judeo-Christian-Islamic tradition, historical context, New Age reformulations', color: 'var(--accent-gold)' },
              { id: 'memoire-stellaire', titleFr: 'Mémoire Stellaire', titleEn: 'Stellar Memory', descFr: 'Hypothèse New Age, contexte culturel, évaluation critique', descEn: 'New Age hypothesis, cultural context, critical evaluation', color: 'var(--accent-cosmic)' },
              { id: 'voyage-galactique', titleFr: 'Voyage Galactique', titleEn: 'Galactic Journey', descFr: 'Chamanisme cosmique, méditation, tradition vs. interprétation moderne', descEn: 'Cosmic shamanism, meditation, tradition vs. modern interpretation', color: 'var(--accent-cosmic)' },
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
