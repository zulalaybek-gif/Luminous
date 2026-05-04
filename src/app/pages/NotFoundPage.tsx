import { motion } from 'motion/react';
import { Link } from 'react-router';
import { Compass, ArrowLeft } from 'lucide-react';
import { useLang } from '../components/LanguageContext';
import { MouseParallax, MagneticElement } from '../components/FloatingElements';

export function NotFoundPage() {
  const { t } = useLang();

  return (
    <div className="pt-16 min-h-[80vh] flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        {/* Animated compass */}
        <MouseParallax intensity={20} className="inline-block mb-10">
          <motion.div
            className="relative inline-flex items-center justify-center w-28 h-28 rounded-full"
            style={{ backgroundColor: 'var(--surface-purple)' }}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 150, damping: 18, delay: 0.2 }}
          >
            <motion.div
              animate={{ rotate: [0, 15, -10, 5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', repeatDelay: 2 }}
            >
              <Compass className="w-12 h-12" style={{ color: 'var(--accent-purple)' }} />
            </motion.div>
            <div
              className="absolute inset-0 rounded-full blur-3xl"
              style={{ backgroundColor: 'var(--accent-purple)', opacity: 0.1 }}
            />
          </motion.div>
        </MouseParallax>

        {/* 404 number */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(4rem, 10vw, 7rem)',
            fontWeight: 300,
            lineHeight: 1,
            color: 'var(--accent-purple)',
            opacity: 0.25,
            letterSpacing: '0.1em',
          }}
        >
          404
        </motion.div>

        {/* Message */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mb-4 mt-2"
          style={{ fontSize: '1.6rem' }}
        >
          {t('Chemin non trouvé', 'Path Not Found')}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mb-10"
          style={{ color: 'var(--muted-foreground)', lineHeight: 1.8 }}
        >
          {t(
            'Cette page n\'existe pas encore dans notre carte des savoirs. Peut-être le chemin se révélera-t-il autrement.',
            'This page doesn\'t yet exist in our map of knowledge. Perhaps the path will reveal itself another way.'
          )}
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          <MagneticElement intensity={0.15}>
            <Link
              to="/"
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-sm transition-all duration-300"
              style={{
                backgroundColor: 'var(--surface-purple)',
                color: 'var(--accent-purple)',
                border: '1px solid var(--border)',
                fontWeight: 500,
              }}
            >
              <ArrowLeft className="w-4 h-4" />
              {t("Retour à l'accueil", 'Back to Home')}
            </Link>
          </MagneticElement>
        </motion.div>

        {/* Decorative SVG */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
          <motion.svg
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            width="600" height="600" viewBox="0 0 600 600"
            style={{ opacity: 0.015 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 180, repeat: Infinity, ease: 'linear' }}
          >
            <circle cx="300" cy="300" r="290" stroke="currentColor" strokeWidth="0.5" fill="none" />
            <circle cx="300" cy="300" r="220" stroke="currentColor" strokeWidth="0.4" fill="none" />
            <circle cx="300" cy="300" r="150" stroke="currentColor" strokeWidth="0.3" fill="none" />
            <circle cx="300" cy="300" r="80" stroke="currentColor" strokeWidth="0.3" fill="none" />
          </motion.svg>
        </div>
      </div>
    </div>
  );
}
