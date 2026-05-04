import { Link } from 'react-router';
import { toast } from 'sonner';
import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lock, CheckCircle2, ChevronDown, ChevronUp, Pencil, Save, RotateCcw, Star, ArrowRight, Sparkles, Eye, EyeOff } from 'lucide-react';
import { useLang } from '../components/LanguageContext';
import { useTheme } from '../components/ThemeContext';
import { AscensionProvider, useAscension } from '../components/AscensionContext';
import { BentoCard } from '../components/BentoCard';
import { MagneticElement } from '../components/FloatingElements';

interface Stage {
  id: string;
  number: number;
  titleFr: string;
  titleEn: string;
  subtitleFr: string;
  subtitleEn: string;
  descFr: string;
  descEn: string;
  principlesFr: string[];
  principlesEn: string[];
  exerciseFr: string;
  exerciseEn: string;
  questionFr: string;
  questionEn: string;
  quoteFr: string;
  quoteEn: string;
  quoteAuthor: string;
  color: string;
  locked: boolean;
}

const STAGES: Stage[] = [
  {
    id: 'eveil',
    number: 1,
    titleFr: "L'Éveil",
    titleEn: 'The Awakening',
    subtitleFr: "Se réveiller à une réalité plus vaste",
    subtitleEn: "Awakening to a broader reality",
    descFr: "Le premier mouvement de l'ascension est le plus fondamental : reconnaître qu'il existe une réalité au-delà de ce que nous croyons voir. Ce n'est pas une idée intellectuelle — c'est une ouverture. Une fissure dans le mur des certitudes.",
    descEn: "The first movement of ascension is the most fundamental: recognizing that there is a reality beyond what we think we see. This is not an intellectual idea — it is an opening. A crack in the wall of certainties.",
    principlesFr: [
      "La plupart de ce que nous appelons 'réalité' est une interprétation habituée",
      "L'éveil commence par une question, pas par une réponse",
      "Toutes les grandes traditions décrivent un 'avant' et un 'après' de cet éveil",
      "La curiosité sincère est le premier outil du chercheur"
    ],
    principlesEn: [
      "Most of what we call 'reality' is a habitual interpretation",
      "Awakening begins with a question, not an answer",
      "All great traditions describe a 'before' and 'after' of this awakening",
      "Sincere curiosity is the seeker's first tool"
    ],
    exerciseFr: "Passez 5 minutes à observer votre propre mental sans intervenir. Ne cherchez pas à le changer, ni à le comprendre. Simplement, observez. Notez ce que vous découvrez sur la nature de votre pensée.",
    exerciseEn: "Spend 5 minutes observing your own mind without intervening. Don't try to change it or understand it. Simply, observe. Note what you discover about the nature of your thinking.",
    questionFr: "Qu'est-ce qui vous a amené ici ? Quel questionnement, quelle insatisfaction, quelle aspiration vous a conduit à explorer ces savoirs ?",
    questionEn: "What brought you here? What questioning, dissatisfaction, or aspiration led you to explore this knowledge?",
    quoteFr: "\"Le début de la sagesse est la découverte que nous ne savons rien.\"",
    quoteEn: "\"The beginning of wisdom is the discovery that we know nothing.\"",
    quoteAuthor: "Socrate",
    color: 'var(--accent-teal)',
    locked: false,
  },
  {
    id: 'observation',
    number: 2,
    titleFr: "L'Observation",
    titleEn: 'The Observation',
    subtitleFr: "Apprendre à voir sans juger",
    subtitleEn: "Learning to see without judging",
    descFr: "La deuxième étape est le développement de la capacité d'observation — de soi, du monde, des émotions, des pensées. Non pour les analyser compulsivement, mais pour les voir telles qu'elles sont. C'est la naissance de la conscience témoin.",
    descEn: "The second stage is developing the capacity for observation — of self, world, emotions, thoughts. Not to compulsively analyze them, but to see them as they are. This is the birth of witness consciousness.",
    principlesFr: [
      "Observer sans identifier — il y a une différence entre 'avoir une émotion' et 'être cette émotion'",
      "La méditation de pleine conscience (mindfulness) est l'outil principal de cette étape",
      "L'observation neutre est documentée en neurosciences comme réduisant l'activation de l'amygdale",
      "Cette conscience témoin est au cœur du Vedanta, du Zen, de la psychologie contemplative"
    ],
    principlesEn: [
      "Observe without identifying — there is a difference between 'having an emotion' and 'being that emotion'",
      "Mindfulness meditation is the main tool of this stage",
      "Neutral observation is documented in neurosciences as reducing amygdala activation",
      "This witness consciousness is at the heart of Vedanta, Zen, contemplative psychology"
    ],
    exerciseFr: "Pendant une journée, chaque fois qu'une émotion forte surgit, nommez-la intérieurement : 'Il y a de la colère', 'Il y a de l'anxiété'. Non pas 'Je suis en colère' mais 'Je remarque de la colère'. Observez ce que ce simple changement de langage produit.",
    exerciseEn: "For one day, every time a strong emotion arises, name it internally: 'There is anger', 'There is anxiety'. Not 'I am angry' but 'I notice anger'. Observe what this simple language shift produces.",
    questionFr: "Qu'avez-vous observé de votre propre fonctionnement mental que vous n'aviez jamais remarqué auparavant ?",
    questionEn: "What have you observed about your own mental functioning that you had never noticed before?",
    quoteFr: "\"Entre le stimulus et la réponse, il y a un espace. Dans cet espace réside notre pouvoir de choisir notre réponse.\"",
    quoteEn: "\"Between stimulus and response there is a space. In that space is our power to choose our response.\"",
    quoteAuthor: "Viktor Frankl",
    color: 'var(--accent-blue)',
    locked: false,
  },
  {
    id: 'clarte',
    number: 3,
    titleFr: "La Clarté",
    titleEn: 'The Clarity',
    subtitleFr: "Comprendre les structures profondes",
    subtitleEn: "Understanding deep structures",
    descFr: "La clarté n'est pas un état mental de certitude — c'est une vision qui perce les couches de conditionnement. Elle émerge lorsque l'observation devient assez stable pour percevoir les structures profondes : les croyances fondatrices, les lois universelles, les patterns répétitifs qui organisent notre expérience. Les grandes traditions — Vedanta, stoïcisme, bouddhisme — s'accordent sur une vérité centrale : ce qui souffre n'est pas la conscience elle-même, mais l'identification avec un personnage.",
    descEn: "Clarity is not a mental state of certainty — it is a vision that pierces through layers of conditioning. It emerges when observation becomes stable enough to perceive deep structures: foundational beliefs, universal laws, and repetitive patterns that organize our experience. Great traditions — Vedanta, Stoicism, Buddhism — agree on a central truth: what suffers is not consciousness itself, but identification with a character.",
    principlesFr: [
      "Les croyances limitantes ne sont pas des vérités — elles sont des conclusions tirées d'expériences passées",
      "Les 7 lois hermétiques (Mentalisme, Correspondance, Vibration, Polarité, Rythme, Cause/Effet, Genre) offrent un cadre universel",
      "La question 'Qui suis-je ?' de Ramana Maharshi est l'un des chemins les plus directs vers la réalisation",
      "Distinguer l'ego (personnage narratif) de la Conscience (témoin pur) est la bascule centrale de cette étape"
    ],
    principlesEn: [
      "Limiting beliefs are not truths — they are conclusions drawn from past experiences",
      "The 7 Hermetic laws (Mentalism, Correspondence, Vibration, Polarity, Rhythm, Cause/Effect, Gender) offer a universal framework",
      "Ramana Maharshi's question 'Who am I?' is one of the most direct paths to realization",
      "Distinguishing the ego (narrative character) from Consciousness (pure witness) is the central pivot of this stage"
    ],
    exerciseFr: "Pratique de l'auto-enquête (Self-Inquiry) : Posez-vous intérieurement la question 'Qui suis-je ?' et au lieu de chercher une réponse conceptuelle, observez ce qui reste quand vous retirez chaque couche — vos pensées (vous n'êtes pas elles), vos émotions, votre corps, votre nom et histoire. Qu'est-ce qui demeure ? Restez dans cette question sans chercher à la résoudre — 10 à 20 minutes.",
    exerciseEn: "Self-Inquiry practice: Ask yourself inwardly 'Who am I?' and instead of seeking a conceptual answer, observe what remains when you remove each layer — your thoughts (you are not them), your emotions, your body, your name and story. What remains? Stay in this question without trying to resolve it — 10 to 20 minutes.",
    questionFr: "Quelle est la différence entre la personne que vous pensez être et la conscience qui observe cette pensée ? Y a-t-il un moment où vous avez perçu cette distinction ?",
    questionEn: "What is the difference between the person you think you are and the awareness that observes this thought? Has there been a moment when you perceived this distinction?",
    quoteFr: "\"La question 'Qui suis-je ?' ne donnera pas de réponse dans l'esprit. Elle dissoudra l'esprit lui-même.\"",
    quoteEn: "\"The question 'Who am I?' will not give an answer in the mind. It will dissolve the mind itself.\"",
    quoteAuthor: "Ramana Maharshi",
    color: 'var(--accent-purple)',
    locked: true,
  },
  {
    id: 'integration',
    number: 4,
    titleFr: "L'Intégration",
    titleEn: 'The Integration',
    subtitleFr: "Unifier les contraires en soi",
    subtitleEn: "Unifying opposites within",
    descFr: "C. G. Jung nommait l'Ombre (Shadow) la partie de nous-mêmes que nous avons rejetée, niée, ou jugée indigne. L'intégration est le processus de récupérer ces aspects bannis — non pour les agir, mais pour les accueillir. Un être qui n'a pas intégré son ombre la projette sur les autres. L'intégration n'est pas un exercice intellectuel : c'est un travail courageux de rencontre avec ce que nous avons le plus résisté en nous-mêmes.",
    descEn: "C. G. Jung named the Shadow the part of ourselves we have rejected, denied, or judged unworthy. Integration is the process of recovering these exiled aspects — not to act them out, but to welcome them. A being who has not integrated their shadow projects it onto others. Integration is not an intellectual exercise: it is courageous work of meeting what we have most resisted in ourselves.",
    principlesFr: [
      "L'Ombre jungienne : tout ce que nous jugeons intensément chez les autres est un signal de ce que nous refoulons en nous",
      "La technique de la 'Chaise vide' (Gestalt) permet un dialogue direct avec les parties refoulées de soi",
      "Les quatre fonctions (pensée, sentiment, sensation, intuition) : l'intégration implique d'honorer nos fonctions inférieures",
      "Le processus d'individuation (Jung) est le voyage vers une totalité authentique, non vers une perfection idéale"
    ],
    principlesEn: [
      "The Jungian Shadow: everything we intensely judge in others is a signal of what we repress in ourselves",
      "The 'Empty Chair' technique (Gestalt) allows direct dialogue with repressed parts of oneself",
      "The four functions (thinking, feeling, sensation, intuition): integration involves honoring our inferior functions",
      "The individuation process (Jung) is the journey toward authentic wholeness, not toward ideal perfection"
    ],
    exerciseFr: "Choisissez une qualité négative que vous jugez fortement chez une personne de votre vie. Écrivez pendant 10 minutes : 'La part de moi qui est [cette qualité] ressemble à…' et laissez émerger sans censure. Puis demandez-vous : quelle blessure cette part protège-t-elle ? Quel besoin non satisfait exprime-t-elle ?",
    exerciseEn: "Choose a negative quality you strongly judge in someone in your life. Write for 10 minutes: 'The part of me that is [this quality] looks like…' and let it emerge without censorship. Then ask yourself: what wound does this part protect? What unmet need does it express?",
    questionFr: "Quelle est la qualité ou l'aspect de vous-même que vous avez le plus longtemps refusé d'accepter ? Que se passerait-il si vous l'accueilliez avec compassion plutôt qu'avec résistance ?",
    questionEn: "What quality or aspect of yourself have you most long refused to accept? What would happen if you welcomed it with compassion rather than resistance?",
    quoteFr: "\"On ne s'éveille pas en imaginant des figures de lumière, mais en rendant l'obscurité consciente.\"",
    quoteEn: "\"One does not become enlightened by imagining figures of light, but by making the darkness conscious.\"",
    quoteAuthor: "Carl Jung",
    color: 'var(--accent-gold)',
    locked: true,
  },
  {
    id: 'expansion',
    number: 5,
    titleFr: "L'Expansion",
    titleEn: 'The Expansion',
    subtitleFr: "Dépasser les limites du moi",
    subtitleEn: "Transcending the limits of the self",
    descFr: "L'expansion est le mouvement naturel qui suit une intégration profonde : les frontières du moi commencent à se dissoudre, non par fuite mais par maturation. Les états de conscience élargis — décrits dans le bouddhisme (samadhi), dans la psychologie transpersonnelle (Grof), dans les récits d'expériences de mort imminente — révèlent que la conscience peut opérer au-delà des limites du corps et de la biographie personnelle.",
    descEn: "Expansion is the natural movement that follows deep integration: the boundaries of the self begin to dissolve, not through flight but through maturation. Expanded states of consciousness — described in Buddhism (samadhi), in transpersonal psychology (Grof), in near-death experience accounts — reveal that consciousness can operate beyond the limits of the body and personal biography.",
    principlesFr: [
      "Les expériences de mort imminente (EMI) sont documentées scientifiquement (Pim van Lommel) comme états de conscience sans substrat cérébral actif",
      "La psychologie transpersonnelle (Grof, Maslow, Wilber) reconnaît les états mystiques comme données légitimes de la recherche",
      "Le voyage astral et les projections hors du corps sont rapportés de façon quasi-universelle dans toutes les cultures",
      "Les expériences de dissolution du moi induites par la méditation profonde produisent des changements mesurables et durables (études Harvard, Oxford)"
    ],
    principlesEn: [
      "Near-death experiences (NDEs) are scientifically documented (Pim van Lommel) as states of consciousness without active brain substrate",
      "Transpersonal psychology (Grof, Maslow, Wilber) recognizes mystical states as legitimate data in consciousness research",
      "Astral travel and out-of-body projections are reported quasi-universally across all cultures",
      "Ego-dissolution experiences induced by deep meditation produce measurable and lasting changes (Harvard, Oxford studies)"
    ],
    exerciseFr: "Méditation de contemplation de la mort (Memento Mori) : Installez-vous confortablement et imaginez avec précision que c'est le dernier jour de votre vie. Pas comme une peur, mais comme une invitation à la vérité. Observez ce qui devient soudainement important. Ce qui ne l'est plus. Ce que vous avez toujours voulu dire ou faire. Notez tout ce qui émerge (20 minutes).",
    exerciseEn: "Death contemplation meditation (Memento Mori): Settle comfortably and precisely imagine this is the last day of your life. Not as fear, but as an invitation to truth. Observe what suddenly becomes important. What no longer is. What you've always wanted to say or do. Note everything that emerges (20 minutes).",
    questionFr: "Si vous étiez certain que la conscience survit à la mort du corps — pas comme croyance, mais comme certitude vécue — comment vivriez-vous différemment à partir de demain ?",
    questionEn: "If you were certain that consciousness survives the death of the body — not as a belief, but as lived certainty — how would you live differently starting tomorrow?",
    quoteFr: "\"L'univers tout entier est en vous. Demandez-lui tout ce que vous voulez.\"",
    quoteEn: "\"The entire universe is within you. Ask all that you want from it.\"",
    quoteAuthor: "Rumi",
    color: 'var(--accent-rose)',
    locked: true,
  },
  {
    id: 'transmission',
    number: 6,
    titleFr: "La Transmission",
    titleEn: 'The Transmission',
    subtitleFr: "Devenir un vecteur de sagesse",
    subtitleEn: "Becoming a vector of wisdom",
    descFr: "La sagesse qui n'est pas transmise reste incomplète. Cette étape explore la dimension relationnelle de l'éveil : comment ce que l'on a traversé se reflète naturellement — non pas comme enseignement imposé, mais comme présence, comme façon d'être, comme qualité d'écoute. Les traditions du monde sont unanimes : l'éveil se vérifie dans le service.",
    descEn: "Wisdom that is not transmitted remains incomplete. This stage explores the relational dimension of awakening: how what one has traversed reflects naturally — not as imposed teaching, but as presence, as way of being, as quality of listening. The world's traditions are unanimous: awakening is verified in service.",
    principlesFr: [
      "Le concept de Bodhisattva (bouddhisme mahayana) : l'être qui retarde son propre nirvana pour aider tous les êtres à s'éveiller",
      "L'enseignement n'est efficace que dans la mesure où l'enseignant a réellement traversé ce qu'il transmet",
      "La qualité de présence — être pleinement là pour l'autre sans agenda — est le facteur thérapeutique principal (psychothérapie)",
      "Les Quatre Accords Toltèques (Don Miguel Ruiz) : parole impeccable, ne pas prendre personnellement, ne pas supposer, toujours faire de son mieux"
    ],
    principlesEn: [
      "The Bodhisattva concept (Mahayana Buddhism): the being who delays their own nirvana to help all beings awaken",
      "Teaching is only effective to the degree that the teacher has genuinely traversed what they transmit",
      "Quality of presence — being fully there for the other without agenda — is the primary therapeutic factor (psychotherapy)",
      "The Four Toltec Agreements (Don Miguel Ruiz): be impeccable with your word, don't take anything personally, don't make assumptions, always do your best"
    ],
    exerciseFr: "Pensez à une personne de votre vie qui traverse une période difficile. Sans lui donner de conseils, sans essayer de 'réparer' quoi que ce soit, offrez-lui simplement 20 minutes de présence totale — en écoutant vraiment, sans préparer votre réponse. Observez ce que cela produit en elle et en vous.",
    exerciseEn: "Think of someone in your life going through a difficult time. Without giving advice, without trying to 'fix' anything, simply offer them 20 minutes of total presence — truly listening, without preparing your response. Observe what this produces in them and in you.",
    questionFr: "Quelle qualité en vous, lorsqu'elle s'exprime pleinement, semble toucher ou aider les autres de façon authentique ? En quoi cette qualité est-elle aussi un chemin de guérison pour vous-même ?",
    questionEn: "What quality in you, when fully expressed, seems to genuinely touch or help others? In what way is this quality also a path of healing for yourself?",
    quoteFr: "\"Soyez le changement que vous voulez voir dans le monde.\"",
    quoteEn: "\"Be the change you wish to see in the world.\"",
    quoteAuthor: "Gandhi",
    color: 'var(--accent-teal)',
    locked: true,
  },
  {
    id: 'union',
    number: 7,
    titleFr: "L'Union",
    titleEn: 'The Union',
    subtitleFr: "La dissolution dans le Tout",
    subtitleEn: "Dissolution into the Whole",
    descFr: "L'Union est le summum de toutes les traditions spirituelles — décrit avec des mots différents mais pointant vers la même expérience : la dissolution de la frontière perçue entre soi et le Tout. Nirvana dans le bouddhisme, Moksha dans le Vedanta, Fanaa dans le soufisme, Unio Mystica dans le christianisme mystique, Ein Sof dans la Kabbale. Ce n'est pas une annihilation — c'est une reconnaissance. Non pas 'je disparais dans le Tout', mais 'je réalise que je n'ai jamais été séparé'.",
    descEn: "Union is the summit of all spiritual traditions — described in different words but pointing to the same experience: the dissolution of the perceived boundary between self and the Whole. Nirvana in Buddhism, Moksha in Vedanta, Fanaa in Sufism, Unio Mystica in mystical Christianity, Ein Sof in Kabbalah. This is not annihilation — it is recognition. Not 'I disappear into the Whole,' but 'I realize I was never separate.'",
    principlesFr: [
      "Advaita Vedanta : Atman est Brahman — le soi individuel est identique au Soi universel ; la séparation est une superposition (maya)",
      "Les mystiques chrétiens (Maître Eckhart, Jean de la Croix) décrivent une union qui dissout sans annuler la personne",
      "Les études sur les méditants avancés (Davidson, Ricard) montrent des corrélats neuraux distincts lors des états non-duaux",
      "La non-dualité n'est pas un concept à comprendre mais une réalité à reconnaître — elle est disponible ici et maintenant"
    ],
    principlesEn: [
      "Advaita Vedanta: Atman is Brahman — the individual self is identical to the universal Self; separation is a superimposition (maya)",
      "Christian mystics (Meister Eckhart, John of the Cross) describe a union that dissolves without annulling the person",
      "Studies on advanced meditators (Davidson, Ricard) show distinct neural correlates during non-dual states",
      "Non-duality is not a concept to understand but a reality to recognize — it is available here and now"
    ],
    exerciseFr: "Méditation de la conscience pure (20 minutes) : Au lieu d'observer les pensées, reposez-vous en tant que conscience elle-même. N'essayez pas de 'faire' quoi que ce soit. Soyez l'espace dans lequel les pensées passent. Quand une pensée surgit, ne l'identifiez pas et ne la repoussez pas — laissez-la se dissoudre d'elle-même. Remarquez : y a-t-il une frontière entre 'vous' et 'la pièce' ?",
    exerciseEn: "Pure consciousness meditation (20 minutes): Instead of observing thoughts, rest as consciousness itself. Don't try to 'do' anything. Be the space in which thoughts pass. When a thought arises, don't identify with it and don't push it away — let it dissolve on its own. Notice: is there a boundary between 'you' and 'the room'?",
    questionFr: "Y a-t-il eu un moment dans votre vie — même bref, même fugace — où la frontière entre vous et le reste du monde s'est dissoute ? En nature, dans l'amour, dans la méditation ? Qu'avez-vous touché là ?",
    questionEn: "Has there been a moment in your life — even brief, even fleeting — when the boundary between you and the rest of the world dissolved? In nature, in love, in meditation? What did you touch there?",
    quoteFr: "\"Atman est Brahman — le soi individuel est identique au soi universel. Comprendre cela n'est pas une idée. C'est la fin de la recherche.\"",
    quoteEn: "\"Atman is Brahman — the individual self is identical to the universal self. Understanding this is not an idea. It is the end of seeking.\"",
    quoteAuthor: "Upanishads",
    color: 'var(--accent-cosmic)',
    locked: true,
  },
];

