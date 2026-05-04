import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, X, ChevronDown, Scale, Sparkles, BookOpen } from 'lucide-react';
import { Link } from 'react-router';
import { useLang } from '../components/LanguageContext';
import { useTheme } from '../components/ThemeContext';
import { SectionDivider } from '../components/SectionDivider';

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
interface ComparisonConcept {
  nameFr: string;
  nameEn: string;
  subtitleFr: string;
  subtitleEn: string;
  color: string;
  traitsFr: string[];
  traitsEn: string[];
  definitionFr: string;
  definitionEn: string;
  originFr?: string;
  originEn?: string;
}

interface Comparison {
  id: string;
  categoryFr: string;
  categoryEn: string;
  taglineFr: string;
  taglineEn: string;
  conceptA: ComparisonConcept;
  conceptB: ComparisonConcept;
  commonFr: string[];
  commonEn: string[];
  differenceFr: string;
  differenceEn: string;
  synthesisFr: string;
  synthesisEn: string;
  confusionFr: string;
  confusionEn: string;
  readMore: { href: string; labelFr: string; labelEn: string }[];
}

const COMPARISONS: Comparison[] = [
  {
    id: 'chakra-aura',
    categoryFr: 'Corps subtil & Énergie',
    categoryEn: 'Subtle body & Energy',
    taglineFr: 'Deux façons de parler du même corps subtil ?',
    taglineEn: 'Two ways of speaking about the same subtle body?',
    conceptA: {
      nameFr: 'Chakra', nameEn: 'Chakra',
      subtitleFr: 'Centre d\'énergie intérieure', subtitleEn: 'Inner energy center',
      color: 'var(--accent-rose)',
      traitsFr: ['Localisé dans le corps', 'Tourbillon d\'énergie', '7 centres principaux', 'Selon le yoga tantrique', 'Chaque chakra = organe/conscience'],
      traitsEn: ['Located in the body', 'Energy vortex', '7 main centers', 'According to Tantric yoga', 'Each chakra = organ/consciousness'],
      definitionFr: 'Dans les traditions yogiques indiennes (Tantrisme, Kundalini Yoga), les chakras sont des centres d\'énergie vitale (prana) situés le long de la colonne vertébrale. Le terme sanskrit signifie "roue".',
      definitionEn: 'In Indian yogic traditions (Tantrism, Kundalini Yoga), chakras are centers of vital energy (prana) located along the spine. The Sanskrit term means "wheel".',
      originFr: 'Textes tantriques indiens (~VIIe siècle ap. J.-C.)',
      originEn: 'Indian Tantric texts (~7th century CE)',
    },
    conceptB: {
      nameFr: 'Aura', nameEn: 'Aura',
      subtitleFr: 'Champ d\'énergie autour du corps', subtitleEn: 'Energy field around the body',
      color: 'var(--accent-blue)',
      traitsFr: ['Enveloppe lumineuse externe', 'Couches concentriques', 'Visible à l\'œil (clairvoyance)', 'Tradition ésotérique occidentale', 'Couleurs révélatrices d\'états'],
      traitsEn: ['External luminous envelope', 'Concentric layers', 'Visible to the eye (clairvoyance)', 'Western esoteric tradition', 'Colors reveal states'],
      definitionFr: "Champ énergétique lumineux censé entourer le corps humain selon les traditions ésotériques. Décrit avec différentes couches (physique, éthérique, émotionnel, mental, causal). Popularisé par la théosophie.",
      definitionEn: "Luminous energy field said to surround the human body according to esoteric traditions. Described with different layers (physical, etheric, emotional, mental, causal). Popularized by Theosophy.",
      originFr: 'Terme grec, développé par la Théosophie (XIXe siècle)',
      originEn: 'Greek term, developed by Theosophy (19th century)',
    },
    commonFr: ['Corps subtil et énergie invisible', 'Lié à la santé et la conscience', 'Pratiques de visualisation associées', 'Traditions de soin par l\'énergie'],
    commonEn: ['Subtle body and invisible energy', 'Linked to health and consciousness', 'Visualization practices associated', 'Energy healing traditions'],
    differenceFr: 'Les chakras sont des points précis à l\'intérieur du corps avec une localisation anatomique spécifique. L\'aura est un champ extérieur qui entoure le corps. Les chakras viennent d\'une tradition spécifique et codifiée (yoga tantrique), l\'aura est un concept plus vague, réinterprété à travers de nombreuses traditions.',
    differenceEn: 'Chakras are specific points inside the body with specific anatomical location. The aura is an external field that surrounds the body. Chakras come from a specific and codified tradition (Tantric yoga), the aura is a more vague concept, reinterpreted through many traditions.',
    synthesisFr: "De nombreuses traditions contemporaines combinent les deux concepts, en voyant les chakras comme les 'moteurs' d'une aura globale. Cette synthèse est moderne et ne correspond pas aux sources originelles de chaque tradition.",
    synthesisEn: "Many contemporary traditions combine both concepts, viewing chakras as the 'engines' of an overall aura. This synthesis is modern and does not correspond to the original sources of each tradition.",
    confusionFr: "Confondre chakra et aura revient à mélanger deux systèmes de description distincts. Les livres grand public amalgament souvent les deux — il est utile de savoir que cette fusion est contemporaine.",
    confusionEn: "Confusing chakra and aura means mixing two distinct description systems. Popular books often amalgamate both — it's useful to know that this fusion is contemporary.",
    readMore: [
      { href: '/conscience', labelFr: 'Conscience & Éveil', labelEn: 'Consciousness & Awakening' },
      { href: '/lexicon/chakras', labelFr: 'Fiche Chakras', labelEn: 'Chakras Article' },
    ],
  },
  {
    id: 'reve-lucide-voyage-astral',
    categoryFr: 'États de Conscience',
    categoryEn: 'States of Consciousness',
    taglineFr: 'Deux expériences altérées souvent confondues',
    taglineEn: 'Two altered experiences often confused',
    conceptA: {
      nameFr: 'Rêve Lucide', nameEn: 'Lucid Dream',
      subtitleFr: 'Conscience à l\'intérieur du rêve', subtitleEn: 'Consciousness inside the dream',
      color: 'var(--accent-teal)',
      traitsFr: ['Se produit pendant le sommeil REM', 'Conscience que l\'on rêve', 'Corps physique inactif', 'Documenté scientifiquement', 'Environnement = construction mentale'],
      traitsEn: ['Occurs during REM sleep', 'Awareness that one is dreaming', 'Physical body inactive', 'Scientifically documented', 'Environment = mental construction'],
      definitionFr: 'État de sommeil REM pendant lequel le dormeur est conscient de rêver et peut parfois diriger son rêve. Documenté scientifiquement par Stephen LaBerge (Stanford) en 1980.',
      definitionEn: 'REM sleep state during which the sleeper is aware of dreaming and can sometimes direct their dream. Scientifically documented by Stephen LaBerge (Stanford) in 1980.',
      originFr: 'Terme du tibétain "rêve du yoga", popularisé par LaBerge (1980)',
      originEn: 'Term from Tibetan "dream yoga", popularized by LaBerge (1980)',
    },
    conceptB: {
      nameFr: 'Voyage Astral', nameEn: 'Astral Projection',
      subtitleFr: 'Sortie du corps physique (OBE)', subtitleEn: 'Out-of-body experience (OBE)',
      color: 'var(--accent-purple)',
      traitsFr: ['Peut survenir à l\'éveil ou endormi', 'Conscience semble quitter le corps', 'Corps astral distinct du corps physique', 'Non documenté scientifiquement comme tel', 'Cosmologies traditionnelles multiples'],
      traitsEn: ['Can occur awake or asleep', 'Consciousness seems to leave the body', 'Astral body distinct from physical body', 'Not scientifically documented as such', 'Multiple traditional cosmologies'],
      definitionFr: "Expérience dans laquelle la conscience semble se détacher du corps physique et se déplacer librement. Nombreux témoignages à travers toutes les cultures. La nature réelle de l'expérience est débattue.",
      definitionEn: "Experience in which consciousness seems to detach from the physical body and move freely. Numerous testimonies across all cultures. The actual nature of the experience is debated.",
      originFr: 'Présent dans de nombreuses traditions (Égypte, Tibet, Grèce)',
      originEn: 'Present in many traditions (Egypt, Tibet, Greece)',
    },
    commonFr: ['État de conscience altéré', 'Expérience subjective intense', 'Sentiment de liberté et de légèreté', 'Potentiellement transformateur psychologiquement'],
    commonEn: ['Altered state of consciousness', 'Intense subjective experience', 'Feeling of freedom and lightness', 'Potentially transformative psychologically'],
    differenceFr: "Le rêve lucide est un phénomène scientifiquement documenté : il se produit pendant le sommeil REM avec des corrélats cérébraux mesurables. Le voyage astral repose sur une prémisse différente — l'existence d'un corps non-physique pouvant se déplacer indépendamment — une affirmation non vérifiable scientifiquement.",
    differenceEn: "Lucid dreaming is a scientifically documented phenomenon: it occurs during REM sleep with measurable brain correlates. Astral projection rests on a different premise — the existence of a non-physical body that can move independently — an unverifiable claim scientifically.",
    synthesisFr: "De nombreux praticiens de projection astrale décrivent une phase de départ similaire au rêve lucide, ce qui suggère une continuum d'états. Certains chercheurs (comme Tart) proposent que la différence est avant tout interprétative : une même expérience peut être 'cadrée' différemment.",
    synthesisEn: "Many astral projection practitioners describe a departure phase similar to lucid dreaming, suggesting a continuum of states. Some researchers (like Tart) propose that the difference is primarily interpretive: the same experience can be 'framed' differently.",
    confusionFr: "La confusion est fréquente car les deux expériences partagent des éléments communs (sortie du corps, conscience éveillée, mouvement). La différence essentielle est d'ordre ontologique : l'une suppose un corps astral séparable, l'autre non.",
    confusionEn: "Confusion is common because both experiences share common elements (leaving the body, awakened consciousness, movement). The essential difference is ontological: one assumes a separable astral body, the other does not.",
    readMore: [
      { href: '/conscience', labelFr: 'Conscience & Éveil', labelEn: 'Consciousness & Awakening' },
      { href: '/lexicon/voyage-astral', labelFr: 'Fiche Voyage Astral', labelEn: 'Astral Projection Article' },
    ],
  },
  {
    id: 'alchimie-spirituelle-historique',
    categoryFr: 'Alchimie',
    categoryEn: 'Alchemy',
    taglineFr: 'La même pratique, deux lectures différentes',
    taglineEn: 'The same practice, two different readings',
    conceptA: {
      nameFr: 'Alchimie Historique', nameEn: 'Historical Alchemy',
      subtitleFr: 'Pratique proto-chimique & philosophique', subtitleEn: 'Proto-chemical & philosophical practice',
      color: 'var(--accent-gold)',
      traitsFr: ['Manipulation réelle de matières', 'Quête de la pierre philosophale', 'Transmutation des métaux vile en or', 'Fondements de la chimie moderne', 'Tradition multiséculaire documentée'],
      traitsEn: ['Real manipulation of materials', 'Quest for the philosopher\'s stone', 'Transmutation of base metals into gold', 'Foundations of modern chemistry', 'Multi-century documented tradition'],
      definitionFr: "Pratique proto-chimique et philosophique développée en Égypte, dans l'Islam médiéval et en Europe (XIIe–XVIIe siècle). Les alchimistes cherchaient à transformer la matière — et développèrent des techniques chimiques réelles.",
      definitionEn: "Proto-chemical and philosophical practice developed in Egypt, medieval Islam, and Europe (12th–17th century). Alchemists sought to transform matter — and developed real chemical techniques.",
      originFr: 'Alexandrie (Ier siècle), puis Islam (VIIIe), puis Europe médiévale',
      originEn: 'Alexandria (1st century), then Islam (8th), then medieval Europe',
    },
    conceptB: {
      nameFr: 'Alchimie Spirituelle', nameEn: 'Spiritual Alchemy',
      subtitleFr: 'Transformation intérieure par le symbole', subtitleEn: 'Inner transformation through symbol',
      color: 'var(--accent-purple)',
      traitsFr: ['Transformation de soi', 'Les métaux = états psychologiques', 'Or = conscience pure', 'Réinterprétation jungienne', 'Langage symbolique de l\'âme'],
      traitsEn: ['Self-transformation', 'Metals = psychological states', 'Gold = pure consciousness', 'Jungian reinterpretation', 'Symbolic language of the soul'],
      definitionFr: "Lecture symbolique de l'alchimie où les opérations (nigredo, albedo, rubedo) représentent des étapes de transformation psychologique et spirituelle. Popularisée par Jung et ses travaux sur la psychologie analytique.",
      definitionEn: "Symbolic reading of alchemy where the operations (nigredo, albedo, rubedo) represent stages of psychological and spiritual transformation. Popularized by Jung and his work on analytical psychology.",
      originFr: 'Réinterprétation par Jung (XXe siècle) — mais encodée dans les textes originaux',
      originEn: 'Reinterpreted by Jung (20th century) — but encoded in original texts',
    },
    commonFr: ['Notion de Grand Œuvre', 'Transformation et purification', 'Transmutation (matière ou soi)', 'Langage symbolique cryptique'],
    commonEn: ['Notion of Great Work', 'Transformation and purification', 'Transmutation (matter or self)', 'Cryptic symbolic language'],
    differenceFr: "L'alchimie historique était une pratique concrète qui a contribué au développement de la chimie (distillation, acides, sublimation). L'alchimie spirituelle est une herméneutique — une façon de lire ces textes. Jung a montré que les deux lectures coexistaient probablement dans l'esprit des praticiens.",
    differenceEn: "Historical alchemy was a concrete practice that contributed to the development of chemistry (distillation, acids, sublimation). Spiritual alchemy is a hermeneutics — a way of reading these texts. Jung showed that both readings probably coexisted in the minds of practitioners.",
    synthesisFr: "La thèse de Jung : les alchimistes projetaient leur monde intérieur sur la matière. L'alchimie serait ainsi à la fois physique ET psychologique — les deux lectures se nourrissant mutuellement, sans se réduire l'une à l'autre.",
    synthesisEn: "Jung's thesis: alchemists projected their inner world onto matter. Alchemy would thus be simultaneously physical AND psychological — both readings feeding each other, without reducing one to the other.",
    confusionFr: "Réduire l'alchimie à 'juste une métaphore spirituelle' efface son histoire scientifique réelle. À l'inverse, ignorer sa dimension symbolique appauvrit sa compréhension. Les deux lectures sont légitimes.",
    confusionEn: "Reducing alchemy to 'just a spiritual metaphor' erases its real scientific history. Conversely, ignoring its symbolic dimension impoverishes its understanding. Both readings are legitimate.",
    readMore: [
      { href: '/alchemy', labelFr: 'Alchimie', labelEn: 'Alchemy' },
      { href: '/lexicon/grand-oeuvre', labelFr: 'Fiche Grand Œuvre', labelEn: 'Great Work Article' },
    ],
  },
  {
    id: 'meditation-contemplation',
    categoryFr: 'Pratiques Spirituelles',
    categoryEn: 'Spiritual Practices',
    taglineFr: 'Deux modes d\'intériorité proches mais distincts',
    taglineEn: 'Two close but distinct modes of interiority',
    conceptA: {
      nameFr: 'Méditation', nameEn: 'Meditation',
      subtitleFr: 'Attention dirigée ou ouverte', subtitleEn: 'Directed or open attention',
      color: 'var(--accent-teal)',
      traitsFr: ['Pratique active de l\'attention', 'Technique spécifique', 'Transcende les traditions', 'Études neuroscientifiques nombreuses', 'Plage horaire dédiée'],
      traitsEn: ['Active practice of attention', 'Specific technique', 'Transcends traditions', 'Numerous neuroscientific studies', 'Dedicated time slot'],
      definitionFr: "Pratique mentale visant à entraîner l'attention et la conscience, souvent par la focalisation sur la respiration, un objet, un mantra ou l'observation neutre des pensées.",
      definitionEn: "Mental practice aimed at training attention and awareness, often by focusing on breath, an object, a mantra, or neutral observation of thoughts.",
    },
    conceptB: {
      nameFr: 'Contemplation', nameEn: 'Contemplation',
      subtitleFr: 'Réception passive du divin', subtitleEn: 'Passive reception of the divine',
      color: 'var(--accent-blue)',
      traitsFr: ['État de réception, non d\'effort', 'Plus spécifique aux traditions théistes', 'Prière profonde, union mystique', 'Terme chrétien / soufi principalement', 'Peut surgir spontanément'],
      traitsEn: ['State of reception, not effort', 'More specific to theistic traditions', 'Deep prayer, mystical union', 'Primarily Christian/Sufi term', 'Can arise spontaneously'],
      definitionFr: "Dans la tradition chrétienne et soufie, la contemplation est un état de présence silencieuse et de réception du divin — moins une technique qu'un don ou une grâce. Différent de la méditation active.",
      definitionEn: "In the Christian and Sufi tradition, contemplation is a state of silent presence and reception of the divine — less a technique than a gift or grace. Different from active meditation.",
    },
    commonFr: ['Silence intérieur recherché', 'Dépassement du mental discursif', 'Transformation intérieure visée', 'Pratiques respiratoires souvent associées'],
    commonEn: ['Sought inner silence', 'Overcoming discursive mind', 'Aimed inner transformation', 'Breathing practices often associated'],
    differenceFr: "La méditation est généralement un effort actif, une technique applicable. La contemplation (au sens mystique) est davantage un état de réception. La méditation transcende les traditions ; la contemplation est davantage ancrée dans les traditions théistes (christianisme mystique, soufisme).",
    differenceEn: "Meditation is generally an active effort, an applicable technique. Contemplation (in the mystical sense) is more of a receptive state. Meditation transcends traditions; contemplation is more rooted in theistic traditions (mystical Christianity, Sufism).",
    synthesisFr: "De nombreux mystiques décrivent la méditation comme un chemin vers la contemplation — l'effort menant à la grâce. La pratique prépare l'espace ; la contemplation y habite.",
    synthesisEn: "Many mystics describe meditation as a path toward contemplation — effort leading to grace. Practice prepares the space; contemplation inhabits it.",
    confusionFr: "Dans la littérature grand public, les deux termes sont souvent utilisés comme synonymes. Cette confusion appauvrit la compréhension des deux. Un moine chrétien et un pratiquant bouddhiste ne font pas exactement la même chose.",
    confusionEn: "In popular literature, the two terms are often used synonymously. This confusion impoverishes the understanding of both. A Christian monk and a Buddhist practitioner are not doing exactly the same thing.",
    readMore: [
      { href: '/conscience', labelFr: 'Conscience & Éveil', labelEn: 'Consciousness & Awakening' },
    ],
  },
  {
    id: 'symbole-archetype',
    categoryFr: 'Psychologie & Symbolisme',
    categoryEn: 'Psychology & Symbolism',
    taglineFr: 'Le général et le particulier',
    taglineEn: 'The general and the particular',
    conceptA: {
      nameFr: 'Symbole', nameEn: 'Symbol',
      subtitleFr: 'Forme particulière chargée de sens', subtitleEn: 'Particular form charged with meaning',
      color: 'var(--accent-gold)',
      traitsFr: ['Forme visuelle ou sonore spécifique', 'Culturellement déterminé (souvent)', 'Peut varier entre traditions', 'L\'objet représente l\'idée', 'Triangle, serpent, croix…'],
      traitsEn: ['Specific visual or sonic form', 'Often culturally determined', 'Can vary between traditions', 'The object represents the idea', 'Triangle, serpent, cross…'],
      definitionFr: "Un symbole est une forme (image, son, geste) qui représente quelque chose d'autre — souvent une réalité abstraite ou spirituelle. Le serpent peut symboliser la sagesse, la guérison ou le mal selon les cultures.",
      definitionEn: "A symbol is a form (image, sound, gesture) that represents something else — often an abstract or spiritual reality. The serpent can symbolize wisdom, healing, or evil depending on cultures.",
    },
    conceptB: {
      nameFr: 'Archétype', nameEn: 'Archetype',
      subtitleFr: 'Modèle psychique universel', subtitleEn: 'Universal psychic pattern',
      color: 'var(--accent-purple)',
      traitsFr: ['Structure psychologique universelle', 'Inconscient collectif (Jung)', 'Transcende les cultures', 'L\'Ombre, le Soi, l\'Anima...', 'S\'exprime à travers des symboles'],
      traitsEn: ['Universal psychological structure', 'Collective unconscious (Jung)', 'Transcends cultures', 'The Shadow, Self, Anima...', 'Expressed through symbols'],
      definitionFr: "Terme jungien désignant des modèles psychiques universels présents dans l'inconscient collectif de toute l'humanité. Les archétypes sont les matrices ; les symboles sont leurs expressions particulières.",
      definitionEn: "Jungian term designating universal psychic patterns present in the collective unconscious of all humanity. Archetypes are the matrices; symbols are their particular expressions.",
    },
    commonFr: ['Signification profonde au-delà de l\'apparence', 'Présents dans mythes et rêves', 'Langage de l\'inconscient', 'Universel et trans-culturel (souvent)'],
    commonEn: ['Deep meaning beyond appearance', 'Present in myths and dreams', 'Language of the unconscious', 'Universal and cross-cultural (often)'],
    differenceFr: "L'archétype est la structure profonde universelle — le moule. Le symbole est la forme particulière que prend cet archétype dans une culture. L'archétype de la Mère existe dans toutes les cultures ; la Vierge Marie, Isis ou Kali en sont des expressions symboliques distinctes.",
    differenceEn: "The archetype is the deep universal structure — the mold. The symbol is the particular form this archetype takes in a culture. The Mother archetype exists in all cultures; the Virgin Mary, Isis, or Kali are distinct symbolic expressions of it.",
    synthesisFr: "Les symboles sont les 'habits' des archétypes. Un archétype unique peut être vêtu différemment selon les traditions, mais reconnaissable par sa fonction psychologique.",
    synthesisEn: "Symbols are the 'clothes' of archetypes. A single archetype can be dressed differently according to traditions, but recognizable by its psychological function.",
    confusionFr: "Utiliser 'archétype' pour dire 'symbole' (très courant) donne une portée universelle injustifiée à des symboles culturels particuliers. La distinction est importante pour une lecture rigoureuse.",
    confusionEn: "Using 'archetype' to mean 'symbol' (very common) gives unjustified universal scope to particular cultural symbols. The distinction is important for rigorous reading.",
    readMore: [
      { href: '/symbolism', labelFr: 'Symbolisme', labelEn: 'Symbolism' },
    ],
  },
  {
    id: 'karma-destin',
    categoryFr: 'Philosophie & Cosmologie',
    categoryEn: 'Philosophy & Cosmology',
    taglineFr: 'Deux visions du devenir humain',
    taglineEn: 'Two visions of human becoming',
    conceptA: {
      nameFr: 'Karma', nameEn: 'Karma',
      subtitleFr: 'Loi de cause à effet (tradition orientale)', subtitleEn: 'Law of cause and effect (Eastern tradition)',
      color: 'var(--accent-rose)',
      traitsFr: ['Loi d\'action et réaction', 'Neutre (ni punition ni récompense)', 'S\'accumule sur plusieurs vies', 'Libérable par la conscience', 'Tradition hindoue, bouddhiste, jaïne'],
      traitsEn: ['Law of action and reaction', 'Neutral (neither punishment nor reward)', 'Accumulates over multiple lives', 'Releasable through consciousness', 'Hindu, Buddhist, Jain tradition'],
      definitionFr: "En sanskrit, karma signifie 'action'. Loi de causalité morale : toute action intentionnelle produit des conséquences. Dans l'hinduisme et le bouddhisme, s'accumule sur plusieurs existences.",
      definitionEn: "In Sanskrit, karma means 'action'. Law of moral causality: every intentional action produces consequences. In Hinduism and Buddhism, it accumulates over multiple existences.",
      originFr: 'Vedas (~1500 av. J.-C.), Bouddhisme (~500 av. J.-C.)',
      originEn: 'Vedas (~1500 BCE), Buddhism (~500 BCE)',
    },
    conceptB: {
      nameFr: 'Destin', nameEn: 'Fate / Destiny',
      subtitleFr: 'Trajectoire préétablie', subtitleEn: 'Pre-established trajectory',
      color: 'var(--accent-blue)',
      traitsFr: ['Fixé à l\'avance (parfois)', 'Inévitable ou inflexible (selon les versions)', 'Dieux, Moirai, Providence…', 'Présent dans traditions abrahamiques et grecques', 'Peut impliquer prédestination'],
      traitsEn: ['Fixed in advance (sometimes)', 'Inevitable or inflexible (in some versions)', 'Gods, Moirai, Providence…', 'Present in Abrahamic and Greek traditions', 'May imply predestination'],
      definitionFr: "Idée qu'une trajectoire de vie est prédéterminée par une force extérieure (dieux, Providence, fatalité). Varie des Moires grecques à la prédestination calviniste en passant par le mektoub islamique.",
      definitionEn: "Idea that a life trajectory is predetermined by an external force (gods, Providence, fate). Ranges from Greek Moirai to Calvinist predestination to Islamic mektoub.",
      originFr: 'Mythologie grecque, abrahamisme, traditions nordiques',
      originEn: 'Greek mythology, Abrahamism, Norse traditions',
    },
    commonFr: ['Idée que les actions ont des conséquences', 'Dimension morale de l\'existence', 'Rapport entre passé et futur', 'Cadres de compréhension du malheur'],
    commonEn: ['Idea that actions have consequences', 'Moral dimension of existence', 'Relationship between past and future', 'Frameworks for understanding misfortune'],
    differenceFr: "Le karma est une loi naturelle et neutre, comparable à la physique (action/réaction) — non punitive et modifiable. Le destin implique souvent une volonté externe qui prédétermine. Le karma accentue la responsabilité personnelle ; le destin peut l'atténuer.",
    differenceEn: "Karma is a natural and neutral law, comparable to physics (action/reaction) — non-punitive and modifiable. Fate often implies an external will that predetermines. Karma emphasizes personal responsibility; fate can diminish it.",
    synthesisFr: "Certaines traditions combinant les deux (hinduisme, par exemple) parlent de dharma (devoir/nature profonde) et de karma dans un système où le destin-cadre existe, mais où la liberté d'action reste réelle.",
    synthesisEn: "Some traditions combining both (Hinduism, for example) speak of dharma (duty/deep nature) and karma in a system where a frame-destiny exists, but where freedom of action remains real.",
    confusionFr: "En Occident, 'karma' est souvent utilisé pour signifier 'tu l'as mérité' — ce qui est une distorsion : le karma n'est pas une punition ni une récompense, c'est une loi de continuité causale.",
    confusionEn: "In the West, 'karma' is often used to mean 'you deserved it' — which is a distortion: karma is not punishment or reward, it's a law of causal continuity.",
    readMore: [
      { href: '/conscience', labelFr: 'Conscience & Éveil', labelEn: 'Consciousness & Awakening' },
      { href: '/cosmologie', labelFr: 'Cosmologie Sacrée', labelEn: 'Sacred Cosmology' },
    ],
  },
];

