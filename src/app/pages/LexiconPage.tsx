import { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Search, X, BookOpen, ArrowRight, Heart } from 'lucide-react';
import { Link, useSearchParams } from 'react-router';
import { useLang } from '../components/LanguageContext';
import { useTheme } from '../components/ThemeContext';
import { useFavorites } from '../components/FavoritesContext';
import { BentoCard } from '../components/BentoCard';
import { SectionDivider } from '../components/SectionDivider';
import { MouseParallax, MagneticElement } from '../components/FloatingElements';
import { lexiconEntries, categoryConfig, type LexiconEntry } from '../components/lexiconData';
import { toast } from 'sonner';
import { sanitizeSlug, sanitizeSearchQuery, sanitizeParam } from '../components/sanitize';

type CategoryFilter = 'all' | 'favorites' | 'alchemy' | 'symbolism' | 'numerology' | 'geometry' | 'consciousness' | 'cosmology';

function TermCard({
  entry,
  isExpanded,
  onToggle,
  lang,
}: {
  entry: LexiconEntry;
  isExpanded: boolean;
  onToggle: () => void;
  lang: 'fr' | 'en';
}) {
  const cat = categoryConfig[entry.category];
  const Icon = cat.icon;
  const term = lang === 'fr' ? entry.termFr : entry.termEn;
  const definition = lang === 'fr' ? entry.definitionFr : entry.definitionEn;
  const { t } = useLang();
  const { isFavorite, toggleFavorite } = useFavorites();
  const isFav = isFavorite(entry.id);

  const relatedTerms = entry.relatedIds
    ? entry.relatedIds
        .map((id) => lexiconEntries.find((e) => e.id === id))
        .filter(Boolean) as LexiconEntry[]
    : [];

  return (
    <motion.div
      layout
      className="rounded-2xl overflow-hidden transition-all duration-300 group"
      style={{
        backgroundColor: 'var(--card)',
        border: `1px solid ${isExpanded ? cat.color : 'var(--border)'}`,
        borderColor: isExpanded ? cat.color : undefined,
        borderTopColor: isExpanded ? cat.color : undefined,
        boxShadow: isExpanded ? `0 4px 24px ${cat.glow}, 0 0 0 1px ${cat.glow}` : 'var(--card-shadow)',
      }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Top accent line */}
      <div
        className="h-[2px]"
        style={{
          background: `linear-gradient(90deg, transparent, ${cat.color}, transparent)`,
          opacity: isExpanded ? 0.8 : 0.3,
        }}
      />

      <div className="p-5">
        <div className="flex items-start gap-3 cursor-pointer" onClick={onToggle}>
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: cat.surface }}
          >
            <Icon className="w-5 h-5" style={{ color: cat.color }} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="truncate" style={{ fontSize: '1.1rem' }}>
                {term}
              </h4>
              <span
                className="text-[10px] px-2 py-0.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: cat.surface, color: cat.color }}
              >
                {lang === 'fr' ? cat.labelFr : cat.labelEn}
              </span>
            </div>
            <p
              className={`text-sm ${isExpanded ? '' : 'line-clamp-2'}`}
              style={{ color: 'var(--muted-foreground)', lineHeight: 1.7 }}
            >
              {definition}
            </p>
          </div>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="flex-shrink-0 mt-1"
          >
            <ChevronDown className="w-4 h-4" style={{ color: 'var(--muted-foreground)' }} />
          </motion.div>
        </div>

        {/* Expanded content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div
                className="mt-4 pt-4"
                style={{ borderTop: '1px solid var(--border-subtle)' }}
              >
                {/* Actions row */}
                <div className="flex items-center gap-2 mb-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(entry.id);
                      if (!isFav) {
                        toast.success(t('Ajouté aux favoris', 'Added to favorites'), { description: term });
                      } else {
                        toast(t('Retiré des favoris', 'Removed from favorites'), { description: term });
                      }
                    }}
                    className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full transition-all"
                    style={{
                      backgroundColor: isFav ? 'rgba(224,102,126,0.1)' : 'var(--muted)',
                      color: isFav ? 'var(--accent-rose)' : 'var(--muted-foreground)',
                      border: `1px solid ${isFav ? 'var(--accent-rose)' : 'var(--border-subtle)'}`,
                    }}
                  >
                    <Heart className="w-3 h-3" style={{ fill: isFav ? 'var(--accent-rose)' : 'none' }} />
                    {isFav ? t('Favori', 'Favorite') : t('Ajouter', 'Add')}
                  </button>
                  <Link
                    to={`/lexicon/${entry.id}`}
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full transition-all"
                    style={{
                      backgroundColor: cat.surface,
                      color: cat.color,
                      border: '1px solid var(--border-subtle)',
                    }}
                  >
                    {t('Lire l\'article', 'Read article')}
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>

                {relatedTerms.length > 0 && (
                  <>
                    <span className="text-[10px] uppercase tracking-[0.2em] mb-3 block" style={{ color: 'var(--muted-foreground)' }}>
                      {t('Termes liés', 'Related Terms')}
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {relatedTerms.map((related) => {
                        const relCat = categoryConfig[related.category];
                        return (
                          <Link
                            key={related.id}
                            to={`/lexicon/${related.id}`}
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full transition-colors hover:opacity-80"
                            style={{
                              backgroundColor: relCat.surface,
                              color: relCat.color,
                              border: '1px solid var(--border-subtle)',
                            }}
                          >
                            {lang === 'fr' ? related.termFr : related.termEn}
                          </Link>
                        );
                      })}
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export function LexiconPage() {
  const { t, lang } = useLang();
  const { isDark } = useTheme();
  const { favorites, toggleFavorite } = useFavorites();
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // If a term is specified in the URL, expand it
  useEffect(() => {
    const rawTermId = searchParams.get('term');
    const termId = rawTermId ? sanitizeSlug(rawTermId) : null;
    if (termId) {
      setExpandedId(termId);
      const entry = lexiconEntries.find((e) => e.id === termId);
      if (entry) {
        setActiveFilter('all');
      }
      // Scroll to the term after render
      setTimeout(() => {
        const el = document.getElementById(`term-${termId}`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 400);
    }
    // Check for filter param
    const filterParam = sanitizeParam(searchParams.get('filter'));
    if (filterParam === 'favorites') {
      setActiveFilter('favorites');
    }
  }, [searchParams]);

  const normalizeStr = useCallback((str: string) => {
    return str
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }, []);

  const filteredEntries = useMemo(() => {
    let entries = lexiconEntries;

    if (activeFilter !== 'all') {
      if (activeFilter === 'favorites') {
        entries = entries.filter((e) => favorites.includes(e.id));
      } else {
        entries = entries.filter((e) => e.category === activeFilter);
      }
    }

    if (searchQuery.trim()) {
      const q = normalizeStr(searchQuery);
      entries = entries.filter((e) => {
        const term = normalizeStr(lang === 'fr' ? e.termFr : e.termEn);
        const def = normalizeStr(lang === 'fr' ? e.definitionFr : e.definitionEn);
        return term.includes(q) || def.includes(q);
      });
    }

    return entries;
  }, [activeFilter, searchQuery, lang, normalizeStr, favorites]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: lexiconEntries.length, favorites: favorites.length };
    lexiconEntries.forEach((e) => {
      counts[e.category] = (counts[e.category] || 0) + 1;
    });
    return counts;
  }, [favorites]);

  const filters: { key: CategoryFilter; labelFr: string; labelEn: string; color: string }[] = [
    { key: 'all', labelFr: 'Tout', labelEn: 'All', color: 'var(--accent-purple)' },
    { key: 'favorites', labelFr: 'Favoris', labelEn: 'Favorites', color: 'var(--accent-rose)' },
    { key: 'alchemy', labelFr: 'Alchimie', labelEn: 'Alchemy', color: categoryConfig.alchemy.color },
    { key: 'symbolism', labelFr: 'Symbolisme', labelEn: 'Symbolism', color: categoryConfig.symbolism.color },
    { key: 'numerology', labelFr: 'Numérologie', labelEn: 'Numerology', color: categoryConfig.numerology.color },
    { key: 'geometry', labelFr: 'Géométrie', labelEn: 'Geometry', color: categoryConfig.geometry.color },
    { key: 'consciousness', labelFr: 'Conscience', labelEn: 'Consciousness', color: categoryConfig.consciousness.color },
    { key: 'cosmology', labelFr: 'Cosmologie', labelEn: 'Cosmology', color: categoryConfig.cosmology.color },
  ];

  return (
    <div className="pt-16 pb-8 px-6 lg:px-12">
      <div className="max-w-[1600px] mx-auto">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative mb-16 pt-16 pb-8 text-center"
        >
          {/* Background decoration */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <motion.svg
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              width="500" height="500" viewBox="0 0 500 500"
              style={{ opacity: 0.02 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
            >
              <circle cx="250" cy="250" r="240" stroke="currentColor" strokeWidth="0.5" fill="none" />
              <circle cx="250" cy="250" r="180" stroke="currentColor" strokeWidth="0.4" fill="none" />
              <circle cx="250" cy="250" r="120" stroke="currentColor" strokeWidth="0.3" fill="none" />
              {/* Book shape */}
              <path d="M200 150 L250 130 L300 150 L300 350 L250 330 L200 350 Z" stroke="currentColor" strokeWidth="0.5" fill="none" />
              <line x1="250" y1="130" x2="250" y2="330" stroke="currentColor" strokeWidth="0.3" />
            </motion.svg>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="relative z-10"
          >
            <MouseParallax intensity={15} className="inline-block">
              <MagneticElement intensity={0.15}>
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.3, type: 'spring', stiffness: 200, damping: 20 }}
                  className="inline-flex items-center justify-center rounded-full mb-8 relative"
                  style={{ backgroundColor: 'var(--surface-purple)', width: 64, height: 64 }}
                >
                  <BookOpen className="w-7 h-7" style={{ color: 'var(--accent-purple)' }} />
                  <div
                    className="absolute inset-0 rounded-full blur-2xl"
                    style={{ backgroundColor: 'var(--accent-purple)', opacity: 0.15 }}
                  />
                </motion.div>
              </MagneticElement>
            </MouseParallax>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xs uppercase tracking-[0.35em] mb-5"
              style={{ color: 'var(--accent-purple)', fontWeight: 500 }}
            >
              {t('Glossaire des termes sacrés', 'Glossary of Sacred Terms')}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="mb-5"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
            >
              {t('Lexique', 'Lexicon')}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="max-w-lg mx-auto"
              style={{ color: 'var(--muted-foreground)', lineHeight: 1.8 }}
            >
              {t(
                'Explorez les termes fondamentaux qui tissent la trame du savoir ésotérique, de l\'alchimie à la géométrie sacrée.',
                'Explore the fundamental terms that weave the fabric of esoteric knowledge, from alchemy to sacred geometry.'
              )}
            </motion.p>
          </motion.div>
        </motion.div>

        {/* Search + Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="mb-10"
        >
          {/* Search Input */}
          <div
            className="rounded-2xl px-5 py-3.5 flex items-center gap-3 mb-5 transition-all duration-300"
            style={{
              backgroundColor: 'var(--card)',
              border: '1px solid var(--border)',
              boxShadow: 'var(--card-shadow)',
            }}
          >
            <Search className="w-5 h-5 flex-shrink-0" style={{ color: 'var(--accent-purple)', opacity: 0.5 }} />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(sanitizeSearchQuery(e.target.value))}
              placeholder={t('Rechercher dans le lexique…', 'Search the lexicon…')}
              className="flex-1 bg-transparent outline-none text-sm"
              style={{ color: 'var(--foreground)' }}
              autoComplete="off"
              autoCorrect="off"
              spellCheck={false}
              maxLength={200}
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="p-1 rounded-lg hover:bg-[var(--muted)] transition-colors">
                <X className="w-4 h-4" style={{ color: 'var(--muted-foreground)' }} />
              </button>
            )}
            <span className="text-xs hidden sm:block" style={{ color: 'var(--muted-foreground)' }}>
              {filteredEntries.length} {t('résultats', 'results')}
            </span>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => {
              const isActive = activeFilter === filter.key;
              return (
                <motion.button
                  key={filter.key}
                  onClick={() => setActiveFilter(filter.key)}
                  className="px-4 py-2 rounded-full text-sm transition-all duration-300 flex items-center gap-2"
                  style={{
                    backgroundColor: isActive
                      ? isDark
                        ? `color-mix(in srgb, ${filter.color} 20%, transparent)`
                        : filter.key === 'all'
                        ? 'var(--surface-purple)'
                        : categoryConfig[filter.key as keyof typeof categoryConfig]?.surface || 'var(--surface-purple)'
                      : 'transparent',
                    color: isActive ? filter.color : 'var(--muted-foreground)',
                    border: `1px solid ${isActive ? filter.color : 'var(--border)'}`,
                    borderColor: isActive ? filter.color : undefined,
                  }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <span>{lang === 'fr' ? filter.labelFr : filter.labelEn}</span>
                  <span
                    className="text-[10px] px-1.5 py-0.5 rounded-full"
                    style={{
                      backgroundColor: isActive ? `color-mix(in srgb, ${filter.color} 15%, transparent)` : 'var(--muted)',
                      color: isActive ? filter.color : 'var(--muted-foreground)',
                    }}
                  >
                    {categoryCounts[filter.key] || 0}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        <SectionDivider color="var(--accent-purple)" symbol="diamond" />

        {/* Entries Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          <AnimatePresence mode="popLayout">
            {filteredEntries.map((entry) => (
              <div key={entry.id} id={`term-${entry.id}`}>
                <TermCard
                  entry={entry}
                  isExpanded={expandedId === entry.id}
                  onToggle={() => setExpandedId(expandedId === entry.id ? null : entry.id)}
                  lang={lang}
                />
              </div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty state */}
        {filteredEntries.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-20 text-center"
          >
            <Search className="w-10 h-10 mx-auto mb-4" style={{ color: 'var(--muted-foreground)', opacity: 0.25 }} />
            <p className="text-sm mb-2" style={{ color: 'var(--muted-foreground)' }}>
              {t('Aucun terme trouvé', 'No terms found')}
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveFilter('all');
              }}
              className="text-sm underline underline-offset-4 transition-colors"
              style={{ color: 'var(--accent-purple)' }}
            >
              {t('Réinitialiser les filtres', 'Reset filters')}
            </button>
          </motion.div>
        )}

        <SectionDivider color="var(--accent-blue)" symbol="star" />

        {/* Stats footer */}
        <BentoCard
          className="mb-6"
          style={{
            background: 'linear-gradient(135deg, var(--surface-purple) 0%, var(--surface-blue) 50%, var(--surface-rose) 100%)',
          }}
          decorative="circle"
          glowColor="var(--glow-purple)"
        >
          <div className="py-8 text-center">
            <p className="text-xs uppercase tracking-[0.25em] mb-6" style={{ color: 'var(--muted-foreground)', fontWeight: 500 }}>
              {t('Base de connaissances', 'Knowledge Base')}
            </p>
            <div className="flex items-center justify-center gap-8 md:gap-16 flex-wrap">
              {Object.entries(categoryConfig).map(([key, cat]) => {
                const count = categoryCounts[key] || 0;
                const CatIcon = cat.icon;
                return (
                  <motion.button
                    key={key}
                    onClick={() => {
                      setActiveFilter(key as CategoryFilter);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="flex flex-col items-center gap-2 group"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center transition-colors"
                      style={{ backgroundColor: cat.surface, border: '1px solid var(--border-subtle)' }}
                    >
                      <CatIcon className="w-5 h-5" style={{ color: cat.color }} />
                    </div>
                    <span
                      style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.5rem', fontWeight: 700, color: cat.color }}
                    >
                      {count}
                    </span>
                    <span className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
                      {lang === 'fr' ? cat.labelFr : cat.labelEn}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </BentoCard>

        {/* CTA to go back */}
        <div className="text-center pt-4 pb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm transition-colors"
            style={{ color: 'var(--accent-purple)' }}
          >
            <span>{t("Retour à l'accueil", 'Back to Home')}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}