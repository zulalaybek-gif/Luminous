import { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search, Filter, X, ArrowRight, BookOpen, Flame, Eye, Hexagon, Infinity as InfinityIcon,
  Waves, Globe, Map, User, FileText, Compass, Lightbulb, AlertCircle, Star, ChevronDown, ChevronRight,
} from 'lucide-react';
import { Link } from 'react-router';
import { useLang } from '../components/LanguageContext';
import { useTheme } from '../components/ThemeContext';
import { lexiconEntries, categoryConfig } from '../components/lexiconData';
import { sanitizeSearchQuery } from '../components/sanitize';

/* ─────────────────────────────────────────────
   DATA TYPES & SEARCH INDEX
───────────────────────────────────────────── */
type ContentType = 'concept' | 'figure' | 'practice' | 'tradition' | 'text' | 'symbol';
type ReliabilityType = 'recherche' | 'tradition' | 'temoignage' | 'hypothese' | 'scientifique' | 'controverse';
type ThemeType = 'alchemy' | 'symbolism' | 'numerology' | 'sacred-geometry' | 'conscience' | 'cosmologie';

interface SearchItem {
  id: string;
  titleFr: string;
  titleEn: string;
  subtitleFr?: string;
  subtitleEn?: string;
  descFr: string;
  descEn: string;
  type: ContentType;
  themes: ThemeType[];
  traditions: string[];
  reliability: ReliabilityType;
  tags: string[];
  relatedIds: string[];
  confusedWith?: string[];
  color: string;
  href: string;
  era?: string;
}

// ── Figures ──
const FIGURES: SearchItem[] = [
  {
    id: 'hermes-trismegiste', titleFr: 'Hermès Trismégiste', titleEn: 'Hermes Trismegistus',
    subtitleFr: 'Figure légendaire de la sagesse', subtitleEn: 'Legendary figure of wisdom',
    descFr: "Figure semi-mythique à l'origine du Corpus Hermeticum. Son nom signifie 'trois fois grand'. Probablement une fusion d'Hermès grec et de Thot égyptien.",
    descEn: "Semi-mythical figure at the origin of the Hermetic Corpus. His name means 'thrice great'. Likely a fusion of Greek Hermes and Egyptian Thoth.",
    type: 'figure', themes: ['alchemy', 'symbolism'], traditions: ['egypt', 'europe-medieval'],
    reliability: 'tradition', tags: ['hermétisme', 'table émeraude', 'alchimie', 'syncrétisme'],
    relatedIds: ['pierre-philosophale', 'grand-oeuvre'], confusedWith: ['pythagore', 'merlin'],
    color: 'var(--accent-gold)', href: '/alchemy', era: 'Antiquité tardive',
  },
  {
    id: 'pythagore', titleFr: 'Pythagore', titleEn: 'Pythagoras',
    subtitleFr: '570–495 av. J.-C. — Philosophe & mathématicien', subtitleEn: '570–495 BCE — Philosopher & mathematician',
    descFr: "Fondateur de l'école pythagoricienne, il enseignait que les nombres sont la structure fondamentale de la réalité. A voyagé en Égypte et Babylone.",
    descEn: "Founder of the Pythagorean school, he taught that numbers are the fundamental structure of reality. Traveled to Egypt and Babylon.",
    type: 'figure', themes: ['numerology', 'sacred-geometry'], traditions: ['greece'],
    reliability: 'recherche', tags: ['nombres', 'harmonie des sphères', 'métempsychose', 'géométrie'],
    relatedIds: ['nombre-or', 'solides-platon', 'nombre-sacre-7'], confusedWith: ['platon'],
    color: 'var(--accent-blue)', href: '/numerology', era: 'Antiquité classique',
  },
  {
    id: 'rumi', titleFr: 'Rumi (Djalâl al-Dîn)', titleEn: 'Rumi (Jalāl ad-Dīn)',
    subtitleFr: '1207–1273 — Poète et mystique soufi', subtitleEn: '1207–1273 — Sufi poet and mystic',
    descFr: "L'un des plus grands poètes mystiques de tous les temps. Son œuvre principale, le Masnavi, est souvent appelée 'le Coran persan'. Fondateur de l'ordre des derviches tourneurs.",
    descEn: "One of the greatest mystical poets of all time. His main work, the Masnavi, is often called 'the Persian Quran'. Founder of the Mevlevi (whirling dervishes) order.",
    type: 'figure', themes: ['conscience', 'symbolism'], traditions: ['sufism'],
    reliability: 'recherche', tags: ['amour divin', 'soufisme', 'poésie', 'dance'],
    relatedIds: ['eveil', 'conscience-cosmique'], confusedWith: ['hafez', 'ibn-arabi'],
    color: 'var(--accent-teal)', href: '/conscience', era: 'Moyen Âge',
  },
  {
    id: 'carl-jung', titleFr: 'Carl Gustav Jung', titleEn: 'Carl Gustav Jung',
    subtitleFr: '1875–1961 — Psychanalyste & penseur des archétypes', subtitleEn: '1875–1961 — Psychoanalyst & archetype thinker',
    descFr: "Jung a développé le concept d'inconscient collectif et d'archétypes, et a étudié l'alchimie comme langage de l'âme. Il a réhabilité le symbolisme ésotérique dans un cadre psychologique.",
    descEn: "Jung developed the concept of the collective unconscious and archetypes, and studied alchemy as a language of the soul. He rehabilitated esoteric symbolism within a psychological framework.",
    type: 'figure', themes: ['symbolism', 'conscience'], traditions: ['europe-medieval'],
    reliability: 'scientifique', tags: ['archétypes', 'inconscient collectif', 'synchronicité', 'alchimie psychologique'],
    relatedIds: ['archetype', 'mandalas', 'synchronicite'], confusedWith: ['freud'],
    color: 'var(--accent-purple)', href: '/symbolism', era: 'Époque contemporaine',
  },
  {
    id: 'paracelse', titleFr: 'Paracelse', titleEn: 'Paracelsus',
    subtitleFr: '1493–1541 — Alchimiste, médecin & philosophe', subtitleEn: '1493–1541 — Alchemist, physician & philosopher',
    descFr: "Médecin révolutionnaire qui rejeta la médecine galénique pour une approche spagyrique. Il introduisit le zinc et l'opium en médecine et développa une vision du corps comme microcosme.",
    descEn: "Revolutionary physician who rejected Galenic medicine for a spagyric approach. He introduced zinc and opium in medicine and developed a vision of the body as a microcosm.",
    type: 'figure', themes: ['alchemy', 'symbolism'], traditions: ['europe-medieval'],
    reliability: 'recherche', tags: ['spagyrie', 'correspondances', 'macrocosme', 'microcosme'],
    relatedIds: ['grand-oeuvre', 'pierre-philosophale'],
    color: 'var(--accent-gold)', href: '/alchemy', era: 'Renaissance',
  },
  {
    id: 'ramana-maharshi', titleFr: 'Ramana Maharshi', titleEn: 'Ramana Maharshi',
    subtitleFr: '1879–1950 — Sage de l\'Advaita Vedanta', subtitleEn: '1879–1950 — Sage of Advaita Vedanta',
    descFr: "Figure majeure de la spiritualité non-dualiste contemporaine. Sa méthode principale : l'auto-investigation (Vichara) — 'Qui suis-je ?'. Ses enseignements ont influencé Eckhart Tolle.",
    descEn: "Major figure of contemporary non-dualist spirituality. His main method: self-inquiry (Vichara) — 'Who am I?'. His teachings influenced Eckhart Tolle.",
    type: 'figure', themes: ['conscience'], traditions: ['india'],
    reliability: 'tradition', tags: ['non-dualisme', 'advaita', 'éveil', 'auto-investigation'],
    relatedIds: ['eveil', 'conscience-cosmique', 'chakras'],
    color: 'var(--accent-rose)', href: '/conscience', era: 'Époque contemporaine',
  },
];