/* ─────────────────────────────────────────────
   COMPARISON CARD
───────────────────────────────────────────── */
function ComparisonCard({ comp, lang, isDark, isOpen, onToggle }: {
  comp: Comparison; lang: 'fr' | 'en'; isDark: boolean; isOpen: boolean; onToggle: () => void;
}) {
  return (
    <motion.div layout className="rounded-2xl overflow-hidden"
      style={{ border: `1px solid var(--border-subtle)`, backgroundColor: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.9)' }}>

      {/* Card header — always visible */}
      <button onClick={onToggle} className="w-full text-left p-5 transition-all hover:opacity-90">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <span className="text-[10px] uppercase tracking-[0.2em] block mb-1.5"
              style={{ color: 'var(--muted-foreground)', fontWeight: 500 }}>
              {lang === 'fr' ? comp.categoryFr : comp.categoryEn}
            </span>
            <div className="flex items-center gap-3 mb-2 flex-wrap">
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.05rem', color: comp.conceptA.color, fontWeight: 600 }}>
                {lang === 'fr' ? comp.conceptA.nameFr : comp.conceptA.nameEn}
              </span>
              <Scale className="w-4 h-4" style={{ color: 'var(--muted-foreground)' }} />
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.05rem', color: comp.conceptB.color, fontWeight: 600 }}>
                {lang === 'fr' ? comp.conceptB.nameFr : comp.conceptB.nameEn}
              </span>
            </div>
            <p className="text-xs italic" style={{ color: 'var(--muted-foreground)' }}>
              {lang === 'fr' ? comp.taglineFr : comp.taglineEn}
            </p>
          </div>
          <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.25 }}>
            <ChevronDown className="w-4 h-4 flex-shrink-0" style={{ color: 'var(--muted-foreground)' }} />
          </motion.div>
        </div>

        {/* Mini preview bars */}
        {!isOpen && (
          <div className="flex gap-2 mt-3">
            <div className="flex-1 h-1 rounded-full" style={{ background: `linear-gradient(90deg, ${comp.conceptA.color}, ${comp.conceptA.color}55)` }} />
            <div className="flex-1 h-1 rounded-full" style={{ background: `linear-gradient(90deg, ${comp.conceptB.color}55, ${comp.conceptB.color})` }} />
          </div>
        )}
      </button>

      {/* Expanded content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-6 space-y-5">
              <div className="h-px" style={{ backgroundColor: 'var(--border-subtle)' }} />

              {/* Side-by-side concepts */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[comp.conceptA, comp.conceptB].map((concept, ci) => (
                  <div key={ci} className="rounded-xl p-4"
                    style={{ backgroundColor: `color-mix(in srgb, ${concept.color} 6%, transparent)`, border: `1px solid color-mix(in srgb, ${concept.color} 18%, transparent)` }}>
                    <div className="h-[2px] rounded-full mb-3" style={{ background: `linear-gradient(90deg, ${concept.color}, transparent)` }} />
                    <h4 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.15rem', color: concept.color, marginBottom: '0.25rem' }}>
                      {lang === 'fr' ? concept.nameFr : concept.nameEn}
                    </h4>
                    <p className="text-[11px] mb-2" style={{ color: 'var(--muted-foreground)', fontStyle: 'italic' }}>
                      {lang === 'fr' ? concept.subtitleFr : concept.subtitleEn}
                    </p>
                    <p className="text-xs mb-3" style={{ color: 'var(--muted-foreground)', lineHeight: 1.7 }}>
                      {lang === 'fr' ? concept.definitionFr : concept.definitionEn}
                    </p>
                    {concept.originFr && (
                      <p className="text-[10px] mb-2" style={{ color: concept.color }}>
                        ✦ {lang === 'fr' ? concept.originFr : concept.originEn}
                      </p>
                    )}
                    <ul className="space-y-1">
                      {(lang === 'fr' ? concept.traitsFr : concept.traitsEn).map((trait, i) => (
                        <li key={i} className="text-xs flex items-start gap-1.5">
                          <span style={{ color: concept.color, marginTop: '0.15rem' }}>→</span>
                          <span style={{ color: 'var(--muted-foreground)' }}>{trait}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* In common */}
              <div className="rounded-xl p-4" style={{ backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(240,238,252,0.5)', border: '1px solid var(--border-subtle)' }}>
                <p className="text-[10px] uppercase tracking-[0.15em] mb-2.5" style={{ color: 'var(--muted-foreground)', fontWeight: 600 }}>
                  {lang === 'fr' ? 'Points communs' : 'In common'}
                </p>
                <div className="flex flex-wrap gap-2">
                  {(lang === 'fr' ? comp.commonFr : comp.commonEn).map((c, i) => (
                    <span key={i} className="text-[11px] px-2.5 py-1 rounded-full"
                      style={{ backgroundColor: 'var(--muted)', color: 'var(--muted-foreground)', border: '1px solid var(--border-subtle)' }}>
                      ∩ {c}
                    </span>
                  ))}
                </div>
              </div>

              {/* Key difference */}
              <div>
                <p className="text-[10px] uppercase tracking-[0.15em] mb-2" style={{ color: 'var(--accent-blue)', fontWeight: 600 }}>
                  {lang === 'fr' ? 'Différence essentielle' : 'Key difference'}
                </p>
                <p className="text-sm" style={{ color: 'var(--muted-foreground)', lineHeight: 1.8 }}>
                  {lang === 'fr' ? comp.differenceFr : comp.differenceEn}
                </p>
              </div>

              {/* Synthesis */}
              <div className="rounded-xl p-4" style={{ backgroundColor: 'color-mix(in srgb, var(--accent-purple) 5%, transparent)', border: '1px solid color-mix(in srgb, var(--accent-purple) 12%, transparent)' }}>
                <p className="text-[10px] uppercase tracking-[0.15em] mb-2" style={{ color: 'var(--accent-purple)', fontWeight: 600 }}>
                  <Sparkles className="w-3 h-3 inline mr-1" />
                  {lang === 'fr' ? 'Synthèse' : 'Synthesis'}
                </p>
                <p className="text-sm" style={{ color: 'var(--muted-foreground)', lineHeight: 1.8, fontStyle: 'italic' }}>
                  {lang === 'fr' ? comp.synthesisFr : comp.synthesisEn}
                </p>
              </div>

              {/* Confusion note */}
              <div className="rounded-xl p-4" style={{ backgroundColor: 'color-mix(in srgb, var(--accent-rose) 5%, transparent)', border: '1px solid color-mix(in srgb, var(--accent-rose) 15%, transparent)' }}>
                <p className="text-[10px] uppercase tracking-[0.15em] mb-1.5" style={{ color: 'var(--accent-rose)', fontWeight: 600 }}>
                  ⚠ {lang === 'fr' ? 'Pourquoi cette confusion ?' : 'Why this confusion?'}
                </p>
                <p className="text-xs" style={{ color: 'var(--muted-foreground)', lineHeight: 1.75 }}>
                  {lang === 'fr' ? comp.confusionFr : comp.confusionEn}
                </p>
              </div>

              {/* Read more */}
              {comp.readMore.length > 0 && (
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="text-[10px] uppercase tracking-[0.15em]" style={{ color: 'var(--muted-foreground)', fontWeight: 500 }}>
                    <BookOpen className="w-3 h-3 inline mr-1" />
                    {lang === 'fr' ? 'Approfondir :' : 'Explore further:'}
                  </span>
                  {comp.readMore.map((r) => (
                    <Link key={r.href} to={r.href}
                      className="inline-flex items-center gap-1 text-xs transition-opacity hover:opacity-80"
                      style={{ color: 'var(--accent-blue)', fontWeight: 500 }}>
                      {lang === 'fr' ? r.labelFr : r.labelEn} <ArrowRight className="w-3 h-3" />
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   PAGE
───────────────────────────────────────────── */
export function ComparePage() {
  const { t, lang } = useLang();
  const { isDark } = useTheme();
  const [openId, setOpenId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const categories = [...new Set(COMPARISONS.map((c) => lang === 'fr' ? c.categoryFr : c.categoryEn))];
  const filtered = activeCategory
    ? COMPARISONS.filter((c) => (lang === 'fr' ? c.categoryFr : c.categoryEn) === activeCategory)
    : COMPARISONS;

  return (
    <div className="pt-16 pb-16 px-4 lg:px-8">
      <div className="max-w-[1000px] mx-auto">

        {/* ── Header ── */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
          className="pt-10 mb-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="inline-flex p-2.5 rounded-xl" style={{ backgroundColor: 'var(--surface-teal)' }}>
              <Scale className="w-5 h-5" style={{ color: 'var(--accent-teal)' }} />
            </div>
            <span className="text-xs uppercase tracking-[0.3em]" style={{ color: 'var(--accent-teal)', fontWeight: 500 }}>
              {t('Fiches comparatives', 'Comparative fiches')}
            </span>
          </div>
          <h1 className="mb-2" style={{ fontSize: 'clamp(2rem, 3.5vw, 3.2rem)', lineHeight: 1.1 }}>
            {t('Comparer pour', 'Compare to')} <span style={{ color: 'var(--accent-teal)' }}>{t('Mieux Comprendre', 'Better Understand')}</span>
          </h1>
          <p className="max-w-xl text-sm" style={{ color: 'var(--muted-foreground)', lineHeight: 1.85 }}>
            {t(
              "Des notions proches, souvent confondues. Chaque comparaison éclaire les deux concepts mieux qu'une définition isolée.",
              "Similar notions, often confused. Each comparison illuminates both concepts better than an isolated definition."
            )}
          </p>
        </motion.div>

        {/* ── Category filter ── */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button onClick={() => setActiveCategory(null)}
            className="text-xs px-3.5 py-1.5 rounded-full transition-all"
            style={{ backgroundColor: !activeCategory ? 'var(--accent-teal)' : 'transparent', color: !activeCategory ? '#fff' : 'var(--muted-foreground)', border: `1px solid ${!activeCategory ? 'var(--accent-teal)' : 'var(--border-subtle)'}` }}>
            {t('Tous', 'All')} ({COMPARISONS.length})
          </button>
          {categories.map((cat) => (
            <button key={cat} onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
              className="text-xs px-3.5 py-1.5 rounded-full transition-all"
              style={{ backgroundColor: activeCategory === cat ? 'var(--surface-teal)' : 'transparent', color: activeCategory === cat ? 'var(--accent-teal)' : 'var(--muted-foreground)', border: `1px solid ${activeCategory === cat ? 'var(--accent-teal)' : 'var(--border-subtle)'}` }}>
              {cat}
            </button>
          ))}
        </div>

        {/* ── Comparison list ── */}
        <div className="space-y-3">
          {filtered.map((comp) => (
            <ComparisonCard key={comp.id} comp={comp} lang={lang} isDark={isDark}
              isOpen={openId === comp.id}
              onToggle={() => setOpenId(openId === comp.id ? null : comp.id)} />
          ))}
        </div>

        <SectionDivider color="var(--accent-teal)" symbol="diamond" />

        {/* Bottom CTA */}
        <div className="text-center py-6">
          <p className="text-sm mb-4" style={{ color: 'var(--muted-foreground)' }}>
            {t(
              "Vous cherchez d'autres clarifications ? Explorez le lexique ou posez vos questions dans la section dédiée.",
              "Looking for more clarifications? Explore the lexicon or ask your questions in the dedicated section."
            )}
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <Link to="/lexicon" className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-opacity hover:opacity-80"
              style={{ backgroundColor: 'var(--surface-blue)', color: 'var(--accent-blue)', border: '1px solid var(--border-subtle)' }}>
              <BookOpen className="w-3.5 h-3.5" />
              {t('Lexique complet', 'Full Lexicon')}
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link to="/questions" className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-opacity hover:opacity-80"
              style={{ backgroundColor: 'var(--muted)', color: 'var(--muted-foreground)', border: '1px solid var(--border-subtle)' }}>
              {t('Questions fréquentes', 'Common questions')}
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
