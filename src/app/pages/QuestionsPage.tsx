import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, ChevronDown, ArrowRight, BookOpen, AlertTriangle, Lightbulb, Compass, Search } from 'lucide-react';
import { Link } from 'react-router';
import { useLang } from '../components/LanguageContext';
import { useTheme } from '../components/ThemeContext';
import { SectionDivider } from '../components/SectionDivider';

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
type QuestionCategory = 'decouverte' | 'nuance' | 'pratique' | 'philosophique' | 'methodologie';

interface Question {
  id: string;
  questionFr: string;
  questionEn: string;
  category: QuestionCategory;
  answerFr: string;
  answerEn: string;
  nuanceFr?: string;
  nuanceEn?: string;
  relatedLinks?: { href: string; labelFr: string; labelEn: string }[];
  level: 'debutant' | 'intermediaire' | 'avance';
}

const QUESTIONS: Question[] = [
  // DÉCOUVERTE
  {
    id: 'q-esoterisme-definition',
    questionFr: "Qu'est-ce que l'ésotérisme, exactement ?",
    questionEn: "What exactly is esotericism?",
    category: 'decouverte',
    level: 'debutant',
    answerFr: "Le terme 'ésotérisme' vient du grec 'esôterikos' — 'intérieur'. Historiquement, il désignait des enseignements réservés aux initiés, par opposition à l'exotérisme (enseignements publics). Aujourd'hui, il désigne un ensemble de traditions intellectuelles et spirituelles caractérisées par : la croyance en une réalité cachée derrière les apparences, une transmission initiatique, des correspondances symboliques entre les niveaux de réalité, et la voie de transformation personnelle.\n\nL'ésotérisme occidental regroupe notamment l'hermétisme, la kabbale, l'alchimie, la gnose, le néoplatonisme, la théosophie et le rosicrucianisme. Les traditions orientales (yoga, tantrisme, taoïsme ésotérique) ont leur propre logique.",
    answerEn: "The term 'esotericism' comes from Greek 'esôterikos' — 'inner'. Historically, it referred to teachings reserved for initiates, as opposed to exotericism (public teachings). Today, it refers to a set of intellectual and spiritual traditions characterized by: belief in a hidden reality behind appearances, initiatory transmission, symbolic correspondences between levels of reality, and the path of personal transformation.\n\nWestern esotericism includes Hermeticism, Kabbalah, alchemy, Gnosis, Neoplatonism, Theosophy, and Rosicrucianism. Eastern traditions (yoga, Tantrism, esoteric Taoism) have their own logic.",
    nuanceFr: "Il est important de ne pas confondre 'ésotérisme' avec 'occultisme', 'New Age' ou 'superstition'. L'ésotérisme au sens académique (Antoine Faivre, Wouter Hanegraaff) est un objet d'étude historique sérieux enseigné dans plusieurs universités européennes.",
    nuanceEn: "It's important not to confuse 'esotericism' with 'occultism', 'New Age', or 'superstition'. Esotericism in the academic sense (Antoine Faivre, Wouter Hanegraaff) is a serious historical field of study taught in several European universities.",
    relatedLinks: [
      { href: '/alchemy', labelFr: 'Alchimie', labelEn: 'Alchemy' },
      { href: '/symbolism', labelFr: 'Symbolisme', labelEn: 'Symbolism' },
    ],
  },
  {
    id: 'q-par-ou-commencer',
    questionFr: "Par où commencer pour explorer ces sujets ?",
    questionEn: "Where to start exploring these subjects?",
    category: 'decouverte',
    level: 'debutant',
    answerFr: "Il n'y a pas de voie unique. Cela dépend de ce qui vous attire. Quelques pistes selon votre intérêt de départ :\n\n• Vous aimez les symboles et les mythes → Symbolisme, Lexique\n• Vous vous intéressez à la conscience et la méditation → Conscience & Éveil\n• Les traditions historiques vous fascinent → Alchimie, Atlas, Chronologie\n• Vous cherchez une perspective scientifique → lisez d'abord les travaux académiques (Faivre, Hanegraaff)\n• Les pratiques concrètes vous intéressent → Parcours de lecture\n\nLuminous est conçu pour être exploré non-linéairement. Chaque page renvoie à d'autres.",
    answerEn: "There is no single path. It depends on what attracts you. Some leads based on your starting interest:\n\n• You like symbols and myths → Symbolism, Lexicon\n• You're interested in consciousness and meditation → Consciousness & Awakening\n• Historical traditions fascinate you → Alchemy, Atlas, Timeline\n• You seek a scientific perspective → first read academic works (Faivre, Hanegraaff)\n• Concrete practices interest you → Reading Paths\n\nLuminous is designed to be explored non-linearly. Each page links to others.",
    relatedLinks: [
      { href: '/parcours', labelFr: 'Parcours de lecture', labelEn: 'Reading paths' },
      { href: '/lexicon', labelFr: 'Lexique', labelEn: 'Lexicon' },
    ],
  },
  {
    id: 'q-spiritualite-religion',
    questionFr: "Quelle est la différence entre spiritualité et religion ?",
    questionEn: "What is the difference between spirituality and religion?",
    category: 'decouverte',
    level: 'debutant',
    answerFr: "La distinction est utile mais imparfaite. Grossièrement : la religion est une institution avec des dogmes, des rites et une communauté. La spiritualité est une expérience individuelle de connexion avec quelque chose de plus grand que soi — qui peut exister en dehors d'une institution.\n\nLes traditions ésotériques se situent souvent à l'intersection : elles ont des structures (initiations, écoles), mais mettent l'accent sur l'expérience directe plutôt que sur la foi institutionnelle.",
    answerEn: "The distinction is useful but imperfect. Broadly: religion is an institution with dogmas, rites, and a community. Spirituality is an individual experience of connection with something greater than oneself — which can exist outside of an institution.\n\nEsoteric traditions often sit at the intersection: they have structures (initiations, schools) but emphasize direct experience rather than institutional faith.",
    nuanceFr: "Cette distinction est souvent utilisée pour valoriser la spiritualité contre la religion. Cependant, de nombreux théologiens et historiens soulignent que 'spiritualité sans religion' est un concept récent (XXe siècle) et culturellement situé.",
    nuanceEn: "This distinction is often used to valorize spirituality over religion. However, many theologians and historians point out that 'spirituality without religion' is a recent (20th century) and culturally situated concept.",
  },

  // NUANCE
  {
    id: 'q-chakras-reels',
    questionFr: "Les chakras sont-ils réels ? Ont-ils une base scientifique ?",
    questionEn: "Are chakras real? Do they have a scientific basis?",
    category: 'nuance',
    level: 'intermediaire',
    answerFr: "La question dépend de ce qu'on entend par 'réel'. Les chakras sont des concepts issus du yoga tantrique indien (textes anciens comme le Sat-Chakra-Nirupana, XVIe siècle). Ce sont des modèles cartographiques de l'expérience intérieure — comme une boussole pour l'expérience méditative.\n\nDu point de vue de la biologie : les chakras ne correspondent pas à des structures anatomiques identifiées (il n'existe pas de 'roue d'énergie' dans le corps). Il n'existe pas d'études scientifiques démontrant leur existence physique.\n\nCela ne signifie pas qu'ils sont 'faux' : ils peuvent être utiles comme cadre de référence pour des pratiques corps-esprit, sans prétendre à une réalité biologique.",
    answerEn: "The question depends on what we mean by 'real'. Chakras are concepts from Indian Tantric yoga (ancient texts like the Sat-Chakra-Nirupana, 16th century). They are cartographic models of inner experience — like a compass for meditative experience.\n\nFrom a biology standpoint: chakras don't correspond to identified anatomical structures (there is no 'energy wheel' in the body). There are no scientific studies demonstrating their physical existence.\n\nThis doesn't mean they are 'false': they can be useful as a reference framework for body-mind practices, without claiming biological reality.",
    nuanceFr: "Présenter les chakras comme des faits biologiques démontres est inexact. Les présenter comme 'pure invention' efface leur rôle dans des traditions millénaires. La position intellectuellement honnête est : 'modèle traditionnel éprouvé par l'expérience, non vérifié scientifiquement'.",
    nuanceEn: "Presenting chakras as proven biological facts is inaccurate. Presenting them as 'pure invention' erases their role in millennial traditions. The intellectually honest position is: 'traditional model tested through experience, not scientifically verified'.",
    relatedLinks: [
      { href: '/conscience', labelFr: 'Conscience & Éveil', labelEn: 'Consciousness & Awakening' },
      { href: '/comparer', labelFr: 'Chakra vs Aura', labelEn: 'Chakra vs Aura' },
    ],
  },
  {
    id: 'q-vie-apres-mort',
    questionFr: "Y a-t-il des preuves de vie après la mort ?",
    questionEn: "Is there evidence of life after death?",
    category: 'nuance',
    level: 'intermediaire',
    answerFr: "C'est l'une des questions les plus fondamentales et les moins résolues de l'existence humaine. État de la question :\n\n• Témoignages d'EMI (Expériences de Mort Imminente) : documentés par des médecins (Pim van Lommel, Sam Parnia). Interprétations divergent entre 'hallucinations cérébrales' et 'conscience hors du corps'.\n• Régressions en vies antérieures (Ian Stevenson, Jim Tucker) : données intrigantes mais contestées.\n• Traditions de toutes les cultures : unanimes sur une forme de continuité, mais avec des visions très différentes.\n• Neurologie : la conscience semble inextricablement liée au cerveau — sans evidence positive de continuité.\n\nLuminous maintient une position claire : ni affirmation ni négation — mais présentation rigoureuse de l'état des connaissances.",
    answerEn: "It's one of the most fundamental and least resolved questions of human existence. State of the question:\n\n• NDE testimonies (Near Death Experiences): documented by physicians (Pim van Lommel, Sam Parnia). Interpretations diverge between 'brain hallucinations' and 'consciousness outside the body'.\n• Past-life regressions (Ian Stevenson, Jim Tucker): intriguing but contested data.\n• Traditions from all cultures: unanimous on some form of continuity, but with very different visions.\n• Neurology: consciousness seems inextricably linked to the brain — without positive evidence of continuity.\n\nLuminous maintains a clear position: neither affirmation nor negation — but rigorous presentation of the state of knowledge.",
    nuanceFr: "Les EMI sont réelles en tant qu'expériences — mais leur interprétation est débattue. Dire 'les EMI prouvent la vie après la mort' est une surinterprétation. Dire 'les EMI ne prouvent rien' ignore des données cliniques sérieuses.",
    nuanceEn: "NDEs are real as experiences — but their interpretation is debated. Saying 'NDEs prove life after death' is an over-interpretation. Saying 'NDEs prove nothing' ignores serious clinical data.",
    relatedLinks: [
      { href: '/cosmologie', labelFr: 'Cosmologie Sacrée', labelEn: 'Sacred Cosmology' },
      { href: '/sources', labelFr: 'Bibliothèque', labelEn: 'Library' },
    ],
  },
  {
    id: 'q-alchimie-chimie',
    questionFr: "L'alchimie a-t-elle contribué à la science ?",
    questionEn: "Did alchemy contribute to science?",
    category: 'nuance',
    level: 'intermediaire',
    answerFr: "Oui, de manière significative. Les alchimistes ont développé des techniques qui sont à la base de la chimie moderne : distillation, cristallisation, sublimation, calcination, filtration. Ils ont découvert ou purifié de nombreuses substances (acides minéraux, alcools, sulfate de cuivre).\n\nParacelse (~1493–1541) introduit des remèdes chimiques en médecine. Robert Boyle, Isaac Newton et John Locke ont tous pratiqué l'alchimie. Newton a consacré plus d'écrits à l'alchimie qu'à la physique.\n\nLa distinction 'alchimie = mystique' vs 'chimie = science' est une construction tardive du XIXe siècle. La réalité historique est plus fluide.",
    answerEn: "Yes, significantly. Alchemists developed techniques that are the basis of modern chemistry: distillation, crystallization, sublimation, calcination, filtration. They discovered or purified many substances (mineral acids, alcohols, copper sulfate).\n\nParacelsus (~1493–1541) introduces chemical remedies in medicine. Robert Boyle, Isaac Newton, and John Locke all practiced alchemy. Newton devoted more writings to alchemy than to physics.\n\nThe distinction 'alchemy = mysticism' vs 'chemistry = science' is a late 19th century construction. The historical reality is more fluid.",
    relatedLinks: [
      { href: '/alchemy', labelFr: 'Alchimie', labelEn: 'Alchemy' },
      { href: '/chronologie', labelFr: 'Chronologie', labelEn: 'Timeline' },
    ],
  },

  // PRATIQUE
  {
    id: 'q-comment-mediter',
    questionFr: "Comment commencer la méditation sans expérience ?",
    questionEn: "How to start meditating with no experience?",
    category: 'pratique',
    level: 'debutant',
    answerFr: "La méditation est une compétence qui s'apprend progressivement. Points de départ :\n\n1. Commencez simplement : 5 à 10 minutes par jour suffisent au début\n2. Choisissez un objet d'attention : la respiration est le plus accessible\n3. Acceptez les pensées : elles ne sont pas un échec — les noter et revenir à l'objet d'attention EST la pratique\n4. Régularité > durée : chaque jour 5 minutes vaut mieux que 30 minutes une fois par semaine\n5. Cherchez un cadre : application (Insight Timer), livre (Thich Nhat Hanh), cours (MBSR)\n\nImportant : la méditation n'est pas une technique de relaxation uniquement. C'est un entraînement attentionnel qui peut révéler des contenus psychologiques difficiles. Un accompagnement est recommandé si vous traversez des turbulences émotionnelles.",
    answerEn: "Meditation is a skill that is learned progressively. Starting points:\n\n1. Start simply: 5 to 10 minutes per day is enough at the beginning\n2. Choose an attention object: breath is the most accessible\n3. Accept thoughts: they are not failure — noting them and returning to the attention object IS the practice\n4. Regularity > duration: 5 minutes every day is better than 30 minutes once a week\n5. Seek a framework: app (Insight Timer), book (Thich Nhat Hanh), course (MBSR)\n\nImportant: meditation is not just a relaxation technique. It's an attentional training that can reveal difficult psychological content. Accompaniment is recommended if you're going through emotional turbulence.",
    relatedLinks: [
      { href: '/conscience', labelFr: 'Conscience & Éveil', labelEn: 'Consciousness & Awakening' },
    ],
  },
  {
    id: 'q-geographie-sacree',
    questionFr: "Certains lieux sont-ils vraiment 'sacrés' ou c'est subjectif ?",
    questionEn: "Are some places truly 'sacred' or is it subjective?",
    category: 'pratique',
    level: 'intermediaire',
    answerFr: "La sacralité d'un lieu combine au moins deux dimensions :\n\n• Culturelle/historique : un lieu est sacré parce que des communautés y ont pratiqué des rituels, y ont projeté des croyances, lui ont donné du sens. Stonehenge, Jérusalem, Varanasi — leur sacralité est réelle comme fait culturel.\n• Expérientielle : de nombreuses personnes rapportent des états altérés ou une qualité particulière dans certains lieux (sites mégalithiques, cathédrales, cimes). Ces expériences sont réelles sans que leur cause soit nécessairement surnaturelle.\n• Géomantique/tellurique : certaines traditions (feng shui, géobiologie) affirment l'existence de 'lignes d'énergie'. Les preuves empiriques sont limitées.\n\nLuminous ne tranche pas sur la réalité des énergies tellluriques — mais reconnaît la réalité des expériences subjectives et de la dimension culturelle.",
    answerEn: "The sacredness of a place combines at least two dimensions:\n\n• Cultural/historical: a place is sacred because communities practiced rituals there, projected beliefs, gave it meaning. Stonehenge, Jerusalem, Varanasi — their sacredness is real as a cultural fact.\n• Experiential: many people report altered states or a particular quality in certain places (megalithic sites, cathedrals, summits). These experiences are real without their cause necessarily being supernatural.\n• Geomantic/telluric: some traditions (feng shui, geobiology) assert the existence of 'energy lines'. Empirical evidence is limited.\n\nLuminous doesn't settle the reality of telluric energies — but recognizes the reality of subjective experiences and the cultural dimension.",
  },

  // PHILOSOPHIQUE
  {
    id: 'q-tout-est-un',
    questionFr: "Que veut dire 'tout est Un' dans les traditions ésotériques ?",
    questionEn: "What does 'all is One' mean in esoteric traditions?",
    category: 'philosophique',
    level: 'avance',
    answerFr: "L'affirmation 'tout est Un' (monisme) apparaît dans de nombreuses traditions : Advaita Vedanta ('Atman = Brahman'), néoplatonisme (l'Un de Plotin), kabbale (Ein Sof), soufisme (wahdat al-wujud d'Ibn Arabi), taoïsme (le Tao comme principe premier).\n\nElle peut signifier plusieurs choses :\n• Ontologique : il n'existe qu'une seule substance fondamentale (contre le dualisme)\n• Psychologique : la séparation est illusion (maya dans le vedanta)\n• Cosmologique : tout est interconnecté et participe d'un même principe\n• Mystique : l'expérience d'unité est possible dans certains états de conscience\n\nImportant : affirmer 'tout est Un' n'efface pas la multiplicité — c'est une affirmation sur la nature profonde, pas sur l'apparence.",
    answerEn: "The claim 'all is One' (monism) appears in many traditions: Advaita Vedanta ('Atman = Brahman'), Neoplatonism (Plotinus' One), Kabbalah (Ein Sof), Sufism (Ibn Arabi's wahdat al-wujud), Taoism (the Tao as first principle).\n\nIt can mean several things:\n• Ontological: there is only one fundamental substance (against dualism)\n• Psychological: separation is illusion (maya in Vedanta)\n• Cosmological: everything is interconnected and participates in the same principle\n• Mystical: the experience of unity is possible in certain states of consciousness\n\nImportant: affirming 'all is One' doesn't erase multiplicity — it's a statement about deep nature, not about appearances.",
    nuanceFr: "Cette affirmation ne doit pas être utilisée pour nier la différence ou la souffrance individuelles. 'Tout est Un' n'implique pas 'ta douleur n'existe pas'. Les traditions qui enseignent cette vision maintiennent généralement un cadre éthique fort.",
    nuanceEn: "This claim should not be used to deny individual difference or suffering. 'All is One' does not imply 'your pain doesn't exist'. Traditions that teach this vision generally maintain a strong ethical framework.",
    relatedLinks: [
      { href: '/conscience', labelFr: 'Conscience & Éveil', labelEn: 'Consciousness & Awakening' },
      { href: '/cosmologie', labelFr: 'Cosmologie Sacrée', labelEn: 'Sacred Cosmology' },
    ],
  },

  // MÉTHODOLOGIE
  {
    id: 'q-comment-evaluer',
    questionFr: "Comment évaluer la fiabilité d'une source ésotérique ?",
    questionEn: "How to evaluate the reliability of an esoteric source?",
    category: 'methodologie',
    level: 'avance',
    answerFr: "Quelques questions utiles pour évaluer toute source :\n\n1. Qui est l'auteur, quelle est sa formation ? A-t-il accès aux sources primaires ?\n2. La source est-elle datée ? L'ésotérisme a une histoire — un texte du XVIe siècle et un de 2003 n'ont pas le même statut.\n3. L'auteur distingue-t-il tradition, témoignage et hypothèse ?\n4. Y a-t-il des sources citées et vérifiables ?\n5. Quel est le propos implicite ? Vend-il quelque chose ? Cherche-t-il à convaincre ou à informer ?\n6. Qui sont ses détracteurs et que disent-ils ?\n\nLuminous applique ces critères à tous ses contenus et distingue explicitement : recherche historique, tradition, témoignage, hypothèse et controverse.",
    answerEn: "Some useful questions to evaluate any source:\n\n1. Who is the author, what is their training? Do they have access to primary sources?\n2. Is the source dated? Esotericism has a history — a 16th century text and one from 2003 don't have the same status.\n3. Does the author distinguish between tradition, testimony, and hypothesis?\n4. Are there cited and verifiable sources?\n5. What is the implicit agenda? Are they selling something? Seeking to convince or inform?\n6. Who are their detractors and what do they say?\n\nLuminous applies these criteria to all its content and explicitly distinguishes: historical research, tradition, testimony, hypothesis, and controversy.",
    relatedLinks: [
      { href: '/sources', labelFr: 'Bibliothèque des Sources', labelEn: 'Sources Library' },
    ],
  },
  {
    id: 'q-luminous-position',
    questionFr: "Quelle est la position éditoriale de Luminous ?",
    questionEn: "What is Luminous's editorial position?",
    category: 'methodologie',
    level: 'debutant',
    answerFr: "Luminous n'est ni un site de promotion ésotérique ni un site de debunking. Notre position est celle d'une approche éditoriale rigoureuse :\n\n• Nous distinguons clairement ce qui relève de la recherche historique, de la tradition, du témoignage, de l'hypothèse et de la controverse.\n• Nous ne défendons ni n'invalidons les croyances — nous les contextualisrons.\n• Nous présentons les débats existants plutôt que de trancher.\n• Nous valorisons la nuance contre le sensationnalisme ou le dogmatisme.\n• Nous citons nos sources.\n\nNotre ambition : être une plateforme de référence pour quiconque veut explorer ces traditions avec sérieux et curiosité ouverte.",
    answerEn: "Luminous is neither an esoteric promotion site nor a debunking site. Our position is that of a rigorous editorial approach:\n\n• We clearly distinguish what relates to historical research, tradition, testimony, hypothesis, and controversy.\n• We neither defend nor invalidate beliefs — we contextualize them.\n• We present existing debates rather than settling them.\n• We value nuance over sensationalism or dogmatism.\n• We cite our sources.\n\nOur ambition: to be a reference platform for anyone who wants to explore these traditions with seriousness and open curiosity.",
    relatedLinks: [
      { href: '/about', labelFr: 'À propos', labelEn: 'About' },
      { href: '/sources', labelFr: 'Sources & Méthode', labelEn: 'Sources & Method' },
    ],
  },
];

