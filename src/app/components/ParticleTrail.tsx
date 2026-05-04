import { useEffect, useRef, useCallback } from 'react';
import { useTheme } from './ThemeContext';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
}

const COLORS_DARK = [
  'rgba(155, 142, 230, 0.6)',
  'rgba(107, 174, 214, 0.5)',
  'rgba(224, 102, 126, 0.4)',
  'rgba(212, 175, 55, 0.4)',
];

const COLORS_LIGHT = [
  'rgba(130, 100, 200, 0.4)',
  'rgba(70, 130, 180, 0.35)',
  'rgba(200, 80, 100, 0.3)',
  'rgba(180, 140, 40, 0.3)',
];

export function ParticleTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, lastX: 0, lastY: 0 });
  const rafRef = useRef<number>(0);
  const { isDark } = useTheme();
  const isDarkRef = useRef(isDark);
  isDarkRef.current = isDark;

  const createParticle = useCallback((x: number, y: number, speed: number) => {
    const colors = isDarkRef.current ? COLORS_DARK : COLORS_LIGHT;
    const angle = Math.random() * Math.PI * 2;
    const velocity = Math.random() * 0.8 + 0.2;
    const particle: Particle = {
      x,
      y,
      vx: Math.cos(angle) * velocity,
      vy: Math.sin(angle) * velocity - 0.3,
      life: 1,
      maxLife: Math.random() * 40 + 20,
      size: Math.random() * 2.5 + 0.8,
      color: colors[Math.floor(Math.random() * colors.length)],
    };
    return particle;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current.lastX = mouseRef.current.x;
      mouseRef.current.lastY = mouseRef.current.y;
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;

      const dx = mouseRef.current.x - mouseRef.current.lastX;
      const dy = mouseRef.current.y - mouseRef.current.lastY;
      const speed = Math.sqrt(dx * dx + dy * dy);

      // Only emit particles when moving and limit count
      if (speed > 2 && particlesRef.current.length < 80) {
        const count = Math.min(Math.floor(speed / 8), 3);
        for (let i = 0; i < count; i++) {
          particlesRef.current.push(
            createParticle(
              mouseRef.current.x + (Math.random() - 0.5) * 6,
              mouseRef.current.y + (Math.random() - 0.5) * 6,
              speed
            )
          );
        }
      }
    };

    window.addEventListener('mousemove', onMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current = particlesRef.current.filter((p) => {
        p.life -= 1 / p.maxLife;
        if (p.life <= 0) return false;

        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.01; // subtle gravity
        p.vx *= 0.99;
        p.vy *= 0.99;

        const alpha = p.life * p.life; // ease out
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * alpha, 0, Math.PI * 2);
        ctx.fillStyle = p.color.replace(/[\d.]+\)$/, `${alpha * 0.6})`);
        ctx.fill();

        return true;
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, [createParticle]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[45]"
      style={{ opacity: 0.7 }}
    />
  );
}
