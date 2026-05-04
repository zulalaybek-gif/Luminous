import { ReactNode, useRef, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Link } from 'react-router';

interface BentoCardProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  href?: string;
  onClick?: () => void;
  glowColor?: string;
  decorative?: 'dots' | 'lines' | 'circle' | 'cross' | 'vesica' | 'fibonacci' | 'none';
  accentBorder?: string;
}

function DecoElement({ type, color }: { type: string; color?: string }) {
  const c = color || 'var(--accent-purple)';
  switch (type) {
    case 'dots':
      return (
        <div className="absolute top-4 right-4 opacity-[0.08]">
          <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
            {[0, 1, 2, 3, 4].map(row =>
              [0, 1, 2, 3, 4].map(col => (
                <circle key={`${row}-${col}`} cx={4 + col * 12} cy={4 + row * 12} r={row === col ? 2 : 1} fill={c} />
              ))
            )}
          </svg>
        </div>
      );
    case 'lines':
      return (
        <div className="absolute bottom-4 right-4 opacity-[0.07]">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <line x1="0" y1="48" x2="48" y2="0" stroke={c} strokeWidth="0.5" />
            <line x1="0" y1="36" x2="36" y2="0" stroke={c} strokeWidth="0.5" />
            <line x1="0" y1="24" x2="24" y2="0" stroke={c} strokeWidth="0.5" />
            <line x1="0" y1="12" x2="12" y2="0" stroke={c} strokeWidth="0.5" />
          </svg>
        </div>
      );
    case 'circle':
      return (
        <div className="absolute -bottom-10 -right-10 opacity-[0.05]">
          <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
            <circle cx="50" cy="50" r="48" stroke={c} strokeWidth="0.5" />
            <circle cx="50" cy="50" r="36" stroke={c} strokeWidth="0.5" />
            <circle cx="50" cy="50" r="24" stroke={c} strokeWidth="0.5" />
            <circle cx="50" cy="50" r="12" stroke={c} strokeWidth="0.5" />
            <circle cx="50" cy="50" r="2" fill={c} />
          </svg>
        </div>
      );
    case 'cross':
      return (
        <div className="absolute top-4 right-4 opacity-[0.07]">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <path d="M14 0L14 28M0 14L28 14" stroke={c} strokeWidth="0.5" />
            <path d="M4 4L24 24M24 4L4 24" stroke={c} strokeWidth="0.3" />
          </svg>
        </div>
      );
    case 'vesica':
      return (
        <div className="absolute top-4 right-4 opacity-[0.06]">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <circle cx="18" cy="24" r="16" stroke={c} strokeWidth="0.5" fill="none" />
            <circle cx="30" cy="24" r="16" stroke={c} strokeWidth="0.5" fill="none" />
          </svg>
        </div>
      );
    case 'fibonacci':
      return (
        <div className="absolute bottom-3 right-3 opacity-[0.05]">
          <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
            <path d="M0 60 A60 60 0 0 1 60 0" stroke={c} strokeWidth="0.5" fill="none" />
            <path d="M0 60 A37 37 0 0 0 37 23" stroke={c} strokeWidth="0.5" fill="none" />
            <path d="M37 23 A23 23 0 0 0 14 46" stroke={c} strokeWidth="0.5" fill="none" />
            <path d="M14 46 A14 14 0 0 0 28 32" stroke={c} strokeWidth="0.5" fill="none" />
          </svg>
        </div>
      );
    default:
      return null;
  }
}

// Cursor-following spotlight inside card
function CardSpotlight({
  mouseX,
  mouseY,
  glowColor,
}: {
  mouseX: ReturnType<typeof useMotionValue<number>>;
  mouseY: ReturnType<typeof useMotionValue<number>>;
  glowColor?: string;
}) {
  const color = glowColor || 'rgba(123, 111, 200, 0.12)';
  const background = useTransform(
    [mouseX, mouseY],
    ([x, y]) => `radial-gradient(400px circle at ${x}px ${y}px, ${color} 0%, transparent 60%)`
  );
  return (
    <motion.div
      className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      style={{ background }}
    />
  );
}

export function BentoCard({
  children,
  className = '',
  style,
  href,
  onClick,
  glowColor,
  decorative = 'none',
  accentBorder,
}: BentoCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rawRotateX = useMotionValue(0);
  const rawRotateY = useMotionValue(0);

  const rotateX = useSpring(rawRotateX, { stiffness: 200, damping: 20 });
  const rotateY = useSpring(rawRotateY, { stiffness: 200, damping: 20 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      mouseX.set(x);
      mouseY.set(y);

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      // Tilt: max 4 degrees
      rawRotateX.set(((y - centerY) / centerY) * -4);
      rawRotateY.set(((x - centerX) / centerX) * 4);
    },
    [mouseX, mouseY, rawRotateX, rawRotateY]
  );

  const handleMouseLeave = useCallback(() => {
    rawRotateX.set(0);
    rawRotateY.set(0);
    mouseX.set(0);
    mouseY.set(0);
  }, [rawRotateX, rawRotateY, mouseX, mouseY]);

  const content = (
    <motion.div
      ref={ref}
      className={`rounded-2xl p-6 relative overflow-hidden transition-all duration-500 ${className}`}
      style={{
        backgroundColor: 'var(--card)',
        border: '1px solid var(--border)',
        boxShadow: 'var(--card-shadow)',
        transformStyle: 'preserve-3d',
        perspective: 800,
        rotateX,
        rotateY,
        ...style,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{
        y: -4,
        boxShadow: 'var(--card-shadow-hover)',
        transition: { duration: 0.35, ease: 'easeOut' },
      }}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Cursor-following spotlight */}
      <CardSpotlight mouseX={mouseX} mouseY={mouseY} glowColor={glowColor} />

      {/* Top accent border line */}
      {accentBorder && (
        <div
          className="absolute top-0 left-6 right-6 h-[1px]"
          style={{
            background: `linear-gradient(90deg, transparent, ${accentBorder}, transparent)`,
            opacity: 0.5,
          }}
        />
      )}

      {/* Corner accent */}
      {glowColor && (
        <div
          className="absolute top-0 left-0 w-20 h-20 pointer-events-none opacity-[0.04]"
          style={{
            background: `radial-gradient(circle at 0% 0%, ${glowColor.replace('0.12', '0.4').replace('0.08', '0.3')} 0%, transparent 70%)`,
          }}
        />
      )}

      {/* Decorative element */}
      <DecoElement type={decorative} color={glowColor?.includes('purple') ? 'var(--accent-purple)' : glowColor?.includes('blue') ? 'var(--accent-blue)' : glowColor?.includes('rose') ? 'var(--accent-rose)' : glowColor?.includes('gold') ? 'var(--accent-gold)' : glowColor?.includes('mint') ? 'var(--accent-mint)' : undefined} />

      {/* Shimmer border on hover */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{
          background: accentBorder
            ? `linear-gradient(135deg, transparent 30%, ${accentBorder} 50%, transparent 70%)`
            : undefined,
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'exclude',
          WebkitMaskComposite: 'xor',
          padding: '1px',
          opacity: 0.15,
        }}
      />

      {children}
    </motion.div>
  );

  if (href) {
    return (
      <Link to={href} className="block group">
        {content}
      </Link>
    );
  }

  if (onClick) {
    return (
      <button onClick={onClick} className="block w-full text-left group">
        {content}
      </button>
    );
  }

  return <div className="group">{content}</div>;
}