const CATEGORY_CONFIG: Record<QuestionCategory, { labelFr: string; labelEn: string; color: string; icon: any; descFr: string; descEn: string }> = {
  decouverte: { labelFr: 'Pour débuter', labelEn: 'Getting started', color: 'var(--accent-blue)', icon: Compass, descFr: 'Questions de base pour s\'orienter', descEn: 'Basic questions for orientation' },
  nuance: { labelFr: 'Nuances importantes', labelEn: 'Important nuances', color: 'var(--accent-rose)', icon: AlertTriangle, descFr: 'Clarifications sur des sujets délicats', descEn: 'Clarifications on sensitive subjects' },
  pratique: { labelFr: 'Questions pratiques', labelEn: 'Practical questions', color: 'var(--accent-teal)', icon: Lightbulb, descFr: 'Mise en œuvre concrète', descEn: 'Concrete implementation' },
  philosophique: { labelFr: 'Questions profondes', labelEn: 'Deep questions', color: 'var(--accent-purple)', icon: HelpCircle, descFr: 'Fondements et perspectives', descEn: 'Foundations and perspectives' },
  methodologie: { labelFr: 'Approche & Méthode', labelEn: 'Approach & Method', color: 'var(--accent-gold)', icon: Search, descFr: 'Comment explorer avec rigueur', descEn: 'How to explore with rigor' },
};

