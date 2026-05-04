import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Map, X, ArrowRight, BookOpen, Compass, ChevronRight, Globe } from 'lucide-react';
import { useLang } from '../components/LanguageContext';
import { useTheme } from '../components/ThemeContext';
import { SectionDivider } from '../components/SectionDivider';
import { Link } from 'react-router';

interface TraditionRegion {
  id: string;
  nameFr: string;
  nameEn: string;
  civilizationFr: string;
  civilizationEn: string;
  periodFr: string;
  periodEn: string;
  traditions: string[];
  keyFiguresFr: string[];
  keyFiguresEn: string[];
  descFr: string;
  descEn: string;
  color: string;
  region: 'africa' | 'middle-east' | 'europe' | 'india' | 'china' | 'americas' | 'nordic' | 'oceania';
  x: number;
  y: number;
  labelAnchor?: 'left' | 'right' | 'top' | 'bottom';
  lexiconLinks?: string[];
}

const REGIONS: TraditionRegion[] = [
  {
    id: 'egypt',
    nameFr: 'Égypte Ancienne',
    nameEn: 'Ancient Egypt',
    civilizationFr: 'Civilisation pharaonique',
    civilizationEn: 'Pharaonic civilization',
    periodFr: '3100 av. J.-C. — 30 ap. J.-C.',
    periodEn: '3100 BCE — 30 CE',
    traditions: ['Hermétisme', 'Géométrie Sacrée', 'Livre des Morts', 'Corps Ka'],
    keyFiguresFr: ['Hermès Trismégiste', 'Imhotep', 'Thot'],
    keyFiguresEn: ['Hermes Trismegistus', 'Imhotep', 'Thoth'],
    descFr: "L'Égypte ancienne est le berceau de nombreuses traditions ésotériques occidentales. Les temples d'Abydos, de Karnak et de Louxor illustrent une maîtrise remarquable de la géométrie sacrée et de l'astronomie. Le Corpus Hermeticum, attribué à Hermès Trismégiste, a influencé la Renaissance européenne.",
    descEn: "Ancient Egypt is the cradle of many Western esoteric traditions. The temples of Abydos, Karnak, and Luxor illustrate a remarkable mastery of sacred geometry and astronomy. The Hermetic Corpus, attributed to Hermes Trismegistus, influenced the European Renaissance.",
    color: 'var(--accent-gold)',
    region: 'africa',
    x: 575, y: 195,
    labelAnchor: 'right',
    lexiconLinks: ['ouroboros', 'fleur-de-vie', 'corps-de-lumiere'],
  },
  {
    id: 'mesopotamia',
    nameFr: 'Mésopotamie',
    nameEn: 'Mesopotamia',
    civilizationFr: 'Sumer, Babylone, Akkad',
    civilizationEn: 'Sumer, Babylon, Akkad',
    periodFr: '4000 — 500 av. J.-C.',
    periodEn: '4000 — 500 BCE',
    traditions: ['Astrologie', 'Numérologie', 'Divination', 'Mythologie cosmique'],
    keyFiguresFr: ['Enki', 'Enlil', 'Inanna'],
    keyFiguresEn: ['Enki', 'Enlil', 'Inanna'],
    descFr: "Les Babyloniens ont développé les premières cartes astrologiques et ont observé les cycles planétaires avec une précision remarquable. Leur vision cosmologique — où les dieux gouvernent les astres et les astres influencent le destin humain — a directement influencé l'astrologie grecque puis occidentale.",
    descEn: "The Babylonians developed the first astrological charts and observed planetary cycles with remarkable precision. Their cosmological vision — where gods govern the stars and stars influence human fate — directly influenced Greek and then Western astrology.",
    color: '#C89B4A',
    region: 'middle-east',
    x: 628, y: 182,
    labelAnchor: 'right',
    lexiconLinks: ['nombre-sacre-7', 'nombre-or'],
  },
  {
    id: 'greece',
    nameFr: 'Grèce Antique',
    nameEn: 'Ancient Greece',
    civilizationFr: 'Athènes, Éleusis, Pythagore',
    civilizationEn: 'Athens, Eleusis, Pythagoras',
    periodFr: '800 — 100 av. J.-C.',
    periodEn: '800 — 100 BCE',
    traditions: ['Pythagorisme', 'Néoplatonisme', 'Mystères d\'Éleusis', 'Philosophie hermétique'],
    keyFiguresFr: ['Pythagore', 'Platon', 'Plotin', 'Hermès Trismégiste'],
    keyFiguresEn: ['Pythagoras', 'Plato', 'Plotinus', 'Hermes Trismegistus'],
    descFr: "La Grèce antique a synthétisé et transmis les savoirs ésotériques d'Égypte et d'Orient. Les Mystères d'Éleusis (IVe siècle av. J.-C.) étaient des rituels d'initiation à l'immortalité de l'âme. Pythagore enseigne que les nombres sont la structure fondamentale du cosmos.",
    descEn: "Ancient Greece synthesized and transmitted esoteric knowledge from Egypt and the East. The Mysteries of Eleusis (4th century BCE) were initiation rituals to the immortality of the soul. Pythagoras teaches that numbers are the fundamental structure of the cosmos.",
    color: 'var(--accent-blue)',
    region: 'europe',
    x: 553, y: 170,
    labelAnchor: 'left',
    lexiconLinks: ['solides-platon', 'nombre-or', 'fibonacci'],
  },
  {
    id: 'india',
    nameFr: 'Inde Védique',
    nameEn: 'Vedic India',
    civilizationFr: 'Civilisation védique & hindoue',
    civilizationEn: 'Vedic & Hindu civilization',
    periodFr: '1500 av. J.-C. — présent',
    periodEn: '1500 BCE — present',
    traditions: ['Vedas', 'Upanishads', 'Chakras & Tantrisme', 'Yoga', 'Advaita Vedanta'],
    keyFiguresFr: ['Patanjali', 'Shankaracharya', 'Ramana Maharshi', 'Sri Aurobindo'],
    keyFiguresEn: ['Patanjali', 'Shankaracharya', 'Ramana Maharshi', 'Sri Aurobindo'],
    descFr: "L'Inde védique est peut-être la tradition la plus complète et la mieux documentée de l'histoire spirituelle humaine. Les Vedas, les Upanishads, la Bhagavad Gita et les textes tantriques forment un corpus philosophique d'une profondeur extraordinaire.",
    descEn: "Vedic India is perhaps the most complete and best-documented tradition in human spiritual history. The Vedas, Upanishads, Bhagavad Gita, and Tantric texts form a philosophical corpus of extraordinary depth.",
    color: 'var(--accent-rose)',
    region: 'india',
    x: 718, y: 218,
    labelAnchor: 'bottom',
    lexiconLinks: ['chakras', 'kundalini', 'sri-yantra', 'mandala'],
  },
  {
    id: 'tibet',
    nameFr: 'Tibet',
    nameEn: 'Tibet',
    civilizationFr: 'Bouddhisme tibétain',
    civilizationEn: 'Tibetan Buddhism',
    periodFr: '7e siècle — présent',
    periodEn: '7th century — present',
    traditions: ['Vajrayana', 'Dzogchen', 'Bardo Thödol', 'Mandalas'],
    keyFiguresFr: ['Padmasambhava', 'Milarepa', 'Dalai Lama XIV'],
    keyFiguresEn: ['Padmasambhava', 'Milarepa', 'Dalai Lama XIV'],
    descFr: "Le bouddhisme tibétain est reconnu pour ses cartographies détaillées de la conscience et des états intermédiaires après la mort (Bardo). Le Bardo Thödol décrit les étapes de la conscience après la mort avec une précision remarquable.",
    descEn: "Tibetan Buddhism is renowned for its detailed maps of consciousness and intermediate states after death (Bardo). The Bardo Thödol describes the stages of consciousness after death with remarkable precision.",
    color: 'var(--accent-purple)',
    region: 'india',
    x: 758, y: 178,
    labelAnchor: 'top',
    lexiconLinks: ['mandala', 'corps-de-lumiere', 'voyage-astral'],
  },
  {
    id: 'china',
    nameFr: 'Chine Ancienne',
    nameEn: 'Ancient China',
    civilizationFr: 'Taoïsme & I Ching',
    civilizationEn: 'Taoism & I Ching',
    periodFr: '2700 av. J.-C. — présent',
    periodEn: '2700 BCE — present',
    traditions: ['Taoïsme', 'I Ching', 'Feng Shui', 'Médecine traditionnelle'],
    keyFiguresFr: ['Lao-Tseu', 'Tchouang-Tseu', 'Confucius', 'Bodhidharma'],
    keyFiguresEn: ['Lao Tzu', 'Zhuangzi', 'Confucius', 'Bodhidharma'],
    descFr: "La tradition chinoise offre une cosmologie remarquablement cohérente articulée autour du Tao, du Yin/Yang et des Cinq Éléments. L'I Ching, l'un des textes les plus anciens au monde, propose un système divinatoire basé sur 64 hexagrammes.",
    descEn: "The Chinese tradition offers a remarkably coherent cosmology articulated around the Tao, Yin/Yang, and the Five Elements. The I Ching, one of the oldest texts in the world, proposes a divinatory system based on 64 hexagrams.",
    color: '#4ABFA0',
    region: 'china',
    x: 802, y: 175,
    labelAnchor: 'right',
    lexiconLinks: ['ouroboros', 'cercle', 'yin-yang'],
  },
  {
    id: 'mesoamerica',
    nameFr: 'Mésoamérique',
    nameEn: 'Mesoamerica',
    civilizationFr: 'Maya, Aztèques, Toltèques',
    civilizationEn: 'Maya, Aztec, Toltec',
    periodFr: '2000 av. J.-C. — 1500 ap. J.-C.',
    periodEn: '2000 BCE — 1500 CE',
    traditions: ['Calendrier Maya', 'Accords Toltèques', 'Astronomie sacrée', 'Chamanisme'],
    keyFiguresFr: ['Quetzalcóatl', 'Don Miguel Ruiz', 'Carlos Castaneda'],
    keyFiguresEn: ['Quetzalcóatl', 'Don Miguel Ruiz', 'Carlos Castaneda'],
    descFr: "Les Mayas développèrent des systèmes calendaires d'une précision astronomique extraordinaire. Les Toltèques ont transmis une sagesse pratique — popularisée par Don Miguel Ruiz dans 'Les Quatre Accords Toltèques'.",
    descEn: "The Maya developed calendrical systems of extraordinary astronomical precision. The Toltecs transmitted a practical wisdom — popularized by Don Miguel Ruiz in 'The Four Agreements'.",
    color: 'var(--accent-teal)',
    region: 'americas',
    x: 210, y: 248,
    labelAnchor: 'left',
    lexiconLinks: ['accords-tolteques', 'voyage-galactique'],
  },
  {
    id: 'europe-medieval',
    nameFr: 'Europe Médiévale',
    nameEn: 'Medieval Europe',
    civilizationFr: 'Kabbale, Alchimie, Rose-Croix',
    civilizationEn: 'Kabbalah, Alchemy, Rosicrucians',
    periodFr: '10e — 18e siècle',
    periodEn: '10th — 18th century',
    traditions: ['Kabbale', 'Alchimie hermétique', 'Rose-Croix', 'Franc-Maçonnerie'],
    keyFiguresFr: ['Paracelse', 'Nicolas Flamel', 'Raymond Lulle', 'Pic de la Mirandole'],
    keyFiguresEn: ['Paracelsus', 'Nicolas Flamel', 'Raymond Lull', 'Pico della Mirandola'],
    descFr: "L'Europe médiévale et renaissante a été un creuset d'ésotérisme. L'alchimie y fleurit mêlant science proto-chimique et symbolisme spirituel. La Kabbale juive se développe avec des figures comme Moïse de Léon (Zohar).",
    descEn: "Medieval and Renaissance Europe was a crucible of esotericism. Alchemy flourished there. Jewish Kabbalah developed with figures like Moses de León (Zohar). The Renaissance saw a Neoplatonic, Hermetic, and Kabbalistic synthesis.",
    color: 'var(--accent-purple)',
    region: 'europe',
    x: 510, y: 148,
    labelAnchor: 'left',
    lexiconLinks: ['pierre-philosophale', 'grand-oeuvre', 'arbre-de-vie', 'sephiroth'],
  },
  {
    id: 'nordic',
    nameFr: 'Nordique & Celtes',
    nameEn: 'Nordic & Celts',
    civilizationFr: 'Mythologie nordique & Druidisme',
    civilizationEn: 'Norse mythology & Druidism',
    periodFr: '500 av. J.-C. — 1100 ap. J.-C.',
    periodEn: '500 BCE — 1100 CE',
    traditions: ['Mythologie nordique', 'Runes', 'Druidisme', 'Chamanisme nordique'],
    keyFiguresFr: ['Odin', 'Merlin (légendaire)', 'Völva'],
    keyFiguresEn: ['Odin', 'Merlin (legendary)', 'Völva'],
    descFr: "Les traditions nordiques et celtiques offrent un cosmos vivant peuplé de dieux et d'esprits. Odin se sacrifie sur l'Yggdrasil pour obtenir la connaissance des runes. Les druides maintenaient des traditions orales de cosmologie et de droit.",
    descEn: "Nordic and Celtic traditions offer a living cosmos populated by gods and spirits. Odin sacrifices himself on Yggdrasil to gain knowledge of the runes. Celtic druids maintained oral traditions of cosmology and law.",
    color: 'var(--accent-blue)',
    region: 'nordic',
    x: 504, y: 116,
    labelAnchor: 'top',
    lexiconLinks: ['arbre-de-vie', 'trinite'],
  },
  {
    id: 'africa',
    nameFr: 'Afrique Subsaharienne',
    nameEn: 'Sub-Saharan Africa',
    civilizationFr: 'Dogon, Yoruba, Traditions bantoues',
    civilizationEn: 'Dogon, Yoruba, Bantu traditions',
    periodFr: 'Temps immémoriaux — présent',
    periodEn: 'Immemorial time — present',
    traditions: ['Animisme', 'Cosmologie Dogon (Sirius)', 'Ifa (Yoruba)', 'Ubuntu'],
    keyFiguresFr: ['Ogotemmêli (Dogon)', 'Marcel Griaule', 'Wole Soyinka'],
    keyFiguresEn: ['Ogotemmêli (Dogon)', 'Marcel Griaule', 'Wole Soyinka'],
    descFr: "Le peuple Dogon du Mali possède une cosmologie incluant des connaissances précises sur Sirius B, documentées par Marcel Griaule dans 'Dieu d'Eau' (1948). La tradition Ifa (Yoruba) est un système divinatoire reconnu par l'UNESCO.",
    descEn: "The Dogon people of Mali possess a cosmology including precise knowledge of Sirius B, documented by Marcel Griaule in 'Conversations with Ogotemmêli' (1948). The Ifa tradition (Yoruba) is a divination system recognized by UNESCO.",
    color: '#C89B4A',
    region: 'africa',
    x: 510, y: 268,
    labelAnchor: 'left',
    lexiconLinks: ['memoire-stellaire', 'voyage-galactique'],
  },
  {
    id: 'sufism',
    nameFr: 'Islam Mystique',
    nameEn: 'Mystic Islam',
    civilizationFr: 'Soufisme & Monde islamique',
    civilizationEn: 'Sufism & Islamic world',
    periodFr: '8e — 14e siècle',
    periodEn: '8th — 14th century',
    traditions: ['Soufisme', 'Alchimie arabe', 'Astrologie arabe', 'Philosophie islamique'],
    keyFiguresFr: ['Ibn Arabi', 'Rumi', 'Al-Kindi', 'Avicenne'],
    keyFiguresEn: ['Ibn Arabi', 'Rumi', 'Al-Kindi', 'Avicenna'],
    descFr: "Le soufisme est la dimension mystique de l'islam. Rumi (13e siècle), dont les écrits sur l'amour divin ont été traduits dans des centaines de langues. Ibn Arabi, dont la cosmologie de l'Imagination Créatrice a influencé toute la pensée mystique occidentale.",
    descEn: "Sufism is the mystical dimension of Islam. Rumi (13th century), whose writings on divine love have been translated into hundreds of languages. Ibn Arabi, whose cosmology of the Creative Imagination influenced all Western mystical thought.",
    color: 'var(--accent-teal)',
    region: 'middle-east',
    x: 620, y: 192,
    labelAnchor: 'bottom',
    lexiconLinks: ['eveil', 'conscience-cosmique'],
  },
];