function StageCard({ stage, isExpanded, onToggle, previewMode }: {
  stage: Stage;
  isExpanded: boolean;
  onToggle: () => void;
  previewMode: boolean;
}) {
  const { t, lang } = useLang();
  const { isDark } = useTheme();
  const { notes, progress, updateNote, completeStage } = useAscension();
  const [editingNote, setEditingNote] = useState(false);
  const [noteText, setNoteText] = useState(notes[stage.id] || '');
  const isCompleted = progress[stage.id];
  const isLocked = stage.locked && !previewMode;

  const handleSaveNote = useCallback(() => {
    updateNote(stage.id, noteText);
    setEditingNote(false);
  }, [stage.id, noteText, updateNote]);

  return (
    <motion.div
      layout
      className="rounded-2xl overflow-hidden"
      style={{
        border: `1px solid ${isExpanded ? stage.color : 'var(--border-subtle)'}`,
        borderOpacity: isExpanded ? 0.3 : 1,
        backgroundColor: isLocked
          ? isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)'
          : isExpanded
          ? isDark ? `color-mix(in srgb, ${stage.color} 6%, transparent)` : `color-mix(in srgb, ${stage.color} 4%, transparent)`
          : 'var(--card)',
        boxShadow: isExpanded && !isLocked ? `0 4px 32px color-mix(in srgb, ${stage.color} 8%, transparent)` : 'var(--card-shadow)',
      }}
    >
      {/* Stage Header */}
      <button
        onClick={isLocked ? undefined : onToggle}
        className="w-full flex items-center gap-4 p-5 text-left transition-all duration-200"
        style={{ cursor: isLocked ? 'default' : 'pointer' }}
      >
        {/* Stage number */}
        <div
          className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300"
          style={{
            backgroundColor: isCompleted
              ? stage.color
              : isLocked
              ? 'var(--muted)'
              : isExpanded
              ? `color-mix(in srgb, ${stage.color} 20%, transparent)`
              : 'var(--muted)',
            border: `1.5px solid ${isCompleted ? stage.color : isLocked ? 'var(--border)' : stage.color}`,
          }}
        >
          {isCompleted ? (
            <CheckCircle2 className="w-5 h-5" style={{ color: '#fff' }} />
          ) : isLocked ? (
            <Lock className="w-4 h-4" style={{ color: 'var(--muted-foreground)', opacity: 0.4 }} />
          ) : (
            <span style={{ color: isExpanded ? stage.color : 'var(--muted-foreground)', fontWeight: 700, fontSize: '0.9rem' }}>
              {stage.number}
            </span>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <span
              className="text-sm"
              style={{
                fontWeight: 600,
                color: isLocked ? 'var(--muted-foreground)' : isExpanded ? stage.color : 'var(--foreground)',
                opacity: isLocked ? 0.5 : 1,
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '1.05rem',
              }}
            >
              {lang === 'fr' ? stage.titleFr : stage.titleEn}
            </span>
            {stage.locked && !previewMode && (
              <span
                className="text-[10px] px-2 py-0.5 rounded-full"
                style={{ backgroundColor: 'var(--surface-gold)', color: 'var(--accent-gold)', fontWeight: 600 }}
              >
                ✦ {t('Premium', 'Premium')}
              </span>
            )}
            {stage.locked && previewMode && (
              <span
                className="text-[10px] px-2 py-0.5 rounded-full"
                style={{ backgroundColor: 'rgba(90,171,106,0.12)', color: '#5aab6a', fontWeight: 600, border: '1px solid rgba(90,171,106,0.25)' }}
              >
                <Eye className="w-2.5 h-2.5 inline mr-0.5" />{t('Prévisualisation', 'Preview')}
              </span>
            )}
          </div>
          <p className="text-xs" style={{ color: 'var(--muted-foreground)', opacity: isLocked ? 0.5 : 0.8 }}>
            {lang === 'fr' ? stage.subtitleFr : stage.subtitleEn}
          </p>
        </div>

        {!isLocked && (
          <div className="flex-shrink-0" style={{ color: 'var(--muted-foreground)', opacity: 0.5 }}>
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </div>
        )}
      </button>

      {/* Stage Content */}
      <AnimatePresence initial={false}>
        {isExpanded && !isLocked && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div className="px-5 pb-6 space-y-6" style={{ borderTop: '1px solid var(--border-subtle)' }}>
              {/* Description */}
              <div className="pt-5">
                <p className="text-sm" style={{ color: 'var(--muted-foreground)', lineHeight: 1.9 }}>
                  {lang === 'fr' ? stage.descFr : stage.descEn}
                </p>
              </div>

              {/* Principles */}
              {stage.principlesFr.length > 0 && (
                <div>
                  <h5 className="mb-3 text-sm" style={{ color: stage.color }}>
                    {t('Principes clés', 'Key Principles')}
                  </h5>
                  <ul className="space-y-2">
                    {(lang === 'fr' ? stage.principlesFr : stage.principlesEn).map((p, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm" style={{ color: 'var(--muted-foreground)', lineHeight: 1.7 }}>
                        <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: stage.color }} />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Exercise */}
              <div
                className="rounded-xl p-4"
                style={{ backgroundColor: `color-mix(in srgb, ${stage.color} 6%, transparent)`, border: `1px solid color-mix(in srgb, ${stage.color} 15%, transparent)` }}
              >
                <p className="text-xs uppercase tracking-[0.15em] mb-2" style={{ color: stage.color, fontWeight: 500 }}>
                  {t('Pratique', 'Practice')}
                </p>
                <p className="text-sm" style={{ color: 'var(--foreground)', lineHeight: 1.8 }}>
                  {lang === 'fr' ? stage.exerciseFr : stage.exerciseEn}
                </p>
              </div>

              {/* Reflection question */}
              <div>
                <p className="text-xs uppercase tracking-[0.15em] mb-3" style={{ color: 'var(--muted-foreground)', fontWeight: 500 }}>
                  {t('Question de réflexion', 'Reflection Question')}
                </p>
                <p
                  className="text-base"
                  style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', lineHeight: 1.7, color: 'var(--foreground)' }}
                >
                  {lang === 'fr' ? stage.questionFr : stage.questionEn}
                </p>
              </div>

              {/* Quote */}
              <div className="py-4" style={{ borderTop: '1px solid var(--border-subtle)' }}>
                <blockquote className="text-sm" style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', lineHeight: 1.7, color: 'var(--muted-foreground)' }}>
                  {lang === 'fr' ? stage.quoteFr : stage.quoteEn}
                </blockquote>
                <p className="text-xs mt-2" style={{ color: stage.color, fontWeight: 500 }}>— {stage.quoteAuthor}</p>
              </div>

              {/* Journal notes */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs uppercase tracking-[0.15em]" style={{ color: 'var(--muted-foreground)', fontWeight: 500 }}>
                    {t('Mes notes personnelles', 'My Personal Notes')}
                  </p>
                  <button
                    onClick={() => {
                      if (editingNote) {
                        handleSaveNote();
                      } else {
                        setNoteText(notes[stage.id] || '');
                        setEditingNote(true);
                      }
                    }}
                    className="flex items-center gap-1.5 text-xs transition-colors px-3 py-1.5 rounded-full"
                    style={{
                      backgroundColor: editingNote ? stage.color : 'var(--muted)',
                      color: editingNote ? '#fff' : 'var(--muted-foreground)',
                    }}
                  >
                    {editingNote ? <Save className="w-3 h-3" /> : <Pencil className="w-3 h-3" />}
                    {editingNote ? t('Sauvegarder', 'Save') : t('Écrire', 'Write')}
                  </button>
                </div>
                {editingNote ? (
                  <textarea
                    value={noteText}
                    onChange={(e) => setNoteText(e.target.value.slice(0, 5000))}
                    className="w-full rounded-xl p-4 text-sm resize-none focus:outline-none transition-all"
                    rows={5}
                    maxLength={5000}
                    placeholder={t("Vos réflexions, intuitions, observations…", "Your reflections, intuitions, observations…")}
                    style={{
                      backgroundColor: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)',
                      border: `1px solid color-mix(in srgb, ${stage.color} 30%, transparent)`,
                      color: 'var(--foreground)',
                    }}
                    autoComplete="off"
                    data-lenis-prevent
                  />
                ) : notes[stage.id] ? (
                  <div
                    className="rounded-xl p-4 text-sm"
                    style={{
                      backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
                      border: '1px solid var(--border-subtle)',
                      color: 'var(--muted-foreground)',
                      lineHeight: 1.8,
                      whiteSpace: 'pre-wrap',
                    }}
                  >
                    {notes[stage.id]}
                  </div>
                ) : (
                  <div
                    className="rounded-xl p-4 text-sm text-center"
                    style={{
                      backgroundColor: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)',
                      border: '1px dashed var(--border)',
                      color: 'var(--muted-foreground)',
                      opacity: 0.5,
                    }}
                  >
                    {t("Aucune note pour l'instant", "No notes yet")}
                  </div>
                )}
              </div>

              {/* Complete button */}
              {!isCompleted && (
                <button
                  onClick={() => completeStage(stage.id)}
                  className="w-full py-3 rounded-xl text-sm transition-all duration-300 hover:opacity-90"
                  style={{ backgroundColor: stage.color, color: '#fff', fontWeight: 500 }}
                >
                  {t("Marquer cette étape comme intégrée", "Mark this stage as integrated")}
                </button>
              )}
              {isCompleted && (
                <div
                  className="flex items-center justify-center gap-2 py-3 rounded-xl text-sm"
                  style={{ backgroundColor: `color-mix(in srgb, ${stage.color} 10%, transparent)`, color: stage.color, border: `1px solid color-mix(in srgb, ${stage.color} 20%, transparent)` }}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  {t("Étape intégrée", "Stage integrated")}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Locked teaser */}
      {isLocked && (
        <div className="px-5 pb-5 pt-2">
          <div className="flex items-center gap-3 text-xs" style={{ color: 'var(--muted-foreground)', opacity: 0.5 }}>
            <div className="h-px flex-1" style={{ backgroundColor: 'var(--border-subtle)' }} />
            <blockquote
              className="text-center py-1 px-3 italic"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.85rem' }}
            >
              {lang === 'fr' ? stage.quoteFr : stage.quoteEn}
              {' '}<span style={{ fontStyle: 'normal', opacity: 0.7 }}>— {stage.quoteAuthor}</span>
            </blockquote>
            <div className="h-px flex-1" style={{ backgroundColor: 'var(--border-subtle)' }} />
          </div>
        </div>
      )}
    </motion.div>
  );
}

function AscensionInner() {
  const { t, lang } = useLang();
  const { isDark } = useTheme();
  const { getCompletedCount, resetProgress } = useAscension();
  const [expandedStage, setExpandedStage] = useState<string>('eveil');
  const [previewMode, setPreviewMode] = useState(false);
  const completedCount = getCompletedCount();
  const freeStages = STAGES.filter((s) => !s.locked);

  return (
    <div className="pt-16 pb-12 px-6 lg:px-12">
      <div className="max-w-[1600px] mx-auto">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16 pt-10 relative"
        >
          {/* Background geometry */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <motion.svg
              className="absolute top-0 right-0 lg:right-20"
              width="300" height="300" viewBox="0 0 300 300" fill="none"
              style={{ opacity: 0.04 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
            >
              {[140, 110, 80, 50, 20].map((r, i) => (
                <circle key={i} cx="150" cy="150" r={r} stroke="var(--accent-gold)" strokeWidth="0.6" fill="none" />
              ))}
              {[0, 60, 120, 180, 240, 300].map((deg) => (
                <line
                  key={deg}
                  x1={150 + 140 * Math.cos((deg * Math.PI) / 180)}
                  y1={150 + 140 * Math.sin((deg * Math.PI) / 180)}
                  x2="150" y2="150"
                  stroke="var(--accent-gold)" strokeWidth="0.3"
                />
              ))}
            </motion.svg>
          </div>

          <div className="flex items-center justify-between gap-3 mb-5 flex-wrap">
            <div className="flex items-center gap-3">
              <MagneticElement intensity={0.15}>
                <motion.div
                  className="inline-flex p-3 rounded-2xl"
                  style={{ backgroundColor: 'var(--surface-gold)' }}
                  whileHover={{ scale: 1.1 }}
                >
                  <Sparkles className="w-6 h-6" style={{ color: 'var(--accent-gold)' }} />
                </motion.div>
              </MagneticElement>
              <div>
                <span className="text-xs uppercase tracking-[0.3em] block" style={{ color: 'var(--accent-gold)', fontWeight: 600 }}>
                  ✦ {t('Expérience Premium', 'Premium Experience')}
                </span>
              </div>
            </div>

            {/* Preview mode toggle */}
            <button
              onClick={() => {
                setPreviewMode(!previewMode);
                toast(
                  previewMode
                    ? t('🔒 Prévisualisation désactivée', '🔒 Preview disabled')
                    : t('👁 Prévisualisation activée', '👁 Preview enabled'),
                  {
                    description: previewMode
                      ? t('Les étapes premium sont de nouveau verrouillées.', 'Premium stages are locked again.')
                      : t('Toutes les étapes sont accessibles pour vérification.', 'All stages are accessible for review.'),
                  }
                );
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-xs transition-all duration-300"
              style={{
                backgroundColor: previewMode ? 'rgba(90,171,106,0.12)' : isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
                border: previewMode ? '1px solid rgba(90,171,106,0.3)' : '1px solid var(--border-subtle)',
                color: previewMode ? '#5aab6a' : 'var(--muted-foreground)',
                fontWeight: 500,
              }}
            >
              {previewMode ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
              {previewMode
                ? t('Prévisualisation active', 'Preview active')
                : t('Mode prévisualisation', 'Preview mode')}
            </button>
          </div>

          {/* Preview banner */}
          <AnimatePresence>
            {previewMode && (
              <motion.div
                initial={{ opacity: 0, y: -8, height: 0 }}
                animate={{ opacity: 1, y: 0, height: 'auto' }}
                exit={{ opacity: 0, y: -8, height: 0 }}
                className="mb-5 px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 overflow-hidden"
                style={{ backgroundColor: 'rgba(90,171,106,0.08)', border: '1px solid rgba(90,171,106,0.2)', color: '#5aab6a' }}
              >
                <Eye className="w-3.5 h-3.5 flex-shrink-0" />
                {t(
                  'Mode prévisualisation actif — toutes les étapes sont déverrouillées pour vérification. Désactivez pour voir la vue utilisateur.',
                  'Preview mode active — all stages are unlocked for review. Disable to see the user view.'
                )}
              </motion.div>
            )}
          </AnimatePresence>

          <h1 className="mb-5" style={{ fontSize: 'clamp(2.5rem, 4.5vw, 4rem)' }}>
            {t('L\'Ascension', 'The Ascension')}
          </h1>
          <p className="max-w-2xl mb-8 text-sm" style={{ color: 'var(--muted-foreground)', lineHeight: 1.9 }}>
            {t(
              "Un parcours guidé, progressif et intelligent vers une conscience plus vaste. Non pas un cours, ni un jeu — une invitation à explorer sérieusement, à votre rythme, les dimensions profondes de l'existence et de la conscience.",
              "A guided, progressive, and intelligent journey toward greater consciousness. Not a course, not a game — an invitation to seriously explore, at your own pace, the deep dimensions of existence and consciousness."
            )}
          </p>

          {/* Progress overview */}
          <div className="flex items-center gap-6">
            <div
              className="flex items-center gap-3 px-5 py-3 rounded-xl"
              style={{ backgroundColor: 'var(--surface-gold)', border: '1px solid var(--border-subtle)' }}
            >
              <div>
                <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>{t('Étapes libres complétées', 'Free stages completed')}</p>
                <p className="text-lg" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, color: 'var(--accent-gold)' }}>
                  {Math.min(completedCount, freeStages.length)} / {freeStages.length}
                </p>
              </div>
            </div>
            {completedCount > 0 && (
              <button
                onClick={resetProgress}
                className="flex items-center gap-1.5 text-xs transition-colors"
                style={{ color: 'var(--muted-foreground)', opacity: 0.5 }}
              >
                <RotateCcw className="w-3 h-3" />
                {t('Réinitialiser', 'Reset')}
              </button>
            )}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Path visual */}
          <div className="lg:col-span-1 hidden lg:block">
            <div className="sticky top-24">
              <BentoCard
                style={{ backgroundColor: 'var(--surface-gold)' }}
                glowColor="var(--glow-gold)"
              >
                <p className="text-xs uppercase tracking-[0.2em] mb-5" style={{ color: 'var(--accent-gold)', fontWeight: 500 }}>
                  {t('Le Chemin', 'The Path')}
                </p>
                <div className="space-y-1">
                  {STAGES.map((stage) => {
                    const isActive = expandedStage === stage.id;
                    const isLocked = stage.locked && !previewMode;
                    return (
                      <button
                        key={stage.id}
                        onClick={() => !isLocked && setExpandedStage(expandedStage === stage.id ? '' : stage.id)}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-200"
                        style={{
                          backgroundColor: isActive ? `color-mix(in srgb, ${stage.color} 10%, transparent)` : 'transparent',
                          cursor: isLocked ? 'default' : 'pointer',
                          opacity: isLocked ? 0.45 : 1,
                        }}
                      >
                        <div
                          className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-xs"
                          style={{
                            backgroundColor: isActive ? stage.color : 'transparent',
                            border: `1.5px solid ${isActive ? stage.color : isLocked ? 'var(--border)' : stage.color}`,
                            color: isActive ? '#fff' : isLocked ? 'var(--muted-foreground)' : stage.color,
                            fontWeight: 600,
                            opacity: isLocked ? 0.6 : 1,
                          }}
                        >
                          {isLocked ? <Lock className="w-3 h-3" /> : stage.number}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs truncate" style={{ fontWeight: isActive ? 600 : 400, color: isActive ? stage.color : 'var(--foreground)' }}>
                            {lang === 'fr' ? stage.titleFr : stage.titleEn}
                          </p>
                        </div>
                        {stage.locked && !previewMode && (
                          <span className="text-[9px] px-1.5 py-0.5 rounded-full" style={{ backgroundColor: 'var(--surface-gold)', color: 'var(--accent-gold)' }}>✦</span>
                        )}
                        {stage.locked && previewMode && (
                          <Eye className="w-3 h-3 flex-shrink-0" style={{ color: '#5aab6a', opacity: 0.7 }} />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Premium CTA */}
                {!previewMode && <div className="mt-6 p-4 rounded-xl" style={{ backgroundColor: isDark ? 'rgba(200,168,90,0.08)' : 'rgba(200,168,90,0.08)', border: '1px solid rgba(200,168,90,0.15)' }}>
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="w-3.5 h-3.5" style={{ color: 'var(--accent-gold)' }} />
                    <span className="text-xs" style={{ color: 'var(--accent-gold)', fontWeight: 600 }}>
                      {t('Accès Complet', 'Full Access')}
                    </span>
                  </div>
                  <p className="text-xs mb-3" style={{ color: 'var(--muted-foreground)', lineHeight: 1.7 }}>
                    {t('Déverrouillez les 5 étapes avancées et explorez les profondeurs de l\'Ascension.', 'Unlock 5 advanced stages and explore the depths of Ascension.')}
                  </p>
                  <button
                    onClick={() => toast(t('✦ Bientôt disponible', '✦ Coming soon'), {
                      description: t(
                        "L'accès premium à L'Ascension arrive prochainement. Continuez à explorer les étapes libres.",
                        "Premium access to The Ascension is coming soon. Continue exploring the free stages."
                      ),
                    })}
                    className="w-full py-2 rounded-lg text-xs transition-all hover:opacity-90"
                    style={{ backgroundColor: 'var(--accent-gold)', color: '#fff', fontWeight: 600 }}
                  >
                    {t('Rejoindre l\'Ascension', 'Join the Ascension')}
                  </button>
                </div>}
              </BentoCard>
            </div>
          </div>

          {/* Stages */}
          <div className="lg:col-span-2 space-y-3">
            {STAGES.map((stage) => (
              <StageCard
                key={stage.id}
                stage={stage}
                isExpanded={expandedStage === stage.id}
                onToggle={() => setExpandedStage(expandedStage === stage.id ? '' : stage.id)}
                previewMode={previewMode}
              />
            ))}

            {/* Bottom CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-8"
            >
              <BentoCard
                style={{ background: 'linear-gradient(135deg, var(--surface-gold) 0%, var(--surface-cosmic) 100%)' }}
                glowColor="var(--glow-gold)"
              >
                <div className="py-4 text-center">
                  <motion.div
                    className="inline-flex p-4 rounded-full mb-5"
                    style={{ backgroundColor: 'var(--surface-gold)' }}
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <Sparkles className="w-8 h-8" style={{ color: 'var(--accent-gold)' }} />
                  </motion.div>
                  <h3 className="mb-3">{t('Prêt pour l\'aventure complète ?', 'Ready for the complete journey?')}</h3>
                  <p className="text-sm max-w-md mx-auto mb-6" style={{ color: 'var(--muted-foreground)', lineHeight: 1.8 }}>
                    {t(
                      "Les cinq étapes avancées — Clarté, Intégration, Expansion, Transmission, Union — forment le cœur de l'expérience. Accédez à des pratiques profondes, des enseignements complets et un espace journal illimité.",
                      "The five advanced stages — Clarity, Integration, Expansion, Transmission, Union — form the heart of the experience. Access deep practices, complete teachings, and unlimited journal space."
                    )}
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button
                      onClick={() => toast(t('✦ Accès Premium — Bientôt', '✦ Premium Access — Coming Soon'), {
                        description: t(
                          "Les cinq étapes avancées seront bientôt disponibles. Explorez déjà L'Éveil et L'Observation.",
                          "The five advanced stages will be available soon. Explore The Awakening and The Observation in the meantime."
                        ),
                      })}
                      className="px-7 py-3 rounded-xl text-sm transition-all hover:opacity-90"
                      style={{ backgroundColor: 'var(--accent-gold)', color: '#fff', fontWeight: 600 }}
                    >
                      {t('Accès Premium — Bientôt', 'Premium Access — Coming Soon')}
                    </button>
                    <Link
                      to="/"
                      className="px-6 py-3 rounded-xl text-sm flex items-center gap-2"
                      style={{ border: '1px solid var(--border-subtle)', color: 'var(--muted-foreground)' }}
                    >
                      {t('Explorer le contenu libre', 'Explore free content')}
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </BentoCard>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AscensionPage() {
  return (
    <AscensionProvider>
      <AscensionInner />
    </AscensionProvider>
  );
}