function QuestionItem({ q, lang, isDark, isOpen, onToggle }: {
  q: Question; lang: 'fr' | 'en'; isDark: boolean; isOpen: boolean; onToggle: () => void;
}) {
  const cat = CATEGORY_CONFIG[q.category];
  const CatIcon = cat.icon;
  const levelColors = { debutant: 'var(--accent-teal)', intermediaire: 'var(--accent-blue)', avance: 'var(--accent-purple)' };
  const levelLabelsFr = { debutant: 'Débutant', intermediaire: 'Intermédiaire', avance: 'Avancé' };
  const levelLabelsEn = { debutant: 'Beginner', intermediaire: 'Intermediate', avance: 'Advanced' };

  // Format the answer with paragraph breaks
  const formatAnswer = (text: string) => {
    return text.split('\n\n').map((para, i) => (
      <p key={i} className="text-sm mb-3 last:mb-0" style={{ color: 'var(--muted-foreground)', lineHeight: 1.85 }}>
        {para.split('\n').map((line, j) => (
          <span key={j}>
            {line}
            {j < para.split('\n').length - 1 && <br />}
          </span>
        ))}
      </p>
    ));
  };

  return (
    <motion.div
      layout
      className="rounded-2xl overflow-hidden transition-all"
      style={{
        border: `1px solid ${isOpen ? `color-mix(in srgb, ${cat.color} 25%, transparent)` : 'var(--border-subtle)'}`,
        backgroundColor: isOpen
          ? isDark ? `color-mix(in srgb, ${cat.color} 5%, rgba(12,10,22,0.9))` : `color-mix(in srgb, ${cat.color} 3%, rgba(252,250,255,0.95))`
          : isDark ? 'rgba(255,255,255,0.025)' : 'rgba(255,255,255,0.85)',
        boxShadow: isOpen ? `0 4px 20px color-mix(in srgb, ${cat.color} 10%, transparent)` : 'none',
      }}
    >
      <button
        onClick={onToggle}
        className="w-full text-left px-5 py-4 flex items-start gap-3 transition-opacity hover:opacity-90"
      >
        <CatIcon className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: cat.color }} />
        <div className="flex-1">
          <p style={{ fontSize: '0.95rem', color: 'var(--foreground)', lineHeight: 1.35, fontFamily: "'Cormorant Garamond', serif" }}>
            {lang === 'fr' ? q.questionFr : q.questionEn}
          </p>
          <div className="flex items-center gap-2 mt-1.5">
            <span className="text-[9px] uppercase tracking-[0.12em] px-2 py-0.5 rounded-full"
              style={{ backgroundColor: `color-mix(in srgb, ${levelColors[q.level]} 10%, transparent)`, color: levelColors[q.level] }}>
              {lang === 'fr' ? levelLabelsFr[q.level] : levelLabelsEn[q.level]}
            </span>
          </div>
        </div>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.22 }} className="flex-shrink-0 mt-0.5">
          <ChevronDown className="w-4 h-4" style={{ color: 'var(--muted-foreground)' }} />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 pt-1 space-y-4">
              <div className="h-px" style={{ backgroundColor: `color-mix(in srgb, ${cat.color} 15%, transparent)` }} />
              <div>{formatAnswer(lang === 'fr' ? q.answerFr : q.answerEn)}</div>

              {/* Nuance */}
              {(lang === 'fr' ? q.nuanceFr : q.nuanceEn) && (
                <div className="rounded-xl p-3.5" style={{ backgroundColor: 'color-mix(in srgb, var(--accent-rose) 5%, transparent)', border: '1px solid color-mix(in srgb, var(--accent-rose) 12%, transparent)' }}>
                  <p className="text-[10px] uppercase tracking-[0.15em] mb-1.5" style={{ color: 'var(--accent-rose)', fontWeight: 600 }}>
                    <AlertTriangle className="w-3 h-3 inline mr-1" />
                    {lang === 'fr' ? 'Nuance importante' : 'Important nuance'}
                  </p>
                  <p className="text-xs" style={{ color: 'var(--muted-foreground)', lineHeight: 1.75, fontStyle: 'italic' }}>
                    {lang === 'fr' ? q.nuanceFr : q.nuanceEn}
                  </p>
                </div>
              )}

              {/* Related links */}
              {q.relatedLinks && q.relatedLinks.length > 0 && (
                <div className="flex items-center gap-3 flex-wrap pt-1">
                  <span className="text-[10px] uppercase tracking-[0.12em]" style={{ color: 'var(--muted-foreground)', fontWeight: 500 }}>
                    {lang === 'fr' ? 'Approfondir :' : 'Explore further:'}
                  </span>
                  {q.relatedLinks.map((r) => (
                    <Link key={r.href} to={r.href}
                      className="inline-flex items-center gap-1 text-xs transition-opacity hover:opacity-80"
                      style={{ color: cat.color, fontWeight: 500 }}>
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
export function QuestionsPage() {
  const { t, lang } = useLang();
  const { isDark } = useTheme();
  const [openId, setOpenId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<QuestionCategory | null>(null);

  const filtered = activeCategory ? QUESTIONS.filter((q) => q.category === activeCategory) : QUESTIONS;

  return (
    <div className="pt-16 pb-16 px-4 lg:px-8">
      <div className="max-w-[900px] mx-auto">

        {/* ── Header ── */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
          className="pt-10 mb-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="inline-flex p-2.5 rounded-xl" style={{ backgroundColor: 'var(--surface-rose)' }}>
              <HelpCircle className="w-5 h-5" style={{ color: 'var(--accent-rose)' }} />
            </div>
            <span className="text-xs uppercase tracking-[0.3em]" style={{ color: 'var(--accent-rose)', fontWeight: 500 }}>
              {t('Questions & Nuances', 'Questions & Nuances')}
            </span>
          </div>
          <h1 className="mb-2" style={{ fontSize: 'clamp(2rem, 3.5vw, 3.2rem)', lineHeight: 1.1 }}>
            {t('Questions', 'Real')} <span style={{ color: 'var(--accent-rose)' }}>{t('Essentielles', 'Questions')}</span>
          </h1>
          <p className="max-w-xl text-sm" style={{ color: 'var(--muted-foreground)', lineHeight: 1.85 }}>
            {t(
              "Les vraies questions que se posent les visiteurs — répondues avec rigueur, nuance et honnêteté intellectuelle.",
              "The real questions visitors ask — answered with rigor, nuance, and intellectual honesty."
            )}
          </p>
        </motion.div>

        {/* ── Category nav ── */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 mb-8">
          {(Object.entries(CATEGORY_CONFIG) as [QuestionCategory, typeof CATEGORY_CONFIG[QuestionCategory]][]).map(([catId, cat]) => {
            const CatIcon = cat.icon;
            const isActive = activeCategory === catId;
            const count = QUESTIONS.filter((q) => q.category === catId).length;
            return (
              <button key={catId} onClick={() => setActiveCategory(isActive ? null : catId)}
                className="flex flex-col items-center gap-1.5 py-3 px-2 rounded-xl transition-all text-center"
                style={{
                  backgroundColor: isActive ? `color-mix(in srgb, ${cat.color} 12%, transparent)` : isDark ? 'rgba(255,255,255,0.025)' : 'rgba(255,255,255,0.8)',
                  border: `1px solid ${isActive ? cat.color : 'var(--border-subtle)'}`,
                }}>
                <CatIcon className="w-4 h-4" style={{ color: cat.color }} />
                <span className="text-[10px] uppercase tracking-[0.08em]" style={{ color: isActive ? cat.color : 'var(--muted-foreground)', fontWeight: isActive ? 600 : 400, lineHeight: 1.2 }}>
                  {lang === 'fr' ? cat.labelFr : cat.labelEn}
                </span>
                <span className="text-[9px]" style={{ color: 'var(--muted-foreground)' }}>{count} {lang === 'fr' ? 'questions' : 'questions'}</span>
              </button>
            );
          })}
        </div>

        {/* ── Question list ── */}
        <div className="space-y-2.5">
          {filtered.map((q) => (
            <QuestionItem key={q.id} q={q} lang={lang} isDark={isDark}
              isOpen={openId === q.id}
              onToggle={() => setOpenId(openId === q.id ? null : q.id)} />
          ))}
        </div>

        <SectionDivider color="var(--accent-rose)" symbol="star" />

        {/* Bottom */}
        <div className="text-center py-6">
          <p className="text-sm mb-4" style={{ color: 'var(--muted-foreground)' }}>
            {t(
              "Vous avez une question qui n'est pas ici ? Explorez les comparaisons ou consultez la bibliothèque de sources.",
              "Have a question that isn't here? Explore the comparisons or consult the sources library."
            )}
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <Link to="/comparer" className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-opacity hover:opacity-80"
              style={{ backgroundColor: 'var(--surface-teal)', color: 'var(--accent-teal)', border: '1px solid var(--border-subtle)' }}>
              {t('Fiches comparatives', 'Comparative fiches')} <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link to="/sources" className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-opacity hover:opacity-80"
              style={{ backgroundColor: 'var(--muted)', color: 'var(--muted-foreground)', border: '1px solid var(--border-subtle)' }}>
              <BookOpen className="w-3.5 h-3.5" /> {t('Bibliothèque', 'Library')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
