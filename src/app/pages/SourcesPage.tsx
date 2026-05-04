import { useState } from 'react';
import { motion } from 'motion/react';
import { Library, BookOpen, Mic, Users, Filter, ArrowRight, ExternalLink } from 'lucide-react';
import { useLang } from '../components/LanguageContext';
import { useTheme } from '../components/ThemeContext';
import { BentoCard } from '../components/BentoCard';
import { SectionDivider } from '../components/SectionDivider';

type SourceType = 'tradition' | 'scientifique' | 'temoignage' | 'historique' | 'interpretation';
type SourceCategory = 'all' | 'alchemy' | 'symbolism' | 'numerology' | 'geometry' | 'consciousness' | 'cosmology';

interface Source {
  id: string;
  titleFr: string;
  titleEn: string;
  author: string;
  year: string;
  type: SourceType;
  category: SourceCategory;
  descFr: string;
  descEn: string;
  importance: 1 | 2 | 3;
}

interface Thinker {
  name: string;
  lifeFr: string;
  lifeEn: string;
  domainFr: string;
  domainEn: string;
  contributionFr: string;
  contributionEn: string;
  color: string;
  type: SourceType;
}

const TYPE_CONFIG: Record<SourceType, { labelFr: string; labelEn: string; color: string; bg: string }> = {
  tradition: { labelFr: 'Tradition', labelEn: 'Tradition', color: 'var(--accent-purple)', bg: 'var(--surface-purple)' },
  scientifique: { labelFr: 'Scientifique', labelEn: 'Scientific', color: 'var(--accent-blue)', bg: 'var(--surface-blue)' },
  temoignage: { labelFr: 'Témoignage', labelEn: 'Testimony', color: 'var(--accent-teal)', bg: 'var(--surface-teal)' },
  historique: { labelFr: 'Historique', labelEn: 'Historical', color: 'var(--accent-gold)', bg: 'var(--surface-gold)' },
  interpretation: { labelFr: 'Interprétation', labelEn: 'Interpretation', color: 'var(--accent-rose)', bg: 'var(--surface-rose)' },
};

