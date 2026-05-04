import { useTheme } from '../components/ThemeContext';
import { useLang } from '../components/LanguageContext';
import { useRef, useCallback } from 'react';
import { AnimatedCounter } from '../components/AnimatedCounter';
import { BentoCard } from '../components/BentoCard';
import { SectionDivider } from '../components/SectionDivider';
import { MouseParallax, MagneticElement } from '../components/FloatingElements';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Sparkles, Flame, Eye, Infinity as InfinityIcon, Hexagon, Star, ArrowRight, Waves, Globe, Map, Library, Lock, Compass, Layers } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Link } from 'react-router';
import { richSubjects, AXIS_CONFIG, INFO_TYPE_CONFIG } from '../components/subjectsData';

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};

// Individual constellation point that uses hooks properly
function ConstellationPoint({
  point,
  index,
  springX,
  springY,
}: {
  point: { cx: number; cy: number; r: number };
  index: number;
  springX: any;
  springY: any;
}) {
  const offsetX = useTransform(springX, [0, 1], [-8 + index * 0.5, 8 - index * 0.5]);
  const offsetY = useTransform(springY, [0, 1], [-6 + index * 0.3, 6 - index * 0.3]);

  return (
    <motion.circle
      cx={point.cx}
      cy={point.cy}
      r={point.r}
      fill="var(--accent-purple)"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: [0.15, 0.4, 0.15] }}
      transition={{
        scale: { delay: 0.3 + index * 0.06, type: 'spring' },
        opacity: { delay: 1 + index * 0.2, duration: 3 + index * 0.5, repeat: Infinity, ease: 'easeInOut' },
      }}
      style={{ x: offsetX, y: offsetY }}
    />
  );
}

// Interactive constellation that reacts to mouse
function InteractiveConstellation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const springX = useSpring(mouseX, { stiffness: 40, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 20 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouseX.set((e.clientX - rect.left) / rect.width);
      mouseY.set((e.clientY - rect.top) / rect.height);
    },
    [mouseX, mouseY]
  );

  // Constellation points
  const points = [
    { cx: 150, cy: 120, r: 2 }, { cx: 280, cy: 80, r: 1.5 },
    { cx: 420, cy: 150, r: 2.5 }, { cx: 350, cy: 250, r: 1.8 },
    { cx: 180, cy: 280, r: 2 }, { cx: 500, cy: 100, r: 1.5 },
    { cx: 550, cy: 230, r: 2 }, { cx: 100, cy: 200, r: 1.2 },
    { cx: 300, cy: 180, r: 3 }, { cx: 450, cy: 300, r: 1.8 },
    { cx: 220, cy: 350, r: 1.5 }, { cx: 380, cy: 350, r: 1.2 },
  ];

  const connections = [
    [0, 1], [1, 2], [2, 3], [3, 4], [4, 0],
    [1, 5], [5, 6], [6, 2], [0, 7], [8, 3],
    [3, 9], [4, 10], [10, 11], [11, 9],
  ];

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="absolute inset-0 pointer-events-auto"
    >
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 700 400" preserveAspectRatio="xMidYMid meet">
        {/* Connection lines */}
        {connections.map(([a, b], i) => (
          <motion.line
            key={`line-${i}`}
            x1={points[a].cx}
            y1={points[a].cy}
            x2={points[b].cx}
            y2={points[b].cy}
            stroke="var(--accent-purple)"
            strokeWidth="0.3"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.12 }}
            transition={{ delay: 0.5 + i * 0.08, duration: 0.8 }}
          />
        ))}

        {/* Interactive constellation points */}
        {points.map((point, i) => (
          <ConstellationPoint
            key={`point-${i}`}
            point={point}
            index={i}
            springX={springX}
            springY={springY}
          />
        ))}
      </svg>
    </div>
  );
}

