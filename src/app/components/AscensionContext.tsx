import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface StageNote {
  stageId: string;
  content: string;
  updatedAt: string;
}

export interface StageProgress {
  stageId: string;
  completed: boolean;
  completedAt?: string;
}

interface AscensionContextType {
  notes: Record<string, string>;
  progress: Record<string, boolean>;
  updateNote: (stageId: string, content: string) => void;
  completeStage: (stageId: string) => void;
  getCompletedCount: () => number;
  resetProgress: () => void;
}

const AscensionContext = createContext<AscensionContextType | null>(null);

const STORAGE_KEY_NOTES = 'luminous-ascension-notes';
const STORAGE_KEY_PROGRESS = 'luminous-ascension-progress';

function safeLoad<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    if (typeof parsed !== 'object' || parsed === null) return fallback;
    return parsed as T;
  } catch {
    return fallback;
  }
}

export function AscensionProvider({ children }: { children: ReactNode }) {
  const [notes, setNotes] = useState<Record<string, string>>(() =>
    safeLoad<Record<string, string>>(STORAGE_KEY_NOTES, {})
  );
  const [progress, setProgress] = useState<Record<string, boolean>>(() =>
    safeLoad<Record<string, boolean>>(STORAGE_KEY_PROGRESS, {})
  );

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_NOTES, JSON.stringify(notes));
    } catch {/* storage unavailable */}
  }, [notes]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PROGRESS, JSON.stringify(progress));
    } catch {/* storage unavailable */}
  }, [progress]);

  const updateNote = (stageId: string, content: string) => {
    if (typeof stageId !== 'string' || stageId.length > 64) return;
    if (typeof content !== 'string' || content.length > 5000) return;
    setNotes((prev) => ({ ...prev, [stageId]: content }));
  };

  const completeStage = (stageId: string) => {
    if (typeof stageId !== 'string' || stageId.length > 64) return;
    setProgress((prev) => ({ ...prev, [stageId]: true }));
  };

  const getCompletedCount = () =>
    Object.values(progress).filter(Boolean).length;

  const resetProgress = () => {
    setNotes({});
    setProgress({});
  };

  return (
    <AscensionContext.Provider value={{ notes, progress, updateNote, completeStage, getCompletedCount, resetProgress }}>
      {children}
    </AscensionContext.Provider>
  );
}

export function useAscension() {
  const ctx = useContext(AscensionContext);
  if (!ctx) throw new Error('useAscension must be used within AscensionProvider');
  return ctx;
}