// ── Practices ──
const PRACTICES: SearchItem[] = [
  {
    id: 'meditation-vipassana', titleFr: 'Méditation Vipassana', titleEn: 'Vipassana Meditation',
    subtitleFr: 'Pratique bouddhiste de l\'observation', subtitleEn: 'Buddhist practice of observation',
    descFr: "Technique de méditation issue du bouddhisme theravada signifiant 'voir les choses telles qu'elles sont'. Observation neutre des sensations corporelles. Popularisée en Occident par S.N. Goenka.",
    descEn: "Meditation technique from Theravada Buddhism meaning 'seeing things as they are'. Neutral observation of bodily sensations. Popularized in the West by S.N. Goenka.",
    type: 'practice', themes: ['conscience'], traditions: ['tibet', 'india'],
    reliability: 'scientifique', tags: ['bouddhisme', 'pleine conscience', 'mindfulness', 'impermanence'],
    relatedIds: ['chakras', 'eveil'], confusedWith: ['zazen', 'pleine-conscience'],
    color: 'var(--accent-teal)', href: '/conscience', era: 'Ve siècle av. J.-C. — présent',
  },
  {
    id: 'kundalini-yoga', titleFr: 'Kundalini Yoga', titleEn: 'Kundalini Yoga',
    subtitleFr: 'Pratique d\'éveil de l\'énergie serpentine', subtitleEn: 'Practice of awakening serpentine energy',
    descFr: "Système de yoga axé sur l'éveil de l'énergie kundalini qui dormirait à la base de la colonne vertébrale. Utilise postures, souffle, mantra et mudra.",
    descEn: "System of yoga focused on awakening the kundalini energy said to lie dormant at the base of the spine. Uses postures, breath, mantra, and mudra.",
    type: 'practice', themes: ['conscience', 'sacred-geometry'], traditions: ['india'],
    reliability: 'tradition', tags: ['chakras', 'énergie', 'serpent', 'éveil'],
    relatedIds: ['kundalini', 'chakras', 'sri-yantra'], confusedWith: ['hatha-yoga'],
    color: 'var(--accent-rose)', href: '/conscience', era: 'Antiquité — présent',
  },
  {
    id: 'lectio-divina', titleFr: 'Lectio Divina', titleEn: 'Lectio Divina',
    subtitleFr: 'Lecture méditative des textes sacrés', subtitleEn: 'Meditative reading of sacred texts',
    descFr: "Pratique chrétienne monastique de lecture lente et contemplative des Écritures. Quatre étapes : Lectio (lire), Meditatio (méditer), Oratio (prier), Contemplatio (contempler).",
    descEn: "Christian monastic practice of slow, contemplative reading of Scripture. Four stages: Lectio (read), Meditatio (meditate), Oratio (pray), Contemplatio (contemplate).",
    type: 'practice', themes: ['conscience', 'symbolism'], traditions: ['europe-medieval'],
    reliability: 'tradition', tags: ['christianisme', 'contemplation', 'monasticisme', 'scriptures'],
    relatedIds: ['eveil'], confusedWith: ['meditation-zen'],
    color: 'var(--accent-purple)', href: '/conscience', era: '6e siècle — présent',
  },
  {
    id: 'divination-i-ching', titleFr: 'I Ching (Divination)', titleEn: 'I Ching (Divination)',
    subtitleFr: 'Consultation du Livre des Mutations', subtitleEn: 'Consultation of the Book of Changes',
    descFr: "Système divinatoire fondé sur 64 hexagrammes représentant tous les états possibles de transformation. Utilisé par tirage de tiges d'achillée ou de pièces.",
    descEn: "Divinatory system based on 64 hexagrams representing all possible states of transformation. Used by casting yarrow stalks or coins.",
    type: 'practice', themes: ['symbolism', 'numerology'], traditions: ['china'],
    reliability: 'tradition', tags: ['yin-yang', 'divination', 'taoïsme', 'hexagramme'],
    relatedIds: ['nombre-sacre-7'], confusedWith: ['tarots'],
    color: '#4ABFA0', href: '/symbolism', era: '~1000 av. J.-C. — présent',
  },
  {
    id: 'cercles-runiques', titleFr: 'Runes & Divination runique', titleEn: 'Runes & Runic Divination',
    subtitleFr: 'Alphabet sacré nordique', subtitleEn: 'Sacred Nordic alphabet',
    descFr: "Les runes sont à la fois un système d'écriture et un outil divinatoire dans les traditions germaniques et nordiques. Selon la mythologie, Odin les aurait découvertes en se sacrifiant sur Yggdrasil.",
    descEn: "Runes are both a writing system and a divinatory tool in Germanic and Norse traditions. According to mythology, Odin discovered them by sacrificing himself on Yggdrasil.",
    type: 'practice', themes: ['symbolism'], traditions: ['nordic'],
    reliability: 'tradition', tags: ['nordique', 'odin', 'écriture sacrée', 'oracle'],
    relatedIds: ['arbre-de-vie'], confusedWith: ['tarots', 'ogham'],
    color: 'var(--accent-blue)', href: '/symbolism', era: '2e siècle — présent',
  },
];