// Breathing geometric ring for the hero
function BreathingRing({ delay = 0, size = 300, color = 'var(--accent-purple)' }: { delay?: number; size?: number; color?: string }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size,
        height: size,
        border: `0.5px solid ${color}`,
        left: '50%',
        top: '50%',
        translateX: '-50%',
        translateY: '-50%',
      }}
      animate={{
        scale: [1, 1.15, 1],
        opacity: [0.04, 0.08, 0.04],
      }}
      transition={{
        duration: 6,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
}

export function HomePage() {
  const { t, lang } = useLang();
  const { isDark } = useTheme();

  return (
    <div className="pt-16 pb-8 px-6 lg:px-12">
      <div className="max-w-[1600px] mx-auto">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="relative mb-28 pt-16 pb-12 text-center"
        >
          {/* Interactive constellation background */}
          <div className="absolute inset-0 overflow-hidden">
            <InteractiveConstellation />
          </div>

          {/* Breathing rings */}
          <BreathingRing delay={0} size={200} color="var(--accent-purple)" />
          <BreathingRing delay={1.5} size={350} color="var(--accent-blue)" />
          <BreathingRing delay={3} size={500} color="var(--accent-rose)" />

          {/* Decorative hero background elements */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <motion.svg
              className="absolute top-8 left-1/2 -translate-x-1/2"
              width="700" height="700" viewBox="0 0 700 700"
              style={{ opacity: 0.025 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 150, repeat: Infinity, ease: 'linear' }}
            >
              <circle cx="350" cy="350" r="340" stroke="currentColor" strokeWidth="0.5" fill="none" />
              <circle cx="350" cy="350" r="280" stroke="currentColor" strokeWidth="0.4" fill="none" />
              <circle cx="350" cy="350" r="220" stroke="currentColor" strokeWidth="0.4" fill="none" />
              <circle cx="350" cy="350" r="160" stroke="currentColor" strokeWidth="0.3" fill="none" />
              <circle cx="350" cy="350" r="100" stroke="currentColor" strokeWidth="0.3" fill="none" />
              {/* Cross lines */}
              <line x1="350" y1="10" x2="350" y2="690" stroke="currentColor" strokeWidth="0.2" />
              <line x1="10" y1="350" x2="690" y2="350" stroke="currentColor" strokeWidth="0.2" />
              <line x1="100" y1="100" x2="600" y2="600" stroke="currentColor" strokeWidth="0.2" />
              <line x1="600" y1="100" x2="100" y2="600" stroke="currentColor" strokeWidth="0.2" />
            </motion.svg>

            {/* Counter-rotating inner geometry */}
            <motion.svg
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              width="300" height="300" viewBox="0 0 300 300"
              style={{ opacity: 0.02 }}
              animate={{ rotate: -360 }}
              transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
            >
              <polygon points="150,10 280,240 20,240" stroke="currentColor" strokeWidth="0.5" fill="none" />
              <polygon points="150,290 20,60 280,60" stroke="currentColor" strokeWidth="0.5" fill="none" />
            </motion.svg>
          </div>

          <motion.div
            {...fadeUp}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="relative z-10"
          >
            <MouseParallax intensity={15} className="inline-block">
              <MagneticElement intensity={0.15}>
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.3, type: 'spring', stiffness: 200, damping: 20 }}
                  className="inline-flex items-center justify-center rounded-full mb-10 relative cursor-pointer"
                  style={{ backgroundColor: 'var(--surface-purple)', width: 72, height: 72 }}
                  whileHover={{ scale: 1.15 }}
                >
                  <Sparkles className="w-8 h-8" style={{ color: 'var(--accent-purple)' }} />
                  <div
                    className="absolute inset-0 rounded-full blur-2xl"
                    style={{ backgroundColor: 'var(--accent-purple)', opacity: 0.15 }}
                  />
                  {/* Orbiting dots */}
                  <motion.div
                    className="absolute w-2 h-2 rounded-full"
                    style={{ backgroundColor: 'var(--accent-gold)', opacity: 0.5 }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                  >
                    <motion.div
                      className="absolute w-2 h-2 rounded-full"
                      style={{ backgroundColor: 'var(--accent-gold)', top: -36, left: 0 }}
                    />
                  </motion.div>
                  <motion.div
                    className="absolute w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: 'var(--accent-blue)', opacity: 0.4 }}
                    animate={{ rotate: -360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                  >
                    <motion.div
                      className="absolute w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: 'var(--accent-blue)', top: -44, left: 0 }}
                    />
                  </motion.div>
                  <motion.div
                    className="absolute w-1 h-1 rounded-full"
                    style={{ backgroundColor: 'var(--accent-rose)', opacity: 0.3 }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                  >
                    <motion.div
                      className="absolute w-1 h-1 rounded-full"
                      style={{ backgroundColor: 'var(--accent-rose)', top: -52, left: 0 }}
                    />
                  </motion.div>
                </motion.div>
              </MagneticElement>
            </MouseParallax>

            <motion.p
              {...fadeUp}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xs uppercase tracking-[0.35em] mb-7"
              style={{ color: 'var(--accent-purple)', fontWeight: 500 }}
            >
              {t('Une collection curatée de sagesse ancienne', 'A Curated Collection of Ancient Wisdom')}
            </motion.p>

            <motion.h1
              {...fadeUp}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="mb-7 max-w-3xl mx-auto"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 4.2rem)' }}
            >
              {t('Explorez les Profondeurs du', 'Explore the Depths of')}
              <br />
              <motion.span
                style={{ color: 'var(--accent-purple)' }}
                animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              >
                {t('Savoir Ésotérique', 'Esoteric Knowledge')}
              </motion.span>
            </motion.h1>

            <motion.p
              {...fadeUp}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="max-w-xl mx-auto mb-10"
              style={{ color: 'var(--muted-foreground)', lineHeight: 1.8 }}
            >
              {t(
                'Symbolisme sacré, mystères anciens et sagesse intemporelle — curatés avec soin pour le chercheur moderne',
                'Sacred symbolism, ancient mysteries, and timeless wisdom — beautifully curated for the modern seeker'
              )}
            </motion.p>

            {/* Decorative line accent below hero text */}
            <motion.div
              {...fadeUp}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="flex items-center justify-center gap-3"
            >
              <motion.div
                className="h-px w-12"
                style={{ background: 'linear-gradient(90deg, transparent, var(--accent-purple))' }}
                animate={{ scaleX: [0.5, 1, 0.5] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.div
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: 'var(--accent-purple)' }}
                animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0.8, 0.4] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              />
              <div className="h-px w-24" style={{ background: 'var(--accent-purple)', opacity: 0.15 }} />
              <motion.div
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: 'var(--accent-purple)' }}
                animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0.8, 0.4] }}
                transition={{ duration: 3, delay: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.div
                className="h-px w-12"
                style={{ background: 'linear-gradient(90deg, var(--accent-purple), transparent)' }}
                animate={{ scaleX: [0.5, 1, 0.5] }}
                transition={{ duration: 4, delay: 2, repeat: Infinity, ease: 'easeInOut' }}
              />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Main Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
          {/* Alchemy - Large Card */}
          <BentoCard
            href="/alchemy"
            className="lg:col-span-2 lg:row-span-2 min-h-[540px] cursor-pointer"
            style={{ backgroundColor: 'var(--surface-purple)' }}
            glowColor="var(--glow-purple)"
            decorative="dots"
            accentBorder="var(--accent-purple)"
          >
            <div className="h-full flex flex-col justify-between relative">
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <MagneticElement intensity={0.2}>
                    <div
                      className="inline-flex p-2.5 rounded-xl"
                      style={{ backgroundColor: 'color-mix(in srgb, var(--accent-purple) 15%, transparent)' }}
                    >
                      <Flame className="w-5 h-5" style={{ color: 'var(--accent-purple)' }} />
                    </div>
                  </MagneticElement>
                  <span className="text-xs uppercase tracking-[0.15em]" style={{ color: 'var(--accent-purple)', fontWeight: 500 }}>
                    {t('Transformation', 'Transformation')}
                  </span>
                </div>
                <h3 className="mb-3">{t('Alchimie', 'Alchemy')}</h3>
                <p className="text-sm max-w-md" style={{ color: 'var(--muted-foreground)', lineHeight: 1.7 }}>
                  {t(
                    "L'art ancien de la transformation — transmutation de la matière et de l'esprit, la quête de la pierre philosophale et de la sagesse éternelle",
                    "The ancient art of transformation — transmutation of matter and spirit, the pursuit of the philosopher's stone and eternal wisdom"
                  )}
                </p>
              </div>

              <div className="relative h-56 lg:h-64 rounded-xl overflow-hidden mt-6">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1457298483369-0a95d2b17fcd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmNpZW50JTIwYWxjaGVtaXN0JTIwbWFudXNjcmlwdCUyMGdvbGQlMjBpbmt8ZW58MXx8fHwxNzczNDMzNzMyfDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt={t('Alchimie', 'Alchemy')}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface-purple)] via-transparent to-transparent" />
                {/* Floating accent shapes over image */}
                <motion.div
                  className="absolute top-3 right-3 opacity-[0.15]"
                  animate={{ rotate: 360, y: [0, -5, 0] }}
                  transition={{
                    rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
                    y: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
                  }}
                >
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <polygon points="16,2 30,28 2,28" stroke="var(--accent-purple)" strokeWidth="0.8" fill="none" />
                  </svg>
                </motion.div>
                <div className="absolute bottom-4 left-4 flex items-center gap-2 text-xs" style={{ color: 'var(--accent-purple)', fontWeight: 500 }}>
                  <span>{t("Explorer l'Alchimie", 'Explore Alchemy')}</span>
                  <motion.div
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </motion.div>
                </div>
              </div>
            </div>
          </BentoCard>

          {/* Symbolism */}
          <BentoCard
            href="/symbolism"
            className="min-h-[260px] cursor-pointer"
            style={{ backgroundColor: 'var(--surface-blue)' }}
            glowColor="var(--glow-blue)"
            decorative="vesica"
            accentBorder="var(--accent-blue)"
          >
            <div className="h-full flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <MagneticElement intensity={0.2}>
                  <div
                    className="inline-flex p-2.5 rounded-xl"
                    style={{ backgroundColor: 'color-mix(in srgb, var(--accent-blue) 15%, transparent)' }}
                  >
                    <Eye className="w-5 h-5" style={{ color: 'var(--accent-blue)' }} />
                  </div>
                </MagneticElement>
                <span className="text-xs uppercase tracking-[0.15em]" style={{ color: 'var(--accent-blue)', fontWeight: 500 }}>
                  {t('Signification', 'Meaning')}
                </span>
              </div>
              <h4 className="mb-2">{t('Symbolisme', 'Symbolism')}</h4>
              <p className="text-sm flex-1" style={{ color: 'var(--muted-foreground)' }}>
                {t(
                  "Significations cachées dans les signes sacrés, archétypes universels et langage visuel de l'âme",
                  'Hidden meanings in sacred signs, universal archetypes, and the visual language of the soul'
                )}
              </p>
              <div className="flex items-center gap-2 mt-4 text-xs" style={{ color: 'var(--accent-blue)', fontWeight: 500 }}>
                <span>{t('Découvrir', 'Discover')}</span>
                <motion.div
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 2, delay: 0.3, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </motion.div>
              </div>
            </div>
          </BentoCard>

          {/* Numerology */}
          <BentoCard
            href="/numerology"
            className="min-h-[260px] cursor-pointer"
            style={{ backgroundColor: 'var(--surface-rose)' }}
            glowColor="var(--glow-rose)"
            decorative="fibonacci"
            accentBorder="var(--accent-rose)"
          >
            <div className="h-full flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <MagneticElement intensity={0.2}>
                  <div
                    className="inline-flex p-2.5 rounded-xl"
                    style={{ backgroundColor: 'color-mix(in srgb, var(--accent-rose) 15%, transparent)' }}
                  >
                    <InfinityIcon className="w-5 h-5" style={{ color: 'var(--accent-rose)' }} />
                  </div>
                </MagneticElement>
                <span className="text-xs uppercase tracking-[0.15em]" style={{ color: 'var(--accent-rose)', fontWeight: 500 }}>
                  {t('Schémas', 'Patterns')}
                </span>
              </div>
              <h4 className="mb-2">{t('Numérologie', 'Numerology')}</h4>
              <p className="text-sm flex-1" style={{ color: 'var(--muted-foreground)' }}>
                {t(
                  'La signification mystique des nombres et le tissu mathématique du cosmos',
                  'The mystical significance of numbers and the mathematical fabric of the cosmos'
                )}
              </p>
              <div className="flex items-center gap-2 mt-4 text-xs" style={{ color: 'var(--accent-rose)', fontWeight: 500 }}>
                <span>{t('Explorer', 'Explore')}</span>
                <motion.div
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 2, delay: 0.6, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </motion.div>
              </div>
            </div>
          </BentoCard>

          {/* Sacred Geometry - Wide Card */}
          <BentoCard
            href="/sacred-geometry"
            className="lg:col-span-2 min-h-[260px] cursor-pointer"
            style={{ backgroundColor: 'var(--surface-gold)' }}
            glowColor="var(--glow-gold)"
            decorative="circle"
            accentBorder="var(--accent-gold)"
          >
            <div className="flex items-start justify-between h-full">
              <div className="flex-1 flex flex-col h-full">
                <div className="flex items-center gap-3 mb-4">
                  <MagneticElement intensity={0.2}>
                    <div
                      className="inline-flex p-2.5 rounded-xl"
                      style={{ backgroundColor: 'color-mix(in srgb, var(--accent-gold) 15%, transparent)' }}
                    >
                      <Hexagon className="w-5 h-5" style={{ color: 'var(--accent-gold)' }} />
                    </div>
                  </MagneticElement>
                  <span className="text-xs uppercase tracking-[0.15em]" style={{ color: 'var(--accent-gold)', fontWeight: 500 }}>
                    {t('Forme', 'Form')}
                  </span>
                </div>
                <h4 className="mb-2">{t('Géométrie Sacrée', 'Sacred Geometry')}</h4>
                <p className="text-sm max-w-md flex-1" style={{ color: 'var(--muted-foreground)' }}>
                  {t(
                    "Proportions divines et motifs qui forment le plan de l'existence, de l'atome à la galaxie",
                    'Divine proportions and patterns that form the blueprint of existence, from the atom to the galaxy'
                  )}
                </p>
                <div className="flex items-center gap-2 mt-4 text-xs" style={{ color: 'var(--accent-gold)', fontWeight: 500 }}>
                  <span>{t('Découvrir', 'Discover')}</span>
                  <motion.div
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 2, delay: 0.9, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </motion.div>
                </div>
              </div>

              {/* Interactive decorative geometric illustration */}
              <MouseParallax intensity={12} className="hidden lg:block relative w-48 h-48 flex-shrink-0">
                <motion.svg
                  viewBox="0 0 200 200"
                  className="w-full h-full"
                  style={{ opacity: 0.08, color: 'var(--accent-gold)' }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
                >
                  <circle cx="100" cy="100" r="80" stroke="currentColor" strokeWidth="0.5" fill="none" />
                  <polygon points="100,20 180,140 20,140" stroke="currentColor" strokeWidth="0.5" fill="none" />
                  <polygon points="100,180 20,60 180,60" stroke="currentColor" strokeWidth="0.5" fill="none" />
                  <circle cx="100" cy="100" r="50" stroke="currentColor" strokeWidth="0.5" fill="none" />
                  <circle cx="100" cy="100" r="20" stroke="currentColor" strokeWidth="0.5" fill="none" />
                  <circle cx="100" cy="100" r="3" fill="currentColor" />
                </motion.svg>
              </MouseParallax>
            </div>
          </BentoCard>
        </div>

        <SectionDivider color="var(--accent-purple)" symbol="star" />

        {/* ── Sacred Atlas Flagship Section ── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6"
        >
          <Link to="/carte" className="block group">
            <div className="relative rounded-3xl overflow-hidden cursor-pointer" style={{ minHeight: '400px' }}>
              {/* Cosmic dark background */}
              <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(6,5,16,0.97) 0%, rgba(12,8,28,0.97) 50%, rgba(8,12,24,0.97) 100%)' }} />

              {/* Animated starfield */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 400" preserveAspectRatio="xMidYMid slice">
                  {Array.from({ length: 60 }, (_, i) => ({ cx: ((i * 179 + 41) % 1200), cy: ((i * 113 + 23) % 400), r: i % 5 === 0 ? 1.2 : 0.55, delay: (i % 9) * 0.5 })).map((s, i) => (
                    <motion.circle key={i} cx={s.cx} cy={s.cy} r={s.r} fill="white"
                      animate={{ opacity: [0.05, 0.2, 0.05] }}
                      transition={{ duration: 2.5 + s.delay, delay: s.delay, repeat: Infinity, ease: 'easeInOut' }} />
                  ))}
                </svg>
              </div>

              {/* Mini decorative map */}
              <div className="absolute inset-0 pointer-events-none">
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 400" preserveAspectRatio="xMidYMid meet">
                  {[105, 210, 315].map((y) => <line key={y} x1="0" y1={y} x2="1200" y2={y} stroke="rgba(123,111,200,0.06)" strokeWidth="0.4" />)}
                  {[200, 400, 600, 800, 1000].map((x) => <line key={x} x1={x} y1="0" x2={x} y2="400" stroke="rgba(123,111,200,0.06)" strokeWidth="0.4" />)}
                  {[
                    { path: 'M 510,75 L 540,65 L 575,68 L 600,78 L 612,93 L 605,108 L 588,118 L 565,122 L 540,120 L 515,111 L 506,96 Z', fill: '#5B8FCC' },
                    { path: 'M 530,128 L 558,125 L 590,127 L 610,140 L 618,162 L 614,188 L 602,210 L 580,225 L 552,228 L 526,218 L 508,196 L 502,170 L 506,148 Z', fill: '#C89B4A' },
                    { path: 'M 628,85 L 668,75 L 738,70 L 818,75 L 878,87 L 920,103 L 944,125 L 946,154 L 930,180 L 900,198 L 852,202 L 796,196 L 740,184 L 694,167 L 658,146 L 632,124 L 624,102 Z', fill: '#C4687C' },
                    { path: 'M 85,55 L 162,44 L 246,51 L 308,70 L 338,90 L 348,116 L 332,148 L 300,172 L 248,185 L 184,188 L 140,174 L 106,150 L 78,120 L 68,88 Z', fill: '#5ABFAA' },
                    { path: 'M 215,192 L 258,182 L 304,190 L 338,208 L 352,234 L 350,260 L 332,290 L 302,308 L 268,308 L 234,292 L 214,268 L 208,240 Z', fill: '#9B6FC4' },
                  ].map((c, i) => (
                    <motion.path key={i} d={c.path} fill={c.fill} stroke={c.fill} strokeWidth="0.7"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.14 }}
                      transition={{ duration: 1.5, delay: 0.3 + i * 0.1 }} />
                  ))}
                  {[
                    { x: 578, y: 90, c: '#5B8FCC' }, { x: 618, y: 150, c: '#C89B4A' }, { x: 648, y: 146, c: '#C89B4A' },
                    { x: 762, y: 165, c: '#C4687C' }, { x: 792, y: 136, c: '#9B6FC4' }, { x: 828, y: 132, c: '#4ABFA0' },
                    { x: 210, y: 188, c: '#5ABFAA' }, { x: 540, y: 108, c: '#9B6FC4' }, { x: 536, y: 198, c: '#C89B4A' }, { x: 642, y: 148, c: '#5ABFAA' },
                  ].map((p, i) => (
                    <motion.circle key={i} cx={p.x} cy={p.y} r={4.5} fill={p.c}
                      animate={{ opacity: [0.55, 1, 0.55], r: [3.5, 5.5, 3.5] }}
                      transition={{ duration: 2 + i * 0.28, delay: i * 0.2, repeat: Infinity, ease: 'easeInOut' }} />
                  ))}
                  {[[578,90,618,150],[618,150,648,146],[648,146,578,90],[762,165,792,136],[792,136,828,132],[642,148,578,90]].map(([x1,y1,x2,y2], i) => (
                    <motion.line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(123,111,200,0.3)" strokeWidth="0.7" strokeDasharray="4 6"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 0.28 }}
                      transition={{ delay: 0.8 + i * 0.15, duration: 2 }} />
                  ))}
                </svg>
              </div>

              {/* Edge fades */}
              <div className="absolute inset-y-0 left-0 w-24 pointer-events-none" style={{ background: 'linear-gradient(90deg, rgba(6,5,16,0.7), transparent)' }} />
              <div className="absolute inset-y-0 right-0 w-32 pointer-events-none" style={{ background: 'linear-gradient(270deg, rgba(6,5,16,0.7), transparent)' }} />

              {/* Text content */}
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 p-8 md:p-12 min-h-[400px]">
                <div className="max-w-xl">
                  <motion.div className="flex items-center gap-2 mb-5" initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}>
                      <Compass className="w-4 h-4" style={{ color: 'rgba(120,165,225,0.75)' }} />
                    </motion.div>
                    <span className="text-xs uppercase tracking-[0.3em]" style={{ color: 'rgba(120,165,225,0.75)', fontWeight: 500 }}>
                      {t('Atlas des Traditions Sacrées', 'Atlas of Sacred Traditions')}
                    </span>
                  </motion.div>
                  <motion.h2 initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }} className="mb-4"
                    style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2rem, 3.2vw, 3rem)', color: '#fff', lineHeight: 1.15 }}>
                    {t('Voyagez à travers les', 'Journey through the')}<br />
                    <span style={{ color: 'rgba(130,175,240,0.92)' }}>{t('Traditions de Sagesse du Monde', 'World\'s Wisdom Traditions')}</span>
                  </motion.h2>
                  <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.5 }} className="text-sm mb-8"
                    style={{ color: 'rgba(195,190,220,0.7)', lineHeight: 1.9 }}>
                    {t(
                      "De l'Égypte ancienne au Tibet, du soufisme aux Mayas — une carte interactive pour explorer les connexions entre onze grandes traditions spirituelles.",
                      "From ancient Egypt to Tibet, from Sufism to the Maya — an interactive map exploring the connections between eleven great spiritual traditions."
                    )}
                  </motion.p>
                  <motion.div initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.6 }} className="flex items-center gap-4 flex-wrap">
                    <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm transition-all duration-300"
                      style={{ background: 'linear-gradient(135deg, rgba(80,95,195,0.75), rgba(55,150,195,0.65))', color: '#fff', border: '1px solid rgba(130,155,225,0.3)', fontWeight: 500 }}>
                      <Map className="w-4 h-4" />
                      {t('Ouvrir la Carte', 'Open the Map')}
                      <motion.div animate={{ x: [0, 4, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </motion.div>
                    </span>
                    <div className="flex items-center gap-5">
                      {[{ n: '11', l: t('Traditions', 'Traditions') }, { n: '5000+', l: t('ans de sagesse', 'yrs of wisdom') }].map((s) => (
                        <div key={s.l} className="text-center">
                          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.5rem', fontWeight: 700, color: 'rgba(175,195,235,0.9)', lineHeight: 1 }}>{s.n}</div>
                          <div className="text-[9px] uppercase tracking-[0.1em] mt-0.5" style={{ color: 'rgba(150,145,190,0.5)' }}>{s.l}</div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </div>
                {/* Decorative rotating globe */}
                <div className="hidden lg:flex items-center justify-center relative w-56 h-56 flex-shrink-0">
                  <motion.svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" animate={{ rotate: 360 }} transition={{ duration: 55, repeat: Infinity, ease: 'linear' }} style={{ opacity: 0.07 }}>
                    <circle cx="100" cy="100" r="88" stroke="rgba(120,175,220,1)" strokeWidth="0.5" fill="none" />
                    <circle cx="100" cy="100" r="62" stroke="rgba(120,175,220,1)" strokeWidth="0.4" fill="none" />
                    <circle cx="100" cy="100" r="36" stroke="rgba(120,175,220,1)" strokeWidth="0.3" fill="none" />
                    {[0, 30, 60, 90, 120, 150].map((a) => (
                      <line key={a} x1={100 + 88 * Math.cos(a * Math.PI / 180)} y1={100 + 88 * Math.sin(a * Math.PI / 180)} x2={100 - 88 * Math.cos(a * Math.PI / 180)} y2={100 - 88 * Math.sin(a * Math.PI / 180)} stroke="rgba(120,175,220,1)" strokeWidth="0.25" />
                    ))}
                  </motion.svg>
                  <motion.svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" animate={{ rotate: -360 }} transition={{ duration: 35, repeat: Infinity, ease: 'linear' }} style={{ opacity: 0.1 }}>
                    <circle cx="100" cy="100" r="88" stroke="rgba(200,155,74,1)" strokeWidth="0.3" fill="none" strokeDasharray="4 8" />
                    <circle cx="100" cy="100" r="48" stroke="rgba(200,155,74,1)" strokeWidth="0.3" fill="none" strokeDasharray="3 7" />
                  </motion.svg>
                  <motion.div className="w-3.5 h-3.5 rounded-full relative z-10" style={{ backgroundColor: 'rgba(120,175,220,0.65)' }} animate={{ scale: [1, 1.6, 1], opacity: [0.6, 1, 0.6] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }} />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(100,155,225,0.45), transparent)' }} />
            </div>
          </Link>
        </motion.div>

        {/* ── Reference Tools Row ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7 }}
          className="mb-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] block mb-1" style={{ color: 'var(--muted-foreground)', fontWeight: 500 }}>
                {t('Outils de Référence', 'Reference Tools')}
              </span>
              <h3 style={{ fontSize: '1rem', color: 'var(--foreground)' }}>
                {t('Pour explorer en profondeur', 'For deep exploration')}
              </h3>
            </div>
            <Link to="/recherche" className="hidden sm:flex items-center gap-1.5 text-xs transition-opacity hover:opacity-80"
              style={{ color: 'var(--accent-purple)', fontWeight: 500 }}>
              {t('Recherche avancée', 'Advanced search')} <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {[
              { to: '/chronologie', icon: '⟡', labelFr: 'Chronologie', labelEn: 'Timeline', descFr: '35 000 ans de sagesse', descEn: '35,000 years of wisdom', color: 'var(--accent-gold)', surface: 'var(--surface-gold)' },
              { to: '/comparer', icon: '⇌', labelFr: 'Comparaisons', labelEn: 'Comparisons', descFr: '6 fiches côte à côte', descEn: '6 side-by-side fiches', color: 'var(--accent-teal)', surface: 'var(--surface-teal)' },
              { to: '/questions', icon: '?', labelFr: 'Questions', labelEn: 'Questions', descFr: 'Vraies réponses rigoureuses', descEn: 'Real rigorous answers', color: 'var(--accent-rose)', surface: 'var(--surface-rose)' },
              { to: '/parcours', icon: '→', labelFr: 'Parcours', labelEn: 'Reading Paths', descFr: '5 voies d\'exploration', descEn: '5 exploration paths', color: 'var(--accent-mint)', surface: 'var(--surface-mint)' },
              { to: '/recherche', icon: '✦', labelFr: 'Recherche', labelEn: 'Search', descFr: 'Index complet multi-filtres', descEn: 'Full multi-filter index', color: 'var(--accent-purple)', surface: 'var(--surface-purple)' },
            ].map((tool, i) => (
              <motion.div
                key={tool.to}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
              >
                <Link
                  to={tool.to}
                  className="flex flex-col items-center text-center p-4 rounded-2xl transition-all duration-250 group block"
                  style={{ backgroundColor: 'var(--muted)', border: '1px solid var(--border-subtle)' }}
                >
                  <motion.div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                    style={{ backgroundColor: tool.surface }}
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <span style={{ color: tool.color, fontSize: '1.1rem', fontWeight: 600 }}>{tool.icon}</span>
                  </motion.div>
                  <span className="text-xs block mb-1" style={{ color: 'var(--foreground)', fontWeight: 500 }}>
                    {t(tool.labelFr, tool.labelEn)}
                  </span>
                  <span className="text-[10px]" style={{ color: 'var(--muted-foreground)' }}>
                    {t(tool.descFr, tool.descEn)}
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Secondary Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
          {/* Featured Content Card */}
          <BentoCard
            className="md:col-span-2 min-h-[380px]"
            style={{ backgroundColor: 'var(--surface-mint)' }}
            glowColor="var(--glow-mint)"
            decorative="dots"
            accentBorder="var(--accent-mint)"
          >
            <div className="flex flex-col h-full">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-5">
                  <MagneticElement intensity={0.2}>
                    <div
                      className="inline-flex p-2 rounded-lg"
                      style={{ backgroundColor: 'color-mix(in srgb, var(--accent-mint) 15%, transparent)' }}
                    >
                      <Star className="w-4 h-4" style={{ color: 'var(--accent-mint)' }} />
                    </div>
                  </MagneticElement>
                  <span className="text-xs uppercase tracking-[0.15em]" style={{ color: 'var(--accent-mint)', fontWeight: 500 }}>
                    {t('Savoir en Vedette', 'Featured Knowledge')}
                  </span>
                </div>
                <h3 className="mb-4">{t('La Table d\'Émeraude', 'The Emerald Tablet')}</h3>
                <p className="text-sm max-w-xl" style={{ color: 'var(--muted-foreground)', lineHeight: 1.8 }}>
                  {t(
                    'L\'un des textes les plus vénérés de la tradition ésotérique occidentale, contenant les principes fondamentaux de l\'alchimie et de la philosophie hermétique.',
                    'One of the most revered texts in Western esoteric tradition, containing the fundamental principles of alchemy and hermetic philosophy.'
                  )}{' '}
                  <em style={{ color: 'var(--accent-mint)', fontStyle: 'italic' }}>
                    {t('"Ce qui est en haut est comme ce qui est en bas"', '"As above, so below"')}
                  </em>{' '}
                  {t(
                    '— cette sagesse ancienne révèle la nature interconnectée de toute existence.',
                    '— this ancient wisdom reveals the interconnected nature of all existence.'
                  )}
                </p>
              </div>

              <div className="flex items-center justify-between mt-6 pt-5" style={{ borderTop: '1px solid var(--border-subtle)' }}>
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-1.5">
                    {[Flame, Eye, InfinityIcon].map((Icon, i) => (
                      <motion.div
                        key={i}
                        className="w-7 h-7 rounded-full flex items-center justify-center"
                        style={{
                          backgroundColor: i === 0 ? 'var(--accent-purple)' : i === 1 ? 'var(--accent-blue)' : 'var(--accent-rose)',
                          border: '2px solid var(--surface-mint)',
                        }}
                        whileHover={{ scale: 1.2, zIndex: 10 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      >
                        <Icon className="w-3 h-3 text-white" />
                      </motion.div>
                    ))}
                  </div>
                  <span className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
                    {t('12 concepts interconnectés', '12 interconnected concepts')}
                  </span>
                </div>
              </div>
            </div>
          </BentoCard>

          {/* Stats Card */}
          <BentoCard
            className="min-h-[380px]"
            decorative="lines"
            glowColor="var(--glow-purple)"
          >
            <div className="flex flex-col h-full justify-between">
              <div>
                <span className="text-xs uppercase tracking-[0.2em] mb-8 block" style={{ color: 'var(--muted-foreground)', fontWeight: 500 }}>
                  {t('Base de Connaissances', 'Knowledge Base')}
                </span>

                <div className="space-y-7">
                  {[
                    { value: '240+', label: t('Concepts sacrés', 'Sacred concepts'), color: 'var(--accent-purple)' },
                    { value: '12', label: t('Traditions majeures', 'Major traditions'), color: 'var(--accent-blue)' },
                    { value: '5000+', label: t('Années de sagesse', 'Years of wisdom'), color: 'var(--accent-rose)' },
                  ].map((stat, i) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.15 }}
                    >
                      <div className="flex items-baseline gap-2">
                        <AnimatedCounter
                          value={stat.value}
                          style={{ fontSize: '2rem', fontWeight: 700, color: stat.color, fontFamily: "'Cormorant Garamond', serif" }}
                          duration={2.5}
                        />
                      </div>
                      <div className="text-xs mt-1" style={{ color: 'var(--muted-foreground)' }}>
                        {stat.label}
                      </div>
                      <div className="h-px mt-3" style={{ backgroundColor: 'var(--border)' }} />
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </BentoCard>
        </div>

        <SectionDivider color="var(--accent-blue)" symbol="diamond" />

        {/* Visual Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-6">
          {[
            {
              src: 'https://images.unsplash.com/photo-1630189174104-b6ddd0c885be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcnlzdGFsJTIwYW1ldGh5c3QlMjBwdXJwbGUlMjBtaW5lcmFsJTIwY2xvc2V8ZW58MXx8fHwxNzczNDMzNzM0fDA&ixlib=rb-4.1.0&q=80&w=1080',
              label: t('Sagesse Cristalline', 'Crystal Wisdom'),
              sub: t('Intelligence Minérale', 'Mineral Intelligence'),
            },
            {
              src: 'https://images.unsplash.com/photo-1760053618329-649a25dfab88?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmNpZW50JTIwdGVtcGxlJTIwY29sdW1ucyUyMGdvbGRlbiUyMGxpZ2h0fGVufDF8fHx8MTc3MzQzMzczN3ww&ixlib=rb-4.1.0&q=80&w=1080',
              label: t('Temples Anciens', 'Ancient Temples'),
              sub: t('Architecture Sacrée', 'Sacred Architecture'),
            },
            {
              src: 'https://images.unsplash.com/photo-1765207663362-bad07a16fbb4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjZWxlc3RpYWwlMjBzdGFyJTIwY29uc3RlbGxhdGlvbiUyMGRhcmslMjBza3l8ZW58MXx8fHwxNzczNDMzNzMzfDA&ixlib=rb-4.1.0&q=80&w=1080',
              label: t('Corps Célestes', 'Celestial Bodies'),
              sub: t('Motifs Cosmiques', 'Cosmic Patterns'),
            },
            {
              src: 'https://images.unsplash.com/photo-1762541115443-d83816da748c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmNlbnNlJTIwc21va2UlMjBtZWRpdGF0aW9uJTIwcml0dWFsJTIwZGFya3xlbnwxfHx8fDE3NzM0MzM3MzR8MA&ixlib=rb-4.1.0&q=80&w=1080',
              label: t('Paix Intérieure', 'Inner Peace'),
              sub: t('Contemplation', 'Contemplation'),
            },
          ].map((item) => (
            <BentoCard key={item.label} className="min-h-[240px] overflow-hidden cursor-pointer !p-0">
              <div className="absolute inset-0">
                <ImageWithFallback
                  src={item.src}
                  alt={item.label}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
              </div>
              <div className="relative z-10 h-full flex flex-col justify-end p-5">
                <span className="text-white text-sm mb-0.5" style={{ fontWeight: 500 }}>{item.label}</span>
                <span className="text-white/50 text-xs">{item.sub}</span>
              </div>
            </BentoCard>
          ))}
        </div>

        {/* Quote Card */}
        <BentoCard
          className="mb-6"
          style={{
            background: 'linear-gradient(135deg, var(--surface-purple) 0%, var(--surface-blue) 50%, var(--surface-rose) 100%)',
          }}
          decorative="circle"
          glowColor="var(--glow-purple)"
        >
          <div className="py-10 text-center max-w-2xl mx-auto relative">
            {/* Decorative quotes symbol */}
            <div className="flex items-center justify-center gap-3 mb-6">
              <motion.div
                className="h-px w-16"
                style={{ background: 'linear-gradient(90deg, transparent, var(--accent-purple))', opacity: 0.2 }}
                animate={{ scaleX: [0.6, 1, 0.6] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.svg
                width="20" height="20" viewBox="0 0 20 20" style={{ opacity: 0.12 }}
                animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                transition={{
                  rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
                  scale: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
                }}
              >
                <path d="M10 0L12 8L20 10L12 12L10 20L8 12L0 10L8 8L10 0Z" fill="var(--accent-purple)" />
              </motion.svg>
              <motion.div
                className="h-px w-16"
                style={{ background: 'linear-gradient(90deg, var(--accent-purple), transparent)', opacity: 0.2 }}
                animate={{ scaleX: [0.6, 1, 0.6] }}
                transition={{ duration: 5, delay: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>
            <p
              className="text-xl md:text-2xl mb-5"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', lineHeight: 1.6, color: 'var(--foreground)' }}
            >
              {t(
                '"Le cosmos est en nous. Nous sommes faits de poussière d\'étoiles. Nous sommes un moyen pour l\'univers de se connaître lui-même."',
                '"The cosmos is within us. We are made of star-stuff. We are a way for the universe to know itself."'
              )}
            </p>
            <span className="text-xs uppercase tracking-[0.2em]" style={{ color: 'var(--muted-foreground)', fontWeight: 500 }}>
              Carl Sagan
            </span>
          </div>
        </BentoCard>

        <SectionDivider color="var(--accent-teal)" symbol="diamond" />

        {/* New Categories — Conscience & Cosmologie */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
          <BentoCard
            href="/conscience"
            className="min-h-[280px] cursor-pointer"
            style={{ backgroundColor: 'var(--surface-teal)' }}
            glowColor="var(--glow-teal)"
            accentBorder="var(--accent-teal)"
          >
            <div className="h-full flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <MagneticElement intensity={0.2}>
                  <div className="inline-flex p-2.5 rounded-xl" style={{ backgroundColor: 'color-mix(in srgb, var(--accent-teal) 15%, transparent)' }}>
                    <Waves className="w-5 h-5" style={{ color: 'var(--accent-teal)' }} />
                  </div>
                </MagneticElement>
                <span className="text-xs uppercase tracking-[0.15em]" style={{ color: 'var(--accent-teal)', fontWeight: 500 }}>
                  {t('Nouveau', 'New')}
                </span>
              </div>
              <h3 className="mb-3">{t('Conscience & Éveil', 'Consciousness & Awakening')}</h3>
              <p className="text-sm flex-1" style={{ color: 'var(--muted-foreground)', lineHeight: 1.7 }}>
                {t(
                  "Chakras, kundalini, méditation, fréquences, accords toltèques, moment présent — une exploration rigoureuse des traditions contemplatives et des neurosciences de la conscience.",
                  "Chakras, kundalini, meditation, frequencies, Toltec agreements, present moment — a rigorous exploration of contemplative traditions and the neuroscience of consciousness."
                )}
              </p>
              <div className="flex flex-wrap gap-1.5 mt-4 mb-3">
                {['Chakras', 'Éveil', 'Méditation', 'Fréquences', 'Accords Toltèques'].map((tag) => (
                  <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full" style={{ backgroundColor: 'color-mix(in srgb, var(--accent-teal) 12%, transparent)', color: 'var(--accent-teal)' }}>
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--accent-teal)', fontWeight: 500 }}>
                <span>{t('Explorer', 'Explore')}</span>
                <motion.div animate={{ x: [0, 4, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>
                  <ArrowRight className="w-3.5 h-3.5" />
                </motion.div>
              </div>
            </div>
          </BentoCard>

          <BentoCard
            href="/cosmologie"
            className="min-h-[280px] cursor-pointer"
            style={{ backgroundColor: 'var(--surface-cosmic)' }}
            glowColor="var(--glow-cosmic)"
            accentBorder="var(--accent-cosmic)"
          >
            <div className="h-full flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <MagneticElement intensity={0.2}>
                  <div className="inline-flex p-2.5 rounded-xl" style={{ backgroundColor: 'color-mix(in srgb, var(--accent-cosmic) 15%, transparent)' }}>
                    <Globe className="w-5 h-5" style={{ color: 'var(--accent-cosmic)' }} />
                  </div>
                </MagneticElement>
                <span className="text-xs uppercase tracking-[0.15em]" style={{ color: 'var(--accent-cosmic)', fontWeight: 500 }}>
                  {t('Nouveau', 'New')}
                </span>
              </div>
              <h3 className="mb-3">{t('Cosmologie Sacrée', 'Sacred Cosmology')}</h3>
              <p className="text-sm flex-1" style={{ color: 'var(--muted-foreground)', lineHeight: 1.7 }}>
                {t(
                  "Archanges, voyage astral, mémoire stellaire, corps de lumière — les traditions du cosmos, de l'invisible et des dimensions au-delà du visible, présentées avec clarté et rigueur.",
                  "Archangels, astral travel, stellar memory, light body — traditions of the cosmos, the invisible, and dimensions beyond the visible, presented with clarity and rigor."
                )}
              </p>
              <div className="flex flex-wrap gap-1.5 mt-4 mb-3">
                {['Archanges', 'Voyage Astral', 'Mémoire Stellaire', 'Corps de Lumière'].map((tag) => (
                  <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full" style={{ backgroundColor: 'color-mix(in srgb, var(--accent-cosmic) 12%, transparent)', color: 'var(--accent-cosmic)' }}>
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--accent-cosmic)', fontWeight: 500 }}>
                <span>{t('Explorer', 'Explore')}</span>
                <motion.div animate={{ x: [0, 4, 0] }} transition={{ duration: 2, delay: 0.4, repeat: Infinity, ease: 'easeInOut' }}>
                  <ArrowRight className="w-3.5 h-3.5" />
                </motion.div>
              </div>
            </div>
          </BentoCard>
        </div>

        <SectionDivider color="var(--accent-purple)" symbol="star" />

        {/* ── Bibliothèque de Savoirs Teaser ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7 }}
          className="mb-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] block mb-1" style={{ color: 'var(--accent-purple)', fontWeight: 500 }}>
                {t('Bibliothèque de Savoirs', 'Knowledge Library')}
              </span>
              <h3 style={{ fontSize: '1rem', color: 'var(--foreground)' }}>
                {t('Sujets approfondis, sources, débats', 'Deep subjects, sources, debates')}
              </h3>
            </div>
            <Link to="/savoirs" className="hidden sm:flex items-center gap-1.5 text-xs transition-opacity hover:opacity-80"
              style={{ color: 'var(--accent-purple)', fontWeight: 500 }}>
              <Layers className="w-3.5 h-3.5" />
              {t('Voir tous les sujets', 'See all subjects')}
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {richSubjects.slice(0, 6).map((subject, i) => {
              const axisConfig = AXIS_CONFIG[subject.axis];
              return (
                <motion.div key={subject.id} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
                  <Link to={`/sujet/${subject.id}`}
                    className="flex flex-col p-4 rounded-2xl transition-all duration-200 hover:scale-[1.01] group block"
                    style={{ backgroundColor: isDark ? 'rgba(255,255,255,0.025)' : 'rgba(255,255,255,0.85)', border: '1px solid var(--border-subtle)' }}>
                    <div style={{ height: '2px', background: `linear-gradient(90deg, ${subject.color}, transparent)`, borderRadius: '99px', marginBottom: '10px' }} />
                    <span className="text-[9px] uppercase tracking-[0.12em] mb-1" style={{ color: axisConfig.color, fontWeight: 500 }}>
                      {lang === 'fr' ? axisConfig.labelFr : axisConfig.labelEn}
                    </span>
                    <p className="text-sm mb-1" style={{ color: 'var(--foreground)', fontFamily: "'Cormorant Garamond', serif", fontSize: '1rem', lineHeight: 1.2 }}>
                      {lang === 'fr' ? subject.titleFr : subject.titleEn}
                    </p>
                    <p className="text-[11px] mb-2.5" style={{ color: 'var(--muted-foreground)', lineHeight: 1.55 }}>
                      {(lang === 'fr' ? subject.definitionFr : subject.definitionEn).slice(0, 90)}…
                    </p>
                    <div className="flex flex-wrap gap-1 mt-auto">
                      {subject.infoBadges.slice(0, 2).map((badge) => (
                        <span key={badge} className="text-[9px] px-1.5 py-0.5 rounded-full"
                          style={{ backgroundColor: `color-mix(in srgb, ${INFO_TYPE_CONFIG[badge].color} 8%, transparent)`, color: INFO_TYPE_CONFIG[badge].color }}>
                          {lang === 'fr' ? INFO_TYPE_CONFIG[badge].labelFr : INFO_TYPE_CONFIG[badge].labelEn}
                        </span>
                      ))}
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
          <div className="text-center mt-4">
            <Link to="/savoirs" className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-opacity hover:opacity-80 sm:hidden"
              style={{ backgroundColor: 'var(--surface-purple)', color: 'var(--accent-purple)', border: '1px solid var(--border-subtle)' }}>
              <Layers className="w-3.5 h-3.5" />
              {t('Voir tous les sujets', 'See all subjects')}
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </motion.div>

        <SectionDivider color="var(--accent-gold)" symbol="star" />

        {/* L'Ascension Teaser */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-6"
        >
          <BentoCard
            className="min-h-[360px] overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, var(--surface-gold) 0%, var(--surface-cosmic) 60%, var(--surface-purple) 100%)',
            }}
            glowColor="var(--glow-gold)"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full items-center">
              <div>
                <div className="flex items-center gap-2 mb-5">
                  <span
                    className="text-xs px-3 py-1 rounded-full"
                    style={{ backgroundColor: 'rgba(200,168,90,0.12)', color: 'var(--accent-gold)', fontWeight: 600, border: '1px solid rgba(200,168,90,0.2)' }}
                  >
                    ✦ {t('Expérience Premium', 'Premium Experience')}
                  </span>
                </div>
                <h2 className="mb-4" style={{ color: 'var(--foreground)' }}>
                  {t("L'Ascension", "L'Ascension")}
                </h2>
                <p className="text-sm mb-6" style={{ color: 'var(--muted-foreground)', lineHeight: 1.9 }}>
                  {t(
                    "Un parcours guidé, progressif et intelligent en 7 étapes — de l'éveil de la conscience à l'union avec le Tout. Pratiques, réflexions, questions profondes et journal personnel. Non pas un cours, mais un chemin.",
                    "A guided, progressive, intelligent journey in 7 stages — from the awakening of consciousness to union with the Whole. Practices, reflections, deep questions, and personal journal. Not a course, but a path."
                  )}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {[
                    { n: '1', labelFr: "L'Éveil", labelEn: 'Awakening', color: 'var(--accent-teal)', locked: false },
                    { n: '2', labelFr: "L'Observation", labelEn: 'Observation', color: 'var(--accent-blue)', locked: false },
                    { n: '3', labelFr: "La Clarté", labelEn: 'Clarity', color: 'var(--accent-purple)', locked: true },
                    { n: '4+', labelFr: '4 étapes…', labelEn: '4 more…', color: 'var(--accent-gold)', locked: true },
                  ].map((step) => (
                    <div
                      key={step.n}
                      className="flex items-center gap-2 text-xs px-3 py-1.5 rounded-full"
                      style={{
                        backgroundColor: step.locked ? 'rgba(0,0,0,0.05)' : `color-mix(in srgb, ${step.color} 12%, transparent)`,
                        border: `1px solid ${step.locked ? 'var(--border-subtle)' : `color-mix(in srgb, ${step.color} 25%, transparent)`}`,
                        color: step.locked ? 'var(--muted-foreground)' : step.color,
                        opacity: step.locked ? 0.6 : 1,
                      }}
                    >
                      {step.locked && <Lock className="w-3 h-3" />}
                      <span style={{ fontWeight: 500 }}>{t(step.labelFr, step.labelEn)}</span>
                    </div>
                  ))}
                </div>
                <Link
                  to="/ascension"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm transition-all hover:opacity-90"
                  style={{ backgroundColor: 'var(--accent-gold)', color: '#fff', fontWeight: 600 }}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  {t("Commencer l'Ascension", "Begin the Ascension")}
                </Link>
              </div>

              <div className="hidden lg:flex items-center justify-center">
                <div className="relative">
                  {/* Stacked stage cards preview */}
                  {[3, 2, 1].map((offset) => (
                    <motion.div
                      key={offset}
                      className="absolute rounded-2xl"
                      style={{
                        width: 200,
                        height: 120,
                        top: -offset * 8,
                        left: -offset * 6,
                        backgroundColor: offset === 3
                          ? 'var(--surface-purple)'
                          : offset === 2
                          ? 'var(--surface-gold)'
                          : 'var(--card)',
                        border: '1px solid var(--border-subtle)',
                        boxShadow: 'var(--card-shadow)',
                      }}
                      animate={{ y: [0, -3, 0] }}
                      transition={{ duration: 4 + offset, repeat: Infinity, ease: 'easeInOut', delay: offset * 0.5 }}
                    />
                  ))}
                  <motion.div
                    className="relative rounded-2xl p-5 z-10"
                    style={{
                      width: 200,
                      backgroundColor: 'var(--card)',
                      border: '1px solid var(--border)',
                      boxShadow: 'var(--card-shadow-hover)',
                    }}
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs" style={{ backgroundColor: 'var(--surface-teal)', color: 'var(--accent-teal)', fontWeight: 700 }}>1</div>
                      <span className="text-xs" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, fontSize: '0.95rem' }}>{t("L'Éveil", "Awakening")}</span>
                    </div>
                    <p className="text-xs mb-3" style={{ color: 'var(--muted-foreground)', lineHeight: 1.6 }}>
                      {t("Se réveiller à une réalité plus vaste…", "Awakening to a broader reality…")}
                    </p>
                    <div className="w-full h-1 rounded-full" style={{ backgroundColor: 'var(--muted)' }}>
                      <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: 'var(--accent-teal)' }}
                        animate={{ width: ['0%', '65%'] }}
                        transition={{ duration: 2, delay: 1 }}
                      />
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </BentoCard>
        </motion.div>

        {/* Carte & Sources Teasers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
          <Link to="/carte" className="block">
            <BentoCard
              className="min-h-[200px] cursor-pointer"
              style={{ backgroundColor: 'var(--surface-blue)' }}
              glowColor="var(--glow-blue)"
              accentBorder="var(--accent-blue)"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="inline-flex p-2.5 rounded-xl" style={{ backgroundColor: 'color-mix(in srgb, var(--accent-blue) 15%, transparent)' }}>
                  <Map className="w-5 h-5" style={{ color: 'var(--accent-blue)' }} />
                </div>
                <span className="text-xs uppercase tracking-[0.15em]" style={{ color: 'var(--accent-blue)', fontWeight: 500 }}>
                  {t('Nouvelle section', 'New section')}
                </span>
              </div>
              <h4 className="mb-2">{t('Carte des Traditions', 'Map of Traditions')}</h4>
              <p className="text-sm" style={{ color: 'var(--muted-foreground)', lineHeight: 1.7 }}>
                {t(
                  "Une cartographie interactive des sagesses du monde — de l'Égypte ancienne au Tibet, de la Mésoamérique à l'Afrique des Dogon.",
                  "An interactive map of world wisdoms — from Ancient Egypt to Tibet, from Mesoamerica to the Africa of the Dogon."
                )}
              </p>
              <div className="flex items-center gap-2 mt-4 text-xs" style={{ color: 'var(--accent-blue)', fontWeight: 500 }}>
                <span>{t('Explorer la carte', 'Explore the map')}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </BentoCard>
          </Link>

          <Link to="/sources" className="block">
            <BentoCard
              className="min-h-[200px] cursor-pointer"
              style={{ backgroundColor: 'var(--surface-gold)' }}
              glowColor="var(--glow-gold)"
              accentBorder="var(--accent-gold)"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="inline-flex p-2.5 rounded-xl" style={{ backgroundColor: 'color-mix(in srgb, var(--accent-gold) 15%, transparent)' }}>
                  <Library className="w-5 h-5" style={{ color: 'var(--accent-gold)' }} />
                </div>
                <span className="text-xs uppercase tracking-[0.15em]" style={{ color: 'var(--accent-gold)', fontWeight: 500 }}>
                  {t('Bibliothèque', 'Library')}
                </span>
              </div>
              <h4 className="mb-2">{t('Sources & Références', 'Sources & References')}</h4>
              <p className="text-sm" style={{ color: 'var(--muted-foreground)', lineHeight: 1.7 }}>
                {t(
                  "Textes fondateurs, études scientifiques, penseurs, conférences — distinctions claires entre tradition, science et témoignage.",
                  "Founding texts, scientific studies, thinkers, conferences — clear distinctions between tradition, science, and testimony."
                )}
              </p>
              <div className="flex items-center gap-2 mt-4 text-xs" style={{ color: 'var(--accent-gold)', fontWeight: 500 }}>
                <span>{t('Voir la bibliothèque', 'See the library')}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </BentoCard>
          </Link>
        </div>
      </div>
    </div>
  );
}