import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Compass, ArrowRight, BookOpen, Map, Clock, HelpCircle, Scale,
  Flame, Eye, Waves, Globe, Star, ChevronRight, Play, Check,
} from 'lucide-react';
import { Link } from 'react-router';
import { useLang } from '../components/LanguageContext';
import { useTheme } from '../components/ThemeContext';

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
interface PathStep {
  labelFr: string;
  labelEn: string;
  descFr: string;
  descEn: string;
  href: string;
  icon: any;
  color: string;
  durationFr: string;
  durationEn: string;
  type: 'article' | 'lexicon' | 'tool' | 'practice';
}

interface ReadingPath {
  id: string;
  titleFr: string;
  titleEn: string;
  subtitleFr: string;
  subtitleEn: string;
  descFr: string;
  descEn: string;
  color: string;
  icon: any;
  surface: string;
  audienceFr: string;
  audienceEn: string;
  durationFr: string;
  durationEn: string;
  steps: PathStep[];
  recommendationsFr: string[];
  recommendationsEn: string[];
}

const PATHS: ReadingPath[] = [
  {
    id: 'decouverte',
    titleFr: 'Je découvre',
    titleEn: 'I\'m discovering',
    subtitleFr: 'Pour commencer sans rien savoir',
    subtitleEn: 'To start from scratch',
    descFr: "Vous êtes curieux mais ne savez pas par où commencer. Ce parcours vous donne une vue d'ensemble claire et accessible des traditions ésotériques.",
    descEn: "You're curious but don't know where to start. This path gives you a clear and accessible overview of esoteric traditions.",
    color: 'var(--accent-teal)',
    icon: Compass,
    surface: 'var(--surface-teal)',
    audienceFr: 'Curieux débutant, aucun prérequis',
    audienceEn: 'Curious beginner, no prerequisites',
    durationFr: '~2–3 heures de lecture',
    durationEn: '~2–3 hours of reading',
    steps: [
      { labelFr: 'Questions essentielles', labelEn: 'Essential questions', descFr: 'Commencez par les questions fondamentales : qu\'est-ce que l\'ésotérisme, comment évaluer une source.', descEn: 'Start with fundamental questions: what is esotericism, how to evaluate a source.', href: '/questions', icon: HelpCircle, color: 'var(--accent-rose)', durationFr: '15 min', durationEn: '15 min', type: 'tool' },
      { labelFr: 'Atlas des traditions', labelEn: 'Atlas of traditions', descFr: 'Découvrez les 11 grandes traditions du monde et leur géographie. Cliquez sur chaque civilisation.', descEn: 'Discover the 11 major world traditions and their geography. Click on each civilization.', href: '/carte', icon: Map, color: 'var(--accent-blue)', durationFr: '20 min', durationEn: '20 min', type: 'tool' },
      { labelFr: 'Symbolisme — introduction', labelEn: 'Symbolism — introduction', descFr: 'Le symbolisme est la porte d\'entrée la plus universelle. Explorez les grands symboles sacrés.', descEn: 'Symbolism is the most universal entry point. Explore the great sacred symbols.', href: '/symbolism', icon: Eye, color: 'var(--accent-blue)', durationFr: '30 min', durationEn: '30 min', type: 'article' },
      { labelFr: 'Lexique — 5 termes clés', labelEn: 'Lexicon — 5 key terms', descFr: 'Parcourez le lexique et choisissez 5 termes qui vous attirent. Lisez leur fiche.', descEn: 'Browse the lexicon and choose 5 terms that attract you. Read their article.', href: '/lexicon', icon: BookOpen, color: 'var(--accent-purple)', durationFr: '25 min', durationEn: '25 min', type: 'lexicon' },
      { labelFr: 'Chronologie historique', labelEn: 'Historical timeline', descFr: 'Situez les traditions dans le temps. Cela donne un contexte précieux.', descEn: 'Situate the traditions in time. This gives valuable context.', href: '/chronologie', icon: Clock, color: 'var(--accent-gold)', durationFr: '20 min', durationEn: '20 min', type: 'tool' },
    ],
    recommendationsFr: ['Ne cherchez pas à tout comprendre en une fois', 'Notez ce qui vous attire et revenez-y', 'La curiosité est votre meilleur guide'],
    recommendationsEn: ['Don\'t try to understand everything at once', 'Note what attracts you and come back to it', 'Curiosity is your best guide'],
  },
  {
    id: 'comprendre-symbole',
    titleFr: 'Je veux comprendre un symbole',
    titleEn: 'I want to understand a symbol',
    subtitleFr: 'Plonger dans le langage symbolique universel',
    subtitleEn: 'Diving into universal symbolic language',
    descFr: "Vous avez rencontré un symbole qui vous intrique — la spirale, le serpent, l'œil, le mandala — et vous voulez comprendre ce qu'il signifie vraiment.",
    descEn: "You've encountered a symbol that intrigues you — the spiral, the serpent, the eye, the mandala — and you want to understand what it really means.",
    color: 'var(--accent-gold)',
    icon: Eye,
    surface: 'var(--surface-gold)',
    audienceFr: 'Curieux du symbolisme, passionné d\'images',
    audienceEn: 'Curious about symbolism, passionate about images',
    durationFr: '~3–4 heures de lecture',
    durationEn: '~3–4 hours of reading',
    steps: [
      { labelFr: 'Symbolisme — vue d\'ensemble', labelEn: 'Symbolism — overview', descFr: 'Commencez par comprendre la logique du symbolisme et comment les images fonctionnent comme langage.', descEn: 'Start by understanding the logic of symbolism and how images function as language.', href: '/symbolism', icon: Eye, color: 'var(--accent-blue)', durationFr: '30 min', durationEn: '30 min', type: 'article' },
      { labelFr: 'Cherchez votre symbole dans le Lexique', labelEn: 'Search your symbol in the Lexicon', descFr: 'Utilisez la recherche avancée. Tapez votre symbole et lisez sa fiche, ses variantes culturelles.', descEn: 'Use advanced search. Type your symbol and read its article, its cultural variants.', href: '/recherche', icon: BookOpen, color: 'var(--accent-purple)', durationFr: '20 min', durationEn: '20 min', type: 'lexicon' },
      { labelFr: 'Comparer archétype et symbole', labelEn: 'Compare archetype and symbol', descFr: 'La comparaison Symbole vs Archétype (Jung) éclaire la profondeur universelle des symboles.', descEn: 'The Symbol vs Archetype (Jung) comparison illuminates the universal depth of symbols.', href: '/comparer', icon: Scale, color: 'var(--accent-teal)', durationFr: '15 min', durationEn: '15 min', type: 'tool' },
      { labelFr: 'Géométrie Sacrée', labelEn: 'Sacred Geometry', descFr: 'Pour les symboles géométriques : la géométrie sacrée donne le cadre cosmologique.', descEn: 'For geometric symbols: sacred geometry provides the cosmological framework.', href: '/sacred-geometry', icon: Star, color: 'var(--accent-gold)', durationFr: '30 min', durationEn: '30 min', type: 'article' },
      { labelFr: 'Traditions qui utilisent ce symbole', labelEn: 'Traditions using this symbol', descFr: 'Utilisez l\'Atlas pour identifier les traditions qui partagent ce symbole — et leurs différences.', descEn: 'Use the Atlas to identify traditions that share this symbol — and their differences.', href: '/carte', icon: Map, color: 'var(--accent-blue)', durationFr: '15 min', durationEn: '15 min', type: 'tool' },
    ],
    recommendationsFr: ['Les mêmes symboles ont des sens différents selon les traditions — c\'est une richesse', 'Méfiez-vous des interprétations universelles trop simples'],
    recommendationsEn: ['The same symbols have different meanings across traditions — this is richness', 'Beware of overly simple universal interpretations'],
  },
  {
    id: 'comparer-traditions',
    titleFr: 'Je compare des traditions',
    titleEn: 'I\'m comparing traditions',
    subtitleFr: 'Voir les ressemblances et les différences',
    subtitleEn: 'Seeing similarities and differences',
    descFr: "Vous vous intéressez aux parallèles entre traditions — ce qui les unit et ce qui les distingue. Un parcours pour le lecteur analytique et comparatiste.",
    descEn: "You're interested in the parallels between traditions — what unites them and what distinguishes them. A path for the analytical and comparative reader.",
    color: 'var(--accent-blue)',
    icon: Scale,
    surface: 'var(--surface-blue)',
    audienceFr: 'Lecteur analytique, étudiant en philosophie ou religion',
    audienceEn: 'Analytical reader, student of philosophy or religion',
    durationFr: '~4–5 heures de lecture',
    durationEn: '~4–5 hours of reading',
    steps: [
      { labelFr: 'Atlas des traditions', labelEn: 'Atlas of traditions', descFr: 'Vue géographique des traditions — visualisez les connexions entre civilisations.', descEn: 'Geographic view of traditions — visualize connections between civilizations.', href: '/carte', icon: Map, color: 'var(--accent-blue)', durationFr: '25 min', durationEn: '25 min', type: 'tool' },
      { labelFr: 'Chronologie comparée', labelEn: 'Comparative timeline', descFr: 'Situez les traditions les unes par rapport aux autres dans le temps. Repérez les transmissions.', descEn: 'Situate traditions relative to each other in time. Identify transmissions.', href: '/chronologie', icon: Clock, color: 'var(--accent-gold)', durationFr: '20 min', durationEn: '20 min', type: 'tool' },
      { labelFr: 'Fiches comparatives', labelEn: 'Comparative fiches', descFr: 'Consultez les 6 comparaisons disponibles. Elles illustrent la méthode comparative.', descEn: 'Consult the 6 available comparisons. They illustrate the comparative method.', href: '/comparer', icon: Scale, color: 'var(--accent-teal)', durationFr: '45 min', durationEn: '45 min', type: 'tool' },
      { labelFr: 'Alchimie et ses parallèles', labelEn: 'Alchemy and its parallels', descFr: 'L\'alchimie apparaît en Chine, en Inde et en Occident — avec des similitudes frappantes.', descEn: 'Alchemy appears in China, India, and the West — with striking similarities.', href: '/alchemy', icon: Flame, color: 'var(--accent-purple)', durationFr: '30 min', durationEn: '30 min', type: 'article' },
      { labelFr: 'Sources académiques', labelEn: 'Academic sources', descFr: 'Pour aller plus loin : les études comparatives sérieuses (Eliade, Faivre, Hanegraaff).', descEn: 'To go further: serious comparative studies (Eliade, Faivre, Hanegraaff).', href: '/sources', icon: BookOpen, color: 'var(--accent-gold)', durationFr: '15 min', durationEn: '15 min', type: 'tool' },
    ],
    recommendationsFr: ['La comparaison révèle autant les différences que les ressemblances — les deux sont importantes', 'Évitez le syncrétisme facile : "tout dit la même chose"'],
    recommendationsEn: ['Comparison reveals differences as much as similarities — both are important', 'Avoid easy syncretism: "everything says the same thing"'],
  },
  {
    id: 'conscience',
    titleFr: 'Je veux approfondir la conscience',
    titleEn: 'I want to deepen consciousness',
    subtitleFr: 'Chakras, éveil, méditation, états altérés',
    subtitleEn: 'Chakras, awakening, meditation, altered states',
    descFr: "Vous vous intéressez à la conscience, aux états méditatifs, aux corps subtils, à l'éveil. Un parcours pour celui qui cherche à la fois la rigueur intellectuelle et la profondeur pratique.",
    descEn: "You're interested in consciousness, meditative states, subtle bodies, awakening. A path for those seeking both intellectual rigor and practical depth.",
    color: 'var(--accent-rose)',
    icon: Waves,
    surface: 'var(--surface-rose)',
    audienceFr: 'Méditant, yogi, chercheur de sens',
    audienceEn: 'Meditator, yogi, seeker of meaning',
    durationFr: '~3–4 heures de lecture',
    durationEn: '~3–4 hours of reading',
    steps: [
      { labelFr: 'Conscience & Éveil — introduction', labelEn: 'Consciousness & Awakening — intro', descFr: 'Vue d\'ensemble de la thématique conscience dans Luminous.', descEn: 'Overview of the consciousness theme in Luminous.', href: '/conscience', icon: Waves, color: 'var(--accent-teal)', durationFr: '25 min', durationEn: '25 min', type: 'article' },
      { labelFr: 'Chakras — fiche lexique', labelEn: 'Chakras — lexicon article', descFr: 'Comprenez le système des chakras dans leur contexte tantrique originel.', descEn: 'Understand the chakra system in its original Tantric context.', href: '/lexicon/chakras', icon: Star, color: 'var(--accent-rose)', durationFr: '15 min', durationEn: '15 min', type: 'lexicon' },
      { labelFr: 'Chakra vs Aura — comparaison', labelEn: 'Chakra vs Aura — comparison', descFr: 'Deux notions proches mais distinctes. Clarifiez la différence.', descEn: 'Two close but distinct notions. Clarify the difference.', href: '/comparer', icon: Scale, color: 'var(--accent-teal)', durationFr: '10 min', durationEn: '10 min', type: 'tool' },
      { labelFr: 'Rêve lucide vs Voyage astral', labelEn: 'Lucid dream vs Astral projection', descFr: 'Deux expériences souvent confondues. Comprendre la distinction est crucial.', descEn: 'Two often confused experiences. Understanding the distinction is crucial.', href: '/comparer', icon: Scale, color: 'var(--accent-teal)', durationFr: '10 min', durationEn: '10 min', type: 'tool' },
      { labelFr: 'Inde védique sur l\'Atlas', labelEn: 'Vedic India on the Atlas', descFr: 'Contextualisez ces traditions dans leur berceau géographique et historique.', descEn: 'Contextualize these traditions in their geographic and historical cradle.', href: '/carte', icon: Map, color: 'var(--accent-blue)', durationFr: '15 min', durationEn: '15 min', type: 'tool' },
      { labelFr: 'Questions sur les chakras et la méditation', labelEn: 'Questions on chakras and meditation', descFr: 'Les questions essentielles avec des réponses rigoureuses et nuancées.', descEn: 'Essential questions with rigorous and nuanced answers.', href: '/questions', icon: HelpCircle, color: 'var(--accent-rose)', durationFr: '15 min', durationEn: '15 min', type: 'tool' },
    ],
    recommendationsFr: ['Distinguez expérience personnelle et vérité universelle', 'La rigueur n\'exclut pas la pratique — elle la nourrit'],
    recommendationsEn: ['Distinguish personal experience from universal truth', 'Rigor doesn\'t exclude practice — it nourishes it'],
  },
  {
    id: 'relier',
    titleFr: 'Je veux tout relier',
    titleEn: 'I want to connect everything',
    subtitleFr: 'La grande synthèse — pour le lecteur avancé',
    subtitleEn: 'The grand synthesis — for the advanced reader',
    descFr: "Vous connaissez déjà ces traditions et cherchez la vue d'ensemble — les fils conducteurs, les convergences, les tensions. Un parcours de synthèse pour le lecteur avancé.",
    descEn: "You already know these traditions and are looking for the overview — the connecting threads, convergences, tensions. A synthesis path for the advanced reader.",
    color: 'var(--accent-purple)',
    icon: Globe,
    surface: 'var(--surface-purple)',
    audienceFr: 'Lecteur avancé, praticien, chercheur',
    audienceEn: 'Advanced reader, practitioner, researcher',
    durationFr: '~6–8 heures de lecture',
    durationEn: '~6–8 hours of reading',
    steps: [
      { labelFr: 'Chronologie complète', labelEn: 'Full timeline', descFr: 'Commencez par la frise chronologique complète — tous filtres désactivés. La longue durée révèle les patterns.', descEn: 'Start with the complete timeline — all filters off. The long duration reveals patterns.', href: '/chronologie', icon: Clock, color: 'var(--accent-gold)', durationFr: '35 min', durationEn: '35 min', type: 'tool' },
      { labelFr: 'Atlas complet', labelEn: 'Full atlas', descFr: 'Explorez toutes les traditions sur la carte. Observez les connexions géographiques.', descEn: 'Explore all traditions on the map. Observe the geographic connections.', href: '/carte', icon: Map, color: 'var(--accent-blue)', durationFr: '30 min', durationEn: '30 min', type: 'tool' },
      { labelFr: 'Les 6 catégories thématiques', labelEn: 'The 6 thematic categories', descFr: 'Lisez une introduction par catégorie (Alchimie, Symbolisme, Numérologie, Géométrie Sacrée, Conscience, Cosmologie).', descEn: 'Read one introduction per category (Alchemy, Symbolism, Numerology, Sacred Geometry, Consciousness, Cosmology).', href: '/alchemy', icon: Flame, color: 'var(--accent-purple)', durationFr: '90 min', durationEn: '90 min', type: 'article' },
      { labelFr: 'Toutes les comparaisons', labelEn: 'All comparisons', descFr: 'Les fiches comparatives révèlent les tensions entre notions proches — essentielles pour la synthèse.', descEn: 'Comparative fiches reveal tensions between similar notions — essential for synthesis.', href: '/comparer', icon: Scale, color: 'var(--accent-teal)', durationFr: '60 min', durationEn: '60 min', type: 'tool' },
      { labelFr: 'Recherche avancée thématique', labelEn: 'Advanced thematic search', descFr: 'Utilisez la recherche avec des filtres combinés pour cartographier un concept à travers les traditions.', descEn: 'Use search with combined filters to map a concept across traditions.', href: '/recherche', icon: BookOpen, color: 'var(--accent-purple)', durationFr: '30 min', durationEn: '30 min', type: 'tool' },
      { labelFr: 'Bibliothèque des sources', labelEn: 'Sources library', descFr: 'Pour chaque tradition, identifiez les sources primaires et secondaires incontournables.', descEn: 'For each tradition, identify the essential primary and secondary sources.', href: '/sources', icon: BookOpen, color: 'var(--accent-gold)', durationFr: '20 min', durationEn: '20 min', type: 'tool' },
    ],
    recommendationsFr: ['La synthèse ne signifie pas "tout est pareil" — les différences sont aussi riches que les ressemblances', 'Prenez des notes', 'Relisez après quelques jours'],
    recommendationsEn: ['Synthesis doesn\'t mean "everything is the same" — differences are as rich as similarities', 'Take notes', 'Re-read after a few days'],
  },
];

