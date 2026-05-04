import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Clock, ArrowRight, X, BookOpen, Globe, ChevronLeft, ChevronRight, Filter } from 'lucide-react';
import { Link } from 'react-router';
import { useLang } from '../components/LanguageContext';
import { useTheme } from '../components/ThemeContext';
import { SectionDivider } from '../components/SectionDivider';

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
type EventType = 'tradition' | 'text' | 'figure' | 'discovery' | 'movement';
type EraId = 'primordial' | 'ancien' | 'classique' | 'medieval' | 'renaissance' | 'moderne';

interface TimelineEvent {
  id: string;
  year: number;
  yearLabelFr: string;
  yearLabelEn: string;
  titleFr: string;
  titleEn: string;
  descFr: string;
  descEn: string;
  type: EventType;
  tradition: string;
  color: string;
  era: EraId;
  regionFr: string;
  regionEn: string;
  significance: 1 | 2 | 3;
  connectsTo?: string[];
  href?: string;
}

const ERAS: { id: EraId; labelFr: string; labelEn: string; rangeFr: string; rangeEn: string; color: string; descFr: string; descEn: string }[] = [
  { id: 'primordial', labelFr: 'Temps Primordiaux', labelEn: 'Primordial Times', rangeFr: '~35 000 — 4 000 av. J.-C.', rangeEn: '~35,000 — 4,000 BCE', color: '#9B6FC4', descFr: 'Premiers rituels, chamanisme, traditions orales et art rupestre sacré.', descEn: 'First rituals, shamanism, oral traditions, and sacred cave art.' },
  { id: 'ancien', labelFr: 'Antiquité', labelEn: 'Ancient Times', rangeFr: '4 000 — 500 av. J.-C.', rangeEn: '4,000 — 500 BCE', color: '#C89B4A', descFr: 'Naissance des grandes civilisations et de leurs cosmologies fondatrices.', descEn: 'Birth of the great civilizations and their founding cosmologies.' },
  { id: 'classique', labelFr: 'Époque Classique', labelEn: 'Classical Period', rangeFr: '500 av. J.-C. — 500 ap. J.-C.', rangeEn: '500 BCE — 500 CE', color: '#5B8FCC', descFr: 'Philosophie grecque, synthèses spirituelles et transmission interculturelle.', descEn: 'Greek philosophy, spiritual syntheses, and cross-cultural transmission.' },
  { id: 'medieval', labelFr: 'Moyen Âge & Islam', labelEn: 'Middle Ages & Islam', rangeFr: '500 — 1400 ap. J.-C.', rangeEn: '500 — 1400 CE', color: '#C4687C', descFr: 'Mysticisme médiéval, soufisme, kabbale, et floraison de l\'Islam philosophique.', descEn: 'Medieval mysticism, Sufism, Kabbalah, and flourishing of philosophical Islam.' },
  { id: 'renaissance', labelFr: 'Renaissance & Moderne', labelEn: 'Renaissance & Modern', rangeFr: '1400 — 1900', rangeEn: '1400 — 1900', color: '#4ABFA0', descFr: 'Redécouverte hermétique, Rose-Croix, théosophie et premiers syncrétismes modernes.', descEn: 'Hermetic rediscovery, Rosicrucians, Theosophy, and first modern syncretisms.' },
  { id: 'moderne', labelFr: 'Époque Contemporaine', labelEn: 'Contemporary Era', rangeFr: '1900 — présent', rangeEn: '1900 — present', color: '#7B6FC8', descFr: 'Psychologie des profondeurs, New Age, recherches scientifiques sur la conscience.', descEn: 'Depth psychology, New Age, scientific research on consciousness.' },
];