const SOURCES: Source[] = [
  // Alchemy
  {
    id: 'kybalion',
    titleFr: 'Le Kybalion',
    titleEn: 'The Kybalion',
    author: 'Trois Initiés',
    year: '1908',
    type: 'interpretation',
    category: 'alchemy',
    descFr: "Présentation des 7 principes hermétiques (mentalisme, correspondance, vibration, polarité, rythme, causalité, genre). Très influent dans l'ésotérisme occidental moderne, mais son authorship réel est contesté.",
    descEn: "Presentation of 7 Hermetic principles (mentalism, correspondence, vibration, polarity, rhythm, causality, gender). Very influential in modern Western esotericism, but its true authorship is contested.",
    importance: 2,
  },
  {
    id: 'emerald-tablet',
    titleFr: 'La Table d\'Émeraude',
    titleEn: 'The Emerald Tablet',
    author: 'Attribué à Hermès Trismégiste',
    year: '~8e siècle (traduction arabe)',
    type: 'tradition',
    category: 'alchemy',
    descFr: "Texte fondateur de l'alchimie hermétique. Sa formule 'Ce qui est en haut est comme ce qui est en bas' est l'une des maximes les plus citées de la tradition ésotérique.",
    descEn: "Founding text of Hermetic alchemy. Its formula 'As above, so below' is one of the most quoted maxims of the esoteric tradition.",
    importance: 3,
  },
  {
    id: 'jung-psychology-alchemy',
    titleFr: 'Psychologie et Alchimie',
    titleEn: 'Psychology and Alchemy',
    author: 'Carl Gustav Jung',
    year: '1944',
    type: 'scientifique',
    category: 'alchemy',
    descFr: "Jung analyse le symbolisme alchimique comme une projection de processus psychiques inconscients. Travail fondamental établissant un pont rigoureux entre l'alchimie et la psychologie des profondeurs.",
    descEn: "Jung analyzes alchemical symbolism as a projection of unconscious psychic processes. Fundamental work establishing a rigorous bridge between alchemy and depth psychology.",
    importance: 3,
  },
  // Sacred Geometry
  {
    id: 'pacioli-divina',
    titleFr: 'De Divina Proportione',
    titleEn: 'De Divina Proportione',
    author: 'Luca Pacioli (ill. Léonard de Vinci)',
    year: '1509',
    type: 'historique',
    category: 'geometry',
    descFr: "Traité mathématique sur le Nombre d'Or, illustré par Léonard de Vinci. Document historique capital reliant géométrie, art et philosophie à la Renaissance.",
    descEn: "Mathematical treatise on the Golden Ratio, illustrated by Leonardo da Vinci. Key historical document linking geometry, art, and philosophy in the Renaissance.",
    importance: 3,
  },
  {
    id: 'lawlor-sacred',
    titleFr: 'La Géométrie Sacrée',
    titleEn: 'Sacred Geometry',
    author: 'Robert Lawlor',
    year: '1982',
    type: 'interpretation',
    category: 'geometry',
    descFr: "Introduction exhaustive aux principes de la géométrie sacrée, de la Vesica Piscis aux solides de Platon. Largement utilisé dans les études ésotériques modernes.",
    descEn: "Comprehensive introduction to sacred geometry principles, from Vesica Piscis to Platonic solids. Widely used in modern esoteric studies.",
    importance: 2,
  },
  // Consciousness
  {
    id: 'tolle-power-of-now',
    titleFr: 'Le Pouvoir du Moment Présent',
    titleEn: 'The Power of Now',
    author: 'Eckhart Tolle',
    year: '1997',
    type: 'temoignage',
    category: 'consciousness',
    descFr: "Enseignement sur la conscience présente, la souffrance mentale et l'éveil. Traduit dans 50+ langues. Basé sur l'expérience directe de l'auteur plutôt que sur une tradition formelle.",
    descEn: "Teaching on present consciousness, mental suffering, and awakening. Translated into 50+ languages. Based on the author's direct experience rather than a formal tradition.",
    importance: 3,
  },
  {
    id: 'four-agreements',
    titleFr: 'Les Quatre Accords Toltèques',
    titleEn: 'The Four Agreements',
    author: 'Don Miguel Ruiz',
    year: '1997',
    type: 'tradition',
    category: 'consciousness',
    descFr: "Sagesse toltèque adaptée au monde occidental. Critique : popularisation d'une tradition complexe. Valeur : principes pratiques de clarté mentale et d'intégrité.",
    descEn: "Toltec wisdom adapted to the Western world. Critique: popularization of a complex tradition. Value: practical principles of mental clarity and integrity.",
    importance: 2,
  },
  {
    id: 'davidson-emotional-brain',
    titleFr: 'The Emotional Life of Your Brain',
    titleEn: 'The Emotional Life of Your Brain',
    author: 'Richard Davidson & Sharon Begley',
    year: '2012',
    type: 'scientifique',
    category: 'consciousness',
    descFr: "Neurosciences de la méditation et des émotions. Davidson a démontré que la méditation modifie physiquement la structure du cerveau (neuroplasticité) chez les moines tibétains.",
    descEn: "Neuroscience of meditation and emotions. Davidson demonstrated that meditation physically modifies brain structure (neuroplasticity) in Tibetan monks.",
    importance: 3,
  },
  {
    id: 'kabat-zinn-mbsr',
    titleFr: 'Full Catastrophe Living',
    titleEn: 'Full Catastrophe Living',
    author: 'Jon Kabat-Zinn',
    year: '1990',
    type: 'scientifique',
    category: 'consciousness',
    descFr: "Fondation du programme MBSR (Mindfulness-Based Stress Reduction). Approche clinique rigoureusement documentée de la méditation de pleine conscience.",
    descEn: "Foundation of the MBSR (Mindfulness-Based Stress Reduction) program. Rigorously documented clinical approach to mindfulness meditation.",
    importance: 3,
  },
  // Cosmology
  {
    id: 'bardo-thodol',
    titleFr: 'Bardo Thödol (Livre des Morts Tibétain)',
    titleEn: 'Bardo Thödol (Tibetan Book of the Dead)',
    author: 'Attribué à Padmasambhava',
    year: '8e siècle',
    type: 'tradition',
    category: 'cosmology',
    descFr: "Texte bouddhiste tibétain décrivant les étapes de la conscience après la mort. Document de référence pour la compréhension des traditions sur les états intermédiaires.",
    descEn: "Tibetan Buddhist text describing the stages of consciousness after death. Reference document for understanding traditions on intermediate states.",
    importance: 3,
  },
  {
    id: 'van-lommel-consciousness',
    titleFr: 'Consciousness Beyond Life',
    titleEn: 'Consciousness Beyond Life',
    author: 'Pim van Lommel',
    year: '2010',
    type: 'scientifique',
    category: 'cosmology',
    descFr: "Étude médicale rigoureuse sur les expériences de mort imminente (NDE) chez 344 patients cardiaques. Publiée dans The Lancet. Van Lommel conclut que la conscience peut exister indépendamment du cerveau.",
    descEn: "Rigorous medical study on near-death experiences (NDE) in 344 cardiac patients. Published in The Lancet. Van Lommel concludes that consciousness can exist independently of the brain.",
    importance: 3,
  },
  {
    id: 'griaule-dieu-eau',
    titleFr: 'Dieu d\'Eau (Conversations avec Ogotemmêli)',
    titleEn: 'Conversations with Ogotemmêli',
    author: 'Marcel Griaule',
    year: '1948',
    type: 'historique',
    category: 'cosmology',
    descFr: "Documentation ethnographique des connaissances cosmologiques du peuple Dogon (Mali), incluant leurs connaissances remarquables sur Sirius. Travail controversé mais fondamental.",
    descEn: "Ethnographic documentation of the cosmological knowledge of the Dogon people (Mali), including their remarkable knowledge of Sirius. Controversial but fundamental work.",
    importance: 2,
  },
  {
    id: 'monroe-journeys',
    titleFr: 'Journeys Out of the Body',
    titleEn: 'Journeys Out of the Body',
    author: 'Robert Monroe',
    year: '1971',
    type: 'temoignage',
    category: 'cosmology',
    descFr: "Récit pionnier des expériences hors du corps (OBE) de Monroe. Fondation du Monroe Institute qui a depuis conduit des recherches sur les états altérés de conscience.",
    descEn: "Pioneer account of Monroe's out-of-body experiences (OBE). Foundation of the Monroe Institute which has since conducted research on altered states of consciousness.",
    importance: 2,
  },
  // Symbolism
  {
    id: 'jung-archetypes',
    titleFr: 'Archétypes et Inconscient Collectif',
    titleEn: 'Archetypes and the Collective Unconscious',
    author: 'Carl Gustav Jung',
    year: '1954',
    type: 'scientifique',
    category: 'symbolism',
    descFr: "Fondation de la théorie des archétypes universels et de l'inconscient collectif. Jung identifie des symboles récurrents (ombre, anima/animus, Soi) dans les mythes et rêves de toutes cultures.",
    descEn: "Foundation of the theory of universal archetypes and the collective unconscious. Jung identifies recurring symbols (shadow, anima/animus, Self) in myths and dreams across all cultures.",
    importance: 3,
  },
  {
    id: 'campbell-hero',
    titleFr: 'Le Héros aux Mille et Un Visages',
    titleEn: 'The Hero with a Thousand Faces',
    author: 'Joseph Campbell',
    year: '1949',
    type: 'historique',
    category: 'symbolism',
    descFr: "Analyse comparative de la structure narrative du mythe à travers les cultures — le 'monomythe' ou voyage du héros. A influencé George Lucas (Star Wars) et de nombreux créateurs.",
    descEn: "Comparative analysis of narrative structure in myth across cultures — the 'monomyth' or hero's journey. Influenced George Lucas (Star Wars) and many creators.",
    importance: 3,
  },
  {
    id: 'eliade-sacre-profane',
    titleFr: 'Le Sacré et le Profane',
    titleEn: 'The Sacred and the Profane',
    author: 'Mircea Eliade',
    year: '1957',
    type: 'historique',
    category: 'symbolism',
    descFr: "Introduction fondamentale à la phénoménologie du religieux. Eliade distingue l'espace et le temps sacrés du temps ordinaire, et analyse le symbolisme du Centre du Monde (axis mundi) dans toutes les cultures.",
    descEn: "Fundamental introduction to the phenomenology of the religious. Eliade distinguishes sacred space and time from ordinary time, and analyzes the symbolism of the World Center (axis mundi) across all cultures.",
    importance: 3,
  },
  {
    id: 'guenon-symboles',
    titleFr: 'Symboles de la Science Sacrée',
    titleEn: 'Symbols of Sacred Science',
    author: 'René Guénon',
    year: '1962 (posthume)',
    type: 'interpretation',
    category: 'symbolism',
    descFr: "Analyse métaphysique des symboles universels (axe du monde, swastika solaire, point au centre du cercle). Guénon adopte une perspective traditionaliste et perennialiste. Sa position anti-moderniste est à aborder avec discernement critique.",
    descEn: "Metaphysical analysis of universal symbols (world axis, solar swastika, point at the center of the circle). Guénon adopts a traditionalist and perennialist perspective. His anti-modernist position should be approached with critical discernment.",
    importance: 2,
  },
  {
    id: 'manly-hall',
    titleFr: 'The Secret Teachings of All Ages',
    titleEn: 'The Secret Teachings of All Ages',
    author: 'Manly P. Hall',
    year: '1928',
    type: 'interpretation',
    category: 'symbolism',
    descFr: "Encyclopédie illustrée des traditions ésotériques, du symbolisme franc-maçon à la Kabbale. Travail d'une ambition extraordinaire, mais qui mélange documentation historique et interprétation personnelle sans toujours les distinguer. À utiliser comme introduction, avec vérification systématique des sources.",
    descEn: "Illustrated encyclopedia of esoteric traditions, from Masonic symbolism to Kabbalah. Work of extraordinary ambition, but mixing historical documentation and personal interpretation without always distinguishing them. Best used as an introduction, with systematic source verification.",
    importance: 2,
  },
  // Numerology
  {
    id: 'pythagore-vers-dores',
    titleFr: 'Les Vers Dorés de Pythagore',
    titleEn: "The Golden Verses of Pythagoras",
    author: 'École pythagoricienne (attribué)',
    year: '~IVe siècle av. J.-C.',
    type: 'tradition',
    category: 'numerology',
    descFr: "Poème didactique de 71 vers transmettant les préceptes de vie pythagoriciens : maîtrise de soi, contemplation des nombres, soin du corps et de l'âme. Document fondateur de la tradition philosophique grecque.",
    descEn: "Didactic poem of 71 verses transmitting Pythagorean life precepts: self-mastery, contemplation of numbers, care of body and soul. Founding document of the Greek philosophical tradition.",
    importance: 2,
  },
  {
    id: 'iamblichos-vie-pythagore',
    titleFr: 'La Vie Pythagoricienne',
    titleEn: 'On the Pythagorean Life',
    author: 'Iamblichos de Chalcis',
    year: '~280 ap. J.-C.',
    type: 'historique',
    category: 'numerology',
    descFr: "Biographie et exposition des doctrines pythagoriciennes par le philosophe néoplatonicien Iamblichos. Source historique majeure sur la vie de Pythagore et son enseignement ésotérique, bien que rédigée 800 ans après les faits.",
    descEn: "Biography and exposition of Pythagorean doctrines by Neoplatonist philosopher Iamblichus. Major historical source on Pythagoras's life and esoteric teaching, though written 800 years after the events.",
    importance: 2,
  },
  // More Alchemy
  {
    id: 'mutus-liber',
    titleFr: 'Mutus Liber (Le Livre Muet)',
    titleEn: 'Mutus Liber (The Silent Book)',
    author: 'Altus (pseudonyme)',
    year: '1677',
    type: 'tradition',
    category: 'alchemy',
    descFr: "Traité alchimique composé de 15 planches iconographiques sans texte, décrivant le Grand Œuvre par les seules images. Œuvre majeure de l'alchimie hermétique baroque, encore étudiée pour la richesse de son symbolisme.",
    descEn: "Alchemical treatise composed of 15 iconographic plates without text, describing the Magnum Opus through images alone. Major work of Baroque Hermetic alchemy, still studied for the richness of its symbolism.",
    importance: 2,
  },
  {
    id: 'paracelse-opus',
    titleFr: 'Opus Paramirum',
    titleEn: 'Opus Paramirum',
    author: 'Paracelse (Theophrastus Bombastus von Hohenheim)',
    year: '1530',
    type: 'tradition',
    category: 'alchemy',
    descFr: "Traité médical-alchimique de Paracelse introduisant la triade Soufre-Mercure-Sel comme principes fondamentaux de la matière. Paracelse (1493-1541) a révolutionné la médecine en introduisant des substances chimiques dans le traitement des maladies.",
    descEn: "Medical-alchemical treatise by Paracelsus introducing the Sulfur-Mercury-Salt triad as fundamental principles of matter. Paracelsus (1493-1541) revolutionized medicine by introducing chemical substances in disease treatment.",
    importance: 2,
  },
  // More Consciousness
  {
    id: 'maslow-being',
    titleFr: 'Toward a Psychology of Being',
    titleEn: 'Toward a Psychology of Being',
    author: 'Abraham Maslow',
    year: '1962',
    type: 'scientifique',
    category: 'consciousness',
    descFr: "Maslow dépasse sa célèbre hiérarchie des besoins pour explorer les 'expériences paroxystiques' (peak experiences) — états de conscience élargie vécus par les individus pleinement réalisés. Fondation de la psychologie humaniste et transpersonnelle.",
    descEn: "Maslow goes beyond his famous hierarchy of needs to explore 'peak experiences' — expanded states of consciousness lived by fully realized individuals. Foundation of humanistic and transpersonal psychology.",
    importance: 3,
  },
  {
    id: 'james-varieties',
    titleFr: "Les Variétés de l'Expérience Religieuse",
    titleEn: 'The Varieties of Religious Experience',
    author: 'William James',
    year: '1902',
    type: 'scientifique',
    category: 'consciousness',
    descFr: "Étude philosophique et psychologique pionnière des expériences mystiques et religieuses. James identifie quatre caractéristiques communes à l'expérience mystique : ineffabilité, qualité noétique, transience et passivité. Œuvre fondatrice de la psychologie de la religion.",
    descEn: "Pioneering philosophical and psychological study of mystical and religious experiences. James identifies four common characteristics of mystical experience: ineffability, noetic quality, transiency, and passivity. Founding work of the psychology of religion.",
    importance: 3,
  },
  {
    id: 'wilber-sex-ecology',
    titleFr: 'Sex, Ecology, Spirituality',
    titleEn: 'Sex, Ecology, Spirituality',
    author: 'Ken Wilber',
    year: '1995',
    type: 'interpretation',
    category: 'consciousness',
    descFr: "Synthèse encyclopédique de Ken Wilber présentant la théorie intégrale (AQAL : All Quadrants, All Levels). Wilber tente d'intégrer science, philosophie, spiritualité et psychologie dans un cadre unique. Son approche est influente mais critiquée pour certaines simplifications.",
    descEn: "Ken Wilber's encyclopedic synthesis presenting integral theory (AQAL: All Quadrants, All Levels). Wilber attempts to integrate science, philosophy, spirituality, and psychology in a single framework. His approach is influential but criticized for certain simplifications.",
    importance: 2,
  },
  {
    id: 'grof-holotropic',
    titleFr: "The Holotropic Mind",
    titleEn: "The Holotropic Mind",
    author: 'Stanislav Grof',
    year: '1992',
    type: 'scientifique',
    category: 'consciousness',
    descFr: "Grof présente sa cartographie des états non ordinaires de conscience (NOSC) issus de 40 ans de recherche clinique. Le concept d'état holotropique ('tendant vers la totalité') offre un cadre pour comprendre les expériences mystiques, les EMI et les états transpersonnels.",
    descEn: "Grof presents his mapping of non-ordinary states of consciousness (NOSC) from 40 years of clinical research. The holotropic state concept ('tending toward wholeness') offers a framework for understanding mystical experiences, NDEs, and transpersonal states.",
    importance: 3,
  },
  // More Cosmology
  {
    id: 'bucke-cosmic-consciousness',
    titleFr: 'Cosmic Consciousness',
    titleEn: 'Cosmic Consciousness',
    author: 'Richard Maurice Bucke',
    year: '1901',
    type: 'historique',
    category: 'cosmology',
    descFr: "Psychiatre canadien, Bucke décrit l'émergence d'une forme supérieure de conscience chez des individus historiques (Whitman, Blake, Dante, Buddha, Paul). Il propose une évolution de la conscience humaine en trois stades. Ouvrage pionnier de la psychologie transpersonnelle.",
    descEn: "Canadian psychiatrist Bucke describes the emergence of a superior form of consciousness in historical individuals (Whitman, Blake, Dante, Buddha, Paul). He proposes an evolution of human consciousness in three stages. Pioneering work in transpersonal psychology.",
    importance: 2,
  },
  {
    id: 'teilhard-phenomene',
    titleFr: 'Le Phénomène Humain',
    titleEn: 'The Phenomenon of Man',
    author: 'Pierre Teilhard de Chardin',
    year: '1955 (posthume)',
    type: 'interpretation',
    category: 'cosmology',
    descFr: "Vision cosmologique de l'évolution comme processus de complexification-conscience croissant vers un 'Point Oméga'. Teilhard, jésuite et paléontologue, tente de réconcilier science de l'évolution et spiritualité chrétienne. Travail philosophique influent, non une théorie scientifique au sens empirique.",
    descEn: "Cosmological vision of evolution as a process of growing complexification-consciousness toward an 'Omega Point'. Teilhard, a Jesuit and paleontologist, attempts to reconcile evolutionary science with Christian spirituality. Influential philosophical work, not a scientific theory in the empirical sense.",
    importance: 2,
  },
  {
    id: 'upanishads',
    titleFr: 'Les Upanishads',
    titleEn: 'The Upanishads',
    author: 'Tradition védique (anonyme)',
    year: '~800-400 av. J.-C.',
    type: 'tradition',
    category: 'cosmology',
    descFr: "Corpus de 108 textes philosophiques constituant le fondement du Vedanta. Les Upanishads enseignent la nature de Brahman (réalité ultime), d'Atman (soi individuel) et leur identité fondamentale. Parmi les œuvres les plus profondes de la philosophie mondiale.",
    descEn: "Corpus of 108 philosophical texts forming the foundation of Vedanta. The Upanishads teach the nature of Brahman (ultimate reality), Atman (individual self), and their fundamental identity. Among the most profound works in world philosophy.",
    importance: 3,
  },
  {
    id: 'tao-te-ching',
    titleFr: 'Tao Te Ching',
    titleEn: 'Tao Te Ching',
    author: 'Lao-Tseu (attribué)',
    year: '~400 av. J.-C.',
    type: 'tradition',
    category: 'cosmology',
    descFr: "81 courts chapitres sur la nature du Tao (la Voie), la vertu (Te) et l'art de vivre en harmonie avec les lois naturelles. Deuxième texte le plus traduit au monde après la Bible. Fondement du taoïsme philosophique.",
    descEn: "81 short chapters on the nature of the Tao (the Way), virtue (Te), and the art of living in harmony with natural laws. Second most translated text in the world after the Bible. Foundation of philosophical Taoism.",
    importance: 3,
  },
];

