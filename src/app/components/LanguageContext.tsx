import { createContext, useContext, useState, ReactNode } from 'react';

type Lang = 'fr' | 'en';

interface LanguageContextType {
  lang: Lang;
  toggleLang: () => void;
  t: (fr: string, en: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'fr',
  toggleLang: () => {},
  t: (fr: string) => fr,
});

export const useLang = () => useContext(LanguageContext);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('luminous-lang');
        if (stored === 'en' || stored === 'fr') return stored;
      } catch {
        // localStorage unavailable
      }
    }
    return 'fr';
  });

  const toggleLang = () => {
    setLang((prev) => {
      const next = prev === 'fr' ? 'en' : 'fr';
      try {
        localStorage.setItem('luminous-lang', next);
      } catch {
        // Storage unavailable
      }
      return next;
    });
  };

  const t = (fr: string, en: string) => (lang === 'fr' ? fr : en);

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}