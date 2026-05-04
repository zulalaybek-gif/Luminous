import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, BookOpen, Filter } from 'lucide-react';
import { Link } from 'react-router';
import { useLang } from '../components/LanguageContext';
import { useTheme } from '../components/ThemeContext';
import { richSubjects, INFO_TYPE_CONFIG, AXIS_CONFIG, type ContentAxis } from '../components/subjectsData';

export function SubjectsIndexPage() {
  const { t, lang } = useLang();
  const { isDark } = useTheme();
  const [activeAxis, setActiveAxis] = useState<ContentAxis | null>(null);

  const filtered = activeAxis ? richSubjects.filter((s) => s.axis === activeAxis) : richSubjects;

  return (
    <div className="pt-16 pb-16 px-4 lg:px-8">
      <div className="max-w-[1200px] mx-auto">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
          className="pt-10 mb-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="inline-flex p-2.5 rounded-xl" style={{ backgroundColor: 'var(--surface-purple)' }}>
              <BookOpen className="w-5 h-5" style={{ color: 'var(--accent-purple)' }} />
            </div>
            <span className="text-xs uppercase tracking-[0.3em]" style={{ color: 'var(--accent-purple)', fontWeight: 500 }}>
              {t('Sujets approfondis', 'Deep subjects')}
            </span>
          </div>
          <h1 className="mb-2" style={{ fontSize: 'clamp(2rem, 3.5vw, 3.2rem)', lineHeight: 1.1 }}>
            {t('Bibliothèque de', 'Knowledge')} <span style={{ color: 'var(--accent-purple)' }}>{t('Savoirs', 'Library')}</span>
          </h1>
          <p className="max-w-xl text-sm" style={{ color: 'var(--muted-foreground)', lineHeight: 1.85 }}>
            {t(
              "Chaque sujet est traité en profondeur : définition, origine, contexte historique, figures, pratiques, débats et sources — avec une distinction claire de la nature des informations.",
              "Each subject is treated in depth: definition, origin, historical context, figures, practices, debates and sources — with a clear distinction of the nature of information."
            )}
          </p>
        </motion.div>

        {/* Axis filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button onClick={() => setActiveAxis(null)}
            className="text-xs px-3.5 py-1.5 rounded-full transition-all"
            style={{ backgroundColor: !activeAxis ? 'var(--accent-purple)' : 'transparent', color: !activeAxis ? '#fff' : 'var(--muted-foreground)', border: `1px solid ${!activeAxis ? 'var(--accent-purple)' : 'var(--border-subtle)'}` }}>
            {t('Tous', 'All')} ({richSubjects.length})
          </button>
          {(Object.entries(AXIS_CONFIG) as [ContentAxis, typeof AXIS_CONFIG[ContentAxis]][]).map(([axisId, axis]) => {
            const count = richSubjects.filter((s) => s.axis === axisId).length;
            if (count === 0) return null;
            return (
              <button key={axisId} onClick={() => setActiveAxis(activeAxis === axisId ? null : axisId)}
                className="text-xs px-3.5 py-1.5 rounded-full transition-all"
                style={{ backgroundColor: activeAxis === axisId ? `color-mix(in srgb, ${axis.color} 12%, transparent)` : 'transparent', color: activeAxis === axisId ? axis.color : 'var(--muted-foreground)', border: `1px solid ${activeAxis === axisId ? axis.color : 'var(--border-subtle)'}` }}>
                {lang === 'fr' ? axis.labelFr : axis.labelEn} ({count})
              </button>
            );
          })}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((subject, i) => {
            const axisConfig = AXIS_CONFIG[subject.axis];
            return (
              <motion.div
                key={subject.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
              >
                <Link to={`/sujet/${subject.id}`}
                  className="flex flex-col rounded-2xl p-5 h-full group transition-all duration-200 hover:scale-[1.01]"
                  style={{
                    backgroundColor: isDark ? 'rgba(255,255,255,0.025)' : 'rgba(255,255,255,0.85)',
                    border: '1px solid var(--border-subtle)',
                  }}
                >
                  <div style={{ height: '2px', background: `linear-gradient(90deg, ${subject.color}, transparent)`, borderRadius: '99px', marginBottom: '14px' }} />
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="text-[9px] uppercase tracking-[0.15em] px-2 py-0.5 rounded-full"
                      style={{ backgroundColor: `color-mix(in srgb, ${axisConfig.color} 10%, transparent)`, color: axisConfig.color }}>
                      {lang === 'fr' ? axisConfig.labelFr : axisConfig.labelEn}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                      style={{ color: subject.color }} />
                  </div>
                  <h3 className="mb-1" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.1rem', color: 'var(--foreground)', lineHeight: 1.25 }}>
                    {lang === 'fr' ? subject.titleFr : subject.titleEn}
                  </h3>
                  <p className="text-[11px] mb-3" style={{ color: subject.color, fontStyle: 'italic' }}>
                    {lang === 'fr' ? subject.subtitleFr : subject.subtitleEn}
                  </p>
                  <p className="text-xs flex-1 mb-3" style={{ color: 'var(--muted-foreground)', lineHeight: 1.65 }}>
                    {(lang === 'fr' ? subject.definitionFr : subject.definitionEn).slice(0, 140)}…
                  </p>
                  {/* Info badges */}
                  <div className="flex flex-wrap gap-1 mt-auto">
                    {subject.infoBadges.slice(0, 3).map((badge) => (
                      <span key={badge} className="text-[9px] px-1.5 py-0.5 rounded-full"
                        style={{ backgroundColor: `color-mix(in srgb, ${INFO_TYPE_CONFIG[badge].color} 10%, transparent)`, color: INFO_TYPE_CONFIG[badge].color }}>
                        {lang === 'fr' ? INFO_TYPE_CONFIG[badge].labelFr : INFO_TYPE_CONFIG[badge].labelEn}
                      </span>
                    ))}
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Editorial note */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="mt-10 rounded-2xl p-6 text-center"
          style={{ backgroundColor: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.8)', border: '1px solid var(--border-subtle)' }}>
          <p className="text-xs" style={{ color: 'var(--muted-foreground)', lineHeight: 1.9, fontStyle: 'italic', maxWidth: '600px', margin: '0 auto' }}>
            {t(
              "Luminous distingue clairement tradition, témoignage, interprétation, hypothèse, recherche historique, recherche scientifique et controverse. Cette rigueur éditoriale est au cœur de chaque page sujet.",
              "Luminous clearly distinguishes tradition, testimony, interpretation, hypothesis, historical research, scientific research, and controversy. This editorial rigor is at the heart of every subject page."
            )}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