const THINKERS: Thinker[] = [
  { name: 'Carl Gustav Jung', lifeFr: '1875-1961', lifeEn: '1875-1961', domainFr: 'Psychiatrie, Psychologie analytique', domainEn: 'Psychiatry, Analytical Psychology', contributionFr: "Archétypes, inconscient collectif, symbolisme alchimique, individuation, synchronicité", contributionEn: "Archetypes, collective unconscious, alchemical symbolism, individuation, synchronicity", color: 'var(--accent-purple)', type: 'scientifique' },
  { name: 'Eckhart Tolle', lifeFr: '1948—', lifeEn: '1948—', domainFr: 'Enseignement spirituel', domainEn: 'Spiritual teaching', contributionFr: "La présence au moment présent comme voie d'éveil. Auteur de 'Le Pouvoir du Moment Présent' (50+ langues).", contributionEn: "Presence in the moment as a path to awakening. Author of 'The Power of Now' (50+ languages).", color: 'var(--accent-teal)', type: 'temoignage' },
  { name: 'Stanislav Grof', lifeFr: '1931—', lifeEn: '1931—', domainFr: 'Psychiatrie transpersonnelle', domainEn: 'Transpersonal psychiatry', contributionFr: "Cartographie des états non ordinaires de conscience. Cofondateur de la psychologie transpersonnelle.", contributionEn: "Mapping of non-ordinary states of consciousness. Co-founder of transpersonal psychology.", color: 'var(--accent-blue)', type: 'scientifique' },
  { name: 'Richard Davidson', lifeFr: '1951—', lifeEn: '1951—', domainFr: 'Neurosciences affectives', domainEn: 'Affective neuroscience', contributionFr: "Neuroplasticité et méditation — études sur les moines tibétains (Université du Wisconsin).", contributionEn: "Neuroplasticity and meditation — studies on Tibetan monks (University of Wisconsin).", color: 'var(--accent-blue)', type: 'scientifique' },
  { name: 'Joseph Campbell', lifeFr: '1904-1987', lifeEn: '1904-1987', domainFr: 'Mythologie comparée', domainEn: 'Comparative mythology', contributionFr: "Le monomythe et la structure universelle du voyage du héros. A influencé George Lucas (Star Wars).", contributionEn: "The monomyth and the universal structure of the hero's journey. Influenced George Lucas (Star Wars).", color: 'var(--accent-gold)', type: 'historique' },
  { name: 'Pim van Lommel', lifeFr: '1943—', lifeEn: '1943—', domainFr: 'Cardiologie, Recherche NDE', domainEn: 'Cardiology, NDE Research', contributionFr: "Étude clinique des expériences de mort imminente (344 patients). Publiée dans The Lancet (2001).", contributionEn: "Clinical study of near-death experiences (344 patients). Published in The Lancet (2001).", color: 'var(--accent-rose)', type: 'scientifique' },
  { name: 'Don Miguel Ruiz', lifeFr: '1952—', lifeEn: '1952—', domainFr: 'Tradition toltèque, Médecine', domainEn: 'Toltec tradition, Medicine', contributionFr: "Transmission des enseignements toltèques. 'Les Quatre Accords Toltèques' traduit dans 50 langues.", contributionEn: "Transmission of Toltec teachings. 'The Four Agreements' translated into 50 languages.", color: 'var(--accent-amber)', type: 'tradition' },
  { name: 'Rumi (Jalâl ud-Dîn)', lifeFr: '1207-1273', lifeEn: '1207-1273', domainFr: 'Soufisme, Poésie mystique', domainEn: 'Sufism, Mystical Poetry', contributionFr: "Masnavi — 25 000 vers sur l'amour divin et l'éveil. L'un des poètes les plus traduits au monde.", contributionEn: "Masnavi — 25,000 verses on divine love and awakening. One of the most translated poets in the world.", color: 'var(--accent-cosmic)', type: 'tradition' },
  { name: 'Pythagore', lifeFr: '570-495 av. J.-C.', lifeEn: '570-495 BCE', domainFr: 'Philosophie, Mathématiques, Musique', domainEn: 'Philosophy, Mathematics, Music', contributionFr: "La nature mathématique du cosmos. Harmonie des sphères. Métempsycose. Tétraktys. Fondement de la tradition ésotérique occidentale.", contributionEn: "The mathematical nature of the cosmos. Harmony of the spheres. Metempsychosis. Tetractys. Foundation of Western esoteric tradition.", color: 'var(--accent-gold)', type: 'tradition' },
  { name: 'Paracelse', lifeFr: '1493-1541', lifeEn: '1493-1541', domainFr: 'Médecine, Alchimie', domainEn: 'Medicine, Alchemy', contributionFr: "Triade Soufre-Mercure-Sel. Introduction des substances chimiques en médecine. Médecin révolutionnaire souvent en avance sur son temps.", contributionEn: "Sulfur-Mercury-Salt triad. Introduction of chemical substances in medicine. Revolutionary physician often ahead of his time.", color: 'var(--accent-purple)', type: 'tradition' },
  { name: 'William James', lifeFr: '1842-1910', lifeEn: '1842-1910', domainFr: 'Philosophie, Psychologie', domainEn: 'Philosophy, Psychology', contributionFr: "Père de la psychologie américaine. 'Les Variétés de l'Expérience Religieuse' — étude scientifique pionnière du mysticisme.", contributionEn: "Father of American psychology. 'The Varieties of Religious Experience' — pioneering scientific study of mysticism.", color: 'var(--accent-blue)', type: 'scientifique' },
  { name: 'Teilhard de Chardin', lifeFr: '1881-1955', lifeEn: '1881-1955', domainFr: 'Paléontologie, Philosophie, Théologie', domainEn: 'Paleontology, Philosophy, Theology', contributionFr: "Concept de noosphère et de Point Oméga — vision de l'évolution comme processus de conscience croissante.", contributionEn: "Concept of noosphere and Omega Point — vision of evolution as a process of growing consciousness.", color: 'var(--accent-teal)', type: 'interpretation' },
  { name: 'Ramana Maharshi', lifeFr: '1879-1950', lifeEn: '1879-1950', domainFr: 'Vedanta Advaita, Enseignement spiritual', domainEn: 'Advaita Vedanta, Spiritual teaching', contributionFr: "La méthode de l'auto-enquête (Who am I?). Témoin de l'expérience de mort et de réalisation spontanée à 16 ans. Transmission silencieuse (mouna).", contributionEn: "The method of self-inquiry (Who am I?). Witness of spontaneous death and realization experience at 16. Silent transmission (mouna).", color: 'var(--accent-cosmic)', type: 'temoignage' },
  { name: 'Mircea Eliade', lifeFr: '1907-1986', lifeEn: '1907-1986', domainFr: 'Histoire des religions, Phénoménologie', domainEn: 'History of religions, Phenomenology', contributionFr: "Phénoménologie du sacré, du mythe et du chamanisme. Œuvre monumentale de comparatisme religieux.", contributionEn: "Phenomenology of the sacred, myth, and shamanism. Monumental work of religious comparativism.", color: 'var(--accent-gold)', type: 'historique' },
];

