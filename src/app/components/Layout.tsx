import { ReactNode, useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { Navigation } from './Navigation';
import { LanguageProvider, useLang } from './LanguageContext';
import { ThemeContext } from './ThemeContext';
import { CursorGlow } from './CursorGlow';
import { FloatingElements } from './FloatingElements';
import { ScrollToTop } from './ScrollToTop';
import { FavoritesProvider } from './FavoritesContext';
import { ParticleTrail } from './ParticleTrail';
import { Toaster } from './ui/sonner';
import { Link, useLocation } from 'react-router';
import { Flame, Eye, Infinity as InfinityIcon, Hexagon, BookOpen, Sparkles, Map, Library, Waves, Globe } from 'lucide-react';
import Lenis from 'lenis';

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[200] h-[3px] origin-left"
      style={{
        scaleX,
        background: 'linear-gradient(90deg, var(--accent-purple), var(--accent-blue), var(--accent-rose), var(--accent-gold))',
      }}
    />
  );
}

function BackgroundDecoration() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Primary glow - top right — gently drifting */}
      <motion.div
        className="absolute -top-[300px] -right-[200px] w-[900px] h-[900px] rounded-full"
        style={{
          background: 'radial-gradient(circle, var(--glow-purple) 0%, transparent 60%)',
        }}
        animate={{
          x: [0, 40, -20, 0],
          y: [0, -30, 20, 0],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Secondary glow - bottom left — drifting */}
      <motion.div
        className="absolute -bottom-[200px] -left-[200px] w-[700px] h-[700px] rounded-full"
        style={{
          background: 'radial-gradient(circle, var(--glow-blue) 0%, transparent 60%)',
        }}
        animate={{
          x: [0, -30, 25, 0],
          y: [0, 20, -15, 0],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Warm center glow — breathing */}
      <motion.div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[800px] rounded-full"
        style={{
          background: 'radial-gradient(ellipse, var(--glow-rose) 0%, transparent 65%)',
        }}
        animate={{
          opacity: [0.3, 0.5, 0.3],
          scale: [1, 1.05, 1],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Gold accent glow — drifting */}
      <motion.div
        className="absolute top-[60%] right-[10%] w-[500px] h-[500px] rounded-full"
        style={{
          background: 'radial-gradient(circle, var(--glow-gold) 0%, transparent 60%)',
        }}
        animate={{
          x: [0, 30, -20, 0],
          y: [0, -25, 15, 0],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Fine dot grid pattern */}
      <svg className="absolute inset-0 w-full h-full" style={{ opacity: 'var(--pattern-opacity)' }}>
        <defs>
          <pattern id="grid-dots" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="20" cy="20" r="0.4" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-dots)" />
      </svg>

      {/* Subtle diagonal lines accent */}
      <svg className="absolute inset-0 w-full h-full" style={{ opacity: 'calc(var(--pattern-opacity) * 0.5)' }}>
        <defs>
          <pattern id="diag-lines" width="100" height="100" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="100" stroke="currentColor" strokeWidth="0.3" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#diag-lines)" />
      </svg>
    </div>
  );
}

export function Layout({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('luminous-theme');
        if (stored) return stored === 'dark';
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
      } catch {
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
      }
    }
    return false;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      localStorage.setItem('luminous-theme', isDark ? 'dark' : 'light');
    } catch {
      // Storage unavailable
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <LanguageProvider>
      <ThemeContext.Provider value={{ isDark, toggleTheme }}>
        <FavoritesProvider>
          <LayoutInner>{children}</LayoutInner>
        </FavoritesProvider>
      </ThemeContext.Provider>
    </LanguageProvider>
  );
}

function LayoutInner({ children }: { children: ReactNode }) {
  const location = useLocation();

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen relative">
      <ScrollProgress />
      <BackgroundDecoration />
      <FloatingElements />
      <CursorGlow />
      <ParticleTrail />
      <Navigation />
      <main className="relative z-10">
        {children}
      </main>

      {/* Footer */}
      <Footer />
      <ScrollToTop />
      <Toaster position="bottom-right" />
    </div>
  );
}

