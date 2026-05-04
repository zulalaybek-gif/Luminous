import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  type: 'circle' | 'diamond' | 'triangle' | 'cross' | 'ring';
  color: string;
  opacity: number;
}

const COLORS = [
  'var(--accent-purple)',
  'var(--accent-blue)',
  'var(--accent-rose)',
  'var(--accent-gold)',
  'var(--accent-mint)',
];

function generateParticles(count: number): Particle[] {
  const types: Particle['type'][] = ['circle', 'diamond', 'triangle', 'cross', 'ring'];
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 4 + Math.random() * 10,
    duration: 20 + Math.random() * 40,
    delay: Math.random() * -30,
    type: types[Math.floor(Math.random() * types.length)],
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    opacity: 0.04 + Math.random() * 0.08,
  }));
}

function ParticleShape({ type, size, color }: { type: Particle['type']; size: number; color: string }) {
  switch (type) {
    case 'circle':
      return (
        <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
          <circle cx="10" cy="10" r="8" stroke={color} strokeWidth="0.5" />
        </svg>
      );
    case 'diamond':
      return (
        <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
          <rect x="10" y="2" width="11" height="11" rx="1" transform="rotate(45 10 2)" stroke={color} strokeWidth="0.5" fill="none" />
        </svg>
      );
    case 'triangle':
      return (
        <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
          <polygon points="10,2 18,16 2,16" stroke={color} strokeWidth="0.5" fill="none" />
        </svg>
      );
    case 'cross':
      return (
        <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
          <line x1="10" y1="3" x2="10" y2="17" stroke={color} strokeWidth="0.5" />
          <line x1="3" y1="10" x2="17" y2="10" stroke={color} strokeWidth="0.5" />
        </svg>
      );
    case 'ring':
      return (
        <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
          <circle cx="10" cy="10" r="6" stroke={color} strokeWidth="0.3" />
          <circle cx="10" cy="10" r="2" fill={color} opacity="0.5" />
        </svg>
      );
  }
}

function InteractiveParticle({ particle, mouseX, mouseY }: { particle: Particle; mouseX: number; mouseY: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = centerX - mouseX;
    const dy = centerY - mouseY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const maxInfluence = 200;

    if (distance < maxInfluence) {
      const force = (1 - distance / maxInfluence) * 25;
      setOffset({
        x: (dx / distance) * force,
        y: (dy / distance) * force,
      });
    } else {
      setOffset({ x: 0, y: 0 });
    }
  }, [mouseX, mouseY]);

  return (
    <motion.div
      ref={ref}
      className="absolute pointer-events-none"
      style={{
        left: `${particle.x}%`,
        top: `${particle.y}%`,
        opacity: particle.opacity,
      }}
      animate={{
        y: [0, -30, 10, -20, 0],
        x: [0, 15, -10, 20, 0],
        rotate: [0, 90, 180, 270, 360],
        translateX: offset.x,
        translateY: offset.y,
      }}
      transition={{
        y: { duration: particle.duration, repeat: Infinity, ease: 'easeInOut', delay: particle.delay },
        x: { duration: particle.duration * 1.3, repeat: Infinity, ease: 'easeInOut', delay: particle.delay },
        rotate: { duration: particle.duration * 2, repeat: Infinity, ease: 'linear', delay: particle.delay },
        translateX: { duration: 0.8, ease: 'easeOut' },
        translateY: { duration: 0.8, ease: 'easeOut' },
      }}
    >
      <ParticleShape type={particle.type} size={particle.size} color={particle.color} />
    </motion.div>
  );
}

export function FloatingElements() {
  const [particles] = useState(() => generateParticles(18));
  const [mouse, setMouse] = useState({ x: -1000, y: -1000 });

  useEffect(() => {
    let rafId: number;
    let latestEvent: MouseEvent | null = null;

    const handleMouseMove = (e: MouseEvent) => {
      latestEvent = e;
    };

    const updateMouse = () => {
      if (latestEvent) {
        setMouse({ x: latestEvent.clientX, y: latestEvent.clientY });
        latestEvent = null;
      }
      rafId = requestAnimationFrame(updateMouse);
    };

    window.addEventListener('mousemove', handleMouseMove);
    rafId = requestAnimationFrame(updateMouse);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[1]">
      {particles.map((p) => (
        <InteractiveParticle
          key={p.id}
          particle={p}
          mouseX={mouse.x}
          mouseY={mouse.y}
        />
      ))}
    </div>
  );
}

// Parallax section wrapper: children shift based on mouse position
export function MouseParallax({
  children,
  intensity = 20,
  className = '',
}: {
  children: React.ReactNode;
  intensity?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 80, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 80, damping: 25 });

  const x = useTransform(springX, [-1, 1], [-intensity, intensity]);
  const y = useTransform(springY, [-1, 1], [-intensity, intensity]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      mouseX.set((e.clientX - centerX) / (rect.width / 2));
      mouseY.set((e.clientY - centerY) / (rect.height / 2));
    },
    [mouseX, mouseY]
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
    >
      <motion.div style={{ x, y }}>
        {children}
      </motion.div>
    </div>
  );
}

// Magnetic button/element that attracts toward the cursor
export function MagneticElement({
  children,
  intensity = 0.3,
  className = '',
}: {
  children: React.ReactNode;
  intensity?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 15 });
  const springY = useSpring(y, { stiffness: 200, damping: 15 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      x.set((e.clientX - centerX) * intensity);
      y.set((e.clientY - centerY) * intensity);
    },
    [x, y, intensity]
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