// ── Texts ──
const TEXTS: SearchItem[] = [
  {
    id: 'corpus-hermeticum', titleFr: 'Corpus Hermeticum', titleEn: 'Hermetic Corpus',
    subtitleFr: 'Recueil de textes grecs hermétiques (IIe–IIIe s.)', subtitleEn: 'Collection of Greek hermetic texts (2nd–3rd c.)',
    descFr: "Ensemble de textes philosophico-religieux attribués à Hermès Trismégiste. Redécouvert et traduit par Marsile Ficin en 1471 pour Côme de Médicis. Contient le Poimandrès et l'Asclepius.",
    descEn: "Set of philosophical-religious texts attributed to Hermes Trismegistus. Rediscovered and translated by Marsilio Ficino in 1471 for Cosimo de' Medici. Contains the Poimandres and Asclepius.",
    type: 'text', themes: ['alchemy', 'symbolism'], traditions: ['egypt', 'europe-medieval'],
    reliability: 'recherche', tags: ['hermétisme', 'gnosticisme', 'Renaissance', 'Ficin'],
    relatedIds: ['pierre-philosophale', 'grand-oeuvre', 'hermes-trismegiste'],
    color: 'var(--accent-gold)', href: '/alchemy', era: 'IIe–IIIe siècle ap. J.-C.',
  },
  {
    id: 'zohar', titleFr: 'Le Zohar', titleEn: 'The Zohar',
    subtitleFr: 'Texte fondateur de la Kabbale (XIIIe siècle)', subtitleEn: 'Founding text of Kabbalah (13th century)',
    descFr: "Principale œuvre de la Kabbale juive, attribuée à Shimon bar Yohai (IIe siècle) mais probablement rédigée par Moïse de Léon en Castille vers 1280. Commentaire ésotérique de la Torah.",
    descEn: "Main work of Jewish Kabbalah, attributed to Shimon bar Yohai (2nd century) but probably written by Moses de León in Castile around 1280. Esoteric commentary on the Torah.",
    type: 'text', themes: ['symbolism', 'numerology'], traditions: ['europe-medieval'],
    reliability: 'recherche', tags: ['kabbale', 'sephiroth', 'Ein Sof', 'gématrie'],
    relatedIds: ['arbre-de-vie', 'sephiroth', 'nombre-sacre-7'],
    color: 'var(--accent-purple)', href: '/symbolism', era: '~1280 ap. J.-C.',
  },
  {
    id: 'bardo-thodol', titleFr: 'Bardo Thödol', titleEn: 'Bardo Thodol',
    subtitleFr: 'Le Livre des Morts tibétain', subtitleEn: 'The Tibetan Book of the Dead',
    descFr: "Texte tibétain décrivant les étapes de la conscience après la mort. Lu à voix haute pendant 49 jours après le décès. Traduit en anglais par Evans-Wentz en 1927, annoté par Jung.",
    descEn: "Tibetan text describing the stages of consciousness after death. Read aloud for 49 days after death. Translated into English by Evans-Wentz in 1927, annotated by Jung.",
    type: 'text', themes: ['conscience', 'cosmologie'], traditions: ['tibet'],
    reliability: 'tradition', tags: ['bardo', 'mort', 'réincarnation', 'bouddhisme tibétain'],
    relatedIds: ['voyage-astral', 'corps-de-lumiere', 'mandala'],
    color: 'var(--accent-teal)', href: '/conscience', era: 'VIIIe siècle — traduit 1927',
  },
  {
    id: 'bhagavad-gita', titleFr: 'Bhagavad Gita', titleEn: 'Bhagavad Gita',
    subtitleFr: 'Chant du Bienheureux — Épopée du Mahabharata', subtitleEn: 'Song of the Blessed One — Mahabharata epic',
    descFr: "Dialogue entre le guerrier Arjuna et Krishna sur le champ de bataille. L'un des textes philosophiques les plus importants de l'humanité, traitant du devoir, du dharma et de la libération.",
    descEn: "Dialogue between the warrior Arjuna and Krishna on the battlefield. One of humanity's most important philosophical texts, dealing with duty, dharma, and liberation.",
    type: 'text', themes: ['conscience', 'symbolism'], traditions: ['india'],
    reliability: 'recherche', tags: ['dharma', 'karma', 'yoga', 'krishna'],
    relatedIds: ['chakras', 'kundalini', 'eveil'],
    color: 'var(--accent-rose)', href: '/conscience', era: '~400 av. J.-C.',
  },
  {
    id: 'kybalion', titleFr: 'Le Kybalion', titleEn: 'The Kybalion',
    subtitleFr: 'Les sept principes hermétiques (1908)', subtitleEn: 'The seven hermetic principles (1908)',
    descFr: "Publié en 1908 sous le pseudonyme 'Trois Initiés'. Présente sept principes hermétiques fondamentaux. Son origine est discutée — ni ancien ni ésotérique au sens strict, mais très influent.",
    descEn: "Published in 1908 under the pseudonym 'Three Initiates'. Presents seven fundamental hermetic principles. Its origin is debated — neither ancient nor strictly esoteric, but very influential.",
    type: 'text', themes: ['alchemy', 'symbolism'], traditions: ['europe-medieval'],
    reliability: 'controverse', tags: ['hermétisme', 'mentalisme', 'correspondance', 'vibration'],
    relatedIds: ['pierre-philosophale', 'ouroboros'],
    color: 'var(--accent-gold)', href: '/alchemy', era: '1908',
  },
];