export function SourcesPage() {
  const { t, lang } = useLang();
  const { isDark } = useTheme();
  const [activeType, setActiveType] = useState<SourceType | 'all'>('all');
  const [activeCategory, setActiveCategory] = useState<SourceCategory>('all');

  const filteredSources = SOURCES.filter((s) => {
    const typeMatch = activeType === 'all' || s.type === activeType;
    const catMatch = activeCategory === 'all' || s.category === activeCategory;
    return typeMatch && catMatch;
  });

  const categories: { id: SourceCategory; labelFr: string; labelEn: string }[] = [
    { id: 'all', labelFr: 'Toutes', labelEn: 'All' },
    { id: 'alchemy', labelFr: 'Alchimie', labelEn: 'Alchemy' },
    { id: 'symbolism', labelFr: 'Symbolisme', labelEn: 'Symbolism' },
    { id: 'numerology', labelFr: 'Numérologie', labelEn: 'Numerology' },
    { id: 'geometry', labelFr: 'Géométrie', labelEn: 'Geometry' },
    { id: 'consciousness', labelFr: 'Conscience', labelEn: 'Consciousness' },
    { id: 'cosmology', labelFr: 'Cosmologie', labelEn: 'Cosmology' },
  ];

  return (
    <div className="pt-16 pb-12 px-6 lg:px-12">
      <div className="max-w-[1600px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16 pt-10"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="inline-flex p-3 rounded-2xl" style={{ backgroundColor: 'var(--surface-gold)' }}>
              <Library className="w-6 h-6" style={{ color: 'var(--accent-gold)' }} />
            </div>
            <span className="text-xs uppercase tracking-[0.25em]" style={{ color: 'var(--accent-gold)', fontWeight: 500 }}>
              {t('Bibliothèque & Références', 'Library & References')}
            </span>
          </div>
          <h1 className="mb-5" style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)' }}>
            {t('Sources & Bibliographie', 'Sources & Bibliography')}
          </h1>
          <p className="max-w-2xl text-sm mb-8" style={{ color: 'var(--muted-foreground)', lineHeight: 1.9 }}>
            {t(
              "Une bibliothèque curatée des références les plus solides dans chaque domaine. Chaque source est clairement identifiée par son type : tradition ancienne, recherche scientifique, témoignage documenté, étude historique ou interprétation.",
              "A curated library of the strongest references in each field. Each source is clearly identified by its type: ancient tradition, scientific research, documented testimony, historical study, or interpretation."
            )}
          </p>

          {/* Type legend */}
          <div className="flex flex-wrap gap-2">
            {(Object.entries(TYPE_CONFIG) as [SourceType, typeof TYPE_CONFIG[SourceType]][]).map(([key, conf]) => (
              <span
                key={key}
                className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full"
                style={{ backgroundColor: conf.bg, color: conf.color }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: conf.color }} />
                {lang === 'fr' ? conf.labelFr : conf.labelEn}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Distinction notice */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8 p-5 rounded-2xl"
          style={{
            backgroundColor: isDark ? 'rgba(200,168,90,0.06)' : 'rgba(200,168,90,0.06)',
            border: '1px solid rgba(200,168,90,0.15)',
          }}
        >
          <p className="text-xs" style={{ color: 'var(--muted-foreground)', lineHeight: 1.8 }}>
            <span style={{ color: 'var(--accent-gold)', fontWeight: 600 }}>{t('Philosophie éditoriale — ', 'Editorial philosophy — ')}</span>
            {t(
              "Luminous distingue soigneusement ce qui appartient à la tradition (croyance transmise, pratique rituelle), au témoignage vécu (expérience subjective documentée), à la recherche historique (faits vérifiables), à la science empirique (études, mesures reproductibles) et à l'interprétation (synthèse, réinterprétation moderne). Nous ne prétendons pas que toutes ces catégories sont équivalentes — mais nous considérons qu'elles méritent toutes d'être explorées avec rigueur et ouverture.",
              "Luminous carefully distinguishes what belongs to tradition (transmitted belief, ritual practice), lived testimony (documented subjective experience), historical research (verifiable facts), empirical science (studies, reproducible measurements), and interpretation (synthesis, modern reinterpretation). We do not claim all these categories are equivalent — but we believe they all deserve to be explored with rigor and openness."
            )}
          </p>
        </motion.div>

        {/* Thinkers Section */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-6">
            <Users className="w-4 h-4" style={{ color: 'var(--accent-purple)' }} />
            <h3>{t('Penseurs & Figures de Référence', 'Thinkers & Reference Figures')}</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {THINKERS.map((thinker, i) => {
              const typeConf = TYPE_CONFIG[thinker.type];
              return (
                <motion.div
                  key={thinker.name}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="p-4 rounded-2xl"
                  style={{
                    backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.8)',
                    border: '1px solid var(--border-subtle)',
                    boxShadow: 'var(--card-shadow)',
                  }}
                >
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div>
                      <span className="text-sm block" style={{ fontWeight: 600, fontFamily: "'Cormorant Garamond', serif", fontSize: '1rem' }}>
                        {thinker.name}
                      </span>
                      <span className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
                        {lang === 'fr' ? thinker.lifeFr : thinker.lifeEn}
                      </span>
                    </div>
                    <span
                      className="text-[9px] px-2 py-0.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: typeConf.bg, color: typeConf.color, fontWeight: 500 }}
                    >
                      {lang === 'fr' ? typeConf.labelFr : typeConf.labelEn}
                    </span>
                  </div>
                  <p className="text-xs mb-2" style={{ color: thinker.color, fontWeight: 500 }}>
                    {lang === 'fr' ? thinker.domainFr : thinker.domainEn}
                  </p>
                  <p className="text-xs" style={{ color: 'var(--muted-foreground)', lineHeight: 1.7 }}>
                    {lang === 'fr' ? thinker.contributionFr : thinker.contributionEn}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        <SectionDivider color="var(--accent-gold)" symbol="star" />

        {/* Sources Library */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <BookOpen className="w-4 h-4" style={{ color: 'var(--accent-gold)' }} />
            <h3>{t('Œuvres & Textes de Référence', 'Reference Works & Texts')}</h3>
          </div>

          {/* Filters */}
          <div className="flex flex-col gap-4 mb-6">
            {/* Type filter */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--muted-foreground)' }}>
                <Filter className="w-3 h-3" />
                {t('Type :', 'Type:')}
              </span>
              {[{ id: 'all' as const, labelFr: 'Tous', labelEn: 'All', color: 'var(--accent-purple)', bg: 'var(--surface-purple)' },
                ...Object.entries(TYPE_CONFIG).map(([id, conf]) => ({ id: id as SourceType, ...conf }))
              ].map((option) => (
                <button
                  key={option.id}
                  onClick={() => setActiveType(option.id)}
                  className="text-xs px-3 py-1 rounded-full transition-all"
                  style={{
                    backgroundColor: activeType === option.id ? option.color : 'transparent',
                    color: activeType === option.id ? '#fff' : 'var(--muted-foreground)',
                    border: `1px solid ${activeType === option.id ? option.color : 'var(--border-subtle)'}`,
                  }}
                >
                  {lang === 'fr' ? option.labelFr : option.labelEn}
                </button>
              ))}
            </div>
            {/* Category filter */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs" style={{ color: 'var(--muted-foreground)' }}>{t('Domaine :', 'Domain:')}</span>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className="text-xs px-3 py-1 rounded-full transition-all"
                  style={{
                    backgroundColor: activeCategory === cat.id ? 'var(--accent-gold)' : 'transparent',
                    color: activeCategory === cat.id ? '#fff' : 'var(--muted-foreground)',
                    border: `1px solid ${activeCategory === cat.id ? 'var(--accent-gold)' : 'var(--border-subtle)'}`,
                  }}
                >
                  {lang === 'fr' ? cat.labelFr : cat.labelEn}
                </button>
              ))}
            </div>
          </div>

          {/* Sources grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredSources.map((source, i) => {
              const typeConf = TYPE_CONFIG[source.type];
              return (
                <motion.div
                  key={source.id}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="p-5 rounded-2xl"
                  style={{
                    backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.8)',
                    border: '1px solid var(--border-subtle)',
                    boxShadow: 'var(--card-shadow)',
                  }}
                >
                  {/* Importance stars */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex gap-0.5">
                      {Array.from({ length: 3 }).map((_, j) => (
                        <span
                          key={j}
                          style={{ color: j < source.importance ? 'var(--accent-gold)' : 'var(--border)', fontSize: '0.65rem' }}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    <span
                      className="text-[10px] px-2 py-0.5 rounded-full"
                      style={{ backgroundColor: typeConf.bg, color: typeConf.color, fontWeight: 500 }}
                    >
                      {lang === 'fr' ? typeConf.labelFr : typeConf.labelEn}
                    </span>
                  </div>

                  <h5 className="mb-1" style={{ fontSize: '0.95rem', fontFamily: "'Cormorant Garamond', serif" }}>
                    {lang === 'fr' ? source.titleFr : source.titleEn}
                  </h5>
                  <p className="text-xs mb-1" style={{ color: 'var(--accent-gold)' }}>{source.author}</p>
                  <p className="text-xs mb-3" style={{ color: 'var(--muted-foreground)' }}>{source.year}</p>
                  <p className="text-xs" style={{ color: 'var(--muted-foreground)', lineHeight: 1.7 }}>
                    {lang === 'fr' ? source.descFr : source.descEn}
                  </p>
                </motion.div>
              );
            })}
            {filteredSources.length === 0 && (
              <div className="col-span-3 text-center py-16" style={{ color: 'var(--muted-foreground)' }}>
                <p className="text-sm">{t('Aucune source pour ces filtres', 'No sources for these filters')}</p>
              </div>
            )}
          </div>
        </div>

        {/* Talks & conferences section */}
        <div className="mb-8">
          <BentoCard glowColor="var(--glow-gold)" style={{ backgroundColor: 'var(--surface-gold)' }}>
            <div className="flex items-center gap-3 mb-6">
              <Mic className="w-4 h-4" style={{ color: 'var(--accent-gold)' }} />
              <h3 style={{ fontSize: '1.3rem' }}>{t('Conférences & Talks Recommandés', 'Recommended Talks & Lectures')}</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { title: 'The Science of Meditation', speaker: 'Richard Davidson', event: 'TEDx Madison', year: '2013', type: 'scientifique' as SourceType },
                { title: 'Near Death Experiences', speaker: 'Pim van Lommel', event: 'IANDS Conference', year: '2012', type: 'scientifique' as SourceType },
                { title: 'The Power of Vulnerability', speaker: 'Brené Brown', event: 'TEDx Houston', year: '2010', type: 'temoignage' as SourceType },
                { title: "The Mystical Experience", speaker: 'Stanislav Grof', event: 'Synthesis Conference', year: '2005', type: 'scientifique' as SourceType },
                { title: 'Sacred Geometry & Architecture', speaker: 'Keith Critchlow', event: 'Temenos', year: '1994', type: 'interpretation' as SourceType },
                { title: "Consciousness & Quantum Mechanics", speaker: 'Roger Penrose & Stuart Hameroff', event: 'Toward a Science of Consciousness', year: '2014', type: 'scientifique' as SourceType },
              ].map((talk, i) => {
                const typeConf = TYPE_CONFIG[talk.type];
                return (
                  <motion.div
                    key={talk.title}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="p-4 rounded-xl"
                    style={{ backgroundColor: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.7)', border: '1px solid var(--border-subtle)' }}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <p className="text-sm" style={{ fontWeight: 500, lineHeight: 1.4 }}>{talk.title}</p>
                      <span className="text-[9px] px-1.5 py-0.5 rounded-full flex-shrink-0" style={{ backgroundColor: typeConf.bg, color: typeConf.color }}>
                        {lang === 'fr' ? typeConf.labelFr : typeConf.labelEn}
                      </span>
                    </div>
                    <p className="text-xs mb-0.5" style={{ color: 'var(--accent-gold)' }}>{talk.speaker}</p>
                    <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>{talk.event}, {talk.year}</p>
                  </motion.div>
                );
              })}
            </div>
          </BentoCard>
        </div>

        {/* Contribute CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center py-8"
          style={{ borderTop: '1px solid var(--border-subtle)' }}
        >
          <p className="text-sm mb-2" style={{ color: 'var(--muted-foreground)' }}>
            {t('Cette bibliographie est curatée et évolue continuellement.', 'This bibliography is curated and continuously evolving.')}
          </p>
          <p className="text-xs" style={{ color: 'var(--muted-foreground)', opacity: 0.6 }}>
            {t('Toute source proposée est évaluée selon nos critères de rigueur et de clarté.', 'All proposed sources are evaluated according to our rigor and clarity criteria.')}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
