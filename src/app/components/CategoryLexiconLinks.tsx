import { motion } from 'motion/react';
import { BookOpen, ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import { useLang } from './LanguageContext';
import { lexiconEntries, categoryConfig } from './lexiconData';
import { SectionDivider } from './SectionDivider';

interface CategoryLexiconLinksProps {
  category: 'alchemy' | 'symbolism' | 'numerology' | 'geometry' | 'consciousness' | 'cosmology';
}

export function CategoryLexiconLinks({ category }: CategoryLexiconLinksProps) {
  const { t, lang } = useLang();
  const cat = categoryConfig[category];
  const CatIcon = cat.icon;
  const entries = lexiconEntries.filter((e) => e.category === category);

  return (
    <>
      <SectionDivider color={cat.color} symbol="diamond" />
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-6">
          <BookOpen className="w-5 h-5" style={{ color: cat.color }} />
          <h3>{t('Termes du Lexique', 'Lexicon Terms')}</h3>
          <div className="h-px flex-1" style={{ backgroundColor: 'var(--border)' }} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {entries.map((entry, index) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <Link
                to={`/lexicon/${entry.id}`}
                className="block rounded-xl p-4 transition-all duration-300 group"
                style={{
                  backgroundColor: 'var(--card)',
                  border: '1px solid var(--border)',
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <CatIcon className="w-3.5 h-3.5" style={{ color: cat.color, opacity: 0.6 }} />
                  <span className="text-sm truncate" style={{ fontWeight: 500 }}>
                    {lang === 'fr' ? entry.termFr : entry.termEn}
                  </span>
                  <ArrowRight
                    className="w-3 h-3 ml-auto flex-shrink-0 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-0.5"
                    style={{ color: cat.color }}
                  />
                </div>
                <p className="text-xs line-clamp-2" style={{ color: 'var(--muted-foreground)', lineHeight: 1.5 }}>
                  {lang === 'fr' ? entry.definitionFr : entry.definitionEn}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-6">
          <Link
            to="/lexicon"
            className="inline-flex items-center gap-2 text-sm transition-colors"
            style={{ color: cat.color }}
          >
            <BookOpen className="w-4 h-4" />
            {t('Voir le lexique complet', 'View full lexicon')}
          </Link>
        </div>
      </div>
    </>
  );
}