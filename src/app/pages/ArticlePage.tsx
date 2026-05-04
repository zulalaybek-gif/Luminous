import { useParams, Link, useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Heart, BookOpen, ExternalLink, ArrowRight, Share2 } from 'lucide-react';
import { useLang } from '../components/LanguageContext';
import { useTheme } from '../components/ThemeContext';
import { useFavorites } from '../components/FavoritesContext';
import { lexiconEntries, categoryConfig, type LexiconEntry } from '../components/lexiconData';
import { MouseParallax, MagneticElement } from '../components/FloatingElements';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { toast } from 'sonner';
import { sanitizeSlug, safeClipboardWrite } from '../components/sanitize';

// Category hero images
const categoryImages: Record<string, string> = {
  alchemy: 'https://images.unsplash.com/photo-1557263985-7defaccb7137?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmNpZW50JTIwYWxjaGVteSUyMGxhYm9yYXRvcnklMjBtYW51c2NyaXB0c3xlbnwxfHx8fDE3NzM2MzAwNjh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  symbolism: 'https://images.unsplash.com/photo-1695453933208-7145817812e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxteXN0aWNhbCUyMHN5bWJvbHMlMjBhbmNpZW50JTIwdGVtcGxlfGVufDF8fHx8MTc3MzYzMDA2OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  numerology: 'https://images.unsplash.com/photo-1609945368783-0ff5ec268561?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaWJvbmFjY2klMjBzcGlyYWwlMjBzZWFzaGVsbCUyMG1hdGhlbWF0aWNzfGVufDF8fHx8MTc3MzYzMDA3Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  geometry: 'https://images.unsplash.com/photo-1773037317299-c9cf9b28c5d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWNyZWQlMjBnZW9tZXRyeSUyMG1hbmRhbGElMjBwYXR0ZXJufGVufDF8fHx8MTc3MzYzMDA2OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  consciousness: 'https://images.unsplash.com/photo-1603166868295-4ae2cba14063?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGFrcmFzJTIwbWVkaXRhdGlvbiUyMGVuZXJneSUyMGxpZ2h0JTIwYm9keXxlbnwxfHx8fDE3Nzc0ODQxNTh8MA&ixlib=rb-4.1.0&q=80&w=1080',
  cosmology: 'https://images.unsplash.com/photo-1581333025546-47f446fee132?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3NtaWMlMjBuZWJ1bGElMjBzdGFycyUyMHVuaXZlcnNlJTIwc3Bpcml0dWFsfGVufDF8fHx8MTc3NzQ4NDE1OXww&ixlib=rb-4.1.0&q=80&w=1080',
};

// Category page links
const categoryPaths: Record<string, string> = {
  alchemy: '/alchemy',
  symbolism: '/symbolism',
  numerology: '/numerology',
  geometry: '/sacred-geometry',
  consciousness: '/conscience',
  cosmology: '/cosmologie',
};