const EVENTS: TimelineEvent[] = [
  // PRIMORDIAL
  { id: 'peintures-rupestres', year: -30000, yearLabelFr: '~30 000 av. J.-C.', yearLabelEn: '~30,000 BCE', titleFr: 'Peintures rupestres et rituels chamaniques', titleEn: 'Cave paintings and shamanic rituals', descFr: "Les premières représentations symboliques connues apparaissent dans les grottes de Lascaux (France), Altamira (Espagne) et d'autres sites. Ces peintures sont interprétées comme des rituels d'animisme et de chamanisme.", descEn: "The first known symbolic representations appear in the caves of Lascaux (France), Altamira (Spain), and other sites. These paintings are interpreted as animism and shamanism rituals.", type: 'tradition', tradition: 'chamanisme', color: '#9B6FC4', era: 'primordial', regionFr: 'Europe, monde', regionEn: 'Europe, worldwide', significance: 3 },
  { id: 'stonehenge', year: -3000, yearLabelFr: '~3 000 av. J.-C.', yearLabelEn: '~3,000 BCE', titleFr: 'Construction de Stonehenge', titleEn: 'Construction of Stonehenge', descFr: "Monument mégalithique aligné sur les solstices, témoignant d'une cosmologie sophistiquée et de pratiques rituelles complexes. Son usage exact reste débattu entre les historiens.", descEn: "Megalithic monument aligned with solstices, attesting to a sophisticated cosmology and complex ritual practices. Its exact use remains debated among historians.", type: 'discovery', tradition: 'celtique', color: '#9B6FC4', era: 'primordial', regionFr: 'Angleterre', regionEn: 'England', significance: 2, href: '/sacred-geometry' },

  // ANCIEN
  { id: 'egypte-royaumes', year: -3100, yearLabelFr: '3 100 av. J.-C.', yearLabelEn: '3,100 BCE', titleFr: 'Fondation de l\'Égypte pharaonique', titleEn: 'Foundation of Pharaonic Egypt', descFr: "Unification des Deux Terres par Narmer. Naissance d'un des systèmes ésotériques les plus sophistiqués de l'histoire : géométrie sacrée, astronomie rituelle, cultes funéraires.", descEn: "Unification of the Two Lands by Narmer. Birth of one of history's most sophisticated esoteric systems: sacred geometry, ritual astronomy, funerary cults.", type: 'tradition', tradition: 'Égypte', color: '#C89B4A', era: 'ancien', regionFr: 'Égypte', regionEn: 'Egypt', significance: 3, connectsTo: ['corpus-hermeticum'], href: '/alchemy' },
  { id: 'vedas', year: -1500, yearLabelFr: '~1 500 av. J.-C.', yearLabelEn: '~1,500 BCE', titleFr: 'Rédaction des Vedas (Rig-Véda)', titleEn: 'Composition of the Vedas (Rig-Veda)', descFr: "Les quatre Vedas constituent le corpus de la révélation hindoue (Shruti). Le Rig-Véda est l'une des plus anciennes compositions religieuses connues, avec plus de 1 000 hymnes.", descEn: "The four Vedas form the corpus of Hindu revelation (Shruti). The Rig-Veda is one of the oldest known religious compositions, with over 1,000 hymns.", type: 'text', tradition: 'Inde védique', color: '#C4687C', era: 'ancien', regionFr: 'Inde', regionEn: 'India', significance: 3, href: '/conscience' },
  { id: 'lao-tseu', year: -600, yearLabelFr: '~600 av. J.-C.', yearLabelEn: '~600 BCE', titleFr: 'Lao-Tseu et le Tao Te Ching', titleEn: 'Lao Tzu and the Tao Te Ching', descFr: "Fondation du taoïsme philosophique. Le Tao Te Ching (81 chapitres) expose la voie du non-agir (wu wei) et la nature du Tao comme principe premier de la réalité.", descEn: "Foundation of philosophical Taoism. The Tao Te Ching (81 chapters) expounds the way of non-action (wu wei) and the nature of the Tao as the first principle of reality.", type: 'figure', tradition: 'Chine', color: '#4ABFA0', era: 'ancien', regionFr: 'Chine', regionEn: 'China', significance: 3 },
  { id: 'upanishads', year: -800, yearLabelFr: '~800–200 av. J.-C.', yearLabelEn: '~800–200 BCE', titleFr: 'Composition des Upanishads', titleEn: 'Composition of the Upanishads', descFr: "Les Upanishads développent la philosophie Vedanta — Atman (âme individuelle) = Brahman (âme universelle). Base du non-dualisme indien (Advaita Vedanta).", descEn: "The Upanishads develop Vedanta philosophy — Atman (individual soul) = Brahman (universal soul). Foundation of Indian non-dualism (Advaita Vedanta).", type: 'text', tradition: 'Inde védique', color: '#C4687C', era: 'ancien', regionFr: 'Inde', regionEn: 'India', significance: 3, connectsTo: ['bhagavad-gita'], href: '/conscience' },

  // CLASSIQUE
  { id: 'pythagore-figure', year: -570, yearLabelFr: '570 av. J.-C.', yearLabelEn: '570 BCE', titleFr: 'Naissance de Pythagore', titleEn: 'Birth of Pythagoras', descFr: "Fondateur de l'école ésotérique pythagoricienne qui voit dans les nombres la clé de la réalité. Introduit la métempsychose (transmigration des âmes) en philosophie grecque.", descEn: "Founder of the Pythagorean esoteric school that sees numbers as the key to reality. Introduces metempsychosis (transmigration of souls) into Greek philosophy.", type: 'figure', tradition: 'Grèce', color: '#5B8FCC', era: 'classique', regionFr: 'Grèce, Italie du Sud', regionEn: 'Greece, Southern Italy', significance: 3, href: '/numerology' },
  { id: 'bouddha', year: -563, yearLabelFr: '~563 av. J.-C.', yearLabelEn: '~563 BCE', titleFr: 'Éveil du Bouddha Shakyamuni', titleEn: 'Awakening of Buddha Shakyamuni', descFr: "Siddhartha Gautama atteint l'éveil (bodhi) sous l'arbre de la Bodhi à Bodhgaya. Premier discours à Bénarès — fondation d'une tradition qui comptera 500 millions de fidèles.", descEn: "Siddhartha Gautama achieves awakening (bodhi) under the Bodhi tree at Bodhgaya. First discourse at Benares — founding of a tradition that will count 500 million followers.", type: 'figure', tradition: 'Bouddhisme', color: '#4ABFA0', era: 'classique', regionFr: 'Inde (Népal)', regionEn: 'India (Nepal)', significance: 3, href: '/conscience' },
  { id: 'platon-republique', year: -380, yearLabelFr: '~380 av. J.-C.', yearLabelEn: '~380 BCE', titleFr: 'Platon et la République / Timée', titleEn: 'Plato\'s Republic & Timaeus', descFr: "Le Timée propose une cosmogonie mathématique. Les Solides de Platon (tétraèdre, hexaèdre, octaèdre, icosaèdre, dodécaèdre) associent éléments et formes géométriques.", descEn: "The Timaeus proposes a mathematical cosmogony. Plato's Solids (tetrahedron, hexahedron, octahedron, icosahedron, dodecahedron) associate elements and geometric forms.", type: 'text', tradition: 'Grèce', color: '#5B8FCC', era: 'classique', regionFr: 'Athènes', regionEn: 'Athens', significance: 3, href: '/sacred-geometry' },
  { id: 'corpus-hermeticum-event', year: 200, yearLabelFr: 'IIe–IIIe siècle', yearLabelEn: '2nd–3rd century', titleFr: 'Rédaction du Corpus Hermeticum', titleEn: 'Composition of the Hermetic Corpus', descFr: "Ensemble de textes philosophiques écrits en grec attribués à Hermès Trismégiste. Fondement de la tradition hermétique qui influencera la Renaissance européenne.", descEn: "Set of philosophical texts written in Greek attributed to Hermes Trismegistus. Foundation of the hermetic tradition that will influence the European Renaissance.", type: 'text', tradition: 'Hermétisme', color: '#C89B4A', era: 'classique', regionFr: 'Égypte (Alexandrie)', regionEn: 'Egypt (Alexandria)', significance: 3, href: '/alchemy' },

  // MEDIEVAL
  { id: 'islam-philosophie', year: 830, yearLabelFr: '~830 ap. J.-C.', yearLabelEn: '~830 CE', titleFr: 'Âge d\'or islamique — Maison de la Sagesse', titleEn: 'Islamic Golden Age — House of Wisdom', descFr: "Baghdad devient le centre mondial du savoir. Traduction des textes grecs, développement de l'alchimie arabe (Jâbir ibn Hayyân), de l'astrologie et de la philosophie islamique.", descEn: "Baghdad becomes the world center of knowledge. Translation of Greek texts, development of Arabic alchemy (Jabir ibn Hayyan), astrology, and Islamic philosophy.", type: 'movement', tradition: 'Islam', color: '#4ABFA0', era: 'medieval', regionFr: 'Irak (Baghdad)', regionEn: 'Iraq (Baghdad)', significance: 3 },
  { id: 'zohar-event', year: 1280, yearLabelFr: '~1280', yearLabelEn: '~1280', titleFr: 'Rédaction du Zohar (Kabbale)', titleEn: 'Composition of the Zohar (Kabbalah)', descFr: "Moïse de Léon (attribué) rédige le Zohar en Castille — texte fondateur de la Kabbale juive. Introduce l'arbre des Sephiroth et l'exploration de l'Ein Sof.", descEn: "Moses de León (attributed) writes the Zohar in Castile — founding text of Jewish Kabbalah. Introduces the Tree of Sephiroth and exploration of Ein Sof.", type: 'text', tradition: 'Kabbale', color: '#9B6FC4', era: 'medieval', regionFr: 'Espagne (Castille)', regionEn: 'Spain (Castile)', significance: 3, href: '/symbolism' },
  { id: 'rumi-event', year: 1207, yearLabelFr: '1207', yearLabelEn: '1207', titleFr: 'Naissance de Rumi', titleEn: 'Birth of Rumi', descFr: "Naissance à Balkh (Afghanistan actuel) de Jalāl ad-Dīn Rūmī, futur auteur du Masnavi et fondateur de l'ordre Mevlevi (derviches tourneurs).", descEn: "Birth in Balkh (present-day Afghanistan) of Jalāl ad-Dīn Rūmī, future author of the Masnavi and founder of the Mevlevi order (whirling dervishes).", type: 'figure', tradition: 'Soufisme', color: '#4ABFA0', era: 'medieval', regionFr: 'Asie centrale, Turquie', regionEn: 'Central Asia, Turkey', significance: 3 },

  // RENAISSANCE
  { id: 'ficin-corpus', year: 1471, yearLabelFr: '1471', yearLabelEn: '1471', titleFr: 'Ficin traduit le Corpus Hermeticum', titleEn: 'Ficino translates the Hermetic Corpus', descFr: "Marsile Ficin traduit pour Côme de Médicis le Corpus Hermeticum en latin — déclenchant la floraison hermético-néoplatonicienne de la Renaissance florentine.", descEn: "Marsilio Ficino translates the Hermetic Corpus into Latin for Cosimo de' Medici — triggering the hermetic-Neoplatonic flowering of the Florentine Renaissance.", type: 'discovery', tradition: 'Hermétisme', color: '#C89B4A', era: 'renaissance', regionFr: 'Florence (Italie)', regionEn: 'Florence (Italy)', significance: 3, href: '/alchemy' },
  { id: 'paracelse-event', year: 1493, yearLabelFr: '1493', yearLabelEn: '1493', titleFr: 'Naissance de Paracelse', titleEn: 'Birth of Paracelsus', descFr: "Alchimiste, médecin et philosophe suisse, il synthétise alchimie, médecine, astrologie et magie naturelle. Introduit l'idée de microcosme-macrocosme en médecine.", descEn: "Swiss alchemist, physician, and philosopher, he synthesizes alchemy, medicine, astrology, and natural magic. Introduces the microcosm-macrocosm idea in medicine.", type: 'figure', tradition: 'Alchimie', color: '#C89B4A', era: 'renaissance', regionFr: 'Suisse, Europe', regionEn: 'Switzerland, Europe', significance: 2, href: '/alchemy' },
  { id: 'rose-croix', year: 1614, yearLabelFr: '1614', yearLabelEn: '1614', titleFr: 'Manifestes Rosicruciens', titleEn: 'Rosicrucian Manifestos', descFr: "Publication de la Fama Fraternitatis en Allemagne — fondation mythique de la Fraternité de la Rose-Croix. Fusion d'hermétisme, de Kabbale chrétienne et d'alchimie.", descEn: "Publication of the Fama Fraternitatis in Germany — mythical foundation of the Rosicrucian Brotherhood. Fusion of Hermeticism, Christian Kabbalah, and alchemy.", type: 'movement', tradition: 'Rose-Croix', color: '#C4687C', era: 'renaissance', regionFr: 'Allemagne, Europe', regionEn: 'Germany, Europe', significance: 2, href: '/alchemy' },
  { id: 'theosophie', year: 1875, yearLabelFr: '1875', yearLabelEn: '1875', titleFr: 'Fondation de la Société Théosophique', titleEn: 'Founding of the Theosophical Society', descFr: "Helena Blavatsky et Henry Steel Olcott fondent la Société Théosophique à New York. Synthèse entre ésotérisme occidental et traditions orientales (Isis Dévoilée, La Doctrine Secrète).", descEn: "Helena Blavatsky and Henry Steel Olcott found the Theosophical Society in New York. Synthesis between Western esotericism and Eastern traditions (Isis Unveiled, The Secret Doctrine).", type: 'movement', tradition: 'Théosophie', color: '#9B6FC4', era: 'renaissance', regionFr: 'New York, Inde', regionEn: 'New York, India', significance: 2 },

  // MODERNE
  { id: 'jung-alchimie', year: 1944, yearLabelFr: '1944', yearLabelEn: '1944', titleFr: 'Jung publie "Psychologie et Alchimie"', titleEn: 'Jung publishes "Psychology and Alchemy"', descFr: "Carl Jung réinterprète l'alchimie comme langage symbolique de l'individuation psychologique. Réhabilite le symbolisme ésotérique dans un cadre académique et psychologique.", descEn: "Carl Jung reinterprets alchemy as the symbolic language of psychological individuation. Rehabilitates esoteric symbolism within an academic and psychological framework.", type: 'text', tradition: 'Psychologie', color: '#9B6FC4', era: 'moderne', regionFr: 'Suisse', regionEn: 'Switzerland', significance: 3, href: '/alchemy' },
  { id: 'capra-tao', year: 1975, yearLabelFr: '1975', yearLabelEn: '1975', titleFr: 'Fritjof Capra — Le Tao de la Physique', titleEn: 'Fritjof Capra — The Tao of Physics', descFr: "Exploration des parallèles entre physique quantique et mystiques orientaux (bouddhisme, taoïsme, hindouisme). Ouvre un dialogue entre science et sagesse traditionnelle. Resté controversé en physique.", descEn: "Exploration of parallels between quantum physics and Eastern mystics (Buddhism, Taoism, Hinduism). Opens a dialogue between science and traditional wisdom. Remains controversial in physics.", type: 'text', tradition: 'Contemporain', color: '#5B8FCC', era: 'moderne', regionFr: 'USA, International', regionEn: 'USA, International', significance: 2, href: '/cosmologie' },
  { id: 'don-miguel-ruiz', year: 1997, yearLabelFr: '1997', yearLabelEn: '1997', titleFr: 'Les Quatre Accords Toltèques', titleEn: 'The Four Agreements', descFr: "Don Miguel Ruiz publie un best-seller mondial présentant la sagesse toltèque pour le lecteur contemporain. Vendu à plus de 10 millions d'exemplaires. Son rapport à la tradition toltèque historique est discuté.", descEn: "Don Miguel Ruiz publishes a worldwide bestseller presenting Toltec wisdom for the contemporary reader. Sold over 10 million copies. Its relationship to historical Toltec tradition is debated.", type: 'text', tradition: 'Toltèque', color: '#4ABFA0', era: 'moderne', regionFr: 'USA, Mexique', regionEn: 'USA, Mexico', significance: 2 },
];