// ── Build unified search index ──
const buildSearchIndex = (): SearchItem[] => {
  const fromLexicon: SearchItem[] = lexiconEntries.map((e) => ({
    id: e.id,
    titleFr: e.termFr,
    titleEn: e.termEn,
    descFr: e.definitionFr,
    descEn: e.definitionEn,
    type: 'concept' as ContentType,
    themes: [e.category as ThemeType],
    traditions: [],
    reliability: 'tradition' as ReliabilityType,
    tags: [...(e.relatedIds ?? [])],
    relatedIds: e.relatedIds ?? [],
    confusedWith: [],
    color: categoryConfig[e.category]?.accent ?? categoryConfig[e.category]?.color ?? 'var(--accent-purple)',
    href: `/lexicon/${e.id}`,
  }));
  return [...fromLexicon, ...FIGURES, ...PRACTICES, ...TEXTS];
};

const SEARCH_INDEX = buildSearchIndex();

/* ─────────────────────────────────────────────
   CONSTANTS
───────────────────────────────────────────── */
const THEMES = [
  { id: 'alchemy', labelFr: 'Alchimie', labelEn: 'Alchemy', color: 'var(--accent-purple)', icon: Flame },
  { id: 'symbolism', labelFr: 'Symbolisme', labelEn: 'Symbolism', color: 'var(--accent-blue)', icon: Eye },
  { id: 'numerology', labelFr: 'Numérologie', labelEn: 'Numerology', color: 'var(--accent-rose)', icon: InfinityIcon },
  { id: 'sacred-geometry', labelFr: 'Géométrie Sacrée', labelEn: 'Sacred Geometry', color: 'var(--accent-gold)', icon: Hexagon },
  { id: 'conscience', labelFr: 'Conscience & Éveil', labelEn: 'Consciousness', color: 'var(--accent-teal)', icon: Waves },
  { id: 'cosmologie', labelFr: 'Cosmologie', labelEn: 'Cosmology', color: 'var(--accent-cosmic)', icon: Globe },
];

const CONTENT_TYPES: { id: ContentType; labelFr: string; labelEn: string; icon: any }[] = [
  { id: 'concept', labelFr: 'Concept', labelEn: 'Concept', icon: Lightbulb },
  { id: 'figure', labelFr: 'Figure', labelEn: 'Figure', icon: User },
  { id: 'practice', labelFr: 'Pratique', labelEn: 'Practice', icon: Compass },
  { id: 'text', labelFr: 'Texte', labelEn: 'Text', icon: FileText },
  { id: 'symbol', labelFr: 'Symbole', labelEn: 'Symbol', icon: Star },
  { id: 'tradition', labelFr: 'Tradition', labelEn: 'Tradition', icon: Map },
];

const RELIABILITY_LEVELS: { id: ReliabilityType; labelFr: string; labelEn: string; color: string; descFr: string; descEn: string }[] = [
  { id: 'recherche', labelFr: 'Recherche historique', labelEn: 'Historical research', color: 'var(--accent-blue)', descFr: 'Documenté et sourcé par des historiens', descEn: 'Documented and sourced by historians' },
  { id: 'scientifique', labelFr: 'Consensus scientifique', labelEn: 'Scientific consensus', color: 'var(--accent-teal)', descFr: 'Étudié et reconnu par la communauté scientifique', descEn: 'Studied and recognized by the scientific community' },
  { id: 'tradition', labelFr: 'Transmission traditionnelle', labelEn: 'Traditional transmission', color: 'var(--accent-gold)', descFr: 'Transmis oralement ou textuellement dans une tradition', descEn: 'Transmitted orally or in text within a tradition' },
  { id: 'temoignage', labelFr: 'Témoignage / Expérience', labelEn: 'Testimony / Experience', color: 'var(--accent-rose)', descFr: 'Rapporté par des témoins ou praticiens', descEn: 'Reported by witnesses or practitioners' },
  { id: 'hypothese', labelFr: 'Hypothèse / Interprétation', labelEn: 'Hypothesis / Interpretation', color: 'var(--accent-purple)', descFr: 'Spéculatif ou interprétatif', descEn: 'Speculative or interpretive' },
  { id: 'controverse', labelFr: 'Sujet controversé', labelEn: 'Controversial subject', color: '#E88C4A', descFr: 'Activement débattu, à prendre avec nuance', descEn: 'Actively debated, to be taken with nuance' },
];

const POPULAR_SEARCHES_FR = ['chakras', 'alchimie', 'kabbale', 'mandala', 'kundalini', 'symboles', 'voyage astral', 'conscience', 'runes'];
const POPULAR_SEARCHES_EN = ['chakras', 'alchemy', 'kabbalah', 'mandala', 'kundalini', 'symbols', 'astral travel', 'consciousness', 'runes'];

