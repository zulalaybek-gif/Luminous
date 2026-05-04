/**
 * Security utility functions for input sanitization.
 * Pure frontend — defense-in-depth layer.
 */

/** Max length for search queries */
const MAX_SEARCH_LENGTH = 200;

/** Max favorites allowed in localStorage */
export const MAX_FAVORITES = 500;

/**
 * Sanitize a search query string:
 * - Trim whitespace
 * - Cap length
 * - Strip HTML tags
 * - Remove null bytes
 */
export function sanitizeSearchQuery(raw: string): string {
  return raw
    .slice(0, MAX_SEARCH_LENGTH)
    .replace(/<[^>]*>/g, '')     // strip HTML tags
    .replace(/\0/g, '')          // strip null bytes
    .trim();
}

/**
 * Sanitize a URL parameter (slug, ID, filter value).
 * Only allow alphanumeric, hyphens, underscores.
 */
export function sanitizeSlug(raw: string): string {
  return raw
    .slice(0, 100)
    .replace(/[^a-zA-Z0-9\-_]/g, '')
    .trim();
}

/**
 * Sanitize a generic URL search param value.
 * Strips anything that looks like script injection.
 */
export function sanitizeParam(raw: string | null): string | null {
  if (raw === null) return null;
  return raw
    .slice(0, 200)
    .replace(/<[^>]*>/g, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '')
    .replace(/\0/g, '')
    .trim();
}

/**
 * Safe JSON parse with type validation.
 * Returns fallback if parsing fails or validation fails.
 */
export function safeJsonParse<T>(
  raw: string | null,
  validate: (data: unknown) => data is T,
  fallback: T
): T {
  if (!raw) return fallback;
  try {
    const parsed = JSON.parse(raw);
    return validate(parsed) ? parsed : fallback;
  } catch {
    return fallback;
  }
}

/**
 * Validate that a value is a string array.
 */
export function isStringArray(data: unknown): data is string[] {
  return Array.isArray(data) && data.every((item) => typeof item === 'string');
}

/**
 * Safe clipboard write with fallback.
 */
export async function safeClipboardWrite(text: string): Promise<boolean> {
  try {
    if (navigator?.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
    return false;
  } catch {
    return false;
  }
}