const TYPE_COLORS: Record<EventType, string> = {
  tradition: 'var(--accent-gold)',
  text: 'var(--accent-blue)',
  figure: 'var(--accent-rose)',
  discovery: 'var(--accent-teal)',
  movement: 'var(--accent-purple)',
};

const TYPE_LABELS_FR: Record<EventType, string> = {
  tradition: 'Tradition', text: 'Texte', figure: 'Figure', discovery: 'Découverte', movement: 'Mouvement',
};
const TYPE_LABELS_EN: Record<EventType, string> = {
  tradition: 'Tradition', text: 'Text', figure: 'Figure', discovery: 'Discovery', movement: 'Movement',
};

/* ─────────────────────────────────────────────
   PAGE
───────────────────────────────────────────── */
export function TimelinePage() {
  const { t, lang } = useLang();
  const { isDark } = useTheme();
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);
  const [activeEra, setActiveEra] = useState<EraId | null>(null);
  const [activeType, setActiveType] = useState<EventType | null>(null);
  const [activeSignificance, setActiveSignificance] = useState<1 | 2 | 3 | null>(null);

  const filteredEvents = EVENTS.filter((e) => {
    if (activeEra && e.era !== activeEra) return false;
    if (activeType && e.type !== activeType) return false;
    if (activeSignificance && e.significance < activeSignificance) return false;
    return true;
  });

  const eventsByEra = ERAS.map((era) => ({
    era,
    events: filteredEvents.filter((e) => e.era === era.id).sort((a, b) => a.year - b.year),
  })).filter((g) => !activeEra || g.era.id === activeEra);

  return (
    <div className="pt-16 pb-16">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8">

        {/* ── Header ── */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
          className="pt-10 mb-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="inline-flex p-2.5 rounded-xl" style={{ backgroundColor: 'var(--surface-gold)' }}>
              <Clock className="w-5 h-5" style={{ color: 'var(--accent-gold)' }} />
            </div>
            <span className="text-xs uppercase tracking-[0.3em]" style={{ color: 'var(--accent-gold)', fontWeight: 500 }}>
              {t('Frise chronologique', 'Historical timeline')}
            </span>
          </div>
          <h1 className="mb-2" style={{ fontSize: 'clamp(2rem, 3.5vw, 3.2rem)', lineHeight: 1.1 }}>
            {t('Chronologie des', 'Chronology of')} <span style={{ color: 'var(--accent-gold)' }}>{t('Traditions Sacrées', 'Sacred Traditions')}</span>
          </h1>
          <p className="max-w-2xl text-sm" style={{ color: 'var(--muted-foreground)', lineHeight: 1.85 }}>
            {t(
              "35 000 ans de sagesse humaine sur une ligne du temps. Situez chaque tradition, texte fondateur et grande figure dans leur contexte historique — et visualisez la circulation des idées entre civilisations.",
              "35,000 years of human wisdom on a timeline. Situate each tradition, founding text, and great figure in their historical context — and visualize the circulation of ideas between civilizations."
            )}
          </p>
        </motion.div>

        {/* ── Filters ── */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-2 mb-4">
          <span className="text-xs self-center" style={{ color: 'var(--muted-foreground)' }}>
            <Filter className="w-3 h-3 inline mr-1" />{t('Filtrer par :', 'Filter by:')}
          </span>
          {(['tradition', 'text', 'figure', 'discovery', 'movement'] as EventType[]).map((type) => (
            <button key={type} onClick={() => setActiveType(activeType === type ? null : type)}
              className="text-xs px-3 py-1 rounded-full transition-all"
              style={{ backgroundColor: activeType === type ? `color-mix(in srgb, ${TYPE_COLORS[type]} 15%, transparent)` : 'transparent', color: activeType === type ? TYPE_COLORS[type] : 'var(--muted-foreground)', border: `1px solid ${activeType === type ? TYPE_COLORS[type] : 'var(--border-subtle)'}` }}>
              {lang === 'fr' ? TYPE_LABELS_FR[type] : TYPE_LABELS_EN[type]}
            </button>
          ))}
          <button onClick={() => setActiveSignificance(activeSignificance === 3 ? null : 3)}
            className="text-xs px-3 py-1 rounded-full transition-all"
            style={{ backgroundColor: activeSignificance === 3 ? 'var(--surface-gold)' : 'transparent', color: activeSignificance === 3 ? 'var(--accent-gold)' : 'var(--muted-foreground)', border: `1px solid ${activeSignificance === 3 ? 'var(--accent-gold)' : 'var(--border-subtle)'}` }}>
            ★★★ {t('Majeurs seulement', 'Major only')}
          </button>
          {(activeType || activeEra || activeSignificance) && (
            <button onClick={() => { setActiveType(null); setActiveEra(null); setActiveSignificance(null); }}
              className="text-xs px-3 py-1 rounded-full transition-all"
              style={{ color: 'var(--muted-foreground)', border: '1px solid var(--border-subtle)' }}>
              <X className="w-3 h-3 inline mr-1" />{t('Effacer', 'Clear')}
            </button>
          )}
        </motion.div>

        {/* ── Era Quick Nav ── */}
        <div className="flex flex-wrap gap-1.5 mb-8">
          <button onClick={() => setActiveEra(null)}
            className="text-[10px] px-3 py-1 rounded-full transition-all uppercase tracking-[0.12em]"
            style={{ backgroundColor: !activeEra ? 'var(--muted)' : 'transparent', color: !activeEra ? 'var(--foreground)' : 'var(--muted-foreground)', border: '1px solid var(--border-subtle)' }}>
            {t('Toutes', 'All')}
          </button>
          {ERAS.map((era) => (
            <button key={era.id} onClick={() => setActiveEra(activeEra === era.id ? null : era.id)}
              className="text-[10px] px-3 py-1 rounded-full transition-all uppercase tracking-[0.1em]"
              style={{ backgroundColor: activeEra === era.id ? `color-mix(in srgb, ${era.color} 15%, transparent)` : 'transparent', color: activeEra === era.id ? era.color : 'var(--muted-foreground)', border: `1px solid ${activeEra === era.id ? era.color : 'var(--border-subtle)'}` }}>
              {lang === 'fr' ? era.labelFr : era.labelEn}
            </button>
          ))}
        </div>

        {/* ── Timeline ── */}
        <div className="relative">
          {/* Central vertical line */}
          <div className="absolute left-0 lg:left-1/2 top-0 bottom-0 w-px ml-6 lg:ml-0"
            style={{ background: 'linear-gradient(to bottom, transparent, var(--border) 5%, var(--border) 95%, transparent)' }} />

          {eventsByEra.map((group, gi) => (
            <div key={group.era.id} className="mb-12">
              {/* Era header */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                className="relative flex items-center gap-4 mb-6 pl-16 lg:pl-0"
              >
                {/* Era dot on line */}
                <div className="absolute left-0 lg:left-1/2 w-3 h-3 rounded-full border-2 -ml-1 lg:-ml-1.5"
                  style={{ backgroundColor: group.era.color, borderColor: isDark ? 'rgba(12,10,22,1)' : 'white', zIndex: 2 }} />
                {/* Era label — alternating sides */}
                <div className="lg:w-1/2 lg:pr-8" style={{ marginLeft: gi % 2 === 0 ? 0 : 'auto', textAlign: gi % 2 === 0 ? 'right' : 'left' }}>
                  <div className="inline-block">
                    <div className="flex items-center gap-2 mb-1" style={{ justifyContent: gi % 2 === 0 ? 'flex-end' : 'flex-start' }}>
                      <div className="w-8 h-px" style={{ backgroundColor: group.era.color, opacity: 0.6 }} />
                      <span className="text-[10px] uppercase tracking-[0.25em]" style={{ color: group.era.color, fontWeight: 600 }}>
                        {lang === 'fr' ? group.era.labelFr : group.era.labelEn}
                      </span>
                      <div className="w-8 h-px" style={{ backgroundColor: group.era.color, opacity: 0.6 }} />
                    </div>
                    <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
                      {lang === 'fr' ? group.era.rangeFr : group.era.rangeEn}
                    </p>
                    <p className="text-xs mt-0.5 max-w-xs" style={{ color: 'var(--muted-foreground)', fontStyle: 'italic' }}>
                      {lang === 'fr' ? group.era.descFr : group.era.descEn}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Events */}
              <div className="space-y-3 pl-16 lg:pl-0">
                {group.events.map((event, ei) => {
                  const isLeft = ei % 2 === 0;
                  const isSelected = selectedEvent?.id === event.id;
                  return (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, x: isLeft ? -20 : 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: '-30px' }}
                      transition={{ delay: ei * 0.06 }}
                      className="relative lg:flex lg:items-start"
                    >
                      {/* Left side (desktop) */}
                      <div className={`hidden lg:block w-1/2 ${isLeft ? 'pr-10 text-right' : ''}`}>
                        {isLeft && (
                          <EventCard event={event} lang={lang} isDark={isDark} isSelected={isSelected}
                            onSelect={() => setSelectedEvent(isSelected ? null : event)} />
                        )}
                      </div>

                      {/* Timeline dot */}
                      <div className="absolute left-0 lg:left-1/2 top-4 lg:top-4 -ml-0.5 lg:-ml-2.5 z-10">
                        <motion.div
                          className="w-5 h-5 rounded-full border-2 flex items-center justify-center"
                          style={{ backgroundColor: event.color, borderColor: isDark ? 'rgba(12,10,22,1)' : 'white' }}
                          animate={isSelected ? { scale: [1, 1.3, 1] } : {}}
                          transition={{ duration: 1, repeat: isSelected ? Infinity : 0 }}
                        >
                          {event.significance === 3 && <div className="w-2 h-2 rounded-full bg-white opacity-80" />}
                        </motion.div>
                      </div>

                      {/* Right side (desktop) or always on mobile */}
                      <div className={`lg:w-1/2 ${isLeft ? 'hidden lg:block' : 'lg:pl-10'}`}>
                        {!isLeft && (
                          <EventCard event={event} lang={lang} isDark={isDark} isSelected={isSelected}
                            onSelect={() => setSelectedEvent(isSelected ? null : event)} />
                        )}
                      </div>

                      {/* Mobile card */}
                      <div className="lg:hidden">
                        <EventCard event={event} lang={lang} isDark={isDark} isSelected={isSelected}
                          onSelect={() => setSelectedEvent(isSelected ? null : event)} />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* ── Selected event detail panel ── */}
        <AnimatePresence>
          {selectedEvent && (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 24 }}
              className="fixed bottom-6 left-4 right-4 lg:left-auto lg:right-6 lg:w-[400px] rounded-2xl p-5 z-50 shadow-2xl"
              style={{
                backgroundColor: isDark ? `color-mix(in srgb, ${selectedEvent.color} 6%, rgba(12,10,22,0.98))` : `color-mix(in srgb, ${selectedEvent.color} 4%, rgba(252,250,255,0.98))`,
                border: `1px solid color-mix(in srgb, ${selectedEvent.color} 25%, transparent)`,
                backdropFilter: 'blur(16px)',
              }}
            >
              <div className="h-[2px] rounded-full mb-3" style={{ background: `linear-gradient(90deg, ${selectedEvent.color}, transparent)` }} />
              <div className="flex items-start justify-between gap-2 mb-1">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.15em]" style={{ color: selectedEvent.color, fontWeight: 600 }}>
                    {selectedEvent.yearLabelFr} — {lang === 'fr' ? selectedEvent.regionFr : selectedEvent.regionEn}
                  </span>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.15rem', color: 'var(--foreground)', lineHeight: 1.2, marginTop: '0.2rem' }}>
                    {lang === 'fr' ? selectedEvent.titleFr : selectedEvent.titleEn}
                  </h3>
                </div>
                <button onClick={() => setSelectedEvent(null)} className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--muted)', color: 'var(--muted-foreground)' }}>
                  <X className="w-3 h-3" />
                </button>
              </div>
              <p className="text-xs mt-2" style={{ color: 'var(--muted-foreground)', lineHeight: 1.75 }}>
                {lang === 'fr' ? selectedEvent.descFr : selectedEvent.descEn}
              </p>
              {selectedEvent.href && (
                <Link to={selectedEvent.href} className="inline-flex items-center gap-1.5 mt-3 text-xs font-medium transition-opacity hover:opacity-80"
                  style={{ color: selectedEvent.color }}>
                  {t('Explorer ce thème', 'Explore this theme')} <ArrowRight className="w-3 h-3" />
                </Link>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <SectionDivider color="var(--accent-gold)" symbol="diamond" />

        {/* Bottom notes */}
        <div className="py-6 text-center max-w-2xl mx-auto">
          <p className="text-xs" style={{ color: 'var(--muted-foreground)', lineHeight: 1.9, fontStyle: 'italic' }}>
            {t(
              "Cette frise synthétise des traditions de sources et de natures diverses — historiques, textuelles, mythologiques. Les datations approximatives sont indiquées par «~». La chronologie ne présuppose pas d'évolution ni de hiérarchie entre les traditions.",
              "This timeline synthesizes traditions of diverse sources and natures — historical, textual, mythological. Approximate dates are indicated by '~'. The chronology does not presuppose any evolution or hierarchy between traditions."
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

function EventCard({ event, lang, isDark, isSelected, onSelect }: {
  event: TimelineEvent; lang: 'fr' | 'en'; isDark: boolean; isSelected: boolean; onSelect: () => void;
}) {
  return (
    <motion.div
      onClick={onSelect}
      className="rounded-xl p-3.5 cursor-pointer transition-all duration-200 mb-1"
      style={{
        backgroundColor: isSelected
          ? isDark ? `color-mix(in srgb, ${event.color} 10%, rgba(12,10,22,0.9))` : `color-mix(in srgb, ${event.color} 6%, white)`
          : isDark ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.8)',
        border: `1px solid ${isSelected ? event.color : 'var(--border-subtle)'}`,
        boxShadow: isSelected ? `0 4px 16px color-mix(in srgb, ${event.color} 12%, transparent)` : 'none',
      }}
      whileHover={{ y: -1, scale: 1.005 }}
    >
      <div className="flex items-start gap-2.5">
        <div>
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="text-[9px] uppercase tracking-[0.15em]" style={{ color: event.color, fontWeight: 600 }}>
              {event.yearLabelFr}
            </span>
            <span className="text-[9px] px-1.5 py-0.5 rounded" style={{ backgroundColor: `color-mix(in srgb, ${TYPE_COLORS[event.type]} 10%, transparent)`, color: TYPE_COLORS[event.type] }}>
              {lang === 'fr' ? TYPE_LABELS_FR[event.type] : TYPE_LABELS_EN[event.type]}
            </span>
            {'★'.repeat(event.significance).split('').map((s, i) => (
              <span key={i} className="text-[8px]" style={{ color: event.color, opacity: 0.7 }}>{s}</span>
            ))}
          </div>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.95rem', color: 'var(--foreground)', lineHeight: 1.25, fontWeight: 500 }}>
            {lang === 'fr' ? event.titleFr : event.titleEn}
          </p>
          <p className="text-[11px] mt-1" style={{ color: 'var(--muted-foreground)', lineHeight: 1.5 }}>
            {(lang === 'fr' ? event.regionFr : event.regionEn)} — {event.tradition}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