export function ArticlePage() {
  const { termId: rawTermId } = useParams<{ termId: string }>();
  const { t, lang } = useLang();
  const { isDark } = useTheme();
  const { isFavorite, toggleFavorite } = useFavorites();
  const navigate = useNavigate();

  // Sanitize URL parameter before lookup
  const termId = rawTermId ? sanitizeSlug(rawTermId) : '';
  const entry = lexiconEntries.find((e) => e.id === termId);

  if (!entry) {
    return (
      <div className="pt-32 pb-20 px-6 text-center">
        <p style={{ color: 'var(--muted-foreground)' }}>
          {t('Terme non trouvé', 'Term not found')}
        </p>
        <Link
          to="/lexicon"
          className="inline-flex items-center gap-2 mt-4 text-sm"
          style={{ color: 'var(--accent-purple)' }}
        >
          <ArrowLeft className="w-4 h-4" />
          {t('Retour au lexique', 'Back to Lexicon')}
        </Link>
      </div>
    );
  }

  const cat = categoryConfig[entry.category];
  const CatIcon = cat.icon;
  const term = lang === 'fr' ? entry.termFr : entry.termEn;
  const definition = lang === 'fr' ? entry.definitionFr : entry.definitionEn;
  const extended = lang === 'fr' ? entry.extendedFr : entry.extendedEn;
  const isFav = isFavorite(entry.id);

  const relatedTerms = (entry.relatedIds || [])
    .map((id) => lexiconEntries.find((e) => e.id === id))
    .filter(Boolean) as LexiconEntry[];

  // Find prev/next in same category
  const sameCategoryEntries = lexiconEntries.filter((e) => e.category === entry.category);
  const currentIdx = sameCategoryEntries.findIndex((e) => e.id === entry.id);
  const prevEntry = currentIdx > 0 ? sameCategoryEntries[currentIdx - 1] : null;
  const nextEntry = currentIdx < sameCategoryEntries.length - 1 ? sameCategoryEntries[currentIdx + 1] : null;

  return (
    <div className={`pt-16 pb-8 px-6 lg:px-12`}>
      <div className="max-w-[1100px] mx-auto">

        {/* Back + Category breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 pt-10 mb-8 flex-wrap"
        >
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-sm transition-colors hover:opacity-80"
            style={{ color: 'var(--muted-foreground)' }}
          >
            <ArrowLeft className="w-4 h-4" />
            {t('Retour', 'Back')}
          </button>
          <span className="text-xs" style={{ color: 'var(--muted-foreground)', opacity: 0.3 }}>/</span>
          <Link
            to="/lexicon"
            className="text-sm transition-colors hover:opacity-80"
            style={{ color: 'var(--muted-foreground)' }}
          >
            {t('Lexique', 'Lexicon')}
          </Link>
          <span className="text-xs" style={{ color: 'var(--muted-foreground)', opacity: 0.3 }}>/</span>
          <Link
            to={categoryPaths[entry.category]}
            className="inline-flex items-center gap-1.5 text-sm"
            style={{ color: cat.color }}
          >
            <CatIcon className="w-3.5 h-3.5" />
            {lang === 'fr' ? cat.labelFr : cat.labelEn}
          </Link>
        </motion.div>

        {/* Hero image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="relative rounded-3xl overflow-hidden mb-10"
          style={{ height: 'clamp(200px, 30vw, 360px)' }}
        >
          <ImageWithFallback
            src={categoryImages[entry.category]}
            alt={term}
            className="w-full h-full object-cover"
          />
          {/* Gradient overlay */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to top, ${isDark ? 'rgba(13,11,20,0.9)' : 'rgba(246,244,250,0.85)'} 0%, transparent 60%)`,
            }}
          />
          {/* Category icon on image */}
          <div className="absolute bottom-6 left-8 flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center backdrop-blur-xl"
              style={{
                backgroundColor: isDark ? 'rgba(24,20,36,0.7)' : 'rgba(255,255,255,0.7)',
                border: `1px solid ${cat.color}`,
                boxShadow: `0 0 20px ${cat.glow}`,
              }}
            >
              <CatIcon className="w-6 h-6" style={{ color: cat.color }} />
            </div>
            <span
              className="text-xs uppercase tracking-[0.2em] px-3 py-1.5 rounded-full backdrop-blur-xl"
              style={{
                backgroundColor: isDark ? 'rgba(24,20,36,0.7)' : 'rgba(255,255,255,0.7)',
                color: cat.color,
                border: '1px solid var(--border-subtle)',
              }}
            >
              {lang === 'fr' ? cat.labelFr : cat.labelEn}
            </span>
          </div>
        </motion.div>

        {/* Title + Favorite */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex items-start justify-between gap-4 mb-8"
        >
          <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)' }}>
            {term}
          </h1>
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Share button */}
            <MagneticElement intensity={0.2}>
              <motion.button
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  safeClipboardWrite(window.location.href);
                  toast.success(t('Lien copié !', 'Link copied!'), {
                    description: t('Le lien a été copié dans le presse-papier.', 'The link has been copied to your clipboard.'),
                  });
                }}
                className="w-11 h-11 rounded-full flex items-center justify-center transition-all"
                style={{
                  backgroundColor: isDark ? 'rgba(155,142,230,0.1)' : 'var(--surface-purple)',
                  border: '1px solid var(--border)',
                }}
                title={t('Partager', 'Share')}
              >
                <Share2 className="w-4.5 h-4.5" style={{ color: 'var(--muted-foreground)' }} />
              </motion.button>
            </MagneticElement>

            {/* Favorite button */}
            <MagneticElement intensity={0.2}>
              <motion.button
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  toggleFavorite(entry.id);
                  if (!isFav) {
                    toast.success(t('Ajouté aux favoris', 'Added to favorites'), {
                      description: term,
                    });
                  } else {
                    toast(t('Retiré des favoris', 'Removed from favorites'), {
                      description: term,
                    });
                  }
                }}
                className="w-11 h-11 rounded-full flex items-center justify-center transition-all"
                style={{
                  backgroundColor: isFav
                    ? isDark ? 'rgba(224,102,126,0.15)' : 'rgba(224,102,126,0.1)'
                    : isDark ? 'rgba(155,142,230,0.1)' : 'var(--surface-purple)',
                  border: `1px solid ${isFav ? 'var(--accent-rose)' : 'var(--border)'}`,
                }}
                title={isFav ? t('Retirer des favoris', 'Remove from favorites') : t('Ajouter aux favoris', 'Add to favorites')}
              >
                <Heart
                  className="w-5 h-5 transition-colors"
                  style={{
                    color: isFav ? 'var(--accent-rose)' : 'var(--muted-foreground)',
                    fill: isFav ? 'var(--accent-rose)' : 'none',
                  }}
                />
              </motion.button>
            </MagneticElement>
          </div>
        </motion.div>

        {/* Definition */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mb-10"
        >
          <div
            className="rounded-2xl p-6 md:p-8 mb-8"
            style={{
              backgroundColor: cat.surface,
              border: `1px solid ${cat.color}`,
              borderColor: `color-mix(in srgb, ${cat.color} 30%, transparent)`,
            }}
          >
            <p
              className="text-xs uppercase tracking-[0.2em] mb-4"
              style={{ color: cat.color, fontWeight: 500 }}
            >
              {t('Définition', 'Definition')}
            </p>
            <p style={{ lineHeight: 2, fontSize: '1.05rem', color: 'var(--foreground)' }}>
              {definition}
            </p>
          </div>

          {/* Extended content */}
          {extended && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="mb-10"
            >
              <p
                className="text-xs uppercase tracking-[0.2em] mb-5"
                style={{ color: 'var(--muted-foreground)', fontWeight: 500 }}
              >
                {t('Approfondissement', 'Deep Dive')}
              </p>
              <div
                className="relative pl-6 md:pl-8"
                style={{
                  borderLeft: `2px solid color-mix(in srgb, ${cat.color} 30%, transparent)`,
                }}
              >
                <p style={{ lineHeight: 2.1, color: 'var(--muted-foreground)', fontSize: '1rem' }}>
                  {extended}
                </p>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Related terms */}
        {relatedTerms.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mb-12"
          >
            <p
              className="text-xs uppercase tracking-[0.2em] mb-5"
              style={{ color: 'var(--muted-foreground)', fontWeight: 500 }}
            >
              {t('Termes connexes', 'Related Terms')}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {relatedTerms.map((related) => {
                const relCat = categoryConfig[related.category];
                const RelIcon = relCat.icon;
                return (
                  <Link
                    key={related.id}
                    to={`/lexicon/${related.id}`}
                    className="group rounded-2xl p-5 flex items-start gap-4 transition-all duration-300"
                    style={{
                      backgroundColor: 'var(--card)',
                      border: '1px solid var(--border)',
                      boxShadow: 'var(--card-shadow)',
                    }}
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110"
                      style={{ backgroundColor: relCat.surface }}
                    >
                      <RelIcon className="w-5 h-5" style={{ color: relCat.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-sm truncate" style={{ fontWeight: 500 }}>
                          {lang === 'fr' ? related.termFr : related.termEn}
                        </h4>
                        <ArrowRight
                          className="w-3 h-3 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-0.5"
                          style={{ color: relCat.color }}
                        />
                      </div>
                      <p className="text-xs line-clamp-2" style={{ color: 'var(--muted-foreground)', lineHeight: 1.6 }}>
                        {lang === 'fr' ? related.definitionFr : related.definitionEn}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Prev / Next navigation */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="flex items-stretch gap-3 mb-8"
          style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '1.5rem' }}
        >
          {prevEntry ? (
            <Link
              to={`/lexicon/${prevEntry.id}`}
              className="flex-1 rounded-2xl p-5 flex items-center gap-3 transition-all duration-300 group"
              style={{
                backgroundColor: 'var(--card)',
                border: '1px solid var(--border)',
              }}
            >
              <ArrowLeft className="w-4 h-4 flex-shrink-0 transition-transform group-hover:-translate-x-1" style={{ color: cat.color }} />
              <div className="min-w-0">
                <span className="text-[10px] uppercase tracking-[0.2em] block mb-1" style={{ color: 'var(--muted-foreground)' }}>
                  {t('Précédent', 'Previous')}
                </span>
                <span className="text-sm truncate block" style={{ fontWeight: 500 }}>
                  {lang === 'fr' ? prevEntry.termFr : prevEntry.termEn}
                </span>
              </div>
            </Link>
          ) : <div className="flex-1" />}

          {nextEntry ? (
            <Link
              to={`/lexicon/${nextEntry.id}`}
              className="flex-1 rounded-2xl p-5 flex items-center justify-end gap-3 text-right transition-all duration-300 group"
              style={{
                backgroundColor: 'var(--card)',
                border: '1px solid var(--border)',
              }}
            >
              <div className="min-w-0">
                <span className="text-[10px] uppercase tracking-[0.2em] block mb-1" style={{ color: 'var(--muted-foreground)' }}>
                  {t('Suivant', 'Next')}
                </span>
                <span className="text-sm truncate block" style={{ fontWeight: 500 }}>
                  {lang === 'fr' ? nextEntry.termFr : nextEntry.termEn}
                </span>
              </div>
              <ArrowRight className="w-4 h-4 flex-shrink-0 transition-transform group-hover:translate-x-1" style={{ color: cat.color }} />
            </Link>
          ) : <div className="flex-1" />}
        </motion.div>

        {/* Back to lexicon */}
        <div className="text-center pb-8">
          <Link
            to="/lexicon"
            className="inline-flex items-center gap-2 text-sm transition-colors"
            style={{ color: 'var(--accent-purple)' }}
          >
            <BookOpen className="w-4 h-4" />
            {t('Retour au lexique complet', 'Back to full lexicon')}
          </Link>
        </div>
      </div>
    </div>
  );
}