const TYPE_LABEL_FR: Record<string, string> = { article: 'Article', lexicon: 'Lexique', tool: 'Outil', practice: 'Pratique' };
const TYPE_LABEL_EN: Record<string, string> = { article: 'Article', lexicon: 'Lexicon', tool: 'Tool', practice: 'Practice' };
const TYPE_COLORS: Record<string, string> = { article: 'var(--accent-rose)', lexicon: 'var(--accent-purple)', tool: 'var(--accent-blue)', practice: 'var(--accent-teal)' };

/* ─────────────────────────────────────────────
   PATH CARD
───────────────────────────────────────────── */
function PathCard({ path, lang, isDark, isOpen, onToggle, completedSteps, onToggleStep }: {
  path: ReadingPath;
  lang: 'fr' | 'en';
  isDark: boolean;
  isOpen: boolean;
  onToggle: () => void;
  completedSteps: Set<number>;
  onToggleStep: (index: number) => void;
}) {
  const Icon = path.icon;
  const progress = completedSteps.size / path.steps.length;

  return (
    <motion.div layout className="rounded-2xl overflow-hidden"
      style={{ border: `1px solid ${isOpen ? path.color : 'var(--border-subtle)'}`, backgroundColor: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.9)' }}>

      {/* Header */}
      <button onClick={onToggle} className="w-full text-left p-5 transition-all hover:opacity-90">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: `color-mix(in srgb, ${path.color} 12%, transparent)` }}>
            <Icon className="w-5 h-5" style={{ color: path.color }} />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap mb-0.5">
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.2rem', color: 'var(--foreground)', lineHeight: 1.2 }}>
                {lang === 'fr' ? path.titleFr : path.titleEn}
              </h3>
              {completedSteps.size > 0 && (
                <span className="text-[9px] px-2 py-0.5 rounded-full"
                  style={{ backgroundColor: `color-mix(in srgb, ${path.color} 15%, transparent)`, color: path.color }}>
                  {completedSteps.size}/{path.steps.length}
                </span>
              )}
            </div>
            <p className="text-xs mb-2" style={{ color: path.color, fontWeight: 500 }}>
              {lang === 'fr' ? path.subtitleFr : path.subtitleEn}
            </p>
            <div className="flex items-center gap-3 text-[10px]" style={{ color: 'var(--muted-foreground)' }}>
              <span>{lang === 'fr' ? path.audienceFr : path.audienceEn}</span>
              <span>•</span>
              <span>{lang === 'fr' ? path.durationFr : path.durationEn}</span>
              <span>•</span>
              <span>{path.steps.length} {lang === 'fr' ? 'étapes' : 'steps'}</span>
            </div>
          </div>
          <motion.div animate={{ rotate: isOpen ? 90 : 0 }} transition={{ duration: 0.22 }} className="flex-shrink-0">
            <ChevronRight className="w-4 h-4" style={{ color: 'var(--muted-foreground)' }} />
          </motion.div>
        </div>

        {/* Progress bar */}
        <div className="mt-3 h-1 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--muted)' }}>
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: path.color, width: `${progress * 100}%` }}
            animate={{ width: `${progress * 100}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-6 pt-0">
              <div className="h-px mb-4" style={{ backgroundColor: `color-mix(in srgb, ${path.color} 15%, transparent)` }} />

              <p className="text-sm mb-6" style={{ color: 'var(--muted-foreground)', lineHeight: 1.8 }}>
                {lang === 'fr' ? path.descFr : path.descEn}
              </p>

              {/* Steps */}
              <div className="space-y-2.5 mb-5">
                {path.steps.map((step, si) => {
                  const StepIcon = step.icon;
                  const isCompleted = completedSteps.has(si);
                  return (
                    <div key={si} className="flex items-start gap-3 rounded-xl p-3.5 group transition-all"
                      style={{
                        backgroundColor: isCompleted
                          ? `color-mix(in srgb, ${step.color} 6%, transparent)`
                          : isDark ? 'rgba(255,255,255,0.02)' : 'rgba(245,243,255,0.5)',
                        border: `1px solid ${isCompleted ? step.color : 'var(--border-subtle)'}`,
                      }}>
                      {/* Step number */}
                      <div className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-medium"
                        style={{ backgroundColor: isCompleted ? step.color : 'var(--muted)', color: isCompleted ? '#fff' : 'var(--muted-foreground)' }}>
                        {isCompleted ? <Check className="w-3 h-3" /> : si + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span style={{ fontSize: '0.88rem', color: 'var(--foreground)', fontWeight: 500 }}>
                            {lang === 'fr' ? step.labelFr : step.labelEn}
                          </span>
                          <span className="text-[9px] px-1.5 py-0.5 rounded flex-shrink-0"
                            style={{ backgroundColor: `color-mix(in srgb, ${TYPE_COLORS[step.type]} 10%, transparent)`, color: TYPE_COLORS[step.type] }}>
                            {lang === 'fr' ? TYPE_LABEL_FR[step.type] : TYPE_LABEL_EN[step.type]}
                          </span>
                        </div>
                        <p className="text-xs" style={{ color: 'var(--muted-foreground)', lineHeight: 1.5 }}>
                          {lang === 'fr' ? step.descFr : step.descEn}
                        </p>
                        <div className="flex items-center gap-3 mt-1.5">
                          <span className="text-[9px]" style={{ color: 'var(--muted-foreground)' }}>
                            {lang === 'fr' ? step.durationFr : step.durationEn}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-1.5 flex-shrink-0">
                        <Link to={step.href}
                          className="w-7 h-7 flex items-center justify-center rounded-lg transition-all hover:opacity-80"
                          style={{ backgroundColor: `color-mix(in srgb, ${step.color} 12%, transparent)`, color: step.color }}>
                          <Play className="w-3 h-3" />
                        </Link>
                        <button onClick={() => onToggleStep(si)}
                          className="w-7 h-7 flex items-center justify-center rounded-lg transition-all hover:opacity-80"
                          style={{ backgroundColor: isCompleted ? `color-mix(in srgb, ${step.color} 15%, transparent)` : 'var(--muted)', color: isCompleted ? step.color : 'var(--muted-foreground)' }}
                          title={lang === 'fr' ? 'Marquer comme lu' : 'Mark as read'}>
                          <Check className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Recommendations */}
              <div className="rounded-xl p-4" style={{ backgroundColor: `color-mix(in srgb, ${path.color} 5%, transparent)`, border: `1px solid color-mix(in srgb, ${path.color} 12%, transparent)` }}>
                <p className="text-[10px] uppercase tracking-[0.15em] mb-2.5" style={{ color: path.color, fontWeight: 600 }}>
                  ✦ {lang === 'fr' ? 'Conseils pour ce parcours' : 'Tips for this path'}
                </p>
                <ul className="space-y-1.5">
                  {(lang === 'fr' ? path.recommendationsFr : path.recommendationsEn).map((rec, i) => (
                    <li key={i} className="text-xs flex items-start gap-2" style={{ color: 'var(--muted-foreground)', lineHeight: 1.6 }}>
                      <span style={{ color: path.color, flexShrink: 0 }}>→</span>
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
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
export function ReadingPathsPage() {
  const { t, lang } = useLang();
  const { isDark } = useTheme();
  const [openId, setOpenId] = useState<string | null>(null);
  const [completedMap, setCompletedMap] = useState<Record<string, Set<number>>>({});

  const toggleStep = (pathId: string, stepIndex: number) => {
    setCompletedMap((prev) => {
      const current = new Set(prev[pathId] ?? []);
      if (current.has(stepIndex)) current.delete(stepIndex);
      else current.add(stepIndex);
      return { ...prev, [pathId]: current };
    });
  };

  const totalCompleted = Object.values(completedMap).reduce((acc, s) => acc + s.size, 0);

  return (
    <div className="pt-16 pb-16 px-4 lg:px-8">
      <div className="max-w-[900px] mx-auto">

        {/* ── Header ── */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
          className="pt-10 mb-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="inline-flex p-2.5 rounded-xl" style={{ backgroundColor: 'var(--surface-mint)' }}>
              <Compass className="w-5 h-5" style={{ color: 'var(--accent-mint)' }} />
            </div>
            <span className="text-xs uppercase tracking-[0.3em]" style={{ color: 'var(--accent-mint)', fontWeight: 500 }}>
              {t('Parcours de lecture', 'Reading paths')}
            </span>
          </div>
          <h1 className="mb-2" style={{ fontSize: 'clamp(2rem, 3.5vw, 3.2rem)', lineHeight: 1.1 }}>
            {t('Choisissez votre', 'Choose your')} <span style={{ color: 'var(--accent-mint)' }}>{t('Parcours', 'Path')}</span>
          </h1>
          <p className="max-w-xl text-sm" style={{ color: 'var(--muted-foreground)', lineHeight: 1.85 }}>
            {t(
              "Chaque visiteur arrive avec une intention différente. Cinq parcours guidés selon votre curiosité du moment — avec suivi de progression.",
              "Each visitor arrives with a different intention. Five guided paths according to your current curiosity — with progress tracking."
            )}
          </p>
          {totalCompleted > 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="inline-flex items-center gap-2 mt-3 text-xs px-3 py-1.5 rounded-full"
              style={{ backgroundColor: 'var(--surface-teal)', color: 'var(--accent-teal)', border: '1px solid var(--border-subtle)' }}>
              <Check className="w-3 h-3" />
              {totalCompleted} {lang === 'fr' ? 'étape(s) complétée(s)' : 'step(s) completed'}
            </motion.div>
          )}
        </motion.div>

        {/* ── Quick selection ── */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 mb-8">
          {PATHS.map((path) => {
            const Icon = path.icon;
            const completed = completedMap[path.id]?.size ?? 0;
            return (
              <button key={path.id} onClick={() => setOpenId(openId === path.id ? null : path.id)}
                className="flex flex-col items-center gap-1.5 py-3 px-2 rounded-xl transition-all text-center"
                style={{
                  backgroundColor: openId === path.id ? `color-mix(in srgb, ${path.color} 10%, transparent)` : isDark ? 'rgba(255,255,255,0.025)' : 'rgba(255,255,255,0.85)',
                  border: `1px solid ${openId === path.id ? path.color : 'var(--border-subtle)'}`,
                }}>
                <Icon className="w-4 h-4" style={{ color: path.color }} />
                <span className="text-[10px] uppercase tracking-[0.06em]" style={{ color: openId === path.id ? path.color : 'var(--muted-foreground)', fontWeight: openId === path.id ? 600 : 400, lineHeight: 1.2 }}>
                  {lang === 'fr' ? path.titleFr : path.titleEn}
                </span>
                {completed > 0 && (
                  <span className="text-[9px]" style={{ color: path.color }}>{completed}/{path.steps.length}</span>
                )}
              </button>
            );
          })}
        </div>

        {/* ── Path cards ── */}
        <div className="space-y-3">
          {PATHS.map((path) => (
            <PathCard
              key={path.id}
              path={path}
              lang={lang}
              isDark={isDark}
              isOpen={openId === path.id}
              onToggle={() => setOpenId(openId === path.id ? null : path.id)}
              completedSteps={completedMap[path.id] ?? new Set()}
              onToggleStep={(idx) => toggleStep(path.id, idx)}
            />
          ))}
        </div>

        {/* Footer note */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="mt-8 text-center">
          <p className="text-xs" style={{ color: 'var(--muted-foreground)', fontStyle: 'italic', lineHeight: 1.8 }}>
            {t(
              "Ces parcours sont des suggestions, non des obligations. Luminous est conçu pour être exploré librement — suivez votre curiosité.",
              "These paths are suggestions, not obligations. Luminous is designed to be explored freely — follow your curiosity."
            )}
          </p>
          <Link to="/recherche" className="inline-flex items-center gap-2 mt-3 text-sm transition-opacity hover:opacity-80"
            style={{ color: 'var(--accent-mint)', fontWeight: 500 }}>
            {t('Ou explorez librement via la recherche', 'Or explore freely via search')}
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