function Footer() {
  const { t } = useLang();

  const categories = [
    { to: '/alchemy', labelFr: 'Alchimie', labelEn: 'Alchemy', icon: Flame, color: 'var(--accent-purple)' },
    { to: '/symbolism', labelFr: 'Symbolisme', labelEn: 'Symbolism', icon: Eye, color: 'var(--accent-blue)' },
    { to: '/numerology', labelFr: 'Numérologie', labelEn: 'Numerology', icon: InfinityIcon, color: 'var(--accent-rose)' },
    { to: '/sacred-geometry', labelFr: 'Géométrie Sacrée', labelEn: 'Sacred Geometry', icon: Hexagon, color: 'var(--accent-gold)' },
    { to: '/conscience', labelFr: 'Conscience & Éveil', labelEn: 'Consciousness & Awakening', icon: Waves, color: 'var(--accent-teal)' },
    { to: '/cosmologie', labelFr: 'Cosmologie Sacrée', labelEn: 'Sacred Cosmology', icon: Globe, color: 'var(--accent-cosmic)' },
  ];

  return (
    <footer className="relative z-10 pt-16 pb-10 px-6 lg:px-12" style={{ borderTop: '1px solid var(--border-subtle)' }}>
      <div className="max-w-[1600px] mx-auto">
        {/* Top section — logo + nav columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div>
            <Link to="/" className="inline-flex items-center gap-2.5 mb-4">
              <Sparkles className="w-5 h-5" style={{ color: 'var(--accent-purple)' }} />
              <span
                className="text-sm tracking-[0.2em] uppercase"
                style={{ fontWeight: 500, color: 'var(--foreground)' }}
              >
                Luminous
              </span>
            </Link>
            <p className="text-sm max-w-xs" style={{ color: 'var(--muted-foreground)', lineHeight: 1.8 }}>
              {t(
                'Une collection curatée de savoirs ésotériques, de l\'alchimie à la cosmologie sacrée.',
                'A curated collection of esoteric knowledge, from alchemy to sacred cosmology.'
              )}
            </p>
          </div>

          {/* Categories */}
          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] mb-4" style={{ color: 'var(--muted-foreground)', fontWeight: 500 }}>
              {t('Savoirs', 'Knowledge')}
            </p>
            <div className="flex flex-col gap-2.5">
              {categories.map((cat) => {
                const CatIcon = cat.icon;
                return (
                  <Link
                    key={cat.to}
                    to={cat.to}
                    className="inline-flex items-center gap-2.5 text-sm transition-colors duration-300 hover:translate-x-1"
                    style={{ color: 'var(--muted-foreground)' }}
                  >
                    <CatIcon className="w-3.5 h-3.5" style={{ color: cat.color, opacity: 0.7 }} />
                    <span>{t(cat.labelFr, cat.labelEn)}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Explore */}
          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] mb-4" style={{ color: 'var(--muted-foreground)', fontWeight: 500 }}>
              {t('Explorer', 'Explore')}
            </p>
            <div className="flex flex-col gap-2.5">
              <Link to="/lexicon" className="inline-flex items-center gap-2.5 text-sm transition-colors duration-300" style={{ color: 'var(--muted-foreground)' }}>
                <BookOpen className="w-3.5 h-3.5" style={{ color: 'var(--accent-purple)', opacity: 0.7 }} />
                <span>{t('Lexique', 'Lexicon')}</span>
              </Link>
              <Link to="/carte" className="inline-flex items-center gap-2.5 text-sm transition-colors duration-300" style={{ color: 'var(--muted-foreground)' }}>
                <Map className="w-3.5 h-3.5" style={{ color: 'var(--accent-blue)', opacity: 0.7 }} />
                <span>{t('Carte des Traditions', 'Map of Traditions')}</span>
              </Link>
              <Link to="/sources" className="inline-flex items-center gap-2.5 text-sm transition-colors duration-300" style={{ color: 'var(--muted-foreground)' }}>
                <Library className="w-3.5 h-3.5" style={{ color: 'var(--accent-gold)', opacity: 0.7 }} />
                <span>{t('Sources & Bibliographie', 'Sources & Bibliography')}</span>
              </Link>
            </div>
          </div>

          {/* Ascension & About */}
          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] mb-4" style={{ color: 'var(--muted-foreground)', fontWeight: 500 }}>
              {t('Ressources', 'Resources')}
            </p>
            <div className="flex flex-col gap-2.5">
              <Link to="/ascension" className="inline-flex items-center gap-2.5 text-sm transition-colors duration-300" style={{ color: 'var(--accent-gold)' }}>
                <Sparkles className="w-3.5 h-3.5" style={{ opacity: 0.7 }} />
                <span>✦ {t("L'Ascension", "L'Ascension")}</span>
              </Link>
              <Link to="/about" className="inline-flex items-center gap-2.5 text-sm transition-colors duration-300" style={{ color: 'var(--muted-foreground)' }}>
                <Sparkles className="w-3.5 h-3.5" style={{ color: 'var(--accent-purple)', opacity: 0.7 }} />
                <span>{t('À Propos', 'About')}</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, transparent, var(--border))' }} />
          <motion.svg
            width="16" height="16" viewBox="0 0 16 16" fill="none"
            style={{ color: 'var(--accent-purple)', opacity: 0.3 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          >
            <path d="M8 0L9.4 6.6L16 8L9.4 9.4L8 16L6.6 9.4L0 8L6.6 6.6L8 0Z" fill="currentColor" />
          </motion.svg>
          <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, var(--border), transparent)' }} />
        </div>

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs" style={{ color: 'var(--muted-foreground)', opacity: 0.5, letterSpacing: '0.05em' }}>
            {t('Un voyage au cœur de la sagesse ancienne et des savoirs vivants', 'A journey through ancient wisdom and living knowledge')}
          </p>
          <p className="text-xs" style={{ color: 'var(--muted-foreground)', opacity: 0.4 }}>
            © 2026 Luminous
          </p>
        </div>
      </div>
    </footer>
  );
}