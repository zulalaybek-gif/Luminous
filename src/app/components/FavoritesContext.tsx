import { createContext, useContext, useState, useCallback, useRef, ReactNode } from 'react';
import { safeJsonParse, isStringArray, sanitizeSlug, MAX_FAVORITES } from './sanitize';

interface FavoritesContextType {
  favorites: string[];
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  count: number;
}

const FavoritesContext = createContext<FavoritesContextType>({
  favorites: [],
  toggleFavorite: () => {},
  isFavorite: () => false,
  count: 0,
});

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const lastToggleRef = useRef<number>(0);

  const [favorites, setFavorites] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('luminous-favorites');
        const parsed = safeJsonParse(stored, isStringArray, []);
        // Cap at max and sanitize each ID
        const sanitized = parsed
          .slice(0, MAX_FAVORITES)
          .filter((id) => id === sanitizeSlug(id) && id.length > 0);
        // If data was corrupted, clean it
        if (stored && sanitized.length !== parsed.length) {
          localStorage.setItem('luminous-favorites', JSON.stringify(sanitized));
        }
        return sanitized;
      } catch {
        try { localStorage.removeItem('luminous-favorites'); } catch { /* noop */ }
        return [];
      }
    }
    return [];
  });

  const toggleFavorite = useCallback((id: string) => {
    // Validate input
    if (typeof id !== 'string' || !id.trim()) return;
    const sanitized = sanitizeSlug(id);
    if (!sanitized) return;

    // Rate limiting: 200ms between toggles
    const now = Date.now();
    if (now - lastToggleRef.current < 200) return;
    lastToggleRef.current = now;

    setFavorites((prev) => {
      const isRemoving = prev.includes(sanitized);
      let next: string[];

      if (isRemoving) {
        next = prev.filter((f) => f !== sanitized);
      } else {
        // Enforce max cap
        if (prev.length >= MAX_FAVORITES) return prev;
        next = [...prev, sanitized];
      }

      try {
        localStorage.setItem('luminous-favorites', JSON.stringify(next));
      } catch {
        // Storage full or unavailable — state still updates in memory
      }
      return next;
    });
  }, []);

  const isFavorite = useCallback((id: string) => favorites.includes(id), [favorites]);

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite, count: favorites.length }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  return useContext(FavoritesContext);
}