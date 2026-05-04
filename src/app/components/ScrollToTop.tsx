import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronUp } from 'lucide-react';
import { useTheme } from './ThemeContext';

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const { isDark } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollUp = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Don't render on touch devices where this might clash with native scrolling
  if (typeof window !== 'undefined' && 'ontouchstart' in window) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 10 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollUp}
          className="fixed bottom-8 right-8 z-[80] w-11 h-11 rounded-full flex items-center justify-center backdrop-blur-xl transition-colors"
          style={{
            backgroundColor: isDark ? 'rgba(24, 20, 36, 0.85)' : 'rgba(255, 255, 255, 0.85)',
            border: '1px solid var(--border)',
            boxShadow: isDark
              ? '0 4px 20px rgba(0,0,0,0.4), 0 0 0 1px rgba(155,142,230,0.08)'
              : '0 4px 20px rgba(0,0,0,0.08), 0 0 0 1px rgba(123,111,200,0.06)',
          }}
          aria-label="Scroll to top"
        >
          <ChevronUp className="w-5 h-5" style={{ color: 'var(--accent-purple)' }} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
