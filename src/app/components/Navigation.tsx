import { Link, useLocation } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Sun, Moon, Menu, X, Flame, Eye, Infinity as InfinityIcon, Hexagon, Search, BookOpen, ChevronDown, Heart, Map, Library, Waves, Globe, ArrowUpRight, Clock, Scale, HelpCircle, Compass, Layers } from 'lucide-react';
import { useTheme } from './ThemeContext';
import { useLang } from './LanguageContext';
import { useState, useEffect, useCallback, useRef } from 'react';
import { MagneticElement } from './FloatingElements';
import { SearchOverlay } from './SearchOverlay';
import { useFavorites } from './FavoritesContext';

const categoryItems = [
  {
    to: '/alchemy',
    icon: Flame,
    color: 'var(--accent-purple)',
    surface: 'var(--surface-purple)',
    labelFr: 'Alchimie',
    labelEn: 'Alchemy',
    descFr: "L'art de la transformation",
    descEn: 'The art of transformation',
  },
  {
    to: '/symbolism',
    icon: Eye,
    color: 'var(--accent-blue)',
    surface: 'var(--surface-blue)',
    labelFr: 'Symbolisme',
    labelEn: 'Symbolism',
    descFr: "Le langage de l'invisible",
    descEn: 'The language of the invisible',
  },
  {
    to: '/numerology',
    icon: InfinityIcon,
    color: 'var(--accent-rose)',
    surface: 'var(--surface-rose)',
    labelFr: 'Numérologie',
    labelEn: 'Numerology',
    descFr: 'La sagesse des nombres',
    descEn: 'The wisdom of numbers',
  },
  {
    to: '/sacred-geometry',
    icon: Hexagon,
    color: 'var(--accent-gold)',
    surface: 'var(--surface-gold)',
    labelFr: 'Géométrie Sacrée',
    labelEn: 'Sacred Geometry',
    descFr: 'Les formes du divin',
    descEn: 'The shapes of the divine',
  },
  {
    to: '/conscience',
    icon: Waves,
    color: 'var(--accent-teal)',
    surface: 'var(--surface-teal)',
    labelFr: 'Conscience & Éveil',
    labelEn: 'Consciousness & Awakening',
    descFr: 'Chakras, éveil et énergie',
    descEn: 'Chakras, awakening and energy',
  },
  {
    to: '/cosmologie',
    icon: Globe,
    color: 'var(--accent-cosmic)',
    surface: 'var(--surface-cosmic)',
    labelFr: 'Cosmologie Sacrée',
    labelEn: 'Sacred Cosmology',
    descFr: 'Archanges et mémoire stellaire',
    descEn: 'Archangels and stellar memory',
  },
];

const exploreLinks = [
  {
    to: '/savoirs',
    icon: Layers,
    color: 'var(--accent-purple)',
    surface: 'var(--surface-purple)',
    labelFr: 'Bibliothèque de Savoirs',
    labelEn: 'Knowledge Library',
    descFr: 'Sujets approfondis avec sources',
    descEn: 'Deep subjects with sources',
  },
  {
    to: '/lexicon',
    icon: BookOpen,
    color: 'var(--accent-blue)',
    surface: 'var(--surface-blue)',
    labelFr: 'Lexique (73 termes)',
    labelEn: 'Lexicon (73 terms)',
    descFr: 'Tous les termes & concepts',
    descEn: 'All terms & concepts',
  },
  {
    to: '/carte',
    icon: Map,
    color: 'var(--accent-teal)',
    surface: 'var(--surface-teal)',
    labelFr: 'Atlas Sacré',
    labelEn: 'Sacred Atlas',
    descFr: 'Carte interactive des traditions du monde',
    descEn: 'Interactive map of world traditions',
  },
  {
    to: '/chronologie',
    icon: Clock,
    color: 'var(--accent-gold)',
    surface: 'var(--surface-gold)',
    labelFr: 'Chronologie',
    labelEn: 'Timeline',
    descFr: '35 000 ans de sagesse humaine',
    descEn: '35,000 years of human wisdom',
  },
  {
    to: '/comparer',
    icon: Scale,
    color: 'var(--accent-rose)',
    surface: 'var(--surface-rose)',
    labelFr: 'Comparaisons',
    labelEn: 'Comparisons',
    descFr: 'Notions proches et distinctions',
    descEn: 'Similar notions and distinctions',
  },
  {
    to: '/questions',
    icon: HelpCircle,
    color: 'var(--accent-rose)',
    surface: 'var(--surface-rose)',
    labelFr: 'Questions',
    labelEn: 'Questions',
    descFr: 'Vraies questions, réponses rigoureuses',
    descEn: 'Real questions, rigorous answers',
  },
  {
    to: '/parcours',
    icon: Compass,
    color: 'var(--accent-mint)',
    surface: 'var(--surface-mint)',
    labelFr: 'Parcours de lecture',
    labelEn: 'Reading Paths',
    descFr: 'Exploration guidée selon votre intention',
    descEn: 'Guided exploration by intention',
  },
  {
    to: '/sources',
    icon: Library,
    color: 'var(--accent-gold)',
    surface: 'var(--surface-gold)',
    labelFr: 'Sources & Bibliographie',
    labelEn: 'Sources & Bibliography',
    descFr: 'Références et thinkers',
    descEn: 'References and thinkers',
  },
];

