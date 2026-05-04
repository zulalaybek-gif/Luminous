import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft, ArrowRight, BookOpen, AlertTriangle, ChevronDown, Quote, User,
  Dumbbell, HelpCircle, Star, Heart, Share2, ExternalLink,
} from 'lucide-react';
import { useParams, Link, useNavigate } from 'react-router';
import { useLang } from '../components/LanguageContext';
import { useTheme } from '../components/ThemeContext';
import { useFavorites } from '../components/FavoritesContext';
import { toast } from 'sonner';
import { sanitizeSlug } from '../components/sanitize';
import {
  getSubjectById, richSubjects, INFO_TYPE_CONFIG, AXIS_CONFIG,
  type InfoType, type RichSubject, type SubjectSection,
} from '../components/subjectsData';

/* ─────────────────────────────────────────────
   INFO TYPE BADGE
───────────────────────────────────────────── */
function InfoBadge({ type, lang, size = 'normal' }: { type: InfoType; lang: 'fr' | 'en'; size?: 'normal' | 'small' }) {
  const cfg = INFO_TYPE_CONFIG[type];
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full font-medium ${size === 'small' ? 'text-[9px] px-2 py-0.5' : 'text-[10px] px-2.5 py-1'}`}
      style={{
        backgroundColor: `color-mix(in srgb, ${cfg.color} 10%, transparent)`,
        color: cfg.color,
        border: `1px solid color-mix(in srgb, ${cfg.color} 20%, transparent)`,
      }}
      title={lang === 'fr' ? cfg.descFr : cfg.descEn}
    >
      {lang === 'fr' ? cfg.labelFr : cfg.labelEn}
    </span>
  );
}

/* ─────────────────────────────────────────────
   SECTION BLOCK
───────────────────────────────────────────── */
function SectionBlock({ section, lang, isDark, color, isOpen, onToggle }: {
  section: SubjectSection; lang: 'fr' | 'en'; isDark: boolean; color: string; isOpen: boolean; onToggle: () => void;
}) {
  const content = lang === 'fr' ? section.contentFr : section.contentEn;

  // Format markdown-like bold
  const formatContent = (text: string) => {
    return text.split('\n\n').map((para, i) => {
      const formatted = para.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      return (
        <p key={i} className="text-sm mb-3 last:mb-0" style={{ color: 'var(--muted-foreground)', lineHeight: 1.9 }}
          dangerouslySetInnerHTML={{ __html: formatted.split('\n').map((line, j, arr) => line + (j < arr.length - 1 ? '<br/>' : '')).join('') }} />
      );
    });
  };

  return (
    <div className="rounded-2xl overflow-hidden mb-3" style={{ border: `1px solid var(--border-subtle)`, backgroundColor: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.8)' }}>
      <button onClick={onToggle} className="w-full text-left px-5 py-4 flex items-center justify-between gap-3 transition-opacity hover:opacity-90">
        <div className="flex items-start gap-3">
          <div className="w-1 h-5 rounded-full flex-shrink-0 mt-0.5" style={{ backgroundColor: `color-mix(in srgb, ${INFO_TYPE_CONFIG[section.infoType].color} 60%, transparent)` }} />
          <div>
            <h3 style={{ fontSize: '0.95rem', color: 'var(--foreground)', lineHeight: 1.3 }}>
              {lang === 'fr' ? section.titleFr : section.titleEn}
            </h3>
            <div className="mt-1">
              <InfoBadge type={section.infoType} lang={lang} size="small" />
            </div>
          </div>
        </div>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.22 }}>
          <ChevronDown className="w-4 h-4 flex-shrink-0" style={{ color: 'var(--muted-foreground)' }} />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.28 }} className="overflow-hidden">
            <div className="px-5 pb-5 pt-1">
              <div className="h-px mb-4" style={{ backgroundColor: `color-mix(in srgb, ${INFO_TYPE_CONFIG[section.infoType].color} 15%, transparent)` }} />
              {formatContent(content)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────── */
export function SubjectPage() {
  const { subjectId: rawId } = useParams<{ subjectId: string }>();
  const { t, lang } = useLang();
  const { isDark } = useTheme();
  const { isFavorite, toggleFavorite } = useFavorites();
  const navigate = useNavigate();

  const subjectId = rawId ? sanitizeSlug(rawId) : '';
  const subject = getSubjectById(subjectId);

  const [openSections, setOpenSections] = useState<Set<string>>(new Set([subject?.sections?.[0]?.id ?? '']));
  const [openDebates, setOpenDebates] = useState<Set<number>>(new Set());

  const toggleSection = (id: string) => {
    setOpenSections((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };
  const toggleDebate = (i: number) => {
    setOpenDebates((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  if (!subject) {
    return (
      <div className="pt-32 pb-20 px-6 text-center">
        <p style={{ color: 'var(--muted-foreground)' }}>{t('Sujet non trouvé', 'Subject not found')}</p>
        <Link to="/recherche" className="inline-flex items-center gap-2 mt-4 text-sm" style={{ color: 'var(--accent-purple)' }}>
          <ArrowLeft className="w-4 h-4" />
          {t('Retour à la recherche', 'Back to search')}
        </Link>
      </div>
    );
  }

  const isFav = isFavorite(subject.id);
  const axisConfig = AXIS_CONFIG[subject.axis];
  const relatedSubjects = (subject.relatedIds ?? []).map((id) => richSubjects.find((s) => s.id === id)).filter(Boolean) as RichSubject[];

  const share = () => {
    navigator.clipboard?.writeText(window.location.href).then(() => {
      toast.success(lang === 'fr' ? 'Lien copié' : 'Link copied');
    });
  };

  return (
    <div className="pt-16 min-h-screen">

      {/* ── Hero ── */}
      <div className="relative overflow-hidden" style={{ background: isDark ? `color-mix(in srgb, ${subject.color} 6%, rgba(8,6,18,1))` : `color-mix(in srgb, ${subject.color} 4%, rgba(248,246,255,1))` }}>
        <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at 70% 50%, color-mix(in srgb, ${subject.color} 8%, transparent), transparent 70%)` }} />
        <div className="max-w-[1200px] mx-auto px-4 lg:px-8 pt-12 pb-10 relative">

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-6 text-xs" style={{ color: 'var(--muted-foreground)' }}>
            <button onClick={() => navigate(-1)} className="flex items-center gap-1 hover:opacity-80 transition-opacity">
              <ArrowLeft className="w-3.5 h-3.5" />
              {t('Retour', 'Back')}
            </button>
            <span>/</span>
            <span style={{ color: axisConfig.color }}>{lang === 'fr' ? axisConfig.labelFr : axisConfig.labelEn}</span>
          </div>

          {/* Title block */}
          <div className="max-w-3xl">
            {/* Axis + info badges */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="text-[10px] uppercase tracking-[0.2em] px-2.5 py-1 rounded-full"
                style={{ backgroundColor: `color-mix(in srgb, ${axisConfig.color} 12%, transparent)`, color: axisConfig.color, border: `1px solid color-mix(in srgb, ${axisConfig.color} 20%, transparent)` }}>
                {lang === 'fr' ? axisConfig.labelFr : axisConfig.labelEn}
              </span>
              {subject.infoBadges.slice(0, 3).map((badge) => (
                <InfoBadge key={badge} type={badge} lang={lang} />
              ))}
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              style={{ fontSize: 'clamp(2.2rem, 4vw, 3.8rem)', lineHeight: 1.05, marginBottom: '0.5rem' }}
            >
              {lang === 'fr' ? subject.titleFr : subject.titleEn}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.6 }}
              className="text-sm mb-2"
              style={{ color: subject.color, fontWeight: 500 }}
            >
              {lang === 'fr' ? subject.subtitleFr : subject.subtitleEn}
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
              className="text-xs italic"
              style={{ color: 'var(--muted-foreground)' }}
            >
              {lang === 'fr' ? subject.taglineFr : subject.taglineEn}
            </motion.p>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-3 mt-6">
            <button
              onClick={() => { toggleFavorite(subject.id); toast.success(isFav ? (lang === 'fr' ? 'Retiré des favoris' : 'Removed from favorites') : (lang === 'fr' ? 'Ajouté aux favoris' : 'Added to favorites')); }}
              className="flex items-center gap-2 text-xs px-3 py-1.5 rounded-full transition-all"
              style={{ backgroundColor: isFav ? `color-mix(in srgb, ${subject.color} 12%, transparent)` : 'var(--muted)', color: isFav ? subject.color : 'var(--muted-foreground)', border: `1px solid ${isFav ? subject.color : 'var(--border-subtle)'}` }}
            >
              <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-current' : ''}`} />
              {isFav ? t('Favoris', 'Saved') : t('Sauvegarder', 'Save')}
            </button>
            <button onClick={share} className="flex items-center gap-2 text-xs px-3 py-1.5 rounded-full transition-all hover:opacity-80"
              style={{ backgroundColor: 'var(--muted)', color: 'var(--muted-foreground)', border: '1px solid var(--border-subtle)' }}>
              <Share2 className="w-3.5 h-3.5" />
              {t('Partager', 'Share')}
            </button>
          </div>

          {/* Gradient border bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, color-mix(in srgb, ${subject.color} 35%, transparent), transparent)` }} />
        </div>
      </div>

      {/* ── Body ── */}
      <div className="max-w-[1200px] mx-auto px-4 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">

          {/* ── Left: Main Content ── */}
          <div>

            {/* Editorial clarity note */}
            {subject.infoBadges.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="rounded-2xl p-4 mb-6"
                style={{ backgroundColor: isDark ? 'rgba(255,255,255,0.025)' : 'rgba(255,255,255,0.8)', border: '1px solid var(--border-subtle)' }}
              >
                <p className="text-[10px] uppercase tracking-[0.2em] mb-2" style={{ color: 'var(--muted-foreground)', fontWeight: 600 }}>
                  {t('Nature des informations présentées', 'Nature of the information presented')}
                </p>
                <div className="flex flex-wrap gap-2">
                  {subject.infoBadges.map((badge) => {
                    const cfg = INFO_TYPE_CONFIG[badge];
                    return (
                      <div key={badge} className="inline-flex items-center gap-1.5 text-[10px]" style={{ color: 'var(--muted-foreground)' }}>
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: cfg.color }} />
                        <span style={{ color: cfg.color }}>{lang === 'fr' ? cfg.labelFr : cfg.labelEn}</span>
                        <span>— {lang === 'fr' ? cfg.descFr : cfg.descEn}</span>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* Definition */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="rounded-2xl p-6 mb-6"
              style={{
                backgroundColor: isDark ? `color-mix(in srgb, ${subject.color} 5%, rgba(12,10,22,0.9))` : `color-mix(in srgb, ${subject.color} 4%, rgba(252,250,255,0.95))`,
                border: `1px solid color-mix(in srgb, ${subject.color} 15%, transparent)`,
              }}
            >
              <div className="h-[2px] rounded-full mb-4" style={{ background: `linear-gradient(90deg, ${subject.color}, transparent)` }} />
              <p className="text-[10px] uppercase tracking-[0.2em] mb-3" style={{ color: subject.color, fontWeight: 600 }}>
                {t('Définition', 'Definition')}
              </p>
              <p className="text-sm" style={{ color: 'var(--muted-foreground)', lineHeight: 1.9 }}>
                {lang === 'fr' ? subject.definitionFr : subject.definitionEn}
              </p>
            </motion.div>

            {/* Origin */}
            {(lang === 'fr' ? subject.originFr : subject.originEn) && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="rounded-2xl p-5 mb-6"
                style={{ backgroundColor: isDark ? 'rgba(255,255,255,0.025)' : 'rgba(255,255,255,0.85)', border: '1px solid var(--border-subtle)' }}
              >
                <p className="text-[10px] uppercase tracking-[0.2em] mb-2" style={{ color: 'var(--accent-gold)', fontWeight: 600 }}>
                  ✦ {t('Origine', 'Origin')}
                </p>
                <p className="text-sm" style={{ color: 'var(--muted-foreground)', lineHeight: 1.85 }}>
                  {lang === 'fr' ? subject.originFr : subject.originEn}
                </p>
              </motion.div>
            )}

            {/* Historical context */}
            {(lang === 'fr' ? subject.historicalContextFr : subject.historicalContextEn) && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="rounded-2xl p-5 mb-6"
                style={{ backgroundColor: isDark ? 'rgba(255,255,255,0.025)' : 'rgba(255,255,255,0.85)', border: '1px solid var(--border-subtle)' }}
              >
                <p className="text-[10px] uppercase tracking-[0.2em] mb-2" style={{ color: 'var(--accent-blue)', fontWeight: 600 }}>
                  {t('Contexte historique', 'Historical context')}
                </p>
                <p className="text-sm" style={{ color: 'var(--muted-foreground)', lineHeight: 1.85 }}>
                  {lang === 'fr' ? subject.historicalContextFr : subject.historicalContextEn}
                </p>
              </motion.div>
            )}

            {/* Sections */}
            {subject.sections && subject.sections.length > 0 && (
              <div className="mb-6">
                <p className="text-[10px] uppercase tracking-[0.2em] mb-3" style={{ color: 'var(--muted-foreground)', fontWeight: 600 }}>
                  {t('Pour aller plus loin', 'Going deeper')}
                </p>
                {subject.sections.map((section) => (
                  <SectionBlock
                    key={section.id}
                    section={section}
                    lang={lang}
                    isDark={isDark}
                    color={subject.color}
                    isOpen={openSections.has(section.id)}
                    onToggle={() => toggleSection(section.id)}
                  />
                ))}
              </div>
            )}

            {/* Practices */}
            {subject.practices && subject.practices.length > 0 && (
              <div className="mb-6">
                <p className="text-[10px] uppercase tracking-[0.2em] mb-3" style={{ color: 'var(--muted-foreground)', fontWeight: 600 }}>
                  <Dumbbell className="w-3 h-3 inline mr-1" />
                  {t('Pratiques', 'Practices')}
                </p>
                {subject.practices.map((practice, pi) => (
                  <motion.div
                    key={pi}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: pi * 0.05 }}
                    className="rounded-2xl p-5 mb-3"
                    style={{ backgroundColor: `color-mix(in srgb, ${subject.color} 5%, transparent)`, border: `1px solid color-mix(in srgb, ${subject.color} 15%, transparent)` }}
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div>
                        <h4 style={{ fontSize: '0.95rem', color: 'var(--foreground)', lineHeight: 1.3 }}>
                          {lang === 'fr' ? practice.nameFr : practice.nameEn}
                        </h4>
                        <div className="flex items-center gap-2 mt-1 flex-wrap">
                          <InfoBadge type={practice.infoType} lang={lang} size="small" />
                          {practice.difficulty && (
                            <span className="text-[9px] px-1.5 py-0.5 rounded"
                              style={{ backgroundColor: 'var(--muted)', color: 'var(--muted-foreground)' }}>
                              {practice.difficulty}
                            </span>
                          )}
                          {practice.duration && (
                            <span className="text-[9px]" style={{ color: 'var(--muted-foreground)' }}>
                              ⏱ {practice.duration}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <p className="text-sm mb-3" style={{ color: 'var(--muted-foreground)', lineHeight: 1.75 }}>
                      {lang === 'fr' ? practice.descFr : practice.descEn}
                    </p>
                    {practice.stepsFr && (
                      <ol className="space-y-1.5">
                        {(lang === 'fr' ? practice.stepsFr : (practice.stepsEn ?? practice.stepsFr)).map((step, si) => (
                          <li key={si} className="flex items-start gap-2.5 text-xs" style={{ color: 'var(--muted-foreground)', lineHeight: 1.65 }}>
                            <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[9px]"
                              style={{ backgroundColor: `color-mix(in srgb, ${subject.color} 12%, transparent)`, color: subject.color, fontWeight: 600 }}>
                              {si + 1}
                            </span>
                            {step}
                          </li>
                        ))}
                      </ol>
                    )}
                  </motion.div>
                ))}
              </div>
            )}

            {/* Debates */}
            {subject.debates && subject.debates.length > 0 && (
              <div className="mb-6">
                <p className="text-[10px] uppercase tracking-[0.2em] mb-3" style={{ color: 'var(--muted-foreground)', fontWeight: 600 }}>
                  <HelpCircle className="w-3 h-3 inline mr-1" />
                  {t('Points de débat', 'Debate points')}
                </p>
                {subject.debates.map((debate, di) => (
                  <div key={di} className="rounded-2xl overflow-hidden mb-3" style={{ border: '1px solid var(--border-subtle)', backgroundColor: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.8)' }}>
                    <button onClick={() => toggleDebate(di)} className="w-full text-left px-5 py-4 flex items-center justify-between gap-3 hover:opacity-90">
                      <p style={{ fontSize: '0.9rem', color: 'var(--foreground)', lineHeight: 1.35 }}>
                        {lang === 'fr' ? debate.questionFr : debate.questionEn}
                      </p>
                      <motion.div animate={{ rotate: openDebates.has(di) ? 180 : 0 }} transition={{ duration: 0.2 }}>
                        <ChevronDown className="w-4 h-4 flex-shrink-0" style={{ color: 'var(--muted-foreground)' }} />
                      </motion.div>
                    </button>
                    <AnimatePresence>
                      {openDebates.has(di) && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
                          <div className="px-5 pb-5 pt-0 space-y-3">
                            <div className="h-px" style={{ backgroundColor: 'var(--border-subtle)' }} />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              <div className="rounded-xl p-3.5" style={{ backgroundColor: 'color-mix(in srgb, var(--accent-blue) 6%, transparent)', border: '1px solid color-mix(in srgb, var(--accent-blue) 12%, transparent)' }}>
                                <p className="text-[9px] uppercase tracking-[0.1em] mb-1.5" style={{ color: 'var(--accent-blue)', fontWeight: 600 }}>Position A</p>
                                <p className="text-xs" style={{ color: 'var(--muted-foreground)', lineHeight: 1.7 }}>{debate.positionAFr}</p>
                              </div>
                              <div className="rounded-xl p-3.5" style={{ backgroundColor: 'color-mix(in srgb, var(--accent-rose) 6%, transparent)', border: '1px solid color-mix(in srgb, var(--accent-rose) 12%, transparent)' }}>
                                <p className="text-[9px] uppercase tracking-[0.1em] mb-1.5" style={{ color: 'var(--accent-rose)', fontWeight: 600 }}>Position B</p>
                                <p className="text-xs" style={{ color: 'var(--muted-foreground)', lineHeight: 1.7 }}>{debate.positionBFr}</p>
                              </div>
                            </div>
                            <div className="rounded-xl p-3.5" style={{ backgroundColor: 'color-mix(in srgb, var(--accent-teal) 6%, transparent)', border: '1px solid color-mix(in srgb, var(--accent-teal) 12%, transparent)' }}>
                              <p className="text-[9px] uppercase tracking-[0.1em] mb-1.5" style={{ color: 'var(--accent-teal)', fontWeight: 600 }}>
                                ✦ {t('Nuance de Luminous', 'Luminous nuance')}
                              </p>
                              <p className="text-xs" style={{ color: 'var(--muted-foreground)', lineHeight: 1.75, fontStyle: 'italic' }}>
                                {lang === 'fr' ? debate.nuanceFr : debate.nuanceEn}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            )}

            {/* Critique / Limits */}
            {(lang === 'fr' ? subject.critiqueFr : subject.critiqueEn) && (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="rounded-2xl p-5 mb-6"
                style={{ backgroundColor: 'color-mix(in srgb, var(--accent-rose) 5%, transparent)', border: '1px solid color-mix(in srgb, var(--accent-rose) 12%, transparent)' }}
              >
                <p className="text-[10px] uppercase tracking-[0.15em] mb-2" style={{ color: 'var(--accent-rose)', fontWeight: 600 }}>
                  <AlertTriangle className="w-3 h-3 inline mr-1" />
                  {t('Limites & Mises en garde', 'Limits & Warnings')}
                </p>
                <p className="text-sm" style={{ color: 'var(--muted-foreground)', lineHeight: 1.85 }}>
                  {lang === 'fr' ? subject.critiqueFr : subject.critiqueEn}
                </p>
              </motion.div>
            )}

            {/* Sources */}
            {((lang === 'fr' ? subject.sourcesFr : subject.sourcesEn) ?? []).length > 0 && (
              <div className="rounded-2xl p-5 mb-6" style={{ backgroundColor: isDark ? 'rgba(255,255,255,0.025)' : 'rgba(255,255,255,0.85)', border: '1px solid var(--border-subtle)' }}>
                <p className="text-[10px] uppercase tracking-[0.2em] mb-3" style={{ color: 'var(--muted-foreground)', fontWeight: 600 }}>
                  <BookOpen className="w-3 h-3 inline mr-1" />
                  {t('Sources & Références', 'Sources & References')}
                </p>
                <ul className="space-y-1.5">
                  {(lang === 'fr' ? subject.sourcesFr : subject.sourcesEn ?? []).map((source, si) => (
                    <li key={si} className="flex items-start gap-2 text-xs" style={{ color: 'var(--muted-foreground)', lineHeight: 1.65 }}>
                      <span style={{ color: subject.color, flexShrink: 0 }}>→</span>
                      {source}
                    </li>
                  ))}
                </ul>
                <Link to="/sources" className="inline-flex items-center gap-1 mt-3 text-xs transition-opacity hover:opacity-80"
                  style={{ color: 'var(--accent-blue)' }}>
                  {t('Bibliothèque complète', 'Full library')} <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
            )}
          </div>

          {/* ── Right Sidebar ── */}
          <div className="space-y-4">

            {/* Figures */}
            {subject.figures && subject.figures.length > 0 && (
              <div className="rounded-2xl p-5" style={{ backgroundColor: isDark ? 'rgba(255,255,255,0.025)' : 'rgba(255,255,255,0.9)', border: '1px solid var(--border-subtle)' }}>
                <p className="text-[10px] uppercase tracking-[0.2em] mb-3" style={{ color: 'var(--muted-foreground)', fontWeight: 600 }}>
                  <User className="w-3 h-3 inline mr-1" />
                  {t('Figures majeures', 'Major figures')}
                </p>
                <div className="space-y-3">
                  {subject.figures.map((figure, fi) => (
                    <div key={fi} className="border-b last:border-b-0 pb-3 last:pb-0" style={{ borderColor: 'var(--border-subtle)' }}>
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <div>
                          <p style={{ fontSize: '0.85rem', color: 'var(--foreground)', fontWeight: 500 }}>{figure.nameFr}</p>
                          {figure.periodFr && <p className="text-[10px]" style={{ color: subject.color }}>{figure.periodFr}</p>}
                        </div>
                        <InfoBadge type={figure.infoType} lang={lang} size="small" />
                      </div>
                      {figure.traditionFr && (
                        <p className="text-[10px] mb-1" style={{ color: 'var(--muted-foreground)', fontStyle: 'italic' }}>{figure.traditionFr}</p>
                      )}
                      <p className="text-xs" style={{ color: 'var(--muted-foreground)', lineHeight: 1.65 }}>
                        {lang === 'fr' ? figure.descFr : figure.descEn}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quotes */}
            {subject.quotes && subject.quotes.length > 0 && (
              <div className="rounded-2xl p-5" style={{ backgroundColor: isDark ? 'rgba(255,255,255,0.025)' : 'rgba(255,255,255,0.9)', border: '1px solid var(--border-subtle)' }}>
                <p className="text-[10px] uppercase tracking-[0.2em] mb-3" style={{ color: 'var(--muted-foreground)', fontWeight: 600 }}>
                  <Quote className="w-3 h-3 inline mr-1" />
                  {t('Citations', 'Quotes')}
                </p>
                <div className="space-y-4">
                  {subject.quotes.map((quote, qi) => (
                    <div key={qi} className="relative pl-3">
                      <div className="absolute left-0 top-0 bottom-0 w-0.5 rounded-full" style={{ backgroundColor: INFO_TYPE_CONFIG[quote.infoType].color }} />
                      <p className="text-xs mb-1.5" style={{ color: 'var(--foreground)', lineHeight: 1.7, fontStyle: 'italic' }}>
                        « {lang === 'fr' ? quote.textFr : (quote.textEn ?? quote.textFr)} »
                      </p>
                      <p className="text-[10px]" style={{ color: INFO_TYPE_CONFIG[quote.infoType].color }}>
                        — {quote.authorFr}
                        {quote.sourceFr && <span style={{ color: 'var(--muted-foreground)' }}>, {quote.sourceFr}</span>}
                      </p>
                      <InfoBadge type={quote.infoType} lang={lang} size="small" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Related subjects */}
            {relatedSubjects.length > 0 && (
              <div className="rounded-2xl p-5" style={{ backgroundColor: isDark ? 'rgba(255,255,255,0.025)' : 'rgba(255,255,255,0.9)', border: '1px solid var(--border-subtle)' }}>
                <p className="text-[10px] uppercase tracking-[0.2em] mb-3" style={{ color: 'var(--muted-foreground)', fontWeight: 600 }}>
                  {t('Sujets liés', 'Related subjects')}
                </p>
                <div className="space-y-2">
                  {relatedSubjects.map((rel) => (
                    <Link key={rel.id} to={`/sujet/${rel.id}`}
                      className="flex items-center gap-2.5 text-xs px-2.5 py-2 rounded-lg transition-all hover:opacity-80 group"
                      style={{ color: 'var(--muted-foreground)' }}>
                      <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: rel.color }} />
                      {lang === 'fr' ? rel.titleFr : rel.titleEn}
                      <ArrowRight className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: rel.color }} />
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Lexicon links */}
            {subject.lexiconIds && subject.lexiconIds.length > 0 && (
              <div className="rounded-2xl p-5" style={{ backgroundColor: isDark ? 'rgba(255,255,255,0.025)' : 'rgba(255,255,255,0.9)', border: '1px solid var(--border-subtle)' }}>
                <p className="text-[10px] uppercase tracking-[0.2em] mb-3" style={{ color: 'var(--muted-foreground)', fontWeight: 600 }}>
                  <BookOpen className="w-3 h-3 inline mr-1" />
                  {t('Notions dans le Lexique', 'Lexicon entries')}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {subject.lexiconIds.map((id) => (
                    <Link key={id} to={`/lexicon/${id}`}
                      className="text-[10px] px-2.5 py-1 rounded-full transition-all hover:opacity-80"
                      style={{ backgroundColor: `color-mix(in srgb, ${subject.color} 10%, transparent)`, color: subject.color, border: `1px solid color-mix(in srgb, ${subject.color} 15%, transparent)` }}>
                      {id.replace(/-/g, ' ')}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Explore more CTA */}
            <div className="rounded-2xl p-4" style={{ backgroundColor: `color-mix(in srgb, ${subject.color} 6%, transparent)`, border: `1px solid color-mix(in srgb, ${subject.color} 15%, transparent)` }}>
              <p className="text-[10px] uppercase tracking-[0.15em] mb-2" style={{ color: subject.color, fontWeight: 600 }}>
                {t('Explorer Luminous', 'Explore Luminous')}
              </p>
              <div className="space-y-1">
                {[
                  { to: '/recherche', label: t('Recherche avancée', 'Advanced search') },
                  { to: '/comparer', label: t('Fiches comparatives', 'Comparisons') },
                  { to: '/parcours', label: t('Parcours de lecture', 'Reading paths') },
                  { to: '/questions', label: t('Questions fréquentes', 'FAQ') },
                ].map((link) => (
                  <Link key={link.to} to={link.to}
                    className="flex items-center gap-2 text-xs px-2 py-1.5 rounded-lg transition-all hover:opacity-80"
                    style={{ color: 'var(--muted-foreground)' }}>
                    <Star className="w-3 h-3 flex-shrink-0" style={{ color: subject.color }} />
                    {link.label}
                    <ArrowRight className="w-3 h-3 ml-auto opacity-30" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