/* ─────────────────────────────────────────────
   COMPONENTS
───────────────────────────────────────────── */
function TypeBadge({ type, lang }: { type: ContentType; lang: 'fr' | 'en' }) {
  const cfg = CONTENT_TYPES.find((c) => c.id === type);
  if (!cfg) return null;
  const Icon = cfg.icon;
  return (
    <span className="inline-flex items-center gap-1 text-[9px] uppercase tracking-[0.14em] px-2 py-0.5 rounded-full"
      style={{ backgroundColor: 'var(--muted)', color: 'var(--muted-foreground)', border: '1px solid var(--border-subtle)' }}>
      <Icon className="w-2.5 h-2.5" />
      {lang === 'fr' ? cfg.labelFr : cfg.labelEn}
    </span>
  );
}

function ReliabilityBadge({ reliability, lang }: { reliability: ReliabilityType; lang: 'fr' | 'en' }) {
  const cfg = RELIABILITY_LEVELS.find((r) => r.id === reliability);
  if (!cfg) return null;
  return (
    <span className="inline-flex items-center gap-1 text-[9px] uppercase tracking-[0.1em] px-2 py-0.5 rounded-full"
      style={{ backgroundColor: `color-mix(in srgb, ${cfg.color} 10%, transparent)`, color: cfg.color, border: `1px solid color-mix(in srgb, ${cfg.color} 20%, transparent)` }}>
      {lang === 'fr' ? cfg.labelFr : cfg.labelEn}
    </span>
  );
}