export function Navigation() {
  const location = useLocation();
  const { isDark, toggleTheme } = useTheme();
  const { lang, toggleLang, t } = useLang();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { count: favCount } = useFavorites();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout>>();

  const handleSearchClose = useCallback(() => {
    setSearchOpen(false);
  }, []);

  useEffect(() => {
    setDropdownOpen(false);
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const isOnCategoryPage = categoryItems.some((c) => location.pathname === c.to);
  const isOnLexicon = location.pathname.startsWith('/lexicon');
  const isOnAscension = location.pathname === '/ascension';

  const handleDropdownEnter = () => {
    clearTimeout(dropdownTimeout.current);
    setDropdownOpen(true);
  };

  const handleDropdownLeave = () => {
    dropdownTimeout.current = setTimeout(() => setDropdownOpen(false), 200);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-[100]">
        <div
          className="mx-auto backdrop-blur-2xl"
          style={{
            borderBottom: '1px solid var(--border-subtle)',
            backgroundColor: isDark ? 'rgba(13, 11, 20, 0.9)' : 'rgba(246, 244, 250, 0.9)',
          }}
        >
          <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-3.5">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <Link to="/" className="flex items-center gap-2.5 group flex-shrink-0">
                <MagneticElement intensity={0.3}>
                  <motion.div
                    whileHover={{ rotate: 180, scale: 1.1 }}
                    transition={{ duration: 0.6, ease: 'easeInOut' }}
                    className="relative"
                  >
                    <Sparkles className="w-5 h-5" style={{ color: 'var(--accent-purple)' }} />
                    <div
                      className="absolute inset-0 blur-lg rounded-full"
                      style={{ backgroundColor: 'var(--accent-purple)', opacity: 0.3 }}
                    />
                  </motion.div>
                </MagneticElement>
                <span
                  className="text-sm tracking-[0.2em] uppercase hidden sm:inline"
                  style={{ fontWeight: 500, color: 'var(--foreground)' }}
                >
                  Luminous
                </span>
              </Link>

              {/* Center Nav — Desktop */}
              <div className="hidden md:flex items-center gap-1">
                {/* Explorer Dropdown */}
                <div
                  ref={dropdownRef}
                  className="relative"
                  onMouseEnter={handleDropdownEnter}
                  onMouseLeave={handleDropdownLeave}
                >
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="relative px-4 py-2 flex items-center gap-2 transition-all duration-300 rounded-full"
                    style={{
                      backgroundColor: isOnCategoryPage || dropdownOpen
                        ? isDark ? 'rgba(155, 142, 230, 0.1)' : 'var(--surface-purple)'
                        : 'transparent',
                      border: isOnCategoryPage || dropdownOpen ? '1px solid var(--border-subtle)' : '1px solid transparent',
                    }}
                  >
                    <Sparkles
                      className="w-3.5 h-3.5 transition-colors duration-300"
                      style={{
                        color: isOnCategoryPage ? 'var(--accent-purple)' : 'var(--muted-foreground)',
                        opacity: isOnCategoryPage ? 1 : 0.6,
                      }}
                    />
                    <span
                      className="text-sm transition-colors duration-300"
                      style={{
                        color: isOnCategoryPage ? 'var(--foreground)' : 'var(--muted-foreground)',
                        fontWeight: isOnCategoryPage ? 500 : 400,
                      }}
                    >
                      {t('Explorer', 'Explore')}
                    </span>
                    <motion.div
                      animate={{ rotate: dropdownOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="w-3 h-3" style={{ color: 'var(--muted-foreground)', opacity: 0.5 }} />
                    </motion.div>
                  </button>

                  {/* Dropdown Panel */}
                  <AnimatePresence>
                    {dropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.96 }}
                        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[500px] rounded-2xl overflow-hidden"
                        style={{
                          backgroundColor: isDark ? 'rgba(24, 20, 36, 0.98)' : 'rgba(255, 255, 255, 0.98)',
                          border: '1px solid var(--border)',
                          boxShadow: isDark
                            ? '0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(155,142,230,0.08)'
                            : '0 20px 60px rgba(0,0,0,0.08), 0 0 0 1px rgba(155,142,230,0.06)',
                          backdropFilter: 'blur(24px)',
                        }}
                        onMouseEnter={handleDropdownEnter}
                        onMouseLeave={handleDropdownLeave}
                      >
                        {/* Section: Savoirs */}
                        <div className="p-3">
                          <p
                            className="text-[9px] uppercase tracking-[0.3em] px-3 py-1.5 mb-1"
                            style={{ color: 'var(--muted-foreground)', opacity: 0.5, fontWeight: 500 }}
                          >
                            {t('Savoirs', 'Knowledge')}
                          </p>
                          <div className="grid grid-cols-2 gap-0.5">
                            {categoryItems.map((cat) => {
                              const isActive = location.pathname === cat.to;
                              const CatIcon = cat.icon;
                              return (
                                <Link
                                  key={cat.to}
                                  to={cat.to}
                                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group"
                                  style={{
                                    backgroundColor: isActive
                                      ? isDark ? 'rgba(155,142,230,0.1)' : cat.surface
                                      : 'transparent',
                                  }}
                                >
                                  <div
                                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover:scale-110"
                                    style={{ backgroundColor: cat.surface }}
                                  >
                                    <CatIcon className="w-4 h-4" style={{ color: cat.color }} />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <span className="text-xs block truncate" style={{ fontWeight: isActive ? 600 : 500, color: 'var(--foreground)' }}>
                                      {lang === 'fr' ? cat.labelFr : cat.labelEn}
                                    </span>
                                    <span className="text-[10px] truncate block" style={{ color: 'var(--muted-foreground)', opacity: 0.7 }}>
                                      {lang === 'fr' ? cat.descFr : cat.descEn}
                                    </span>
                                  </div>
                                  {isActive && <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: cat.color }} />}
                                </Link>
                              );
                            })}
                          </div>
                        </div>

                        {/* Divider */}
                        <div className="h-px mx-3" style={{ backgroundColor: 'var(--border-subtle)' }} />

                        {/* Section: Explorer */}
                        <div className="p-3">
                          <p
                            className="text-[9px] uppercase tracking-[0.3em] px-3 py-1.5 mb-1"
                            style={{ color: 'var(--muted-foreground)', opacity: 0.5, fontWeight: 500 }}
                          >
                            {t('Explorer', 'Explore')}
                          </p>
                          <div className="grid grid-cols-3 gap-0.5">
                            {exploreLinks.map((link) => {
                              const isActive = location.pathname.startsWith(link.to);
                              const LinkIcon = link.icon;
                              return (
                                <Link
                                  key={link.to}
                                  to={link.to}
                                  className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition-all duration-200 group"
                                  style={{
                                    backgroundColor: isActive ? (isDark ? 'rgba(155,142,230,0.1)' : link.surface) : 'transparent',
                                  }}
                                >
                                  <div
                                    className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                                    style={{ backgroundColor: link.surface }}
                                  >
                                    <LinkIcon className="w-3.5 h-3.5" style={{ color: link.color }} />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <span className="text-xs block truncate" style={{ fontWeight: 500, color: 'var(--foreground)' }}>
                                      {lang === 'fr' ? link.labelFr : link.labelEn}
                                    </span>
                                  </div>
                                </Link>
                              );
                            })}
                          </div>
                        </div>

                        {/* Bottom */}
                        <div
                          className="px-4 py-3 flex items-center justify-between"
                          style={{ borderTop: '1px solid var(--border-subtle)' }}
                        >
                          <Link
                            to="/about"
                            className="text-xs transition-colors"
                            style={{ color: 'var(--muted-foreground)', opacity: 0.6 }}
                          >
                            {t('À propos', 'About')}
                          </Link>
                          <Link
                            to="/lexicon"
                            className="inline-flex items-center gap-1.5 text-xs transition-colors"
                            style={{ color: 'var(--accent-purple)', opacity: 0.8 }}
                          >
                            <BookOpen className="w-3 h-3" />
                            {t('Lexique complet', 'Full Lexicon')}
                            <ArrowUpRight className="w-3 h-3" />
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Right side controls */}
              <div className="flex items-center gap-1.5">
                {/* L'Ascension Premium CTA — Desktop */}
                <MagneticElement intensity={0.15}>
                  <Link
                    to="/ascension"
                    className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300"
                    style={{
                      background: isOnAscension
                        ? 'linear-gradient(135deg, var(--accent-gold), var(--accent-amber))'
                        : isDark
                        ? 'rgba(200,168,90,0.1)'
                        : 'rgba(200,168,90,0.1)',
                      border: `1px solid ${isOnAscension ? 'transparent' : 'rgba(200,168,90,0.25)'}`,
                    }}
                  >
                    <Sparkles className="w-3 h-3" style={{ color: isOnAscension ? '#fff' : 'var(--accent-gold)' }} />
                    <span
                      className="text-xs"
                      style={{
                        color: isOnAscension ? '#fff' : 'var(--accent-gold)',
                        fontWeight: 600,
                        letterSpacing: '0.02em',
                      }}
                    >
                      {t("L'Ascension", "L'Ascension")}
                    </span>
                    <span
                      className="text-[9px] px-1 py-0.5 rounded"
                      style={{
                        backgroundColor: isOnAscension ? 'rgba(255,255,255,0.2)' : 'rgba(200,168,90,0.15)',
                        color: isOnAscension ? '#fff' : 'var(--accent-gold)',
                      }}
                    >
                      ✦
                    </span>
                  </Link>
                </MagneticElement>

                {/* Search Button */}
                <MagneticElement intensity={0.2}>
                  <motion.button
                    onClick={() => setSearchOpen(true)}
                    className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full transition-colors"
                    style={{
                      backgroundColor: isDark ? 'rgba(155, 142, 230, 0.1)' : 'var(--surface-purple)',
                      border: '1px solid var(--border-subtle)',
                    }}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <Search className="w-3.5 h-3.5" style={{ color: 'var(--muted-foreground)' }} />
                    <span className="text-xs hidden xl:inline" style={{ color: 'var(--muted-foreground)' }}>
                      {t('Rechercher', 'Search')}
                    </span>
                    <kbd
                      className="text-[10px] px-1 py-0.5 rounded hidden xl:inline-block"
                      style={{
                        backgroundColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
                        color: 'var(--muted-foreground)',
                        border: '1px solid var(--border-subtle)',
                      }}
                    >
                      ⌘K
                    </kbd>
                  </motion.button>
                </MagneticElement>

                {/* Mobile Search Button */}
                <MagneticElement intensity={0.2}>
                  <motion.button
                    onClick={() => setSearchOpen(true)}
                    className="sm:hidden w-9 h-9 rounded-full flex items-center justify-center transition-colors"
                    style={{
                      backgroundColor: isDark ? 'rgba(155, 142, 230, 0.1)' : 'var(--surface-purple)',
                      border: '1px solid var(--border-subtle)',
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Search className="w-4 h-4" style={{ color: 'var(--muted-foreground)' }} />
                  </motion.button>
                </MagneticElement>

                {/* Favorites indicator */}
                {favCount > 0 && (
                  <MagneticElement intensity={0.2}>
                    <Link
                      to="/lexicon?filter=favorites"
                      className="hidden sm:flex w-9 h-9 rounded-full items-center justify-center transition-colors relative"
                      style={{
                        backgroundColor: isDark ? 'rgba(224, 102, 126, 0.1)' : 'rgba(224, 102, 126, 0.08)',
                        border: '1px solid var(--border-subtle)',
                      }}
                      title={t('Mes favoris', 'My favorites')}
                    >
                      <Heart className="w-4 h-4" style={{ color: 'var(--accent-rose)', fill: 'var(--accent-rose)' }} />
                      <span
                        className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-[9px]"
                        style={{
                          backgroundColor: 'var(--accent-rose)',
                          color: '#fff',
                          fontWeight: 600,
                        }}
                      >
                        {favCount}
                      </span>
                    </Link>
                  </MagneticElement>
                )}

                {/* Language Toggle */}
                <MagneticElement intensity={0.2}>
                  <motion.button
                    onClick={toggleLang}
                    className="w-9 h-9 rounded-full flex items-center justify-center transition-colors"
                    style={{
                      backgroundColor: isDark ? 'rgba(155, 142, 230, 0.1)' : 'var(--surface-purple)',
                      border: '1px solid var(--border-subtle)',
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    title={t('Passer en anglais', 'Switch to French')}
                  >
                    <span className="text-xs" style={{ color: 'var(--foreground)', fontWeight: 600, letterSpacing: '0.02em' }}>
                      {lang === 'fr' ? 'FR' : 'EN'}
                    </span>
                  </motion.button>
                </MagneticElement>

                {/* Theme Toggle */}
                <MagneticElement intensity={0.2}>
                  <motion.button
                    onClick={toggleTheme}
                    className="w-9 h-9 rounded-full flex items-center justify-center transition-colors"
                    style={{
                      backgroundColor: isDark ? 'rgba(155, 142, 230, 0.1)' : 'var(--surface-purple)',
                      border: '1px solid var(--border-subtle)',
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <AnimatePresence mode="wait">
                      {isDark ? (
                        <motion.div key="sun" initial={{ rotate: -90, opacity: 0, scale: 0 }} animate={{ rotate: 0, opacity: 1, scale: 1 }} exit={{ rotate: 90, opacity: 0, scale: 0 }} transition={{ duration: 0.2 }}>
                          <Sun className="w-4 h-4" style={{ color: 'var(--accent-gold)' }} />
                        </motion.div>
                      ) : (
                        <motion.div key="moon" initial={{ rotate: 90, opacity: 0, scale: 0 }} animate={{ rotate: 0, opacity: 1, scale: 1 }} exit={{ rotate: -90, opacity: 0, scale: 0 }} transition={{ duration: 0.2 }}>
                          <Moon className="w-4 h-4" style={{ color: 'var(--accent-purple)' }} />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </MagneticElement>

                {/* Mobile Menu Button */}
                <motion.button
                  onClick={() => setMobileOpen(!mobileOpen)}
                  className="md:hidden w-9 h-9 rounded-full flex items-center justify-center"
                  style={{
                    backgroundColor: isDark ? 'rgba(155, 142, 230, 0.1)' : 'var(--surface-purple)',
                    border: '1px solid var(--border-subtle)',
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {mobileOpen ? (
                    <X className="w-4 h-4" style={{ color: 'var(--foreground)' }} />
                  ) : (
                    <Menu className="w-4 h-4" style={{ color: 'var(--foreground)' }} />
                  )}
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[58px] z-[90] md:hidden p-4"
          >
            <div
              className="rounded-2xl p-3 backdrop-blur-2xl overflow-y-auto max-h-[80vh]"
              data-lenis-prevent
              style={{
                backgroundColor: isDark ? 'rgba(24, 20, 36, 0.97)' : 'rgba(255, 255, 255, 0.97)',
                border: '1px solid var(--border)',
                boxShadow: 'var(--card-shadow-hover)',
              }}
            >
              {/* L'Ascension Premium */}
              <Link
                to="/ascension"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3.5 px-4 py-3 rounded-xl mb-2 transition-colors"
                style={{
                  background: 'linear-gradient(135deg, rgba(200,168,90,0.12), rgba(200,168,90,0.06))',
                  border: '1px solid rgba(200,168,90,0.2)',
                }}
              >
                <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--surface-gold)' }}>
                  <Sparkles className="w-4 h-4" style={{ color: 'var(--accent-gold)' }} />
                </div>
                <div>
                  <span className="text-sm block" style={{ color: 'var(--accent-gold)', fontWeight: 600 }}>
                    {t("L'Ascension", "L'Ascension")}
                  </span>
                  <span className="text-[10px]" style={{ color: 'var(--muted-foreground)' }}>
                    ✦ {t('Expérience premium', 'Premium experience')}
                  </span>
                </div>
              </Link>

              {/* Categories section */}
              <p className="text-[10px] uppercase tracking-[0.25em] px-4 pt-3 pb-2" style={{ color: 'var(--muted-foreground)', fontWeight: 500 }}>
                {t('Savoirs', 'Knowledge')}
              </p>
              {categoryItems.map((cat) => {
                const isActive = location.pathname === cat.to;
                const CatIcon = cat.icon;
                return (
                  <Link
                    key={cat.to}
                    to={cat.to}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3.5 px-4 py-2.5 rounded-xl transition-colors"
                    style={{ backgroundColor: isActive ? (isDark ? 'rgba(155, 142, 230, 0.1)' : cat.surface) : 'transparent' }}
                  >
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: cat.surface }}>
                      <CatIcon className="w-4 h-4" style={{ color: cat.color }} />
                    </div>
                    <span className="text-sm" style={{ color: 'var(--foreground)', fontWeight: isActive ? 600 : 400 }}>
                      {lang === 'fr' ? cat.labelFr : cat.labelEn}
                    </span>
                    {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full" style={{ backgroundColor: cat.color }} />}
                  </Link>
                );
              })}

              {/* Divider */}
              <div className="h-px mx-4 my-2" style={{ backgroundColor: 'var(--border-subtle)' }} />

              {/* Explore section */}
              <p className="text-[10px] uppercase tracking-[0.25em] px-4 py-2" style={{ color: 'var(--muted-foreground)', fontWeight: 500 }}>
                {t('Explorer', 'Explore')}
              </p>
              {exploreLinks.map((link) => {
                const isActive = location.pathname.startsWith(link.to);
                const LinkIcon = link.icon;
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3.5 px-4 py-2.5 rounded-xl transition-colors"
                    style={{ backgroundColor: isActive ? (isDark ? 'rgba(155, 142, 230, 0.1)' : link.surface) : 'transparent' }}
                  >
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: link.surface }}>
                      <LinkIcon className="w-4 h-4" style={{ color: link.color }} />
                    </div>
                    <span className="text-sm" style={{ color: 'var(--foreground)', fontWeight: isActive ? 600 : 400 }}>
                      {lang === 'fr' ? link.labelFr : link.labelEn}
                    </span>
                  </Link>
                );
              })}

              {/* Favorites */}
              {favCount > 0 && (
                <>
                  <div className="h-px mx-4 my-2" style={{ backgroundColor: 'var(--border-subtle)' }} />
                  <Link
                    to="/lexicon?filter=favorites"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3.5 px-4 py-2.5 rounded-xl"
                  >
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: isDark ? 'rgba(224,102,126,0.1)' : 'rgba(224,102,126,0.08)' }}>
                      <Heart className="w-4 h-4" style={{ color: 'var(--accent-rose)', fill: 'var(--accent-rose)' }} />
                    </div>
                    <span className="text-sm" style={{ color: 'var(--accent-rose)' }}>
                      {t('Favoris', 'Favorites')} ({favCount})
                    </span>
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Overlay */}
      <SearchOverlay open={searchOpen} onClose={handleSearchClose} />
    </>
  );
}