export const STORAGE_KEYS = { locale: 'locale', theme: 'theme' } as const;

/** Reads a value; returns null when storage is missing, blocked or throws. */
export function safeGet(key: string, storage?: Pick<Storage, 'getItem'>): string | null {
  try {
    return (storage ?? globalThis.localStorage).getItem(key);
  } catch {
    return null;
  }
}

/** Writes a value; returns false when storage is missing, blocked or throws. */
export function safeSet(key: string, value: string, storage?: Pick<Storage, 'setItem'>): boolean {
  try {
    (storage ?? globalThis.localStorage).setItem(key, value);
    return true;
  } catch {
    return false;
  }
}