function ResultCard({ item, lang, query, onSelect, isSelected }: {
  item: SearchItem; lang: 'fr' | 'en'; query: string; onSelect: (id: string) => void; isSelected: boolean;
}) {
  const { isDark } = useTheme();
  const title = lang === 'fr' ? item.titleFr : item.titleEn;
  const subtitle = lang === 'fr' ? item.subtitleFr : item.subtitleEn;
  const desc = lang === 'fr' ? item.descFr : item.descEn;

  const highlightText = (text: string) => {
    if (!query.trim()) return text;
    const q = query.toLowerCase();
    const idx = text.toLowerCase().indexOf(q);
    if (idx === -1) return text.slice(0, 120) + (text.length > 120 ? '…' : '');
    const start = Math.max(0, idx - 30);
    const end = Math.min(text.length, idx + query.length + 80);
    return (start > 0 ? '…' : '') + text.slice(start, end) + (end < text.length ? '…' : '');
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      onClick={() => onSelect(item.id)}
      className="rounded-2xl p-4 cursor-pointer transition-all duration-200 group"
      style={{
        backgroundColor: isSelected
          ? isDark ? `color-mix(in srgb, ${item.color} 8%, rgba(12,10,22,0.9))` : `color-mix(in srgb, ${item.color} 5%, white)`
          : isDark ? 'rgba(255,255,255,0.025)' : 'rgba(255,255,255,0.85)',
        border: `1px solid ${isSelected ? item.color : 'var(--border-subtle)'}`,
        boxShadow: isSelected ? `0 4px 20px color-mix(in srgb, ${item.color} 12%, transparent)` : 'none',
      }}
      whileHover={{ y: -1 }}
    >
      <div style={{ height: '2px', background: `linear-gradient(90deg, ${item.color}, transparent)`, borderRadius: '99px', marginBottom: '10px', opacity: isSelected ? 0.8 : 0.25 }} />
      <div className="flex items-start justify-between gap-2 mb-1.5">
        <div>
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <TypeBadge type={item.type} lang={lang} />
            <ReliabilityBadge reliability={item.reliability} lang={lang} />
          </div>
          <h4 style={{ fontSize: '0.95rem', color: 'var(--foreground)', lineHeight: 1.2, fontFamily: "'Cormorant Garamond', serif" }}>
            {title}
          </h4>
          {subtitle && <p className="text-[11px] mt-0.5" style={{ color: item.color }}>{subtitle}</p>}
        </div>
        <Link
          to={item.href}
          className="flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ backgroundColor: `color-mix(in srgb, ${item.color} 15%, transparent)`, color: item.color }}
          onClick={(e) => e.stopPropagation()}
        >
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
      <p className="text-xs" style={{ color: 'var(--muted-foreground)', lineHeight: 1.65 }}>
        {highlightText(desc)}
      </p>
      {item.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-2">
          {item.tags.slice(0, 4).map((tag) => (
            <span key={tag} className="text-[9px] px-1.5 py-0.5 rounded"
              style={{ backgroundColor: `color-mix(in srgb, ${item.color} 8%, transparent)`, color: item.color }}>
              {tag}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────── */
export function SearchPage() {
  const { t, lang } = useLang();
  const { isDark } = useTheme();
  const [query, setQuery] = useState('');
  const [activeThemes, setActiveThemes] = useState<string[]>([]);
  const [activeTypes, setActiveTypes] = useState<ContentType[]>([]);
  const [activeReliability, setActiveReliability] = useState<ReliabilityType[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { inputRef.current?.focus(); }, []);

  const normalizeStr = useCallback((str: string) =>
    str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ''), []);

  const results = useMemo(() => {
    const q = normalizeStr(sanitizeSearchQuery(query));
    let items = SEARCH_INDEX;

    if (activeThemes.length > 0) {
      items = items.filter((i) => i.themes.some((t) => activeThemes.includes(t)));
    }
    if (activeTypes.length > 0) {
      items = items.filter((i) => activeTypes.includes(i.type));
    }
    if (activeReliability.length > 0) {
      items = items.filter((i) => activeReliability.includes(i.reliability));
    }

    if (!q) return { items: items.slice(0, 24), total: items.length };

    const scored = items.map((item) => {
      const title = normalizeStr(lang === 'fr' ? item.titleFr : item.titleEn);
      const desc = normalizeStr(lang === 'fr' ? item.descFr : item.descEn);
      const tags = item.tags.map(normalizeStr).join(' ');
      let score = 0;
      if (title === q) score += 100;
      else if (title.startsWith(q)) score += 60;
      else if (title.includes(q)) score += 40;
      if (desc.includes(q)) score += 15;
      if (tags.includes(q)) score += 20;
      return { item, score };
    }).filter((r) => r.score > 0).sort((a, b) => b.score - a.score);

    return { items: scored.map((r) => r.item).slice(0, 30), total: scored.length };
  }, [query, activeThemes, activeTypes, activeReliability, lang, normalizeStr]);

  const selectedItem = useMemo(() => SEARCH_INDEX.find((i) => i.id === selectedId) ?? null, [selectedId]);

  const relatedItems = useMemo(() => {
    if (!selectedItem) return [];
    return selectedItem.relatedIds
      .map((id) => SEARCH_INDEX.find((i) => i.id === id))
      .filter(Boolean)
      .slice(0, 5) as SearchItem[];
  }, [selectedItem]);

  const confusedItems = useMemo(() => {
    if (!selectedItem?.confusedWith) return [];
    return selectedItem.confusedWith
      .map((id) => SEARCH_INDEX.find((i) => i.id === id))
      .filter(Boolean)
      .slice(0, 3) as SearchItem[];
  }, [selectedItem]);

  const hasActiveFilters = activeThemes.length > 0 || activeTypes.length > 0 || activeReliability.length > 0;

  const toggleTheme = (id: string) => setActiveThemes((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  const toggleType = (id: ContentType) => setActiveTypes((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  const toggleReliability = (id: ReliabilityType) => setActiveReliability((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  const clearAll = () => { setActiveThemes([]); setActiveTypes([]); setActiveReliability([]); };

  return (
    <div className="pt-16 pb-16 px-4 lg:px-8">
      <div className="max-w-[1400px] mx-auto">

        {/* ── Header ── */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
          className="pt-10 mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="inline-flex p-2.5 rounded-xl" style={{ backgroundColor: 'var(--surface-purple)' }}>
              <Search className="w-5 h-5" style={{ color: 'var(--accent-purple)' }} />
            </div>
            <span className="text-xs uppercase tracking-[0.3em]" style={{ color: 'var(--accent-purple)', fontWeight: 500 }}>
              {t('Recherche intelligente', 'Advanced search')}
            </span>
          </div>
          <h1 className="mb-2" style={{ fontSize: 'clamp(2rem, 3.5vw, 3.2rem)', lineHeight: 1.1 }}>
            {t('Explorer', 'Explore')} <span style={{ color: 'var(--accent-purple)' }}>{t('le Savoir', 'Knowledge')}</span>
          </h1>
          <p className="max-w-xl text-sm" style={{ color: 'var(--muted-foreground)', lineHeight: 1.8 }}>
            {t(
              'Recherchez par mot-clé, thème, tradition, figure, pratique ou type de contenu. Découvrez les connexions et approfondissements.',
              'Search by keyword, theme, tradition, figure, practice, or content type. Discover connections and deeper explorations.'
            )}
          </p>
        </motion.div>

        {/* ── Search Input ── */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.6 }}
          className="relative mb-4">
          <div
            className="flex items-center gap-3 rounded-2xl px-5 py-4 transition-all duration-200"
            style={{
              backgroundColor: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.9)',
              border: `1.5px solid ${query ? 'var(--accent-purple)' : 'var(--border)'}`,
              boxShadow: query ? '0 0 0 3px color-mix(in srgb, var(--accent-purple) 10%, transparent)' : 'var(--card-shadow)',
            }}
          >
            <Search className="w-5 h-5 flex-shrink-0" style={{ color: query ? 'var(--accent-purple)' : 'var(--muted-foreground)' }} />
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t(
                'Rechercher un concept, une figure, un symbole, une tradition…',
                'Search for a concept, figure, symbol, tradition…'
              )}
              className="flex-1 bg-transparent outline-none text-base"
              style={{ color: 'var(--foreground)', fontFamily: "'Cormorant Garamond', serif", fontSize: '1.1rem' }}
            />
            {query && (
              <button onClick={() => setQuery('')} className="flex-shrink-0 p-1 rounded-full hover:opacity-80" style={{ color: 'var(--muted-foreground)' }}>
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </motion.div>

        {/* ── Filter Toggle & Active Filters ── */}
        <div className="flex items-center gap-3 mb-5 flex-wrap">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="inline-flex items-center gap-2 text-xs px-3.5 py-1.5 rounded-full transition-all duration-200"
            style={{
              backgroundColor: showFilters || hasActiveFilters ? 'var(--surface-purple)' : 'transparent',
              color: showFilters || hasActiveFilters ? 'var(--accent-purple)' : 'var(--muted-foreground)',
              border: `1px solid ${showFilters || hasActiveFilters ? 'var(--accent-purple)' : 'var(--border-subtle)'}`,
            }}
          >
            <Filter className="w-3.5 h-3.5" />
            {t('Filtres', 'Filters')}
            {hasActiveFilters && <span className="w-4 h-4 rounded-full text-[9px] flex items-center justify-center text-white" style={{ backgroundColor: 'var(--accent-purple)' }}>{activeThemes.length + activeTypes.length + activeReliability.length}</span>}
            <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${showFilters ? 'rotate-180' : ''}`} />
          </button>
          {hasActiveFilters && (
            <button onClick={clearAll} className="inline-flex items-center gap-1 text-xs px-3 py-1.5 rounded-full transition-all hover:opacity-80"
              style={{ color: 'var(--muted-foreground)', border: '1px solid var(--border-subtle)' }}>
              <X className="w-3 h-3" /> {t('Tout effacer', 'Clear all')}
            </button>
          )}
          {results.total > 0 && (
            <span className="text-xs ml-auto" style={{ color: 'var(--muted-foreground)' }}>
              {results.items.length} / {results.total} {t('résultats', 'results')}
            </span>
          )}
        </div>

        {/* ── Filter Panel ── */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden mb-6"
            >
              <div className="rounded-2xl p-5 space-y-4" style={{ backgroundColor: isDark ? 'rgba(255,255,255,0.025)' : 'rgba(255,255,255,0.8)', border: '1px solid var(--border-subtle)' }}>
                {/* Themes */}
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] mb-2" style={{ color: 'var(--muted-foreground)', fontWeight: 600 }}>
                    {t('Par thème', 'By theme')}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {THEMES.map((th) => {
                      const Icon = th.icon;
                      const active = activeThemes.includes(th.id);
                      return (
                        <button key={th.id} onClick={() => toggleTheme(th.id)}
                          className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full transition-all duration-150"
                          style={{ backgroundColor: active ? `color-mix(in srgb, ${th.color} 15%, transparent)` : 'transparent', color: active ? th.color : 'var(--muted-foreground)', border: `1px solid ${active ? th.color : 'var(--border-subtle)'}` }}>
                          <Icon className="w-3 h-3" />
                          {lang === 'fr' ? th.labelFr : th.labelEn}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Content types */}
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] mb-2" style={{ color: 'var(--muted-foreground)', fontWeight: 600 }}>
                    {t('Par type de contenu', 'By content type')}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {CONTENT_TYPES.map((ct) => {
                      const Icon = ct.icon;
                      const active = activeTypes.includes(ct.id);
                      return (
                        <button key={ct.id} onClick={() => toggleType(ct.id)}
                          className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full transition-all duration-150"
                          style={{ backgroundColor: active ? 'var(--surface-blue)' : 'transparent', color: active ? 'var(--accent-blue)' : 'var(--muted-foreground)', border: `1px solid ${active ? 'var(--accent-blue)' : 'var(--border-subtle)'}` }}>
                          <Icon className="w-3 h-3" />
                          {lang === 'fr' ? ct.labelFr : ct.labelEn}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Reliability */}
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] mb-2" style={{ color: 'var(--muted-foreground)', fontWeight: 600 }}>
                    {t('Par nature de l\'information', 'By information type')}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {RELIABILITY_LEVELS.map((rel) => {
                      const active = activeReliability.includes(rel.id);
                      return (
                        <button key={rel.id} onClick={() => toggleReliability(rel.id)}
                          className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full transition-all duration-150"
                          title={lang === 'fr' ? rel.descFr : rel.descEn}
                          style={{ backgroundColor: active ? `color-mix(in srgb, ${rel.color} 12%, transparent)` : 'transparent', color: active ? rel.color : 'var(--muted-foreground)', border: `1px solid ${active ? rel.color : 'var(--border-subtle)'}` }}>
                          {lang === 'fr' ? rel.labelFr : rel.labelEn}
                        </button>
                      );
                    })}
                  </div>
                  <p className="text-[10px] mt-2" style={{ color: 'var(--muted-foreground)', fontStyle: 'italic' }}>
                    {t('Ces distinctions reflètent la ligne éditoriale de Luminous : nuance et rigueur avant tout.', 'These distinctions reflect Luminous\'s editorial policy: nuance and rigor above all.')}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Layout: Results + Sidebar ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">

          {/* Results */}
          <div>
            {/* Popular searches (no query) */}
            {!query && !hasActiveFilters && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-5">
                <p className="text-[10px] uppercase tracking-[0.2em] mb-2" style={{ color: 'var(--muted-foreground)', fontWeight: 500 }}>
                  {t('Recherches populaires', 'Popular searches')}
                </p>
                <div className="flex flex-wrap gap-2">
                  {(lang === 'fr' ? POPULAR_SEARCHES_FR : POPULAR_SEARCHES_EN).map((s) => (
                    <button key={s} onClick={() => setQuery(s)}
                      className="text-xs px-3 py-1.5 rounded-full transition-all hover:opacity-80"
                      style={{ backgroundColor: 'var(--muted)', color: 'var(--muted-foreground)', border: '1px solid var(--border-subtle)' }}>
                      {s}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Results grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <AnimatePresence>
                {results.items.map((item) => (
                  <ResultCard key={item.id} item={item} lang={lang} query={query}
                    onSelect={(id) => setSelectedId(selectedId === id ? null : id)}
                    isSelected={selectedId === item.id} />
                ))}
              </AnimatePresence>
              {results.items.length === 0 && query && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="col-span-2 text-center py-12">
                  <div className="text-3xl mb-3">✦</div>
                  <p style={{ color: 'var(--muted-foreground)' }}>{t('Aucun résultat pour', 'No results for')} «&nbsp;{query}&nbsp;»</p>
                  <p className="text-sm mt-1" style={{ color: 'var(--muted-foreground)' }}>
                    {t('Essayez un terme plus général ou explorez le lexique.', 'Try a more general term or explore the lexicon.')}
                  </p>
                  <Link to="/lexicon" className="inline-flex items-center gap-2 mt-4 text-sm"
                    style={{ color: 'var(--accent-purple)' }}>
                    <BookOpen className="w-4 h-4" /> {t('Ouvrir le Lexique', 'Open the Lexicon')}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </motion.div>
              )}
            </div>
          </div>

          {/* ── Sidebar ── */}
          <div className="space-y-4">
            {/* Selected item details */}
            <AnimatePresence>
              {selectedItem && (
                <motion.div key={selectedItem.id} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
                  className="rounded-2xl p-5" style={{ backgroundColor: isDark ? `color-mix(in srgb, ${selectedItem.color} 6%, rgba(12,10,22,0.9))` : `color-mix(in srgb, ${selectedItem.color} 4%, white)`, border: `1px solid color-mix(in srgb, ${selectedItem.color} 20%, transparent)` }}>
                  <div className="h-[2px] rounded-full mb-4" style={{ background: `linear-gradient(90deg, ${selectedItem.color}, transparent)` }} />
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.2rem', color: 'var(--foreground)', lineHeight: 1.2, marginBottom: '0.5rem' }}>
                    {lang === 'fr' ? selectedItem.titleFr : selectedItem.titleEn}
                  </h3>
                  <Link to={selectedItem.href}
                    className="inline-flex items-center gap-1 text-xs mb-4 transition-opacity hover:opacity-80"
                    style={{ color: selectedItem.color, fontWeight: 500 }}>
                    {t('Lire la fiche complète', 'Read full article')} <ArrowRight className="w-3 h-3" />
                  </Link>

                  {/* Related */}
                  {relatedItems.length > 0 && (
                    <div className="mb-3">
                      <p className="text-[10px] uppercase tracking-[0.15em] mb-2" style={{ color: 'var(--muted-foreground)', fontWeight: 600 }}>
                        {t('Notions liées', 'Related notions')}
                      </p>
                      <div className="space-y-1">
                        {relatedItems.map((r) => (
                          <button key={r.id} onClick={() => setSelectedId(r.id)}
                            className="w-full text-left flex items-center gap-2 text-xs px-2.5 py-1.5 rounded-lg transition-all hover:opacity-80"
                            style={{ backgroundColor: `color-mix(in srgb, ${r.color} 10%, transparent)`, color: r.color }}>
                            <ChevronRight className="w-3 h-3 flex-shrink-0" />
                            {lang === 'fr' ? r.titleFr : r.titleEn}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Confused with */}
                  {confusedItems.length > 0 && (
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.15em] mb-2" style={{ color: 'var(--accent-rose)', fontWeight: 600 }}>
                        <AlertCircle className="w-3 h-3 inline mr-1" />
                        {t('Souvent confondu avec', 'Often confused with')}
                      </p>
                      <div className="space-y-1">
                        {confusedItems.map((r) => (
                          <button key={r.id} onClick={() => setSelectedId(r.id)}
                            className="w-full text-left flex items-center gap-2 text-xs px-2.5 py-1.5 rounded-lg transition-all hover:opacity-80"
                            style={{ backgroundColor: 'color-mix(in srgb, var(--accent-rose) 8%, transparent)', color: 'var(--accent-rose)' }}>
                            <ChevronRight className="w-3 h-3 flex-shrink-0" />
                            {lang === 'fr' ? r.titleFr : r.titleEn}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Shortcuts */}
            <div className="rounded-2xl p-5" style={{ backgroundColor: isDark ? 'rgba(255,255,255,0.025)' : 'rgba(255,255,255,0.85)', border: '1px solid var(--border-subtle)' }}>
              <p className="text-[10px] uppercase tracking-[0.2em] mb-3" style={{ color: 'var(--muted-foreground)', fontWeight: 600 }}>
                {t('Explorer', 'Explore')}
              </p>
              <div className="space-y-1.5">
                {[
                  { to: '/lexicon', labelFr: 'Lexique complet (73 termes)', labelEn: 'Full Lexicon (73 terms)', icon: BookOpen, color: 'var(--accent-purple)' },
                  { to: '/carte', labelFr: 'Atlas des traditions', labelEn: 'Traditions atlas', icon: Map, color: 'var(--accent-blue)' },
                  { to: '/chronologie', labelFr: 'Frise chronologique', labelEn: 'Historical timeline', icon: FileText, color: 'var(--accent-gold)' },
                  { to: '/comparer', labelFr: 'Fiches comparatives', labelEn: 'Comparative fiches', icon: Eye, color: 'var(--accent-teal)' },
                  { to: '/questions', labelFr: 'Questions fréquentes', labelEn: 'Common questions', icon: Lightbulb, color: 'var(--accent-rose)' },
                  { to: '/parcours', labelFr: 'Parcours de lecture', labelEn: 'Reading paths', icon: Compass, color: 'var(--accent-mint)' },
                ].map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link key={link.to} to={link.to}
                      className="flex items-center gap-2.5 text-xs px-2.5 py-2 rounded-lg transition-all hover:opacity-80"
                      style={{ color: 'var(--muted-foreground)' }}>
                      <Icon className="w-3.5 h-3.5 flex-shrink-0" style={{ color: link.color }} />
                      {lang === 'fr' ? link.labelFr : link.labelEn}
                      <ChevronRight className="w-3 h-3 ml-auto opacity-40" />
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Editorial note */}
            <div className="rounded-2xl p-4" style={{ backgroundColor: 'color-mix(in srgb, var(--accent-blue) 5%, transparent)', border: '1px solid color-mix(in srgb, var(--accent-blue) 15%, transparent)' }}>
              <p className="text-[10px] uppercase tracking-[0.15em] mb-2" style={{ color: 'var(--accent-blue)', fontWeight: 600 }}>
                {t('Note éditoriale', 'Editorial note')}
              </p>
              <p className="text-[11px]" style={{ color: 'var(--muted-foreground)', lineHeight: 1.7, fontStyle: 'italic' }}>
                {t(
                  'Luminous distingue clairement : tradition, témoignage, interprétation, hypothèse, recherche historique et consensus scientifique. Cette rigueur est au cœur du projet.',
                  'Luminous clearly distinguishes: tradition, testimony, interpretation, hypothesis, historical research, and scientific consensus. This rigor is at the heart of the project.'
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}