// Stable star field (deterministic)
const STARS = Array.from({ length: 80 }, (_, i) => ({
  cx: ((i * 127 + 43) % 1000),
  cy: ((i * 89 + 17) % 500),
  r: i % 5 === 0 ? 1.2 : i % 3 === 0 ? 0.9 : 0.5,
  opacity: 0.04 + (i % 7) * 0.016,
  delay: (i % 13) * 0.4,
}));

// Connection lines between traditions
const CONNECTIONS: [number, number, number, number][] = [
  [575, 195, 628, 182],   // Egypt - Mesopotamia
  [628, 182, 553, 170],   // Mesopotamia - Greece
  [553, 170, 510, 148],   // Greece - Medieval Europe
  [510, 148, 504, 116],   // Medieval - Nordic
  [510, 148, 575, 195],   // Medieval - Egypt
  [718, 218, 758, 178],   // India - Tibet
  [758, 178, 802, 175],   // Tibet - China
  [620, 192, 553, 170],   // Sufism - Greece
  [510, 268, 575, 195],   // Africa - Egypt
  [575, 195, 620, 192],   // Egypt - Sufism
];

// SVG map component
function ImmersiveMapSVG({
  regions,
  selectedId,
  hoveredId,
  onSelect,
  onHover,
  lang,
}: {
  regions: TraditionRegion[];
  selectedId: string | null;
  hoveredId: string | null;
  onSelect: (id: string) => void;
  onHover: (id: string | null) => void;
  lang: 'fr' | 'en';
}) {
  const { isDark } = useTheme();

  const continents = [
    {
      id: 'europe',
      path: 'M 448,108 L 468,96 L 492,90 L 514,91 L 538,95 L 558,103 L 576,114 L 592,126 L 598,140 L 594,155 L 580,167 L 560,176 L 538,180 L 515,179 L 492,172 L 470,162 L 452,148 L 444,134 Z',
      fill: '#5B8FCC',
      label: 'EUROPE',
      labelX: 518, labelY: 140,
    },
    {
      id: 'africa',
      path: 'M 475,186 L 510,181 L 546,181 L 580,185 L 604,200 L 620,222 L 630,250 L 628,280 L 618,315 L 600,345 L 574,365 L 543,372 L 512,366 L 486,345 L 468,315 L 456,280 L 454,248 L 458,218 Z',
      fill: '#C89B4A',
      label: 'AFRIQUE',
      labelX: 540, labelY: 290,
    },
    {
      id: 'asia',
      path: 'M 590,126 L 642,112 L 700,106 L 764,106 L 828,114 L 882,126 L 926,146 L 954,172 L 962,204 L 952,238 L 930,268 L 900,290 L 862,302 L 818,300 L 770,290 L 726,274 L 692,256 L 658,238 L 628,216 L 604,196 L 590,170 L 584,148 Z',
      fill: '#C4687C',
      label: 'ASIE',
      labelX: 780, labelY: 215,
    },
    {
      id: 'north-america',
      path: 'M 82,80 L 164,66 L 248,74 L 318,96 L 358,122 L 370,160 L 356,202 L 322,238 L 272,262 L 208,268 L 162,250 L 124,218 L 96,182 L 74,144 L 70,108 Z',
      fill: '#5ABFAA',
      label: 'AMÉRIQUES',
      labelX: 220, labelY: 168,
    },
    {
      id: 'south-america',
      path: 'M 210,272 L 258,261 L 312,268 L 354,290 L 378,330 L 382,374 L 362,420 L 322,452 L 276,454 L 236,428 L 208,384 L 196,336 L 200,296 Z',
      fill: '#9B6FC4',
      label: '',
      labelX: 290, labelY: 368,
    },
    {
      id: 'oceania',
      path: 'M 808,308 L 856,296 L 908,306 L 942,330 L 950,368 L 932,400 L 890,414 L 844,410 L 806,384 L 792,352 L 792,326 Z',
      fill: '#4ABFA0',
      label: 'OCÉANIE',
      labelX: 872, labelY: 360,
    },
    {
      id: 'greenland',
      path: 'M 328,54 L 370,46 L 410,56 L 424,82 L 406,106 L 362,114 L 324,98 Z',
      fill: '#5B8FCC',
      label: '',
      labelX: 374, labelY: 82,
    },
  ];

  return (
    <svg
      viewBox="0 0 1000 500"
      className="w-full h-full"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <radialGradient id="mapCenter" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor={isDark ? 'rgba(123,111,200,0.04)' : 'rgba(123,111,200,0.025)'} />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <radialGradient id="markerGlowGold" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(200,155,74,0.6)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        <filter id="textGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Deep space background */}
      <rect width="1000" height="500" fill={isDark ? 'rgba(6,5,14,0.92)' : 'rgba(240,238,252,0.92)'} />
      <rect width="1000" height="500" fill="url(#mapCenter)" />

      {/* Latitude/longitude grid — very subtle */}
      {[100, 200, 300, 400].map((y) => (
        <line key={`lat-${y}`} x1="0" y1={y} x2="1000" y2={y}
          stroke="currentColor" strokeWidth="0.4" opacity={isDark ? 0.05 : 0.04} />
      ))}
      {[100, 200, 300, 400, 500, 600, 700, 800, 900].map((x) => (
        <line key={`lon-${x}`} x1={x} y1="0" x2={x} y2="500"
          stroke="currentColor" strokeWidth="0.4" opacity={isDark ? 0.05 : 0.04} />
      ))}

      {/* Stars */}
      {isDark && STARS.map((s, i) => (
        <motion.circle
          key={`star-${i}`}
          cx={s.cx} cy={s.cy} r={s.r}
          fill="white"
          animate={{ opacity: [s.opacity, s.opacity * 2.5, s.opacity] }}
          transition={{ duration: 3 + s.delay, delay: s.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      {/* Continents — filled shapes */}
      {continents.map((cont) => (
        <g key={cont.id}>
          {/* Glow layer */}
          <path
            d={cont.path}
            fill={cont.fill}
            style={{ opacity: isDark ? 0.08 : 0.1 }}
            filter="url(#softGlow)"
          />
          {/* Fill */}
          <motion.path
            d={cont.path}
            fill={cont.fill}
            initial={{ opacity: 0 }}
            animate={{ opacity: isDark ? 0.13 : 0.16 }}
            transition={{ duration: 1.4, delay: 0.2 }}
          />
          {/* Border */}
          <motion.path
            d={cont.path}
            fill="none"
            stroke={cont.fill}
            strokeWidth="0.7"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: isDark ? 0.35 : 0.28 }}
            transition={{ duration: 2.5, delay: 0.4 }}
          />
          {/* Continent label */}
          {cont.label && (
            <motion.text
              x={cont.labelX}
              y={cont.labelY}
              textAnchor="middle"
              fontSize="7.5"
              fill={cont.fill}
              initial={{ opacity: 0 }}
              animate={{ opacity: isDark ? 0.28 : 0.22 }}
              transition={{ duration: 1, delay: 1.8 }}
              style={{ letterSpacing: '0.22em', fontWeight: 500, userSelect: 'none' }}
            >
              {cont.label}
            </motion.text>
          )}
        </g>
      ))}

      {/* Connection lines between traditions */}
      {CONNECTIONS.map(([x1, y1, x2, y2], i) => (
        <motion.line
          key={`conn-${i}`}
          x1={x1} y1={y1} x2={x2} y2={y2}
          stroke="var(--accent-purple)"
          strokeWidth="0.7"
          strokeDasharray="4 6"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: isDark ? 0.18 : 0.12 }}
          transition={{ delay: 1.2 + i * 0.1, duration: 1.8 }}
        />
      ))}

      {/* Tradition markers */}
      {regions.map((region) => {
        const isSelected = selectedId === region.id;
        const isHovered = hoveredId === region.id && !isSelected;

        // Label offset based on anchor
        const labelOffset = 18;
        let labelX = region.x;
        let labelY = region.y;
        let anchor: 'start' | 'middle' | 'end' = 'middle';
        if (region.labelAnchor === 'right') { labelX = region.x + labelOffset; anchor = 'start'; labelY = region.y + 4; }
        if (region.labelAnchor === 'left') { labelX = region.x - labelOffset; anchor = 'end'; labelY = region.y + 4; }
        if (region.labelAnchor === 'bottom') { labelX = region.x; labelY = region.y + labelOffset + 4; }
        if (region.labelAnchor === 'top') { labelX = region.x; labelY = region.y - labelOffset; }

        const shortName = lang === 'fr' ? region.nameFr : region.nameEn;
        const displayName = shortName.length > 16 ? shortName.slice(0, 15) + '…' : shortName;

        return (
          <g
            key={region.id}
            style={{ cursor: 'pointer' }}
            onClick={() => onSelect(region.id)}
            onMouseEnter={() => onHover(region.id)}
            onMouseLeave={() => onHover(null)}
          >
            {/* Large hit area */}
            <circle cx={region.x} cy={region.y} r={24} fill="transparent" />

            {/* Outer ambient glow (always visible for selected) */}
            {isSelected && (
              <motion.circle
                cx={region.x} cy={region.y} r={32}
                fill={region.color}
                animate={{ opacity: [0.04, 0.12, 0.04], r: [28, 36, 28] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
              />
            )}

            {/* Pulse ring */}
            <motion.circle
              cx={region.x} cy={region.y}
              r={isSelected ? 18 : isHovered ? 14 : 11}
              fill="none"
              stroke={region.color}
              strokeWidth={isSelected ? 1 : 0.7}
              animate={{
                r: isSelected ? [16, 24, 16] : isHovered ? [12, 18, 12] : [10, 14, 10],
                opacity: isSelected ? [0.5, 0.8, 0.5] : isHovered ? [0.35, 0.6, 0.35] : [0.14, 0.26, 0.14],
              }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Second ring (selected only) */}
            {isSelected && (
              <motion.circle
                cx={region.x} cy={region.y} r={26}
                fill="none"
                stroke={region.color}
                strokeWidth="0.5"
                animate={{ r: [22, 34, 22], opacity: [0.1, 0.22, 0.1] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
              />
            )}

            {/* Core glow */}
            <circle
              cx={region.x} cy={region.y}
              r={isSelected ? 10 : isHovered ? 8 : 6}
              fill={region.color}
              style={{ opacity: isSelected ? 0.5 : isHovered ? 0.38 : 0.22 }}
            />

            {/* Core dot */}
            <circle
              cx={region.x} cy={region.y}
              r={isSelected ? 5.5 : isHovered ? 5 : 4}
              fill={region.color}
              style={{ opacity: 1 }}
            />

            {/* Inner white */}
            <circle
              cx={region.x} cy={region.y}
              r={isSelected ? 2.2 : 1.5}
              fill="white"
              style={{ opacity: isSelected ? 0.9 : 0.6 }}
            />

            {/* Permanent region label */}
            <motion.text
              x={labelX}
              y={labelY}
              textAnchor={anchor}
              fontSize={isSelected ? 8.5 : isHovered ? 8 : 7.5}
              fill={region.color}
              initial={{ opacity: 0 }}
              animate={{ opacity: isSelected ? 1 : isHovered ? 0.95 : 0.65 }}
              transition={{ duration: 0.3 }}
              style={{
                fontWeight: isSelected ? 700 : 500,
                letterSpacing: '0.08em',
                userSelect: 'none',
              }}
            >
              {displayName.toUpperCase()}
            </motion.text>

            {/* Hover quick-tooltip (civilization line) */}
            {isHovered && (
              <motion.g
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.15 }}
              >
                <text
                  x={labelX}
                  y={region.labelAnchor === 'bottom' ? region.y + labelOffset + 18 : labelY + 11}
                  textAnchor={anchor}
                  fontSize="6"
                  fill={isDark ? 'rgba(210,210,230,0.65)' : 'rgba(60,50,80,0.6)'}
                  style={{ letterSpacing: '0.06em', userSelect: 'none' }}
                >
                  {(lang === 'fr' ? region.civilizationFr : region.civilizationEn).slice(0, 26).toUpperCase()}
                </text>
              </motion.g>
            )}
          </g>
        );
      })}
    </svg>
  );
}

// Floating detail panel — slides in over the map
function DetailPanel({
  region,
  onClose,
  lang,
}: {
  region: TraditionRegion | null;
  onClose: () => void;
  lang: 'fr' | 'en';
}) {
  const { t } = useLang();
  const { isDark } = useTheme();

  return (
    <AnimatePresence>
      {region && (
        <motion.div
          key={region.id}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 40 }}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          className="absolute top-4 right-4 bottom-4 w-[340px] max-w-[90vw] rounded-2xl overflow-hidden flex flex-col z-20"
          style={{
            backgroundColor: isDark
              ? `color-mix(in srgb, ${region.color} 5%, rgba(12,10,22,0.97))`
              : `color-mix(in srgb, ${region.color} 4%, rgba(252,250,255,0.97))`,
            border: `1px solid color-mix(in srgb, ${region.color} 25%, transparent)`,
            boxShadow: `0 8px 48px color-mix(in srgb, ${region.color} 20%, rgba(0,0,0,0.5))`,
            backdropFilter: 'blur(16px)',
          }}
        >
          {/* Top accent */}
          <div
            className="h-[3px] flex-shrink-0"
            style={{ background: `linear-gradient(90deg, transparent, ${region.color}, transparent)` }}
          />

          {/* Header */}
          <div className="px-5 pt-4 pb-3 flex-shrink-0">
            <div className="flex items-start justify-between gap-2">
              <div>
                <span
                  className="text-[10px] uppercase tracking-[0.2em] block mb-1"
                  style={{ color: region.color, fontWeight: 600 }}
                >
                  {lang === 'fr' ? region.civilizationFr : region.civilizationEn}
                </span>
                <h3
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: '1.4rem',
                    lineHeight: 1.2,
                    color: 'var(--foreground)',
                  }}
                >
                  {lang === 'fr' ? region.nameFr : region.nameEn}
                </h3>
                <p className="text-xs mt-1" style={{ color: 'var(--muted-foreground)' }}>
                  {lang === 'fr' ? region.periodFr : region.periodEn}
                </p>
              </div>
              <button
                onClick={onClose}
                className="w-7 h-7 flex-shrink-0 flex items-center justify-center rounded-full transition-colors"
                style={{ backgroundColor: 'var(--muted)', color: 'var(--muted-foreground)' }}
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Divider */}
          <div className="mx-5 h-px flex-shrink-0" style={{ backgroundColor: `color-mix(in srgb, ${region.color} 15%, transparent)` }} />

          {/* Scrollable body */}
          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4" data-lenis-prevent>
            {/* Description */}
            <p className="text-sm" style={{ color: 'var(--muted-foreground)', lineHeight: 1.85 }}>
              {lang === 'fr' ? region.descFr : region.descEn}
            </p>

            {/* Traditions */}
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] mb-2" style={{ color: region.color, fontWeight: 600 }}>
                {t('Traditions', 'Traditions')}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {region.traditions.map((tr) => (
                  <span
                    key={tr}
                    className="text-[11px] px-2.5 py-1 rounded-full"
                    style={{
                      backgroundColor: `color-mix(in srgb, ${region.color} 12%, transparent)`,
                      color: region.color,
                      border: `1px solid color-mix(in srgb, ${region.color} 18%, transparent)`,
                    }}
                  >
                    {tr}
                  </span>
                ))}
              </div>
            </div>

            {/* Key Figures */}
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] mb-2" style={{ color: 'var(--muted-foreground)', fontWeight: 500 }}>
                {t('Figures clés', 'Key figures')}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {(lang === 'fr' ? region.keyFiguresFr : region.keyFiguresEn).map((fig) => (
                  <span
                    key={fig}
                    className="text-[11px] px-2.5 py-1 rounded-full"
                    style={{
                      backgroundColor: 'var(--muted)',
                      color: 'var(--foreground)',
                      fontFamily: "'Cormorant Garamond', serif",
                      fontStyle: 'italic',
                    }}
                  >
                    {fig}
                  </span>
                ))}
              </div>
            </div>

            {/* Lexicon links */}
            {region.lexiconLinks && region.lexiconLinks.length > 0 && (
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] mb-2" style={{ color: 'var(--muted-foreground)', fontWeight: 500 }}>
                  {t('Dans le Lexique', 'In the Lexicon')}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {region.lexiconLinks.map((link) => (
                    <Link
                      key={link}
                      to={`/lexicon/${link}`}
                      className="flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-full transition-all hover:opacity-80"
                      style={{
                        backgroundColor: 'var(--surface-blue)',
                        color: 'var(--accent-blue)',
                        border: '1px solid var(--border-subtle)',
                      }}
                    >
                      <BookOpen className="w-2.5 h-2.5" />
                      {link}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer CTA */}
          <div className="px-5 py-4 flex-shrink-0" style={{ borderTop: `1px solid color-mix(in srgb, ${region.color} 12%, transparent)` }}>
            <Link
              to="/sources"
              className="flex items-center justify-between text-xs transition-opacity hover:opacity-80"
              style={{ color: region.color, fontWeight: 500 }}
            >
              <span>{t('Explorer les sources de cette tradition', 'Explore sources for this tradition')}</span>
              <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" />
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const regionGroups = [
  { id: 'africa', labelFr: 'Afrique & Égypte', labelEn: 'Africa & Egypt', color: '#C89B4A' },
  { id: 'middle-east', labelFr: 'Orient mystique', labelEn: 'Mystic Orient', color: 'var(--accent-teal)' },
  { id: 'europe', labelFr: 'Europe & Méditerranée', labelEn: 'Europe & Mediterranean', color: 'var(--accent-blue)' },
  { id: 'india', labelFr: 'Inde & Tibet', labelEn: 'India & Tibet', color: 'var(--accent-rose)' },
  { id: 'china', labelFr: 'Extrême-Orient', labelEn: 'Far East', color: '#4ABFA0' },
  { id: 'americas', labelFr: 'Amériques', labelEn: 'Americas', color: 'var(--accent-teal)' },
  { id: 'nordic', labelFr: 'Nordique & Celtique', labelEn: 'Nordic & Celtic', color: 'var(--accent-blue)' },
];

export function MapPage() {
  const { t, lang } = useLang();
  const { isDark } = useTheme();
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  const [filterRegion, setFilterRegion] = useState<string | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  const selected = REGIONS.find((r) => r.id === selectedRegion) ?? null;
  const filtered = filterRegion ? REGIONS.filter((r) => r.region === filterRegion) : REGIONS;

  const handleSelect = useCallback((id: string) => {
    setSelectedRegion((prev) => (prev === id ? null : id));
  }, []);

  return (
    <div className="pt-16 pb-16 px-4 lg:px-8">
      <div className="max-w-[1800px] mx-auto">

        {/* ── Hero Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8 pt-10 flex flex-col md:flex-row md:items-end md:justify-between gap-4"
        >
          <div>
            <div className="flex items-center gap-3 mb-3">
              <motion.div
                className="inline-flex p-3 rounded-2xl"
                style={{ backgroundColor: 'var(--surface-blue)' }}
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
              >
                <Compass className="w-5 h-5" style={{ color: 'var(--accent-blue)' }} />
              </motion.div>
              <span className="text-xs uppercase tracking-[0.3em]" style={{ color: 'var(--accent-blue)', fontWeight: 500 }}>
                {t('Atlas des Traditions Sacrées', 'Atlas of Sacred Traditions')}
              </span>
            </div>
            <h1 className="mb-2" style={{ fontSize: 'clamp(2.2rem, 4vw, 3.8rem)', lineHeight: 1.1 }}>
              {t('Carte des Savoirs', 'Map of Sacred')}
              <br />
              <span style={{ color: 'var(--accent-blue)' }}>{t('Sacrés du Monde', 'Knowledge')}</span>
            </h1>
            <p className="max-w-xl text-sm" style={{ color: 'var(--muted-foreground)', lineHeight: 1.85 }}>
              {t(
                "Explorez onze traditions de sagesse à travers les civilisations. Cliquez sur un point lumineux pour ouvrir sa tradition — et découvrir ses figures, ses pratiques, ses connexions.",
                "Explore eleven wisdom traditions across civilizations. Click a glowing point to open its tradition — and discover its figures, practices, and connections."
              )}
            </p>
          </div>

          {/* Live counter */}
          <div className="flex items-center gap-6 flex-shrink-0">
            {[
              { n: REGIONS.length, labelFr: 'Traditions', labelEn: 'Traditions', color: 'var(--accent-blue)' },
              { n: 5000, labelFr: 'Ans de Sagesse', labelEn: 'Years of Wisdom', color: 'var(--accent-gold)', suffix: '+' },
            ].map((s) => (
              <div key={s.labelFr} className="text-center">
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2.2rem', fontWeight: 700, color: s.color, lineHeight: 1 }}>
                  {s.n}{(s as any).suffix || ''}
                </div>
                <div className="text-[10px] uppercase tracking-[0.15em] mt-1" style={{ color: 'var(--muted-foreground)' }}>
                  {lang === 'fr' ? s.labelFr : s.labelEn}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Filter Tabs ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex flex-wrap gap-2 mb-4"
        >
          <button
            onClick={() => setFilterRegion(null)}
            className="text-xs px-4 py-1.5 rounded-full transition-all duration-200"
            style={{
              backgroundColor: filterRegion === null ? 'var(--accent-blue)' : 'transparent',
              color: filterRegion === null ? '#fff' : 'var(--muted-foreground)',
              border: `1px solid ${filterRegion === null ? 'var(--accent-blue)' : 'var(--border-subtle)'}`,
            }}
          >
            {t('Toutes', 'All')}
          </button>
          {regionGroups.map((rg) => (
            <button
              key={rg.id}
              onClick={() => setFilterRegion(filterRegion === rg.id ? null : rg.id)}
              className="text-xs px-4 py-1.5 rounded-full transition-all duration-200"
              style={{
                backgroundColor: filterRegion === rg.id ? `color-mix(in srgb, ${rg.color} 18%, transparent)` : 'transparent',
                color: filterRegion === rg.id ? rg.color : 'var(--muted-foreground)',
                border: `1px solid ${filterRegion === rg.id ? rg.color : 'var(--border-subtle)'}`,
              }}
            >
              {lang === 'fr' ? rg.labelFr : rg.labelEn}
            </button>
          ))}
        </motion.div>

        {/* ── Immersive Map ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          ref={mapContainerRef}
          className="relative rounded-3xl overflow-hidden mb-8"
          style={{
            minHeight: 'clamp(380px, 60vh, 660px)',
            backgroundColor: isDark ? 'rgba(6,5,14,0.95)' : 'rgba(240,238,252,0.98)',
            border: `1px solid ${isDark ? 'rgba(123,111,200,0.14)' : 'rgba(123,111,200,0.12)'}`,
            boxShadow: isDark
              ? '0 20px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(123,111,200,0.06)'
              : '0 20px 60px rgba(100,90,160,0.12), 0 0 0 1px rgba(123,111,200,0.08)',
          }}
        >
          {/* Map SVG — fills the container */}
          <div className="absolute inset-0">
            <ImmersiveMapSVG
              regions={filtered}
              selectedId={selectedRegion}
              hoveredId={hoveredRegion}
              onSelect={handleSelect}
              onHover={setHoveredRegion}
              lang={lang}
            />
          </div>

          {/* Vignette edges */}
          <div
            className="absolute inset-0 pointer-events-none rounded-3xl"
            style={{
              background: isDark
                ? 'radial-gradient(ellipse at 50% 50%, transparent 55%, rgba(6,5,14,0.55) 100%)'
                : 'radial-gradient(ellipse at 50% 50%, transparent 55%, rgba(240,238,252,0.45) 100%)',
            }}
          />

          {/* Top overlay — title on map */}
          <div className="absolute top-4 left-5 pointer-events-none">
            <div className="flex items-center gap-2">
              <Globe className="w-3.5 h-3.5" style={{ color: isDark ? 'rgba(180,170,220,0.4)' : 'rgba(100,90,140,0.4)' }} />
              <span
                className="text-[10px] uppercase tracking-[0.3em]"
                style={{ color: isDark ? 'rgba(180,170,220,0.35)' : 'rgba(100,90,140,0.35)', fontWeight: 500 }}
              >
                {t('Luminous — Atlas des Traditions Sacrées', 'Luminous — Atlas of Sacred Traditions')}
              </span>
            </div>
          </div>

          {/* Instruction hint (fades when something is selected) */}
          <AnimatePresence>
            {!selectedRegion && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 1.5, duration: 0.6 }}
                className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none"
              >
                <div
                  className="flex items-center gap-2 text-[10px] px-4 py-1.5 rounded-full"
                  style={{
                    backgroundColor: isDark ? 'rgba(20,18,35,0.85)' : 'rgba(245,243,255,0.85)',
                    border: '1px solid var(--border-subtle)',
                    color: 'var(--muted-foreground)',
                    letterSpacing: '0.08em',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  <motion.span
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >✦</motion.span>
                  {t('Cliquez sur un point pour explorer', 'Click a point to explore')}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Detail panel — overlays the map */}
          <DetailPanel
            region={selected}
            onClose={() => setSelectedRegion(null)}
            lang={lang}
          />
        </motion.div>

        {/* ── Region Cards Grid ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
        >
          <div className="flex items-center justify-between mb-5">
            <h3 style={{ fontSize: '1.1rem', color: 'var(--foreground)' }}>
              {t('Traditions du monde', 'World Traditions')}
              <span className="ml-2 text-sm" style={{ color: 'var(--muted-foreground)' }}>
                ({filtered.length})
              </span>
            </h3>
            <span className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
              {t('Cliquez pour localiser sur la carte', 'Click to locate on map')}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((region, i) => (
              <motion.button
                key={region.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.05 }}
                onClick={() => {
                  setSelectedRegion(region.id === selectedRegion ? null : region.id);
                  if (mapContainerRef.current) {
                    mapContainerRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }
                }}
                className="text-left rounded-2xl p-4 transition-all duration-300 group"
                style={{
                  backgroundColor: selectedRegion === region.id
                    ? isDark
                      ? `color-mix(in srgb, ${region.color} 8%, rgba(12,10,22,0.9))`
                      : `color-mix(in srgb, ${region.color} 5%, white)`
                    : isDark ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.8)',
                  border: `1px solid ${selectedRegion === region.id ? region.color : 'var(--border-subtle)'}`,
                  boxShadow: selectedRegion === region.id
                    ? `0 4px 24px color-mix(in srgb, ${region.color} 15%, transparent)`
                    : 'var(--card-shadow)',
                }}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Top line */}
                <div
                  className="h-[2px] rounded-full mb-3 transition-all duration-300"
                  style={{
                    background: `linear-gradient(90deg, ${region.color}, transparent)`,
                    opacity: selectedRegion === region.id ? 0.8 : 0.3,
                  }}
                />
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.12em] block mb-0.5" style={{ color: region.color, fontWeight: 600 }}>
                      {lang === 'fr' ? region.civilizationFr : region.civilizationEn}
                    </span>
                    <h4 style={{ fontSize: '0.95rem', color: 'var(--foreground)', lineHeight: 1.2 }}>
                      {lang === 'fr' ? region.nameFr : region.nameEn}
                    </h4>
                  </div>
                  <motion.div
                    className="flex-shrink-0"
                    animate={{ opacity: selectedRegion === region.id ? 1 : 0.4 }}
                  >
                    <div
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: region.color }}
                    />
                  </motion.div>
                </div>
                <p className="text-[10px] mb-2" style={{ color: 'var(--muted-foreground)' }}>
                  {lang === 'fr' ? region.periodFr : region.periodEn}
                </p>
                <div className="flex flex-wrap gap-1">
                  {region.traditions.slice(0, 2).map((tr) => (
                    <span
                      key={tr}
                      className="text-[9px] px-1.5 py-0.5 rounded"
                      style={{
                        backgroundColor: `color-mix(in srgb, ${region.color} 10%, transparent)`,
                        color: region.color,
                      }}
                    >
                      {tr}
                    </span>
                  ))}
                  {region.traditions.length > 2 && (
                    <span className="text-[9px] px-1.5 py-0.5 rounded" style={{ backgroundColor: 'var(--muted)', color: 'var(--muted-foreground)' }}>
                      +{region.traditions.length - 2}
                    </span>
                  )}
                </div>
                <div
                  className="flex items-center gap-1 mt-3 text-[10px] opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  style={{ color: region.color, fontWeight: 500 }}
                >
                  <span>{t('Voir sur la carte', 'View on map')}</span>
                  <ArrowRight className="w-2.5 h-2.5" />
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        <SectionDivider color="var(--accent-blue)" symbol="diamond" />

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center py-8"
        >
          <p className="text-sm mb-4" style={{ color: 'var(--muted-foreground)' }}>
            {t(
              "Chaque tradition est une fenêtre sur l'universel. Explorez le lexique pour approfondir les concepts.",
              "Each tradition is a window onto the universal. Explore the lexicon to deepen the concepts."
            )}
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link
              to="/lexicon"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm transition-all hover:opacity-80"
              style={{ backgroundColor: 'var(--surface-blue)', color: 'var(--accent-blue)', border: '1px solid var(--border-subtle)' }}
            >
              <BookOpen className="w-4 h-4" />
              {t('Lexique des Traditions', 'Traditions Lexicon')}
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              to="/sources"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm transition-all hover:opacity-80"
              style={{ backgroundColor: 'var(--muted)', color: 'var(--muted-foreground)', border: '1px solid var(--border-subtle)' }}
            >
              {t('Bibliothèque des Sources', 'Sources Library')}
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
