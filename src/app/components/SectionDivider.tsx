import { motion } from 'motion/react';

interface SectionDividerProps {
  color?: string;
  symbol?: 'star' | 'diamond' | 'dot' | 'circle';
}

export function SectionDivider({ color = 'var(--accent-purple)', symbol = 'diamond' }: SectionDividerProps) {
  const symbols = {
    star: (
      <motion.svg
        width="12" height="12" viewBox="0 0 12 12" fill="none"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      >
        <path d="M6 0L7.1 4.9L12 6L7.1 7.1L6 12L4.9 7.1L0 6L4.9 4.9L6 0Z" fill={color} />
      </motion.svg>
    ),
    diamond: (
      <motion.svg
        width="8" height="8" viewBox="0 0 8 8" fill="none"
        animate={{ rotate: [0, 90, 180, 270, 360], scale: [1, 1.2, 1, 1.2, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      >
        <rect x="4" y="0" width="5.66" height="5.66" rx="1" transform="rotate(45 4 0)" fill={color} />
      </motion.svg>
    ),
    dot: (
      <motion.svg
        width="6" height="6" viewBox="0 0 6 6" fill="none"
        animate={{ scale: [1, 1.5, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        <circle cx="3" cy="3" r="3" fill={color} />
      </motion.svg>
    ),
    circle: (
      <motion.svg
        width="12" height="12" viewBox="0 0 12 12" fill="none"
        animate={{ rotate: 360 }}
        transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
      >
        <circle cx="6" cy="6" r="5" stroke={color} strokeWidth="1" fill="none" />
        <circle cx="6" cy="6" r="2" fill={color} />
      </motion.svg>
    ),
  };

  return (
    <motion.div
      className="flex items-center justify-center gap-4 py-8"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className="h-px flex-1 max-w-[120px]"
        style={{ background: `linear-gradient(90deg, transparent, ${color})`, opacity: 0.2 }}
        animate={{ scaleX: [0.5, 1, 0.5] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Side dots */}
      <motion.div
        className="w-1 h-1 rounded-full"
        style={{ backgroundColor: color, opacity: 0.2 }}
        animate={{ scale: [0.5, 1, 0.5] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div style={{ opacity: 0.4 }}>
        {symbols[symbol]}
      </div>

      <motion.div
        className="w-1 h-1 rounded-full"
        style={{ backgroundColor: color, opacity: 0.2 }}
        animate={{ scale: [0.5, 1, 0.5] }}
        transition={{ duration: 4, delay: 2, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        className="h-px flex-1 max-w-[120px]"
        style={{ background: `linear-gradient(90deg, ${color}, transparent)`, opacity: 0.2 }}
        animate={{ scaleX: [0.5, 1, 0.5] }}
        transition={{ duration: 6, delay: 3, repeat: Infinity, ease: 'easeInOut' }}
      />
    </motion.div>
  );
}
