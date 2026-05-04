import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, ArrowRight, Flame, Eye, Hexagon, BookOpen, Infinity as InfinityIcon } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useLang } from './LanguageContext';
import { useTheme } from './ThemeContext';
import { lexiconEntries, categoryConfig } from './lexiconData';
import { sanitizeSearchQuery } from './sanitize';

interface SearchOverlayProps {
  open: boolean;
  onClose: () => void;
}

const pageLinks = [
  { path: '/', labelFr: 'Accueil', labelEn: 'Home', icon: '✦' },
  { path: '/alchemy', labelFr: 'Alchimie', labelEn: 'Alchemy', icon: Flame },
  { path: '/symbolism', labelFr: 'Symbolisme', labelEn: 'Symbolism', icon: Eye },
  { path: '/numerology', labelFr: 'Numérologie', labelEn: 'Numerology', icon: InfinityIcon },
  { path: '/sacred-geometry', labelFr: 'Géométrie Sacrée', labelEn: 'Sacred Geometry', icon: Hexagon },
  { path: '/lexicon', labelFr: 'Lexique', labelEn: 'Lexicon', icon: BookOpen },
];

export function SearchOverlay({ open, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { t, lang } = useLang();
  const { isDark } = useTheme();
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (open) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  // Keyboard shortcut ⌘K / Ctrl+K
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (open) onClose();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, onClose]);

  const normalizeStr = useCallback((str: string) => {
    return str
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }, []);

  const results = useMemo(() => {
    if (!query.trim()) return { pages: pageLinks, terms: [] };

    const q = normalizeStr(query);

    const matchedPages = pageLinks.filter((p) => {
      const label = normalizeStr(lang === 'fr' ? p.labelFr : p.labelEn);
      return label.includes(q);
    });

    const matchedTerms = lexiconEntries.filter((entry) => {
      const term = normalizeStr(lang === 'fr' ? entry.termFr : entry.termEn);
      const def = normalizeStr(lang === 'fr' ? entry.definitionFr : entry.definitionEn);
      const catLabel = normalizeStr(
        lang === 'fr'
          ? categoryConfig[entry.category].labelFr
          : categoryConfig[entry.category].labelEn
      );
      return term.includes(q) || def.includes(q) || catLabel.includes(q);
    });

    return { pages: matchedPages, terms: matchedTerms.slice(0, 8) };
  }, [query, lang, normalizeStr]);

  const allItems = useMemo(() => {
    const items: Array<{ type: 'page'; data: (typeof pageLinks)[0] } | { type: 'term'; data: (typeof lexiconEntries)[0] }> = [];
    results.pages.forEach((p) => items.push({ type: 'page', data: p }));
    results.terms.forEach((t) => items.push({ type: 'term', data: t }));
    return items;
  }, [results]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleNavigate = useCallback(
    (path: string) => {
      navigate(path);
      onClose();
    },
    [navigate, onClose]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => Math.min(prev + 1, allItems.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => Math.max(prev - 1, 0));
      } else if (e.key === 'Enter' && allItems.length > 0) {
        e.preventDefault();
        const item = allItems[selectedIndex];
        if (item.type === 'page') {
          handleNavigate(item.data.path);
        } else {
          handleNavigate(`/lexicon?term=${item.data.id}`);
        }
      } else if (e.key === 'Escape') {
        onClose();
      }
    },
    [allItems, selectedIndex, handleNavigate, onClose]
  );

  const categoryIcon = (cat: keyof typeof categoryConfig) => {
    const Icon = categoryConfig[cat].icon;
    return <Icon className="w-3.5 h-3.5" style={{ color: categoryConfig[cat].color }} />;
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[200]"
            style={{ backgroundColor: isDark ? 'rgba(0,0,0,0.7)' : 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)' }}
            onClick={onClose}
          />

          {/* Search Modal */}
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-[15vh] left-1/2 -translate-x-1/2 z-[201] w-[90vw] max-w-[580px]"
          >
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                backgroundColor: isDark ? 'rgba(24, 20, 36, 0.98)' : 'rgba(255, 255, 255, 0.98)',
                border: '1px solid var(--border)',
                boxShadow: isDark
                  ? '0 24px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(155,142,230,0.1)'
                  : '0 24px 80px rgba(0,0,0,0.15), 0 0 0 1px rgba(123,111,200,0.08)',
              }}
            >
              {/* Search Input */}
              <div className="flex items-center gap-3 px-5 py-4" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                <Search className="w-5 h-5 flex-shrink-0" style={{ color: 'var(--accent-purple)', opacity: 0.6 }} />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(sanitizeSearchQuery(e.target.value))}
                  onKeyDown={handleKeyDown}
                  placeholder={t('Rechercher un terme, une page…', 'Search a term, a page…')}
                  className="flex-1 bg-transparent outline-none text-sm"
                  style={{ color: 'var(--foreground)' }}
                  autoComplete="off"
                  autoCorrect="off"
                  spellCheck={false}
                  maxLength={200}
                />
                <div className="flex items-center gap-1.5">
                  <kbd
                    className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded text-[10px]"
                    style={{
                      backgroundColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)',
                      color: 'var(--muted-foreground)',
                      border: '1px solid var(--border-subtle)',
                    }}
                  >
                    ESC
                  </kbd>
                  <button onClick={onClose} className="p-1 rounded-lg transition-colors hover:bg-[var(--muted)]">
                    <X className="w-4 h-4" style={{ color: 'var(--muted-foreground)' }} />
                  </button>
                </div>
              </div>

              {/* Results */}
              <div data-lenis-prevent className="max-h-[50vh] overflow-y-auto py-2 px-2">
                {/* Pages */}
                {results.pages.length > 0 && (
                  <div className="mb-2">
                    <div className="px-3 py-1.5 text-[10px] uppercase tracking-[0.2em]" style={{ color: 'var(--muted-foreground)' }}>
                      {t('Pages', 'Pages')}
                    </div>
                    {results.pages.map((page, i) => {
                      const globalIdx = i;
                      const isSelected = globalIdx === selectedIndex;
                      const Icon = typeof page.icon === 'string' ? null : page.icon;
                      return (
                        <button
                          key={page.path}
                          onClick={() => handleNavigate(page.path)}
                          onMouseEnter={() => setSelectedIndex(globalIdx)}
                          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-colors"
                          style={{
                            backgroundColor: isSelected
                              ? isDark
                                ? 'rgba(155,142,230,0.1)'
                                : 'var(--surface-purple)'
                              : 'transparent',
                          }}
                        >
                          <div
                            className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                            style={{
                              backgroundColor: isDark ? 'rgba(155,142,230,0.12)' : 'var(--surface-purple)',
                              border: '1px solid var(--border-subtle)',
                            }}
                          >
                            {Icon ? (
                              <Icon className="w-4 h-4" style={{ color: 'var(--accent-purple)' }} />
                            ) : (
                              <span style={{ color: 'var(--accent-purple)', fontSize: '0.8rem' }}>{page.icon}</span>
                            )}
                          </div>
                          <span className="flex-1 text-sm" style={{ color: 'var(--foreground)' }}>
                            {lang === 'fr' ? page.labelFr : page.labelEn}
                          </span>
                          <ArrowRight className="w-3.5 h-3.5" style={{ color: 'var(--muted-foreground)', opacity: isSelected ? 1 : 0 }} />
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Lexicon Terms */}
                {results.terms.length > 0 && (
                  <div>
                    <div className="px-3 py-1.5 text-[10px] uppercase tracking-[0.2em]" style={{ color: 'var(--muted-foreground)' }}>
                      {t('Lexique', 'Lexicon')}
                    </div>
                    {results.terms.map((entry, i) => {
                      const globalIdx = results.pages.length + i;
                      const isSelected = globalIdx === selectedIndex;
                      const cat = categoryConfig[entry.category];
                      return (
                        <button
                          key={entry.id}
                          onClick={() => handleNavigate(`/lexicon?term=${entry.id}`)}
                          onMouseEnter={() => setSelectedIndex(globalIdx)}
                          className="w-full flex items-start gap-3 px-3 py-2.5 rounded-xl text-left transition-colors"
                          style={{
                            backgroundColor: isSelected
                              ? isDark
                                ? 'rgba(155,142,230,0.1)'
                                : 'var(--surface-purple)'
                              : 'transparent',
                          }}
                        >
                          <div
                            className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                            style={{
                              backgroundColor: cat.surface,
                              border: '1px solid var(--border-subtle)',
                            }}
                          >
                            {categoryIcon(entry.category)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-sm" style={{ color: 'var(--foreground)' }}>
                                {lang === 'fr' ? entry.termFr : entry.termEn}
                              </span>
                              <span className="text-[10px] px-1.5 py-0.5 rounded-full" style={{ backgroundColor: cat.surface, color: cat.color }}>
                                {lang === 'fr' ? cat.labelFr : cat.labelEn}
                              </span>
                            </div>
                            <p
                              className="text-xs mt-0.5 line-clamp-1"
                              style={{ color: 'var(--muted-foreground)' }}
                            >
                              {lang === 'fr' ? entry.definitionFr : entry.definitionEn}
                            </p>
                          </div>
                          <ArrowRight
                            className="w-3.5 h-3.5 mt-1.5 flex-shrink-0"
                            style={{ color: 'var(--muted-foreground)', opacity: isSelected ? 1 : 0 }}
                          />
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Empty state */}
                {results.pages.length === 0 && results.terms.length === 0 && query.trim() && (
                  <div className="py-10 text-center">
                    <Search className="w-8 h-8 mx-auto mb-3" style={{ color: 'var(--muted-foreground)', opacity: 0.3 }} />
                    <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
                      {t('Aucun résultat trouvé', 'No results found')}
                    </p>
                    <p className="text-xs mt-1" style={{ color: 'var(--muted-foreground)', opacity: 0.6 }}>
                      {t('Essayez un autre terme', 'Try another term')}
                    </p>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div
                className="px-5 py-2.5 flex items-center justify-between text-[10px]"
                style={{ borderTop: '1px solid var(--border-subtle)', color: 'var(--muted-foreground)' }}
              >
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <kbd className="px-1 py-0.5 rounded" style={{ backgroundColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)', border: '1px solid var(--border-subtle)' }}>↑↓</kbd>
                    {t('naviguer', 'navigate')}
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="px-1 py-0.5 rounded" style={{ backgroundColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)', border: '1px solid var(--border-subtle)' }}>↵</kbd>
                    {t('ouvrir', 'open')}
                  </span>
                </div>
                <span>{lexiconEntries.length} {t('termes indexés', 'indexed terms')}</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}