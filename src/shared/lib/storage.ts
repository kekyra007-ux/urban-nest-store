/** Design reminder: persistence should quietly protect user context across visits. */
const storageKeys = {
  cart: 'urban-nest-cart',
  wishlist: 'urban-nest-wishlist',
  catalogPrefs: 'urban-nest-catalog-prefs',
  colorScheme: 'urban-nest-color-scheme',
} as const;

function canUseStorage() {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

export const storage = {
  keys: storageKeys,
  get<T>(key: string, fallback: T): T {
    if (!canUseStorage()) {
      return fallback;
    }

    try {
      const raw = window.localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as T) : fallback;
    } catch {
      return fallback;
    }
  },
  set<T>(key: string, value: T) {
    if (!canUseStorage()) {
      return;
    }

    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // ignore write failures in restricted browser environments
    }
  },
};
